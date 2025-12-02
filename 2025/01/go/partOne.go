package main

import (
	"log"
	"strconv"
	"strings"
)

func partOne(input string) int {
	// fmt.Println("part one:")

	trimmed := strings.TrimSpace(input)
	lines := strings.Split(trimmed, "\n")

	count := 0
	current := 50

	for _, line := range lines {
		dir := rune(line[0])
		n, err := strconv.Atoi(line[1:])
		// fmt.Printf("line: %s\n", line)
		// fmt.Printf("dir: %v, n: %d\n", dir, n)
		if err != nil {
			log.Fatalf("error parsing line: %v", line)
		}

		n = n % 100

		if dir == 'R' {
			// fmt.Println("DIR: RIGHT")
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

		// fmt.Printf("current: %d\n", current)
		if current == 0 {
			count = count + 1
		}
	}

	// fmt.Printf("count: %d", count)
	return count
}
