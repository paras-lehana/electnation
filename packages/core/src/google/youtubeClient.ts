import { google, youtube_v3 } from 'googleapis';

let youtube: youtube_v3.Youtube | null = null;

export const getYoutubeClient = () => {
  if (!youtube) {
    youtube = google.youtube({
      version: 'v3',
      auth: process.env.GOOGLE_API_KEY || process.env.GOOGLE_MAPS_API_KEY,
    });
  }
  return youtube;
};

export const searchSVEEPContent = async (query: string = 'ECI SVEEP') => {
  const client = getYoutubeClient();
  const response = await client.search.list({
    part: ['snippet'],
    q: query,
    maxResults: 10,
    type: ['video'],
    relevanceLanguage: 'hi',
  });
  return response.data.items;
};

export const getElectionPlaylist = async (playlistId: string) => {
  const client = getYoutubeClient();
  const response = await client.playlistItems.list({
    part: ['snippet', 'contentDetails'],
    playlistId,
    maxResults: 50,
  });
  return response.data.items;
};
