CATEGORY_CODE_MAP = {
    ("bed roll", "dirty / torn"): "BED_DIRTY/TORN",
    ("bed roll", "non availability"): "BED_NOT_AVAIL",
    ("bed roll", "others"): "BED_OTHER",
    ("bed roll", "overcharging"): "BED_OVERCHARGE",

    ("catering & vending services", "e-catering"): "CAT_ECATER",
    ("catering & vending services", "food & water not available"): "CAT_FOOD_WATER",
    ("catering & vending services", "food quality"): "CAT_FOOD_QLTY",
    ("catering & vending services", "food quality & quantity"): "CAT_FOOD_QLTY_QTY",
    ("catering & vending services", "food quantity"): "CAT_FOOD_QTY",
    ("catering & vending services", "hygiene"): "CAT_HYGIENE",
    ("catering & vending services", "others"): "CAT_OTHER",
    ("catering & vending services", "overcharging"): "CAT_OVERCHARGE",
    ("catering & vending services", "service quality"): "CAT_SERVICE",
    ("catering & vending services", "service quality & hygiene"): "CAT_SERVICE_HYGIENE",

    ("cleanliness", "others"): "CLN_OTHER",
    ("cleanliness", "platform"): "CLN_PLATFORM",
    ("cleanliness", "stalls"): "CLN_STALL",
    ("cleanliness", "station entrance / building"): "CLN_ENTRANCE",
    ("cleanliness", "toilet"): "CLN_TOILET",
    ("cleanliness", "waiting room / retiring room"): "CLN_WAITING_ROOM",

    ("coach - cleanliness", "coach exterior"): "COACH_EXT_CLEAN",
    ("coach - cleanliness", "coach interior"): "COACH_INT_CLEAN",
    ("coach - cleanliness", "cockroach / rodents"): "COACH_PEST",
    ("coach - cleanliness", "others"): "COACH_OTHER",
    ("coach - cleanliness", "toilet"): "COACH_TOILET",
    ("coach - cleanliness", "washbasin"): "COACH_WASHBASIN",

    ("coach - maintenance", "broken/missing toilet fittings"): "COACH_TOILET_BROKEN",
    ("coach - maintenance", "jerks/abnormal sound"): "COACH_JERK_SOUND",
    ("coach - maintenance", "others"): "COACH_OTHER_MAINT",
    ("coach - maintenance", "tap leaking/tap not working"): "COACH_TAP_LEAK",
    ("coach - maintenance", "window/door locking problem"): "COACH_DOOR_WINDOW",
    ("coach - maintenance", "window/seat broken"): "COACH_SEAT_WINDOW",

    ("corruption / bribery", "corruption / bribery"): "CORRUPTION",

    ("divyangjan facilities", "braille signage in coach"): "DIV_BRAILLE",
    ("divyangjan facilities", "divyangjan coach unavailability"): "DIV_COACH",
    ("divyangjan facilities", "divyangjan toilet /washbasin"): "DIV_TOILET",
    ("divyangjan facilities", "others"): "DIV_OTHER",
    ("divyangjan facilities", "low height ticket counter"): "DIV_TICKET_COUNTER",
    ("divyangjan facilities", "low height water booth"): "DIV_WATER_BOOTH",
    ("divyangjan facilities", "low seat toilet"): "DIV_LOW_TOILET",
    ("divyangjan facilities", "parking"): "DIV_PARKING",
    ("divyangjan facilities", "ramp at entry/exit gates"): "DIV_RAMP",
    ("divyangjan facilities", "seating arrangement at station/waiting area"): "DIV_SEATING",
    ("divyangjan facilities", "tactile pathway"): "DIV_TACTILE",
    ("divyangjan facilities", "travel concession"): "DIV_CONCESSION",
    ("divyangjan facilities", "wheel chair/battery operated car/divyang sahayak (on payment, feasible)"): "DIV_WHEELCHAIR",

    ("electrical equipment", "air conditioner"): "ELEC_AC",
    ("electrical equipment", "charging points"): "ELEC_CHARGING",
    ("electrical equipment", "fans"): "ELEC_FAN",
    ("electrical equipment", "lights"): "ELEC_LIGHT",
    ("electrical equipment", "others"): "ELEC_OTHER",
    ("electrical equipment", "display / coach indicator board"): "ELEC_DISPLAY",
    ("electrical equipment", "fans / lights"): "ELEC_FAN_LIGHT",
    ("electrical equipment", "lifts / escalators"): "ELEC_LIFT",

    ("facilities for women with special needs", "baby food"): "FAC_BABY_FOOD",
    ("facilities for women with special needs", "others"): "FAC_OTHER",
    ("facilities for women with special needs", "segregated area for lactating mothers in waiting hall"): "FAC_SEGREGATED_AREA",

    ("goods", "booking"): "GOODS_BOOKING",
    ("goods", "delivery"): "GOODS_DELIVERY",
    ("goods", "demurrage / wharfage"): "GOODS_DEMURRAGE",
    ("goods", "freight facilitation"): "GOODS_FREIGHT",
    ("goods", "others"): "GOODS_OTHER",
    ("goods", "overcharging"): "GOODS_OVERCHARGE",
    ("goods", "staff not available"): "GOODS_NO_STAFF",
    ("goods", "touts"): "GOODS_TOUT",

    ("luggage / parcels", "booking"): "LUG_BOOKING",
    ("luggage / parcels", "delivery"): "LUG_DELIVERY",
    ("luggage / parcels", "others"): "LUG_OTHER",
    ("luggage / parcels", "overcharging"): "LUG_OVERCHARGE",
    ("luggage / parcels", "parcel facilitation"): "LUG_PARCEL",
    ("luggage / parcels", "staff not available"): "LUG_NO_STAFF",
    ("luggage / parcels", "touts"): "LUG_TOUT",

    ("medical assistance", "medical assistance"): "MED_ASSISTANCE",
    ("miscellaneous", "miscellaneous"): "MISC",

    ("passenger amenities", "139"): "PASS_139",
    ("passenger amenities", "benches/sheds"): "PASS_BENCH_SHED",
    ("passenger amenities", "enquiry office/inadequate counter"): "PASS_ENQUIRY",
    ("passenger amenities", "foot over/under bridge"): "PASS_FOOT_BRIDGE",
    ("passenger amenities", "others"): "PASS_OTHER",
    ("passenger amenities", "pa (public announcement) system"): "PASS_ANNOUNCEMENT",
    ("passenger amenities", "parking"): "PASS_PARKING",
    ("passenger amenities", "wi-fi"): "PASS_WIFI",

    ("punctuality", "late running"): "PUNC_LATE",
    ("punctuality", "ntes app"): "PUNC_NTES",
    ("punctuality", "others"): "PUNC_OTHER",

    ("refund of tickets", "counter ticket"): "REFUND_COUNTER",
    ("refund of tickets", "online ticket"): "REFUND_ONLINE",
    ("refund of tickets", "others"): "REFUND_OTHER",

    ("reserved ticketing", "e-ticketing"): "RES_E_TICKET",
    ("reserved ticketing", "inadequate counters"): "RES_COUNTER",
    ("reserved ticketing", "others"): "RES_OTHER",
    ("reserved ticketing", "overcharging"): "RES_OVERCHARGE",
    ("reserved ticketing", "tatkal"): "RES_TATKAL",
    ("reserved ticketing", "touts"): "RES_TOUT",

    ("security", "dacoity/robbery/murder/riots"): "SEC_ROBBERY",
    ("security", "eve-teasing"): "SEC_EVE_TEASING",
    ("security", "eveteasing/misbehaviour with lady passengers/rape"): "SEC_EVE_MISBEHAV",
    ("security", "harassment/extortion by security personnel/railway personnel"): "SEC_HARASS",
    ("security", "luggage left behind/unclaimed/suspected articles"): "SEC_LUGGAGE_LEFT",
    ("security", "misbehaviour"): "SEC_MISBEHAV",
    ("security", "misbehaviour with lady passenger"): "SEC_MISBEHAV_LADY",
    ("security", "misbehaviour with lady passengers"): "SEC_MISBEHAV_LADY_2",
    ("security", "nuisance by hawkers/beggar/eunuch"): "SEC_HAWKER",
    ("security", "nuisance by passenger"): "SEC_PASSENGER_NUISANCE",
    ("security", "others"): "SEC_OTHER",
    ("security", "passenger missing/not responding call"): "SEC_PASS_MISSING",
    ("security", "passenger fallen down"): "SEC_PASS_FALL",
    ("security", "quarrelling/hooliganism"): "SEC_HOOLIGAN",
    ("security", "rape"): "SEC_RAPE",
    ("security", "smoking/drinking alcohol/narcotics"): "SEC_SMOKING_DRINKING",
    ("security", "theft of passengers belongings/snatching"): "SEC_THEFT",
    ("security", "unauthorized person in ladies/disabled coach/slr/reserve coach"): "SEC_UNAUTHORIZED",

    ("staff behaviour", "staff behaviour"): "STAFF_BEHAV",

    ("unreserved ticketing", "atvm"): "UNRES_ATVM",
    ("unreserved ticketing", "inadequate counters"): "UNRES_COUNTER",
    ("unreserved ticketing", "mst"): "UNRES_MST",
    ("unreserved ticketing", "others"): "UNRES_OTHER",
    ("unreserved ticketing", "overcharging"): "UNRES_OVERCHARGE",
    ("unreserved ticketing", "uts app login issue"): "UNRES_APP_LOGIN",
    ("unreserved ticketing", "uts app mobile handset change"): "UNRES_APP_MOBILE",
    ("unreserved ticketing", "uts rwallet"): "UNRES_R_WALLET",
    ("unreserved ticketing", "uts/atvm - digital payment"): "UNRES_DIGITAL_PAY",

    ("water availability", "others"): "WATER_OTHER",
    ("water availability", "packaged drinking water / rail neer"): "WATER_PACKAGED",
    ("water availability", "toilet"): "WATER_TOILET",
    ("water availability", "washbasin"): "WATER_WASHBASIN",
    ("water availability", "drinking water at platform"): "WATER_PLATFORM",
    ("water availability", "retiring room / waiting room"): "WATER_RETIRING_ROOM",
    ("water availability", "water vending machines"): "WATER_VENDING",
}

