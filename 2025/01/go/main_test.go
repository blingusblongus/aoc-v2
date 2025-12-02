package main

import (
	"fmt"
	"os"
	"testing"
)

const sampleInput = `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`

func TestDay1Part1Sample(t *testing.T) {
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
	expected := 1048

	// fmt.Printf("PartOneFull: %v\n", result)

	if result != expected {
		t.Fatalf("expected %d, got %d", expected, result)
	}
}

func TestDay1Part2Sample(t *testing.T) {
	result := partTwo(sampleInput)
	expected := 6

	if result != expected {
		t.Fatalf("expected %d, got %d", expected, result)
	}
}

func TestDay1Part2Full(t *testing.T) {
	input, err := os.ReadFile("../_input.txt")
	if err != nil {
		t.Fatalf("Couldn't parse input: %v", err)
	}
	text := string(input)

	result := partTwo(text)
	fmt.Printf("result: %d\n", result)
	expected := 6498

	// fmt.Printf("PartOneFull: %v\n", result)

	if result != expected {
		t.Fatalf("expected %d, got %d", expected, result)
	}
}

type Case struct {
	dir    rune
	curr   int
	n      int
	result int
}

func TestCountZeroes(t *testing.T) {
	cases := []Case{
		{dir: 'R', curr: 0, n: 100, result: 1},
		{dir: 'R', curr: 0, n: 10, result: 0},
		{dir: 'R', curr: 50, n: 10, result: 0},
		{dir: 'R', curr: 50, n: 60, result: 1},
		{dir: 'R', curr: 50, n: 260, result: 3},
		{dir: 'L', curr: 10, n: 10, result: 1},
		{dir: 'L', curr: 10, n: 20, result: 1},
		{dir: 'L', curr: 10, n: 5, result: 0},
		{dir: 'L', curr: 90, n: 95, result: 1},
		{dir: 'L', curr: 90, n: 195, result: 2},
		{dir: 'L', curr: 90, n: 290, result: 3},
		// Actual Sample cases
		{dir: 'L', curr: 50, n: 68, result: 1},
		{dir: 'L', curr: 82, n: 30, result: 0},
		{dir: 'R', curr: 52, n: 48, result: 1},
		{dir: 'L', curr: 0, n: 5, result: 0},
		{dir: 'R', curr: 95, n: 60, result: 1},
	}

	for _, c := range cases {
		out := countZeroes(c.dir, c.curr, c.n)

		if c.result != out {
			t.Fatalf("got %d for case %v", out, c)
		}
	}
}
