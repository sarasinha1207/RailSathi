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
from .schemas import ComplaintResponse, PnrResponse, LoginRequest, UpdateStatusRequest, ChangePasswordRequest, UpdateProfileRequest
from .models import (
    User, Zone, Division, Station, Train, TrainRoute,
    PnrBooking, Department, ComplaintCategory, Staff, StaffGpsLocation,
    Complaint, Feedback, ComplaintStatusHistory, OtpVerification, Notification
)

router = APIRouter()


@router.get("/api/v1/auth/user-profile")
async def get_user_profile(request: Request, db: Session = Depends(get_db)):
    if not request.session.get("logged_in"):
        raise HTTPException(status_code=401, detail="Authentication required")
    username = request.session.get("username")
    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    dept_name = user.department.department_name if user.department else "General"
    div_name = user.division.division_name if user.division else "HQ"

    return {
        "status": "success",
        "user_id": user.user_id,
        "username": user.username,
        "role": user.role,
        "full_name": user.full_name or user.username,
        "email": user.email or "",
        "phone_number": user.phone_number or "",
        "department_code": user.department_code,
        "department_name": dept_name,
        "division_code": user.division_code,
        "division_name": div_name,
        "is_active": user.is_active
    }

@router.post("/api/v1/auth/change-password")
async def change_password(request: Request, payload: ChangePasswordRequest, db: Session = Depends(get_db)):
    if not request.session.get("logged_in"):
        raise HTTPException(status_code=401, detail="Authentication required")
    username = request.session.get("username")
    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    user.password_hash = payload.new_password
    db.commit()
    return {"status": "success", "message": "Password updated successfully"}


@router.post("/api/v1/auth/update-profile")
async def update_profile(request: Request, payload: UpdateProfileRequest, db: Session = Depends(get_db)):
    if not request.session.get("logged_in"):
        raise HTTPException(status_code=401, detail="Authentication required")
    username = request.session.get("username")
    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if payload.email is not None:
        user.email = payload.email
    if payload.phone_number is not None:
        user.phone_number = payload.phone_number
    if payload.full_name is not None:
        user.full_name = payload.full_name

    db.commit()
    return {
        "status": "success",
        "message": "Profile updated successfully",
        "data": {
            "email": user.email,
            "phone_number": user.phone_number,
            "full_name": user.full_name
        }
    }



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
            complaint_description=complaint_description, internal_status="Assigned",
            assigned_department_code=category.department_code,
            assigned_division_code=station.division_code if station else None,
            priority=category.default_priority, complaint_source="Passenger Portal",)
        db.add(complaint); db.flush()
        db.add(ComplaintStatusHistory(complaint_id=complaint_id, from_status=None, to_status="Assigned", updated_by_user_id=None, remarks="Grievance registered by passenger."))
        db.commit()
        return {"status": "success", "complaint_id": complaint_id, "passenger_status": "IN-PROGRESS"}
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
            complaint_description=complaint_description, internal_status="Assigned",
            assigned_department_code=category.department_code, assigned_division_code=station.division_code,
            priority=category.default_priority, complaint_source="Passenger Portal",)
        db.add(complaint); db.flush()
        db.add(ComplaintStatusHistory(complaint_id=complaint_id, from_status=None, to_status="Assigned", updated_by_user_id=None, remarks="Grievance registered by passenger."))
        db.commit()
        return {"status": "success", "complaint_id": complaint_id, "passenger_status": "IN-PROGRESS"}
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


# Categories List
@router.get("/api/v1/categories")
async def get_categories_api(db: Session = Depends(get_db)):
    """Lists all complaint categories and subcategories."""
    cats = db.query(ComplaintCategory).order_by(ComplaintCategory.category_name.asc(), ComplaintCategory.subcategory_name.asc()).all()
    return [
        {
            "category_code": c.category_code,
            "category_name": c.category_name,
            "subcategory_name": c.subcategory_name,
            "department_code": c.department_code,
            "default_priority": c.default_priority
        }
        for c in cats
    ]


