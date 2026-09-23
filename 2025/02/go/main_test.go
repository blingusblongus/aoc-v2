package main

import "testing"

const sampleInput = `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,
1698522-1698528,446443-446449,38593856-38593862,565653-565659,
824824821-824824827,2121212118-2121212124`

func TestParseInput(t *testing.T) {
	parsed := parseInput(sampleInput)

	length := len(parsed)
	expectedLength := 11
	if length != expectedLength {
		t.Fatalf("expected length %d, got %d", expectedLength, length)
	}
}

type RangeCase struct {
	start      int
	end        int
	numInvalid int
}

func TestPart1Sample(t *testing.T) {
	cases := []RangeCase{
		{start: 11, end: 22, numInvalid: 2},
		{start: 95, end: 115, numInvalid: 1},
	}

	for _, c := range cases {
		badNums := validateRange(c.start, c.end)
		count := len(badNums)
		if count != c.numInvalid {
			t.Fatalf("expected: %v, got: %v", c.numInvalid, count)
		}
	}
}
