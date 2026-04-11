#!/usr/bin/env bash

set -euo pipefail

if [[ $# -lt 1 ]]; then
  echo "Lietošana: $0 <labelis> [base_url] [kop_skaits] [paralēli]"
  exit 1
fi

LABEL="$1"
BASE_URL="${2:-http://127.0.0.1:3001}"
TOTAL_REQUESTS="${3:-100}"
CONCURRENCY="${4:-50}"

OUT_DIR="docs/performance_results"
mkdir -p "$OUT_DIR"

TS=$(date +%s)
EMAIL="perf_${LABEL}_${TS}@test.lv"

USER_RESP=$(curl -s -X POST "${BASE_URL}/users" \
  -H 'Content-Type: application/json' \
  -d "{\"email\":\"${EMAIL}\",\"password\":\"password123\"}")

USER_ID=$(echo "$USER_RESP" | node -e "const fs=require('fs');const d=JSON.parse(fs.readFileSync(0,'utf8'));if(d.id===undefined){process.exit(1)};process.stdout.write(String(d.id));")

PAYLOAD_FILE="/tmp/post_payload_${LABEL}.json"
printf '{"userId":%s,"title":"Performance title","content":"Performance content for Apache Bench test run."}' "$USER_ID" > "$PAYLOAD_FILE"

USERS_RAW="${OUT_DIR}/${LABEL}_users_ab.txt"
POSTS_RAW="${OUT_DIR}/${LABEL}_posts_ab.txt"
SUMMARY="${OUT_DIR}/${LABEL}_summary.txt"

ab -l -n "$TOTAL_REQUESTS" -c "$CONCURRENCY" "${BASE_URL}/users" > "$USERS_RAW"
ab -l -n "$TOTAL_REQUESTS" -c "$CONCURRENCY" -p "$PAYLOAD_FILE" -T application/json "${BASE_URL}/posts" > "$POSTS_RAW"

extract_metric() {
  local file="$1"
  local pattern="$2"
  awk -F': +' -v p="$pattern" '$0 ~ p { print $2; exit }' "$file" | sed 's/[[:space:]]*$//'
}

failed_count() {
  local file="$1"
  local failed
  local non2xx
  failed=$(awk '/Failed requests:/ {print $3; exit}' "$file")
  non2xx=$(awk '/Non-2xx responses:/ {print $3; exit}' "$file")
  failed="${failed:-0}"
  non2xx="${non2xx:-0}"
  echo $((failed + non2xx))
}

USERS_RPS=$(extract_metric "$USERS_RAW" "Requests per second")
USERS_TPR=$(extract_metric "$USERS_RAW" "Time per request")
USERS_ERR=$(failed_count "$USERS_RAW")

POSTS_RPS=$(extract_metric "$POSTS_RAW" "Requests per second")
POSTS_TPR=$(extract_metric "$POSTS_RAW" "Time per request")
POSTS_ERR=$(failed_count "$POSTS_RAW")

{
  echo "label=$LABEL"
  echo "total_requests=$TOTAL_REQUESTS"
  echo "concurrency=$CONCURRENCY"
  echo "users.time_per_request=$USERS_TPR"
  echo "users.requests_per_second=$USERS_RPS"
  echo "users.errors=$USERS_ERR"
  echo "posts.time_per_request=$POSTS_TPR"
  echo "posts.requests_per_second=$POSTS_RPS"
  echo "posts.errors=$POSTS_ERR"
} | tee "$SUMMARY"

echo "Rezultāti saglabāti mapē: $OUT_DIR"