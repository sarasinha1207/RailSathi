import React from 'react';

export default function NotificationBell({ count = 0 }) {
  return (
    <div style={{ position: 'relative', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
      <svg style={{ width: '22px', height: '22px', color: '#555' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
      {count > 0 && (
        <span style={{
          position: 'absolute',
          top: '-4px',
          right: '-4px',
          backgroundColor: '#ea4335',
          color: '#ffffff',
          borderRadius: '50%',
          fontSize: '0.65rem',
          fontWeight: 800,
          padding: '2px 5px',
          lineHeight: 1
        }}>
          {count}
        </span>
      )}
    </div>
  );
}
