import type { RootState } from "../../app/store";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export default function DivTemplate({
  children,
  title,
  id,
}: {
  children: React.ReactNode;
  title: string;
  id: string;
}) {
  const { t } = useTranslation();

  const dir = useSelector((state: RootState) => state.language.value.dir);
  return (
    <div
      id={id}
      dir={dir}
      className="glass-card card scroll-mt-8"
      style={{
        fontWeight: 600,
        fontFamily: dir === "ltr" ? "Playfair" : "Cairo",
      }}
    >
      <h2 className="text-5xl">{t(title)}</h2>
      {children}
    </div>
  );
}
