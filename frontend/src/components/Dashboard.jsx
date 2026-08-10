import React, { useState } from 'react';
import AdminHeader from './dashboard/AdminHeader';
import AdminSidebar from './dashboard/AdminSidebar';
import AdminFooter from './dashboard/AdminFooter';

export default function Dashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div style={{
      minHeight: '100vh',
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      backgroundColor: '#f4f6f9',
      fontFamily: "'Outfit', 'Segoe UI', system-ui, -apple-system, sans-serif",
      boxSizing: 'border-box',
      margin: 0,
      padding: 0
    }}>
      {/* Top Header */}
      <AdminHeader user={user} onLogout={onLogout} setActiveTab={setActiveTab} />

      {/* Main Layout Area: Occupies all remaining viewport height */}
      <div style={{
        flex: 1,
        display: 'flex',
        minHeight: 0,
        width: '100%',
        boxSizing: 'border-box'
      }}>
        {/* Left Sidebar: Stretches automatically to fill vertical height */}
        <AdminSidebar
          user={user}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onLogout={onLogout}
        />

        {/* Right Main Column Wrapper: Fills remaining horizontal and vertical space */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
          width: '100%',
          boxSizing: 'border-box'
        }}>
          {/* Main Content Area: Automatically occupies remaining height above footer */}
          <main style={{
            flex: 1,
            overflowY: 'auto',
            padding: '32px',
            boxSizing: 'border-box',
            width: '100%'
          }}>
            {/* Clean empty neutral workspace container */}
          </main>

          {/* Docked Footer */}
          <AdminFooter />
        </div>
      </div>
    </div>
  );
}
