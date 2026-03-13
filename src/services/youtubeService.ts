export interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  date: string;
  speaker: string;
  type: 'video';
}

export async function fetchLatestVideos(): Promise<YouTubeVideo[]> {
  const channelId = 'UCX9b9buBiXlcYbAC6LtzjzQ';
  const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;

  const parseXml = (xmlText: string): YouTubeVideo[] => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "text/xml");
    const entries = xmlDoc.getElementsByTagName("entry");
    
    const fetchedVideos: YouTubeVideo[] = [];
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      
      let videoId = "";
      // Try yt:videoId first
      const ytVideoIdTags = entry.getElementsByTagName("yt:videoId");
      if (ytVideoIdTags.length > 0) {
        videoId = ytVideoIdTags[0].textContent || "";
      } 
      
      // Fallback to videoId without namespace
      if (!videoId) {
        const videoIdTags = entry.getElementsByTagName("videoId");
        if (videoIdTags.length > 0) {
          videoId = videoIdTags[0].textContent || "";
        }
      }

      // Fallback to parsing the ID tag
      if (!videoId) {
        const idTag = entry.getElementsByTagName("id")[0]?.textContent || "";
        if (idTag.includes("yt:video:")) {
          videoId = idTag.replace("yt:video:", "");
        } else if (idTag.includes("v=")) {
          videoId = idTag.split("v=")[1].split("&")[0];
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
  };

  try {
    // 1. Try the primary RSS proxy
    try {
      const response = await fetch('/api/youtube');
      if (response.ok) {
        const xmlText = await response.text();
        const videos = parseXml(xmlText);
        if (videos.length > 0) return videos;
      }
    } catch (e) {}

    // 2. Try the JSON API fallback
    try {
      const jsonResponse = await fetch('/api/youtube/latest');
      if (jsonResponse.ok) {
        const data = await jsonResponse.json();
        if (data && data.length > 0) return data;
      }
    } catch (e) {}

    // 3. Last resort: Client-side proxy (AllOrigins)
    try {
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(rssUrl)}`;
      const response = await fetch(proxyUrl);
      if (response.ok) {
        const data = await response.json();
        if (data.contents) {
          const videos = parseXml(data.contents);
          if (videos.length > 0) return videos;
        }
      }
    } catch (e) {}
    
    return [];
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    return [];
  }
}
