import requests

session = requests.Session()
session.post("http://127.0.0.1:5000/api/v1/auth/login", json={"username": "admin", "password": "admin123"})

res = session.get("http://127.0.0.1:5000/api/v1/officer/zone-division-analytics").json()
zones = res.get("zone_overview", [])

print("Zone Division Breakdown from Database:")
for z in zones[:5]:
    print(f"\nZone: {z['zone_name']} ({z['zone_code']}) - Total Complaints: {z['complaints']}")
    for d in z.get("divisions_list", [])[:4]:
        print(f"  - Division {d['division_name']} ({d['division_code']}): {d['complaints']} complaints | Open: {d['open']} | Resolved: {d['resolved']}")