import math
import re
from datetime import datetime, date, time
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Form, Request
from sqlalchemy.orm import Session
from .database import get_db
from .schemas import ComplaintResponse, PnrResponse, LoginRequest, UpdateStatusRequest
from .models import (
    User, Zone, Division, Station, Train, TrainRoute,
    PnrBooking, Department, ComplaintCategory, Staff, StaffGpsLocation,
    Complaint, Feedback, ComplaintStatusHistory, OtpVerification, Notification
)

router = APIRouter()


def generate_complaint_id(db: Session) -> str:
    """Generates a unique complaint ID based on date and a sequential counter."""
    today_str = datetime.now().strftime("%Y%m%d")
    count = db.query(Complaint).filter(Complaint.complaint_id.like(f"CMP{today_str}%")).count()
    return f"CMP{today_str}{10000 + count + 1}"


def make_category_code(cat_name: str, sub_name: str) -> str:
    key = (cat_name.lower().strip(), sub_name.lower().strip())
    if key in CATEGORY_CODE_MAP:
        return CATEGORY_CODE_MAP[key]
    def clean(s):
        s = s.upper().strip()
        s = re.sub(r"[^A-Z0-9/]", "_", s)
        s = re.sub(r"_+", "_", s).strip("_")
        return s
    return f"{clean(cat_name)[:12]}_{clean(sub_name)[:20]}"


