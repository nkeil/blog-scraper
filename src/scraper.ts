import { getBlogs, writeBlogs, type Blog } from "./helpers";
import { unlink } from "node:fs/promises";
import { getScraper } from "./scrapers/factory";

console.log("hi");

/**
 * Web scrapes all of sam altman's blog posts from his blog at blog.samaltman.com
 */

const newBlogs = await getScraper("Sam Altman").fetch();
const currentBlogs = await getBlogs();

const currentBlogMap: Record<string, Blog> = {};
for (const blog of currentBlogs) currentBlogMap[blog.url] = blog;

const newlyPublishedBlogs = newBlogs.filter(
  (blog) => !(blog.url in currentBlogMap)
);

const outputBlogs = [...newlyPublishedBlogs, ...currentBlogs];

await writeBlogs(outputBlogs);

try {
  await unlink("out/last_read.json");
} catch (e) {}

export {};
