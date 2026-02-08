package main

import "testing"

const testInput = `987654321111111
811111111111119
234234234234278
818181911112111`

func TestGetBanks(t *testing.T) {
	batteries := getBanks(testInput)

	length := len(batteries)

	lengthExpected := 4

	if length != lengthExpected {
		t.Fatalf("expected length %d, got %d", lengthExpected, length)
	}
}

func TestGetLargestJoltage(t *testing.T) {
	expected := 987654321111
	jolt1, err := getLargestJoltage("987654321111111")
	if err != nil {
		t.Fatalf("error returned from getLargestVoltage: %v", err)
	}

	if jolt1 != expected {
		t.Fatalf("expected %d, got %d", expected, jolt1)
	}

	expected = 811111111119
	jolt2, err := getLargestJoltage("811111111111119")
	if err != nil {
		t.Fatalf("error returned from getLargestVoltage: %v", err)
	}

	if jolt2 != expected {
		t.Fatalf("expected %d, got %d", expected, jolt2)
	}

	expected = 434234234278
	jolt3, err := getLargestJoltage("234234234234278")
	if err != nil {
		t.Fatalf("error returned from getLargestVoltage: %v", err)
	}

	if jolt3 != expected {
		t.Fatalf("expected %d, got %d", expected, jolt3)
	}

	expected = 888911112111
	jolt4, err := getLargestJoltage("818181911112111")
	if err != nil {
		t.Fatalf("error returned from getLargestVoltage: %v", err)
	}

	if jolt4 != expected {
		t.Fatalf("expected %d, got %d", expected, jolt4)
	}
}

func TestGetTotalOutputJoltage(t *testing.T) {
	banks := getBanks(testInput)

	total, err := getTotalOutputJoltage(banks)
	if err != nil {
		t.Fatalf("error returned from getTotalOutputJoltage: %v", err)
	}

	expected := 3121910778619

	if total != expected {
		t.Fatalf("expected %d, got %d", expected, total)
	}
}

func TestFindHighestOfRest(t *testing.T) {
	nums := []int{1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3, 4, 5, 6, 7, 8, 9}

	// Just finds the highest, i number
	highest, _ := findHighestOfRest(nums, 0, 1)
	expected := 9

	if highest != expected {
		t.Fatalf("expected %d, got %d", expected, highest)
	}

	// Finds the highest, i number, starting at the given index
	nums = []int{9, 1, 1, 8}
	expected = 8

	highest, _ = findHighestOfRest(nums, 1, 1)
	if highest != expected {
		t.Fatalf("expected %d, got %d", expected, highest)
	}

	// same thing but better example
	// 234234234234278
	nums = []int{2, 3, 4, 2, 3, 4, 2, 3, 4, 2, 3, 4, 2, 7, 8}
	expected = 4

	highest, _ = findHighestOfRest(nums, 0, 12)
	if highest != expected {
		t.Fatalf("expected %d, got %d", expected, highest)
	}
}

func TestFindHighestOfRest_LastRemaining(t *testing.T) {
	// 811111111111119
	// Last number should be 9
	nums := []int{8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 9}
	expected := 9

	highest, _ := findHighestOfRest(nums, 11, 1)
	if highest != expected {
		t.Fatalf("expected %d, got %d", expected, highest)
	}
}
