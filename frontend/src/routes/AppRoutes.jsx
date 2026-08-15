import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import PublicLayout from '../components/public/PublicLayout';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import DashboardRoutes from './DashboardRoutes';
import Home from '../pages/public/Home';
import TrainForm from '../components/public/TrainForm';
import StationForm from '../components/public/StationForm';
import TrackConcern from '../components/public/TrackConcern';
import About from '../pages/public/About';
import Faq from '../pages/public/Faq';
import Login from '../pages/public/Login';


export default function AppRoutes() {
  const { user, loggedIn, loading, logout, setUserSession } = useAuth();

  // Determine initial page state synchronously from hash/localStorage to avoid any flash of Homepage
  const getInitialPage = () => {
    try {
      const hash = window.location.hash.replace('#', '').trim();
      if (hash.startsWith('dashboard')) return 'dashboard';
      if (['train', 'station', 'track'].includes(hash)) return 'complaint';
      if (['about', 'faq', 'login'].includes(hash)) return hash;
    } catch (e) {}
    return 'home';
  };

  const [activePage, setActivePage] = useState(getInitialPage);
  const [activeSubTab, setActiveSubTab] = useState('train');
  const [trackedId, setTrackedId] = useState('');

  // Handle URL hash navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').trim();

      if (loggedIn) {
        if (['about', 'faq'].includes(hash)) {
          setActivePage(hash);
        } else {
          setActivePage('dashboard');
        }
      } else if (!loading) {
        if (['train', 'station', 'track'].includes(hash)) {
          setActivePage('complaint');
          setActiveSubTab(hash);
        } else if (['about', 'faq', 'login'].includes(hash)) {
          setActivePage(hash);
        } else if (hash.startsWith('dashboard')) {
          setActivePage('dashboard');
        } else {
          setActivePage('home');
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [loggedIn, loading]);

  const handlePageChange = (page) => {
    setActivePage(page);
    if (page !== 'dashboard') {
      window.location.hash = page === 'complaint' ? activeSubTab : page;
    }
  };

  const handleSubTabChange = (tab) => {
    setActiveSubTab(tab);
    window.location.hash = tab;
  };

  const handleLoginSuccess = async (username, role) => {
    if (setUserSession) {
      setUserSession({ username, role });
    }
    setActivePage('dashboard');
    window.location.hash = 'dashboard';
  };


  const handleLogout = async () => {
    try {
      localStorage.removeItem('dashboard_active_tab');
    } catch (e) {}
    await logout();
    setActivePage('home');
    window.location.hash = 'home';
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

  // Determine effective active page: if not logged in and not loading, fallback 'dashboard' to 'home'
  const effectivePage = (!loggedIn && !loading && activePage === 'dashboard') ? 'home' : activePage;

  // If user is logged in (or session is still verifying and initial page is dashboard), render Dashboard layout
  if ((loggedIn || loading) && effectivePage === 'dashboard') {
    return (
      <DashboardLayout user={user} onLogout={handleLogout}>
        <DashboardRoutes user={user} />
      </DashboardLayout>
    );
  }

  return (
    <PublicLayout
      activePage={effectivePage}
      setActivePage={handlePageChange}
      loggedIn={loggedIn}
      onLogout={handleLogout}
    >
      {effectivePage === 'home' && (
        <Home onRegisterClick={handleRegisterClick} onTrackClick={handleTrackClick} />
      )}

      {effectivePage === 'complaint' && (
        <main className="main-content">
          <div id="complaint-section" style={{ width: '100%', maxWidth: '1000px', scrollMarginTop: '110px' }} />
          <div className="form-tabs-container" style={{ width: '100%', maxWidth: '1000px' }}>
            <button
              type="button"
              className={`form-tab-btn ${activeSubTab === 'train' ? 'active' : ''}`}
              onClick={() => handleSubTabChange('train')}
            >
              <svg className="tab-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2c-4 0-8 .5-8 4v9.5C4 17.43 5.57 19 7.5 19L6 20.5v.5h12v-.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-4-4-8-4zm0 2c3.71 0 5.83.42 6 2H6c.17-1.58 2.29-2 6-2zm-4 6c.83 0 1.5.67 1.5 1.5S8.83 13 8 13s-1.5-.67-1.5-1.5S7.17 10 8 10zm8 3c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm-8 4c-1.1 0-2-.9-2-2v-1h12v1c0 1.1-.9 2-2 2H8z"/>
              </svg>
              <span>Train</span>
            </button>
            <button
              type="button"
              className={`form-tab-btn ${activeSubTab === 'station' ? 'active' : ''}`}
              onClick={() => handleSubTabChange('station')}
            >
              <svg className="tab-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 4H5c-1.11 0-2 .9-2 2v12c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H5V8h14v10zm-7-9h-2v2h2V9zm0 4h-2v2h2v-2zm4-4h-2v2h2V9zm0 4h-2v2h2v-2zM8 9H6v2h2V9zm0 4H6v2h2v-2z"/>
              </svg>
              <span>Station</span>
            </button>
            <button
              type="button"
              className={`form-tab-btn ${activeSubTab === 'track' ? 'active' : ''}`}
              onClick={() => handleSubTabChange('track')}
            >
              <svg className="tab-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
              <span>Track Concern</span>
            </button>
          </div>
          {activeSubTab === 'train' && <TrainForm onSubmissionSuccess={handleSwitchToTrack} />}
          {activeSubTab === 'station' && <StationForm onSubmissionSuccess={handleSwitchToTrack} />}
          {activeSubTab === 'track' && <TrackConcern initialComplaintId={trackedId} />}
        </main>
      )}

      {effectivePage === 'about' && <About />}
      {effectivePage === 'faq' && <Faq />}
      {effectivePage === 'login' && <Login onLoginSuccess={handleLoginSuccess} />}
    </PublicLayout>
  );
}

