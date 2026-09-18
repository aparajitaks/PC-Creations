import React from 'react';
import { ArrowRight, Sparkles, TrendingUp, Award, Users, CheckCircle2 } from 'lucide-react';

export default function Hero({ onOpenAuditModal }) {
  const serviceTags = [
    'SEO', 'SMM', 'Podcast', 'Website', 'Photography', 'Meta Ads', 'Google Ads'
  ];

  return (
    <section id="home" className="hero-section">
      <div className="hero-glow-blob"></div>

      <div className="container hero-content">
        {/* Pill Badge */}
        <div className="hero-badge-container">
          <div className="hero-pill">
            <span className="hero-pill-indicator"></span>
            <span>Bangalore’s #1 AI-Powered Growth & Creative Agency</span>
          </div>
        </div>

        {/* Main Headline */}
        <h1 className="hero-title">
          Build Brand — <span className="title-accent">Not Just Business</span>
        </h1>

        {/* Subtitle from PDF */}
        <p className="hero-subtitle">
          We blend strategy, design, and AI-powered marketing to craft digital identities that connect brands with real people. In a digital world, be the trend — not the follower.
        </p>

        {/* Dual CTAs */}
        <div className="hero-ctas">
          <button 
            className="btn btn-primary btn-lg"
            onClick={() => onOpenAuditModal()}
          >
            <span>Claim Your Free Brand Audit</span>
            <ArrowRight size={18} />
          </button>
          
          <a href="#services" className="btn btn-secondary btn-lg">
            <span>Explore Services</span>
          </a>
        </div>

        {/* Service Tags Chips */}
        <div className="service-tags-wrapper">
          {serviceTags.map((tag) => (
            <span key={tag} className="service-tag-chip">
              #{tag}
            </span>
          ))}
        </div>

        {/* Live KPI Metric Cards */}
        <div className="hero-metrics-grid">
          <div className="metric-card">
            <div className="metric-value">500+</div>
            <div className="metric-label">High-Converting Campaigns</div>
          </div>
          <div className="metric-card">
            <div className="metric-value" style={{ color: '#fbbf24' }}>4.9 ★</div>
            <div className="metric-label">Google Review Rating</div>
          </div>
          <div className="metric-card">
            <div className="metric-value" style={{ color: '#38bdf8' }}>10x</div>
            <div className="metric-label">Average Campaign ROAS</div>
          </div>
          <div className="metric-card">
            <div className="metric-value" style={{ color: '#10b981' }}>98%</div>
            <div className="metric-label">Client Retention Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
}
