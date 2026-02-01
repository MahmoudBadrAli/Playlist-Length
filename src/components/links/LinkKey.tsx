import { useState } from "react";
import Button from "@mui/material/Button";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useTranslation } from "react-i18next";
import Popup from "../popups/Popup";
import EditSavedLinkPopup from "../popups/EditSavedLinkPopup";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import {
  editLink,
  deleteLink,
} from "../../features/savedLinks/savedLinksSlice";
import { fetchPlaylist } from "../../features/api/playlistApi/playlistApiSlice";
import { setShowPopup } from "../../features/errorPopup/errorPopupSlice";
import { setIsFocused } from "../../features/inputFocus/inputFocus";
import { setLink } from "../../features/playlistLink/playlistSlice";
import toast from "react-hot-toast";
import { smoothScrollToElement } from "../../utils/smoothScrollToElement";

const iconButtonStyles = {
  width: "35px",
  height: "35px",
  borderRadius: "50%",
  minWidth: 0,
  padding: 0,
  color: "inherit",
  marginLeft: "8px",
  transition: "all 0.2s",
  "&:hover": {
    backgroundColor: "rgba(255,255,255,0.15)",
  },
};

export default function LinkKey({ index }: { index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const currentLink = useSelector(
    (state: RootState) => state.savedLinks.links[index],
  );

  const handleSubmit = (link: string) => {
    dispatch(fetchPlaylist(link))
      .unwrap()
      .then(() => {
        smoothScrollToElement("info");
        dispatch(setIsFocused(true));
        setTimeout(() => {
          dispatch(setLink(""));
          dispatch(setIsFocused(false));
        }, 1500);
      })
      .catch((err: string) => {
        console.error("Fetch Playlist Error:", err);
        const shouldShowPopup = err === "Invalid playlist link";
        if (shouldShowPopup) dispatch(setShowPopup(true));
        dispatch(setLink(""));
        dispatch(setIsFocused(false));
      });
    dispatch(setLink(link));
    dispatch(setIsFocused(true));
  };

  return (
    <>
      <span
        data-value={currentLink.link}
        className="max-h-12 font-[Cairo] transition-all duration-350 cursor-pointer rounded-lg bg-(--primary) hover:bg-(--secondary) px-3.5 py-2 text-2xl font-semibold text-(--white)"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => handleSubmit(currentLink.link)}
      >
        {currentLink.title}
        <Button
          onClick={(e) => {
            e.stopPropagation();
            setShowEditPopup(true);
          }}
          aria-label={t("Edit saved link")}
          sx={{
            ...iconButtonStyles,
            display: isHovered ? "inline-flex" : "none",
          }}
        >
          <EditOutlinedIcon fontSize="small" />
        </Button>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            setShowDeletePopup(true);
          }}
          aria-label={t("Delete Saved Link")}
          sx={{
            ...iconButtonStyles,
            display: isHovered ? "inline-flex" : "none",
          }}
        >
          <DeleteOutlineIcon fontSize="small" />
        </Button>
      </span>

      <EditSavedLinkPopup
        title="Edit saved link"
        content={{
          title: { title: "Title", value: currentLink.title },
          value: { title: "Link", value: currentLink.link },
        }}
        cancel="Cancel"
        confirm="Save changes"
        show={showEditPopup}
        onChange={(newTitle, newValue) => {
          dispatch(
            editLink({ index, link: { title: newTitle, link: newValue } }),
          );
        }}
        onClose={() => setShowEditPopup(false)}
      />

      <Popup
        title="Delete saved link?"
        content="This link will be permanently deleted and cannot be restored. Are you sure you want to continue?"
        cancel="Cancel"
        confirm="Yes, delete link"
        show={showDeletePopup}
        onClose={() => setShowDeletePopup(false)}
        onConfirm={() => {
          dispatch(deleteLink(index));
          toast.success(t("Link deleted successfully"));
        }}
      />
    </>
  );
}
