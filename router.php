<?php
// router.php
// Custom router for PHP built-in web server to serve the redesigned React build from dist/

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = urldecode($uri);

// 1. If it's a direct file in the dist/ folder, serve it
$local_path = __DIR__ . '/dist' . $uri;

if ($uri !== '/' && file_exists($local_path) && !is_dir($local_path)) {
    $ext = pathinfo($local_path, PATHINFO_EXTENSION);
    serve_file($local_path, $ext);
    exit;
}

// 2. Fallback: serve dist/index.html for React routing to handle
$index_path = __DIR__ . '/dist/index.html';
if (file_exists($index_path)) {
    serve_file($index_path, 'html');
    exit;
}

// 3. Absolute Fallback if dist/index.html doesn't exist
header("HTTP/1.0 404 Not Found");
echo "Redesigned app build not found. Please run 'npm run build' first.";
exit;

// Helper to serve file with correct headers
function serve_file($path, $ext) {
    $mime_types = [
        'css'  => 'text/css',
        'js'   => 'application/javascript',
        'png'  => 'image/png',
        'jpg'  => 'image/jpeg',
        'jpeg' => 'image/jpeg',
        'gif'  => 'image/gif',
        'svg'  => 'image/svg+xml',
        'webp' => 'image/webp',
        'woff' => 'font/woff',
        'woff2'=> 'font/woff2',
        'ttf'  => 'font/ttf',
        'otf'  => 'font/otf',
        'ico'  => 'image/x-icon',
        'mp4'  => 'video/mp4',
        'webm' => 'video/webm',
        'html' => 'text/html'
    ];
    
    $mime = isset($mime_types[strtolower($ext)]) ? $mime_types[strtolower($ext)] : 'application/octet-stream';
    header('Content-Type: ' . $mime);
    header('Content-Length: ' . filesize($path));
    readfile($path);
}
