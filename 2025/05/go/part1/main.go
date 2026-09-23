package main

import "os"

func main() {
	input, err := os.ReadFile("../../_input.txt")
	if err != nil {
		panic(err)
	}

	db, err := NewDB(input)
	if err != nil {
		panic(err)
	}

	println("Part1 Answer:", db.CountFresh())
}
