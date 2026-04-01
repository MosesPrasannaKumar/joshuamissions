/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, MapPin, Phone, Mail, 
  Instagram, Youtube, ChevronRight
} from 'lucide-react';
import { Page, NavItem } from './types';
import { NAV_ITEMS, MINISTRIES } from './constants';

// Import Page Components
import { HomePage } from './pages/Home';
import { AboutPage } from './pages/About';
import { MinistriesPage } from './pages/Ministries';
import { EventsPage } from './pages/Events';
import { SermonsPage } from './pages/Sermons';
import { GalleryPage } from './pages/Gallery';
import { DonatePage } from './pages/Donate';
import { ContactPage } from './pages/Contact';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const navigate = (page: Page) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage navigate={navigate} />;
      case 'about': return <AboutPage />;
      case 'ministries': return <MinistriesPage navigate={navigate} />;
      case 'events': return <EventsPage />;
      case 'sermons': return <SermonsPage />;
      case 'gallery': return <GalleryPage />;
      case 'donate': return <DonatePage />;
      case 'contact': return <ContactPage />;
      default: return <HomePage navigate={navigate} />;
    }
  };

  const isHome = currentPage === 'home';

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        (scrolled || !isHome) ? 'glass-nav py-3' : 'bg-transparent py-6'
      }`}>
        <div className="max-w-[1440px] mx-auto px-4 flex justify-between items-center">
          <div 
            className="flex items-center cursor-pointer group"
            onClick={() => navigate('home')}
          >
            <img 
              src="logo.svg" 
              alt="Joshua Missions Logo" 
              className="h-14 md:h-20 w-auto transition-all duration-300"
              loading="lazy"
            />
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.page}
                onClick={() => navigate(item.page)}
                className={`text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:text-secondary relative group py-2 ${
                  currentPage === item.page 
                    ? 'text-secondary' 
                    : (scrolled || !isHome) ? 'text-primary' : 'text-warm-white'
                }`}
              >
                {item.label}
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-secondary transform transition-transform duration-300 origin-left ${
                  currentPage === item.page ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}></span>
              </button>
            ))}
            <button 
              onClick={() => navigate('donate')}
              className={`px-8 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg ${
                (scrolled || !isHome)
                  ? 'bg-primary text-warm-white hover:bg-secondary'
                  : 'bg-secondary text-primary hover:bg-warm-white'
              }`}
            >   
              Support Us
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className={(scrolled || !isHome) ? 'text-primary' : 'text-warm-white'} />
            ) : (
              <Menu className={(scrolled || !isHome) ? 'text-primary' : 'text-warm-white'} />
            )}
          </button>
        </div>

      </nav>

      {/* Mobile Nav Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[9999] bg-[#FDFBF7] md:hidden flex flex-col"
          >
            {/* Mobile Menu Header */}
            <div className="flex justify-between items-center px-6 py-6 border-b border-primary/5">
              <div className="flex items-center gap-3">
                <img 
                  src="logo.svg" 
                  alt="Joshua Missions Logo" 
                  className="h-12 w-auto"
                  loading="lazy"
                />
                <div className="flex flex-col">
                  <span className="text-lg font-serif font-bold tracking-tighter text-primary leading-none">JOSHUA <span className="text-secondary">MISSIONS</span></span>
                </div>
              </div>
              <button 
                className="p-2 rounded-full bg-primary/5 text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Menu Links */}
            <div className="flex-grow overflow-y-auto px-8 py-10 flex flex-col gap-6">
              {NAV_ITEMS.map((item, index) => (
                <motion.button
                  key={item.page}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => navigate(item.page)}
                  className="group flex items-center justify-between text-left"
                >
                  <span className={`text-xl font-serif font-bold transition-colors ${
                    currentPage === item.page ? 'text-secondary' : 'text-primary'
                  }`}>
                    {item.label}
                  </span>
                  <ChevronRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${
                    currentPage === item.page ? 'text-secondary' : 'text-primary/20'
                  }`} />
                </motion.button>
              ))}
            </div>

            {/* Mobile Menu Footer */}
            <div className="p-8 border-t border-primary/5 bg-accent-beige/30">
              <button 
                onClick={() => navigate('donate')}
                className="w-full bg-primary text-warm-white py-4 rounded-2xl font-bold uppercase tracking-widest shadow-lg shadow-primary/20 active:scale-[0.98] transition-transform"
              >
                Support the Mission
              </button>
              <div className="mt-8 flex justify-center gap-6">
                <a href="#" className="text-primary/40 hover:text-secondary transition-colors"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="text-primary/40 hover:text-secondary transition-colors"><Youtube className="w-5 h-5" /></a>
                <a href="#" className="text-primary/40 hover:text-secondary transition-colors"><Mail className="w-5 h-5" /></a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-warm-white pt-20 pb-10">
        <div className="max-w-[1440px] mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 text-center sm:text-left">
            <div className="col-span-1 md:col-span-1 flex flex-col items-center sm:items-start">
              <div className="flex items-center gap-4 mb-8">
                <img 
                  src="logo.svg" 
                  alt="Joshua Missions Logo" 
                  className="h-12 w-auto"
                  loading="lazy"
                />
                <div className="flex flex-col">
                  <span className="text-xl font-serif font-bold tracking-tighter text-secondary leading-none">JOSHUA <span className="text-warm-white">MISSIONS</span></span>
                  <span className="text-[8px] font-sans font-bold tracking-[0.4em] text-warm-white/40 leading-none uppercase">Inheriting the Promises</span>
                </div>
              </div>
              <p className="text-warm-white/60 text-sm leading-relaxed mb-6">
                Dedicated to spreading the gospel, fostering spiritual growth, and transforming communities through love and service.
              </p>
              <div className="flex gap-4 justify-center sm:justify-start">
                <a 
                  href="https://www.instagram.com/joshuamissionschurch?igsh=MW54bjdlbHR4MGlmbw==" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-warm-white/10 flex items-center justify-center text-secondary hover:bg-secondary hover:text-primary transition-all duration-300"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href="https://youtube.com/@rev.s.joshuavasan?si=3NliRYQmCivesqny" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-warm-white/10 flex items-center justify-center text-secondary hover:bg-secondary hover:text-primary transition-all duration-300"
                >
                  <Youtube className="w-5 h-5" />
                </a>
                <a 
                  href="https://wa.me/919710766777" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-warm-white/10 flex items-center justify-center text-secondary hover:bg-secondary hover:text-primary transition-all duration-300"
                >
                  <svg 
                    viewBox="0 0 24 24" 
                    fill="currentColor" 
                    className="w-5 h-5"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </a>
              </div>
            </div>

            <div className="flex flex-col items-center sm:items-start">
              <h4 className="font-serif text-lg font-bold mb-6 text-secondary">Quick Links</h4>
              <ul className="space-y-3">
                {NAV_ITEMS.slice(0, 4).map(item => (
                  <li key={item.page}>
                    <button onClick={() => navigate(item.page)} className="text-sm text-warm-white/60 hover:text-secondary transition-colors">
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col items-center sm:items-start">
              <h4 className="font-serif text-lg font-bold mb-6 text-secondary">Ministries</h4>
              <ul className="space-y-3">
                {MINISTRIES.map(m => (
                  <li key={m.title}>
                    <button onClick={() => navigate('ministries')} className="text-sm text-warm-white/60 hover:text-secondary transition-colors text-left">
                      {m.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col items-center sm:items-start">
              <h4 className="font-serif text-lg font-bold mb-6 text-secondary">Contact Us</h4>
              <ul className="space-y-4 text-left">
                <li className="flex gap-3 items-start">
                  <MapPin className="w-5 h-5 text-secondary shrink-0" />
                  <span className="text-sm text-warm-white/60">No 2, First Floor, 2nd Avenue, Ahsok Nagar, Chennai 600 083</span>
                </li>
                <li className="flex gap-3 items-center">
                  <Phone className="w-5 h-5 text-secondary shrink-0" />
                  <a 
                    href="https://wa.me/919710766777" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-warm-white/60 hover:text-secondary transition-colors"
                  >
                    +91 97107 66777
                  </a>
                </li>
                <li className="flex gap-3 items-center">
                  <Mail className="w-5 h-5 text-secondary shrink-0" />
                  <span className="text-sm text-warm-white/60">joshuamissionschurch@gmail.com</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-warm-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="font-serif italic text-secondary mb-1">“Let your light shine before others.”</p>
              <p className="text-[10px] uppercase tracking-widest text-warm-white/40">– Matthew 5:16</p>
            </div>
            <p className="text-xs text-warm-white/40">
              © 2025 Joshua Missions Trust. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
