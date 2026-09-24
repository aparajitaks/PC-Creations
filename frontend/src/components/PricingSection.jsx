import React, { useState, useEffect } from 'react';
import API_BASE from '../config/api';
import { Check, ArrowRight, Sparkles } from 'lucide-react';

export default function PricingSection({ onSelectPlan }) {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/content/pricing`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setPlans(data.data);
        }
      })
      .catch(err => console.error('Error fetching pricing:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="pricing" className="pricing-section">
      <div className="container">
        <div className="text-center">
          <div className="section-tag">Predictable & Flexible Investment</div>
          <h2 className="section-title">
            Flexible <span className="gradient-text">Pricing Plans</span>
          </h2>
          <p className="section-desc">
            Packages thoughtfully designed around your brand’s current growth stage. Transparent scopes with no hidden catches.
          </p>
        </div>

        <div className="pricing-grid">
          {plans.map((plan) => (
            <div 
              key={plan.id} 
              className={`pricing-card ${plan.popular ? 'popular' : ''}`}
            >
              {plan.popular && (
                <div className="popular-badge">
                  ★ Most Popular Growth Pack
                </div>
              )}

              <div>
                <div className="pricing-header">
                  <h3 className="pricing-name">{plan.name}</h3>
                  <div className="pricing-tagline">{plan.tagline}</div>
                  <p className="pricing-ideal">{plan.idealFor}</p>
                </div>

                <ul className="pricing-features-list">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="pricing-feature">
                      <Check size={18} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <button
                  className={`btn ${plan.popular ? 'btn-primary' : 'btn-secondary'} btn-lg`}
                  style={{ width: '100%' }}
                  onClick={() => onSelectPlan(`${plan.name} (${plan.tagline})`)}
                >
                  <span>Select {plan.name}</span>
                  <ArrowRight size={18} />
                </button>
                <div className="pricing-notes">
                  *{plan.notes}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
