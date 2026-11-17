#!/bin/sh
# Make a still (poster) for every self-hosted video that doesn't have one yet.
# Grabs the frame 2s in (or the first frame for very short clips) at full size, saved next to the
# video as <id>.jpg, which is what the site shows before Play is pressed.
#
# Run on Unraid (no install needed):
#   docker run --rm -v /mnt/cache/appdata/danandmarc-media:/media -v /mnt/cache/appdata/danandmarc/scripts:/s \
#     alpine sh /s/make-posters.sh
# Add FORCE=1 (docker run -e FORCE=1 ...) to redo every poster.
set -eu
DIR=${MEDIA:-/media}
command -v ffmpeg >/dev/null || apk add --no-cache ffmpeg >/dev/null
made=0; kept=0
for mp4 in "$DIR"/*/*.mp4; do
  [ -e "$mp4" ] || continue
  jpg="${mp4%.mp4}.jpg"
  if [ -s "$jpg" ] && [ "${FORCE:-0}" != 1 ]; then kept=$((kept + 1)); continue; fi
  if ! ffmpeg -nostdin -loglevel error -y -ss 2 -i "$mp4" -frames:v 1 -q:v 3 "$jpg" || [ ! -s "$jpg" ]; then
    ffmpeg -nostdin -loglevel error -y -i "$mp4" -frames:v 1 -q:v 3 "$jpg"
  fi
  echo "made ${jpg#$DIR/}"; made=$((made + 1))
done
chmod -R a+rX "$DIR"
echo "Done: $made made, $kept already had one."
