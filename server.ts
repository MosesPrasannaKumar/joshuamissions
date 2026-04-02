import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import axios from 'axios';
import { parseStringPromise } from 'xml2js';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Simple in-memory cache with background refresh support
  let videoCache: { data: any[], timestamp: number } | null = null;
  const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes
  let isRefreshing = false;

  async function refreshYouTubeCache(rssUrl: string, channelId: string, apiKey?: string, force = false) {
    if (isRefreshing && !force) return;
    isRefreshing = true;
    
    let videos = [];
    try {
      if (apiKey) {
        console.log('Fetching from YouTube Data API v3...');
        // Fetch up to 50 videos to populate the Sermons page
        const apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=50&type=video`;
        const apiResponse = await axios.get(apiUrl, { timeout: 10000 });
        videos = apiResponse.data.items.map((item: any) => ({
          id: item.id.videoId,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default?.url,
          date: new Date(item.snippet.publishedAt).toLocaleDateString('en-US', {
            month: 'long', day: 'numeric', year: 'numeric'
          }),
          speaker: 'Rev. S. Joshua Vasan',
          type: 'video',
          isLive: item.snippet.liveBroadcastContent === 'live'
        }));
      } else {
        // Try Primary RSS
        try {
          console.log('Fetching from YouTube RSS (Primary)...');
          const rssResponse = await axios.get(rssUrl, { 
            timeout: 10000,
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
              'Accept': 'application/xml,text/xml,*/*'
            }
          });
          const result = await parseStringPromise(rssResponse.data);
          const entries = result?.feed?.entry || [];
          // Increase slice to 50 for the Sermons page
          videos = entries.slice(0, 50).map((entry: any) => {
            const videoId = entry['yt:videoId']?.[0] || 
                          (entry.id?.[0]?.includes('yt:video:') ? entry.id[0].replace('yt:video:', '') : '');
            return {
              id: videoId,
              title: entry.title?.[0] || 'Sermon Video',
              thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
              date: new Date(entry.published?.[0] || Date.now()).toLocaleDateString('en-US', {
                month: 'long', day: 'numeric', year: 'numeric'
              }),
              speaker: 'Rev. S. Joshua Vasan',
              type: 'video',
              isLive: false // RSS doesn't reliably show live status
            };
          });
        } catch (e) {
          // Try Proxy 1: rss2json
          try {
            console.log('Fetching from YouTube RSS (Proxy 1)...');
            const proxyUrl1 = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;
            const res = await axios.get(proxyUrl1, { timeout: 10000 });
            if (res.data?.items?.length > 0) {
              videos = res.data.items.slice(0, 50).map((item: any) => ({
                id: item.link.split('v=')[1]?.split('&')[0] || '',
                title: item.title,
                thumbnail: item.thumbnail || `https://i.ytimg.com/vi/${item.link.split('v=')[1]?.split('&')[0]}/hqdefault.jpg`,
                date: new Date(item.pubDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
                speaker: 'Rev. S. Joshua Vasan',
                type: 'video',
                isLive: false
              }));
            } else throw new Error('Proxy 1 empty');
          } catch (e2) {
            // Try Proxy 2: allorigins
            try {
              console.log('Fetching from YouTube RSS (Proxy 2)...');
              const proxyUrl2 = `https://api.allorigins.win/get?url=${encodeURIComponent(rssUrl)}`;
              const res = await axios.get(proxyUrl2, { timeout: 10000 });
              const result = await parseStringPromise(res.data.contents);
              const entries = result?.feed?.entry || [];
              videos = entries.slice(0, 50).map((entry: any) => {
                const videoId = entry['yt:videoId']?.[0] || 
                              (entry.id?.[0]?.includes('yt:video:') ? entry.id[0].replace('yt:video:', '') : '');
                return {
                  id: videoId,
                  title: entry.title?.[0] || 'Sermon Video',
                  thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
                  date: new Date(entry.published?.[0] || Date.now()).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
                  speaker: 'Rev. S. Joshua Vasan',
                  type: 'video',
                  isLive: false
                };
              });
            } catch (e3) {
              // Final Proxy 3: codetabs
              console.log('Fetching from YouTube RSS (Proxy 3)...');
              const proxyUrl3 = `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(rssUrl)}`;
              const res = await axios.get(proxyUrl3, { timeout: 10000 });
              const result = await parseStringPromise(res.data);
              const entries = result?.feed?.entry || [];
              videos = entries.slice(0, 50).map((entry: any) => {
                const videoId = entry['yt:videoId']?.[0] || 
                              (entry.id?.[0]?.includes('yt:video:') ? entry.id[0].replace('yt:video:', '') : '');
                return {
                  id: videoId,
                  title: entry.title?.[0] || 'Sermon Video',
                  thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
                  date: new Date(entry.published?.[0] || Date.now()).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
                  speaker: 'Rev. S. Joshua Vasan',
                  type: 'video',
                  isLive: false
                };
              });
            }
          }
        }
      }
      
      if (videos.length > 0) {
        // Ensure unique IDs before caching
        const uniqueMap = new Map();
        videos.forEach(v => {
          if (v.id && !uniqueMap.has(v.id)) {
            uniqueMap.set(v.id, v);
          }
        });
        videoCache = { data: Array.from(uniqueMap.values()), timestamp: Date.now() };
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.warn(`Background refresh notice: ${errorMessage}. Will retry on next request.`);
    } finally {
      isRefreshing = false;
    }
  }

  // Cache for raw RSS XML
  let rssCache: { data: string, timestamp: number } | null = null;
  const RSS_CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

  // Raw RSS Proxy for DOMParser usage in frontend
  // Aliased to /api/youtube as requested
  app.get(['/api/youtube', '/api/youtube/rss-proxy'], async (req, res) => {
    // Add CORS headers for frontend access
    res.set('Access-Control-Allow-Origin', '*');
    // Prevent caching of the API response
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    
    const channelId = 'UCX9b9buBiXlcYbAC6LtzjzQ';
    const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;

    // Serve from cache if valid
    if (rssCache && (Date.now() - rssCache.timestamp < RSS_CACHE_DURATION)) {
      res.set('Content-Type', 'application/xml');
      return res.send(rssCache.data);
    }

    const fetchRss = async (url: string) => {
      // Try direct fetch first with enhanced headers
      try {
        const response = await axios.get(url, { 
          timeout: 7000,
          headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.9',
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Sec-Ch-Ua': '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
            'Sec-Ch-Ua-Mobile': '?0',
            'Sec-Ch-Ua-Platform': '"macOS"',
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'none',
            'Sec-Fetch-User': '?1',
            'Upgrade-Insecure-Requests': '1'
          }
        });
        return response.data;
      } catch (error) {
        // Silent fallback to proxies to avoid cluttering logs if direct fetch is rate-limited
        
        // Try Proxy 1: allorigins (reliable for XML)
        try {
          const proxyUrl1 = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
          const res1 = await axios.get(proxyUrl1, { timeout: 7000 });
          if (res1.data && res1.data.contents) return res1.data.contents;
          throw new Error('Proxy 1 returned empty content');
        } catch (e1) {
          // Try Proxy 2: codetabs
          try {
            const proxyUrl2 = `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`;
            const res2 = await axios.get(proxyUrl2, { timeout: 7000 });
            if (res2.data) return res2.data;
            throw new Error('Proxy 2 returned empty content');
          } catch (e2) {
            // Try Proxy 3: rss2json (returns JSON, so we'd need to convert back or handle it, 
            // but for now let's try one more XML-friendly proxy)
            try {
              const proxyUrl3 = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
              const res3 = await axios.get(proxyUrl3, { timeout: 7000 });
              if (res3.data) return res3.data;
              throw new Error('Proxy 3 returned empty content');
            } catch (e3) {
              throw new Error('All RSS fetch methods failed');
            }
          }
        }
      }
    };

    try {
      const xmlData = await fetchRss(rssUrl);
      rssCache = { data: xmlData, timestamp: Date.now() };
      res.set('Content-Type', 'application/xml');
      res.send(xmlData);
    } catch (error) {
      console.error('RSS Proxy Error:', error);
      
      // If we have a stale cache, serve it as a last resort
      if (rssCache) {
        res.set('Content-Type', 'application/xml');
        return res.send(rssCache.data);
      }
      
      res.status(500).send('Error fetching RSS');
    }
  });

  // API Route for YouTube Latest Videos
  app.get('/api/youtube/latest', async (req, res) => {
    // Add CORS headers
    res.set('Access-Control-Allow-Origin', '*');
    // Prevent caching of the API response
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    
    const channelId = 'UCX9b9buBiXlcYbAC6LtzjzQ';
    const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
    const apiKey = process.env.YOUTUBE_API_KEY;
    const forceRefresh = req.query.refresh === 'true';

    // 1. If we have ANY cache, serve it immediately (Stale-While-Revalidate)
    if (videoCache && !forceRefresh) {
      res.json(videoCache.data);
      
      // 2. If cache is expired, refresh it in the background
      if (Date.now() - videoCache.timestamp > CACHE_DURATION) {
        refreshYouTubeCache(rssUrl, channelId, apiKey);
      }
      return;
    }

    // 3. If NO cache exists (first load) or force refresh, we must wait for a fresh fetch
    await refreshYouTubeCache(rssUrl, channelId, apiKey, forceRefresh);
    
    if (videoCache) {
      res.json(videoCache.data);
    } else {
      // 4. Ultimate fallback if everything fails on first run
      res.json([
        {
          id: 'vABiCy61iY8',
          title: 'The Power of Prayer',
          thumbnail: 'https://i.ytimg.com/vi/vABiCy61iY8/hqdefault.jpg',
          date: 'Recent',
          speaker: 'Rev. S. Joshua Vasan',
          type: 'video',
          isLive: false
        },
        {
          id: 'LeKskNVb9XU',
          title: 'Walking in Faith',
          thumbnail: 'https://i.ytimg.com/vi/LeKskNVb9XU/hqdefault.jpg',
          date: 'Recent',
          speaker: 'Rev. S. Joshua Vasan',
          type: 'video',
          isLive: false
        }
      ]);
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
