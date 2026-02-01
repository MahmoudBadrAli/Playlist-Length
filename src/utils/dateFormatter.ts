export const formatDate = (
  date: string | null | undefined,
  language: string = "en",
): string => {
  if (!date) return "";

  return new Date(date).toLocaleDateString(`${language}-GB`, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};
