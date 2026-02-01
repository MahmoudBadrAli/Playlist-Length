import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 25,
  borderRadius: 6,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[200],
    ...theme.applyStyles("dark", {
      backgroundColor: theme.palette.grey[800],
    }),
  },
  [`& .${linearProgressClasses.bar}`]: {
    backgroundColor: "#1a90ff",
    ...theme.applyStyles("dark", {
      backgroundColor: "#308fe8",
    }),
  },
}));

export default function ProgressBar({
  value = 0,
  isArabic = false,
}: {
  value: number;
  isArabic: boolean;
}) {
  return (
    <Stack
      spacing={2}
      sx={{
        width: "85%",
        marginTop: "28px",
        marginBottom: "12px",
      }}
    >
      <BorderLinearProgress
        variant="determinate"
        value={value}
        sx={{
          transform: isArabic ? "scaleX(-1)" : "none",
        }}
      />
    </Stack>
  );
}
