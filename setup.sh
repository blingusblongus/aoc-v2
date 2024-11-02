#!/bin/bash

usage() {
  echo "Usage: $0 <year> <day> <language>"
  echo "Example: $0 <year> <day> <language>"
  exit 1
}

if [ "$#" -ne 3 ]; then
  usage
fi

YEAR=$1
DAY=$2
LANGUAGE=$3

# Create directory structure
echo "Setting up $YEAR/$DAY for $LANGUAGE"
mkdir -p "$YEAR/$DAY/$LANGUAGE"

PUZZLE_DIR="$YEAR/$DAY/$LANGUAGE"

copy_template() {
  local lang=$1

  if [ -d "templates/$lang" ]; then
    echo "Copying $lang template..."
    cp -R "templates/$lang/." "$PUZZLE_DIR"
    echo "$lang template copied to $PUZZLE_DIR"
  else
    echo "No $lang template found"
  fi
}

copy_template "$LANGUAGE"

echo "to start, run:"
echo "cd $PUZZLE_DIR && npm run test"

# This may be too annoying to deal with
# curl "https://adventofcode.com/$YEAR/day/$DAY/input" >"$YEAR/$DAY/$LANGUAGE/input.txt"
# curl "https://adventofcode.com/$YEAR/day/$DAY" -o "$YEAR/$DAY/README.md"
# Extract text from <main> or <article> tags
# xmllint --html --xpath "//main//text() | //article//text()" "$YEAR/$DAY/README.md" 2>/dev/null >"$YEAR/$DAY/question.txt"
# echo "Extracted puzzle text to $YEAR/$DAY/question.txt"
