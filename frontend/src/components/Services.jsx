import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Services({ onSelectService }) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/content/services')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setServices(data.data);
        }
      })
      .catch(err => console.error('Error fetching services:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="services" className="services-section">
      <div className="container">
        <div className="text-center">
          <div className="section-tag">End-to-End Capabilities</div>
          <h2 className="section-title">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="section-desc">
            Full-spectrum digital marketing solutions tailored for growing brands in Bangalore and beyond.
          </p>
        </div>

        <div className="services-grid">
          {services.map((svc) => (
            <div key={svc.id} className="service-card">
              <div className="service-card-top">
                <div className="service-header">
                  <div className="service-code-box">{svc.code}</div>
                  <span className="badge badge-amber">{svc.badge}</span>
                </div>

                <h3 className="service-title">{svc.title}</h3>
                <p className="service-description">{svc.description}</p>

                <ul className="service-features-list">
                  {svc.features.map((feat, idx) => (
                    <li key={idx} className="service-feature-item">
                      <CheckCircle2 size={16} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="service-card-footer">
                <div>
                  <div className="service-deliverable-label">Deliverables</div>
                  <div style={{ fontSize: '0.82rem', color: '#94a3b8', fontWeight: 500 }}>
                    {svc.deliverables}
                  </div>
                </div>

                <button 
                  className="service-action-btn"
                  onClick={() => onSelectService(svc.title)}
                >
                  <span>Inquire</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
