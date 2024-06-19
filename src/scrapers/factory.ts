import { SamAltmanScraper } from "./sam-altman";

export const getScraper = (type: "Sam Altman") => {
  if (type === "Sam Altman") return SamAltmanScraper;
  else throw new Error("Invalid scraper type");
};
