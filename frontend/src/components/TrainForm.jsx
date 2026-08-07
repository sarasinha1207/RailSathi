import React, { useState, useEffect } from 'react';
import { TRAIN_CATEGORIES, FAMOUS_TRAINS } from '../constants';

export default function TrainForm({ onSwitchToTrack }) {
  const [formData, setFormData] = useState({
    phone_number: '',
    pnr_number: '',
    train_number: '',
    coach_number: '',
    main_class: '',
    sub_class: '',
    incident_datetime: '',
    complaint_description: ''
  });

  const [pnrStatus, setPnrStatus] = useState('');
  const [pnrStatusColor, setPnrStatusColor] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [registeredId, setRegisteredId] = useState('');
  const [submitting, setSubmitting] = useState(false);

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

  // Handle PNR verification when it reaches 10 digits
  useEffect(() => {
    const verifyPnr = async () => {
      const pnrVal = formData.pnr_number.trim();
      if (pnrVal.length === 10 && /^\d+$/.test(pnrVal)) {
        setPnrStatus('Verifying PNR...');
        setPnrStatusColor('var(--accent-gold)');

        try {
          const res = await fetch(`/api/v1/pnr/${pnrVal}`);
          if (res.ok) {
            const data = await res.json();
            setPnrStatus('✓ PNR Verified');
            setPnrStatusColor('#2e7d32'); // green
            setFormData(prev => ({
              ...prev,
              train_number: `${data.train_number} - ${data.train_name}`,
              coach_number: data.coach_number || '',
              phone_number: data.phone_number || prev.phone_number
            }));
          } else {
            setPnrStatus('✗ PNR not found');
            setPnrStatusColor('var(--error-color)');
          }
        } catch (err) {
          console.error(err);
          setPnrStatus('✗ Connection error');
          setPnrStatusColor('var(--error-color)');
        }
      } else if (pnrVal.length > 0) {
        setPnrStatus('Must be 10 digits');
        setPnrStatusColor('var(--error-color)');
      } else {
        setPnrStatus('');
      }
    };

    verifyPnr();
  }, [formData.pnr_number]);

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
      const res = await fetch('/api/v1/submit-train', {
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
        <h2 className="card-title">Grievance/Assistance Detail (Train)</h2>
        <div className="mandatory-info"><span className="required-asterisk">*</span> Mandatory Fields</div>
      </div>

      <form onSubmit={handleSubmit}>
        <h3 className="form-section-title">Passenger Details</h3>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="trainPnr" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>PNR Number <span className="required-asterisk">*</span></span>
              <span id="pnrStatus" style={{ fontSize: '0.8rem', fontWeight: 700, color: pnrStatusColor }}>
                {pnrStatus}
              </span>
            </label>
            <input 
              type="text" 
              id="trainPnr" 
              name="pnr_number" 
              required
              placeholder="Enter 10-digit PNR"
              pattern="[0-9]{10}"
              value={formData.pnr_number}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="trainPhone">Phone Number <span className="required-asterisk">*</span></label>
            <input 
              type="tel" 
              id="trainPhone" 
              name="phone_number" 
              required
              placeholder="Enter 10-digit mobile number" 
              pattern="[0-9]{10}"
              value={formData.phone_number}
              onChange={handleChange}
            />
          </div>
        </div>

        <h3 className="form-section-title">Journey Details</h3>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="trainNo">Train Number/Name <span className="required-asterisk">*</span></label>
            <input 
              type="text" 
              id="trainNo" 
              name="train_number" 
              required 
              placeholder="Type Train Name/Number..."
              list="trainList" 
              autoComplete="off"
              value={formData.train_number}
              onChange={handleChange}
            />
            <datalist id="trainList">
              {FAMOUS_TRAINS.map((train, idx) => (
                <option key={idx} value={`${train.number} - ${train.name}`} />
              ))}
            </datalist>
          </div>
          <div className="form-group">
            <label htmlFor="trainCoach">Coach Number</label>
            <input 
              type="text" 
              id="trainCoach" 
              name="coach_number" 
              placeholder="e.g. A1, S3, B2 (Optional)"
              value={formData.coach_number}
              onChange={handleChange}
            />
          </div>
        </div>

        <h3 className="form-section-title">Complaint Details</h3>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="trainClass">Complaint Class <span className="required-asterisk">*</span></label>
            <select 
              id="trainClass" 
              name="main_class" 
              required
              value={formData.main_class}
              onChange={handleChange}
            >
              <option value="">Select Category</option>
              {Object.keys(TRAIN_CATEGORIES).sort().map((category, idx) => (
                <option key={idx} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="trainSubClass">Complaint Subclass <span class="required-asterisk">*</span></label>
            <select 
              id="trainSubClass" 
              name="sub_class" 
              required
              value={formData.sub_class}
              onChange={handleChange}
            >
              <option value="">Select Subcategory</option>
              {formData.main_class && TRAIN_CATEGORIES[formData.main_class] && 
                TRAIN_CATEGORIES[formData.main_class].sort().map((sub, idx) => (
                  <option key={idx} value={sub}>{sub}</option>
                ))
              }
            </select>
          </div>

          <div className="form-group full-width">
            <label htmlFor="trainDateTime">Incident Date & Time <span className="required-asterisk">*</span></label>
            <input 
              type="datetime-local" 
              id="trainDateTime" 
              name="incident_datetime" 
              required
              value={formData.incident_datetime}
              onChange={handleChange}
              max={new Date(new Date() - new Date().getTimezoneOffset()*60000).toISOString().slice(0, 16)}
            />
          </div>

          <div className="form-group full-width">
            <label htmlFor="trainDescription" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Complaint Description <span className="required-asterisk">*</span></span>
              <span id="trainWordCount" className={`word-counter ${wordCount >= 100 ? 'limit-reached' : ''}`}>
                ({wordCount} / 100 words)
              </span>
            </label>
            <textarea 
              id="trainDescription" 
              name="complaint_description" 
              required
              placeholder="Provide clear description of your concern on the train..."
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
