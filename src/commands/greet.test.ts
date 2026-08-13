import { describe, it, expect, vi, afterEach } from 'vitest';
import { Command } from 'commander';
import * as p from '@clack/prompts';
import { registerGreet } from './greet.js';

vi.mock('@clack/prompts', () => ({
  text: vi.fn(),
  isCancel: vi.fn(() => false),
  cancel: vi.fn(),
}));

const runGreet = async (arguments_: string[]) => {
  const program = new Command();
  registerGreet(program);
  const write = vi.spyOn(process.stdout, 'write').mockReturnValue(true);
  await program.parseAsync(arguments_, { from: 'user' });
  return write;
};

/**
 * `isTTY` is a plain property on the stream, so it is set, not spied.
 */
const withTTY = async (isTTY: boolean, run: () => Promise<void>) => {
  const wasTTY = process.stdout.isTTY;
  process.stdout.isTTY = isTTY;
  try {
    await run();
  } finally {
    process.stdout.isTTY = wasTTY;
  }
};

afterEach(() => {
  vi.restoreAllMocks();
  process.exitCode = undefined;
});

describe('registerGreet', () => {
  it('prints the greeting for the given name', async () => {
    const write = await runGreet(['greet', 'World']);
    expect(write.mock.calls[0]?.[0]).toContain('Hello, World!');
  });

  it('prints machine-readable output with --json', async () => {
    const write = await runGreet(['greet', 'World', '--json']);
    expect(write).toHaveBeenCalledWith('{"message":"Hello, World!"}\n');
  });

  it('prompts for the name when attached to a TTY', async () => {
    vi.mocked(p.text).mockResolvedValue('World');
    await withTTY(true, async () => {
      const write = await runGreet(['greet', '--json']);
      expect(p.text).toHaveBeenCalledOnce();
      expect(write).toHaveBeenCalledWith('{"message":"Hello, World!"}\n');
    });
  });

  it('exits with 130 when the prompt is cancelled', async () => {
    vi.mocked(p.text).mockResolvedValue('World');
    vi.mocked(p.isCancel).mockReturnValue(true);
    await withTTY(true, async () => {
      const write = await runGreet(['greet']);
      expect(p.cancel).toHaveBeenCalledWith('Cancelled.');
      expect(process.exitCode).toBe(130);
      expect(write).not.toHaveBeenCalled();
    });
  });

  it('rejects when no name is given without a TTY', async () => {
    await withTTY(false, async () => {
      await expect(runGreet(['greet'])).rejects.toThrow('Missing <name>');
    });
  });
});
