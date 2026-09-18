import React, { useState } from 'react';
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

import './styles/design-system.css';
import './styles/components.css';

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalService, setModalService] = useState('');
  const [modalPlan, setModalPlan] = useState('');
  const [modalBudget, setModalBudget] = useState('');

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

  return (
    <div className="app-root">
      <TopBar />
      <Navbar onOpenAuditModal={() => handleOpenAuditModal()} />
      
      <main>
        <Hero onOpenAuditModal={() => handleOpenAuditModal()} />
        <PlatformMarquee />
        <Services onSelectService={handleSelectService} />
        <ComparisonTable />
        <Roadmap />
        <PricingSection onSelectPlan={handleSelectPlan} />
        <RoiCalculator onOpenAuditModal={(industry, budget) => handleOpenAuditModal(industry, budget)} />
        <GoogleReviews />
        <AboutSection />
        <ContactSection />
      </main>

      <Footer onOpenAuditModal={() => handleOpenAuditModal()} />

      <BookingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialService={modalService}
        initialPlan={modalPlan}
        initialBudget={modalBudget}
      />
    </div>
  );
}
