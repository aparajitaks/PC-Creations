import React, { useState, useEffect } from 'react';
import TopBar from './components/TopBar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PlatformMarquee from './components/PlatformMarquee';
import Services from './components/Services';
import ComparisonTable from './components/ComparisonTable';
import Roadmap from './components/Roadmap';
import PricingSection from './components/PricingSection';
import RoiCalculator from './components/RoiCalculator';
import GoogleReviews from './components/GoogleReviews';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import AcademySection from './components/AcademySection';
import LmsAuthModal from './components/lms/LmsAuthModal';
import LmsDashboard from './components/lms/LmsDashboard';
import CoursePlayer from './components/lms/CoursePlayer';

import './styles/design-system.css';
import './styles/components.css';

export default function App() {
  // Navigation View State: 'landing' | 'dashboard' | 'player'
  const [currentView, setCurrentView] = useState('landing');
  const [selectedCourseId, setSelectedCourseId] = useState('meta-ads-mastery');

  // Audit Booking Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [modalService, setModalService] = useState('');
  const [modalPlan, setModalPlan] = useState('');
  const [modalBudget, setModalBudget] = useState('');

  // LMS Authentication State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Restore stored session on mount
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem('pc_lms_token');
      const storedUser = localStorage.getItem('pc_lms_user');
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch (e) {
      console.error('Error loading stored session:', e);
    }
  }, []);

  const handleOpenAuditModal = (service = '', budget = '') => {
    setModalService(service || 'Meta & Google Ads Growth');
    setModalBudget(budget || '₹30,000 - ₹75,000');
    setModalPlan('STANDARD (Growth pack)');
    setModalOpen(true);
  };

  const handleSelectService = (serviceTitle) => {
    setModalService(serviceTitle);
    setModalPlan('STANDARD (Growth pack)');
    setModalOpen(true);
  };

  const handleSelectPlan = (planName) => {
    setModalPlan(planName);
    setModalOpen(true);
  };

  const handleLoginSuccess = (authenticatedUser, authToken) => {
    setUser(authenticatedUser);
    setToken(authToken);
    setIsAuthModalOpen(false);
    setCurrentView('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    localStorage.removeItem('pc_lms_token');
    localStorage.removeItem('pc_lms_user');
    setUser(null);
    setToken(null);
    setCurrentView('landing');
  };

  const handleOpenCoursePlayer = (courseId) => {
    setSelectedCourseId(courseId);
    setCurrentView('player');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateHome = () => {
    setCurrentView('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-root">
      {/* If in Course Player, show dedicated player view */}
      {currentView === 'player' ? (
        <CoursePlayer
          courseId={selectedCourseId}
          token={token}
          user={user}
          onBackToDashboard={handleBackToDashboard}
          onUpdateUser={(updatedUser) => {
            setUser(updatedUser);
            localStorage.setItem('pc_lms_user', JSON.stringify(updatedUser));
          }}
        />
      ) : currentView === 'dashboard' ? (
        /* If in Dashboard, show student dashboard */
        <LmsDashboard
          user={user}
          token={token}
          onLogout={handleLogout}
          onReturnToHome={handleNavigateHome}
          onOpenCoursePlayer={handleOpenCoursePlayer}
        />
      ) : (
        /* Default: Agency Landing Page */
        <>
          <TopBar />
          <Navbar 
            onOpenAuditModal={() => handleOpenAuditModal()}
            onOpenAuthModal={() => setIsAuthModalOpen(true)}
            onOpenDashboard={() => setCurrentView('dashboard')}
            user={user}
            currentView={currentView}
            onNavigateHome={handleNavigateHome}
          />
          
          <main>
            <Hero onOpenAuditModal={() => handleOpenAuditModal()} />
            <PlatformMarquee />
            <Services onSelectService={handleSelectService} />
            <ComparisonTable />
            <Roadmap />
            <AcademySection 
              onOpenAuthModal={() => setIsAuthModalOpen(true)}
              onOpenDashboard={() => setCurrentView('dashboard')}
              onSelectCourse={(courseId) => {
                if (user) {
                  handleOpenCoursePlayer(courseId);
                } else {
                  setIsAuthModalOpen(true);
                }
              }}
              user={user}
            />
            <PricingSection onSelectPlan={handleSelectPlan} />
            <RoiCalculator onOpenAuditModal={(industry, budget) => handleOpenAuditModal(industry, budget)} />
            <GoogleReviews />
            <AboutSection />
            <ContactSection />
          </main>

          <Footer onOpenAuditModal={() => handleOpenAuditModal()} />
        </>
      )}

      {/* Free Audit Consultation Modal */}
      <BookingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialService={modalService}
        initialPlan={modalPlan}
        initialBudget={modalBudget}
      />

      {/* LMS Student Authentication Modal */}
      <LmsAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}
