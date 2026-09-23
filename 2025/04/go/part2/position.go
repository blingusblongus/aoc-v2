package main

type Pos struct {
	x    int
	y    int
	grid *Grid
}

func (p *Pos) CountFilledAdjacent() int {
	filled := 0
	for x1 := p.x - 1; x1 <= p.x+1; x1++ {
		for y1 := p.y - 1; y1 <= p.y+1; y1++ {
			if x1 == p.x && y1 == p.y {
				// same cell
				continue
			}

			pos := Pos{
				x:    x1,
				y:    y1,
				grid: p.grid,
			}

			if pos.IsOOB() {
				continue
			}

			if p.grid.IsFilled(x1, y1) {
				filled++
			}
		}
	}

	return filled
}

func (p *Pos) IsOOB() bool {
	return p.x < 0 || p.x >= p.grid.width || p.y < 0 || p.y >= p.grid.height
}

func (p *Pos) IsAccessible() bool {
	filledAdjacent := p.CountFilledAdjacent()
	return filledAdjacent < 4
}

func (p *Pos) GetValue() string {
	return string(p.grid.rows[p.y][p.x])
}

func (p *Pos) SetValue(val byte) {
	p.grid.rows[p.y][p.x] = val
}