def enrich_complaint_dict(c: Complaint, db: Session) -> dict:
    """Converts a Complaint model to a flat dashboard-compatible dictionary."""
    feedback_val, rating_val = "", ""
    if c.feedback:
        feedback_val = c.feedback.feedback_text or ""
        rating_val   = c.feedback.rating or ""
    latest_history = db.query(ComplaintStatusHistory).filter(
        ComplaintStatusHistory.complaint_id == c.complaint_id
    ).order_by(ComplaintStatusHistory.updated_at.desc()).first()
    remarks_val = latest_history.remarks if latest_history else ""
    return {
        "complaint_id":            c.complaint_id,
        "complaint_type":          c.complaint_type,
        "phone_number":            c.phone_number,
        "pnr_number":              c.pnr_number or "",
        "train_number":            c.train_number or "",
        "coach_number":            c.coach_number or "",
        "station_name":            c.station.station_name if c.station else "",
        "platform_number":         c.platform_number or "",
        "station_area":            "",
        "main_class":              c.category.category_name    if c.category else "Other",
        "sub_class":               c.category.subcategory_name if c.category else "General",
        "verified_category_code":  c.verified_category_code or "",
        "verified_category_name":  c.verified_category.category_name if c.verified_category else "",
        "verified_subcategory":   c.verified_category.subcategory_name if c.verified_category else "",
        "verified_by_user_id":     c.verified_by_user_id or "",
        "verification_remarks":    c.verification_remarks or "",
        "incident_date":           c.incident_date.strftime("%Y-%m-%d"),
        "incident_time":           c.incident_time.strftime("%H:%M") if c.incident_time else "",
        "complaint_description":   c.complaint_description,
        "internal_status":         c.internal_status,
        "complaint_status":        c.passenger_status,
        "passenger_status":        c.passenger_status,
        "display_status":          c.passenger_status,
        "is_critical":             c.is_critical,
        "created_at":              c.created_at.strftime("%Y-%m-%d %H:%M:%S"),
        "zone_code":               c.assigned_division.zone.zone_code if (c.assigned_division and c.assigned_division.zone) else "",
        "zone_name":               c.assigned_division.zone.zone_name if (c.assigned_division and c.assigned_division.zone) else "",
        "division_name":           c.assigned_division.division_name if c.assigned_division else "",
        "remarks":                 remarks_val,
        "feedback":                feedback_val,
        "rating":                  rating_val,
        "department":              c.assigned_department.department_name if c.assigned_department else "Other",
        "priority":                c.priority,
        "assigned_staff_id":      c.assigned_staff_id or "",
        "resolution_remarks":      c.resolution_remarks or "",
    }


