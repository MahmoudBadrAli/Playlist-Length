const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
import axios from "axios";

type PlaylistItem = {
  contentDetails: {
    videoId: string;
    videoPublishedAt: string;
  };
};

type VideoDetails = {
  id: string;
  snippet: {
    title: string;
    description: string;
    channelTitle: string;
    publishedAt: string;
    thumbnails: {
      high: { url: string };
      medium: { url: string };
    };
  };
  contentDetails: {
    duration: string;
  };
  statistics: {
    viewCount: string;
    likeCount: string;
  };
};

type PlaylistInfo = {
  id: string;
  snippet: {
    title: string;
    channelTitle: string;
    thumbnails: {
      maxres?: { url: string };
      high: { url: string };
    };
  };
};

export const youtubeApi = {
  getAllPlaylistItems: async (playlistId: string) => {
    let allItems: PlaylistItem[] = [];
    let nextPageToken = "";

    try {
      do {
        const url = nextPageToken
          ? `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=50&playlistId=${playlistId}&key=${API_KEY}&pageToken=${nextPageToken}`
          : `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=50&playlistId=${playlistId}&key=${API_KEY}`;

        const response = await axios.get(url);
        allItems = [...allItems, ...response.data.items];
        nextPageToken = response.data.nextPageToken || "";
      } while (nextPageToken);

      return {
        items: allItems,
        totalResults: allItems.length,
      };
    } catch (error) {
      console.error("Error in fetching videos:", error);
      throw new Error("Failed to fetch the list of videos");
    }
  },
  getPlaylistInfo: async (playlistId: string) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails,status&id=${playlistId}&key=${API_KEY}`,
      );
      return response.data;
    } catch (error) {
      console.error("Error in playlist info:", error);
      throw new Error("Failed to retrieve playlist information");
    }
  },

  getVideosDetails: async (videoIds: string[]): Promise<VideoDetails[]> => {
    try {
      const chunks: string[][] = [];
      for (let i = 0; i < videoIds.length; i += 50) {
        chunks.push(videoIds.slice(i, i + 50));
      }

      const requests = chunks.map((chunk) =>
        axios.get(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${chunk.join(",")}&key=${API_KEY}`,
        ),
      );

      const responses = await Promise.all(requests);
      const allVideos: VideoDetails[] = [];

      responses.forEach((response) => {
        allVideos.push(...response.data.items);
      });

      return allVideos;
    } catch (error) {
      console.error("Error in video details:", error);
      throw new Error("Failed to retrieve video details");
    }
  },
};

export type { PlaylistItem, VideoDetails, PlaylistInfo };
