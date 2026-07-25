import React from 'react';

export default function Hero({ onRegisterClick, onTrackClick }) {
  return (
    <div id="hero-section" className="hero-section">
      <div className="hero-inner">
        <div className="hero-content">
          <h2>RailSathi: Your Journey, Our Priority</h2>
          <p>
            A unified portal for grievance redressal and immediate assistance across Indian Railways trains and
            stations. File complaints, request emergency aid, and track resolution status in real-time.
          </p>
          <div className="hero-actions">
            <button onClick={onRegisterClick} className="btn-hero-primary" style={{ border: 'none' }}>
              Register Complaint
            </button>
            <button onClick={onTrackClick} className="btn-hero-secondary" style={{ border: 'none' }}>
              Track Complaint Status
            </button>
          </div>
        </div>
        <div className="hero-image-container">
          <img src="/railsathi_hero.png" alt="RailSathi Indian Railways Journey" className="hero-image" />
        </div>
      </div>
    </div>
  );
}
