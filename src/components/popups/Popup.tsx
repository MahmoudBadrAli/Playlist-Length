import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { useTranslation } from "react-i18next";

import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";

type Props = {
  title: string;
  content: string;
  confirm: string;
  cancel: string;
  show: boolean;
  onClose: () => void;
  onConfirm?: () => void;
};

export default function Popup({
  title,
  content,
  confirm,
  cancel,
  show,
  onClose,
  onConfirm,
}: Props) {
  const { t, i18n } = useTranslation();
  const mode = useSelector((state: RootState) => state.mode.value);

  return (
    <>
      <Dialog
        open={show}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        dir={i18n.language === "ar" ? "rtl" : "ltr"}
        slotProps={{
          paper: {
            sx: {
              backgroundColor:
                mode === "dark" ? "var(--dark-bg)" : "var(--white)",
              borderRadius: "12px",
            },
          },
        }}
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            fontFamily: "Cairo",
            fontSize: "24px",
            fontWeight: "600",
            color: mode === "dark" ? "var(--white)" : "var(--black)",
          }}
        >
          {t(title)}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{
              fontFamily: "Cairo",
              fontSize: "22px",
              fontWeight: "600",
              color: mode === "dark" ? "var(--dark-text)" : "var(--light-text)",
            }}
          >
            {t(content)}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={onClose}
            sx={{
              fontFamily: "Cairo",
              fontSize: "20px",
              fontWeight: "600",
              textTransform: "capitalize",
            }}
          >
            {t(cancel)}
          </Button>
          <Button
            onClick={() => {
              onConfirm?.();
              onClose();
            }}
            autoFocus
            sx={{
              fontFamily: "Cairo",
              fontSize: "20px",
              fontWeight: "600",
              textTransform: "capitalize",
            }}
          >
            {t(confirm)}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
