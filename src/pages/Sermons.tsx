import React, { useEffect, useState } from 'react';
import { Play, Music, FileText, Youtube, ExternalLink, Loader2 } from 'lucide-react';
import { fetchLatestVideos, YouTubeVideo } from '../services/youtubeService';

interface SermonVideo {
  id: string;
  title: string;
  date: string;
  thumbnail: string;
  link: string;
}

export const SermonsPage: React.FC = () => {
  const [videos, setVideos] = useState<SermonVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const fetchedVideos = await fetchLatestVideos();
        const formattedVideos: SermonVideo[] = fetchedVideos.map(v => ({
          id: v.id,
          title: v.title,
          date: v.date,
          thumbnail: v.thumbnail,
          link: `https://www.youtube.com/watch?v=${v.id}`
        }));
        setVideos(formattedVideos);
      } catch (error) {
        console.error("Error loading videos:", error);
      } finally {
        setLoading(false);
      }
    };
    loadVideos();
  }, []);

  const featuredSermon = videos[0];
  const latestSermons = videos.slice(1, 7);

  if (loading) {
    return (
      <div className="pt-32 pb-24 flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="w-12 h-12 text-secondary animate-spin mb-4" />
        <p className="text-primary/60 font-serif italic">Loading latest sermons...</p>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-[1440px] mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-secondary font-bold uppercase tracking-widest text-sm mb-4 block">Joshua Missions Church</span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif text-primary mb-4">Sermons</h1>
          <p className="text-primary/60 max-w-2xl mx-auto">Watch and listen to the latest messages from Rev. S. Joshua Vasan</p>
        </div>

        {/* Featured Sermon */}
        {featuredSermon && (
          <div className="mb-24">
            <div className="bg-white rounded-[2rem] overflow-hidden shadow-2xl border border-primary/5 grid grid-cols-1 lg:grid-cols-12 gap-0">
              <div className="lg:col-span-7 relative aspect-video bg-black">
                {activeVideo === featuredSermon.id ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${featuredSermon.id}?autoplay=1`}
                    title={featuredSermon.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <div className="relative w-full h-full group cursor-pointer" onClick={() => setActiveVideo(featuredSermon.id)}>
                    <img 
                      src={featuredSermon.thumbnail} 
                      alt={featuredSermon.title} 
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 bg-secondary text-primary rounded-full flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform">
                        <Play className="w-8 h-8 fill-primary" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-center">
                <span className="text-secondary font-bold uppercase tracking-widest text-[10px] mb-4 block">Featured Message</span>
                <span className="text-primary/40 text-xs font-bold uppercase tracking-widest mb-2 block">{featuredSermon.date}</span>
                <h2 className="text-3xl md:text-4xl font-serif text-primary mb-6 leading-tight">{featuredSermon.title}</h2>
                <p className="text-primary/60 mb-8 line-clamp-3">Join us for this powerful message as we dive deep into the Word of God and discover the promises inherited through faith.</p>
                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={() => setActiveVideo(featuredSermon.id)}
                    className="bg-primary text-warm-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-secondary transition-colors flex items-center gap-2"
                  >
                    <Play className="w-4 h-4 fill-warm-white" /> Watch Now
                  </button>
                  <a 
                    href={featuredSermon.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-primary/10 text-primary px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-primary/5 transition-colors flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" /> View on YouTube
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Latest Sermons Grid */}
        <div className="mb-20">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-serif text-primary mb-2">Recent Teachings</h2>
              <div className="w-20 h-1 bg-secondary"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestSermons.map((sermon) => (
              <div 
                key={sermon.id} 
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-primary/5 group flex flex-col"
              >
                <div 
                  className="relative aspect-video cursor-pointer overflow-hidden"
                  onClick={() => window.open(`https://www.youtube.com/watch?v=${sermon.id}`, '_blank')}
                >
                  <img 
                    src={sermon.thumbnail} 
                    alt={sermon.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/40 transition-colors flex items-center justify-center">
                    <div className="w-12 h-12 bg-warm-white rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 text-primary fill-primary" />
                    </div>
                  </div>
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <span className="text-secondary text-[10px] font-bold uppercase tracking-widest mb-2 block">{sermon.date}</span>
                  <h3 className="text-lg font-serif text-primary mb-6 line-clamp-2 group-hover:text-secondary transition-colors leading-snug">{sermon.title}</h3>
                  <div className="mt-auto pt-4 border-t border-primary/5 flex justify-between items-center">
                    <button 
                      onClick={() => window.open(`https://www.youtube.com/watch?v=${sermon.id}`, '_blank')}
                      className="text-primary font-bold uppercase tracking-widest text-[10px] hover:text-secondary transition-colors flex items-center gap-2"
                    >
                      Watch Now <ExternalLink className="w-3 h-3" />
                    </button>
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

        {/* Watch More Section */}
        <div className="text-center pt-12 border-t border-primary/5">
          <a 
            href="https://www.youtube.com/@Rev.S.JoshuaVasan" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-red-600 text-white px-12 py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-red-700 transition-all shadow-xl hover:shadow-red-600/20 hover:-translate-y-1"
          >
            <Youtube className="w-6 h-6" /> Watch More on YouTube
          </a>
          <p className="mt-8 text-primary/40 text-xs uppercase tracking-[0.2em]">Subscribe to our channel for daily spiritual nourishment</p>
        </div>
      </div>
    </div>
  );
};
