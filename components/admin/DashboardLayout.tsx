import React from 'react';
import { Layout, Menu, Avatar, Typography, Button, Row, Col, Card, Statistic } from 'antd';
import { MenuProps } from 'antd';
import {
  BarChartOutlined,
  FileTextOutlined,
  PictureOutlined,
  VideoCameraOutlined,
  SettingOutlined,
  LogoutOutlined,
  HomeOutlined,
  UserOutlined,
  EyeOutlined,
  EditOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  AlertOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  PlusOutlined,
  CalendarOutlined
} from '@ant-design/icons';
import { useRouter } from 'next/router';
import '../../app/admin-styles.css';

const { Header, Content, Sider } = Layout;
const { Title, Text } = Typography;

// 定义组件属性接口
interface DashboardLayoutProps {
  title: string;
  selectedMenuKey: string;
  onMenuClick: (key: string) => void;
  userInfo: any;
  onLogout: () => void;
  children: React.ReactNode;
}

// 模拟统计数据
const statsData = {
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

// 模拟最近活动数据
const recentActivities = [
  { id: 1, action: '新文章发布', content: '《工商业储能解决方案最新进展》', time: '10分钟前', user: '内容编辑', type: 'success' },
  { id: 2, action: '表单提交', content: '来自上海的客户咨询', time: '1小时前', user: '系统', type: 'info' },
  { id: 3, action: '图片上传', content: '上传了5张产品图片', time: '3小时前', user: '内容编辑', type: 'info' },
  { id: 4, action: '系统登录', content: '管理员登录系统', time: '昨天', user: '超级管理员', type: 'success' },
  { id: 5, action: '内容更新', content: '更新了首页轮播图', time: '2天前', user: '内容编辑', type: 'warning' }
]

// 内容管理卡片数据
const contentCards = [
  {
    title: '文章管理',
    description: '管理网站的所有文章内容',
    icon: <FileTextOutlined className="text-blue-500" />,
    route: 'articles'
  },
  {
    title: '图片管理',
    description: '上传和管理网站图片资源',
    icon: <PictureOutlined className="text-blue-500" />,
    route: 'images'
  },
  {
    title: '视频管理',
    description: '上传和管理网站视频资源',
    icon: <VideoCameraOutlined className="text-blue-500" />,
    route: 'videos'
  },
  {
    title: '页面管理',
    description: '管理网站的所有页面',
    icon: <FileTextOutlined className="text-blue-500" />,
    route: 'pages'
  }
]

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  title,
  selectedMenuKey,
  onMenuClick,
  userInfo,
  onLogout,
  children
}) => {
  const router = useRouter();
  const [collapsed, setCollapsed] = React.useState(false);

  // 处理内容管理卡片点击
  const handleContentCardClick = (route: string) => {
    router.push(`/admin/${route}`);
  };

  // 处理菜单折叠
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  // 生成菜单
  const generateMenu = (): MenuProps['items'] => {
    const menuItems: any[] = [
      {
        key: '1',
        icon: <BarChartOutlined />,
        label: '仪表盘',
        className: 'admin-menu-item'
      },
      {
        key: '2',
        icon: <BarChartOutlined />,
        label: '内容管理',
        className: 'admin-menu-item',
        children: [
          {
            key: '2-1',
            icon: <FileTextOutlined />,
            label: '文章管理',
            className: 'admin-menu-item'
          },
          {
            key: '2-2',
            icon: <PictureOutlined />,
            label: '图片管理',
            className: 'admin-menu-item'
          },
          {
            key: '2-3',
            icon: <VideoCameraOutlined />,
            label: '视频管理',
            className: 'admin-menu-item'
          },
          {
            key: '2-4',
            icon: <FileTextOutlined />,
            label: '页面管理',
            className: 'admin-menu-item'
          },
        ],
      },
      {
        key: '3',
        icon: <SettingOutlined />,
        label: '系统管理',
        className: 'admin-menu-item',
        children: [
          {
            key: '3-1',
            icon: <UserOutlined />,
            label: '用户管理',
            className: 'admin-menu-item'
          },
          {
            key: '3-2',
            icon: <SettingOutlined />,
            label: '系统设置',
            className: 'admin-menu-item'
          },
          {
            key: '3-3',
            icon: <BarChartOutlined />,
            label: '域名解析',
            className: 'admin-menu-item'
          },
          {
            key: '3-4',
            icon: <BarChartOutlined />,
            label: '服务器解析',
            className: 'admin-menu-item'
          },
        ],
      },
      {
        key: '4',
        icon: <BarChartOutlined />,
        label: '数据统计分析',
        className: 'admin-menu-item',
        children: [
          {
            key: '4-1',
            icon: <EyeOutlined />,
            label: '访问统计',
            className: 'admin-menu-item'
          },
          {
            key: '4-2',
            icon: <BarChartOutlined />,
            label: '地域分布',
            className: 'admin-menu-item'
          },
          {
            key: '4-3',
            icon: <BarChartOutlined />,
            label: '设备分析',
            className: 'admin-menu-item'
          },
          {
            key: '4-4',
            icon: <BarChartOutlined />,
            label: '表单统计',
            className: 'admin-menu-item'
          },
          {
            key: '4-5',
            icon: <BarChartOutlined />,
            label: '内容热度',
            className: 'admin-menu-item'
          },
        ],
      },
    ];
    return menuItems;
  };

  // 渲染仪表盘统计卡片
  const renderDashboard = () => (
    <div className="fade-in">
      {/* 统计卡片 */}
      <Row gutter={[24, 24]} className="mb-6">
        <Col xs={24} sm={12} lg={6}>
          <div className="stats-card hover-lift transition">
            <div className="stats-card-content">
              <div className="stats-card-icon">
                <EyeOutlined size={20} />
              </div>
              <div className="stats-card-value">{statsData.visitors.total}</div>
              <div className="stats-card-label">总访问量</div>
              <div className="stats-card-change positive">
                <ArrowUpOutlined size={12} className="mr-1" />
                {statsData.visitors.increase}%
                <span className="ml-2 text-sm text-gray-500">今日: {statsData.visitors.today}</span>
              </div>
            </div>
          </div>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <div className="stats-card hover-lift transition">
            <div className="stats-card-content">
              <div className="stats-card-icon">
                <BarChartOutlined size={20} />
              </div>
              <div className="stats-card-value">{statsData.pageViews.total}</div>
              <div className="stats-card-label">页面浏览量</div>
              <div className="stats-card-change positive">
                <ArrowUpOutlined size={12} className="mr-1" />
                {statsData.pageViews.increase}%
                <span className="ml-2 text-sm text-gray-500">今日: {statsData.pageViews.today}</span>
              </div>
            </div>
          </div>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <div className="stats-card hover-lift transition">
            <div className="stats-card-content">
              <div className="stats-card-icon">
                <EditOutlined size={20} />
              </div>
              <div className="stats-card-value">{statsData.formSubmissions.total}</div>
              <div className="stats-card-label">表单提交</div>
              <div className="stats-card-change positive">
                <ArrowUpOutlined size={12} className="mr-1" />
                {statsData.formSubmissions.increase}%
                <span className="ml-2 text-sm text-gray-500">今日: {statsData.formSubmissions.today}</span>
              </div>
            </div>
          </div>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <div className="stats-card hover-lift transition">
            <div className="stats-card-content">
              <div className="stats-card-icon">
                <UserOutlined size={20} />
              </div>
              <div className="stats-card-value">{statsData.newUsers.total}</div>
              <div className="stats-card-label">新增用户</div>
              <div className={`stats-card-change ${statsData.newUsers.increase >= 0 ? 'positive' : 'negative'}`}>
                {statsData.newUsers.increase >= 0 ? 
                  <ArrowUpOutlined size={12} className="mr-1" /> : 
                  <ArrowDownOutlined size={12} className="mr-1" />
                }
                {Math.abs(statsData.newUsers.increase)}%
                <span className="ml-2 text-sm text-gray-500">今日: {statsData.newUsers.today}</span>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      {/* 内容管理卡片 */}
      <Row gutter={[24, 24]} className="mb-6">
        {contentCards.map((card, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card
              hoverable
              onClick={() => handleContentCardClick(card.route)}
              className="cursor-pointer argon-card hover-lift transition"
              bordered={false}
            >
              <div className="flex items-center justify-between">
                <div>
                  <Title level={4} className="m-0 text-gray-800 font-bold">{card.title}</Title>
                  <Text type="secondary" className="text-gray-600">{card.description}</Text>
                </div>
                <div className="p-3 bg-blue-50 rounded-full">{card.icon}</div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* 最近活动 */}
      <Card 
        title={
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-gray-800">最近活动</span>
            <Button type="text" icon={<CalendarOutlined />} className="text-blue-600">查看全部</Button>
          </div>
        } 
        className="argon-card shadow-lg rounded-xl border-0"
        bodyStyle={{ padding: '24px' }}
      >
        <div className="space-y-4">
          {recentActivities.map(item => (
            <div key={item.id} className="flex items-start p-3 hover:bg-gray-50 rounded-lg transition">
              <div className={`mt-1 mr-4 p-2 rounded-full ${item.type === 'success' ? 'bg-green-100 text-green-600' : item.type === 'warning' ? 'bg-yellow-100 text-yellow-600' : 'bg-blue-100 text-blue-600'}`}>
                {item.type === 'success' ? <CheckCircleOutlined size={16} /> : 
                 item.type === 'warning' ? <AlertOutlined size={16} /> : 
                 <ClockCircleOutlined size={16} />}
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap gap-2">
                  <span className="font-semibold text-gray-800">{item.user}</span>
                  <span className="text-gray-600">{item.action}:</span>
                  <span className="text-blue-600 font-medium">{item.content}</span>
                </div>
                <Text type="secondary" className="block mt-1 text-sm">{item.time}</Text>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  return (
    <Layout style={{ minHeight: '100vh' }} className="admin-layout">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={toggleCollapsed}
        className={`admin-sidebar ${collapsed ? 'collapsed' : ''}`}
        width={250}
      >
        <div className="admin-sidebar-header">
          <Title level={4} className="admin-sidebar-logo m-0">
            {collapsed ? '管理' : '管理后台'}
          </Title>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[selectedMenuKey]}
          style={{ height: '100%', borderRight: 0, padding: '16px 0' }}
          onClick={(e) => onMenuClick(e.key)}
          items={generateMenu()}
        />
      </Sider>
      <Layout className="site-layout">
        <Header className="admin-header">
          <div className="flex items-center">
            <Button
              type="text"
              icon={collapsed ? <HomeOutlined /> : undefined}
              onClick={toggleCollapsed}
              style={{ marginRight: 16 }}
            />
            <Title level={5} className="admin-header-title m-0">
              {title}
            </Title>
          </div>
          <div className="admin-user-profile">
            <Avatar icon={<UserOutlined />} className="admin-user-avatar" />
            <Text>{userInfo?.username}</Text>
            <Button
              type="text"
              danger
              icon={<LogoutOutlined />}
              onClick={onLogout}
              className="admin-btn"
            >
              退出登录
            </Button>
          </div>
        </Header>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            {title === '仪表盘' ? renderDashboard() : children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;