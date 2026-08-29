# RailSathi - Railway Passenger Grievance & Assistance Portal

## 1. Project Overview

Indian Railways operates one of the largest passenger transportation systems in the world, comprising **18 Railway Zones** and **71 Operational Divisions**, spanning **69,439 route kilometres**, **1,11,641 running track kilometres**, and **1,37,522 total track kilometres**. Operating an average of **13,940 passenger trains per day** and transporting over **7.29 billion passengers annually (729.3 crore journeys)**, managing passenger grievances across vast operational jurisdictions poses significant communication, coordination, and accountability challenges.

**RailSathi** is developed as a unified, full-lifecycle digital platform that transforms railway grievance redressal from fragmented communication channels into an end-to-end, deterministic workflow covering:

**Registration $\rightarrow$ Verification $\rightarrow$ Assignment $\rightarrow$ Acceptance $\rightarrow$ Field Execution $\rightarrow$ Reassignment / Escalation $\rightarrow$ Resolution $\rightarrow$ Feedback Collection**.

<div align="center">

<img src="docs/screenshots/RailSathi_Interface.png" width="1503" height="1125" alt="RailSathi Unified Public Interface">

<p> <em>Figure 1: RailSathi Public Interface</em></p>

</div>


## 2. Key Features

- **Automated PNR & Journey Lookup**: Direct validation against passenger booking records to retrieve train number, coach, berth, and route halts.
- **2-Tier Hierarchical Taxonomy**: 163 specialized issue categories mapped across 15 technical railway service departments.
- **Complaint Verification & Priority Tagging**: Complaint Management Officers (CMO) verify taxonomies and tag emergency concerns with a 4-tier priority matrix.
- **SLA Breach Monitoring & Escalation**: Automatic deadline tracking across 4 priority levels (Critical: 15m, High: 30m, Medium: 60m, Low: 90m).
- **Inter-Divisional Reassignment Desk**: Seamless ticket escalation and handover when trains cross division/zonal borders.
- **Mobile Field Staff Task Execution**: Dedicated mobile-optimized duty portal for TTEs, OBHS housekeeping, electrical engineers, and RPF personnel.
- **Coach Physical Composition**: Interactive coach track view mapping coach classes and physical positions.
- **Live Visual Tracking & Feedback**: 16-character Complaint ID lookup (`CMP...`) with a 10-stage vertical progress timeline and 3-level CSAT rating.
- **Network-Wide Administrative Intelligence**: 100% database-driven metrics, interactive SVG donut charts, and live staff supervision rosters.


## 3. User Roles & Operational Capabilities

RailSathi connects four distinct operational user tiers through structured access controls and dedicated interfaces:

| User Role | Interface / Workspace | Primary Operational Focus |
| :--- | :--- | :--- |
| **Passenger / Citizen** | Public Portal | Self-service grievance registration, PNR auto-lookup, and live status tracking. |
| **Complaint Management Officer (CMO)** | Control Room Desk | Triage inspection, taxonomy verification, priority tagging, and staff dispatch. |
| **Field Staff** *(TTE, OBHS, Electrical, RPF)* | Mobile Duty Portal | Active train/station duty execution, task acceptance, and resolution logging. |
| **System Administrator** | Executive Console | Pan-India supervisory oversight, real-time analytics, and staff roster management. |

<br>

Each stakeholder interacts with the platform through dedicated workflows tailored to their operational responsibilities. Below is a detailed breakdown of the functional capabilities and permissions available across all four user tiers:

###  1. Passenger Capabilities
- **PNR & Journey Auto-Lookup**: Instant validation of 10-digit PNR numbers against booking records to auto-populate train name, train number, coach, berth, journey date, boarding station, and destination.
- **Train & Station Grievance Registration**: Multi-channel submission for either on-board train incidents or station facility concerns with incident date, time, and rich text descriptions.
- **2-Tier Category Selection**: Taxonomy selection across 163 specialized subcategories (Catering, Cleanliness, Security, Electrical, Medical, Bedroll, Punctuality, Divyangjan Amenities).
- **Unique Complaint ID Generation**: Automated issuance of a unique 16-character tracking Reference ID (e.g., `CMP2026082910005`) upon successful submission.
- **Live Lifecycle Tracking**: Direct status query using Complaint ID rendering a 10-stage vertical progress timeline without requiring authentication.
- **Feedback & Resolution Confirmation**: Post-resolution confirmation unlocking a 3-level qualitative service rating (*Excellent, Satisfactory, Unsatisfactory*) and review comments.

