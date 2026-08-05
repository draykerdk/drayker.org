# Drayker site pattern

This repository is the first deployment of the Drayker web pattern: a dark, open-infrastructure interface built as a single Design Component and served as a static GitHub Pages site.

## Runtime contract

- `index.html` is the deployable Design Component and the entry point for GitHub Pages.
- `support.js` is the generated Design Component runtime. Do not edit it manually.
- `.nojekyll` keeps GitHub Pages from interpreting `{{ ... }}` component bindings as Liquid.
- The component loads React and the configured fonts through the runtime's existing CDN/SRI path.
- The `site` prop selects the `.com` or `.org` presentation. This deployment defaults to `org`.

## Visual tokens

| Token | Value |
| --- | --- |
| Canvas | `#08080A` |
| Surface | `#0C0C0F` |
| Border | `#18181E` |
| Text | `#EDECF0` |
| Muted text | `#8585A0` |
| Accent | `#FF5500` |
| Accent hover | `#FF7A33` |
| Display face | Space Grotesk |
| Technical face | JetBrains Mono |
| Content width | `1320px` |

## Page structure

1. Sticky header with the Drayker mark, section navigation, domain switch and primary participation action.
2. Hero with a short thesis, one primary action, one secondary action and the animated mark.
3. Proof strip for the organization’s operating conditions.
4. Modular content sections using bordered grids, numbered items and explicit links.
5. Footer divided into system, participation and external links.

## Included screens

- Home
- Manifesto
- DFM Protocol
- Dk Global
- Dk Personal
- Ecosystem
- Organization
- Open functions
- Docs & papers
- Volunteer application
- Project pages for the Dk components, organizational projects and application domains

## Interaction contract

- Navigation is keyboard-accessible and uses semantic buttons with visible focus states.
- The selected site and screen are reflected in hash routes such as `#org/fn` and `#com/dfm`, so a refresh and browser back/forward preserve the current view.
- The volunteer screen transmits nothing. It composes a GitHub issue and opens it for the person to read, edit and publish under their own account, and it says so before and after the action.
- No page invents content. Where a source is thin, the page says so; where there is no public source, the page states that instead of linking somewhere plausible.
- Ecosystem, component and organization cards open a dedicated internal project page before sending the reader to external source repositories or documentation.
- Public pages do not expose private project-management statuses. A project page describes purpose, role, relationships and sources independently of its internal execution state.
- The `.org` presentation is the cooperation and documentation layer: it emphasizes open functions, organization, project pages, source trails and ways to continue the work.
- The `.com` presentation is the institutional layer: it emphasizes the overall Drayker map and explains where each part fits without exposing private project-management state.
- The `.com` and `.org` presentations share the public project directory and relationship graph, but each project page changes its framing and call to action for the selected domain.

## Data read at runtime

The component is static, but two things are read from GitHub in the browser so they cannot drift from reality:

| What | Source | Failure behaviour |
| --- | --- | --- |
| Open-functions board | `GET api.github.com/search/issues` for `org:draykerdk is:issue is:open label:open-function`, fetched only when the board is opened | Falls back to the same honest empty state; never to sample rows |
| Volunteer application | A prefilled `issues/new` URL on `draykerdk/drayker.org`, opened in a new tab | The confirmation screen also prints the link |

Issue labels that shape a row: `skill:*` (drives the filters), `level:*` (badge), `effort:*` (estimate).

## Reusing the pattern

For a new Drayker site, copy `index.html`, `support.js` and `.nojekyll` as a unit. Change content and the default `site` prop only after preserving the runtime contract and visual tokens. Keep navigation actions, keyboard/mobile flow and external links explicit in the component logic.

## Verification

Serve the repository root as static files and verify:

```bash
node --check support.js
python3 -m http.server 8766
```

Then confirm the `.org` default, `#org/home` route, domain switch to `#com/home`, internal navigation, external links, filter buttons and the volunteer flow in a browser.

All 21 screens are also rendered headlessly in both presentations by:

```bash
node tools/render-check.js
```

It asserts that no bound value comes back empty or containing `undefined`, which is what a missing `.com` variant, a renamed project key or a broken relation looks like before it reaches a browser.
