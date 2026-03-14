REPO_URL="https://github.com/yymethod/website.git"
SHA="${1:-}"
PUBKEY_URL="https://yymethod.com/keys/public-key.asc"
FPR_EXPECTED="63FC60BA7F66F645CFBF9C8482BBD72944B8168E"

(
  set -euo pipefail

  tmpdir=$(mktemp -d)
  cleanup(){ rm -rf "$tmpdir"; }
  trap cleanup EXIT

  # Isolate GPG state so your global keyring can't interfere
  export GNUPGHOME="$tmpdir/gnupg"
  mkdir -m 700 -p "$GNUPGHOME"

  # Clone minimal
  git clone --filter=blob:none --quiet "$REPO_URL" "$tmpdir/repo"

  # Fetch key and validate its fingerprint BEFORE importing
  curl -sS "$PUBKEY_URL" -o "$tmpdir/key.asc"

  EXPECTED_UPPER=$(echo "$FPR_EXPECTED" | tr '[:lower:]' '[:upper:]' | tr -d ' ')
  IMPORTED_FPR=$(
    gpg --with-colons --import-options show-only --import "$tmpdir/key.asc" 2>/dev/null \
      | awk -F: '/^fpr:/ {print toupper($10); exit}'
  )
  if [ -z "${IMPORTED_FPR:-}" ]; then
    echo "ERROR: Could not parse fingerprint from downloaded key"
    exit 10
  fi
  if [ "$IMPORTED_FPR" != "$EXPECTED_UPPER" ]; then
    echo "ERROR: Downloaded key fingerprint != expected"
    echo "  expected: $EXPECTED_UPPER"
    echo "     found: $IMPORTED_FPR"
    exit 11
  fi

  # Import the now-verified key into the isolated keyring
  gpg --import "$tmpdir/key.asc" >/dev/null

  # Ensure the commit exists
  cd "$tmpdir/repo"
  if ! git cat-file -e "$SHA^{commit}" 2>/dev/null; then
    echo "ERROR: Commit not found: $SHA"
    exit 12
  fi

  # Show signature; require 'Good signature' and extract signing fingerprint
  SIG_OUTPUT=$(git log --show-signature -1 "$SHA" 2>&1 || true)
  echo "$SIG_OUTPUT"

  echo "$SIG_OUTPUT" | grep -qi "Good signature" || { echo "ERROR: Signature not good"; exit 13; }

  SIG_FPR=$(
    echo "$SIG_OUTPUT" \
      | awk -F': ' '/Primary key fingerprint/ {gsub(/ /,"",$2); print toupper($2); exit}'
  )
  if [ -z "${SIG_FPR:-}" ]; then
    echo "ERROR: Could not extract signing fingerprint from output"
    exit 14
  fi
  if [ "$SIG_FPR" != "$EXPECTED_UPPER" ]; then
    echo "ERROR: Commit signed by unexpected fingerprint"
    echo "  expected: $EXPECTED_UPPER"
    echo "     found: $SIG_FPR"
    exit 15
  fi

  echo "OK: Commit exists, signature good, and signed by expected fingerprint ($EXPECTED_UPPER)."
) || echo "Verification failed (exit $?) — shell is intact."
