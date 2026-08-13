import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/cli.ts'], // programmatic API + binary
  format: ['esm'],
  target: 'node22',
  outDir: 'dist',
  dts: true, // .d.ts for consumers of the library API
  sourcemap: true,
  clean: true,
  treeshake: true,
  // tsup detects the shebang in src/cli.ts, preserves it and chmod +x the binary.
});
