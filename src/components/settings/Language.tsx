import { useEffect } from "react";
import type { RootState } from "../../app/store";
import { useSelector, useDispatch } from "react-redux";
import { toggleLang } from "../../features/language/languageSlice";
import { useTranslation } from "react-i18next";

import Button from "@mui/material/Button";

export default function Language() {
  const { i18n } = useTranslation();

  const lang = useSelector((state: RootState) => state.language.value.lang);
  const dispatch = useDispatch();

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") || "en";
    i18n.changeLanguage(savedLanguage);
    document.body.style.fontFamily =
      lang === "ar" ? `"Cairo", sans-serif` : `"Markazi", sans-serif`;
  }, [lang]);

  return (
    <div>
      <Button
        aria-label={lang === "en" ? "العربية" : "English"}
        variant="outlined"
        className="hover:border-(--black)! hover:text-(--black)! dark:hover:border-(--white)! dark:hover:text-(--white)!"
        sx={{
          fontFamily: `${
            lang === "en" ? '"Cairo", sans-serif' : '"Markazi", sans-serif'
          }`,
          width: "70px",
          height: "40px",
          minWidth: "0",
          transition: "all 0.3s ease",
          fontWeight: "400",
          fontSize: `${lang === "en" ? "18px" : "22px"}`,
          textTransform: "none",
          "&:hover": {
            backgroundColor: "transparent",
          },
        }}
        onClick={() => dispatch(toggleLang())}
      >
        {lang === "en" ? "العربية" : "English"}
      </Button>
    </div>
  );
}
