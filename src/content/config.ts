import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.string(),
    updatedDate: z.string().optional(),
    tag: z.string().optional(),
    readTime: z.string().optional(),
    excerpt: z.string().optional(),
    meta_description: z.string().optional(),
    keywords: z.array(z.string()).optional(),
    ogImage: z.string().optional(),
    featured: z.boolean().optional(),
  }),
});

export const collections = { blog };
