import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  label: string;
  value: string | ReactNode;
};

export default function InfoItem({ label, value }: Props) {
  const { t, i18n } = useTranslation();
  const isEnglish = i18n.language === "en";

  return (
    <>
      <div
        className="mt-4 text-2xl sm:text-3xl md:text-4xl text-(--dark-bg) dark:text-(--white) font-medium wrap-break-word"
        style={{
          fontFamily: isEnglish ? "Readex" : "Cairo",
          fontWeight: isEnglish ? "400" : "600",
        }}
      >
        <span className="block sm:inline">{`${t(label)}: `}</span>
        <span className="text-[28px] sm:text-3xl md:text-[34px] font-[Cairo] text-(--dark-bg) dark:text-[#fafafae1] font-medium">
          {typeof value === "string" ? t(value) : value}
        </span>
      </div>
    </>
  );
}