###  2. Complaint Management Officer (CMO) Capabilities
- **Incoming Complaint Inspection**: Centralized control room queue providing real-time visibility into all unverified grievances filed within the operational division.
- **Taxonomy Verification & Correction**: Detailed review interface allowing officers to audit passenger-submitted descriptions and correct misclassified categories before dispatch.
- **Priority Classification**: Rapid tagging marking emergency, medical, and security concerns with visual priority badges (`CRITICAL`, `HIGH`, `MEDIUM`, `LOW`).
- **Workload-Aware Staff Routing**: Assignment modal displaying on-duty field personnel, active train assignments, current task counts, and availability statuses.
- **Distinct Operational Queues**: Segregated queues for unassigned complaints, actively assigned tasks, and pending reassignment requests.
- **Inter-Divisional Reassignment Desk**: Formal digital review and approval workflow for transferring tickets when trains cross division or zonal boundaries.
- **SLA Breach Monitoring & Escalation**: Real-time notifications and control desk flags when configured response deadlines are exceeded.

###  3. Field Staff Capabilities (TTE, OBHS, Electrical, RPF)
- **Role-Based Authentication**: Secure login for onboard train crew, housekeeping managers, electrical technicians, and railway police officers.
- **Duty-Scoped Task Queue**: Real-time task stream filtered to the staff member's currently assigned train number, coach range, or station post.
- **Task Acceptance Acknowledgment**: Explicit acknowledgment control updating ticket status to `Accepted` for control room visibility.
- **Inspection Progress Toggle**: One-touch toggle to mark task status as `In Progress` upon arriving at the physical coach or platform.
- **Mandatory Resolution Remarks**: Form-enforced logging of actions taken, resolution remarks, and completion timestamps before ticket closure.
- **Section Boundary Reassignment Request**: Ability to initiate a handover request with operational reasons when a train moves outside their jurisdiction.

###  4. System Administrator Capabilities
- **Administrative Authentication & RBAC**: High-security authentication granting system-wide supervisory privileges.
- **Pan-India Network Monitoring**: Centralized executive dashboard tracking 10,034+ complaints across all 18 Zonal Railways and 71 Divisions.
- **Executive Analytics & Reporting**: Real-time query-driven SVG charts illustrating complaint distributions, resolution velocities, and departmental workloads.
- **Staff Roster Supervision**: Live directory monitoring duty statuses (*Available, Assigned, Offline*), active trains, and workloads for 545+ personnel (excluding Admin accounts).
- **Authorized Overrides & Configuration**: Privileged controls to adjust user permissions, update operational configurations, and perform data maintenance.

---


## 4. Complaint Data Flow

<div align="center">

<img src="docs/figures/complaint_data_flow.png" width="512" height="917" alt="Complaint Data Flow">

<p><em>Figure 2: End-to-End Complaint Data Flow</em></p>

</div>

---

## 5. Technology Stack

| Domain | Technology / Tool | Version | Function & Rationale |
| :--- | :--- | :--- | :--- |
| **Frontend Framework** | **React** | `v19.2` | Component-driven SPA architecture with React.lazy code splitting. |
| **Build Tool** | **Vite** | `v8.1.1` | Fast HMR and production asset bundling. |
| **Frontend Styling** | **CSS3 & Tailwind CSS** | `v4.3` | Fluid typography with CSS `clamp()` and responsive Flexbox/Grid. |
| **Charts & Graphs** | **Chart.js & Custom SVG** | `v4.5` | Dynamic departmental bars and interactive SVG donut charts. |
| **Backend Framework** | **FastAPI** | `v0.110` | High-concurrency asynchronous Python REST framework. |
| **ASGI Web Server** | **Uvicorn** | `v0.28` | High-throughput asynchronous ASGI implementation. |
| **Data Validation** | **Pydantic** | `v2.13` | Strict payload schema validation and serialization contracts. |
| **Database Engine** | **MySQL (InnoDB)** | `v8.0` | ACID-compliant relational persistence with foreign keys. |
| **Database ORM** | **SQLAlchemy** | `v2.0` | Object-Relational Mapping, connection pooling, and scalar queries. |
| **Database Driver** | **PyMySQL** | `v1.1` | Python DB-API connector for MySQL TCP communication. |

---

## 6. Database Overview

