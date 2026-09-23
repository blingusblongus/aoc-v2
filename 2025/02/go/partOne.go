package main

import "strconv"

var debug = makeDebug("isInvalid")

func partOne(input string) {
	// ranges := parseInput(input)
}

func isInvalid(num int) bool {
	str := strconv.Itoa(num)
	// debug("testing: %d\n", num)

	for i := range str {
		// TODO: I need to figure out how to
		// drill into this requirement - 11 DOES count, but 111 does not
		// skip single digit
		// if i == 0 {
		// 	continue
		// }

		// If slice is not fit evenly when repeated, skip
		if len(str)%(i+1) != 0 {
			// debug("skipping, %d not divisible by %d\n", len(str), i+1)
			continue
		}

		// If we get more than halfway through, it's valid
		// TODO: Do single-digit ranges exist? We'll need a carveout
		if i+1 > len(str)/2 {
			return false
		}

		// Check actual slice repeats
		repeats := len(str) / (i + 1)
		first := str[0 : i+1]
		sliceWorks := true
		for j := 1; j < repeats; j++ {
			// debug("i: %d; j: %d;\n", i, j)
			// debug("test seg: %v\n", str)
			// debug("test seg: %v, %v\n", first, str[j:j+i+1])
			if first != str[j:j+i+1] {
				sliceWorks = false
				break
			}
		}
		if sliceWorks {
			debug("invalid: %d\n", num)
			return true
		}
	}

	return false
}

func validateRange(start, end int) []int {
	var invalid []int
	for i := start; i <= end; i++ {
		if isInvalid(i) {
			invalid = append(invalid, i)
		}
	}

	return invalid
}
