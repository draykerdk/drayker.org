# Dknowledge. Base de design e sugestões de engenharia

Interlocutor: o agente que vai fazer a implementação estática interna. Este arquivo é
a ponte entre o que já está desenhado no site (`Drayker v3.dc.html`, rota
`#<site>/knowledge`) e o que falta construir no repositório `draykerdk/dknowledge`.

Nada aqui é status de gestão. Tudo é evidência: o que existe, o que está vazio, e
como um nível de confiança é **calculado** em vez de atribuído.

Dknowledge é a **memória e camada de conhecimento** do sistema, não a sua
inteligência. A divisão é deliberada: o Dk interpreta e age; o Dknowledge
conserva e relaciona aquilo que foi decidido, tentado e aprendido. Neste
repositório, "Dknowledger" nomeia o vault privado local usado para trabalhar o
material — não um cérebro, não uma camada de inteligência com função própria.

## 0. Antes de implementar: leia a área da Drayker inteira

O design desta página foi montado com o que é público e legível pelas ferramentas de
GitHub em 2026-08-10. Existe **muito mais informação** na área interna da Drayker do
que o que está aqui, e você provavelmente tem acesso a ela. Então:

1. Leia o material extenso da organização antes de escrever schema: papers longos,
   documentos de arquitetura do Dk, material do workspace privado, e tudo que
   descreva a estrutura inteligente e os níveis de confiança em detalhe.
2. **Compare com as seções 2, 3 e 5 deste arquivo.** Se a documentação extensa já
   define tipos de nó, tipos de aresta ou uma escala de confiança, a definição dela
   manda. Ajuste o schema e avise, em vez de manter a proposta daqui.
3. Onde a documentação for mais rica (ontologias, camadas pública/federada/privada,
   sensores, oráculos, processos), estenda: os seis tipos de nó são o mínimo viável,
   não um limite.
4. O que mudar precisa voltar para a página: o inventário vive em `KN_TODAY` e o
   modelo em `KN_NODES` / `KN_EDGES` / `KN_TRUST`, no componente. Página e repositório
   divergindo é o único erro grave possível aqui.
5. Se algo da documentação interna não for público, não traga o conteúdo para a
   página. Traga só a estrutura, e diga na página que a fonte é privada.

---

## 1. O que a página já afirma (e portanto o que a implementação tem de sustentar)

- Dknowledge **não é wiki**: é rede. Requisito → moções que o respondem → decisões que
  os mudaram → evidência de cada um, ligados às fontes.
- Seis tipos de nó: `REQUIREMENT`, `MOTION`, `CONTRACT`, `DECISION`, `TERM`, `RECORD`.
- Sete tipos de aresta: `answers`, `depends on`, `supersedes`, `evidenced by`,
  `defined by`, `discussed in`, `translation of`.
- Cinco níveis de confiança, marcados na página como **propostos, não especificados**:
  `T0 SOURCE`, `T1 REVIEWED`, `T2 DRAFT`, `T3 HISTORICAL`, `T4 EMPTY`.
- Inventário real de hoje, lido do repositório em 2026-08-10: contratos (17,
  `.drayker/component.yml`), `CURRENT.md`, índice de papers, **16 papers que são só
  título** (dk 8 · ecosystem 7 · organization 1, arquivos de 7 a 130 bytes), roadmap
  histórico, e traduções PT/ES atrás do inglês.

Se a implementação mudar qualquer um desses fatos, a página tem de mudar junto. O
inventário está hoje em `KN_TODAY` no componente.

---

## 2. Primeiro passo, e é pequeno: front-matter em cada arquivo

Um nó é um arquivo Markdown com front-matter YAML. Nada de banco, nada de runtime.

```yaml
---
id: dk/living-cryptography            # estável, nunca reusado
type: motion                          # requirement | motion | contract | decision | term | record
title: Living Cryptography
lang: en                              # en | pt | es
translation_of: null                  # id do nó original quando lang != en
answers: [dk/req-authentication]      # arestas
depends_on: [dk/dk-network]
supersedes: []
evidenced_by:
  - { type: document, ref: https://lc.drayker.org }
discussed_in: [https://github.com/draykerdk/living-cryptography/issues/3]
reviewed_at: null                     # data de merge após discussão pública
written_at: 2021-05-02                # data do conteúdo, não do commit
---
```

Regras que evitam dívida: `id` no plural do caminho (`<projeto>/<slug>`), sem
acentos. Front-matter obrigatório inclusive nos arquivos vazios, é exatamente o que
transforma "arquivo de 78 bytes" em nó `T4 EMPTY` rastreável.

## 3. Confiança é derivada, nunca escrita à mão

Uma função pura sobre fatos verificáveis. Sugestão de ordem de avaliação:

1. `type: contract` **ou** arquivo é fonte declarada de si mesmo → `T0`.
2. `reviewed_at` presente **e** `discussed_in` não vazio → `T1`.
3. corpo com menos de ~200 bytes úteis (fora front-matter e switcher de idioma) → `T4`.
4. `supersedes` aponta para ele, **ou** `written_at` anterior à revisão atual do
   componente correspondente (`last_reviewed` do `component.yml`) → `T3`.
5. resto → `T2`.

Duas consequências que valem: ninguém "promove" um documento sem produzir evidência,
e o relatório de `T4` é automaticamente a lista de trabalho aberto.

## 4. Build estático, sem dependência de rede no render

```
tools/build-graph.js      # varre **/*.md, valida front-matter, resolve arestas
  → data/graph.json       # { nodes: [...], edges: [...] }
  → data/trust.json       # { id: level }. Saída da função da seção 3
  → data/openings.json    # todos os T4 + requisitos sem nenhuma moção que os responda
```

Um Action no `dknowledge` roda em cada push para `master` e comita os três arquivos.
Os sites leem JSON estático: instantâneo, funciona offline, sem limite de API. A API
viva do GitHub fica só para o que muda por hora (issues), como já é hoje.

No componente do site, `KN_TODAY` sai e entra um fetch de `data/graph.json` +
`data/trust.json` com o inventário atual como fallback curado. O mesmo padrão do
board: **conteúdo curado é o estado base, rede é enriquecimento.**

## 5. Validação em CI (o que impede a rede de apodrecer)

- front-matter contra `schema/node.schema.json` (espelhar o que
  `validate-component.yml` já faz com os contratos).
- aresta apontando para `id` inexistente → falha.
- `requirement` sem nenhuma moção que o responda → aviso, entra em `openings.json`.
- `translation_of` cujo original mudou depois da tradução → aviso de tradução atrasada
  (hoje README diz "PT/ES atrás do inglês". Isso passa a ser medido).
- ciclo em `depends_on` → falha.

## 6. Ordem sugerida de implementação

1. Schema + front-matter nos 3 `CURRENT.md`/índices e nos 16 papers vazios (mecânico).
2. `build-graph.js` + os três JSON, sem visualização nenhuma.
3. CI de validação.
4. Trocar `KN_TODAY` do site pelo JSON gerado, mantendo o fallback.
5. Só então visualização de grafo (e provavelmente ainda não vale: a lista filtrável
   por nível responde 90% das perguntas com 5% do custo).

## 7. Fora de escopo, de propósito

Sem framework, sem bundler, sem banco. Sem selo de maturidade, sem `NOW/NEXT/DONE`,
sem status de gestão. A página só diz finalidade, estrutura, nível de evidência e
como participar. O workspace privado continua fora do público, como o
`component.yml` do repositório já declara.
