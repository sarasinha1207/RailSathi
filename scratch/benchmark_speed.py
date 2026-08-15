import time
from backend.app.database import SessionLocal
from backend.app.models import Complaint, Zone, Division, Department, Station

def benchmark_analytics():
    db = SessionLocal()
    start = time.time()
    
    # 1. Fetch fast primitive tuples in 1 single query
    t1 = time.time()
    raw_tuples = db.query(
        Complaint.internal_status,
        Complaint.assigned_staff_id,
        Complaint.is_critical,
        Complaint.assigned_division_code,
        Complaint.assigned_department_code,
        Complaint.priority
    ).all()
    t2 = time.time()
    print(f"Fetched {len(raw_tuples)} tuples in {((t2 - t1) * 1000):.2f} ms")

    db.close()

if __name__ == "__main__":
    benchmark_analytics()
