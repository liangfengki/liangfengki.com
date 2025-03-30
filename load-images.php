<?php
/**
 * PHP脚本：扫描images文件夹中的图片并返回图片信息
 * 支持自动从JPEG图片中提取EXIF信息
 */

header('Content-Type: application/json');

// 配置
$imagesBaseDir = 'images';
$allowedCategories = ['photography', 'design'];
$allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];

// 结果数组
$result = [
    'success' => false,
    'message' => '',
    'images' => []
];

// 检查images目录是否存在
if (!is_dir($imagesBaseDir)) {
    // 如果目录不存在，尝试创建
    if (!mkdir($imagesBaseDir, 0755, true)) {
        $result['message'] = 'images目录不存在且无法创建';
        echo json_encode($result);
        exit;
    }
    
    // 创建子目录
    mkdir($imagesBaseDir . '/photography', 0755, true);
    mkdir($imagesBaseDir . '/photography/landscape', 0755, true);
    mkdir($imagesBaseDir . '/photography/portrait', 0755, true);
    mkdir($imagesBaseDir . '/photography/architecture', 0755, true);
    mkdir($imagesBaseDir . '/design', 0755, true);
    mkdir($imagesBaseDir . '/design/branding', 0755, true);
    mkdir($imagesBaseDir . '/design/ui', 0755, true);
    
    // 创建示例占位图
    for ($i = 1; $i <= 3; $i++) {
        $randomUrl = "https://source.unsplash.com/random/1920x1080/?landscape&sig=" . mt_rand(1, 1000000);
        $imageContent = @file_get_contents($randomUrl);
        if ($imageContent) {
            file_put_contents($imagesBaseDir . "/photography/landscape/sample{$i}.jpg", $imageContent);
        }
        
        $randomUrl = "https://source.unsplash.com/random/1920x1080/?portrait&sig=" . mt_rand(1, 1000000);
        $imageContent = @file_get_contents($randomUrl);
        if ($imageContent) {
            file_put_contents($imagesBaseDir . "/photography/portrait/sample{$i}.jpg", $imageContent);
        }
        
        $randomUrl = "https://source.unsplash.com/random/1920x1080/?design&sig=" . mt_rand(1, 1000000);
        $imageContent = @file_get_contents($randomUrl);
        if ($imageContent) {
            file_put_contents($imagesBaseDir . "/design/branding/sample{$i}.jpg", $imageContent);
        }
    }
    
    $result['message'] = 'images目录和示例图片已创建';
}

// 递归扫描图片函数
function scanImagesDir($dir, &$images, $baseDir) {
    global $allowedExtensions;
    
    if (!is_dir($dir)) {
        return;
    }
    
    $files = scandir($dir);
    
    foreach ($files as $file) {
        if ($file === '.' || $file === '..') {
            continue;
        }
        
        $path = $dir . '/' . $file;
        
        if (is_dir($path)) {
            scanImagesDir($path, $images, $baseDir);
        } else {
            // 检查文件扩展名
            $extension = strtolower(pathinfo($file, PATHINFO_EXTENSION));
            if (in_array($extension, $allowedExtensions)) {
                // 获取相对路径
                $relativePath = str_replace($baseDir . '/', '', $path);
                
                // 生成图片信息
                $imageInfo = getImageInfo($path, $relativePath);
                
                if ($imageInfo) {
                    $images[] = $imageInfo;
                }
            }
        }
    }
}

