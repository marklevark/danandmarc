# danandmarc

Portfolio site for Dan Cantelon & Marc Levesque ([danandmarc.ca](https://danandmarc.ca)). Static Astro build served by nginx in Docker. It replaces the old Squarespace site.

## Develop

```sh
npm install
npm run dev        # http://localhost:4321
npm run build      # -> dist/
```

## Content

Everything is plain files. There's no CMS.

| What | Where |
|---|---|
| Projects | `src/content/work/<slug>.yaml` (the filename is the URL slug) |
| Project images | `src/assets/work/<slug>/` |
| Awards page | `src/data/awards.yaml` |
| Names, emails, LinkedIn, nav, client list | `src/data/site.ts` |
| Contact page copy | `src/pages/contact.astro` |

### Project file

```yaml
title: Top Comic
order: 8                 # position in the home grid
cover: ../../assets/work/top-comic/cover.jpg
coverLoop: ../../assets/work/top-comic/cover.mp4   # optional, autoplaying loop on the card
agency: Taxi
client: SiriusXM
role: Associate Creative Directors                  # optional
draft: false             # true hides it in production builds
awards:
  - show: Cannes
    result: 1 x Shortlist
press: Adweek, Strategy, ...
blocks:                  # rendered top to bottom
  - heading: Year 1        # level: 2 (section), 3 (sub), 4 (small label)
    level: 3
  - text: |-
      Paragraph one.

      Paragraph two with a [link](https://example.com).
  - credits: { agency: BBDO, client: TJFF }   # for pages with several campaigns
  - images:                # 1 = full width; grids pick columns by count and shape
      - src: ../../assets/work/top-comic/a.jpg
        alt: Optional alt text
      - src: ../../assets/work/top-comic/b-poster.jpg
        loop: ../../assets/work/top-comic/b.mp4   # GIF replacement
  - videos:
      - { provider: vimeo, id: '301642758', title: Dick's Pizza }
```

Images are resized to responsive WebP at build time, so you can drop in full-size originals. Convert GIFs to MP4 first, which is roughly a 10× size cut:

```sh
ffmpeg -i in.gif -movflags +faststart -pix_fmt yuv420p \
  -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" -c:v libx264 -crf 20 -an out.mp4
ffmpeg -i in.gif -vframes 1 out-poster.jpg
```

## Deploy (Unraid / any Docker host)

```sh
docker compose up -d --build     # serves on :8484 (override: DM_PORT=9000 docker compose up -d)
```

Point your reverse proxy (NPM, SWAG, Traefik, Caddy) at `http://<host>:8484`. TLS is terminated at the proxy. `/healthz` returns 200.

`deploy/nginx.conf` 301-redirects the old Squarespace URLs (`/work/unignorable-29ejk`, `/contact-1`, etc.) to the new paths and strips trailing slashes. Hashed assets under `/_astro/` are cached as immutable.

To update the site, edit content, commit, then `docker compose up -d --build`.
