repo: draykerdk/drayker.org
branch: master

Related repos read for content: draykerdk/dfmp

## Last sync
date: 2026-08-10T12:55:41Z

### Updated in this project
- **Independent public forum linked from both domains:** the header navigation on `drayker.org` and `drayker.com` now opens `forum.drayker.org`, the static reading surface published from `draykerdk/general-forum`. The portal does not duplicate the conversation; issues, replies and merged decisions remain in their source repositories on GitHub.
- **Dknowledger consolidated into one official surface:** `dknowledger.drayker.org` is now the canonical public home for its orientation, knowledge model, papers, roadmap, repository catalog and contribution path. The duplicate Knowledge route has been removed from both main-site menus and sitemaps; the footer and the didactic system map link to the official surface, every Dknowledger project card opens it directly, and the old `/knowledge/`, `/project/dknowledge/` and hash URLs remain compatibility redirects.
- Package 3.4.1 is published on the official `master` branches: `drayker.org` (`9ec7efd`), `drayker.com` (`22ec959`), Dknowledger (`aa1f5bf`) and the shared documentation theme (`59e22fb`). Production routes, icons, redirects and Pages builds were verified after publication.
- Pulled the deployed component changes back into `design/Drayker v3.dc.html` before prerendering. The published `index.html` additionally carries the generated root document block; both sources retain the same component, favicon set and launch-state wording.
- **The system on one screen** (both homes): the twenty parts — the seventeen repositories plus the three no-repository concepts — placed in their four layers, each card carrying the standing its own contract declares and opening the part's page — the case page on `.com`, the technical page on `.org`. Built from `CASE_LAYERS` / `CASE_LAYER_OF`, so the map cannot drift from the layer argument above it.
- **What blocks what** (`.org` home): pick any part and the page computes, from the dependencies declared in the contracts, which upstream parts are not running yet — each with the gap its own page states and a click through to it. Chains are bounded to three hops and a part is never its own blocker; when nothing upstream blocks it, the page says the missing work is inside it.
- **Vocabulary** (Docs, both sites): eighteen terms — DFM, DFMP, Dk, BSDK, LCrypt, UID, OSDK, DAF, DAO/DAC, federative points, councils, value unit, open function, component contract, Dknowledger and the rest — each defined from what the repositories actually say, and each stating where the specification is still missing. Linked from the layers section on both homes.
- **One real issue, walked through the live flow** (DFM page): the six GitHub steps bound to an actual open issue from `org:draykerdk` (preferring the `open-function` label), with its repository, number, branch name and pull-request base spelled out. Honest fallbacks when the API is unreachable or nothing is open — no invented issue.
- **Historical package note:** package 3.4.1 originally introduced a duplicate Dknowledger overview inside both main sites. That route has now been retired in favor of the complete repository-backed surface at `dknowledger.drayker.org`.
- The page's inventory is the repository as actually read: the 17 contracts, `CURRENT.md`, the papers index, the **sixteen papers that are titles only** (dk 8 · ecosystem 7 · organization 1, files of 7–130 bytes), the historical roadmap and the PT/ES translations that trail English — filterable by trust level, each row linking to the real file. The empty ones are presented as the opening.
- `DKNOWLEDGE-DESIGN.md` added for the agent doing the internal static work: an opening instruction to read Drayker's own extensive internal material first and let it override the proposed model where it is richer (keeping page and repository from diverging), then the front-matter node schema, trust computed as a pure function of evidence, `tools/build-graph.js` emitting `data/graph.json` · `trust.json` · `openings.json` committed by an Action, CI validation rules, implementation order, and what stays out of scope.
- **Layers back to four, with the real definitions**: 01 DFM as one method in its versions (organization, engineering, architecture, A.I. agents) · 02 Dk as the whole technological system (kernel, base structure, network, cryptography, identity, intelligence, devices) · 03 organization and resources held distributed, transparent and intelligent · 04 **transition and emergence** — what is actually being built with available resources: the DAF, the organization running on GitHub, the public sites and knowledge base, on the way to an evolutionary platform of its own. The short-lived identity/network/what-it-serves split was folded back in; `CASE_LAYERS` and `CASE_LAYER_OF` now carry these four ids and the twenty parts distribute across them (7 method-and-system reads unchanged elsewhere).
- The layers section now states the thesis before the list: Drayker as a **collective intelligence integrated with artificial intelligence** — people, teams and agents delivering inside one structure, neither supervising the other — with the four layers presented as what that requires. The method card says a person and an agent claim a function on identical terms.
- `.org` hero title rewritten: "Nobody hands out the work. You take the piece you can finish." — the old line described the problem's size instead of the invitation.
- **SEO per route**: `ROUTE_META` and `setMeta()` keep title, description, canonical and Open Graph metadata aligned with each current route. The nineteen main-site component routes are documents in their own right; Dknowledger is canonical only on its subdomain. Verified on `#org/project/uid` and `#org/project/valueunit`.
- **`tools/prerender.js`** (published, no dependencies): emits one real HTML document per current route and compatibility redirect documents for `./knowledge/` and `./project/dknowledge/`. Canonicals, noscript links and sitemap use clean URLs without fragments; generated blocks are idempotent; `tools/prerender-check.js` verifies metadata, redirects and every favicon path.
- **`.github/workflows/org-snapshot.yml`**: nightly `gh api` + `jq` job builds `data/org.json` (17 public component repositories, open issues and contributors) in the exact shape the component consumes. It updates a reviewable automation branch/PR instead of trying to bypass protected `master`. `loadGH()` uses root-absolute data on `.org` and the canonical `.org` snapshot on `.com`, so clean subroutes do not 404.
- **`INFRA-HANDOFF.md`** documents both, with the publish order and the only deliberately omitted SEO enhancement: a distinct `og:image` for every route.
- Static regression covers the four-layer map, route metadata, canonical Dknowledger handoffs and both snapshot origins; prerender validation covers 33 `.org` and 27 `.com` canonical routes plus two compatibility redirects on each domain. The dedicated Dknowledger repository adds its own generated source catalog and site contract tests.
- **Published and verified**: package 3.4.1 is live on both domains, the `.com` default is institutional, clean routes are materialized, and the public organization snapshot is available. A final runtime SEO pass keeps canonical and `og:url` on those clean routes after JavaScript mounts instead of reverting them to hash URLs.

