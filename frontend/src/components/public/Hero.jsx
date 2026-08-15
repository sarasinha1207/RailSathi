import React from 'react';

export default function Hero({ onRegisterClick, onTrackClick }) {
  return (
    <section
      id="hero-section"
      style={{
        width: '100%',
        minHeight: '780px',
        height: '88vh',
        maxHeight: '980px',
        position: 'relative',
        overflow: 'hidden',
        userSelect: 'none'
      }}
    >
      {/* 100% Full Viewport Width Undistorted Background Image */}
      <img
        src="/railsathi_hero.png"
        alt="RailSathi Indian Railways Journey"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center 35%',
          filter: 'brightness(1.05) contrast(1.05)'
        }}
      />

      {/* Subtle Lightweight Overlay for Crisp Text Readability while Keeping Image Bright */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, rgba(0, 0, 0, 0.72) 0%, rgba(0, 0, 0, 0.4) 45%, rgba(0, 0, 0, 0.08) 100%)',
          zIndex: 10
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0, 0, 0, 0.35) 0%, transparent 40%)',
          zIndex: 10
        }}
      />

      {/* Hero Content Box Positioned Spaciously Over Image */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 20,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding: '0 6%',
          boxSizing: 'border-box'
        }}
      >
        <div
          style={{
            maxWidth: '680px',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
            color: '#ffffff',
            boxSizing: 'border-box'
          }}
        >
          {/* Heading: RailSathi */}
          <h1
            style={{
              fontSize: '3.6rem',
              fontWeight: 800,
              color: '#ffffff',
              lineHeight: 1.1,
              letterSpacing: '-0.5px',
              margin: 0,
              textShadow: '0 2px 12px rgba(0,0,0,0.6)'
            }}
          >
            RailSathi
          </h1>

          {/* Subheading: Your Journey, Our Priority */}
          <h2
            style={{
              fontSize: '1.65rem',
              fontWeight: 700,
              color: '#ffb300', /* Warm Bright Gold/Amber */
              lineHeight: 1.25,
              letterSpacing: '0.2px',
              margin: 0,
              textShadow: '0 2px 10px rgba(0,0,0,0.6)'
            }}
          >
            Your Journey, Our Priority
          </h2>

          {/* Description */}
          <p
            style={{
              fontSize: '1rem',
              fontWeight: 500,
              color: '#f8fafc',
              lineHeight: 1.65,
              margin: 0,
              textShadow: '0 1px 6px rgba(0,0,0,0.6)'
            }}
          >
            A unified portal for grievance redressal and immediate assistance across Indian Railways trains and stations. File complaints, request emergency aid, and track resolution status in real-time.
          </p>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '18px', marginTop: '10px', flexWrap: 'wrap' }}>
            <button
              onClick={onRegisterClick}
              style={{
                backgroundColor: '#700c28',
                color: '#ffffff',
                padding: '16px 32px',
                borderRadius: '12px',
                border: 'none',
                fontWeight: 800,
                fontSize: '0.95rem',
                cursor: 'pointer',
                boxShadow: '0 6px 20px rgba(112, 12, 40, 0.5)',
                transition: 'all 0.2s ease'
              }}
            >
              Register Complaint
            </button>

            <button
              onClick={onTrackClick}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                color: '#ffffff',
                padding: '16px 32px',
                borderRadius: '12px',
                border: '1.5px solid rgba(255, 255, 255, 0.5)',
                fontWeight: 800,
                fontSize: '0.95rem',
                cursor: 'pointer',
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.25)',
                transition: 'all 0.2s ease'
              }}
            >
              Track Complaint Status
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
