import React from 'react';
import { Quote } from 'lucide-react';

export const DonatePage: React.FC = () => {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-secondary font-bold uppercase tracking-widest text-sm mb-4 block">Support the Mission</span>
          <h1 className="text-5xl md:text-7xl font-serif text-primary mb-8">Giving</h1>
          <p className="text-primary/60 text-lg leading-relaxed">
            Your generosity enables us to spread the gospel and serve our community. Every gift, no matter the size, makes a significant impact.
          </p>
        </div>

        <div className="bg-white p-12 rounded-[3rem] shadow-xl border border-primary/5 mb-12">
          <div className="text-center mb-12">
            <Quote className="w-10 h-10 text-secondary mx-auto mb-6" />
            <p className="font-serif italic text-2xl text-primary mb-4">"Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver."</p>
            <p className="text-xs uppercase tracking-widest font-bold text-primary/40">— 2 Corinthians 9:7</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="font-serif text-2xl text-primary mb-6">Bank Transfer</h3>
              <div className="space-y-4 bg-accent-beige p-8 rounded-2xl">
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-secondary mb-1">Account Name</p>
                  <p className="text-primary font-bold">Joshua Missions Trust</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-secondary mb-1">Bank Name</p>
                  <p className="text-primary font-bold">Faith International Bank</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-secondary mb-1">Account Number</p>
                  <p className="text-primary font-bold">1234 5678 9012</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-secondary mb-1">IFSC Code</p>
                  <p className="text-primary font-bold">FIBK0001234</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center text-center">
              <h3 className="font-serif text-2xl text-primary mb-6">UPI Payment</h3>
              <div className="w-48 h-48 bg-primary/5 rounded-2xl flex items-center justify-center mb-6 border-2 border-dashed border-primary/10">
                <span className="text-primary/20 text-xs font-bold uppercase tracking-widest">QR Code Placeholder</span>
              </div>
              <p className="text-primary font-bold text-lg mb-2">joshuamissions@upi</p>
              <p className="text-primary/40 text-xs uppercase tracking-widest">Scan to donate via any UPI app</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-primary/40 text-sm">
            All donations are tax-exempt under Section 80G of the Income Tax Act.
          </p>
        </div>
      </div>
    </div>
  );
};
