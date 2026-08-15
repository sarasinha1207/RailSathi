import React from 'react';

export default function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-grid">
        <div className="footer-column brand-column">
          <div className="footer-logo-row">
            <img src="/railway_logo.jpg" alt="Indian Railways Logo" className="footer-logo" />
            <h3>INDIAN RAILWAYS</h3>
          </div>
          <p className="footer-desc">
            RailSathi is the unified passenger support portal of Indian Railways. It provides real-time registering and tracking of grievances across trains and stations to ensure a safe and comfortable travel experience.
          </p>
        </div>
        
        <div class="footer-column">
          <h4>Important Links</h4>
          <ul class="footer-links-list">
            <li><a href="https://www.indianrail.gov.in/" target="_blank" rel="noreferrer">Indian Railways Portal</a></li>
            <li><a href="https://www.irctc.co.in/" target="_blank" rel="noreferrer">IRCTC Ticket Booking</a></li>
            <li><a href="https://enquiry.indianrail.gov.in/" target="_blank" rel="noreferrer">NTES Train Enquiry</a></li>
            <li><a href="https://www.india.gov.in/" target="_blank" rel="noreferrer">National Portal of India</a></li>
          </ul>
        </div>
        
        <div class="footer-column">
          <h4>Helpline Directory</h4>
          <ul class="footer-help-list">
            <li><strong>Integrated Helpline:</strong> Dial 139</li>
            <li><strong>Security Assistance:</strong> Dial 182 / 139</li>
            <li><strong>Medical Emergency:</strong> Dial 139</li>
            <li><strong>Portal Support:</strong> support@railsathi.gov.in</li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2026 Ministry of Railways, Government of India. All Rights Reserved.</p>
        <p class="footer-tag">Unified Grievance Redressal and Assistance System</p>
      </div>
    </footer>
  );
}
