import sys
import os
import requests

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'backend')))

BASE_URL = "http://127.0.0.1:8000"

def test_api():
    print("=" * 60)
    print("     SYSTEM REST API INTEGRATION TEST                   ")
    print("=" * 60)
    
    session = requests.Session()
    
    # 1. Admin Authentication
    login_res = session.post(f"{BASE_URL}/api/v1/auth/login", json={
        "username": "admin",
        "password": "admin123"
    })
    assert login_res.status_code == 200, f"Login failed: {login_res.status_code}"
    print("[PASS] TEST 1: Admin Authentication API PASSED (Status 200)")

    # 2. Officer Analytics API
    analytics_res = session.get(f"{BASE_URL}/api/v1/officer/analytics")
    assert analytics_res.status_code == 200, "Analytics endpoint failed"
    print("[PASS] TEST 2: Officer Analytics API PASSED (Status 200)")

    # 3. Zone-Division Aggregate Analytics API
    zd_res = session.get(f"{BASE_URL}/api/v1/officer/zone-division-analytics")
    assert zd_res.status_code == 200, "Zone-Division endpoint failed"
    zd_data = zd_res.json()
    total_c = zd_data['summary_metrics']['total_complaints']
    zones_cnt = len(zd_data['zone_overview'])
    print(f"[PASS] TEST 3: Zone-Division Analytics PASSED (Complaints: {total_c}, Zones: {zones_cnt})")

    # 4. Paginated Complaints List API
    complaints_res = session.get(f"{BASE_URL}/api/v1/officer/complaints?page=1&limit=100")
    assert complaints_res.status_code == 200, "Complaints list endpoint failed"
    c_data = complaints_res.json()
    returned_cnt = c_data['count']
    total_db_cnt = c_data['metrics']['total_complaints']
    print(f"[PASS] TEST 4: Paginated Complaints Feed PASSED (Returned Rows: {returned_cnt}, Total DB: {total_db_cnt})")

    # 5. Staff Availability Roster API
    staff_res = session.get(f"{BASE_URL}/api/v1/officer/staff-availability")
    assert staff_res.status_code == 200, "Staff availability endpoint failed"
    s_data = staff_res.json()
    active_staff_cnt = s_data['metrics']['total_staff']
    print(f"[PASS] TEST 5: Staff Availability Roster PASSED (Active Staff: {active_staff_cnt})")

    print("\n" + "=" * 60)
    print("  ALL 5 INTEGRATION CHECKS EXECUTED & VERIFIED 100% OPERATIONAL")
    print("=" * 60)

if __name__ == "__main__":
    test_api()
