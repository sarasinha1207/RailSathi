import React, { useState, useEffect } from 'react';

export default function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState(() => {
    return localStorage.getItem('railsathi_remember_username') || '';
  });
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(() => {
    return localStorage.getItem('railsathi_remember_me') === 'true';
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [errors, setErrors] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    
    // Required field validation
    let hasError = false;
    const newErrors = { username: '', password: '' };
    if (!username.trim()) {
      newErrors.username = 'Official Username / User ID is required.';
      hasError = true;
    }
    if (!password) {
      newErrors.password = 'Password is required.';
      hasError = true;
    }
    setErrors(newErrors);
    if (hasError) return;

    setLoading(true);

    try {
      const res = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (res.ok) {
        const data = await res.json();
        if (rememberMe) {
          localStorage.setItem('railsathi_remember_username', username);
          localStorage.setItem('railsathi_remember_me', 'true');
        } else {
          localStorage.removeItem('railsathi_remember_username');
          localStorage.setItem('railsathi_remember_me', 'false');
        }
        onLoginSuccess(data.username, data.role);
      } else {
        const err = await res.json();
        setErrorMsg(err.detail || 'Invalid Username or Password!');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('A connection error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    alert("For password reset, please contact your division system administrator or the IT Helpdesk at support@railsathi.gov.in.");
  };

  return (
    <div className="login-wrapper w-full flex justify-center items-center py-28 px-4">
      <div className="login-card bg-white rounded-xl shadow-lg border border-solid border-[var(--border-color)] w-full max-w-[500px] p-12 flex flex-col gap-10">
        <div className="login-card-header text-center border-b border-solid border-[var(--border-color)] pb-8">
          <div className="flex justify-center mb-4">
            <div className="w-14 h-14 rounded-full bg-[#fdf2f2] border border-solid border-[var(--primary-color)] flex items-center justify-center text-[var(--primary-color)]">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
          </div>
          <h3 className="m-0 text-[var(--primary-color)] text-2xl font-bold tracking-wide">
            RailSathi Official Portal
          </h3>
          <p className="mt-2 mb-0 text-[var(--text-muted)] text-sm font-semibold leading-relaxed">
            Secure access for Railway Officials & Authorized Staff
          </p>
        </div>

        {errorMsg && (
          <div className="login-error-alert bg-[#fef2f2] border-l-4 border-solid border-[var(--error-color)] p-4 rounded-md flex items-start gap-2.5">
            <span className="error-icon text-[var(--error-color)] font-bold text-sm leading-none mt-0.5">⚠</span>
            <span className="error-text text-[#991b1b] font-semibold text-xs leading-normal">{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form flex flex-col gap-6" noValidate>
          <div className="form-group-login flex flex-col gap-2.5">
            <label className="text-xs font-bold text-[var(--text-color)]">
              Official Username / User ID <span className="text-[var(--error-color)]">*</span>
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 flex items-center pointer-events-none text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </span>
              <input 
                type="text" 
                placeholder="Enter official username"
                className={`w-full border border-solid rounded-md bg-[#fafbfc] outline-none transition-all text-sm focus:bg-white focus:border-[var(--primary-color)] focus:ring-1 focus:ring-[var(--primary-color)] ${errors.username ? 'border-[var(--error-color)] focus:border-[var(--error-color)] focus:ring-[var(--error-color)]' : 'border-[var(--border-color)]'}`}
                style={{ paddingLeft: '3rem' }}
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (errors.username) setErrors(prev => ({ ...prev, username: '' }));
                }}
              />
            </div>
            {errors.username && (
              <span className="text-[10px] text-[var(--error-color)] font-bold mt-0.5 pl-1">
                {errors.username}
              </span>
            )}
          </div>

          <div className="form-group-login flex flex-col gap-2.5">
            <label className="text-xs font-bold text-[var(--text-color)]">
              Password <span className="text-[var(--error-color)]">*</span>
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 flex items-center pointer-events-none text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </span>
              <input 
                type={showPassword ? 'text' : 'password'} 
                placeholder="Enter password"
                className={`w-full border border-solid rounded-md bg-[#fafbfc] outline-none transition-all text-sm focus:bg-white focus:border-[var(--primary-color)] focus:ring-1 focus:ring-[var(--primary-color)] ${errors.password ? 'border-[var(--error-color)] focus:border-[var(--error-color)] focus:ring-[var(--error-color)]' : 'border-[var(--border-color)]'}`}
                style={{ paddingLeft: '3rem', paddingRight: '3rem' }}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors(prev => ({ ...prev, password: '' }));
                }}
              />
              <button 
                type="button"
                onClick={() => setShowPassword(prev => !prev)}
                className="absolute right-3.5 cursor-pointer flex items-center text-gray-400 hover:text-[var(--primary-color)] border-none bg-transparent p-0 outline-none"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                    <path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                    <line x1="2" x2="22" y1="2" y2="22" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <span className="text-[10px] text-[var(--error-color)] font-bold mt-0.5 pl-1">
                {errors.password}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between mt-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-[var(--text-muted)] font-semibold select-none">
              <input 
                type="checkbox" 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-gray-300 text-[var(--primary-color)] focus:ring-[var(--primary-color)] cursor-pointer w-4 h-4 accent-[#700c28]"
              />
              Remember Me
            </label>
            <button 
              type="button" 
              onClick={handleForgotPassword}
              className="text-xs font-bold text-[var(--primary-color)] hover:text-[var(--primary-hover)] hover:underline cursor-pointer border-none bg-transparent p-0 outline-none"
            >
              Forgot Password?
            </button>
          </div>

          <button 
            type="submit" 
            className="btn-submit login-btn mt-6 w-full py-3.5 bg-[var(--primary-color)] text-white font-bold rounded-md hover:bg-[var(--primary-hover)] transition-all cursor-pointer border-none shadow-sm hover:shadow active:scale-[0.99] flex items-center justify-center gap-2"
            disabled={loading}
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </>
            ) : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
