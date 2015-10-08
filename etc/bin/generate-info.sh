#!/bin/bash -eu
#
# Generate information about the artefact (git sha1 and date) using the current local git repository.
# The file is generated only if it has changed to avoid to build a new Docker image for nothing.
#

HERE=$(dirname $($(type -P greadlink || type -P readlink) -f "$0"))
MD5=$(type -P md5 || type -P md5sum)

# Relative
OUTPUT=$1

commitLog=$(git log --pretty=format:'%H|%ct|%ci|%s' -1)
sha1=$(echo "$commitLog" | cut -d '|' -f1)
timestamp=$(echo "$commitLog" | cut -d '|' -f2)
humanDate=$(echo "$commitLog" | cut -d '|' -f3)
message=$(echo "$commitLog" | cut -d '|' -f4)

JSON='{
  "sha1": "'$sha1'",
  "timestamp": "'$timestamp'",
  "human_date": "'$humanDate'",
  "message": "'$message'"
}'

write() {
    echo "$JSON"
    echo "$JSON" > $OUTPUT
    exit 0
}

[[ ! -f $OUTPUT ]] && write

new=$(echo "$JSON" | $MD5)
old=$(cat $OUTPUT | $MD5)

[[ "$new" != "$old" ]] && write \
    || echo "[info] JSON info already up-to-date..."
