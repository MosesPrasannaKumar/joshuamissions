export interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  date: string;
  speaker: string;
  type: 'video';
}

// Permanent fallback videos to ensure the UI is never empty
const STATIC_FALLBACK_VIDEOS: YouTubeVideo[] = [
  {
    id: 'vABiCy61iY8',
    title: 'Sunday Worship Service - The Power of Prayer',
    thumbnail: 'https://i.ytimg.com/vi/vABiCy61iY8/maxresdefault.jpg',
    date: 'March 9, 2025',
    speaker: 'Rev. S. Joshua Vasan',
    type: 'video'
  },
  {
    id: 'LeKskNVb9XU',
    title: 'Walking in Faith - Mid-week Meditation',
    thumbnail: 'https://i.ytimg.com/vi/LeKskNVb9XU/maxresdefault.jpg',
    date: 'March 5, 2025',
    speaker: 'Rev. S. Joshua Vasan',
    type: 'video'
  },
  {
    id: 'X7R1_vABiCy',
    title: 'Spiritual Growth and Community Transformation',
    thumbnail: 'https://i.ytimg.com/vi/vABiCy61iY8/hqdefault.jpg',
    date: 'March 2, 2025',
    speaker: 'Rev. S. Joshua Vasan',
    type: 'video'
  }
];

export async function fetchLatestVideos(): Promise<YouTubeVideo[]> {
  const channelId = 'UCX9b9buBiXlcYbAC6LtzjzQ';
  const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;

  const parseXml = (xmlText: string): YouTubeVideo[] => {
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, "text/xml");
      
      // Check for parsing errors
      const parserError = xmlDoc.getElementsByTagName("parsererror");
      if (parserError.length > 0) {
        console.warn("XML Parsing Error, attempting manual regex extraction");
        return extractVideosRegex(xmlText);
      }

      const entries = xmlDoc.getElementsByTagName("entry");
      const fetchedVideos: YouTubeVideo[] = [];
      
      for (let i = 0; i < entries.length; i++) {
        const entry = entries[i];
        let videoId = "";
        
        const ytVideoIdTags = entry.getElementsByTagName("yt:videoId");
        if (ytVideoIdTags.length > 0) {
          videoId = ytVideoIdTags[0].textContent || "";
        } 
        
        if (!videoId) {
          const idTag = entry.getElementsByTagName("id")[0]?.textContent || "";
          if (idTag.includes("yt:video:")) {
            videoId = idTag.replace("yt:video:", "");
          }
        }

        const title = entry.getElementsByTagName("title")[0]?.textContent || "";
        const published = entry.getElementsByTagName("published")[0]?.textContent || "";
        
        if (videoId) {
          fetchedVideos.push({
            id: videoId,
            title,
            date: new Date(published).toLocaleDateString('en-US', {
              month: 'long', day: 'numeric', year: 'numeric'
            }),
            thumbnail: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
            speaker: 'Rev. S. Joshua Vasan',
            type: 'video'
          });
        }
      }
      return fetchedVideos;
    } catch (e) {
      return extractVideosRegex(xmlText);
    }
  };

  // Manual regex extraction as a backup to DOMParser
  const extractVideosRegex = (xmlText: string): YouTubeVideo[] => {
    const videos: YouTubeVideo[] = [];
    const videoIdRegex = /<yt:videoId>([^<]+)<\/yt:videoId>/g;
    const titleRegex = /<title>([^<]+)<\/title>/g;
    const publishedRegex = /<published>([^<]+)<\/published>/g;
    
    let match;
    const ids: string[] = [];
    while ((match = videoIdRegex.exec(xmlText)) !== null) {
      ids.push(match[1]);
    }
    
    const titles: string[] = [];
    while ((match = titleRegex.exec(xmlText)) !== null) {
      // Skip the first title which is usually the channel title
      titles.push(match[1]);
    }
    if (titles.length > ids.length) titles.shift();

    const dates: string[] = [];
    while ((match = publishedRegex.exec(xmlText)) !== null) {
      dates.push(match[1]);
    }

    for (let i = 0; i < ids.length; i++) {
      videos.push({
        id: ids[i],
        title: titles[i] || "Sermon Video",
        date: new Date(dates[i] || Date.now()).toLocaleDateString('en-US', {
          month: 'long', day: 'numeric', year: 'numeric'
        }),
        thumbnail: `https://i.ytimg.com/vi/${ids[i]}/maxresdefault.jpg`,
        speaker: 'Rev. S. Joshua Vasan',
        type: 'video'
      });
    }
    return videos;
  };

  try {
    // 1. Try the JSON API first (Server-side parsed, more reliable)
    try {
      const jsonResponse = await fetch('/api/youtube/latest');
      if (jsonResponse.ok) {
        const data = await jsonResponse.json();
        if (data && data.length > 0) {
          // Ensure unique IDs
          const uniqueMap = new Map(data.map((v: YouTubeVideo) => [v.id, v]));
          return Array.from(uniqueMap.values()) as YouTubeVideo[];
        }
      }
    } catch (e) {
      console.warn("JSON API failed, falling back to RSS");
    }

    // 2. Try the primary RSS proxy
    try {
      const response = await fetch('/api/youtube');
      if (response.ok) {
        const xmlText = await response.text();
        const videos = parseXml(xmlText);
        if (videos.length > 0) {
          const uniqueMap = new Map(videos.map((v: YouTubeVideo) => [v.id, v]));
          return Array.from(uniqueMap.values()) as YouTubeVideo[];
        }
      }
    } catch (e) {}

    // 3. Try Client-side proxy (AllOrigins)
    try {
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(rssUrl)}`;
      const response = await fetch(proxyUrl);
      if (response.ok) {
        const data = await response.json();
        if (data.contents) {
          const videos = parseXml(data.contents);
          if (videos.length > 0) {
            const uniqueMap = new Map(videos.map((v: YouTubeVideo) => [v.id, v]));
            return Array.from(uniqueMap.values()) as YouTubeVideo[];
          }
        }
      }
    } catch (e) {}
    
    // 4. Ultimate Fallback
    console.warn("All YouTube fetch methods failed, using static fallback.");
    return STATIC_FALLBACK_VIDEOS;
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    return STATIC_FALLBACK_VIDEOS;
  }
}
