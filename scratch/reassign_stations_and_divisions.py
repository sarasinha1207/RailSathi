import random
from backend.app.database import SessionLocal
from backend.app.models import Complaint, Station, Division

def align_complaints_with_valid_stations():
    db = SessionLocal()
    
    stations = db.query(Station).filter(Station.division_code.isnot(None)).all()
    if not stations:
        print("No valid stations found!")
        return

    print(f"Loaded {len(stations)} master stations with valid division codes.")

    # Group stations by division_code so we can cleanly distribute across all 71 divisions
    div_stations_map = {}
    for s in stations:
        div_stations_map.setdefault(s.division_code, []).append(s)

    all_divs = list(div_stations_map.keys())
    print(f"Total Divisions with active stations: {len(all_divs)}")

    complaints = db.query(Complaint).all()
    total_c = len(complaints)
    print(f"Updating {total_c} complaints...")

    # Distribute complaints round-robin across divisions, selecting a random valid station within that division
    for idx, c in enumerate(complaints):
        target_div = all_divs[idx % len(all_divs)]
        available_stations = div_stations_map[target_div]
        selected_station = available_stations[idx % len(available_stations)]

        c.station_code = selected_station.station_code
        c.assigned_division_code = selected_station.division_code

    db.commit()
    print(f"Successfully reassigned {total_c} complaints to valid stations and aligned division codes across all {len(all_divs)} divisions!")
    db.close()

if __name__ == "__main__":
    align_complaints_with_valid_stations()
