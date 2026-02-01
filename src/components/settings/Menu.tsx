import { useState, useEffect } from "react";
import ListItem from "../lists/ListItem";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import SearchIcon from "@mui/icons-material/Search";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import StackedLineChartOutlinedIcon from "@mui/icons-material/StackedLineChartOutlined";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import ClosedCaptionOffIcon from "@mui/icons-material/ClosedCaptionOff";
import ClosedCaptionIcon from "@mui/icons-material/ClosedCaption";
import type { RootState } from "../../app/store";
import { useSelector, useDispatch } from "react-redux";
import { toggleMode, setMode } from "../../features/mode/modeSlice";
import { toggleLang } from "../../features/language/languageSlice";
import { useTranslation } from "react-i18next";
import { smoothScrollToElement } from "../../utils/smoothScrollToElement";

export default function Menu() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const mode = useSelector((state: RootState) => state.mode.value);
  const dispatch = useDispatch();

  useEffect(() => {
    const savedMode = localStorage.getItem("theme") || "dark";
    dispatch(setMode(savedMode));
  }, []);

  const { t, i18n } = useTranslation();

  const lang = useSelector((state: RootState) => state.language.value.lang);
  const dir = useSelector((state: RootState) => state.language.value.dir);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") || "en";
    i18n.changeLanguage(savedLanguage);
    document.body.style.fontFamily =
      lang === "ar" ? `"Cairo", sans-serif` : `"Markazi", sans-serif`;
  }, [lang]);

  const DrawerList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      dir={dir}
    >
      <List>
        <ListItem
          title="Browse"
          icon={<SearchIcon />}
          clicking={() => smoothScrollToElement("search")}
        />
        <ListItem
          title="Insights"
          icon={<InfoOutlineIcon />}
          clicking={() => smoothScrollToElement("info")}
        />
        <ListItem
          title="Tracker"
          icon={<StackedLineChartOutlinedIcon />}
          clicking={() => smoothScrollToElement("track")}
        />
        <Divider />

        <ListItem
          title={mode === "dark" ? t("Light Mode") : t("Dark Mode")}
          icon={mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
          clicking={() => dispatch(toggleMode())}
        />

        <ListItem
          title={lang === "en" ? "العربية" : "English"}
          icon={
            lang === "en" ? <ClosedCaptionOffIcon /> : <ClosedCaptionIcon />
          }
          fontSize={lang === "en" ? "1.4rem" : "1.6rem"}
          fontFamily={lang === "en" ? "Cairo" : "Markazi"}
          clicking={() => dispatch(toggleLang())}
        />
      </List>
    </Box>
  );

  return (
    <>
      <Button
        aria-label={open ? "Close Drawer" : "Open Drawer"}
        onClick={toggleDrawer(true)}
        sx={{
          width: 60,
          height: 60,
          borderRadius: "50%",
          display: open ? "none" : "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--primary)",
          backgroundColor: "inherit",
          transition: "all 0.3s ease",
          "&:hover": {
            color: "var(--secondary)",
          },
        }}
      >
        <MenuIcon sx={{ fontSize: "2.1rem" }} />
      </Button>
      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        slotProps={{
          paper: {
            className: `${
              mode === "dark"
                ? "bg-gray-800! text-(--white)!"
                : "bg-white! text-(--black)!"
            }`,
          },
        }}
      >
        {DrawerList}
      </Drawer>
    </>
  );
}
