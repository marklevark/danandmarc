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
import '@fontsource/abril-fatface/400.css';
import '@fontsource/rozha-one/400.css';
import '@fontsource/corben/700.css';
import '@fontsource/ultra/400.css';
import '@fontsource/linden-hill/400-italic.css';
import '@fontsource-variable/fraunces/full-italic.css';
import '@fontsource/playfair-display/400.css';
import '@fontsource/playfair-display/900-italic.css';
import '@fontsource-variable/noto-serif-display';
import '@fontsource-variable/noto-serif-display/wght-italic.css';
import '@fontsource-variable/libre-bodoni';
import '@fontsource-variable/libre-bodoni/wght-italic.css';
import '@fontsource/prata/400.css';
import '@fontsource/vidaloka/400.css';
import '@fontsource/gilda-display/400.css';
import '@fontsource/yeseva-one/400.css';
import '@fontsource/chonburi/400.css';
import '@fontsource-variable/hahmlet';
import '@fontsource/rufina/400.css';
import '@fontsource/rufina/700.css';
import '@fontsource/kaisei-tokumin/400.css';
import '@fontsource/kaisei-tokumin/800.css';
import '@fontsource-variable/grenze-gotisch';
import '@fontsource/shrikhand/400.css';
import '@fontsource-variable/epilogue';
import '@fontsource/pirata-one/400.css';
import '@fontsource/im-fell-english/400.css';
import '@fontsource/im-fell-english/400-italic.css';


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
  /** Served by the Fontshare API (ITF Free Font License: free for commercial web use; files must not be redistributed, so they are not committed). Value: '<slug>@<weights>' (401/701 = italics). */
  fontshare?: string;
};

