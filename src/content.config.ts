import { categorySlugs } from './data/categories';
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string().min(10),
    description: z.string().min(70).max(180),
    category: z.enum(categorySlugs),
    published: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    updated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    cover: z.string().regex(/^\/images\/covers\/[a-z0-9-]+$/),
    coverAlt: z.string().min(20),
    featured: z.number().int().positive().optional(),
    draft: z.boolean().default(false),
    howto: z
      .array(
        z.object({
          name: z.string().min(8),
          text: z.string().min(40),
        }),
      )
      .min(3)
      .optional(),
    sources: z
      .array(
        z.object({
          title: z.string().min(4),
          url: z.string().url(),
        }),
      )
      .min(1),
  }),
});

export const collections = { articles };
