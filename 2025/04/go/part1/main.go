package main

import (
	"os"
)

func main() {
	input, err := os.ReadFile("../../_input.txt")
	if err != nil {
		panic(err)
	}

	strInput := string(input)

	grid := getGrid(strInput)

	// println("======= Grid ======================")
	// grid.print()

	result := grid.CountAccessible()
	println("Part One Solution:", result)
}
