import type { Scraper } from "./base";

/**
 * blog.samaltman.com
 */

interface ApiResponse {
  hits: Array<{
    title: string;
    render_text_truncated: string;
    render_url: string;
    pretty_display_date: string;
    display_date: string;
  }>;
}

export const SamAltmanScraper: Scraper = {
  fetch: async () => {
    const numPosts = 1000;
    const url =
      "https://my9lar24c1-dsn.algolia.net/1/indexes/Post_by_display_date_desc_production/query?x-algolia-agent=Algolia%20for%20JavaScript%20(3.33.0)%3B%20Browser&x-algolia-application-id=MY9LAR24C1&x-algolia-api-key=c5c8a718f6eaf8846900da9421e7b317847523bf429d556e7722b66e2fd10dd5&x-algolia-tagfilters=site_id%5B760%5D%2Cprivacy_level%5Bpublic%5D";
    const result = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        params: `query=*&facets=%5B%22display_date_month_bucket%22%5D&hitsPerPage=${numPosts}&page=0&facetFilters=%5B%22post_type%3APost%22%5D&attributesToHighlight=%5B%22title%22%5D&attributesToSnippet=%5B%22render_text_truncated%3A60%22%5D`,
      }),
    });
    const { hits } = (await result.json()) as ApiResponse;

    return hits.map((hit) => ({
      title: hit.title,
      url: hit.render_url,
      date: hit.display_date,
      read: false,
    }));
  },
};
