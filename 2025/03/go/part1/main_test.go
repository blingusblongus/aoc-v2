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
	expected := 98
	jolt1, err := getLargestJoltage("987654321111111")
	if err != nil {
		t.Fatalf("error returned from getLargestVoltage: %v", err)
	}

	if jolt1 != expected {
		t.Fatalf("expected %d, got %d", expected, jolt1)
	}

	expected = 89
	jolt2, err := getLargestJoltage("811111111111119")
	if err != nil {
		t.Fatalf("error returned from getLargestVoltage: %v", err)
	}

	if jolt2 != expected {
		t.Fatalf("expected %d, got %d", expected, jolt2)
	}

	expected = 78
	jolt3, err := getLargestJoltage("234234234234278")
	if err != nil {
		t.Fatalf("error returned from getLargestVoltage: %v", err)
	}

	if jolt3 != expected {
		t.Fatalf("expected %d, got %d", expected, jolt3)
	}

	expected = 92
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

	expected := 357

	if total != expected {
		t.Fatalf("expected %d, got %d", expected, total)
	}
}
