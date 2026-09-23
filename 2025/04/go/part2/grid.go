package main

import (
	"strconv"
	"strings"
)

type Grid struct {
	width  int
	height int
	rows   [][]byte
}

func getGrid(input string) *Grid {
	trimmed := strings.TrimSpace(input)

	lines := make([][]byte, 0)
	linesIter := strings.SplitSeq(trimmed, "\n")

	for l := range linesIter {
		t := strings.TrimSpace(l)
		lines = append(lines, []byte(t))
	}

	newGrid := Grid{
		height: len(lines),
		width:  len(lines[0]),
		rows:   lines,
	}

	return &newGrid
}

func (g *Grid) print() {
	for _, row := range g.rows {
		println(row)
	}
}

func (g *Grid) CountAccessible() int {
	rows := g.rows
	totalAccessible := 0

	for y, row := range rows {
		for x := range row {
			p := Pos{
				x:    x,
				y:    y,
				grid: g,
			}

			// Skip if not paper-filled
			if p.GetValue() != "@" {
				continue
			}

			adj := p.CountFilledAdjacent()

			if adj < 4 {
				totalAccessible++
			}
		}
	}

	return totalAccessible
}

func (g *Grid) GetCell(x, y int) *Pos {
	return &Pos{
		x:    x,
		y:    y,
		grid: g,
	}
}

func (g *Grid) IsFilled(x, y int) bool {
	if g.IsOOB(x, y) {
		panic("IM OOB")
	}

	return g.GetCell(x, y).GetValue() == "@"
}

func (g *Grid) IsEmpty(x, y int) bool {
	if g.IsOOB(x, y) {
		// println("Position", x, y, "is out of bounds, treating as empty")
		return false
	}

	char := g.rows[y][x]
	// println("Position", x, y, "contains character", string(char))
	return char == '.'
}

func (g *Grid) IsOOB(x, y int) bool {
	oob := x < 0 || y < 0 || x > g.width-1 || y > g.height-1
	return oob
}

func (g *Grid) PrintAccessible() {
	printResult := ""
	for y, row := range g.rows {
		for x := range row {
			cell := g.GetCell(x, y)
			val := cell.GetValue()

			if val == "@" {
				accessible := cell.IsAccessible()
				num := cell.CountFilledAdjacent()
				if accessible {
					printResult += strconv.Itoa(num)
					continue
				}
			}

			printResult += val
		}
		printResult += "\n"
	}

	println(printResult)
}

func (g *Grid) RemovePass() int {
	removed := 0

	rows := g.rows

	for y, row := range rows {
		for x := range row {
			p := Pos{
				x:    x,
				y:    y,
				grid: g,
			}

			// Skip if not paper-filled
			if p.GetValue() != "@" {
				continue
			}

			adj := p.CountFilledAdjacent()

			if adj < 4 {
				removed++
				p.SetValue('.')
			}
		}
	}

	return removed
}
