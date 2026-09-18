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

export function leestijd(body: string): number {
  const tekst = body
    .replace(/^---[\s\S]*?---/, '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_`]/g, ' ');

  return Math.max(
    1,
    Math.ceil(tekst.trim().split(/\s+/).length / 200)
  );
}

const heroImageModules = import.meta.glob<{ default: { src: string; width: number; height: number } }>(
  "../content/blog/*/hero.{jpg,jpeg,png}",
  { eager: true }
);

export function getHeroImageSrc(postId: string): string | undefined {
  const folder = postId.replace(/\/index\.mdx?$/, "");
  const match = Object.entries(heroImageModules).find(([path]) =>
    path.includes(`/content/blog/${folder}/hero.`)
  );
  return match?.[1]?.default?.src;
}

export function formatArticleDate(pubDate: Date): string {
  return pubDate.toLocaleDateString("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
