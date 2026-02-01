import Logo from "./Logo";
import Container from "@mui/material/Container";
import CopyrightIcon from "@mui/icons-material/Copyright";
import { useTranslation } from "react-i18next";
import { smoothScrollToElement } from "../../utils/smoothScrollToElement";

export default function Footer() {
  const { t, i18n } = useTranslation();
  const isEnglish = i18n.language === "en";

  return (
    <>
      <footer
        className="py-4 bg-white dark:bg-gray-800 shadow-lg"
        dir={isEnglish ? "ltr" : "rtl"}
      >
        <Container
          maxWidth={false}
          className="w-full sm:max-w-screen-sm md:max-w-4xl lg:max-w-5xl xl:max-w-7xl flex items-center justify-center"
        >
          <div className="flex items-center justify-center flex-col w-full px-4">
            <div
              className="flex items-center justify-center mb-1 -mt-4"
              dir={"ltr"}
            >
              <Logo />
            </div>

            <span
              className={`text-lg sm:text-xl font-[Cairo] text-gray-600 dark:text-gray-300 max-w-4xl text-center ${isEnglish ? "leading-6.5" : "leading-relaxed"}`}
            >
              <a
                href="#"
                className={`text-blue-500 font-semibold hover:underline font-[Playfair] italic text-xl sm:text-[22px] ${isEnglish ? "mr-1" : "ml-1"}`}
              >
                Playlist Length
              </a>
              {t(
                "Your smart YouTube playlist companion. Instantly browse playlists, explore detailed insights, track your progress, and predict completion dates. Save favorites, manage your learning journey, and stay organized—all in one powerful, bilingual tool.",
              )}
            </span>

            <hr className="hr" />

            <div className="flex flex-col-reverse sm:flex-row justify-between items-center w-full text-gray-600 dark:text-gray-300 gap-4">
              <div
                className="font-[Cairo] flex justify-center items-center flex-col"
                dir="ltr"
              >
                <span>
                  <span>
                    <CopyrightIcon className="mr-1 text-lg!" />
                  </span>
                  {new Date().getFullYear()} Playlist Length.{" "}
                </span>
                <span>{t("All Rights Reserved.")}</span>
              </div>

              <hr className="w-full border-t border-gray-300 dark:border-gray-600 block sm:hidden" />

              <ul className="flex items-center gap-4 font-[Cairo] text-lg cursor-pointer">
                <a className="footer-link-item" href="#">
                  {t("Home")}
                </a>
                <li
                  className="footer-link-item"
                  onClick={() => smoothScrollToElement("search", 145)}
                >
                  {t("Browse")}
                </li>
                <li
                  className="footer-link-item"
                  onClick={() => smoothScrollToElement("info", 145)}
                >
                  {t("Insights")}
                </li>
                <li
                  className="footer-link-item"
                  onClick={() => smoothScrollToElement("track", 145)}
                >
                  {t("Tracker")}
                </li>
              </ul>
            </div>

            <span className="mt-3 text-[16px] font-[Cairo] text-gray-600 dark:text-gray-400">
              {t("Developed by")}{" "}
              <a
                href="mailto:mahmoudbadrali15@gmail.com"
                className="hover:text-blue-500 hover:underline text-[#333] dark:text-gray-300 font-semibold"
              >
                {t("Mahmoud Badr")}
              </a>
            </span>
          </div>
        </Container>
      </footer>
    </>
  );
}
