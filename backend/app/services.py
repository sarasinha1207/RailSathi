from datetime import datetime
from typing import Optional
from fastapi import HTTPException
from sqlalchemy.orm import Session
from .models import (
    User, Staff, Complaint, ComplaintCategory, Department,
    ComplaintStatusHistory, ComplaintAssignmentHistory, ComplaintEscalationHistory
)

# Strict allowed status transitions map
ALLOWED_TRANSITIONS = {
    "Assigned": ["Assigned", "In Progress", "Reassignment Requested", "Escalated", "Closed"],
    "In Progress": ["Reassignment Requested", "Escalated", "Resolved", "Closed"],
    "Reassignment Requested": ["Assigned", "In Progress", "Escalated", "Closed"],
    "Escalated": ["Assigned", "In Progress", "Resolved", "Closed"],
    "Resolved": ["Closed"],
    "Closed": []
}

def validate_status_transition(current_status: str, next_status: str):
    """Enforces strict state machine transition rules."""
    allowed = ALLOWED_TRANSITIONS.get(current_status, [])
    if next_status not in allowed:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid status transition from '{current_status}' to '{next_status}'."
        )


def verify_complaint_service(
    db: Session,
    complaint_id: str,
    officer_user_id: str,
    verified_category_code: Optional[str] = None,
    priority: Optional[str] = None,
    is_critical: Optional[bool] = None,
    verification_remarks: Optional[str] = None
) -> Complaint:
    """Complaint Officer verifies/corrects category, subcategory, priority, and critical flag."""
    user = db.query(User).filter(User.user_id == officer_user_id).first()
    if not user or user.role not in ("Admin", "ComplaintOfficer"):
        raise HTTPException(status_code=403, detail="Permission denied: Only Complaint Officers or Admins can verify complaints.")

    complaint = db.query(Complaint).filter(Complaint.complaint_id == complaint_id).first()
    if not complaint:
        raise HTTPException(status_code=404, detail="Complaint not found.")

    if complaint.internal_status in ("Resolved", "Closed"):
        raise HTTPException(status_code=400, detail="Cannot verify a resolved or closed complaint.")

    try:
        if verified_category_code:
            cat = db.query(ComplaintCategory).filter(ComplaintCategory.category_code == verified_category_code).first()
            if not cat:
                raise HTTPException(status_code=400, detail=f"Category code '{verified_category_code}' not found.")
            complaint.verified_category_code = verified_category_code
            if cat.department_code:
                complaint.assigned_department_code = cat.department_code

        if priority:
            if priority not in ("Low", "Medium", "High"):
                raise HTTPException(status_code=400, detail="Invalid priority level.")
            complaint.priority = priority

        if is_critical is not None:
            complaint.is_critical = is_critical

        complaint.verified_by_user_id = officer_user_id
        complaint.verified_at = datetime.utcnow()
        if verification_remarks:
            complaint.verification_remarks = verification_remarks

        db.add(ComplaintStatusHistory(
            complaint_id=complaint.complaint_id,
            from_status=complaint.internal_status,
            to_status=complaint.internal_status,
            updated_by_user_id=officer_user_id,
            remarks=verification_remarks or "Complaint verified by officer."
        ))

        db.commit()
        db.refresh(complaint)
        return complaint
    except Exception as e:
        db.rollback()
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=500, detail=f"Transaction failed during verification: {str(e)}")


