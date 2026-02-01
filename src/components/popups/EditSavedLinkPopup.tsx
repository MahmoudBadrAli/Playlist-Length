import { useState, useEffect, useMemo } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import toast from "react-hot-toast";

type Props = {
  title: string;
  content: {
    title: { title: string; value: string };
    value: { title: string; value: string };
  };
  confirm: string;
  cancel: string;
  show: boolean;
  onChange: (title: string, value: string) => void;
  onClose: () => void;
};

export default function EditSavedLinkPopup({
  title,
  content,
  confirm,
  cancel,
  show,
  onChange,
  onClose,
}: Props) {
  const [titleValue, setTitleValue] = useState(content.title.value);
  const [valueValue, setValueValue] = useState(content.value.value);
  const { t, i18n } = useTranslation();
  const mode = useSelector((state: RootState) => state.mode.value);
  const inputStyles = {
    fontFamily: "Cairo",
    fontSize: 22,
    fontWeight: 500,
    color: mode === "dark" ? "var(--white)" : "var(--black)",
    padding: "15px 0 10px",
  };
  const inputLabelStyles = {
    fontFamily: "Cairo",
    fontSize: 24,
    fontWeight: 600,
    color: mode === "dark" ? "var(--white)" : "var(--black)",
    right: i18n.language === "ar" ? 0 : "auto",
    left: i18n.language === "ar" ? "auto" : 0,
    transformOrigin: i18n.language === "ar" ? "top right" : "top left",
  };
  const inputUnderline = {
    "& .MuiInput-underline:before": {
      borderBottomColor: mode === "dark" ? "var(--white)" : "var(--black)",
      borderBottomWidth: 1,
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderBottomColor: mode === "dark" ? "var(--white)" : "var(--black)",
      borderBottomWidth: 2,
    },
  };

  const isValid = useMemo(
    () =>
      (titleValue ?? "").trim() !== "" &&
      (valueValue ?? "").trim() !== "" &&
      ((titleValue ?? "") !== (content.title.value ?? "") ||
        (valueValue ?? "") !== (content.value.value ?? "")),
    [titleValue, valueValue, content.title.value, content.value.value],
  );

  const handleClose = () => {
    setTitleValue(content.title.value);
    setValueValue(content.value.value);
    onClose();
  };
  const handleConfirm = () => {
    onChange(titleValue, valueValue);
    toast.success(t("Changes saved successfully"));
    onClose();
  };

  useEffect(() => {
    if (show) {
      setTitleValue(content.title.value);
      setValueValue(content.value.value);
    }
  }, [show, content.title.value, content.value.value]);

  return (
    <Dialog
      open={show}
      onClose={handleClose}
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
        {`${t(title)}:`}
      </DialogTitle>
      <DialogContent
        sx={{
          width: "clamp(300px, 80vw, 600px)",
          maxWidth: "95vw",
        }}
      >
        <DialogContentText id="alert-dialog-description" component="div">
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: 3,
            }}
          >
            <TextField
              id={`${content.title.title}-input`}
              label={`${t(content.title.title)}:`}
              value={titleValue}
              onChange={(e) => setTitleValue(e.target.value)}
              variant="standard"
              fullWidth
              slotProps={{
                inputLabel: {
                  sx: { ...inputLabelStyles },
                },
                input: {
                  sx: {
                    ...inputStyles,
                  },
                },
              }}
              sx={{
                ...inputUnderline,
              }}
            />
            <TextField
              id={`${content.value.title}-input`}
              label={`${t(content.value.title)}:`}
              value={valueValue}
              onChange={(e) => setValueValue(e.target.value)}
              variant="standard"
              fullWidth
              slotProps={{
                inputLabel: {
                  sx: { ...inputLabelStyles },
                },
                input: {
                  sx: {
                    direction: "ltr",
                    ...inputStyles,
                  },
                },
              }}
              sx={{
                ...inputUnderline,
              }}
            />
          </Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
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
          disabled={!isValid}
          onClick={handleConfirm}
          autoFocus
          sx={{
            fontFamily: "Cairo",
            fontSize: "20px",
            fontWeight: "600",
            textTransform: "capitalize",
            transition: "0.3s",
          }}
        >
          {t(confirm)}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
