import React from 'react';
import { MapPin, Phone, Mail, Instagram, Sparkles, Building2, Video, Rocket } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="text-center">
          <div className="section-tag">Our DNA & Heritage</div>
          <h2 className="section-title">
            About <span className="gradient-text">PC Creations</span>
          </h2>
          <p className="section-desc">
            We don’t just market. We build digital identities, craft compelling narratives, and drive consistent growth across all digital platforms.
          </p>
        </div>

        <div className="about-grid">
          {/* Narrative Block from PDF Page 2 */}
          <div className="about-content-block">
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 800, color: '#fff', marginBottom: '16px' }}>
              Where Creative Storytelling Meets AI Precision
            </h3>
            <p>
              We are a cutting-edge digital marketing team with a passion for innovation, creativity, and results. We blend strategy, design, and technology — along with AI-powered creative marketing — to create powerful digital experiences that connect brands with people.
            </p>
            <p>
              From our physical studio facilities in Bangalore to our multichannel digital war rooms, we manage every layer of the customer journey: from high-converting paid ad funnels and greenscreen video productions to nationwide television broadcast PR and custom web platforms.
            </p>

            <div className="about-highlights">
              <div className="highlight-box">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fbbf24', marginBottom: '6px' }}>
                  <Sparkles size={18} />
                  <h4>AI Creative Workflows</h4>
                </div>
                <p>Voice models, rapid creative variations, and dynamic hyper-targeted customer segments.</p>
              </div>

              <div className="highlight-box">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#38bdf8', marginBottom: '6px' }}>
                  <Video size={18} />
                  <h4>Studio & Production</h4>
                </div>
                <p>In-house greenscreen filming, 4K camera gear, lighting setups, and podcast distribution.</p>
              </div>

              <div className="highlight-box">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', marginBottom: '6px' }}>
                  <Rocket size={18} />
                  <h4>Full Funnel Growth</h4>
                </div>
                <p>Google Ads, Meta Ads, TV PR campaigns, and CRO that scale enterprise customer acquisition.</p>
              </div>

              <div className="highlight-box">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#e11d48', marginBottom: '6px' }}>
                  <Building2 size={18} />
                  <h4>Bangalore Headquarters</h4>
                </div>
                <p>Dedicated branch presence in Rajajinagar and Indiranagar for direct collaboration.</p>
              </div>
            </div>
          </div>

          {/* Bangalore Branch Hubs & Direct Contact */}
          <div className="branch-cards">
            <div className="branch-card">
              <div className="branch-name">
                <MapPin size={20} color="#fbbf24" />
                <span>Rajajinagar Media Studio</span>
              </div>
              <p className="branch-details">
                Near Rajajinagar Metro Station, Nagapura, Bangalore, Karnataka 560010.
                <br />
                <span style={{ color: '#fbbf24', fontSize: '0.8rem', fontWeight: 600 }}>
                  Greenscreen Film Studio & Creator Hub
                </span>
              </p>
            </div>

            <div className="branch-card">
              <div className="branch-name">
                <MapPin size={20} color="#38bdf8" />
                <span>Indiranagar Strategy Office</span>
              </div>
              <p className="branch-details">
                Indiranagar 100 Feet Road Corridor, Bangalore, Karnataka 560038.
                <br />
                <span style={{ color: '#38bdf8', fontSize: '0.8rem', fontWeight: 600 }}>
                  Growth Strategy, Paid Ads & Tech Consulting
                </span>
              </p>
            </div>

            <div className="glass-card" style={{ padding: '24px' }}>
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '14px' }}>
                Quick Direct Connect
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.92rem' }}>
                <a 
                  href="tel:+917204511681" 
                  style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#e2e8f0', transition: 'color 0.2s' }}
                >
                  <Phone size={17} color="#fbbf24" />
                  <span>+91 72045 11681</span>
                </a>
                <a 
                  href="mailto:pccreation295@gmail.com" 
                  style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#e2e8f0', transition: 'color 0.2s' }}
                >
                  <Mail size={17} color="#38bdf8" />
                  <span>pccreation295@gmail.com</span>
                </a>
                <a 
                  href="https://instagram.com/pc_creations_1" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#e2e8f0', transition: 'color 0.2s' }}
                >
                  <Instagram size={17} color="#e11d48" />
                  <span>@pc_creations_1</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
