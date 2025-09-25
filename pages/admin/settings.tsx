import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { Layout, Menu, Typography, Button, Form, Input, Select, Switch, Upload, Card, Divider, message, Checkbox, Radio, Space } from 'antd';
import {
  SettingOutlined,
  UploadOutlined,
  SaveOutlined,
  ReloadOutlined,
  ArrowLeftOutlined,
  PlusOutlined,
  MinusOutlined,
  MailOutlined,
  BarChartOutlined
} from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd';
import type { RcFile, UploadFileStatus } from 'antd/es/upload/interface';

const { Header, Content, Sider } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

interface SiteSettings {
  siteName: string;
  siteDescription: string;
  siteLogo: string;
  favicon: string;
  themeColor: string;
  enableRegistration: boolean;
  enableComments: boolean;
  defaultTimezone: string;
  emailSettings: {
    smtpServer: string;
    smtpPort: number;
    smtpUser: string;
    smtpPassword: string;
    useSSL: boolean;
    fromEmail: string;
  };
  socialLinks: Array<{ name: string; url: string }>;
  maintenanceMode: boolean;
  maintenanceMessage: string;
}

const Settings: React.FC = () => {
  const router = useRouter();
  const [selectedMenuKey, setSelectedMenuKey] = React.useState('3-2');
  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = React.useState('basic');
  const [siteSettings, setSiteSettings] = React.useState<SiteSettings>({
    siteName: '',
    siteDescription: '',
    siteLogo: '',
    favicon: '',
    themeColor: '',
    enableRegistration: false,
    enableComments: false,
    defaultTimezone: '',
    emailSettings: {
      smtpServer: '',
      smtpPort: 0,
      smtpUser: '',
      smtpPassword: '',
      useSSL: false,
      fromEmail: '',
    },
    socialLinks: [],
    maintenanceMode: false,
    maintenanceMessage: '',
  });

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

  useEffect(() => {
    // 检查用户是否已登录 - 只在客户端执行
    const token = getLocalStorageItem('adminToken');
    const userData = getLocalStorageItem('adminUser');
    
    if (!token || !userData) {
      router.push('/admin');
      return;
    }

    // 模拟加载系统设置数据
    const mockSettings: SiteSettings = {
      siteName: '中科恒一',
      siteDescription: '领先的储能解决方案提供商',
      siteLogo: 'https://via.placeholder.com/120x40?text=Logo',
      favicon: 'https://via.placeholder.com/32x32?text=Favicon',
      themeColor: '#1890ff',
      enableRegistration: true,
      enableComments: true,
      defaultTimezone: 'Asia/Shanghai',
      emailSettings: {
        smtpServer: 'smtp.example.com',
        smtpPort: 465,
        smtpUser: 'admin@example.com',
        smtpPassword: 'password123',
        useSSL: true,
        fromEmail: 'admin@example.com',
      },
      socialLinks: [
        { name: '微信', url: 'https://weixin.example.com' },
        { name: '微博', url: 'https://weibo.example.com' },
        { name: 'LinkedIn', url: 'https://linkedin.example.com' },
      ],
      maintenanceMode: false,
      maintenanceMessage: '系统维护中，请稍后访问',
    };

    setSiteSettings(mockSettings);
    form.setFieldsValue({
      ...mockSettings,
      ...mockSettings.emailSettings,
    });
  }, [router, form]);

  const handleMenuClick = (e: { key: string }) => {
    setSelectedMenuKey(e.key);
    // 根据菜单项进行路由跳转
    switch (e.key) {
      case '1':
        router.push('/admin/dashboard');
        break;
      case '2-1':
        router.push('/admin/articles');
        break;
      case '2-2':
        router.push('/admin/images');
        break;
      case '2-3':
        router.push('/admin/videos');
        break;
      case '2-4':
        router.push('/admin/pages');
        break;
      case '3-1':
        router.push('/admin/users');
        break;
      case '3-2':
        router.push('/admin/settings');
        break;
      case '3-3':
        router.push('/admin/domain-records');
        break;
      case '3-4':
        router.push('/admin/server-records');
        break;
      case '4-1':
        router.push('/admin/visitor-stats');
        break;
      default:
        break;
    }
  };

  // 自定义上传组件的预览
  const getBase64 = (img: RcFile, callback: (url: string) => void): void => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  // 处理Logo上传前的检查
  const beforeUploadLogo = (file: RcFile): boolean | string => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('只能上传 JPG/PNG 格式的图片!');
      return Upload.LIST_IGNORE;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Logo 大小不能超过 2MB!');
      return Upload.LIST_IGNORE;
    }
    return true;
  };

  // 处理Logo上传后的回调 - 改进版
  const handleLogoChange = (info: {
    file: UploadFile;
    fileList: UploadFile[];
  }): void => {
    if (info.file.status === 'uploading') {
      // 上传中状态处理
      return;
    }
    
    if (info.file.status === 'done') {
      // 上传完成，使用response中的url（如果有）
      if (info.file.response && info.file.response.url) {
        setSiteSettings(prev => ({ ...prev, siteLogo: info.file.response.url }));
        form.setFieldValue('siteLogo', info.file.response.url);
      } else if (info.file.originFileObj) {
        // 降级方案：直接使用本地文件生成预览URL
        getBase64(info.file.originFileObj as RcFile, (url) => {
          setSiteSettings(prev => ({ ...prev, siteLogo: url }));
          form.setFieldValue('siteLogo', url);
        });
      }
      message.success(`${info.file.name} 上传成功`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 上传失败`);
    }
  };

  // 处理Favicon上传前的检查
  const beforeUploadFavicon = (file: RcFile): boolean | string => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('只能上传 JPG/PNG 格式的图片!');
      return Upload.LIST_IGNORE;
    }
    const isLt1M = file.size / 1024 / 1024 < 1;
    if (!isLt1M) {
      message.error('Favicon 大小不能超过 1MB!');
      return Upload.LIST_IGNORE;
    }
    return true;
  };

  // 处理Favicon上传后的回调 - 改进版
  const handleFaviconChange = (info: {
    file: UploadFile;
    fileList: UploadFile[];
  }): void => {
    if (info.file.status === 'uploading') {
      // 上传中状态处理
      return;
    }
    
    if (info.file.status === 'done') {
      // 上传完成，使用response中的url（如果有）
      if (info.file.response && info.file.response.url) {
        setSiteSettings(prev => ({ ...prev, favicon: info.file.response.url }));
        form.setFieldValue('favicon', info.file.response.url);
      } else if (info.file.originFileObj) {
        // 降级方案：直接使用本地文件生成预览URL
        getBase64(info.file.originFileObj as RcFile, (url) => {
          setSiteSettings(prev => ({ ...prev, favicon: url }));
          form.setFieldValue('favicon', url);
        });
      }
      message.success(`${info.file.name} 上传成功`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 上传失败`);
    }
  };

  // 添加社交链接
  const addSocialLink = () => {
    setSiteSettings(prev => ({
      ...prev,
      socialLinks: [...prev.socialLinks, { name: '', url: '' }],
    }));
  };

  // 移除社交链接
  const removeSocialLink = (index: number) => {
    setSiteSettings(prev => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((_, i) => i !== index),
    }));
  };

  // 更新社交链接
  const updateSocialLink = (index: number, field: 'name' | 'url', value: string) => {
    setSiteSettings(prev => ({
      ...prev,
      socialLinks: prev.socialLinks.map((link, i) => 
        i === index ? { ...link, [field]: value } : link
      ),
    }));
  };

  // 保存设置
  const handleSave = () => {
    form.validateFields().then(values => {
      // 合并基本设置和邮件设置
      const updatedSettings: SiteSettings = {
        ...siteSettings,
        ...values,
        emailSettings: {
          smtpServer: values.smtpServer,
          smtpPort: values.smtpPort,
          smtpUser: values.smtpUser,
          smtpPassword: values.smtpPassword,
          useSSL: values.useSSL,
          fromEmail: values.fromEmail,
        },
      };

      setSiteSettings(updatedSettings);
      message.success('设置已保存');

      // 实际项目中可能会发送请求到服务器保存设置
      // 这里我们将设置保存到localStorage以便演示
      setLocalStorageItem('siteSettings', JSON.stringify(updatedSettings));
    }).catch(info => {
      message.error('保存失败，请检查表单填写');
    });
  };

  // 重置设置
  const handleReset = () => {
    form.resetFields();
    message.info('设置已重置');
  };

  // Logo上传配置 - 修复版
  const logoUploadProps: UploadProps = {
    name: 'logo',
    accept: '.jpg,.jpeg,.png',
    beforeUpload: beforeUploadLogo,
    onChange: handleLogoChange,
    showUploadList: true,
    maxCount: 1,
    // 改进customRequest实现，确保文件状态流转正确
    customRequest: ({ file, onSuccess }) => {
      // 模拟上传过程
      setTimeout(() => {
        // 直接调用onSuccess，确保状态正确更新
        if (onSuccess) {
          onSuccess({
            url: URL.createObjectURL(file as Blob)
          });
        }
      }, 100);
    },
  };

  // Favicon上传配置 - 修复版
  const faviconUploadProps: UploadProps = {
    name: 'favicon',
    accept: '.jpg,.jpeg,.png',
    beforeUpload: beforeUploadFavicon,
    onChange: handleFaviconChange,
    showUploadList: true,
    maxCount: 1,
    // 改进customRequest实现
    customRequest: ({ file, onSuccess }) => {
      // 模拟上传过程
      setTimeout(() => {
        if (onSuccess) {
          onSuccess({
            url: URL.createObjectURL(file as Blob)
          });
        }
      }, 100);
    },
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={false}
        style={{ background: '#fff' }}
      >
        <div className="flex items-center justify-center h-16 border-b">
          <Title level={4} className="m-0 text-blue-600">
            管理后台
          </Title>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[selectedMenuKey]}
          style={{ height: '100%', borderRight: 0 }}
          onClick={handleMenuClick}
          items={[
            {
              key: '1',
              icon: <BarChartOutlined />,
              label: '仪表盘',
            },
            {
              key: '2',
              icon: <BarChartOutlined />,
              label: '内容管理',
              children: [
                {
                  key: '2-1',
                  icon: <BarChartOutlined />,
                  label: '文章管理',
                },
                {
                  key: '2-2',
                  icon: <BarChartOutlined />,
                  label: '图片管理',
                },
                {
                  key: '2-3',
                  icon: <BarChartOutlined />,
                  label: '视频管理',
                },
                {
                  key: '2-4',
                  icon: <BarChartOutlined />,
                  label: '页面管理',
                },
              ],
            },
            {
          key: '3',
          icon: <SettingOutlined />,
          label: '系统管理',
          children: [
            {
              key: '3-1',
              icon: <SettingOutlined />,
              label: '用户管理',
            },
            {
              key: '3-2',
              icon: <SettingOutlined />,
              label: '系统设置',
            },
            {
              key: '3-3',
              icon: <SettingOutlined />,
              label: '域名解析',
            },
            {
              key: '3-4',
              icon: <SettingOutlined />,
              label: '服务器解析',
            },
          ],
        },
            {
              key: '4',
              icon: <BarChartOutlined />,
              label: '数据统计分析',
              children: [
                {
                  key: '4-1',
                  icon: <BarChartOutlined />,
                  label: '访问统计',
                },
              ],
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background p-0 px-4 flex items-center border-b">
          <Title level={5} className="m-0 text-gray-700">
            系统设置
          </Title>
        </Header>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div className="site-layout-background p-4 rounded">
            {/* 标签页切换 */}
            <div className="mb-4">
              <div style={{ display: 'flex', gap: 8 }}>
                <Button 
                  type={activeTab === 'basic' ? 'primary' : 'default'} 
                  onClick={() => setActiveTab('basic')}
                >
                  基本设置
                </Button>
                <Button 
                  type={activeTab === 'email' ? 'primary' : 'default'} 
                  onClick={() => setActiveTab('email')}
                >
                  邮件设置
                </Button>
                <Button 
                  type={activeTab === 'advanced' ? 'primary' : 'default'} 
                  onClick={() => setActiveTab('advanced')}
                >
                  高级设置
                </Button>
              </div>
            </div>

            {/* 设置表单 */}
            <Form
              form={form}
              layout="vertical"
              className="max-w-3xl"
            >
              {activeTab === 'basic' && (
                <>
                  <Card title="网站基本信息" className="mb-4">
                    <Form.Item
                      label="网站名称"
                      name="siteName"
                      rules={[{ required: true, message: '请输入网站名称' }]}
                    >
                      <Input placeholder="请输入网站名称" />
                    </Form.Item>

                    <Form.Item
                      label="网站描述"
                      name="siteDescription"
                    >
                      <Input.TextArea rows={3} placeholder="请输入网站描述" />
                    </Form.Item>

                    <Form.Item label="网站Logo">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          {siteSettings.siteLogo && (
                            <img 
                              src={siteSettings.siteLogo} 
                              alt="网站Logo" 
                              className="w-32 h-10 object-contain border rounded"
                            />
                          )}
                        </div>
                        <Upload {...logoUploadProps}>
                          <Button icon={<UploadOutlined />}>上传Logo</Button>
                        </Upload>
                        <Text type="secondary">支持 JPG, PNG 格式，最大 2MB</Text>
                      </div>
                    </Form.Item>

                    <Form.Item label="网站图标(Favicon)">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          {siteSettings.favicon && (
                            <img 
                              src={siteSettings.favicon} 
                              alt="网站图标" 
                              className="w-8 h-8 object-contain border rounded"
                            />
                          )}
                        </div>
                        <Upload {...faviconUploadProps}>
                          <Button icon={<UploadOutlined />}>上传图标</Button>
                        </Upload>
                        <Text type="secondary">支持 JPG, PNG 格式，最大 1MB</Text>
                      </div>
                    </Form.Item>

                    <Form.Item
                      label="主题颜色"
                      name="themeColor"
                      initialValue="#1890ff"
                    >
                      <Input type="color" className="w-20 h-10 p-0 cursor-pointer" />
                    </Form.Item>
                  </Card>

                  <Card title="社交链接" className="mb-4">
                    <div className="space-y-4">
                      {siteSettings.socialLinks.map((link, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Form.Item className="flex-1">
                            <Input
                              placeholder="社交平台名称"
                              value={link.name}
                              onChange={(e) => updateSocialLink(index, 'name', e.target.value)}
                            />
                          </Form.Item>
                          <Form.Item className="flex-1">
                            <Input
                              placeholder="链接地址"
                              value={link.url}
                              onChange={(e) => updateSocialLink(index, 'url', e.target.value)}
                            />
                          </Form.Item>
                          <Button 
                            danger 
                            icon={<MinusOutlined />} 
                            onClick={() => removeSocialLink(index)}
                            disabled={siteSettings.socialLinks.length <= 1}
                          />
                        </div>
                      ))}
                      <Button 
                        type="dashed" 
                        icon={<PlusOutlined />} 
                        onClick={addSocialLink}
                        className="w-full"
                      >
                        添加社交链接
                      </Button>
                    </div>
                  </Card>
                </>
              )}

              {activeTab === 'email' && (
                <Card title="邮件配置" className="mb-4">
                  <Form.Item
                    label="SMTP服务器"
                    name="smtpServer"
                    rules={[{ required: true, message: '请输入SMTP服务器地址' }]}
                  >
                    <Input placeholder="请输入SMTP服务器地址" />
                  </Form.Item>

                  <Form.Item
                    label="SMTP端口"
                    name="smtpPort"
                    rules={[{ required: true, message: '请输入SMTP端口' }]}
                  >
                    <Input type="number" placeholder="请输入SMTP端口" />
                  </Form.Item>

                  <Form.Item
                    label="SMTP用户名"
                    name="smtpUser"
                    rules={[{ required: true, message: '请输入SMTP用户名' }]}
                  >
                    <Input placeholder="请输入SMTP用户名" />
                  </Form.Item>

                  <Form.Item
                    label="SMTP密码"
                    name="smtpPassword"
                  >
                    <Input.Password placeholder="请输入SMTP密码" />
                  </Form.Item>

                  <Form.Item
                    label="使用SSL"
                    name="useSSL"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>

                  <Form.Item
                    label="发件人邮箱"
                    name="fromEmail"
                    rules={[
                      { required: true, message: '请输入发件人邮箱' },
                      { type: 'email', message: '请输入有效的邮箱地址' }
                    ]}
                  >
                    <Input placeholder="请输入发件人邮箱" prefix={<MailOutlined />} />
                  </Form.Item>

                  <Button type="primary" icon={<MailOutlined />} className="mt-2">
                    发送测试邮件
                  </Button>
                </Card>
              )}

              {activeTab === 'advanced' && (
                <>
                  <Card title="功能开关" className="mb-4">
                    <Form.Item
                      label="允许用户注册"
                      name="enableRegistration"
                      valuePropName="checked"
                    >
                      <Switch />
                    </Form.Item>

                    <Form.Item
                      label="启用评论功能"
                      name="enableComments"
                      valuePropName="checked"
                    >
                      <Switch />
                    </Form.Item>

                    <Form.Item
                      label="默认时区"
                      name="defaultTimezone"
                    >
                      <Select placeholder="请选择默认时区">
                        <Option value="Asia/Shanghai">中国标准时间 (UTC+8)</Option>
                        <Option value="America/New_York">美国东部时间 (UTC-5)</Option>
                        <Option value="Europe/London">伦敦时间 (UTC+0)</Option>
                        <Option value="Asia/Tokyo">东京时间 (UTC+9)</Option>
                      </Select>
                    </Form.Item>
                  </Card>

                  <Card title="维护模式" className="mb-4">
                    <Form.Item
                      label="启用维护模式"
                      name="maintenanceMode"
                      valuePropName="checked"
                    >
                      <Switch />
                    </Form.Item>

                    <Form.Item
                      label="维护消息"
                      name="maintenanceMessage"
                    >
                      <Input.TextArea rows={3} placeholder="请输入维护消息" />
                    </Form.Item>
                  </Card>

                  <Card title="安全设置" className="mb-4">
                    <Form.Item>
                      <Checkbox.Group>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox value="2FA">启用两步验证</Checkbox>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox value="loginAlert">登录提醒</Checkbox>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox value="ipRestriction">IP限制</Checkbox>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox value="apiAccess">API访问控制</Checkbox>
                          </div>
                        </div>
                      </Checkbox.Group>
                    </Form.Item>
                  </Card>

                  <Card title="缓存设置" className="mb-4">
                    <Form.Item label="缓存类型">
                      <Radio.Group defaultValue="file">
                        <Radio value="file">文件缓存</Radio>
                        <Radio value="redis">Redis</Radio>
                        <Radio value="memcached">Memcached</Radio>
                        <Radio value="none">无缓存</Radio>
                      </Radio.Group>
                    </Form.Item>

                    <Form.Item
                      label="缓存有效期(分钟)"
                    >
                      <Input type="number" defaultValue="30" min={1} max={1440} />
                    </Form.Item>

                    <Button type="primary" danger className="mt-2">
                      清除缓存
                    </Button>
                  </Card>
                </>
              )}

              <Divider />

              {/* 操作按钮 */}
              <div className="flex justify-center space-x-4">
                <Button onClick={handleReset} icon={<ReloadOutlined />}>
                  重置
                </Button>
                <Button 
                  type="primary" 
                  onClick={handleSave} 
                  icon={<SaveOutlined />}
                >
                  保存设置
                </Button>
              </div>
            </Form>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Settings;