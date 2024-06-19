import type { Blog } from "../helpers";

export interface Scraper {
  fetch: () => Promise<Blog[]>;
}
