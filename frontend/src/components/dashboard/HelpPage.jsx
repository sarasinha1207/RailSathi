import React, { useState } from 'react';

const IconInfoCard = () => (
  <svg style={{ width: '24px', height: '24px', color: '#ffb300' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const IconChevronDown = ({ open }) => (
  <svg
    style={{
      width: '18px',
      height: '18px',
      transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
      transition: 'transform 0.2s ease',
      color: '#800020'
    }}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
  </svg>
);

const IconShieldCheck = () => (
  <svg style={{ width: '20px', height: '20px', color: '#800020' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

export default function HelpPage({ user }) {
  // Accordion state for FAQ section - CLOSED BY DEFAULT ON LOAD/REFRESH
  const [openFaq, setOpenFaq] = useState({ train: false, station: false });

  const toggleFaq = (key) => {
    setOpenFaq(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Train Complaints Categories (14) & Subcategories (64)
  const trainCategories = [
    { name: 'Bed Roll', count: 4, sub: 'Dirty / Torn, Non Availability, Others, Overcharging' },
    { name: 'Catering & Vending Services', count: 10, sub: 'E-Catering, Food & Water Not Available, Food Quality, Food Quality & Quantity, Food Quantity, Hygiene, Others, Overcharging, Service Quality, Service Quality & Hygiene' },
    { name: 'Coach - Cleanliness', count: 6, sub: 'Coach Exterior, Coach Interior, Cockroach / Rodents, Others, Toilet, Washbasin' },
    { name: 'Coach - Maintenance', count: 6, sub: 'Broken/Missing Toilet Fittings, Jerks/Abnormal Sound, Others, Tap leaking/Tap not working, Window/Door locking problem, Window/Seat Broken' },
    { name: 'Corruption / Bribery', count: 1, sub: 'Corruption / Bribery' },
    { name: 'Divyangjan Facilities', count: 4, sub: 'Braille signage in coach, Divyangjan coach unavailability, Divyangjan toilet /washbasin, Others' },
    { name: 'Electrical Equipment', count: 5, sub: 'Air Conditioner, Charging Points, Fans, Lights, Others' },
    { name: 'Facilities for Women with Special needs', count: 1, sub: 'Baby Food' },
    { name: 'Medical Assistance', count: 1, sub: 'Medical Assistance' },
    { name: 'Miscellaneous', count: 1, sub: 'Miscellaneous' },
    { name: 'Punctuality', count: 3, sub: 'Late Running, NTES APP, Others' },
    { name: 'Security', count: 17, sub: 'Dacoity/Robbery/Murder/Riots, Eve-teasing, Eveteasing/Misbehaviour with lady passengers/Rape, Harassment/Extortion by Security Personnel/Railway personnel, Luggage Left Behind/Unclaimed/Suspected Articles, Misbehaviour, Misbehaviour with lady passenger, Nuisance by Hawkers/Beggar/Eunuch, Nuisance by passenger, Others, Passenger Missing/Not responding call, Passenger fallen down, Quarrelling/Hooliganism, Rape, Smoking/Drinking Alcohol/Narcotics, Theft of Passengers Belongings/Snatching, Unauthorized person in Ladies/Disabled Coach/SLR/Reserve Coach' },
    { name: 'Staff Behaviour', count: 1, sub: 'Staff Behaviour' },
    { name: 'Water Availability', count: 4, sub: 'Others, Packaged Drinking Water / Rail Neer, Toilet, Washbasin' }
  ];

  // Station Complaints Categories (17) & Subcategories (99)
  const stationCategories = [
    { name: 'Catering & Vending Services', count: 8, sub: 'Food & Water Not Available, Food Quality, Food Quantity, Hygiene, Others, Overcharging, Service Quality, Service Quality & Hygiene' },
    { name: 'Cleanliness', count: 6, sub: 'Others, Platform, Stalls, Station Entrance / Building, Toilet, Waiting Room / Retiring Room' },
    { name: 'Corruption / Bribery', count: 1, sub: 'Corruption / Bribery' },
    { name: 'Divyangjan Facilities', count: 10, sub: 'Low height ticket counter, Low height water booth, Low seat toilet, Others, Parking, Ramp at Entry/Exit gates, Seating arrangement at Station/Waiting area, Tactile Pathway, Travel Concession, Wheel Chair/Battery operated car/Divyang Sahayak (On Payment, Feasible)' },
    { name: 'Electrical Equipment', count: 6, sub: 'Air Conditioner, Charging Points, Display / Coach Indicator Board, Fans / Lights, Lifts / Escalators, Others' },
    { name: 'Facilities for Women with Special needs', count: 3, sub: 'Baby Food, Others, Segregated area for lactating mothers in waiting hall' },
    { name: 'Goods', count: 8, sub: 'Booking, Delivery, Demurrage / Wharfage, Freight Facilitation, Others, Overcharging, Staff Not Available, Touts' },
    { name: 'Luggage / Parcels', count: 7, sub: 'Booking, Delivery, Others, Overcharging, Parcel Facilitation, Staff Not Available, Touts' },
    { name: 'Medical Assistance', count: 1, sub: 'Medical Assistance' },
    { name: 'Miscellaneous', count: 1, sub: 'Miscellaneous' },
    { name: 'Passenger Amenities', count: 8, sub: '139, Benches/Sheds, Enquiry Office/Inadequate Counter, Foot over/under Bridge, Others, PA (Public Announcement) System, Parking, Wi-Fi' },
    { name: 'Refund of Tickets', count: 3, sub: 'Counter Ticket, Online Ticket, Others' },
    { name: 'Reserved Ticketing', count: 6, sub: 'E-Ticketing, Inadequate Counters, Others, Overcharging, Tatkal, touts' },
    { name: 'Security', count: 15, sub: 'Dacoity/Robbery/Murder/Riots, Eve-teasing, Eveteasing/Misbehaviour with lady passengers/Rape, Harassment/Extortion by Security Personnel/Railway personnel, Luggage Left Behind/Unclaimed/Suspected Articles, Misbehaviour, Misbehaviour with lady passengers, Nuisance by Hawkers/Beggar/Eunuch, Nuisance by passenger, Others, Passenger Missing/Not responding call, Passenger fallen down, Quarrelling/Hooliganism, Smoking/Drinking Alcohol/Narcotics, Theft of Passengers Belongings/Snatching' },
    { name: 'Staff Behaviour', count: 1, sub: 'Staff Behaviour' },
    { name: 'Unreserved Ticketing', count: 9, sub: 'ATVM, Inadequate Counters, MST, Others, Overcharging, UTS App Login Issue, UTS App Mobile Handset Change, UTS RWallet, UTS/ATVM - Digital Payment' },
    { name: 'Water Availability', count: 6, sub: 'Drinking Water at Platform, Others, Packaged Drinking Water / Rail Neer, Retiring Room / Waiting Room, Toilet, Water Vending Machines' }
  ];

  // Departments Mapping Table
  const departmentsList = [
    { code: 'RPF', name: 'Railway Protection Force', duties: 'Security, passenger protection, crime prevention, luggage recovery, anti-hawking.' },
    { code: 'COMMERCIAL', name: 'Commercial Department', duties: 'Ticket checking, catering quality, luggage/parcel booking, passenger amenities, refund.' },
    { code: 'OPERATING', name: 'Operating Department', duties: 'Train operations, punctuality, station master control, loco pilots & guards.' },
    { code: 'MECH_CLEAN', name: 'Mechanical (Cleanliness & OBHS)', duties: 'Coach cleaning, OBHS, station cleanliness, sanitation, waste management.' },
    { code: 'MECH_COACH', name: 'Mechanical (Coaching & Bedroll)', duties: 'Coach maintenance, linen & bedroll supply, window/door locks, seat fittings.' },
    { code: 'ELEC', name: 'Electrical Department', duties: 'Coach AC maintenance, lights, fans, charging sockets, station lifts & escalators.' },
    { code: 'CATERING', name: 'Commercial Catering', duties: 'Food quality, pantry car supervision, e-catering, overcharging prevention.' },
    { code: 'S&T', name: 'Signal & Telecommunication', duties: 'Public announcement systems, coach display boards, NTES app, station Wi-Fi.' },
    { code: 'CIVIL', name: 'Civil Engineering', duties: 'Station building maintenance, platforms, foot overbridges, ramp access.' }
  ];

  // Priority Matrix System matching official system-wide palette
  const prioritiesList = [
    { priority: 'Critical', color: '#D32F2F', bg: '#FFEBEE', sla: '< 15 Mins', desc: 'Active safety threats, medical emergencies, robbery, harassment, rape, active fire.' },
    { priority: 'High', color: '#F57C00', bg: '#FFF3E0', sla: '< 1 Hour', desc: 'Food/water non-availability, total AC failure, toilet choked, Divyangjan access obstruction.' },
    { priority: 'Medium', color: '#FBC02D', bg: '#FFFDE7', sla: '< 2 Hours', desc: 'Food quality, bedroll non-availability, fan/light defect, delayed train running inquiry.' },
    { priority: 'Low', color: '#388E3C', bg: '#E8F5E9', sla: '< 4 Hours', desc: 'Minor cosmetic defects, general feedback, website/app queries.' }
  ];

  // Railway Officials Directory (Only 2 cards requested)
  const railwayOfficials = [
    {
      name: 'Shri Anil Kumar, IRTS',
      designation: 'Senior Divisional Commercial Manager (Nodal Control)',
      organization: 'RailSathi Operational Command & Control Room',
      phone: '011-23362244',
      email: 'sdcm.control@railsathi.gov.in',
      roleText: 'Direct Officer Supervision & Reassignment Control'
    },
    {
      name: 'CRIS Technical Support Helpdesk',
      designation: 'Centre for Railway Information Systems (CRIS)',
      organization: 'IT Command Center, Chanakyapuri, New Delhi',
      phone: '139 (Toll-Free 24x7) / 1800-111-139',
      email: 'techsupport@railsathi.gov.in',
      roleText: 'System Infrastructure, API Integrations & Database Operations'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', maxWidth: '1240px', margin: '0 auto', paddingBottom: '48px', fontFamily: "'Outfit', 'Segoe UI', system-ui, sans-serif" }}>

      {/* Header Banner */}
      <div style={{
        backgroundColor: '#360412',
        borderRadius: '16px',
        padding: '28px 34px',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 10px 28px rgba(54, 4, 18, 0.25)',
        background: 'linear-gradient(135deg, #360412 0%, #58081f 100%)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <span style={{ backgroundColor: '#e65c00', color: '#ffffff', fontSize: '0.72rem', fontWeight: 800, padding: '3px 10px', borderRadius: '12px', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
              Official Help Desk
            </span>
            <span style={{ color: '#ffb300', fontSize: '0.82rem', fontWeight: 700 }}>
              Indian Railways Operational Control
            </span>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.3px', color: '#ffffff' }}>
            RailSathi Help & Operational Reference Portal
          </div>
          <div style={{ fontSize: '0.92rem', color: '#f0b8c4', marginTop: '4px', fontWeight: 500, maxWidth: '850px', lineHeight: 1.5 }}>
            Official technical help desk detailing passenger grievance taxonomies, staff responsibilities, departmental assignment protocols, priority SLA timelines, and support directory.
          </div>
        </div>
        <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: '14px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <IconInfoCard />
        </div>
      </div>

      {/* SECTION 1: ABOUT RAILSATHI & RESPONSIBILITIES OF RAILWAY STAFF & OFFICERS (NO CARDS, NO LIFECYCLE) */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '14px', padding: '28px 32px', border: '1px solid #e5e7eb', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', borderBottom: '2.5px solid #f3d0d8', paddingBottom: '12px' }}>
          <IconShieldCheck />
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#800020', margin: 0 }}>
            About RailSathi & Official Responsibilities
          </h2>
        </div>

        <p style={{ fontSize: '0.94rem', color: '#374151', lineHeight: 1.65, margin: 0 }}>
          <strong>RailSathi</strong> is Indian Railways' official digital grievance redressal, real-time monitoring, and field staff dispatch framework. Built under the direction of the Railway Board, RailSathi connects 2.3 crore daily passengers directly with on-duty railway personnel across <strong>18 Railway Zones</strong>, <strong>71 Divisions</strong>, <strong>2,202 Express Trains</strong>, and <strong>2,038 Major Stations</strong>.
        </p>

        {/* Responsibilities of Railway Staff & Officers (Vertical List Without Cards) */}
        <div style={{ marginTop: '24px' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#111827', marginBottom: '14px', borderBottom: '1.5px solid #e5e7eb', paddingBottom: '6px' }}>
            Responsibilities of Railway Staff & Officers:
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

            <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '10px' }}>
              <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#800020' }}>
                • Complaint Management Officers (CMO)
              </div>
              <div style={{ fontSize: '0.86rem', color: '#4b5563', lineHeight: 1.5, marginTop: '2px', paddingLeft: '14px' }}>
                Responsible for reviewing incoming passenger complaints, verifying category accuracy, reassigning categories if misclassified, evaluating available onboard/station staff, dispatching personnel, and monitoring active SLA countdown timers.
              </div>
            </div>

            <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '10px' }}>
              <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#800020' }}>
                • Onboard Train Staff (TTE, RPF, OBHS Cleaning, AC & Electrical Technicians)
              </div>
              <div style={{ fontSize: '0.86rem', color: '#4b5563', lineHeight: 1.5, marginTop: '2px', paddingLeft: '14px' }}>
                Responsible for providing immediate physical attendance at the passenger's berth or coach upon receiving dispatch notification, resolving grievances on-site (e.g. linen replacement, AC repair, security intervention), and obtaining passenger OTP confirmation.
              </div>
            </div>

            <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '10px' }}>
              <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#800020' }}>
                • Station Staff & Commercial Inspectors (Station Masters, Vendors Control)
              </div>
              <div style={{ fontSize: '0.86rem', color: '#4b5563', lineHeight: 1.5, marginTop: '2px', paddingLeft: '14px' }}>
                Responsible for resolving station-bound grievances including platform cleanliness, water booth maintenance, ticketing counter availability, Divyangjan access ramps, and food vending hygiene.
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#800020' }}>
                • Departmental & Divisional Control Heads (Zone / Division Heads)
              </div>
              <div style={{ fontSize: '0.86rem', color: '#4b5563', lineHeight: 1.5, marginTop: '2px', paddingLeft: '14px' }}>
                Responsible for auditing division-wide complaint queues, handling escalation requests, evaluating staff performance metrics, and resolving inter-departmental routing disputes.
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* SECTION 2: TRAIN & STATION COMPLAINT CLASSES & SUBCLASSES (INSIDE A SINGLE CARD, COMPACT TABLES) */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '14px', padding: '28px 32px', border: '1px solid #e5e7eb', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
        <div style={{ borderBottom: '2.5px solid #f3d0d8', paddingBottom: '10px', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#800020', margin: 0 }}>
            Train & Station Complaint Classes & Subclasses (FAQ)
          </h2>
          <div style={{ fontSize: '0.82rem', color: '#6b7280', marginTop: '4px' }}>
            Click on any section below to expand and view the complete breakdown of categories and subcategories.
          </div>
        </div>

        {/* Accordions inside Card Container */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* FAQ ITEM 1: TRAIN COMPLAINTS (COMPACT TABLE SIZE) */}
          <div style={{ borderRadius: '10px', border: '1px solid #cbd5e1', overflow: 'hidden' }}>
            <div
              onClick={() => toggleFaq('train')}
              style={{
                padding: '16px 20px',
                backgroundColor: openFaq.train ? '#fcf8f9' : '#ffffff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                userSelect: 'none',
                borderBottom: openFaq.train ? '1.5px solid #f3d0d8' : 'none'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: openFaq.train ? '#800020' : '#94a3b8' }} />
                <div style={{ fontSize: '0.98rem', fontWeight: 800, color: '#700c28' }}>
                  What complaint categories and subcategories are available for Train Complaints?
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '0.74rem', fontWeight: 700, backgroundColor: '#f1f5f9', color: '#475569', padding: '3px 8px', borderRadius: '10px' }}>
                  14 Categories | 64 Subcategories
                </span>
                <IconChevronDown open={openFaq.train} />
              </div>
            </div>

            {openFaq.train && (
              <div style={{ padding: '16px 20px', backgroundColor: '#ffffff' }}>
                <p style={{ fontSize: '0.82rem', color: '#475569', marginBottom: '12px', marginTop: 0 }}>
                  The following table lists all available categories and their respective subcategories for train-related grievances:
                </p>
                <div style={{ overflowX: 'auto', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#700c28', color: '#ffffff' }}>
                        <th style={{ padding: '8px 12px', fontWeight: 800, width: '30%', borderRight: '1px solid rgba(255,255,255,0.2)' }}>Category (14)</th>
                        <th style={{ padding: '8px 12px', fontWeight: 800 }}>Subcategory (64)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {trainCategories.map((row, idx) => (
                        <tr key={row.name} style={{ backgroundColor: idx % 2 === 0 ? '#ffffff' : '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                          <td style={{ padding: '8px 12px', fontWeight: 800, color: '#1e293b', borderRight: '1px solid #e2e8f0', verticalAlign: 'top' }}>
                            {row.name} ({row.count})
                          </td>
                          <td style={{ padding: '8px 12px', color: '#334155', lineHeight: 1.4, verticalAlign: 'top' }}>
                            {row.sub}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* FAQ ITEM 2: STATION COMPLAINTS (COMPACT TABLE SIZE) */}
          <div style={{ borderRadius: '10px', border: '1px solid #cbd5e1', overflow: 'hidden' }}>
            <div
              onClick={() => toggleFaq('station')}
              style={{
                padding: '16px 20px',
                backgroundColor: openFaq.station ? '#fcf8f9' : '#ffffff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                userSelect: 'none',
                borderBottom: openFaq.station ? '1.5px solid #f3d0d8' : 'none'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: openFaq.station ? '#800020' : '#94a3b8' }} />
                <div style={{ fontSize: '0.98rem', fontWeight: 800, color: '#700c28' }}>
                  What complaint categories and subcategories are available for Station Complaints?
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '0.74rem', fontWeight: 700, backgroundColor: '#f1f5f9', color: '#475569', padding: '3px 8px', borderRadius: '10px' }}>
                  17 Categories | 99 Subcategories
                </span>
                <IconChevronDown open={openFaq.station} />
              </div>
            </div>

            {openFaq.station && (
              <div style={{ padding: '16px 20px', backgroundColor: '#ffffff' }}>
                <p style={{ fontSize: '0.82rem', color: '#475569', marginBottom: '12px', marginTop: 0 }}>
                  The following table lists all available categories and their respective subcategories for station-related grievances:
                </p>
                <div style={{ overflowX: 'auto', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#700c28', color: '#ffffff' }}>
                        <th style={{ padding: '8px 12px', fontWeight: 800, width: '30%', borderRight: '1px solid rgba(255,255,255,0.2)' }}>Category (17)</th>
                        <th style={{ padding: '8px 12px', fontWeight: 800 }}>Subcategory (99)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stationCategories.map((row, idx) => (
                        <tr key={row.name} style={{ backgroundColor: idx % 2 === 0 ? '#ffffff' : '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                          <td style={{ padding: '8px 12px', fontWeight: 800, color: '#1e293b', borderRight: '1px solid #e2e8f0', verticalAlign: 'top' }}>
                            {row.name} ({row.count})
                          </td>
                          <td style={{ padding: '8px 12px', color: '#334155', lineHeight: 1.4, verticalAlign: 'top' }}>
                            {row.sub}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* SECTION 3: DEPARTMENTS RESPONSIBLE FOR RESOLUTION */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '14px', padding: '28px 32px', border: '1px solid #e5e7eb', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#800020', marginBottom: '16px', borderBottom: '2.5px solid #f3d0d8', paddingBottom: '10px' }}>
          Departments Responsible for Resolution
        </h2>
        <div style={{ overflowX: 'auto', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: '#700c28', color: '#ffffff' }}>
                <th style={{ padding: '10px 14px', fontWeight: 800, width: '16%' }}>Dept Code</th>
                <th style={{ padding: '10px 14px', fontWeight: 800, width: '32%' }}>Department Name</th>
                <th style={{ padding: '10px 14px', fontWeight: 800 }}>Operational Scope & Key Duties</th>
              </tr>
            </thead>
            <tbody>
              {departmentsList.map((d, idx) => (
                <tr key={d.code} style={{ backgroundColor: idx % 2 === 0 ? '#ffffff' : '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '10px 14px', fontWeight: 800, color: '#800020' }}>{d.code}</td>
                  <td style={{ padding: '10px 14px', fontWeight: 700, color: '#1f2937' }}>{d.name}</td>
                  <td style={{ padding: '10px 14px', color: '#4b5563', lineHeight: 1.4 }}>{d.duties}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION 4: COMPLAINT PRIORITY SYSTEM & MATRIX */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '14px', padding: '28px 32px', border: '1px solid #e5e7eb', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#800020', marginBottom: '16px', borderBottom: '2.5px solid #f3d0d8', paddingBottom: '10px' }}>
          Complaint Priority System & SLA Matrix
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
          {prioritiesList.map(p => (
            <div key={p.priority} style={{ backgroundColor: p.bg, padding: '16px 18px', borderRadius: '10px', border: `1px solid ${p.color}40` }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '1rem', fontWeight: 800, color: p.color }}>{p.priority} Priority</span>
                <span style={{ fontSize: '0.74rem', fontWeight: 800, backgroundColor: p.color, color: '#ffffff', padding: '3px 8px', borderRadius: '10px' }}>
                  {p.sla}
                </span>
              </div>
              <div style={{ fontSize: '0.82rem', color: '#374151', lineHeight: 1.45 }}>
                {p.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 5: CONTACT & SUPPORT CHANNELS — RAILWAY OFFICIALS DIRECTORY (EXACTLY 2 CARDS ONLY, NO CONTROL ROOM BANNER) */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '14px', padding: '28px 32px', border: '1px solid #e5e7eb', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
        <div style={{ borderBottom: '2.5px solid #f3d0d8', paddingBottom: '10px', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#800020', margin: 0 }}>
            Contact & Support Channels - Railway Officials Directory
          </h2>
          <div style={{ fontSize: '0.82rem', color: '#6b7280', marginTop: '4px' }}>
            Official directory of Indian Railways Nodal Officers and Helpdesk maintaining the RailSathi Portal.
          </div>
        </div>

        {/* Directory Grid - 2 CARDS ONLY */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
          {railwayOfficials.map((off, idx) => (
            <div key={idx} style={{
              backgroundColor: '#fcf8f9',
              padding: '20px 22px',
              borderRadius: '12px',
              border: '1px solid #f3d0d8',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 2px 8px rgba(128, 0, 32, 0.05)'
            }}>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#e65c00', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>
                  {off.roleText}
                </div>
                <div style={{ fontSize: '1.08rem', fontWeight: 800, color: '#800020' }}>
                  {off.name}
                </div>
                <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#1f2937', marginTop: '2px' }}>
                  {off.designation}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '4px' }}>
                  {off.organization}
                </div>
              </div>

              <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid #f3d0d8', display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.82rem' }}>
                <div><strong style={{ color: '#374151' }}>Phone / Ext:</strong> <span style={{ color: '#111827', fontWeight: 700 }}>{off.phone}</span></div>
                <div><strong style={{ color: '#374151' }}>Official Email:</strong> <a href={`mailto:${off.email}`} style={{ color: '#800020', textDecoration: 'none', fontWeight: 700 }}>{off.email}</a></div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
