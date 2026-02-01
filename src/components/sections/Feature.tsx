import type { JSX } from "react/jsx-runtime";
import { useTranslation } from "react-i18next";

type Props = {
  Icon: JSX.ElementType;
  title: string;
  content: string;
};

export default function Feature({ Icon, title, content }: Props) {
  const { i18n } = useTranslation();
  const isEnglish = i18n.language === "en";
  const dir = isEnglish ? "ltr" : "rtl";
  return (
    <>
      <div className="hover:bg-white hover:dark:bg-(--dark-bg) hover:shadow-2xl border-4 border-transparent hover:border-black/10 dark:hover:border-white/10 cursor-pointer transition duration-500 ease-out flex flex-col justify-center items-center h-full rounded-2xl px-4 py-8">
        <Icon className="text-9xl! text-[#00acc1]" />
        <h2
          className={`${
            isEnglish
              ? "text-8xl! font-[Markazi] mb-2"
              : "text-[66px]! font-[Cairo] mb-4 -mt-2"
          }`}
        >
          {title}
        </h2>
        <p
          className="font-[Cairo] text-xl text-center text(--light-tex) dark:text-(--dark-text)"
          dir={dir}
        >
          {content}
        </p>
      </div>
    </>
  );
}
