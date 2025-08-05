<?php

namespace App\Database;

use PDO;
use PDOException;

class DatabaseConnection
{
    private static $instance = null;
    private $pdo;
    
    private function __construct()
    {
        $this->connect();
    }
    
    public static function getInstance(): self
    {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    public function getConnection(): PDO
    {
        return $this->pdo;
    }
    
    private function connect(): void
    {
        $dbPath = '/var/www/seed/hello.db';
        
        try {
            $this->pdo = new PDO("sqlite:$dbPath");
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
            
            $this->pdo->exec('PRAGMA foreign_keys = ON');
            
        } catch (PDOException $e) {
            error_log("Database connection error: " . $e->getMessage());
            throw new \Exception("Database connection failed: " . $e->getMessage());
        }
    }
    
    public function testConnection(): bool
    {
        try {
            $this->pdo->query('SELECT 1');
            return true;
        } catch (PDOException $e) {
            return false;
        }
    }
    
    public function getDatabaseInfo(): array
    {
        return [
            'type' => 'SQLite',
            'version' => $this->pdo->getAttribute(PDO::ATTR_SERVER_VERSION),
            'connected' => $this->testConnection(),
            'path' => '/var/www/seed/hello.db'
        ];
    }
} 