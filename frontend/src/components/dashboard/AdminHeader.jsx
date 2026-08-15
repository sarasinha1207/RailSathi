import React, { useState } from 'react';

export default function AdminHeader({ user, onLogout, setActiveTab, isMobile, mobileSidebarOpen, setMobileSidebarOpen }) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const username = user?.username || 'admin';
  const role = user?.role || 'Senior Officer';
  const email = `${username.toLowerCase()}@railsathi.gov.in`;

  return (
    <header style={{
      width: '100%',
      height: isMobile ? '64px' : '80px',
      backgroundColor: '#ffffff',
      padding: isMobile ? '0 12px' : '0 32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: '3px solid #700c28',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
      position: 'sticky',
      top: 0,
      zIndex: 40,
      boxSizing: 'border-box',
      flexShrink: 0
    }}>
      {/* Left: Hamburger Menu Button (Mobile) + Indian Railways Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '8px' : '14px' }}>
        {/* Mobile Hamburger Toggle Button */}
        {isMobile && (
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            style={{
              padding: '8px',
              backgroundColor: '#f3f4f6',
              color: '#800020',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title="Toggle Menu"
          >
            <svg style={{ width: '22px', height: '22px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        )}

        <img
          src="/railway_logo.jpg"
          alt="Indian Railways Logo"
          style={{
            height: isMobile ? '38px' : '48px',
            width: isMobile ? '38px' : '48px',
            objectFit: 'contain',
            borderRadius: '50%',
            border: '1px solid #e0e0e0'
          }}
        />

        {!isMobile ? (
          <div style={{ display: 'flex', flexDirection: 'column', borderLeft: '2px solid #e0e0e0', paddingLeft: '14px' }}>
            <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#700c28', lineHeight: 1.1, letterSpacing: '0.5px' }}>
              भारतीय रेल
            </span>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#333333', lineHeight: 1.1 }}>
              INDIAN RAILWAYS
            </span>
            <span style={{ fontSize: '0.65rem', color: '#666666', fontWeight: 500, marginTop: '2px' }}>
              Ministry of Railways
            </span>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#700c28', lineHeight: 1 }}>
              RailSathi
            </span>
            <span style={{ fontSize: '0.62rem', fontWeight: 700, color: '#666666' }}>
              Indian Railways
            </span>
          </div>
        )}
      </div>

      {/* Center: RailSathi Branding (Hidden on Mobile view to conserve header space) */}
      {!isMobile && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#700c28', margin: 0, lineHeight: 1, letterSpacing: '0.5px' }}>
            RailSathi
          </h1>
          <p style={{ fontSize: '0.7rem', fontWeight: 600, color: '#666666', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '4px', margin: 0 }}>
            Passenger Grievance & Assistance Portal
          </p>
        </div>
      )}

      {/* Right: Notifications Bell & Administrator Profile Avatar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Notification Bell */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            style={{
              padding: '8px',
              color: '#475569',
              borderRadius: '50%',
              cursor: 'pointer',
              backgroundColor: 'transparent',
              border: 'none',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title="Notifications"
          >
            <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span style={{
              position: 'absolute',
              top: '6px',
              right: '6px',
              width: '10px',
              height: '10px',
              backgroundColor: '#e65c00',
              borderRadius: '50%',
              border: '2px solid #ffffff'
            }}></span>
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div style={{
              position: 'absolute',
              right: 0,
              marginTop: '8px',
              width: '280px',
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.12)',
              border: '1px solid #e2e8f0',
              padding: '16px',
              zIndex: 50,
              fontSize: '0.78rem'
            }}>
              <div style={{ fontWeight: 800, color: '#700c28', paddingBottom: '8px', marginBottom: '8px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>System Notifications</span>
                <span style={{ fontSize: '0.65rem', backgroundColor: '#fef3c7', color: '#92400e', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>2 Alerts</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ padding: '8px', backgroundColor: '#f8fafc', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontWeight: 700, color: '#700c28' }}>System Status</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '2px' }}>Operational database monitoring online.</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Admin Profile Pill */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '6px 14px',
              borderRadius: '30px',
              border: '1px solid #dcdcdc',
              backgroundColor: '#ffffff',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#700c28',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '0.85rem'
            }}>
              {username.charAt(0).toUpperCase()}
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#333333', lineHeight: 1.1 }}>
                {username}
              </div>
              <div style={{ fontSize: '0.65rem', color: '#700c28', fontWeight: 700, marginTop: '2px' }}>
                {role}
              </div>
            </div>
            <svg style={{ width: '14px', height: '14px', color: '#94a3b8' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Profile Information Dropdown */}
          {showProfileMenu && (
            <div style={{
              position: 'absolute',
              right: 0,
              marginTop: '8px',
              width: '260px',
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.12)',
              border: '1px solid #e2e8f0',
              padding: '12px',
              zIndex: 50,
              fontSize: '0.8rem'
            }}>
              {/* Profile Logo & Information */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingBottom: '12px', borderBottom: '1px solid #f1f5f9', marginBottom: '8px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: '#700c28',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '1.1rem',
                  border: '2px solid #e65c00',
                  flexShrink: 0
                }}>
                  {username.charAt(0).toUpperCase()}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                  <div style={{ fontWeight: 800, color: '#700c28', fontSize: '0.9rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {username}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#e65c00', fontWeight: 700 }}>
                    {role}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: '1px' }}>
                    {email}
                  </div>
                </div>
              </div>

              {/* Menu Actions */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <button
                  onClick={() => { setShowProfileMenu(false); setActiveTab && setActiveTab('settings'); }}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '8px 12px',
                    color: '#333333',
                    fontWeight: 700,
                    borderRadius: '6px',
                    cursor: 'pointer',
                    border: 'none',
                    backgroundColor: 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
                  <svg style={{ width: '16px', height: '16px', color: '#700c28' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Account Settings</span>
                </button>

                <button
                  onClick={onLogout}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '8px 12px',
                    color: '#b91c1c',
                    fontWeight: 700,
                    borderRadius: '6px',
                    cursor: 'pointer',
                    border: 'none',
                    backgroundColor: 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
                  <svg style={{ width: '16px', height: '16px', color: '#b91c1c' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
