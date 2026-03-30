import React from 'react';

export const AboutPage: React.FC = () => {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-[1440px] mx-auto px-4">
        <div className="text-center mb-20">
          <span className="text-secondary font-bold uppercase tracking-widest text-sm mb-4 block">Who We Are</span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif text-primary mb-8">Our Story & Vision</h1>
          <div className="w-24 h-1 bg-secondary mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-32 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl font-serif text-primary mb-6">Our Beginning</h2>
            <p className="text-primary/70 leading-relaxed mb-6">
              Founded on April 2nd, 2025, Joshua Missions Trust was established with a clear and divine mandate: to be a catalyst for spiritual renewal and social transformation. What began as a heartfelt vision to serve the community has quickly blossomed into a dedicated mission focused on reaching the unreached and empowering the marginalized.
            </p>
            <p className="text-primary/70 leading-relaxed">
              Though our journey is in its early chapters, it is already marked by a profound sense of purpose and a growing community of believers. We are committed to building a foundation of faith that will serve generations to come, standing as a testament to God's immediate and powerful work in our time.
            </p>
          </div>
          <div className="order-1 lg:order-2 rounded-3xl overflow-hidden shadow-2xl aspect-video">
            <img src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=1200" alt="History" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-32">
          <div className="bg-primary p-8 md:p-12 rounded-3xl text-warm-white">
            <h3 className="text-2xl md:text-3xl font-serif mb-6 text-secondary italic">Our Vision</h3>
            <p className="text-warm-white/70 leading-relaxed text-base md:text-lg">
              To see a transformed generation walking in the fullness of their divine purpose, impacting society with the love and truth of Jesus Christ.
            </p>
          </div>
          <div className="bg-accent-beige p-8 md:p-12 rounded-3xl text-primary">
            <h3 className="text-2xl md:text-3xl font-serif mb-6 text-secondary italic">Our Mission</h3>
            <p className="text-primary/70 leading-relaxed text-base md:text-lg">
              To preach the gospel, make disciples, and serve the community through holistic social service programs that address both spiritual and physical needs.
            </p>
          </div>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif text-primary mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Faith-Centered', desc: 'Everything we do is rooted in our unwavering faith in God.' },
              { title: 'Service-Driven', desc: 'We are called to serve others with humility and love.' },
              { title: 'Integrity', desc: 'We uphold the highest standards of honesty and transparency.' },
            ].map((v, i) => (
              <div key={i} className="p-8 border border-primary/5 rounded-2xl bg-white shadow-sm">
                <h4 className="font-serif text-xl font-bold mb-4 text-secondary">{v.title}</h4>
                <p className="text-primary/60 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
