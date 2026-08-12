import React, { useState } from 'react';
import ChartCard from '../../../components/dashboard/ChartCard';

export default function DepartmentComplaintChart({ data = [] }) {
  const [tooltip, setTooltip] = useState(null);

  if (!data || data.length === 0) {
    return (
      <ChartCard title="Department-wise Open Complaints">
        <div style={{ textAlign: 'center', padding: '30px', color: '#777' }}>No department complaint data found.</div>
      </ChartCard>
    );
  }

  const maxVal = Math.max(...data.map(item => item.total_open || 0), 1);
  const chartHeightPx = 320; // Increased height

  const handleMouseEnter = (e, text) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip({
      text,
      x: rect.left + rect.width / 2,
      y: rect.top - 10
    });
  };

  const handleMouseLeave = () => {
    setTooltip(null);
  };

  return (
    <ChartCard title="Department-wise Open Complaints (Total Open Count)">
      {/* Legend / Label */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', fontSize: '0.78rem', fontWeight: 700 }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: '#800020', display: 'inline-block' }} />
          Total Open Tasks
        </span>
      </div>

      {/* Increased Height Canvas (360px) */}
      <div style={{ position: 'relative', height: '360px', display: 'flex', alignItems: 'flex-end', gap: '24px', paddingBottom: '35px', borderBottom: '2px solid #e5e7eb', overflowX: 'auto' }}>
        {data.map((item) => {
          const barH = (item.total_open / maxVal) * chartHeightPx;

          return (
            <div key={item.department_code} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, width: '56px' }}>
              {/* Single Vertical Bar per Department */}
              <div style={{ display: 'flex', alignItems: 'flex-end', height: `${chartHeightPx}px` }}>
                <div
                  onMouseEnter={(e) => handleMouseEnter(e, `${item.department_name} — ${item.total_open} Open Complaints`)}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    width: '32px',
                    height: `${Math.max(barH, 4)}px`,
                    backgroundColor: '#800020',
                    borderRadius: '6px 6px 0 0',
                    cursor: 'pointer',
                    transition: 'height 0.3s ease, opacity 0.2s'
                  }}
                />
              </div>

              {/* X Axis Label */}
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#374151', marginTop: '8px', textAlign: 'center' }} title={item.department_name}>
                {item.department_code}
              </span>
            </div>
          );
        })}
      </div>

      {/* Hover Tooltip */}
      {tooltip && (
        <div style={{
          position: 'fixed',
          left: `${tooltip.x}px`,
          top: `${tooltip.y}px`,
          transform: 'translate(-50%, -100%)',
          backgroundColor: '#1f2937',
          color: '#ffffff',
          padding: '6px 12px',
          borderRadius: '6px',
          fontSize: '0.78rem',
          fontWeight: 700,
          pointerEvents: 'none',
          boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
          zIndex: 1000,
          whiteSpace: 'nowrap',
          transition: 'all 0.15s ease'
        }}>
          {tooltip.text}
        </div>
      )}
    </ChartCard>
  );
}
