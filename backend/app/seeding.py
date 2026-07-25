import os
import csv
import re
from datetime import datetime
from sqlalchemy.orm import Session
from .database import engine, SessionLocal, Base
from .models import Train, Passenger, PnrTicket, Department, ComplaintStatus, Complaint, Feedback, User, Staff

def parse_date(date_str):
    if not date_str:
        return None
    for fmt in ("%Y-%m-%d", "%d-%m-%Y", "%d/%m/%Y"):
        try:
            return datetime.strptime(date_str.strip(), fmt).date()
        except ValueError:
            continue
    return None

def parse_time(time_str):
    if not time_str:
        return None
    for fmt in ("%H:%M:%S", "%H:%M"):
        try:
            return datetime.strptime(time_str.strip(), fmt).time()
        except ValueError:
            continue
    return None

def parse_datetime(dt_str):
    if not dt_str:
        return None
    for fmt in ("%Y-%m-%d %H:%M:%S", "%d-%m-%Y %H:%M:%S", "%d/%m/%Y %H:%M:%S", "%Y-%m-%d %H:%M"):
        try:
            return datetime.strptime(dt_str.strip(), fmt)
        except ValueError:
            continue
    return None

def seed_database():
    # 1. Recreate tables to apply column size changes
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    
    db: Session = SessionLocal()
    try:
        # Check if database is already seeded
        if db.query(Complaint).count() > 0:
            print("Database already contains data. Skipping initial migration seeding.")
            return

        print("--- DATABASE INITIAL SEEDING START ---")
        
        # 2. Seed Complaint Statuses
        statuses_map = {}
        for s_name in ["Open", "In Progress", "Resolved", "Closed"]:
            status = db.query(ComplaintStatus).filter(ComplaintStatus.name == s_name).first()
            if not status:
                status = ComplaintStatus(name=s_name)
                db.add(status)
                db.flush()
            statuses_map[s_name.lower()] = status.id
            
        # 3. Seed Departments
        dept_names = [
            "Security (RPF)",
            "Mechanical (Cleanliness)",
            "Commercial (Catering)",
            "Electrical",
            "Mechanical (Coaching)",
            "Medical",
            "Commercial (Staff)",
            "Operating",
            "Engineering",
            "Other"
        ]
        depts_map = {}
        for d_name in dept_names:
            dept = db.query(Department).filter(Department.name == d_name).first()
            if not dept:
                dept = Department(name=d_name)
                db.add(dept)
                db.flush()
            depts_map[d_name.lower()] = dept.id
        
        # 4. Seed Default Admin User
        admin_user = db.query(User).filter(User.username == "admin").first()
        if not admin_user:
            admin_user = User(
                username="admin",
                password_hash="admin123", # For exact parity with Flask config session check
                role="Admin"
            )
            db.add(admin_user)
            db.flush()
            
            # Seed Staff record for Admin
            staff_rec = Staff(
                user_id=admin_user.id,
                name="System Administrator"
            )
            db.add(staff_rec)
            db.flush()
            
        # 5. Read and Migrate PNR tickets database
        base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
        pnr_path = os.path.join(base_dir, "data", "pnr_database.csv")
        
        trains_seen = set()
        pnr_seen = set()
        pnr_tickets_to_add = []
        passengers_seen = set()
        
        if os.path.exists(pnr_path):
            print(f"Migrating PNR records from {pnr_path}...")
            with open(pnr_path, "r", encoding="utf-8") as f:
                reader = csv.DictReader(f)
                for row in reader:
                    train_num = row["train_number"].strip()
                    train_name = row["train_name"].strip()
                    pnr_num = row["pnr_number"].strip()
                    pnr_seen.add(pnr_num)
                    
                    # Ensure train exists
                    if train_num not in trains_seen:
                        train = db.query(Train).filter(Train.train_number == train_num).first()
                        if not train:
                            train = Train(train_number=train_num, train_name=train_name)
                            db.add(train)
                            db.flush()
                        trains_seen.add(train_num)
                    
                    # Save PNR ticket info
                    pnr_tickets_to_add.append({
                        "pnr_number": pnr_num,
                        "train_number": train_num,
                        "coach_number": row.get("coach_number"),
                        "berth_number": row.get("berth_number"),
                        "boarding_station": row.get("boarding_station"),
                        "destination_station": row.get("destination_station"),
                        "journey_date": parse_date(row.get("journey_date")),
                        "journey_class": row.get("journey_class")
                    })
            
            # Bulk save PNR tickets
            db.bulk_insert_mappings(PnrTicket, pnr_tickets_to_add)
            db.flush()
            
        # 6. Read and Migrate Complaints database
        complaints_path = os.path.join(base_dir, "data", "complaints.csv")
        complaints_to_add = []
        feedbacks_to_add = []
        
        if os.path.exists(complaints_path):
            print(f"Migrating complaints from {complaints_path}...")
            with open(complaints_path, "r", encoding="utf-8") as f:
                reader = csv.DictReader(f)
                for idx, row in enumerate(reader):
                    phone = row["phone_number"].strip()
                    pnr = row.get("pnr_number", "").strip() or None
                    train_num_raw = row.get("train_number", "").strip() or None
                    train_num = None
                    train_name = "Express"
                    if train_num_raw:
                        if " - " in train_num_raw:
                            parts = train_num_raw.split(" - ")
                            train_num = parts[0].strip()
                            train_name = parts[1].strip()
                        else:
                            train_num = train_num_raw
                    
                    # Ensure passenger phone number exists
                    if phone not in passengers_seen:
                        passenger = db.query(Passenger).filter(Passenger.phone_number == phone).first()
                        if not passenger:
                            passenger = Passenger(phone_number=phone)
                            db.add(passenger)
                            db.flush()
                        passengers_seen.add(phone)
                        
                    # Ensure train exists
                    if train_num and train_num not in trains_seen:
                        train = db.query(Train).filter(Train.train_number == train_num).first()
                        if not train:
                            train = Train(train_number=train_num, train_name=train_name)
                            db.add(train)
                            db.flush()
                        trains_seen.add(train_num)
                        
                    # Ensure PNR ticket exists if present (referential integrity check)
                    if pnr:
                        if pnr not in pnr_seen:
                            stub_train_num = train_num or "12002"
                            if stub_train_num not in trains_seen:
                                train = db.query(Train).filter(Train.train_number == stub_train_num).first()
                                if not train:
                                    train = Train(train_number=stub_train_num, train_name="Express")
                                    db.add(train)
                                    db.flush()
                                trains_seen.add(stub_train_num)
                            
                            stub_ticket = PnrTicket(
                                pnr_number=pnr,
                                train_number=stub_train_num,
                                coach_number=row.get("coach_number") or None,
                                berth_number=None,
                                boarding_station=None,
                                destination_station=None,
                                journey_date=None,
                                journey_class=None
                            )
                            db.add(stub_ticket)
                            db.flush()
                            pnr_seen.add(pnr)
                        
                    # Map category (main_class) to department ID
                    category = row.get("main_class", "").lower()
                    dept_id = depts_map["other"]
                    
                    if "security" in category or "theft" in category or "harassment" in category:
                        dept_id = depts_map["security (rpf)"]
                    elif "cleanliness" in category or "dirty" in category or "toilet" in category or "waste" in category:
                        dept_id = depts_map["mechanical (cleanliness)"]
                    elif "catering" in category or "food" in category or "water bottle" in category:
                        dept_id = depts_map["commercial (catering)"]
                    elif "electrical" in category or "ac" in category or "lighting" in category or "fan" in category or "charging" in category:
                        dept_id = depts_map["electrical"]
                    elif "bed roll" in category or "linen" in category or "blanket" in category:
                        dept_id = depts_map["mechanical (coaching)"]
                    elif "medical" in category or "emergency" in category or "first aid" in category:
                        dept_id = depts_map["medical"]
                    elif "staff" in category or "behaviour" in category or "tte" in category:
                        dept_id = depts_map["commercial (staff)"]
                    elif "punctuality" in category or "delay" in category or "speed" in category:
                        dept_id = depts_map["operating"]
                    elif "engineering" in category or "track" in category or "bridge" in category or "building" in category:
                        dept_id = depts_map["engineering"]

                    status_str = row.get("complaint_status", "Open")
                    status_id = statuses_map.get(status_str.lower(), statuses_map["open"])
                    
                    created_at = parse_datetime(row.get("created_at")) or datetime.now()
                    
                    complaint_row = {
                        "complaint_id": row["complaint_id"],
                        "complaint_type": row["complaint_type"],
                        "phone_number": phone,
                        "pnr_number": pnr,
                        "train_number": train_num,
                        "coach_number": row.get("coach_number"),
                        "current_station": row.get("current_station"),
                        "next_station": row.get("next_station"),
                        "station_name": row.get("station_name"),
                        "platform_number": row.get("platform_number"),
                        "station_area": row.get("station_area"),
                        "main_class": row["main_class"],
                        "sub_class": row["sub_class"],
                        "incident_date": parse_date(row.get("incident_date")) or created_at.date(),
                        "incident_time": parse_time(row.get("incident_time")),
                        "complaint_description": row.get("complaint_description", ""),
                        "status_id": status_id,
                        "department_id": dept_id,
                        "priority": "Medium", # Fallback, calculated dynamically in routes
                        "created_at": created_at,
                        "zone_code": row.get("zone_code"),
                        "zone_name": row.get("zone_name"),
                        "division_name": row.get("division_name"),
                        "remarks": row.get("remarks")
                    }
                    
                    # Calculate dynamic priority
                    priority = "Medium"
                    if "security" in category or "theft" in category or "harassment" in category:
                        priority = "High"
                    elif "cleanliness" in category or "dirty" in category or "toilet" in category or "waste" in category:
                        priority = "Low"
                    elif "bed roll" in category or "linen" in category or "blanket" in category:
                        priority = "Low"
                    elif "medical" in category or "emergency" in category or "first aid" in category:
                        priority = "High"
                        
                    complaint_row["priority"] = priority
                    complaints_to_add.append(complaint_row)
                    
                    # Feedback info
                    feedback_text = row.get("feedback", "").strip()
                    rating_text = row.get("rating", "").strip()
                    if feedback_text or rating_text:
                        feedbacks_to_add.append({
                            "complaint_id": row["complaint_id"],
                            "rating": rating_text,
                            "feedback_text": feedback_text,
                            "created_at": created_at
                        })

            # Bulk save complaints
            print(f"Saving {len(complaints_to_add)} complaints to database...")
            db.bulk_insert_mappings(Complaint, complaints_to_add)
            db.flush()
            
            # Bulk save feedbacks
            if feedbacks_to_add:
                print(f"Saving {len(feedbacks_to_add)} feedback reviews...")
                db.bulk_insert_mappings(Feedback, feedbacks_to_add)
                db.flush()

        db.commit()
        print("--- DATABASE INITIAL SEEDING COMPLETED SUCCESSFULLY ---")
    except Exception as e:
        db.rollback()
        print(f"Error seeding database: {e}")
        raise e
    finally:
        db.close()
