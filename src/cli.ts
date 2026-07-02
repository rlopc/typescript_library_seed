#!/usr/bin/env node
import { Command } from 'commander';
import packageJson from '../package.json' with { type: 'json' };
import { registerGreet } from './commands/greet.js';

const program = new Command();

program
  .name(packageJson.name.replace(/^@[^/]+\//, ''))
  .description(packageJson.description)
  .version(packageJson.version, '-v, --version', 'Show the version')
  .showHelpAfterError('(use --help for usage)');

registerGreet(program);

try {
  await program.parseAsync(process.argv);
} catch (error: unknown) {
  let message = 'Unknown error';
  if (error instanceof Error) {
    message = error.message;
  } else if (typeof error === 'string') {
    message = error;
  }
  process.stderr.write(`${message}\n`);
  // use process.exitCode, not process.exit(), so pending streams can flush
  process.exitCode = 1;
}
