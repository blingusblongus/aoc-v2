package main

import (
	"fmt"
	"os"
	"testing"
)

func TestDay1Part1Sample(t *testing.T) {
	sampleInput := `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`

	result := partOne(sampleInput)
	expected := 3

	fmt.Printf("PartOneSample: %v\n", result)

	if result != expected {
		t.Fatalf("expected %d", expected)
	}
}

func TestDay1Part1Full(t *testing.T) {
	input, err := os.ReadFile("../_input.txt")
	if err != nil {
		t.Fatalf("Couldn't parse input: %v", err)
	}
	text := string(input)

	result := partOne(text)
	expected := -1

	// fmt.Printf("PartOneFull: %v\n", result)

	if result != expected {
		t.Fatalf("expected %d, got %d", expected, result)
	}
}
