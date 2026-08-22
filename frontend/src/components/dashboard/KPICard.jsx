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
      justifyContent: 'space-between'
    }}>
      <span style={{ fontSize: '0.78rem', color: '#6b7280', fontWeight: 700, textTransform: 'uppercase' }}>
        {title}
      </span>
      <div style={{ fontSize: '2rem', fontWeight: 900, color: textColor || accentColor, marginTop: '6px' }}>
        {value}
      </div>
      {subtitle && (
        <span style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: 600, marginTop: '4px' }}>
          {subtitle}
        </span>
      )}
    </div>
  );
}
