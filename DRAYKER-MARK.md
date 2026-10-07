# drayker-mark.js. Basis of the Drayker symbol

A single engine for the symbol: **body + orbital structure + effect on the two quarters**.
It serves live pages (animated, reacts to the cursor), static SVG
(favicon, email, PDF, cutting) and pure maths for other media.

File: `drayker-mark.js`. No dependencies, no build. One `<script src>` is enough.

---

## 1. The concept (do not invent another)

| piece | what it is | rule |
|---|---|---|
| **body** | the planet, a sphere of radius `R = 100` at the centre of a `-190 -190 380 380` viewBox | always truly spherical: everything drawn on it has to make sense on a sphere |
| **hoops** | **a megastructure / ship** in orbit — two great circles that *contain* the gaze vector and are tilted `±tilt` (42°, `0.733 rad`) around it | that is why they always cross in front of the viewer and reorient with the cursor; they are never ornament |
| **wedge** | the shadow the structure casts, covering **two opposite quarters** of the disc | opaque, hard edge, no blur. It is the mark |
| **quarters** | what the structure *does* to the planet, drawn **inside the wedge** (clip) | a double, intentional reading: **protection** (shielding) and **energy extraction** |

The wedge also crosses the atmosphere: the limb glow is erased in the covered
sectors (`geom.limbBlock`). Without that the shadow gives away that it is paint.

---

## 2. Usage

### Declarative (the normal path)

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

It mounts itself on `DOMContentLoaded`. For content inserted later:
`Drayker.mount(container)`.

Other attributes: `data-sphere` (a name in `palette.spheres`, or omitted),
`data-tilt`, `data-shadow` (0–1), `data-animate="false"`,
`data-gaze="0.16,0.34"` (fixed gaze instead of following the cursor).

### Programmatic

```js
const mark = Drayker.create('#hero-mark', {
  body: 'plain', rings: 'collector', wedge: 'extract', ringRadius: 124
});
mark.setGaze(0.2, 0.3);   // freezes the gaze
mark.followCursor();      // follows the cursor again
mark.stop(); mark.start(); // controls the rAF
```

## 2.5 THE OFFICIAL MARK (it is this one, do not invent another)

