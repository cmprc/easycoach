<?php

namespace App\Container;

use App\Database\DatabaseConnection;
use App\Repositories\PlayerRepository;
use App\Services\PlayerService;
use App\Controllers\PlayerController;

class Container
{
    private static $instance = null;
    private $services = [];
    
    private function __construct()
    {
        $this->registerServices();
    }
    
    public static function getInstance(): self
    {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    private function registerServices(): void
    {
        $this->services['database'] = function() {
            return DatabaseConnection::getInstance();
        };
        
        $this->services['playerRepository'] = function() {
            $dbConnection = $this->get('database');
            return new PlayerRepository($dbConnection->getConnection());
        };
        
        $this->services['playerService'] = function() {
            $playerRepository = $this->get('playerRepository');
            return new PlayerService($playerRepository);
        };
        
        $this->services['playerController'] = function() {
            $playerService = $this->get('playerService');
            return new PlayerController($playerService);
        };
    }
    
    public function get(string $serviceName)
    {
        if (!isset($this->services[$serviceName])) {
            throw new \Exception("Service '{$serviceName}' not found");
        }
        
        if (is_callable($this->services[$serviceName])) {
            $this->services[$serviceName] = $this->services[$serviceName]();
        }
        
        return $this->services[$serviceName];
    }
    
    public function has(string $serviceName): bool
    {
        return isset($this->services[$serviceName]);
    }
    
    public function getServices(): array
    {
        return array_keys($this->services);
    }
} 