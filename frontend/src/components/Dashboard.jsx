import React, { useState, useEffect, useMemo } from 'react';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register ChartJS modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const chartColors = {
  primary: '#700c28',
  gold: '#b28c3d',
  green: '#10b981',
  blue: '#3b82f6',
  orange: '#f59e0b',
  purple: '#8b5cf6',
  cyan: '#06b6d4',
  grey: '#9ca3af',
  palette: ['#700c28', '#b28c3d', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4', '#ec4899', '#14b8a6', '#64748b']
};

export default function Dashboard() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Filters State
  const [selectedZone, setSelectedZone] = useState('ALL');
  const [selectedType, setSelectedType] = useState('ALL');
  const [selectedPriority, setSelectedPriority] = useState('ALL');

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await fetch('/api/v1/dashboard/complaints');
        if (res.ok) {
          const data = await res.json();
          setComplaints(data);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  // Compute unique zones for filter dropdown list
  const uniqueZones = useMemo(() => {
    const zones = new Map();
    complaints.forEach(item => {
      if (item.zone_code && item.zone_name) {
        zones.set(item.zone_code, item.zone_name);
      }
    });
    return Array.from(zones.entries()).sort((a, b) => a[1].localeCompare(b[1]));
  }, [complaints]);

  // Apply filters
  const filteredData = useMemo(() => {
    return complaints.filter(item => {
      const matchZone = selectedZone === 'ALL' || item.zone_code === selectedZone;
      const matchType = selectedType === 'ALL' || item.complaint_type === selectedType;
      const matchPriority = selectedPriority === 'ALL' || item.priority === selectedPriority;
      return matchZone && matchType && matchPriority;
    });
  }, [complaints, selectedZone, selectedType, selectedPriority]);

  // Compute stats aggregates
  const stats = useMemo(() => {
    const total = filteredData.length;
    const open = filteredData.filter(i => i.display_status === 'Open').length;
    const progress = filteredData.filter(i => i.display_status === 'In Progress').length;
    const resolved = filteredData.filter(i => i.display_status === 'Resolved').length;
    return { total, open, progress, resolved };
  }, [filteredData]);

  // Reset Filters
  const resetFilters = () => {
    setSelectedZone('ALL');
    setSelectedType('ALL');
    setSelectedPriority('ALL');
  };

  // 1. Daily Trend Chart Data
  const dailyTrendData = useMemo(() => {
    const dailyCounts = {};
    filteredData.forEach(item => {
      const date = item.incident_date || 'Unknown';
      dailyCounts[date] = (dailyCounts[date] || 0) + 1;
    });

    const sortedDates = Object.keys(dailyCounts).sort();
    const counts = sortedDates.map(d => dailyCounts[d]);

    return {
      labels: sortedDates,
      datasets: [{
        label: 'Complaints Filed',
        data: counts,
        borderColor: chartColors.primary,
        backgroundColor: 'rgba(112, 12, 40, 0.05)',
        fill: true,
        tension: 0.3
      }]
    };
  }, [filteredData]);

  // 2. Zone-wise Chart Data
  const zoneChartData = useMemo(() => {
    const counts = {};
    filteredData.forEach(item => {
      if (item.zone_code) {
        counts[item.zone_code] = (counts[item.zone_code] || 0) + 1;
      }
    });

    const sortedZones = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
    return {
      labels: sortedZones,
      datasets: [{
        label: 'Complaints',
        data: sortedZones.map(k => counts[k]),
        backgroundColor: chartColors.primary
      }]
    };
  }, [filteredData]);

  // 3. Division-wise Chart Data
  const divisionChartData = useMemo(() => {
    const counts = {};
    filteredData.forEach(item => {
      if (item.division_name) {
        counts[item.division_name] = (counts[item.division_name] || 0) + 1;
      }
    });

    const sortedDivs = Object.keys(counts).sort((a, b) => counts[b] - counts[a]).slice(0, 8);
    return {
      labels: sortedDivs,
      datasets: [{
        label: 'Complaints',
        data: sortedDivs.map(k => counts[k]),
        backgroundColor: chartColors.gold
      }]
    };
  }, [filteredData]);

  // 4. Department-wise Chart Data
  const departmentChartData = useMemo(() => {
    const counts = {};
    filteredData.forEach(item => {
      if (item.department) {
        counts[item.department] = (counts[item.department] || 0) + 1;
      }
    });

    const sortedDepts = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
    return {
      labels: sortedDepts,
      datasets: [{
        data: sortedDepts.map(k => counts[k]),
        backgroundColor: chartColors.palette
      }]
    };
  }, [filteredData]);

  // 5. Category-wise Chart Data
  const categoryChartData = useMemo(() => {
    const counts = {};
    filteredData.forEach(item => {
      if (item.main_class) {
        counts[item.main_class] = (counts[item.main_class] || 0) + 1;
      }
    });

    const sortedCats = Object.keys(counts).sort((a, b) => counts[b] - counts[a]).slice(0, 6);
    return {
      labels: sortedCats,
      datasets: [{
        label: 'Complaints',
        data: sortedCats.map(k => counts[k]),
        backgroundColor: chartColors.palette[2]
      }]
    };
  }, [filteredData]);

  // 6. Priority Chart Data
  const priorityChartData = useMemo(() => {
    const high = filteredData.filter(i => i.priority === 'High').length;
    const medium = filteredData.filter(i => i.priority === 'Medium').length;
    const low = filteredData.filter(i => i.priority === 'Low').length;

    return {
      labels: ['High', 'Medium', 'Low'],
      datasets: [{
        data: [high, medium, low],
        backgroundColor: [chartColors.primary, chartColors.gold, chartColors.grey]
      }]
    };
  }, [filteredData]);

  // 7. Status Chart Data
  const statusChartData = useMemo(() => {
    return {
      labels: ['Pending', 'In Progress', 'Resolved'],
      datasets: [{
        data: [stats.open, stats.progress, stats.resolved],
        backgroundColor: [chartColors.orange, chartColors.blue, chartColors.green]
      }]
    };
  }, [stats, filteredData]);

  if (loading) {
    return (
      <main className="main-content w-full">
        <div className="dashboard-container" style={{ padding: '40px', textAlign: 'center' }}>
          <h2>Loading Dashboard Analytics...</h2>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="main-content w-full">
        <div className="dashboard-container" style={{ padding: '40px', textAlign: 'center', color: 'var(--error-color)' }}>
          <h2>Failed to retrieve dashboard records. Please log in first.</h2>
        </div>
      </main>
    );
  }

  return (
    <main className="main-content w-full">
      <div className="dashboard-container w-full max-w-[1280px] flex flex-col gap-8 box-border">
      {/* Header */}
      <div className="dashboard-header flex justify-between items-center border-b-2 border-solid border-[var(--border-color)] pb-4">
        <h2 className="text-3xl font-extrabold text-[var(--primary-color)] m-0">Complaint Monitoring Dashboard</h2>
        <div className="text-sm text-[var(--text-muted)] font-medium">Live Redressal Data Overview</div>
      </div>

      {/* Stats Cards Row */}
      <div className="stats-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
        <div className="stats-card bg-white rounded-lg p-6 shadow-sm border-l-8 border-solid border-[var(--primary-color)] flex flex-col gap-2 hover:shadow-md hover:-translate-y-0.5 transition-all">
          <span className="stats-label text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">Total Received</span>
          <span className="stats-value text-4xl font-extrabold text-[var(--text-color)]">{stats.total}</span>
        </div>
        <div className="stats-card bg-white rounded-lg p-6 shadow-sm border-l-8 border-solid border-[#f59e0b] flex flex-col gap-2 hover:shadow-md hover:-translate-y-0.5 transition-all">
          <span className="stats-label text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">Pending (Open)</span>
          <span className="stats-value text-4xl font-extrabold text-[var(--text-color)]">{stats.open}</span>
        </div>
        <div className="stats-card bg-white rounded-lg p-6 shadow-sm border-l-8 border-solid border-[#3b82f6] flex flex-col gap-2 hover:shadow-md hover:-translate-y-0.5 transition-all">
          <span className="stats-label text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">In Progress</span>
          <span className="stats-value text-4xl font-extrabold text-[var(--text-color)]">{stats.progress}</span>
        </div>
        <div className="stats-card bg-white rounded-lg p-6 shadow-sm border-l-8 border-solid border-[#10b981] flex flex-col gap-2 hover:shadow-md hover:-translate-y-0.5 transition-all">
          <span className="stats-label text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">Resolved</span>
          <span className="stats-value text-4xl font-extrabold text-[var(--text-color)]">{stats.resolved}</span>
        </div>
      </div>

      {/* Filters Row */}
      <div className="filters-bar bg-white p-5 rounded-lg shadow-sm border border-solid border-[var(--border-color)] flex gap-5 flex-wrap items-center">
        <div className="filter-group flex flex-col gap-1.5">
          <label className="text-xs font-bold text-[var(--text-muted)] uppercase">Railway Zone</label>
          <select 
            value={selectedZone}
            onChange={(e) => setSelectedZone(e.target.value)}
            className="filter-select border border-solid border-[var(--border-color)] p-2 rounded-md bg-[#fafbfc] min-w-[150px] outline-none text-sm"
          >
            <option value="ALL">All Zones</option>
            {uniqueZones.map(([code, name]) => (
              <option key={code} value={code}>{code} - {name}</option>
            ))}
          </select>
        </div>

        <div className="filter-group flex flex-col gap-1.5">
          <label className="text-xs font-bold text-[var(--text-muted)] uppercase">Grievance Type</label>
          <select 
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="filter-select border border-solid border-[var(--border-color)] p-2 rounded-md bg-[#fafbfc] min-w-[150px] outline-none text-sm"
          >
            <option value="ALL">All Types</option>
            <option value="Train">Train Complaints</option>
            <option value="Station">Station Complaints</option>
          </select>
        </div>

        <div className="filter-group flex flex-col gap-1.5">
          <label className="text-xs font-bold text-[var(--text-muted)] uppercase">Priority Level</label>
          <select 
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="filter-select border border-solid border-[var(--border-color)] p-2 rounded-md bg-[#fafbfc] min-w-[150px] outline-none text-sm"
          >
            <option value="ALL">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div className="filter-group ml-auto">
          <button 
            onClick={resetFilters} 
            className="btn-submit m-0 px-4 py-2 text-sm bg-[var(--primary-color)] text-white font-bold rounded-md hover:bg-[var(--primary-hover)] transition-all cursor-pointer border-none"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Charts Cards Grid */}
      <div className="charts-grid grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 1. Daily Trend */}
        <div className="chart-card md:col-span-2 bg-white rounded-lg p-6 shadow-sm border border-solid border-[var(--border-color)] min-h-[340px] flex flex-col gap-4">
          <h3 className="chart-title text-base font-bold text-[var(--primary-color)] border-b border-dashed border-[var(--border-color)] pb-2 m-0">Daily Complaint Trends</h3>
          <div className="chart-body relative flex-grow h-[250px] w-full">
            <Line 
              data={dailyTrendData}
              options={{ responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } } }}
            />
          </div>
        </div>

        {/* 2. Zone-wise Distribution */}
        <div className="chart-card bg-white rounded-lg p-6 shadow-sm border border-solid border-[var(--border-color)] min-h-[340px] flex flex-col gap-4">
          <h3 className="chart-title text-base font-bold text-[var(--primary-color)] border-b border-dashed border-[var(--border-color)] pb-2 m-0">Zone-wise Complaint Distribution</h3>
          <div className="chart-body relative flex-grow h-[250px] w-full">
            <Bar 
              data={zoneChartData}
              options={{ responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } } }}
            />
          </div>
        </div>

        {/* 3. Division-wise Distribution */}
        <div className="chart-card bg-white rounded-lg p-6 shadow-sm border border-solid border-[var(--border-color)] min-h-[340px] flex flex-col gap-4">
          <h3 className="chart-title text-base font-bold text-[var(--primary-color)] border-b border-dashed border-[var(--border-color)] pb-2 m-0">Division-wise Complaint Distribution</h3>
          <div className="chart-body relative flex-grow h-[250px] w-full">
            <Bar 
              data={divisionChartData}
              options={{ responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } } }}
            />
          </div>
        </div>

        {/* 4. Department-wise Distribution */}
        <div className="chart-card bg-white rounded-lg p-6 shadow-sm border border-solid border-[var(--border-color)] min-h-[340px] flex flex-col gap-4">
          <h3 className="chart-title text-base font-bold text-[var(--primary-color)] border-b border-dashed border-[var(--border-color)] pb-2 m-0">Department-wise Complaint Distribution</h3>
          <div className="chart-body relative flex-grow h-[250px] w-full">
            <Pie 
              data={departmentChartData}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </div>
        </div>

        {/* 5. Category-wise Distribution */}
        <div className="chart-card bg-white rounded-lg p-6 shadow-sm border border-solid border-[var(--border-color)] min-h-[340px] flex flex-col gap-4">
          <h3 className="chart-title text-base font-bold text-[var(--primary-color)] border-b border-dashed border-[var(--border-color)] pb-2 m-0">Top Complaint Categories</h3>
          <div className="chart-body relative flex-grow h-[250px] w-full">
            <Bar 
              data={categoryChartData}
              options={{ indexAxis: 'y', responsive: true, maintainAspectRatio: false, scales: { x: { beginAtZero: true, ticks: { stepSize: 1 } } } }}
            />
          </div>
        </div>

        {/* 6. Priority distribution */}
        <div className="chart-card bg-white rounded-lg p-6 shadow-sm border border-solid border-[var(--border-color)] min-h-[340px] flex flex-col gap-4">
          <h3 className="chart-title text-base font-bold text-[var(--primary-color)] border-b border-dashed border-[var(--border-color)] pb-2 m-0">Priority-wise Distribution</h3>
          <div className="chart-body relative flex-grow h-[220px] w-full flex justify-center">
            <Doughnut 
              data={priorityChartData}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </div>
        </div>

        {/* 7. Status distribution */}
        <div className="chart-card bg-white rounded-lg p-6 shadow-sm border border-solid border-[var(--border-color)] min-h-[340px] flex flex-col gap-4">
          <h3 className="chart-title text-base font-bold text-[var(--primary-color)] border-b border-dashed border-[var(--border-color)] pb-2 m-0">Complaint Status Tracking</h3>
          <div className="chart-body relative flex-grow h-[220px] w-full flex justify-center">
            <Doughnut 
              data={statusChartData}
              options={{ responsive: true, maintainAspectRatio: false, cutout: '65%' }}
            />
          </div>
        </div>
      </div>
      </div>
    </main>
  );
}
