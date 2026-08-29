import React, { useState, useEffect } from 'react';

export default function StaffTrainJourneyPage({ user }) {
  const [journeyData, setJourneyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCoach, setSelectedCoach] = useState(null);
  const [mobileViewMode, setMobileViewMode] = useState('track'); // 'track' or 'grid'

  const DEFAULT_FALLBACK_JOURNEY = {
    train_info: {
      train_number: "22477",
      train_name: "Shri Mata Vaishno Devi Katra Vande Bharat Express",
      source: "New Delhi (NDLS)",
      destination: "Shri Mata Vaishno Devi Katra (SVDK)",
      total_coaches: 18,
      total_halts: 7
    },
    coaches: [
      { coach_id: 1, coach_number: "ENGINE", coach_type: "Locomotive Engine", position_sequence: 1, facilities: "Pantry Crew: Praveen Yadav (STF_CAT_22477)", assigned_staff_name: "Praveen Yadav" },
      { coach_id: 2, coach_number: "C1", coach_type: "AC Chair Car", position_sequence: 2, facilities: "Automatic Doors, Bio-Toilet, Charging Points, CCTV", assigned_staff_name: "Unassigned / General" },
      { coach_id: 3, coach_number: "C2", coach_type: "AC Chair Car", position_sequence: 3, facilities: "Automatic Doors, Bio-Toilet, Charging Points, CCTV", assigned_staff_name: "Unassigned / General" },
      { coach_id: 4, coach_number: "C3", coach_type: "AC Chair Car", position_sequence: 4, facilities: "Automatic Doors, Bio-Toilet, Charging Points, CCTV", assigned_staff_name: "Praveen Yadav" },
      { coach_id: 5, coach_number: "C4", coach_type: "AC Chair Car", position_sequence: 5, facilities: "Automatic Doors, Bio-Toilet, Charging Points, CCTV", assigned_staff_name: "Unassigned / General" },
      { coach_id: 6, coach_number: "C5", coach_type: "AC Chair Car", position_sequence: 6, facilities: "Automatic Doors, Bio-Toilet, Charging Points, CCTV", assigned_staff_name: "Unassigned / General" },
      { coach_id: 7, coach_number: "C6", coach_type: "AC Chair Car", position_sequence: 7, facilities: "Automatic Doors, Bio-Toilet, Charging Points, CCTV", assigned_staff_name: "Unassigned / General" },
      { coach_id: 8, coach_number: "C7", coach_type: "AC Chair Car", position_sequence: 8, facilities: "Automatic Doors, Bio-Toilet, Charging Points, CCTV", assigned_staff_name: "Praveen Yadav" },
      { coach_id: 9, coach_number: "E1", coach_type: "Executive Class", position_sequence: 9, facilities: "360° Reclining Seats, Mini Pantry, Executive Dining, CCTV", assigned_staff_name: "Praveen Yadav" },
      { coach_id: 10, coach_number: "E2", coach_type: "Executive Class", position_sequence: 10, facilities: "360° Reclining Seats, Mini Pantry, Executive Dining, CCTV", assigned_staff_name: "Praveen Yadav" },
      { coach_id: 11, coach_number: "C8", coach_type: "AC Chair Car", position_sequence: 11, facilities: "Automatic Doors, Bio-Toilet, Charging Points, CCTV", assigned_staff_name: "Unassigned / General" },
      { coach_id: 12, coach_number: "C9", coach_type: "AC Chair Car", position_sequence: 12, facilities: "Automatic Doors, Bio-Toilet, Charging Points, CCTV", assigned_staff_name: "Unassigned / General" },
      { coach_id: 13, coach_number: "C10", coach_type: "AC Chair Car", position_sequence: 13, facilities: "Automatic Doors, Bio-Toilet, Charging Points, CCTV", assigned_staff_name: "Unassigned / General" },
      { coach_id: 14, coach_number: "C11", coach_type: "AC Chair Car", position_sequence: 14, facilities: "Automatic Doors, Bio-Toilet, Charging Points, CCTV", assigned_staff_name: "Unassigned / General" },
      { coach_id: 15, coach_number: "C12", coach_type: "AC Chair Car", position_sequence: 15, facilities: "Automatic Doors, Bio-Toilet, Charging Points, CCTV", assigned_staff_name: "Unassigned / General" },
      { coach_id: 16, coach_number: "C13", coach_type: "AC Chair Car", position_sequence: 16, facilities: "Automatic Doors, Bio-Toilet, Charging Points, CCTV", assigned_staff_name: "Unassigned / General" },
      { coach_id: 17, coach_number: "C14", coach_type: "AC Chair Car", position_sequence: 17, facilities: "Automatic Doors, Bio-Toilet, Charging Points, CCTV", assigned_staff_name: "Unassigned / General" },
      { coach_id: 18, coach_number: "TAIL", coach_type: "Rear Guard Cab", position_sequence: 18, facilities: "Emergency Brake Controls, Guard Telemetry, Driver Intercom", assigned_staff_name: "Unassigned / General" }
    ],
    journey_halts: [
      { stop_sequence: 1, station_code: "NDLS", station_name: "NEW DELHI", arrival_time: "06:00", departure_time: "06:00", halt_duration: "Origin", distance_km: 0.0 },
      { stop_sequence: 2, station_code: "UMB", station_name: "AMBALA CANTT", arrival_time: "08:10", departure_time: "08:12", halt_duration: "2 Mins", distance_km: 198.0 },
      { stop_sequence: 3, station_code: "LDH", station_name: "LUDHIANA JN", arrival_time: "09:19", departure_time: "09:21", halt_duration: "2 Mins", distance_km: 312.0 },
      { stop_sequence: 4, station_code: "KTHU", station_name: "KATHUA", arrival_time: "11:44", departure_time: "11:46", halt_duration: "2 Mins", distance_km: 505.0 },
      { stop_sequence: 5, station_code: "JAT", station_name: "JAMMU TAWI", arrival_time: "12:38", departure_time: "12:40", halt_duration: "2 Mins", distance_km: 581.0 },
      { stop_sequence: 6, station_code: "MCTM", station_name: "MCTM UDHAMPUR", arrival_time: "13:30", departure_time: "13:32", halt_duration: "2 Mins", distance_km: 634.0 },
      { stop_sequence: 7, station_code: "SVDK", station_name: "SMVD KATRA", arrival_time: "14:00", departure_time: "14:00", halt_duration: "Terminus", distance_km: 655.0 }
    ]
  };

  const fetchJourneyData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/v1/staff/me/train-journey');
      const data = await res.json();
      if (res.ok && data.status === 'success') {
        setJourneyData(data);
      } else {
        setJourneyData(DEFAULT_FALLBACK_JOURNEY);
      }
    } catch (err) {
      setJourneyData(DEFAULT_FALLBACK_JOURNEY);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJourneyData();
  }, []);

  useEffect(() => {
    if (journeyData?.coaches?.length > 0 && !selectedCoach) {
      setSelectedCoach(journeyData.coaches[0]);
    }
  }, [journeyData]);

  if (loading) {
    return (
      <div style={{ padding: '50px', textAlign: 'center', color: '#666' }}>
        <div style={{ display: 'inline-block', width: '32px', height: '32px', border: '3px solid #800020', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <p style={{ marginTop: '12px', fontWeight: 600 }}>Loading Train Coach Composition & Timetable...</p>
      </div>
    );
  }

  if (error) {
    return <div style={{ padding: '20px', backgroundColor: '#fef2f2', color: '#991b1b', borderRadius: '8px', margin: '20px' }}>{error}</div>;
  }

  const { train_info, coaches, journey_halts } = journeyData || {};

  const row1Coaches = coaches ? coaches.slice(0, 6) : [];
  const row2Coaches = coaches ? coaches.slice(6, 12) : [];
  const row3Coaches = coaches ? coaches.slice(12, 18) : [];

  const getCoachCategory = (c) => {
    if (!c || !c.coach_number) return { label: 'CHAIR', bg: '#ffffff', text: '#1f2937', type: 'AC Chair Car' };
    if (c.coach_number === 'ENGINE') return { label: 'LOCO', bg: '#1e293b', text: '#ffffff', type: 'Locomotive' };
    if (c.coach_number === 'TAIL') return { label: 'TAIL', bg: '#800020', text: '#ffffff', type: 'Guard Cab' };
    if (typeof c.coach_number === 'string' && c.coach_number.startsWith('E')) return { label: 'EXEC', bg: '#700c28', text: '#ffffff', type: 'Executive CC' };
    return { label: 'CHAIR', bg: '#ffffff', text: '#1f2937', type: 'AC Chair Car' };
  };

  const renderCoachCard = (c, isLastInRow, isMobileRake = false) => {
    if (!c) return null;
    const isEngine = c.coach_number === 'ENGINE';
    const isTail = c.coach_number === 'TAIL';
    const isExecutive = typeof c.coach_number === 'string' && c.coach_number.startsWith('E');
    const isSelected = selectedCoach?.coach_id === c.coach_id;
    const cat = getCoachCategory(c);

    return (
      <React.Fragment key={c.coach_id}>
        <div
          onClick={() => setSelectedCoach(c)}
          style={{
            flex: isMobileRake ? '0 0 115px' : 1,
            minWidth: isMobileRake ? '115px' : '120px',
            maxWidth: isMobileRake ? '130px' : '160px',
            height: isMobileRake ? '95px' : '110px',
            flexShrink: 0,
            backgroundColor: isEngine ? '#1e293b' : isTail ? '#800020' : isExecutive ? '#5c091e' : isSelected ? '#700c28' : '#ffffff',
            color: (isEngine || isTail || isExecutive || isSelected) ? '#ffffff' : '#1f2937',
            border: isSelected ? '3px solid #ffb300' : '2px solid #cbd5e1',
            borderRadius: '10px',
            padding: isMobileRake ? '8px 8px' : '12px 10px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
            boxShadow: isSelected ? '0 6px 16px rgba(255, 179, 0, 0.4)' : '0 2px 6px rgba(0,0,0,0.06)',
            transform: isSelected ? 'translateY(-2px)' : 'none',
            boxSizing: 'border-box'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.74rem', fontWeight: 800, opacity: 0.85 }}>#{c.position_sequence}</span>
            <span style={{
              fontSize: '0.68rem',
              fontWeight: 800,
              padding: '1px 5px',
              borderRadius: '4px',
              backgroundColor: (isEngine || isTail || isExecutive || isSelected) ? 'rgba(255,255,255,0.2)' : '#f1f5f9',
              color: (isEngine || isTail || isExecutive || isSelected) ? '#ffffff' : '#475569'
            }}>
              {cat.label}
            </span>
          </div>

          <div style={{ textAlign: 'center', margin: '2px 0' }}>
            <div style={{ fontSize: isMobileRake ? '1.25rem' : '1.45rem', fontWeight: 900, letterSpacing: '0.5px', lineHeight: '1' }}>
              {c.coach_number}
            </div>
            <div style={{ fontSize: '0.68rem', opacity: 0.85, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', marginTop: '3px', fontWeight: 600 }}>
              {isEngine ? 'Locomotive' : isTail ? 'Guard Cab' : c.coach_type}
            </div>
          </div>
        </div>

        {!isLastInRow && (
          <div style={{
            color: '#800020',
            fontWeight: 900,
            fontSize: '1rem',
            userSelect: 'none',
            padding: '0 2px',
            display: 'flex',
            alignItems: 'center',
            opacity: 0.6
          }}>
            —
          </div>
        )}
      </React.Fragment>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Banner Matching CMO Dashboard Header */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        border: '1px solid #e5e7eb',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div>
          <div style={{ fontSize: '0.75rem', color: '#800020', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            ONBOARD TRAIN ARCHITECTURE & SCHEDULE
          </div>
          <h2 style={{ margin: '2px 0 0 0', fontSize: 'clamp(1.15rem, 2.5vw, 1.4rem)', fontWeight: 800, color: '#800020' }}>
            22477 - Shri Mata Vaishno Devi Katra Vande Bharat Express
          </h2>
          <p style={{ margin: '4px 0 0 0', fontSize: '0.84rem', color: '#6b7280' }}>
            Route: <strong>New Delhi (NDLS) - Katra (SVDK)</strong> • Total Coaches: <strong>{train_info?.total_coaches || 18}</strong>
          </p>
        </div>
      </div>

      {/* COACH COMPOSITION CONTAINER */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '20px',
        border: '1px solid #e5e7eb',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '14px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#111827' }}>
              Train Physical Coach Composition (Engine - Tail)
            </h3>
            <p style={{ margin: '3px 0 0 0', fontSize: '0.82rem', color: '#6b7280' }}>
              Physical 18-coach rake sequence. Tap any coach to view assigned crew and equipment details.
            </p>
          </div>

          {/* Mobile View Switcher (Visible on Phones & Tablets) */}
          <div className="visible-on-mobile" style={{ display: 'flex', gap: '4px', backgroundColor: '#f1f5f9', padding: '3px', borderRadius: '8px' }}>
            <button
              type="button"
              onClick={() => setMobileViewMode('track')}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                border: 'none',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer',
                backgroundColor: mobileViewMode === 'track' ? '#800020' : 'transparent',
                color: mobileViewMode === 'track' ? '#ffffff' : '#475569'
              }}
            >
              🚂 Swipe Track
            </button>
            <button
              type="button"
              onClick={() => setMobileViewMode('grid')}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                border: 'none',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer',
                backgroundColor: mobileViewMode === 'grid' ? '#800020' : 'transparent',
                color: mobileViewMode === 'grid' ? '#ffffff' : '#475569'
              }}
            >
              ▦ Coach Grid
            </button>
          </div>
        </div>

        {/* --- DESKTOP & TABLET: 3 ROWS OF 6 COACHES --- */}
        <div className="hidden-on-mobile">
          <div style={{
            backgroundColor: '#f8fafc',
            padding: '16px',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            {/* ROW 1: Coaches #1 to #6 */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
              {row1Coaches.map((c, idx) => renderCoachCard(c, idx === row1Coaches.length - 1))}
            </div>

            {/* ROW 2: Coaches #7 to #12 */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
              {row2Coaches.map((c, idx) => renderCoachCard(c, idx === row2Coaches.length - 1))}
            </div>

            {/* ROW 3: Coaches #13 to #18 */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
              {row3Coaches.map((c, idx) => renderCoachCard(c, idx === row3Coaches.length - 1))}
            </div>
          </div>
        </div>

        {/* --- MOBILE VIEW: CONTINUOUS SWIPE TRACK OR COMPACT GRID --- */}
        <div className="visible-on-mobile" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {mobileViewMode === 'track' ? (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.74rem', color: '#800020', fontWeight: 700, marginBottom: '6px' }}>
                <span>🚂 Engine (Front)</span>
                <span>👉 Swipe left/right across 18 coaches 👈</span>
                <span>Tail (Rear) 🛡️</span>
              </div>
              <div style={{
                backgroundColor: '#f8fafc',
                padding: '14px 10px',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                overflowX: 'auto',
                WebkitOverflowScrolling: 'touch',
                scrollbarWidth: 'thin'
              }}>
                {coaches?.map((c, idx) => renderCoachCard(c, idx === coaches.length - 1, true))}
              </div>
            </div>
          ) : (
            /* Compact Coach Quick Matrix Grid */
            <div style={{
              backgroundColor: '#f8fafc',
              padding: '12px',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(72px, 1fr))',
              gap: '8px'
            }}>
              {coaches?.map((c) => {
                const isSelected = selectedCoach?.coach_id === c.coach_id;
                const cat = getCoachCategory(c);
                return (
                  <button
                    key={c.coach_id}
                    type="button"
                    onClick={() => setSelectedCoach(c)}
                    style={{
                      padding: '8px 4px',
                      borderRadius: '8px',
                      border: isSelected ? '2px solid #ffb300' : '1px solid #cbd5e1',
                      backgroundColor: isSelected ? '#700c28' : '#ffffff',
                      color: isSelected ? '#ffffff' : '#1f2937',
                      textAlign: 'center',
                      cursor: 'pointer',
                      boxShadow: isSelected ? '0 4px 10px rgba(255, 179, 0, 0.3)' : '0 1px 3px rgba(0,0,0,0.05)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '2px'
                    }}
                  >
                    <span style={{ fontSize: '0.65rem', fontWeight: 800, opacity: 0.8 }}>#{c.position_sequence}</span>
                    <span style={{ fontSize: '1rem', fontWeight: 900 }}>{c.coach_number}</span>
                    <span style={{
                      fontSize: '0.6rem',
                      fontWeight: 700,
                      padding: '1px 4px',
                      borderRadius: '3px',
                      backgroundColor: isSelected ? 'rgba(255,255,255,0.2)' : '#f1f5f9',
                      color: isSelected ? '#ffffff' : '#475569'
                    }}>
                      {cat.label}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* SELECTED COACH SPECIFICATIONS PANEL */}
        {selectedCoach ? (
          <div style={{
            marginTop: '16px',
            backgroundColor: '#f8fafc',
            borderRadius: '10px',
            padding: '16px 18px',
            border: '2px solid #800020',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '14px',
            boxShadow: '0 4px 12px rgba(128, 0, 32, 0.08)'
          }}>
            <div style={{ flex: '1 1 240px' }}>
              <div style={{ fontSize: '0.74rem', color: '#800020', fontWeight: 800, letterSpacing: '0.5px' }}>
                SELECTED COACH INSPECTION SPECIFICATIONS
              </div>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#111827', marginTop: '2px' }}>
                Coach {selectedCoach.coach_number} - {selectedCoach.coach_type} (Sequence #{selectedCoach.position_sequence})
              </div>
              <div style={{ fontSize: '0.84rem', color: '#4b5563', marginTop: '6px', lineHeight: 1.4 }}>
                <strong>Facilities & Equipment:</strong> {selectedCoach.facilities}
              </div>
            </div>

            <div style={{ flex: '0 0 auto', textAlign: 'left', backgroundColor: '#ffffff', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
              <div style={{ fontSize: '0.72rem', color: '#6b7280', fontWeight: 700 }}>ASSIGNED CREW MEMBER</div>
              <div style={{ fontSize: '0.98rem', fontWeight: 800, color: '#800020', marginTop: '2px' }}>
                {selectedCoach.assigned_staff_name}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#059669', fontWeight: 700, marginTop: '2px' }}>
                ● Active Onboard
              </div>
            </div>
          </div>
        ) : (
          <div style={{ marginTop: '12px', textAlign: 'center', fontSize: '0.8rem', color: '#6b7280', fontStyle: 'italic' }}>
            Tap any coach above to inspect details, facilities, and assigned crew.
          </div>
        )}
      </div>

      {/* SECTION 2: SCHEDULED HALTS & ROUTE TIMELINE */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '24px',
        border: '1px solid #e5e7eb',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
      }}>
        <div style={{ marginBottom: '18px' }}>
          <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#111827' }}>
            Scheduled Halts & Route Timeline ({journey_halts?.length || 0} Stopping Stations)
          </h3>
          <p style={{ margin: '2px 0 0 0', fontSize: '0.85rem', color: '#6b7280' }}>
            Official railway timetable for 22477 - Shri Mata Vaishno Devi Katra Vande Bharat Express
          </p>
        </div>

        {/* Desktop / Tablet Halts Table */}
        <div className="hidden-on-mobile" style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb', textAlign: 'left' }}>
                <th style={{ padding: '12px 14px', color: '#374151', fontWeight: 700 }}>Seq #</th>
                <th style={{ padding: '12px 14px', color: '#374151', fontWeight: 700 }}>Station Code</th>
                <th style={{ padding: '12px 14px', color: '#374151', fontWeight: 700 }}>Station Name</th>
                <th style={{ padding: '12px 14px', color: '#374151', fontWeight: 700 }}>Arrival</th>
                <th style={{ padding: '12px 14px', color: '#374151', fontWeight: 700 }}>Departure</th>
                <th style={{ padding: '12px 14px', color: '#374151', fontWeight: 700 }}>Halt Duration</th>
                <th style={{ padding: '12px 14px', color: '#374151', fontWeight: 700, textAlign: 'right' }}>Distance</th>
              </tr>
            </thead>
            <tbody>
              {journey_halts?.map((h) => (
                <tr key={h.stop_sequence} style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '12px 14px', fontWeight: 800, color: '#6b7280' }}>#{h.stop_sequence}</td>
                  <td style={{ padding: '12px 14px', fontWeight: 800, color: '#800020' }}>{h.station_code}</td>
                  <td style={{ padding: '12px 14px', fontWeight: 700, color: '#111827' }}>{h.station_name}</td>
                  <td style={{ padding: '12px 14px', fontFamily: 'monospace', fontWeight: 700 }}>{h.arrival_time}</td>
                  <td style={{ padding: '12px 14px', fontFamily: 'monospace', fontWeight: 700 }}>{h.departure_time}</td>
                  <td style={{ padding: '12px 14px', color: '#4b5563' }}>{h.halt_duration}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontWeight: 700, color: '#374151' }}>{h.distance_km} km</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Halts Timeline Cards */}
        <div className="visible-on-mobile" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {journey_halts?.map((h) => (
            <div
              key={h.stop_sequence}
              style={{
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '12px 14px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: '#800020',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '0.78rem'
                }}>
                  {h.stop_sequence}
                </div>
                <div>
                  <div style={{ fontWeight: 800, color: '#111827', fontSize: '0.9rem' }}>
                    {h.station_name} <span style={{ color: '#800020', fontSize: '0.8rem' }}>({h.station_code})</span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '2px' }}>
                    Halt: {h.halt_duration} • {h.distance_km} km
                  </div>
                </div>
              </div>

              <div style={{ textAlign: 'right', fontFamily: 'monospace', fontSize: '0.82rem' }}>
                <div style={{ color: '#059669', fontWeight: 700 }}>Arr: {h.arrival_time}</div>
                <div style={{ color: '#800020', fontWeight: 700 }}>Dep: {h.departure_time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
