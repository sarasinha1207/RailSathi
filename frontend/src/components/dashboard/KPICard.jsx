import React from 'react';

export default function KPICard({ title, value, subtitle, accentColor = '#800020', textColor = '#800020' }) {
  return (
    <div style={{
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      padding: '18px 20px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      border: `2px solid ${accentColor}`,
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      boxSizing: 'border-box'
    }}>
      {/* Title block with fixed minHeight so 1-line and 2-line titles take identical vertical height */}
      <div style={{
        minHeight: '2.4rem',
        display: 'flex',
        alignItems: 'flex-start'
      }}>
        <span style={{ fontSize: '0.78rem', color: '#6b7280', fontWeight: 700, textTransform: 'uppercase', lineHeight: 1.3 }}>
          {title}
        </span>
      </div>

      {/* Number value strictly pinned at the exact same vertical offset across all cards */}
      <div style={{
        fontSize: '2rem',
        fontWeight: 900,
        color: textColor || accentColor,
        margin: '6px 0',
        lineHeight: 1
      }}>
        {value}
      </div>

      {/* Subtitle pushed to bottom */}
      {subtitle && (
        <div style={{
          marginTop: 'auto',
          minHeight: '2rem',
          display: 'flex',
          alignItems: 'flex-start'
        }}>
          <span style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: 600, lineHeight: 1.3 }}>
            {subtitle}
          </span>
        </div>
      )}
    </div>
  );
}
