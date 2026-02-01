import Container from "@mui/material/Container";
import Feature from "./Feature";
import SearchIcon from "@mui/icons-material/Search";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import StackedLineChartIcon from "@mui/icons-material/StackedLineChart";

import { useTranslation } from "react-i18next";

export default function Features() {
  const { t } = useTranslation();

  const feats = [
    {
      icon: SearchIcon,
      title: "Browse",
      content:
        "Search for any YouTube playlist effortlessly and access its details instantly. Enable automatic saving to store important playlist links with a single click, or turn it off anytime you want. All saved links are organized in one place for easy access. A smart paste shortcut also lets you insert the last copied text directly into the search field, saving you time and speeding up your workflow.",
    },
    {
      icon: InfoOutlineIcon,
      title: "Insights",
      content:
        "The Insights section provides a comprehensive view of all essential playlist details in a beautifully organized layout. From basic information like the playlist name and channel to detailed metrics such as total duration and last update, everything is displayed clearly and accessibly. The section intelligently adapts to content language, automatically switching text direction and fonts for Arabic content while maintaining a clean, professional appearance in both light and dark modes.",
    },
    {
      icon: StackedLineChartIcon,
      title: "Tracker",
      content:
        "The Track section helps you monitor any playlist accurately and effortlessly. Simply enter how many videos you've completed to see your progress in terms of completion percentage, watched time, and remaining videos. The section calculates the remaining time needed to finish the playlist and provides detailed statistics on both video count and duration. You can also set how many videos you watch per day to see exactly when you'll complete the playlist, making time management and progress tracking clear, effective, and motivating.",
    },
  ];

  return (
    <>
      <Container
        id="features"
        maxWidth={false}
        className="w-full sm:max-w-screen-sm md:max-w-4xl lg:max-w-5xl xl:max-w-7xl"
      >
        <div className="grid grid-cols-1 items-center justify-center gap-8 py-8">
          {feats.map((feat, index) => (
            <Feature
              key={index}
              Icon={feat.icon}
              title={t(feat.title)}
              content={t(feat.content)}
            />
          ))}
        </div>
      </Container>
    </>
  );
}
