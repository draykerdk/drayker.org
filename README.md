# drayker.org — static Drayker system

The public entry point for people who want to work on Drayker: what the organization is, how the DFM protocol shapes the work, what each part of the ecosystem does, which functions are open, and how to volunteer.

Live at **[drayker.org](https://drayker.org)**.

This repository publishes the static Design Component supplied in the Drayker
3.4.1 package. Its visual system, page composition, animated mark and content are
package-native; there is no React/Vinext application or reconstructed design.

## What is in this repository

| File | Role |
| --- | --- |
| `index.html` | The whole site — a single Design Component, deployed as-is by GitHub Pages. |
| `support.js` | The generated Design Component runtime. **Do not edit by hand.** |
| `drayker-mark.js` / `DRAYKER-MARK.md` | Reusable official mark implementation and its contract. |
| `assets/logo/` | Complete logo kit supplied with the package. |
| `design/` | Package references: the deployed v3 component, historical v2 component and logo variations. |
| `V3-HANDOFF.md` | Design-to-implementation record for the 3.0 delivery. |
| `.nojekyll` | Keeps GitHub Pages from interpreting `{{ … }}` component bindings as Liquid. |
| `CNAME` | The custom domain. |
| `SITE_PATTERN.md` | The Drayker web pattern: tokens, structure, interaction contract, how to reuse it. |
| `tools/render-check.js` | Dependency-free checks for both domains, routes, all component pages, GitHub forms, Volunteer and offline behaviour. |
| `tools/make-com.js` | Generates the institutional `.com` artifact from the same component. |
| `tools/prerender.js` | Emits one clean, crawlable HTML document per route and generates `sitemap.xml`. |
| `data/org.json` | Committed public snapshot used before the live GitHub API. |
| `.github/workflows/org-snapshot.yml` | Opens a focused update PR when the organization snapshot changes. |

There is no dependency to install. The page loads React and its fonts through the runtime's existing CDN path; the dependency-free prerender step materializes clean URLs for search and link previews.

## Running it locally

```bash
python3 -m http.server 8766
```

Then open <http://localhost:8766>. Before committing:

```bash
node --check support.js
node --check drayker-mark.js
node tools/render-check.js
node tools/prerender.js --site=org
node tools/prerender-check.js --site=org
git diff --check
```

To verify the generated `.com` presentation too:

```bash
node tools/make-com.js /tmp/drayker-com.html
node tools/render-check.js /tmp/drayker-com.html
```

## GitHub integration

- **Open functions** are read live from the public issues of the [`draykerdk`](https://github.com/draykerdk) organization: an issue becomes an open function when it carries the `open-function` label. Optional `skill:*`, `level:*` and `effort:*` labels fill in the filters, badge and estimate. Nothing on that board is written by hand — if the search returns nothing, the board says so.
- **Organization data** loads from the committed `data/org.json` snapshot first and is then enriched by the public API. Clean subroutes use an absolute snapshot URL, so `/knowledge/` and `/project/dk/` work exactly like the root.
- **Volunteer guidance** is resolved locally in the browser. It recommends a track, projects and first steps without transmitting the visitor's answers. The visitor may then review and publish a prefilled public issue in [`general-forum`](https://github.com/draykerdk/general-forum/issues/new?template=volunteer-introduction.yml).
- **Partnership proposals** are composed locally on `.com` and opened as a prefilled public issue in `general-forum`; the site does not collect contact information.
- **Dknowledger** is summarized in the shared component and continues in its own repository-backed surface at [dknowledger.drayker.org](https://dknowledger.drayker.org).

## Contributing

Open an issue in this repository. If you want to work on the site itself, keep the runtime contract and the visual tokens in `SITE_PATTERN.md` intact, and never publish internal project-management state — a project page describes purpose, role, relationships and sources, not execution status.

The current founding phase and direct-integration limits are written in the organization-wide [GOVERNANCE.md](https://github.com/draykerdk/.github/blob/master/GOVERNANCE.md). DFMP is the documented proposal method; DAF and its resource-governance mechanics are proposed architecture, not an operational federation. The work is primarily voluntary and remains open to contribution through the normal GitHub flow.

[Steemit](https://steemit.com/@drayker) · [Medium](https://medium.com/drayker) · [Twitter](https://twitter.com/Draykerdk)

Site content is published under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/); the code in this repository is under the license in `LICENSE`.
