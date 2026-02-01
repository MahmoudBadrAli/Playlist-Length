import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { setLink } from "../../features/playlistLink/playlistSlice";
import {
  fetchPlaylist,
  resetError,
} from "../../features/api/playlistApi/playlistApiSlice";
import { setShowPopup } from "../../features/errorPopup/errorPopupSlice";
import { setIsFocused } from "../../features/inputFocus/inputFocus";
import { addLink } from "../../features/savedLinks/savedLinksSlice";
import TextField from "@mui/material/TextField";
import DivTemplate from "../layout/DivTemplate";
import LinksSwitch from "../links/LinksSwitch";
import LinksWrapper from "../links/LinksWrapper";
import SearchButton from "../buttons/DoButton";
import type { RootState, AppDispatch } from "../../app/store";
import Paste from "../buttons/Paste";
import ErrorPopup from "../popups/ErrorPopup";
import toast from "react-hot-toast";
import { smoothScrollToElement } from "../../utils/smoothScrollToElement";

export default function Search() {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const focus = useSelector((state: RootState) => state.inputFocus.isfocused);
  const link = useSelector((state: RootState) => state.playlistLink.link);
  const saveLinks = useSelector((state: any) => state.saveLinksSwitch.value);
  const showPopup = useSelector(
    (state: RootState) => state.errorPopup.showPopup,
  );
  const dir = useSelector((state: RootState) => state.language.value.dir);

  const handleSubmit = () => {
    dispatch(fetchPlaylist(link))
      .unwrap()
      .then(() => {
        smoothScrollToElement("info");
        if (saveLinks) {
          dispatch(
            addLink({
              title: "Playlist",
              link: link,
            }),
          );
          toast.success(t("Link saved successfully"));
        }
        setTimeout(() => {
          dispatch(setLink(""));
          dispatch(setIsFocused(false));
        }, 2000);
      })
      .catch((err) => {
        console.error("Fetch Playlist Error:", err);
        dispatch(setLink(""));
        dispatch(setShowPopup(true));
        dispatch(setIsFocused(false));
      });
  };

  return (
    <>
      <DivTemplate title="Browse" id="search">
        <div dir={dir}>
          <TextField
            id="playlist-link"
            label={`${
              focus ? t("Playlist Link") : t("Paste your YouTube playlist link")
            }`}
            dir="ltr"
            variant="outlined"
            autoComplete="off"
            fullWidth
            value={link}
            onChange={(e) => dispatch(setLink(e.target.value))}
            onFocus={() => dispatch(setIsFocused(true))}
            onBlur={() => dispatch(setIsFocused(link ? true : false))}
            onKeyDown={(e) => {
              if (e.key === "Enter" && link.trim()) {
                handleSubmit();
              }
            }}
            slotProps={{
              htmlInput: {
                sx: {
                  color: "var(--black)",
                  ".dark &": { color: "var(--white)" },
                  fontFamily: "Cairo",
                  fontWeight: "600",
                  fontSize: "18px",
                },
              },
              inputLabel: {
                sx: {
                  right: dir === "rtl" ? 28 : "auto",
                  left: dir === "rtl" ? "auto" : -1,
                  transformOrigin: dir === "rtl" ? "top right" : "top left",
                  fontSize: "18px",
                  color: "#374151 !important",
                  ".dark &": { color: "var(--white) !important" },
                  fontFamily: "Cairo",
                  "&.MuiInputLabel-shrink": {
                    fontSize: dir === "rtl" ? "16px" : "15px",
                  },
                },
              },
            }}
            sx={{
              marginTop: "30px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "var(--primary)",
                  borderWidth: "2px",
                  textAlign: dir === "rtl" ? "right" : "left",
                },
                "&:hover fieldset": { borderColor: "#145ea8" },
                "&.Mui-focused fieldset": {
                  borderColor: "var(--primary)",
                  borderWidth: "3px",
                },
                borderRadius: "8px",
              },
            }}
          />
          <div className="flex justify-between items-center">
            <LinksSwitch />
            <Paste />
          </div>
          <LinksWrapper />
          <SearchButton
            name="Search"
            disabled={!link.trim()}
            clicking={handleSubmit}
          />
          <ErrorPopup
            title={t("Invalid Value")}
            content={t(
              "This is not a valid link, not a YouTube playlist, or not even a link at all.",
            )}
            cancel={t("Got it")}
            show={showPopup}
            onClose={() => {
              dispatch(setShowPopup(false));
              dispatch(resetError());
            }}
          />
        </div>
      </DivTemplate>
    </>
  );
}
