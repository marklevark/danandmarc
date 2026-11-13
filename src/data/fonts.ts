/**
 * Headline font exploration for the night theme.
 * Default on the dark theme: Familjen Grotesk. Try another across the whole site with /night?font=<id>;
 * /night?font=none goes back to the default.
 */
import '@fontsource-variable/fraunces/full.css';
import '@fontsource/instrument-serif/400.css';
import '@fontsource/instrument-serif/400-italic.css';
import '@fontsource/gloock/400.css';
import '@fontsource-variable/syne';
import '@fontsource-variable/bricolage-grotesque/standard.css';
import '@fontsource-variable/unbounded';
import '@fontsource-variable/anybody/standard.css';
import '@fontsource/young-serif/400.css';
import '@fontsource-variable/climate-crisis';
import '@fontsource/italiana/400.css';
import '@fontsource/dm-serif-display/400.css';
import '@fontsource/dm-serif-display/400-italic.css';
import '@fontsource-variable/big-shoulders-display';
import '@fontsource-variable/playfair-display/wght-italic.css';
import '@fontsource-variable/familjen-grotesk';
import '@fontsource-variable/outfit';
import '@fontsource-variable/kalnia/standard.css';
import '@fontsource-variable/bodoni-moda/opsz.css';
import '@fontsource-variable/bodoni-moda/opsz-italic.css';
import '@fontsource-variable/imbue/standard.css';
import '@fontsource-variable/playfair/standard.css';
import '@fontsource-variable/newsreader/opsz-italic.css';
import '@fontsource-variable/cormorant-garamond/wght.css';
import '@fontsource-variable/cormorant-garamond/wght-italic.css';
import '@fontsource-variable/brygada-1918/wght.css';
import '@fontsource/libre-caslon-display/400.css';
import '@fontsource/hedvig-letters-serif/400.css';
import '@fontsource/castoro-titling/400.css';
import '@fontsource/abril-fatface/400.css';
import '@fontsource/rozha-one/400.css';
import '@fontsource/corben/700.css';
import '@fontsource/ultra/400.css';
import '@fontsource/linden-hill/400-italic.css';


export type HeadlineFont = {
  id: string;
  name: string;
  note: string;
  family: string;
  weight?: number;
  style?: 'normal' | 'italic';
  vars?: string; // font-variation-settings
  tracking?: string;
  lh?: number; // headline line-height
  scale?: number; // size multiplier for very wide faces
  requiresKit?: boolean; // commercial font that needs the Adobe Fonts kit
  group?: string; // section on /fonts
};

