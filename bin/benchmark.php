<?php

/**
 * Performance Benchmarking Script for EasyCoach API
 * Measures response times and validates pagination improvements
 */

class APIBenchmark
{
    private $baseUrl = 'http://localhost:8080';
    
    public function runBenchmarks()
    {
        echo "⚡ EasyCoach API Performance Benchmark\n";
        echo "=====================================\n\n";
        
        // Test 1: Health check
        $this->testHealthCheck();
        
        // Test 2: Players list with pagination
        $this->testPlayersPagination();
        
        // Test 3: Search performance
        $this->testSearchPerformance();
        
        // Test 4: Individual player fetch
        $this->testPlayerDetails();
        
        echo "\n✅ Benchmark completed!\n";
    }
    
    private function testHealthCheck()
    {
        echo "🏥 Testing Health Check...\n";
        $start = microtime(true);
        
        $response = $this->makeRequest('/api/health');
        $end = microtime(true);
        
        $duration = round(($end - $start) * 1000, 2);
        echo "   Response time: {$duration}ms\n";
        echo "   Status: " . ($response['status'] ?? 'unknown') . "\n\n";
    }
    
    private function testPlayersPagination()
    {
        echo "📄 Testing Players Pagination...\n";
        
        $testCases = [
            ['page' => 1, 'perPage' => 10],
            ['page' => 2, 'perPage' => 10],
            ['page' => 1, 'perPage' => 25],
            ['page' => 1, 'perPage' => 50]
        ];
        
        foreach ($testCases as $test) {
            $start = microtime(true);
            $response = $this->makeRequest('/api/players', $test);
            $end = microtime(true);
            
            $duration = round(($end - $start) * 1000, 2);
            $count = count($response['players'] ?? []);
            $total = $response['pagination']['total'] ?? 0;
            
            echo "   Page {$test['page']}, {$test['perPage']} items: {$duration}ms ({$count}/{$total} players)\n";
        }
        echo "\n";
    }
    
    private function testSearchPerformance()
    {
        echo "🔍 Testing Search Performance...\n";
        
        $searchTerms = ['messi', 'ronaldo', 'mbappe', 'a', 'e'];
        
        foreach ($searchTerms as $term) {
            $start = microtime(true);
            $response = $this->makeRequest('/api/players', ['search' => $term]);
            $end = microtime(true);
            
            $duration = round(($end - $start) * 1000, 2);
            $count = count($response['players'] ?? []);
            
            echo "   Search '{$term}': {$duration}ms ({$count} results)\n";
        }
        echo "\n";
    }
    
    private function testPlayerDetails()
    {
        echo "👤 Testing Player Details...\n";
        
        $playerIds = [1, 5, 10, 25, 50];
        
        foreach ($playerIds as $id) {
            $start = microtime(true);
            $response = $this->makeRequest("/api/players/{$id}");
            $end = microtime(true);
            
            $duration = round(($end - $start) * 1000, 2);
            $found = isset($response['id']) ? '✅' : '❌';
            
            echo "   Player {$id}: {$duration}ms {$found}\n";
        }
        echo "\n";
    }
    
    private function makeRequest($endpoint, $params = [])
    {
        $url = $this->baseUrl . $endpoint;
        
        if (!empty($params)) {
            $url .= '?' . http_build_query($params);
        }
        
        $context = stream_context_create([
            'http' => [
                'method' => 'GET',
                'header' => 'Content-Type: application/json',
                'timeout' => 10
            ]
        ]);
        
        $response = file_get_contents($url, false, $context);
        
        if ($response === false) {
            return ['error' => 'Request failed'];
        }
        
        return json_decode($response, true) ?: ['error' => 'Invalid JSON'];
    }
}

// Run benchmarks if script is executed directly
if (php_sapi_name() === 'cli') {
    $benchmark = new APIBenchmark();
    $benchmark->runBenchmarks();
}
