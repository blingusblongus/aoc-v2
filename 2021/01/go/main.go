package main

import (
	"fmt"
	"log"
	"strconv"
	"strings"
)

func main() {
	fmt.Println("2021/01")
}

func partOne(input string) int {
	fmt.Println("part one:")

	trimmed := strings.TrimSpace(input)
	lines := strings.Split(trimmed, "\n")
	// fmt.Printf("result: %v\n", lines)

	numbers := make([]int, len(lines))
	for i, s := range lines {
		n, err := strconv.Atoi(s)
		if err != nil {
			log.Fatalf("Failed to parse string to number: %s", s)
		}
		numbers[i] = n
	}

	// log.Printf("ints: %v\n", numbers)

	count := 0
	for i := range numbers {
		if i == 0 {
			continue
		}

		if numbers[i] > numbers[i-1] {
			count = count + 1
		}
	}

	return count
}
