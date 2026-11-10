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

## Deploy (Unraid)

### Live mode (recommended)

The repo is cloned to `/mnt/cache/appdata/danandmarc`. Run `deploy/docker-compose.live.yml` as a stack, in Dockhand or with `docker compose -f deploy/docker-compose.live.yml up -d`. It starts two containers:

- **danandmarc-builder** (`node:22-alpine`) watches the folder and rebuilds into `dist/` a few seconds after any change. It also runs `git pull` every 60s, so pushes to `main` go live on their own.
- **danandmarc** (`nginx`) serves `dist/` on port 8484.

To change the site, edit files in the appdata folder (SMB share, VS Code, etc.) or push to GitHub. Watch progress with `docker logs -f danandmarc-builder`. A broken edit logs the error and leaves the live site as it was.

If you edit files on Unraid without committing them, `git pull` skips any file you've changed locally (it says so in the log). Pick one place to make changes, or commit your local edits.

### Video

Videos are self-hosted. MP4s and poster JPGs live **outside the repo** in `/mnt/cache/appdata/danandmarc-media/<project>/<id>.mp4` (+ `<id>.jpg`), mounted into nginx at `/media`. In a project file:

```yaml
- videos:
    - { provider: file, id: '262821181', title: Keith }   # -> /media/top-comic/262821181.mp4
    - { provider: vimeo, id: '262821181' }                 # or embed from Vimeo instead
```

`scripts/download-vimeo.sh` pulls the Vimeo versions of every video listed in `scripts/vimeo-videos.txt`.

### Image mode

`docker compose up -d --build` from the repo root builds a self-contained image (Dockerfile) and serves it on `:8484` (override with `DM_PORT=9000`). Changes need a rebuild.

### Both modes

Point your reverse proxy (NPM, SWAG, Traefik, Caddy) at `http://<host>:8484`. TLS is terminated at the proxy. `/healthz` returns 200.

`deploy/nginx.conf` 301-redirects the old Squarespace URLs (`/work/unignorable-29ejk`, `/contact-1`, etc.) to the new paths and strips trailing slashes. HTML is served `no-cache`, so edits show on refresh. Hashed assets under `/_astro/` are cached as immutable.
