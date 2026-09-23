package main

import (
	"errors"
	"strconv"
	"strings"
)

type DB struct {
	Ranges []*Range
	IDs    []int
}

type Range struct {
	Low  int
	High int
}

func mergeRanges(r1, r2 *Range) *Range {
	var s []*Range
	if r1.Low < r2.Low {
		s = []*Range{r1, r2}
	} else {
		s = []*Range{r2, r1}
	}

	if s[1].Low <= s[0].High {
		return &Range{Low: s[0].Low, High: max(s[0].High, s[1].High)}
	}

	return nil
}

func rangesIntersect(r1, r2 *Range) bool {
	var s []*Range
	if r1.Low < r2.Low {
		s = []*Range{r1, r2}
	} else {
		s = []*Range{r2, r1}
	}

	if s[1].Low <= s[0].High {
		return true
	}

	return false
}

func NewDB(input []byte) (*DB, error) {
	listStr := strings.TrimSpace(string(input))
	split := strings.Split(listStr, "\n\n")
	if len(split) != 2 {
		return nil, errors.New("invalid input format")
	}

	rangesStr := split[0]
	idsStr := split[1]

	db := &DB{
		Ranges: []*Range{},
	}

	for rStr := range strings.SplitSeq(rangesStr, "\n") {
		rSplit := strings.Split(rStr, "-")

		low, err := strconv.Atoi(rSplit[0])
		if err != nil {
			return nil, err
		}

		high, err := strconv.Atoi(rSplit[1])
		if err != nil {
			return nil, err
		}

		r := Range{Low: low, High: high}
		intersections := []*Range{&r}

		for _, existingRange := range db.Ranges {
			if rangesIntersect(&r, existingRange) {
				intersections = append(intersections, existingRange)
			}
		}

		if len(intersections) > 1 {
			low := intersections[0].Low
			high := intersections[0].High

			for _, intersectingRange := range intersections {
				if intersectingRange.Low < low {
					low = intersectingRange.Low
				}
				if intersectingRange.High > high {
					high = intersectingRange.High
				}
			}

			filtered := []*Range{}
			// 	for _, er := range db.Ranges {
			// 		// if !
			// }

			db.Ranges = append(db.Ranges, &Range{Low: low, High: high})
		} else {
			db.Ranges = append(db.Ranges, &r)
		}
	}

	ids := make([]int, 0)

	for id := range strings.SplitSeq(idsStr, "\n") {
		num, err := strconv.Atoi(id)
		if err != nil {
			return nil, err
		}
		ids = append(ids, num)
	}

	return db, nil
}

func (db *DB) IsFresh(id int) bool {
	for _, r := range db.Ranges {
		if id <= r.High && id >= r.Low {
			return true
		}
	}

	return false
}

func (db *DB) CountFresh() int {
	freshCount := 0

	for _, id := range db.IDs {
		if db.IsFresh(id) {
			freshCount++
		}
	}

	return freshCount
}
