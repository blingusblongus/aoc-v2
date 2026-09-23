package main

import (
	"errors"
	"strconv"
	"strings"
)

type DB struct {
	Ranges []Range
	IDs    []int
}

type Range struct {
	Low  int
	High int
}

func NewDB(input []byte) (*DB, error) {
	listStr := strings.TrimSpace(string(input))
	split := strings.Split(listStr, "\n\n")
	if len(split) != 2 {
		return nil, errors.New("invalid input format")
	}

	rangesStr := split[0]
	idsStr := split[1]

	ranges := make([]Range, 0)

	for r := range strings.SplitSeq(rangesStr, "\n") {
		rSplit := strings.Split(r, "-")

		low, err := strconv.Atoi(rSplit[0])
		if err != nil {
			return nil, err
		}

		high, err := strconv.Atoi(rSplit[1])
		if err != nil {
			return nil, err
		}

		ranges = append(ranges, Range{
			Low:  low,
			High: high,
		})
	}

	ids := make([]int, 0)

	for id := range strings.SplitSeq(idsStr, "\n") {
		num, err := strconv.Atoi(id)
		if err != nil {
			return nil, err
		}
		ids = append(ids, num)
	}

	return &DB{
		Ranges: ranges,
		IDs:    ids,
	}, nil
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
