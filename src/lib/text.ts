const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Plain text with blank-line paragraphs, single-line breaks, and [label](url) links. */
export function paragraphs(text: string): string[] {
  return text
    .trim()
    .split(/\n{2,}/)
    .map((p) =>
      esc(p.trim())
        .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+|mailto:[^)\s]+|\/[^)\s]*)\)/g, (_, label, href) => {
          const ext = /^https?:/.test(href);
          return `<a href="${href}"${ext ? ' rel="noopener" target="_blank"' : ''}>${label}</a>`;
        })
        .replace(/\n/g, '<br>'),
    );
}
