import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import PublicLayout from '../layouts/PublicLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import DashboardRoutes from './DashboardRoutes';
import Home from '../components/Home';
import TrainForm from '../components/TrainForm';
import StationForm from '../components/StationForm';
import TrackConcern from '../components/TrackConcern';
import About from '../components/About';
import Faq from '../components/Faq';
import Login from '../components/Login';

export default function AppRoutes() {
  const { user, loggedIn, login, logout } = useAuth();
  const [activePage, setActivePage] = useState('home');
  const [activeSubTab, setActiveSubTab] = useState('train');
  const [trackedId, setTrackedId] = useState('');

  // Handle URL hash navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (['train', 'station', 'track'].includes(hash)) {
        setActivePage('complaint');
        setActiveSubTab(hash);
      } else if (['home', 'about', 'faq', 'login', 'dashboard'].includes(hash)) {
        setActivePage(hash);
      } else if (!hash) {
        setActivePage('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handlePageChange = (page) => {
    setActivePage(page);
    window.location.hash = page === 'complaint' ? activeSubTab : page;
  };

  const handleSubTabChange = (tab) => {
    setActiveSubTab(tab);
    window.location.hash = tab;
  };

  const handleLoginSuccess = async (username, role) => {
    handlePageChange('dashboard');
  };

  const handleLogout = async () => {
    await logout();
    handlePageChange('complaint');
  };

  const handleSwitchToTrack = (complaintId) => {
    setTrackedId(complaintId);
    handleSubTabChange('track');
  };

  const scrollToForm = () => {
    const el = document.getElementById('complaint-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleRegisterClick = () => {
    handleSubTabChange('train');
    setTimeout(scrollToForm, 100);
  };

  const handleTrackClick = () => {
    handleSubTabChange('track');
    setTimeout(scrollToForm, 100);
  };

  if (activePage === 'dashboard') {
    return (
      <DashboardLayout user={user} onLogout={handleLogout}>
        <DashboardRoutes user={user} />
      </DashboardLayout>
    );
  }

  return (
    <PublicLayout
      activePage={activePage}
      setActivePage={handlePageChange}
      loggedIn={loggedIn}
      onLogout={handleLogout}
    >
      {activePage === 'home' && (
        <Home onRegisterClick={handleRegisterClick} onTrackClick={handleTrackClick} />
      )}

      {activePage === 'complaint' && (
        <main className="main-content">
          <div id="complaint-section" style={{ width: '100%', maxWidth: '950px', scrollMarginTop: '110px' }} />
          
          <div className="form-tabs-container">
            <button
              onClick={() => handleSubTabChange('train')}
              className={`form-tab-btn ${activeSubTab === 'train' ? 'active' : ''}`}
            >
              <svg viewBox="0 0 24 24" className="tab-icon" fill="currentColor">
                <path d="M12 2c-4 0-8 .5-8 4v9.5C4 17.43 5.57 19 7.5 19L6 20.5v.5h12v-.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-4-4-8-4zm0 2c3.51 0 5.66.41 5.96 1.4L18 6H6L6.04 5.4C6.34 4.41 8.49 4 12 4zm6 11.5c0 .83-.67 1.5-1.5 1.5h-9C6.67 17 6 16.33 6 15.5V8h12v7.5zM7.5 10c-.83 0-1.5.67-1.5 1.5S6.67 13 7.5 13 9 12.33 9 11.5 8.33 10 7.5 10zm9 0c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z" />
              </svg>
              <span>Train</span>
            </button>

            <button
              onClick={() => handleSubTabChange('station')}
              className={`form-tab-btn ${activeSubTab === 'station' ? 'active' : ''}`}
            >
              <svg viewBox="0 0 24 24" className="tab-icon" fill="currentColor">
                <path d="M12 2L2 7v13h20V7L12 2zm8 16H4V8.5l8-4 8 4V18zm-9-9h2v7h-2v-7zm4 0h2v7h-2v-7zm-8 0h2v7H7v-7z" />
              </svg>
              <span>Station</span>
            </button>

            <button
              onClick={() => handleSubTabChange('track')}
              className={`form-tab-btn ${activeSubTab === 'track' ? 'active' : ''}`}
            >
              <svg viewBox="0 0 24 24" className="tab-icon" fill="currentColor">
                <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
              </svg>
              <span>Track complaint</span>
            </button>
          </div>

          {activeSubTab === 'train' && <TrainForm onSwitchToTrack={handleSwitchToTrack} />}
          {activeSubTab === 'station' && <StationForm onSwitchToTrack={handleSwitchToTrack} />}
          {activeSubTab === 'track' && <TrackConcern initialComplaintId={trackedId} />}
        </main>
      )}

      {activePage === 'about' && <About />}
      {activePage === 'faq' && <Faq />}
      {activePage === 'login' && <Login onLoginSuccess={handleLoginSuccess} />}
    </PublicLayout>
  );
}
