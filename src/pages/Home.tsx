import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Clock, Quote, Play, Music, FileText, ChevronRight } from 'lucide-react';
import { Page } from '../types';
import { MINISTRIES, UPCOMING_EVENTS, LATEST_SERMONS } from '../constants';

interface HomePageProps {
  navigate: (page: Page) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ navigate }) => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&q=80&w=1920" 
            alt="Worship" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 hero-gradient"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block text-secondary font-bold uppercase tracking-[0.3em] text-sm mb-6">Welcome to Joshua Missions</span>
            <h1 className="text-4xl sm:text-6xl md:text-8xl text-warm-white font-serif leading-tight mb-8">
              Sharing Faith. <br />
              <span className="italic text-secondary">Serving Communities.</span>
            </h1>
            <p className="text-lg md:text-xl text-warm-white/80 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
              Joshua Missions Church is dedicated to prayer, spiritual growth, and community transformation through the love of Christ.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <button 
                onClick={() => navigate('contact')}
                className="w-full md:w-auto bg-secondary text-primary px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-transform"
              >
                Join Worship
              </button>
              <button 
                onClick={() => navigate('events')}
                className="w-full md:w-auto border border-warm-white/30 text-warm-white px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-warm-white/10 transition-all"
              >
                View Events
              </button>
            </div>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-warm-white/50"
        >
          <div className="w-px h-12 bg-gradient-to-b from-secondary to-transparent mx-auto"></div>
        </motion.div>
      </section>

      {/* About Preview */}
      <section className="py-24 bg-warm-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1541976844346-f18aeac57b06?auto=format&fit=crop&q=80&w=1200" 
                  alt="Community" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 bg-primary p-6 md:p-10 rounded-2xl shadow-2xl">
                <p className="text-secondary font-serif text-3xl md:text-4xl font-bold mb-2">Est.</p>
                <p className="text-warm-white/60 uppercase tracking-widest text-[10px] md:text-xs">April 2025</p>
              </div>
            </div>
            <div>
              <span className="text-secondary font-bold uppercase tracking-widest text-sm mb-4 block">Our Story</span>
              <h2 className="text-4xl md:text-5xl font-serif text-primary mb-8 leading-tight">A New Vision of Faith and Compassion</h2>
              <p className="text-primary/70 text-lg leading-relaxed mb-8">
                Joshua Missions Trust was founded with a singular vision: to be a beacon of hope in a world that needs the light of Christ. What started as a small prayer gathering has grown into a vibrant community dedicated to spiritual excellence and social impact.
              </p>
              <button 
                onClick={() => navigate('about')}
                className="group flex items-center gap-3 text-primary font-bold uppercase tracking-widest text-sm hover:text-secondary transition-colors"
              >
                Learn More About Us <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Weekly Worship Schedule */}
      <section className="py-24 bg-accent-beige">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-secondary font-bold uppercase tracking-widest text-sm mb-4 block">Gather With Us</span>
            <h2 className="text-4xl md:text-5xl font-serif text-primary">Weekly Worship Schedule</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              { title: 'Sunday Worship', time: '9:00 AM - 11:30 AM', desc: 'Main service with worship and word.' },
              { title: 'Weekly Prayer', time: 'Wednesdays, 6:30 PM', desc: 'Mid-week intercession and fellowship.' },
              { title: 'Bible Study', time: 'Fridays, 7:00 PM', desc: 'Deep diving into the scriptures together.' },
              { title: 'Fasting Prayer', time: '1st Saturday, 10:00 AM', desc: 'A day of seeking God with fasting.' },
            ].map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="bg-warm-white p-8 rounded-2xl shadow-sm border border-primary/5 text-center"
              >
                <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Clock className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="font-serif text-xl font-bold mb-3 text-primary">{item.title}</h3>
                <p className="text-secondary font-bold text-sm mb-4">{item.time}</p>
                <p className="text-primary/60 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ministries Preview */}
      <section className="py-24 bg-warm-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="text-secondary font-bold uppercase tracking-widest text-sm mb-4 block">Our Ministries</span>
              <h2 className="text-4xl md:text-5xl font-serif text-primary">Engaging Every Generation</h2>
            </div>
            <button 
              onClick={() => navigate('ministries')}
              className="bg-primary text-warm-white px-8 py-3 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-secondary transition-colors"
            >
              View All Ministries
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {MINISTRIES.slice(0, 3).map((m, i) => (
              <div key={i} className="group relative overflow-hidden rounded-2xl aspect-[4/5]">
                <img 
                  src={`https://images.unsplash.com/photo-${i === 0 ? '1507692049790-de58290a4334' : i === 1 ? '1526948128573-703ee1aeb6fa' : '1511632765486-a01980e01a18'}?auto=format&fit=crop&q=80&w=800`} 
                  alt={m.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8">
                  <h3 className="text-2xl font-serif text-warm-white mb-2">{m.title}</h3>
                  <p className="text-warm-white/70 text-sm mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {m.description}
                  </p>
                  <button className="text-secondary font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                    Learn More <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Impact / Storytelling */}
      <section className="py-24 bg-primary text-warm-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary/5 -skew-x-12 transform translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="text-secondary font-bold uppercase tracking-widest text-sm mb-4 block">Social Impact</span>
              <h2 className="text-4xl md:text-6xl font-serif mb-8 leading-tight">Beyond the Walls: <br /><span className="italic text-secondary">Our Mission in Action</span></h2>
              <div className="space-y-8">
                {[
                  { title: 'Charity & Aid', desc: 'Providing essential resources to families in need across the region.' },
                  { title: 'Food Support', desc: 'Weekly community kitchen serving nutritious meals to the homeless.' },
                  { title: 'Prayer Support', desc: 'A 24/7 prayer line offering spiritual comfort and guidance.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="w-12 h-12 rounded-full border border-secondary/30 flex items-center justify-center shrink-0">
                      <span className="text-secondary font-serif text-xl italic">{i + 1}</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-serif font-bold mb-2">{item.title}</h4>
                      <p className="text-warm-white/60 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative mt-12 lg:mt-0">
              <div className="aspect-square max-w-md mx-auto rounded-full overflow-hidden border-8 border-warm-white/10 p-4">
                <img 
                  src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1200" 
                  alt="Impact" 
                  className="w-full h-full object-cover rounded-full"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute top-1/2 -left-4 md:-left-10 bg-warm-white text-primary p-6 md:p-8 rounded-2xl shadow-2xl max-w-[200px] md:max-w-xs transform -translate-y-1/2">
                <Quote className="w-6 h-6 md:w-8 md:h-8 text-secondary mb-4" />
                <p className="font-serif italic text-sm md:text-lg mb-4">"Joshua Missions didn't just give me food; they gave me a family and a reason to hope again."</p>
                <p className="text-[10px] uppercase tracking-widest font-bold text-primary/40">— Community Member</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sermons Preview */}
      <section className="py-24 bg-warm-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-secondary font-bold uppercase tracking-widest text-sm mb-4 block">Spiritual Nourishment</span>
            <h2 className="text-4xl md:text-5xl font-serif text-primary">Latest Sermons</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {LATEST_SERMONS.map((sermon) => (
              <div key={sermon.id} className="group cursor-pointer">
                <div className="relative aspect-video rounded-2xl overflow-hidden mb-6">
                  <img 
                    src={sermon.thumbnail} 
                    alt={sermon.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/40 transition-colors flex items-center justify-center">
                    <div className="w-16 h-16 bg-warm-white rounded-full flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform">
                      {sermon.type === 'video' ? <Play className="w-6 h-6 text-primary fill-primary" /> : <Music className="w-6 h-6 text-primary" />}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-secondary text-xs font-bold uppercase tracking-widest mb-2 block">{sermon.date} • {sermon.speaker}</span>
                    <h3 className="text-2xl font-serif text-primary group-hover:text-secondary transition-colors">{sermon.title}</h3>
                  </div>
                  <button className="p-2 rounded-full border border-primary/10 hover:bg-primary/5 transition-colors">
                    <FileText className="w-5 h-5 text-primary/40" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-accent-beige">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-primary rounded-3xl md:rounded-[3rem] p-8 md:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-20">
              <img src="https://images.unsplash.com/photo-1548625361-195fe5772df8?auto=format&fit=crop&q=80&w=1200" alt="Pattern" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-serif text-warm-white mb-8">Ready to Start Your Journey?</h2>
              <p className="text-warm-white/70 text-lg mb-12 max-w-2xl mx-auto">
                Whether you're looking for a church home, need prayer, or want to support our mission, we'd love to connect with you.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <button onClick={() => navigate('contact')} className="bg-secondary text-primary px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-warm-white transition-colors">Visit Us</button>
                <button onClick={() => navigate('donate')} className="border border-warm-white/30 text-warm-white px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-warm-white/10 transition-colors">Support Us</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
