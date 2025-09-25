import type { NextApiRequest, NextApiResponse } from 'next';

interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  company: string;
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const data: ContactFormData = req.body;
      
      // 简单的表单验证
      if (!data.name || !data.email || !data.message) {
        return res.status(400).json({ error: '请填写所有必填字段' });
      }
      
      // 这里可以添加邮件发送逻辑或数据库存储逻辑
      // 目前仅作为示例，记录到控制台
      console.log('收到联系表单提交:', data);
      
      // 模拟成功响应
      res.status(200).json({ success: true, message: '提交成功，我们会尽快联系您' });
    } catch (error) {
      console.error('处理表单提交时出错:', error);
      res.status(500).json({ error: '提交失败，请稍后重试' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}