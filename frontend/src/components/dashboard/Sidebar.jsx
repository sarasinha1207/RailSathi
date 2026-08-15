import React, { useState, useEffect } from 'react';
import { SIDEBAR_NAV_ITEMS } from '../../utils/sidebarConfig';





const IconClock = () => (
  <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6l4 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const IconHome = () => (
  <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const IconClipboard = () => (
  <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
  </svg>
);

const IconRefresh = () => (
  <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

const IconMapLayers = () => (
  <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
  </svg>
);

const IconUsers = () => (
  <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const IconBuilding = () => (
  <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const IconGrid = () => (
  <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
);

const IconBarChart = () => (
  <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const IconInfo = () => (
  <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const IconCog = () => (
  <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h3.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.796 3.111a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.798 3.111a1.125 1.125 0 01-1.37.49l-1.216-.456c-.356-.133-.751-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-3.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.797-3.111a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.797-3.111a1.125 1.125 0 011.37-.49l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const IconLogOut = () => (
  <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
  </svg>
);

const renderNavIcon = (iconName, itemId) => {
  if (itemId === 'home' || iconName === 'home') return <IconHome />;
  if (itemId === 'complaints' || itemId === 'my_complaints' || iconName === 'clipboard-list') return <IconClipboard />;
  if (itemId === 'reassignment_requests' || iconName === 'refresh-cw') return <IconRefresh />;
  if (itemId === 'zone_division_complaints' || itemId === 'zones' || iconName === 'map') return <IconMapLayers />;
  if (itemId === 'staff_availability' || itemId === 'staff' || itemId === 'staff_management' || iconName === 'users') return <IconUsers />;
  if (itemId === 'divisions' || iconName === 'building') return <IconBuilding />;
  if (itemId === 'departments' || iconName === 'grid') return <IconGrid />;
  if (itemId === 'reports' || itemId === 'escalations' || iconName === 'bar-chart') return <IconBarChart />;
  return <IconMapLayers />;
};


export default function Sidebar({ user, activeTab, setActiveTab, onLogout }) {
  const username = user?.username || 'User';
  const role = user?.role || 'Admin';

  const navItems = SIDEBAR_NAV_ITEMS[role] || SIDEBAR_NAV_ITEMS.Admin;

  // Real-time local system clock state
  const [timeState, setTimeState] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeState(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = timeState.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  const formattedTime = timeState.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });

  return (
    <aside style={{
      width: '260px',
      minWidth: '260px',
      maxWidth: '260px',
      height: '100%',
      minHeight: '100%',
      backgroundColor: '#4a071a',
      color: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      flexShrink: 0,
      borderRight: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '4px 0 16px rgba(0, 0, 0, 0.15)',
      userSelect: 'none',
      boxSizing: 'border-box'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflowY: 'auto' }}>
        {/* User Profile Header */}
        <div style={{
          padding: '24px 16px 20px 16px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
          backgroundColor: '#360412',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '8px'
        }}>
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            backgroundColor: '#700c28',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '1.25rem',
            border: '2.5px solid #e65c00',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            marginBottom: '4px'
          }}>
            {username.charAt(0).toUpperCase()}
          </div>

          <span style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.2 }}>
            Welcome, {username}!
          </span>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#ffb300', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            {role}
          </span>
          <span style={{ fontSize: '0.68rem', color: '#f0b8c4', fontWeight: 600 }}>
            RailSathi Operational Control
          </span>
        </div>

        {/* Dynamic Navigation Items */}
        <div style={{ padding: '20px 14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  width: '100%',
                  padding: '12px 18px',
                  borderRadius: '10px',
                  border: 'none',
                  fontSize: '0.92rem',
                  fontWeight: isActive ? 800 : 600,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease',
                  position: 'relative',
                  backgroundColor: isActive ? '#700c28' : 'transparent',
                  color: isActive ? '#ffffff' : '#f0b8c4',
                  boxShadow: isActive ? '0 4px 14px rgba(0, 0, 0, 0.25)' : 'none'
                }}
              >
                {isActive && (
                  <span style={{ position: 'absolute', left: 0, top: '6px', bottom: '6px', width: '4px', backgroundColor: '#e65c00', borderRadius: '0 4px 4px 0' }}></span>
                )}
                <span style={{ color: isActive ? '#ffb300' : '#f0b8c4', display: 'flex', alignItems: 'center' }}>
                  {renderNavIcon(item.icon, item.id)}
                </span>

                <span style={{ letterSpacing: '0.3px' }}>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer Controls */}
      <div style={{
        padding: '16px 14px',
        borderTop: '1px solid rgba(255, 255, 255, 0.12)',
        backgroundColor: '#360412',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        flexShrink: 0
      }}>
        {/* Real-time System Clock Widget */}
        <div style={{
          backgroundColor: '#700c28',
          borderRadius: '10px',
          padding: '10px 14px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          marginBottom: '4px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.72rem', color: '#ffb300', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            <IconClock />
            <span>{formattedDate}</span>
          </div>
          <div style={{ fontSize: '1rem', color: '#ffffff', fontWeight: 800, fontFamily: 'Consolas, monospace', letterSpacing: '0.8px', marginTop: '3px' }}>
            {formattedTime}
          </div>
        </div>

        {/* HELP BUTTON - Common in every dashboard below Clock and above Settings/Logout */}
        <button
          onClick={() => setActiveTab('help')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            width: '100%',
            padding: '12px 18px',
            borderRadius: '10px',
            border: 'none',
            fontSize: '0.92rem',
            fontWeight: (activeTab === 'help' || activeTab === 'info') ? 800 : 600,
            cursor: 'pointer',
            textAlign: 'left',
            transition: 'all 0.15s ease',
            position: 'relative',
            backgroundColor: (activeTab === 'help' || activeTab === 'info') ? '#700c28' : 'transparent',
            color: (activeTab === 'help' || activeTab === 'info') ? '#ffffff' : '#f0b8c4',
            boxShadow: (activeTab === 'help' || activeTab === 'info') ? '0 4px 14px rgba(0, 0, 0, 0.25)' : 'none'
          }}
        >
          {(activeTab === 'help' || activeTab === 'info') && (
            <span style={{ position: 'absolute', left: 0, top: '6px', bottom: '6px', width: '4px', backgroundColor: '#e65c00', borderRadius: '0 4px 4px 0' }}></span>
          )}
          <span style={{ color: (activeTab === 'help' || activeTab === 'info') ? '#ffb300' : '#f0b8c4', display: 'flex', alignItems: 'center' }}><IconInfo /></span>
          <span style={{ letterSpacing: '0.3px' }}>Help</span>
        </button>


        {/* SETTINGS BUTTON */}
        <button
          onClick={() => setActiveTab('settings')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            width: '100%',
            padding: '12px 18px',
            borderRadius: '10px',
            border: 'none',
            fontSize: '0.92rem',
            fontWeight: activeTab === 'settings' ? 800 : 600,
            cursor: 'pointer',
            textAlign: 'left',
            transition: 'all 0.15s ease',
            position: 'relative',
            backgroundColor: activeTab === 'settings' ? '#700c28' : 'transparent',
            color: activeTab === 'settings' ? '#ffffff' : '#f0b8c4',
            boxShadow: activeTab === 'settings' ? '0 4px 14px rgba(0, 0, 0, 0.25)' : 'none'
          }}
        >
          {activeTab === 'settings' && (
            <span style={{ position: 'absolute', left: 0, top: '6px', bottom: '6px', width: '4px', backgroundColor: '#e65c00', borderRadius: '0 4px 4px 0' }}></span>
          )}
          <span style={{ color: activeTab === 'settings' ? '#ffb300' : '#f0b8c4', display: 'flex', alignItems: 'center' }}><IconCog /></span>
          <span style={{ letterSpacing: '0.3px' }}>Settings</span>
        </button>

        {/* LOGOUT BUTTON */}
        <button
          onClick={onLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            width: '100%',
            padding: '12px 18px',
            borderRadius: '10px',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            fontSize: '0.92rem',
            fontWeight: 800,
            cursor: 'pointer',
            textAlign: 'left',
            backgroundColor: '#700c28',
            color: '#ffffff'
          }}
        >
          <span style={{ color: '#ffb300', display: 'flex', alignItems: 'center' }}><IconLogOut /></span>
          <span style={{ letterSpacing: '0.3px' }}>Logout</span>
        </button>
      </div>
    </aside>
  );
}
