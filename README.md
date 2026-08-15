# RailSathi — Unified Passenger Grievance & Assistance Portal

**RailSathi** is an enterprise-grade passenger grievance redressal, operational control, and real-time monitoring portal for Indian Railways. Built with **FastAPI**, **React (Vite)**, and **MySQL 8.0**, it maps 18 Zonal Railways, 71 Divisions, over 10,000+ complaint records, and 545+ onboard/station staff members into a unified supervisory intelligence network.

---

## Key Features & Dashboards

- **Passenger Grievance Registration**: File train & station grievances with instant PNR validation, station code autocomplete, coach mapping, and photo/document attachment support.
-  **Real-Time Status Tracking**: Live tracking using a unique Complaint Reference ID (`CMP2026...`) with OTP resolution verification.
- **Chief Medical Officer (CMO) Operational Control**:
  - Pan-India Zonal & Divisional Intelligence metrics across 18 Zones and 71 Divisions.
  - Reassignment & Inter-Division Transfer Desk with CMO review modal.
  - Interactive SVG Department & Priority distribution charts.
- **System Administrator Supervisory Dashboard**:
  - System-wide operational control & supervisory escalation management.
  - 100% database-driven metrics (10,019 complaints, 0 hardcoded fallbacks).
  - Staff Supervision Directory filtering out administrative system roles.
-  **Onboard & Station Staff Portal**:
  - Active duty task management for TTEs, OBHS housekeeping, electrical technicians, and RPF officers.
  - Real-time train route halts, coach inventory tracking, and passenger resolution verification.
-  **High Performance Architecture**:
  - FastAPI GZip response compression (80–90% payload reduction).
  - React.lazy & Suspense route-level code splitting (41% frontend bundle size reduction).
  - 20-second thread-safe in-memory caching for analytics endpoints (< 10ms response latency).

---

## Technology Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, Vite 8, JavaScript ES6+, Custom Vanilla CSS3 Design System |
| **Backend** | FastAPI (Python 3.12), Uvicorn ASGI Server, Pydantic v2 |
| **Database** | MySQL 8.0 / MariaDB, SQLAlchemy 2.0 ORM, PyMySQL |
| **Authentication** | Encrypted Cookie Session Middleware & Role-Based Access Control (RBAC) |

---

## Project Structure

```
Passenger Complaint form/
├── backend/                  # FastAPI Application
│   └── app/
│       ├── __init__.py       # App initialization, static SPA fallback & GZip middleware
│       ├── config.py         # App configuration & settings
│       ├── database.py       # SQLAlchemy engine & session setup
│       ├── models.py         # Database models (Complaints, Staff, Zones, Divisions, Stations, Trains)
│       ├── routes.py         # REST API endpoints, analytics aggregation & session auth
│       ├── schemas.py        # Pydantic data validation schemas
│       └── seeding.py        # Database seed generator (10,019 complaints, 18 Zones, 71 Divisions)
├── frontend/                 # React UI Application (Vite)
│   ├── src/
│   │   ├── components/       # Common components (Header, Hero, FAQ, HelpPage, SettingsPage)
│   │   ├── dashboard/        # Role-based dashboard views
│   │   │   ├── admin/        # Admin Home, Analytics, Complaints, Staff Management
│   │   │   ├── cmo/          # CMO Home, Complaints, Reassignment, ZoneDivisionPage
│   │   │   └── staff/        # Staff Dashboard, Complaints, Journey, Inventory
│   │   ├── routes/           # RoleRoute & DashboardRoutes with React.lazy code-splitting
│   │   ├── App.jsx           # SPA Root component
│   │   └── index.css         # RailSathi CSS Design System
│   ├── package.json          # Frontend dependencies & build scripts
│   └── vite.config.js        # Vite proxy setup & manual chunking
├── data/                     # Local MySQL data files & seed resources
├── docs/                     # Documentation & reference guides
├── scripts/                  # Data migration & utility scripts
├── .gitignore                # Git ignore rules
├── README.md                 # Project documentation
├── requirements.txt          # Python backend dependencies
├── run.py                    # Server launcher
├── start_backend.bat         # Batch script to launch FastAPI server
└── start_mysql.bat           # Batch script to launch MySQL service
```

---

## Quick Start & Local Setup

### 1. Prerequisites
- **Python 3.10+**
- **Node.js 18+** & **npm**
- **MySQL 8.0+**

### 2. Backend Setup
```bash
# Install Python dependencies
pip install -r requirements.txt

# Start local MySQL database (if using batch script)
start_mysql.bat

# Launch FastAPI backend server
python run.py
```
*Backend will run at `http://127.0.0.1:5000`.*

### 3. Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install Node dependencies
npm install

# Build for production or start dev server
npm run dev
```
*Frontend dev server will run at `http://localhost:3000`.*

---

## Default Credentials for Testing

| Role | Username | Password | Access Scope |
|---|---|---|---|
| **Administrator** | `admin` | `admin123` | System-wide Supervisory Dashboard |
| **Complaint Officer (CMO)** | `officer1` | `officer123` | CMO Operational Control & Reassignment Desk |
| **Onboard Staff (STE)** | `stf_ste_22477` | `password123` | Duty Complaints & Train Journey Tasks |

---

## License

Developed for Indian Railways Grievance Redressal & Monitoring System. All rights reserved.