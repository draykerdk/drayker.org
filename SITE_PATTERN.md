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
- Dk
- Ecosystem
- Organization
- Open functions
- Docs & papers
- Volunteer application

## Reusing the pattern

For a new Drayker site, copy `index.html`, `support.js` and `.nojekyll` as a unit. Change content and the default `site` prop only after preserving the runtime contract and visual tokens. Keep navigation actions, keyboard/mobile flow and external links explicit in the component logic.

## Verification

Serve the repository root as static files and verify:

```bash
node --check support.js
python3 -m http.server 8766
```

Then confirm the `.org` default, domain switch, internal navigation, external links and volunteer form in a browser. No form submission is persisted by this static prototype yet.
