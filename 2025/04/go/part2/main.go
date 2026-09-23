package main

import (
	"os"
)

const MaxIters = 1000

func main() {
	input, err := os.ReadFile("../../_input.txt")
	if err != nil {
		panic(err)
	}

	strInput := string(input)

	grid := getGrid(strInput)

	totalRemoved := 0
	stalled := false
	iters := 0
	for !stalled {
		iters++
		removed := grid.RemovePass()
		totalRemoved += removed

		if removed == 0 || iters >= MaxIters {
			stalled = true
		}
	}

	// println("======= Grid ======================")
	// grid.print()

	// result := grid.CountAccessible()
	println("Iters:", iters)
	println("Part One Solution:", totalRemoved)
}
