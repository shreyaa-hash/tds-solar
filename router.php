<?php
// router.php
// Custom router for PHP built-in web server to run tdssolar replica locally.

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = urldecode($uri);

// 1. Handle static assets (CSS, JS, Fonts, Images, Videos)
$ext = pathinfo($uri, PATHINFO_EXTENSION);
$static_extensions = ['css', 'js', 'png', 'jpg', 'jpeg', 'gif', 'svg', 'webp', 'woff', 'woff2', 'ttf', 'otf', 'ico', 'mp4', 'webm', 'html'];

if (in_array(strtolower($ext), $static_extensions)) {
    $basename = basename($uri);
    
    // Find where the file is stored locally in css/, js/, fonts/, or images/
    $local_path = null;
    
    // If the request path contains a specific folder hint, check that first
    if (strpos($uri, 'css/') !== false && file_exists(__DIR__ . '/css/' . $basename)) {
        $local_path = __DIR__ . '/css/' . $basename;
    } elseif (strpos($uri, 'js/') !== false && file_exists(__DIR__ . '/js/' . $basename)) {
        $local_path = __DIR__ . '/js/' . $basename;
    } elseif (strpos($uri, 'fonts/') !== false) {
        // Search recursively inside fonts/ for the file
        $found = glob(__DIR__ . '/fonts/**/' . $basename);
        if ($found) {
            $local_path = $found[0];
        }
    }
    
    // Fallback: search in all folders
    if (!$local_path) {
        if (file_exists(__DIR__ . '/css/' . $basename)) {
            $local_path = __DIR__ . '/css/' . $basename;
        } elseif (file_exists(__DIR__ . '/js/' . $basename)) {
            $local_path = __DIR__ . '/js/' . $basename;
        } elseif (file_exists(__DIR__ . '/images/' . $basename)) {
            $local_path = __DIR__ . '/images/' . $basename;
        } else {
            // Recursive search inside fonts
            $found = glob(__DIR__ . '/fonts/**/' . $basename);
            if ($found) {
                $local_path = $found[0];
            }
        }
    }
    
    // If we found the file locally, serve it!
    if ($local_path && file_exists($local_path)) {
        serve_file($local_path, $ext);
        exit;
    }
    
    // If not found locally, proxy from the live site tdssolar.in
    // We construct the remote URL. Keep the path starting from /Public or whatever is requested.
    $remote_url = 'https://tdssolar.in' . $uri;
    
    // Let's attempt to download the file, cache it locally in images/ (or another folder) and serve it.
    // This makes sure subsequent requests are super fast!
    $file_content = @file_get_contents($remote_url);
    if ($file_content !== false) {
        // Save locally to cache it
        $target_dir = __DIR__ . '/images';
        if (strtolower($ext) === 'css') {
            $target_dir = __DIR__ . '/css';
        } elseif (strtolower($ext) === 'js') {
            $target_dir = __DIR__ . '/js';
        }
        
        // Ensure directory exists
        if (!is_dir($target_dir)) {
            mkdir($target_dir, 0777, true);
        }
        
        file_put_contents($target_dir . '/' . $basename, $file_content);
        
        // Serve the downloaded content
        serve_file($target_dir . '/' . $basename, $ext);
        exit;
    }
    
    // Return 404 if not found anywhere
    header("HTTP/1.0 404 Not Found");
    echo "404 Not Found: " . htmlspecialchars($uri);
    exit;
}

// 2. Map page requests to PHP files under /php/
$basename = basename($uri);

// Default to index.php if root or empty basename or index.html
if ($uri === '/' || $basename === '' || $basename === 'index.php' || $basename === 'index.html') {
    $php_file = 'index.php';
} else {
    // If the request doesn't end with .php, append .php
    if (pathinfo($basename, PATHINFO_EXTENSION) === '') {
        $basename .= '.php';
    }
    $php_file = $basename;
}

// Handle spelling mismatch
if ($php_file === 'microinverter.php') {
    $php_file = 'microinverteer.php';
}

$target_php_path = __DIR__ . '/php/' . $php_file;

if (file_exists($target_php_path)) {
    // Set environment and server variables so the script knows where it is running
    $_SERVER['SCRIPT_FILENAME'] = $target_php_path;
    $_SERVER['SCRIPT_NAME'] = '/' . $php_file;
    
    // Run the PHP file!
    require $target_php_path;
    exit;
}

// Return 404 if no PHP file matches
header("HTTP/1.0 404 Not Found");
echo "404 Page Not Found: " . htmlspecialchars($uri);
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
