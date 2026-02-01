import { useTranslation } from "react-i18next";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

export default function ShortPlaylistState() {
  const { t, i18n } = useTranslation();
  const isEnglish = i18n.language === "en";

  return (
    <div className="flex justify-center items-center  min-h-62.5 px-4">
      <div className="flex flex-col items-center text-center gap-8">
        <WarningAmberIcon className="text-[135px]! sm:text-[160px]! mt-8 -mb-6 text-yellow-500" />
        <p
          className={`${isEnglish ? "text-[26px]" : "text-2xl"} sm:text-3xl md:text-4xl text-gray-600 dark:text-gray-300 font-medium`}
          style={{
            fontFamily: isEnglish ? "Readex" : "Cairo",
          }}
        >
          {t("Too short playlist")}
        </p>
        <p
          className={`font-[Cairo] ${isEnglish ? "-mt-6" : "-mt-4"} sm:-mt-3 ${isEnglish ? "text-[24px] sm:text-[28px]" : "text-[24px] sm:text-[26px]"} text-gray-600 dark:text-gray-400 leading-snug`}
        >
          {t(
            "The tracker is designed for playlists with more than 2 videos, to help you monitor progress, completion, and time spent.",
          )}
        </p>
      </div>
    </div>
  );
}
