import React, { useState } from 'react';
import AdminHeader from '../components/dashboard/AdminHeader';
import Sidebar from '../components/common/Sidebar';
import AdminFooter from '../components/dashboard/AdminFooter';

export default function DashboardLayout({ user, onLogout, children }) {
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
      {/* Shared Header */}
      <AdminHeader user={user} onLogout={onLogout} setActiveTab={setActiveTab} />

      {/* Main Layout Area */}
      <div style={{
        flex: 1,
        display: 'flex',
        minHeight: 0,
        width: '100%',
        boxSizing: 'border-box'
      }}>
        {/* Shared Left Dynamic Sidebar */}
        <Sidebar
          user={user}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onLogout={onLogout}
        />

        {/* Right Main Column */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
          width: '100%',
          boxSizing: 'border-box'
        }}>
          {/* Main Content Workspace */}
          <main style={{
            flex: 1,
            overflowY: 'auto',
            padding: '32px',
            boxSizing: 'border-box',
            width: '100%'
          }}>
            {React.isValidElement(children)
              ? React.cloneElement(children, { activeTab })
              : children}
          </main>

          {/* Shared Docked Footer */}
          <AdminFooter />
        </div>
      </div>
    </div>
  );
}
