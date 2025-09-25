import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

interface LoginCredentials {
  username: string;
  password: string;
}

// 模拟用户数据库（实际项目中应使用真实数据库）
const mockUsers = [
  {
    id: 1,
    username: 'admin',
    password: 'admin123', // 实际项目中应使用哈希密码
    role: 'superadmin',
    name: '超级管理员'
  },
  {
    id: 2,
    username: 'editor',
    password: 'editor123',
    role: 'editor',
    name: '内容编辑'
  },
  {
    id: 3,
    username: 'viewer',
    password: 'viewer123',
    role: 'viewer',
    name: '数据查看员'
  }
];

// 从环境变量中读取JWT密钥
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { username, password }: LoginCredentials = req.body;
      
      // 验证输入
      if (!username || !password) {
        return res.status(400).json({ error: '请输入用户名和密码' });
      }
      
      // 查找用户
      const user = mockUsers.find(
        u => u.username === username && u.password === password
      );
      
      if (!user) {
        return res.status(401).json({ error: '用户名或密码错误' });
      }
      
      // 生成JWT令牌
      const token = jwt.sign(
        {
          userId: user.id,
          username: user.username,
          role: user.role
        },
        JWT_SECRET,
        {
          expiresIn: '24h' // 令牌有效期
        }
      );
      
      res.status(200).json({
        success: true,
        token,
        user: {
          id: user.id,
          username: user.username,
          role: user.role,
          name: user.name
        }
      });
    } catch (error) {
      console.error('登录过程中出错:', error);
      res.status(500).json({ error: '登录失败，请稍后重试' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}