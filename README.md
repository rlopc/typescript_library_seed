# typescript-library-seed

> A modern seed for TypeScript libraries — pure ESM, strict, and ready to publish.

A starter template gathering current best practices for a TypeScript package: build with `tsc`, ESM-only, strict `tsconfig`, type-checked linting, tests with Vitest, and publish validation.

## Features

- **Pure ESM** (`"type": "module"`) — aligned with the direction of the ecosystem.
- **Strict `tsconfig`** — `strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `verbatimModuleSyntax`, and more.
- **Separate build** — `tsconfig.build.json` excludes tests from the published package.
- **Code quality** — ESLint (flat config, type-checked) + Prettier + markdownlint.
- **Tests** — Vitest with v8 coverage.
- **Conventional commits** — Husky + lint-staged + commitlint + Commitizen.
- **Validated publishing** — `publint` + `@arethetypeswrong/cli` in `prepublishOnly`.

## Requirements

- Node.js `>=22`
- pnpm `>=11`

## Installation

```bash
pnpm install
```

## Usage

```ts
import { greet } from 'typescript-library-seed';

greet('World'); // => "Hello, World!"
```

## Scripts

| Script                              | Description                              |
| ----------------------------------- | ---------------------------------------- |
| `pnpm dev`                          | Run in watch mode with `tsx`.            |
| `pnpm build`                        | Compile to `dist/` (without tests).      |
| `pnpm typecheck`                    | Type-check without emitting.             |
| `pnpm lint` / `pnpm lint:fix`       | Linting with ESLint.                     |
| `pnpm lint:md` / `pnpm lint:md:fix` | Linting Markdown with markdownlint.      |
| `pnpm format` / `pnpm format:check` | Formatting with Prettier.                |
| `pnpm test` / `pnpm test:run`       | Tests with Vitest.                       |
| `pnpm test:coverage`                | Tests with coverage report.              |
| `pnpm check:publish`                | Validate packaging (`publint` + `attw`). |
| `pnpm commit`                       | Guided commit (Commitizen).              |

## Structure

```text
.
├── src/                 # Source code and tests
│   ├── index.ts
│   └── index.test.ts
├── tsconfig.json        # Base config (IDE, type-checked lint, typecheck)
├── tsconfig.build.json  # Build config (excludes tests)
├── tsconfig.eslint.json # Config for type-checked linting
├── eslint.config.ts     # ESLint flat config
└── vitest.config.ts     # Vitest config
```

## License

[MIT](./LICENSE) © rlopc
