import React, { useState, useEffect } from 'react';
import { officerService } from '../../../services/officerService';
import CMOKPISection from '../components/CMOKPISection';
import ComplaintOverviewTable from '../components/ComplaintOverviewTable';
import ZoneComplaintChart from '../components/ZoneComplaintChart';
import DivisionComplaintChart from '../components/DivisionComplaintChart';
import DepartmentComplaintChart from '../components/DepartmentComplaintChart';

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

  const handleZoneFilterChange = (e) => {
    setSelectedZone(e.target.value);
  };

  const kpis = analyticsData?.kpis || {};
  const overviewTable = analyticsData?.overview_table || [];
  const analytics = analyticsData?.analytics || {};

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
        borderLeft: '5px solid #800020'
      }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.4rem', color: '#800020', fontWeight: 800 }}>
            Complaint Management Officer (CMO) Operational Control Desk
          </h2>
          <p style={{ margin: '4px 0 0 0', fontSize: '0.88rem', color: '#666' }}>
            Real-time grievance monitoring, zonal distribution, and field staff workload analytics.
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

      {/* KPI CARDS */}
      <div>
        <CMOKPISection kpis={kpis} />
      </div>

      {/* COMPLAINT OVERVIEW TABLE */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px', backgroundColor: '#fff', borderRadius: '12px', color: '#666', fontWeight: 600 }}>
          Loading division complaint overview...
        </div>
      ) : (
        <ComplaintOverviewTable overviewData={overviewTable} />
      )}

      {/* OPEN COMPLAINT ANALYTICS & VISUALIZATIONS */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', gap: '16px' }}>
          <div>
            <h3 style={{ margin: 0, color: '#800020', fontSize: '1.2rem', fontWeight: 800 }}>
              Open Complaint Analytics Visualizations
            </h3>
            <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: '#666' }}>
              Interactive distribution charts for active Open / In-Progress complaints.
            </p>
          </div>

          {/* Zone Filter Control */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <label style={{ fontSize: '0.88rem', fontWeight: 800, color: '#333' }}>Filter by Railway Zone:</label>
            <select
              value={selectedZone}
              onChange={handleZoneFilterChange}
              style={{
                padding: '10px 16px',
                borderRadius: '8px',
                border: '1.5px solid #800020',
                fontSize: '0.88rem',
                fontWeight: 700,
                color: '#800020',
                backgroundColor: '#fff',
                cursor: 'pointer'
              }}
            >
              <option value="all">All Zones</option>
              {overviewTable.map((z) => (
                <option key={z.zone_code} value={z.zone_code}>
                  {z.zone_name} ({z.zone_code})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 3 Vertical Bar Charts Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {/* Chart 1: Zone-wise Open Complaints */}
          <ZoneComplaintChart data={analytics.zone_chart || []} />

          {/* Chart 2: Division-wise Open Complaints */}
          <DivisionComplaintChart data={analytics.division_chart || []} selectedZone={selectedZone} />

          {/* Chart 3: Department-wise Open Complaints */}
          <DepartmentComplaintChart data={analytics.department_chart || []} />
        </div>
      </div>

    </div>
  );
}
