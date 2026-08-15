import React, { useState, useEffect } from 'react';
import AdminHomeView from './AdminHomeView';
import AdminAnalyticsView from './AdminAnalyticsView';
import AdminComplaintsView from './AdminComplaintsView';
import AdminStaffManagementView from './AdminStaffManagementView';

export default function AdminDashboardPage({ user, activeTab = 'home', onNavigate }) {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAnalyticsData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/v1/officer/analytics');
      const data = await res.json();
      if (res.ok) {
        setAnalyticsData(data);
      }
    } catch (err) {
      console.error('Error fetching analytics from database:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  return (
    <div style={{ width: '100%', boxSizing: 'border-box' }}>
      {activeTab === 'analytics' ? (
        <AdminAnalyticsView analyticsData={analyticsData} />
      ) : activeTab === 'complaints' ? (
        <AdminComplaintsView user={user} />
      ) : activeTab === 'staff_management' || activeTab === 'staff' ? (
        <AdminStaffManagementView />
      ) : (
        <AdminHomeView
          analyticsData={analyticsData}
          loading={loading}
          onRefresh={fetchAnalyticsData}
        />
      )}
    </div>
  );
}
