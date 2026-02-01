import Container from "@mui/material/Container";
import HeaderContainer from "./HeaderContainer";
import Header from "./Header";
import HeroSection from "./HeroSection";

export default function LandingPage() {
  return (
    <Container
      maxWidth={false}
      className="w-full sm:max-w-screen-sm md:max-w-4xl lg:max-w-5xl xl:max-w-7xl flex items-center justify-between"
    >
      <div className="relative min-h-screen">
        <div>
          <HeaderContainer>
            <Header />
          </HeaderContainer>
        </div>
        <HeroSection />
      </div>
    </Container>
  );
}
