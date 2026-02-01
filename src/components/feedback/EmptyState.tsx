import { useTranslation } from "react-i18next";

export default function EmptyState() {
  const { t, i18n } = useTranslation();

  return (
    <div className="flex justify-center items-center min-h-62.5 px-4">
      <div className="text-center space-y-4">
        <p
          className="text-2xl sm:text-3xl md:text-4xl text-gray-600 dark:text-gray-300 font-medium"
          style={{
            fontFamily: i18n.language === "en" ? "Readex" : "Cairo",
          }}
        >
          {t("Please search for a playlist first")}
        </p>
        <p className="font-[Cairo] text-[24px] text-gray-500 dark:text-gray-400">
          {t("Enter a YouTube playlist link above")}
        </p>
      </div>
    </div>
  );
}
