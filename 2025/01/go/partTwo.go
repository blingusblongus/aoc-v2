package main

import (
	"log"
	"strconv"
	"strings"
)

func partTwo(input string) int {
	debug := makeDebug("partTwo")
	debug("part two:\n")

	trimmed := strings.TrimSpace(input)
	lines := strings.Split(trimmed, "\n")

	count := 0
	current := 50

	for _, line := range lines {
		dir := rune(line[0])
		n, err := strconv.Atoi(line[1:])
		if err != nil {
			log.Fatalf("error parsing line: %v", line)
		}

		debug("start %d\n", current)
		debug("dir %v\n", dir)
		debug("n %d\n", n)

		count += countZeroes(dir, current, n)

		n = n % 100

		if dir == 'R' {
			current = current + n
			if current > 99 {
				current = current - 100
			}
		} else {
			current = current - n
			if current < 0 {
				current = current + 100
			}
		}
	}

	debug("count: %d\n", count)
	return count
}
