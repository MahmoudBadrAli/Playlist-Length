import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import LinkKey from "./LinkKey";
import DeleteAllButton from "../buttons/DeleteAllButton";
import { useTranslation } from "react-i18next";
import Collapse from "@mui/material/Collapse";

export default function LinksWrapper() {
  const { t, i18n } = useTranslation();
  const links = useSelector((state: RootState) => state.savedLinks.links);
  return (
    <Collapse in={links.length > 0} timeout={400}>
      <div>
        <Accordion className="bg-gray-100! dark:bg-gray-800! text-(--black)! dark:text-(--white)! shadow-lg! dark:shadow-xl!">
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon className="text-(--black)! dark:text-(--white)!" />
            }
            aria-controls={t("saved-links")}
            id="saved-links"
            sx={{
              marginTop: "20px",
            }}
          >
            <Typography
              component="span"
              fontSize={28}
              fontFamily={i18n.language === "en" ? "Reem" : "Readex"}
              fontWeight="normal"
            >
              {t("Key Shortcuts")}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div
              className={`links flex flex-wrap gap-3 mt-0 ${links.length > 1 ? "mb-8" : "mb-0"} justify-center items-center`}
              dir="ltr"
            >
              {links.map((_link, index) => (
                <LinkKey index={index} key={index} />
              ))}
            </div>
            <Collapse in={links.length > 1} timeout={400}>
              <DeleteAllButton />
            </Collapse>
          </AccordionDetails>
        </Accordion>
      </div>
    </Collapse>
  );
}
