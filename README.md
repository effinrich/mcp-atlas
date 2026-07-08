# MCP Atlas

A curated directory of real, verified [Model Context Protocol](https://modelcontextprotocol.io)
servers — official and community. Every entry is sourced and link-checked before
it's added; nothing here is invented.

Built by [Rich Tillman](https://richtillman.xyz) — creator of
[ForgeKit](https://forgekit.cloud).

## Status

Early — scaffold + tooling live, content and search UI in progress. See the
[roadmap](../../.supergoal) for the full build plan if you're curious how this got
built.

## Tech stack

- [Astro](https://astro.build) — content collections (Zod-validated) + islands
  architecture, only shipping JS where the page actually needs interactivity
- TypeScript (strict)
- Vitest (unit) + Playwright (e2e)
- ESLint + Prettier
- Deployed on Vercel

## Development

```sh
pnpm install
pnpm dev          # http://localhost:4321
pnpm build        # production build to ./dist
pnpm preview      # preview the production build locally
pnpm typecheck    # astro check
pnpm lint         # eslint .
pnpm test         # vitest run
pnpm test:e2e     # playwright test
```

## Custom domain (manual follow-up)

This project deploys to a Vercel-issued `*.vercel.app` URL automatically. To point
`mcp-atlas.richtillman.xyz` at it:

1. In the Vercel project's **Settings → Domains**, add `mcp-atlas.richtillman.xyz`
   and copy the CNAME target Vercel gives you.
2. In Cloudflare (where `richtillman.xyz` is managed), add a CNAME record:
   - **Name:** `mcp-atlas`
   - **Target:** the value from step 1 (typically `cname.vercel-dns.com`)
   - **Proxy status:** DNS only (grey cloud), so Vercel's own TLS/CDN handles it
3. Wait for DNS propagation, then verify the domain in Vercel's dashboard.

This step isn't automated — no Cloudflare access is wired into this build.
