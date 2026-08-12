import React, { useState } from 'react';
import ChartCard from '../../../components/dashboard/ChartCard';

export default function DivisionComplaintChart({ data = [], selectedZone = 'all' }) {
  const [tooltip, setTooltip] = useState(null);

  if (!data || data.length === 0) {
    return (
      <ChartCard title="Division-wise Open Complaints">
        <div style={{ textAlign: 'center', padding: '30px', color: '#777' }}>No open division complaints found for this selection.</div>
      </ChartCard>
    );
  }

  const maxTotal = Math.max(...data.map(item => item.total || 0), 1);
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
    <ChartCard title={`Division-wise Open Complaints ${selectedZone !== 'all' ? `(Zone ${selectedZone})` : '(Top Divisions)'}`}>
      {/* Legend */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', fontSize: '0.78rem', fontWeight: 700 }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: '#ea4335', display: 'inline-block' }} />
          High Priority
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: '#fbbc04', display: 'inline-block' }} />
          Medium Priority
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: '#34a853', display: 'inline-block' }} />
          Low Priority
        </span>
      </div>

      {/* Increased Height Canvas (360px) with Single Stacked Bar Per Division */}
      <div style={{ position: 'relative', height: '360px', display: 'flex', alignItems: 'flex-end', gap: '22px', paddingBottom: '35px', borderBottom: '2px solid #e5e7eb', overflowX: 'auto' }}>
        {data.map((item) => {
          const highH = (item.high / maxTotal) * chartHeightPx;
          const medH = (item.medium / maxTotal) * chartHeightPx;
          const lowH = (item.low / maxTotal) * chartHeightPx;

          return (
            <div key={item.division_code} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, width: '48px' }}>
              {/* Single Stacked Vertical Bar per Division */}
              <div style={{ display: 'flex', flexDirection: 'column', width: '32px', height: `${chartHeightPx}px`, justifyContent: 'flex-end' }}>
                {/* High Priority Segment (Top) */}
                {item.high > 0 && (
                  <div
                    onMouseEnter={(e) => handleMouseEnter(e, `${item.division_name} Division — High: ${item.high} Open Complaints`)}
                    onMouseLeave={handleMouseLeave}
                    style={{
                      height: `${highH}px`,
                      backgroundColor: '#ea4335',
                      borderRadius: item.medium === 0 && item.low === 0 ? '6px' : '6px 6px 0 0',
                      cursor: 'pointer',
                      transition: 'height 0.3s ease'
                    }}
                  />
                )}

                {/* Medium Priority Segment (Middle) */}
                {item.medium > 0 && (
                  <div
                    onMouseEnter={(e) => handleMouseEnter(e, `${item.division_name} Division — Medium: ${item.medium} Open Complaints`)}
                    onMouseLeave={handleMouseLeave}
                    style={{
                      height: `${medH}px`,
                      backgroundColor: '#fbbc04',
                      borderRadius: item.high === 0 && item.low === 0 ? '6px' : item.high === 0 ? '6px 6px 0 0' : '0',
                      cursor: 'pointer',
                      transition: 'height 0.3s ease'
                    }}
                  />
                )}

                {/* Low Priority Segment (Bottom) */}
                {item.low > 0 && (
                  <div
                    onMouseEnter={(e) => handleMouseEnter(e, `${item.division_name} Division — Low: ${item.low} Open Complaints`)}
                    onMouseLeave={handleMouseLeave}
                    style={{
                      height: `${lowH}px`,
                      backgroundColor: '#34a853',
                      borderRadius: item.high === 0 && item.medium === 0 ? '6px' : '0 0 6px 6px',
                      cursor: 'pointer',
                      transition: 'height 0.3s ease'
                    }}
                  />
                )}

                {/* Empty State line if 0 open complaints */}
                {item.total === 0 && (
                  <div style={{ height: '3px', backgroundColor: '#d1d5db', borderRadius: '2px' }} />
                )}
              </div>

              {/* X Axis Division Label */}
              <span style={{ fontSize: '0.76rem', fontWeight: 800, color: '#374151', marginTop: '8px', textAlign: 'center' }}>
                {item.division_code}
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