def haversine_distance(lat1, lon1, lat2, lon2):
    R = 6371.0
    rlat1, rlon1 = math.radians(lat1), math.radians(lon1)
    rlat2, rlon2 = math.radians(lat2), math.radians(lon2)
    a = math.sin((rlat2-rlat1)/2)**2 + math.cos(rlat1)*math.cos(rlat2)*math.sin((rlon2-rlon1)/2)**2
    return R * 2 * math.asin(math.sqrt(a))


def determine_nearest_station(db: Session, train_number: str) -> Station:
    """Nearest station via staff GPS, route schedule, or source station fallback."""
    staff_member = db.query(Staff).filter(
        Staff.active_train_number == train_number, Staff.is_on_duty == True
    ).first()
    if staff_member:
        gps = db.query(StaffGpsLocation).filter(StaffGpsLocation.staff_id == staff_member.staff_id).first()
        if gps:
            if gps.current_station_code:
                s = db.query(Station).filter(Station.station_code == gps.current_station_code).first()
                if s: return s
            sts = db.query(Station).all()
            if sts:
                nearest, md = None, float("inf")
                for st in sts:
                    d = haversine_distance(float(gps.latitude), float(gps.longitude), float(st.latitude), float(st.longitude))
                    if d < md: md, nearest = d, st
                if nearest:
                    gps.current_station_code = nearest.station_code
                    db.commit()
                    return nearest
    routes = db.query(TrainRoute).filter(TrainRoute.train_number == train_number).order_by(TrainRoute.stop_sequence).all()
    if routes:
        ct = datetime.now().time()
        nr, md = None, float("inf")
        for r in routes:
            st_time = r.departure_time or r.arrival_time
            if st_time:
                diff = abs((ct.hour*60+ct.minute)-(st_time.hour*60+st_time.minute))
                if diff < md: md, nr = diff, r
        if nr:
            s = db.query(Station).filter(Station.station_code == nr.station_code).first()
            if s: return s
    train = db.query(Train).filter(Train.train_number == train_number).first()
    if train:
        s = db.query(Station).filter(Station.station_code == train.source_station_code).first()
        if s: return s
    return db.query(Station).filter(Station.station_code == "NDLS").first()


# Auth Routes
@router.post("/api/v1/auth/login")
async def login_api(request: Request, payload: LoginRequest, db: Session = Depends(get_db)):
    """Handles Official / Admin login authentication."""
    user = db.query(User).filter(User.username == payload.username).first()
    if user and user.password_hash == payload.password:
        request.session["logged_in"] = True
        request.session["role"]      = user.role
        request.session["username"]  = user.username
        request.session["user_id"]   = user.user_id
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
    if not request.session.get("logged_in"): return {"logged_in": False}
    return {"logged_in": True, "username": request.session.get("username"), "role": request.session.get("role")}