export const fonts: HeadlineFont[] = [
  // ---------- round 2: design-forward serifs
  { group: 'serifs', id: 'kalnia', name: 'Kalnia', note: 'Wide, razor-contrast serif with odd, sliced details. Feels like a 2020s fashion identity.', family: "'Kalnia Variable'", weight: 600, vars: "'wdth' 125", tracking: '-0.03em', lh: 0.9, scale: 0.55 },
  { group: 'serifs', id: 'imbue', name: 'Imbue', note: 'Tall, condensed Didone. Very magazine-masthead; big impact in little width.', family: "'Imbue Variable'", weight: 600, vars: "'opsz' 100", tracking: '-0.01em', lh: 0.84, scale: 1.15 },
  { group: 'serifs', id: 'bodoni-moda', name: 'Bodoni Moda', note: 'Classic fashion Didone with hairline serifs. Pure Vogue.', family: "'Bodoni Moda Variable'", weight: 700, vars: "'opsz' 96", tracking: '-0.03em', lh: 0.9 },
  { group: 'serifs', id: 'bodoni-moda-italic', name: 'Bodoni Moda Italic', note: 'The italic: sharp, swooping and dramatic.', family: "'Bodoni Moda Variable'", weight: 600, style: 'italic', vars: "'opsz' 96", tracking: '-0.03em', lh: 0.9 },
  { group: 'serifs', id: 'playfair-2', name: 'Playfair 2 (condensed, max contrast)', note: 'The redrawn Playfair at its largest optical size and narrowest width: needle-thin hairlines.', family: "'Playfair Variable'", weight: 800, vars: "'opsz' 1200, 'wdth' 87.5", tracking: '-0.03em', lh: 0.88 },
  { group: 'serifs', id: 'newsreader-italic', name: 'Newsreader Display Italic', note: 'A warm, literary italic built for headlines. Editorial and calm.', family: "'Newsreader Variable'", weight: 500, style: 'italic', vars: "'opsz' 72", tracking: '-0.03em', lh: 0.92 },
  { group: 'serifs', id: 'libre-caslon', name: 'Libre Caslon Display', note: 'Refined, high-contrast Caslon for big sizes. Bookish and elegant.', family: "'Libre Caslon Display'", weight: 400, tracking: '-0.02em', lh: 0.95 },
  { group: 'serifs', id: 'cormorant', name: 'Cormorant Garamond', note: 'A designer favourite: sharp, delicate Garamond with long, graceful strokes.', family: "'Cormorant Garamond Variable'", weight: 600, tracking: '-0.02em', lh: 0.88, scale: 1.08 },
  { group: 'serifs', id: 'cormorant-italic', name: 'Cormorant Garamond Italic', note: 'The italic is almost calligraphic. Romantic, a little theatrical.', family: "'Cormorant Garamond Variable'", weight: 600, style: 'italic', tracking: '-0.02em', lh: 0.88, scale: 1.08 },
  { group: 'serifs', id: 'hedvig', name: 'Hedvig Letters Serif', note: 'Contemporary Scandinavian serif with quirky, chiselled shapes.', family: "'Hedvig Letters Serif'", weight: 400, tracking: '-0.03em', lh: 0.95 },
  { group: 'serifs', id: 'brygada', name: 'Brygada 1918', note: 'A revived 1918 Polish typeface. Sturdy, slightly eccentric, full of history.', family: "'Brygada 1918 Variable'", weight: 700, tracking: '-0.03em', lh: 0.92 },
  { group: 'serifs', id: 'castoro-titling', name: 'Castoro Titling', note: 'All-caps titling serif, like carved inscriptions. Formal and monumental.', family: "'Castoro Titling'", weight: 400, tracking: '0em', lh: 0.95, scale: 0.72 },
  { group: 'serifs', id: 'abril', name: 'Abril Fatface', note: 'A Victorian fat-face poster serif. Big, black and loud.', family: "'Abril Fatface'", weight: 400, tracking: '-0.02em', lh: 0.92 },
  { group: 'serifs', id: 'rozha', name: 'Rozha One', note: 'Heavy, ultra-contrast display serif. Strong poster presence.', family: "'Rozha One'", weight: 400, tracking: '-0.02em', lh: 0.95 },
  { group: 'serifs', id: 'corben', name: 'Corben', note: 'Rounded, soft 70s serif. Cosy and fun, a bit Wes Anderson.', family: "'Corben'", weight: 700, tracking: '-0.04em', lh: 0.95, scale: 0.9 },
  { group: 'serifs', id: 'ultra', name: 'Ultra', note: 'Ultra-heavy slab serif. Wild-west poster energy.', family: "'Ultra'", weight: 400, tracking: '-0.03em', lh: 0.95, scale: 0.75 },
  { group: 'serifs', id: 'linden-hill', name: 'Linden Hill Italic', note: 'Light, old-world italic with a handmade wobble. Quiet and charming.', family: "'Linden Hill'", weight: 400, style: 'italic', tracking: '-0.01em', lh: 0.95, scale: 1.05 },
  // ---------- the original site's font and its free lookalikes
  { group: 'original', id: 'degular', name: 'Degular Display (the original site’s font)', note: 'The font danandmarc.ca used on Squarespace. Commercial (Adobe Fonts): it only shows here once an Adobe Fonts kit ID is set in src/data/site.ts. Until then you’ll see Figtree in its place.', family: "'degular-display'", weight: 700, tracking: '-0.01em', lh: 0.82, requiresKit: true },
  { group: 'original', id: 'familjen', name: 'Familjen Grotesk (closest free match to Degular)', note: 'Free, and nearly identical to Degular Display Bold in weight, shapes and width. The original site’s look, without the licence.', family: "'Familjen Grotesk Variable'", weight: 700, tracking: '-0.045em', lh: 0.82 },
  { group: 'original', id: 'outfit', name: 'Outfit (rounder Degular cousin)', note: 'Free geometric sans in the same family of feeling as Degular, a little rounder and friendlier.', family: "'Outfit Variable'", weight: 700, tracking: '-0.05em', lh: 0.84 },
  { group: 'round1', id: 'fraunces', name: 'Fraunces (soft, wonky)', note: 'Old-style serif with soft, slightly wonky letterforms. Warm and a bit playful.', family: "'Fraunces Variable'", weight: 400, vars: "'SOFT' 100, 'WONK' 1, 'opsz' 144", tracking: '-0.035em', lh: 0.9 },
  { group: 'round1', id: 'instrument', name: 'Instrument Serif', note: 'Condensed, editorial serif. Feels like a magazine cover.', family: "'Instrument Serif'", weight: 400, tracking: '-0.02em', lh: 0.88 },
  { group: 'round1', id: 'instrument-italic', name: 'Instrument Serif Italic', note: 'The italic cut. Loose, handwritten-ish energy.', family: "'Instrument Serif'", weight: 400, style: 'italic', tracking: '-0.02em', lh: 0.9 },
  { group: 'round1', id: 'gloock', name: 'Gloock', note: 'High-contrast display serif with chunky, sculpted serifs.', family: "'Gloock'", weight: 400, tracking: '-0.03em', lh: 0.92 },
  { group: 'round1', id: 'dm-serif-italic', name: 'DM Serif Display Italic', note: 'Classic fashion-mag italic. Elegant with some swagger.', family: "'DM Serif Display'", weight: 400, style: 'italic', tracking: '-0.03em', lh: 0.92 },
  { group: 'round1', id: 'playfair-italic', name: 'Playfair Display Italic', note: 'Sharp, high-contrast italic. Very ad-agency-in-the-80s.', family: "'Playfair Display Variable'", weight: 500, style: 'italic', tracking: '-0.03em', lh: 0.92 },
  { group: 'round1', id: 'young-serif', name: 'Young Serif', note: 'Heavy 70s serif. Friendly, a bit retro, very confident.', family: "'Young Serif'", weight: 400, tracking: '-0.04em', lh: 0.95 },
  { group: 'round1', id: 'italiana', name: 'Italiana', note: 'Thin, elegant Didone. Quiet luxury; best at very large sizes.', family: "'Italiana'", weight: 400, tracking: '-0.01em', lh: 1 },
  { group: 'round1', id: 'syne', name: 'Syne ExtraBold', note: 'Quirky wide grotesk from an art centre. Odd curves, lots of character.', family: "'Syne Variable'", weight: 800, tracking: '-0.045em', lh: 0.9, scale: 0.68 },
  { group: 'round1', id: 'bricolage', name: 'Bricolage Grotesque', note: 'Ink-trapped, condensed grotesk with a hand-made feel.', family: "'Bricolage Grotesque Variable'", weight: 800, vars: "'wdth' 75, 'opsz' 96", tracking: '-0.04em', lh: 0.86 },
  { group: 'round1', id: 'unbounded', name: 'Unbounded', note: 'Round, wide and geometric. Bold and techy.', family: "'Unbounded Variable'", weight: 600, tracking: '-0.05em', lh: 0.95, scale: 0.82 },
  { group: 'round1', id: 'anybody', name: 'Anybody Expanded', note: 'Super-wide grotesk. Loud, poster-like.', family: "'Anybody Variable'", weight: 800, vars: "'wdth' 150", tracking: '-0.04em', lh: 0.92, scale: 0.66 },
  { group: 'round1', id: 'big-shoulders', name: 'Big Shoulders Display', note: 'Tall, condensed Chicago-signage type. Punchy.', family: "'Big Shoulders Display Variable'", weight: 800, tracking: '-0.01em', lh: 0.84 },
  { group: 'round1', id: 'climate-crisis', name: 'Climate Crisis', note: 'Ultra-heavy, blobby display. A real statement.', family: "'Climate Crisis Variable'", weight: 400, vars: "'YEAR' 1979", tracking: '-0.02em', lh: 0.9, scale: 0.78 },
];

/** Global CSS: [data-font="<id>"] sets the headline variables for everything inside it. */
export const fontCss = fonts
  .map(
    (f) =>
      `[data-font="${f.id}"],html.theme-night[data-font="${f.id}"]{--display:${f.family},'Figtree Variable',sans-serif;--hd-weight:${f.weight ?? 400};--hd-style:${f.style ?? 'normal'};--hd-vars:${f.vars ?? 'normal'};--display-tracking:${f.tracking ?? '-0.02em'};--hd-lh:${f.lh ?? 0.9};--hd-scale:${f.scale ?? 1}}`,
  )
  .join('\n');
