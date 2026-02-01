import InfoItem from "./InfoItem";
import ProgressBar from "../feedback/ProgressBar";
import FieldDemo from "../forms/FieldDemo";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../app/store";
import { parseDuration, formatDuration } from "../../utils/duration";
import {
  setCompletedVideos,
  setVideosPerDay,
} from "../../features/api/playlistApi/playlistApiSlice";
import RenderStates from "../../utils/RenderStates";
import ShortPlaylistState from "../feedback/ShortPlaylistState";
import DivTemplate from "../layout/DivTemplate";

export default function Track() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => state.playlist.isLoading);
  const isFailed = useSelector((state: RootState) => state.playlist.isFailed);
  const videosCount = useSelector(
    (state: RootState) => state.playlist.playlist?.metadata.videosCount ?? 0,
  );
  const totalDurationInSeconds = useSelector(
    (state: RootState) =>
      state.playlist.playlist?.metadata.totalDurationInSeconds ?? 0,
  );
  const completed = useSelector(
    (state: RootState) => state.playlist.completedVideosCount,
  );
  const videosPerDay = useSelector(
    (state: RootState) => state.playlist.videosPerDay,
  );
  const videos = useSelector(
    (state: RootState) => state.playlist.playlist?.videos || [],
  );

  const remainingVideos = videosCount - completed;

  const watchedTimeInSeconds = () => {
    if (!videos.length || completed === 0) return 0;
    return videos.slice(0, completed).reduce((sum, video) => {
      const duration = video.contentDetails.duration;
      return sum + parseDuration(duration);
    }, 0);
  };

  const watchedTime = formatDuration(watchedTimeInSeconds());

  const remainingTimeInSeconds =
    totalDurationInSeconds - watchedTimeInSeconds();

  const remainingTime = formatDuration(remainingTimeInSeconds);

  const completionPercentage = () => {
    if (videosCount === 0) return 0;
    return Math.round((completed / videosCount) * 100);
  };

  const watchedTimePercentage = () => {
    if (totalDurationInSeconds === 0) return 0;
    return Math.round((watchedTimeInSeconds() / totalDurationInSeconds) * 100);
  };

  const calculateDays = () => {
    if (remainingVideos === 0) return 0;
    if (videosPerDay === 0) return 0;
    return Math.ceil(remainingVideos / videosPerDay);
  };

  const days = calculateDays();

  if (videosCount && !isLoading && !isFailed && videosCount <= 2)
    return (
      <DivTemplate title="Tracker" id="track">
        <ShortPlaylistState />
      </DivTemplate>
    );

  return (
    <RenderStates title="Tracker" id="track">
      <div className="flex flex-col justify-center items-center mt-6 font-[Cairo]">
        <span
          className={`text-[28px] sm:text-3xl md:text-4xl text-(--dark-bg) dark:text-white text-center mb-8 
              ${i18n.language === "en" ? "leading-snug" : "leading-relaxed"}
          `}
        >
          {t("This is a playlist of")}:{" "}
          <span className="text-(--primary) font-bold font-[Reem]">
            {videosCount}
          </span>{" "}
          {t("videos,")}{" "}
          <span
            className={`text-[28px] sm:text-3xl md:text-4xl w-full md:w-160 text-center text-(--dark-bg) dark:text-white`}
          ></span>
          {t(
            "How many videos have you finished from the beginning of the list?",
          )}
        </span>
        <FieldDemo
          title="Completed videos"
          max={videosCount}
          onChange={(value) => dispatch(setCompletedVideos(value))}
          value={completed}
        />
        <ProgressBar
          value={completionPercentage()}
          isArabic={i18n.language === "ar"}
        />
      </div>
      <div className="result flex flex-col">
        <InfoItem label="Videos remaining" value={remainingVideos} />
        <InfoItem
          label="Video Completion Percentage"
          value={`${completionPercentage()}%`}
        />
        <InfoItem label="Watched time" value={watchedTime} />
        <InfoItem label="Remaining time" value={remainingTime} />
        <InfoItem
          label="Watched Time Percentage"
          value={`${watchedTimePercentage()}%`}
        />
      </div>
      <hr className="hr mx-4 md:mx-0" />
      <div className="flex flex-col justify-center items-center mt-2 font-[Cairo] px-4 md:px-0">
        <span
          className={`text-[26px] sm:text-3xl md:text-4xl w-full md:w-160 text-center text-(--dark-bg) dark:text-white mb-8`}
        >
          {t("How many videos do you watch per day?")}
        </span>
        <FieldDemo
          title="Videos you watch per day"
          max={videosCount}
          onChange={(value) => dispatch(setVideosPerDay(value))}
          value={videosPerDay}
        />
        <span
          className={`text-[26px] sm:text-3xl md:text-4xl w-full md:w-160 text-center mt-6 text-(--dark-bg) dark:text-white`}
        >
          {t("You'll finish the remaining videos in")}{" "}
          <span className="text-(--primary) font-bold font-[Reem]">{days}</span>{" "}
          {t(days === 1 ? "day" : "days")}
        </span>
      </div>
    </RenderStates>
  );
}
