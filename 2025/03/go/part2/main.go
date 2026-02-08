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

	stringData := strings.TrimSpace(string(data))

	banks := getBanks(stringData)
	largest, err := getTotalOutputJoltage(banks)
	if err != nil {
		panic(err)
	}

	println("Part Two Solution:", largest)
}

func getBanks(input string) []string {
	banks := strings.Split(input, "\n")

	return banks
}

func getLargestJoltage(bank string) (int, error) {
	numStrs := strings.Split(bank, "")
	var nums []int

	for _, s := range numStrs {
		num, err := strconv.Atoi(s)
		if err != nil {
			return -1, err
		}

		nums = append(nums, num)
	}

	result := ""

	idx := 0

	for i := 0; i < 12; i++ {
		num, currentIndex := findHighestOfRest(nums, idx, 12-i)

		idx = currentIndex + 1

		s := strconv.Itoa(num)
		result += s
	}

	resultNum, err := strconv.Atoi(result)
	if err != nil {
		return -1, err
	}

	return resultNum, nil
}

func findHighestOfRest(nums []int, start, remainingDigits int) (int, int) {
	highest := -1
	currentIndex := start

	for i := start; i <= len(nums)-remainingDigits; i++ {
		if nums[i] > highest {
			highest = nums[i]
			currentIndex = i
		}
	}

	return highest, currentIndex
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
