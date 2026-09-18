import React, { useState } from 'react';
import { X, Lock, Mail, User, Sparkles, CheckCircle, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

export default function LmsAuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'register'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError('');
  };

  const handleDemoLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'student@pccreations.agency',
          password: 'pccreations123'
        })
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem('pc_lms_token', data.token);
        localStorage.setItem('pc_lms_user', JSON.stringify(data.user));
        setSuccessMsg('Logged in as Demo Student! Redirecting...');
        setTimeout(() => {
          onLoginSuccess(data.user, data.token);
          onClose();
        }, 600);
      } else {
        setError(data.message || 'Demo login failed');
      }
    } catch (err) {
      setError('Connection error. Please check server.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (activeTab === 'register') {
      if (!formData.name.trim()) {
        setError('Please enter your full name');
        setLoading(false);
        return;
      }
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters');
        setLoading(false);
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        setLoading(false);
        return;
      }
    }

    const endpoint = activeTab === 'login' ? '/api/auth/login' : '/api/auth/register';
    const payload = activeTab === 'login' 
      ? { email: formData.email, password: formData.password }
      : { name: formData.name, email: formData.email, password: formData.password };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (data.success) {
        localStorage.setItem('pc_lms_token', data.token);
        localStorage.setItem('pc_lms_user', JSON.stringify(data.user));
        setSuccessMsg(data.message || 'Authenticated successfully!');
        setTimeout(() => {
          onLoginSuccess(data.user, data.token);
          onClose();
        }, 600);
      } else {
        setError(data.message || 'Authentication failed');
      }
    } catch (err) {
      setError('Could not connect to authentication service');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay lms-auth-overlay" onClick={onClose}>
      <div 
        className="modal-card lms-auth-card" 
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          className="modal-close-btn" 
          onClick={onClose}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div className="lms-auth-header">
          <div className="lms-badge-pill">
            <Sparkles size={14} />
            <span>PC Creations Academy LMS</span>
          </div>
          <h2>{activeTab === 'login' ? 'Student Portal Access' : 'Create Student Account'}</h2>
          <p className="lms-auth-subtitle">
            {activeTab === 'login' 
              ? 'Sign in to access your registered courses, video modules, and certifications.' 
              : 'Join Bangalore’s fastest-growing digital marketing & video production cohort.'}
          </p>
        </div>

        {/* 1-Click Demo Login Banner */}
        <div className="lms-demo-login-box">
          <div className="lms-demo-info">
            <ShieldCheck size={20} className="lms-demo-icon" />
            <div>
              <span className="lms-demo-title">Test Demo Student Account</span>
              <span className="lms-demo-desc">Instant access to enrolled Meta Ads & Reels courses</span>
            </div>
          </div>
          <button 
            type="button" 
            className="btn btn-demo" 
            onClick={handleDemoLogin}
            disabled={loading}
          >
            {loading ? 'Logging in...' : '1-Click Demo Login ⚡'}
          </button>
        </div>

        <div className="lms-divider">
          <span>OR CONTINUE WITH YOUR EMAIL</span>
        </div>

        {/* Tab Selector */}
        <div className="lms-auth-tabs">
          <button 
            type="button"
            className={`lms-auth-tab ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => { setActiveTab('login'); setError(''); setSuccessMsg(''); }}
          >
            Sign In
          </button>
          <button 
            type="button"
            className={`lms-auth-tab ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => { setActiveTab('register'); setError(''); setSuccessMsg(''); }}
          >
            New Registration
          </button>
        </div>

        {error && (
          <div className="lms-auth-alert lms-auth-error">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="lms-auth-alert lms-auth-success">
            <CheckCircle size={18} />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="lms-auth-form">
          {activeTab === 'register' && (
            <div className="form-group">
              <label className="form-label" htmlFor="auth-name">Full Name</label>
              <div className="lms-input-wrapper">
                <User size={18} className="lms-input-icon" />
                <input 
                  id="auth-name"
                  type="text" 
                  name="name" 
                  className="form-input lms-form-input" 
                  placeholder="e.g. Arjun Sharma"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <label className="form-label" htmlFor="auth-email">Email Address</label>
            <div className="lms-input-wrapper">
              <Mail size={18} className="lms-input-icon" />
              <input 
                id="auth-email"
                type="email" 
                name="email" 
                className="form-input lms-form-input" 
                placeholder="you@company.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="auth-password">Password</label>
            <div className="lms-input-wrapper">
              <Lock size={18} className="lms-input-icon" />
              <input 
                id="auth-password"
                type="password" 
                name="password" 
                className="form-input lms-form-input" 
                placeholder="Enter password (min 6 characters)"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {activeTab === 'register' && (
            <div className="form-group">
              <label className="form-label" htmlFor="auth-confirm">Confirm Password</label>
              <div className="lms-input-wrapper">
                <Lock size={18} className="lms-input-icon" />
                <input 
                  id="auth-confirm"
                  type="password" 
                  name="confirmPassword" 
                  className="form-input lms-form-input" 
                  placeholder="Re-enter your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          )}

          <button 
            type="submit" 
            className="btn btn-primary btn-block lms-submit-btn" 
            disabled={loading}
          >
            <span>{loading ? 'Authenticating...' : (activeTab === 'login' ? 'Enter LMS Portal' : 'Create Free Account')}</span>
            <ArrowRight size={18} />
          </button>
        </form>

        <div className="lms-auth-footer-note">
          <span>🔒 Industry-standard SSL encryption. Only authorized enrolled students can access video lessons and certifications.</span>
        </div>
      </div>
    </div>
  );
}
