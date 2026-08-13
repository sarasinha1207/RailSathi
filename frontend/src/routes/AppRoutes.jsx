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
  const { user, loggedIn, loading, login, logout } = useAuth();

  // Determine initial page state synchronously from hash/localStorage to avoid any flash of Homepage
  const getInitialPage = () => {
    try {
      const hash = window.location.hash.replace('#', '').trim();
      const savedTab = localStorage.getItem('dashboard_active_tab');
      if (
        hash.startsWith('dashboard') ||
        ['home', 'complaints', 'analytics', 'users', 'settings'].includes(hash) ||
        savedTab
      ) {
        return 'dashboard';
      }
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
      const savedTab = localStorage.getItem('dashboard_active_tab');

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
        } else if (savedTab || hash.startsWith('dashboard')) {
          // Stay on dashboard page until auth check resolves
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
    handlePageChange('dashboard');
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem('dashboard_active_tab');
    } catch (e) {}
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

  // If user is logged in (or session is still verifying and initial page is dashboard), render Dashboard layout
  if ((loggedIn || loading) && activePage === 'dashboard') {
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
          {activeSubTab === 'train' && <TrainForm onSubmissionSuccess={handleSwitchToTrack} />}
          {activeSubTab === 'station' && <StationForm onSubmissionSuccess={handleSwitchToTrack} />}
          {activeSubTab === 'track' && <TrackConcern initialComplaintId={trackedId} />}
        </main>
      )}

      {activePage === 'about' && <About />}
      {activePage === 'faq' && <Faq />}
      {activePage === 'login' && <Login onLoginSuccess={handleLoginSuccess} />}
    </PublicLayout>
  );
}
