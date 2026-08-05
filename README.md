# drayker.org — Drayker volunteers portal

The public entry point for people who want to work on Drayker: what the organization is, how the DFM protocol shapes the work, what each part of the ecosystem does, which functions are open, and how to volunteer.

Live at **[drayker.org](https://drayker.org)**.

## What is in this repository

| File | Role |
| --- | --- |
| `index.html` | The whole site — a single Design Component, deployed as-is by GitHub Pages. |
| `support.js` | The generated Design Component runtime. **Do not edit by hand.** |
| `.nojekyll` | Keeps GitHub Pages from interpreting `{{ … }}` component bindings as Liquid. |
| `CNAME` | The custom domain. |
| `SITE_PATTERN.md` | The Drayker web pattern: tokens, structure, interaction contract, how to reuse it. |

There is no build step and no dependency to install. The page loads React and its fonts through the runtime's existing CDN path.

## Running it locally

```bash
python3 -m http.server 8766
```

Then open <http://localhost:8766>. Before committing:

```bash
node --check support.js
git diff --check
```

## Two things the site reads from GitHub

- **Open functions** are read live from the public issues of the [`draykerdk`](https://github.com/draykerdk) organization: an issue becomes an open function when it carries the `open-function` label. Optional `skill:*`, `level:*` and `effort:*` labels fill in the filters, badge and estimate. Nothing on that board is written by hand — if the search returns nothing, the board says so.
- **Volunteer applications** are not transmitted by this page. The form composes a GitHub issue and opens it for the person to read, edit and publish under their own account.

## Contributing

Open an issue in this repository. If you want to work on the site itself, keep the runtime contract and the visual tokens in `SITE_PATTERN.md` intact, and never publish internal project-management state — a project page describes purpose, role, relationships and sources, not execution status.

Drayker is organized through the [DFMP](https://dfmp.drayker.org) process, its resources are governed by the non-profit [DAF](https://daf.drayker.org), and the work is primarily voluntary.

[Steemit](https://steemit.com/@drayker) · [Medium](https://medium.com/drayker) · [Twitter](https://twitter.com/Draykerdk)

Site content is published under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/); the code in this repository is under the license in `LICENSE`.