# Dashboard
@router.get("/api/v1/dashboard/complaints")
async def get_dashboard_complaints(request: Request, db: Session = Depends(get_db)):
    """Fetches complaints dataset for dashboard charts (requires auth)."""
    if not request.session.get("logged_in"): raise HTTPException(status_code=401, detail="Unauthorized")
    return [enrich_complaint_dict(c, db) for c in db.query(Complaint).all()]


# PNR Lookup
@router.get("/api/v1/pnr/{pnr_number}")
async def get_pnr_details(pnr_number: str, db: Session = Depends(get_db)):
    """Validates and fetches PNR ticket reservation data."""
    ticket = db.query(PnrBooking).filter(PnrBooking.pnr_number == pnr_number.strip()).first()
    if not ticket: raise HTTPException(status_code=404, detail="PNR not found")
    return {
        "pnr_number":          ticket.pnr_number,
        "train_number":        ticket.train.train_number if ticket.train else "",
        "train_name":          ticket.train.train_name   if ticket.train else "Express",
        "coach_number":        ticket.coach_number,
        "berth_number":        ticket.seat_number,
        "boarding_station":    ticket.boarding_station.station_name    if ticket.boarding_station    else "",
        "destination_station": ticket.destination_station.station_name if ticket.destination_station else "",
        "journey_date":        ticket.journey_date.strftime("%Y-%m-%d") if ticket.journey_date else "",
        "journey_class":       ticket.journey_class,
        "phone_number":        ticket.phone_number,
    }


# Train Complaint
@router.post("/api/v1/submit-train")
async def submit_train_complaint(
    phone_number:          str           = Form(...),
    pnr_number:            str           = Form(...),
    train_number:          str           = Form(...),
    coach_number:          Optional[str] = Form(None),
    main_class:            str           = Form(...),
    sub_class:             str           = Form(...),
    incident_datetime:     str           = Form(...),
    complaint_description: str           = Form(...),
    db: Session = Depends(get_db),
):
    """Files a new Train Grievance."""
    try:
        complaint_id  = generate_complaint_id(db)
        incident_date = date.today()
        incident_time = None
        if incident_datetime and "T" in incident_datetime:
            p = incident_datetime.split("T")
            incident_date = datetime.strptime(p[0], "%Y-%m-%d").date()
            incident_time = datetime.strptime(p[1], "%H:%M").time()
        train_num_clean = train_number.split(" - ")[0].strip()
        train = db.query(Train).filter(Train.train_number == train_num_clean).first()
        if not train:
            tname = train_number.split(" - ")[1].strip() if " - " in train_number else "Express"
            train = Train(train_number=train_num_clean, train_name=tname, source_station_code="NDLS", destination_station_code="BPL")
            db.add(train); db.flush()
        station  = determine_nearest_station(db, train.train_number)
        cat_code = make_category_code(main_class.strip(), sub_class.strip())
        category = db.query(ComplaintCategory).filter(ComplaintCategory.category_code == cat_code).first()
        if not category:
            category = db.query(ComplaintCategory).filter(
                ComplaintCategory.category_name    == main_class.strip(),
                ComplaintCategory.subcategory_name == sub_class.strip(),
            ).first()
        if not category:
            od = db.query(Department).filter(Department.department_code == "OTHER").first()
            category = ComplaintCategory(
                category_code=cat_code, category_name=main_class.strip(),
                subcategory_name=sub_class.strip(),
                department_code=od.department_code if od else "OTHER", default_priority="Medium",)
            db.add(category); db.flush()
        complaint = Complaint(
            complaint_id=complaint_id, complaint_type="Train", phone_number=phone_number,
            pnr_number=pnr_number.strip() if pnr_number else None,
            train_number=train.train_number, coach_number=coach_number,
            station_code=station.station_code if station else None,
            category_code=category.category_code, incident_date=incident_date, incident_time=incident_time,
            complaint_description=complaint_description, internal_status="Pending Review",
            assigned_department_code=category.department_code,
            assigned_division_code=station.division_code if station else None,
            priority=category.default_priority, complaint_source="Passenger Portal",)
        db.add(complaint); db.flush()
        db.add(ComplaintStatusHistory(complaint_id=complaint_id, from_status=None, to_status="Pending Review", updated_by_user_id=None, remarks="Grievance registered by passenger."))
        db.commit()
        return {"status": "success", "complaint_id": complaint_id, "passenger_status": "OPEN"}
    except Exception as e:
        db.rollback(); raise HTTPException(status_code=500, detail=f"Submission error: {str(e)}")


