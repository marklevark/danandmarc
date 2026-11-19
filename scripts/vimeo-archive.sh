#!/bin/sh
# Archive EVERY video on your Vimeo account (public, unlisted and private) at original quality,
# so the account can be emptied or closed. Uses the Vimeo API with your own access token.
#
# 1. Make a token: developer.vimeo.com/apps -> Create an app -> Generate an access token,
#    "Authenticated (you)", scopes: Public, Private, Video Files.
# 2. Run on Unraid (no install needed):
#      docker run --rm -e VIMEO_TOKEN=xxxxxxxx \
#        -v /mnt/cache/appdata/danandmarc-media:/media \
#        -v /mnt/cache/appdata/danandmarc/scripts:/s \
#        python:3.12-slim sh /s/vimeo-archive.sh
#
# If Vimeo won't hand over the file (plans without download access, or downloads switched off),
# the script falls back to yt-dlp, which saves the best streaming version (usually 1080p).
# Private videos also need your logged-in Vimeo cookies: export them from your browser
# (e.g. the "Get cookies.txt LOCALLY" extension) and save as scripts/vimeo-cookies.txt.
# Delete that file afterwards; it is ignored by git.
# REFETCH=1 (docker run -e REFETCH=1 ...) re-downloads everything that came via yt-dlp, e.g. to swap
# streaming copies for originals once cookies are in place; the old copy is kept if that fails.
#
# Output: /mnt/cache/appdata/danandmarc-media/vimeo-archive/
#   <id> - <title>.<ext>   the original upload (or the best rendition if no original is offered)
#   <id> - <title>.jpg     the largest thumbnail
#   <id>.json              Vimeo's details for that video (title, description, date, link, ...)
#   manifest.tsv           one line per video: id, title, file, bytes, status
# Safe to re-run: finished files are skipped, half-finished ones resume.
set -eu
: "${VIMEO_TOKEN:?Set VIMEO_TOKEN (see the top of this script)}"
OUT=${OUT:-/media/vimeo-archive}
if ! command -v jq >/dev/null || ! command -v curl >/dev/null || ! command -v ffmpeg >/dev/null; then
  echo "Installing curl, jq, ffmpeg..."
  if command -v apk >/dev/null; then apk add --no-cache curl jq ffmpeg >/dev/null
  else export DEBIAN_FRONTEND=noninteractive; apt-get update -qq >/dev/null && apt-get install -y -qq curl jq ffmpeg >/dev/null 2>&1; fi
fi
if ! command -v yt-dlp >/dev/null && command -v pip >/dev/null; then
  echo "Installing yt-dlp..."
  pip install --quiet --root-user-action=ignore -U "yt-dlp[default,curl-cffi]" || true
fi
COOKIES=""
for c in /s/vimeo-cookies.txt "${VIMEO_COOKIES:-}"; do [ -n "$c" ] && [ -s "$c" ] && COOKIES="$c"; done
mkdir -p "$OUT"
API=${VIMEO_API:-https://api.vimeo.com}
auth="Authorization: bearer $VIMEO_TOKEN"
accept="Accept: application/vnd.vimeo.*+json;version=3.4"

who=$(curl -fsS -H "$auth" -H "$accept" "$API/me?fields=name,link") || { echo "Token rejected: check it and its scopes."; exit 1; }
echo "Vimeo account: $(echo "$who" | jq -r '.name + "  " + .link')"
scope=$(curl -fsS -H "$auth" -H "$accept" "$API/oauth/verify" | jq -r '.scope // ""' 2>/dev/null || true)
echo "Token scopes: ${scope:-unknown}"
case " $scope " in *" video_files "*) ;; *) echo "  (no video_files scope: originals can't be fetched, using streaming copies instead)";; esac
[ -n "$COOKIES" ] && echo "Using browser cookies for private videos: $COOKIES"

