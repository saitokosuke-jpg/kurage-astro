import { defineCollection, z } from 'astro:content';

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    author: z.string(),
    category: z.enum(['essay', 'fiction', 'column', 'diary']),
    date: z.coerce.date(),
    readingMinutes: z.number(),
    excerpt: z.string(),
    featured: z.boolean().default(false),
    featuredOrder: z.number().optional(),
    rankingOrder: z.number().optional(),
    rankingViews: z.number().optional(),
    series: z.string().optional(),
    episodeNumber: z.number().optional(),
    coverImage: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const series = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    author: z.string(),
    category: z.enum(['essay', 'fiction', 'column', 'diary']),
    totalEpisodes: z.number(),
    description: z.string().optional(),
    coverImage: z.string().optional(),
  }),
});

const staff = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    role: z.string(),
    roleEn: z.string(),
    bio: z.string(),
    photo: z.string(),
    order: z.number(),
  }),
});

export const collections = { articles, series, staff };
