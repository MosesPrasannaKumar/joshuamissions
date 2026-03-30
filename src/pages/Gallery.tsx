import React from 'react';
import { motion } from 'motion/react';

export const GalleryPage: React.FC = () => {
  const images = [
    '/gallery/gal-1.webp',
    '/gallery/gal-2.webp',
    '/gallery/gal-3.webp',
    '/gallery/gal-4.webp',
    '/gallery/gal-5.webp',
    '/gallery/gal-6.webp',
    '/gallery/gal-7.webp',
    '/gallery/gal-8.webp',
    '/gallery/gal-9.webp',
    '/gallery/gal-10.webp'
  ];

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-[1440px] mx-auto px-4">
        <div className="text-center mb-20">
          <span className="text-secondary font-bold uppercase tracking-widest text-sm mb-4 block">Visual Journey</span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif text-primary mb-8">Gallery</h1>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 md:gap-8 space-y-6 md:space-y-8">
          {images.map((img, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="break-inside-avoid rounded-2xl overflow-hidden shadow-lg cursor-pointer bg-accent-beige"
            >
              <img 
                src={img} 
                alt={`Gallery Image ${i + 1}`} 
                className="w-full h-auto block hover:opacity-90 transition-opacity" 
                referrerPolicy="no-referrer" 
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