def assign_complaint_service(
    db: Session,
    complaint_id: str,
    officer_user_id: str,
    staff_id: str,
    verified_category_code: Optional[str] = None,
    priority: Optional[str] = None,
    is_critical: Optional[bool] = None
) -> Complaint:
    """Complaint Officer assigns complaint to field staff, optionally updating verified category/priority."""
    user = db.query(User).filter(User.user_id == officer_user_id).first()
    if not user or user.role not in ("Admin", "ComplaintOfficer"):
        raise HTTPException(status_code=403, detail="Permission denied: Only Complaint Officers or Admins can assign staff.")

    complaint = db.query(Complaint).filter(Complaint.complaint_id == complaint_id).first()
    if not complaint:
        raise HTTPException(status_code=404, detail="Complaint not found.")

    validate_status_transition(complaint.internal_status, "Assigned")

    staff = db.query(Staff).filter(Staff.staff_id == staff_id).first()
    if not staff:
        raise HTTPException(status_code=404, detail=f"Staff ID '{staff_id}' not found.")

    if not staff.user or not staff.user.is_active:
        raise HTTPException(status_code=400, detail=f"Staff member '{staff_id}' account is inactive.")

    if not staff.is_on_duty:
        raise HTTPException(status_code=400, detail=f"Staff member '{staff.name}' is currently off-duty.")

    # Workload check: max 5 active complaints
    active_count = db.query(Complaint).filter(
        Complaint.assigned_staff_id == staff_id,
        Complaint.internal_status.in_(["Assigned", "Accepted", "In Progress"])
    ).count()
    if active_count >= 5:
        raise HTTPException(status_code=400, detail=f"Staff member '{staff.name}' has reached active workload limit (5 active tasks).")

    try:
        prev_st = complaint.internal_status
        complaint.assigned_staff_id = staff.staff_id
        if staff.department_code:
            complaint.assigned_department_code = staff.department_code

        if verified_category_code:
            cat = db.query(ComplaintCategory).filter(ComplaintCategory.category_code == verified_category_code).first()
            if cat:
                complaint.verified_category_code = cat.category_code
                complaint.verified_by_user_id = officer_user_id
                complaint.verified_at = datetime.utcnow()
                if not complaint.assigned_department_code:
                    complaint.assigned_department_code = cat.department_code
        if priority:
            complaint.priority = priority
        if is_critical is not None:
            complaint.is_critical = is_critical

        complaint.assigned_at = datetime.utcnow()
        complaint.internal_status = "Assigned"

        # Record assignment history
        db.add(ComplaintAssignmentHistory(
            complaint_id=complaint.complaint_id,
            staff_id=staff.staff_id,
            department_code=staff.department_code or complaint.assigned_department_code or "OTHER",
            assigned_by_user_id=officer_user_id,
            status="ASSIGNED",
            assigned_at=datetime.utcnow()
        ))

        # Record status history
        db.add(ComplaintStatusHistory(
            complaint_id=complaint.complaint_id,
            from_status=prev_st,
            to_status="Assigned",
            updated_by_user_id=officer_user_id,
            remarks=f"Assigned to staff {staff.name} ({staff.staff_id})."
        ))

        db.commit()
        db.refresh(complaint)
        return complaint
    except Exception as e:
        db.rollback()
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=500, detail=f"Transaction failed during assignment: {str(e)}")


def accept_assignment_service(
    db: Session,
    complaint_id: str,
    staff_user_id: str
) -> Complaint:
    """Assigned staff member accepts their assignment."""
    staff = db.query(Staff).filter(Staff.user_id == staff_user_id).first()
    if not staff:
        raise HTTPException(status_code=403, detail="Permission denied: User is not registered as a Staff member.")

    complaint = db.query(Complaint).filter(Complaint.complaint_id == complaint_id).first()
    if not complaint:
        raise HTTPException(status_code=404, detail="Complaint not found.")

    if complaint.assigned_staff_id != staff.staff_id:
        raise HTTPException(status_code=403, detail="Permission denied: You are not assigned to this complaint.")

    validate_status_transition(complaint.internal_status, "Accepted")

    try:
        prev_st = complaint.internal_status
        complaint.internal_status = "Accepted"

        active_assign = db.query(ComplaintAssignmentHistory).filter(
            ComplaintAssignmentHistory.complaint_id == complaint.complaint_id,
            ComplaintAssignmentHistory.staff_id == staff.staff_id,
            ComplaintAssignmentHistory.status == "ASSIGNED"
        ).order_by(ComplaintAssignmentHistory.assigned_at.desc()).first()

        if active_assign:
            active_assign.status = "ACCEPTED"

        db.add(ComplaintStatusHistory(
            complaint_id=complaint.complaint_id,
            from_status=prev_st,
            to_status="Accepted",
            updated_by_user_id=staff_user_id,
            remarks=f"Staff {staff.name} accepted the assignment."
        ))

        db.commit()
        db.refresh(complaint)
        return complaint
    except Exception as e:
        db.rollback()
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=500, detail=f"Transaction failed during assignment acceptance: {str(e)}")


def start_work_service(
    db: Session,
    complaint_id: str,
    staff_user_id: str
) -> Complaint:
    """Assigned staff member begins work on the complaint."""
    staff = db.query(Staff).filter(Staff.user_id == staff_user_id).first()
    if not staff:
        raise HTTPException(status_code=403, detail="Permission denied: User is not registered as a Staff member.")

    complaint = db.query(Complaint).filter(Complaint.complaint_id == complaint_id).first()
    if not complaint:
        raise HTTPException(status_code=404, detail="Complaint not found.")

    if complaint.assigned_staff_id != staff.staff_id:
        raise HTTPException(status_code=403, detail="Permission denied: You are not assigned to this complaint.")

    validate_status_transition(complaint.internal_status, "In Progress")

    try:
        prev_st = complaint.internal_status
        complaint.internal_status = "In Progress"

        active_assign = db.query(ComplaintAssignmentHistory).filter(
            ComplaintAssignmentHistory.complaint_id == complaint.complaint_id,
            ComplaintAssignmentHistory.staff_id == staff.staff_id,
            ComplaintAssignmentHistory.status == "ACCEPTED"
        ).order_by(ComplaintAssignmentHistory.assigned_at.desc()).first()

        if active_assign:
            active_assign.status = "IN_PROGRESS"

        db.add(ComplaintStatusHistory(
            complaint_id=complaint.complaint_id,
            from_status=prev_st,
            to_status="In Progress",
            updated_by_user_id=staff_user_id,
            remarks=f"Staff {staff.name} started work on the grievance."
        ))

        db.commit()
        db.refresh(complaint)
        return complaint
    except Exception as e:
        db.rollback()
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=500, detail=f"Transaction failed during start work: {str(e)}")


