# [nocp.space](https://nocp.space)

This is Norcleeh's Site written in Next.js (vinext) + TypeScript. Deployed on Cloudflare Workers.

## Setup

```bash
git clone https://github.com/nocpiun/nocp.space.git
cd nocp.space
npm ci
```

## Development

```bash
npm run dev
```

## Build and preview

```bash
npm run build
npm run start
```

## CLI

An Ink home screen with an ASCII wordmark and a command input. Requires Node.js 22 or later.
The commands are placeholders for now. Homepage links open in the default browser or mail app.
The command menu starts hidden. Press Tab or type / to open it; matches filter as you type.
Use Up / Down to select, Tab to complete, and Enter to confirm.
The menu shows at most six matches and starts scrolling at the second or penultimate visible item.
Shift+Tab cycles through selectable page items; Ctrl+O opens the selected homepage link.
The command input stays editable and retains its text, cursor, and menu selection while choosing links.
There are no focus modes: Enter always confirms a command, and Esc closes the menu without clearing the input.
Command editing and link selection have independent state and feedback.
Supported terminals also provide clickable hyperlinks. Ctrl+C exits.
Short terminals use a side-by-side header when at least 78 columns are available.

```bash
npm run build:cli
npm run --silent cli
```

## Shared configuration

`packages/shared` is the private `@nocp/shared` workspace used by the website and CLI.
Edit shared site metadata in `packages/shared/src/global.ts`.
CLI homepage links live in `packages/cli/src/profile.ts`, which imports the common
site settings from `@nocp/shared`. The website also imports its site settings from this package.

The package exports TypeScript source, so website development picks up changes directly.
Vite bundles it into the website, and the CLI build type-checks with TypeScript before
bundling it into `packages/cli/dist/index.js` with Rolldown.
The CLI lists the shared package as a build dependency, so its published package does
not require a separate `@nocp/shared` release.

Run `npm run build` for the website, `npm run build:cli` for the CLI, or
`npm run pack:cli` to build and pack the standalone CLI package.

## LICENSE

[MIT](./LICENSE)
