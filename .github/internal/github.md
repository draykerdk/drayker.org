repo: draykerdk/drayker.org
branch: master

Related repositories read for content: all 25 public component repositories in `PROJECTS`, including their READMEs and public component contracts. Constitutional alignment in this sync also reads the organization-wide `.github/GOVERNANCE.md` and profile.

## Last sync
date: 2026-10-07T18:00:00Z

### English-only design files and logo paths, branch `docs/english-only-logo-paths`

- **Design files in English.** `DRAYKER-MARK.md` and `design/Drayker Logo Variations.html` (visible text, alt text and comments; layout, IDs and code unchanged) are in English. The v3 design file title reads "Drayker — volunteers portal".
- **Logo paths in English.** Folders and files under `assets/logo/` renamed: `assinatura/` → `signature/`, `escopo/` → `scope/`, `escuro/` → `dark/`, `drayker-marca` → `drayker-mark`, `drayker-icone` → `drayker-icon`, `drayker-sem-cunha` → `drayker-no-wedge`, `drayker-orbita-larga` → `drayker-wide-orbit`, `drayker-tecnica` → `drayker-technical`, `-branco`/`-preto` → `-white`/`-black`, `1cor` → `1color`, `vazado` → `knockout`, `icon-512-escuro`/`-branco` → `icon-512-dark`/`-white`. Every reference in the portal, prerender tools, checks and the `.com` mirror follows. Three legacy copies stay at their old paths (`assets/logo/drayker-icone.svg`, `assets/logo/escuro/drayker-icone.svg`, `assets/logo/kit/icon-512-escuro.png`) because doc sites built from the shared theme load them as favicons until they rebuild; draykerdk/drayker-theme and draykerdk/daf point to the new paths.
- **Organization snapshot weekly.** `.github/workflows/org-snapshot.yml` runs on Mondays at 04:17 UTC instead of daily; `workflow_dispatch` stays for runs on demand.
- Regenerated both prerender trees and the `.com` mirror. render-check, prerender-check (.org and .com) pass.

### Membership and the common floor, branch `fix/membership-floor-kernel-embassies`

- **Membership needs no approval.** Anyone becomes a member by being a person and creating their UID. The common floor belongs to every member; while the network cannot sustain it for everyone, access goes through a queue weighted by context, not through an approval. The economy paragraph, the merit-prize card, the Distributed Support glossary entry and the mirrored Distributed Support and Value Unit contracts drop "approved members" and "requirements of integration and collaboration", superseding the floor entry of `docs/financing-floor-oct-2026` below (draykerdk/distributed-support, draykerdk/value-unit).
- Regenerated both prerender trees and the `.com` mirror.

### The only transferable reputation, branch `docs/only-transferable-reputation`

- **UID and Value Unit contracts.** The mirrored contracts say that the reward is the only transferable reputation, earned by contributing capacity or by financing the network, and can give faster or priority access to resources (draykerdk/uid, draykerdk/value-unit).
- Regenerated both prerender trees and the `.com` mirror. render-check, prerender-check (.org and .com) pass.

### Public readiness, branch `docs/public-readiness`

- **Drayker as a supersystem.** The home tab title reads "Drayker — volunteers portal", the /org heading reads "A supersystem designed to outgrow whoever started it", the JSON-LD no longer carries the "Drayker Organization" alternate name, and the glossary, role lines, Direction phase 1, propagation and drayker.com cards no longer define Drayker as an organization or an initiative.
- **DAF.** Every DAF description follows one formula: an autonomous federation of autonomous units and a basic and primitive form of PAP, implemented now on GitHub (Phase 0), with its rules, instruments and public record in place and no unit recorded or assembly held yet (home, /org, ecosystem cards, glossary, project page, case and README).
- **Dk Global.** It is partly the synthesis of the Dks across the network and partly its own kernels in a unified topology. Allocation follows one formula: on matters outside the constitution, within the space it grants, Dk Global decides and executes autonomously, and a well-justified veto obliges review (glossary, governance simulator, `llms.txt`).
- **Councils.** The Advices card and glossary say Dk also convenes a council when its certainty is low.
- **Smaller corrections.** Dk Personal card describes curation and outward promotion. The reward is the only transferable kind of reputation. Dzweck can be revoked. Open science and PAP states updated. The Dktron simulator is labelled illustrative and uses the Dktron unit. Portuguese and Spanish README tasks removed (English only).
- **Contracts.** The mirrored component contracts were regenerated from every `.drayker/component.yml` (DAF, Distributed Support, Value Unit, Stations, Dknowledge, UID, Dk Network, PAP and review dates).
- `data/org.json` carries the updated repository descriptions. README says code under MIT and content under CC BY 4.0, and no longer names the private vault.
- Regenerated both prerender trees and the `.com` mirror.

### Internal working files no longer served, branch `docs/stop-serving-internal-files`

- Moved the maintainer working notes (`CLAUDE.md`, `github.md`, `V3-HANDOFF.md`, `INFRA-HANDOFF.md`, `DKNOWLEDGE-DESIGN.md`) from the site root to `.github/internal/`. They stay in the repository, and GitHub Pages does not publish `.github/`, so they are no longer reachable on drayker.org.
- The README file table points to the new location.

### Representation and Dk Global — branch `docs/representation-and-dk-global`

- **Dk Personal contract.** The mirrored scope adds outward representation: beyond the anonymous background exchange and as far as the person authorizes, Dk Personal promotes their interests with material arguments only, and the maturity of the personal Dknowledge weighs more than computation in its precision (draykerdk/dk-personal).
- **Three scales.** The Dk Global card adds that it also has its own kernels, running in parallel in a unified topology (draykerdk/dk).
- Regenerated both prerender trees and the `.com` mirror.

### Subtle contrast in Dk Personal curation — branch `docs/subtle-contrast`

- **Dk Personal contract.** The mirrored curation scope item no longer mentions other assistants. It says that Dk Personal has nothing to sell, neither products nor ideas, and no consensus to manufacture, and that it chooses from the interests and context of the person it serves (draykerdk/dk-personal).
- Regenerated both prerender trees and the `.com` mirror.

