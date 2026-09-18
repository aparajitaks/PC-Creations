import React, { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar({ onOpenAuditModal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <a href="#home" className="nav-brand" onClick={closeMobileMenu}>
          <img 
            src="/assets/logo.jpg" 
            alt="PC Creations Logo" 
            className="nav-logo-img" 
          />
          <div className="nav-brand-text">
            <span className="brand-name">PC CREATIONS</span>
            <span className="brand-sub">Digital Marketing Agency</span>
          </div>
        </a>

        {/* Desktop Links */}
        <ul className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <li><a href="#services" className="nav-link" onClick={closeMobileMenu}>Services</a></li>
          <li><a href="#why-us" className="nav-link" onClick={closeMobileMenu}>Why Us</a></li>
          <li><a href="#process" className="nav-link" onClick={closeMobileMenu}>Process</a></li>
          <li><a href="#pricing" className="nav-link" onClick={closeMobileMenu}>Pricing</a></li>
          <li><a href="#calculator" className="nav-link" onClick={closeMobileMenu}>ROI Calculator</a></li>
          <li><a href="#reviews" className="nav-link" onClick={closeMobileMenu}>Reviews</a></li>
          <li><a href="#about" className="nav-link" onClick={closeMobileMenu}>About</a></li>
        </ul>

        <div className="nav-actions">
          <button 
            className="btn btn-primary btn-sm"
            onClick={() => {
              closeMobileMenu();
              onOpenAuditModal();
            }}
          >
            <span>Claim Free Audit</span>
            <ArrowUpRight size={16} />
          </button>

          <button 
            className="mobile-toggle"
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
