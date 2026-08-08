import React, { useState, useEffect } from 'react';
import { STATION_CATEGORIES } from '../constants';

export default function StationForm({ onSwitchToTrack }) {
  const [formData, setFormData] = useState({
    phone_number: '',
    station_name: '',
    platform_number: '',
    main_class: '',
    sub_class: '',
    incident_datetime: '',
    complaint_description: ''
  });

  const [wordCount, setWordCount] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [registeredId, setRegisteredId] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [stations, setStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);

  // Fetch stations list on mount
  useEffect(() => {
    const fetchStations = async () => {
      try {
        const res = await fetch('/api/v1/stations');
        if (res.ok) {
          const data = await res.json();
          setStations(data);
        }
      } catch (err) {
        console.error('Failed to fetch stations:', err);
      }
    };
    fetchStations();
  }, []);

  // Set default datetime value to local datetime
  useEffect(() => {
    const now = new Date();
    const tzOffset = now.getTimezoneOffset() * 60000;
    const localISOTime = new Date(now - tzOffset).toISOString().slice(0, 16);
    setFormData(prev => ({
      ...prev,
      incident_datetime: localISOTime
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Description validation (max 100 words)
    if (name === 'complaint_description') {
      const words = value.trim().split(/\s+/).filter(w => w.length > 0);
      if (words.length > 100) {
        // Truncate to first 100 words
        const match = value.match(/^(\s*\S+\s+){99}\s*\S+/);
        if (match) {
          setFormData(prev => ({ ...prev, [name]: match[0] }));
          setWordCount(100);
          return;
        }
      }
      setWordCount(words.length);
    }

    if (name === 'station_name') {
      const st = stations.find(s => s.station_name === value);
      setSelectedStation(st || null);
      setFormData(prev => ({
        ...prev,
        station_name: value,
        platform_number: '' // reset platform number
      }));
      return;
    }

    setFormData(prev => ({
      ...prev,
      [name]: value,
      // Clear sub-class if main-class changes
      ...(name === 'main_class' ? { sub_class: '' } : {})
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const bodyData = new FormData();
    Object.keys(formData).forEach(key => {
      bodyData.append(key, formData[key] || '');
    });

    try {
      const res = await fetch('/api/v1/submit-station', {
        method: 'POST',
        body: bodyData
      });

      if (res.ok) {
        const result = await res.json();
        setRegisteredId(result.complaint_id);
        setIsSubmitted(true);
      } else {
        const errText = await res.text();
        alert('Error: ' + errText);
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred during submission.');
    } finally {
      setSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="form-card">
        <div className="card-header">
          <h2 className="card-title">Grievance Registered Successfully</h2>
        </div>
        <div className="success-banner">
          <h3>Complaint Filed Successfully</h3>
          <p>Please note down your unique Complaint ID for tracking:</p>
          <div className="id-badge">{registeredId}</div>
        </div>
        <div className="submit-container" style={{ gap: '15px', justifyContent: 'center' }}>
          <button 
            className="btn-submit" 
            style={{ backgroundColor: '#555' }} 
            onClick={() => onSwitchToTrack(registeredId)}
          >
            Track Status
          </button>
          <button className="btn-submit" onClick={() => window.location.reload()}>
            File New Grievance
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="form-card">
      <div className="card-header">
        <h2 className="card-title">Grievance/Assistance Detail (Station)</h2>
        <div className="mandatory-info"><span className="required-asterisk">*</span> Mandatory Fields</div>
      </div>

      <form onSubmit={handleSubmit}>
        <h3 className="form-section-title">Passenger Details</h3>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="stationPhone">Phone Number <span className="required-asterisk">*</span></label>
            <input 
              type="tel" 
              id="stationPhone" 
              name="phone_number" 
              required
              placeholder="Enter 10-digit mobile number" 
              pattern="[0-9]{10}"
              value={formData.phone_number}
              onChange={handleChange}
            />
          </div>
        </div>

        <h3 className="form-section-title">Station Location Details</h3>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="stationLocName">Station Name <span className="required-asterisk">*</span></label>
            <select 
              id="stationLocName" 
              name="station_name" 
              required
              value={formData.station_name}
              onChange={handleChange}
            >
              <option value="">Select Station</option>
              {stations.map((st) => (
                <option key={st.id} value={st.station_name}>
                  {st.station_name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="stationPlat">Platform Number</label>
            <select 
              id="stationPlat" 
              name="platform_number" 
              value={formData.platform_number}
              onChange={handleChange}
              disabled={!selectedStation}
            >
              <option value="">Select Platform (Optional)</option>
              {selectedStation && 
                Array.from({ length: selectedStation.platforms_count }, (_, i) => i + 1).map((num) => (
                  <option key={num} value={num}>
                    Platform {num}
                  </option>
                ))
              }
            </select>
          </div>
        </div>

        <h3 className="form-section-title">Complaint Details</h3>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="stationClass">Complaint Class <span className="required-asterisk">*</span></label>
            <select 
              id="stationClass" 
              name="main_class" 
              required
              value={formData.main_class}
              onChange={handleChange}
            >
              <option value="">Select Category</option>
              {Object.keys(STATION_CATEGORIES).sort().map((category, idx) => (
                <option key={idx} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="stationSubClass">Complaint Subclass <span className="required-asterisk">*</span></label>
            <select 
              id="stationSubClass" 
              name="sub_class" 
              required
              value={formData.sub_class}
              onChange={handleChange}
            >
              <option value="">Select Subcategory</option>
              {formData.main_class && STATION_CATEGORIES[formData.main_class] && 
                STATION_CATEGORIES[formData.main_class].sort().map((sub, idx) => (
                  <option key={idx} value={sub}>{sub}</option>
                ))
              }
            </select>
          </div>

          <div className="form-group full-width">
            <label htmlFor="stationDateTime">Incident Date & Time <span className="required-asterisk">*</span></label>
            <input 
              type="datetime-local" 
              id="stationDateTime" 
              name="incident_datetime" 
              required
              value={formData.incident_datetime}
              onChange={handleChange}
              max={new Date(new Date() - new Date().getTimezoneOffset()*60000).toISOString().slice(0, 16)}
            />
          </div>

          <div className="form-group full-width">
            <label htmlFor="stationDescription" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Complaint Description <span className="required-asterisk">*</span></span>
              <span id="stationWordCount" className={`word-counter ${wordCount >= 100 ? 'limit-reached' : ''}`}>
                ({wordCount} / 100 words)
              </span>
            </label>
            <textarea 
              id="stationDescription" 
              name="complaint_description" 
              required
              placeholder="Provide clear description of the concern at the station..."
              value={formData.complaint_description}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="submit-container">
          <button type="submit" className="btn-submit" disabled={submitting}>
            {submitting ? 'Submitting...' : 'Submit Complaint'}
          </button>
        </div>
      </form>
    </div>
  );
}
