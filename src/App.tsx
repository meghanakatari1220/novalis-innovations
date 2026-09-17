import React, { useState, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Innovation } from './components/Innovation';
import { Projects } from './components/Projects';
import { Achievements } from './components/Achievements';
import { Team } from './components/Team';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Gallery } from './components/Gallery';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AdminDashboard } from './components/AdminDashboard';

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const scrollToContact = useCallback(() => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const navOffset = 80;
      const elementPosition = contactSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }, []);

  const scrollToProjects = useCallback(() => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      const navOffset = 80;
      const elementPosition = projectsSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }, []);

  const scrollToAbout = useCallback(() => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      const navOffset = 80;
      const elementPosition = aboutSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }, []);

  const scrollToInnovation = useCallback(() => {
    const innovationSection = document.getElementById('innovation');
    if (innovationSection) {
      const navOffset = 80;
      const elementPosition = innovationSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#050816] text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Sticky Responsive Navigation Bar */}
      <Navbar
        onContactClick={scrollToContact}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      <main className="flex-grow">
        {/* 1. Hero Section */}
        <Hero
          onExploreClick={scrollToProjects}
          onLearnMoreClick={scrollToAbout}
        />

        {/* 2. About Section */}
        <About onExploreInnovation={scrollToInnovation} />

        {/* 3. Innovation Section */}
        <Innovation />

        {/* 4. Projects Section */}
        <Projects />

        {/* 5. Achievements / Milestones Section */}
        <Achievements />

        {/* 6. Team Section */}
        <Team />

        {/* 7. Why Choose Us Section */}
        <WhyChooseUs />

        {/* 8. Gallery / Company Moments Section */}
        <Gallery />

        {/* 9. Testimonials & Partners Section */}
        <Testimonials />

        {/* 10. Contact Section */}
        <Contact onOpenAdmin={() => setIsAdminOpen(true)} />
      </main>

      {/* 11. Premium Dark Navy Footer */}
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* 12. Inquiries Admin Dashboard Modal */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />
    </div>
  );
}
