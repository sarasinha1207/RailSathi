from backend.app.database import SessionLocal
from backend.app.models import Complaint, Station, Division, Zone

db = SessionLocal()

print("--- STATION DISTRIBUTION IN COMPLAINTS TABLE ---")
station_counts = {}
all_c = db.query(Complaint.station_code, Complaint.assigned_division_code).all()
for st_code, div_code in all_c:
    station_counts[st_code] = station_counts.get(st_code, 0) + 1

print(f"Total Unique Stations in Complaints Table: {len(station_counts)}")
print("Top 10 Stations in Complaints:", list(sorted(station_counts.items(), key=lambda x: x[1], reverse=True))[:10])

# Inspect Stations table
stations = db.query(Station).all()
print(f"\nTotal Stations in Stations Master Table: {len(stations)}")

# Map division_code -> list of valid station_codes
div_to_stations = {}
for s in stations:
    if s.division_code:
        div_to_stations.setdefault(s.division_code, []).append(s.station_code)

print(f"Total Divisions mapped in Stations Table: {len(div_to_stations)}")
for d_code, st_list in list(div_to_stations.items())[:10]:
    print(f"Division {d_code}: {len(st_list)} stations (sample: {st_list[:5]})")

db.close()
