import React, { useState } from 'react';

export default function Header({ activePage, setActivePage, loggedIn, onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page) => {
    setActivePage(page);
    setMobileMenuOpen(false);
  };

  const handleLogoutClick = () => {
    setMobileMenuOpen(false);
    onLogout();
  };

  return (
    <header className="main-header">
      <div className="header-top-row">
        <div className="header-left">
          <img src="/railway_logo.jpg" alt="Indian Railways Logo" className="header-logo" />
          <div className="header-text">
            <span className="hindi-logo-text">भारतीय रेल</span>
            <span className="eng-logo-text">INDIAN RAILWAYS</span>
            <span className="portal-subtext">Ministry of Railways</span>
          </div>
        </div>
        
        <div className="header-center">
          <h1>RailSathi</h1>
          <p>Passenger Grievance & Assistance Portal</p>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          type="button"
          className="mobile-nav-toggle"
          aria-label="Toggle Navigation Menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>
      </div>

      <nav className={`header-nav ${mobileMenuOpen ? 'open' : ''}`}>
        <button 
          type="button"
          onClick={() => handleNavClick('home')} 
          className={`nav-link ${activePage === 'home' ? 'active' : ''}`}
        >
          Home
        </button>
        <button 
          type="button"
          onClick={() => handleNavClick('about')} 
          className={`nav-link ${activePage === 'about' ? 'active' : ''}`}
        >
          About Us
        </button>
        <button 
          type="button"
          onClick={() => handleNavClick('complaint')} 
          className={`nav-link ${activePage === 'complaint' ? 'active' : ''}`}
        >
          Register/Track Concern
        </button>
        <button 
          type="button"
          onClick={() => handleNavClick('faq')} 
          className={`nav-link ${activePage === 'faq' ? 'active' : ''}`}
        >
          FAQ
        </button>
        {loggedIn ? (
          <>
            <button 
              type="button"
              onClick={() => handleNavClick('dashboard')} 
              className={`nav-link ${activePage === 'dashboard' ? 'active' : ''}`}
            >
              Dashboard
            </button>
            <button 
              type="button"
              onClick={handleLogoutClick} 
              className="nav-link"
              style={{ color: '#dc2626' }}
            >
              Logout
            </button>
          </>
        ) : (
          <button 
            type="button"
            onClick={() => handleNavClick('login')} 
            className={`nav-link ${activePage === 'login' ? 'active' : ''}`}
          >
            Login
          </button>
        )}
      </nav>
    </header>
  );
}
