package main

import (
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"
)

func main() {
	fmt.Println("2021/01")
}

func makeDebug(part string) func(string, ...any) {
	debug := os.Getenv("DEBUG")
	return func(format string, args ...any) {
		if debug == part || debug == "all" {
			fmt.Printf(format, args...)
		}
	}
}

type Range struct {
	start int
	end   int
}

func parseInput(input string) []Range {
	ranges := []Range{}

	trimmed := strings.TrimSpace(input)
	rangeStrs := strings.SplitSeq(trimmed, ",")

	for s := range rangeStrs {
		segs := strings.Split(strings.TrimSpace(s), "-")
		start, err := strconv.Atoi(segs[0])
		if err != nil {
			log.Fatalf("failed to parse seg start: %v", err)
		}
		end, err := strconv.Atoi(segs[1])
		if err != nil {
			log.Fatalf("failed to parse seg end: %v", err)
		}
		ranges = append(ranges, Range{
			start: start,
			end:   end,
		})

	}

	return ranges
}
