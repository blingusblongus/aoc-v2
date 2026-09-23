package main

import (
	"testing"
)

func TestIsOOB(t *testing.T) {
	grid := getGrid(SampleInput)

	result := false

	result = grid.IsOOB(-1, 0)
	if result != true {
		t.Fatal("Expected position (-1, 0) to be OOB")
	}

	result = grid.IsOOB(0, 0)
	if result != false {
		t.Fatal("Expected position (0, 0) to not be OOB")
	}
}

func TestIsEmpty(t *testing.T) {
	grid := getGrid(SampleInput)

	// grid.print()

	if !grid.IsEmpty(1, 0) {
		t.Fatal("Expected position (0, 1) to be empty")
	}

	if grid.IsEmpty(0, 1) {
		t.Fatal("Expected position (1, 0) to not be empty")
	}

	if grid.IsEmpty(-1, 0) {
		t.Fatal("OOB should NOT be considered empty")
	}
}

func TestIsAccessible_smol(t *testing.T) {
	grid := getGrid(`...
		@@@
		.@.`)
	grid.print()

	pos := grid.GetCell(1, 1)

	if !pos.IsAccessible() {
		t.Fatal("Expected position (1, 1) to be accessible")
	}
}

func TestIsAccessible_4_4(t *testing.T) {
	grid := getGrid(SampleInput)

	pos := grid.GetCell(4, 4)

	accessible := pos.IsAccessible()

	if accessible {
		t.Fatal("Expected position (4, 4) to not be accessible")
	}
}

func TestIsAccessible_7_0(t *testing.T) {
	grid := getGrid(SampleInput)

	pos := grid.GetCell(7, 0)

	accessible := pos.IsAccessible()

	if accessible {
		t.Fatal("Expected position (7, 0) to not be accessible")
	}
}

func TestCountAccessible(t *testing.T) {
	grid := getGrid(SampleInput)

	grid.print()

	accessible := grid.CountAccessible()

	expected := 13

	if accessible != expected {
		t.Fatalf("Expected %d accessible positions, got %d", expected, accessible)
	}
}

func TestCountAccessible_smol(t *testing.T) {
	t.Skip("This test is just for debugging the smaller grid")
	grid := getGrid(`.@@
		@@@
		.@.`)

	accessible := grid.CountAccessible()

	expected := 5

	if accessible != expected {
		t.Fatalf("Expected %d accessible positions, got %d", expected, accessible)
	}
}
