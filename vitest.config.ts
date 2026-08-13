import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      include: ['src/**/*.ts'],
      // `cli.ts` only wires argv to commander: it can just be exercised as a
      // subprocess (see `src/cli.test.ts`), which v8 coverage cannot measure.
      exclude: ['src/**/*.test.ts', 'src/cli.ts'],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },
  },
});
