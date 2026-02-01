import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { saveLinksStatus } from "../../features/linksSwitch/saveLinksSlice";

const Android12Switch = styled(Switch)(() => ({
  padding: 8,
  "& .MuiSwitch-track": {
    borderRadius: 22 / 2,
    "&::before, &::after": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 16,
      height: 16,
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "none",
    width: 16,
    height: 16,
    margin: 2,
    backgroundColor: "#fff",
  },
  "& .Mui-checked + .MuiSwitch-track": {
    backgroundColor: "var(--primary) !important",
    opacity: "1 !important",
  },
}));

export default function LinksSwitch() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const saveLinks = useSelector((state: any) => state.saveLinksSwitch.value);

  const handleChange = () => {
    dispatch(saveLinksStatus());
  };

  return (
    <FormGroup
      sx={{
        marginTop: "20px",
        width: "100%",
      }}
    >
      <FormControlLabel
        control={
          <Android12Switch checked={saveLinks} onChange={handleChange} />
        }
        label={
          <Typography
            sx={{
              fontFamily: "Cairo",
              fontSize: "1.3rem",
            }}
          >
            {`${t("Save Links")}:`}
          </Typography>
        }
        labelPlacement="start"
        sx={{
          flexDirection: "row-reverse",
          width: "fit-content",
          margin: 0,
        }}
      />
    </FormGroup>
  );
}