// 获取图片信息函数
function getImageInfo($path, $relativePath) {
    global $allowedCategories;
    
    // 提取类别（基于目录结构）
    $pathParts = explode('/', $relativePath);
    $category = isset($pathParts[0]) && in_array($pathParts[0], $allowedCategories) 
        ? $pathParts[0] 
        : 'other';
        
    $subcategory = isset($pathParts[1]) ? $pathParts[1] : '';
    
    // 获取图片文件名（不含扩展名）
    $filename = pathinfo($path, PATHINFO_FILENAME);
    $title = ucwords(str_replace(['_', '-'], ' ', $filename));
    
    // 图片信息数组
    $imageInfo = [
        'id' => uniqid(),
        'title' => $title,
        'category' => $category,
        'description' => generateDescription($category, $subcategory, $title),
        'thumbnail' => $relativePath,
        'images' => [$relativePath],
        'date' => date('Y-m-d', filemtime($path)),
        'location' => generateLocation($category, $subcategory),
        'tags' => generateTags($category, $subcategory),
    ];
    
    // 如果是摄影类图片，尝试提取EXIF信息
    if ($category === 'photography' && in_array(strtolower(pathinfo($path, PATHINFO_EXTENSION)), ['jpg', 'jpeg'])) {
        $exif = @exif_read_data($path);
        
        if ($exif) {
            $imageInfo['exif'] = [
                'camera' => isset($exif['Model']) ? $exif['Model'] : '未知相机',
                'lens' => isset($exif['UndefinedTag:0xA434']) ? $exif['UndefinedTag:0xA434'] : '未知镜头',
                'aperture' => isset($exif['COMPUTED']['ApertureFNumber']) ? $exif['COMPUTED']['ApertureFNumber'] : 'f/未知',
                'shutter' => isset($exif['ExposureTime']) ? formatShutterSpeed($exif['ExposureTime']) : '未知',
                'iso' => isset($exif['ISOSpeedRatings']) ? $exif['ISOSpeedRatings'] : '未知',
                'focal' => isset($exif['FocalLength']) ? formatFocalLength($exif['FocalLength']) : '未知',
            ];
        } else {
            // 如果没有真实EXIF数据，生成模拟数据
            $imageInfo['exif'] = generateExifInfo($subcategory);
        }
    }
    
    return $imageInfo;
}

// 辅助函数：格式化快门速度
function formatShutterSpeed($speed) {
    if (is_string($speed) && strpos($speed, '/') !== false) {
        return $speed . 's';
    }
    
    if (is_numeric($speed)) {
        if ($speed >= 1) {
            return $speed . 's';
        } else {
            $fraction = '1/' . round(1 / $speed);
            return $fraction . 's';
        }
    }
    
    return $speed;
}

// 辅助函数：格式化焦距
function formatFocalLength($focal) {
    if (is_string($focal) && strpos($focal, '/') !== false) {
        list($numerator, $denominator) = explode('/', $focal);
        if ($denominator > 0) {
            return round($numerator / $denominator) . 'mm';
        }
    }
    
    return $focal . 'mm';
}

// 辅助函数：生成描述
function generateDescription($category, $subcategory, $title) {
    if ($category === 'photography') {
        $descriptions = [
            'landscape' => [
                '在壮丽的自然风景中捕捉到的一瞬间，展现了大自然的无限魅力。',
                '这张照片展示了令人惊叹的自然景观，让人感受到大自然的宏伟与和谐。',
                '在探索自然的过程中拍摄的这张照片，记录了地球上的无尽美景。'
            ],
            'portrait' => [
                '这张人像作品捕捉到了真实的情感和个性，展现了人物内在的精神世界。',
                '通过精心构图和光线处理，这张人像呈现出独特的氛围和情感。',
                '在自然光线下拍摄的人像，展现了模特的自然魅力和真实表情。'
            ],
            'architecture' => [
                '这张建筑摄影作品展示了线条、几何形状和光影的完美结合。',
                '通过独特的视角捕捉到的建筑细节，展现了现代建筑的艺术感和质感。',
                '这张照片记录了独特的建筑风格和设计理念，展现了城市的建筑美学。'
            ]
        ];
        
        $subcategoryDescriptions = isset($descriptions[$subcategory]) ? $descriptions[$subcategory] : $descriptions['landscape'];
        return $subcategoryDescriptions[array_rand($subcategoryDescriptions)];
    } else {
        $descriptions = [
            'branding' => [
                '为客户创建的品牌标识设计，注重简洁性和可识别性，完美传达品牌理念。',
                '这个品牌设计项目包括了标志、色彩系统和字体选择，形成了一致的品牌形象。',
                '通过深入了解客户需求后创作的品牌设计，兼具美感和实用性。'
            ],
            'ui' => [
                '这个用户界面设计专注于用户体验和交互设计，确保直观易用的操作流程。',
                '为移动应用创建的用户界面，注重视觉层次和信息架构，提供流畅的用户体验。',
                '这套界面设计基于用户研究和行业最佳实践，平衡了美学和功能性。'
            ]
        ];
        
        $subcategoryDescriptions = isset($descriptions[$subcategory]) ? $descriptions[$subcategory] : $descriptions['branding'];
        return $subcategoryDescriptions[array_rand($subcategoryDescriptions)];
    }
}

