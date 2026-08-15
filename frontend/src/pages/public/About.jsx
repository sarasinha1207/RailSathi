import React from 'react';

export default function About() {
  return (
    <main className="main-content" style={{ padding: '40px 20px', maxWidth: '1100px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
      <style>{`
        .about-wrapper {
            background-color: #ffffff;
            border-radius: 12px;
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.04);
            border: 1px solid var(--border-color);
            padding: 50px 6%;
            margin-top: 20px;
            color: var(--text-color);
            line-height: 1.6;
        }

        .about-title {
            text-align: center;
            font-size: 2.2rem;
            font-weight: 800;
            color: var(--primary-color);
            margin: 0 0 10px 0;
        }

        .about-subtitle {
            font-size: 1rem;
            color: var(--text-muted);
            margin: 0 0 40px 0;
            border-bottom: 2px solid var(--border-color);
            padding-bottom: 20px;
        }

        .section-header {
            font-size: 1.6rem;
            font-weight: 800;
            color: var(--primary-color);
            margin: 40px 0 20px 0;
        }

        .svg-logo {
            width: 24px;
            height: 24px;
            fill: var(--primary-color);
            flex-shrink: 0;
            display: inline-block;
            vertical-align: middle;
        }

        .complaints-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 20px;
            margin: 25px 0 40px 0;
        }

        .complaint-card {
            background-color: #ffffff;
            border: 1px solid var(--border-color);
            border-radius: 10px;
            padding: 22px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
            transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
            display: flex;
            flex-direction: column;
            gap: 12px;
        }

        .complaint-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
            border-color: var(--primary-color);
        }

        .complaint-card-header {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .complaint-card-title {
            font-size: 1.05rem;
            font-weight: 700;
            color: var(--primary-color);
            margin: 0;
        }

        .complaint-card-desc {
            font-size: 0.9rem;
            color: var(--text-muted);
            margin: 0;
            line-height: 1.45;
        }

        .timeline-container {
            position: relative;
            margin: 40px 0;
            padding: 10px 0;
        }

        .timeline-line {
            position: absolute;
            left: 20px;
            top: 0;
            bottom: 0;
            width: 6px;
            background-color: var(--primary-color);
            z-index: 1;
        }

        .timeline-step {
            display: flex;
            gap: 25px;
            align-items: center;
            margin-bottom: 25px;
            position: relative;
            z-index: 2;
        }

        .timeline-step:last-child {
            margin-bottom: 0;
        }

        .timeline-badge {
            width: 46px;
            height: 46px;
            border-radius: 50%;
            background-color: var(--primary-color);
            border: 4px solid var(--accent-gold);
            color: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 800;
            font-size: 1.1rem;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            flex-shrink: 0;
            z-index: 3;
            transition: transform 0.2s ease;
        }

        .timeline-step:hover .timeline-badge {
            transform: scale(1.1);
        }

        .timeline-card {
            flex-grow: 1;
            background-color: var(--primary-color);
            color: #ffffff;
            border-radius: 16px;
            padding: 22px 28px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
            border: 1px solid var(--primary-color);
            transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .timeline-step:hover .timeline-card {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
        }

        .timeline-pill {
            display: inline-block;
            background-color: var(--accent-gold);
            color: var(--primary-color);
            font-weight: 800;
            font-size: 0.85rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            padding: 6px 16px;
            border-radius: 20px;
            margin-bottom: 12px;
        }

        .timeline-card-desc {
            margin: 0;
            font-size: 0.95rem;
            line-height: 1.5;
            color: rgba(255, 255, 255, 0.9);
        }

        .points-list {
            margin: 20px 0;
            padding-left: 20px;
            display: flex;
            flex-direction: column;
            gap: 15px;
        }

        .points-item {
            list-style-type: decimal;
            font-size: 1rem;
            color: var(--text-color);
            padding-left: 5px;
        }

        .points-item-strong {
            font-weight: 700;
            color: var(--primary-color);
        }

        .table-responsive {
            overflow-x: auto;
            margin: 25px 0;
            border: 1px solid var(--border-color);
            border-radius: 8px;
        }

        .dept-table {
            width: 100%;
            border-collapse: collapse;
            text-align: left;
            font-size: 0.95rem;
        }

        .dept-table th {
            background-color: var(--primary-color);
            color: #ffffff;
            padding: 14px 18px;
            font-weight: 700;
            border-bottom: 2px solid var(--primary-color);
        }

        .dept-table td {
            padding: 14px 18px;
            border-bottom: 1px solid var(--border-color);
        }

        .dept-table tr:nth-child(even) {
            background-color: #fafbfc;
        }

        .split-columns {
            display: flex;
            gap: 40px;
            flex-wrap: wrap;
            margin: 30px 0;
        }

        .split-col-item {
            flex: 1;
            min-width: 300px;
        }

        .status-badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 4px;
            font-size: 0.75rem;
            font-weight: 700;
            width: 90px;
            text-align: center;
            margin-right: 15px;
            flex-shrink: 0;
        }

        .status-row {
            display: flex;
            align-items: flex-start;
            margin-bottom: 20px;
        }

        .section-divider {
            border: 0;
            border-top: 1px solid var(--border-color);
            margin: 45px 0;
        }

        .contacts-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 30px;
            margin-top: 20px;
        }

        .contact-card-info {
            display: flex;
            gap: 15px;
            align-items: flex-start;
        }
      `}</style>

      <div className="about-wrapper">
        <h1 className="about-title">About RailSathi</h1>
        <p className="about-subtitle">
          RailSathi is an advanced passenger grievance and complaint management platform developed to simplify the registration,
          routing, tracking, and monitoring of railway complaints. The platform demonstrates how passenger complaints can be efficiently
          directed to the appropriate railway department based on their category, priority, and location, ensuring faster resolution
          and improved passenger service.
        </p>

        <h2 className="section-header">Why Passenger Complaints Matter</h2>
        <div style={{ fontSize: '1.05rem', display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <p style={{ margin: 0 }}>
            Every day, millions of passengers travel across the Indian Railways network. During their journey, passengers may encounter
            issues related to cleanliness, electrical equipment, catering, coach maintenance, security, medical assistance, water availability,
            or station facilities. Reporting these issues enables railway authorities to take timely corrective action, improve service quality,
            and enhance passenger safety and comfort.
          </p>
          <p style={{ margin: 0 }}>
            An effective complaint management system ensures that every grievance is recorded, assigned to the appropriate department,
            monitored throughout its resolution, and closed only after the necessary action has been taken. Depending on the nature
            and severity of the complaint, it may be handled by departments such as Housekeeping, Electrical, Mechanical, Commercial,
            Security (RPF), Medical Services, or Station Administration.
          </p>
          <p style={{ margin: 0 }}>
            By maintaining a structured complaint handling process, railway administrations can identify recurring operational issues,
            monitor departmental performance, reduce complaint resolution time, and continuously improve passenger services across trains and stations.
          </p>
        </div>

        <hr className="section-divider" />

        <h2 className="section-header">Types of Complaints</h2>
        <p style={{ fontSize: '1.05rem', marginBottom: '25px' }}>
          The portal processes complaints under twelve primary classifications to route them to the correct action teams:
        </p>
        <div className="complaints-grid">
          <div className="complaint-card">
            <div className="complaint-card-header">
              <svg className="svg-logo" viewBox="0 0 24 24">
                <path d="M12 2L9.5 8.5L3 11l6.5 2.5L12 20l2.5-6.5L21 11l-6.5-2.5L12 2z" />
              </svg>
              <h4 className="complaint-card-title">Cleanliness</h4>
            </div>
            <p className="complaint-card-desc">Coach interior/exterior hygiene, garbage management, toilet sanitation, and platform trash clearance.</p>
          </div>

          <div className="complaint-card">
            <div className="complaint-card-header">
              <svg className="svg-logo" viewBox="0 0 24 24">
                <path d="M11.5 2L4 13h6v9l7.5-11h-6z" />
              </svg>
              <h4 className="complaint-card-title">Electrical Equipment</h4>
            </div>
            <p className="complaint-card-desc">Defective carriage fans, reading lamps, non-functioning charging sockets, and carriage AC failures.</p>
          </div>

          <div className="complaint-card">
            <div className="complaint-card-header">
              <svg className="svg-logo" viewBox="0 0 24 24">
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
              </svg>
              <h4 className="complaint-card-title">Water Availability</h4>
            </div>
            <p className="complaint-card-desc">Empty washbasins, dry toilet faucets, and overhead carriage water tank supply issues.</p>
          </div>

          <div className="complaint-card">
            <div className="complaint-card-header">
              <svg className="svg-logo" viewBox="0 0 24 24">
                <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.3C.5 6.7.9 9.8 2.9 11.8c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.6z" />
              </svg>
              <h4 className="complaint-card-title">Coach Maintenance</h4>
            </div>
            <p className="complaint-card-desc">Jammed sliding doors, broken window glass/shutters, loose berths, and damaged fittings.</p>
          </div>

          <div className="complaint-card">
            <div className="complaint-card-header">
              <svg className="svg-logo" viewBox="0 0 24 24">
                <path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm8-3h-3v14h3V6zm-3-4h3a3 3 0 0 1 3 3v2h-6V2z" />
              </svg>
              <h4 className="complaint-card-title">Catering & Vending</h4>
            </div>
            <p className="complaint-card-desc">Substandard meal quality, overcharging beyond menu card prices, and pantry car hygiene concerns.</p>
          </div>

          <div className="complaint-card">
            <div className="complaint-card-header">
              <svg className="svg-logo" viewBox="0 0 24 24">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
              </svg>
              <h4 className="complaint-card-title">Security</h4>
            </div>
            <p className="complaint-card-desc">Theft, passenger harassment, suspicious baggage, unauthorized entry, and RPF assistance.</p>
          </div>

          <div className="complaint-card">
            <div className="complaint-card-header">
              <svg className="svg-logo" viewBox="0 0 24 24">
                <path d="M19 10.5h-5.5V5h-3v5.5H5v3h5.5V19h3v-5.5H19z" />
              </svg>
              <h4 className="complaint-card-title">Medical Assistance</h4>
            </div>
            <p className="complaint-card-desc">On-board first-aid box supply requests and emergency station doctor arrangements.</p>
          </div>

          <div className="complaint-card">
            <div className="complaint-card-header">
              <svg className="svg-logo" viewBox="0 0 24 24">
                <path d="M20 7H4v7h16V7zm-2 2H6v3h12V9zm2-6c-1.1 0-2 .9-2 2v1h-8V5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 15H6v-2h12v2zm2-4H4v-1h16v1z" />
              </svg>
              <h4 className="complaint-card-title">Passenger Amenities</h4>
            </div>
            <p className="complaint-card-desc">Dirty bedrolls/linen, missing carriage curtains, and general passenger comfort deficiencies.</p>
          </div>

          <div className="complaint-card">
            <div className="complaint-card-header">
              <svg className="svg-logo" viewBox="0 0 24 24">
                <path d="M2 22h20V10L12 2 2 10v12zm10-16.5l8 6.4V20h-5v-5H9v5H4v-7.6l8-6.4z" />
              </svg>
              <h4 className="complaint-card-title">Station Facilities</h4>
            </div>
            <p className="complaint-card-desc">Dirty platform halls, broken escalators, sign boards, and station waiting room deficiencies.</p>
          </div>

          <div className="complaint-card">
            <div className="complaint-card-header">
              <svg className="svg-logo" viewBox="0 0 24 24">
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
              </svg>
              <h4 className="complaint-card-title">Operational & Punctuality</h4>
            </div>
            <p className="complaint-card-desc">Severe late running train operations, crew scheduling delay info, and public announcement failures.</p>
          </div>

          <div className="complaint-card">
            <div className="complaint-card-header">
              <svg className="svg-logo" viewBox="0 0 24 24">
                <path d="M19 12H5V5h14v7zm-2-5H7v3h10V7zm4-5H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 12.5H8v-2h4v2zm4 0h-2v-2h2v2z" />
              </svg>
              <h4 className="complaint-card-title">Corruption & Bribery</h4>
            </div>
            <p className="complaint-card-desc">Unlawful ticket charging, bribe solicitations by onboard ticket checking staff, or cargo loading malpractices.</p>
          </div>

          <div className="complaint-card">
            <div className="complaint-card-header">
              <svg className="svg-logo" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
              <h4 className="complaint-card-title">Staff Behaviour</h4>
            </div>
            <p className="complaint-card-desc">Misbehavior, harsh treatment, or neglect by coach attendants, station assistants, or pantry crew.</p>
          </div>
        </div>

        <hr className="section-divider" />

        <h2 className="section-header">How Railway Complaints Are Processed</h2>
        <p style={{ fontSize: '1.05rem', marginBottom: '25px' }}>
          Every concern moves through a structured, automated tracking sequence to ensure it reaches localized ground crews swiftly:
        </p>

        <div className="timeline-container">
          <div className="timeline-line"></div>

          <div className="timeline-step">
            <div className="timeline-badge">01</div>
            <div className="timeline-card">
              <div className="timeline-pill">Complaint Registered</div>
              <p className="timeline-card-desc">
                Passenger submits the complaint via the portal. The system saves the inputs and generates a unique Complaint Reference ID (e.g., <em>CMP2024040100005</em>).
              </p>
            </div>
          </div>

          <div className="timeline-step">
            <div className="timeline-badge">02</div>
            <div className="timeline-card">
              <div className="timeline-pill">Complaint Reviewed</div>
              <p className="timeline-card-desc">
                The system verifies that all mandatory complaint details are provided, identifies the selected complaint category and subcategory, assigns a priority level (Critical, High, Medium, or Low), and prepares the complaint for department assignment.
              </p>
            </div>
          </div>

          <div className="timeline-step">
            <div className="timeline-badge">03</div>
            <div className="timeline-card">
              <div className="timeline-pill">Assigned to Department</div>
              <p className="timeline-card-desc">
                The complaint is automatically assigned to the appropriate railway department based on the selected category and subcategory (e.g., Security &rarr; RPF, Cleanliness &rarr; Housekeeping, Catering &rarr; Commercial Department).
              </p>
            </div>
          </div>

          <div className="timeline-step">
            <div className="timeline-badge">04</div>
            <div className="timeline-card">
              <div className="timeline-pill">Department Takes Action</div>
              <p className="timeline-card-desc">
                The assigned railway department receives the complaint, investigates the issue, deploys the appropriate staff if required, and performs the necessary corrective action.
              </p>
            </div>
          </div>

          <div className="timeline-step">
            <div className="timeline-badge">05</div>
            <div className="timeline-card">
              <div className="timeline-pill">Complaint Resolution</div>
              <p className="timeline-card-desc">
                After resolving the issue, the assigned department or official records the physical action taken and logs detailed <strong>Official Remarks</strong> in the system.
              </p>
            </div>
          </div>

          <div className="timeline-step">
            <div className="timeline-badge">06</div>
            <div className="timeline-card">
              <div className="timeline-pill">Complaint Closed</div>
              <p className="timeline-card-desc">
                The responsible official or department head reviews the logged action details and updates the complaint status to <strong>Closed</strong> in the database.
              </p>
            </div>
          </div>

          <div className="timeline-step">
            <div className="timeline-badge">07</div>
            <div className="timeline-card">
              <div className="timeline-pill">Passenger Feedback & Rating</div>
              <p className="timeline-card-desc">
                The passenger tracks their closed complaint ID to review the official remarks, and logs their <strong>Passenger Rating</strong> (Excellent, Satisfactory, Unsatisfactory) and feedback comments.
              </p>
            </div>
          </div>
        </div>

        <hr class="section-divider" />

        <h2 className="section-header">Departments Responsible for Resolution</h2>
        <div className="table-responsive">
          <table className="dept-table">
            <thead>
              <tr>
                <th>Complaint Category</th>
                <th>Responsible Department</th>
                <th>Ground Action Team</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: 700 }}>Security</td>
                <td>Railway Protection Force (RPF)</td>
                <td>RPF Escorts / Local GRP Station Police</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700 }}>Cleanliness</td>
                <td>Mechanical Engineering / OBHS</td>
                <td>On-board Cleaning Attendants / Carriage Depot</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700 }}>Electrical Equipment</td>
                <td>Electrical General Services</td>
                <td>AC Coach Attendants / Station Electricians</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700 }}>Catering & Vending</td>
                <td>IRCTC / Commercial Department</td>
                <td>On-board Pantry Managers / Catering Inspectors</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700 }}>Medical Assistance</td>
                <td>Railway Medical Department</td>
                <td>Station Medical Officers / Local Ambulance Service</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700 }}>Coach Maintenance</td>
                <td>Mechanical (Carriage & Wagon)</td>
                <td>Carriage Depot Staff & Station Fitters</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700 }}>Water Availability</td>
                <td>Civil & Watering Services</td>
                <td>Station Hydrant Attendants & OBHS Crews</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700 }}>Station Facilities</td>
                <td>Station Master & Civil Engineering</td>
                <td>Station Maintenance Contractors & Supervisors</td>
              </tr>
            </tbody>
          </table>
        </div>

        <hr className="section-divider" />

        <div className="split-columns">
          <div className="split-col-item">
            <h2 className="section-header" style={{ marginTop: 0 }}>How Complaints Are Prioritized</h2>
            <p style={{ marginBottom: '15px' }}>
              Grievances are handled in real-time according to urgency. Higher-priority concerns receive immediate attention,
              while standard maintenance requests are queued for scheduled halts:
            </p>
            <ul style={{ paddingLeft: '20px', fontSize: '0.95rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li><strong>Critical Priority</strong> (<span style={{ color: '#c5221f', fontWeight: 800 }}>SLA &lt; 15 Mins</span>): Medical emergencies, dacoity/robbery, sexual harassment/eve-teasing, passenger fallen down, and train fire trigger immediate control room dispatch and instant SMS/WhatsApp alerts to onboard TTE/RPF.</li>
              <li><strong>High Priority</strong> (<span style={{ color: '#ea4335', fontWeight: 800 }}>SLA &lt; 30 Mins</span>): Complete AC failure in AC coaches, water exhaustion in toilets, security nuisance, and luggage theft.</li>
              <li><strong>Medium Priority</strong> (<span style={{ color: '#b06000', fontWeight: 800 }}>SLA &lt; 2 Hours</span>): Food quality defects, catering overcharging, bedroll non-availability, fan/light defects, and train delay inquiries.</li>
              <li><strong>Low Priority</strong> (<span style={{ color: '#0284c7', fontWeight: 800 }}>SLA &lt; 4 Hours</span>): General cleanliness inquiries, UTS app queries, feedback, and minor station fittings repairs.</li>
            </ul>


          </div>

          <div className="split-col-item">
            <h2 className="section-header" style={{ marginTop: 0 }}>Complaint Tracking</h2>
            <p style={{ marginBottom: '20px' }}>
              Passengers can track their complaint reference ID to know which department is handling the concern and its current status:
            </p>
            <div className="status-row">
              <span className="status-badge" style={{ backgroundColor: '#ffd8d8', color: '#cc0000' }}>OPEN</span>
              <div style={{ fontSize: '0.9rem' }}>The grievance has been registered and verified. It is currently queued for department routing.</div>
            </div>
            <div className="status-row">
              <span className="status-badge" style={{ backgroundColor: '#fff0d4', color: '#b25e00' }}>IN PROGRESS</span>
              <div style={{ fontSize: '0.9rem' }}>The ticket is assigned to the concerned department, and service crews are investigating the issue.</div>
            </div>
            <div className="status-row">
              <span className="status-badge" style={{ backgroundColor: '#d1f7d1', color: '#006600' }}>RESOLVED</span>
              <div style={{ fontSize: '0.9rem' }}>Service action is complete, the issue is rectified, and resolution details are logged.</div>
            </div>
          </div>
        </div>

        <hr className="section-divider" />

        <h2 className="section-header">Passenger Responsibilities</h2>
        <p style={{ fontSize: '1.05rem' }}>
          Passengers play a critical role in facilitating rapid grievance resolution. Providing complete and accurate details allows
          railway administrators to locate and resolve issues efficiently. Please follow these guidelines when lodging a ticket:
        </p>
        <ol className="points-list">
          <li className="points-item">
            <span className="points-item-strong">Provide Accurate Journey/Station Details:</span> Double-check the 10-digit PNR number, correct Train Number/Name, or Station name to ensure the complaint is routed to the correct local division.
          </li>
          <li class="points-item">
            <span class="points-item-strong">Specify Coach & Seat/Berth Numbers:</span> For train complaints, always mention your coach code (e.g., A1, S3) and berth/seat number to direct ground crews directly to your location.
          </li>
          <li class="points-item">
            <span class="points-item-strong">Select the Correct Complaint Category:</span> Pick the precise category and subclass (e.g. Electrical &rarr; AC, or Bed Roll &rarr; Dirty) to prevent delays caused by incorrect department routing.
          </li>
          <li class="points-item">
            <span class="points-item-strong">Describe the Issue Clearly:</span> Provide a concise, clear description of the problem (e.g., "charging socket under seat 24 is dead") rather than general statements, keeping within the 100-word limit.
          </li>
          <li class="points-item">
            <span class="points-item-strong">Include Accurate Date & Timestamps:</span> Specify the exact date, time, and nearest railway station halt where the incident occurred or where assistance is needed.
          </li>
        </ol>

        <hr className="section-divider" />

        <h2 className="section-header">Contact & Support</h2>
        <div className="contacts-grid">
          <div className="contact-card-info">
            <svg className="svg-logo" style={{ marginTop: '4px' }} viewBox="0 0 24 24">
              <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.57-.35-.11-.74-.03-1.01.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.59l2.2-2.21c.27-.26.35-.65.24-1C8.7 6.45 8.5 5.25 8.5 4.02 8.5 2.91 7.59 2 6.48 2H3.5C2.39 2 1.5 2.9 1.5 4c0 11.03 8.97 20 20 20 1.1 0 2-.9 2-2.01v-2.61c0-1.11-.9-2-2.01-2z" />
            </svg>
            <div>
              <h4 style={{ margin: '0 0 5px 0', color: 'var(--primary-color)', fontWeight: 700 }}>Railway Helpline</h4>
              <p style={{ margin: '0 0 3px 0', fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-color)' }}>Dial 139 (Toll-Free)</p>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>24/7/365 single window for all passenger grievances and safety assistance.</p>
            </div>
          </div>
          <div className="contact-card-info">
            <svg className="svg-logo" style={{ marginTop: '4px' }} viewBox="0 0 24 24">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
            <div>
              <h4 style={{ margin: '0 0 5px 0', color: 'var(--primary-color)', fontWeight: 700 }}>Email Support</h4>
              <p style={{ margin: '0 0 3px 0', fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-color)' }}>support@railsathi.gov.in</p>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>For offline inquiries, performance reviews, or media attachment submissions.</p>
            </div>
          </div>
          <div className="contact-card-info">
            <svg className="svg-logo" style={{ marginTop: '4px' }} viewBox="0 0 24 24">
              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm3.3 13l-3.3-3.3v-4.7h2v3.7l2.7 2.7-1.4 1.6z" />
            </svg>
            <div>
              <h4 style={{ margin: '0 0 5px 0', color: 'var(--primary-color)', fontWeight: 700 }}>Office Hours</h4>
              <p style={{ margin: '0 0 3px 0', fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-color)' }}>24/7 Operational Services</p>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>Administrative control centers and monitoring cells are active around the clock.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