The persistence tier is built on **MySQL 8.0 (InnoDB Engine)** enforcing strict 3NF normalization, row-level locking, ACID compliance, and **28 foreign-key relationships** across **19 relational tables**.

### 6.1 Database Entity Groups & Schema Architecture

| Entity Group | Database Tables Included | Functional Purpose & Scope |
| :--- | :--- | :--- |
| **1. User & Staff Management** | `users`, `staff`, `departments` | Manages credentials, role authorization (Admin, CMO, Staff), designations, and department mappings. |
| **2. Complaint Management** | `complaints`, `complaint_categories`, `feedbacks` | Stores grievance filings, 163 taxonomy classifications, priority levels, and passenger CSAT reviews. |
| **3. Complaint History & Audit** | `complaint_status_histories`, `complaint_reassignment_requests`, `complaint_assignment_histories`, `complaint_escalation_history` | Maintains immutable, append-only chronological logs for status transitions, staff dispatches, and SLA escalations. |
| **4. Railway Network Infrastructure** | `zones`, `divisions`, `stations` | Maps the spatial hierarchy across 18 Zonal Headquarters, 71 Divisions, and 2,083 Geolocation-mapped Stations. |
| **5. Train Management & Inventory** | `trains`, `train_routes`, `train_coaches`, `train_inventory`, `staff_duty_assignments` | Handles 2,202 train schedules, halt sequences, physical coach layouts, and onboard consumable pantry inventory. |
| **6. Passenger Journey Data** | `pnr_bookings` | Stores 10-digit PNR bookings with coach, berth, journey dates, and boarding/destination points. |


### 6.2 Project Dataset Overview & Record Counts

| Database Entity / Table | Total Records | Scope & Operational Description |
| :--- | :---: | :--- |
| **`complaints`** | **10,034** | Active, assigned, escalated, and resolved passenger grievance records. |
| **`zones`** | **18** | Official Indian Railways Zonal Headquarters (NR, CR, WR, SR, ER, ECR, etc.). |
| **`divisions`** | **71** | Operational Railway Divisions managing regional station clusters and track sections. |
| **`stations`** | **2,083** | Master railway station directory with station codes, names, and division foreign keys. |
| **`trains`** | **2,202** | Master train catalog with train numbers, train names, and origin/destination pairs. |
| **`staff`** | **545** | Active field personnel roster (TTEs, OBHS crew, electrical technicians, RPF officers). |
| **`users`** | **547** | System authentication records across Passengers, Officers, Staff, and Administrators. |
| **`complaint_categories`** | **163** | 2-Tier taxonomy (64 train + 99 station subcategories) across 15 technical departments. |
| **`pnr_bookings`** | **961** | 10-digit journey validation records with coach, seat, and passenger details. |
| **`feedbacks`** | **2,433** | Post-resolution passenger satisfaction ratings (*Excellent, Satisfactory, Unsatisfactory*). |

---

## 7. Screenshots / Demo

<div align="center">

<table align="center">
  <tr>
    <td width="50%" align="center">
      <img src="docs/screenshots/Complaint_Form.png" width="500" height="550" alt="Complaint Form"><br>
    </td>
    <td width="50%" align="center">
      <img src="docs/screenshots/Resolution_Interface.png" width="500" height="550"  alt="Complaint Resolution Form"><br>
    </td>
  </tr>
</table>

</div>
<div align="center"><p><em>Figure 3: Passenger Grievance Registration & Tracking Interface </em></p></div>                                       


<br>


<div align="center">

<table align="center">
  <tr>
    <td width="50%" align="center">
      <img src="docs/screenshots/CMO_Dashboard-1.png" width="800" height="600" alt="CMO Dashboards"><br>
    </td>
    <td width="50%" align="center">
      <img src="docs/screenshots/CMO_Dashboard-2.png" width="800" height="600" alt="CMO Dashboards"><br>
    </td>
  </tr>
</table>

</div>
<div align="center"><p><em>Figure 4: Complaint Manager Officer (CMO) Interface</em></p></div>


<br>


<div align="center">

<table align="center">
  <tr>
    <td width="50%" align="center">
      <img src="docs/screenshots/Staff_Dashboard-1.png" width="800" height="600" alt="Staff Dashboards"><br>
    </td>
    <td width="50%" align="center">
      <img src="docs/screenshots/Staff_Dashboard-2.png" width="800" height="600" alt="Staff Dashboards"><br>
    </td>
  </tr>
