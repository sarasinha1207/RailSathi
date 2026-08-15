import React, { useState, useEffect } from 'react';
import AdminHeader from './AdminHeader';
import Sidebar from './Sidebar';
import AdminFooter from './AdminFooter';



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
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Synchronize tab state with localStorage and URL hash
  const setActiveTab = (tab) => {
    setActiveTabState(tab);
    if (isMobile) {
      setMobileSidebarOpen(false);
    }
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
      <AdminHeader
        user={user}
        onLogout={onLogout}
        setActiveTab={setActiveTab}
        isMobile={isMobile}
        mobileSidebarOpen={mobileSidebarOpen}
        setMobileSidebarOpen={setMobileSidebarOpen}
      />

      {/* Main Layout Area */}
      <div style={{
        flex: 1,
        display: 'flex',
        minHeight: 0,
        width: '100%',
        boxSizing: 'border-box',
        position: 'relative'
      }}>
        {/* Mobile Drawer Overlay Backdrop */}
        {isMobile && mobileSidebarOpen && (
          <div
            onClick={() => setMobileSidebarOpen(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              zIndex: 9998,
              backdropFilter: 'blur(2px)'
            }}
          />
        )}

        {/* Shared Left Sidebar (Fixed on Desktop, Drawer on Mobile) */}
        <div style={{
          display: isMobile ? (mobileSidebarOpen ? 'block' : 'none') : 'block',
          position: isMobile ? 'fixed' : 'relative',
          top: isMobile ? 0 : 'auto',
          left: isMobile ? 0 : 'auto',
          bottom: isMobile ? 0 : 'auto',
          zIndex: isMobile ? 9999 : 1,
          height: isMobile ? '100vh' : 'auto'
        }}>
          <Sidebar
            user={user}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onLogout={onLogout}
            onCloseMobile={() => setMobileSidebarOpen(false)}
            isMobile={isMobile}
          />
        </div>

        {/* Right Main Column */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
          width: '100%',
          boxSizing: 'border-box',
          overflowX: 'hidden'
        }}>
          {/* Main Content Workspace */}
          <main className="dashboard-main-content" style={{
            flex: 1,
            overflowY: 'auto',
            padding: isMobile ? '14px' : '32px',
            boxSizing: 'border-box',
            width: '100%'
          }}>
            {React.isValidElement(children)
              ? React.cloneElement(children, { activeTab, onNavigate: setActiveTab })
              : children}
          </main>

          {/* Shared Docked Footer */}
          <AdminFooter />
        </div>
      </div>
    </div>
  );
}
