import os
import csv
import json
import hashlib
from datetime import datetime
from flask import Blueprint, render_template, request, jsonify, current_app, session, redirect, url_for

bp = Blueprint("main", __name__)

def generate_id(prefix):
    """
    Generates a unique ID with a specific prefix (e.g. CMP for complaints, FBK for feedback)
    by looking up the last record starting with that prefix.
    """
    csv_file = current_app.config["CSV_FILE_PATH"]
    if not os.path.exists(csv_file):
        return f"{prefix}0001"

    try:
        with open(csv_file, "r", encoding="utf-8") as file:
            rows = list(csv.reader(file))
            if len(rows) <= 1:
                return f"{prefix}0001"
            
            # Search backwards for the last ID matching this prefix
            last_number = 0
            for row in reversed(rows[1:]):
                if row and row[0].startswith(prefix):
                    try:
                        num_part = row[0][len(prefix):]
                        last_number = int(num_part)
                        break
                    except ValueError:
                        continue
            
            return f"{prefix}{last_number + 1:04d}"
    except Exception as e:
        print(f"Error generating ID: {e}")
        return f"{prefix}0001"


def append_to_csv(data):
    """Appends a new row to the complaints CSV database."""
    csv_file = current_app.config["CSV_FILE_PATH"]
    try:
        with open(csv_file, "a", newline="", encoding="utf-8") as file:
            writer = csv.writer(file)
            writer.writerow(data)
        return True
    except Exception as e:
        print(f"Error writing to CSV: {e}")
        return False


@bp.route("/")
def home():
    """Renders the main Passenger Portal layout containing all tabs."""
    return render_template("index.html", active_page="portal")


@bp.route("/login", methods=["GET", "POST"])
def login():
    """Renders the Admin Login page and handles authentication."""
    if session.get("logged_in"):
        return redirect(url_for("main.dashboard"))
        
    error = None
    if request.method == "POST":
        username = request.form.get("username", "").strip()
        password = request.form.get("password", "").strip()
        
        expected_user = current_app.config.get("ADMIN_USERNAME", "admin")
        expected_pass = current_app.config.get("ADMIN_PASSWORD", "admin123")
        
        if username == expected_user and password == expected_pass:
            session["logged_in"] = True
            return redirect(url_for("main.dashboard"))
        else:
            error = "Invalid Username or Password!"
            
    return render_template("login.html", error=error)


@bp.route("/logout")
def logout():
    """Logs out the Admin and clears the session."""
    session.pop("logged_in", None)
    return redirect(url_for("main.home"))


@bp.route("/dashboard")
def dashboard():
    """Renders the Complaint Monitoring Dashboard with statistics and charts."""
    if not session.get("logged_in"):
        return redirect(url_for("main.login"))

    csv_file = current_app.config["CSV_FILE_PATH"]
    complaints = []
    
    if os.path.exists(csv_file):
        try:
            with open(csv_file, "r", encoding="utf-8") as file:
                reader = csv.reader(file)
                headers = next(reader)
                
                for row in reader:
                    if not row or len(row) < len(headers):
                        continue
                    row_dict = dict(zip(headers, row))
                    complaints.append(enrich_complaint(row_dict))
        except Exception as e:
            print(f"Error loading complaints for dashboard: {e}")

    return render_template(
        "dashboard.html",
        active_page="dashboard",
        complaints_json=json.dumps(complaints)
    )


