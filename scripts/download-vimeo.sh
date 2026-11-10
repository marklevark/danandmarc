#!/bin/sh
# Download every Vimeo video the site uses, plus a poster image for each.
#
# Run on Unraid (needs only Docker):
#   cd /mnt/cache/appdata/danandmarc
#   docker run --rm -v "$PWD":/site -v /mnt/cache/appdata/danandmarc-media:/media \
#     python:3.12-slim sh /site/scripts/download-vimeo.sh
#
# Output: /mnt/cache/appdata/danandmarc-media/<project>/<vimeo-id>.mp4 (+ .jpg poster)
# Re-running skips anything already downloaded.
set -eu

LIST=/site/scripts/vimeo-videos.txt
OUT=/media

if ! command -v ffmpeg >/dev/null; then
  echo "Installing ffmpeg + yt-dlp..."
  if command -v apk >/dev/null; then apk add --no-cache ffmpeg >/dev/null
  else apt-get update -qq >/dev/null && apt-get install -y -qq ffmpeg >/dev/null; fi
  # curl-cffi lets yt-dlp present itself as a real browser (Vimeo blocks some plain clients)
  pip install --quiet --root-user-action=ignore -U "yt-dlp[default,curl-cffi]"
fi

ok=0; fail=0; failed=""
while read -r slug id; do
  case "$slug" in ''|\#*) continue ;; esac
  mkdir -p "$OUT/$slug"
  if [ -f "$OUT/$slug/$id.mp4" ]; then ok=$((ok + 1)); continue; fi
  echo "==> $slug / $id"
  # Embed player URL (what the site uses). Domain-locked videos only play when the
  # request looks like it came from an allowed site, so try a few referers.
  for ref in https://danandmarc.ca/ https://www.danandmarc.ca/ https://danandmarc.squarespace.com/ ""; do
    yt-dlp \
      ${ref:+--referer "$ref"} \
      --impersonate chrome \
      -f "bv*[ext=mp4]+ba[ext=m4a]/bv*+ba/b" --merge-output-format mp4 \
      --write-thumbnail --convert-thumbnails jpg \
      --no-overwrites --continue --no-progress --no-warnings \
      -o "$OUT/$slug/$id.%(ext)s" \
      "https://player.vimeo.com/video/$id" 2>&1 | grep -E "ERROR|Merging|Destination" || true
    [ -f "$OUT/$slug/$id.mp4" ] && break
    echo "    (no luck with referer: ${ref:-none})"
  done
  if [ -f "$OUT/$slug/$id.mp4" ]; then ok=$((ok + 1)); else fail=$((fail + 1)); failed="$failed $slug/$id"; fi
done < "$LIST"

echo
yt-dlp --version | sed 's/^/yt-dlp /'
echo "Done: $ok downloaded, $fail failed."
if [ -n "$failed" ]; then
  echo "Failed:$failed"
  echo "(Locked by the video's owner: download from that Vimeo account instead.)"
fi
chmod -R a+rX "$OUT"
