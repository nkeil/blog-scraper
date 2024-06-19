export interface Blog {
  title: string;
  url: string;
  date: string;
  read: boolean;
  favorite?: boolean;
}

export const getBlogs = async (): Promise<Blog[]> => {
  try {
    const file = Bun.file("out/blogs.json");
    return JSON.parse(await file.text()) as Blog[];
  } catch (e) {
    return [];
  }
};

export const writeBlogs = async (blogs: Blog[]) => {
  await Bun.write("out/blogs.json", JSON.stringify(blogs, null, 2));
};

export const getLastRead = async () => {
  return parseInt(await Bun.file("out/last_read.json").text());
};
