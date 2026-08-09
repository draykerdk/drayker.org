# drayker-mark.js — base do símbolo Drayker

Motor único do símbolo: **corpo + estrutura orbital + efeito nos dois quartos**.
Serve para páginas vivas (animado, reage ao cursor), para SVG estático
(favicon, e-mail, PDF, corte) e como matemática pura para outros meios.

Arquivo: `drayker-mark.js` — sem dependências, sem build. Um `<script src>` basta.

---

## 1. O conceito (não invente outro)

| peça | o que é | regra |
|---|---|---|
| **corpo** | o planeta, esfera de raio `R = 100` no centro de um viewBox `-190 -190 380 380` | sempre esférico de verdade: tudo que é desenhado nele tem de fazer sentido sobre uma esfera |
| **aros** | **uma megaestrutura / nave** em órbita — dois grandes círculos que *contêm* o vetor de olhar e são inclinados `±tilt` (42°, `0.733 rad`) em torno dele | por isso eles se cruzam sempre na frente de quem olha e reorientam com o cursor; nunca são ornamento |
| **cunha** | a sombra que a estrutura projeta, cobrindo **dois quartos opostos** do disco | opaca, borda seca, sem blur. É a marca |
| **quartos** | o que a estrutura *faz* com o planeta, desenhado **dentro da cunha** (clip) | leitura dupla e intencional: **proteção** (blindagem) e **extração de energia** |

A cunha atravessa também a atmosfera: o brilho de limbo é apagado nos setores
cobertos (`geom.limbBlock`). Sem isso a sombra denuncia que é pintura.

---

## 2. Uso

### Declarativo (o caminho normal)

```html
<script src="drayker-mark.js"></script>

<svg data-drayker
     data-body="geo"           <!-- Drayker.bodies -->
     data-rings="hull"         <!-- Drayker.rings -->
     data-wedge="extract"      <!-- Drayker.wedgeFx -->
     data-accent="#FF5500"
     data-ring-radius="120"
     data-stars></svg>
```

Monta sozinho no `DOMContentLoaded`. Para conteúdo inserido depois:
`Drayker.mount(container)`.

Outros atributos: `data-sphere` (nome em `palette.spheres` ou omitido),
`data-tilt`, `data-shadow` (0–1), `data-animate="false"`,
`data-gaze="0.16,0.34"` (olhar fixo em vez de seguir o cursor).

### Programático

```js
const mark = Drayker.create('#hero-mark', {
  body: 'plain', rings: 'collector', wedge: 'extract', ringRadius: 124
});
mark.setGaze(0.2, 0.3);   // congela o olhar
mark.followCursor();      // volta a seguir o cursor
mark.stop(); mark.start(); // controla o rAF
```

## 2.5 A MARCA OFICIAL (é esta, não invente outra)

