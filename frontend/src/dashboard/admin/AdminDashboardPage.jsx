import React, { useState, useEffect, lazy, Suspense } from 'react';

const AdminHomeView = lazy(() => import('./AdminHomeView'));
const AdminAnalyticsView = lazy(() => import('./AdminAnalyticsView'));
const AdminComplaintsView = lazy(() => import('./AdminComplaintsView'));
const AdminStaffManagementView = lazy(() => import('./AdminStaffManagementView'));

const ComponentLoader = () => (
  <div style={{ padding: '40px', textAlign: 'center', color: '#800020', fontWeight: 800 }}>
    Loading Section...
  </div>
);

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
      <Suspense fallback={<ComponentLoader />}>
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
      </Suspense>
    </div>
  );
}
