import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

const excludedFromSitemap = ['/bedankt/', '/bedankt-feedback/', '/email-bevestigen/'];

export default defineConfig({
  site: 'https://www.pgbplanner.nl',
  output: 'server',
  adapter: netlify(),
  integrations: [
    sitemap({
      filter: (page) => !excludedFromSitemap.includes(new URL(page).pathname),
    }),
    mdx(),
  ],
});