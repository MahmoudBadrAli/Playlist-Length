import Search from "../sections/Search";
import Info from "../sections/Info";
import Track from "../sections/Track";

import Container from "@mui/material/Container";

export default function Body() {
  return (
    <>
      <Container
        maxWidth={false}
        className="flex justify-center items-center flex-col mt-16 w-full sm:max-w-screen-sm md:max-w-3xl lg:max-w-4xl xl:max-w-5xl"
      >
        <Search />
        <Info />
        <Track />
      </Container>
    </>
  );
}
