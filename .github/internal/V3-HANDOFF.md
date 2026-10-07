# Drayker v3. Entrega de design

Arquivo: **`Drayker v3.dc.html`**. Base: `index.html` de produção (`draykerdk/drayker.org@master`,
lido em 2026-08-10), não a v2 local. `Drayker v2.dc.html` fica intacto como histórico.

O arquivo continua sendo um Design Component único, estático, sem framework, com o `<head>`
de produção preservado. Pode virar `index.html` direto, e `tools/make-com.js` continua
funcionando (a linha `const SITE = 'org';` e o bloco de `<head>` não mudaram de forma).

---

## 1. Mapa de telas e navegação

Rotas por hash, formato `#<site>/<page>`. Todas as rotas antigas continuam vivas.

| Rota | Tela | Site |
| --- | --- | --- |
| `#com/home` · `#org/home` | Home (duas versões) | ambos |
| `#com/manifesto` · `#org/manifesto` | Manifesto | ambos |
| `#com/dfm` · `#org/dfm` | DFM Protocol | ambos |
| `#com/dk` · `#org/dk` | Dk | ambos |
| `#com/eco` · `#org/eco` | Ecosystem | ambos |
| `#com/org` · `#org/org` | Organization | ambos |
| `#com/docs` · `#org/docs` | Docs & papers | ambos |
| **`#com/partnerships`** | **Funding & partnership (nova)** | só `.com` |
| `#org/contrib/<tab>` | Contribute · overview, tracks, projects, fn, guide | só `.org` |
| `#org/fn` | Open functions (atalho) | só `.org` |
| `#org/project/<key>` | Registro técnico do projeto/conceito | `.org` |
| `#com/project/<key>` | Caso institucional do mesmo componente/conceito | `.com` |
| `#org/join` | Volunteer (questionário → resultado → introdução) | só `.org` |

Regras de travessia entre domínios:

- No `.com`, rotas de participação (`fn`, `contrib`, `join`) mandam para o `.org`. `project/<key>`
  abre o caso institucional local e os links técnicos profundos atravessam para a seção exata no `.org`.
- No `.org`, `partnerships` manda para o `.com`. Toda menção a financiamento no `.org`
  (rodapé, cards) usa `goPartnerships`, que atravessa.
- Fora dos domínios reais (documento de design, localhost, staging) a troca `.com`/`.org`
  acontece na própria página, sem navegar. Em `drayker.com`/`drayker.org` o comportamento
  de produção é idêntico ao da v2.

Navegação `.com`: Manifesto · Dk · DFM · Ecosystem · Organization · **Partnerships** · Docs.
Navegação `.org`: inalterada.

---

## 2. Mudanças em relação à v2 (produção)

**Tipografia.** Space Grotesk → **Archivo** (400/500/600/700), conforme `CLAUDE.md` e
`DRAYKER-MARK.md`. JetBrains Mono segue só em rótulo técnico. Nenhuma cor, borda, grid,
card ou peça de marca foi alterada. O logo 3D, a física do anel e as animações estão intactos.

**Home `.com`.** Bloco “Three layers” ganhou uma frase-ponte que lê DFM → Dk → Ecossistema
como uma sentença só. Depois da arquitetura entra a seção **“Where this stands today”** com o
aviso obrigatório na íntegra. O fecho virou dois caminhos explícitos: *Support the research*
(→ `#com/partnerships`) e *Work on it* (→ `.org`). Faixa de prova: “Resources governed by the
DAF” reescrito.

**Home `.org`.** Título e corpo trocados por entrada concreta (repositórios, papers, lacunas,
issues) e a promessa foi retirada. Diz explicitamente que depende do que está no board.
CTA principal: **“Find where to contribute”**.

**DFM.** Separado em dois: “The method · five moves” (paradigma, com aviso de que conselhos e
status de validação são projeto) e a nova seção **“Today, on GitHub”** com o fluxo real:
`Issue → claim → branch → pull request to master → checks and discussion → merge`.
`community-review` foi eliminado do site inteiro (guia, tracks, labels, questionário, diagrama).

