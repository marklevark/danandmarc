#!/bin/sh
# Download every Vimeo video the site uses, plus a poster image for each.
#
# Run on Unraid (needs only Docker):
#   cd /mnt/cache/appdata/danandmarc
#   docker run --rm -v "$PWD":/site -v /mnt/cache/appdata/danandmarc-media:/media \
#     python:3.12-alpine sh /site/scripts/download-vimeo.sh
#
# Output: /mnt/cache/appdata/danandmarc-media/<project>/<vimeo-id>.mp4 (+ .jpg poster)
# Re-running skips anything already downloaded.
set -eu

LIST=/site/scripts/vimeo-videos.txt
OUT=/media

if ! command -v ffmpeg >/dev/null; then
  echo "Installing ffmpeg + yt-dlp..."
  apk add --no-cache ffmpeg >/dev/null
  pip install --quiet --root-user-action=ignore -U "yt-dlp[default]"
fi

ok=0; fail=0; failed=""
while read -r slug id; do
  case "$slug" in ''|\#*) continue ;; esac
  mkdir -p "$OUT/$slug"
  echo "==> $slug / $id"
  # Use the embed player URL (what the site uses) with danandmarc.ca as referer:
  # embed-only / domain-locked videos refuse vimeo.com/<id> but play here.
  if yt-dlp \
      --referer "https://danandmarc.ca/" \
      -f "bv*[ext=mp4]+ba[ext=m4a]/bv*+ba/b" --merge-output-format mp4 \
      --write-thumbnail --convert-thumbnails jpg \
      --no-overwrites --continue --no-progress \
      -o "$OUT/$slug/$id.%(ext)s" \
      "https://player.vimeo.com/video/$id" 2>&1 | tee /tmp/last.log; [ -f "$OUT/$slug/$id.mp4" ]; then
    ok=$((ok + 1))
  else
    fail=$((fail + 1)); failed="$failed $slug/$id"
  fi
done < "$LIST"

echo
yt-dlp --version | sed 's/^/yt-dlp /'
echo "Done: $ok downloaded, $fail failed."
[ -n "$failed" ] && echo "Failed:$failed" && echo "(Private or agency-owned videos: download from the owner's Vimeo account instead.)"
chmod -R a+rX "$OUT"
