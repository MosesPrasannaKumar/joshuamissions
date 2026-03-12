import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

export const ContactPage: React.FC = () => {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-secondary font-bold uppercase tracking-widest text-sm mb-4 block">Get in Touch</span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif text-primary mb-8">Contact Us</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <h2 className="text-3xl font-serif text-primary mb-8">Send a Prayer Request</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-primary/40 mb-2">Full Name</label>
                  <input type="text" className="w-full bg-accent-beige border-none rounded-xl p-4 focus:ring-2 focus:ring-secondary transition-all" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-primary/40 mb-2">Email Address</label>
                  <input type="email" className="w-full bg-accent-beige border-none rounded-xl p-4 focus:ring-2 focus:ring-secondary transition-all" placeholder="john@example.com" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest font-bold text-primary/40 mb-2">Subject</label>
                <select className="w-full bg-accent-beige border-none rounded-xl p-4 focus:ring-2 focus:ring-secondary transition-all">
                  <option>Prayer Request</option>
                  <option>General Inquiry</option>
                  <option>Counseling Request</option>
                  <option>Volunteer Interest</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest font-bold text-primary/40 mb-2">Message</label>
                <textarea rows={6} className="w-full bg-accent-beige border-none rounded-xl p-4 focus:ring-2 focus:ring-secondary transition-all" placeholder="How can we help or pray for you?"></textarea>
              </div>
              <button className="w-full bg-primary text-warm-white py-5 rounded-xl font-bold uppercase tracking-widest hover:bg-secondary transition-colors">Send Message</button>
            </form>
          </div>

          <div>
            <h2 className="text-3xl font-serif text-primary mb-8">Visit Us</h2>
            <div className="space-y-10">
              <div className="flex gap-6">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h4 className="font-serif text-xl font-bold text-primary mb-2">Address</h4>
                  <p className="text-primary/60 leading-relaxed">
                    Joshua Missions Church<br />
                    No 2, First Floor, 2nd Avenue<br />
                    Ahsok Nagar, Chennai 600 083
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h4 className="font-serif text-xl font-bold text-primary mb-2">Phone & WhatsApp</h4>
                  <p className="text-primary/60 leading-relaxed">9710766777</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h4 className="font-serif text-xl font-bold text-primary mb-2">Email</h4>
                  <p className="text-primary/60 leading-relaxed">contact@joshuamissions.org</p>
                </div>
              </div>
              <div className="rounded-3xl overflow-hidden h-64 bg-primary/5 border border-primary/10 flex items-center justify-center">
                <span className="text-primary/20 text-xs font-bold uppercase tracking-widest">Google Map Embed Placeholder</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
