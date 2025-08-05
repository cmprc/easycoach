<?php

// Set headers for API
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Autoload all required classes
require_once __DIR__ . '/../app/Database/DatabaseConnection.php';
require_once __DIR__ . '/../app/Repositories/PlayerRepository.php';
require_once __DIR__ . '/../app/Services/PlayerService.php';
require_once __DIR__ . '/../app/Controllers/PlayerController.php';
require_once __DIR__ . '/../app/Container/Container.php';

use App\Container\Container;

// Parse the request path
$path = $_GET['REQUEST_URI'] ?? $_SERVER['REQUEST_URI'] ?? '';
$path = parse_url($path, PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

// Initialize container and get controller
$container = Container::getInstance();
$playerController = $container->get('playerController');

// Router with proper error handling and validation
try {
    switch (true) {
        case $path === '/api/health':
            $response = $playerController->getHealthStatus();
            echo json_encode($response);
            break;

        case $path === '/api/players':
            // Validate and sanitize input parameters
            $page = max(1, (int)($_GET['page'] ?? 1));
            $perPage = min(50, max(1, (int)($_GET['perPage'] ?? 10)));
            $search = trim($_GET['search'] ?? '');

            $result = $playerController->getAllPlayers($page, $perPage, $search);
            echo json_encode($result);
            break;

        case preg_match('#^/api/players/(\d+)$#', $path, $matches):
            $id = (int)$matches[1];
            
            if ($id <= 0) {
                http_response_code(400);
                echo json_encode([
                    'error' => 'Invalid player ID',
                    'message' => 'Player ID must be a positive integer'
                ]);
                break;
            }
            
            $player = $playerController->getPlayerById($id);
            
            if (!$player) {
                http_response_code(404);
                echo json_encode([
                    'error' => 'Player not found',
                    'message' => "Player with ID $id does not exist"
                ]);
                break;
            }
            
            echo json_encode($player);
            break;

        case preg_match('#^/api/players/(\d+)/sessions$#', $path, $matches):
            $id = (int)$matches[1];
            $page = max(1, (int)($_GET['page'] ?? 1));
            $perPage = min(50, max(1, (int)($_GET['perPage'] ?? 10)));
            
            if ($id <= 0) {
                http_response_code(400);
                echo json_encode([
                    'error' => 'Invalid player ID',
                    'message' => 'Player ID must be a positive integer'
                ]);
                break;
            }
            
            $result = $playerController->getPlayerSessions($id, $page, $perPage);
            
            if (!$result) {
                http_response_code(404);
                echo json_encode([
                    'error' => 'Player not found',
                    'message' => "Player with ID $id does not exist"
                ]);
                break;
            }
            
            echo json_encode($result);
            break;

        case $path === '/api/players/search':
            $search = trim($_GET['q'] ?? '');
            $limit = min(50, max(1, (int)($_GET['limit'] ?? 10)));
            
            if (strlen($search) < 2) {
                http_response_code(400);
                echo json_encode([
                    'error' => 'Invalid search term',
                    'message' => 'Search term must be at least 2 characters long'
                ]);
                break;
            }
            
            $result = $playerController->searchPlayers($search, $limit);
            echo json_encode($result);
            break;

        default:
            http_response_code(404);
            echo json_encode([
                'error' => 'Endpoint not found',
                'message' => 'EasyCoach API',
                'status' => 'active',
                'version' => '1.0.0',
                'architecture' => 'Layered (Controller-Service-Repository)',
                'dependency_injection' => 'Container-based',
                'endpoints' => [
                    'GET /api/players' => 'List all players with pagination',
                    'GET /api/players/{id}' => 'Get player details',
                    'GET /api/players/{id}/sessions' => 'Get player sessions',
                    'GET /api/players/search' => 'Search players',
                    'GET /api/health' => 'Health check with database info'
                ],
                'timestamp' => date('Y-m-d H:i:s')
            ]);
            break;
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Internal server error',
        'message' => 'An unexpected error occurred',
        'timestamp' => date('Y-m-d H:i:s'),
        'details' => 'Check server logs for more information'
    ]);
    error_log("API Error: " . $e->getMessage());
} 