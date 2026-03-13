export async function onRequest(context) {
  const channelId = 'UCX9b9buBiXlcYbAC6LtzjzQ';
  const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;

  const headers = {
    'Content-Type': 'application/xml',
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'public, max-age=1800'
  };

  async function fetchWithFallback(url) {
    // 1. Try direct fetch
    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
          'Accept': 'application/xml,text/xml,*/*'
        }
      });
      if (response.ok) return await response.text();
    } catch (e) {}

    // 2. Try AllOrigins Proxy (Raw)
    try {
      const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
      const response = await fetch(proxyUrl);
      if (response.ok) return await response.text();
    } catch (e) {}

    // 3. Try Codetabs Proxy
    try {
      const proxyUrl = `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`;
      const response = await fetch(proxyUrl);
      if (response.ok) return await response.text();
    } catch (e) {}

    throw new Error('All fetch methods failed');
  }

  try {
    const xml = await fetchWithFallback(rssUrl);
    return new Response(xml, { headers });
  } catch (error) {
    return new Response(`Error: ${error.message}`, { 
      status: 500,
      headers: { 'Access-Control-Allow-Origin': '*' }
    });
  }
}
