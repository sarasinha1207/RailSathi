import React from 'react';

export default function KPICard({ title, value, subtitle, accentColor = '#800020', textColor = '#800020' }) {
  return (
    <div style={{
      backgroundColor: '#ffffff',
      borderRadius: '10px',
      padding: '18px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      borderTop: `4px solid ${accentColor}`,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}>
      <span style={{ fontSize: '0.8rem', color: '#666', fontWeight: 700, textTransform: 'uppercase' }}>
        {title}
      </span>
      <div style={{ fontSize: '2rem', fontWeight: 900, color: textColor, marginTop: '6px' }}>
        {value}
      </div>
      {subtitle && (
        <span style={{ fontSize: '0.75rem', color: '#888', marginTop: '4px' }}>
          {subtitle}
        </span>
      )}
    </div>
  );
}