</table>

</div>
<div align="center"><p><em>Figure 5: Onboarded Staff Interface</em></p></div>


<br>


<div align="center">

<table align="center">
  <tr>
    <td width="50%" align="center">
      <img src="docs/screenshots/Administrator_Dashboard-1.png" width="800" height="600" alt="Administrator Dashboards"><br>
    </td>
    <td width="50%" align="center">
      <img src="docs/screenshots/Administrator_Dashboard-2.png" width="800" height="600" alt="Administrator Dashboards"><br>
    </td>
  </tr>
</table>

</div>

<div align="center"><p><em> Figure 6: Administrator Interface </em></p></div>

<br>


---

## 8. Project Directory Structure

```
RailSathi/
├── backend/                         # FastAPI Application Layer
│   └── app/
│       ├── __init__.py              # App initialization, GZip middleware & SPA fallback
│       ├── config.py                # Environment configuration & secret keys
│       ├── database.py              # SQLAlchemy 2.0 engine & session factory
│       ├── models.py                # 19 Relational ORM models (3NF schema)
│       ├── routes.py                # REST API endpoints & business logic
│       ├── schemas.py               # Pydantic v2 data validation schemas
│       ├── seeding.py               # Automated database migration & seed pipeline
│       └── services.py              # State machine transitions, SLA & audit services
├── data/                            # Master Seed & Data Layer
│   ├── mysql/
│   │   └── .gitkeep                 # Local MySQL data container
│   ├── complaints.csv               # Master complaints dataset (10,034 records)
│   ├── pnr_database.csv             # PNR lookup validation registry (961 records)
│   ├── real_trains_and_routes.json  # Train schedules & station halts (2,202 trains)
│   └── train_master.json            # Master train catalog & station endpoints
├── docs/                            # Documentation & Reference Materials
│   └── zones_and_divisions.md       # 18 Zones and 71 Divisions reference guide
├── frontend/                        # React 19 + Vite 8 Client Layer
│   ├── public/                      # Static web assets
│   │   ├── favicon.svg              # Application favicon
│   │   ├── icons.svg                # SVG icon sprites
│   │   ├── railsathi_hero.png       # High-resolution portal hero banner
│   │   └── railway_logo.jpg         # Official Indian Railways emblem
│   ├── src/
│   │   ├── components/              # Reusable UI & Dashboard components
│   │   │   ├── dashboard/           # KPICard, SLABadge, Sidebar, Header, Footer
│   │   │   └── public/              # Public layout, Header, Hero, Forms
│   │   ├── context/                 # Authentication & user state contexts
│   │   ├── dashboard/               # Role-based dashboard interfaces
│   │   │   ├── admin/               # Executive Home, Analytics, Complaints, Staff Directory
│   │   │   ├── cmo/                 # CMO Home, Complaints Queue, Reassignment Desk
│   │   │   └── staff/               # Staff Duty Tasks, Coach Composition, Inventory
│   │   ├── pages/                   # Public views (Home, About, FAQ, Login)
│   │   ├── routes/                  # Role-based route protection & lazy loading
│   │   ├── services/                # API client services & auth handlers
│   │   ├── utils/                   # Formatters, role definitions, status mappers
│   │   ├── App.jsx                  # Root application component
│   │   ├── index.css                # RailSathi Responsive Design System
│   │   └── main.jsx                 # React DOM entry point
│   ├── package.json                 # Node dependencies & build scripts
│   └── vite.config.js               # Vite bundler & proxy configuration
├── tests/                           # Automated Test Suites
│   ├── run_tests.py                 # Master test suite runner
│   ├── test_api.py                  # REST API endpoints integration test
│   ├── test_auth.py                 # Security & RBAC authorization test
│   ├── test_db.py                   # Database schema & integrity test
│   ├── test_flow.py                 # Complaint lifecycle workflow test
│   ├── test_perf.py                 # Performance & latency benchmark test
│   └── test_transfer.py             # Inter-divisional reassignment test
├── .gitignore                       # Production Git ignore rules
├── README.md                        # Comprehensive project documentation
├── requirements.txt                 # Backend Python dependencies
├── run.py                           # Server launcher (FastAPI + Uvicorn)
├── start_backend.bat                # Quick-launch batch script for FastAPI
└── start_mysql.bat                  # Quick-launch batch script for MySQL
```

---

## 9. Installation & Setup

