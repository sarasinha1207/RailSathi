import os
import hashlib
from datetime import datetime, date, time
from fastapi import APIRouter, Depends, HTTPException, Request, Form
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from typing import Optional

from .database import get_db
from .models import Train, Passenger, PnrTicket, Department, ComplaintStatus, Complaint, Feedback, User
from .schemas import PnrResponse, ComplaintResponse, LoginRequest, UpdateStatusRequest, FeedbackCreate
from .config import settings

router = APIRouter()

def generate_complaint_id(db: Session, prefix: str = "CMP") -> str:
    """
    Generates a unique ID with a specific prefix (e.g. CMP)
    by counting the total number of complaints.
    """
    try:
        count = db.query(Complaint).count()
        # Generate ID matching sequence
        return f"{prefix}20240401{count + 1:05d}"
    except Exception as e:
        print(f"Error generating ID: {e}")
        # Fallback to random hash-based ID
        timestamp = int(datetime.now().timestamp())
        return f"{prefix}{timestamp}"

def enrich_complaint_dict(row_dict: dict) -> dict:
    """Dynamically derives department, priority, zone and division for analysis (matches Flask parity)."""
    category = row_dict.get("main_class", "").lower()
    department = "Other"
    priority = "Medium"
    
    # 1. Map Category (main_class) to Department & Priority
    if "security" in category or "theft" in category or "harassment" in category:
        department = "Security (RPF)"
        priority = "High"
    elif "cleanliness" in category or "dirty" in category or "toilet" in category or "waste" in category:
        department = "Mechanical (Cleanliness)"
        priority = "Low"
    elif "catering" in category or "food" in category or "water bottle" in category:
        department = "Commercial (Catering)"
        priority = "Medium"
    elif "electrical" in category or "ac" in category or "lighting" in category or "fan" in category or "charging" in category:
        department = "Electrical"
        priority = "Medium"
    elif "bed roll" in category or "linen" in category or "blanket" in category:
        department = "Mechanical (Coaching)"
        priority = "Low"
    elif "medical" in category or "emergency" in category or "first aid" in category:
        department = "Medical"
        priority = "High"
    elif "staff" in category or "behaviour" in category or "tte" in category:
        department = "Commercial (Staff)"
        priority = "Medium"
    elif "punctuality" in category or "delay" in category or "speed" in category:
        department = "Operating"
        priority = "Medium"
    elif "engineering" in category or "track" in category or "bridge" in category or "building" in category:
        department = "Engineering"
        priority = "Medium"
        
    # 2. Map Zone and Division (use database if present, otherwise fallback to hash)
    zone_code = row_dict.get("zone_code", "")
    zone_name = row_dict.get("zone_name", "")
    division_name = row_dict.get("division_name", "")
    
    complaint_id = row_dict.get("complaint_id", "")
    h = int(hashlib.md5(complaint_id.encode("utf-8")).hexdigest(), 16)

    if not zone_code or not division_name:
        zones_pool = [
            ("NR", "Northern Railway", ["Delhi", "Ambala", "Firozpur"]),
            ("WR", "Western Railway", ["Mumbai Central", "Ahmedabad", "Vadodara"]),
            ("SR", "Southern Railway", ["Chennai", "Madurai", "Palakkad"]),
            ("CR", "Central Railway", ["Mumbai CSMT", "Pune", "Solapur"]),
            ("NCR", "North Central Railway", ["Prayagraj", "Agra", "Jhansi"]),
            ("SCR", "South Central Railway", ["Secunderabad", "Hyderabad", "Nanded"]),
            ("ECR", "East Central Railway", ["Danapur", "Dhanbad", "Samastipur"]),
            ("SWR", "South Western Railway", ["Hubballi", "Bengaluru", "Mysuru"]),
            ("SCoR", "South Coast Railway", ["Visakhapatnam", "Vijayawada", "Guntakal"]),
            ("SER", "South Eastern Railway", ["Kharagpur", "Adra", "Chakradharpur"]),
            ("SECR", "South East Central Railway", ["Bilaspur", "Raipur", "Nagpur SECR"]),
            ("WCR", "West Central Railway", ["Jabalpur", "Bhopal", "Kota"])
        ]
        
        selected_zone = zones_pool[h % len(zones_pool)]
        zone_code = selected_zone[0]
        zone_name = selected_zone[1]
        divisions = selected_zone[2]
        division_name = divisions[(h // len(zones_pool)) % len(divisions)]
    
    # 3. Simulate In Progress / Resolved status for demo mapping
    status = row_dict.get("complaint_status", "Open")
    if status == "Open" and (h % 3 == 1):
        status = "In Progress"
    elif status == "Closed":
        status = "Resolved"
        
    row_dict["department"] = department
    row_dict["priority"] = priority
    row_dict["zone_code"] = zone_code
    row_dict["zone_name"] = zone_name
    row_dict["division_name"] = division_name
    row_dict["display_status"] = status
    
    return row_dict


@router.post("/api/v1/auth/login")
async def login_api(request: Request, payload: LoginRequest, db: Session = Depends(get_db)):
    """Handles Official / Admin login authentication."""
    user = db.query(User).filter(User.username == payload.username).first()
    if user and user.password_hash == payload.password:
        request.session["logged_in"] = True
        request.session["role"] = user.role
        request.session["username"] = user.username
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
        # Load feedback rating and comments if present
        feedback_val = ""
        rating_val = ""
        if c.feedback:
            feedback_val = c.feedback.feedback_text or ""
            rating_val = c.feedback.rating or ""
            
        row_dict = {
            "complaint_id": c.complaint_id,
            "complaint_type": c.complaint_type,
            "phone_number": c.phone_number,
            "pnr_number": c.pnr_number or "",
            "train_number": c.train_number or "",
            "coach_number": c.coach_number or "",
            "station_name": c.station_name or "",
            "platform_number": c.platform_number or "",
            "station_area": c.station_area or "",
            "main_class": c.main_class,
            "sub_class": c.sub_class,
            "incident_date": c.incident_date.strftime("%Y-%m-%d"),
            "incident_time": c.incident_time.strftime("%H:%M") if c.incident_time else "",
            "complaint_description": c.complaint_description,
            "complaint_status": c.status.name,
            "created_at": c.created_at.strftime("%Y-%m-%d %H:%M:%S"),
            "zone_code": c.zone_code or "",
            "zone_name": c.zone_name or "",
            "division_name": c.division_name or "",
            "remarks": c.remarks or "",
            "feedback": feedback_val,
            "rating": rating_val
        }
        
        results.append(enrich_complaint_dict(row_dict))
        
    return results


@router.get("/api/v1/pnr/{pnr_number}")
async def get_pnr_details(pnr_number: str, db: Session = Depends(get_db)):
    """Validates and fetches autocomplete PNR ticket reservation data."""
    ticket = db.query(PnrTicket).filter(PnrTicket.pnr_number == pnr_number.strip()).first()
    if not ticket:
        raise HTTPException(status_code=404, detail="PNR not found")
        
    return {
        "pnr_number": ticket.pnr_number,
        "train_number": ticket.train_number,
        "train_name": ticket.train.train_name if ticket.train else "Express",
        "coach_number": ticket.coach_number,
        "berth_number": ticket.berth_number,
        "boarding_station": ticket.boarding_station,
        "destination_station": ticket.destination_station,
        "journey_date": ticket.journey_date.strftime("%Y-%m-%d") if ticket.journey_date else "",
        "journey_class": ticket.journey_class
    }


@router.post("/api/v1/submit-train")
async def submit_train_complaint(
    phone_number: str = Form(...),
    pnr_number: Optional[str] = Form(None),
    train_number: str = Form(...),
    coach_number: Optional[str] = Form(None),
    main_class: str = Form(...),
    sub_class: str = Form(...),
    incident_datetime: str = Form(...),
    complaint_description: str = Form(...),
    db: Session = Depends(get_db)
):
    """Files a new Train Grievance."""
    try:
        complaint_id = generate_complaint_id(db)
        
        # Parse datetime-local input
        incident_date = date.today()
        incident_time = None
        if incident_datetime and "T" in incident_datetime:
            parts = incident_datetime.split("T")
            incident_date = datetime.strptime(parts[0], "%Y-%m-%d").date()
            incident_time = datetime.strptime(parts[1], "%H:%M").time()
            
        # Ensure passenger exists
        passenger = db.query(Passenger).filter(Passenger.phone_number == phone_number).first()
        if not passenger:
            passenger = Passenger(phone_number=phone_number)
            db.add(passenger)
            db.flush()
            
        # Ensure train exists
        # Split train number if it contains name
        train_num_clean = train_number.split(" - ")[0].strip()
        train = db.query(Train).filter(Train.train_number == train_num_clean).first()
        if not train:
            train_name_val = train_number.split(" - ")[1].strip() if " - " in train_number else "Express"
            train = Train(train_number=train_num_clean, train_name=train_name_val)
            db.add(train)
            db.flush()
            
        # Resolve status
        status_rec = db.query(ComplaintStatus).filter(ComplaintStatus.name == "Open").first()
        
        # Resolve department ID
        category = main_class.lower()
        dept_name = "Other"
        if "security" in category or "theft" in category or "harassment" in category:
            dept_name = "Security (RPF)"
        elif "cleanliness" in category or "dirty" in category or "toilet" in category or "waste" in category:
            dept_name = "Mechanical (Cleanliness)"
        elif "catering" in category or "food" in category or "water bottle" in category:
            dept_name = "Commercial (Catering)"
        elif "electrical" in category or "ac" in category or "lighting" in category or "fan" in category or "charging" in category:
            dept_name = "Electrical"
        elif "bed roll" in category or "linen" in category or "blanket" in category:
            dept_name = "Mechanical (Coaching)"
        elif "medical" in category or "emergency" in category or "first aid" in category:
            dept_name = "Medical"
        elif "staff" in category or "behaviour" in category or "tte" in category:
            dept_name = "Commercial (Staff)"
        elif "punctuality" in category or "delay" in category or "speed" in category:
            dept_name = "Operating"
        elif "engineering" in category or "track" in category or "bridge" in category or "building" in category:
            dept_name = "Engineering"
            
        dept_rec = db.query(Department).filter(Department.name == dept_name).first()
        
        # Calculate priority
        priority = "Medium"
        if "security" in category or "theft" in category or "harassment" in category:
            priority = "High"
        elif "cleanliness" in category or "dirty" in category or "toilet" in category or "waste" in category:
            priority = "Low"
        elif "bed roll" in category or "linen" in category or "blanket" in category:
            priority = "Low"
        elif "medical" in category or "emergency" in category or "first aid" in category:
            priority = "High"
            
        # Resolve dynamic Zone/Division based on Complaint ID parity hashes
        h = int(hashlib.md5(complaint_id.encode("utf-8")).hexdigest(), 16)
        zones_pool = [
            ("NR", "Northern Railway", ["Delhi", "Ambala", "Firozpur"]),
            ("WR", "Western Railway", ["Mumbai Central", "Ahmedabad", "Vadodara"]),
            ("SR", "Southern Railway", ["Chennai", "Madurai", "Palakkad"]),
            ("CR", "Central Railway", ["Mumbai CSMT", "Pune", "Solapur"])
        ]
        sel_zone = zones_pool[h % len(zones_pool)]
        
        complaint = Complaint(
            complaint_id=complaint_id,
            complaint_type="Train",
            phone_number=phone_number,
            pnr_number=pnr_number.strip() if pnr_number else None,
            train_number=train_num_clean,
            coach_number=coach_number,
            main_class=main_class,
            sub_class=sub_class,
            incident_date=incident_date,
            incident_time=incident_time,
            complaint_description=complaint_description,
            status_id=status_rec.id if status_rec else 1,
            department_id=dept_rec.id if dept_rec else None,
            priority=priority,
            created_at=datetime.now(),
            zone_code=sel_zone[0],
            zone_name=sel_zone[1],
            division_name=sel_zone[2][(h // len(zones_pool)) % len(sel_zone[2])]
        )
        
        db.add(complaint)
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
    station_area: Optional[str] = Form(None),
    main_class: str = Form(...),
    sub_class: str = Form(...),
    incident_datetime: str = Form(...),
    complaint_description: str = Form(...),
    db: Session = Depends(get_db)
):
    """Files a new Station Grievance."""
    try:
        complaint_id = generate_complaint_id(db)
        
        # Parse datetime-local input
        incident_date = date.today()
        incident_time = None
        if incident_datetime and "T" in incident_datetime:
            parts = incident_datetime.split("T")
            incident_date = datetime.strptime(parts[0], "%Y-%m-%d").date()
            incident_time = datetime.strptime(parts[1], "%H:%M").time()
            
        # Ensure passenger exists
        passenger = db.query(Passenger).filter(Passenger.phone_number == phone_number).first()
        if not passenger:
            passenger = Passenger(phone_number=phone_number)
            db.add(passenger)
            db.flush()
            
        # Resolve status
        status_rec = db.query(ComplaintStatus).filter(ComplaintStatus.name == "Open").first()
        
        # Resolve department
        category = main_class.lower()
        dept_name = "Other"
        if "security" in category or "theft" in category or "harassment" in category:
            dept_name = "Security (RPF)"
        elif "cleanliness" in category or "dirty" in category or "toilet" in category or "waste" in category:
            dept_name = "Mechanical (Cleanliness)"
        elif "catering" in category or "food" in category or "water bottle" in category:
            dept_name = "Commercial (Catering)"
        elif "electrical" in category or "ac" in category or "lighting" in category or "fan" in category or "charging" in category:
            dept_name = "Electrical"
        elif "bed roll" in category or "linen" in category or "blanket" in category:
            dept_name = "Mechanical (Coaching)"
        elif "medical" in category or "emergency" in category or "first aid" in category:
            dept_name = "Medical"
        elif "staff" in category or "behaviour" in category or "tte" in category:
            dept_name = "Commercial (Staff)"
        elif "punctuality" in category or "delay" in category or "speed" in category:
            dept_name = "Operating"
        elif "engineering" in category or "track" in category or "bridge" in category or "building" in category:
            dept_name = "Engineering"
            
        dept_rec = db.query(Department).filter(Department.name == dept_name).first()
        
        # Calculate priority
        priority = "Medium"
        if "security" in category or "theft" in category or "harassment" in category:
            priority = "High"
        elif "cleanliness" in category or "dirty" in category or "toilet" in category or "waste" in category:
            priority = "Low"
        elif "bed roll" in category or "linen" in category or "blanket" in category:
            priority = "Low"
        elif "medical" in category or "emergency" in category or "first aid" in category:
            priority = "High"
            
        # Resolve dynamic Zone/Division based on Complaint ID parity hashes
        h = int(hashlib.md5(complaint_id.encode("utf-8")).hexdigest(), 16)
        zones_pool = [
            ("NR", "Northern Railway", ["Delhi", "Ambala", "Firozpur"]),
            ("WR", "Western Railway", ["Mumbai Central", "Ahmedabad", "Vadodara"]),
            ("SR", "Southern Railway", ["Chennai", "Madurai", "Palakkad"]),
            ("CR", "Central Railway", ["Mumbai CSMT", "Pune", "Solapur"])
        ]
        sel_zone = zones_pool[h % len(zones_pool)]
        
        complaint = Complaint(
            complaint_id=complaint_id,
            complaint_type="Station",
            phone_number=phone_number,
            station_name=station_name,
            platform_number=platform_number,
            station_area=station_area,
            main_class=main_class,
            sub_class=sub_class,
            incident_date=incident_date,
            incident_time=incident_time,
            complaint_description=complaint_description,
            status_id=status_rec.id if status_rec else 1,
            department_id=dept_rec.id if dept_rec else None,
            priority=priority,
            created_at=datetime.now(),
            zone_code=sel_zone[0],
            zone_name=sel_zone[1],
            division_name=sel_zone[2][(h // len(zones_pool)) % len(sel_zone[2])]
        )
        
        db.add(complaint)
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
        
    # Read feedback details
    feedback_val = ""
    rating_val = ""
    if c.feedback:
        feedback_val = c.feedback.feedback_text or ""
        rating_val = c.feedback.rating or ""
        
    return {
        "complaint_id": c.complaint_id,
        "complaint_type": c.complaint_type,
        "phone_number": c.phone_number,
        "pnr_number": c.pnr_number or "",
        "train_number": c.train_number or "",
        "coach_number": c.coach_number or "",
        "station_name": c.station_name or "",
        "platform_number": c.platform_number or "",
        "station_area": c.station_area or "",
        "main_class": c.main_class,
        "sub_class": c.sub_class,
        "incident_date": c.incident_date.strftime("%Y-%m-%d"),
        "incident_time": c.incident_time.strftime("%H:%M") if c.incident_time else "",
        "complaint_description": c.complaint_description,
        "complaint_status": c.status.name,
        "created_at": c.created_at.strftime("%Y-%m-%d %H:%M:%S"),
        "zone_code": c.zone_code or "",
        "zone_name": c.zone_name or "",
        "division_name": c.division_name or "",
        "remarks": c.remarks or "",
        "feedback": feedback_val,
        "rating": rating_val
    }


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
            rating=rating,
            feedback_text=feedback,
            created_at=datetime.now()
        )
        db.add(feedback_rec)
    else:
        feedback_rec.rating = rating
        feedback_rec.feedback_text = feedback
        feedback_rec.created_at = datetime.now()
        
    db.commit()
    return {"status": "success", "message": "Feedback submitted successfully"}
