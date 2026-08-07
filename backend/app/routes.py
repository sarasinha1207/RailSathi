import hashlib
import os
import math
import re
from datetime import datetime, date, time
from typing import Optional, List
from fastapi import APIRouter, Depends, HTTPException, Form, Request
from sqlalchemy.orm import Session
from .database import get_db
from .schemas import (
    ComplaintResponse, PnrResponse, LoginRequest, UpdateStatusRequest
)
from .models import (
    User, Zone, Division, Station, Train, TrainRoute,
    PnrBooking, Department, ComplaintCategory, Staff, StaffGpsLocation,
    Complaint, Feedback, ComplaintStatusHistory, OtpVerification, Notification
)

router = APIRouter()

def generate_complaint_id(db: Session) -> str:
    """Generates a unique complaint ID based on today's date and a sequential counter."""
    today_str = datetime.now().strftime("%Y%m%d")
    count = db.query(Complaint).filter(Complaint.complaint_id.like(f"CMP{today_str}%")).count()
    return f"CMP{today_str}{10000 + count + 1}"

def enrich_complaint_dict(c: Complaint, db: Session) -> dict:
    """Converts a normalized Complaint model instance to a flat dashboard-compatible dictionary."""
    feedback_val = ""
    rating_val = ""
    if c.feedback:
        feedback_val = c.feedback.feedback_text or ""
        rating_val = c.feedback.rating or ""

    # Fetch latest remarks from Status History
    latest_history = db.query(ComplaintStatusHistory).filter(
        ComplaintStatusHistory.complaint_id == c.complaint_id
    ).order_by(ComplaintStatusHistory.updated_at.desc()).first()
    remarks_val = latest_history.remarks if latest_history else ""

    return {
        "complaint_id": c.complaint_id,
        "complaint_type": c.complaint_type,
        "phone_number": c.phone_number,
        "pnr_number": c.pnr_number or "",
        "train_number": c.train_number or "",
        "coach_number": c.coach_number or "",
        "station_name": c.station.station_name if c.station else "",
        "platform_number": c.platform_number or "",
        "station_area": "",
        "main_class": c.category.category_name if c.category else "Other",
        "sub_class": c.category.subcategory_name if c.category else "General",
        "incident_date": c.incident_date.strftime("%Y-%m-%d"),
        "incident_time": c.incident_time.strftime("%H:%M") if c.incident_time else "",
        "complaint_description": c.complaint_description,
        "complaint_status": c.status,
        "created_at": c.created_at.strftime("%Y-%m-%d %H:%M:%S"),
        "zone_code": c.assigned_division.zone.zone_code if (c.assigned_division and c.assigned_division.zone) else "",
        "zone_name": c.assigned_division.zone.zone_name if (c.assigned_division and c.assigned_division.zone) else "",
        "division_name": c.assigned_division.division_name if c.assigned_division else "",
        "remarks": remarks_val,
        "feedback": feedback_val,
        "rating": rating_val,
        "department": c.assigned_department.name if c.assigned_department else "Other",
        "priority": c.priority,
        "display_status": c.status
    }

