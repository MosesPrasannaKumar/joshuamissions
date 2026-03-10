import React from 'react';
import { Play, Music, FileText } from 'lucide-react';
import { LATEST_SERMONS } from '../constants';

export const SermonsPage: React.FC = () => {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-secondary font-bold uppercase tracking-widest text-sm mb-4 block">Listen & Watch</span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif text-primary mb-8">Sermons</h1>
        </div>

        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-16">
          {['All', 'Video', 'Audio', 'Teachings'].map(filter => (
            <button key={filter} className="px-4 md:px-6 py-2 rounded-full text-xs md:text-sm font-bold uppercase tracking-widest border border-primary/10 hover:bg-primary hover:text-warm-white transition-all">
              {filter}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {[...LATEST_SERMONS, ...LATEST_SERMONS].map((sermon, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-primary/5 group">
              <div className="relative aspect-video">
                <img src={sermon.thumbnail} alt={sermon.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-primary/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 bg-warm-white rounded-full flex items-center justify-center">
                    {sermon.type === 'video' ? <Play className="w-5 h-5 text-primary" /> : <Music className="w-5 h-5 text-primary" />}
                  </div>
                </div>
              </div>
              <div className="p-6">
                <span className="text-secondary text-[10px] font-bold uppercase tracking-widest mb-2 block">{sermon.date}</span>
                <h3 className="text-xl font-serif text-primary mb-4">{sermon.title}</h3>
                <p className="text-primary/40 text-sm mb-6">{sermon.speaker}</p>
                <div className="flex justify-between items-center">
                  <button className="text-primary font-bold uppercase tracking-widest text-xs hover:text-secondary transition-colors">Watch Now</button>
                  <div className="flex gap-3">
                    <Music className="w-4 h-4 text-primary/20 cursor-pointer hover:text-secondary" />
                    <FileText className="w-4 h-4 text-primary/20 cursor-pointer hover:text-secondary" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
