import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string().min(1),
    titleTag: z.string().optional(),
    description: z.string().min(1),
    pubDate: z.coerce.date(),
    draft: z.boolean().default(true),
    heroAlt: z.string().optional(),
    image: z.string().optional(),
    teaser: z.string().min(1).optional(),
  }),
});

export const collections = { blog };
