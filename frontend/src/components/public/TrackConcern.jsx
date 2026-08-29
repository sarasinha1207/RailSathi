import React, { useState, useEffect } from 'react';

export default function TrackConcern({ initialComplaintId }) {
  const [complaintId, setComplaintId] = useState(initialComplaintId || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [complaintData, setComplaintData] = useState(null);
  
  // Feedback form state
  const [rating, setRating] = useState('');
  const [feedback, setFeedback] = useState('');
  const [feedbackSubmitting, setFeedbackSubmitting] = useState(false);

  useEffect(() => {
    if (initialComplaintId) {
      setComplaintId(initialComplaintId);
      fetchStatus(initialComplaintId);
    }
  }, [initialComplaintId]);

  const fetchStatus = async (id) => {
    if (!id.trim()) return;
    setLoading(true);
    setError('');
    setComplaintData(null);

    try {
      const res = await fetch(`/track-api/${id.trim()}`);
      if (res.status === 404) {
        setError('not_found');
      } else if (res.ok) {
        const data = await res.json();
        setComplaintData(data);
        // Reset feedback selections
        setRating('');
        setFeedback('');
      } else {
        setError('server_error');
      }
    } catch (err) {
      console.error(err);
      setError('connection_error');
    } finally {
      setLoading(false);
    }
  };

  const handleTrackSubmit = (e) => {
    e.preventDefault();
    fetchStatus(complaintId);
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    if (!rating) {
      alert('Please select a rating option.');
      return;
    }
    setFeedbackSubmitting(true);

    const bodyData = new FormData();
    bodyData.append('complaint_id', complaintData.complaint_id);
    bodyData.append('rating', rating);
    bodyData.append('feedback', feedback);

    try {
      const res = await fetch('/submit-feedback', {
        method: 'POST',
        body: bodyData
      });

      if (res.ok) {
        // Refresh complaint data
        fetchStatus(complaintData.complaint_id);
      } else {
        alert('Failed to submit feedback. Please try again.');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred. Please try again.');
    } finally {
      setFeedbackSubmitting(false);
    }
  };

  const getRatingBadge = (ratingVal) => {
    const r = ratingVal.trim().toLowerCase();
    if (r === 'excellent') {
      return (
        <span style={{ backgroundColor: '#e8f5e9', color: '#2e7d32', border: '1px solid #a5d6a7', padding: '3px 8px', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 700, display: 'inline-block' }}>
          Excellent
        </span>
      );
    } else if (r === 'satisfactory') {
      return (
        <span style={{ backgroundColor: '#fff8e1', color: '#f57f17', border: '1px solid #ffe082', padding: '3px 8px', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 700, display: 'inline-block' }}>
          Satisfactory
        </span>
      );
    } else if (r === 'unsatisfactory') {
      return (
        <span style={{ backgroundColor: '#ffebee', color: '#c62828', border: '1px solid #ffcdd2', padding: '3px 8px', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 700, display: 'inline-block' }}>
          Unsatisfactory
        </span>
      );
    }
    return <span className="status-badge closed">{ratingVal}</span>;
  };

  return (
    <div className="form-card">
      <div className="card-header">
        <h2 className="card-title">Track Your Concern</h2>
        <div className="mandatory-info"><span className="required-asterisk">*</span> Mandatory Fields</div>
      </div>

      <form onSubmit={handleTrackSubmit} className="tracker-box">
        <div className="form-grid">
          <div className="form-group full-width">
            <label htmlFor="trackId">Complaint ID <span className="required-asterisk">*</span></label>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <input 
                type="text" 
                id="trackId" 
                name="complaint_id" 
                required
                placeholder="Enter Complaint ID (e.g. CMP0001)" 
                style={{ flex: '1 1 220px', minWidth: '180px' }}
                value={complaintId}
                onChange={(e) => setComplaintId(e.target.value)}
              />
              <button 
                type="submit" 
                className="btn-submit" 
                style={{ marginTop: 0, padding: '12px 25px', whiteSpace: 'nowrap', flex: '1 1 auto' }}
                disabled={loading}
              >
                {loading ? 'Searching...' : 'Track Status'}
              </button>
            </div>
          </div>
        </div>
      </form>

      <div id="tracker-results">
        {loading && (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '40px' }}>
            Fetching status details...
          </p>
        )}

        {!loading && error === 'not_found' && (
          <div className="success-banner" style={{ backgroundColor: '#ffebee', borderColor: '#ffcdd2', marginTop: '30px' }}>
            <h3 style={{ color: 'var(--error-color)' }}>Complaint Not Found</h3>
            <p>No records found for Complaint ID <b>{complaintId}</b>. Please check the spelling and try again.</p>
          </div>
        )}

        {!loading && (error === 'server_error' || error === 'connection_error') && (
          <div className="success-banner" style={{ backgroundColor: '#ffebee', borderColor: '#ffcdd2', marginTop: '30px' }}>
            <h3 style={{ color: 'var(--error-color)' }}>Connection Error</h3>
            <p>Could not retrieve status records. Please verify your connection or try again later.</p>
          </div>
        )}

        {!loading && !error && complaintData && (
          <div className="tracker-results">
            <h3 className="form-section-title" style={{ marginTop: 0 }}>Grievance Status Details</h3>
            <div className="form-grid" style={{ marginBottom: '20px' }}>
              <div className="form-group">
                <label>Complaint ID</label>
                <div style={{ fontWeight: 700, color: 'var(--primary-color)', fontSize: '1.1rem' }}>
                  {complaintData.complaint_id}
                </div>
              </div>
              <div className="form-group">
                <label>Current Status</label>
                <div>
                  <span className={`status-badge ${complaintData.complaint_status.toLowerCase() === 'open' ? 'open' : 'closed'}`}>
                    {complaintData.complaint_status}
                  </span>
                </div>
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <div>{complaintData.phone_number}</div>
              </div>
              <div className="form-group">
                <label>Type & Category</label>
                <div>
                  {complaintData.complaint_type === 'Train' ? 'Train Complaint' : 'Station Complaint'} &gt; {complaintData.main_class} ({complaintData.sub_class})
                </div>
              </div>
              <div className="form-group">
                <label>Location Details</label>
                <div>
                  {complaintData.complaint_type === 'Train' 
                    ? `Train No: ${complaintData.train_number} | Coach: ${complaintData.coach_number || 'N/A'}`
                    : `Station: ${complaintData.station_name} | Platform: ${complaintData.platform_number || 'N/A'}`
                  }
                </div>
              </div>
              <div className="form-group">
                <label>Incident Date & Time</label>
                <div>{complaintData.incident_date} {complaintData.incident_time || ''}</div>
              </div>
              <div className="form-group">
                <label>Registered On</label>
                <div>{complaintData.created_at}</div>
              </div>
              <div className="form-group full-width">
                <label>Complaint Description</label>
                <div style={{ backgroundColor: '#fafbfc', border: '1px solid var(--border-color)', padding: '12px', borderRadius: '6px', fontStyle: 'italic' }}>
                  "{complaintData.complaint_description}"
                </div>
              </div>
            </div>

            {/* Official Remarks */}
            <div style={{ marginTop: '25px', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
              <h4 style={{ color: 'var(--primary-color)', margin: '0 0 10px 0', fontWeight: 700, fontSize: '1.05rem' }}>
                Official Remarks
              </h4>
              <div style={{ backgroundColor: '#fafbfc', border: '1px solid var(--border-color)', padding: '15px', borderRadius: '6px', fontSize: '0.95rem', lineHeight: '1.5', minHeight: '40px', color: 'var(--text-color)' }}>
                {complaintData.remarks ? complaintData.remarks : (
                  <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>No official remarks recorded yet.</span>
                )}
              </div>
            </div>

            {/* Feedback & Rating */}
            <div style={{ marginTop: '25px', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
              <h4 style={{ color: 'var(--primary-color)', margin: '0 0 10px 0', fontWeight: 700, fontSize: '1.05rem' }}>
                Passenger Feedback & Rating
              </h4>
              {complaintData.feedback || complaintData.rating ? (
                <div style={{ backgroundColor: '#fffaf0', border: '1px solid #ffb300', padding: '15px', borderRadius: '6px', fontSize: '0.95rem', lineHeight: '1.6', color: 'var(--primary-color)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {complaintData.rating && <div><span style={{ fontWeight: 700, marginRight: '5px' }}>Rating:</span> {getRatingBadge(complaintData.rating)}</div>}
                  {complaintData.feedback && <div><span style={{ fontWeight: 700, marginRight: '5px' }}>Feedback:</span> "{complaintData.feedback}"</div>}
                </div>
              ) : (
                complaintData.complaint_status.toLowerCase() === 'resolved' || complaintData.complaint_status.toLowerCase() === 'closed' ? (
                  <form onSubmit={handleFeedbackSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '10px' }}>
                    <div className="form-group" style={{ margin: 0 }}>
                      <label style={{ fontWeight: 700, marginBottom: '8px', display: 'block', fontSize: '0.9rem' }}>
                        How would you rate the resolution? <span className="required-asterisk">*</span>
                      </label>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                        <label 
                          style={{ border: '1px solid var(--border-color)', padding: '10px', borderRadius: '6px', textAlign: 'center', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', background: rating === 'Excellent' ? '#fcf1f2' : '#fafbfc', transition: 'all 0.3s ease', boxSizing: 'border-box' }}
                          className="rating-label"
                        >
                          <input 
                            type="radio" 
                            name="rating" 
                            value="Excellent" 
                            required 
                            style={{ margin: 0 }}
                            checked={rating === 'Excellent'}
                            onChange={() => setRating('Excellent')}
                          />
                          <span style={{ fontWeight: 700, fontSize: '0.85rem', color: '#2e7d32' }}>Excellent</span>
                        </label>
                        <label 
                          style={{ border: '1px solid var(--border-color)', padding: '10px', borderRadius: '6px', textAlign: 'center', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', background: rating === 'Satisfactory' ? '#fcf1f2' : '#fafbfc', transition: 'all 0.3s ease', boxSizing: 'border-box' }}
                          className="rating-label"
                        >
                          <input 
                            type="radio" 
                            name="rating" 
                            value="Satisfactory" 
                            style={{ margin: 0 }}
                            checked={rating === 'Satisfactory'}
                            onChange={() => setRating('Satisfactory')}
                          />
                          <span style={{ fontWeight: 700, fontSize: '0.85rem', color: '#f57f17' }}>Satisfactory</span>
                        </label>
                        <label 
                          style={{ border: '1px solid var(--border-color)', padding: '10px', borderRadius: '6px', textAlign: 'center', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', background: rating === 'Unsatisfactory' ? '#fcf1f2' : '#fafbfc', transition: 'all 0.3s ease', boxSizing: 'border-box' }}
                          className="rating-label"
                        >
                          <input 
                            type="radio" 
                            name="rating" 
                            value="Unsatisfactory" 
                            style={{ margin: 0 }}
                            checked={rating === 'Unsatisfactory'}
                            onChange={() => setRating('Unsatisfactory')}
                          />
                          <span style={{ fontWeight: 700, fontSize: '0.85rem', color: '#c62828' }}>Unsatisfactory</span>
                        </label>
                      </div>
                    </div>
                    
                    <div className="form-group" style={{ margin: 0 }}>
                      <label style={{ fontWeight: 700, marginBottom: '8px', display: 'block', fontSize: '0.9rem' }}>
                        Comments (Optional)
                      </label>
                      <textarea 
                        name="feedback" 
                        placeholder="Tell us about your resolution experience..." 
                        style={{ width: '100%', minHeight: '70px', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)', fontFamily: 'inherit', fontSize: '0.9rem', resize: 'vertical', boxSizing: 'border-box' }}
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                      />
                    </div>
                    
                    <button 
                      type="submit" 
                      className="btn-submit" 
                      style={{ alignSelf: 'flex-end', padding: '8px 20px', fontSize: '0.85rem', margin: 0, backgroundColor: 'var(--primary-color)', color: '#ffffff', border: 'none', borderRadius: '6px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.3s ease' }}
                      disabled={feedbackSubmitting}
                    >
                      {feedbackSubmitting ? 'Submitting...' : 'Submit Feedback'}
                    </button>
                  </form>
                ) : (
                  <div style={{ color: 'var(--text-muted)', fontStyle: 'italic', fontSize: '0.9rem' }}>
                    Feedback form will become available once the complaint status is marked as Resolved or Closed.
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {!loading && !error && !complaintData && (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '40px' }}>
            Enter a valid Complaint Reference ID above to search live redressal status.
          </p>
        )}
      </div>
    </div>
  );
}
