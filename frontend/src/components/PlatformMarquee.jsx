import React from 'react';

export default function PlatformMarquee() {
  const platforms = [
    { name: 'Google Ads Partner', icon: '⚡' },
    { name: 'Meta Business Certified', icon: '🎯' },
    { name: 'Instagram Growth Engine', icon: '📸' },
    { name: 'YouTube Video Production', icon: '▶️' },
    { name: 'Spotify & Apple Podcasts', icon: '🎙️' },
    { name: 'Shopify & Custom Web', icon: '🛍️' },
    { name: 'Indiranagar Creative Hub', icon: '📍' },
    { name: 'Rajajinagar Media Studio', icon: '🎬' },
    { name: 'AI Marketing Automation', icon: '🤖' },
  ];

  return (
    <div className="marquee-section">
      <div className="marquee-inner">
        {/* Render twice for seamless looping */}
        {[...platforms, ...platforms].map((item, idx) => (
          <div key={idx} className="marquee-item">
            <span className="icon">{item.icon}</span>
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
