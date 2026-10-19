# drayker.org. Static Drayker system

The public participation and constitution entry point for Drayker: what the member-constituted supersystem is meant to become, how DFM shapes the work, what each part of the ecosystem does, which functions are open and how someone can contribute during the founding phase.

Live at **[drayker.org](https://drayker.org)**.

This repository publishes the current static Drayker Design Component. Its visual
system, page composition, runtime and animated mark come from the Drayker 3.4.1
package. The public copy and component records continue to evolve here as the
repositories publish better material. There is no React/Vinext application or
reconstructed design.

## What is in this repository

| File | Role |
| --- | --- |
| `index.html` | The current whole site. A single Design Component and the source used to generate every public route. |
| `support.js` | The generated Design Component runtime. **Do not edit by hand.** |
| `drayker-mark.js` / `DRAYKER-MARK.md` | Reusable official mark implementation and its contract. |
| `assets/logo/` | Complete logo kit supplied with the package. |
| `design/` | Preserved package references: the v3 baseline, historical v2 component and logo variations. These are provenance, not a second editable copy of current content. |
| `.github/internal/` | Maintainer working notes (agent instructions, sync log, handoff records). Kept in the repository but not served, because GitHub Pages does not publish `.github/`. |
| `.nojekyll` | Keeps GitHub Pages from interpreting `{{ … }}` component bindings as Liquid. |
| `CNAME` | The custom domain. |
| `SITE_PATTERN.md` | The Drayker web pattern: tokens, structure, interaction contract, how to reuse it. |
| `tools/render-check.js` | Dependency-free checks for both domains, routes, all component pages, GitHub forms, Volunteer and offline behaviour. |
| `tools/make-com.js` | Generates the institutional `.com` artifact from the same component. |
| `tools/prerender.js` | Emits one clean, crawlable HTML document per route and generates `sitemap.xml`. |
| `data/org.json` | Committed public snapshot used before the live GitHub API. |
| `.github/workflows/org-snapshot.yml` | Opens a focused update PR when the organization snapshot changes. |

There is no dependency to install. The page loads React and its fonts through the runtime's existing CDN path. The dependency-free prerender step materializes clean URLs for search and link previews.

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

The scheduled ecosystem smoke test can also be run manually when network access is
available:

```bash
node tools/ecosystem-link-check.js
```

To verify the generated `.com` presentation too:

```bash
node tools/make-com.js /tmp/drayker-com.html
node tools/render-check.js /tmp/drayker-com.html
```

For a production checkout, use `--sync` so the generated repository also receives
the canonical runtime, mark engine, assets and validation tools:

```bash
node tools/make-com.js ../drayker.com/index.html --sync
```

## GitHub integration

- **Open functions** are read live from the public issues of the [`draykerdk`](https://github.com/draykerdk) organization: an issue becomes an open function when it carries the `open-function` label. The `open-function.yml` issue form applies `proposed-function`; a maintainer reviews the proposal and applies `open-function`, so the board shows only reviewed functions. The board searches by label (`open-function`, plus `good first issue` and `help wanted`), counts an issue as claimed when it has the `claimed` label or an assignee, and places it in a track from its `skill:*` label. `level:*` and `effort:~Nh` are read on GitHub, not by the board. Nothing on that board is written by hand. If the search returns nothing, the board says so; if it fails, the committed snapshot stays on screen and is labelled as a snapshot.
- **Organization data** loads from the committed `data/org.json` snapshot first and is then enriched by the public API. Clean subroutes use an absolute snapshot URL, so `/docs/` and `/project/dk/` work exactly like the root.
- **Volunteer guidance** is resolved locally in the browser. It recommends a track, projects and first steps without transmitting the visitor's answers. The visitor may then review and publish a prefilled public issue in [`general-forum`](https://github.com/draykerdk/general-forum/issues/new?template=volunteer-introduction.yml).
- **Partnership proposals** are composed locally on `.com` and opened as a prefilled public issue in `general-forum`. The site does not collect contact information.
- **Dknowledge** has one official repository-backed surface at [dknowledge.drayker.org](https://dknowledge.drayker.org). The footer, Docs vocabulary and didactic system map link there directly. The retired `/knowledge/` and `/project/dknowledge/` URLs are compatibility redirects only.

## Contributing

Open an issue in this repository. If you want to work on the site itself, keep the runtime contract and the visual tokens in `SITE_PATTERN.md` intact, and never publish internal project-management state. A project page describes purpose, role, relationships and sources, not execution status.

The current founding phase and direct-integration limits are written in the organization-wide [GOVERNANCE.md](https://github.com/draykerdk/.github/blob/master/GOVERNANCE.md). DFMP is the documented proposal method. DAF is an autonomous federation of autonomous units and a basic and primitive form of PAP, implemented now on GitHub (Phase 0): its rules, instruments and public record exist. No unit has been recorded and no assembly has been held yet. It is not Drayker's final constitution. Membership rules are not operational yet; the public entry today is voluntary contribution through the normal GitHub flow.

On vocabulary: **volunteer** is the operating role of the current founding phase — someone contributing through the open flow today, with no membership status implied. **Member** is the intended constitutional unit of Drayker — someone who participates as a constituent part of the system once membership rules become operational. A volunteer may become a member, and Drayker's future is not simply "a supersystem of volunteers", but "volunteer" names a present working relationship, not a permanent classification of the person.

[Steemit](https://steemit.com/@drayker) · [Medium](https://medium.com/drayker) · [Twitter](https://twitter.com/Draykerdk)

Code under MIT (see `LICENSE`), content under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
