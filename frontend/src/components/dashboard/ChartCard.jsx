import React from 'react';

export default function ChartCard({ title, children }) {
  return (
    <div style={{ backgroundColor: '#ffffff', borderRadius: '10px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
      {title && <h4 style={{ margin: '0 0 16px 0', color: '#800020', fontSize: '1.1rem', fontWeight: 800 }}>{title}</h4>}
      {children}
    </div>
  );
}
