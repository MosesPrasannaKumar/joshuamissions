import React from 'react';
import { motion } from 'motion/react';

export const GalleryPage: React.FC = () => {
  const images = [
    'https://images.unsplash.com/photo-1515162305285-0293e4767cc2',
    'https://images.unsplash.com/photo-1507692049790-de58290a4334',
    'https://images.unsplash.com/photo-1477673132141-8467d3466a65',
    'https://images.unsplash.com/photo-1541976844346-f18aeac57b06',
    'https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa',
    'https://images.unsplash.com/photo-1511632765486-a01980e01a18',
    'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c',
    'https://images.unsplash.com/photo-1504052434569-70ad5836ab65',
    'https://images.unsplash.com/photo-1548625361-195fe5772df8'
  ];

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-secondary font-bold uppercase tracking-widest text-sm mb-4 block">Visual Journey</span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif text-primary mb-8">Gallery</h1>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 md:gap-8 space-y-6 md:space-y-8">
          {images.map((img, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 1.02 }}
              className="rounded-2xl overflow-hidden shadow-lg cursor-pointer"
            >
              <img src={`${img}?auto=format&fit=crop&q=80&w=800`} alt="Gallery" className="w-full h-auto" referrerPolicy="no-referrer" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
