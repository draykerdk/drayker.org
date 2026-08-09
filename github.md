repo: draykerdk/drayker.org
branch: master

Related repos read for content: draykerdk/dfmp

## Last sync
date: 2026-08-09

### Updated in this project
- Package 2.3 Design Component promoted to the deployed `index.html`; the previous React/Vinext reconstruction is not used as a design, content or architecture source.
- Complete official logo kit, animated mark source and package design references added to the static repository.
- Public `.org` / `.com` builds now hand off cross-domain routes instead of rendering participation UI under the institutional domain.
- Volunteer multi-select steps can advance with no selection; single-select steps remain required.
- Volunteer results always contain three project recommendations, exactly one `YOU ARE HERE` layer, and project pages opened from the map return to the same result.
- Dependency-free regression suite expanded to 34,000+ checks across both presentations, direct routes, 17 repositories, 3 no-repository concepts, three Volunteer profiles, cache and offline fallback.
- Browser validation passed for `.org`, generated `.com`, direct project routes and mobile layout with no console errors or horizontal overflow.
- Source of truth settled: the static Design Component, no framework. Any React/Next port is an experiment and does not govern content.
- Real .com / .org split: participation routes (contribute hub, project pages, the volunteer journey) force the .org site, the header CTA becomes an explicit "Take part on .org" bridge on .com, the footer's PARTICIPATE column differs per domain, a bridge section closes the .com home, and the document title follows the domain.
- Dk page gained "Three scales, one kernel": Dk Global (collective intelligence, concentrating federated learning), Dk Personal (per-member agent bound to UID), Dk Local (agents specialised in a project, area or non-deterministic function) — written as architecture under design, not as an implemented general intelligence.
- Project `WHAT IS OPEN` blocks rewritten to lead with the declared gap instead of a maturity word — no `Active` / `Research` / `Concept` / `Design stage` openers remain.
- `#org/project/<key>` no longer dead-ends: an unresolvable key renders a "no page for this key" block with a way back to the project list, protecting the README link contract against renames.
- Every named part now has an internal page. Three concept pages added for parts with no repository — Distributed support (`dsupport`), Open science & health (`openscience`), Value unit (`valueunit`) — each stating plainly that nothing is written yet and what the first contribution would be.
- Ecosystem cards and the Dk component cards open the internal page first; external repo and docs links became secondary links on the card instead of the card's only destination.
- Management status removed from the public layer: `IN RESEARCH` / `ACTIVE` / `IN DESIGN` / `CONCEPT` badges, the status legend, the status dots on ecosystem and project cards, and the `NOW / NEXT / DONE / LATER` roadmap rails are gone from the markup *and* from the data model (34 status fields, 15 roadmap arrays).
- Declared gaps kept as prose under `WHAT IS OPEN` on the project pages — invitation, not tracker.
- Guided volunteer journey behind the "Volunteer" button: a questionnaire (skills, interests, availability) that resolves to a track, a second-best track, weekly hours and three first steps.
- Personalised org map after the questionnaire: all 17 repos laid out by contribution domain, the matched track marked `YOUR TRACK` and the entry point `YOU ARE HERE`; every node links to its project page.
- Fixed repo-page collapse and duplicated descriptions flagged in review.

### Previously in this project
- Curated vision pages for all 17 org repositories, written from each repo's README (including the "state of this documentation" gaps: DFMP-000 unwritten, DAF point mechanics unspecified, councils undefined, DFMPProject templates unpublished).
- Corrected repo keys (living-cryptography, dk-network) and the real board label: `open-function`, not "good first issue".
- Hash routes added so README links work: #org/fn, #org/join, #org/contrib/<tab>, #org/project/<key>, #com/<page>.
- New Contribute hub on drayker.org: Overview, Tracks, Projects, Open functions, Guide — replaces the standalone "Open functions" page.
- Live GitHub integration (repos, open issues, contributors) read from the public API and cached 30 min, with curated fallback when unreachable.
- Per-project vision pages: vision, problem, current state, roadmap, architecture, how to contribute, live open issues, repo + subdomain links.
- Contribution guide (issue → claim → fork/branch → PR to community review branch → legitimation) plus a label map.

## Sync history
### 2026-08-05T09:46:26Z
- Copy pass across all pages: tightened hero, manifesto, DFM, Dk, ecosystem, organization descriptions against original READMEs.

### 2026-08-05T02:54:16Z
- Built the full Drayker site as a single Design Component (`Drayker.dc.html`), covering drayker.com and drayker.org from one visual system with a .com/.org switch.
- Content grounded in the drayker.org and dfmp READMEs plus the public docs subdomains (bsdk, dknetwork, lc, dfmp).

## Screen map
| Screen | Built from |
| --- | --- |
| Home (.com / .org) | drayker.org README.md, drayker.com hero copy |
| Manifesto | drayker.com "about" copy, dfmp README principles |
| DFM Protocol | draykerdk/dfmp README.md, dfmpp/README.md |
| Dk | drayker.com/dk, bsdk.drayker.org, lc.drayker.org, dknetwork.drayker.org |
| Ecosystem | draykerdk repo list (bsdk, daf, uid, metadfmp, emergence-initiative) |
| Organization | drayker.org README.md (DFMP + DAF), draykerdk/daf |
| Contribute · Overview | GitHub API: orgs/draykerdk repos, contributors |
| Contribute · Tracks | curated — volunteer tracks, not repo-derived |
| Contribute · Projects | READMEs of all 17 draykerdk repos + live GitHub API repo data |
| Contribute · Open functions | GitHub API issue search (org:draykerdk is:issue is:open) |
| Contribute · Guide | draykerdk/dfmp process (community review branch → master) |
| Contribute · Join (wizard + map) | curated — questionnaire logic and track match, mapped onto the 17 draykerdk repos |
| Docs | doc subdomains + github.com/draykerdk |
