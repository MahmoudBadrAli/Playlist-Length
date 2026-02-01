import { useTranslation } from "react-i18next";
import ErrorIcon from "../../utils/ErrorIcon";

type Props = {
  error?: string | undefined;
};

export default function ErrorState({ error }: Props) {
  const { t, i18n } = useTranslation();
  const isEnglish = i18n.language === "en";

  return (
    <div className="flex justify-center items-center  min-h-62.5 px-4">
      <div className="flex flex-col items-center text-center gap-8">
        <ErrorIcon classes="w-26 mt-6 -mb-2 text-red-500" />
        <p
          className={`${isEnglish ? "text-[26px]" : "text-2xl"} sm:text-3xl md:text-4xl text-gray-600 dark:text-gray-300 font-medium`}
          style={{
            fontFamily: isEnglish ? "Readex" : "Cairo",
          }}
        >
          {t("Failed to load playlist")}
        </p>
        {error && (
          <p
            className={`font-[Cairo] ${isEnglish ? "-mt-6" : "-mt-4"} ${isEnglish ? "text-[26px] sm:text-3xl" : "text-[22px] sm:text-2xl"} text-gray-600 dark:text-gray-400`}
          >
            {error ? t(error) : ""}
          </p>
        )}
        <p
          className={`font-[Cairo] -mt-4 ${isEnglish ? "text-[22px] sm:text-[26px]" : "text-[22px] sm:text-[24px]"} text-gray-600 dark:text-gray-400`}
        >
          {t("Please try again")}
        </p>
      </div>
    </div>
  );
}
