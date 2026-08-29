import React from 'react';

export default function KPICard({ title, value, subtitle, accentColor = '#800020', textColor = '#800020' }) {
  return (
    <div
      className="kpi-metric-card"
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        border: `2px solid ${accentColor}`,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        boxSizing: 'border-box',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        transition: 'transform 0.15s ease, box-shadow 0.15s ease'
      }}
    >
      {/* Title block with fluid height and font */}
      <div className="kpi-card-title-wrap">
        <span className="kpi-card-title">
          {title}
        </span>
      </div>

      {/* Number value strictly pinned at exact same offset across all cards */}
      <div
        className="kpi-card-value"
        style={{
          color: textColor || accentColor
        }}
      >
        {value}
      </div>

      {/* Subtitle pushed to bottom */}
      {subtitle && (
        <div className="kpi-card-subtitle-wrap">
          <span className="kpi-card-subtitle">
            {subtitle}
          </span>
        </div>
      )}
    </div>
  );
}

