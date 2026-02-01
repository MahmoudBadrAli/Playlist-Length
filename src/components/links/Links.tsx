import type { RootState } from "../../app/store";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { smoothScrollToElement } from "../../utils/smoothScrollToElement";

export default function Links() {
  const { t } = useTranslation();

  const dir = useSelector((state: RootState) => state.language.value.dir);

  return (
    <div className="w-1/2">
      <ul
        dir={dir}
        className={`flex justify-center items-center md:gap-1 lg:gap-3 cursor-pointer text-(--primary) ${
          dir === "rtl" ? "text-[22px]" : "text-3xl"
        }`}
      >
        <li
          className="link-item"
          onClick={() => smoothScrollToElement("search")}
        >
          {t("Browse")}
        </li>
        <li className="link-item" onClick={() => smoothScrollToElement("info")}>
          {t("Insights")}
        </li>
        <li
          className="link-item"
          onClick={() => smoothScrollToElement("track")}
        >
          {t("Tracker")}
        </li>
      </ul>
    </div>
  );
}
