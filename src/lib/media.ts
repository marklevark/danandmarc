/**
 * MP4 loops live next to images in src/assets so content stays in one place.
 * YAML references them relative to src/content/work, e.g. ../../assets/work/x/y.mp4
 */
const loops = import.meta.glob<string>('/src/assets/**/*.{mp4,webm}', {
  query: '?url',
  import: 'default',
  eager: true,
});

export function loopUrl(path?: string): string | undefined {
  if (!path) return undefined;
  const key = '/src/' + path.replace(/^(\.\.\/)+/, '');
  const url = loops[key];
  if (!url) throw new Error(`Loop video not found: ${path} (looked for ${key})`);
  return url;
}