Two colours and nothing else: **black** (#000000) on the hoops, the edge and the shadow; **the globe**
changes colour by scope. Neon orange `#FF5500` on the main one. Gaze locked at
`0, 0.34`: vertical-axis symmetry, focal tip of the wedge below the centre.
Static, no gradient, no halo, no night side.

```html
<svg data-drayker data-rings="mono" data-accent="#FF5500"
     data-gaze="0,0.34" data-animate="false" data-fit="1.5"></svg>
```

| application | parameters |
|---|---|
| mark — **and every icon ≥ 20 px** | `rings:'mono', weight:5, ringRadius:120, fit:1.5` |
| compact (exception, < 20 px) | `rings:'mono', weight:7, ringRadius:106, fit:1.24` |
| 16 px favicon | `rings:'monoBare', weight:9, fit:1.1` |
| no wedge | `+ shadow:0` |
| wide orbit | `ringRadius:152, weight:3.4, fit:1.78` |

**The icon is the logo.** There is no "simplified" icon version for normal use:
favicon 32/48, app icon, avatar, tab, button, map marker. All of them are
`drayker-mark.svg` unchanged. `drayker-icon.svg` (compact) and
`drayker-favicon.svg` (monoBare) only come in when the mark is rendered below
20 px and the hoops close up; if the logo can be used, use the logo.

### Ready-made files · `assets/logo/`

```
drayker-mark.svg  drayker-icon.svg  drayker-favicon.svg
drayker-no-wedge.svg  drayker-wide-orbit.svg
scope/drayker-{emergence,dk,daf,bsdk,network,lcrypt,uid,dfm}.svg
dark/drayker-{mark,icon,no-wedge,wide-orbit,favicon}.svg   white ink
dark/scope/drayker-{...}.svg            same collection for dark backgrounds
mono/drayker-1color-{black,white}.svg      one ink (globe = paper)
mono/drayker-knockout-{white,black}.svg    disc with the wedge CUT OUT (evenodd)
signature/drayker-{horizontal,vertical,horizontal-white}.svg   primary
signature/drayker-technical{,-white}.svg   spaced capitals, technical use
kit/  favicon-16/32/48.png · apple-touch-icon.png (180, #08080A background, dark mark)
      maskable-512.png (20% safe zone, dark mark) · icon-512/1024.png
      icon-512-white.png · icon-512-dark.png
```

The signature is **“Drayker” in mixed case**, only the D in capitals, in
**Archivo 600, tracking −0.012em** (horizontal) and **Archivo 500, tracking ~0**
(vertical: lowercase is not spaced out). Never `lengthAdjust="spacingAndGlyphs"`: the
letters are not stretched or squashed in any application. Archivo replaced
Space Grotesk because `r`, `k` and `y` are simple shapes. Stem and diagonal, no
decorative little leg.

There is **a second signature, the technical one**: `DRAYKER` in Archivo 500 with
tracking **+0.22em**, always smaller than the symbol. Plate, hull, spine,
footer ruler. It never replaces the primary signature on a brand piece, and tight capitals
(without tracking) do not exist. On dark, only the word changes colour: hoops and edge
stay black.

**Archivo is the brand’s only typeface**. 600 for mark and title, 500 for technical text and
labels, 400 for text. No alternative font for large pieces, no font
pairing. The text is still live `<text>`. Convert it to
outlines in Illustrator/Figma before sending it to print. Clear space is already
built into the file: **X = half the globe’s radius**. Minimums: 24 mm / 110 px
(horizontal), 16 mm / 72 px (vertical); below that, the symbol alone.

### The ink follows the background
The hoop is **a single piece and has a single colour**. In front of the globe, behind it and
where it crosses it. The limb edge follows the hoop.

| element | on light | on dark |
|---|---|---|
| whole hoop (`over` + `out` + `back`) and limb edge | black | **white** |
| wedge (shadow, not structure) | black | **black** |
| globe | scope colour | scope colour |

The wedge is the only exception, and for a reason: in white it would vanish on
light globes (`uid #E8ECF5` would give 1.18:1), and it is the wedge that tells what the structure does
to the planet. There are two files with the same geometry: `assets/logo/` for light
backgrounds, `assets/logo/dark/` for dark backgrounds, generated with
`toMonoSVG({ ink: '#FFFFFF' })`. `ink` is the ink of the hoop and the edge, `inkOnBody`
(black by default) that of the wedge. The `ink` and `knockout` modes have a single ink.
On solid colour, photo or video, neither of the two works: there it is
`mono/drayker-knockout-*.svg`.

Paint order: globe, wedge, `over`, `back`, `out`, edge.

### Seam between hoop and globe
`geom.hoop` classifies the hoop into `over` / `out` / `back`, and the change of class is
resolved by **bisection** at the exact crossing angle, not at the nearest
sample. Then each segment extends ~3 px beyond the boundary. Without this a
white cut appeared where the hoop meets the limb. If you touch `hoop`, keep both
things: exact angle **and** overlapping seam.

### Don’t
Stretch, rotate or mirror · change the colour of the hoops/edge/shadow (only the globe
changes) · shadow, glow, gradient or extra outline · colour mark on a photo
(that is where the knockout goes) · redraw from a screenshot.

### Static SVG (favicon, email, PDF, laser)

```js
Drayker.toSVGString({ rings: 'seal', animate: false });
// frozen frame of the whole engine (with defs, mask, filter)

Drayker.toMonoSVG({ accent: '#FF5500', ringRadius: 106, weight: 7, fit: 1.24 });
// MINIMAL SVG of the official mark: ~6 shapes, no defs/mask/filter/script
```

`toMonoSVG` also accepts `mode`:
`'color'` (default, coloured globe + black) · `'ink'` (a single ink: the globe becomes
the paper) · `'knockout'` (solid disc with the wedge cut out, `fill-rule="evenodd"`),
plus `ink` for the ink colour. It is the generator of every file in
`assets/logo/`. To regenerate, run it and save the string.

---

## 3. Options

| option | default | note |
|---|---|---|
| `body` | `'plain'` | key of `Drayker.bodies` |
| `rings` | `'hairline'` | key of `Drayker.rings` |
| `wedge` | `'none'` | key of `Drayker.wedgeFx` |
| `accent` | `#FF5500` | scope colour |
| `sphere` | from the body | name in `palette.spheres` or an array of stops |
| `tilt` | `0.733` | tilt of the planes, in rad. **Do not change without a reason** |
| `ringRadius` | `120` | radius of the structure |
| `weight` | `5` | stroke thickness in the flat styles (`mono`) |
| `border` | `true` | black edge on the limb (`mono`) |
| `shadow` | `0.94` | opacity of the wedge |
| `night` | `0.3` | night side |
| `stars` / `animate` | `false` / `true` | |
| `fit` | `null` | crops the viewBox (half-extent in multiples of `R`). `1.35` for a small icon |
| `gaze` | `null` | fixed `{x,y}`; `null` = cursor |

There is **a single gaze per page** (`window.__dkGaze`): all marks turn together.

---

## 4. Current catalogue

**Bodies** `plain` (the mark’s sphere) · `grid` (meridians/parallels) ·
`geo` (icosahedral geodesic shell) · `weave` (two-way weave) ·
`star` (radial plumes) · `voidBody` (event horizon).

**Structures** `mono` (**the official mark**, two colours, flat, static) ·
`monoBare` (mono without hoops: globe + edge + wedge) ·
`hairline` (chrome ribbon) · `hull` (inhabited hull: seams, beams, modules, lights) ·
`collector` (dark panels + intake mouths) ·
`shieldRing` (thin hoops + emitters) · `drydock` (gantries and docked ships) ·
`seal` (flat, static, old icon version).

**Quarters** `none` · `extract` (energy flow towards the intake point) ·
`shield` (shielding mesh + sweep) · `terraform` (plots and lit plates).

Any combination is valid. 6 × 6 × 4. Pairs already tested together:
`hull+terraform`, `collector+extract`, `shieldRing+shield`, `drydock+none`.

---

## 5. How to extend (this is where another agent should work)

**Never edit the `create()` pipeline.** Register a new entry.

```js
Drayker.bodies.myBody = {
  sphere: 'ice',            // base gradient (palette.spheres), optional
  hotLimb: false,           // hot limb (stars), optional
  build(ctx) {              // creates the nodes ONCE
    return { g: ctx.layers.body.appendChild(Drayker.mk('path', {
      fill: 'none', stroke: ctx.accent, 'stroke-width': 1
    })) };
  },
  paint(ctx, p) {           // only updates attributes, every frame
    ctx.body.g.setAttribute('d', Drayker.geom.hoop(p.normals[0], 99).over);
  }
};
```

`Drayker.rings.x` and `Drayker.wedgeFx.x` follow the same shape
(`ctx.ring` / `ctx.fx` hold what `build` returns).

**`ctx`** — `layers` (`stars`, `back`, `body`, `fx`, `limb`, `front`),
`accent`, `metal`, `hull` (ready-made gradients), `blurSoft`, `opts`, `uid`,
`geom`, `vec`, `palette`.

**`p`** (paint payload) — `t` (seconds), `gaze`, `normals` (the two normals),
`spans` (angular sectors covered by the wedge), `wedge` (`{d, spans, apex}`), `opts`.

Layer rules: pieces behind the body in `layers.back` (fade them);
pieces in front in `layers.front`; the planet’s surface in `layers.body`;
the effect on the two quarters in `layers.fx` (already clipped to the wedge).

**A ring style with a wide hull** must declare `wedgePad` (how much the wedge grows
beyond `ringRadius`) and `flat: true` if it is flat/static.

### Performance rules
- `build` creates nodes; `paint` **only** calls `setAttribute`. Never create a node per frame.
- For sets of points use `Drayker.syncDots(g, list, r)` — a reused pool.
- The loop paints on alternate frames (~30 fps); that is enough and cheap with 8+ marks.

---

## 6. Pure maths (no DOM)

`Drayker.vec` — `norm, cross, dot, scale, add, rotY, rotAxis`.

`Drayker.geom`:

| function | returns |
|---|---|
| `basis(n)` | orthonormal basis in the plane with normal `n` |
| `hoop(n, r)` | `{over, out, back}` — classified hoop (over the body / in front and outside / behind and outside). Behind **and** inside the disc is omitted |
| `band(n, r1, r2)` | `{front, back}` — wide hull split by the body |
| `onHoop(n, r, t)` | 3D point on the hoop (to hang modules, lights, beams) |
| `gazeNormals(gx, gy, tilt)` | the two plane normals from the gaze |
| `shadowWedge(gx, gy, tilt, R)` | `{d, spans, apex}` — the wedge on the two quarters |
| `limbBlock(spans, r1, r2)` | sectors where the halo behind the wedge is erased |
| `night(gx, gy)` | visible night side |
| `smallCircle(axis, lat, r)` | a parallel on the sphere, visible part only |
| `icosa(sub)` | `{verts, faces}` subdivided icosahedron |

The projection is a trivial orthographic one: `(x, y)` of the 3D vector are already screen coordinates,
`z > 0` is in front. No camera matrix, on purpose — the same
code can be ported to canvas, three.js or a server-side SVG generator without translation.

---

## 7. Palette

`Drayker.palette` — `ink #08080A`, `panel #0C0C0F`, `line #18181E`,
`text #EDECF0`, `mute #8585A0`, `accent #FF5500`, `accentHot #FF8A38`,
gradients `chrome` / `hullDark`, spheres `brand, slate, ice, moss, star, void`.
Scope colours already in use on the site: Dk `#5CE02E`, DAF `#FF8A00`, BSDK `#9C8CFF`,
Dk Network `#3FA9FF`, LCrypt `#14E0C0`, UID `#E8ECF5`, DFM/DFMP `#FFCB6B`,
Emergence `#FF5500`. **Do not invent a new colour** — take it from here.

---

## 8. Accessibility and limits
- The mark is decorative: `aria-hidden="true"` when there is text next to it.
- `prefers-reduced-motion`: the engine respects it on its own — with reduced motion active in the system, the mark does not animate by itself and stays on the first valid frame. `mark.start()` remains available for anyone who wants to animate it explicitly anyway.
- Below ~40 px use `rings: 'seal'` and `wedge: 'none'`.
- Do not rotate the wedge independently of the hoops: it **is** their shadow.
