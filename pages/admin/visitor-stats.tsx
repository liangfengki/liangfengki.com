import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Layout, Menu, Typography, Card, Row, Col, DatePicker, Select, Statistic, List, Avatar, Progress, Badge, Spin, Button } from 'antd';
import { 
  BarChartOutlined, 
  LineChartOutlined, 
  PieChartOutlined, 
  UserOutlined, 
  EyeOutlined, 
  ClockCircleOutlined, 
  ArrowUpOutlined, 
  ArrowDownOutlined, 
  TabletOutlined, 
  LaptopOutlined, 
  PhoneOutlined,
  ChromeOutlined,
  AndroidOutlined,
  AppleOutlined,
  WindowsOutlined,
  SettingOutlined
} from '@ant-design/icons';
import type { RangePickerProps } from 'antd/es/date-picker';
import type { SelectProps } from 'antd';

const { Header, Content, Sider } = Layout;
const { Title, Text, Paragraph } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

// 访问统计数据接口
interface VisitorStat {
  date: string;
  visitors: number;
  pageViews: number;
  avgTimeOnPage: number;
  bounceRate: number;
}

// 设备统计接口
interface DeviceStat {
  type: string;
  count: number;
  percentage: number;
  icon: React.ReactNode;
}

// 浏览器统计接口
interface BrowserStat {
  name: string;
  count: number;
  percentage: number;
  icon: React.ReactNode;
}

// 热门页面接口
interface PopularPage {
  title: string;
  path: string;
  views: number;
  percentage: number;
}

