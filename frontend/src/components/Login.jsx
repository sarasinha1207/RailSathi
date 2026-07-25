import React, { useState } from 'react';

export default function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

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

  return (
    <div className="login-wrapper w-full flex justify-center items-center py-12">
      <div className="login-card bg-white rounded-lg shadow-md border border-solid border-[var(--border-color)] w-full max-w-[420px] p-8 flex flex-col gap-5">
        <div className="login-card-header text-center border-b-2 border-solid border-[var(--border-color)] pb-4">
          <h3 className="m-0 text-[var(--primary-color)] text-xl font-bold">Official Login</h3>
          <p className="m-1 text-[var(--text-muted)] text-sm font-semibold">RailSathi Officials Portal</p>
        </div>

        {errorMsg && (
          <div className="login-error-alert bg-[#fef2f2] border-l-4 border-solid border-[var(--error-color)] p-3 rounded-md flex items-center gap-2">
            <span className="error-icon text-[var(--error-color)] font-bold text-sm">⚠</span>
            <span className="error-text text-[#991b1b] font-semibold text-xs">{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form flex flex-col gap-4">
          <div className="form-group-login flex flex-col gap-1.5">
            <label className="text-xs font-bold text-[var(--text-color)]">Username</label>
            <input 
              type="text" 
              required 
              placeholder="Enter official username"
              className="w-full border border-solid border-[var(--border-color)] p-2.5 rounded-md bg-[#fafbfc] outline-none transition-all text-sm focus:border-[var(--primary-color)]"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="form-group-login flex flex-col gap-1.5">
            <label className="text-xs font-bold text-[var(--text-color)]">Password</label>
            <input 
              type="password" 
              required 
              placeholder="Enter password"
              className="w-full border border-solid border-[var(--border-color)] p-2.5 rounded-md bg-[#fafbfc] outline-none transition-all text-sm focus:border-[var(--primary-color)]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
            type="submit" 
            className="btn-submit login-btn mt-2.5 w-full py-3 bg-[var(--primary-color)] text-white font-bold rounded-md hover:bg-[var(--primary-hover)] transition-all cursor-pointer border-none"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
