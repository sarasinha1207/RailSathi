import React from 'react';

export default function Header({ activePage, setActivePage, loggedIn, onLogout }) {
  return (
    <header className="main-header">
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

      <nav className="header-nav">
        <button 
          onClick={() => setActivePage('home')} 
          className={`nav-link ${activePage === 'home' ? 'active' : ''}`}
        >
          Home
        </button>
        <button 
          onClick={() => setActivePage('about')} 
          className={`nav-link ${activePage === 'about' ? 'active' : ''}`}
        >
          About Us
        </button>
        <button 
          onClick={() => setActivePage('complaint')} 
          className={`nav-link ${activePage === 'complaint' ? 'active' : ''}`}
        >
          Register/Track Concern
        </button>
        <button 
          onClick={() => setActivePage('faq')} 
          className={`nav-link ${activePage === 'faq' ? 'active' : ''}`}
        >
          FAQ
        </button>
        {loggedIn ? (
          <>
            <button 
              onClick={() => setActivePage('dashboard')} 
              className={`nav-link ${activePage === 'dashboard' ? 'active' : ''}`}
            >
              Dashboard
            </button>
            <button 
              onClick={onLogout} 
              className="nav-link"
            >
              Logout
            </button>
          </>
        ) : (
          <button 
            onClick={() => setActivePage('login')} 
            className={`nav-link ${activePage === 'login' ? 'active' : ''}`}
          >
            Login
          </button>
        )}
      </nav>
    </header>
  );
}
