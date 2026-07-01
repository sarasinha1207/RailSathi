import os
import csv
from flask import Flask
from config.settings import Config

def create_app():
    app = Flask(__name__, template_folder='../templates', static_folder='../static')
    app.config.from_object(Config)

    # 1. Setup CSV storage directory and handle migrations
    base_dir = app.config["BASE_DIR"]
    data_dir = os.path.join(base_dir, "data")
    new_csv_path = app.config["CSV_FILE_PATH"]
    old_csv_path = os.path.join(base_dir, "complaints.csv")

    # Define new columns
    NEW_HEADERS = [
        "complaint_id",
        "complaint_type",
        "phone_number",
        "passenger_name",
        "pnr_number",
        "train_number",
        "coach_number",
        "seat_number",
        "current_station",
        "next_station",
        "station_name",
        "platform_number",
        "station_area",
        "main_class",
        "sub_class",
        "incident_date",
        "incident_time",
        "complaint_description",
        "complaint_status",
        "created_at"
    ]

    # Create data directory if not exists
    if not os.path.exists(data_dir):
        os.makedirs(data_dir)

    # Database initialization / migration check
    if not os.path.exists(new_csv_path):
        # Check if we can migrate from old file
        if os.path.exists(old_csv_path):
            print(f"Migrating complaints database from {old_csv_path} to {new_csv_path}...")
            try:
                migrated_rows = []
                with open(old_csv_path, "r", encoding="utf-8") as old_file:
                    reader = csv.reader(old_file)
                    rows = list(reader)

                    if len(rows) > 0:
                        header = rows[0]
                        # Verify it has old header columns (usually 15 columns)
                        is_old_format = len(header) == 15
                        
                        if is_old_format:
                            # If first row starts with CMP, it is a data row and not a header
                            has_header = (header[0] == "complaint_id")
                            start_index = 1 if has_header else 0
                            
                            for row in rows[start_index:]:
                                if not row or len(row) < 15:
                                    continue
                                # Map 15 fields into 20 fields
                                mapped_row = [
                                    row[0],   # complaint_id
                                    "Train",  # complaint_type
                                    row[1],   # phone_number
                                    row[2],   # passenger_name
                                    row[3],   # pnr_number
                                    row[4],   # train_number
                                    row[5],   # coach_number
                                    row[6],   # seat_number
                                    row[7],   # current_station
                                    row[8],   # next_station
                                    "",       # station_name (new)
                                    "",       # platform_number (new)
                                    "",       # station_area (new)
                                    row[9],   # main_class
                                    row[10],  # sub_class
                                    row[11],  # incident_date
                                    "00:00",  # incident_time (new)
                                    row[12],  # complaint_description
                                    row[13],  # complaint_status
                                    row[14]   # created_at
                                ]
                                migrated_rows.append(mapped_row)
                        else:
                            # It's not the standard old format, copy as-is or discard headers
                            migrated_rows = rows[1:]

                # Write new CSV
                with open(new_csv_path, "w", newline="", encoding="utf-8") as new_file:
                    writer = csv.writer(new_file)
                    writer.writerow(NEW_HEADERS)
                    writer.writerows(migrated_rows)
                
                print("Migration successful.")
            except Exception as e:
                print(f"Error migrating old CSV: {e}")
                # Create empty file with headers as fallback
                with open(new_csv_path, "w", newline="", encoding="utf-8") as new_file:
                    writer = csv.writer(new_file)
                    writer.writerow(NEW_HEADERS)
        else:
            # Create fresh database
            with open(new_csv_path, "w", newline="", encoding="utf-8") as new_file:
                writer = csv.writer(new_file)
                writer.writerow(NEW_HEADERS)
            print("Fresh complaints database created.")

    # 2. Register blueprints/routes
    from app.routes import bp as main_blueprint
    app.register_blueprint(main_blueprint)

    return app
