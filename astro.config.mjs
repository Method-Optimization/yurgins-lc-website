// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// Production site URL. Used for canonical tags, sitemap, OpenGraph, and JSON-LD.
const SITE = 'https://www.yurginslawncare.com';

export default defineConfig({
  site: SITE,
  trailingSlash: 'ignore',
  integrations: [
    // We control base styles ourselves in src/styles/global.css.
    tailwind({ applyBaseStyles: false }),
    sitemap(),
  ],
  image: {
    // Allow Sharp to emit modern formats.
    responsiveStyles: true,
  },
});
