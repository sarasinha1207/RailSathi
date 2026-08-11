# RailSathi — Unified Passenger Grievance & Assistance Portal

**RailSathi** is an official passenger grievance redressal and real-time monitoring portal for Indian Railways. It provides passengers with a streamlined platform to report train and station issues, request emergency assistance, and track complaint resolution status in real-time.

---

## Key Features

-  **Train Grievance Registration**: File complaints with PNR auto-validation, train selection, coach number, and incident details.
-  **Station Grievance Registration**: Report location-specific concerns at any Indian Railways station and platform.
-  **Real-Time Status Tracking**: Track resolution progress instantly using a unique Complaint Reference ID.
-  **Zonal & Divisional Architecture**: Full hierarchy mapping across 18 Indian Railway Zones (*NR, CR, WR, SR, SCR, ER, NCR, etc.*) and their respective divisions.
-  **Admin Dashboard**: Comprehensive administrative portal for railway officers to manage, route, and resolve complaints by category and zone.
-  **Interactive FAQ & Knowledge Base**: Searchable passenger query hub covering train/station category breakdowns.

---

##  Technology Stack

| Layer | Technology |
|---|---|
| **Frontend** | React (Vite), JavaScript ES6+, Custom Vanilla CSS3 Design System |
| **Backend** | FastAPI (Python 3.12), Uvicorn Server, Pydantic |
| **Database** | MySQL 8.0, SQLAlchemy ORM, PyMySQL |

---

##  Project Structure

```
Passenger Complaint form/
├── backend/                  # FastAPI Application
│   └── app/
│       ├── __init__.py       # App initialization & static route mounting
│       ├── config.py         # App configuration & settings
│       ├── database.py       # SQLAlchemy engine & session setup
│       ├── models.py         # Database schemas (Complaints, Trains, Stations, Zones, Users)
│       ├── routes.py         # REST API endpoints & Auth handlers
│       ├── schemas.py        # Pydantic validation schemas
│       └── seeding.py        # Auto-seeding database startup script
├── frontend/                 # React UI Application
│   ├── src/
│   │   ├── components/       # Header, Hero, Home, Forms, Dashboard, FAQ, About
│   │   ├── constants/        # Railway categories & subcategories data
│   │   ├── App.jsx           # Root layout & page switcher
│   │   └── index.css         # Primary RailSathi CSS Design System
│   ├── package.json          # Frontend dependencies & scripts
│   └── vite.config.js        # Vite build configuration & API proxy setup
├── data/                     # Local MySQL data files & seed resources
├── scripts/                  # Data processing & setup scripts
├── .gitignore                # Git ignore configuration
├── README.md                 # Project documentation
├── requirements.txt          # Python dependencies
├── run.py                    # FastAPI server entry point
├── start_backend.bat         # Windows batch launcher for FastAPI server
└── start_mysql.bat           # Windows batch launcher for local MySQL server
```