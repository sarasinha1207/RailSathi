import React from 'react';
import Hero from './Hero';

export default function Home({ onRegisterClick, onTrackClick }) {
  return (
    <div className="home-container" style={{ width: '100%' }}>
      <style>{`
        /* Full-width wrappers for consistent background colors */
        .home-section-wrapper {
            width: 100%;
            display: flex;
            justify-content: center;
            box-sizing: border-box;
        }

        /* Center-aligned container with consistent max-width and padding */
        .home-section-container {
            width: 100%;
            max-width: 1200px;
            padding: 80px 24px;
            box-sizing: border-box;
            color: var(--text-color);
        }

        .section-title-wrapper {
            text-align: center;
            margin-bottom: 55px;
        }

        .section-title-main {
            font-size: 2.25rem;
            font-weight: 800;
            color: var(--primary-color);
            margin-bottom: 12px;
            letter-spacing: 0.3px;
            position: relative;
            display: inline-block;
            padding-bottom: 12px;
        }

        .section-title-main::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 60px;
            height: 3px;
            background-color: var(--accent-color);
            border-radius: 2px;
        }

        .section-title-sub {
            font-size: 1rem;
            color: var(--text-muted);
            max-width: 650px;
            margin: 15px auto 0 auto;
            line-height: 1.6;
        }

        /* 1. About Indian Railways Section */
        .about-railways-layout {
            display: flex;
            align-items: stretch;
            gap: 50px;
            width: 100%;
            box-sizing: border-box;
        }

        .about-railways-text {
            flex: 1.2;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        .about-railways-text p {
            font-size: 1.05rem;
            line-height: 1.75;
            color: #475569;
            margin-bottom: 20px;
        }

        .about-railways-text strong {
            color: var(--primary-color);
            font-weight: 700;
        }

        .about-railways-stats {
            flex: 0.8;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
        }

        .railway-stat-item {
            background-color: #ffffff;
            border-radius: 12px;
            padding: 30px 20px;
            text-align: center;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
            border: 1px solid var(--border-color);
            transition: all 0.3s ease;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        .railway-stat-item:hover {
            transform: translateY(-3px);
            border-color: var(--primary-color);
            box-shadow: 0 10px 25px rgba(26, 54, 93, 0.08);
        }

        .railway-stat-num {
            font-size: 2.1rem;
            font-weight: 800;
            color: var(--primary-color);
            margin-bottom: 5px;
        }

        .railway-stat-label {
            font-size: 0.75rem;
            font-weight: 700;
            text-transform: uppercase;
            color: var(--text-muted);
            letter-spacing: 0.5px;
        }

        @media (max-width: 900px) {
            .about-railways-layout {
                flex-direction: column;
                gap: 35px;
            }
            .about-railways-text {
                text-align: center;
            }
            .about-railways-stats {
                width: 100%;
            }
        }

        /* 2. How It Works Section */
        .workflow-timeline {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 30px;
            width: 100%;
        }

        .workflow-step {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            background-color: #ffffff;
            border-radius: 12px;
            padding: 35px 25px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
            border: 1px solid var(--border-color);
            transition: all 0.3s ease;
            height: 100%;
            box-sizing: border-box;
        }

        .workflow-step:hover {
            transform: translateY(-4px);
            border-color: var(--primary-color);
            box-shadow: 0 10px 30px rgba(26, 54, 93, 0.06);
        }

        .step-number {
            width: 55px;
            height: 55px;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--primary-color) 0%, #0f2547 100%);
            color: #ffffff;
            font-size: 1.3rem;
            font-weight: 800;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px rgba(26, 54, 93, 0.2);
            margin-bottom: 22px;
        }

        .step-title {
            font-size: 1.15rem;
            font-weight: 800;
            color: var(--primary-color);
            margin: 0 0 12px 0;
        }

        .step-desc {
            font-size: 0.88rem;
            color: var(--text-muted);
            line-height: 1.55;
            margin: 0;
        }

        /* 3. Railway Complaint Categories Section */
        .categories-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 30px;
            width: 100%;
        }

        .category-card {
            background-color: #ffffff;
            border-radius: 12px;
            border: 1px solid var(--border-color);
            padding: 35px 25px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            display: flex;
            flex-direction: column;
            gap: 15px;
            height: 100%;
            box-sizing: border-box;
        }

        .category-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 30px rgba(0, 0, 0, 0.06);
            border-color: var(--primary-color);
        }

        .category-icon-box {
            width: 48px;
            height: 48px;
            border-radius: 8px;
            background-color: rgba(26, 54, 93, 0.05);
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--primary-color);
            transition: all 0.3s ease;
        }

        .category-card:hover .category-icon-box {
            background-color: var(--primary-color);
            color: #ffffff;
        }

        .category-icon {
            width: 24px;
            height: 24px;
            fill: currentColor;
        }

        .category-title {
            font-size: 1.2rem;
            font-weight: 800;
            color: var(--primary-color);
            margin: 0;
        }

        .category-desc {
            font-size: 0.9rem;
            color: var(--text-muted);
            line-height: 1.6;
            margin: 0;
        }

        /* 4. Why Choose RailSathi Section */
        .benefits-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            gap: 30px;
            width: 100%;
        }

        .benefit-card {
            background-color: #ffffff;
            border-radius: 12px;
            padding: 40px 25px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
            border: 1px solid var(--border-color);
            text-align: center;
            transition: all 0.3s ease;
            height: 100%;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .benefit-card:hover {
            transform: translateY(-4px);
            border-color: var(--accent-color);
            box-shadow: 0 10px 30px rgba(249, 115, 22, 0.06);
        }

        .benefit-badge {
            width: 52px;
            height: 52px;
            border-radius: 50%;
            background-color: rgba(249, 115, 22, 0.08);
            color: var(--accent-color);
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 22px;
            font-size: 1.4rem;
            font-weight: 800;
            transition: all 0.3s ease;
        }

        .benefit-card:hover .benefit-badge {
            background-color: var(--accent-color);
            color: #ffffff;
        }

        .benefit-title {
            font-size: 1.2rem;
            font-weight: 800;
            color: var(--primary-color);
            margin-bottom: 12px;
        }

        .benefit-desc {
            font-size: 0.9rem;
            color: var(--text-muted);
            line-height: 1.6;
            margin: 0;
        }

        /* 5. Contact & Emergency Section */
        .emergency-dashboard {
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            color: #ffffff;
            border-radius: 16px;
            padding: 50px;
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
            border-left: 6px solid var(--accent-color);
            box-sizing: border-box;
            width: 100%;
        }

        .emergency-layout {
            display: flex;
            justify-content: space-between;
            gap: 50px;
            align-items: center;
        }

        .emergency-info {
            flex: 1.2;
        }

        .emergency-info h3 {
            font-size: 1.8rem;
            font-weight: 800;
            color: var(--accent-gold);
            margin-bottom: 15px;
        }

        .emergency-info p {
            font-size: 1.05rem;
            color: #cbd5e1;
            line-height: 1.65;
            margin-bottom: 25px;
        }

        .emergency-info-subtext {
            font-size: 0.85rem;
            color: #94a3b8;
            margin: 0;
        }

        .emergency-actions {
            flex: 0.8;
            display: flex;
            flex-direction: column;
            gap: 15px;
            width: 100%;
        }

        .hotline-button {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background-color: rgba(255, 255, 255, 0.04);
            border: 1px solid rgba(255, 255, 255, 0.12);
            border-radius: 10px;
            padding: 18px 25px;
            color: #ffffff;
            text-decoration: none;
            transition: all 0.3s ease;
            cursor: pointer;
            box-sizing: border-box;
        }

        .hotline-button:hover {
            background-color: var(--accent-color);
            border-color: var(--accent-color);
            box-shadow: 0 5px 25px rgba(249, 115, 22, 0.4);
            transform: translateY(-2px);
        }

        .hotline-text-block {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
        }

        .hotline-btn-label {
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: #94a3b8;
        }

        .hotline-button:hover .hotline-btn-label {
            color: #ffffff;
        }

        .hotline-btn-title {
            font-size: 1.1rem;
            font-weight: 800;
            margin-top: 2px;
        }

        .hotline-btn-num {
            font-size: 1.6rem;
            font-weight: 900;
            color: var(--accent-gold);
        }

        .hotline-button:hover .hotline-btn-num {
            color: #ffffff;
        }

        @media (max-width: 900px) {
            .emergency-layout {
                flex-direction: column;
                gap: 35px;
                text-align: center;
            }
            .emergency-actions {
                width: 100%;
            }
        }
      `}</style>

      {/* Hero Header Banner */}
      <Hero onRegisterClick={onRegisterClick} onTrackClick={onTrackClick} />

      {/* Section 1: About Indian Railways */}
      <section className="home-section-wrapper" style={{ backgroundColor: '#ffffff' }}>
        <div className="home-section-container">
          <div className="section-title-wrapper">
            <h3 className="section-title-main">About Indian Railways</h3>
            <p className="section-title-sub">The lifeline of the nation, connecting people, cultures, and trade across the subcontinent.</p>
          </div>

          <div className="about-railways-layout">
            <div className="about-railways-text">
              <p>
                <strong>Indian Railways (IR)</strong> is a statutory body under the ownership of the Ministry of Railways, Government of India, that operates India's national railway system. It is one of the largest railway networks in the world by size, spanning over 68,000 route kilometers and running more than 13,000 passenger trains daily.
              </p>
              <p>
                Serving as the economic backbone of the nation, Indian Railways carries over <strong>22 million passengers</strong> and 3 million tonnes of freight every single day. Under the Digital India and Passenger-Centric initiatives, IR continues to modernize its infrastructure, train speed, safety systems, and digital customer support portals to ensure a seamless and safe journey for everyone.
              </p>
            </div>
            
            <div className="about-railways-stats">
              <div className="railway-stat-item">
                <div className="railway-stat-num">13k+</div>
                <div className="railway-stat-label">Daily Trains</div>
              </div>
              <div className="railway-stat-item">
                <div className="railway-stat-num">68k+</div>
                <div className="railway-stat-label">Route KMs</div>
              </div>
              <div className="railway-stat-item">
                <div className="railway-stat-num">7.3k+</div>
                <div className="railway-stat-label">Stations</div>
              </div>
              <div className="railway-stat-item">
                <div className="railway-stat-num">22M+</div>
                <div className="railway-stat-label">Daily Passengers</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: How It Works */}
      <section className="home-section-wrapper" style={{ backgroundColor: '#f0f4f8' }}>
        <div className="home-section-container">
          <div className="section-title-wrapper">
            <h3 className="section-title-main">How It Works</h3>
            <p className="section-title-sub">Our simplified workflow connects you directly to the division team on your train or station.</p>
          </div>
          
          <div className="workflow-timeline">
            <div className="workflow-step">
              <div className="step-number">1</div>
              <h4 className="step-title">Enter Details</h4>
              <p className="step-desc">Enter your 10-digit PNR for verification & auto-journey details lookup.</p>
            </div>
            <div className="workflow-step">
              <div className="step-number">2</div>
              <h4 className="step-title">Select Concern</h4>
              <p className="step-desc">Pick appropriate category like Cleanliness, Medical or Security.</p>
            </div>
            <div className="workflow-step">
              <div className="step-number">3</div>
              <h4 className="step-title">Auto Routing</h4>
              <p className="step-desc">System routes your ticket stub to the nearest division supervisor.</p>
            </div>
            <div className="workflow-step">
              <div className="step-number">4</div>
              <h4 className="step-title">Rapid Redressal</h4>
              <p className="step-desc">On-board staff gets notified and solves your issue immediately.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Railway Complaint Categories */}
      <section className="home-section-wrapper" style={{ backgroundColor: '#ffffff' }}>
        <div className="home-section-container">
          <div className="section-title-wrapper">
            <h3 className="section-title-main">Railway Complaint Categories</h3>
            <p className="section-title-sub">Select specialized channels designed for immediate on-trip support and grievance resolution.</p>
          </div>

          <div className="categories-grid">
            {/* Medical Assistance */}
            <div className="category-card">
              <div className="category-icon-box">
                <svg className="category-icon" viewBox="0 0 24 24">
                  <path d="M19 10.5h-5.5V5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v5.5H5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h5.5V19c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-5.5H19c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5z" />
                </svg>
              </div>
              <h4 className="category-title">Medical Assistance</h4>
              <p className="category-desc">Request medical assistance or emergency doctor-on-call services at the upcoming halt station.</p>
            </div>

            {/* Security & Protection */}
            <div className="category-card">
              <div className="category-icon-box">
                <svg className="category-icon" viewBox="0 0 24 24">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
                </svg>
              </div>
              <h4 className="category-title">Security & Protection</h4>
              <p className="category-desc">Report security threats, theft, harassment, or request immediate assistance from patrolling RPF officers.</p>
            </div>

            {/* Cleanliness & Hygiene */}
            <div className="category-card">
              <div className="category-icon-box">
                <svg className="category-icon" viewBox="0 0 24 24">
                  <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L4.35 19.2c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l1.9-1.9C9.22 19.58 10.57 20 12 20c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 15c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" />
                </svg>
              </div>
              <h4 className="category-title">Cleanliness & Hygiene</h4>
              <p className="category-desc">Request coach dry-sweeping, wet-cleaning, washroom cleaning, or garbage disposal on the go.</p>
            </div>

            {/* Electrical Equipment */}
            <div className="category-card">
              <div className="category-icon-box">
                <svg className="category-icon" viewBox="0 0 24 24">
                  <path d="M7 2v11h3v9l7-12h-4l4-8H7zm6 8h3l-5 8.5V11H8.5L13 3.5V10z" />
                </svg>
              </div>
              <h4 className="category-title">Electrical Equipment</h4>
              <p className="category-desc">File complaints regarding malfunctioning ACs, dead charging sockets, non-functional fans, or lights.</p>
            </div>

            {/* Bedroll & Linen Services */}
            <div className="category-card">
              <div className="category-icon-box">
                <svg className="category-icon" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-8 11.5H5v-2h7v2zm8-4H5v-2h15v2zm0-4H5V6h15v2z" />
                </svg>
              </div>
              <h4 className="category-title">Bedroll & Linen Services</h4>
              <p className="category-desc">Report unwashed linen, torn blankets, missing pillows, or request bedroll replacement inside AC coaches.</p>
            </div>

            {/* Catering & Water Supply */}
            <div className="category-card">
              <div className="category-icon-box">
                <svg className="category-icon" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.04-.42 1.99-1.07 2.75z" />
                </svg>
              </div>
              <h4 className="category-title">Catering & Water Supply</h4>
              <p className="category-desc">Report food quality issues, overcharging by vendors, missing pantry options, or water outages.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Why Choose RailSathi */}
      <section className="home-section-wrapper" style={{ backgroundColor: '#f0f4f8' }}>
        <div className="home-section-container">
          <div className="section-title-wrapper">
            <h3 className="section-title-main">Why Choose RailSathi</h3>
            <p className="section-title-sub">A unified and highly-responsive grievance system redefining the passenger travel experience.</p>
          </div>

          <div className="benefits-grid">
            {/* Real-time Tracking */}
            <div className="benefit-card">
              <div className="benefit-badge">✓</div>
              <h4 className="benefit-title">Real-Time Updates</h4>
              <p className="benefit-desc">Track status changes of your concern immediately, with SMS alerts and progress tracking.</p>
            </div>

            {/* Automated Routing */}
            <div className="benefit-card">
              <div className="benefit-badge">⚙</div>
              <h4 className="benefit-title">Automated Routing</h4>
              <p className="benefit-desc">Advanced algorithms route complaints instantly to the nearest station master or train supervisor based on GPS.</p>
            </div>

            {/* 24/7 Availability */}
            <div className="benefit-card">
              <div className="benefit-badge">★</div>
              <h4 className="benefit-title">24/7 On-Trip Support</h4>
              <p className="benefit-desc">Whether travelling late at night or early in the morning, our teams are active to ensure help is always nearby.</p>
            </div>

            {/* Transparency & Logs */}
            <div className="benefit-card">
              <div className="benefit-badge">💬</div>
              <h4 className="benefit-title">Transparent Logging</h4>
              <p className="benefit-desc">All remarks and resolution details by division staffs are logged and open to passenger feedback ratings.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Contact & Emergency */}
      <section className="home-section-wrapper" style={{ backgroundColor: '#ffffff' }}>
        <div className="home-section-container">
          <div className="emergency-dashboard">
            <div className="emergency-layout">
              <div className="emergency-info">
                <h3>Contact & Emergency Services</h3>
                <p>
                  For immediate security protection, serious medical emergencies, or accident reports, please contact the dedicated hotlines. Helpline 139 is integrated to answer all passenger security, medical, and general inquiries.
                </p>
                <p className="emergency-info-subtext">
                  Non-emergency portal issues or suggestions can be sent to <strong>support@railsathi.gov.in</strong>
                </p>
              </div>
              
              <div className="emergency-actions">
                <a href="tel:139" className="hotline-button">
                  <div className="hotline-text-block">
                    <span className="hotline-btn-label">Integrated Helpline</span>
                    <span className="hotline-btn-title">All-in-One Railway Support</span>
                  </div>
                  <span className="hotline-btn-num">139</span>
                </a>

                <a href="tel:182" className="hotline-button">
                  <div className="hotline-text-block">
                    <span className="hotline-btn-label">RPF Security Helpline</span>
                    <span className="hotline-btn-title">Security & Protection Force</span>
                  </div>
                  <span className="hotline-btn-num">182</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
