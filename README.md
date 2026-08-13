# typescript-library-seed

> A modern seed for TypeScript projects — pure ESM, strict, dual **CLI + library**.

A starter template gathering current best practices for a TypeScript package that is
**both** a command-line tool **and** an importable API: bundled with `tsup`, ESM-only,
strict `tsconfig`, type-checked linting, tests with Vitest, and publish validation.

## Features

- **Dual scope** — ships a **CLI binary** (`bin`) **and** an importable **API** (`exports`).
- **Pure ESM** (`"type": "module"`) — aligned with the direction of the ecosystem.
- **Strict `tsconfig`** — `strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`,
  `verbatimModuleSyntax`, and more.
- **Bundled build** — [`tsup`](https://tsup.egoist.dev/) emits ESM, preserves the CLI shebang
  and makes the binary executable; tests never reach `dist/`.
- **CLI best practices** ([clig.dev](https://clig.dev/)) — rich `--help`, `--json` for
  scripting, `NO_COLOR`-aware colors (`picocolors`), interactive prompts only on a TTY
  (`@clack/prompts`), and correct exit codes.
- **Code quality** — ESLint (flat config, type-checked) with `unicorn` + `sonarjs` plugins
  (modern best practices & code-smell detection), Prettier, and markdownlint.
- **Tests** — Vitest with v8 coverage; unit tests for the pure logic and end-to-end CLI
  tests with `execa`.
- **Conventional commits** — Husky + lint-staged + commitlint + Commitizen.
- **Dead-code & dependency checks** — `knip` flags unused files, exports, and dependencies.
- **Validated publishing** — `publint` + `@arethetypeswrong/cli` in `prepublishOnly`
  (kept because the package also exposes a programmatic API).

## Requirements

- Node.js `>=22`
- pnpm `>=11`

## Installation

```bash
pnpm install
```

## Usage

### As a CLI

```bash
pnpm dev greet World          # run from source (tsx)

# or run the built binary:
pnpm build
pnpm start greet World
```

```text
$ greet World
Hello, World!

$ greet --json World
{"message":"Hello, World!"}
```

### As a library

```ts
import { greet } from 'typescript-library-seed';

greet('World'); // => "Hello, World!"
```

## Scripts

| Script                              | Description                               |
| ----------------------------------- | ----------------------------------------- |
| `pnpm dev`                          | Run the CLI from source with `tsx`.       |
| `pnpm build`                        | Bundle `dist/` with `tsup` (CLI + API).   |
| `pnpm start`                        | Run the built CLI (`node dist/cli.js`).   |
| `pnpm smoke`                        | Verify the built binary boots (`--help`). |
| `pnpm typecheck`                    | Type-check without emitting.              |
| `pnpm knip`                         | Find unused files, exports & deps.        |
| `pnpm lint` / `pnpm lint:fix`       | Linting with ESLint.                      |
| `pnpm lint:md` / `pnpm lint:md:fix` | Linting Markdown with markdownlint.       |
| `pnpm format` / `pnpm format:check` | Formatting with Prettier.                 |
| `pnpm test` / `pnpm test:run`       | Tests with Vitest.                        |
| `pnpm test:coverage`                | Tests with coverage report.               |
| `pnpm check:publish`                | Validate packaging (`publint` + `attw`).  |
| `pnpm commit`                       | Guided commit (Commitizen).               |

## Structure

```text
.
├── src/
│   ├── cli.ts              # CLI entry: shebang + commander + error handling
│   ├── index.ts            # public API entry (re-exports)
│   ├── commands/
│   │   ├── greet.ts        # example subcommand (lib + prompt + --json)
│   │   └── greet.test.ts   # in-process command test (measurable coverage)
│   ├── lib/
│   │   ├── greet.ts        # pure, testable logic
│   │   └── greet.test.ts   # unit test
│   └── cli.test.ts         # end-to-end CLI test (execa)
├── tsup.config.ts          # build config (bundles CLI + API)
├── tsconfig.json           # type-check config (IDE, lint, typecheck — no emit)
├── eslint.config.ts        # ESLint flat config
└── vitest.config.ts        # Vitest config
```

## License

[MIT](./LICENSE) © rlopc
