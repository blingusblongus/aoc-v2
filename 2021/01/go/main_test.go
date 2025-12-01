package main

import (
	"fmt"
	"os"
	"testing"
)

func TestDay1Part1Sample(t *testing.T) {
	sampleInput := `199
200
208
210
200
207
240
269
260
263`

	result := partOne(sampleInput)
	expected := 7

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
	expected := 1390

	// fmt.Printf("PartOneFull: %v\n", result)

	if result != expected {
		t.Fatalf("expected %d", expected)
	}
}

func TestDay1Part1(t *testing.T) {
	if !true {
		t.Fatal("expected true")
	}
}
