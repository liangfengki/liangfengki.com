import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Layout, Menu, Typography, Button, Card, Table, Popconfirm, message } from 'antd';
import { PlayCircleOutlined, UploadOutlined, DeleteOutlined, ReloadOutlined, SearchOutlined, BarChartOutlined, SettingOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

const { Header, Content, Sider } = Layout;
const { Title, Text } = Typography;

interface VideoData {
  id: number;
  title: string;
  duration: string;
  category: string;
  uploadTime: string;
  status: string;
  viewCount: number;
  url: string;
}

const Videos: React.FC = () => {
  const router = useRouter();
  const [selectedMenuKey, setSelectedMenuKey] = React.useState('2-3');
  const [videos, setVideos] = React.useState<VideoData[]>([]);

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

    // 模拟加载视频数据
    setVideos([
      { 
        id: 1, 
        title: '工商业储能解决方案介绍', 
        duration: '05:42', 
        category: '产品介绍', 
        uploadTime: '2023-06-15', 
        status: '已发布', 
        viewCount: 1245,
        url: 'https://via.placeholder.com/800x450?text=Video+Thumbnail+1'
      },
      { 
        id: 2, 
        title: '储能系统安装教程', 
        duration: '12:30', 
        category: '使用指南', 
        uploadTime: '2023-06-14', 
        status: '已发布', 
        viewCount: 867,
        url: 'https://via.placeholder.com/800x450?text=Video+Thumbnail+2'
      },
      { 
        id: 3, 
        title: '储能系统维护与保养', 
        duration: '08:45', 
        category: '维护指南', 
        uploadTime: '2023-06-13', 
        status: '已发布', 
        viewCount: 562,
        url: 'https://via.placeholder.com/800x450?text=Video+Thumbnail+3'
      },
      { 
        id: 4, 
        title: '客户案例分享：某工厂储能改造项目', 
        duration: '15:20', 
        category: '案例分析', 
        uploadTime: '2023-06-12', 
        status: '审核中', 
        viewCount: 0,
        url: 'https://via.placeholder.com/800x450?text=Video+Thumbnail+4'
      },
      { 
        id: 5, 
        title: '储能技术发展趋势讲座', 
        duration: '30:15', 
        category: '技术讲座', 
        uploadTime: '2023-06-11', 
        status: '草稿', 
        viewCount: 0,
        url: 'https://via.placeholder.com/800x450?text=Video+Thumbnail+5'
      },
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

  const handlePlay = (id: number) => {
    // 实际项目中可能会打开视频播放模态框或跳转到播放页面
    const video = videos.find(v => v.id === id);
    if (video) {
      message.info(`播放视频: ${video.title}`);
    }
  };

  const handleUpload = () => {
    // 实际项目中可能会打开上传视频的模态框或跳转到上传页面
    message.info('上传新视频');
  };

  const handleEdit = (id: number) => {
    // 实际项目中可能会打开编辑视频信息的模态框或跳转到编辑页面
    const video = videos.find(v => v.id === id);
    if (video) {
      message.info(`编辑视频: ${video.title}`);
    }
  };

  const handleDelete = (id: number) => {
    // 实际项目中可能会调用删除视频的API
    setVideos(videos.filter(video => video.id !== id));
    message.success('视频已删除');
  };

  const handleRefresh = () => {
    // 实际项目中可能会重新请求视频数据
    message.success('视频列表已刷新');
  };

  // 表格列配置
  const columns: ColumnsType<VideoData> = [
    {
      title: '缩略图',
      dataIndex: 'url',
      key: 'thumbnail',
      width: 100,
      render: (url) => (
        <img 
          src={url} 
          alt="视频缩略图" 
          className="w-full h-16 object-cover rounded" 
        />
      ),
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      ellipsis: true,
    },
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: '时长',
      dataIndex: 'duration',
      key: 'duration',
      width: 80,
    },
    {
      title: '上传时间',
      dataIndex: 'uploadTime',
      key: 'uploadTime',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <span className={status === '已发布' ? 'text-green-600' : status === '审核中' ? 'text-orange-500' : 'text-gray-500'}>
          {status}
        </span>
      ),
    },
    {
      title: '播放量',
      dataIndex: 'viewCount',
      key: 'viewCount',
      width: 80,
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <div className="space-x-2">
          <Button type="text" icon={<PlayCircleOutlined />} onClick={() => handlePlay(record.id)}>
            播放
          </Button>
          <Button type="text" icon={<UploadOutlined />} onClick={() => handleEdit(record.id)}>
            编辑
          </Button>
          <Popconfirm
            title="确认删除？"
            onConfirm={() => handleDelete(record.id)}
            okText="确认"
            cancelText="取消"
          >
            <Button type="text" danger icon={<DeleteOutlined />}>
              删除
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

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
            视频管理
          </Title>
        </Header>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div className="site-layout-background p-4 rounded">
            {/* 操作按钮区域 */}
            <div className="flex justify-between items-center mb-4">
              <Button type="primary" icon={<UploadOutlined />} onClick={handleUpload}>
                上传视频
              </Button>
              <Button icon={<ReloadOutlined />} onClick={handleRefresh}>
                刷新
              </Button>
            </div>

            {/* 视频列表表格 */}
            <Table
              columns={columns}
              dataSource={videos}
              rowKey="id"
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showTotal: (total) => `共 ${total} 条记录`,
              }}
            />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Videos;