def request_reassignment_service(
    db: Session,
    complaint_id: str,
    staff_user_id: str,
    reason: str
) -> Complaint:
    """Assigned staff member requests reassignment with reason."""
    staff = db.query(Staff).filter(Staff.user_id == staff_user_id).first()
    if not staff:
        raise HTTPException(status_code=403, detail="Permission denied: User is not registered as a Staff member.")

    complaint = db.query(Complaint).filter(Complaint.complaint_id == complaint_id).first()
    if not complaint:
        raise HTTPException(status_code=404, detail="Complaint not found.")

    if complaint.assigned_staff_id != staff.staff_id:
        raise HTTPException(status_code=403, detail="Permission denied: You are not assigned to this complaint.")

    if not reason or not reason.strip():
        raise HTTPException(status_code=400, detail="Reassignment reason is required.")

    validate_status_transition(complaint.internal_status, "Reassignment Requested")

    try:
        prev_st = complaint.internal_status
        complaint.internal_status = "Reassignment Requested"

        active_assign = db.query(ComplaintAssignmentHistory).filter(
            ComplaintAssignmentHistory.complaint_id == complaint.complaint_id,
            ComplaintAssignmentHistory.staff_id == staff.staff_id,
            ComplaintAssignmentHistory.status.in_(["ASSIGNED", "ACCEPTED", "IN_PROGRESS"])
        ).order_by(ComplaintAssignmentHistory.assigned_at.desc()).first()

        if active_assign:
            active_assign.status = "REASSIGNMENT_REQUESTED"
            active_assign.reassignment_reason = reason

        db.add(ComplaintStatusHistory(
            complaint_id=complaint.complaint_id,
            from_status=prev_st,
            to_status="Reassignment Requested",
            updated_by_user_id=staff_user_id,
            remarks=f"Reassignment requested by {staff.name}: {reason}"
        ))

        db.commit()
        db.refresh(complaint)
        return complaint
    except Exception as e:
        db.rollback()
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=500, detail=f"Transaction failed during reassignment request: {str(e)}")


def reassign_complaint_service(
    db: Session,
    complaint_id: str,
    officer_user_id: str,
    new_staff_id: str,
    reason: Optional[str] = None
) -> Complaint:
    """Complaint Officer reassigns complaint to another eligible staff member."""
    user = db.query(User).filter(User.user_id == officer_user_id).first()
    if not user or user.role not in ("Admin", "ComplaintOfficer"):
        raise HTTPException(status_code=403, detail="Permission denied: Only Complaint Officers or Admins can reassign complaints.")

    complaint = db.query(Complaint).filter(Complaint.complaint_id == complaint_id).first()
    if not complaint:
        raise HTTPException(status_code=404, detail="Complaint not found.")

    validate_status_transition(complaint.internal_status, "Assigned")

    new_staff = db.query(Staff).filter(Staff.staff_id == new_staff_id).first()
    if not new_staff:
        raise HTTPException(status_code=404, detail=f"New Staff ID '{new_staff_id}' not found.")

    if not new_staff.user or not new_staff.user.is_active:
        raise HTTPException(status_code=400, detail="New staff account is inactive.")

    if not new_staff.is_on_duty:
        raise HTTPException(status_code=400, detail=f"Staff member '{new_staff.name}' is currently off-duty.")

    try:
        prev_st = complaint.internal_status
        old_staff_id = complaint.assigned_staff_id

        old_assign = db.query(ComplaintAssignmentHistory).filter(
            ComplaintAssignmentHistory.complaint_id == complaint.complaint_id,
            ComplaintAssignmentHistory.status.in_(["ASSIGNED", "ACCEPTED", "IN_PROGRESS", "REASSIGNMENT_REQUESTED"])
        ).order_by(ComplaintAssignmentHistory.assigned_at.desc()).first()

        if old_assign:
            old_assign.status = "REASSIGNED"
            if reason:
                old_assign.reassignment_reason = reason

        complaint.assigned_staff_id = new_staff.staff_id
        if new_staff.department_code:
            complaint.assigned_department_code = new_staff.department_code
        complaint.assigned_at = datetime.utcnow()
        complaint.internal_status = "Assigned"

        db.add(ComplaintAssignmentHistory(
            complaint_id=complaint.complaint_id,
            staff_id=new_staff.staff_id,
            department_code=new_staff.department_code or complaint.assigned_department_code or "OTHER",
            assigned_by_user_id=officer_user_id,
            status="ASSIGNED",
            assigned_at=datetime.utcnow()
        ))

        db.add(ComplaintStatusHistory(
            complaint_id=complaint.complaint_id,
            from_status=prev_st,
            to_status="Assigned",
            updated_by_user_id=officer_user_id,
            remarks=f"Reassigned from {old_staff_id} to {new_staff.name} ({new_staff.staff_id}). Reason: {reason or 'Officer reassignment'}"
        ))

        db.commit()
        db.refresh(complaint)
        return complaint
    except Exception as e:
        db.rollback()
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=500, detail=f"Transaction failed during reassignment: {str(e)}")


