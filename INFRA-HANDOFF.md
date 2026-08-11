# Infra — SEO estático e dados da organização

Duas peças de infraestrutura publicadas com o pacote 3.4.1. Ambas seguem a mesma regra do resto do projeto:
**estático primeiro, rede é enriquecimento** — e nada de build, bundler ou dependência
de runtime.

O componente (`Drayker v3.dc.html`, que vira `index.html`) já foi ajustado para as
duas. Os arquivos abaixo são o lado do repositório.

---

## 1. SEO por rota — `tools/prerender.js`

**Problema.** O site é um Design Component renderizado no cliente, com rotas por hash.
Sem prerender, um rastreador vê **uma** página: um título, uma descrição, uma URL canônica. Todo o
conteúdo — as páginas dos componentes, manifesto, DFM e Docs — é invisível para
busca e para preview de link.

**O que foi feito no componente.** Tabela `ROUTE_META` (título + descrição por rota) e
`setMeta()`, chamado a cada mudança de rota: atualiza `<title>`, `meta[name=description]`,
`link[rel=canonical]`, `og:title`, `og:description` e `og:url`. Canônica e `og:url`
continuam nas rotas limpas mesmo depois de o componente carregar; o hash existe só
como compatibilidade de navegação.

**O que o script faz.** Emite **um documento HTML de verdade por rota**, sem headless
browser:

```
node tools/prerender.js --site=org          # ./manifesto/index.html, ./docs/index.html, ./project/dk/index.html, ...
node tools/prerender.js --site=com --out=dist
```

- lê `ROUTE_META` e a lista de componentes (`TRAIL`) **do próprio `index.html`** — uma
  fonte de verdade, sem tabela duplicada no script;
- reescreve título, descrição, canônica e og de cada cópia;
- injeta um `<noscript>` legível com o título, a descrição e links para todas as rotas;
- corrige caminhos relativos (`./support.js` → `../support.js`) conforme a profundidade;
- injeta um `location.replace('#org/<rota>')` para o componente abrir na rota certa;
- gera `sitemap.xml` com todas as rotas.

As rotas por hash **continuam idênticas** — os READMEs apontam para
`drayker.org/#org/fn` e `#org/join` e nada disso muda. O prerender adiciona caminhos
limpos (`drayker.org/knowledge/`) sem remover nada.

**Deploy.** Rodar depois de gerar o `index.html` e antes do commit de publicação. Se
usar GitHub Actions, é um passo `node tools/prerender.js --site=org` no mesmo job.
Cuidado único: as pastas geradas são artefato de build — decidir se entram no
repositório (simples, Pages serve direto) ou em um job de deploy. Recomendo commitar:
mantém o Pages sem configuração extra.

---

## 2. Dados da organização — `.github/workflows/org-snapshot.yml`

**Problema.** Hoje o board depende da API pública do GitHub no carregamento. Sem rede,
com limite estourado, ou num navegador com bloqueio, o leitor cai no conteúdo curado —
que é honesto, mas estático e escrito à mão.

**O que o workflow faz.** Uma vez por dia (e sob demanda), monta `data/org.json` com
repositórios, issues abertas e contribuidores usando `gh api` + `jq`, no formato exato
que o componente já consome, e comita só quando muda.

**O que foi feito no componente.** `loadGH()` tenta `./data/org.json` **antes** da API:

1. snapshot existe → estado pronto na hora, zero requisição;
2. depois a API tenta atualizar;
3. API falha → o snapshot continua na tela (`ghState: 'ready'`), não vira erro;
4. sem snapshot e sem API → conteúdo curado, exatamente como antes.

O cache de 30 min em `localStorage` continua na frente dos dois.

**Custo de API por sessão.** Com o snapshot, a navegação entre abas, projetos e mapa
não dispara nada; só a primeira visita tenta uma rodada de atualização.

---

## Ordem de publicação

1. Copiar o componente para `index.html` e regenerar o `.com` (`tools/make-com.js`).
2. `node tools/render-check.js` — a suíte estática precisa continuar passando.
3. `node tools/prerender.js --site=org` no repositório do `.org`; o mesmo com
   `--site=com` no repositório do `.com`.
4. Manter `.github/workflows/org-snapshot.yml` no repositório do `.org`; o primeiro
   `data/org.json` já foi publicado e as atualizações seguem por branch automatizada.
5. Conferir: `drayker.org/knowledge/` e `drayker.org/project/dknowledge/` redirecionam para
   `dknowledge.drayker.org`, e `#org/fn` continua funcionando.

## O que ficou deliberadamente fora

- Um `og:image` por rota. Hoje todas usam o `og.png` da organização; imagem por página
  exigiria geração de imagem no CI, e o ganho é estético.

`render-check.js` e `prerender-check.js` já cobrem metadados em execução, títulos
únicos, URLs limpas, favicons e o schema do snapshot.
