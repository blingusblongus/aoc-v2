package main

import (
	"os"
	"strconv"
	"strings"
)

func main() {
	data, err := os.ReadFile("../../_input.txt")
	if err != nil {
		panic(err)
	}

	stringData := string(data)

	banks := getBanks(stringData)
	largest, err := getTotalOutputJoltage(banks)
	if err != nil {
		panic(err)
	}

	println("Part One Solution:", largest)
}

func getBanks(input string) []string {
	banks := strings.Split(input, "\n")

	return banks
}

func getLargestJoltage(bank string) (int, error) {
	numStrs := strings.Split(bank, "")
	// nums := make([]int, len(numStrs))
	largest := 0

	for i, v := range numStrs {
		for j := i + 1; j < len(numStrs); j++ {
			newNum := v + numStrs[j]
			newInt, err := strconv.Atoi(newNum)
			if err != nil {
				return 0, err
			}
			if newInt > largest {
				largest = newInt
			}
		}
	}

	return largest, nil
}

func getTotalOutputJoltage(banks []string) (int, error) {
	total := 0

	for _, bank := range banks {
		largest, err := getLargestJoltage(bank)
		if err != nil {
			return 0, err
		}

		total += largest
	}

	return total, nil
}
