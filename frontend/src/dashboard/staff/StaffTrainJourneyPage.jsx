import React, { useState, useEffect } from 'react';

export default function StaffTrainJourneyPage({ user }) {
  const [journeyData, setJourneyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCoach, setSelectedCoach] = useState(null);

  const fetchJourneyData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/v1/staff/me/train-journey');
      const data = await res.json();
      if (res.ok && data.status === 'success') {
        setJourneyData(data);
      } else {
        setError(data.detail || 'Failed to fetch train journey & coach layout.');
      }
    } catch (err) {
      setError('Network error fetching train journey details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJourneyData();
  }, []);

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

  const row1Coaches = coaches ? coaches.slice(0, 9) : [];
  const row2Coaches = coaches ? coaches.slice(9, 18) : [];

  const renderCoachCard = (c, isLastInRow) => {
    const isEngine = c.coach_number === 'ENGINE';
    const isTail = c.coach_number === 'TAIL';
    const isExecutive = c.coach_number.startsWith('E');
    const isSelected = selectedCoach?.coach_id === c.coach_id;

    return (
      <React.Fragment key={c.coach_id}>
        <div
          onClick={() => setSelectedCoach(c)}
          style={{
            width: '92px',
            height: '84px',
            flexShrink: 0,
            backgroundColor: isEngine ? '#1e293b' : isTail ? '#800020' : isExecutive ? '#5c091e' : isSelected ? '#700c28' : '#ffffff',
            color: (isEngine || isTail || isExecutive || isSelected) ? '#ffffff' : '#1f2937',
            border: isSelected ? '3px solid #ffb300' : '2px solid #cbd5e1',
            borderRadius: '8px',
            padding: '8px 6px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
            boxShadow: isSelected ? '0 4px 12px rgba(255, 179, 0, 0.4)' : '0 1px 4px rgba(0,0,0,0.05)',
            transform: isSelected ? 'translateY(-2px)' : 'none',
            boxSizing: 'border-box'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.65rem', fontWeight: 800, opacity: 0.8 }}>#{c.position_sequence}</span>
            <span style={{ fontSize: '0.62rem', fontWeight: 800 }}>
              {isEngine ? '🚂 LOCO' : isTail ? '🏁 TAIL' : isExecutive ? '⭐ EC' : '🚃 CC'}
            </span>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.15rem', fontWeight: 900, letterSpacing: '0.5px', lineHeight: '1' }}>
              {c.coach_number}
            </div>
            <div style={{ fontSize: '0.62rem', opacity: 0.8, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', marginTop: '3px' }}>
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
            padding: '0 2px'
          }}>
            ➔
          </div>
        )}
      </React.Fragment>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '20px 24px',
        border: '1px solid #e5e7eb',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
      }}>
        <div style={{ fontSize: '0.78rem', color: '#ffb300', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          ONBOARD TRAIN ARCHITECTURE & SCHEDULE
        </div>
        <h2 style={{ margin: '2px 0 0 0', fontSize: '1.4rem', fontWeight: 800, color: '#4a071a' }}>
          Train {train_info?.train_number} — {train_info?.train_name}
        </h2>
        <p style={{ margin: '4px 0 0 0', fontSize: '0.88rem', color: '#6b7280' }}>
          Origin: <strong>{train_info?.source}</strong> ➔ Destination: <strong>{train_info?.destination}</strong> • Total Rake Coaches: <strong>{train_info?.total_coaches}</strong>
        </p>
      </div>

      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '24px',
        border: '1px solid #e5e7eb',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
      }}>
        <div style={{ marginBottom: '18px' }}>
          <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#111827' }}>
            🚃 Train Physical Coach Composition (Engine ➔ Tail)
          </h3>
          <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: '#6b7280' }}>
            Physical rake sequence starting from locomotive engine to rear tail cab. Click any coach to inspect details.
          </p>
        </div>

        <div style={{
          backgroundColor: '#f8fafc',
          padding: '20px',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', overflowX: 'auto', paddingBottom: '4px' }}>
            {row1Coaches.map((c, idx) => renderCoachCard(c, idx === row1Coaches.length - 1))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', overflowX: 'auto', paddingTop: '4px' }}>
            {row2Coaches.map((c, idx) => renderCoachCard(c, idx === row2Coaches.length - 1))}
          </div>
        </div>

        {selectedCoach && (
          <div style={{
            marginTop: '20px',
            backgroundColor: '#f8fafc',
            borderRadius: '10px',
            padding: '18px 24px',
            border: '2px solid #800020',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            boxShadow: '0 4px 12px rgba(128, 0, 32, 0.08)'
          }}>
            <div>
              <div style={{ fontSize: '0.78rem', color: '#ffb300', fontWeight: 800, letterSpacing: '0.5px' }}>
                SELECTED COACH INSPECTION SPECIFICATIONS
              </div>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#111827', marginTop: '2px' }}>
                Coach {selectedCoach.coach_number} — {selectedCoach.coach_type} (Sequence #{selectedCoach.position_sequence})
              </div>
              <div style={{ fontSize: '0.86rem', color: '#4b5563', marginTop: '6px' }}>
                ⚙️ <strong>Facilities & Equipment:</strong> {selectedCoach.facilities}
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: 700 }}>ASSIGNED CREW MEMBER</div>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#800020', marginTop: '2px' }}>
                👤 {selectedCoach.assigned_staff_name}
              </div>
            </div>
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
            📍 Scheduled Halts & Route Timeline ({journey_halts?.length || 7} Stopping Stations)
          </h3>
          <p style={{ margin: '2px 0 0 0', fontSize: '0.85rem', color: '#6b7280' }}>
            Official railway timetable for Train {train_info?.train_number} — New Delhi ➔ SVDK Katra Vande Bharat Express
          </p>
        </div>

        <div style={{ overflowX: 'auto' }}>
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
      </div>
    </div>
  );
}