### Previously in this project (2026-08-10T11:23Z)
- Integrated the package 3.0 Design Component as the published `index.html` and preserved the identical v3 source under `design/`; the React/Vinext approximation is not used.
- Reconciled launch-state copy with the live deployment: `drayker.com` is canonical and indexable, while DAF, its contract, federative points and voting remain explicitly proposed rather than operational.
- Removed the obsolete repository-local volunteer form so introductions and partnership proposals have one public intake in `general-forum`; aligned the local open-function review field with the founding-phase Git flow.
- Updated the generator metadata, project instructions and static regression suite for Archivo, twenty `.com` cases, technical deep links, honest offline states and both real issue forms.
- **drayker.com now has its own component pages** at `#com/project/<key>` — the case for each of the 20 parts, written for a reader deciding whether the idea is worth anything: `HOW IT WORKS TODAY` vs `WHAT THIS CHANGES`, `WHERE YOU WOULD NOTICE IT`, `WHY THE REST DEPENDS ON IT`, which of the four layers (plus public surface) it belongs to and why that layer exists, and `IT NEEDS` / `WHAT NEEDS IT` chips that open sibling `.com` pages. New `PITCH`, `CASE_LAYERS`, `CASE_LAYER_OF` and `CASE_STANDING` tables; no vision, architecture, contract or issue text is duplicated from the portal.
- Standing on the `.com` page is derived from the published contract level, never hand-written: `WRITTEN, NOT BUILT` / `RUNNING TODAY`, and `NOT WRITTEN YET` for the three parts with no repository.
- **Deep links instead of duplication**: `THE TECHNICAL RECORD` on each `.com` page opens the exact section of the portal page — `#org/project/<key>/arch`, `/open`, `/map`, `/contract` (contract card omitted for the three concepts). The portal sections carry `data-focus` anchors and the router scrolls to them with a header offset. Ecosystem cards on `.com` changed from `FULL PAGE ON DRAYKER.ORG` to `What it changes →`.
- `#org/project/<key>` and every other README route are unchanged; `.com` and `.org` now resolve the same key to different questions.
### Previously in this project (2026-08-10T07:06Z)
- Component pages restructured into three explicit tiers a reader can fold: **01 IN ONE SENTENCE** (a new jargon-free sentence written for all 20 parts), **02 WHY IT EXISTS** (vision, problem, role, relations, what is open, sources, neighbourhood map) and **03 THE ARCHITECTURE** (component contract, architecture, open issues). Tier 01 is always open; 02 and 03 toggle from a rail at the top that also shows the reading-trail position.
- **WHERE IT SITS**: a per-page neighbourhood map — the component at the centre, what it needs on the left, what needs it on the right — computed from the declared dependencies (and from a small `CONCEPT_DEPS` table for the three parts with no contract), every node clickable. Components with no declared dependency in either direction say so.
- **ARCHITECTURE became didactic**: each of the 79 architecture labels now expands to an explanation of what it means and why it is there (`ARCH_NOTES`, index-aligned per component). Labels alone taught nothing.
- **Reading trail** across all twenty pages (`TRAIL`): method → what it is used to design → how it would be governed → public surfaces, with step position, previous/next cards and an explicit way to leave the trail.
- Home rewritten to carry the thesis instead of a slogan. `.com` hero: "Intelligence stops being the bottleneck. Organization becomes it." (kicker: FOR THE AGE OF SUPERINTELLIGENCE), with a body that names the concentration problem directly. `.org` hero keeps the concrete invitation and gains the same premise in one sentence.
- New **WHY NOW** section on both homes: machine intelligence as the productive force of the century, the historical pattern of every leap being absorbed and concentrated by existing organizations, and the alternative — work anyone can finish, decisions anyone can audit, resources following delivery — with intelligence integrated symbiotically into life and work rather than sitting above them, amplifying latent human capacity. Closes by naming the distance between what is written and what runs.
- Three layers → **four layers**: DFM (method) · Dk (kernel) · Organization & resources (federation, weight from delivered work, value unit) · Ecosystem. Resource distribution is now a pillar of the front door instead of a footnote in the proof strip. Kernel and ecosystem card copy rewritten off jargon lists.
- Manifesto gained the era paragraph; Dk page hero states the substrate is meant to be inhabited, not operated.
- New organization-wide structure picked up from GitHub: every repository now publishes a **public component contract** at `.drayker/component.yml`, validated on every pull request by the shared workflow `draykerdk/.github/.github/workflows/validate-component.yml` against `schema/component.schema.json`. All 17 contracts were read verbatim and are now the spine of every project page.
- Project pages (`#org/project/<key>`) gained a **PUBLIC COMPONENT CONTRACT** section: declared problem, IN SCOPE / NOT IN SCOPE, implementation level with its own scope sentence, linked evidence (document / deployment / test / usage), DEPENDS ON as chips that open the dependency's page, WHAT COULD BE MISREAD (the contract's risks), contributions entrypoint, source of truth, last-reviewed date, and a link to the contract file and the schema.
- Implementation level is rendered as evidence language, never as a maturity badge: `none` → "NO IMPLEMENTATION PUBLISHED", `operational` → "OPERATIONAL — WITHIN THE SCOPE BELOW". Five components are operational per their own contracts (drayker.org, drayker.com, drayker-theme, dknowledge, general-forum); the other twelve declare no implementation.
- The three no-repository concepts (`dsupport`, `openscience`, `valueunit`) get a **NO COMPONENT CONTRACT YET** block instead of an implied one, with the schema linked as the list of questions a first document has to answer.
- Ecosystem cards now carry the declared artifact type beside the layer (KERNEL · ARCHITECTURE, ORGANIZATION · GOVERNANCE PROPOSAL, PORTAL · PORTAL…), read from the same contracts.
- Project pages no longer depend on the GitHub API for their own repository links: repo URL, issues URL, evidence and contract links are derived from the curated key, so the page is complete with the network off.
- Volunteer CTA re-pointed at the real intake: `general-forum/issues/new?template=volunteer-introduction.yml`, prefilling that form's `interests`, `contribution` and `starting_point` fields (the dropdown option is chosen from the matched track). The old `drayker.org/volunteer.yml` form is no longer used by the site.
- Partnership CTA is wired to the real form that now exists: `general-forum/issues/new?template=partnership.yml`, prefilling `proposal` and `boundaries`. The remaining pendency from the previous sync is closed.
- Label map rewritten from `draykerdk/.github/labels.yml`: `open-function`, `motion`, `claimed`, `needs-review` (real name), `good first issue`, `help wanted`, `documentation`, `volunteer-introduction`, `partnership`, plus the `skill:` / `level:` / `effort:` families and what `effort:large` means.
- Contribution guide step 06 now states the founding-phase rule as written in `GOVERNANCE.md`: no approval count is required, and who may merge directly — with the limits — is in that file. New "The rules are files" block links CONTRIBUTING.md, GOVERNANCE.md and component.schema.json. No individual is named anywhere on the site.
- Organization page gained an `IN WRITING` card linking GOVERNANCE.md; Docs gained a `PER REPOSITORY` card explaining the component contract and pointing at the component list.

