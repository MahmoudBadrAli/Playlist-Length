import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

export const CustomTooltip = styled(({ className, ...props }: any) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    fontSize: "14px",
    fontFamily: "Cairo, sans-serif",
    padding: "5px 8px",
    maxWidth: "26vw",
    whiteSpace: "normal",
    textAlign: "center",
  },
}));
