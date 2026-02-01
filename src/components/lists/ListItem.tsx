import { useTranslation } from "react-i18next";

import Item from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import type { RootState } from "../../app/store";
import { useSelector } from "react-redux";
import type { JSX } from "react";

type ItemProps = {
  title: string;
  icon: JSX.Element;
  fontSize?: string;
  fontFamily?: string;
  clicking?: () => void;
};

export default function ListItem({
  title,
  icon,
  fontSize,
  fontFamily,
  clicking,
}: ItemProps): JSX.Element {
  const lang = useSelector((state: RootState) => state.language.value.lang);

  const { t } = useTranslation();

  return (
    <Item disablePadding>
      <ListItemButton onClick={clicking}>
        <ListItemIcon className="dark:text-(--white)!">{icon}</ListItemIcon>
        <ListItemText
          slotProps={{
            primary: {
              sx: {
                ...(fontFamily
                  ? { fontFamily: `'${fontFamily}', sans-serif` }
                  : {}),
                ...(fontSize
                  ? { fontSize: fontSize }
                  : { fontSize: `${lang === "en" ? "1.6rem" : "1.4rem"}` }),
                width: "fit-content",
              },
            },
          }}
          primary={t(title)}
        />
      </ListItemButton>
    </Item>
  );
}
