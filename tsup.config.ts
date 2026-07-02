import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/cli.ts'], // API programática + binario
  format: ['esm'],
  target: 'node22',
  outDir: 'dist',
  dts: true, // .d.ts para el uso como librería
  sourcemap: true,
  clean: true,
  treeshake: true,
  // tsup detecta el shebang de src/cli.ts, lo preserva y hace chmod +x del binario.
});
