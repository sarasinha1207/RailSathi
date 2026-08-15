import React from 'react';

export default function DataTable({ columns = [], data = [], renderRow, loading = false, emptyMessage = 'No records found.' }) {
  if (loading) {
    return <div style={{ textAlign: 'center', padding: '40px 0', color: '#666', fontWeight: 600 }}> Loading table records...</div>;
  }

  if (!data || data.length === 0) {
    return <div style={{ textAlign: 'center', padding: '40px 0', color: '#777', fontWeight: 600 }}> {emptyMessage}</div>;
  }

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', textAlign: 'left' }}>
        <thead>
          <tr style={{ backgroundColor: '#f4f6f9', borderBottom: '2px solid #e0e0e0', color: '#333' }}>
            {columns.map((col, idx) => (
              <th key={idx} style={{ padding: '12px 14px', textAlign: col.align || 'left' }}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => renderRow(item, idx))}
        </tbody>
      </table>
    </div>
  );
}
