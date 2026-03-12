/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, MapPin, Phone, Mail, 
  Instagram, Youtube, MessageCircle
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

  const navigate = (page: Page) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage navigate={navigate} />;
      case 'about': return <AboutPage />;
      case 'ministries': return <MinistriesPage />;
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
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div 
            className="flex items-center cursor-pointer group"
            onClick={() => navigate('home')}
          >
            <img 
              src="/logo.svg" 
              alt="Joshua Missions Logo" 
              className="h-14 md:h-20 w-auto transition-all duration-300"
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
              Support
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

        {/* Mobile Nav Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 w-full bg-warm-white shadow-2xl md:hidden border-t border-primary/5"
            >
              <div className="flex flex-col p-6 gap-4">
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.page}
                    onClick={() => navigate(item.page)}
                    className={`text-left text-lg font-serif font-medium ${currentPage === item.page ? 'text-secondary' : 'text-primary'}`}
                  >
                    {item.label}
                  </button>
                ))}
                <button 
                  onClick={() => navigate('donate')}
                  className="bg-primary text-warm-white py-3 rounded-lg font-bold uppercase tracking-widest mt-2"
                >
                  Support the Mission
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

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
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-4 mb-8">
                <img 
                  src="/logo.svg" 
                  alt="Joshua Missions Logo" 
                  className="h-12 w-auto"
                />
                <div className="flex flex-col">
                  <span className="text-xl font-serif font-bold tracking-tighter text-secondary leading-none">JOSHUA <span className="text-warm-white">MISSIONS</span></span>
                  <span className="text-[8px] font-sans font-bold tracking-[0.4em] text-warm-white/40 leading-none uppercase">Inheriting the Promises</span>
                </div>
              </div>
              <p className="text-warm-white/60 text-sm leading-relaxed mb-6">
                Dedicated to spreading the gospel, fostering spiritual growth, and transforming communities through love and service.
              </p>
              <div className="flex gap-4">
                <Instagram className="w-5 h-5 text-secondary cursor-pointer hover:text-warm-white transition-colors" />
                <Youtube className="w-5 h-5 text-secondary cursor-pointer hover:text-warm-white transition-colors" />
                <MessageCircle className="w-5 h-5 text-secondary cursor-pointer hover:text-warm-white transition-colors" />
              </div>
            </div>

            <div>
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

            <div>
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

            <div>
              <h4 className="font-serif text-lg font-bold mb-6 text-secondary">Contact Us</h4>
              <ul className="space-y-4">
                <li className="flex gap-3 items-start">
                  <MapPin className="w-5 h-5 text-secondary shrink-0" />
                  <span className="text-sm text-warm-white/60">No 2, First Floor, 2nd Avenue, Ahsok Nagar, Chennai 600 083</span>
                </li>
                <li className="flex gap-3 items-center">
                  <Phone className="w-5 h-5 text-secondary shrink-0" />
                  <span className="text-sm text-warm-white/60">9710766777</span>
                </li>
                <li className="flex gap-3 items-center">
                  <Mail className="w-5 h-5 text-secondary shrink-0" />
                  <span className="text-sm text-warm-white/60">contact@joshuamissions.org</span>
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
              © 2026 Joshua Missions Trust. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
