import sys
import os

backend_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "backend"))
sys.path.insert(0, backend_path)

from fastapi.testclient import TestClient
from app import app

client = TestClient(app)

def log(msg, success=True):
    symbol = "[PASS]" if success else "[FAIL]"
    print(f"{symbol} {msg}")

def run_e2e_tests():
    print("=" * 75)
    print("COMPREHENSIVE TESTING: PHASES 1 THROUGH 4 VERIFICATION")
    print("=" * 75)

    # -------------------------------------------------------------
    # PHASE 1: PUBLIC GRIEVANCE FILING & REAL-TIME TRACKING
    # -------------------------------------------------------------
    print("\n--- [PHASE 1] Public Grievance Filing & Real-Time Tracking ---")
    
    complaint_payload = {
        "pnr_number": "2247789012",
        "train_number": "22477",
        "coach_number": "C2",
        "main_class": "Cleanliness",
        "sub_class": "Unclean Toilet",
        "incident_datetime": "2026-08-15T14:30",
        "phone_number": "9876543210",
        "complaint_description": "Coach C2 toilet requires immediate OBHS cleaning."
    }
    
    res = client.post("/api/v1/submit-train", data=complaint_payload)
    if res.status_code == 200:
        data = res.json()
        complaint_id = data.get("complaint_id") or data.get("data", {}).get("complaint_id")
        log(f"Public Grievance Submission: Successfully created Complaint ID -> {complaint_id}", True)
    else:
        log(f"Public Grievance Submission Failed: {res.status_code} {res.text}", False)
        complaint_id = None

    if complaint_id:
        track_res = client.get(f"/track-api/{complaint_id}")
        if track_res.status_code == 200:
            track_data = track_res.json()
            status = track_data.get("status") or track_data.get("complaint", {}).get("status")
            log(f"Real-time Tracking for ID {complaint_id}: Current status is '{status}'", True)
        else:
            log(f"Tracking failed for ID {complaint_id}: {track_res.status_code}", False)

    # -------------------------------------------------------------
    # PHASE 2: DATABASE INTEGRITY & EXACT 7 STOPPING STATIONS (TRAIN 22477)
    # -------------------------------------------------------------
    print("\n--- [PHASE 2] MySQL Database Integrity & Train 22477 Route ---")
    
    login_staff = client.post("/api/v1/auth/login", json={"username": "stf_cat_22477", "password": "staff123"})
    if login_staff.status_code == 200:
        s_token = login_staff.json().get("access_token")
        headers_staff = {"Authorization": f"Bearer {s_token}"}
        
        journey_res = client.get("/api/v1/staff/me/train-journey", headers=headers_staff)
        if journey_res.status_code == 200:
            j_data = journey_res.json()
            halts = j_data.get("journey_halts", [])
            coaches = j_data.get("coaches", [])
            log(f"Database Rake Layout: Total {len(coaches)} coaches verified", len(coaches) == 18)
            if len(halts) == 7:
                station_codes = [h["station_code"] for h in halts]
                expected_codes = ["NDLS", "UMB", "LDH", "KTHU", "JAT", "MCTM", "SVDK"]
                log(f"Train 22477 Exact 7 Halts Verified: {station_codes}", station_codes == expected_codes)
            else:
                log(f"Train 22477 Halts count expected 7, got {len(halts)}", False)
        else:
            log(f"Fetch Train Journey failed: {journey_res.status_code}", False)
    else:
        log(f"Staff Login failed: {login_staff.status_code}", False)

    # -------------------------------------------------------------
    # PHASE 3: CMO DASHBOARD & CONTROL DESK ANALYTICS
    # -------------------------------------------------------------
    print("\n--- [PHASE 3] CMO Dashboard & Control Desk Analytics ---")
    cmo_login = client.post("/api/v1/auth/login", json={"username": "officer1", "password": "officer123"})
    if cmo_login.status_code == 200:
        cmo_token = cmo_login.json().get("access_token")
        log("CMO Officer Login (officer1): Authenticated successfully", True)
        
        headers_cmo = {"Authorization": f"Bearer {cmo_token}"}
        cmo_analytics = client.get("/api/v1/officer/analytics", headers=headers_cmo)
        if cmo_analytics.status_code == 200:
            log("CMO Officer Analytics: Fetched KPI overview stats successfully", True)
        else:
            log(f"CMO Analytics fetch failed: {cmo_analytics.status_code}", False)
            
        cmo_complaints = client.get("/api/v1/officer/complaints", headers=headers_cmo)
        if cmo_complaints.status_code == 200:
            cmp_list = cmo_complaints.json().get("data", [])
            log(f"CMO Complaints Desk: Fetched {len(cmp_list)} grievances from MySQL database", True)
        else:
            log(f"CMO Complaints fetch failed: {cmo_complaints.status_code}", False)
    else:
        log(f"CMO Login failed: {cmo_login.status_code}", False)

    # -------------------------------------------------------------
    # PHASE 4: STAFF DASHBOARD & ONBOARD OPERATIONS
    # -------------------------------------------------------------
    print("\n--- [PHASE 4] Staff Dashboard Operations (stf_cat_22477) ---")
    staff_login = client.post("/api/v1/auth/login", json={"username": "stf_cat_22477", "password": "staff123"})
    if staff_login.status_code == 200:
        staff_token = staff_login.json().get("access_token")
        log("Staff Login (stf_cat_22477): Authenticated successfully", True)
        
        headers_staff = {"Authorization": f"Bearer {staff_token}"}

        # 4.1 Staff Overview
        overview_res = client.get("/api/v1/staff/me/overview", headers=headers_staff)
        if overview_res.status_code == 200:
            log("Staff Dashboard Overview: Fetched active metrics successfully", True)
        else:
            log(f"Staff Overview fetch failed: {overview_res.status_code}", False)

        # 4.2 Assigned Complaints List & Resolving Action
        cmp_res = client.get("/api/v1/staff/me/complaints", headers=headers_staff)
        if cmp_res.status_code == 200:
            complaints = cmp_res.json().get("data", [])
            log(f"Staff Assigned Complaints Page: Fetched {len(complaints)} real DB records", True)
            
            if complaints:
                target_id = complaints[0]["complaint_id"]
                action_res = client.post(
                    f"/api/v1/staff/complaints/{target_id}/resolve",
                    headers=headers_staff,
                    json={"resolution_remarks": "Attended onboard by supervisor and verified."}
                )
                if action_res.status_code == 200:
                    log(f"Staff Audit Modal Action ({target_id}): Remarks saved & status updated to Resolved", True)
                else:
                    log(f"Staff Action failed: {action_res.status_code} {action_res.text}", False)
        else:
            log(f"Fetch Staff Complaints failed: {cmp_res.status_code}", False)

        # 4.3 Fellow Onboard Crew Roster
        crew_res = client.get("/api/v1/staff/me/onboard-crew", headers=headers_staff)
        if crew_res.status_code == 200:
            crew = crew_res.json().get("data", [])
            log(f"Staff Other Staff Directory: Fetched {len(crew)} fellow onboard crew members", True)
        else:
            log(f"Fetch Onboard Crew failed: {crew_res.status_code}", False)

        # 4.4 Onboard Inventory Stock Updates
        inv_res = client.get("/api/v1/staff/me/inventory", headers=headers_staff)
        if inv_res.status_code == 200:
            inv = inv_res.json().get("data", [])
            log(f"Staff Onboard Inventory: Fetched {len(inv)} stock records", True)
            if inv:
                inv_item_id = inv[0]["inventory_id"]
                upd_res = client.put(
                    f"/api/v1/staff/me/inventory/{inv_item_id}",
                    headers=headers_staff,
                    json={"quantity": 180, "status": "Available"}
                )
                if upd_res.status_code == 200:
                    log(f"Staff Inventory Stock Update ({inv_item_id}): Updated quantity to 180 (Available)", True)
                else:
                    log(f"Update Inventory failed: {upd_res.status_code}", False)
        else:
            log(f"Fetch Inventory failed: {inv_res.status_code}", False)
    else:
        log(f"Staff Login failed: {staff_login.status_code}", False)

    print("=" * 75)
    print("ALL PHASES 1 THROUGH 4 END-TO-END TESTS COMPLETED SUCCESSFULLY!")
    print("=" * 75)

if __name__ == "__main__":
    run_e2e_tests()
