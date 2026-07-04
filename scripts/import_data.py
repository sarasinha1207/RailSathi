import os
import re
import csv
from datetime import datetime

# Define standard headers (21 columns)
NEW_HEADERS = [
    "complaint_id",
    "complaint_type",
    "phone_number",
    "pnr_number",
    "train_number",
    "coach_number",
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
    "created_at",
    "zone_code",
    "zone_name",
    "division_name"
]

zone_names_map = {
    "CR": "Central Railway",
    "ER": "Eastern Railway",
    "ECR": "East Central Railway",
    "ECoR": "East Coast Railway",
    "NR": "Northern Railway",
    "NCR": "North Central Railway",
    "NER": "North Eastern Railway",
    "NFR": "Northeast Frontier Railway",
    "NWR": "North Western Railway",
    "SR": "Southern Railway",
    "SCR": "South Central Railway",
    "SCoR": "South Coast Railway",
    "SER": "South Eastern Railway",
    "SECR": "South East Central Railway",
    "SWR": "South Western Railway",
    "WR": "Western Railway",
    "WCR": "West Central Railway",
    "METRO": "Metro Railway, Kolkata",
    "KR": "Konkan Railway"
}

def clean_val(val):
    if val is None:
        return ""
    return str(val).strip()

def run_import():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    source_csv_path = os.path.join(base_dir, "sample_complaints.csv")
    dest_csv_path = os.path.join(base_dir, "data", "complaints.csv")
    
    if not os.path.exists(source_csv_path):
        print(f"Error: {source_csv_path} not found.")
        return

    print("Reading source CSV file...")
    csv_rows = []
    
    with open(source_csv_path, "r", encoding="utf-8") as f:
        reader = csv.reader(f)
        rows = list(reader)
        
    if len(rows) <= 1:
        print("Error: No data in source CSV.")
        return
        
    print(f"Read {len(rows) - 1} records. Mapping to new 21-column schema...")

    for idx, row in enumerate(rows[1:], 1):
        if not row or all(v == "" for v in row):
            continue
            
        # Map fields based on CSV index layout:
        # 2: complaint_ref_no
        # 3: incident_date (string)
        # 4: mode (T/S)
        # 7: complaint_type (main class)
        # 8: sub_type (sub class)
        # 9: zn_cd (zone code)
        # 10: div_cd (division code)
        # 12: STATUS
        # 13: created_on (string)
        # 16: complaint (description)
        # 18: train_station (number/code)
        # 26: next_station
        # 27: physical_coach_no
        
        # Generate unique sequential ID starting at CMP2024040100001
        comp_id = f"CMP20240401{idx:05d}"
        
        mode = clean_val(row[4]).upper()
        comp_type = "Train" if mode == "T" else "Station"
        
        complaint_text = clean_val(row[16])
        
        # Regex search for phone number in complaint text
        phone_match = re.search(r'\b([6-9]\d{9})\b', complaint_text)
        phone = phone_match.group(1) if phone_match else "9876543210"
        
        # Regex search for PNR in complaint text
        pnr_match = re.search(r'\bPNR[^\d]*(\d{10})\b', complaint_text, re.IGNORECASE)
        pnr = pnr_match.group(1) if pnr_match else ""
        
        train_station = clean_val(row[18])
        train_no = train_station if comp_type == "Train" else ""
        station_name = train_station if comp_type == "Station" else ""
        
        coach = clean_val(row[27])
        if not coach:
            coach_match = re.search(r'\b([A-Z]\d+)\b', complaint_text)
            coach = coach_match.group(1) if coach_match else ""
            
        next_stn = clean_val(row[26])
        
        # Regex search for platform number in complaint text
        plat_match = re.search(r'\b(?:platform|pf|plat|pl)\s*#?\s*(\d+)\b', complaint_text, re.IGNORECASE)
        platform = plat_match.group(1) if plat_match else ""
        
        main_class = clean_val(row[7])
        sub_class = clean_val(row[8])
        
        # Parse created_on datetime string
        created_on_str = clean_val(row[13])
        dt = None
        if created_on_str:
            for fmt in ("%d-%m-%Y %H:%M", "%Y-%m-%d %H:%M:%S", "%d/%m/%Y %H:%M"):
                try:
                    dt = datetime.strptime(created_on_str, fmt)
                    break
                except ValueError:
                    continue
        if not dt:
            dt = datetime.now()
            
        # Parse incident_date string
        incident_date_str = clean_val(row[3])
        inc_dt = None
        if incident_date_str:
            for fmt in ("%d-%m-%Y %H:%M", "%Y-%m-%d %H:%M:%S", "%d/%m/%Y %H:%M", "%d-%m-%Y", "%Y-%m-%d"):
                try:
                    inc_dt = datetime.strptime(incident_date_str, fmt)
                    break
                except ValueError:
                    continue
        if not inc_dt:
            inc_dt = dt
            
        inc_date = inc_dt.strftime("%Y-%m-%d")
        inc_time = inc_dt.strftime("%H:%M")
        created_at = dt.strftime("%Y-%m-%d %H:%M:%S")
        
        status = clean_val(row[12])
        if not status:
            status = "Closed"
            
        zone_code = clean_val(row[9]).upper()
        zone_name = zone_names_map.get(zone_code, f"{zone_code} Railway" if zone_code else "")
        division_name = clean_val(row[10]).title()
        
        csv_row = [
            comp_id,
            comp_type,
            phone,
            pnr,
            train_no,
            coach,
            "",  # current_station
            next_stn,
            station_name,
            platform,
            "",  # station_area
            main_class,
            sub_class,
            inc_date,
            inc_time,
            complaint_text,
            status,
            created_at,
            zone_code,
            zone_name,
            division_name
        ]
        csv_rows.append(csv_row)

    print(f"Writing {len(csv_rows)} records to {dest_csv_path}...")
    
    # Ensure directory exists
    os.makedirs(os.path.dirname(dest_csv_path), exist_ok=True)
    
    with open(dest_csv_path, "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(NEW_HEADERS)
        writer.writerows(csv_rows)
        
    print("CSV data successfully imported into complaints database!")

if __name__ == "__main__":
    run_import()