### Previously in this project
- Re-read the repository at tree `8a16ca9387f0`: `index.html` unchanged (blob `dcc154b79886`, the v3 base).
- Copy register raised across every page title; cross-domain routing fixed so `project/<key>`, `contrib/<tab>`, `fn` and `join` survive the `.com` → `.org` handoff.
- `Drayker v3.dc.html` created from the deployed `index.html` (not from the local v2). v2 kept untouched as history. Handoff notes in `V3-HANDOFF.md`.
- Typography moved to Archivo (400/500/600/700); JetBrains Mono still only on technical labels. Mark, colours, grid, cards and animations untouched.
- New institutional route `#com/partnerships`; `.org` links cross to it instead of duplicating it.
- DFM page split into the five-move method and "Today, on GitHub" (issue → claim → branch → pull request to master → checks → merge). `community-review` removed site-wide.
- Claims contextualised across the site and the stage disclaimer added after the vision on both homes and on the partnerships page.
- Volunteer flow ends in a review card plus "Review my introduction on GitHub"; no email asked.
- The ten fictional `FN-01xx` rows were deleted from markup and data model; the board shows loading / unreachable / nothing-published / no-match states.
- Project pages gained ROLE IN THE SYSTEM, RELATIONS and PUBLIC SOURCES for all 17 repositories and the 3 no-repository concepts.
- Organization rewritten around the founding phase; Docs rewritten around Dknowledger, split into current / historical / not written yet.
- Management status removed from the public layer (badges, status dots, NOW/NEXT/DONE/LATER rails) in markup *and* data model. Declared gaps kept as prose under `WHAT IS OPEN`.
- Guided volunteer journey, personalised org map over the 17 repos, curated GitHub fallback cached 30 min, hash routes for the README link contract, real board label `open-function`.

