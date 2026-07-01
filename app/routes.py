import os
import csv
from datetime import datetime
from flask import Blueprint, render_template, request, jsonify, current_app

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
    return render_template("index.html")


@bp.route("/submit-train", methods=["POST"])
def submit_train():
    """Handles Train Complaint submissions via AJAX."""
    try:
        complaint_id = generate_id("CMP")
        
        # Build 20 columns data list
        data = [
            complaint_id,
            "Train",
            request.form.get("phone_number", ""),
            request.form.get("passenger_name", ""),
            request.form.get("pnr_number", ""),
            request.form.get("train_number", ""),
            request.form.get("coach_number", ""),
            request.form.get("seat_number", ""),
            request.form.get("current_station", ""),
            request.form.get("next_station", ""),
            "", # station_name
            "", # platform_number
            "", # station_area
            request.form.get("main_class", ""),
            request.form.get("sub_class", ""),
            request.form.get("incident_date", ""),
            request.form.get("incident_time", ""),
            request.form.get("complaint_description", ""),
            "Open",
            datetime.now().strftime("%Y-%m-%d %H:%M:%S")
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

        # Build 20 columns data list
        data = [
            complaint_id,
            "Station",
            request.form.get("phone_number", ""),
            request.form.get("passenger_name", ""),
            "", # pnr_number
            "", # train_number
            "", # coach_number
            "", # seat_number
            "", # current_station
            "", # next_station
            request.form.get("station_name", ""),
            request.form.get("platform_number", ""),
            request.form.get("station_area", ""),
            request.form.get("main_class", ""),
            request.form.get("sub_class", ""),
            request.form.get("incident_date", ""),
            request.form.get("incident_time", ""),
            request.form.get("complaint_description", ""),
            "Open",
            datetime.now().strftime("%Y-%m-%d %H:%M:%S")
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