### Neutral contrast in Dk Personal curation — branch `docs/dk-personal-neutral-contrast`

- **Dk Personal contract.** The mirrored curation scope item now says that other assistants also choose what reaches people, but work for the companies that make them, so they tend to favour the consensus that suits those companies and to sell products and ideas, and that Dk Personal chooses from the interests and context of the person it serves (draykerdk/dk-personal).
- Regenerated both prerender trees and the `.com` mirror.

### Each Dk scale works for someone — branch `docs/dk-scales-power-balance`

- **Three scales.** The Dk Global card says it works for Drayker and all its members, and the Dk Local card says a local Dk works for its project (draykerdk/dk).
- Regenerated both prerender trees and the `.com` mirror.

### Dk Personal curation contrast — branch `docs/dk-personal-curation-contrast`

- **Dk Personal contract.** The mirrored curation scope item adds that, unlike assistants built for whoever made them, Dk Personal does not manufacture consensus that benefits its makers or sell products and ideas (draykerdk/dk-personal).
- Regenerated both prerender trees and the `.com` mirror.

### Dk Personal curation — branch `docs/dk-personal-curation`

- **Dk Personal contract.** The mirrored contract adds one scope item: Dk Personal only takes the person's attention with what it learns is truly important to them, based on their real interests and goals, tells them what is important or urgent without being asked, and leaves the rest until they ask (draykerdk/dk-personal).
- Regenerated both prerender trees and the `.com` mirror.

### Two dates wording — branch `docs/two-dates-and-daf-meta`

- The Direction principle now says the phases are measured against the two dates (Dk 1.0 by 2030, consolidation by 2033), which do not replace the exit conditions, matching draykerdk/dknowledge `roadmap/DIRECTION.md`.
- Regenerated both prerender trees and the `.com` mirror.

### Allocation authority and Direction wording — branch `docs/allocation-and-health-oct-06`

- **Allocation authority.** The mirrored Value Unit contract and `llms.txt` say that Dk Global decides and executes allocations inside the constitution, and that members can make a well-justified veto, which obliges review (draykerdk/value-unit, draykerdk/dknowledge).
- **Direction.** The intro no longer adds "with something very close before then" to the two dates, and the transversal principle says the phases are measured against the two dates (draykerdk/dknowledge).
- Regenerated both prerender trees and the `.com` mirror.

### Conformance pass of 06/10 — branch `docs/conformance-oct-06-2026`

- **Governance card.** "Members set the rules" becomes rules built by the members with Dk Global, within the kernel. Dk Global still decides inside them.
- **Direction.** The intro and the transversal principle state two dates as objectives: Dk 1.0, already an ASI, by 2030, and Drayker consolidated by 2033. Phase 07 says Dk 1.0 is already an ASI, with 2030 as its objective (draykerdk/dknowledge, draykerdk/dk).
- **Autonomous Health.** The open-science architecture, state, notes and mirrored contract describe an AI health system integrated with each person's UID, Dk Personal, personal Dknowledge and devices, investigating patterns with sufficient probability for multifactor detection, with professional review alongside AI diagnosis and monitoring (draykerdk/open-science).
- **Supersystem.** The glossary, the Docs tagline, the partnership, organization and economy texts, the `.com` hero, the structured data, the home title and `llms.txt` define Drayker as a supersystem rather than an institution, effort or initiative.
- **Member councils.** The Advices notes follow draykerdk/advices: a council is formed for each question, composed by Dknowledge and also convened by Dk when its certainty is low.
- Regenerated both prerender trees and the `.com` mirror.

### Dzweck as a member level — branch `docs/dzweck-level-oct-2026`

- The Dzweck glossary entry describes a member level, not a position: the member chooses the difficult, sets aside what they are not (individualism, reactivity, apathy) to create their own values, and answers for a mission that can be handed on. Source: the change of 06/10/2026 and the book.
- Regenerated both prerender trees and the `.com` mirror.

### DAF as a primitive PAP — branch `docs/daf-primitive-pap-oct-2026`

- The DAF project role, the organization unit, the glossary entry and the mirrored contract say that DAF is our way of implementing, now, a basic and primitive notion of what PAP will be, and of testing its dynamics as the very way Drayker is built (draykerdk/daf, draykerdk/pap, `.github/GOVERNANCE.md`).
- **The name is Distributed Autonomous Federation**, distributed like Dk, in the ecosystem card, the organization unit, the docs entry and the glossary.
- Regenerated both prerender trees and the `.com` mirror.

### Autonomous units — branch `docs/autonomous-units-oct-2026`

- **DAF defined by what it federates.** The ecosystem card, the organization unit, the docs entry, the relations line and the glossary describe DAF as an autonomous, distributed federation of autonomous units: the groups and organizations of people working on different questions and projects in Drayker.
- **"DAOs & DACs" is no longer the name of the units.** The organization unit, the glossary entry and the federation track say "autonomous units". A DAO can be one, but it is not the default form. The mirrored DAF contract follows draykerdk/daf.
- Regenerated both prerender trees and the `.com` mirror.

### Portal residuals — branch `docs/portal-residuals-oct-2026`

From a full reading of the manifesto, economy, organization and partnership content against the current documentation:

- **Financing and the reward.** The economy summary no longer says money "buys no position", and the partnership page says that financing the network earns the reward, never a financial return.
- **No open-code label left.** "Everything produced stays public" and "owned by nobody" are replaced: the documentation is public under CC BY 4.0, the system is auditable by permission level, and the parts belong to the members.
- **Principle 08.** "Embodied human sovereignty… mortal human beings" becomes "Human sovereignty… the human members", matching the manifesto.
- **Member councils.** The organization unit, the Docs gaps, the partnership outcomes and the Advices page follow draykerdk/advices: councils are formed for each question and composed by Dknowledge.
- **Successor.** "DAF and its councils" becomes the DAF first, then PAP and the members' constitution, with member councils, as in `.github/GOVERNANCE.md`.
- **Weight in member choices.** "Voting power" and "vote/seats" no longer describe Dktron or the economy simulation.
- Regenerated both prerender trees and the `.com` mirror.

