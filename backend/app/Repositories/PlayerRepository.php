<?php

namespace App\Repositories;

use PDO;
use PDOException;

class PlayerRepository
{
    private $pdo;
    
    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }
    
    public function getPaginatedPlayers(int $page, int $perPage, string $search = ''): array
    {
        $offset = ($page - 1) * $perPage;
        
        $whereClause = '';
        $params = [];
        
        if ($search) {
            $whereClause = 'WHERE name LIKE :search';
            $params[':search'] = "%$search%";
        }
        
        $countQuery = "SELECT COUNT(*) FROM players $whereClause";
        $countStmt = $this->pdo->prepare($countQuery);
        $countStmt->execute($params);
        $total = $countStmt->fetchColumn();
        
        $query = "SELECT * FROM players $whereClause ORDER BY id LIMIT :limit OFFSET :offset";
        $stmt = $this->pdo->prepare($query);
        $stmt->bindValue(':limit', $perPage, PDO::PARAM_INT);
        $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
        
        if ($search) {
            $stmt->bindValue(':search', "%$search%", PDO::PARAM_STR);
        }
        
        $stmt->execute();
        $players = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        return [
            'players' => $players,
            'total' => $total,
            'page' => $page,
            'per_page' => $perPage
        ];
    }
    
    public function getPlayerById(int $id): ?array
    {
        $query = "SELECT * FROM players WHERE id = :id";
        $stmt = $this->pdo->prepare($query);
        $stmt->bindValue(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        
        $player = $stmt->fetch(PDO::FETCH_ASSOC);
        return $player ?: null;
    }
    
    public function playerExists(int $id): bool
    {
        $query = "SELECT COUNT(*) FROM players WHERE id = :id";
        $stmt = $this->pdo->prepare($query);
        $stmt->bindValue(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        
        return $stmt->fetchColumn() > 0;
    }
    
    public function getTotalPlayers(string $search = ''): int
    {
        $whereClause = '';
        $params = [];
        
        if ($search) {
            $whereClause = 'WHERE name LIKE :search';
            $params[':search'] = "%$search%";
        }
        
        $query = "SELECT COUNT(*) FROM players $whereClause";
        $stmt = $this->pdo->prepare($query);
        $stmt->execute($params);
        
        return $stmt->fetchColumn();
    }
    
    public function searchPlayers(string $search, int $limit = 10): array
    {
        $query = "SELECT * FROM players WHERE name LIKE :search ORDER BY id LIMIT :limit";
        $stmt = $this->pdo->prepare($query);
        $stmt->bindValue(':search', "%$search%", PDO::PARAM_STR);
        $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
        $stmt->execute();
        
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
} 