import React from 'react';
import { motion } from 'motion/react';

export const GalleryPage: React.FC = () => {
  const images = [
    'https://images.unsplash.com/photo-1438232992991-995b7058bbb3',
    'https://images.unsplash.com/photo-1511795409834-ef04bbd61622',
    'https://images.unsplash.com/photo-1515162305285-0293e4767cc2',
    'https://images.unsplash.com/photo-1529070538774-1843cb3265df',
    'https://images.unsplash.com/photo-1504052434569-70ad5836ab65',
    'https://images.unsplash.com/photo-1445077100181-a33e9ac94db0',
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644',
    'https://images.unsplash.com/photo-1511632765486-a01980e01a18',
    'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c'
  ];

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-secondary font-bold uppercase tracking-widest text-sm mb-4 block">Visual Journey</span>
          <h1 className="text-5xl md:text-7xl font-serif text-primary mb-8">Gallery</h1>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
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
