import React, { useState } from 'react';
import { Calculator, ArrowRight, Zap } from 'lucide-react';

export default function RoiCalculator({ onOpenAuditModal }) {
  const [budget, setBudget] = useState(50000);
  const [industry, setIndustry] = useState('E-Commerce / DTC');

  const industryMultipliers = {
    'E-Commerce / DTC': { cpc: 12, convRate: 0.035, roasMultiplier: 6.2 },
    'Retail & Showroom': { cpc: 18, convRate: 0.05, roasMultiplier: 5.4 },
    'Real Estate': { cpc: 45, convRate: 0.08, roasMultiplier: 9.8 },
    'Healthcare / Clinic': { cpc: 25, convRate: 0.065, roasMultiplier: 7.0 },
    'Tech / B2B': { cpc: 55, convRate: 0.045, roasMultiplier: 8.5 }
  };

  const currentMultiplier = industryMultipliers[industry] || industryMultipliers['E-Commerce / DTC'];
  const estimatedClicks = Math.floor(budget / currentMultiplier.cpc);
  const estimatedLeads = Math.floor(estimatedClicks * currentMultiplier.convRate);
  const estimatedReach = Math.floor(budget * 24);
  const projectedRevenue = Math.floor(budget * currentMultiplier.roasMultiplier);

  const formatCurrency = (val) => {
    return '₹' + Number(val).toLocaleString('en-IN');
  };

  return (
    <section id="calculator" className="calculator-section">
      <div className="container">
        <div className="text-center">
          <div className="section-tag">Interactive Forecasting</div>
          <h2 className="section-title">
            Marketing <span className="gradient-text">ROI & Lead Calculator</span>
          </h2>
          <p className="section-desc">
            Estimate the scale, qualified customer inquiries, and revenue potential possible with PC Creations’ targeted ad funnels.
          </p>
        </div>

        <div className="calculator-card" style={{ marginTop: '50px' }}>
          <div>
            <div className="calc-input-group">
              <div className="calc-label">
                <span>Monthly Marketing Ad Budget</span>
                <span className="calc-val-highlight">{formatCurrency(budget)}</span>
              </div>
              <input 
                type="range" 
                min="15000" 
                max="500000" 
                step="5000"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="calc-slider" 
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#64748b', marginTop: '6px' }}>
                <span>₹15,000</span>
                <span>₹2,50,000</span>
                <span>₹5,00,000+</span>
              </div>
            </div>

            <div className="calc-input-group">
              <label className="calc-label">Select Industry Vertical</label>
              <div className="industry-pills">
                {Object.keys(industryMultipliers).map((ind) => (
                  <button
                    key={ind}
                    type="button"
                    className={`industry-pill ${industry === ind ? 'active' : ''}`}
                    onClick={() => setIndustry(ind)}
                  >
                    {ind}
                  </button>
                ))}
              </div>
            </div>

            <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.5 }}>
              *Estimates are calibrated against real campaign performance benchmarks in the Bangalore and pan-India digital advertising ecosystem.
            </p>
          </div>

          <div className="calc-results-box">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fbbf24', fontSize: '0.9rem', fontWeight: 700 }}>
              <Zap size={18} />
              <span>Projected 30-Day Impact</span>
            </div>

            <div className="result-item">
              <span className="result-title">Estimated Brand Reach</span>
              <span className="result-value">{estimatedReach.toLocaleString('en-IN')}+ Views</span>
            </div>

            <div className="result-item">
              <span className="result-title">Estimated Qualified Leads</span>
              <span className="result-value" style={{ color: '#38bdf8' }}>{estimatedLeads.toLocaleString('en-IN')} Leads</span>
            </div>

            <div className="result-item">
              <span className="result-title">Projected Pipeline Value</span>
              <span className="result-value accent">{formatCurrency(projectedRevenue)}</span>
            </div>

            <button 
              className="btn btn-primary"
              style={{ width: '100%', marginTop: '10px' }}
              onClick={() => onOpenAuditModal(industry, formatCurrency(budget))}
            >
              <span>Unlock This Growth Roadmap</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
