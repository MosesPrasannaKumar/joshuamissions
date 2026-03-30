import React from 'react';
import { MINISTRIES } from '../constants';

export const MinistriesPage: React.FC = () => {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-[1440px] mx-auto px-4">
        <div className="text-center mb-20">
          <span className="text-secondary font-bold uppercase tracking-widest text-sm mb-4 block">Our Work</span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif text-primary mb-8">Ministries</h1>
          <p className="text-primary/60 max-w-2xl mx-auto text-lg">
            Discover how we serve our community and grow together in faith through our various specialized ministries.
          </p>
        </div>

        <div className="space-y-24">
          {MINISTRIES.map((m, i) => (
            <div key={i} className={`flex flex-col lg:flex-row gap-8 lg:gap-16 items-center ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              <div className="w-full lg:w-1/2">
                <div className="aspect-[16/10] rounded-3xl overflow-hidden shadow-xl">
                    <img 
                      src={`${i === 0 ? 'https://images.unsplash.com/photo-1507692049790-de58290a4334' : i === 1 ? 'https://images.unsplash.com/photo-1523240795612-9a054b0db644' : i === 2 ? 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c' : 'https://images.unsplash.com/photo-1490730141103-6ac27d95654e'}?auto=format&fit=crop&q=80&w=1200`} 
                    alt={m.title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <div className="w-full lg:w-1/2">
                <span className="text-secondary font-bold text-4xl font-serif mb-4 block italic">0{i + 1}</span>
                <h2 className="text-4xl font-serif text-primary mb-6">{m.title}</h2>
                <p className="text-primary/70 text-lg leading-relaxed mb-8">
                  {m.description} Our {m.title.toLowerCase()} is dedicated to serving the community and building a strong foundation of faith through focused ministry and fellowship.
                </p>
                <button className="bg-primary text-warm-white px-8 py-3 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-secondary transition-colors">Get Involved</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
