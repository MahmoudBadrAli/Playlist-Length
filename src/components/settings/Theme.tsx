import { useEffect } from "react";
import type { RootState } from "../../app/store";
import { useSelector, useDispatch } from "react-redux";
import { toggleMode, setMode } from "../../features/mode/modeSlice";

import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Button from "@mui/material/Button";

export default function Theme() {
  const mode = useSelector((state: RootState) => state.mode.value);
  const dispatch = useDispatch();

  useEffect(() => {
    const savedMode = localStorage.getItem("theme") || "dark";
    dispatch(setMode(savedMode));
  }, []);

  return (
    <div
      className="cursor-pointer text-(--primary) "
      onClick={() => dispatch(toggleMode())}
    >
      <Button
        aria-label={mode === "dark" ? "Light Theme" : "Dark Theme"}
        sx={{
          width: "46px",
          height: "46px",
          borderRadius: "50%",
          minWidth: "0",
          color: "inherit",
          transition: "all 0.3s ease",
          "&:hover": {
            color: `${mode === "dark" ? "var(--white)" : "var(--black)"}`,
          },
        }}
      >
        {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
      </Button>
    </div>
  );
}
