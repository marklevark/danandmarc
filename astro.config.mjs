// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://danandmarc.ca',
  // nginx serves /work/foo from /work/foo/index.html, so no trailing slash in URLs
  trailingSlash: 'never',
  build: { format: 'directory' },
  image: {
    responsiveStyles: true,
  },
});
