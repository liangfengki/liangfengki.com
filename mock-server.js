const http = require('http');
const fs = require('fs');
const path = require('path');

// 模拟数据
const mockData = {
  // 模拟登录接口
  '/api/login': (req, res) => {
    // 简单的登录验证
    const body = [];
    req.on('data', chunk => {
      body.push(chunk);
    }).on('end', () => {
      const data = JSON.parse(Buffer.concat(body).toString());
      
      // 简单的登录验证（用户名和密码都为admin）
      if (data.username === 'admin' && data.password === 'admin') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: true,
          token: 'mock-jwt-token',
          user: {
            id: '1',
            username: 'admin',
            role: 'admin'
          }
        }));
      } else {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: false,
          message: '用户名或密码错误'
        }));
      }
    });
  },
  
  // 模拟获取仪表盘数据
  '/api/dashboard/stats': (req, res) => {
    // 验证token（简单验证）
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.includes('mock-jwt-token')) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        success: true,
        data: {
          visitors: {
            total: 1254,
            today: 148,
            increase: 12
          },
          pageViews: {
            total: 5689,
            today: 682,
            increase: 8
          },
          formSubmissions: {
            total: 89,
            today: 12,
            increase: 15
          },
          newUsers: {
            total: 24,
            today: 3,
            increase: -2
          }
        }
      }));
    } else {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        success: false,
        message: '未授权访问'
      }));
    }
  },
  
  // 模拟获取最近活动
  '/api/dashboard/activities': (req, res) => {
    // 验证token（简单验证）
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.includes('mock-jwt-token')) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        success: true,
        data: [
          { id: 1, action: '新文章发布', content: '《工商业储能解决方案最新进展》', time: '10分钟前', user: '内容编辑', type: 'success' },
          { id: 2, action: '表单提交', content: '来自上海的客户咨询', time: '1小时前', user: '系统', type: 'info' },
          { id: 3, action: '图片上传', content: '上传了5张产品图片', time: '3小时前', user: '内容编辑', type: 'info' },
          { id: 4, action: '系统登录', content: '管理员登录系统', time: '昨天', user: '超级管理员', type: 'success' },
          { id: 5, action: '内容更新', content: '更新了首页轮播图', time: '2天前', user: '内容编辑', type: 'warning' }
        ]
      }));
    } else {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        success: false,
        message: '未授权访问'
      }));
    }
  }
};

// 创建HTTP服务器
const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);
  
  // 处理API请求
  if (mockData[req.url]) {
    return mockData[req.url](req, res);
  }
  
  // 处理静态文件请求
  let filePath = req.url === '/' ? '/admin-preview.html' : req.url;
  let extname = String(path.extname(filePath)).toLowerCase();
  let contentType = 'text/html';
  
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.wasm': 'application/wasm'
  };
  
  contentType = mimeTypes[extname] || 'application/octet-stream';
  
  fs.readFile(__dirname + filePath, (error, content) => {
    if (error) {
      if(error.code == 'ENOENT'){
        fs.readFile(__dirname + '/admin-preview.html', (error, content) => {
          res.writeHead(200, { 'Content-Type': contentType });
          res.end(content, 'utf-8');
        });
      } else {
        res.writeHead(500);
        res.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

// 启动服务器
const PORT = process.env.PORT || 3003;
server.listen(PORT, () => {
  console.log(`Mock server running at http://localhost:${PORT}/`);
  console.log('模拟登录信息:');
  console.log('- 用户名: admin');
  console.log('- 密码: admin');
});