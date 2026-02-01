import Box from "@mui/material/Box";
import NumberField from "./NumberField";
import { useTranslation } from "react-i18next";

export default function FieldDemo({
  title,
  max,
  value,
  onChange,
}: {
  title: string;
  max: number;
  value: number;
  onChange: (value: number) => void;
}) {
  const { t, i18n } = useTranslation();
  const dir = i18n.language === "ar" ? "rtl" : "ltr";

  return (
    <Box sx={{ display: "grid", gap: 4 }} dir={dir}>
      <NumberField
        label={t(title)}
        min={0}
        max={max}
        dir={dir}
        value={value}
        onValueChange={(val) => {
          onChange(Number(val) || 0);
        }}
      />
    </Box>
  );
}
