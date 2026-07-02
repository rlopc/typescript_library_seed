import type { Command } from 'commander';
import * as p from '@clack/prompts';
import pc from 'picocolors';
import { greet } from '../lib/greet.js';

export function registerGreet(program: Command): void {
  program
    .command('greet')
    .description('Greet someone')
    .argument('[name]', 'name to greet')
    .option('--json', 'JSON output for scripting')
    .addHelpText(
      'after',
      '\nExample:\n  $ <cli> greet World\n  $ <cli> greet --json World',
    )
    .action(async (name: string | undefined, options: { json?: boolean }) => {
      let target = name;
      // clig.dev: only prompt interactively when attached to a TTY
      if (target === undefined) {
        if (!process.stdout.isTTY) {
          throw new Error('Missing <name> argument (non-interactive input).');
        }
        const answer = await p.text({ message: 'Who should I greet?' });
        if (p.isCancel(answer)) {
          p.cancel('Cancelled.');
          process.exitCode = 130; // SIGINT convention
          return;
        }
        target = answer;
      }
      const message = greet(target);
      process.stdout.write(
        options.json
          ? `${JSON.stringify({ message })}\n`
          : `${pc.green(message)}\n`,
      );
    });
}
