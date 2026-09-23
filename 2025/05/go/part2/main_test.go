package main

import (
	"fmt"
	"testing"
)

const SampleList = `3-5
10-14
16-20
12-18

1
5
8
11
17
32`

func TestNewDB(t *testing.T) {
	_, err := NewDB([]byte(SampleList))
	if err != nil {
		t.Fatal(err)
	}
}

func TestCountFresh(t *testing.T) {
	db, err := NewDB([]byte(SampleList))
	if err != nil {
		t.Fatal(err)
	}

	freshCount := db.CountFresh()
	expected := 3
	if freshCount != expected {
		t.Fatalf("Expected %d fresh IDs, got %d", expected, freshCount)
	}
}

func TestIsFresh(t *testing.T) {
	db, err := NewDB([]byte(SampleList))
	if err != nil {
		t.Fatal(err)
	}

	fresh := []int{3, 4, 5, 11, 18}

	for _, id := range fresh {
		if !db.IsFresh(id) {
			t.Fatalf("Expected %d to be fresh", id)
		}
	}

	spoiled := []int{2, 7}
	for _, id := range spoiled {
		if db.IsFresh(id) {
			t.Fatalf("Expected %d to be spoiled", id)
		}
	}
}

func TestMergeRanges(t *testing.T) {
	db, err := NewDB([]byte(SampleList))
	if err != nil {
		t.Fatal(err)
	}

	if len(db.Ranges) != 2 {
		for _, r := range db.Ranges {
			fmt.Printf("Range: %d-%d\n", r.Low, r.High)
		}
		t.Fatalf("Expected 2 merged ranges, got %d", len(db.Ranges))
	}
}
