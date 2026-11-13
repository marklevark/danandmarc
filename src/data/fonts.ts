/**
 * Headline font exploration for the night theme.
 * Try one across the whole site with /night?font=<id>; /night?font=none goes back to Figtree.
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
};

export const fonts: HeadlineFont[] = [
  { id: 'fraunces', name: 'Fraunces (soft, wonky)', note: 'Old-style serif with soft, slightly wonky letterforms. Warm and a bit playful.', family: "'Fraunces Variable'", weight: 400, vars: "'SOFT' 100, 'WONK' 1, 'opsz' 144", tracking: '-0.035em', lh: 0.9 },
  { id: 'instrument', name: 'Instrument Serif', note: 'Condensed, editorial serif. Feels like a magazine cover.', family: "'Instrument Serif'", weight: 400, tracking: '-0.02em', lh: 0.88 },
  { id: 'instrument-italic', name: 'Instrument Serif Italic', note: 'The italic cut. Loose, handwritten-ish energy.', family: "'Instrument Serif'", weight: 400, style: 'italic', tracking: '-0.02em', lh: 0.9 },
  { id: 'gloock', name: 'Gloock', note: 'High-contrast display serif with chunky, sculpted serifs.', family: "'Gloock'", weight: 400, tracking: '-0.03em', lh: 0.92 },
  { id: 'dm-serif-italic', name: 'DM Serif Display Italic', note: 'Classic fashion-mag italic. Elegant with some swagger.', family: "'DM Serif Display'", weight: 400, style: 'italic', tracking: '-0.03em', lh: 0.92 },
  { id: 'playfair-italic', name: 'Playfair Display Italic', note: 'Sharp, high-contrast italic. Very ad-agency-in-the-80s.', family: "'Playfair Display Variable'", weight: 500, style: 'italic', tracking: '-0.03em', lh: 0.92 },
  { id: 'young-serif', name: 'Young Serif', note: 'Heavy 70s serif. Friendly, a bit retro, very confident.', family: "'Young Serif'", weight: 400, tracking: '-0.04em', lh: 0.95 },
  { id: 'italiana', name: 'Italiana', note: 'Thin, elegant Didone. Quiet luxury; best at very large sizes.', family: "'Italiana'", weight: 400, tracking: '-0.01em', lh: 1 },
  { id: 'syne', name: 'Syne ExtraBold', note: 'Quirky wide grotesk from an art centre. Odd curves, lots of character.', family: "'Syne Variable'", weight: 800, tracking: '-0.045em', lh: 0.9, scale: 0.68 },
  { id: 'bricolage', name: 'Bricolage Grotesque', note: 'Ink-trapped, condensed grotesk with a hand-made feel.', family: "'Bricolage Grotesque Variable'", weight: 800, vars: "'wdth' 75, 'opsz' 96", tracking: '-0.04em', lh: 0.86 },
  { id: 'unbounded', name: 'Unbounded', note: 'Round, wide and geometric. Bold and techy.', family: "'Unbounded Variable'", weight: 600, tracking: '-0.05em', lh: 0.95, scale: 0.82 },
  { id: 'anybody', name: 'Anybody Expanded', note: 'Super-wide grotesk. Loud, poster-like.', family: "'Anybody Variable'", weight: 800, vars: "'wdth' 150", tracking: '-0.04em', lh: 0.92, scale: 0.66 },
  { id: 'big-shoulders', name: 'Big Shoulders Display', note: 'Tall, condensed Chicago-signage type. Punchy.', family: "'Big Shoulders Display Variable'", weight: 800, tracking: '-0.01em', lh: 0.84 },
  { id: 'climate-crisis', name: 'Climate Crisis', note: 'Ultra-heavy, blobby display. A real statement.', family: "'Climate Crisis Variable'", weight: 400, vars: "'YEAR' 1979", tracking: '-0.02em', lh: 0.9, scale: 0.78 },
];

/** Global CSS: [data-font="<id>"] sets the headline variables for everything inside it. */
export const fontCss = fonts
  .map(
    (f) =>
      `[data-font="${f.id}"],html.theme-night[data-font="${f.id}"]{--display:${f.family},'Figtree Variable',sans-serif;--hd-weight:${f.weight ?? 400};--hd-style:${f.style ?? 'normal'};--hd-vars:${f.vars ?? 'normal'};--display-tracking:${f.tracking ?? '-0.02em'};--hd-lh:${f.lh ?? 0.9};--hd-scale:${f.scale ?? 1}}`,
  )
  .join('\n');
