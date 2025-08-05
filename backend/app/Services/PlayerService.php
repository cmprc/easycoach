<?php

namespace App\Services;

use App\Repositories\PlayerRepository;

class PlayerService
{
    private $playerRepository;
    
    public function __construct(PlayerRepository $playerRepository)
    {
        $this->playerRepository = $playerRepository;
    }
    
    public function getPaginatedPlayers(int $page, int $perPage, string $search = ''): array
    {
        $page = max(1, $page);
        $perPage = min(50, max(1, $perPage));
        
        $result = $this->playerRepository->getPaginatedPlayers($page, $perPage, $search);
        
        $totalPages = ceil($result['total'] / $perPage);
        $hasNextPage = $page < $totalPages;
        $hasPrevPage = $page > 1;
        
        return [
            'players' => $result['players'],
            'pagination' => [
                'current_page' => $page,
                'per_page' => $perPage,
                'total' => $result['total'],
                'total_pages' => $totalPages,
                'has_next_page' => $hasNextPage,
                'has_prev_page' => $hasPrevPage,
                'next_page' => $hasNextPage ? $page + 1 : null,
                'prev_page' => $hasPrevPage ? $page - 1 : null
            ],
            'search' => $search
        ];
    }
    
    public function getPlayerById(int $id): ?array
    {
        $player = $this->playerRepository->getPlayerById($id);
        
        if (!$player) {
            return null;
        }
        
        $player['stats'] = $this->generatePlayerStats($id);
        
        return $player;
    }
    
    public function getPlayerSessions(int $playerId, int $page, int $perPage): ?array
    {
        if (!$this->playerRepository->playerExists($playerId)) {
            return null;
        }
        
        $page = max(1, $page);
        $perPage = min(50, max(1, $perPage));
        
        $sessions = $this->generateMockSessions($playerId, $page, $perPage);
        
        $totalSessions = 25;
        $totalPages = ceil($totalSessions / $perPage);
        $hasNextPage = $page < $totalPages;
        $hasPrevPage = $page > 1;
        
        return [
            'sessions' => $sessions,
            'player_id' => $playerId,
            'pagination' => [
                'current_page' => $page,
                'per_page' => $perPage,
                'total' => $totalSessions,
                'total_pages' => $totalPages,
                'has_next_page' => $hasNextPage,
                'has_prev_page' => $hasPrevPage,
                'next_page' => $hasNextPage ? $page + 1 : null,
                'prev_page' => $hasPrevPage ? $page - 1 : null
            ]
        ];
    }
    
    public function searchPlayers(string $search, int $limit = 10): array
    {
        $search = trim($search);
        if (strlen($search) < 2) {
            return ['players' => [], 'total' => 0];
        }
        
        $players = $this->playerRepository->searchPlayers($search, $limit);
        
        return [
            'players' => $players,
            'total' => count($players),
            'search' => $search
        ];
    }
    
    private function generatePlayerStats(int $playerId): array
    {
        return [
            'last_30_days' => [
                'total_distance' => rand(50, 150) . ' km',
                'top_speed' => rand(25, 35) . ' km/h',
                'sessions_count' => rand(8, 20),
                'avg_heart_rate' => rand(140, 180) . ' bpm',
                'calories_burned' => rand(800, 1500) . ' kcal'
            ],
            'performance_metrics' => [
                'pass_accuracy' => rand(75, 95) . '%',
                'shot_accuracy' => rand(60, 85) . '%',
                'tackle_success_rate' => rand(70, 90) . '%'
            ]
        ];
    }
    
    private function generateMockSessions(int $playerId, int $page, int $perPage): array
    {
        $sessions = [];
        $offset = ($page - 1) * $perPage;
        $sessionTypes = ['Training', 'Match', 'Recovery', 'Fitness', 'Tactical'];
        
        for ($i = $offset; $i < min($offset + $perPage, 25); $i++) {
            $sessions[] = [
                'id' => $i + 1,
                'player_id' => $playerId,
                'date' => date('Y-m-d', strtotime("-{$i} days")),
                'distance' => rand(5, 15) . ' km',
                'duration' => rand(60, 120) . ' minutes',
                'top_speed' => rand(25, 35) . ' km/h',
                'session_type' => $sessionTypes[rand(0, count($sessionTypes) - 1)],
                'intensity' => ['Low', 'Medium', 'High'][rand(0, 2)],
                'notes' => 'Session completed successfully'
            ];
        }
        
        return $sessions;
    }
} 