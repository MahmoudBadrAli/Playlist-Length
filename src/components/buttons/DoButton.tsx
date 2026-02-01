import Button from "@mui/material/Button";

import { useTranslation } from "react-i18next";

export default function DoButton({
  name,
  disabled,
  clicking,
}: {
  name: string;
  disabled: boolean;
  clicking?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  const { t } = useTranslation();

  return (
    <div className="flex justify-center mt-8">
      <Button
        aria-label={t(name)}
        variant="contained"
        className="bg-(--primary)! hover:bg-(--secondary)! font-semibold! rounded-lg! tracking-wide transition-all! duration-350! py-2! px-3! text-2xl! font-[Cairo]! text-(--white)! normal-case! active:scale-[0.95] disabled:bg-gray-400! disabled:text-gray-200! disabled:cursor-not-allowed! disabled:scale-100!"
        disabled={disabled}
        onClick={clicking}
      >
        {t(name)}
      </Button>
    </div>
  );
}
