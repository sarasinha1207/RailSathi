import React, { useState, useEffect } from 'react';
import { officerService } from '../../services/officerService';
import { CMOKPISection, ComplaintOverviewTable, DepartmentComplaintChart } from '../../components/dashboard/CmoCharts';

export default function Home({ user }) {
  const [selectedZone, setSelectedZone] = useState('all');
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAnalytics = async (zoneCode) => {
    setLoading(true);
    setError(null);
    try {
      const data = await officerService.getAnalytics(zoneCode);
      setAnalyticsData(data);
    } catch (err) {
      setError(err.message || 'Failed to load CMO analytics dashboard data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics(selectedZone);
  }, [selectedZone]);

  const kpis = analyticsData?.kpis || {};
  const overviewTable = analyticsData?.overview_table || [];
  const analytics = analyticsData?.analytics || {};

  // Extract unique zones for chart header filter
  const uniqueZones = Array.from(
    new Map(overviewTable.map(item => [item.zone_code, item.zone_name])).entries()
  ).map(([code, name]) => ({ zone_code: code, zone_name: name }));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', width: '100%', boxSizing: 'border-box' }}>
      
      {/* Top Operational Header */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '20px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        borderLeft: '5px solid #800020',
        border: '1px solid #e5e7eb'
      }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.4rem', color: '#800020', fontWeight: 800 }}>
            Complaint Management Officer (CMO) Operational Control Desk
          </h2>
          <p style={{ margin: '4px 0 0 0', fontSize: '0.88rem', color: '#666' }}>
            Real-time grievance monitoring, zonal distribution, and department workload analytics.
          </p>
        </div>
        <button
          onClick={() => fetchAnalytics(selectedZone)}
          style={{
            padding: '10px 18px',
            backgroundColor: '#800020',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 700,
            cursor: 'pointer',
            fontSize: '0.88rem',
            boxShadow: '0 2px 6px rgba(128,0,32,0.25)'
          }}
        >
          Refresh Data
        </button>
      </div>

      {error && (
        <div style={{ backgroundColor: '#fce8e6', color: '#c5221f', padding: '16px', borderRadius: '8px', fontWeight: 700 }}>
          Error: {error}
        </div>
      )}

      {/* SECTION A — KPI CARDS */}
      <div>
        <CMOKPISection kpis={kpis} />
      </div>

      {/* SECTION B — COMPLAINT OVERVIEW TABLE */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px', backgroundColor: '#fff', borderRadius: '12px', color: '#666', fontWeight: 600, border: '1px solid #e5e7eb' }}>
          Loading division complaint overview...
        </div>
      ) : (
        <ComplaintOverviewTable overviewData={overviewTable} />
      )}

      {/* SECTION C — CLEAN, PREMIUM DEPARTMENT-WISE ANALYTICS CARD */}
      <DepartmentComplaintChart
        data={analytics.department_chart || []}
        selectedZone={selectedZone}
        onZoneChange={(newZone) => setSelectedZone(newZone)}
        zonesList={uniqueZones}
      />

    </div>
  );
}
