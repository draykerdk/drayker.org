# Drayker — instruções do projeto

## O que é este projeto
Site institucional da Drayker em **um único Design Component**: `index.html` cobre
drayker.com e drayker.org com um switch .com/.org e é a fonte atual das rotas publicadas.
`design/Drayker v3.dc.html` preserva a base do pacote 3.4.1; a v2 é histórica. Os arquivos
em `design/` documentam a proveniência e não são uma segunda cópia editável do conteúdo.

Publicação: HTML estático em GitHub Pages, repositório `draykerdk/drayker.org`.

**Fonte de verdade decidida (2026-08-11): `index.html`, mantendo o contrato visual e de
runtime do Design Component v3 do pacote 3.4.1.** Design estático próprio, sem framework
e com o mínimo de biblioteca externa. Qualquer port React/Next é experimento e não manda
no conteúdo. Nada de reintroduzir build, bundler ou dependência de runtime.

## Regras não negociáveis

**Marca.** Toda peça de logo sai de `drayker-mark.js` com os parâmetros de
`DRAYKER-MARK.md` §2.5. Não redesenhe, não recolora aros/borda/cunha — só o globo
muda de cor, e só com as cores de escopo já listadas (§7). Não invente cor nova.

**Tipografia.** Archivo é o único tipo da marca (600 marca/título, 500 técnico,
400 texto). JetBrains Mono só em rótulos técnicos (eyebrow, labels, códigos).

**Rotas.** Os READMEs dos repositórios apontam para `drayker.org/#org/fn` e
`#org/join`. Qualquer mudança de navegação tem de manter esses hashes vivos:
`#<site>/<page>`, `#org/contrib/<tab>`, `#org/project/<key>`, `#com/<page>`.
Quebrar uma rota quebra links públicos que já estão em produção.
As rotas limpas geradas (`/knowledge/`, `/project/<key>/` etc.) são a superfície de SEO;
canônicas e sitemap nunca podem conter `#`.

**Conteúdo vem das superfícies públicas.** Descrição, escopo, relações e lacunas saem do
README, da documentação publicada e de `.drayker/component.yml` no repositório correspondente
(leia com as ferramentas de GitHub). Não use material privado como evidência pública e não
invente funcionalidade, prazo ou número.

**Selo de gestão não é conteúdo público.** Fora da camada pública: `IN RESEARCH`,
`ACTIVE`, `IN DESIGN`, `CONCEPT`, legendas de status, e trilhos `NOW / NEXT / DONE
/ LATER`. Nada disso volta — nem escondido, nem no modelo de dados. O que a página
diz é finalidade, papel no sistema, relações com outros projetos, arquitetura,
fontes e como participar.

**Lacuna declarada não é status.** "DFMP-000 não está escrito e qualquer um pode
escrevê-lo" é convite, e é o motivo de o `.org` existir. Mantenha em prosa, sob
`WHAT IS OPEN`, só no `.org`. As lacunas conhecidas: DFMP-000 não escrito, mecânica
de pontos do DAF indefinida, conselhos indefinidos, templates do DFMPProject não
publicados.

**GitHub API.** Só endpoints públicos no navegador, sem token, cache de 30 min. O
`data/org.json` versionado é carregado antes da API e usa URL absoluta nas rotas
prerenderizadas. Nunca deixe a página depender da rede: projetos e contratos curados
continuam visíveis; funções abertas usam snapshot ou estado vazio honesto, nunca exemplos.

**Label do board.** É `open-function`. Não é "good first issue".

## Ao mexer no arquivo
- Faça substituições localizadas em `index.html`; nada de reescrever o DC inteiro.
- Estilo inline, sempre. Sem classes, sem folha de estilo (só `@font-face`,
  `@keyframes` e reset no `<helmet>`).
- Revisão visual grande = criar a próxima versão do Design Component e manter a v3 como histórico.
- Atualize `github.md` (Last sync + Screen map) sempre que mudar conteúdo derivado
  do repositório.
- Depois de editar o componente: rode `render-check`, regenere `.com`, execute
  `prerender.js` nos dois repositórios e valide com `prerender-check.js`.

## Idioma
Site em inglês. Conversa e documentação interna em português.

## Regressão: testar o fluxo do Volunteer ponta a ponta
Validado em 2026-08-09 no componente estático, em desktop e mobile. Os contratos
abaixo também estão automatizados em `tools/render-check.js`; mantenha a revisão
visual e interativa quando o fluxo ou o runtime mudar.

1. **Entrada.** Abrir `#org/join` direto pela URL e também pelo botão "Volunteer"
   do header/hero. Os dois têm de cair no questionário, não numa aba vazia.
2. **Questionário.** Percorrer os passos até o fim escolhendo (a) só uma opção por
   pergunta, (b) várias opções, (c) nenhuma — voltar com o botão de retorno no meio
   do caminho. Nenhum estado pode travar o avanço nem pular passo.
3. **Resultado.** Conferir que track principal, track secundário, horas por semana
   e os três primeiros passos aparecem preenchidos — nada de `undefined`, string
   vazia ou rótulo genérico. Testar pelo menos três combinações de respostas que
   deveriam dar tracks diferentes e confirmar que dão.
4. **Mapa.** Os 17 repositórios têm de estar visíveis e agrupados por domínio.
   Exatamente uma linha marcada `YOU ARE HERE` e os nós do track casado com
   `YOUR TRACK` em `#FF5500`; o resto neutro. Nenhum nó duplicado ou faltando.
5. **Saída.** Clicar num nó do mapa abre `#org/project/<key>` da página certa, com
   vision, `WHAT IS OPEN` e issues — sem colapsar e sem descrição repetida
   (regressão já vista antes). Voltar do projeto tem de devolver ao resultado, não
   ao início do questionário.
6. **Rotas de projeto.** Abrir `#org/project/nope-123`: tem de aparecer o bloco
   "no page for this key" com saída para a lista, nunca página em branco. Abrir as
   três páginas de conceito (`dsupport`, `openscience`, `valueunit`): sem barra de
   estatísticas, sem link de repositório, com o aviso `NO REPOSITORY YET`.
7. **Links internos.** Nos cards do Ecosystem e nos componentes da página do Dk, o
   clique no card abre a página interna e o clique no link de repo/docs abre o
   externo **sem** também abrir a página interna.
8. **Split .com/.org.** No `.com`: sem Contribute na navegação, sem botão Volunteer,
   com `#com/partnerships` e uma página institucional própria para cada componente.
   Links técnicos profundos e qualquer rota de participação levam ao `.org`.
9. **Sem rede.** Repetir 3–8 com a API do GitHub bloqueada: tudo continua
   renderizando pelo conteúdo curado, sem tela vazia nem erro de console.
10. **Limite de API.** Confirmar que uma sessão inteira do fluxo não dispara mais de
   uma rodada de chamadas — o cache de 30 min tem de absorver a navegação repetida
   entre abas, projetos e mapa. Se cada visita refizer as chamadas, corrigir o
   cache antes de considerar o teste passado.

Console limpo em todos os passos. Nenhum selo de gestão pode reaparecer em lugar
nenhum durante o teste. Achou problema: corrigir, repetir o passo, e registrar em
`github.md` no Last sync.
