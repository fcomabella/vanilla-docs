import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
  plugins: [tsconfigPaths()],
  server: {
    watch: {
      ignored: ['**/.husky/**', '**/.yarn/**', '**/coverage/**', '**/dist/**'],
    },
  },
});
