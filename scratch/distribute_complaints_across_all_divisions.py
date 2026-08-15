import random
from backend.app.database import SessionLocal
from backend.app.models import Complaint, Division

def distribute_complaints():
    db = SessionLocal()
    
    divisions = db.query(Division).all()
    if not divisions:
        print("No divisions found!")
        return

    div_codes = [d.division_code for d in divisions]
    print(f"Found {len(div_codes)} divisions to distribute complaints across.")

    complaints = db.query(Complaint).all()
    total_c = len(complaints)
    print(f"Distributing {total_c} complaints...")

    # Assign each complaint to a division in round-robin / randomized distribution
    for idx, c in enumerate(complaints):
        target_div = div_codes[idx % len(div_codes)]
        c.assigned_division_code = target_div

    db.commit()
    print(f"Successfully distributed {total_c} complaints across all {len(div_codes)} divisions!")
    db.close()

if __name__ == "__main__":
    distribute_complaints()
