import { describe, it, expect } from 'vitest';
import { execa } from 'execa';

const run = (cliArguments: string[]) =>
  execa(process.execPath, ['--import', 'tsx', 'src/cli.ts', ...cliArguments], {
    reject: false,
    // Deterministic output: picocolors would otherwise emit ANSI colors on CI
    // (it treats a `CI` env var as color-capable even without a TTY).
    env: { NO_COLOR: '1' },
  });

describe('cli', () => {
  it('greet <name> prints the greeting and exits 0', async () => {
    const { stdout, exitCode } = await run(['greet', 'World']);
    expect(exitCode).toBe(0);
    expect(stdout).toBe('Hello, World!');
  });

  it('greet --json returns JSON and exits 0', async () => {
    const { stdout, exitCode } = await run(['greet', 'World', '--json']);
    expect(exitCode).toBe(0);
    expect(JSON.parse(stdout)).toEqual({ message: 'Hello, World!' });
  });

  it('fails in non-interactive mode without <name>', async () => {
    const { exitCode } = await run(['greet']);
    expect(exitCode).toBe(1);
  });
});
