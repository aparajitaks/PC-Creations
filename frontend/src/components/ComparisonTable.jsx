import React from 'react';
import { Check, X } from 'lucide-react';

export default function ComparisonTable() {
  const comparisons = [
    {
      feature: 'Proven Track Record',
      other: 'Generic portfolios, vague screenshots & vanity metrics',
      pc: '500+ campaigns, verified 4.9★ Google rating, ₹100M+ attributed sales',
    },
    {
      feature: 'Video & Ad Production',
      other: 'Stock footage with basic captions or outsourced to third parties',
      pc: 'In-house Bangalore greenscreen studio, 4K camera crew & viral editing',
    },
    {
      feature: 'AI-Powered Creative Strategy',
      other: 'Repetitive boilerplate prompts and generic templates',
      pc: 'Custom voice models, predictive audience targeting & high-velocity split testing',
    },
    {
      feature: 'Local Media & TV Ads',
      other: 'Zero television or regional news access',
      pc: '1–2 Broadcast TV channel news ads integrated into growth packages',
    },
    {
      feature: 'Communication & Response Time',
      other: '24–48 hours to reply via support tickets or offshore liaisons',
      pc: 'Direct WhatsApp & phone line with 30-minute dedicated manager response',
    },
    {
      feature: 'Bangalore Office Presence',
      other: 'Virtual addresses or fully remote with no physical accountability',
      pc: 'Physical presence in Rajajinagar & Indiranagar hubs for face-to-face reviews',
    },
    {
      feature: 'Reporting & Transparency',
      other: 'Confusing monthly PDF charts sent weeks after month-end',
      pc: 'Real-time dashboards, transparent spend attribution & weekly sprint calls',
    },
    {
      feature: 'Contract Terms & Flexibility',
      other: 'Locked into rigid 6–12 month agreements with penalties',
      pc: 'Flexible performance-first collaboration with month-to-month freedom',
    },
  ];

  return (
    <section id="why-us" className="comparison-section">
      <div className="container">
        <div className="text-center">
          <div className="section-tag">The Competitive Advantage</div>
          <h2 className="section-title">
            Why Choose <span className="gradient-text">PC Creations</span>
          </h2>
          <p className="section-desc">
            Most digital agencies overpromise and underdeliver. We’ve built our entire business on accountability, tangible ROAS, and unmatched creative execution.
          </p>
        </div>

        <div className="comparison-wrapper">
          <table className="comparison-table">
            <thead>
              <tr>
                <th style={{ width: '25%' }}>Capability / Feature</th>
                <th style={{ width: '37%' }}>Other Traditional Agencies</th>
                <th className="col-pc" style={{ width: '38%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>PC Creations</span>
                    <span className="badge badge-amber" style={{ fontSize: '0.7rem' }}>Recommended</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisons.map((row, index) => (
                <tr key={index}>
                  <td style={{ fontWeight: 600, color: '#e2e8f0' }}>{row.feature}</td>
                  <td className="col-other">
                    <div className="cell-content">
                      <X size={18} className="cross-icon" />
                      <span>{row.other}</span>
                    </div>
                  </td>
                  <td className="col-pc">
                    <div className="cell-content">
                      <Check size={18} className="check-icon" />
                      <span>{row.pc}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
