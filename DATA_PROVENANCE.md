# Data provenance

Every entry in `src/data/mcp-servers.json` was sourced via live web research and
verified with real HTTP checks. The initial 18 entries were checked on
**2026-07-07**, and Xquik was checked on **2026-07-19**. Per-entry verification
notes live in each entry's `sourceNote` field.

## Why the list stays intentionally small

The build target was "at least 25, all real." Research turned up plenty of
candidate community servers, but several either had ambiguous official status,
declared repo URLs that no longer resolve, or existed only as unverifiable
third-party forks. Rather than pad the list with anything shaky, this v1 ships
19 entries that were individually checked and are traceable to a real source.
More entries - official and vetted community ones - get added in follow-up
passes; the bar (real, checked, sourced) stays the same as the list grows.

## Verification method

1. WebSearch for the server's official announcement, repo, and npm package.
2. `curl` the repo URL directly (`-L`, browser UA) and record the HTTP status.
3. `curl` the npm registry API (`registry.npmjs.org/<package>`) rather than
   npmjs.com's package page directly - npmjs.com blocks non-browser requests
   with a 403 regardless of whether the package is real, so the registry API is
   the actual signal of whether a package exists.
4. Where a repo URL 404'd (found during this pass: the Slack reference server's
   documented subpath, and one of Rich's own packages' self-declared `repository`
   field in its `package.json`), the entry either links to the nearest verified
   real URL instead (with a note) or was dropped entirely.

## Known caveats to revisit

- Several "official" MCP servers are moving from local npm packages to
  vendor-hosted remote endpoints (Sanity, Linear, Atlassian, GitHub). Where that
  transition has already happened, this dataset links to the current remote
  path and notes the deprecated package rather than the deprecated package
  itself.
- The reference `modelcontextprotocol/servers` repo's internal folder structure
  is not stable - a subpath that resolves today may not resolve next quarter.
  Prefer linking to the repo root over deep subpaths where possible.
