export function smoothScrollToElement(target: string, offset: number = 0) {
  const element = document.getElementById(target);
  if (element) {
    if (offset === 0) {
      element.scrollIntoView({
        behavior: "smooth",
      });
    } else {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }
}