# Station Complaint
@router.post("/api/v1/submit-station")
async def submit_station_complaint(
    phone_number:          str           = Form(...),
    station_name:          str           = Form(...),
    platform_number:       Optional[str] = Form(None),
    main_class:            str           = Form(...),
    sub_class:             str           = Form(...),
    incident_datetime:     str           = Form(...),
    complaint_description: str           = Form(...),
    db: Session = Depends(get_db),
):
    """Files a new Station Grievance."""
    try:
        complaint_id  = generate_complaint_id(db)
        incident_date = date.today()
        incident_time = None
        if incident_datetime and "T" in incident_datetime:
            p = incident_datetime.split("T")
            incident_date = datetime.strptime(p[0], "%Y-%m-%d").date()
            incident_time = datetime.strptime(p[1], "%H:%M").time()
        cn = station_name.strip()
        m  = re.search(r"\(([^)]+)\)$", cn)
        station = None
        if m:
            station = db.query(Station).filter(Station.station_code == m.group(1).upper().strip()).first()
        if not station:
            station = db.query(Station).filter(
                (Station.station_name == cn)|(Station.station_name == cn.upper())|(Station.station_code == cn.upper())
            ).first()
        if not station:
            co = re.sub(r"\(.*?\)", "", cn).strip()
            station = db.query(Station).filter(
                (Station.station_name == co)|(Station.station_name == co.upper())
            ).first()
        if not station:
            sc = cn[:4].upper()
            station = Station(station_code=sc, station_name=cn, division_code="DLI", latitude=28.6143, longitude=77.2090, platforms_count=2)
            db.add(station); db.flush()
        cat_code = make_category_code(main_class.strip(), sub_class.strip())
        category = db.query(ComplaintCategory).filter(ComplaintCategory.category_code == cat_code).first()
        if not category:
            category = db.query(ComplaintCategory).filter(
                ComplaintCategory.category_name    == main_class.strip(),
                ComplaintCategory.subcategory_name == sub_class.strip(),
            ).first()
        if not category:
            od = db.query(Department).filter(Department.department_code == "OTHER").first()
            category = ComplaintCategory(
                category_code=cat_code, category_name=main_class.strip(),
                subcategory_name=sub_class.strip(),
                department_code=od.department_code if od else "OTHER", default_priority="Medium",)
            db.add(category); db.flush()
        complaint = Complaint(
            complaint_id=complaint_id, complaint_type="Station", phone_number=phone_number,
            station_code=station.station_code, platform_number=platform_number,
            category_code=category.category_code, incident_date=incident_date, incident_time=incident_time,
            complaint_description=complaint_description, internal_status="Pending Review",
            assigned_department_code=category.department_code, assigned_division_code=station.division_code,
            priority=category.default_priority, complaint_source="Passenger Portal",)
        db.add(complaint); db.flush()
        db.add(ComplaintStatusHistory(complaint_id=complaint_id, from_status=None, to_status="Pending Review", updated_by_user_id=None, remarks="Grievance registered by passenger."))
        db.commit()
        return {"status": "success", "complaint_id": complaint_id, "passenger_status": "OPEN"}
    except Exception as e:
        db.rollback(); raise HTTPException(status_code=500, detail=f"Submission error: {str(e)}")


# Tracking
@router.get("/track-api/{complaint_id}")
async def track_complaint_api(complaint_id: str, db: Session = Depends(get_db)):
    """Fetches grievance details by Complaint ID."""
    c = db.query(Complaint).filter(Complaint.complaint_id == complaint_id.strip()).first()
    if not c: raise HTTPException(status_code=404, detail="Complaint not found")
    return enrich_complaint_dict(c, db)


