import { getCollection } from "astro:content";

// Gates the "Blog" nav link and the article "Terug" link. Below this count
// there is no designed /blog index to send a reader to.
export const BLOG_INDEX_THRESHOLD = 4;

export async function getPublishedPosts() {
  return (await getCollection("blog", ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime()
  );
}

export async function isBlogIndexThresholdMet() {
  return (await getPublishedPosts()).length >= BLOG_INDEX_THRESHOLD;
}
