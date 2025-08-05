<?php

namespace App\Controllers;

use App\Services\PlayerService;
use App\Database\DatabaseConnection;

class PlayerController
{
    private $playerService;
    
    public function __construct(PlayerService $playerService = null)
    {
        if ($playerService === null) {
            $container = \App\Container\Container::getInstance();
            $this->playerService = $container->get('playerService');
        } else {
            $this->playerService = $playerService;
        }
    }
    
    public function getAllPlayers(int $page = 1, int $perPage = 10, string $search = ''): array
    {
        try {
            return $this->playerService->getPaginatedPlayers($page, $perPage, $search);
        } catch (\Exception $e) {
            error_log("Error getting players: " . $e->getMessage());
            throw new \Exception("Failed to retrieve players");
        }
    }
    
    public function getPlayerById(int $id): ?array
    {
        try {
            return $this->playerService->getPlayerById($id);
        } catch (\Exception $e) {
            error_log("Error getting player {$id}: " . $e->getMessage());
            throw new \Exception("Failed to retrieve player");
        }
    }
    
    public function getPlayerSessions(int $playerId, int $page = 1, int $perPage = 10): ?array
    {
        try {
            return $this->playerService->getPlayerSessions($playerId, $page, $perPage);
        } catch (\Exception $e) {
            error_log("Error getting sessions for player {$playerId}: " . $e->getMessage());
            throw new \Exception("Failed to retrieve player sessions");
        }
    }
    
    public function searchPlayers(string $search, int $limit = 10): array
    {
        try {
            return $this->playerService->searchPlayers($search, $limit);
        } catch (\Exception $e) {
            error_log("Error searching players: " . $e->getMessage());
            throw new \Exception("Failed to search players");
        }
    }
    
    public function getHealthStatus(): array
    {
        try {
            $dbConnection = DatabaseConnection::getInstance();
            $dbInfo = $dbConnection->getDatabaseInfo();
            
            return [
                'status' => 'healthy',
                'service' => 'EasyCoach API',
                'timestamp' => date('Y-m-d H:i:s'),
                'version' => '1.0.0',
                'optimized' => true,
                'architecture' => 'Layered (Controller-Service-Repository)',
                'database' => $dbInfo
            ];
        } catch (\Exception $e) {
            return [
                'status' => 'unhealthy',
                'service' => 'EasyCoach API',
                'timestamp' => date('Y-m-d H:i:s'),
                'version' => '1.0.0',
                'error' => 'Database connection failed',
                'details' => $e->getMessage()
            ];
        }
    }
}
