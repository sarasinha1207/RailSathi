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
    return <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>Loading train coach layout & journey schedule...</div>;
  }

  if (error) {
    return <div style={{ padding: '20px', backgroundColor: '#fef2f2', color: '#991b1b', borderRadius: '8px' }}>{error}</div>;
  }

  const { train_info, coaches, journey_halts } = journeyData || {};

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Banner */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '20px 24px',
        border: '1px solid #e5e7eb',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <div style={{ fontSize: '0.78rem', color: '#ffb300', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            ONBOARD TRAIN ARCHITECTURE & SCHEDULE
          </div>
          <h2 style={{ margin: '2px 0 0 0', fontSize: '1.4rem', fontWeight: 800, color: '#4a071a' }}>
            Train {train_info?.train_number} — {train_info?.train_name}
          </h2>
          <p style={{ margin: '4px 0 0 0', fontSize: '0.88rem', color: '#6b7280' }}>
            Origin: <strong>{train_info?.source}</strong> ➔ Destination: <strong>{train_info?.destination}</strong> • Total Coaches: <strong>{train_info?.total_coaches}</strong>
          </p>
        </div>

        <button
          onClick={fetchJourneyData}
          style={{ padding: '8px 16px', backgroundColor: '#f3f4f6', color: '#374151', border: '1px solid #d1d5db', borderRadius: '8px', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}
        >
          🔄 Refresh Layout
        </button>
      </div>

      {/* SECTION 1: VISUAL TRAIN COACH LAYOUT */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '24px',
        border: '1px solid #e5e7eb',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
      }}>
        <div style={{ marginBottom: '16px' }}>
          <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#111827' }}>
            🚃 Train Physical Coach Composition (Engine ➔ Tail)
          </h3>
          <p style={{ margin: '2px 0 0 0', fontSize: '0.85rem', color: '#6b7280' }}>
            Coaches displayed in actual physical formation starting from the locomotive engine. Click any coach to inspect details.
          </p>
        </div>

        {/* Coach Horizontal Sequence Carousel / Grid */}
        <div style={{
          display: 'flex',
          gap: '12px',
          overflowX: 'auto',
          paddingBottom: '16px',
          paddingTop: '8px'
        }}>
          {coaches?.map((c) => {
            const isEngine = c.coach_number === 'ENGINE';
            const isExecutive = c.coach_number.startsWith('E');
            const isSelected = selectedCoach?.coach_id === c.coach_id;

            return (
              <div
                key={c.coach_id}
                onClick={() => setSelectedCoach(c)}
                style={{
                  minWidth: isEngine ? '110px' : '100px',
                  height: '110px',
                  backgroundColor: isEngine ? '#374151' : isExecutive ? '#4a071a' : isSelected ? '#700c28' : '#ffffff',
                  color: (isEngine || isExecutive || isSelected) ? '#ffffff' : '#1f2937',
                  border: isSelected ? '3px solid #ffb300' : '2px solid #d1d5db',
                  borderRadius: '10px',
                  padding: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  boxShadow: isSelected ? '0 4px 14px rgba(0,0,0,0.2)' : '0 2px 6px rgba(0,0,0,0.05)',
                  userSelect: 'none'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, opacity: 0.8 }}>#{c.position_sequence}</span>
                  <span style={{ fontSize: '0.7rem', fontWeight: 800 }}>{isEngine ? '🚂' : isExecutive ? '⭐ EC' : '🚃 CC'}</span>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 900, letterSpacing: '0.5px' }}>
                    {c.coach_number}
                  </div>
                  <div style={{ fontSize: '0.68rem', opacity: 0.8, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                    {isEngine ? 'Loco' : c.coach_type}
                  </div>
                </div>

                <div style={{ fontSize: '0.65rem', textAlign: 'center', opacity: 0.9, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                  👤 {c.assigned_staff_name?.split(' ')[0] || 'Unassigned'}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Coach Inspector Detail Box */}
        {selectedCoach && (
          <div style={{
            marginTop: '16px',
            backgroundColor: '#f9fafb',
            borderRadius: '10px',
            padding: '16px 20px',
            border: '1px solid #e5e7eb',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div>
              <div style={{ fontSize: '0.8rem', color: '#ffb300', fontWeight: 800 }}>COACH SPECIFICATIONS & STAFF ASSIGNMENT</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#111827' }}>
                Coach {selectedCoach.coach_number} — {selectedCoach.coach_type} (Sequence #{selectedCoach.position_sequence})
              </div>
              <div style={{ fontSize: '0.85rem', color: '#4b5563', marginTop: '4px' }}>
                ⚙️ <strong>Facilities:</strong> {selectedCoach.facilities}
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.78rem', color: '#6b7280', fontWeight: 600 }}>ASSIGNED CREW MEMBER</div>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: '#800020' }}>
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
            📍 Scheduled Halts & Route Timeline ({journey_halts?.length || 0} Stations)
          </h3>
          <p style={{ margin: '2px 0 0 0', fontSize: '0.85rem', color: '#6b7280' }}>
            Official railway timetable for Train {train_info?.train_number}
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
