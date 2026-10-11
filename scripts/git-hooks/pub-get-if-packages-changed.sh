#!/usr/bin/env bash
# Shared logic for the repo's git hooks: runs `flutter pub get` in every Flutter
# package (packages/<name>/ and packages/<name>/flutter/) and in frontend/
# whenever a pubspec changed (or on a fresh checkout) — packages are path
# dependencies Flutter can't detect drift on by itself.
set -euo pipefail

root_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
mode="${1:-}"

run_pub_get=false
if [ "$mode" = "FORCE" ]; then
	run_pub_get=true
elif git diff --name-only $mode -- ':(glob)packages/**/pubspec.yaml' ':(glob)packages/**/pubspec.lock' frontend/pubspec.yaml frontend/pubspec.lock 2>/dev/null | grep -q .; then
	run_pub_get=true
fi

[ "$run_pub_get" = true ] || exit 0

echo "[git-hooks] a pubspec changed (or fresh checkout) — running flutter pub get"

for pubspec in "$root_dir"/packages/*/pubspec.yaml "$root_dir"/packages/*/flutter/pubspec.yaml; do
	[ -f "$pubspec" ] || continue
	dir="$(dirname "$pubspec")"
	echo "  -> ${dir#"$root_dir"/}"
	(cd "$dir" && flutter pub get)
done

if [ -f "$root_dir/frontend/pubspec.yaml" ]; then
	echo "  -> frontend"
	(cd "$root_dir/frontend" && flutter pub get)
fi
