import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.pgbplanner.nl',
  output: 'server',
  adapter: netlify(),
  integrations: [sitemap()],
});