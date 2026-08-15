from backend.app.database import SessionLocal
from backend.app.models import Complaint, Station, Division, Zone

db = SessionLocal()

print("Total Complaints:", db.query(Complaint).count())

with_assigned_div = db.query(Complaint).filter(Complaint.assigned_division_code.isnot(None)).count()
print("Complaints with assigned_division_code:", with_assigned_div)

with_station = db.query(Complaint).filter(Complaint.station_code.isnot(None)).count()
print("Complaints with station_code:", with_station)

# Check station -> division link
station_div_map = {}
for s in db.query(Station).all():
    if s.division_code:
        station_div_map[s.station_code] = s.division_code

complaints_by_div = {}
all_c = db.query(Complaint.assigned_division_code, Complaint.station_code).all()
for assigned_div, st_code in all_c:
    div = assigned_div or station_div_map.get(st_code)
    if div:
        complaints_by_div[div] = complaints_by_div.get(div, 0) + 1

print("Complaints per Division (sample top 10):", list(complaints_by_div.items())[:10])
print("Total divisions with complaints:", len(complaints_by_div))

db.close()
