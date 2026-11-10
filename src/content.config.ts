import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

const work = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/work' }),
  schema: ({ image }) => {
    const media = z.object({
      src: image(),
      alt: z.string().optional(),
      /** Override layout: true = full page width, false = keep in the grid. Default: horizontal images (>=1200px wide) go full width. */
      wide: z.boolean().optional(),
      /** Path to an .mp4 loop (converted from GIF). `src` is used as its poster. */
      loop: z.string().optional(),
    });
    const video = z.object({
      /** file = self-hosted: /media/<project>/<id>.mp4 with <id>.jpg as poster (override with src/poster) */
      provider: z.enum(['file', 'vimeo', 'youtube']),
      src: z.string().optional(),
      poster: z.string().optional(),
      id: z.coerce.string(),
      title: z.string().optional(),
    });
    const credits = z.object({
      agency: z.string().optional(),
      client: z.string().optional(),
      role: z.string().optional(),
    });
    const block = z.union([
      z.object({ heading: z.string(), level: z.number().int().min(2).max(4).default(2) }),
      z.object({ text: z.string() }),
      z.object({ credits }),
      z.object({ images: z.array(media).min(1) }),
      z.object({ videos: z.array(video).min(1) }),
    ]);
    return z.object({
      title: z.string(),
      order: z.number(),
      /** Year for the /timeline page (sort + clock). `years` is an optional display label, e.g. '2015–19'. */
      year: z.number().optional(),
      years: z.string().optional(),
      cover: image(),
      coverLoop: z.string().optional(),
      /** CSS object-position for the square home-grid crop, e.g. '50% 13%' */
      coverPosition: z.string().default('50% 50%'),
      draft: z.boolean().default(false),
      ...credits.shape,
      awards: z.array(z.object({ show: z.string(), result: z.string() })).optional(),
      press: z.string().optional(),
      blocks: z.array(block).default([]),
    });
  },
});

const awards = defineCollection({
  loader: file('./src/data/awards.yaml'),
  schema: z.object({
    region: z.string(),
    shows: z.array(
      z.object({
        show: z.string(),
        tally: z.string().default(''),
        entries: z.array(z.object({ year: z.number().optional(), award: z.string() })),
      }),
    ),
  }),
});

export const collections = { work, awards };