### Financing and the common floor — branch `docs/financing-floor-oct-2026`

- **Financing the network earns the reward.** The manifesto, the economy cards, the token answer, the reputation entry and the mirrored UID and value-unit contracts say that the reward, the one transferable kind of reputation, is earned by contributing capacity or by financing the network, and can give faster or priority access to resources. Money still cannot buy member status, the reputation of work or weight in member choices (draykerdk/uid#10, draykerdk/value-unit#5).
- **The common floor is for approved members.** The Distributed Support glossary entry, the merit-prize card and the mirrored contract say that approval has requirements of integration and collaboration, replacing "unconditional baseline access" (draykerdk/distributed-support#8).
- Regenerated both prerender trees and the `.com` mirror.

### UID as the primary application — branch `docs/uid-primary-app`

- The UID glossary entry adds that UID is the primary application, the base of the super app in which DkApps run, as in the Direction and draykerdk/uid.

### No open code, and Autonomous Health on the project page — branch `docs/no-open-code-health`

- **"Open source" is no longer a Drayker label.** The banner, the footer and the partner limits say the documentation is public under CC BY 4.0 and that the system itself is auditable by permission level, through Dknowledge and DFM, as the Dk ethical code states. The code of the sites stays public.
- **Open Science page:** Autonomous Health is described as the AI health system integrated with UID and Dk Personal, matching draykerdk/open-science#3.

### Original design restored — branch `docs/sweep-fixes-oct-2026`

- **Autonomous Health** is an AI health system integrated with UID and Dk Personal; "clinical autonomy of any kind" no longer appears as non-scope (draykerdk/open-science#3).
- **The reward** for contributing capacity is a transferable kind of reputation that gives faster or priority access to resources (draykerdk/distributed-support#7, draykerdk/uid#8).
- **Stations** are Drayker properties anywhere in the world, like offices for study, research and work; autonomous zones include housing (draykerdk/stations#8).
- **Academy:** Dk as teacher, learning in practice with project colleagues; the imported pedagogy label is replaced (draykerdk/dk-academy#5).
- Mirrored contracts updated; both prerender trees and the `.com` mirror regenerated.

### UID personhood and Dzweck purpose — branch `docs/uid-dzweck-oct-2026`

- **UID rests on biometric personhood.** The UID glossary entry and its mirrored contract now say that only UID holders access the system and that personhood is established by multi-factor biometrics, certified by people at enrolment and verified continuously; the data belongs to the member and is not kept in a central database. The leftover "proofs of authenticated presence" is gone. Source: `uid` README and component contract (draykerdk/uid#7).
- **Support and stations contracts mirrored.** Distributed Support excludes only biometric requirements beyond the member's UID (draykerdk/distributed-support#6). Stations no longer reads as excluding the pure autonomous zones on the high seas (draykerdk/stations#7).
- **Dzweck purpose.** The glossary adds that a Dzweck sets aside individualism while holding the position, out of a greater purpose rather than renunciation, that the position is not inherited and that whoever leaves it returns to ordinary membership.
- Regenerated both prerender trees and the `.com` mirror.

### Alignment pass — branch `docs/align-oct-2026`

- **Member councils replace the independent member judicial panel everywhere.** The Advices card, its relations, its mirrored contract, its narrative, the glossary entry, the governance card of the economy architecture and the separation-of-powers simulation now describe councils formed for each question: convened by members, with the conveners taking part, composed by Dknowledge from the best informed and the most affected, with Dk in the middle. Source: `advices` README and component contract on the same branch.
- **Dk Global decides inside the constitution.** "Members govern; Dk models" and "it does not allocate resources on its own" no longer contradict the Dk ethical code: Dk Global decides only inside the space the members' constitution gives it, and every decision stays open to representation, proposals and justified vetoes. Source: `dk` docs on the same branch.
- **Units of account instead of a token economy.** DAF phase wording follows the `daf` repository: ICP only as a probable provisional substrate for a phase that experiments with units of account.
- **Direction, phase 08.** "The great migration" is replaced by entry into the network gaining scale, as in Dknowledge `roadmap/DIRECTION.md`.
- **Weight in member choices.** "Voting weight" is replaced wherever it described the capacity economy.
- **DAF voting is transitional.** The DAF card and the federative-points entry say so explicitly: voting holds until contextual weighing, justified vetoes and member councils, the mechanisms of version 1.0, can be reproduced and tested. Source: `daf` README and DAF-000.
- Regenerated both prerender trees and the `.com` mirror. render-check, prerender-check (.org and .com) pass.

### Previous sync (2026-09-25T00:00:00Z)

### Alignment pass — branch `alinhamento/livro-2.7.1`

- **Direction states 2033 as the objective.** The page is now "Drayker, toward 2033": each phase keeps its exit condition, and 2033 is the goal they are measured against, not a schedule. Source: Dknowledge `roadmap/DIRECTION.md` on the same alignment branch. Phase 07 names Meta DFM integrated in Dk 1.0; phase 08 names the great migration.
- **DAF wording in the manifesto and method.** The DAF is described as the transitional federation that tests shared resource rules until its useful functions move into PAP, and papers pass through councils and, during the transition, the DAF — no longer "the DAOs".
- **"Intelligence is a partner, never the master."** The principle card, the manifesto and the Dk section no longer call intelligence "the means": it decides within the space the members give it, and the purposes stay with them. Same wording in the Dk repository and its ethical code.
- Regenerated both prerender trees and the `.com` mirror. render-check, prerender-check (.org and .com) pass.

### Previous sync (2026-09-09T00:00:00Z)

### Interaction and teaching review before integration

- Paired architecture labels with complete explanations and added disclosure regression checks for every component page.
- Replaced the overlapping dependency layout with a responsive three-part map preserving declared relationships.
- Added four-step worked examples for Dktron, network workloads and personal-agent consent, with action, result and boundary at each step.
- Synced the displayed component contracts with the current repository sources, including per-component review dates. Documentation-only UID, Network and Advices records no longer imply executable prototypes.
- Verified keyboard activation, mobile layout, direct section links and the volunteer flow; reset expanded state when moving to another component.
- Preserved the canonical component and generated institutional mirror. No changes to the mark engine or historical design assets.

### Editorial revision on the test branch

- Developed distinct purpose, context, mechanism and examples for all 25 component records and institutional cases.
- Aligned network tiers, UID delegation, adaptive-security research and the three Dktron accounting spheres with the revised component documentation.
- Reworked home, manifesto, method and economy prose while preserving routes, layout and contribution behaviour.
- Regenerated the institutional mirror and route metadata from the canonical component.

### Previous canonical alignment
- **The final author resolutions now reach the public portal.** The hero and manifesto state the "our own game" thesis directly; the six transversal principles now expose E.C.H., scale invariance, member agency, fiduciary relations and material rigour.
- **The constitutional frame is affirmative and still evidence-bound.** The old defensive four-card section became four foundations — member sovereignty, capacity economy, autonomous engagement and evolutionary rigour — followed by an explicit current-state notice so designed institutions are not mistaken for operating services.
- **Economic language is aligned across every rendered surface.** Dktron is an internal capacity-accounting and temporary-custody design with possible lawful fiat bridges, not an external-market currency or speculative asset. Reputation remains inspectable operational memory rather than transferable value or unreviewable authority.
- **Dzweck no longer carries a life-vow formulation.** The glossary now defines it as a position of merit and focused technical responsibility established by sustained delivery, with no monastic pledge, employment status, superiority or automatic authority.
- **The canonical component was repaired before publication.** The pending mirror had dropped the `ECON_DESIGNED` declaration; the source now passes the complete static render contract, and `.com` plus both prerender trees are regenerated from this corrected `.org` source.

### Previous sync (2026-08-17T00:00:00Z)
- **Dk's name and role are no longer collapsed.** `Distributed Kernel` remains the technical name and architectural principle. Public copy now states equally clearly that Dk is the distributed intelligence of Drayker across personal representation, local intelligence and global synthesis; the name describes how it is built, not the whole of what it is.
- **Members replace the implicit product-user model.** Drayker is described as infrastructure constituted and stewarded in common by members. The site remains honest about the founding phase: contribution is the public entry today and no operational membership process or member-rights charter is claimed yet.
- **People and agents share a functional grammar, not constitutional status.** The `same terms` / `identical terms` language was removed. Agents may carry delegated functions and Dk performs material contextual synthesis; members remain the constitutional subjects, and consequential decisions require accountable authorization and review.
- **DAF is explicitly transitional.** The organization page, ecosystem, project record and economy no longer present DAF as the designed final successor. It is a provisional scaffold for auditable cooperation while PAP, councils and member governance are specified and proven.
- **PAP and Dknowledge moved to their systemic roles.** PAP is the environment where an intention gains a body and becomes a durable project or application, and where DAF's functions are meant to distribute and dissolve as the platform matures. Dknowledge is the multiscale memory and operational ontology of entities, projects, decisions, capacities and relations, preserving provenance and contextual permissions rather than equating auditability with total exposure.
- **The economy is framed as common capacity.** Internal capacity is allocated in context rather than bought; money and markets belong to the external interface. Reputation is multidimensional operational memory, distinct from value and never a measure of human worth. Dk performs explainable synthesis without becoming sovereign; accountable member institutions authorize consequential allocations and Dknowledge preserves the reasoning and results.
- **Systemic safeguards now bound the economy of capacity.** Synthesis alone does not authorize an action: constitutional constraints, security, permissions, integrity, reserves and risk can limit, postpone, compartmentalize or block what Dk proposes, on the manifesto, the economy page and the organization page.
- **The response circuit is explicit.** Decisions do not end the loop: effects, refusals and consequences return through the members' personal Dks as new evidence for local and global synthesis. A single refusal is context, never a universal individual veto; a well-founded pattern of refusals can justify review, and a decision can be maintained, adapted, given exceptions, suspended or reversed.
- **Security is framed as a property of normal decisions.** Security conditions access, execution, commitment and escalation — not only attacks. Legitimate criticism is not infiltration, internal error is not sabotage, independent audit stays possible, and extraordinary measures leave memory for later review. The organization page gained a Security and governance section.
- **The reputation level was consolidated.** The portal and the Dknowledge canonical paper agree: a general level may summarize integration; the multidimensional trajectory remains the real source.
- **Dktron is no longer confused with reputation or a generic token.** It is the proposed stable representation of resources available to Drayker and distributed among project and category funds. Projects decide spending within their authority; proposed Drayker bridges connect external exchange. Stable value is an architectural requirement that still needs specification and evidence, not a current guarantee. Residual economic language — value units, transferable and non-transferable reputation kinds, VME — was removed from the Direction phases and glossary.
- **Distributed Support now covers the whole support architecture.** It joins member, project and community capacity to the physical and virtual network substrate, Dk Personal, PAP, Dknowledge and the economy of capacity. It is no longer described as only the hardware under a network.
- **Dk Personal is the continuous representation of one member**, with the response circuit in its record and contract mirror. Residual "assistant that belongs to the person" framing was removed from the project record, the contract mirror and the case copy.
- **Dk Academy and Stations publish their current formulations.** The Academy is formation as integration and capacity — participating in the educational system already counts as integration, and education is one of the main paths through which a new member builds trust. Stations, centres and embassies are physical presence, support and local context for the ecosystem.
- **The organizational horizon is explicit.** Drayker is described as a proposed member-constituted transnational superorganization — not a territorial state — with identity, infrastructure, internal allocation, physical presence and external relations. DAF remains a transitional scaffold rather than the final constitution.
- **The two domains now have distinct front doors.** `.com` leads with the civilizational thesis and institutional architecture; `.org` leads with participation and the path from contribution toward constitution.
- **Dependent public surfaces were synchronized.** Dk, DAF, Dknowledge, Dk Personal, PAP, DFMP, Value Unit, Distributed Support, the organization profile/governance and General Forum now carry the same boundaries. The Forum's retired `dknowledger.drayker.org` link and `Dknowledger` public label were corrected to `dknowledge.drayker.org` and `Dknowledge`.

### Previous sync (2026-08-11T16:05:00Z)
- **The DAF gap moved, and every page that named it was corrected.** `draykerdk/daf` published `dafp/daf-000` (the constitution, independent of platform) and `dafp/daf-001` (Phase 0, running on a repository), plus the `federation/` record. The point mechanics and the voting procedure are no longer unspecified. They are drafts. Eight surfaces asserted the old gap and now state the new one: the Economy page, the ecosystem card, the DAF project page (`state`, `arch`, `contribute`), the component-contract mirror (`scope`, `nonScope`, `levelScope`, `evidence`, `risks`), the `Named and still to come` list, the `Federative points` status chip, the `daf`, `daodac` and `points` vocabulary entries, and the value-unit overlap note.
- **The distinction the pages now hold** is three states, not two: specified (the rules exist as drafts), structured (`federation/` exists, empty), operational (nothing. No unit recorded, no point issued, no assembly held, no contract deployed). The component contract remains `implementation: none`, which is the correct reading.
- **ICP is recorded as the stated direction** for the phase after a repository, without a date and without a deployment claim. The condition that would trigger the move is what remains undecided, and the pages say that rather than implying a schedule.
- **Board rows follow the real issues:** `daf#1` closed as delivered. `daf#2` (run the first assembly), `daf#3` (design the ICP migration) and `daf#4` (Português README) opened in its place, so the project keeps a claimable path instead of a declared gap with nothing to claim.

### Previous sync (2026-08-11T12:21:36Z)
- **Public topology reconciled:** the portal model, validation and committed snapshot now agree on 25 public component repositories. The snapshot contains the current 23 open issues and rejects any `/pull/` URL so a pull request can never appear as an open function.
- **Snapshot collection made deterministic:** the workflow reads each public repository's issues endpoint and filters objects carrying `pull_request`. It keeps the protected-branch PR and contract check instead of granting GitHub Actions a broad ruleset bypass.
- **Public naming repaired in repository guidance:** the public surface is Dknowledge. Dknowledger means the private local vault. `README.md` no longer presents the private name as the public product.
- **Source ownership clarified:** `index.html` is the current component and route source. The package files under `design/` remain preserved provenance and visual baselines, rather than a second editable copy that silently drifts from production.
- **Cross-repository audit:** the 25 public READMEs were reread through GitHub before these corrections. The eight components that were previously only concepts now have repositories, public charters, contracts, documentation domains and first open functions. Their portal records already reflect that published material.

### Previous sync (2026-08-11T04:15:00Z)
- **The thesis the site argues was rewritten to Drayker's own.** The home no longer opens on intelligence concentration. It opens on the arrangement Drayker is designing. People go on creating, discovering and learning while machines carry the rest, with the resources that result reaching the work that produced them under readable incentives. `Why now` was rebuilt around latent human capacity and the conditions of organization and action, with the A.I. moment supporting the urgency rather than leading the argument. New hero copy on both domains and matching `ROUTE_META` for home and manifesto.
- **The chain the system is arranged around** is now stated on the home, under the four layers: `problem -> model -> functions -> project -> application -> value -> learning -> evolution`, with the note that the method covers the first three links and the organization and its economy are how the last four are meant to return to the people who did the work.
- **Manifesto rebuilt in three movements**, potential, moment, design, plus two new sections: `IN THE FIRST PERSON`, the only place on the site written in a human voice, and `What this is not` (not a company, not a crypto project, not a job, not a finished system), which answers what a stranger actually asks first.
- **New page: Economy & reputation** (`/economy/`, both domains, in both menus). Four sections: the chain from delivered work to access to resources with each link marked running or designed, reputation as the mechanism, the token question answered directly, a value unit would be a primitive expression of the reputation points and today nothing is issued, priced or for sale, the transition between what runs and what is only designed, and the four open questions the layer needs answered. Five explicit limits: not income, not an investment, no currency exists, not automated, not private. No figure, price, rate or payout appears anywhere on it, and `render-check` now fails if one ever does.
- **Four declared concepts added** (20 parts -> 24): Projects & Applications, Dk Personal, Dk Academy, Stations & embassies. Same treatment as the existing no-repository concepts. Plain sentence, vision, problem, what is open, architecture notes, `.com` case, declared dependencies, position in the reading trail and `NO REPOSITORY YET`.
- **Absence language reclassified as invitation.** Where Drayker holds internal material that has not been published, pages now say `not published yet` instead of implying nobody ever wrote it. Where nothing exists anywhere, they still say so. Docs gained an `UNPUBLISHED, NOT ABSENT` card, and the standing label for a part with no document changed from `NOT WRITTEN YET` to `NOT PUBLISHED YET`.
- **Naming corrected:** `MetaDFMP` is `Meta DFM` everywhere in the copy (the repository and subdomain keep the `metadfmp` slug by inheritance, and the page says so). DFM expands to **Distributed Functional Modeling**. The public knowledge base is **Dknowledge**, and the private local vault keeps the name Dknowledger. The Pages domain of `draykerdk/dknowledge` was moved to `dknowledge.drayker.org` on 2026-08-11. The retired `dknowledger.drayker.org` no longer resolves, and every reference to it across the sites, the knowledge repository and its own contract was repointed.
- **Dead code removed:** the retired Knowledge page markup, the `KN_NODES` / `KN_EDGES` / `KN_TRUST` / `KN_TODAY` tables and their state (154 lines) came out of the component. The page lives on its own site. Nothing unreachable was left behind.
- **Bug fixed:** the manifesto lead paragraph was hard-coded to `#D2D0D8` and was nearly invisible in the light theme. It now uses `var(--tx)`.
- Static regression: `render-check` covers the seven concepts, the economy page model, the removal of the retired page, and the guardrails against a published amount, rate or payout. Prerender validation now covers 38 `.org` and 32 `.com` canonical routes plus the two compatibility redirects on each domain.

### Previously in this project (2026-08-10T12:55:41Z)
- **Dknowledger consolidated into one official surface:** `dknowledge.drayker.org` is now the canonical public home for its orientation, knowledge model, papers, roadmap, repository catalog and contribution path. The duplicate Knowledge route has been removed from both main-site menus and sitemaps. The footer and the didactic system map link to the official surface, every Dknowledger project card opens it directly, and the old `/knowledge/`, `/project/dknowledge/` and hash URLs remain compatibility redirects.
- Package 3.4.1 is published on the official `master` branches: `drayker.org` (`9ec7efd`), `drayker.com` (`22ec959`), Dknowledger (`aa1f5bf`) and the shared documentation theme (`59e22fb`). Production routes, icons, redirects and Pages builds were verified after publication.
- Pulled the deployed component changes back into `design/Drayker v3.dc.html` before prerendering. The published `index.html` additionally carries the generated root document block. Both sources retain the same component, favicon set and launch-state wording.
- **The system on one screen** (both homes): the twenty parts, the seventeen repositories plus the three no-repository concepts, placed in their four layers. Each card carries the standing its own contract declares and opens the part's page, the case page on `.com`, the technical page on `.org`. Built from `CASE_LAYERS` / `CASE_LAYER_OF`, so the map cannot drift from the layer argument above it.
- **What blocks what** (`.org` home): pick any part and the page computes, from the dependencies declared in the contracts, which upstream parts are not running yet. Each shows the gap its own page states, with a click through to it. Chains are bounded to three hops and a part is never its own blocker. When nothing upstream blocks it, the page says the missing work is inside it.
- **Vocabulary** (Docs, both sites): eighteen terms. DFM, DFMP, Dk, BSDK, LCrypt, UID, OSDK, DAF, DAO/DAC, federative points, councils, value unit, open function, component contract, Dknowledger and the rest. Each defined from what the repositories actually say, and each stating where the specification is still missing. Linked from the layers section on both homes.
- **One real issue, walked through the live flow** (DFM page): the six GitHub steps bound to an actual open issue from `org:draykerdk` (preferring the `open-function` label), with its repository, number, branch name and pull-request base spelled out. Honest fallbacks when the API is unreachable or nothing is open. No invented issue.
- **Historical package note:** package 3.4.1 originally introduced a duplicate Dknowledger overview inside both main sites. That route has now been retired in favor of the complete repository-backed surface at `dknowledge.drayker.org`.
- The page's inventory is the repository as actually read: the 17 contracts, `CURRENT.md`, the papers index, the **sixteen papers that are titles only** (dk 8 · ecosystem 7 · organization 1, files of 7–130 bytes), the historical roadmap and the PT/ES translations that trail English. Filterable by trust level, each row linking to the real file. The empty ones are presented as the opening.
- `DKNOWLEDGE-DESIGN.md` added for the agent doing the internal static work: an opening instruction to read Drayker's own extensive internal material first and let it override the proposed model where it is richer (keeping page and repository from diverging), then the front-matter node schema, trust computed as a pure function of evidence, `tools/build-graph.js` emitting `data/graph.json` · `trust.json` · `openings.json` committed by an Action, CI validation rules, implementation order, and what stays out of scope.
- **Layers back to four, with the real definitions**: 01 DFM as one method in its versions (organization, engineering, architecture, A.I. agents) · 02 Dk as the whole technological system (kernel, base structure, network, cryptography, identity, intelligence, devices) · 03 organization and resources held distributed, transparent and intelligent · 04 **transition and emergence**, what is actually being built with available resources. The DAF, the organization running on GitHub, the public sites and knowledge base, on the way to an evolutionary platform of its own. The short-lived identity/network/what-it-serves split was folded back in. `CASE_LAYERS` and `CASE_LAYER_OF` now carry these four ids and the twenty parts distribute across them (7 method-and-system reads unchanged elsewhere).
- The layers section now states the thesis before the list: Drayker as a **collective intelligence integrated with artificial intelligence**. People, teams and agents deliver inside one structure, neither supervising the other, with the four layers presented as what that requires. The method card says a person and an agent claim a function on identical terms.
- `.org` hero title rewritten: "Nobody hands out the work. You take the piece you can finish." The old line described the problem's size instead of the invitation.
- **SEO per route**: `ROUTE_META` and `setMeta()` keep title, description, canonical and Open Graph metadata aligned with each current route. The nineteen main-site component routes are documents in their own right. Dknowledger is canonical only on its subdomain. Verified on `#org/project/uid` and `#org/project/valueunit`.
- **`tools/prerender.js`** (published, no dependencies): emits one real HTML document per current route and compatibility redirect documents for `./knowledge/` and `./project/dknowledge/`. Canonicals, noscript links and sitemap use clean URLs without fragments. Generated blocks are idempotent. `tools/prerender-check.js` verifies metadata, redirects and every favicon path.
- **`.github/workflows/org-snapshot.yml`**: nightly `gh api` + `jq` job builds `data/org.json` (17 public component repositories, open issues and contributors) in the exact shape the component consumes. It updates a reviewable automation branch/PR instead of trying to bypass protected `master`. `loadGH()` uses root-absolute data on `.org` and the canonical `.org` snapshot on `.com`, so clean subroutes do not 404.
- **`INFRA-HANDOFF.md`** documents both, with the publish order and the only deliberately omitted SEO enhancement: a distinct `og:image` for every route.
- Static regression covers the four-layer map, route metadata, canonical Dknowledger handoffs and both snapshot origins. Prerender validation covers 33 `.org` and 27 `.com` canonical routes plus two compatibility redirects on each domain. The dedicated Dknowledger repository adds its own generated source catalog and site contract tests.
- **Published and verified**: package 3.4.1 is live on both domains, the `.com` default is institutional, clean routes are materialized, and the public organization snapshot is available. A final runtime SEO pass keeps canonical and `og:url` on those clean routes after JavaScript mounts instead of reverting them to hash URLs.

### Previously in this project (2026-08-10T11:23Z)
- Integrated the package 3.0 Design Component as the published `index.html` and preserved the identical v3 source under `design/`. The React/Vinext approximation is not used.
- Reconciled launch-state copy with the live deployment: `drayker.com` is canonical and indexable, while DAF, its contract, federative points and voting remain explicitly proposed rather than operational.
- Removed the obsolete repository-local volunteer form so introductions and partnership proposals have one public intake in `general-forum`. Aligned the local open-function review field with the founding-phase Git flow.
- Updated the generator metadata, project instructions and static regression suite for Archivo, twenty `.com` cases, technical deep links, honest offline states and both real issue forms.
- **drayker.com now has its own component pages** at `#com/project/<key>`. The case for each of the 20 parts, written for a reader deciding whether the idea is worth anything: `HOW IT WORKS TODAY` vs `WHAT THIS CHANGES`, `WHERE YOU WOULD NOTICE IT`, `WHY THE REST DEPENDS ON IT`, which of the four layers (plus public surface) it belongs to and why that layer exists, and `IT NEEDS` / `WHAT NEEDS IT` chips that open sibling `.com` pages. New `PITCH`, `CASE_LAYERS`, `CASE_LAYER_OF` and `CASE_STANDING` tables. No vision, architecture, contract or issue text is duplicated from the portal.
- Standing on the `.com` page is derived from the published contract level, never hand-written: `WRITTEN, NOT BUILT` / `RUNNING TODAY`, and `NOT WRITTEN YET` for the three parts with no repository.
- **Deep links instead of duplication**: `THE TECHNICAL RECORD` on each `.com` page opens the exact section of the portal page, `#org/project/<key>/arch`, `/open`, `/map`, `/contract` (contract card omitted for the three concepts). The portal sections carry `data-focus` anchors and the router scrolls to them with a header offset. Ecosystem cards on `.com` changed from `FULL PAGE ON DRAYKER.ORG` to `What it changes →`.
- `#org/project/<key>` and every other README route are unchanged. `.com` and `.org` now resolve the same key to different questions.
### Previously in this project (2026-08-10T07:06Z)
- Component pages restructured into three explicit tiers a reader can fold: **01 IN ONE SENTENCE** (a new jargon-free sentence written for all 20 parts), **02 WHY IT EXISTS** (vision, problem, role, relations, what is open, sources, neighbourhood map) and **03 THE ARCHITECTURE** (component contract, architecture, open issues). Tier 01 is always open. Tiers 02 and 03 toggle from a rail at the top that also shows the reading-trail position.
- **WHERE IT SITS**: a per-page neighbourhood map. The component at the centre, what it needs on the left, what needs it on the right, computed from the declared dependencies (and from a small `CONCEPT_DEPS` table for the three parts with no contract), every node clickable. Components with no declared dependency in either direction say so.
- **ARCHITECTURE became didactic**: each of the 79 architecture labels now expands to an explanation of what it means and why it is there (`ARCH_NOTES`, index-aligned per component). Labels alone taught nothing.
- **Reading trail** across all twenty pages (`TRAIL`): method → what it is used to design → how it would be governed → public surfaces, with step position, previous/next cards and an explicit way to leave the trail.
- Home rewritten to carry the thesis instead of a slogan. `.com` hero: "Intelligence stops being the bottleneck. Organization becomes it." (kicker: FOR THE AGE OF SUPERINTELLIGENCE), with a body that names the concentration problem directly. `.org` hero keeps the concrete invitation and gains the same premise in one sentence.
- New **WHY NOW** section on both homes: machine intelligence as the productive force of the century, the historical pattern of every leap being absorbed and concentrated by existing organizations, and the alternative. Work anyone can finish, decisions anyone can audit, resources following delivery, with intelligence integrated symbiotically into life and work rather than sitting above them, amplifying latent human capacity. Closes by naming the distance between what is written and what runs.
- Three layers → **four layers**: DFM (method) · Dk (kernel) · Organization & resources (federation, weight from delivered work, value unit) · Ecosystem. Resource distribution is now a pillar of the front door instead of a footnote in the proof strip. Kernel and ecosystem card copy rewritten off jargon lists.
- Manifesto gained the era paragraph. The Dk page hero states the substrate is meant to be inhabited, not operated.
- New organization-wide structure picked up from GitHub: every repository now publishes a **public component contract** at `.drayker/component.yml`, validated on every pull request by the shared workflow `draykerdk/.github/.github/workflows/validate-component.yml` against `schema/component.schema.json`. All 17 contracts were read verbatim and are now the spine of every project page.
- Project pages (`#org/project/<key>`) gained a **PUBLIC COMPONENT CONTRACT** section: declared problem, IN SCOPE / NOT IN SCOPE, implementation level with its own scope sentence, linked evidence (document / deployment / test / usage), DEPENDS ON as chips that open the dependency's page, WHAT COULD BE MISREAD (the contract's risks), contributions entrypoint, source of truth, last-reviewed date, and a link to the contract file and the schema.
- Implementation level is rendered as evidence language, never as a maturity badge: `none` → "NO IMPLEMENTATION PUBLISHED", `operational` → "OPERATIONAL · WITHIN THE SCOPE BELOW". Five components are operational per their own contracts (drayker.org, drayker.com, drayker-theme, dknowledge, general-forum). The other twelve declare no implementation.
- The three no-repository concepts (`dsupport`, `openscience`, `valueunit`) get a **NO COMPONENT CONTRACT YET** block instead of an implied one, with the schema linked as the list of questions a first document has to answer.
- Ecosystem cards now carry the declared artifact type beside the layer (KERNEL · ARCHITECTURE, ORGANIZATION · GOVERNANCE PROPOSAL, PORTAL · PORTAL…), read from the same contracts.
- Project pages no longer depend on the GitHub API for their own repository links: repo URL, issues URL, evidence and contract links are derived from the curated key, so the page is complete with the network off.
- Volunteer CTA re-pointed at the real intake: `general-forum/issues/new?template=volunteer-introduction.yml`, prefilling that form's `interests`, `contribution` and `starting_point` fields (the dropdown option is chosen from the matched track). The old `drayker.org/volunteer.yml` form is no longer used by the site.
- Partnership CTA is wired to the real form that now exists: `general-forum/issues/new?template=partnership.yml`, prefilling `proposal` and `boundaries`. The remaining pendency from the previous sync is closed.
- Label map rewritten from `draykerdk/.github/labels.yml`: `open-function`, `motion`, `claimed`, `needs-review` (real name), `good first issue`, `help wanted`, `documentation`, `volunteer-introduction`, `partnership`, plus the `skill:` / `level:` / `effort:` families and what `effort:large` means.
- Contribution guide step 06 now states the founding-phase rule as written in `GOVERNANCE.md`: no approval count is required, and who may merge directly, with the limits, is in that file. New "The rules are files" block links CONTRIBUTING.md, GOVERNANCE.md and component.schema.json. No individual is named anywhere on the site.
- Organization page gained an `IN WRITING` card linking GOVERNANCE.md. Docs gained a `PER REPOSITORY` card explaining the component contract and pointing at the component list.

### Previously in this project
- Re-read the repository at tree `8a16ca9387f0`: `index.html` unchanged (blob `dcc154b79886`, the v3 base).
- Copy register raised across every page title. Cross-domain routing fixed so `project/<key>`, `contrib/<tab>`, `fn` and `join` survive the `.com` → `.org` handoff.
- `Drayker v3.dc.html` created from the deployed `index.html` (not from the local v2). v2 kept untouched as history. Handoff notes in `V3-HANDOFF.md`.
- Typography moved to Archivo (400/500/600/700). JetBrains Mono still only on technical labels. Mark, colours, grid, cards and animations untouched.
- New institutional route `#com/partnerships`. `.org` links cross to it instead of duplicating it.
- DFM page split into the five-move method and "Today, on GitHub" (issue → claim → branch → pull request to master → checks → merge). `community-review` removed site-wide.
- Claims contextualised across the site and the stage disclaimer added after the vision on both homes and on the partnerships page.
- Volunteer flow ends in a review card plus "Review my introduction on GitHub". No email asked.
- The ten fictional `FN-01xx` rows were deleted from markup and data model. The board shows loading / unreachable / nothing-published / no-match states.
- Project pages gained ROLE IN THE SYSTEM, RELATIONS and PUBLIC SOURCES for all 17 repositories and the 3 no-repository concepts.
- Organization rewritten around the founding phase. Docs rewritten around Dknowledger, split into current / historical / not written yet.
- Management status removed from the public layer (badges, status dots, NOW/NEXT/DONE/LATER rails) in markup *and* data model. Declared gaps kept as prose under `WHAT IS OPEN`.
- Guided volunteer journey, personalised org map over the 17 repos, curated GitHub fallback cached 30 min, hash routes for the README link contract, real board label `open-function`.

## Sync history
### 2026-08-10T02:26:12Z
- v3 created from production `index.html`. Archivo typography. `#com/partnerships`. DFM split. Volunteer flow rewritten. Fictional board rows removed. ROLE / RELATIONS / PUBLIC SOURCES added to project pages.

### 2026-08-05T09:46:26Z
- Copy pass across all pages: tightened hero, manifesto, DFM, Dk, ecosystem, organization descriptions against original READMEs.

### 2026-08-05T02:54:16Z
- Built the full Drayker site as a single Design Component (`Drayker.dc.html`), covering drayker.com and drayker.org from one visual system with a .com/.org switch.
- Content grounded in the drayker.org and dfmp READMEs plus the public docs subdomains (bsdk, dknetwork, lc, dfmp).

## Screen map
| Screen | Built from |
| --- | --- |
| Partnerships (.com) | curated. Funding and partnership brief, no repo source |
| Home (.com / .org) | Canonical hero copy, public component READMEs and current organization governance |
| Manifesto | Canonical explanatory copy, DFMP principles and current organization governance |
| DFM Protocol | draykerdk/dfmp README.md, dfmpp/README.md |
| Dk | drayker.com/dk, bsdk.drayker.org, lc.drayker.org, dknetwork.drayker.org |
| Ecosystem | draykerdk repo list (bsdk, daf, uid, metadfmp, emergence-initiative) |
| Organization | drayker.org README.md (DFMP + DAF), draykerdk/daf |
| Contribute · Overview | GitHub API: orgs/draykerdk repos, contributors |
| Contribute · Tracks | curated. Volunteer tracks, not repo-derived |
| Interactive examples | Public Value Unit, Dk Network and Dk Personal documentation; selectable stages explaining action, result and boundary |
| Component relationship map | Current component-contract dependencies, grouped responsively with keyboard-accessible links |
| Contribute · Projects | READMEs and component contracts of all 25 public component repositories + live GitHub API repo data |
| Contribute · Open functions | Per-repository GitHub issues endpoints, with pull-request objects rejected explicitly |
| Contribute · Guide | draykerdk/.github CONTRIBUTING.md + GOVERNANCE.md + labels.yml |
| Contribute · Join (wizard + map) | curated. Questionnaire logic and track match, mapped onto the 25 public component repositories |
| Docs | doc subdomains + github.com/draykerdk + .drayker/component.yml |
| Dknowledge (public knowledge layer) | draykerdk/dknowledge README.md · CURRENT.md · generated `data/catalog.json` · papers/ and roadmap/ trees · .drayker/component.yml · dedicated `dknowledge.drayker.org` surface |
| Component page · the case (.com) | curated. Practical case per part, derived from the same contracts and READMEs, no repo copy duplicated |
| Project page · contract block | `.drayker/component.yml` of each of the 25 repositories (schema in draykerdk/.github) |
| Volunteer intake CTA | general-forum/.github/ISSUE_TEMPLATE/volunteer-introduction.yml |
| Partnership CTA | general-forum/.github/ISSUE_TEMPLATE/partnership.yml |
