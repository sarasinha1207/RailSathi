import React, { useState, useEffect } from 'react';
import AdminHeader from '../components/dashboard/AdminHeader';
import Sidebar from '../components/common/Sidebar';
import AdminFooter from '../components/dashboard/AdminFooter';

export default function DashboardLayout({ user, onLogout, children }) {
  // Helper to determine initial active tab from URL hash or localStorage
  const getInitialTab = () => {
    try {
      const hash = window.location.hash.replace('#', '').trim();
      if (hash) {
        const clean = hash.startsWith('dashboard/') ? hash.replace('dashboard/', '') : hash;
        if (clean && clean !== 'dashboard') {
          return clean;
        }
      }
      const saved = localStorage.getItem('dashboard_active_tab');
      if (saved) return saved;
    } catch (e) {
      console.error('Failed to read initial dashboard tab:', e);
    }
    return 'home';
  };

  const [activeTab, setActiveTabState] = useState(getInitialTab);

  // Synchronize tab state with localStorage and URL hash
  const setActiveTab = (tab) => {
    setActiveTabState(tab);
    try {
      localStorage.setItem('dashboard_active_tab', tab);
      window.location.hash = `#dashboard/${tab}`;
    } catch (e) {
      console.error('Failed to persist dashboard tab:', e);
    }
  };

  // Listen to browser forward/back or manual hash changes
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '').trim();
      if (hash) {
        const clean = hash.startsWith('dashboard/') ? hash.replace('dashboard/', '') : hash;
        if (clean && clean !== 'dashboard') {
          setActiveTabState(clean);
          localStorage.setItem('dashboard_active_tab', clean);
        }
      }
    };

    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

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
