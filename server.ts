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
  const CACHE_DURATION = 60 * 60 * 1000; // 1 hour
  let isRefreshing = false;

  async function refreshYouTubeCache(rssUrl: string, channelId: string, apiKey?: string) {
    if (isRefreshing) return;
    isRefreshing = true;
    
    let videos = [];
    try {
      if (apiKey) {
        const apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=2&type=video`;
        const apiResponse = await axios.get(apiUrl, { timeout: 5000 });
        videos = apiResponse.data.items.map((item: any) => ({
          id: item.id.videoId,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default?.url,
          date: new Date(item.snippet.publishedAt).toLocaleDateString('en-US', {
            month: 'long', day: 'numeric', year: 'numeric'
          }),
          speaker: 'Rev. S. Joshua Vasan',
          type: 'video'
        }));
      } else {
        // Try Primary RSS
        try {
          const rssResponse = await axios.get(rssUrl, { 
            timeout: 5000,
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
              'Accept': 'application/xml,text/xml,*/*'
            }
          });
          const result = await parseStringPromise(rssResponse.data);
          const entries = result.feed.entry || [];
          videos = entries.slice(0, 2).map((entry: any) => {
            const videoId = entry['yt:videoId'][0];
            return {
              id: videoId,
              title: entry.title[0],
              thumbnail: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
              date: new Date(entry.published[0]).toLocaleDateString('en-US', {
                month: 'long', day: 'numeric', year: 'numeric'
              }),
              speaker: 'Rev. S. Joshua Vasan',
              type: 'video'
            };
          });
        } catch (e) {
          // Try Proxy 1: rss2json
          try {
            const proxyUrl1 = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;
            const res = await axios.get(proxyUrl1, { timeout: 5000 });
            if (res.data?.items?.length > 0) {
              videos = res.data.items.slice(0, 2).map((item: any) => ({
                id: item.link.split('v=')[1]?.split('&')[0] || '',
                title: item.title,
                thumbnail: item.thumbnail || `https://i.ytimg.com/vi/${item.link.split('v=')[1]?.split('&')[0]}/maxresdefault.jpg`,
                date: new Date(item.pubDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
                speaker: 'Rev. S. Joshua Vasan',
                type: 'video'
              }));
            } else throw new Error('Proxy 1 empty');
          } catch (e2) {
            // Try Proxy 2: allorigins
            try {
              const proxyUrl2 = `https://api.allorigins.win/get?url=${encodeURIComponent(rssUrl)}`;
              const res = await axios.get(proxyUrl2, { timeout: 5000 });
              const result = await parseStringPromise(res.data.contents);
              const entries = result.feed.entry || [];
              videos = entries.slice(0, 2).map((entry: any) => ({
                id: entry['yt:videoId'][0],
                title: entry.title[0],
                thumbnail: `https://i.ytimg.com/vi/${entry['yt:videoId'][0]}/maxresdefault.jpg`,
                date: new Date(entry.published[0]).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
                speaker: 'Rev. S. Joshua Vasan',
                type: 'video'
              }));
            } catch (e3) {
              // Final Proxy 3: codetabs
              const proxyUrl3 = `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(rssUrl)}`;
              const res = await axios.get(proxyUrl3, { timeout: 5000 });
              const result = await parseStringPromise(res.data);
              const entries = result.feed.entry || [];
              videos = entries.slice(0, 2).map((entry: any) => ({
                id: entry['yt:videoId'][0],
                title: entry.title[0],
                thumbnail: `https://i.ytimg.com/vi/${entry['yt:videoId'][0]}/maxresdefault.jpg`,
                date: new Date(entry.published[0]).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
                speaker: 'Rev. S. Joshua Vasan',
                type: 'video'
              }));
            }
          }
        }
      }
      
      if (videos.length > 0) {
        videoCache = { data: videos, timestamp: Date.now() };
      }
    } catch (error) {
      console.error('Background refresh failed, will retry later');
    } finally {
      isRefreshing = false;
    }
  }

  // API Route for YouTube Latest Videos
  app.get('/api/youtube/latest', async (req, res) => {
    const channelId = 'UCX9b9buBiXlcYbAC6LtzjzQ';
    const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
    const apiKey = process.env.YOUTUBE_API_KEY;

    // 1. If we have ANY cache, serve it immediately (Stale-While-Revalidate)
    if (videoCache) {
      res.json(videoCache.data);
      
      // 2. If cache is expired, refresh it in the background
      if (Date.now() - videoCache.timestamp > CACHE_DURATION) {
        refreshYouTubeCache(rssUrl, channelId, apiKey);
      }
      return;
    }

    // 3. If NO cache exists (first load), we must wait for a fresh fetch
    await refreshYouTubeCache(rssUrl, channelId, apiKey);
    
    if (videoCache) {
      res.json(videoCache.data);
    } else {
      // 4. Ultimate fallback if everything fails on first run
      res.json([
        {
          id: 'vABiCy61iY8',
          title: 'The Power of Prayer',
          thumbnail: 'https://i.ytimg.com/vi/vABiCy61iY8/maxresdefault.jpg',
          date: 'Recent',
          speaker: 'Rev. S. Joshua Vasan',
          type: 'video'
        },
        {
          id: 'LeKskNVb9XU',
          title: 'Walking in Faith',
          thumbnail: 'https://i.ytimg.com/vi/LeKskNVb9XU/maxresdefault.jpg',
          date: 'Recent',
          speaker: 'Rev. S. Joshua Vasan',
          type: 'video'
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
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
