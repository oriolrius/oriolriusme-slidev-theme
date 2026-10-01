#!/usr/bin/env bash
# Build the showcase, serve it and run the acceptance probe (overflow, h1, fonts, contrast).
set -euo pipefail
cd "$(dirname "$0")/.."
port="${PROBE_PORT:-47321}"
out="${PROBE_OUT:-/tmp/or-theme-build}"
./node_modules/.bin/slidev build test/slides.md --out "$out"
node test/probe/serve.mjs "$out" "$port" &
server=$!
trap 'kill "$server" 2>/dev/null || true' EXIT
for _ in $(seq 1 50); do (echo >"/dev/tcp/127.0.0.1/$port") 2>/dev/null && break; sleep 0.2; done
node test/probe/probe.cjs "http://127.0.0.1:$port"
