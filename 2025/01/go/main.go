package main

import (
	"fmt"
	"os"
)

func main() {
	fmt.Println("2021/01")
}

func makeDebug(part string) func(string, ...any) {
	debug := os.Getenv("DEBUG")
	return func(format string, args ...any) {
		if debug == part || debug == "all" {
			fmt.Printf(format, args...)
		}
	}
}