## Sync history
### 2026-08-10T02:26:12Z
- v3 created from production `index.html`; Archivo typography; `#com/partnerships`; DFM split; volunteer flow rewritten; fictional board rows removed; ROLE / RELATIONS / PUBLIC SOURCES added to project pages.

### 2026-08-05T09:46:26Z
- Copy pass across all pages: tightened hero, manifesto, DFM, Dk, ecosystem, organization descriptions against original READMEs.

### 2026-08-05T02:54:16Z
- Built the full Drayker site as a single Design Component (`Drayker.dc.html`), covering drayker.com and drayker.org from one visual system with a .com/.org switch.
- Content grounded in the drayker.org and dfmp READMEs plus the public docs subdomains (bsdk, dknetwork, lc, dfmp).

## Screen map
| Screen | Built from |
| --- | --- |
| Partnerships (.com) | curated — funding and partnership brief, no repo source |
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
| Contribute · Guide | draykerdk/.github CONTRIBUTING.md + GOVERNANCE.md + labels.yml |
| Contribute · Join (wizard + map) | curated — questionnaire logic and track match, mapped onto the 17 draykerdk repos |
| Docs | doc subdomains + github.com/draykerdk + .drayker/component.yml |
| Dknowledger (knowledge layer) | draykerdk/dknowledge README.md · CURRENT.md · generated `data/catalog.json` · papers/ and roadmap/ trees · .drayker/component.yml · dedicated `dknowledger.drayker.org` surface |
| Component page · the case (.com) | curated — practical case per part, derived from the same contracts and READMEs, no repo copy duplicated |
| Project page · contract block | `.drayker/component.yml` of each of the 17 repositories (schema in draykerdk/.github) |
| Volunteer intake CTA | general-forum/.github/ISSUE_TEMPLATE/volunteer-introduction.yml |
| Partnership CTA | general-forum/.github/ISSUE_TEMPLATE/partnership.yml |
