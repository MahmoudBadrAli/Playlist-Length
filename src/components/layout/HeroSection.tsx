import { useTranslation } from "react-i18next";
import GetStarted from "../buttons/GetStarted";

export default function HeroSection() {
  const { t, i18n } = useTranslation();
  const isEnglish = i18n.language === "en";

  return (
    <div
      dir={isEnglish ? "ltr" : "rtl"}
      className="flex flex-col items-center justify-center h-screen px-4 text-center"
    >
      <h1
        className={`text-5xl ${
          isEnglish ? "font-black" : "font-extrabold"
        } ${
          isEnglish ? "" : "font-bold!"
        } sm:text-6xl! md:text-7xl! font-[Cairo] ${
          isEnglish
            ? "leading-[1.1]"
            : "leading-[1.3] sm:leading-[1.2]"
        }`}
        style={{
          fontSize: isEnglish ? "48px" : "42px",
        }}
      >
        <span className="text-(--primary) font-[Reem]">3</span>{" "}
        {t("Steps are enough to get control over any playlist.")}
      </h1>
      <p
        className={`mt-10 ${
          isEnglish ? "text-2xl" : "text-[22px]"
        } ${
          isEnglish ? "sm:text-3xl" : "sm:text-[24px]"
        } text-gray-600 dark:text-gray-300 max-w-2xl`}
      >
        {t(
          "Search smarter, understand deeper, and track your progress with total clarity.",
        )}
      </p>
      <GetStarted />
    </div>
  );
}
