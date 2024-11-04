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

if [ $DAY -lt 10 ]; then
  DAY="0$DAY"
fi

# Create directory structure
echo "Setting up $YEAR/$DAY for $LANGUAGE"
mkdir -p "$YEAR/$DAY/$LANGUAGE"

if [ ! -f "$YEAR/$DAY/_answers.txt" ]; then
  printf "part1=\npart2=" >"$YEAR/$DAY/_answers.txt"
fi

if [ ! -f "$YEAR/$DAY/_input.txt" ]; then
  touch "$YEAR/$DAY/_input.txt"
fi

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

cd $PUZZLE_DIR && npm i

echo "to start:"
echo "cd $PUZZLE_DIR && npm test"
