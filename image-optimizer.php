<?php
/**
 * 图片压缩优化脚本
 * 用于处理上传的图片，自动压缩并生成多种尺寸
 */

// 设置错误报告
ini_set('display_errors', 1);
error_reporting(E_ALL);

// 配置
$config = [
    'input_dir' => 'images',
    'quality' => 85,  // JPEG压缩质量
    'sizes' => [
        'thumbnail' => [300, 300],
        'medium' => [800, 800],
        'large' => [1920, 1080]
    ],
    'extensions' => ['jpg', 'jpeg', 'png']
];

// 创建日志函数
function logMessage($message) {
    echo date('Y-m-d H:i:s') . ' - ' . $message . PHP_EOL;
}

// 检查GD库是否可用
if (!extension_loaded('gd')) {
    logMessage('错误: GD库未安装，无法处理图片');
    exit(1);
}

// 检查输入目录
if (!is_dir($config['input_dir'])) {
    logMessage("警告: 输入目录 {$config['input_dir']} 不存在，尝试创建...");
    if (!mkdir($config['input_dir'], 0755, true)) {
        logMessage("错误: 无法创建输入目录 {$config['input_dir']}");
        exit(1);
    }
}

// 递归处理目录
function processDirectory($dir) {
    global $config;
    
    $files = scandir($dir);
    
    foreach ($files as $file) {
        if ($file === '.' || $file === '..') {
            continue;
        }
        
        $path = $dir . '/' . $file;
        
        if (is_dir($path)) {
            processDirectory($path);
        } else {
            $extension = strtolower(pathinfo($file, PATHINFO_EXTENSION));
            if (in_array($extension, $config['extensions'])) {
                optimizeImage($path, $extension);
            }
        }
    }
}

// 图片优化函数
function optimizeImage($path, $extension) {
    global $config;
    
    logMessage("处理图片: $path");
    
    // 读取图片
    switch ($extension) {
        case 'jpg':
        case 'jpeg':
            $image = imagecreatefromjpeg($path);
            break;
        case 'png':
            $image = imagecreatefrompng($path);
            break;
        default:
            logMessage("不支持的图片格式: $extension");
            return;
    }
    
    if (!$image) {
        logMessage("无法读取图片: $path");
        return;
    }
    
    // 优化原始图片
    logMessage("优化原始图片: $path");
    optimizeOriginal($path, $extension, $image);
    
    // 生成缩略图
    $pathInfo = pathinfo($path);
    $dirname = $pathInfo['dirname'];
    $filename = $pathInfo['filename'];
    
    // 检查是否存在缩略图目录，如果不存在则创建
    $thumbsDir = $dirname . '/thumbs';
    if (!is_dir($thumbsDir)) {
        if (!mkdir($thumbsDir, 0755, true)) {
            logMessage("警告: 无法创建缩略图目录: $thumbsDir");
            return;
        }
    }
    
    // 生成不同尺寸的图片
    foreach ($config['sizes'] as $sizeName => $dimensions) {
        $thumbPath = $thumbsDir . '/' . $filename . '_' . $sizeName . '.' . $extension;
        generateThumbnail($image, $thumbPath, $extension, $dimensions[0], $dimensions[1]);
    }
    
    // 释放内存
    imagedestroy($image);
}

// 优化原始图片
function optimizeOriginal($path, $extension, $image) {
    global $config;
    
    // 获取原始尺寸
    $width = imagesx($image);
    $height = imagesy($image);
    
    // 如果图片超过大尺寸限制，则调整大小
    $maxSize = $config['sizes']['large'];
    if ($width > $maxSize[0] || $height > $maxSize[1]) {
        // 计算新尺寸
        $ratio = min($maxSize[0] / $width, $maxSize[1] / $height);
        $newWidth = round($width * $ratio);
        $newHeight = round($height * $ratio);
        
        // 创建新图像
        $newImage = imagecreatetruecolor($newWidth, $newHeight);
        
        // 处理PNG透明度
        if ($extension === 'png') {
            imagealphablending($newImage, false);
            imagesavealpha($newImage, true);
        }
        
        // 重新采样
        imagecopyresampled($newImage, $image, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height);
        
        // 保存优化后的图片
        saveImage($newImage, $path, $extension);
        
        // 释放内存
        imagedestroy($newImage);
        
        logMessage("已调整大小: $width x $height -> $newWidth x $newHeight");
    } else {
        // 如果不需要调整大小，直接优化
        saveImage($image, $path, $extension);
    }
}

