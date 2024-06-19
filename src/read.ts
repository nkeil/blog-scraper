import { getBlogs, getLastRead, writeBlogs } from "./helpers";

const blogs = await getBlogs();
const lastReadBlog = blogs[await getLastRead()];
lastReadBlog.read = true;
writeBlogs(blogs);
