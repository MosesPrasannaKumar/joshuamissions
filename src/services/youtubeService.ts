export interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  date: string;
  speaker: string;
  type: 'video';
}

export async function fetchLatestVideos(): Promise<YouTubeVideo[]> {
  try {
    // Try the RSS proxy first as it's the most direct and requested method
    const response = await fetch('/api/youtube');
    
    if (response.ok) {
      const xmlText = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, "text/xml");
      const entries = xmlDoc.getElementsByTagName("entry");
      
      const fetchedVideos: YouTubeVideo[] = [];
      for (let i = 0; i < entries.length; i++) {
        const entry = entries[i];
        
        let videoId = "";
        const ytVideoIdTags = entry.getElementsByTagName("yt:videoId");
        if (ytVideoIdTags.length > 0) {
          videoId = ytVideoIdTags[0].textContent || "";
        } else {
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
      
      if (fetchedVideos.length > 0) return fetchedVideos;
    }

    // Fallback to the JSON API if RSS fails
    const jsonResponse = await fetch('/api/youtube/latest');
    if (jsonResponse.ok) {
      return await jsonResponse.json();
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    return [];
  }
}