// 生成缩略图
function generateThumbnail($image, $thumbPath, $extension, $maxWidth, $maxHeight) {
    global $config;
    
    // 获取原始尺寸
    $width = imagesx($image);
    $height = imagesy($image);
    
    // 计算新尺寸，保持宽高比
    $ratio = min($maxWidth / $width, $maxHeight / $height);
    $newWidth = round($width * $ratio);
    $newHeight = round($height * $ratio);
    
    // 创建新图像
    $newImage = imagecreatetruecolor($newWidth, $newHeight);
    
    // 处理PNG透明度
    if ($extension === 'png') {
        imagealphablending($newImage, false);
        imagesavealpha($newImage, true);
    }
    
    // 重新采样
    imagecopyresampled($newImage, $image, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height);
    
    // 保存缩略图
    saveImage($newImage, $thumbPath, $extension);
    
    // 释放内存
    imagedestroy($newImage);
    
    logMessage("已生成缩略图: $thumbPath ($newWidth x $newHeight)");
}

// 保存图片
function saveImage($image, $path, $extension) {
    global $config;
    
    switch ($extension) {
        case 'jpg':
        case 'jpeg':
            imagejpeg($image, $path, $config['quality']);
            break;
        case 'png':
            // PNG压缩级别：0（无压缩）到9（最大压缩）
            $pngQuality = floor((100 - $config['quality']) * 9 / 100);
            imagepng($image, $path, $pngQuality);
            break;
    }
}

// 主函数
function main() {
    global $config;
    
    logMessage("开始图片优化处理...");
    processDirectory($config['input_dir']);
    logMessage("图片优化处理完成");
}

// 如果从命令行运行，则执行主函数
if (php_sapi_name() === 'cli') {
    main();
} else {
    // Web界面
    echo '<!DOCTYPE html>
    <html lang="zh">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>图片优化工具</title>
        <style>
            body {
                font-family: "Open Sans", sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 800px;
                margin: 0 auto;
                padding: 20px;
            }
            h1 {
                color: #546E7A;
                margin-bottom: 30px;
            }
            .btn {
                background-color: #546E7A;
                color: white;
                border: none;
                padding: 10px 20px;
                font-size: 16px;
                cursor: pointer;
                border-radius: 4px;
            }
            .btn:hover {
                background-color: #29434E;
            }
            .log {
                background-color: #f5f5f5;
                border: 1px solid #ddd;
                padding: 15px;
                border-radius: 4px;
                margin-top: 20px;
                max-height: 400px;
                overflow-y: auto;
                white-space: pre-wrap;
            }
            .settings {
                margin-bottom: 20px;
            }
            label {
                display: block;
                margin-bottom: 5px;
                font-weight: 600;
            }
            input[type="range"] {
                width: 100%;
                margin-bottom: 15px;
            }
            .quality-value {
                font-weight: bold;
            }
        </style>
    </head>
    <body>
        <h1>图片优化工具</h1>
        
        <div class="settings">
            <label for="quality">JPEG质量 (<span class="quality-value">' . $config['quality'] . '%</span>):</label>
            <input type="range" id="quality" name="quality" min="60" max="100" value="' . $config['quality'] . '" oninput="updateQuality(this.value)">
            
            <button class="btn" onclick="startOptimization()">开始优化图片</button>
        </div>
        
        <div class="log" id="log">等待优化操作...</div>
        
        <script>
            function updateQuality(value) {
                document.querySelector(".quality-value").textContent = value + "%";
            }
            
            function startOptimization() {
                const log = document.getElementById("log");
                log.textContent = "开始处理图片...\n";
                
                const quality = document.getElementById("quality").value;
                
                fetch("image-optimizer.php?action=optimize&quality=" + quality)
                    .then(response => response.text())
                    .then(data => {
                        log.textContent += data;
                    })
                    .catch(error => {
                        log.textContent += "错误: " + error;
                    });
            }
        </script>
    </body>
    </html>';
    
    // 如果是AJAX请求进行优化
    if (isset($_GET['action']) && $_GET['action'] === 'optimize') {
        // 设置质量
        if (isset($_GET['quality'])) {
            $config['quality'] = intval($_GET['quality']);
        }
        
        // 缓冲输出
        ob_start();
        main();
        echo ob_get_clean();
        exit;
    }
} 