Duas cores e só: **preto** (#000000) nos aros, na borda e na sombra; **o globo**
muda de cor por escopo — laranja neon `#FF5500` no principal. Olhar travado em
`0, 0.34`: simetria de eixo vertical, ponta focal da cunha abaixo do centro.
Estática, sem gradiente, sem halo, sem noite.

```html
<svg data-drayker data-rings="mono" data-accent="#FF5500"
     data-gaze="0,0.34" data-animate="false" data-fit="1.5"></svg>
```

| aplicação | parâmetros |
|---|---|
| marca — **e todo ícone ≥ 20 px** | `rings:'mono', weight:5, ringRadius:120, fit:1.5` |
| compacto (exceção, < 20 px) | `rings:'mono', weight:7, ringRadius:106, fit:1.24` |
| favicon 16 px | `rings:'monoBare', weight:9, fit:1.1` |
| sem cunha | `+ shadow:0` |
| órbita larga | `ringRadius:152, weight:3.4, fit:1.78` |

**O ícone é a logo.** Não existe versão de ícone "simplificada" para uso normal:
favicon 32/48, app icon, avatar, aba, botão, marcador de mapa — todos são
`drayker-marca.svg` sem alteração. `drayker-icone.svg` (compacto) e
`drayker-favicon.svg` (monoBare) só entram quando a marca é renderizada abaixo
de 20 px e os aros fecham; se der para usar a logo, usa a logo.

### Arquivos prontos — `assets/logo/`

```
drayker-marca.svg  drayker-icone.svg  drayker-favicon.svg
drayker-sem-cunha.svg  drayker-orbita-larga.svg
escopo/drayker-{emergence,dk,daf,bsdk,network,lcrypt,uid,dfm}.svg
escuro/drayker-{marca,icone,sem-cunha,orbita-larga,favicon}.svg   tinta branca
escuro/escopo/drayker-{...}.svg            mesma coleção para fundo escuro
mono/drayker-1cor-{preto,branco}.svg      uma tinta (globo = papel)
mono/drayker-vazado-{branco,preto}.svg    disco com a cunha FURADA (evenodd)
assinatura/drayker-{horizontal,vertical,horizontal-branco}.svg   titular
assinatura/drayker-tecnica{,-branco}.svg   maiúscula espaçada, uso técnico
kit/  favicon-16/32/48.png · apple-touch-icon.png (180, fundo #08080A, marca escura)
      maskable-512.png (zona segura 20%, marca escura) · icon-512/1024.png
      icon-512-branco.png · icon-512-escuro.png
```

A assinatura é **“Drayker” em caixa alta e baixa** — só o D maiúsculo — em
**Archivo 600, tracking −0.012em** (horizontal) e **Archivo 500, tracking ~0**
(vertical: caixa baixa não se espaça). Nunca `lengthAdjust="spacingAndGlyphs"`: a
letra não é esticada nem comprimida em nenhuma aplicação. Archivo entrou no lugar
do Space Grotesk porque `r`, `k` e `y` são formas simples — haste e diagonal, sem
perninha decorativa.

Existe **uma segunda assinatura, a técnica**: `DRAYKER` em Archivo 500 com
tracking **+0.22em**, sempre menor que o símbolo — placa, casco, lombada, régua
de rodapé. Ela nunca substitui a titular em peça de marca, e maiúscula colada
(sem tracking) não existe. No escuro, só a palavra muda de cor: aros e borda
continuam preto.

**Archivo é o único tipo da marca** — 600 para marca e título, 500 para técnica e
rótulo, 400 para texto. Sem fonte alternativa para peça grande, sem par de
fontes. O texto ainda é `<text>` vivo — converta para
curvas no Illustrator/Figma antes de mandar para gráfica. Área de respiro já
embutida no arquivo: **X = metade do raio do globo**. Mínimos: 24 mm / 110 px
(horizontal), 16 mm / 72 px (vertical); abaixo disso, só o símbolo.

### A tinta segue o fundo
O aro é **uma peça só e tem uma cor só** — na frente do globo, atrás dele e no
trecho que o cruza. A borda do limbo acompanha o aro.

| elemento | no claro | no escuro |
|---|---|---|
| aro inteiro (`over` + `out` + `back`) e borda do limbo | preto | **branco** |
| cunha (sombra, não estrutura) | preto | **preto** |
| globo | cor do escopo | cor do escopo |

A cunha é a única exceção, e por um motivo: em branco ela desapareceria sobre
globos claros (`uid #E8ECF5` daria 1,18:1) e é ela que conta o que a estrutura faz
com o planeta. São dois arquivos da mesma geometria: `assets/logo/` para fundo
claro, `assets/logo/escuro/` para fundo escuro, gerados com
`toMonoSVG({ ink: '#FFFFFF' })` — `ink` é a tinta do aro e da borda, `inkOnBody`
(preto por padrão) a da cunha. Nos modos `ink` e `knockout` há uma tinta só.
Sobre cor cheia, foto ou vídeo, nenhum dos dois serve: ali é o
`mono/drayker-vazado-*.svg`.

Ordem de pintura: globo, cunha, `over`, `back`, `out`, borda.

### Emenda do aro com o globo
`geom.hoop` classifica o aro em `over` / `out` / `back` e a troca de classe é
resolvida por **bissecção** no ângulo exato do cruzamento, não na amostra mais
próxima — depois cada trecho avança ~3 px além da fronteira. Sem isso aparecia
um corte branco onde o aro encontra o limbo. Se mexer em `hoop`, mantenha as
duas coisas: ângulo exato **e** costura sobreposta.

### Não faça
Esticar, girar ou espelhar · trocar a cor dos aros/borda/sombra (só o globo
muda) · sombra, brilho, gradiente ou contorno extra · marca colorida sobre foto
(ali é o vazado) · redesenhar a partir de print.

### SVG estático (favicon, e-mail, PDF, laser)

```js
Drayker.toSVGString({ rings: 'seal', animate: false });
// quadro congelado do motor inteiro (com defs, máscara, filtro)

Drayker.toMonoSVG({ accent: '#FF5500', ringRadius: 106, weight: 7, fit: 1.24 });
// SVG MÍNIMO da marca oficial: ~6 formas, sem defs/máscara/filtro/script
```

`toMonoSVG` aceita ainda `mode`:
`'color'` (padrão, globo colorido + preto) · `'ink'` (uma tinta só: o globo vira
o papel) · `'knockout'` (disco cheio com a cunha furada, `fill-rule="evenodd"`),
mais `ink` para a cor da tinta. É o gerador de todos os arquivos em
`assets/logo/` — para gerar de novo, rode-o e grave a string.

---

## 3. Opções

| opção | default | nota |
|---|---|---|
| `body` | `'plain'` | chave de `Drayker.bodies` |
| `rings` | `'hairline'` | chave de `Drayker.rings` |
| `wedge` | `'none'` | chave de `Drayker.wedgeFx` |
| `accent` | `#FF5500` | cor do escopo |
| `sphere` | do corpo | nome em `palette.spheres` ou array de stops |
| `tilt` | `0.733` | inclinação dos planos, em rad. **Não mude sem motivo** |
| `ringRadius` | `120` | raio da estrutura |
| `weight` | `5` | espessura do traço nos estilos chapados (`mono`) |
| `border` | `true` | borda preta no limbo (`mono`) |
| `shadow` | `0.94` | opacidade da cunha |
| `night` | `0.3` | lado noturno |
| `stars` / `animate` | `false` / `true` | |
| `fit` | `null` | recorta o viewBox (meia-extensão em múltiplos de `R`). `1.35` para ícone pequeno |
| `gaze` | `null` | `{x,y}` fixo; `null` = cursor |

O olhar é **um só na página** (`window.__dkGaze`): todas as marcas viram juntas.

---

## 4. Catálogo atual

**Corpos** `plain` (esfera da marca) · `grid` (meridianos/paralelos) ·
`geo` (casca geodésica icosaédrica) · `weave` (trança de dois sentidos) ·
`star` (plumas radiais) · `voidBody` (horizonte de eventos).

**Estruturas** `mono` (**a marca oficial** — duas cores, chapada, estática) ·
`monoBare` (mono sem aros: globo + borda + cunha) ·
`hairline` (fita de cromo) · `hull` (casco habitado: costuras, vigas, módulos, luzes) ·
`collector` (painéis escuros + bocas de captação) ·
`shieldRing` (aros finos + emissores) · `drydock` (pórticos e naves atracadas) ·
`seal` (chapado, estático, versão antiga de ícone).

**Quartos** `none` · `extract` (fluxo de energia para o ponto de captação) ·
`shield` (malha de blindagem + varredura) · `terraform` (parcelas e placas acesas).

Qualquer combinação é válida — 6 × 6 × 4. Pares que já foram testados juntos:
`hull+terraform`, `collector+extract`, `shieldRing+shield`, `drydock+none`.

---

## 5. Como estender (é aqui que outro agente deve mexer)

**Nunca edite o pipeline de `create()`.** Registre uma entrada nova.

```js
Drayker.bodies.myBody = {
  sphere: 'ice',            // gradiente base (palette.spheres) — opcional
  hotLimb: false,           // limbo quente (estrelas) — opcional
  build(ctx) {              // cria os nós UMA vez
    return { g: ctx.layers.body.appendChild(Drayker.mk('path', {
      fill: 'none', stroke: ctx.accent, 'stroke-width': 1
    })) };
  },
  paint(ctx, p) {           // só atualiza atributos, todo quadro
    ctx.body.g.setAttribute('d', Drayker.geom.hoop(p.normals[0], 99).over);
  }
};
```

`Drayker.rings.x` e `Drayker.wedgeFx.x` seguem a mesma forma
(`ctx.ring` / `ctx.fx` guardam o retorno do `build`).

**`ctx`** — `layers` (`stars`, `back`, `body`, `fx`, `limb`, `front`),
`accent`, `metal`, `hull` (gradientes prontos), `blurSoft`, `opts`, `uid`,
`geom`, `vec`, `palette`.

**`p`** (payload de paint) — `t` (segundos), `gaze`, `normals` (as duas normais),
`spans` (setores angulares cobertos pela cunha), `wedge` (`{d, spans, apex}`), `opts`.

Regras de camada: peças atrás do corpo em `layers.back` (esmaeça-as);
peças na frente em `layers.front`; superfície do planeta em `layers.body`;
efeito nos dois quartos em `layers.fx` (já vem clipado na cunha).

**Ring style com casco largo** deve declarar `wedgePad` (quanto a cunha cresce
além de `ringRadius`) e `flat: true` se for chapado/estático.

### Regras de desempenho
- `build` cria nós; `paint` **só** faz `setAttribute`. Nada de criar nó por quadro.
- Para conjuntos de pontos use `Drayker.syncDots(g, lista, r)` — pool reaproveitado.
- O loop pinta em quadros alternados (~30 fps); é suficiente e barato com 8+ marcas.

---

## 6. Matemática pura (sem DOM)

`Drayker.vec` — `norm, cross, dot, scale, add, rotY, rotAxis`.

`Drayker.geom`:

| função | devolve |
|---|---|
| `basis(n)` | base ortonormal no plano de normal `n` |
| `hoop(n, r)` | `{over, out, back}` — aro classificado (por cima do corpo / na frente e fora / atrás e fora). Atrás **e** dentro do disco é omitido |
| `band(n, r1, r2)` | `{front, back}` — casco largo partido pelo corpo |
| `onHoop(n, r, t)` | ponto 3D no aro (para pendurar módulos, luzes, feixes) |
| `gazeNormals(gx, gy, tilt)` | as duas normais dos planos a partir do olhar |
| `shadowWedge(gx, gy, tilt, R)` | `{d, spans, apex}` — a cunha nos dois quartos |
| `limbBlock(spans, r1, r2)` | setores para apagar o halo atrás da cunha |
| `night(gx, gy)` | lado noturno visível |
| `smallCircle(axis, lat, r)` | paralelo sobre a esfera, só a parte visível |
| `icosa(sub)` | `{verts, faces}` icosaedro subdividido |

Projeção é ortográfica trivial: `(x, y)` do vetor 3D já são coordenadas de tela,
`z > 0` é na frente. Sem matriz de câmera, de propósito — dá para portar o mesmo
código para canvas, three.js ou gerador de SVG no servidor sem tradução.

---

## 7. Paleta

`Drayker.palette` — `ink #08080A`, `panel #0C0C0F`, `line #18181E`,
`text #EDECF0`, `mute #8585A0`, `accent #FF5500`, `accentHot #FF8A38`,
gradientes `chrome` / `hullDark`, esferas `brand, slate, ice, moss, star, void`.
Cores de escopo já em uso no site: Dk `#5CE02E`, DAF `#FF8A00`, BSDK `#9C8CFF`,
Dk Network `#3FA9FF`, LCrypt `#14E0C0`, UID `#E8ECF5`, DFM/DFMP `#FFCB6B`,
Emergence `#FF5500`. **Não invente cor nova** — puxe daqui.

---

## 8. Acessibilidade e limites
- A marca é decorativa: `aria-hidden="true"` quando houver texto ao lado.
- `prefers-reduced-motion`: chame `mark.stop()` — o primeiro quadro já é válido.
- Abaixo de ~40 px use `rings: 'seal'` e `wedge: 'none'`.
- Não gire a cunha de forma independente dos aros: ela **é** a sombra deles.
