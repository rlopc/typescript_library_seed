# Contributing guide

Thanks for your interest in contributing! 🎉

## Requirements

- Node.js `>=22` (recommended: the version in [`.nvmrc`](./.nvmrc))
- pnpm `>=11` (`corepack enable`)

## Getting started

```bash
pnpm install
```

## Workflow

1. Create a branch from `main`.
2. Code with the inner dev loop running:

   ```bash
   pnpm dev   # tsx watch: re-runs src/index.ts on save
   pnpm test  # Vitest in watch mode
   ```

   Source and its colocated test live side by side in `src/` (`*.test.ts`). The editor
   applies ESLint + Prettier on save (see [`.vscode/settings.json`](./.vscode/settings.json)).

3. Verify everything passes (the same checks CI runs):

   ```bash
   pnpm lint && pnpm format:check && pnpm typecheck && pnpm test:run
   ```

4. Add a **changeset** if your change affects the published package:

   ```bash
   pnpm changeset
   ```

   Pick the bump (patch / minor / major); this writes a file under `.changeset/` that
   must be included in the PR. Skip it for internal-only changes (CI, docs, tooling).

5. Commit following [Conventional Commits](https://www.conventionalcommits.org/) (you can use `pnpm commit`).
   Husky hooks run automatically: **pre-commit** → `lint-staged`, **commit-msg** → `commitlint`.
6. Open a Pull Request against `main`. CI runs lint, format, typecheck, test, build, and
   package validation on **Node 22 and 24**.

## Conventions

- **Commits**: Conventional Commits (validated by commitlint).
- **Formatting**: Prettier (automatic on pre-commit via lint-staged).
- **Linting**: ESLint with type-checked rules.

## Using this repository as a template

This repository is a **template**: it ships the full publishing pipeline ready to use, but
is itself marked `"private": true` in [`package.json`](./package.json) so it can **never be
published by accident**. Derived projects inherit a working release setup; to turn
publishing on, do this once after creating your project from the template:

1. **Remove `"private": true`** from `package.json` (this is the single switch that enables
   publishing).
2. **Rename the package** — set a unique `name` (and a `@scope` if you publish under one),
   and update `repository`, `homepage`, and `bugs` URLs to your repo.
3. **Choose the registry:**
   - **npmjs.com (public)** — nothing to change; keep `publishConfig.access: "public"`. Add
     an `NPM_TOKEN` secret (an npm automation token) to the repo's Actions secrets.
   - **GitHub Packages (private)** — set `"publishConfig": { "registry": "https://npm.pkg.github.com" }`,
     scope the name as `@<owner>/<pkg>`, and rely on the workflow's `GITHUB_TOKEN` (no
     `NPM_TOKEN` needed).
4. **Verify** packaging before the first release: `pnpm check:publish` and
   `pnpm pack --dry-run`.

Until step 1 is done, the release workflow runs but `changeset publish` skips the private
package, so the template stays unpublished while everything else (CI, changesets,
versioning) keeps working.

## Releases

Versions are managed with [Changesets](https://github.com/changesets/changesets) and
published automatically — **never edit the version by hand**. Once changes land on
`main`, the [release workflow](./.github/workflows/release.yml) runs in two phases:

1. **Version PR** — if there are pending changesets, it opens/updates a "Version
   Packages" PR that bumps the version and updates the `CHANGELOG.md`.
2. **Publish** — merging that PR triggers `changeset publish`, which builds, validates
   the package (`publint` + `attw`), and publishes to npm with provenance.

So the full release path is: changeset → merge to `main` → merge the Version PR → published.
