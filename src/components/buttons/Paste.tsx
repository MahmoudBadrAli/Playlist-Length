import { useDispatch, useSelector } from "react-redux";
import { setLink } from "../../features/playlistLink/playlistSlice";
import { fetchPlaylist } from "../../features/api/playlistApi/playlistApiSlice";
import { setShowPopup } from "../../features/errorPopup/errorPopupSlice";
import { setIsFocused } from "../../features/inputFocus/inputFocus";
import { addLink } from "../../features/savedLinks/savedLinksSlice";
import type { RootState, AppDispatch } from "../../app/store";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";
import { CustomTooltip } from "../../utils/CustomTooltip";
import toast from "react-hot-toast";
import { smoothScrollToElement } from "../../utils/smoothScrollToElement";

export default function Paste() {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const saveLinks = useSelector(
    (state: RootState) => state.saveLinksSwitch.value,
  );
  async function getClipboard() {
    try {
      const text = await navigator.clipboard.readText();
      return text;
    } catch (err) {
      console.error("Failed to read clipboard:", err);
      toast.error(t("Clipboard access denied"));
    }
  }

  const handleSubmit = (link: string) => {
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
        dispatch(setShowPopup(true));
        dispatch(setLink(""));
        dispatch(setIsFocused(false));
      });
  };

  return (
    <>
      <CustomTooltip title={t("Paste the last copied text")} placement="top">
        <Button
          onClick={() => {
            getClipboard().then((text) => {
              if (text) {
                dispatch(setLink(text));
                dispatch(setIsFocused(true));
                handleSubmit(text);
              }
            });
          }}
          variant="contained"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "-25px",
            gap: 1,
            fontFamily: "Cairo",
            fontSize: "18px",
            textTransform: "capitalize",
            transition: "0.3s",
            "&:active": {
              transform: "scale(0.96) translateY(2px)",
            },
          }}
        >
          <ContentPasteIcon />
          <span>{t("Paste")}</span>
        </Button>
      </CustomTooltip>
    </>
  );
}
