import React from 'react';
import { MapPin } from 'lucide-react';
import { UPCOMING_EVENTS } from '../constants';

export const EventsPage: React.FC = () => {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-[1440px] mx-auto px-4">
        <div className="text-center mb-20">
          <span className="text-secondary font-bold uppercase tracking-widest text-sm mb-4 block">Save the Date</span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif text-primary mb-8">Upcoming Events</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12">
          {UPCOMING_EVENTS.length > 0 ? (
            UPCOMING_EVENTS.map(event => (
              <div key={event.id} className="bg-white rounded-3xl overflow-hidden shadow-lg border border-primary/5 group">
                <div className="aspect-video overflow-hidden">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" loading="lazy" />
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-secondary/10 text-secondary px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                      {event.date}
                    </div>
                    <div className="flex items-center gap-1 text-primary/40 text-xs uppercase tracking-widest font-bold">
                      <MapPin className="w-3 h-3" /> {event.location}
                    </div>
                  </div>
                  <h3 className="text-3xl font-serif text-primary mb-4">{event.title}</h3>
                  <p className="text-primary/60 leading-relaxed mb-8">{event.description}</p>
                  <button className="w-full py-4 border border-primary/10 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-primary hover:text-warm-white transition-all">Register Now</button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20 bg-accent-beige rounded-3xl border border-dashed border-primary/20">
              <p className="text-primary/40 font-serif text-2xl italic mb-4">No upcoming events at the moment.</p>
              <p className="text-primary/60 max-w-md mx-auto">Please check back soon for updates on our latest gatherings and community outreach programs.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
