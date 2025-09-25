import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Layout, Menu, Typography, Button, Table, Popconfirm, message } from 'antd';
import { EditOutlined, DeleteOutlined, ReloadOutlined, PlusOutlined, BarChartOutlined, SettingOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

interface PageData {
  id: number;
  title: string;
  slug: string;
  createTime: string;
  updateTime: string;
  status: string;
  viewCount: number;
}

const Pages: React.FC = () => {
  const router = useRouter();
  const [selectedMenuKey, setSelectedMenuKey] = React.useState('2-4');
  const [pages, setPages] = React.useState<PageData[]>([]);

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

    // 模拟加载页面数据
    setPages([
      { 
        id: 1, 
        title: '关于我们', 
        slug: 'about-us', 
        createTime: '2023-06-01', 
        updateTime: '2023-06-15', 
        status: '已发布', 
        viewCount: 1245
      },
      { 
        id: 2, 
        title: '产品服务', 
        slug: 'products-services', 
        createTime: '2023-06-02', 
        updateTime: '2023-06-14', 
        status: '已发布', 
        viewCount: 867
      },
      { 
        id: 3, 
        title: '解决方案', 
        slug: 'solutions', 
        createTime: '2023-06-03', 
        updateTime: '2023-06-13', 
        status: '已发布', 
        viewCount: 562
      },
      { 
        id: 4, 
        title: '新闻资讯', 
        slug: 'news', 
        createTime: '2023-06-04', 
        updateTime: '2023-06-12', 
        status: '审核中', 
        viewCount: 0
      },
      { 
        id: 5, 
        title: '联系我们', 
        slug: 'contact-us', 
        createTime: '2023-06-05', 
        updateTime: '2023-06-11', 
        status: '草稿', 
        viewCount: 0
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

  const handleAdd = () => {
    // 实际项目中可能会打开添加页面的模态框或跳转到添加页面
    message.info('添加新页面');
  };

  const handleEdit = (id: number) => {
    // 实际项目中可能会打开编辑页面的模态框或跳转到编辑页面
    const page = pages.find(p => p.id === id);
    if (page) {
      message.info(`编辑页面: ${page.title}`);
    }
  };

  const handleDelete = (id: number) => {
    // 实际项目中可能会调用删除页面的API
    setPages(pages.filter(page => page.id !== id));
    message.success('页面已删除');
  };

  const handleRefresh = () => {
    // 实际项目中可能会重新请求页面数据
    message.success('页面列表已刷新');
  };

  // 表格列配置
  const columns: ColumnsType<PageData> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      ellipsis: true,
    },
    {
      title: '路径',
      dataIndex: 'slug',
      key: 'slug',
      ellipsis: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
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
      title: '访问量',
      dataIndex: 'viewCount',
      key: 'viewCount',
      width: 80,
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <div className="space-x-2">
          <Button type="text" icon={<EditOutlined />} onClick={() => handleEdit(record.id)}>
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
            页面管理
          </Title>
        </Header>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div className="site-layout-background p-4 rounded">
            {/* 操作按钮区域 */}
            <div className="flex justify-between items-center mb-4">
              <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
                添加页面
              </Button>
              <Button icon={<ReloadOutlined />} onClick={handleRefresh}>
                刷新
              </Button>
            </div>

            {/* 页面列表表格 */}
            <Table
              columns={columns}
              dataSource={pages}
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

export default Pages;