# Departments List
@router.get("/api/v1/departments")
async def get_departments_api(db: Session = Depends(get_db)):
    """Lists all railway departments."""
    depts = db.query(Department).order_by(Department.department_name.asc()).all()
    return [
        {
            "department_code": d.department_code,
            "department_name": d.department_name,
            "description": d.description
        }
        for d in depts
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


# ---------------------------------------------------------------------------
# Phase 3 / CMO Dashboard Analytics GET Endpoint
# ---------------------------------------------------------------------------
@router.get("/api/v1/officer/analytics")
async def get_cmo_analytics(
    request: Request,
    zone_code: Optional[str] = None,
    db: Session = Depends(get_db)
):
    if not request.session.get("logged_in"):
        raise HTTPException(status_code=401, detail="Authentication required")
    
    user_role = request.session.get("role")
    if user_role not in ("Admin", "ComplaintOfficer", "ZoneHead", "DivisionHead", "DepartmentHead"):
        raise HTTPException(status_code=403, detail="Permission denied: Officer or Admin role required.")

    all_raw = db.query(Complaint).all()

    # Section A — KPI Cards
    kpis = {
        "pending_complaints": sum(1 for c in all_raw if c.internal_status == "Assigned" and not c.assigned_staff_id),
        "assigned_complaints": sum(1 for c in all_raw if c.assigned_staff_id is not None or c.internal_status == "In Progress"),
        "reassignment_requests": sum(1 for c in all_raw if c.internal_status == "Reassignment Requested"),
        "resolved_complaints": sum(1 for c in all_raw if c.internal_status in ["Resolved", "Closed"]),
        "critical_complaints": sum(1 for c in all_raw if c.is_critical and c.internal_status not in ["Resolved", "Closed"])
    }

    # Section B — Zone-wise Overview Table Data
    zones = db.query(Zone).all()
    divisions = db.query(Division).order_by(Division.zone_code, Division.division_name).all()
    zone_map = {z.zone_code: z for z in zones}

    overview_table = []
    for d in divisions:
        parent_zone = zone_map.get(d.zone_code)
        z_name = parent_zone.zone_name if parent_zone else d.zone_code
        
        # Complaints belonging to this specific division
        d_complaints = [c for c in all_raw if c.assigned_division_code == d.division_code or (c.station and c.station.division_code == d.division_code)]
        d_open = [c for c in d_complaints if c.internal_status not in ["Resolved", "Closed"]]
        
        high_c = sum(1 for c in d_complaints if c.priority == "High" or c.is_critical)
        med_c  = sum(1 for c in d_complaints if c.priority == "Medium" and not c.is_critical)
        low_c  = sum(1 for c in d_complaints if c.priority == "Low" and not c.is_critical)

        overview_table.append({
            "zone_code": d.zone_code,
            "zone_name": z_name,
            "division_code": d.division_code,
            "division_name": d.division_name,
            "total_received": len(d_complaints),
            "total_open": len(d_open),
            "priority_distribution": {
                "high": high_c,
                "medium": med_c,
                "low": low_c
            }
        })

    # Section C — Open Complaint Analytics Charts (internal_status NOT IN ['Resolved', 'Closed'])
    open_complaints = [c for c in all_raw if c.internal_status not in ["Resolved", "Closed"]]

    # If zone_code filter selected
    filtered_open = open_complaints
    if zone_code and zone_code != "all":
        z_target_divs = [d.division_code for d in divisions if d.zone_code == zone_code]
        filtered_open = [c for c in open_complaints if c.assigned_division_code in z_target_divs or (c.station and c.station.division_code in z_target_divs)]

    # 1. Zone-wise Open Complaints Chart
    zone_chart_data = []
    for z in zones:
        z_div_codes = [d.division_code for d in divisions if d.zone_code == z.zone_code]
        z_open = [c for c in filtered_open if c.assigned_division_code in z_div_codes or (c.station and c.station.division_code in z_div_codes)]
        if z_open or not zone_code or zone_code == "all" or zone_code == z.zone_code:
            zone_chart_data.append({
                "zone_code": z.zone_code,
                "zone_name": z.zone_name,
                "high": sum(1 for c in z_open if c.priority == "High" or c.is_critical),
                "medium": sum(1 for c in z_open if c.priority == "Medium" and not c.is_critical),
                "low": sum(1 for c in z_open if c.priority == "Low" and not c.is_critical),
                "total": len(z_open)
            })

    # 2. Division-wise Open Complaints Chart
    div_chart_data = []
    target_divisions = divisions
    if zone_code and zone_code != "all":
        target_divisions = [d for d in divisions if d.zone_code == zone_code]

    for d in target_divisions:
        d_open = [c for c in filtered_open if c.assigned_division_code == d.division_code or (c.station and c.station.division_code == d.division_code)]
        if d_open or zone_code:
            div_chart_data.append({
                "division_code": d.division_code,
                "division_name": d.division_name,
                "zone_code": d.zone_code,
                "high": sum(1 for c in d_open if c.priority == "High" or c.is_critical),
                "medium": sum(1 for c in d_open if c.priority == "Medium" and not c.is_critical),
                "low": sum(1 for c in d_open if c.priority == "Low" and not c.is_critical),
                "total": len(d_open)
            })

    # Limit divisions to top 15 if "All Zones" to keep chart clean
    if not zone_code or zone_code == "all":
        div_chart_data.sort(key=lambda x: x["total"], reverse=True)
        div_chart_data = div_chart_data[:15]

    # 3. Department-wise Open Complaints Chart
    depts = db.query(Department).all()
    dept_chart_data = []
    for dept in depts:
        d_open = [c for c in filtered_open if c.assigned_department_code == dept.department_code or (c.verified_category and c.verified_category.department_code == dept.department_code)]
        dept_chart_data.append({
            "department_code": dept.department_code,
            "department_name": dept.department_name,
            "total_open": len(d_open)
        })

    return {
        "status": "success",
        "kpis": kpis,
        "overview_table": overview_table,
        "analytics": {
            "selected_zone": zone_code or "all",
            "zone_chart": zone_chart_data,
            "division_chart": div_chart_data,
            "department_chart": dept_chart_data
        }
    }


# ---------------------------------------------------------------------------
# Phase 3 Officer Workflow GET Endpoints
# ---------------------------------------------------------------------------
@router.get("/api/v1/officer/complaints")
async def get_officer_complaints(
    request: Request,
    status: Optional[str] = None,
    priority: Optional[str] = None,
    zone_code: Optional[str] = None,
    division_code: Optional[str] = None,
    department_code: Optional[str] = None,
    category_code: Optional[str] = None,
    train_number: Optional[str] = None,
    station_code: Optional[str] = None,
    start_date: Optional[str] = None,
    end_date: Optional[str] = None,
    search: Optional[str] = None,
    db: Session = Depends(get_db)
):
    if not request.session.get("logged_in"):
        raise HTTPException(status_code=401, detail="Authentication required")
    
    user_role = request.session.get("role")
    if user_role not in ("Admin", "ComplaintOfficer", "ZoneHead", "DivisionHead", "DepartmentHead"):
        raise HTTPException(status_code=403, detail="Permission denied: Officer or Admin role required.")

    query = db.query(Complaint)

    if status and status != "all":
        if status in ("Assigned", "Pending Review", "Pending"):
            query = query.filter(Complaint.internal_status == "Assigned")
        elif status == "In Progress":
            query = query.filter(Complaint.internal_status == "In Progress")
        elif status == "Reassignment Requested":
            query = query.filter(Complaint.internal_status == "Reassignment Requested")
        elif status == "Escalated":
            query = query.filter(Complaint.internal_status == "Escalated")
        elif status == "Resolved":
            query = query.filter(Complaint.internal_status.in_(["Resolved", "Closed"]))
        else:
            query = query.filter(Complaint.internal_status == status)

    if priority and priority != "all":
        if priority == "Critical":
            query = query.filter(Complaint.is_critical == True)
        else:
            query = query.filter(Complaint.priority == priority)

    if department_code and department_code != "all":
        query = query.filter(Complaint.assigned_department_code == department_code)

    if division_code and division_code != "all":
        query = query.filter(Complaint.assigned_division_code == division_code)

    if zone_code and zone_code != "all":
        div_codes = [d.division_code for d in db.query(Division).filter(Division.zone_code == zone_code).all()]
        query = query.filter(Complaint.assigned_division_code.in_(div_codes))

    if category_code and category_code != "all":
        query = query.filter(
            (Complaint.category_code == category_code) |
            (Complaint.verified_category_code == category_code)
        )

    if train_number and train_number != "all":
        query = query.filter(Complaint.train_number == train_number)

    if station_code and station_code != "all":
        query = query.filter(Complaint.station_code == station_code)

    if start_date:
        try:
            sd = datetime.strptime(start_date, "%Y-%m-%d")
            query = query.filter(Complaint.created_at >= sd)
        except ValueError:
            pass

    if end_date:
        try:
            ed = datetime.strptime(end_date, "%Y-%m-%d").replace(hour=23, minute=59, second=59)
            query = query.filter(Complaint.created_at <= ed)
        except ValueError:
            pass

    if search and search.strip():
        term = f"%{search.strip()}%"
        query = query.filter(
            (Complaint.complaint_id.like(term)) |
            (Complaint.pnr_number.like(term)) |
            (Complaint.phone_number.like(term)) |
            (Complaint.train_number.like(term)) |
            (Complaint.station_code.like(term))
        )

    all_complaints = query.order_by(Complaint.created_at.desc()).all()

    # Calculate operational metrics summary across all complaints
    all_raw = db.query(Complaint).all()
    summary_metrics = {
        "total_pending": sum(1 for c in all_raw if c.internal_status == "Assigned" and not c.assigned_staff_id),
        "under_review": 0,
        "assigned": sum(1 for c in all_raw if c.assigned_staff_id is not None or c.internal_status == "In Progress"),
        "high_critical": sum(1 for c in all_raw if c.is_critical or c.priority == "High"),
        "reassignment_requests": sum(1 for c in all_raw if c.internal_status == "Reassignment Requested")
    }

    enriched_list = [enrich_complaint_dict(c, db) for c in all_complaints]

    return {
        "status": "success",
        "metrics": summary_metrics,
        "count": len(enriched_list),
        "data": enriched_list
    }


@router.get("/api/v1/officer/complaints/{complaint_id}/available-staff")
async def get_available_staff_for_complaint(
    complaint_id: str,
    request: Request,
    db: Session = Depends(get_db)
):
    if not request.session.get("logged_in"):
        raise HTTPException(status_code=401, detail="Authentication required")
    
    user_role = request.session.get("role")
    if user_role not in ("Admin", "ComplaintOfficer", "ZoneHead", "DivisionHead", "DepartmentHead"):
        raise HTTPException(status_code=403, detail="Permission denied: Officer or Admin role required.")

    complaint = db.query(Complaint).filter(Complaint.complaint_id == complaint_id).first()
    if not complaint:
        raise HTTPException(status_code=404, detail="Complaint not found")

    # Target Department
    target_dept = complaint.verified_category.department_code if (complaint.verified_category and complaint.verified_category.department_code) else complaint.assigned_department_code

    # Check if Train or Station complaint
    is_train_complaint = (complaint.complaint_type == "Train") or bool(complaint.train_number and complaint.train_number != "N/A")

    # Base query for active, on-duty staff
    staff_query = db.query(Staff).filter(
        Staff.is_on_duty == True
    )

    # 1. STRICT LOCATION BOUNDARY: Train vs Station (Only staff present in passenger's exact train/station)
    if is_train_complaint and complaint.train_number:
        staff_query = staff_query.filter(Staff.active_train_number == complaint.train_number)
    elif not is_train_complaint and complaint.station_code:
        staff_query = staff_query.filter(Staff.assigned_station_code == complaint.station_code)
    else:
        # If no valid location specified on complaint, return empty list
        staff_query = staff_query.filter(text("1 = 0"))

    # 2. Department-based filtering (First try exact department match on passenger's train/station)
    dept_filtered_query = staff_query
    if target_dept:
        dept_filtered_query = staff_query.filter(Staff.department_code == target_dept)

    staff_list = dept_filtered_query.all()

    # Fallback ONLY within the SAME train or SAME station if target department yields zero staff
    if not staff_list:
        staff_list = staff_query.all()

    result_staff = []
    for s in staff_list:
        if s.user and not s.user.is_active:
            continue

        dept_name = s.department.department_name if s.department else (s.department_code or "General")

        # Compute duty location text
        if s.active_train_number:
            duty_location = f"Train {s.active_train_number}"
        elif s.assigned_station_code:
            duty_location = f"Station {s.assigned_station_code}"
        else:
            duty_location = "On Duty"

        result_staff.append({
            "staff_id": s.staff_id,
            "name": s.name,
            "staff_name": s.name,
            "designation": s.designation or "Railway Field Staff",
            "department_code": s.department_code,
            "department_name": dept_name,
            "division_code": s.division_code,
            "duty_location": duty_location,
            "duty_status": s.duty_status or "ON_DUTY",
            "is_on_duty": s.is_on_duty
        })

    return {
        "status": "success",
        "complaint_id": complaint_id,
        "recommended_department_code": target_dept,
        "count": len(result_staff),
        "data": result_staff,
        "available_staff": result_staff
    }




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
        staff_id=payload.staff_id,
        verified_category_code=payload.verified_category_code,
        priority=payload.priority,
        is_critical=payload.is_critical
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
    c = start_work_service(
        db=db,
        complaint_id=complaint_id,
        staff_user_id=staff_user_id
    )
    return {"status": "success", "message": "Assignment accepted and work started", "data": enrich_complaint_dict(c, db)}


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


@router.get("/api/v1/officer/staff-availability")
async def get_staff_availability_overview(
    request: Request,
    db: Session = Depends(get_db)
):
    """Fetches comprehensive staff list and availability metrics for Staff & Availability Dashboard."""
    if not request.session.get("logged_in"):
        raise HTTPException(status_code=401, detail="Authentication required")

    all_staff = db.query(Staff).all()
    all_trains = {t.train_number: t.train_name for t in db.query(Train).all()}
    all_depts = {d.department_code: d.department_name for d in db.query(Department).all()}
    all_stations = {s.station_code: s.station_name for s in db.query(Station).all()}

    # Compute active assigned complaints per staff member
    active_assigned_counts = {}
    active_complaints = db.query(Complaint).filter(
        Complaint.internal_status.in_(["Assigned", "In Progress"]),
        Complaint.assigned_staff_id.isnot(None)
    ).all()
    for c in active_complaints:
        active_assigned_counts[c.assigned_staff_id] = active_assigned_counts.get(c.assigned_staff_id, 0) + 1

    staff_list = []
    total_staff = len(all_staff)
    currently_onboard = 0
    available_count = 0
    assigned_count = 0
    unavailable_count = 0
    offline_count = 0

    for s in all_staff:
        train_name = all_trains.get(s.active_train_number, "Special Express") if s.active_train_number else ""
        dept_name = all_depts.get(s.department_code, s.department_code)
        station_name = all_stations.get(s.assigned_station_code, s.assigned_station_code) if s.assigned_station_code else ""

        active_cnt = active_assigned_counts.get(s.staff_id, 0)

        # Determine Availability Status:
        # 🟢 Available — onboard and can receive a complaint
        # 🟡 Assigned — currently handling complaint(s), but may still be eligible depending on workload
        # 🔴 Unavailable — not available for assignment
        # ⚪ Offline/Not Onboard — not currently present on the train
        
        isOnboard = bool(s.active_train_number) or s.duty_status == 'ON_DUTY'
        if isOnboard:
            currently_onboard += 1

        if s.duty_status == 'ON_BREAK' or s.duty_status == 'SUSPENDED':
            availability_status = 'Unavailable'
            unavailable_count += 1

        elif s.duty_status == 'OFF_DUTY' or not isOnboard:
            availability_status = 'Offline/Not Onboard'
            offline_count += 1
        elif active_cnt > 0:
            availability_status = 'Assigned'
            assigned_count += 1
        else:
            availability_status = 'Available'
            available_count += 1

        # Generate realistic coach & location assignment
        coach_num = f"B{(abs(hash(s.staff_id)) % 6) + 1}" if "RPF" in s.staff_id or "ELEC" in s.staff_id else ("S4" if "TTE" in s.staff_id else "Pantry Car")
        curr_loc = f"Enroute ({station_name or 'NDLS'})" if station_name else "In Transit"

        phone_num = (s.user.phone_number if s.user and s.user.phone_number else None) or "+91 98765 12801"
        email_addr = (s.user.email if s.user and s.user.email else None) or f"{s.staff_id.lower()}@railsathi.gov.in"

        staff_list.append({
            "staff_id": s.staff_id,
            "name": s.name,
            "designation": s.designation or "Railway Official",
            "department_code": s.department_code,
            "department_name": dept_name,
            "phone": phone_num,
            "email": email_addr,
            "train_number": s.active_train_number or "",
            "train_name": train_name,
            "station_code": s.assigned_station_code or "",
            "station_name": station_name,
            "coach_number": coach_num,
            "current_location": curr_loc,
            "onboard_status": "Onboard" if s.active_train_number else "Station Duty",
            "availability_status": availability_status,
            "active_complaint_count": active_cnt,
            "last_updated": datetime.now().strftime("%d %b %Y, %H:%M IST")
        })


    metrics = {
        "total_staff": total_staff,
        "currently_onboard": currently_onboard,
        "available": available_count,
        "currently_assigned": assigned_count,
        "unavailable": unavailable_count + offline_count
    }

    return {
        "status": "success",
        "metrics": metrics,
        "data": staff_list
    }