### 9.1 Prerequisites
- **Python 3.10+**
- **Node.js 18+** & **npm**
- **MySQL 8.0+**

### 9.2 Step-by-Step Setup
```bash
# 1. Clone the repository
git clone https://github.com/sarasinha1207/RailSathi.git
cd RailSathi

# 2. Install backend Python dependencies
pip install -r requirements.txt

# 3. Install frontend Node dependencies
cd frontend
npm install
cd ..
```


### 9.3 Environment Variables

Create a `.env` file in the project root directory:

```env
# Database Connection URI
DATABASE_URL=mysql+pymysql://root:password@localhost/railsathi

# Session Security Secret Key
SECRET_KEY=railsathi-production-secret-key-2026

# Default Administrator Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```


###  9.4 Running the Project

### Start MySQL Database
```bash
# Start MySQL Service (or use Windows batch launcher)
start_mysql.bat
```

### Start Backend Application
```bash
# Launch FastAPI ASGI server on port 5000
python run.py
```
*The backend server will start at `http://127.0.0.1:5000` and automatically seed all 19 database tables on initial launch.*

### Start Frontend Application
```bash
cd frontend

# Production Build (compiled to frontend/dist and served by FastAPI)
npm run build

# Development Mode (Vite live reload at http://localhost:3000)
npm run dev
```

### 9.5 Default Credentials:
| Role | Username | Password | Dashboard Access |
| :--- | :--- | :--- | :--- |
| **Administrator** | `admin` | `admin123` | System-wide Supervisory Control & Network Analytics |
| **Complaint Officer (CMO)** | `officer1` | `officer123` | Control Room Desk, Category Verification & Triage |
| **Onboard Staff (STE)** | `stf_ste_22477` | `password123` | Active Duty Tasks, Coach Composition & Inventory |

---

## 10. Testing

RailSathi includes an automated test runner executing 6 comprehensive testing suites:

```bash
python tests/run_tests.py
```

### Test Suite Coverage:
- `[1/6]` **Database Schema Integrity** (`tests/test_db.py`): **PASSED** (10,034 complaints, 18 zones, 71 divisions, 2,083 stations, 2,202 trains).
- `[2/6]` **Security & RBAC** (`tests/test_auth.py`): **PASSED** (401 unauthenticated blocks, cookie signing, role isolation).
- `[3/6]` **System REST API** (`tests/test_api.py`): **PASSED** (Analytics aggregation, paginated feeds, staff rosters).
- `[4/6]` **Complaint Lifecycle Workflow** (`tests/test_flow.py`): **PASSED** (PNR lookup $\rightarrow$ submission $\rightarrow$ live tracking).
- `[5/6]` **Reassignment & Transfer** (`tests/test_transfer.py`): **PASSED** (Inter-divisional escalation & staff reassignment).
- `[6/6]` **Performance Benchmarks** (`tests/test_perf.py`): **PASSED** (In-memory cached query latency: **$4.59\text{--}7.54\text{ ms}$**).


## 11. Performance

- **Query Optimization**: Using primitive scalar query tuples and thread-safe in-memory caching reduced aggregate analytics query times from **$216\text{ ms}$** to **$\le 7.00\text{ ms}$** (${\sim}24\times$ reduction).
- **GZip Response Compression**: Backend `GZipMiddleware` compresses large JSON payloads by **$80\text{--}90\%$**.
- **Frontend Code Splitting**: `React.lazy` and `Suspense` reduce the initial production bundle size to **$333\text{ KB}$** ($91\text{ KB}$ gzipped).
- **Responsive Sizing**: Dynamic scaling for KPI cards and data tables across desktop, tablet, and mobile displays without layout breaking.


## 12. Future Scope

1. **Dedicated Mobile Applications**: Native Android and iOS apps with real-time push notifications for complaint updates.
2. **AI-Assisted Classification**: Machine learning models for automatic grievance categorization, department routing, and sentiment analysis.
3. **Live Railway API Integration**: Real-time integration with NTES for live GPS train tracking and dynamic station arrival estimates.
4. **Multilingual Support (i18n)**: Interface localization across regional Indian languages (Hindi, Bengali, Tamil, Telugu, Marathi).
5. **Automated Background Daemon**: Standalone background workers for continuous time-elapsed SLA breach escalations without manual triggering.

## License
This project was developed during the internship at the **Centre for Railway Information Systems (CRIS), Ministry of Railways, Government of India**. All rights reserved.