import "./App.css";
import LandingPage from "./components/layout/LandingPage";
import Footer from "./components/layout/Footer";
import Body from "./components/layout/Body";
import type { RootState } from "./app/store";
import { useSelector } from "react-redux";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import Features from "./components/sections/Features";
import { Toaster } from "react-hot-toast";

export default function App() {
  const lang = useSelector((state: RootState) => state.language.value.lang);
  const mode = useSelector((state: RootState) => state.mode.value);

  const theme = createTheme({
    typography: {
      fontFamily:
        lang === "ar" ? '"Cairo", sans-serif' : '"Markazi", sans-serif',
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              backgroundColor:
                mode === "dark" ? "var(--dark-bg)" : "var(--white)",
              color: mode === "dark" ? "var(--white)" : "var(--black)",
              fontFamily: "Cairo, sans-serif",
              direction: lang === "ar" ? "rtl" : "ltr",
              textAlign: lang === "ar" ? "right" : "left",
            },
          }}
        />
        <LandingPage />
        <Features />
        <Body />
        <Footer />
      </ThemeProvider>
    </>
  );
}
