package main

import "testing"

func TestCountFilledAdjacent(t *testing.T) {
	grid := getGrid(`..@
		@.@
		.@@`)

	pos := grid.GetCell(1, 1)

	expected := 5

	if pos.CountFilledAdjacent() != expected {
		t.Fatalf("Expected CountFilledAdjacent to return %d, got %d", expected, pos.CountFilledAdjacent())
	}
}

func TestPrintAccessible(t *testing.T) {
	// grid := getGrid(`..@
	// 	@.@
	// 	.@@`)

	grid := getGrid(SampleInput)
	grid.PrintAccessible()
}