**Dk.** As três escalas ficaram. Ganharam um bloco **“What all three depend on”**
(BSDK · UID · LCrypt · Dk Network · DFM) e a ressalva de que nem as escalas nem três das
cinco dependências existem. “Parallel internet” e “super app” reescritos em todo o site.

**Ecosystem / páginas de projeto.** Cada página agora traz, além de visão, problema, o que está
aberto, arquitetura e como contribuir: **ROLE IN THE SYSTEM**, **RELATIONS** e **PUBLIC SOURCES**
(repo, subdomínio, issues). Tabela `ROLES` cobre os 17 repositórios e os 3 conceitos.
`dsupport`, `openscience` e `valueunit` continuam com `NO REPOSITORY YET`.

**Organization.** “Governance without an owner” → **“Governance built to become distributed.”**
Nova seção “A founding phase, said plainly”: administração transitória, Git como registro,
DAF e conselhos como sucessor projetado. “Start your own DAO” → “Linking an autonomous unit ·
how it is meant to work”, com a mecânica marcada como não especificada. Nenhum nome próprio.

**Docs.** “Everything is written down” → **“Read it with the date attached.”** Dknowledge
apresentado como base pública global e o material separado em **CURRENT / HISTORICAL /
NOT WRITTEN YET**. Roadmaps antigos deixam de ser compromisso.

**Volunteer.** O formulário que não enviava nada saiu. No lugar: um cartão de revisão com
track, track secundário, disponibilidade, projetos e primeiros passos, mais nota opcional.
e o CTA **“Review my introduction on GitHub”**, que abre uma issue pública pré-preenchida.
Não pede e-mail nem handle.

**Board de open functions.** As dez linhas fictícias (`FN-0142`…) foram **removidas do markup e
do modelo de dados**. No lugar entram estados honestos.

---

## 3. Estados de interface preparados

| Estado | Onde | O que aparece |
| --- | --- | --- |
| GitHub carregando | Contribute (overview, projects, fn) | `SYNCING WITH GITHUB.COM/DRAYKERDK…`. No board, “Reading the board from GitHub…” |
| GitHub indisponível | idem | `GITHUB UNREACHABLE · SHOWING CURATED CONTENT`. No board, bloco explicando que nada é inventado no lugar |
| Nenhuma open function publicada | `#org/fn` | “No open function is published right now” + saída para as lacunas dos projetos |
| Filtro sem resultado | `#org/fn` | “Nothing matches this filter” |
| Projeto sem issues | `#org/project/<key>` | “No open issue is listed for this repository right now” |
| Conceito sem repositório | `dsupport`, `openscience`, `valueunit` | `NO REPOSITORY YET` + fontes públicas: nenhuma |
| Rota de projeto inexistente | `#org/project/qualquer` | `NO PAGE FOR THIS KEY` + volta para a lista |
| Introdução de voluntário pronta | `#org/join` (resultado) | resumo + `OPENED ON GITHUB` com link de recuperação |
| Proposta de parceria pronta | `#com/partnerships` | prévia do conteúdo da issue + `OPENED ON GITHUB` |

---

## 3.1 Camada de contrato de componente (nova, 2026-08-10)

Toda página de projeto passou a mostrar o **contrato público** que o repositório declara em
`.drayker/component.yml`. Lido verbatim dos 17 repositórios e validado na organização pelo
workflow `draykerdk/.github/.github/workflows/validate-component.yml` contra
`schema/component.schema.json`.

O bloco `PUBLIC COMPONENT CONTRACT` traz, na ordem: tipo de artefato, problema declarado,
`IN SCOPE` / `NOT IN SCOPE`, nível de implementação com a frase de escopo do próprio contrato,
evidências linkadas (`document` / `deployment` / `test` / `usage`), `DEPENDS ON` como chips que
abrem a página da dependência, `WHAT COULD BE MISREAD` (os `risks` do contrato), entrada de
contribuição, fonte de verdade, data de revisão e link para o arquivo e para o schema.