const VisitorStats: React.FC = () => {
  const router = useRouter();
  const [selectedMenuKey, setSelectedMenuKey] = useState<string>('4-1');
  const [dateRange, setDateRange] = useState<[string, string] | null>(null);
  const [timeFrame, setTimeFrame] = useState<string>('7d');
  const [visitorData, setVisitorData] = useState<VisitorStat[]>([]);
  const [deviceStats, setDeviceStats] = useState<DeviceStat[]>([]);
  const [browserStats, setBrowserStats] = useState<BrowserStat[]>([]);
  const [popularPages, setPopularPages] = useState<PopularPage[]>([]);
  const [totalVisitors, setTotalVisitors] = useState<number>(0);
  const [totalPageViews, setTotalPageViews] = useState<number>(0);
  const [avgSessionDuration, setAvgSessionDuration] = useState<number>(0);
  const [bounceRate, setBounceRate] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

    // 加载统计数据
    loadStatisticsData();
  }, [router, timeFrame]);

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

  // 加载统计数据的函数
  const loadStatisticsData = async () => {
    setIsLoading(true);
    try {
      // 模拟API请求延迟
      await new Promise(resolve => setTimeout(resolve, 1000));

      // 生成模拟的访问统计数据
      const generateVisitorData = (days: number): VisitorStat[] => {
        const data: VisitorStat[] = [];
        const today = new Date();
        
        for (let i = days - 1; i >= 0; i--) {
          const date = new Date(today);
          date.setDate(today.getDate() - i);
          
          const visitors = Math.floor(Math.random() * 200) + 50;
          const pageViews = Math.floor(visitors * (Math.random() * 3 + 1));
          const avgTimeOnPage = Math.floor(Math.random() * 300) + 120;
          const bounceRate = Math.floor(Math.random() * 40) + 30;
          
          data.push({
            date: date.toISOString().split('T')[0],
            visitors,
            pageViews,
            avgTimeOnPage,
            bounceRate: bounceRate / 100
          });
        }
        
        return data;
      };

      let days = 7;
      switch (timeFrame) {
        case '7d':
          days = 7;
          break;
        case '30d':
          days = 30;
          break;
        case '90d':
          days = 90;
          break;
        default:
          days = 7;
      }

      const data = generateVisitorData(days);
      setVisitorData(data);

      // 计算总访问量和总浏览量
      const totalVisitors = data.reduce((sum, item) => sum + item.visitors, 0);
      const totalPageViews = data.reduce((sum, item) => sum + item.pageViews, 0);
      const avgTime = Math.floor(data.reduce((sum, item) => sum + item.avgTimeOnPage, 0) / data.length);
      const avgBounceRate = Math.round((data.reduce((sum, item) => sum + item.bounceRate, 0) / data.length) * 100);

      setTotalVisitors(totalVisitors);
      setTotalPageViews(totalPageViews);
      setAvgSessionDuration(avgTime);
      setBounceRate(avgBounceRate);

      // 模拟设备统计数据
      const deviceData: DeviceStat[] = [
        {
          type: '桌面端',
          count: Math.floor(totalVisitors * 0.65),
          percentage: 65,
          icon: <LaptopOutlined />
        },
        {
          type: '移动端',
          count: Math.floor(totalVisitors * 0.30),
          percentage: 30,
          icon: <PhoneOutlined />
        },
        {
          type: '平板',
          count: Math.floor(totalVisitors * 0.05),
          percentage: 5,
          icon: <TabletOutlined />
        }
      ];

      setDeviceStats(deviceData);

      // 模拟浏览器统计数据
      const browserData: BrowserStat[] = [
        {
          name: 'Chrome',
          count: Math.floor(totalVisitors * 0.60),
          percentage: 60,
          icon: <ChromeOutlined />
        },
        {
          name: 'Safari',
          count: Math.floor(totalVisitors * 0.20),
          percentage: 20,
          icon: <AppleOutlined />
        },
        {
          name: 'Firefox',
          count: Math.floor(totalVisitors * 0.10),
          percentage: 10,
          icon: <WindowsOutlined />
        },
        {
          name: 'Edge',
          count: Math.floor(totalVisitors * 0.07),
          percentage: 7,
          icon: <ChromeOutlined />
        },
        {
          name: '其他',
          count: Math.floor(totalVisitors * 0.03),
          percentage: 3,
          icon: <WindowsOutlined />
        }
      ];

      setBrowserStats(browserData);

      // 模拟热门页面数据
      const pagesData: PopularPage[] = [
        {
          title: '首页',
          path: '/',
          views: Math.floor(totalPageViews * 0.40),
          percentage: 40
        },
        {
          title: '产品中心',
          path: '/products',
          views: Math.floor(totalPageViews * 0.25),
          percentage: 25
        },
        {
          title: '关于我们',
          path: '/about',
          views: Math.floor(totalPageViews * 0.15),
          percentage: 15
        },
        {
          title: '解决方案',
          path: '/solutions',
          views: Math.floor(totalPageViews * 0.12),
          percentage: 12
        },
        {
          title: '联系我们',
          path: '/contact',
          views: Math.floor(totalPageViews * 0.08),
          percentage: 8
        }
      ];

      setPopularPages(pagesData);

    } catch (error) {
      console.error('加载统计数据失败:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 处理时间范围变更
  const handleTimeFrameChange = (value: string) => {
    setTimeFrame(value);
  };

  // 处理日期范围变更
  const handleDateRangeChange: RangePickerProps['onChange'] = (dates, dateStrings) => {
    if (dateStrings && dateStrings[0] && dateStrings[1]) {
      setDateRange([dateStrings[0], dateStrings[1]]);
      setTimeFrame('custom');
    }
  };

  // 格式化持续时间（秒转分钟）
  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}分${remainingSeconds}秒`;
  };

  // 格式化日期显示
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  // 生成趋势图标
  const renderTrendIcon = (value: number): React.ReactNode => {
    if (value > 0) {
      return <ArrowUpOutlined className="text-red-500" />;
    } else if (value < 0) {
      return <ArrowDownOutlined className="text-green-500" />;
    }
    return null;
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
            访问统计
          </Title>
        </Header>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div className="site-layout-background p-4 rounded">
            {/* 时间范围选择器 */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-4">
                <Title level={4} className="m-0">
                  访问统计报告
                </Title>
                <Select
                  value={timeFrame}
                  onChange={handleTimeFrameChange}
                  style={{ width: 120 }}
                >
                  <Option value="7d">最近7天</Option>
                  <Option value="30d">最近30天</Option>
                  <Option value="90d">最近90天</Option>
                </Select>
                {timeFrame === 'custom' && (
                  <RangePicker onChange={handleDateRangeChange} />
                )}
              </div>
              <Text type="secondary">
                {dateRange
                  ? `${dateRange[0]} - ${dateRange[1]}`
                  : timeFrame === '7d'
                  ? '最近7天'
                  : timeFrame === '30d'
                  ? '最近30天'
                  : '最近90天'}
              </Text>
            </div>

            <Spin spinning={isLoading} tip="加载统计数据中...">
              {/* 关键指标卡片 */}
              <Row gutter={16} className="mb-6">
                <Col span={6}>
                  <Card>
                    <Statistic
                      title="总访问人数"
                      value={totalVisitors}
                      prefix={<UserOutlined />}
                      suffix={renderTrendIcon(12)}
                      valueStyle={{ color: '#3f8600' }}
                    />
                    <div className="mt-2">
                      <Text type="secondary">较上期增长 12%</Text>
                    </div>
                  </Card>
                </Col>
                <Col span={6}>
                  <Card>
                    <Statistic
                      title="总浏览量"
                      value={totalPageViews}
                      prefix={<EyeOutlined />}
                      suffix={renderTrendIcon(8)}
                      valueStyle={{ color: '#3f8600' }}
                    />
                    <div className="mt-2">
                      <Text type="secondary">较上期增长 8%</Text>
                    </div>
                  </Card>
                </Col>
                <Col span={6}>
                  <Card>
                    <Statistic
                      title="平均会话时长"
                      value={formatDuration(avgSessionDuration)}
                      prefix={<ClockCircleOutlined />}
                    />
                    <div className="mt-2">
                      <Text type="secondary">平均每次访问停留时间</Text>
                    </div>
                  </Card>
                </Col>
                <Col span={6}>
                  <Card>
                    <Statistic
                      title="跳出率"
                      value={bounceRate}
                      suffix="%"
                      valueStyle={{ color: '#cf1322' }}
                    />
                    <div className="mt-2">
                      <Text type="secondary">单页访问的比例</Text>
                    </div>
                  </Card>
                </Col>
              </Row>

              {/* 访问趋势图表 */}
              <Row gutter={16} className="mb-6">
                <Col span={24}>
                  <Card title="访问趋势" className="h-[400px]">
                    <div className="h-full flex flex-col">
                      <div className="flex justify-between mb-4">
                        <div className="flex space-x-6">
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                            <Text>访问人数</Text>
                          </div>
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                            <Text>浏览量</Text>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button icon={<LineChartOutlined />} size="small" type="text">
                            折线图
                          </Button>
                          <Button icon={<BarChartOutlined />} size="small" type="default">
                            柱状图
                          </Button>
                        </div>
                      </div>
                      <div className="flex-1 flex items-end justify-between px-2">
                        {visitorData.map((item, index) => (
                          <div key={index} className="flex flex-col items-center w-8">
                            <div 
                              className="bg-blue-500 w-4 rounded-t-sm" 
                              style={{ height: `${(item.visitors / 300) * 100}%` }}
                            ></div>
                            <div 
                              className="bg-green-500 w-4" 
                              style={{ height: `${(item.pageViews / 900) * 100}%` }}
                            ></div>
                            <Text className="mt-2 text-xs whitespace-nowrap">
                              {formatDate(item.date)}
                            </Text>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                </Col>
              </Row>

              {/* 设备和浏览器统计 */}
              <Row gutter={16} className="mb-6">
                <Col span={12}>
                  <Card title="设备统计" className="h-full">
                    <div className="space-y-4">
                      {deviceStats.map((device, index) => (
                        <div key={index}>
                          <div className="flex justify-between items-center mb-1">
                            <div className="flex items-center">
                              <div className="mr-2">{device.icon}</div>
                              <Text>{device.type}</Text>
                            </div>
                            <Text strong>{device.count} ({device.percentage}%)</Text>
                          </div>
                          <Progress percent={device.percentage} showInfo={false} />
                        </div>
                      ))}
                    </div>
                  </Card>
                </Col>
                <Col span={12}>
                  <Card title="浏览器统计" className="h-full">
                    <div className="space-y-4">
                      {browserStats.map((browser, index) => (
                        <div key={index}>
                          <div className="flex justify-between items-center mb-1">
                            <div className="flex items-center">
                              <div className="mr-2">{browser.icon}</div>
                              <Text>{browser.name}</Text>
                            </div>
                            <Text strong>{browser.count} ({browser.percentage}%)</Text>
                          </div>
                          <Progress percent={browser.percentage} showInfo={false} />
                        </div>
                      ))}
                    </div>
                  </Card>
                </Col>
              </Row>

              {/* 热门页面统计 */}
              <Row gutter={16}>
                <Col span={24}>
                  <Card title="热门页面">
                    <List
                      itemLayout="horizontal"
                      dataSource={popularPages}
                      renderItem={(page, index) => (
                        <List.Item
                          actions={[
                            <Badge 
                              count={`${page.percentage}%`}
                              style={{ backgroundColor: '#1890ff' }}
                              key="percent"
                            />
                          ]}
                        >
                          <List.Item.Meta
                            avatar={<Avatar>{index + 1}</Avatar>}
                            title={<Text>{page.title}</Text>}
                            description={<Text type="secondary">{page.path}</Text>}
                          />
                          <div className="flex items-center">
                            <EyeOutlined className="mr-1" />
                            <Text strong>{page.views}</Text>
                          </div>
                        </List.Item>
                      )}
                    />
                  </Card>
                </Col>
              </Row>
            </Spin>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default VisitorStats;