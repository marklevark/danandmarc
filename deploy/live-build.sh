#!/bin/sh
# Live mode: watch the site folder and rebuild into ./dist whenever anything changes.
# Optionally pulls from GitHub every GIT_PULL_INTERVAL seconds (0 = off).
# nginx serves ./dist; files are swapped in with rsync, so the site never goes blank mid-build.
set -eu

SITE=${SITE:-/site}
GIT_PULL_INTERVAL=${GIT_PULL_INTERVAL:-60}
POLL=${POLL:-2}
OUT="$SITE/.dist-tmp"
STAMP="$SITE/.dist-tmp.stamp"
WATCH="src public astro.config.mjs package.json package-lock.json"

cd "$SITE"
export ASTRO_TELEMETRY_DISABLED=1

if ! command -v rsync >/dev/null || ! command -v git >/dev/null; then
  echo "[live] installing git + rsync"
  apk add --no-cache git rsync >/dev/null
fi
git config --global --add safe.directory "$SITE" 2>/dev/null || true
mkdir -p "$SITE/dist"

log() { echo "[live] $(date '+%H:%M:%S') $*"; }

deps() {
  if [ ! -d node_modules ] || [ package-lock.json -nt node_modules/.package-lock.json ]; then
    log "installing dependencies"
    npm ci --no-audit --no-fund
  fi
}

build() {
  touch "$STAMP.new"
  deps
  log "building..."
  start=$(date +%s)
  if npx astro build --outDir "$OUT" > /tmp/astro-build.log 2>&1; then
    rsync -a --delete-after "$OUT"/ "$SITE/dist/"
    log "live in $(( $(date +%s) - start ))s"
  else
    tail -n 30 /tmp/astro-build.log
    log "BUILD FAILED, site left as it was. Fix the error above and save again."
  fi
  mv "$STAMP.new" "$STAMP"
}

changed() {
  # shellcheck disable=SC2086
  [ -n "$(find $WATCH -newer "$STAMP" -print 2>/dev/null | head -n 1)" ]
}

build
last_pull=$(date +%s)

while true; do
  sleep "$POLL"
  if [ "$GIT_PULL_INTERVAL" -gt 0 ] && [ $(( $(date +%s) - last_pull )) -ge "$GIT_PULL_INTERVAL" ]; then
    last_pull=$(date +%s)
    if [ -d .git ]; then
      git pull --ff-only -q 2>/tmp/git-pull.log || { log "git pull skipped:"; cat /tmp/git-pull.log; }
    fi
  fi
  if changed; then
    sleep 1   # let a burst of saves settle
    build
  fi
done