def haversine_distance(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """Calculates Haversine distance in kilometers between two GPS coordinates."""
    R = 6371.0  # Radius of Earth
    rlat1, rlon1 = math.radians(lat1), math.radians(lon1)
    rlat2, rlon2 = math.radians(lat2), math.radians(lon2)
    dlat = rlat2 - rlat1
    dlon = rlon2 - rlon1
    a = math.sin(dlat / 2)**2 + math.cos(rlat1) * math.cos(rlat2) * math.sin(dlon / 2)**2
    c = 2 * math.asin(math.sqrt(a))
    return R * c

def determine_nearest_station(db: Session, train_id: int) -> Station:
    """Determines the nearest station using on-duty staff GPS locations, with a scheduled route fallback."""
    # 1. On-duty staff GPS coordinates check
    staff_member = db.query(Staff).filter(
        Staff.active_train_id == train_id,
        Staff.is_on_duty == True
    ).first()
    
    if staff_member:
        gps = db.query(StaffGpsLocation).filter(StaffGpsLocation.staff_id == staff_member.id).first()
        if gps:
            # Return cached geofenced station if available
            if gps.current_station_id:
                station = db.query(Station).filter(Station.id == gps.current_station_id).first()
                if station:
                    return station

            # Calculate and cache the nearest station
            all_stations = db.query(Station).all()
            if all_stations:
                nearest = None
                min_dist = float('inf')
                for st in all_stations:
                    dist = haversine_distance(float(gps.latitude), float(gps.longitude), float(st.latitude), float(st.longitude))
                    if dist < min_dist:
                        min_dist = dist
                        nearest = st
                if nearest:
                    gps.current_station_id = nearest.id
                    db.commit()
                    return nearest

    # 2. Route Schedule Fallback
    routes = db.query(TrainRoute).filter(TrainRoute.train_id == train_id).order_by(TrainRoute.stop_sequence).all()
    if routes:
        curr_time = datetime.now().time()
        nearest_route = None
        min_diff = float('inf')
        for r in routes:
            stop_time = r.departure_time or r.arrival_time
            if stop_time:
                diff = abs((curr_time.hour * 60 + curr_time.minute) - (stop_time.hour * 60 + stop_time.minute))
                if diff < min_diff:
                    min_diff = diff
                    nearest_route = r
        if nearest_route:
            station = db.query(Station).filter(Station.id == nearest_route.station_id).first()
            if station:
                return station

    # 3. Source station fallback
    train = db.query(Train).filter(Train.id == train_id).first()
    if train:
        station = db.query(Station).filter(Station.id == train.source_station_id).first()
        if station:
            return station

    # 4. Ultimate fallback (NDLS)
    return db.query(Station).filter(Station.station_code == "NDLS").first()

@router.post("/api/v1/auth/login")
async def login_api(request: Request, payload: LoginRequest, db: Session = Depends(get_db)):
    """Handles Official / Admin login authentication."""
    user = db.query(User).filter(User.username == payload.username).first()
    if user and user.password_hash == payload.password:
        request.session["logged_in"] = True
        request.session["role"] = user.role
        request.session["username"] = user.username
        request.session["user_id"] = user.id
        return {"status": "success", "username": user.username, "role": user.role}
    
    raise HTTPException(status_code=401, detail="Invalid Username or Password!")

@router.get("/api/v1/auth/logout")
async def logout_api(request: Request):
    """Logs out the user and clears session state."""
    request.session.clear()
    return {"status": "success", "message": "Logged out successfully"}

@router.get("/api/v1/auth/me")
async def get_me(request: Request):
    """Verifies active session state."""
    if not request.session.get("logged_in"):
        return {"logged_in": False}
    return {
        "logged_in": True,
        "username": request.session.get("username"),
        "role": request.session.get("role")
    }

@router.get("/api/v1/dashboard/complaints")
async def get_dashboard_complaints(request: Request, db: Session = Depends(get_db)):
    """Fetches complaints dataset for dashboard charts (requires auth)."""
    if not request.session.get("logged_in"):
        raise HTTPException(status_code=401, detail="Unauthorized")
        
    complaints = db.query(Complaint).all()
    results = []
    for c in complaints:
        results.append(enrich_complaint_dict(c, db))
    return results

@router.get("/api/v1/pnr/{pnr_number}")
async def get_pnr_details(pnr_number: str, db: Session = Depends(get_db)):
    """Validates and fetches autocomplete PNR ticket reservation data."""
    ticket = db.query(PnrBooking).filter(PnrBooking.pnr_number == pnr_number.strip()).first()
    if not ticket:
        raise HTTPException(status_code=404, detail="PNR not found")
        
    return {
        "pnr_number": ticket.pnr_number,
        "train_number": ticket.train.train_number if ticket.train else "",
        "train_name": ticket.train.train_name if ticket.train else "Express",
        "coach_number": ticket.coach_number,
        "berth_number": ticket.seat_number,
        "boarding_station": ticket.boarding_station.station_name if ticket.boarding_station else "",
        "destination_station": ticket.destination_station.station_name if ticket.destination_station else "",
        "journey_date": ticket.journey_date.strftime("%Y-%m-%d") if ticket.journey_date else "",
        "journey_class": ticket.journey_class,
        "phone_number": ticket.phone_number
    }

@router.post("/api/v1/submit-train")
async def submit_train_complaint(
    phone_number: str = Form(...),
    pnr_number: str = Form(...),
    train_number: str = Form(...),
    coach_number: Optional[str] = Form(None),
    main_class: str = Form(...),
    sub_class: str = Form(...),
    incident_datetime: str = Form(...),
    complaint_description: str = Form(...),
    db: Session = Depends(get_db)
):
    """Files a new Train Grievance, auto-routing location and priority classes."""
    try:
        complaint_id = generate_complaint_id(db)
        
        # Parse datetime-local input
        incident_date = date.today()
        incident_time = None
        if incident_datetime and "T" in incident_datetime:
            parts = incident_datetime.split("T")
            incident_date = datetime.strptime(parts[0], "%Y-%m-%d").date()
            incident_time = datetime.strptime(parts[1], "%H:%M").time()
            
        # Resolve train
        train_num_clean = train_number.split(" - ")[0].strip()
        train = db.query(Train).filter(Train.train_number == train_num_clean).first()
        if not train:
            train_name_val = train_number.split(" - ")[1].strip() if " - " in train_number else "Express"
            ndls = db.query(Station).filter(Station.station_code == "NDLS").first()
            bpl = db.query(Station).filter(Station.station_code == "BPL").first()
            train = Train(
                train_number=train_num_clean,
                train_name=train_name_val,
                source_station_id=ndls.id if ndls else 1,
                destination_station_id=bpl.id if bpl else 2
            )
            db.add(train)
            db.flush()

        # Geofencing nearest station
        station = determine_nearest_station(db, train.id)
        
        # Resolve category
        category = db.query(ComplaintCategory).filter(
            ComplaintCategory.category_name == main_class.strip(),
            ComplaintCategory.subcategory_name == sub_class.strip()
        ).first()
        if not category:
            other_dept = db.query(Department).filter(Department.name == "Other").first()
            category = ComplaintCategory(
                category_name=main_class.strip(),
                subcategory_name=sub_class.strip(),
                department_id=other_dept.id if other_dept else 1,
                default_priority="Medium"
            )
            db.add(category)
            db.flush()

        # Map department and priority routing
        priority = category.default_priority
        dept_id = category.department_id

        # Map Division & Zone based on station location
        div_id = station.division_id if station else None

        complaint = Complaint(
            complaint_id=complaint_id,
            complaint_type="Train",
            phone_number=phone_number,
            pnr_number=pnr_number.strip() if pnr_number else None,
            train_id=train.id,
            train_number=train.train_number,
            coach_number=coach_number,
            station_id=station.id if station else None,
            category_id=category.id,
            incident_date=incident_date,
            incident_time=incident_time,
            complaint_description=complaint_description,
            status="Open",
            assigned_department_id=dept_id,
            assigned_division_id=div_id,
            priority=priority,
            complaint_source="Passenger Portal"
        )
        db.add(complaint)
        db.flush()

        # Add initial status history
        history = ComplaintStatusHistory(
            complaint_id=complaint_id,
            from_status="Open",
            to_status="Open",
            updated_by_user_id=1,  # Admin ID
            remarks="Grievance registered automatically."
        )
        db.add(history)

        db.commit()
        return {"status": "success", "complaint_id": complaint_id}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Submission error: {str(e)}")

@router.post("/api/v1/submit-station")
async def submit_station_complaint(
    phone_number: str = Form(...),
    station_name: str = Form(...),
    platform_number: Optional[str] = Form(None),
    main_class: str = Form(...),
    sub_class: str = Form(...),
    incident_datetime: str = Form(...),
    complaint_description: str = Form(...),
    db: Session = Depends(get_db)
):
    """Files a new Station Grievance, mapping divisions and departments."""
    try:
        complaint_id = generate_complaint_id(db)
        
        # Parse datetime-local input
        incident_date = date.today()
        incident_time = None
        if incident_datetime and "T" in incident_datetime:
            parts = incident_datetime.split("T")
            incident_date = datetime.strptime(parts[0], "%Y-%m-%d").date()
            incident_time = datetime.strptime(parts[1], "%H:%M").time()
            
        # Resolve Station
        clean_station_name = station_name.strip()
        match = re.search(r"\(([^)]+)\)$", clean_station_name)
        station = None
        if match:
            code = match.group(1).upper().strip()
            station = db.query(Station).filter(Station.station_code == code).first()
        if not station:
            station = db.query(Station).filter(
                (Station.station_name == clean_station_name) |
                (Station.station_name == clean_station_name.upper()) |
                (Station.station_code == clean_station_name.upper())
            ).first()
        if not station:
            cleaned_name_only = re.sub(r"\(.*?\)", "", clean_station_name).strip()
            station = db.query(Station).filter(
                (Station.station_name == cleaned_name_only) |
                (Station.station_name == cleaned_name_only.upper())
            ).first()
        if not station:
            station = Station(
                station_code=clean_station_name[:4].upper(),
                station_name=clean_station_name,
                division_id=1,  # Delhi Division fallback
                latitude=28.6143,
                longitude=77.2090,
                platforms_count=2
            )
            db.add(station)
            db.flush()

        # Resolve category
        category = db.query(ComplaintCategory).filter(
            ComplaintCategory.category_name == main_class.strip(),
            ComplaintCategory.subcategory_name == sub_class.strip()
        ).first()
        if not category:
            other_dept = db.query(Department).filter(Department.name == "Other").first()
            category = ComplaintCategory(
                category_name=main_class.strip(),
                subcategory_name=sub_class.strip(),
                department_id=other_dept.id if other_dept else 1,
                default_priority="Medium"
            )
            db.add(category)
            db.flush()

        # Priority & Department mapping
        priority = category.default_priority
        dept_id = category.department_id

        # Division mapping
        div_id = station.division_id

        complaint = Complaint(
            complaint_id=complaint_id,
            complaint_type="Station",
            phone_number=phone_number,
            station_id=station.id,
            platform_number=platform_number,
            category_id=category.id,
            incident_date=incident_date,
            incident_time=incident_time,
            complaint_description=complaint_description,
            status="Open",
            assigned_department_id=dept_id,
            assigned_division_id=div_id,
            priority=priority,
            complaint_source="Passenger Portal"
        )
        db.add(complaint)
        db.flush()

        # Add initial status history
        history = ComplaintStatusHistory(
            complaint_id=complaint_id,
            from_status="Open",
            to_status="Open",
            updated_by_user_id=1,  # Admin ID
            remarks="Grievance registered automatically."
        )
        db.add(history)

        db.commit()
        return {"status": "success", "complaint_id": complaint_id}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Submission error: {str(e)}")

@router.get("/track-api/{complaint_id}")
async def track_complaint_api(complaint_id: str, db: Session = Depends(get_db)):
    """Fetches details of a registered grievance by Complaint ID."""
    c = db.query(Complaint).filter(Complaint.complaint_id == complaint_id.strip()).first()
    if not c:
        raise HTTPException(status_code=404, detail="Complaint not found")
        
    return enrich_complaint_dict(c, db)

@router.post("/submit-feedback")
async def submit_feedback_api(
    complaint_id: str = Form(...),
    rating: Optional[str] = Form(None),
    feedback: Optional[str] = Form(None),
    db: Session = Depends(get_db)
):
    """Logs passenger rating and feedback comments."""
    c = db.query(Complaint).filter(Complaint.complaint_id == complaint_id.strip()).first()
    if not c:
        raise HTTPException(status_code=404, detail="Complaint not found")
        
    feedback_rec = db.query(Feedback).filter(Feedback.complaint_id == c.complaint_id).first()
    if not feedback_rec:
        feedback_rec = Feedback(
            complaint_id=c.complaint_id,
            rating=rating or "Satisfactory",
            feedback_text=feedback,
            created_at=datetime.now()
        )
        db.add(feedback_rec)
    else:
        feedback_rec.rating = rating or "Satisfactory"
        feedback_rec.feedback_text = feedback
        feedback_rec.created_at = datetime.now()
        
    db.commit()
    return {"status": "success", "message": "Feedback submitted successfully"}

@router.post("/api/v1/update-status")
async def update_status_api(request: Request, payload: UpdateStatusRequest, db: Session = Depends(get_db)):
    """Updates complaint resolution status and logs the history transition."""
    if not request.session.get("logged_in"):
        raise HTTPException(status_code=401, detail="Unauthorized")
        
    c = db.query(Complaint).filter(Complaint.complaint_id == payload.complaint_id.strip()).first()
    if not c:
        raise HTTPException(status_code=404, detail="Complaint not found")
        
    target_status = payload.status.strip()
    if target_status not in ["Open", "In Progress", "Resolved", "Closed"]:
        raise HTTPException(status_code=400, detail="Invalid status")
        
    user_id = request.session.get("user_id", 1)
    
    # Save change to status history
    history = ComplaintStatusHistory(
        complaint_id=c.complaint_id,
        from_status=c.status,
        to_status=target_status,
        updated_by_user_id=user_id,
        remarks=payload.remarks or "Status updated."
    )
    db.add(history)
    
    c.status = target_status
    if target_status in ["In Progress"]:
        if not c.assigned_at:
            c.assigned_at = datetime.utcnow()
    elif target_status in ["Resolved", "Closed"]:
        c.resolved_at = datetime.utcnow()
        
    db.commit()
    return {"status": "success", "message": "Status updated successfully"}

@router.get("/api/v1/stations")
async def get_stations_api(db: Session = Depends(get_db)):
    """Lists all seeded railway stations with code, name, and platforms count."""
    stations = db.query(Station).order_by(Station.station_name.asc()).all()
    return [
        {
            "id": s.id,
            "station_code": s.station_code,
            "station_name": f"{s.station_name} ({s.station_code})",
            "platforms_count": s.platforms_count
        }
        for s in stations
    ]
