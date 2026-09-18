import React from 'react';

export default function Roadmap() {
  const steps = [
    {
      week: 'Week 1',
      title: 'Audit & Brand Blueprint',
      items: [
        'Comprehensive audit of Google Ads, Meta Ads & GMB',
        'Competitor analysis & customer persona modeling',
        'Visual identity & brand voice alignment call',
        'Account tracking & conversion pixel calibration',
      ],
    },
    {
      week: 'Week 2',
      title: 'Creative & Video Sprint',
      items: [
        'Greenscreen studio ad shoot & voice recording',
        'High-converting ad copy & carousel generation',
        'Festival posters & social calendar finalized',
        'Landing page & conversion hook optimization',
      ],
    },
    {
      week: 'Week 3',
      title: 'Omnichannel Launch',
      items: [
        'Meta & Google Ads campaigns officially go live',
        'Social media channels active with viral content',
        'Local SEO & Google My Business citations live',
        'TV channel news ad slot submission (Growth plans)',
      ],
    },
    {
      week: 'Week 4',
      title: 'Scale & Performance Review',
      items: [
        'AI budget reallocation to top winning creatives',
        'Full attribution & ROAS reporting delivered',
        'Strategy refinement meeting with founders',
        'Roadmap established for 3x monthly scaling',
      ],
    },
  ];

  return (
    <section id="process" className="roadmap-section">
      <div className="container">
        <div className="text-center">
          <div className="section-tag">Zero Friction Onboarding</div>
          <h2 className="section-title">
            Our <span className="gradient-text">30-Day Growth Roadmap</span>
          </h2>
          <p className="section-desc">
            Here’s what to expect in your first 30 days with PC Creations, from initial audit to live scaling campaigns.
          </p>
        </div>

        <div className="roadmap-grid">
          {steps.map((step, idx) => (
            <div key={idx} className="roadmap-card">
              <div className="roadmap-week-pill">{step.week}</div>
              <h3 className="roadmap-title">{step.title}</h3>
              <ul className="roadmap-list">
                {step.items.map((item, i) => (
                  <li key={i}>
                    <span className="roadmap-bullet"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
