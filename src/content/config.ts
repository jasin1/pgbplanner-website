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

const ctaCopy = z
  .string()
  .min(1)
  .refine((value) => !value.includes("AAN TE LEVEREN"), {
    message:
      "Sticky CTA copy is missing: replace the [AAN TE LEVEREN] placeholder in src/content/cta/sticky.md",
  });

const cta = defineCollection({
  type: "content",
  schema: z
    .object({
      text: ctaCopy,
      buttonText: ctaCopy,
      destination: z.string().regex(/^(\/|https:\/\/)/),
    })
    .strict(),
});

export const collections = { blog, cta };