Nível é texto de evidência, não selo de maturidade. `none` vira "NO IMPLEMENTATION PUBLISHED"
e `operational` vira "OPERATIONAL · WITHIN THE SCOPE BELOW". Cinco componentes são
`operational` pelos próprios contratos (drayker.org, drayker.com, drayker-theme, dknowledge,
general-forum). Os outros doze declaram que não há implementação publicada. Isso **não** é selo
de gestão: é campo publicado no contrato do repositório.

Os três conceitos sem repositório recebem `NO COMPONENT CONTRACT YET` com o schema linkado,
em vez de um contrato implícito. Os cards do Ecosystem passaram a mostrar o tipo de artefato ao
lado da camada.

Correção de robustez: os links do repositório na página de projeto (repo, issues, evidências,
contrato) agora derivam da chave curada e não da API do GitHub. A página fica completa com a
rede desligada.

## 3.2 Regras da organização no site

Guia (`#org/contrib/guide`): passo 06 passou a dizer o que está escrito no `GOVERNANCE.md`.
não se exige contagem de aprovações na fase fundadora, e quem pode integrar direto, com os
limites, está naquele arquivo. Novo bloco "The rules are files" com CONTRIBUTING.md,
GOVERNANCE.md e component.schema.json. Mapa de labels reescrito a partir de `labels.yml`
(inclui `needs-review` com o nome real, `documentation`, `volunteer-introduction`,
`partnership` e as famílias `skill:` / `level:` / `effort:`). Organization ganhou card
`IN WRITING` → GOVERNANCE.md. Docs ganhou card `PER REPOSITORY` sobre o contrato.
Nenhum nome próprio entrou no site.

## 4. CTAs que precisam de URL do GitHub na integração

**Resolvido em 2026-08-10.** Os dois formulários existem no `general-forum`, cujo contrato
escopa o repositório como entrada pública de introduções de voluntário e propostas de parceria:

```js
const ISSUE_NEW = {
  volunteer:   'https://github.com/draykerdk/general-forum/issues/new', // ?template=volunteer-introduction.yml
  partnership: 'https://github.com/draykerdk/general-forum/issues/new'  // ?template=partnership.yml
};
```

- **Volunteer** preenche `interests`, `contribution` e `starting_point` (a opção do dropdown vem
  do track apurado, via `START_POINT`). O label `volunteer-introduction` é do próprio formulário.
- **Partnership** preenche `proposal` e `boundaries`. O label `partnership` é do formulário.
- O formulário local obsoleto `drayker.org/.github/ISSUE_TEMPLATE/volunteer.yml` foi removido.
  existe um único caminho público de introdução, no `general-forum`.
- **“Review my introduction on GitHub”** monta `?template=volunteer-introduction.yml` e preenche
  `interests`, `contribution` e `starting_point`.
- **“Open a partnership proposal”** monta `?template=partnership.yml` e preenche `proposal` e
  `boundaries`.
- O template local de open function foi alinhado ao fluxo real (`issue → PR to master → checks
  e discussão → merge`) e não cita mais uma branch separada de community review.

Links externos já corretos e que não precisam de decisão: `github.com/draykerdk`,
`<repo>` e `<repo>/issues` nas páginas de projeto, busca de issues da organização no board,
e os subdomínios de documentação.

---

## 5. Estado da integração

Governança organizacional, rulesets com bypass fundador, contratos de componente, schema,
workflow compartilhado, labels e formulários do `general-forum` já estão publicados na
organização. Esta entrega integra a v3 em `index.html`, gera o artefato `.com` pelo script,
executa os testes estáticos e publica ambos os domínios por GitHub Pages. DNS e páginas já
estavam ativos. Nenhum subdomínio novo é necessário para esta versão.
