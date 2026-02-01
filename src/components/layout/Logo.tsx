import playlistIconPath from "../../assets/playlist.png";
export default function Logo() {
  return (
    <>
      <h1 className="text-3xl text-(--primary) xs:text-4xl md:text-4xl lg:text-5xl z-2 font-semibold select-none whitespace-nowrap font-[Playfair] italic">
        Playlist Length
      </h1>
      <img
        className="w-12 mt-10 -ml-4 z-1 select-none pointer-events-none"
        src={playlistIconPath}
        alt="playlist-icon"
      />
    </>
  );
}
