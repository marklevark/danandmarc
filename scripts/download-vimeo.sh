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
  pip install --quiet --root-user-action=ignore yt-dlp
fi

ok=0; fail=0; failed=""
while read -r slug id; do
  case "$slug" in ''|\#*) continue ;; esac
  mkdir -p "$OUT/$slug"
  echo "==> $slug / $id"
  # Referer: some embeds only play on danandmarc.ca
  if yt-dlp \
      --referer "https://danandmarc.ca/" \
      -f "bv*[ext=mp4]+ba[ext=m4a]/bv*+ba/b" --merge-output-format mp4 \
      --write-thumbnail --convert-thumbnails jpg \
      --no-overwrites --continue --no-progress \
      -o "$OUT/$slug/$id.%(ext)s" \
      "https://vimeo.com/$id"; then
    ok=$((ok + 1))
  else
    fail=$((fail + 1)); failed="$failed $slug/$id"
  fi
done < "$LIST"

echo
echo "Done: $ok downloaded, $fail failed."
[ -n "$failed" ] && echo "Failed:$failed" && echo "(Private or agency-owned videos: download from the owner's Vimeo account instead.)"
chmod -R a+rX "$OUT"