export const fonts: HeadlineFont[] = [
  // ---------- Fontshare (Indian Type Foundry, free for commercial use; loaded from their API)
  { group: 'fontshare', id: 'zodiak', name: 'Zodiak', note: 'Sharp, high-contrast serif with wedge serifs. The closest free thing to Swear Display.', family: "'Zodiak'", weight: 400, tracking: '-0.03em', lh: 0.92, fontshare: 'zodiak@400,401,700,701' },
  { group: 'fontshare', id: 'zodiak-bold', name: 'Zodiak Bold', note: 'Zodiak at full weight: chunky, sculpted and confident.', family: "'Zodiak'", weight: 700, tracking: '-0.035em', lh: 0.9, fontshare: 'zodiak@400,401,700,701' },
  { group: 'fontshare', id: 'boska', name: 'Boska', note: 'Expressive, calligraphic serif. The italic has real flourish.', family: "'Boska'", weight: 400, tracking: '-0.025em', lh: 0.92, fontshare: 'boska@400,401,700,701' },
  { group: 'fontshare', id: 'melodrama', name: 'Melodrama', note: 'Tall, condensed display serif. Theatrical, fashion-masthead energy.', family: "'Melodrama'", weight: 500, tracking: '-0.01em', lh: 0.86, scale: 1.12, fontshare: 'melodrama@500,700' },
  { group: 'fontshare', id: 'gambetta', name: 'Gambetta', note: 'Contemporary serif with crisp, slightly quirky details. Editorial and warm.', family: "'Gambetta'", weight: 400, tracking: '-0.03em', lh: 0.92, fontshare: 'gambetta@400,401,600,701' },
  { group: 'fontshare', id: 'erode', name: 'Erode', note: 'Robust, sharp-edged serif. Feels like a modern newspaper with attitude.', family: "'Erode'", weight: 400, tracking: '-0.025em', lh: 0.94, fontshare: 'erode@400,401,600,701' },
  { group: 'fontshare', id: 'sentient', name: 'Sentient', note: 'Calm, bookish serif with soft contrast. Thoughtful and grown-up.', family: "'Sentient'", weight: 400, tracking: '-0.025em', lh: 0.94, fontshare: 'sentient@400,401,700,701' },
  { group: 'fontshare', id: 'bespoke-serif', name: 'Bespoke Serif ExtraBold', note: 'Heavy, high-contrast serif. Very poster-ready.', family: "'Bespoke Serif'", weight: 800, tracking: '-0.035em', lh: 0.9, fontshare: 'bespoke-serif@400,401,800,701' },
  { group: 'fontshare', id: 'recia', name: 'Recia', note: 'Elegant transitional serif with sharp terminals. Refined, a touch luxurious.', family: "'Recia'", weight: 400, tracking: '-0.025em', lh: 0.93, fontshare: 'recia@400,401,600,701' },
  { group: 'fontshare', id: 'rowan', name: 'Rowan', note: 'Soft-edged serif with gentle curves. Friendly and quietly characterful.', family: "'Rowan'", weight: 400, tracking: '-0.025em', lh: 0.93, fontshare: 'rowan@400,401,600,701' },
  { group: 'fontshare', id: 'clash-display', name: 'Clash Display', note: 'Sharp, slightly condensed grotesk with sliced curves. Bold and very current.', family: "'Clash Display'", weight: 600, tracking: '-0.03em', lh: 0.88, fontshare: 'clash-display@600' },
  { group: 'fontshare', id: 'cabinet-grotesk', name: 'Cabinet Grotesk ExtraBold', note: 'Chunky, quirky grotesk with personality in every curve.', family: "'Cabinet Grotesk'", weight: 800, tracking: '-0.035em', lh: 0.88, fontshare: 'cabinet-grotesk@800' },
  { group: 'fontshare', id: 'chillax', name: 'Chillax', note: 'Rounded, relaxed geometric sans. Laid-back and friendly.', family: "'Chillax'", weight: 600, tracking: '-0.03em', lh: 0.9, fontshare: 'chillax@600' },
  { group: 'fontshare', id: 'panchang', name: 'Panchang Bold', note: 'Extra-wide sans. Loud and graphic, a statement at any size.', family: "'Panchang'", weight: 700, tracking: '-0.03em', lh: 0.95, scale: 0.6, fontshare: 'panchang@700' },
  // ---------- more Google Fonts
  { group: 'more', id: 'shrikhand', name: 'Shrikhand', note: 'A fat, upright-italic display face with retro swing. Very fun, very loud.', family: "'Shrikhand'", weight: 400, tracking: '-0.01em', lh: 0.98, scale: 0.85 },
  { group: 'more', id: 'epilogue', name: 'Epilogue ExtraBold', note: 'Sturdy, slightly quirky grotesk with tight curves. Confident and clean.', family: "'Epilogue Variable'", weight: 800, tracking: '-0.04em', lh: 0.88 },
  // ---------- blackletter / antique (after spencerandjordan.com: Gothicus Roman + BlackBeard)
  { group: 'gothic', id: 'grenze-gotisch', name: 'Grenze Gotisch', note: 'Readable blackletter: gothic capitals and sharp, broken curves. The closest free match to Gothicus Roman (the Spencer & Jordan logo font).', family: "'Grenze Gotisch Variable'", weight: 600, tracking: '-0.01em', lh: 0.9 },
  { group: 'gothic', id: 'grenze-gotisch-light', name: 'Grenze Gotisch Light', note: 'The same blackletter at a lighter weight. More elegant, less heavy-metal.', family: "'Grenze Gotisch Variable'", weight: 350, tracking: '-0.01em', lh: 0.9 },
  { group: 'gothic', id: 'pirata', name: 'Pirata One', note: 'Blackletter with a rougher, cut-paper feel. Bolder and more graphic.', family: "'Pirata One'", weight: 400, tracking: '0em', lh: 0.92, scale: 1.05 },
  { group: 'gothic', id: 'im-fell', name: 'IM Fell English', note: 'A digitized 1600s book typeface with ink-spread roughness, like BlackBeard (Spencer & Jordan’s body/awards font).', family: "'IM Fell English'", weight: 400, tracking: '-0.02em', lh: 0.95 },
  { group: 'gothic', id: 'im-fell-italic', name: 'IM Fell English Italic', note: 'The real italic, closest to the slanted awards list on spencerandjordan.com. Antique and charming.', family: "'IM Fell English'", weight: 400, style: 'italic', tracking: '-0.02em', lh: 0.95 },
  // ---------- round 3: Swear Display-style (sharp, high-contrast)
  { group: 'swear', id: 'fraunces-sharp', name: 'Fraunces Sharp', note: 'Fraunces with its soft/wonky options switched off: sharp wedge serifs and high contrast, close to Swear Display.', family: "'Fraunces Variable'", weight: 400, vars: "'opsz' 144, 'SOFT' 0, 'WONK' 0", tracking: '-0.03em', lh: 0.92 },
  { group: 'swear', id: 'playfair-swear', name: 'Playfair Display', note: 'High-contrast, sharp display serif. Close to Swear’s regular weight.', family: "'Playfair Display'", weight: 400, tracking: '-0.02em', lh: 0.95 },
  { group: 'swear', id: 'noto-display', name: 'Noto Serif Display', note: 'Crisp, high-contrast display serif with a true heavy italic. Clean and sharp.', family: "'Noto Serif Display Variable'", weight: 400, tracking: '-0.025em', lh: 0.95 },
  { group: 'swear', id: 'libre-bodoni', name: 'Libre Bodoni', note: 'A sturdier Bodoni with real italics; more readable than fashion Didones.', family: "'Libre Bodoni Variable'", weight: 400, tracking: '-0.03em', lh: 0.95 },
  { group: 'swear', id: 'prata', name: 'Prata', note: 'Sharp, high-contrast Didone with wedge serifs and teardrop terminals. Close to Swear’s regular weight.', family: "'Prata'", weight: 400, tracking: '-0.03em', lh: 0.95 },
  { group: 'swear', id: 'gilda', name: 'Gilda Display', note: 'Light, airy high-contrast serif. Swear’s elegance at the thinner end.', family: "'Gilda Display'", weight: 400, tracking: '-0.02em', lh: 0.95 },
  { group: 'swear', id: 'vidaloka', name: 'Vidaloka', note: 'Bold, punchy Didone with sharp serifs. Like Swear’s bolder weights.', family: "'Vidaloka'", weight: 400, tracking: '-0.03em', lh: 0.95 },
  { group: 'swear', id: 'kaisei', name: 'Kaisei Tokumin', note: 'Wide, high-contrast serif with tapered strokes. Calm and stylish.', family: "'Kaisei Tokumin'", weight: 400, tracking: '-0.03em', lh: 0.95, scale: 0.92 },
  { group: 'swear', id: 'hahmlet', name: 'Hahmlet', note: 'Variable serif with sharp wedges and a crisp, contemporary feel.', family: "'Hahmlet Variable'", weight: 400, tracking: '-0.03em', lh: 0.95 },
  { group: 'swear', id: 'rufina', name: 'Rufina', note: 'Calligraphic high-contrast serif with flared, sharp details.', family: "'Rufina'", weight: 400, tracking: '-0.025em', lh: 0.95 },
  { group: 'swear', id: 'yeseva', name: 'Yeseva One', note: 'Heavy, curvy high-contrast serif with a feminine flourish. Like Swear Black.', family: "'Yeseva One'", weight: 400, tracking: '-0.02em', lh: 0.98 },
  { group: 'swear', id: 'chonburi', name: 'Chonburi', note: 'Chunky, high-contrast display serif with sharp spurs. Loud and stylish.', family: "'Chonburi'", weight: 400, tracking: '-0.03em', lh: 0.98, scale: 0.9 },
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

// ------------------------------------------------------------------
// Body fonts + serif/sans pairings (see /pairings).
// Try a body font across the site with ?body=<id>; ?body=none goes back to Figtree.
// ------------------------------------------------------------------
import '@fontsource-variable/inter';
import '@fontsource-variable/geist';
import '@fontsource-variable/instrument-sans';
import '@fontsource-variable/hanken-grotesk';
import '@fontsource-variable/dm-sans';
import '@fontsource-variable/manrope';
import '@fontsource-variable/space-grotesk';
import '@fontsource-variable/ibm-plex-sans';
import '@fontsource-variable/schibsted-grotesk';
import '@fontsource-variable/onest';
import '@fontsource/hedvig-letters-sans/400.css';

export type BodyFont = { id: string; name: string; family: string; weight?: number; tracking?: string };
export const bodyFonts: BodyFont[] = [
  { id: 'figtree', name: 'Figtree', family: "'Figtree Variable'", weight: 500, tracking: '-0.01em' },
  { id: 'inter', name: 'Inter', family: "'Inter Variable'", weight: 400, tracking: '-0.011em' },
  { id: 'geist', name: 'Geist', family: "'Geist Variable'", weight: 400, tracking: '-0.01em' },
  { id: 'instrument-sans', name: 'Instrument Sans', family: "'Instrument Sans Variable'", weight: 400, tracking: '0em' },
  { id: 'hanken', name: 'Hanken Grotesk', family: "'Hanken Grotesk Variable'", weight: 400, tracking: '0em' },
  { id: 'dm-sans', name: 'DM Sans', family: "'DM Sans Variable'", weight: 400, tracking: '-0.01em' },
  { id: 'manrope', name: 'Manrope', family: "'Manrope Variable'", weight: 500, tracking: '-0.01em' },
  { id: 'space-grotesk', name: 'Space Grotesk', family: "'Space Grotesk Variable'", weight: 400, tracking: '-0.01em' },
  { id: 'plex', name: 'IBM Plex Sans', family: "'IBM Plex Sans Variable'", weight: 400, tracking: '0em' },
  { id: 'schibsted', name: 'Schibsted Grotesk', family: "'Schibsted Grotesk Variable'", weight: 400, tracking: '-0.005em' },
  { id: 'onest', name: 'Onest', family: "'Onest Variable'", weight: 400, tracking: '-0.01em' },
  { id: 'hedvig-sans', name: 'Hedvig Letters Sans', family: "'Hedvig Letters Sans'", weight: 400, tracking: '0em' },
];
export const bodyCss = bodyFonts
  .map((b) => `[data-body="${b.id}"],html.theme-night[data-body="${b.id}"]{--text:${b.family},'Figtree Variable',sans-serif;--body-weight:${b.weight ?? 400};--text-tracking:${b.tracking ?? '0em'}}`)
  .join('\n');

export type Pairing = { head: string; body: string; why: string };
export const pairings: Pairing[] = [
  { head: 'hedvig', body: 'hedvig-sans', why: 'Designed as a family: the sans shares the serif’s chiselled details, so it feels fully custom.' },
  { head: 'kalnia', body: 'instrument-sans', why: 'Kalnia’s drama, balanced by a calm, slightly narrow sans. Very contemporary studio.' },
  { head: 'imbue', body: 'inter', why: 'Tall fashion masthead + the most neutral, readable sans there is. Let the headline do the talking.' },
  { head: 'instrument', body: 'instrument-sans', why: 'Another matched pair. Editorial serif, clean sans with the same DNA. Magazine-like.' },
  { head: 'bodoni-moda', body: 'dm-sans', why: 'Classic fashion contrast: hairline Didone over a geometric sans.' },
  { head: 'newsreader-italic', body: 'geist', why: 'Warm literary italic with a crisp, modern techy sans. Thoughtful and current.' },
  { head: 'cormorant', body: 'manrope', why: 'Delicate Garamond with a friendly, slightly rounded sans. Elegant but approachable.' },
  { head: 'libre-caslon', body: 'plex', why: 'Bookish Caslon over IBM Plex’s engineered details. Smart and a little nerdy.' },
  { head: 'fraunces', body: 'space-grotesk', why: 'Soft, wonky serif with a quirky grotesk. Playful on both levels.' },
  { head: 'playfair-2', body: 'schibsted', why: 'Needle-sharp condensed serif over a sturdy newspaper grotesk. Confident and newsy.' },
  { head: 'young-serif', body: 'onest', why: 'Chunky 70s serif with a soft, round sans. Warm and full of personality.' },
  { head: 'fraunces-sharp', body: 'hanken', why: 'Swear-style sharp serif with a black-italic kick, over a quiet, even grotesk.' },
];

/** Fontshare stylesheet URL for a font (the API serves one family per request). */
export const fontshareUrl = (spec: string) => `https://api.fontshare.com/v2/css?f[]=${spec}&display=swap`;
/** id -> stylesheet URL, for fonts that load from Fontshare. */
export const fontshareMap: Record<string, string> = Object.fromEntries(
  fonts.filter((f) => f.fontshare).map((f) => [f.id, fontshareUrl(f.fontshare!)]),
);