def enrich_complaint(row_dict):
    """Dynamically derives department, priority, zone and division for analysis."""
    category = row_dict.get("main_class", "").lower()
    department = "Other"
    priority = "Medium"
    
    # 1. Map Category (main_class) to Department & Priority
    if "security" in category or "theft" in category or "harassment" in category:
        department = "Security (RPF)"
        priority = "High"
    elif "cleanliness" in category or "dirty" in category or "toilet" in category or "waste" in category:
        department = "Mechanical (Cleanliness)"
        priority = "Low"
    elif "catering" in category or "food" in category or "water bottle" in category:
        department = "Commercial (Catering)"
        priority = "Medium"
    elif "electrical" in category or "ac" in category or "lighting" in category or "fan" in category or "charging" in category:
        department = "Electrical"
        priority = "Medium"
    elif "bed roll" in category or "linen" in category or "blanket" in category:
        department = "Mechanical (Coaching)"
        priority = "Low"
    elif "medical" in category or "emergency" in category or "first aid" in category:
        department = "Medical"
        priority = "High"
    elif "staff" in category or "behaviour" in category or "tte" in category:
        department = "Commercial (Staff)"
        priority = "Medium"
    elif "punctuality" in category or "delay" in category or "speed" in category:
        department = "Operating"
        priority = "Medium"
    elif "engineering" in category or "track" in category or "bridge" in category or "building" in category:
        department = "Engineering"
        priority = "Medium"
        
    # 2. Map Zone and Division (use database if present, otherwise fallback to hash)
    zone_code = row_dict.get("zone_code", "")
    zone_name = row_dict.get("zone_name", "")
    division_name = row_dict.get("division_name", "")
    
    complaint_id = row_dict.get("complaint_id", "")
    h = int(hashlib.md5(complaint_id.encode("utf-8")).hexdigest(), 16)

    if not zone_code or not division_name:
        zones_pool = [
            ("NR", "Northern Railway", ["Delhi", "Ambala", "Firozpur"]),
            ("WR", "Western Railway", ["Mumbai Central", "Ahmedabad", "Vadodara"]),
            ("SR", "Southern Railway", ["Chennai", "Madurai", "Palakkad"]),
            ("CR", "Central Railway", ["Mumbai CSMT", "Pune", "Solapur"]),
            ("NCR", "North Central Railway", ["Prayagraj", "Agra", "Jhansi"]),
            ("SCR", "South Central Railway", ["Secunderabad", "Hyderabad", "Nanded"]),
            ("ECR", "East Central Railway", ["Danapur", "Dhanbad", "Samastipur"]),
            ("SWR", "South Western Railway", ["Hubballi", "Bengaluru", "Mysuru"]),
            ("SCoR", "South Coast Railway", ["Visakhapatnam", "Vijayawada", "Guntakal"]),
            ("SER", "South Eastern Railway", ["Kharagpur", "Adra", "Chakradharpur"]),
            ("SECR", "South East Central Railway", ["Bilaspur", "Raipur", "Nagpur SECR"]),
            ("WCR", "West Central Railway", ["Jabalpur", "Bhopal", "Kota"])
        ]
        
        selected_zone = zones_pool[h % len(zones_pool)]
        zone_code = selected_zone[0]
        zone_name = selected_zone[1]
        divisions = selected_zone[2]
        division_name = divisions[(h // len(zones_pool)) % len(divisions)]
    
    # 3. Simulate In Progress / Resolved status for demo mapping
    status = row_dict.get("complaint_status", "Open")
    if status == "Open" and (h % 3 == 1):
        status = "In Progress"
    elif status == "Closed":
        status = "Resolved"
        
    row_dict["department"] = department
    row_dict["priority"] = priority
    row_dict["zone_code"] = zone_code
    row_dict["zone_name"] = zone_name
    row_dict["division_name"] = division_name
    row_dict["display_status"] = status
    
    return row_dict


@bp.route("/submit-train", methods=["POST"])
def submit_train():
    """Handles Train Complaint submissions via AJAX."""
    try:
        complaint_id = generate_id("CMP")
        
        # Parse datetime-local input
        incident_datetime = request.form.get("incident_datetime", "")
        incident_date = ""
        incident_time = ""
        if incident_datetime and "T" in incident_datetime:
            parts = incident_datetime.split("T")
            incident_date = parts[0]
            incident_time = parts[1]
        else:
            incident_date = incident_datetime

        # Build 21 columns data list
        data = [
            complaint_id,
            "Train",
            request.form.get("phone_number", ""),
            request.form.get("pnr_number", ""),
            request.form.get("train_number", ""),
            request.form.get("coach_number", ""),
            request.form.get("current_station", ""),
            request.form.get("next_station", ""),
            "", # station_name
            "", # platform_number
            "", # station_area
            request.form.get("main_class", ""),
            request.form.get("sub_class", ""),
            incident_date,
            incident_time,
            request.form.get("complaint_description", ""),
            "Open",
            datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "", # zone_code
            "", # zone_name
            ""  # division_name
        ]

        if append_to_csv(data):
            return jsonify({"status": "success", "complaint_id": complaint_id})
        else:
            return "Internal Server Error writing record.", 500
    except Exception as e:
        return f"Error: {str(e)}", 400


@bp.route("/submit-station", methods=["POST"])
def submit_station():
    """Handles Station Complaint submissions via AJAX."""
    try:
        complaint_id = generate_id("CMP")

        # Parse datetime-local input
        incident_datetime = request.form.get("incident_datetime", "")
        incident_date = ""
        incident_time = ""
        if incident_datetime and "T" in incident_datetime:
            parts = incident_datetime.split("T")
            incident_date = parts[0]
            incident_time = parts[1]
        else:
            incident_date = incident_datetime

        # Build 21 columns data list
        data = [
            complaint_id,
            "Station",
            request.form.get("phone_number", ""),
            "", # pnr_number
            "", # train_number
            "", # coach_number
            "", # current_station
            "", # next_station
            request.form.get("station_name", ""),
            request.form.get("platform_number", ""),
            request.form.get("station_area", ""),
            request.form.get("main_class", ""),
            request.form.get("sub_class", ""),
            incident_date,
            incident_time,
            request.form.get("complaint_description", ""),
            "Open",
            datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "", # zone_code
            "", # zone_name
            ""  # division_name
        ]

        if append_to_csv(data):
            return jsonify({"status": "success", "complaint_id": complaint_id})
        else:
            return "Internal Server Error writing record.", 500
    except Exception as e:
        return f"Error: {str(e)}", 400



@bp.route("/track-api/<complaint_id>", methods=["GET"])
def track_api(complaint_id):
    """Searches the database and returns complaint details in JSON format."""
    csv_file = current_app.config["CSV_FILE_PATH"]
    if not os.path.exists(csv_file):
        return jsonify({"error": "No database found"}), 404

    try:
        with open(csv_file, "r", encoding="utf-8") as file:
            reader = csv.reader(file)
            headers = next(reader)
            
            for row in reader:
                if row and row[0].strip().lower() == complaint_id.strip().lower():
                    # Map row back to a clean dictionary
                    complaint_data = dict(zip(headers, row))
                    return jsonify(complaint_data)
        
        return jsonify({"error": "Complaint not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500
