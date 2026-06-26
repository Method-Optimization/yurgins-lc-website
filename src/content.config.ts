import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Editable content collections. The owner can add/edit entries without
 * touching layout. One schema per collection.
 */
const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    seoTitle: z.string(),
    seoDescription: z.string(),
    icon: z.string(),
    order: z.number(),
    intro: z.string(),
    includedHeading: z.string().default("What's included"),
    included: z.array(z.object({ title: z.string(), body: z.string().optional() })),
    processHeading: z.string().optional(),
    process: z.array(z.object({ title: z.string(), body: z.string() })).optional(),
    plansHeading: z.string().optional(),
    plans: z.string().optional(),
    note: z.string().optional(),
    why: z.string().optional(),
    ctaLabel: z.string().default('Get a Free Quote'),
    ctaHref: z.string().default('/contact'),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    excerpt: z.string(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { services, blog };
