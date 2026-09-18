import React, { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar({ 
  onOpenAuditModal, 
  onOpenAuthModal, 
  onOpenDashboard, 
  user, 
  currentView, 
  onNavigateHome 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  const handleNavHome = (e, targetHash) => {
    closeMobileMenu();
    if (currentView !== 'landing') {
      e.preventDefault();
      onNavigateHome();
      setTimeout(() => {
        if (targetHash) {
          const el = document.querySelector(targetHash);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <a 
          href="#home" 
          className="nav-brand" 
          onClick={(e) => handleNavHome(e, '#home')}
        >
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
          <li><a href="#services" className="nav-link" onClick={(e) => handleNavHome(e, '#services')}>Services</a></li>
          <li>
            <a href="#academy" className="nav-link nav-link-academy" onClick={(e) => handleNavHome(e, '#academy')}>
              <span>Academy</span>
              <span className="nav-badge-pro">LMS</span>
            </a>
          </li>
          <li><a href="#process" className="nav-link" onClick={(e) => handleNavHome(e, '#process')}>Process</a></li>
          <li><a href="#pricing" className="nav-link" onClick={(e) => handleNavHome(e, '#pricing')}>Pricing</a></li>
          <li><a href="#calculator" className="nav-link" onClick={(e) => handleNavHome(e, '#calculator')}>ROI Calc</a></li>
          <li><a href="#reviews" className="nav-link" onClick={(e) => handleNavHome(e, '#reviews')}>Reviews</a></li>
          <li><a href="#about" className="nav-link" onClick={(e) => handleNavHome(e, '#about')}>About</a></li>
        </ul>

        <div className="nav-actions">
          {/* LMS Portal Access Button */}
          {user ? (
            <button 
              className="btn btn-lms-pill"
              onClick={() => {
                closeMobileMenu();
                onOpenDashboard();
              }}
              title="Open LMS Student Portal"
            >
              <span className="nav-avatar-circle">
                {user.avatar || (user.name ? user.name.slice(0, 2).toUpperCase() : 'ST')}
              </span>
              <span className="nav-student-label">LMS Portal</span>
            </button>
          ) : (
            <button 
              className="btn btn-outline btn-sm nav-lms-login-btn"
              onClick={() => {
                closeMobileMenu();
                onOpenAuthModal();
              }}
            >
              <span>Student Login</span>
            </button>
          )}

          <button 
            className="btn btn-primary btn-sm nav-cta-btn"
            onClick={() => {
              closeMobileMenu();
              onOpenAuditModal();
            }}
          >
            <span>Free Audit</span>
            <ArrowUpRight size={15} />
          </button>

          <button 
            className="mobile-toggle"
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
