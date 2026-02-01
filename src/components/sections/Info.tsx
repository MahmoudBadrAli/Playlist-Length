import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import InfoItem from "./InfoItem";
import { CustomTooltip } from "../../utils/CustomTooltip";
import { isArabic } from "../../utils/isArabic";
import { formatDate } from "../../utils/dateFormatter";
import RenderStates from "../../utils/RenderStates";

export default function Info() {
  const { t, i18n } = useTranslation();
  const [arabicPlaylistTitle, setArabicPlaylistTitle] = useState(false);
  const [arabicChannelTitle, setArabicChannelTitle] = useState(false);
  const [arabicPlaylistDescription, setArabicPlaylistDescription] =
    useState(false);
  const isEnglish = i18n.language === "en";
  const metadata = useSelector(
    (state: RootState) => state.playlist.playlist?.metadata,
  );
  const {
    playlistTitle = "",
    channelTitle = "",
    totalDuration = "",
    videosCount = 0,
    averageDuration = "",
    playlistDescription = "",
    thumbnail = "",
    privacyStatus = "",
    publishedAt = "",
    lastUpdate = "",
  } = metadata || {};

  const publishedAtFormatted = formatDate(publishedAt, i18n.language);

  const lastUpdateFormatted = formatDate(lastUpdate, i18n.language);

  useEffect(() => {
    if (!metadata) return;

    setArabicPlaylistTitle(isArabic(metadata.playlistTitle));
    setArabicChannelTitle(isArabic(metadata.channelTitle));
    setArabicPlaylistDescription(isArabic(metadata.playlistDescription));
  }, [metadata]);

  return (
    <>
      <RenderStates title="Insights" id="info">
        <div className="flex justify-center items-center flex-col mt-5 px-4 sm:px-6">
          <CustomTooltip title={t("Playlist Name")} placement="top">
            <span
              className="text-3xl sm:text-4xl md:text-4xl lg:text-4xl mb-1.5 text-(--dark-bg) dark:text-(--white) text-center wrap-break-word max-w-full"
              style={{
                fontFamily: arabicPlaylistTitle ? "Cairo" : "Reem",
              }}
            >
              {playlistTitle}
            </span>
          </CustomTooltip>

          <span
            className="text-4xl mb-2 mt-2 text-(--primary)"
            style={{
              fontFamily: isEnglish ? "Reem" : "Cairo",
            }}
          >
            {t("From")}
          </span>

          <CustomTooltip title={t("Channel Name")} placement="top">
            <span
              className="text-3xl sm:text-4xl md:text-4xl lg:text-4xl mb-6 sm:mb-8 text-(--dark-bg) dark:text-(--white) text-center wrap-break-word max-w-full"
              style={{
                fontFamily: arabicChannelTitle ? "Cairo" : "Reem",
              }}
            >
              {channelTitle}
            </span>
          </CustomTooltip>

          {thumbnail && (
            <CustomTooltip title={t("Playlist Thumbnail")} placement="top">
              <img
                src={thumbnail}
                className="element rounded-2xl w-120 shadow-lg transition-all duration-300"
                alt="playlist-image"
              />
            </CustomTooltip>
          )}

          <CustomTooltip title={t("Playlist Description")} placement="top">
            <span
              dir={arabicPlaylistDescription ? "rtl" : "ltr"}
              className={`font-[Cairo] ${playlistDescription ? "mt-6" : ""} text-lg leading-8 text-gray-700 dark:text-gray-300 text-center max-w-4xl`}
            >
              {playlistDescription}
            </span>
          </CustomTooltip>

          <span
            className="text-4xl bg-(--primary) py-2 px-4 rounded-4xl text-(--white) text-center mt-8 leading-snug"
            style={{
              fontFamily: isEnglish ? "Reem" : "Cairo",
            }}
          >
            {`${t("Total Video Duration")}: `}
            <CustomTooltip
              title={t("h = hours, m = minutes, s = seconds")}
              placement="top"
            >
              <span className="block sm:inline font-[Readex] font-extralight">
                {totalDuration}
              </span>
            </CustomTooltip>
          </span>
        </div>
        <div className="flex flex-col mt-3">
          <InfoItem
            label={"Total Videos"}
            value={videosCount?.toString() || "0"}
          />
          <InfoItem
            label={"Average video duration"}
            value={averageDuration?.toString() || "0"}
          />
          <InfoItem label={"Privacy Status"} value={privacyStatus} />
          <InfoItem
            label="Published At"
            value={
              <CustomTooltip title={t("Day / Month / Year")} placement="top">
                <span>{publishedAtFormatted}</span>
              </CustomTooltip>
            }
          />
          <InfoItem
            label="Last Update"
            value={
              <CustomTooltip title={t("Day / Month / Year")} placement="top">
                <span>{lastUpdateFormatted}</span>
              </CustomTooltip>
            }
          />
        </div>
      </RenderStates>
    </>
  );
}
