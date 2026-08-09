# drayker.org — static Drayker system

The public entry point for people who want to work on Drayker: what the organization is, how the DFM protocol shapes the work, what each part of the ecosystem does, which functions are open, and how to volunteer.

Live at **[drayker.org](https://drayker.org)**.

This repository publishes the static Design Component supplied in the Drayker
2.3 package. Its visual system, page composition, animated mark and content are
package-native; there is no React/Vinext application or reconstructed design.

## What is in this repository

| File | Role |
| --- | --- |
| `index.html` | The whole site — a single Design Component, deployed as-is by GitHub Pages. |
| `support.js` | The generated Design Component runtime. **Do not edit by hand.** |
| `drayker-mark.js` / `DRAYKER-MARK.md` | Reusable official mark implementation and its contract. |
| `assets/logo/` | Complete logo kit supplied with the package. |
| `design/` | Unmodified package references: the v2 component and logo variations. |
| `.nojekyll` | Keeps GitHub Pages from interpreting `{{ … }}` component bindings as Liquid. |
| `CNAME` | The custom domain. |
| `SITE_PATTERN.md` | The Drayker web pattern: tokens, structure, interaction contract, how to reuse it. |
| `tools/render-check.js` | Dependency-free checks for both domains, routes, all project pages, Volunteer and GitHub fallback. |
| `tools/make-com.js` | Generates the institutional `.com` artifact from the same component. |

There is no build step and no dependency to install. The page loads React and its fonts through the runtime's existing CDN path.

## Running it locally

```bash
python3 -m http.server 8766
```

Then open <http://localhost:8766>. Before committing:

```bash
node --check support.js
node --check drayker-mark.js
node tools/render-check.js
git diff --check
```

To verify the generated `.com` presentation too:

```bash
node tools/make-com.js /tmp/drayker-com.html
node tools/render-check.js /tmp/drayker-com.html
```

## Two things the site reads from GitHub

- **Open functions** are read live from the public issues of the [`draykerdk`](https://github.com/draykerdk) organization: an issue becomes an open function when it carries the `open-function` label. Optional `skill:*`, `level:*` and `effort:*` labels fill in the filters, badge and estimate. Nothing on that board is written by hand — if the search returns nothing, the board says so.
- **Volunteer guidance** is resolved locally in the browser. It recommends a track, projects and first steps without transmitting the visitor's answers.

## Contributing

Open an issue in this repository. If you want to work on the site itself, keep the runtime contract and the visual tokens in `SITE_PATTERN.md` intact, and never publish internal project-management state — a project page describes purpose, role, relationships and sources, not execution status.

Drayker is organized through the [DFMP](https://dfmp.drayker.org) process, its resources are governed by the non-profit [DAF](https://daf.drayker.org), and the work is primarily voluntary.

[Steemit](https://steemit.com/@drayker) · [Medium](https://medium.com/drayker) · [Twitter](https://twitter.com/Draykerdk)

Site content is published under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/); the code in this repository is under the license in `LICENSE`.
