import React, { useState } from 'react';

const IconInfoCard = () => (
  <svg style={{ width: '24px', height: '24px', color: '#ffb300' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const IconChevronDown = ({ open }) => (
  <svg
    style={{
      width: '20px',
      height: '20px',
      transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
      transition: 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
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

export default function InformationPage({ user }) {
  // Accordion state for FAQ section - CLOSED BY DEFAULT ON LOAD/REFRESH AS REQUESTED
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

  // Priority Matrix System
  const prioritiesList = [
    { priority: 'Critical', color: '#c5221f', bg: '#fce8e6', sla: '< 15 Mins', desc: 'Active safety threats, medical emergencies, robbery, harassment, rape, active fire.' },
    { priority: 'High', color: '#ea4335', bg: '#fee8e6', sla: '< 1 Hour', desc: 'Food/water non-availability, total AC failure, toilet choked, Divyangjan access obstruction.' },
    { priority: 'Medium', color: '#b06000', bg: '#fef3d6', sla: '< 2 Hours', desc: 'Food quality, bedroll non-availability, fan/light defect, delayed train running inquiry.' },
    { priority: 'Low', color: '#137333', bg: '#e6f4ea', sla: '< 4 Hours', desc: 'Minor cosmetic defects, general feedback, website/app queries.' }
  ];

  // Railway Nodal Officials Maintaining RailSathi Dashboard
  const railwayOfficials = [
    {
      name: 'Shri Rajeshwar Verma, IRTS',
      designation: 'Director General (Passenger Services & Grievances)',
      organization: 'Railway Board, Rail Bhavan, New Delhi',
      phone: '011-23381234 (Ext. 4321)',
      email: 'dg.passenger@rb.railnet.gov.in',
      roleText: 'Apex Nodal Officer for Policy & National Grievance Monitoring'
    },
    {
      name: 'Smt. Sunita Sharma, IRTS',
      designation: 'Principal Chief Commercial Manager (Passenger Marketing)',
      organization: 'Northern Railway HQ, Baroda House, New Delhi',
      phone: '011-23348890',
      email: 'ccm.pm@nr.railnet.gov.in',
      roleText: 'Commercial Operations & Catering Oversight'
    },
    {
      name: 'Shri Vikramaditya Singh, IPS',
      designation: 'Inspector General / Director (RPF Security Control)',
      organization: 'Central RPF Security Control, Rail Bhavan',
      phone: '182 / 011-23303456',
      email: 'rpf.control@rb.railnet.gov.in',
      roleText: 'National Security Command & Passenger Safety'
    },
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '1240px', margin: '0 auto', paddingBottom: '48px', fontFamily: "'Outfit', 'Segoe UI', system-ui, sans-serif" }}>

      {/* Premium Header Banner */}
      <div style={{
        backgroundColor: '#360412',
        borderRadius: '16px',
        padding: '32px 36px',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 12px 32px rgba(54, 4, 18, 0.3)',
        borderLeft: '6px solid #e65c00',
        background: 'linear-gradient(135deg, #360412 0%, #58081f 100%)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <span style={{ backgroundColor: '#e65c00', color: '#ffffff', fontSize: '0.72rem', fontWeight: 800, padding: '3px 10px', borderRadius: '12px', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
              Official Help Portal
            </span>
            <span style={{ color: '#ffb300', fontSize: '0.82rem', fontWeight: 700 }}>
              Indian Railways Operational Control
            </span>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-0.3px', color: '#ffffff' }}>
            RailSathi Help & Operational Reference Portal
          </div>
          <div style={{ fontSize: '0.94rem', color: '#f0b8c4', marginTop: '6px', fontWeight: 500, maxWidth: '850px', lineHeight: 1.5 }}>
            Official technical help desk detailing passenger grievance taxonomies, departmental assignment protocols, priority SLA timelines, and railway administration contact channels.
          </div>

        </div>
        <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: '16px', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <IconInfoCard />
        </div>
      </div>

      {/* SECTION 1: EXPANDED ABOUT RAILSATHI */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '14px', padding: '30px 32px', border: '1px solid #e5e7eb', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', borderBottom: '2.5px solid #f3d0d8', paddingBottom: '12px' }}>
          <IconShieldCheck />
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#800020', margin: 0 }}>
            About RailSathi
          </h2>
        </div>

        <p style={{ fontSize: '0.96rem', color: '#374151', lineHeight: 1.7, margin: 0 }}>
          <strong>RailSathi</strong> is Indian Railways' flagship digital grievance redressal, real-time monitoring, and field staff dispatch framework. Built under the direction of the Railway Board, RailSathi bridges 2.3 crore daily passengers directly with on-duty railway personnel across <strong>18 Railway Zones</strong>, <strong>71 Divisions</strong>, <strong>2,202 Express Trains</strong>, and <strong>2,038 Major Stations</strong>.
        </p>

        {/* Vision & Core Pillars */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '24px' }}>

          <div style={{ backgroundColor: '#fcf8f9', padding: '20px', borderRadius: '10px', border: '1px solid #f3d0d8' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#e65c00', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Vision & Mission</div>
            <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#800020', marginTop: '4px' }}>Zero-Friction Passenger Care</div>
            <div style={{ fontSize: '0.84rem', color: '#4b5563', marginTop: '8px', lineHeight: 1.55 }}>
              Delivering transparent, SLA-bound resolution for every passenger concern, ensuring safe, clean, and punctual train journeys nationwide.
            </div>
          </div>

          <div style={{ backgroundColor: '#fcf8f9', padding: '20px', borderRadius: '10px', border: '1px solid #f3d0d8' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#e65c00', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Granular Classification</div>
            <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#800020', marginTop: '4px' }}>130 Categorized Subclasses</div>
            <div style={{ fontSize: '0.84rem', color: '#4b5563', marginTop: '8px', lineHeight: 1.55 }}>
              Precision classification spanning security, AC maintenance, hygiene, catering, Divyangjan access, ticketing, and coaching facilities.
            </div>
          </div>

          <div style={{ backgroundColor: '#fcf8f9', padding: '20px', borderRadius: '10px', border: '1px solid #f3d0d8' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#e65c00', textTransform: 'uppercase', letterSpacing: '0.5px' }}>GPS Onboard Dispatch</div>
            <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#800020', marginTop: '4px' }}>Direct On-Duty Assignment</div>
            <div style={{ fontSize: '0.84rem', color: '#4b5563', marginTop: '8px', lineHeight: 1.55 }}>
              Automated routing to TTEs, RPF constables, OBHS cleaning supervisors, and electrical technicians assigned to the passenger's exact coach.
            </div>
          </div>

          <div style={{ backgroundColor: '#fcf8f9', padding: '20px', borderRadius: '10px', border: '1px solid #f3d0d8' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#e65c00', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Audit & Verification</div>
            <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#800020', marginTop: '4px' }}>Passenger OTP Verification</div>
            <div style={{ fontSize: '0.84rem', color: '#4b5563', marginTop: '8px', lineHeight: 1.55 }}>
              Grievances are officially closed only after two-way verification and passenger OTP authorization, maintaining complete accountability.
            </div>
          </div>

        </div>

        {/* System Flow Steps */}
        <div style={{ marginTop: '28px', backgroundColor: '#fafafa', padding: '20px', borderRadius: '10px', border: '1px solid #e5e7eb' }}>
          <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#111827', marginBottom: '12px' }}>
            RailSathi End-to-End Operational Lifecycle:
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', textAlign: 'center' }}>
            <div style={{ backgroundColor: '#ffffff', padding: '12px 14px', borderRadius: '8px', border: '1px solid #d1d5db' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#800020' }}>STEP 1</span>
              <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#1f2937', marginTop: '2px' }}>PNR & Location Registration</div>
            </div>
            <div style={{ backgroundColor: '#ffffff', padding: '12px 14px', borderRadius: '8px', border: '1px solid #d1d5db' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#800020' }}>STEP 2</span>
              <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#1f2937', marginTop: '2px' }}>AI Taxonomy & CMO Queue</div>
            </div>
            <div style={{ backgroundColor: '#ffffff', padding: '12px 14px', borderRadius: '8px', border: '1px solid #d1d5db' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#800020' }}>STEP 3</span>
              <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#1f2937', marginTop: '2px' }}>On-Duty Staff Dispatch</div>

            </div>
            <div style={{ backgroundColor: '#ffffff', padding: '12px 14px', borderRadius: '8px', border: '1px solid #d1d5db' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#800020' }}>STEP 4</span>
              <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#1f2937', marginTop: '2px' }}>Field Work & Resolution</div>
            </div>
            <div style={{ backgroundColor: '#ffffff', padding: '12px 14px', borderRadius: '8px', border: '1px solid #d1d5db' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#800020' }}>STEP 5</span>
              <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#1f2937', marginTop: '2px' }}>OTP Feedback & Audit Log</div>
            </div>
          </div>
        </div>

      </div>

      {/* SECTION 2: TRAIN & STATION COMPLAINT CATEGORIES (FAQ ACCORDIONS - CLOSED BY DEFAULT) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ borderBottom: '2.5px solid #f3d0d8', paddingBottom: '8px' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#800020', margin: 0 }}>
            Train & Station Complaint Classes & Subclasses
          </h2>
          <div style={{ fontSize: '0.84rem', color: '#6b7280', marginTop: '4px' }}>
            Click on any question below to expand and view the full breakdown of categories and subcategories.
          </div>
        </div>

        {/* FAQ ITEM 1: TRAIN COMPLAINTS (CLOSED BY DEFAULT) */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #cbd5e1', overflow: 'hidden', boxShadow: '0 3px 12px rgba(0,0,0,0.05)', transition: 'all 0.2s ease' }}>
          <div
            onClick={() => toggleFaq('train')}
            style={{
              padding: '20px 28px',
              backgroundColor: openFaq.train ? '#fcf8f9' : '#ffffff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              userSelect: 'none',
              borderBottom: openFaq.train ? '2px solid #f3d0d8' : 'none'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: openFaq.train ? '#800020' : '#94a3b8' }} />
              <div style={{ fontSize: '1.08rem', fontWeight: 800, color: '#700c28' }}>
                What complaint categories and subcategories are available for Train Complaints?
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, backgroundColor: '#f1f5f9', color: '#475569', padding: '4px 10px', borderRadius: '12px' }}>
                14 Categories | 64 Subcategories
              </span>
              <IconChevronDown open={openFaq.train} />
            </div>
          </div>

          {openFaq.train && (
            <div style={{ padding: '24px 28px', backgroundColor: '#ffffff' }}>
              <p style={{ fontSize: '0.88rem', color: '#475569', marginBottom: '18px', marginTop: 0 }}>
                The following table lists all available categories and their respective subcategories for train-related grievances:
              </p>
              <div style={{ overflowX: 'auto', borderRadius: '10px', border: '1px solid #cbd5e1' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.86rem', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#700c28', color: '#ffffff' }}>
                      <th style={{ padding: '14px 18px', fontWeight: 800, width: '32%', borderRight: '1px solid rgba(255,255,255,0.2)' }}>Category (14)</th>
                      <th style={{ padding: '14px 18px', fontWeight: 800 }}>Subcategory (64)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trainCategories.map((row, idx) => (
                      <tr key={row.name} style={{ backgroundColor: idx % 2 === 0 ? '#ffffff' : '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                        <td style={{ padding: '14px 18px', fontWeight: 800, color: '#1e293b', borderRight: '1px solid #e2e8f0', verticalAlign: 'top' }}>
                          {row.name} ({row.count})
                        </td>
                        <td style={{ padding: '14px 18px', color: '#334155', lineHeight: 1.55, verticalAlign: 'top' }}>
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

        {/* FAQ ITEM 2: STATION COMPLAINTS (CLOSED BY DEFAULT) */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #cbd5e1', overflow: 'hidden', boxShadow: '0 3px 12px rgba(0,0,0,0.05)', transition: 'all 0.2s ease' }}>
          <div
            onClick={() => toggleFaq('station')}
            style={{
              padding: '20px 28px',
              backgroundColor: openFaq.station ? '#fcf8f9' : '#ffffff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              userSelect: 'none',
              borderBottom: openFaq.station ? '2px solid #f3d0d8' : 'none'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: openFaq.station ? '#800020' : '#94a3b8' }} />
              <div style={{ fontSize: '1.08rem', fontWeight: 800, color: '#700c28' }}>
                What complaint categories and subcategories are available for Station Complaints?
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, backgroundColor: '#f1f5f9', color: '#475569', padding: '4px 10px', borderRadius: '12px' }}>
                17 Categories | 99 Subcategories
              </span>
              <IconChevronDown open={openFaq.station} />
            </div>
          </div>

          {openFaq.station && (
            <div style={{ padding: '24px 28px', backgroundColor: '#ffffff' }}>
              <p style={{ fontSize: '0.88rem', color: '#475569', marginBottom: '18px', marginTop: 0 }}>
                The following table lists all available categories and their respective subcategories for station-related grievances:
              </p>
              <div style={{ overflowX: 'auto', borderRadius: '10px', border: '1px solid #cbd5e1' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.86rem', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#700c28', color: '#ffffff' }}>
                      <th style={{ padding: '14px 18px', fontWeight: 800, width: '32%', borderRight: '1px solid rgba(255,255,255,0.2)' }}>Category (17)</th>
                      <th style={{ padding: '14px 18px', fontWeight: 800 }}>Subcategory (99)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stationCategories.map((row, idx) => (
                      <tr key={row.name} style={{ backgroundColor: idx % 2 === 0 ? '#ffffff' : '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                        <td style={{ padding: '14px 18px', fontWeight: 800, color: '#1e293b', borderRight: '1px solid #e2e8f0', verticalAlign: 'top' }}>
                          {row.name} ({row.count})
                        </td>
                        <td style={{ padding: '14px 18px', color: '#334155', lineHeight: 1.55, verticalAlign: 'top' }}>
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

      {/* SECTION 3: DEPARTMENTS RESPONSIBLE FOR RESOLUTION */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '14px', padding: '30px 32px', border: '1px solid #e5e7eb', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
        <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#800020', marginBottom: '16px', borderBottom: '2.5px solid #f3d0d8', paddingBottom: '10px' }}>
          Departments Responsible for Resolution
        </h2>
        <div style={{ overflowX: 'auto', borderRadius: '10px', border: '1px solid #cbd5e1' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.86rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: '#700c28', color: '#ffffff' }}>
                <th style={{ padding: '14px 18px', fontWeight: 800, width: '16%' }}>Dept Code</th>
                <th style={{ padding: '14px 18px', fontWeight: 800, width: '32%' }}>Department Name</th>
                <th style={{ padding: '14px 18px', fontWeight: 800 }}>Operational Scope & Key Duties</th>
              </tr>
            </thead>
            <tbody>
              {departmentsList.map((d, idx) => (
                <tr key={d.code} style={{ backgroundColor: idx % 2 === 0 ? '#ffffff' : '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '14px 18px', fontWeight: 800, color: '#800020' }}>{d.code}</td>
                  <td style={{ padding: '14px 18px', fontWeight: 700, color: '#1f2937' }}>{d.name}</td>
                  <td style={{ padding: '14px 18px', color: '#4b5563', lineHeight: 1.5 }}>{d.duties}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION 4: COMPLAINT PRIORITY SYSTEM & MATRIX */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '14px', padding: '30px 32px', border: '1px solid #e5e7eb', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
        <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#800020', marginBottom: '16px', borderBottom: '2.5px solid #f3d0d8', paddingBottom: '10px' }}>
          Complaint Priority System & SLA Matrix
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '18px' }}>
          {prioritiesList.map(p => (
            <div key={p.priority} style={{ backgroundColor: p.bg, padding: '18px 20px', borderRadius: '12px', border: `1px solid ${p.color}40`, boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '1.05rem', fontWeight: 800, color: p.color }}>{p.priority} Priority</span>
                <span style={{ fontSize: '0.78rem', fontWeight: 800, backgroundColor: p.color, color: '#ffffff', padding: '4px 10px', borderRadius: '12px' }}>
                  {p.sla}
                </span>
              </div>
              <div style={{ fontSize: '0.84rem', color: '#374151', lineHeight: 1.5 }}>
                {p.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 5: CONTACT & SUPPORT - RAILWAY OFFICIALS DIRECTORY */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '14px', padding: '30px 32px', border: '1px solid #e5e7eb', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
        <div style={{ borderBottom: '2.5px solid #f3d0d8', paddingBottom: '10px', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#800020', margin: 0 }}>
            Contact & Support
          </h2>
          <div style={{ fontSize: '0.84rem', color: '#6b7280', marginTop: '4px' }}>
            Official directory of Indian Railways Nodal Officers and Command Control Rooms maintaining the RailSathi Dashboard.
          </div>
        </div>

        {/* Directory Grid */}
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

        {/* 24x7 Control Room Banner */}
        <div style={{ backgroundColor: '#700c28', borderRadius: '12px', padding: '22px 26px', color: '#ffffff', marginTop: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: '#ffb300', fontWeight: 800, letterSpacing: '0.6px' }}>
              Central Railway Grievance Command & Control Room
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', marginTop: '2px' }}>
              24x7 National Helpline: 139 (Toll-Free) | RPF Emergency: 182
            </div>
          </div>
          <div style={{ backgroundColor: 'rgba(255,255,255,0.15)', padding: '10px 18px', borderRadius: '8px', fontSize: '0.86rem', fontWeight: 700, color: '#ffffff' }}>
            Operational Status: ● ALL SYSTEMS ONLINE
          </div>
        </div>
      </div>

    </div>
  );
}
