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
    const response = await fetch('/api/youtube/latest');
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch videos');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    return [];
  }
}
