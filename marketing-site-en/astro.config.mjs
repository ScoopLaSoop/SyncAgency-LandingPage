import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://syncagency-en.vercel.app',
  integrations: [
    tailwind({ applyBaseStyles: false }),
    sitemap({
      filter: (page) => !page.includes('/_preview') && !page.includes('/login'),
    }),
  ],
  output: 'static',
});
