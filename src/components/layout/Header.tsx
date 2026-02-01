import Container from "@mui/material/Container";
import Logo from "./Logo";
import Theme from "../settings/Theme";
import Language from "../settings/Language";
import Links from "../links/Links";
import Menu from "../settings/Menu";
import { useTranslation } from "react-i18next";

export default function Header() {
  const { i18n } = useTranslation();

  return (
    <>
      <header className="py-3 bg-white dark:bg-gray-800 shadow-lg">
        <Container
          maxWidth={false}
          className="w-full sm:max-w-screen-sm md:max-w-4xl lg:max-w-5xl xl:max-w-7xl flex items-center justify-between"
        >
          {/* Logo */}
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Navigation + Actions */}
          <div
            className={`hidden md:flex items-center ${i18n.language === "en" ? "md:-space-x-18" : "md:-space-x-10"} lg:space-x-10`}
          >
            {/* Links */}
            <div className="md:flex space-x-4">
              <Links />
            </div>

            {/* Theme + Language */}
            <div className="hidden md:flex items-center space-x-4">
              <Theme />
              <Language />
            </div>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden w-16">
            <Menu />
          </div>
        </Container>
      </header>
    </>
  );
}