# Feedback
@router.post("/submit-feedback")
async def submit_feedback_api(
    complaint_id: str           = Form(...),
    rating:       Optional[str] = Form(None),
    feedback:     Optional[str] = Form(None),
    db: Session = Depends(get_db),
):
    """Logs passenger rating and feedback comments."""
    c = db.query(Complaint).filter(Complaint.complaint_id == complaint_id.strip()).first()
    if not c: raise HTTPException(status_code=404, detail="Complaint not found")
    fr = db.query(Feedback).filter(Feedback.complaint_id == c.complaint_id).first()
    if fr:
        raise HTTPException(status_code=400, detail="Feedback already submitted for this complaint")
    fr = Feedback(complaint_id=c.complaint_id, rating=rating or "Satisfactory", feedback_text=feedback, created_at=datetime.now())
    db.add(fr)
    db.commit()
    return {"status": "success", "message": "Feedback submitted successfully"}


# Status Update
@router.post("/api/v1/update-status")
async def update_status_api(request: Request, payload: UpdateStatusRequest, db: Session = Depends(get_db)):
    """Updates complaint resolution status."""
    if not request.session.get("logged_in"): raise HTTPException(status_code=401, detail="Unauthorized")
    c = db.query(Complaint).filter(Complaint.complaint_id == payload.complaint_id.strip()).first()
    if not c: raise HTTPException(status_code=404, detail="Complaint not found")
    ts = payload.status.strip()
    if ts not in ["Open","In Progress","Resolved","Closed"]: raise HTTPException(status_code=400, detail="Invalid status")
    uid = request.session.get("user_id", "USR_ADMIN")
    db.add(ComplaintStatusHistory(complaint_id=c.complaint_id, from_status=c.status, to_status=ts, updated_by_user_id=uid, remarks=payload.remarks or "Status updated."))
    c.status = ts
    if ts == "In Progress" and not c.assigned_at: c.assigned_at = datetime.utcnow()
    elif ts in ["Resolved","Closed"]: c.resolved_at = datetime.utcnow()
    db.commit()
    return {"status": "success", "message": "Status updated successfully"}


# Station Autocomplete
@router.get("/api/v1/stations")
async def get_stations_api(db: Session = Depends(get_db)):
    """Lists all seeded railway stations."""
    stations = db.query(Station).order_by(Station.station_name.asc()).all()
    return [
        {"station_code": s.station_code, "station_name": f"{s.station_name} ({s.station_code})", "platforms_count": s.platforms_count}
        for s in stations
    ]


# Trains Autocomplete / List
@router.get("/api/v1/trains")
async def get_trains_api(db: Session = Depends(get_db)):
    """Lists all seeded railway trains."""
    trains = db.query(Train).order_by(Train.train_number.asc()).all()
    return [
        {"train_number": t.train_number, "train_name": t.train_name}
        for t in trains
    ]


# ---------------------------------------------------------------------------
# Phase 2 Lifecycle Endpoints
# ---------------------------------------------------------------------------
from .schemas import (
    VerifyComplaintRequest, AssignComplaintRequest, RequestReassignmentRequest,
    ReassignComplaintRequest, EscalateComplaintRequest, ResolveComplaintRequest
)
from .services import (
    verify_complaint_service, assign_complaint_service, accept_assignment_service,
    start_work_service, request_reassignment_service, reassign_complaint_service,
    escalate_complaint_service, resolve_complaint_service
)


@router.post("/api/v1/officer/complaints/{complaint_id}/verify")
async def verify_complaint_endpoint(
    complaint_id: str,
    payload: VerifyComplaintRequest,
    request: Request,
    db: Session = Depends(get_db)
):
    if not request.session.get("logged_in"):
        raise HTTPException(status_code=401, detail="Authentication required")
    officer_user_id = request.session.get("user_id")
    c = verify_complaint_service(
        db=db,
        complaint_id=complaint_id,
        officer_user_id=officer_user_id,
        verified_category_code=payload.verified_category_code,
        priority=payload.priority,
        is_critical=payload.is_critical,
        verification_remarks=payload.verification_remarks
    )
    return {"status": "success", "message": "Complaint verified successfully", "data": enrich_complaint_dict(c, db)}


@router.post("/api/v1/officer/complaints/{complaint_id}/assign")
async def assign_complaint_endpoint(
    complaint_id: str,
    payload: AssignComplaintRequest,
    request: Request,
    db: Session = Depends(get_db)
):
    if not request.session.get("logged_in"):
        raise HTTPException(status_code=401, detail="Authentication required")
    officer_user_id = request.session.get("user_id")
    c = assign_complaint_service(
        db=db,
        complaint_id=complaint_id,
        officer_user_id=officer_user_id,
        staff_id=payload.staff_id
    )
    return {"status": "success", "message": "Complaint assigned successfully", "data": enrich_complaint_dict(c, db)}


