import React, { useState, useEffect } from 'react';

const IconCogHeader = () => (
  <svg style={{ width: '24px', height: '24px', color: '#ffb300' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const IconUser = () => (
  <svg style={{ width: '20px', height: '20px', color: '#800020' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const IconKey = () => (
  <svg style={{ width: '20px', height: '20px', color: '#800020' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
  </svg>
);

const IconBell = () => (
  <svg style={{ width: '20px', height: '20px', color: '#800020' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);

export default function SettingsPage({ user }) {
  // Toast notification state
  const [toastMessage, setToastMessage] = useState(null);
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // 1. Profile state
  const [profileData, setProfileData] = useState({
    full_name: user?.full_name || user?.username || 'User',
    email: user?.email || '',
    phone_number: user?.phone_number || '',
    role: user?.role || 'Admin',
    username: user?.username || '',
    user_id: user?.user_id || 'USR_01',
    department_name: 'Commercial & Operations',
    division_name: 'Delhi Division (Northern Railway)',
    working_hours: '09:00 AM - 06:00 PM (Break Time: 01:00 PM - 02:00 PM)',
    working_days: 'Mon, Tue, Wed, Thu, Fri'
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);

  // Fetch profile from API on mount
  useEffect(() => {
    fetch('/api/v1/auth/user-profile')
      .then(res => res.json())
      .then(data => {
        if (data && data.status === 'success') {
          setProfileData(prev => ({
            ...prev,
            ...data
          }));
        }
      })
      .catch(err => console.error('Failed to load profile:', err));
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setProfileLoading(true);
    try {
      const res = await fetch('/api/v1/auth/update-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: profileData.email,
          phone_number: profileData.phone_number,
          full_name: profileData.full_name
        })
      });
      const data = await res.json();
      if (res.ok && data.status === 'success') {
        showToast('Profile information updated successfully!');
        setIsEditingProfile(false);
      } else {
        showToast(data.detail || 'Failed to update profile');
      }
    } catch (err) {
      showToast('Network error updating profile');
    } finally {
      setProfileLoading(false);
    }
  };

  // 2. Password change state (New Password & Confirm New Password ONLY)
  const [passwordState, setPasswordState] = useState({
    new_password: '',
    confirm_password: ''
  });
  const [passwordLoading, setPasswordLoading] = useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwordState.new_password !== passwordState.confirm_password) {
      showToast('New Password and Confirm Password do not match!');
      return;
    }
    if (passwordState.new_password.length < 6) {
      showToast('New password must be at least 6 characters long');
      return;
    }

    setPasswordLoading(true);
    try {
      const res = await fetch('/api/v1/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          new_password: passwordState.new_password
        })
      });
      const data = await res.json();
      if (res.ok && data.status === 'success') {
        showToast('Security password updated successfully!');
        setPasswordState({ new_password: '', confirm_password: '' });
      } else {
        showToast(data.detail || 'Failed to update password');
      }
    } catch (err) {
      showToast('Error changing password');
    } finally {
      setPasswordLoading(false);
    }
  };

  // 3. Notification preferences (stored in localStorage)
  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem('railsathi_notifications');
      return saved ? JSON.parse(saved) : {
        email_alerts: true,
        sms_alerts: true,
        audio_chime: true,
        weekly_digest: false
      };
    } catch (e) {
      return { email_alerts: true, sms_alerts: true, audio_chime: true, weekly_digest: false };
    }
  });

  const toggleNotification = (key) => {
    const updated = { ...notifications, [key]: !notifications[key] };
    setNotifications(updated);
    try {
      localStorage.setItem('railsathi_notifications', JSON.stringify(updated));
      showToast('Notification preferences saved');
    } catch (e) { }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', maxWidth: '1000px', margin: '0 auto', paddingBottom: '48px', fontFamily: "'Outfit', 'Segoe UI', system-ui, sans-serif" }}>

      {/* Toast Notification */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          top: '24px',
          right: '24px',
          backgroundColor: '#800020',
          color: '#ffffff',
          padding: '14px 22px',
          borderRadius: '10px',
          fontWeight: 700,
          fontSize: '0.9rem',
          boxShadow: '0 8px 24px rgba(128, 0, 32, 0.35)',
          zIndex: 9999,
          borderLeft: '4px solid #ffb300'
        }}>
          {toastMessage}
        </div>
      )}

      {/* Header Banner */}
      <div style={{
        backgroundColor: '#360412',
        borderRadius: '16px',
        padding: '28px 34px',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 10px 28px rgba(54, 4, 18, 0.25)',
        borderLeft: '6px solid #e65c00',
        background: 'linear-gradient(135deg, #360412 0%, #58081f 100%)'
      }}>
        <div>
          <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#ffb300', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '4px' }}>
            Operational Control Panel
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.3px', color: '#ffffff' }}>
            Dashboard Settings & User Preferences
          </div>
          <div style={{ fontSize: '0.92rem', color: '#f0b8c4', marginTop: '4px', fontWeight: 500 }}>
            Manage your official account profile, security credentials, and notification triggers.
          </div>
        </div>
        <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: '14px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <IconCogHeader />
        </div>
      </div>

      {/* SECTION 1: USER ACCOUNT & ROLE PROFILE (VERTICAL LAYOUT WITHOUT CARDS) */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '14px', padding: '28px 32px', border: '1px solid #e5e7eb', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '22px', borderBottom: '2.5px solid #f3d0d8', paddingBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <IconUser />
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#800020', margin: 0 }}>
              Profile Details
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setIsEditingProfile(!isEditingProfile)}
            style={{
              padding: '7px 16px',
              backgroundColor: isEditingProfile ? '#f3f4f6' : '#800020',
              color: isEditingProfile ? '#374151' : '#ffffff',
              border: isEditingProfile ? '1px solid #d1d5db' : 'none',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '0.82rem',
              cursor: 'pointer',
              boxShadow: isEditingProfile ? 'none' : '0 2px 6px rgba(128,0,32,0.2)'
            }}
          >
            {isEditingProfile ? 'Cancel Edit' : 'Edit Profile Info'}
          </button>
        </div>

        {!isEditingProfile ? (
          /* Vertical Clean Label-Value List */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            <div style={{ display: 'flex', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
              <div style={{ width: '220px', fontSize: '0.86rem', fontWeight: 800, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.4px' }}>Full Name</div>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: '#111827' }}>{profileData.full_name}</div>
            </div>

            <div style={{ display: 'flex', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
              <div style={{ width: '220px', fontSize: '0.86rem', fontWeight: 800, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.4px' }}>Username & User ID</div>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: '#111827' }}>{profileData.username} ({profileData.user_id})</div>
            </div>

            <div style={{ display: 'flex', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px', alignItems: 'center' }}>
              <div style={{ width: '220px', fontSize: '0.86rem', fontWeight: 800, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.4px' }}>Designated Role</div>
              <div>
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#800020', backgroundColor: '#fde8ed', padding: '4px 12px', borderRadius: '12px' }}>
                  {profileData.role}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
              <div style={{ width: '220px', fontSize: '0.86rem', fontWeight: 800, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.4px' }}>Official Email</div>
              <div style={{ fontSize: '0.96rem', fontWeight: 700, color: '#1f2937' }}>{profileData.email || 'Not Configured'}</div>
            </div>

            <div style={{ display: 'flex', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
              <div style={{ width: '220px', fontSize: '0.86rem', fontWeight: 800, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.4px' }}>Contact Mobile Phone</div>
              <div style={{ fontSize: '0.96rem', fontWeight: 700, color: '#1f2937' }}>{profileData.phone_number || 'Not Configured'}</div>
            </div>

            <div style={{ display: 'flex', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
              <div style={{ width: '220px', fontSize: '0.86rem', fontWeight: 800, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.4px' }}>Assigned Department</div>
              <div style={{ fontSize: '0.96rem', fontWeight: 700, color: '#1f2937' }}>{profileData.department_name || 'Commercial'}</div>
            </div>

            <div style={{ display: 'flex', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
              <div style={{ width: '220px', fontSize: '0.86rem', fontWeight: 800, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.4px' }}>Assigned Division / Zone</div>
              <div style={{ fontSize: '0.96rem', fontWeight: 700, color: '#1f2937' }}>{profileData.division_name || 'Delhi Division (Northern Railway)'}</div>
            </div>

            <div style={{ display: 'flex', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
              <div style={{ width: '220px', fontSize: '0.86rem', fontWeight: 800, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.4px' }}>Working Hours</div>
              <div style={{ fontSize: '0.96rem', fontWeight: 800, color: '#800020' }}>
                {profileData.working_hours}
              </div>
            </div>

            <div style={{ display: 'flex', paddingBottom: '4px' }}>
              <div style={{ width: '220px', fontSize: '0.86rem', fontWeight: 800, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.4px' }}>Working Days</div>
              <div style={{ fontSize: '0.96rem', fontWeight: 800, color: '#800020' }}>
                {profileData.working_days}
              </div>
            </div>

          </div>
        ) : (
          <form onSubmit={handleUpdateProfile} style={{ display: 'flex', flexDirection: 'column', gap: '16px', backgroundColor: '#fcf8f9', padding: '22px', borderRadius: '10px', border: '1px solid #f3d0d8' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '0.84rem', fontWeight: 700, color: '#374151' }}>Full Name:</label>
                <input
                  type="text"
                  value={profileData.full_name}
                  onChange={e => setProfileData({ ...profileData, full_name: e.target.value })}
                  style={{ padding: '9px 12px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '0.9rem' }}
                  required
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '0.84rem', fontWeight: 700, color: '#374151' }}>Official Email Address:</label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={e => setProfileData({ ...profileData, email: e.target.value })}
                  style={{ padding: '9px 12px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '0.9rem' }}
                  required
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '0.84rem', fontWeight: 700, color: '#374151' }}>Contact Mobile Phone Number:</label>
                <input
                  type="text"
                  value={profileData.phone_number}
                  onChange={e => setProfileData({ ...profileData, phone_number: e.target.value })}
                  style={{ padding: '9px 12px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '0.9rem' }}
                  required
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '0.84rem', fontWeight: 700, color: '#374151' }}>Working Hours & Break Schedule:</label>
                <input
                  type="text"
                  value={profileData.working_hours}
                  onChange={e => setProfileData({ ...profileData, working_hours: e.target.value })}
                  style={{ padding: '9px 12px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '0.9rem' }}
                  required
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '0.84rem', fontWeight: 700, color: '#374151' }}>Working Days:</label>
                <input
                  type="text"
                  value={profileData.working_days}
                  onChange={e => setProfileData({ ...profileData, working_days: e.target.value })}
                  style={{ padding: '9px 12px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '0.9rem' }}
                  required
                />
              </div>

            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
              <button
                type="submit"
                disabled={profileLoading}
                style={{ padding: '9px 24px', backgroundColor: '#800020', color: '#ffffff', border: 'none', borderRadius: '6px', fontWeight: 700, fontSize: '0.86rem', cursor: 'pointer' }}
              >
                {profileLoading ? 'Saving...' : 'Save Profile Changes'}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* SECTION 2: SECURITY & PASSWORD CREDENTIALS (NEW PASSWORD & CONFIRM PASSWORD ONLY) */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '14px', padding: '28px 32px', border: '1px solid #e5e7eb', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px', borderBottom: '2.5px solid #f3d0d8', paddingBottom: '12px' }}>
          <IconKey />
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#800020', margin: 0 }}>
            Security & Password Credentials
          </h2>
        </div>

        <form onSubmit={handleChangePassword} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '18px', alignItems: 'end' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label style={{ fontSize: '0.84rem', fontWeight: 700, color: '#374151' }}>New Password:</label>
            <input
              type="password"
              placeholder="Min 6 characters"
              value={passwordState.new_password}
              onChange={e => setPasswordState({ ...passwordState, new_password: e.target.value })}
              style={{ padding: '9px 12px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '0.88rem' }}
              required
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label style={{ fontSize: '0.84rem', fontWeight: 700, color: '#374151' }}>Confirm New Password:</label>
            <input
              type="password"
              placeholder="Re-type new password"
              value={passwordState.confirm_password}
              onChange={e => setPasswordState({ ...passwordState, confirm_password: e.target.value })}
              style={{ padding: '9px 12px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '0.88rem' }}
              required
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={passwordLoading}
              style={{
                width: '100%',
                padding: '10px 18px',
                backgroundColor: '#800020',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                fontWeight: 700,
                fontSize: '0.86rem',
                cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(128,0,32,0.2)'
              }}
            >
              {passwordLoading ? 'Updating Password...' : 'Update Password'}
            </button>
          </div>
        </form>
      </div>

      {/* SECTION 3: OPERATIONAL NOTIFICATION TRIGGERS */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '14px', padding: '28px 32px', border: '1px solid #e5e7eb', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px', borderBottom: '2.5px solid #f3d0d8', paddingBottom: '12px' }}>
          <IconBell />
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#800020', margin: 0 }}>
            Operational Notification Triggers
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', backgroundColor: '#fcf8f9', borderRadius: '8px', border: '1px solid #f3d0d8' }}>
            <div>
              <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#111827' }}>Email Alerts for Queue Complaints</div>
              <div style={{ fontSize: '0.82rem', color: '#6b7280' }}>Send instant email notification when a complaint is verified or assigned to your control room.</div>
            </div>
            <input
              type="checkbox"
              checked={notifications.email_alerts}
              onChange={() => toggleNotification('email_alerts')}
              style={{ width: '18px', height: '18px', accentColor: '#800020', cursor: 'pointer' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', backgroundColor: '#fcf8f9', borderRadius: '8px', border: '1px solid #f3d0d8' }}>
            <div>
              <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#111827' }}>SMS Operational Dispatches</div>
              <div style={{ fontSize: '0.82rem', color: '#6b7280' }}>Send SMS alerts for critical safety and security dispatches to field personnel.</div>
            </div>
            <input
              type="checkbox"
              checked={notifications.sms_alerts}
              onChange={() => toggleNotification('sms_alerts')}
              style={{ width: '18px', height: '18px', accentColor: '#800020', cursor: 'pointer' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', backgroundColor: '#fcf8f9', borderRadius: '8px', border: '1px solid #f3d0d8' }}>
            <div>
              <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#111827' }}>Dashboard Audio Chime & Toast</div>
              <div style={{ fontSize: '0.82rem', color: '#6b7280' }}>Play sound notification when new complaints arrive in the active workspace queue.</div>
            </div>
            <input
              type="checkbox"
              checked={notifications.audio_chime}
              onChange={() => toggleNotification('audio_chime')}
              style={{ width: '18px', height: '18px', accentColor: '#800020', cursor: 'pointer' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', backgroundColor: '#fcf8f9', borderRadius: '8px', border: '1px solid #f3d0d8' }}>
            <div>
              <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#111827' }}>Weekly SLA Performance Summary</div>
              <div style={{ fontSize: '0.82rem', color: '#6b7280' }}>Receive weekly automated analytics digest covering departmental resolution performance.</div>
            </div>
            <input
              type="checkbox"
              checked={notifications.weekly_digest}
              onChange={() => toggleNotification('weekly_digest')}
              style={{ width: '18px', height: '18px', accentColor: '#800020', cursor: 'pointer' }}
            />
          </div>

        </div>
      </div>

    </div>
  );
}
