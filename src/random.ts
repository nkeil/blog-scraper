import { getBlogs } from "./helpers";

const blogs = await getBlogs();
const unreadBlogs = blogs
  .map((b, i) => ({ ...b, id: i }))
  .filter((b) => !b.read);

const index = Math.floor(Math.random() * unreadBlogs.length);
const blog = unreadBlogs[index];

await Bun.write("out/last_read.json", blog.id.toString());
console.log(blog);
