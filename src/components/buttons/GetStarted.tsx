import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";
import { smoothScrollToElement } from "../../utils/smoothScrollToElement";

export default function GetStarted() {
  const { t, i18n } = useTranslation();
  const isEnglish = i18n.language === "en";

  return (
    <Button
      onClick={() => smoothScrollToElement("features")}
      variant="contained"
      className={`${
        isEnglish
          ? "bottom-16 md:bottom-16 lg:bottom-20"
          : "bottom-15 md:bottom-12 lg:bottom-17"
      }`}
      sx={{
        fontFamily: isEnglish ? "Reem" : "Cairo",
        color: "white",
        fontSize: isEnglish ? "18px" : "20px",
        padding: "4px 10px",
        position: "absolute",
        "&:hover": {
          backgroundColor: "transparent",
          color: "var(--primary)",
        },
        backgroundColor: "var(--primary)",
        border: "1px solid var(--primary)",
        transition: "0.3s",
      }}
    >
      {t("Discover more")}
    </Button>
  );
}
