import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Layout, Menu, Typography, Button, Upload, Modal, message } from 'antd';
import { PlusOutlined, DeleteOutlined, ReloadOutlined, InboxOutlined, BarChartOutlined, SettingOutlined } from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd';
import type { RcFile } from 'antd/es/upload';

const { Header, Content, Sider } = Layout;
const { Title } = Typography;
const { Dragger } = Upload;

// 模拟图片数据
interface ImageData {
  id: string;
  name: string;
  url: string;
  size: number;
  type: string;
  uploadTime: string;
}

const Images: React.FC = () => {
  const router = useRouter();
  const [selectedMenuKey, setSelectedMenuKey] = React.useState('2-2');
  const [images, setImages] = React.useState<ImageData[]>([]);
  const [previewVisible, setPreviewVisible] = React.useState<boolean>(false);
  const [previewImage, setPreviewImage] = React.useState<string>('');
  const [previewTitle, setPreviewTitle] = React.useState<string>('');

  // 安全地获取localStorage数据的函数
  const getLocalStorageItem = (key: string): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key);
    }
    return null;
  };

  useEffect(() => {
    // 检查用户是否已登录 - 只在客户端执行
    const token = getLocalStorageItem('adminToken');
    const userData = getLocalStorageItem('adminUser');
    
    if (!token || !userData) {
      router.push('/admin');
      return;
    }

    // 模拟加载图片数据
    setImages([
      { id: '1', name: 'product-1.jpg', url: 'https://via.placeholder.com/300x200?text=Product+Image+1', size: 1024, type: 'image/jpeg', uploadTime: '2023-06-15 10:30' },
      { id: '2', name: 'product-2.jpg', url: 'https://via.placeholder.com/300x200?text=Product+Image+2', size: 1536, type: 'image/jpeg', uploadTime: '2023-06-15 10:35' },
      { id: '3', name: 'banner-1.jpg', url: 'https://via.placeholder.com/1200x400?text=Banner+Image+1', size: 2048, type: 'image/jpeg', uploadTime: '2023-06-15 11:20' },
      { id: '4', name: 'banner-2.jpg', url: 'https://via.placeholder.com/1200x400?text=Banner+Image+2', size: 2560, type: 'image/jpeg', uploadTime: '2023-06-15 11:25' },
      { id: '5', name: 'logo.png', url: 'https://via.placeholder.com/200x200?text=Logo', size: 512, type: 'image/png', uploadTime: '2023-06-14 16:40' },
    ]);
  }, [router]);

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

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview && file.originFileObj) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewVisible(true);
    setPreviewTitle(file.name || (file.url ? file.url.substring(file.url.lastIndexOf('/') + 1) : ''));
  };

  const handleChange: UploadProps['onChange'] = ({ fileList }) => {
    setImages(fileList.map((file, index) => ({
      id: `new-${index}`,
      name: file.name || '',
      url: file.url || '',
      size: file.size || 0,
      type: file.type || 'image/jpeg',
      uploadTime: new Date().toLocaleString('zh-CN'),
    })));
  };

  const handleDelete = (id: string) => {
    setImages(images.filter(image => image.id !== id));
    message.success('图片已删除');
  };

  const handleRefresh = () => {
    message.success('图片列表已刷新');
    // 实际项目中可能会重新请求服务器获取图片列表
  };

  // 上传配置 - 使用函数创建，确保在客户端才访问localStorage
  const uploadProps: UploadProps = {
    name: 'image',
    multiple: true,
    action: '/api/upload', // 实际项目中替换为真实的上传接口
    headers: {
      // 使用安全的localStorage访问函数获取token
      authorization: typeof window !== 'undefined' ? 'Bearer ' + getLocalStorageItem('adminToken') : '',
    },
    onChange: handleChange,
    onPreview: handlePreview,
    accept: 'image/*',
    customRequest: ({ onSuccess, onError }) => {
      // 模拟上传成功
      setTimeout(() => {
        if (onSuccess) {
          onSuccess('ok');
        }
      }, 1000);
    },
  };

  const getBase64 = (file: Blob): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });

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
              icon: <BarChartOutlined />,
              label: '系统管理',
              children: [
                {
                  key: '3-1',
                  icon: <BarChartOutlined />,
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
            图片管理
          </Title>
        </Header>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div className="site-layout-background p-4 rounded">
            {/* 上传区域 */}
            <Dragger {...uploadProps} className="mb-4">
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">点击或拖拽文件到此区域上传</p>
              <p className="ant-upload-hint">支持单个或批量上传，文件大小不超过5MB</p>
            </Dragger>

            {/* 图片列表 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map(image => (
                <div key={image.id} className="border rounded p-4 relative">
                  <img 
                    src={image.url} 
                    alt={image.name} 
                    className="w-full h-48 object-contain mb-2 cursor-pointer hover:opacity-80 transition-opacity" 
                    onClick={() => {
                      setPreviewImage(image.url);
                      setPreviewTitle(image.name);
                      setPreviewVisible(true);
                    }}
                  />
                  <div className="text-sm">
                    <div className="truncate mb-1">{image.name}</div>
                    <div className="text-gray-500 mb-1">{image.uploadTime}</div>
                    <div className="text-gray-500">{(image.size / 1024).toFixed(2)}KB</div>
                  </div>
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    className="absolute top-2 right-2"
                    onClick={() => handleDelete(image.id)}
                  />
                </div>
              ))}
            </div>

            {/* 操作按钮 */}
            <div className="flex justify-end mt-4">
              <Button type="default" icon={<ReloadOutlined />} onClick={handleRefresh}>
                刷新
              </Button>
            </div>

            {/* 预览模态框 */}
            <Modal
              open={previewVisible}
              title={previewTitle}
              footer={null}
              onCancel={() => setPreviewVisible(false)}
            >
              <img alt="预览图片" style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Images;