// 辅助函数：生成模拟EXIF信息
function generateExifInfo($subcategory) {
    $cameras = [
        'landscape' => ['Canon EOS 5D Mark IV', 'Nikon Z7 II', 'Sony A7R IV'],
        'portrait' => ['Canon EOS R6', 'Sony A7 IV', 'Nikon Z6 II'],
        'architecture' => ['Canon EOS R5', 'Nikon D850', 'Sony A7R III']
    ];
    
    $lenses = [
        'landscape' => ['Canon RF 15-35mm f/2.8L', 'Nikon Z 14-30mm f/4 S', 'Sony FE 16-35mm f/2.8 GM'],
        'portrait' => ['Canon RF 85mm f/1.2L', 'Nikon Z 85mm f/1.8 S', 'Sony FE 85mm f/1.4 GM'],
        'architecture' => ['Canon TS-E 24mm f/3.5L II', 'Nikon PC-E 19mm f/4E ED', 'Sony FE 12-24mm f/2.8 GM']
    ];
    
    $apertures = ['f/2.8', 'f/4.0', 'f/5.6', 'f/8.0', 'f/11.0', 'f/16.0'];
    $shutters = ['1/60s', '1/125s', '1/250s', '1/500s', '1/1000s'];
    $isos = ['100', '200', '400', '800'];
    $focals = ['16mm', '24mm', '35mm', '50mm', '85mm', '135mm'];
    
    // 根据子类别选择相应的设备
    $camera_array = isset($cameras[$subcategory]) ? $cameras[$subcategory] : array_merge(...array_values($cameras));
    $lens_array = isset($lenses[$subcategory]) ? $lenses[$subcategory] : array_merge(...array_values($lenses));
    
    return [
        'camera' => $camera_array[array_rand($camera_array)],
        'lens' => $lens_array[array_rand($lens_array)],
        'aperture' => $apertures[array_rand($apertures)],
        'shutter' => $shutters[array_rand($shutters)],
        'iso' => $isos[array_rand($isos)],
        'focal' => $focals[array_rand($focals)]
    ];
}

// 辅助函数：生成标签
function generateTags($category, $subcategory) {
    $tags = [];
    
    if ($category === 'photography') {
        $tags[] = '摄影';
        
        switch ($subcategory) {
            case 'landscape':
                $tags = array_merge($tags, ['风景', '自然', '户外']);
                $randomTags = ['山脉', '海洋', '湖泊', '森林', '日落', '日出', '云彩'];
                break;
            case 'portrait':
                $tags = array_merge($tags, ['人像', '模特']);
                $randomTags = ['表情', '情绪', '黑白', '色彩', '光影', '故事性'];
                break;
            case 'architecture':
                $tags = array_merge($tags, ['建筑', '结构']);
                $randomTags = ['城市', '几何', '线条', '现代', '古典', '对称', '视角'];
                break;
            default:
                $randomTags = ['构图', '光线', '情感', '瞬间', '视觉', '艺术', '创意'];
        }
    } else {
        $tags[] = '设计';
        
        switch ($subcategory) {
            case 'branding':
                $tags = array_merge($tags, ['品牌', '标志']);
                $randomTags = ['标识', '企业形象', '视觉识别', '现代', '极简', '创意'];
                break;
            case 'ui':
                $tags = array_merge($tags, ['界面', 'UI', 'UX']);
                $randomTags = ['应用', '网页', '交互', '用户体验', '响应式', '原型', '布局'];
                break;
            default:
                $randomTags = ['创意', '视觉', '排版', '色彩', '构成', '概念', '美学'];
        }
    }
    
    // 随机选择2-3个标签
    $selectedRandomTags = array_slice($randomTags, 0, mt_rand(2, 3));
    return array_merge($tags, $selectedRandomTags);
}

// 辅助函数：生成位置信息
function generateLocation($category, $subcategory) {
    if ($category === 'photography') {
        $locations = [
            'landscape' => ['云南大理', '新疆喀纳斯', '西藏纳木错', '四川九寨沟', '青海湖', '张家界'],
            'portrait' => ['工作室', '城市街头', '公园', '海滩', '田野', '咖啡馆'],
            'architecture' => ['北京三里屯', '上海外滩', '深圳平安大厦', '广州塔', '杭州西湖', '重庆洪崖洞']
        ];
        
        $locationArray = isset($locations[$subcategory]) ? $locations[$subcategory] : array_merge(...array_values($locations));
        return $locationArray[array_rand($locationArray)];
    } else {
        return '工作室项目';
    }
}

// 开始扫描图片
$images = [];
scanImagesDir($imagesBaseDir, $images, $imagesBaseDir);

// 返回结果
$result['success'] = true;
$result['message'] = '已扫描到 ' . count($images) . ' 张图片';
$result['images'] = $images;

echo json_encode($result, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT); 