import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import {
  youtubeApi,
  type VideoDetails,
  type PlaylistInfo,
} from "../youtubeApi/youtubeApiSlice";
import { parseDuration, formatDuration } from "../../../utils/duration";

type PlaylistMetadata = {
  playlistTitle: string;
  playlistDescription: string;
  channelTitle: string;
  thumbnail: string | null;
  privacyStatus: string;
  videosCount: number;
  publishedAt: string;
  lastUpdate: string;
  totalDuration: string;
  totalDurationInSeconds: number;
  averageDuration: string;
  averageDurationInSeconds: number;
};

type PlaylistData = {
  playlistInfo: PlaylistInfo;
  videos: VideoDetails[];
  metadata: PlaylistMetadata;
};

type PlaylistState = {
  playlistTitle: any;
  playlist: PlaylistData | null;
  completedVideosCount: number;
  videosPerDay: number;
  isLoading: boolean;
  isFailed: boolean;
  error?: string;
};

export const fetchPlaylist = createAsyncThunk(
  "playlistAPI/fetchPlaylist",
  async (playlistLink: string, { rejectWithValue }) => {
    const match = playlistLink.match(/list=([^&]+)/i);
    const playlistId = match ? match[1] : null;

    if (!playlistId) {
      return rejectWithValue("Invalid playlist link");
    }

    try {
      const playlistInfo = await youtubeApi.getPlaylistInfo(playlistId);
      const playlistItems = await youtubeApi.getAllPlaylistItems(playlistId);
      const videoIds = playlistItems.items.map(
        (item) => item.contentDetails.videoId,
      );
      const videos = await youtubeApi.getVideosDetails(videoIds);
      const item = playlistInfo?.items?.[0];

      if (!item) {
        console.log("No playlist data yet");
        return rejectWithValue("No playlist data found");
      }

      const totalDurationInSeconds = videos.reduce((sum, video) => {
        const duration = video.contentDetails.duration;
        return sum + parseDuration(duration);
      }, 0);

      const averageDurationInSeconds = Math.floor(
        totalDurationInSeconds / videos.length,
      );

      const sortedVideosByDate = [...videos].sort((a, b) => {
        const dateA = new Date(a.snippet.publishedAt).getTime();
        const dateB = new Date(b.snippet.publishedAt).getTime();
        return dateB - dateA;
      });

      const playlistTitle = item.snippet?.title ?? "";
      const playlistDescription = item.snippet?.description ?? "";
      const channelTitle = item.snippet?.channelTitle ?? "";
      const thumbnail =
        item.snippet.thumbnails.maxres?.url ||
        item.snippet.thumbnails.standard?.url ||
        item.snippet.thumbnails.high?.url ||
        item.snippet.thumbnails.medium?.url ||
        item.snippet.thumbnails.default?.url ||
        null;
      const privacyStatus = item.status?.privacyStatus ?? "unknown";
      const videosCount = item.contentDetails?.itemCount ?? videos.length;
      const publishedAt = item.snippet?.publishedAt ?? "";
      const totalDuration = formatDuration(totalDurationInSeconds);
      const averageDuration = formatDuration(averageDurationInSeconds);
      const lastUpdate =
        sortedVideosByDate[0]?.snippet.publishedAt ??
        item.snippet?.publishedAt ??
        "";

      return {
        playlistInfo: playlistInfo.items[0],
        videos,
        metadata: {
          playlistTitle,
          playlistDescription,
          channelTitle,
          thumbnail,
          privacyStatus,
          videosCount,
          publishedAt,
          totalDuration,
          totalDurationInSeconds,
          averageDuration,
          averageDurationInSeconds,
          lastUpdate,
        },
      };
    } catch (err) {
      return rejectWithValue(
        err instanceof Error ? err.message : "An error occurred",
      );
    }
  },
);

export const playlistApiSlice = createSlice({
  name: "playlistApi",
  initialState: {
    playlist: null,
    completedVideosCount: 0,
    videosPerDay: 1,
    isLoading: false,
    isFailed: false,
    error: undefined,
  } as PlaylistState,
  reducers: {
    resetPlaylist: (state) => {
      state.playlist = null;
      state.completedVideosCount = 0;
      state.isFailed = false;
      state.error = undefined;
    },
    resetError: (state) => {
      state.isFailed = false;
      state.error = undefined;
    },
    setCompletedVideos: (state, action: PayloadAction<number>) => {
      state.completedVideosCount = action.payload;
    },
    incrementCompletedVideos: (state) => {
      if (state.playlist) {
        const maxVideos = state.playlist.metadata.videosCount;
        if (state.completedVideosCount < maxVideos) {
          state.completedVideosCount += 1;
        }
      }
    },
    decrementCompletedVideos: (state) => {
      if (state.completedVideosCount > 0) {
        state.completedVideosCount -= 1;
      }
    },
    setVideosPerDay: (state, action: PayloadAction<number>) => {
      state.videosPerDay = action.payload;
    },
    incrementVideosPerDay: (state) => {
      if (state.playlist) {
        const maxVideos = state.playlist.metadata.videosCount;
        if (state.videosPerDay < maxVideos) {
          state.videosPerDay += 1;
        }
      }
    },
    decrementVideosPerDay: (state) => {
      if (state.videosPerDay > 0) {
        state.videosPerDay -= 1;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPlaylist.pending, (state) => {
        state.isLoading = true;
        state.isFailed = false;
        state.error = undefined;
      })
      .addCase(fetchPlaylist.fulfilled, (state, action) => {
        state.playlist = action.payload;
        state.isLoading = false;
        state.isFailed = false;
        state.completedVideosCount = 0;
      })
      .addCase(fetchPlaylist.rejected, (state, action) => {
        state.isLoading = false;
        state.isFailed = true;
        state.error = action.payload as string;
      });
  },
});

export const {
  resetPlaylist,
  resetError,
  setCompletedVideos,
  incrementCompletedVideos,
  decrementCompletedVideos,
  setVideosPerDay,
  incrementVideosPerDay,
  decrementVideosPerDay,
} = playlistApiSlice.actions;
export default playlistApiSlice.reducer;
