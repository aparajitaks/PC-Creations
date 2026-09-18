import React from 'react';
import { ArrowUpRight, Instagram, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer({ onOpenAuditModal }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          {/* Brand Info */}
          <div className="footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img 
                src="/assets/logo.jpg" 
                alt="PC Creations" 
                style={{ width: '42px', height: '42px', borderRadius: '50%', border: '1px solid #fbbf24' }} 
              />
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.25rem', color: '#fff' }}>
                PC CREATIONS
              </span>
            </div>
            <p>
              Bangalore’s premier AI-powered digital marketing and creative agency. Build brand, not just business.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <a 
                href="https://instagram.com/pc_creations_1" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}
              >
                <Instagram size={17} />
              </a>
              <a 
                href="tel:+917204511681"
                style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}
              >
                <Phone size={17} />
              </a>
              <a 
                href="mailto:pccreation295@gmail.com"
                style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}
              >
                <Mail size={17} />
              </a>
            </div>
          </div>

          {/* Core Services */}
          <div className="footer-col">
            <h4>Services</h4>
            <ul className="footer-links">
              <li><a href="#services">Google Ads Campaigns</a></li>
              <li><a href="#services">Meta Ads & Paid Social</a></li>
              <li><a href="#services">Greenscreen Video Shoots</a></li>
              <li><a href="#services">Podcast Production</a></li>
              <li><a href="#services">SMM & Organic Content</a></li>
              <li><a href="#services">Custom Web Development</a></li>
            </ul>
          </div>

          {/* Quick Navigation */}
          <div className="footer-col">
            <h4>Agency</h4>
            <ul className="footer-links">
              <li><a href="#why-us">Why Choose Us</a></li>
              <li><a href="#process">30-Day Process</a></li>
              <li><a href="#pricing">Pricing Plans</a></li>
              <li><a href="#calculator">ROI Calculator</a></li>
              <li><a href="#reviews">Google Reviews</a></li>
              <li><a href="#about">About Bangalore Hub</a></li>
            </ul>
          </div>

          {/* Contact Hub */}
          <div className="footer-col">
            <h4>Bangalore Offices</h4>
            <div style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div>
                <strong style={{ color: '#fff' }}>Rajajinagar:</strong><br />
                Near Metro Station, Nagapura, Bangalore 560010
              </div>
              <div>
                <strong style={{ color: '#fff' }}>Indiranagar:</strong><br />
                100 Feet Road Corridor, Bangalore 560038
              </div>
              <div style={{ marginTop: '6px' }}>
                <span style={{ color: '#fbbf24', fontWeight: 600 }}>Phone:</span> +91 72045 11681<br />
                <span style={{ color: '#38bdf8', fontWeight: 600 }}>Email:</span> pccreation295@gmail.com
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            &copy; {new Date().getFullYear()} PC Creations Digital Marketing Agency. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="#home">Back to top ↑</a>
            <a href="https://share.google/nDXFKdY4OcAeUelra" target="_blank" rel="noopener noreferrer">
              Verified Google Business Profile
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