def escalate_complaint_service(
    db: Session,
    complaint_id: str,
    officer_user_id: str,
    reason: str,
    escalated_to_user_id: Optional[str] = None,
    escalated_to_role: str = "Admin"
) -> Complaint:
    """Escalates critical or repeatedly unresolved complaint to Administrator."""
    user = db.query(User).filter(User.user_id == officer_user_id).first()
    if not user or user.role not in ("Admin", "ComplaintOfficer"):
        raise HTTPException(status_code=403, detail="Permission denied: Only Complaint Officers or Admins can escalate complaints.")

    complaint = db.query(Complaint).filter(Complaint.complaint_id == complaint_id).first()
    if not complaint:
        raise HTTPException(status_code=404, detail="Complaint not found.")

    if not reason or not reason.strip():
        raise HTTPException(status_code=400, detail="Escalation reason is required.")

    validate_status_transition(complaint.internal_status, "Escalated")

    try:
        prev_st = complaint.internal_status
        complaint.is_critical = True
        complaint.internal_status = "Escalated"

        db.add(ComplaintEscalationHistory(
            complaint_id=complaint.complaint_id,
            escalated_by_user_id=officer_user_id,
            escalated_to_user_id=escalated_to_user_id,
            escalated_to_role=escalated_to_role,
            reason=reason,
            status="OPEN",
            created_at=datetime.utcnow()
        ))

        db.add(ComplaintStatusHistory(
            complaint_id=complaint.complaint_id,
            from_status=prev_st,
            to_status="Escalated",
            updated_by_user_id=officer_user_id,
            remarks=f"Escalated to {escalated_to_role}: {reason}"
        ))

        db.commit()
        db.refresh(complaint)
        return complaint
    except Exception as e:
        db.rollback()
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=500, detail=f"Transaction failed during escalation: {str(e)}")


def resolve_complaint_service(
    db: Session,
    complaint_id: str,
    staff_user_id: str,
    resolution_remarks: str
) -> Complaint:
    """Assigned staff member resolves complaint with action taken details."""
    staff = db.query(Staff).filter(Staff.user_id == staff_user_id).first()
    if not staff:
        raise HTTPException(status_code=403, detail="Permission denied: User is not registered as a Staff member.")

    complaint = db.query(Complaint).filter(Complaint.complaint_id == complaint_id).first()
    if not complaint:
        raise HTTPException(status_code=404, detail="Complaint not found.")

    if complaint.assigned_staff_id != staff.staff_id:
        raise HTTPException(status_code=403, detail="Permission denied: You are not assigned to this complaint.")

    if not resolution_remarks or not resolution_remarks.strip():
        raise HTTPException(status_code=400, detail="Resolution remarks / action taken details are required.")

    validate_status_transition(complaint.internal_status, "Resolved")

    try:
        prev_st = complaint.internal_status
        complaint.internal_status = "Resolved"
        complaint.resolution_remarks = resolution_remarks
        complaint.resolved_by_user_id = staff_user_id
        complaint.resolved_at = datetime.utcnow()

        active_assign = db.query(ComplaintAssignmentHistory).filter(
            ComplaintAssignmentHistory.complaint_id == complaint.complaint_id,
            ComplaintAssignmentHistory.staff_id == staff.staff_id,
            ComplaintAssignmentHistory.status.in_(["ASSIGNED", "ACCEPTED", "IN_PROGRESS"])
        ).order_by(ComplaintAssignmentHistory.assigned_at.desc()).first()

        if active_assign:
            active_assign.status = "COMPLETED"
            active_assign.completed_at = datetime.utcnow()

        db.add(ComplaintStatusHistory(
            complaint_id=complaint.complaint_id,
            from_status=prev_st,
            to_status="Resolved",
            updated_by_user_id=staff_user_id,
            remarks=f"Resolved by {staff.name}. Action taken: {resolution_remarks}"
        ))

        db.commit()
        db.refresh(complaint)
        return complaint
    except Exception as e:
        db.rollback()
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=500, detail=f"Transaction failed during resolution: {str(e)}")
