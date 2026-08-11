import sys
import requests

BASE_URL = "http://127.0.0.1:5000"

def run_tests():
    print("--- Starting Automated FastAPI Integration Verification ---")
    session = requests.Session()

    # 1. PNR Check
    print("\n[Test 1] PNR Lookup API")
    pnr_num = "2876543210"
    res = session.get(f"{BASE_URL}/api/v1/pnr/{pnr_num}")
    assert res.status_code == 200, f"PNR lookup should succeed, got status {res.status_code}"
    pnr_json = res.json()
    print(f"PNR lookup result: {pnr_json}")
    assert pnr_json["train_number"] == "12002", "Train number should be 12002"
    assert pnr_json["train_name"] in ["Bhopal Shatabdi Express", "BHOPAL SHTBDI"], "Train name should match"
    
    # Invalid PNR
    res = session.get(f"{BASE_URL}/api/v1/pnr/0000000000")
    assert res.status_code == 404, f"Invalid PNR lookup should return 404, got {res.status_code}"
    print("=> PNR lookup checks passed!")

    # 2. Submit Train Complaint (Form Data)
    print("\n[Test 2] Submit Train Complaint")
    train_data = {
        "phone_number": "9876543210",
        "pnr_number": pnr_num,
        "train_number": "12002",
        "coach_number": "C1",
        "main_class": "Bed Roll",
        "sub_class": "Dirty / Torn",
        "incident_datetime": "2026-07-01T14:30",
        "complaint_description": "Blanket is torn."
    }
    res = session.post(f"{BASE_URL}/api/v1/submit-train", data=train_data)
    assert res.status_code == 200, f"Submit train complaint failed, status {res.status_code}: {res.text}"
    res_json = res.json()
    print(f"Train complaint response: {res_json}")
    assert res_json["status"] == "success", "Submission status should be success"
    train_id = res_json["complaint_id"]
    assert train_id.startswith("CMP"), "Complaint ID should start with CMP"
    print(f"=> Submit train complaint passed! Assigned ID: {train_id}")

    # 3. Submit Station Complaint (Form Data)
    print("\n[Test 3] Submit Station Complaint")
    station_data = {
        "phone_number": "8765432109",
        "station_name": "New Delhi",
        "platform_number": "4",
        "main_class": "Cleanliness",
        "sub_class": "Platform",
        "incident_datetime": "2026-07-01T15:00",
        "complaint_description": "Litter on platform 4."
    }
    res = session.post(f"{BASE_URL}/api/v1/submit-station", data=station_data)
    assert res.status_code == 200, f"Submit station complaint failed, status {res.status_code}: {res.text}"
    res_json = res.json()
    print(f"Station complaint response: {res_json}")
    assert res_json["status"] == "success", "Submission status should be success"
    station_id = res_json["complaint_id"]
    assert station_id.startswith("CMP"), "Complaint ID should start with CMP"
    assert station_id != train_id, "Different complaints must have different IDs"
    print(f"=> Submit station complaint passed! Assigned ID: {station_id}")

    # 4. Track Complaint
    print("\n[Test 4] Track Complaint API")
    res = session.get(f"{BASE_URL}/track-api/{train_id}")
    assert res.status_code == 200, f"Track {train_id} failed"
    track_json = res.json()
    print(f"{train_id} tracked details: {track_json}")
    assert track_json["complaint_id"] == train_id, "Tracked ID mismatch"
    assert track_json["complaint_status"] == "Open", "Initial status should be Open"

    # Track non-existent
    res = session.get(f"{BASE_URL}/track-api/CMP9999999")
    assert res.status_code == 404, f"Tracking non-existent should fail with 404, got {res.status_code}"
    print("=> Tracking check passed!")

    # 5. Submit Passenger Feedback (Form Data)
    print("\n[Test 5] Passenger Feedback Submit API")
    feedback_data = {
        "complaint_id": train_id,
        "feedback": "Great response times!",
        "rating": "Excellent"
    }
    res = session.post(f"{BASE_URL}/submit-feedback", data=feedback_data)
    assert res.status_code == 200, f"Feedback submit failed, status {res.status_code}"
    res_json = res.json()
    assert res_json["status"] == "success", "Feedback submit status should be success"
    
    # Track again to verify feedback details are attached
    res = session.get(f"{BASE_URL}/track-api/{train_id}")
    assert res.status_code == 200
    track_json = res.json()
    assert track_json["feedback"] == "Great response times!", "Feedback did not match"
    assert track_json["rating"] == "Excellent", "Rating did not match"
    
    # Submit duplicate feedback (should return 400)
    res = session.post(f"{BASE_URL}/submit-feedback", data=feedback_data)
    assert res.status_code == 400, f"Duplicate feedback should return 400, got {res.status_code}"
    assert "already submitted" in res.text, "Duplicate feedback error message mismatch"
    print("=> Passenger feedback checks passed!")

    # 6. Auth Flow & Session Verification (JSON Payload)
    print("\n[Test 6] Authentication Flow & Session Protection")
    # Check current session (should be unauthenticated)
    res = session.get(f"{BASE_URL}/api/v1/auth/me")
    assert res.status_code == 200
    assert not res.json()["logged_in"], "Should not be logged in"

    # Access protected complaints (should fail)
    res = session.get(f"{BASE_URL}/api/v1/dashboard/complaints")
    assert res.status_code == 401, f"Expected 401 Unauthorized for complaints, got {res.status_code}"

    # Try invalid login
    res = session.post(f"{BASE_URL}/api/v1/auth/login", json={"username": "wrong", "password": "wrong"})
    assert res.status_code == 401, "Invalid login should return 401"
    
    # Login with valid credentials
    res = session.post(f"{BASE_URL}/api/v1/auth/login", json={"username": "admin", "password": "admin123"})
    assert res.status_code == 200, f"Valid login failed, status {res.status_code}"
    print(f"Login success: {res.json()}")

    # Check session again (should be authenticated)
    res = session.get(f"{BASE_URL}/api/v1/auth/me")
    assert res.status_code == 200
    me_json = res.json()
    assert me_json["logged_in"], "Should be logged in"
    assert me_json["username"] == "admin"
    print("=> Login session check passed!")

    # 7. Dashboard Complaints API
    print("\n[Test 7] Authenticated Dashboard Complaints API")
    res = session.get(f"{BASE_URL}/api/v1/dashboard/complaints")
    assert res.status_code == 200, f"Failed to retrieve complaints: {res.text}"
    complaints_list = res.json()
    print(f"Retrieved {len(complaints_list)} complaints from dashboard")
    assert isinstance(complaints_list, list), "Response should be a list"
    assert len(complaints_list) > 0, "Complaints list should not be empty"
    print("=> Dashboard complaints retrieval passed!")

    # 8. Logout
    print("\n[Test 8] Session Logout")
    res = session.get(f"{BASE_URL}/api/v1/auth/logout")
    assert res.status_code == 200
    
    # Verify session is cleared
    res = session.get(f"{BASE_URL}/api/v1/auth/me")
    assert not res.json()["logged_in"], "Should be logged out"
    print("=> Logout & reprotection check passed!")

    print("\n--- ALL INTEGRATION TESTS COMPLETED SUCCESSFULLY ---")

if __name__ == "__main__":
    run_tests()
