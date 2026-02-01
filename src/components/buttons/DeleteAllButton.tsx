import { ButtonBase } from "@mui/material";
import { useTranslation } from "react-i18next";
import Popup from "../popups/Popup";
import { useState } from "react";
import type { AppDispatch } from "../../app/store";
import { useDispatch } from "react-redux";
import { deleteAllLinks } from "../../features/savedLinks/savedLinksSlice";
import toast from "react-hot-toast";

export default function DeleteAllButton() {
  const [showPopup, setShowPopup] = useState(false);
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const isEnglish = i18n.language === "en";

  return (
    <>
      <ButtonBase
        aria-label={t("Delete all saved links")}
        className="w-full! [word-spacing:0.2rem] bg-(--primary-warning)! hover:bg-(--secondary-warning)! text-(--white)! text-center! cursor-pointer! rounded-lg! text-[28px]! p-2! transition-all! duration-200! active:scale-[0.97]!"
        sx={{
          fontWeight: isEnglish ? "normal" : "600",
          fontFamily: isEnglish ? "Reem" : "Cairo",
        }}
        onClick={() => setShowPopup(true)}
      >
        {t("Delete all key shortcuts")}
      </ButtonBase>
      <Popup
        title={t("Delete all shortcuts?")}
        content={t(
          "All shortcuts will be permanently deleted and cannot be restored. Are you sure you want to continue?",
        )}
        cancel={t("Cancel")}
        confirm={t("Yes, delete all")}
        show={showPopup}
        onClose={() => setShowPopup(false)}
        onConfirm={() => {
          dispatch(deleteAllLinks());
          toast.success(t("All shortcuts deleted successfully"));
        }}
      />
    </>
  );
}
