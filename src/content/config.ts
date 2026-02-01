import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    pubDate: z.coerce.date(),
    draft: z.boolean().default(true),
    heroAlt: z.string().optional(),
  }),
});

export const collections = { blog };
