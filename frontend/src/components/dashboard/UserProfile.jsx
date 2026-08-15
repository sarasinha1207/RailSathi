import React from 'react';

export default function UserProfile({ user }) {
  const username = user?.username || 'User';
  const role = user?.role || 'Guest';

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <div style={{
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        backgroundColor: '#700c28',
        color: '#fff',
        fontWeight: 800,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px solid #e65c00'
      }}>
        {username.charAt(0).toUpperCase()}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#333' }}>{username}</span>
        <span style={{ fontSize: '0.72rem', color: '#e65c00', fontWeight: 700 }}>{role}</span>
      </div>
    </div>
  );
}
