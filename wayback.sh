RAW_KEY="https://raw.githubusercontent.com/yymethod/website/140295e454055c246ee0b267ca6d5c303af68af7/keys/public-key.asc"
RAW_KR="https://raw.githubusercontent.com/yymethod/website/140295e454055c246ee0b267ca6d5c303af68af7/KEYRING.md"
curl -I "$RAW_KEY" && curl -I "$RAW_KR"   # expect 200 OK

wb_save() {
  url="$1"
  py='import sys,urllib.parse;print(urllib.parse.quote(sys.argv[1],safe=""))'
  enc="$(python3 -c "$py" "$url")"

  # fire a save request (ignore non-fatal errors)
  curl -fsS "https://web.archive.org/save/${enc}" \
    --connect-timeout 10 --max-time 30 --retry 4 --retry-delay 2 \
    -o /dev/null || true

  # poll sparkline for a capture timestamp
  for _ in $(seq 1 12); do
    ts="$(curl -fsS "https://web.archive.org/__wb/sparkline?url=${enc}&collection=web&output=json" \
          | python3 - <<'PY'
import sys,json
try:
  j=json.loads(sys.stdin.read())
  print(j.get("last_ts",""))
except: print("")
PY
)"
    [ -n "$ts" ] && { echo "https://web.archive.org/web/${ts}/${url}"; return 0; }
    sleep 2
  done
  echo "FAILED to confirm snapshot for: $url"
  echo "Check later: https://web.archive.org/web/*/$url"
  return 2
}

wb_save "$RAW_KEY"
wb_save "$RAW_KR"
