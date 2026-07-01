# RailAssist Passenger Complaint Registration & Tracking System

This is a clean, production-ready, industry-standard implementation of the **Passenger Complaint Registration and Tracking System** (inspired by the official Indian Railways RailAssist portal).

---

## Folder Structure

The project has been refactored into the following clean, professional layout:

```
Passenger Complaint form/
├── app/
│   ├── __init__.py          # Flask app generator & database migration utility
│   └── routes.py            # Backend route controllers (Submit, AJAX, Tracker APIs)
├── config/
│   └── settings.py          # App settings and paths configurations
├── data/
│   └── complaints.csv       # Complaints record store (SQLite-like CSV store)
├── docs/
│   └── README.md            # System developer guide
├── static/
│   ├── css/
│   │   └── style.css        # Premium stylesheets (Modern variables, RailAssist burgundy theme)
│   └── js/
│       ├── categories.js    # Unified classes & subclasses for Train and Station complaints
│       └── main.js          # Asynchronous form controllers and tab selectors
├── templates/
│   ├── base.html            # Core layout base
│   └── index.html           # Passenger portal interface (SPA structure with sidebar)
├── .gitignore               # Ignored local files
├── requirements.txt         # Project dependencies
└── run.py                   # Server launcher
```

---

## Features

1. **Dual complaint types**: Separate registration forms for **Train Complaints** (requires Train number, Coach, Seat) and **Station Complaints** (requires Station Name, Platform Number).
2. **Unified Categories Config**: A single JavaScript categories config file (`categories.js`) containing:
   - Train categories (Bed Roll, Coach Maintenance, etc.)
   - Station categories (17 classes and 99 subclasses listed by the user).
3. **Grouped incident date & time**: Incident Date and Time input fields placed side-by-side inside the forms.
4. **Appreciation / Rail Anubhav**: A feedback tab to share suggestions or positive experiences.
5. **Real-time Tracker**: Search the status of a concern instantly by its reference ID without page reloads.
6. **Robust CSV DB System**: Automatic header migration checks and dual-prefix unique ID generator (`CMP` for complaints, `FBK` for feedback).

---

## Installation & Setup

1. **Clone/Navigate** into the project workspace directory:
   ```bash
   cd "E:/PROJECTS/Passenger Complaint form"
   ```

2. **Create and Activate a Virtual Environment** (Optional but recommended):
   ```bash
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Launch the server**:
   ```bash
   python run.py
   ```

5. Open your web browser and navigate to:
   ```
   http://127.0.0.1:5000/
   ```
