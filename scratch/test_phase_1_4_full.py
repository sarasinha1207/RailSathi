import requests
import json
import sys

BASE_URL = "http://localhost:8000"

def log(msg, success=True):
    symbol = "[PASS]" if success else "[FAIL]"
    print(f"{symbol} {msg}")

def run_tests():
    print("=" * 60)
    print("STARTING END-TO-END VERIFICATION: PHASES 1 THROUGH 4")
    print("=" * 60)

    # -------------------------------------------------------------
    # PHASE 1: PUBLIC GRIEVANCE FILING & TRACKING
    # -------------------------------------------------------------
    print("\n--- TESTING PHASE 1: Public Grievance Filing & Tracking ---")
    
    # 1.1 Submit Train Complaint
    complaint_payload = {
        "pnr_number": "2247789012",
        "train_number": "22477",
        "coach": "C2",
        "seat": "45",
        "complainant_name": "Test Passenger Phase1",
        "phone_number": "9876543210",
        "incident_date": "2026-08-15",
        "incident_time": "14:30",
        "category": "Cleanliness",
        "subcategory": "Unclean Toilet",
        "description": "Dirty coach toilet requiring immediate OBHS cleaning.",
        "pnr_validated": True
    }
    
    try:
        res = requests.post(f"{BASE_URL}/api/v1/complaints/train", json=complaint_payload)
        if res.status_code == 200:
            data = res.json()
            complaint_id = data.get("complaint_id") or data.get("data", {}).get("complaint_id")
            log(f"Public Train Complaint Filing: Created ID {complaint_id}", True)
        else:
            log(f"Public Train Complaint Filing failed: {res.status_code} {res.text}", False)
            complaint_id = None
    except Exception as e:
        log(f"Error submitting public complaint: {e}", False)
        complaint_id = None

    # 1.2 Track Complaint Status
    if complaint_id:
        try:
            res = requests.get(f"{BASE_URL}/api/v1/complaints/{complaint_id}")
            if res.status_code == 200:
                log(f"Track Complaint ({complaint_id}): Status fetched successfully", True)
            else:
                log(f"Track Complaint ({complaint_id}) failed: {res.status_code}", False)
        except Exception as e:
            log(f"Error tracking complaint: {e}", False)

    # -------------------------------------------------------------
    # PHASE 2: DATABASE & 7-HALT TIMETABLE INTEGRITY
    # -------------------------------------------------------------
    print("\n--- TESTING PHASE 2: Database Integrity & Train 22477 Route ---")
    try:
        res = requests.get(f"{BASE_URL}/api/v1/trains/22477/schedule")
        if res.status_code == 200:
            halts = res.json().get("halts") or res.json().get("data", {}).get("halts") or []
            if len(halts) == 7:
                station_codes = [h["station_code"] for h in halts]
                expected = ["NDLS", "UMB", "LDH", "KTHU", "JAT", "MCTM", "SVDK"]
                if station_codes == expected:
                    log(f"Train 22477 Exact 7 Stopping Stations verified: {station_codes}", True)
                else:
                    log(f"Train 22477 Halts mismatch: {station_codes} vs {expected}", False)
            else:
                log(f"Train 22477 Halts count expected 7, got {len(halts)}", False)
        else:
            log(f"Fetch Train 22477 Schedule failed: {res.status_code}", False)
    except Exception as e:
        log(f"Error checking Train 22477 schedule: {e}", False)

    # -------------------------------------------------------------
    # PHASE 3: CMO DASHBOARD APIs
    # -------------------------------------------------------------
    print("\n--- TESTING PHASE 3: CMO Dashboard & Admin APIs ---")
    cmo_token = None
    try:
        res = requests.post(f"{BASE_URL}/api/v1/auth/login", data={"username": "cmo_nr", "password": "password123"})
        if res.status_code == 200:
            cmo_token = res.json().get("access_token")
            log("CMO Login (cmo_nr): Success", True)
        else:
            log(f"CMO Login failed: {res.status_code}", False)
    except Exception as e:
        log(f"Error in CMO login: {e}", False)

    if cmo_token:
        headers = {"Authorization": f"Bearer {cmo_token}"}
        try:
            res = requests.get(f"{BASE_URL}/api/v1/cmo/dashboard", headers=headers)
            if res.status_code == 200:
                log("CMO Dashboard Overview Stats fetched successfully", True)
            else:
                log(f"CMO Dashboard fetch failed: {res.status_code}", False)
        except Exception as e:
            log(f"Error fetching CMO dashboard: {e}", False)

    # -------------------------------------------------------------
    # PHASE 4: STAFF DASHBOARD APIs & WORKFLOWS
    # -------------------------------------------------------------
    print("\n--- TESTING PHASE 4: Staff Dashboard APIs (stf_cat_22477) ---")
    staff_token = None
    try:
        res = requests.post(f"{BASE_URL}/api/v1/auth/login", data={"username": "stf_cat_22477", "password": "password123"})
        if res.status_code == 200:
            staff_token = res.json().get("access_token")
            log("Staff Login (stf_cat_22477): Success", True)
        else:
            log(f"Staff Login failed: {res.status_code} {res.text}", False)
    except Exception as e:
        log(f"Error in Staff login: {e}", False)

    if staff_token:
        headers = {"Authorization": f"Bearer {staff_token}"}
        
        # 4.1 Fetch Assigned Complaints
        try:
            res = requests.get(f"{BASE_URL}/api/v1/staff/me/complaints", headers=headers)
            if res.status_code == 200:
                complaints = res.json().get("data", [])
                log(f"Staff Complaints Endpoint: Fetched {len(complaints)} complaints from DB", True)
                
                # Test Complaint Action: Update Remark & Mark Resolved
                if complaints:
                    target_cmp = complaints[0]["complaint_id"]
                    act_res = requests.put(
                        f"{BASE_URL}/api/v1/staff/me/complaints/{target_cmp}",
                        headers=headers,
                        json={"status": "Closed", "remarks": "Resolved onboard by catering supervisor."}
                    )
                    if act_res.status_code == 200:
                        log(f"Staff Action on Complaint {target_cmp}: Remarks added & status updated to Closed", True)
                    else:
                        log(f"Staff Action on Complaint {target_cmp} failed: {act_res.status_code}", False)
            else:
                log(f"Staff Complaints Endpoint failed: {res.status_code}", False)
        except Exception as e:
            log(f"Error fetching staff complaints: {e}", False)

        # 4.2 Fetch Onboard Crew Roster
        try:
            res = requests.get(f"{BASE_URL}/api/v1/staff/me/onboard-crew", headers=headers)
            if res.status_code == 200:
                crew = res.json().get("data", [])
                log(f"Staff Onboard Crew Endpoint: Fetched {len(crew)} fellow staff members", True)
            else:
                log(f"Staff Onboard Crew Endpoint failed: {res.status_code}", False)
        except Exception as e:
            log(f"Error fetching onboard crew: {e}", False)

        # 4.3 Fetch Train Journey & Coach Layout
        try:
            res = requests.get(f"{BASE_URL}/api/v1/staff/me/train-journey", headers=headers)
            if res.status_code == 200:
                j_data = res.json()
                coaches = j_data.get("coaches", [])
                halts = j_data.get("journey_halts", [])
                log(f"Staff Train Journey Endpoint: Fetched {len(coaches)} coaches and {len(halts)} route halts", True)
            else:
                log(f"Staff Train Journey Endpoint failed: {res.status_code}", False)
        except Exception as e:
            log(f"Error fetching train journey: {e}", False)

        # 4.4 Fetch & Update Onboard Inventory
        try:
            res = requests.get(f"{BASE_URL}/api/v1/staff/me/inventory", headers=headers)
            if res.status_code == 200:
                inv_items = res.json().get("data", [])
                log(f"Staff Inventory Endpoint: Fetched {len(inv_items)} stock items", True)
                if inv_items:
                    item_id = inv_items[0]["inventory_id"]
                    inv_upd = requests.put(
                        f"{BASE_URL}/api/v1/staff/me/inventory/{item_id}",
                        headers=headers,
                        json={"quantity": 150, "status": "Available"}
                    )
                    if inv_upd.status_code == 200:
                        log(f"Staff Inventory Stock Update for item {item_id}: Success", True)
                    else:
                        log(f"Staff Inventory Stock Update failed: {inv_upd.status_code}", False)
            else:
                log(f"Staff Inventory Endpoint failed: {res.status_code}", False)
        except Exception as e:
            log(f"Error fetching staff inventory: {e}", False)

    print("=" * 60)
    print("ALL PHASES 1 THROUGH 4 END-TO-END VERIFICATION COMPLETED")
    print("=" * 60)

if __name__ == "__main__":
    run_tests()
