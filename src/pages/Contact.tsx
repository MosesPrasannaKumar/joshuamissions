import React, { useState } from 'react';
import { MapPin, Phone, Mail, CheckCircle } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    // Optional: Reset after some time
    // setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-[1440px] mx-auto px-4">
        <div className="text-center mb-20">
          <span className="text-secondary font-bold uppercase tracking-widest text-sm mb-4 block">Get in Touch</span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif text-primary mb-8">Contact Us</h1>
        </div>

        <div id="contact-form" className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <h2 className="text-3xl font-serif text-primary mb-8">Send a Prayer Request</h2>
            
            {isSubmitted ? (
              <div className="bg-secondary/10 border border-secondary/20 rounded-3xl p-12 text-center animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-secondary/20">
                  <CheckCircle className="w-10 h-10 text-warm-white" />
                </div>
                <h3 className="text-2xl font-serif text-primary mb-4">Message Sent Successfully!</h3>
                <p className="text-primary/60 mb-8">
                  Thank you for reaching out. Our team has received your request and will get back to you shortly. God bless you!
                </p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="text-secondary font-bold uppercase tracking-widest text-sm hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-primary/40 mb-2">Full Name</label>
                    <input required type="text" className="w-full bg-accent-beige border-none rounded-xl p-4 focus:ring-2 focus:ring-secondary transition-all" placeholder="Your Name " />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-primary/40 mb-2">Email Address</label>
                    <input required type="email" className="w-full bg-accent-beige border-none rounded-xl p-4 focus:ring-2 focus:ring-secondary transition-all" placeholder="@mail.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-primary/40 mb-2">Mobile Number</label>
                  <div className="flex gap-3">
                    <select className="w-32 bg-accent-beige border-none rounded-xl p-4 focus:ring-2 focus:ring-secondary transition-all">
                      <option value="+91">+91 (IN)</option>
                      <option value="+1">+1 (US)</option>
                      <option value="+44">+44 (UK)</option>
                      <option value="+971">+971 (UAE)</option>
                      <option value="+65">+65 (SG)</option>
                      <option value="+61">+61 (AU)</option>
                      <option value="+1">+1 (CA)</option>
                    </select>
                    <input required type="tel" className="flex-1 bg-accent-beige border-none rounded-xl p-4 focus:ring-2 focus:ring-secondary transition-all" placeholder="12345 67890" />
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
                  <textarea required rows={6} className="w-full bg-accent-beige border-none rounded-xl p-4 focus:ring-2 focus:ring-secondary transition-all" placeholder="How can we help or pray for you?"></textarea>
                </div>
                <button type="submit" className="w-full bg-primary text-warm-white py-5 rounded-xl font-bold uppercase tracking-widest hover:bg-secondary transition-colors">Send Message</button>
              </form>
            )}
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
                    No 2, First Floor, 2nd Avenue, 
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
                  <a 
                    href="https://wa.me/919710766777" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary/60 leading-relaxed hover:text-secondary transition-colors"
                  >
                    +91 97107 66777
                  </a>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h4 className="font-serif text-xl font-bold text-primary mb-2">Email</h4>
                  <p className="text-primary/60 leading-relaxed">joshuamissionschurch@gmail.com</p>
                </div>
              </div>
              <div className="rounded-3xl overflow-hidden h-80 bg-primary/5 border border-primary/10">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.87278959141!2d80.21412667571582!3d13.043768287278274!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52670001d169d7%3A0xc89df775bbad3260!2sJoshua%20Missions!5e0!3m2!1sen!2sin!4v1773338211234!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
