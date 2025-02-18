import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config.js';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      css: true,
      environment: 'jsdom',
      globals: true,
      setupFiles: './src/__tests__/setup.ts',
      clearMocks: true,
      coverage: {
        // thresholds: {
        //   '100': true,
        // },
        enabled: false,
        provider: 'v8',
        reporter: ['lcov', 'text', 'text-summary', 'cobertura'],
        include: ['src/**/*'],
        exclude: [
          'coverage/**',
          'dist/**',
          '**/node_modules/**',
          '**/[.]**',
          'packages/*/test?(s)/**',
          '**/*.d.ts',
          '**/virtual:*',
          '**/__x00__*',
          '**/\x00*',
          'cypress/**',
          'test?(s)/**',
          'test?(-*).?(c|m)[jt]s?(x)',
          '**/*{.,-}{test,spec,bench,benchmark}?(-d).?(c|m)[jt]s?(x)',
          '**/__tests__/**',
          '**/__mocks__/**',
          '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*',
          '**/vitest.{workspace,projects}.[jt]s?(on)',
          '**/.{eslint,mocha,prettier}rc.{?(c|m)js,yml}',
          '**/frontend/*',
          '**/app.tsx',
          '**/main.tsx',
          '**/core/**/index.ts',
          '**/ui/**/index.ts',
          '**/*.stories.*',
          'src/routes/**',
          'src/routeTree.gen.ts',
          'src/config/container.ts',
        ],
      },
    },
  })
);