@router.post("/api/v1/staff/complaints/{complaint_id}/accept")
async def accept_assignment_endpoint(
    complaint_id: str,
    request: Request,
    db: Session = Depends(get_db)
):
    if not request.session.get("logged_in"):
        raise HTTPException(status_code=401, detail="Authentication required")
    staff_user_id = request.session.get("user_id")
    c = accept_assignment_service(
        db=db,
        complaint_id=complaint_id,
        staff_user_id=staff_user_id
    )
    return {"status": "success", "message": "Assignment accepted successfully", "data": enrich_complaint_dict(c, db)}


@router.post("/api/v1/staff/complaints/{complaint_id}/start")
async def start_work_endpoint(
    complaint_id: str,
    request: Request,
    db: Session = Depends(get_db)
):
    if not request.session.get("logged_in"):
        raise HTTPException(status_code=401, detail="Authentication required")
    staff_user_id = request.session.get("user_id")
    c = start_work_service(
        db=db,
        complaint_id=complaint_id,
        staff_user_id=staff_user_id
    )
    return {"status": "success", "message": "Work started on complaint", "data": enrich_complaint_dict(c, db)}


@router.post("/api/v1/staff/complaints/{complaint_id}/request-reassignment")
async def request_reassignment_endpoint(
    complaint_id: str,
    payload: RequestReassignmentRequest,
    request: Request,
    db: Session = Depends(get_db)
):
    if not request.session.get("logged_in"):
        raise HTTPException(status_code=401, detail="Authentication required")
    staff_user_id = request.session.get("user_id")
    c = request_reassignment_service(
        db=db,
        complaint_id=complaint_id,
        staff_user_id=staff_user_id,
        reason=payload.reason
    )
    return {"status": "success", "message": "Reassignment requested", "data": enrich_complaint_dict(c, db)}


@router.post("/api/v1/officer/complaints/{complaint_id}/reassign")
async def reassign_complaint_endpoint(
    complaint_id: str,
    payload: ReassignComplaintRequest,
    request: Request,
    db: Session = Depends(get_db)
):
    if not request.session.get("logged_in"):
        raise HTTPException(status_code=401, detail="Authentication required")
    officer_user_id = request.session.get("user_id")
    c = reassign_complaint_service(
        db=db,
        complaint_id=complaint_id,
        officer_user_id=officer_user_id,
        new_staff_id=payload.new_staff_id,
        reason=payload.reason
    )
    return {"status": "success", "message": "Complaint reassigned successfully", "data": enrich_complaint_dict(c, db)}


@router.post("/api/v1/officer/complaints/{complaint_id}/escalate")
async def escalate_complaint_endpoint(
    complaint_id: str,
    payload: EscalateComplaintRequest,
    request: Request,
    db: Session = Depends(get_db)
):
    if not request.session.get("logged_in"):
        raise HTTPException(status_code=401, detail="Authentication required")
    officer_user_id = request.session.get("user_id")
    c = escalate_complaint_service(
        db=db,
        complaint_id=complaint_id,
        officer_user_id=officer_user_id,
        reason=payload.reason,
        escalated_to_role=payload.escalated_to_role or "Admin"
    )
    return {"status": "success", "message": "Complaint escalated successfully", "data": enrich_complaint_dict(c, db)}


@router.post("/api/v1/staff/complaints/{complaint_id}/resolve")
async def resolve_complaint_endpoint(
    complaint_id: str,
    payload: ResolveComplaintRequest,
    request: Request,
    db: Session = Depends(get_db)
):
    if not request.session.get("logged_in"):
        raise HTTPException(status_code=401, detail="Authentication required")
    staff_user_id = request.session.get("user_id")
    c = resolve_complaint_service(
        db=db,
        complaint_id=complaint_id,
        staff_user_id=staff_user_id,
        resolution_remarks=payload.resolution_remarks
    )
    return {"status": "success", "message": "Complaint resolved successfully", "data": enrich_complaint_dict(c, db)}
