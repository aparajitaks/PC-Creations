import React, { useState, useEffect } from 'react';
import API_BASE from '../config/api';
import { X, CheckCircle, ArrowRight, Loader2, Sparkles } from 'lucide-react';

export default function BookingModal({ isOpen, onClose, initialService, initialPlan, initialBudget }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    serviceInterest: initialService || 'Meta & Google Ads Growth',
    planInterest: initialPlan || 'Standard (Growth pack)',
    monthlyBudget: initialBudget || '₹25,000 - ₹50,000',
    message: '',
  });

  const [status, setStatus] = useState({ loading: false, success: false, error: null });

  useEffect(() => {
    if (initialService) setFormData(prev => ({ ...prev, serviceInterest: initialService }));
    if (initialPlan) setFormData(prev => ({ ...prev, planInterest: initialPlan }));
    if (initialBudget) setFormData(prev => ({ ...prev, monthlyBudget: initialBudget }));
  }, [initialService, initialPlan, initialBudget]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });

    try {
      const response = await fetch(`${API_BASE}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus({ loading: false, success: true, error: null });
      } else {
        setStatus({ loading: false, success: false, error: data.message || 'Failed to submit.' });
      }
    } catch (err) {
      console.error(err);
      setStatus({ loading: false, success: false, error: 'Network error. Please try again.' });
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={22} />
        </button>

        {status.success ? (
          <div style={{ textAlign: 'center', padding: '30px 10px' }}>
            <div style={{ display: 'inline-flex', padding: '16px', background: 'rgba(16, 185, 129, 0.15)', borderRadius: '50%', marginBottom: '20px' }}>
              <CheckCircle size={48} color="#10b981" />
            </div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', color: '#fff', marginBottom: '12px' }}>
              Strategy Call Booked!
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: 1.6, maxWidth: '440px', margin: '0 auto 24px' }}>
              Thank you, <strong>{formData.name}</strong>! Your brand growth audit request has been sent to the PC Creations strategy team. A senior strategist will connect with you within 30 minutes.
            </p>
            <button className="btn btn-primary" onClick={onClose}>
              Close & Explore Website
            </button>
          </div>
        ) : (
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#fbbf24', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px' }}>
              <Sparkles size={16} /> Free Growth Consultation
            </div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>
              Claim Your Brand Audit
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.92rem', marginBottom: '24px' }}>
              Get a tailored blueprint showing how to scale your brand with AI-powered marketing, high-converting video shoots, and paid ad funnels.
            </p>

            {status.error && (
              <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid #ef4444', borderRadius: '8px', padding: '12px', color: '#fca5a5', fontSize: '0.88rem', marginBottom: '18px' }}>
                {status.error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="e.g. Arun Kumar"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="e.g. 72045 11681"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Business Email *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="arun@brand.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Company / Brand Name</label>
                  <input
                    type="text"
                    name="businessName"
                    placeholder="e.g. Urban Attire"
                    value={formData.businessName}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Service of Interest</label>
                  <select
                    name="serviceInterest"
                    value={formData.serviceInterest}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="Google Ads">Google Ads (Search & Display)</option>
                    <option value="SMM">SMM (Social Media Marketing)</option>
                    <option value="Meta Ads">Meta Ads (Instagram & Facebook)</option>
                    <option value="Graphic Design">Graphic Design & Festival Posters</option>
                    <option value="Video & Shoots">Greenscreen Video & Shoots</option>
                    <option value="Podcast">Podcast Production & Distribution</option>
                    <option value="Website">Website & E-commerce Development</option>
                    <option value="Mobile Apps">Mobile App Development</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Preferred Plan</label>
                  <select
                    name="planInterest"
                    value={formData.planInterest}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="BASIC (Starter pack)">BASIC (Starter pack)</option>
                    <option value="STANDARD (Growth pack)">STANDARD (Growth pack - Recommended)</option>
                    <option value="CUSTOMIZED (Premium pack)">CUSTOMIZED (Premium pack)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Monthly Ad Budget</label>
                <select
                  name="monthlyBudget"
                  value={formData.monthlyBudget}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="₹15,000 - ₹30,000">₹15,000 - ₹30,000 / month</option>
                  <option value="₹30,000 - ₹75,000">₹30,000 - ₹75,000 / month</option>
                  <option value="₹75,000 - ₹2,00,000">₹75,000 - ₹2,00,000 / month</option>
                  <option value="₹2,00,000+">₹2,00,000+ / month</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Tell Us About Your Brand Goals (Optional)</label>
                <textarea
                  name="message"
                  rows="3"
                  placeholder="What is your biggest marketing bottleneck right now?"
                  value={formData.message}
                  onChange={handleChange}
                  className="form-textarea"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status.loading}
                className="btn btn-primary btn-lg"
                style={{ width: '100%' }}
              >
                {status.loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Submitting Request...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm Free Consultation</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
