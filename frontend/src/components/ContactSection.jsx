import React, { useState } from 'react';
import { Phone, Mail, Instagram, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          message: formData.message,
          serviceInterest: 'Direct Website Contact Inquiry'
        })
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" style={{ padding: '100px 0', position: 'relative' }}>
      <div className="container">
        <div className="text-center">
          <div className="section-tag">Let’s Talk Growth</div>
          <h2 className="section-title">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="section-desc">
            We're based in Bangalore and available for projects everywhere. Reach out to kickstart your brand’s next breakthrough.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', marginTop: '50px' }}>
          {/* Direct Channels */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '18px', padding: '24px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fbbf24' }}>
                <Phone size={22} />
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600 }}>Phone / WhatsApp</div>
                <a href="tel:+917204511681" style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff' }}>
                  +91 72045 11681
                </a>
              </div>
            </div>

            <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '18px', padding: '24px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(56, 189, 248, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38bdf8' }}>
                <Mail size={22} />
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600 }}>Official Email</div>
                <a href="mailto:pccreation295@gmail.com" style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff' }}>
                  pccreation295@gmail.com
                </a>
              </div>
            </div>

            <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '18px', padding: '24px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(225, 29, 72, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#e11d48' }}>
                <Instagram size={22} />
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600 }}>Instagram Profile</div>
                <a href="https://instagram.com/pc_creations_1" target="_blank" rel="noopener noreferrer" style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>
                  @pc_creations_1
                </a>
              </div>
            </div>

            <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '18px', padding: '24px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981' }}>
                <MapPin size={22} />
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600 }}>Bangalore Offices</div>
                <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff' }}>
                  Rajajinagar & Indiranagar
                </div>
              </div>
            </div>
          </div>

          {/* Inline Inquiry Form */}
          <div className="glass-card">
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>
              Send a Direct Message
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '24px' }}>
              Have a custom inquiry or need custom ad campaign production? Leave your message below.
            </p>

            {submitted ? (
              <div style={{ padding: '24px', background: 'rgba(16, 185, 129, 0.12)', border: '1px solid #10b981', borderRadius: '12px', textAlign: 'center' }}>
                <CheckCircle2 size={36} color="#10b981" style={{ margin: '0 auto 10px' }} />
                <h4 style={{ color: '#fff', marginBottom: '6px' }}>Message Received</h4>
                <p style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>
                  Thanks for getting in touch! We will call or email you right back.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Arun"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Phone</label>
                    <input
                      type="tel"
                      required
                      placeholder="72045 11681"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      required
                      placeholder="arun@brand.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="form-input"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea
                    rows="3"
                    required
                    placeholder="Tell us what you're looking for..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="form-textarea"
                  ></textarea>
                </div>
                <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%' }}>
                  <Send size={16} />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