# fallback: yt-dlp grabs the best streaming version from the video page (link includes the unlisted hash)
ytdl() {  # $1 = video page link, $2 = id, $3 = output path without extension
  command -v yt-dlp >/dev/null || return 1
  # the vimeo.com page first, then the embed player with the referers these videos were embedded on
  # (many are locked to the old sites' domains)
  for try in "$1|" "https://player.vimeo.com/video/$2|https://danandmarc.ca/" "https://player.vimeo.com/video/$2|https://www.danandmarc.ca/" \
             "https://player.vimeo.com/video/$2|https://danandmarc.squarespace.com/" "https://player.vimeo.com/video/$2|https://vimeo.com/" \
             "https://player.vimeo.com/video/$2|"; do
    u=${try%%|*}; ref=${try#*|}
    yt-dlp ${COOKIES:+--cookies "$COOKIES"} --impersonate chrome ${ref:+--referer "$ref"} \
      -f "source/original/bv*+ba/b" --merge-output-format mp4 --no-overwrites --continue --no-progress --no-warnings \
      -o "$3.%(ext)s" "$u" >/dev/null 2>"$OUT/.ytdl.err" && ls "$3".* 2>/dev/null | grep -qv '\.\(jpg\|part\|ytdl\)$' && return 0
  done
  return 1
}

fields='uri,name,description,link,created_time,duration,width,height,privacy.view,download,files,pictures.sizes'
next="/me/videos?per_page=50&fields=$fields"
printf 'id\ttitle\tfile\tbytes\tstatus\n' > "$OUT/manifest.tsv"
n=0; ok=0; skip=0; fail=0

while [ -n "$next" ] && [ "$next" != null ]; do
  page=$(curl -fsS -H "$auth" -H "$accept" "$API$next")
  [ "$n" = 0 ] && echo "Videos on account: $(echo "$page" | jq -r .total)"
  next=$(echo "$page" | jq -r '.paging.next // empty')
  echo "$page" | jq -c '.data[]' > "$OUT/.page.jsonl"
  while IFS= read -r v; do
    n=$((n + 1))
    id=$(echo "$v" | jq -r '.uri | split("/") | last')
    title=$(echo "$v" | jq -r '.name // "untitled"' | tr '/\\:*?"<>|' '-' | tr -s ' ' | cut -c1-80 | sed 's/[ .]*$//')
    echo "$v" | jq . > "$OUT/$id.json"
    # best file: the original upload ("source") if offered, otherwise the biggest rendition
    pick=$(echo "$v" | jq -c '
      ([.download[]? | select(.quality == "source")] | first)
      // ([(.download // [])[], (.files // [])[] | select(.link != null and (.type // "video/mp4") != "hls")] | sort_by(.size // 0) | last)
      // empty')
    thumb=$(echo "$v" | jq -r '(.pictures.sizes // []) | sort_by(.width) | last | .link // empty')
    [ -n "$thumb" ] && [ ! -s "$OUT/$id - $title.jpg" ] && curl -fsSL -o "$OUT/$id - $title.jpg" "$thumb" || true
    if [ -z "$pick" ]; then
      view=$(echo "$v" | jq -r '.privacy.view // "?"')
      file=$(cd "$OUT" && ls "$id - $title".* 2>/dev/null | grep -v '\.\(jpg\|part\|ytdl\)$' | head -1 || true)
      if [ -n "$file" ] && [ ! -e "$OUT/$file.part" ] && [ "${REFETCH:-0}" != 1 ]; then
        echo "  [$n] $file  (already have it)"; skip=$((skip + 1)); st=kept
      elif { [ -n "$file" ] && mv "$OUT/$file" "$OUT/.$file.old"; } ; ytdl "$(echo "$v" | jq -r .link)" "$id" "$OUT/$id - $title"; then
        [ -n "$file" ] && rm -f "$OUT/.$file.old"
        file=$(cd "$OUT" && ls -t "$id - $title".* | grep -v '\.\(jpg\|part\|ytdl\)$' | head -1)
        echo "  [$n] $file  (via yt-dlp, $(( $(wc -c < "$OUT/$file") / 1048576 )) MB)"; ok=$((ok + 1)); st=yt-dlp
      else
        echo "  [$n] $id  $title  -> COULDN'T DOWNLOAD (privacy: $view)$( [ -z "$COOKIES" ] && [ "$view" != anybody ] && echo '  needs cookies, see top of script')"
        tail -1 "$OUT/.ytdl.err" 2>/dev/null | sed 's/^/      /'
        [ -n "$file" ] && [ -e "$OUT/.$file.old" ] && mv "$OUT/.$file.old" "$OUT/$file" && echo "      (kept the copy you already had)"
        fail=$((fail + 1)); st=failed; file=""
      fi
      printf '%s\t%s\t%s\t\t%s\n' "$id" "$title" "$file" "$st" >> "$OUT/manifest.tsv"; continue
    fi
    url=$(echo "$pick" | jq -r .link)
    size=$(echo "$pick" | jq -r '.size // 0')
    ext=$(echo "$url" | sed 's/[?#].*//; s/.*\.//' | tr 'A-Z' 'a-z')
    case "$ext" in mp4|mov|m4v|mkv|webm|avi|mxf|prores) ;; *) ext=mp4 ;; esac
    file="$id - $title.$ext"
    have=$( [ -f "$OUT/$file" ] && wc -c < "$OUT/$file" | tr -d ' ' || echo 0)
    if [ "$size" != 0 ] && [ "$have" = "$size" ]; then
      echo "  [$n] $file  (already have it)"; skip=$((skip + 1)); st=kept
    else
      echo "  [$n] $file  ($(( size / 1048576 )) MB)"
      if curl -fL --progress-bar --retry 3 -C - -o "$OUT/$file" "$url"; then ok=$((ok + 1)); st=downloaded
      else echo "      download failed"; fail=$((fail + 1)); st=failed; fi
    fi
    printf '%s\t%s\t%s\t%s\t%s\n' "$id" "$title" "$file" "$size" "$st" >> "$OUT/manifest.tsv"
  done < "$OUT/.page.jsonl"
done
rm -f "$OUT/.page.jsonl" "$OUT/.ytdl.err"
chmod -R a+rX "$OUT"
echo
echo "Done: $n videos. $ok downloaded, $skip already had, $fail couldn't be downloaded."
[ "$fail" = 0 ] || echo "Check manifest.tsv (status 'failed') before deleting anything on Vimeo. Private ones usually need cookies (see top of script)."
