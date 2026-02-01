import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import ErrorIcon from "../../utils/ErrorIcon";

type Props = {
  title: string;
  content: string;
  cancel: string;
  show: boolean;
  onClose: () => void;
};

export default function ErrorPopup({
  title,
  content,
  cancel,
  show,
  onClose,
}: Props) {
  const { i18n } = useTranslation();
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
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
          },
        }}
      >
        <ErrorIcon classes="w-26 mt-6 -mb-2 text-red-500" />
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            fontFamily: "Cairo",
            fontSize: "34px",
            fontWeight: "600",
            marginBottom: "-12px",
            color: mode === "dark" ? "var(--white)" : "var(--black)",
          }}
        >
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{
              fontFamily: "Cairo",
              fontSize: "24px",
              textAlign: "center",
              fontWeight: "600",
              marginBottom: "-8px",
              color: mode === "dark" ? "var(--dark-text)" : "var(--light-text)",
            }}
          >
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={onClose}
            variant="contained"
            sx={{
              fontFamily: "Cairo",
              fontSize: "22px",
              padding: "2px 14px",
              marginBottom: "10px",
              fontWeight: "600",
              textTransform: "none",
            }}
          >
            {cancel}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
