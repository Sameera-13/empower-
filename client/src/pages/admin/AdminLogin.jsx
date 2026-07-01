import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function AdminLogin() {
  const { login, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // If already logged in as admin, redirect to dashboard
  if (isAuthenticated && isAdmin) {
    navigate('/admin/dashboard', { replace: true });
    return null;
  }

  const validate = () => {
    const errs = {};
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email';
    if (!form.password) errs.password = 'Password is required';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setLoading(true);
    try {
      const data = await login(form.email, form.password);
      const user = data?.data?.user || data?.user;
      if (user?.role === 'admin') {
        navigate('/admin/dashboard', { replace: true });
      } else {
        setApiError('Access denied. Admin privileges required.');
      }
    } catch (err) {
      setApiError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const set = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <div className="admin-login-page">
      {/* Animated background particles */}
      <div className="admin-login-bg">
        <div className="admin-login-orb admin-login-orb-1" />
        <div className="admin-login-orb admin-login-orb-2" />
        <div className="admin-login-orb admin-login-orb-3" />
        <div className="admin-login-grid" />
      </div>

      <div className="admin-login-container">
        {/* Glass card */}
        <div className="admin-login-card">
          {/* Logo / Brand */}
          <div className="admin-login-brand">
            <div className="admin-login-logo">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <rect width="40" height="40" rx="12" fill="url(#logo-grad)" />
                <path d="M12 28V16l8-6 8 6v12H24v-8h-8v8H12z" fill="white" fillOpacity="0.95" />
                <defs>
                  <linearGradient id="logo-grad" x1="0" y1="0" x2="40" y2="40">
                    <stop stopColor="#FF6B9D" />
                    <stop offset="1" stopColor="#E8457A" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <h1 className="admin-login-title">Admin Panel</h1>
            <p className="admin-login-subtitle">Sign in to access the dashboard</p>
          </div>

          {/* Error message */}
          {apiError && (
            <div className="admin-login-error">
              <svg className="admin-login-error-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {apiError}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="admin-login-form">
            {/* Email Field */}
            <div className="admin-login-field">
              <label className="admin-login-label" htmlFor="admin-email">Email Address</label>
              <div className={`admin-login-input-wrapper ${errors.email ? 'admin-login-input-error' : ''}`}>
                <svg className="admin-login-input-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <input
                  id="admin-email"
                  type="email"
                  value={form.email}
                  onChange={set('email')}
                  placeholder="admin@empowerstop.com"
                  className="admin-login-input"
                  autoComplete="email"
                />
              </div>
              {errors.email && <span className="admin-login-field-error">{errors.email}</span>}
            </div>

            {/* Password Field */}
            <div className="admin-login-field">
              <label className="admin-login-label" htmlFor="admin-password">Password</label>
              <div className={`admin-login-input-wrapper ${errors.password ? 'admin-login-input-error' : ''}`}>
                <svg className="admin-login-input-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={set('password')}
                  placeholder="Enter your password"
                  className="admin-login-input"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="admin-login-toggle-pw"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                      <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                      <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && <span className="admin-login-field-error">{errors.password}</span>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="admin-login-btn"
            >
              {loading ? (
                <span className="admin-login-btn-loading">
                  <svg className="admin-login-spinner" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" strokeDasharray="31.4 31.4" />
                  </svg>
                  Signing in...
                </span>
              ) : (
                <>
                  Sign In
                  <svg className="admin-login-btn-arrow" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="admin-login-footer">
            <a href="/" className="admin-login-back">
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Website
            </a>
          </div>
        </div>

        {/* Security badge */}
        <div className="admin-login-security">
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Protected by SSL encryption
        </div>
      </div>

      <style>{`
        .admin-login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          background: #0F0F1A;
          font-family: 'DM Sans', sans-serif;
        }

        /* Animated background */
        .admin-login-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          overflow: hidden;
        }

        .admin-login-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255, 107, 157, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 107, 157, 0.03) 1px, transparent 1px);
          background-size: 60px 60px;
        }

        .admin-login-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.4;
        }

        .admin-login-orb-1 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, #FF6B9D, transparent);
          top: -100px;
          right: -100px;
          animation: admin-orb-float 8s ease-in-out infinite;
        }

        .admin-login-orb-2 {
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, #6BCB77, transparent);
          bottom: -80px;
          left: -80px;
          animation: admin-orb-float 10s ease-in-out infinite reverse;
        }

        .admin-login-orb-3 {
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, #FFD93D, transparent);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: admin-orb-pulse 6s ease-in-out infinite;
          opacity: 0.15;
        }

        @keyframes admin-orb-float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -20px) scale(1.05); }
          66% { transform: translate(-20px, 15px) scale(0.95); }
        }

        @keyframes admin-orb-pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.15; }
          50% { transform: translate(-50%, -50%) scale(1.3); opacity: 0.25; }
        }

        /* Container */
        .admin-login-container {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 440px;
          padding: 24px;
        }

        /* Glass card */
        .admin-login-card {
          background: rgba(255, 255, 255, 0.04);
          backdrop-filter: blur(40px);
          -webkit-backdrop-filter: blur(40px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          padding: 40px 36px;
          box-shadow:
            0 0 0 1px rgba(255, 255, 255, 0.05),
            0 20px 60px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.08);
          animation: admin-card-enter 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        @keyframes admin-card-enter {
          0% { opacity: 0; transform: translateY(20px) scale(0.97); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* Brand */
        .admin-login-brand {
          text-align: center;
          margin-bottom: 32px;
        }

        .admin-login-logo {
          display: inline-flex;
          margin-bottom: 16px;
          animation: admin-logo-glow 3s ease-in-out infinite;
        }

        @keyframes admin-logo-glow {
          0%, 100% { filter: drop-shadow(0 0 8px rgba(255, 107, 157, 0.3)); }
          50% { filter: drop-shadow(0 0 20px rgba(255, 107, 157, 0.5)); }
        }

        .admin-login-title {
          font-size: 24px;
          font-weight: 700;
          color: #FFFFFF;
          margin: 0 0 6px 0;
          letter-spacing: -0.02em;
        }

        .admin-login-subtitle {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.4);
          margin: 0;
        }

        /* Error */
        .admin-login-error {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 16px;
          border-radius: 12px;
          background: rgba(239, 83, 80, 0.1);
          border: 1px solid rgba(239, 83, 80, 0.2);
          color: #FF7B79;
          font-size: 13px;
          margin-bottom: 24px;
          animation: admin-shake 0.4s ease-in-out;
        }

        .admin-login-error-icon {
          width: 18px;
          height: 18px;
          flex-shrink: 0;
        }

        @keyframes admin-shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-6px); }
          75% { transform: translateX(6px); }
        }

        /* Form */
        .admin-login-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .admin-login-field {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .admin-login-label {
          font-size: 13px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.6);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .admin-login-input-wrapper {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0 16px;
          height: 52px;
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: all 0.25s ease;
        }

        .admin-login-input-wrapper:focus-within {
          border-color: rgba(255, 107, 157, 0.5);
          background: rgba(255, 255, 255, 0.06);
          box-shadow: 0 0 0 3px rgba(255, 107, 157, 0.1), 0 0 20px rgba(255, 107, 157, 0.05);
        }

        .admin-login-input-wrapper.admin-login-input-error {
          border-color: rgba(239, 83, 80, 0.5);
          box-shadow: 0 0 0 3px rgba(239, 83, 80, 0.1);
        }

        .admin-login-input-icon {
          width: 18px;
          height: 18px;
          color: rgba(255, 255, 255, 0.25);
          flex-shrink: 0;
          transition: color 0.25s ease;
        }

        .admin-login-input-wrapper:focus-within .admin-login-input-icon {
          color: #FF6B9D;
        }

        .admin-login-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: #FFFFFF;
          font-size: 15px;
          font-family: inherit;
          padding: 0;
        }

        .admin-login-input::placeholder {
          color: rgba(255, 255, 255, 0.2);
        }

        .admin-login-toggle-pw {
          background: none;
          border: none;
          padding: 4px;
          cursor: pointer;
          color: rgba(255, 255, 255, 0.25);
          transition: color 0.2s ease;
          display: flex;
          align-items: center;
        }

        .admin-login-toggle-pw:hover {
          color: rgba(255, 255, 255, 0.5);
        }

        .admin-login-field-error {
          font-size: 12px;
          color: #FF7B79;
          padding-left: 4px;
        }

        /* Submit button */
        .admin-login-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          height: 52px;
          border: none;
          border-radius: 14px;
          background: linear-gradient(135deg, #FF6B9D, #E8457A);
          color: white;
          font-size: 15px;
          font-weight: 600;
          font-family: inherit;
          cursor: pointer;
          transition: all 0.25s ease;
          margin-top: 4px;
          position: relative;
          overflow: hidden;
        }

        .admin-login-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, transparent 30%, rgba(255, 255, 255, 0.15) 50%, transparent 70%);
          transform: translateX(-100%);
          transition: transform 0.6s ease;
        }

        .admin-login-btn:hover::before {
          transform: translateX(100%);
        }

        .admin-login-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 30px rgba(255, 107, 157, 0.35);
        }

        .admin-login-btn:active {
          transform: translateY(0);
          box-shadow: 0 2px 10px rgba(255, 107, 157, 0.2);
        }

        .admin-login-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        .admin-login-btn-arrow {
          width: 18px;
          height: 18px;
          transition: transform 0.2s ease;
        }

        .admin-login-btn:hover .admin-login-btn-arrow {
          transform: translateX(3px);
        }

        .admin-login-btn-loading {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .admin-login-spinner {
          width: 20px;
          height: 20px;
          animation: admin-spin 1s linear infinite;
        }

        @keyframes admin-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Footer */
        .admin-login-footer {
          margin-top: 24px;
          text-align: center;
        }

        .admin-login-back {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.35);
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .admin-login-back:hover {
          color: rgba(255, 255, 255, 0.7);
        }

        /* Security badge */
        .admin-login-security {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 20px;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.2);
        }

        /* Responsive */
        @media (max-width: 480px) {
          .admin-login-container {
            padding: 16px;
          }
          .admin-login-card {
            padding: 28px 24px;
            border-radius: 20px;
          }
        }
      `}</style>
    </div>
  );
}
