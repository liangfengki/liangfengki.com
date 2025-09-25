import React, { useState, useEffect } from 'react';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';
import '../../app/admin-styles.css';

// 登录表单数据接口
interface LoginFormData {
  username: string;
  password: string;
  remember?: boolean;
}

const AdminLogin: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm<LoginFormData>();

  // 安全地获取localStorage数据的函数
  const getLocalStorageItem = (key: string): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key);
    }
    return null;
  };

  // 安全地设置localStorage数据的函数
  const setLocalStorageItem = (key: string, value: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, value);
    }
  };

  // 安全地移除localStorage数据的函数
  const removeLocalStorageItem = (key: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
    }
  };

  useEffect(() => {
    // 检查用户是否已登录 - 只在客户端执行
    const token = getLocalStorageItem('adminToken');
    if (token) {
      // 已登录，重定向到仪表盘
      router.push('/admin/dashboard');
    }
  }, [router]);

  // 处理登录提交
  const handleLogin = async (values: LoginFormData) => {
    setLoading(true);
    try {
      // 这里是模拟登录，实际项目中应替换为真实的API调用
      const { username, password, remember } = values;
      
      // 模拟API请求延迟
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 模拟验证成功（实际项目中应根据API返回结果判断）
      if (username === 'admin' && password === 'admin123') {
        // 生成模拟的token和用户数据
        const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJleHAiOjE2OTMxOTc3MTZ9.fake-signature';
        const userData = JSON.stringify({
          id: 1,
          username: 'admin',
          role: 'superadmin',
          name: '管理员'
        });
        
        // 存储token和用户信息
        setLocalStorageItem('adminToken', mockToken);
        setLocalStorageItem('adminUser', userData);
        
        message.success('登录成功');
        
        // 重定向到仪表盘
        router.push('/admin/dashboard');
      } else {
        // 登录失败
        message.error('用户名或密码错误');
      }
    } catch (error) {
      console.error('登录失败:', error);
      message.error('登录失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  // 处理表单重置
  const handleReset = () => {
    form.resetFields();
  };

  return (
    <div className="login-container argon-login-container">
      <div className="login-bg-pattern">
        {/* 背景装饰 */}
      </div>
      <div className="login-wrapper">
        <div className="login-logo-container mb-8 text-center">
          <h1 className="login-logo argon-logo">
            管理<span className="login-logo-accent">后台</span>
          </h1>
        </div>
        
        <div className="login-card argon-card shadow-xl bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
          <div className="login-header argon-login-header p-6">
            <h2 className="login-title argon-login-title text-[clamp(1.5rem,3vw,2rem)] font-bold text-gray-800">欢迎回来</h2>
            <p className="login-subtitle argon-login-subtitle text-gray-500">请输入您的账号和密码以继续</p>
          </div>
          
          <div className="login-body argon-login-body p-6">
            <Form
              form={form}
              name="login_form"
              onFinish={handleLogin}
              initialValues={{
                remember: true,
              }}
              layout="vertical"
            >
              <Form.Item
                name="username"
                label={<span className="text-gray-700 font-medium">用户名</span>}
                rules={[
                  {
                    required: true,
                    message: '请输入用户名',
                  },
                ]}
                className="mb-6"
              >
                <Input
                  prefix={<UserOutlined className="text-blue-500" />
                  }
                  placeholder="请输入用户名"
                  size="large"
                  className="argon-input border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg transition-all"
                />
              </Form.Item>
              
              <Form.Item
                name="password"
                label={<span className="text-gray-700 font-medium">密码</span>}
                rules={[
                  {
                    required: true,
                    message: '请输入密码',
                  },
                ]}
                className="mb-6"
              >
                <Input
                  prefix={<LockOutlined className="text-blue-500" />
                  }
                  type="password"
                  placeholder="请输入密码"
                  size="large"
                  className="argon-input border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg transition-all"
                />
              </Form.Item>
              
              <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                  span: 24,
                }}
                className="mb-8"
              >
                <Checkbox className="text-gray-600">记住我</Checkbox>
              </Form.Item>
              
              <Form.Item className="mb-6">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full h-12 text-base argon-btn-primary bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all shadow-md hover:shadow-lg"
                  loading={loading}
                  size="large"
                >
                  {loading ? <><span className="loading-spinner mr-2"></span>登录中...</> : '登录'}
                </Button>
              </Form.Item>
              
              <Form.Item className="mb-0">
                <Button
                  type="default"
                  onClick={handleReset}
                  size="large"
                  className="w-full h-12 text-base argon-btn-outline border-blue-600 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                >
                  重置
                </Button>
              </Form.Item>
            </Form>
          </div>
          
          <div className="px-6 pb-6 text-center argon-login-footer">
            <p className="text-gray-500 text-sm">
              遇到问题？请联系系统管理员
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;