package main

func countZeroes(dir rune, curr int, num int) int {
	rots := num / 100
	if dir == 'R' {
		if (100 - curr) <= num%100 {
			return rots + 1
		}
		return rots
	} else {
		if num%100 >= curr && curr != 0 {
			return rots + 1
		}
		return rots
	}
}
