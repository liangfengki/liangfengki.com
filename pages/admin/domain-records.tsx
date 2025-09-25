import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Layout, Menu, Typography, Button, Table, Form, Input, Select, Modal, message, Popconfirm, Tag } from 'antd';
import { SettingOutlined, PlusOutlined, DeleteOutlined, EditOutlined, ReloadOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

const { Header, Content, Sider } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

interface DomainRecord {
  id: string;
  domain: string;
  recordType: string;
  value: string;
  ttl: number;
  priority?: number;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

const DomainRecords: React.FC = () => {
  const router = useRouter();
  const [selectedMenuKey, setSelectedMenuKey] = useState('3-3');
  const [domainRecords, setDomainRecords] = useState<DomainRecord[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState<DomainRecord | null>(null);
  const [form] = Form.useForm();

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

    // 模拟加载域名解析记录
    const mockDomainRecords: DomainRecord[] = [
      {
        id: '1',
        domain: 'example.com',
        recordType: 'A',
        value: '192.168.1.1',
        ttl: 3600,
        status: 'active',
        createdAt: '2023-01-15T10:30:00Z',
        updatedAt: '2023-01-15T10:30:00Z'
      },
      {
        id: '2',
        domain: 'www.example.com',
        recordType: 'CNAME',
        value: 'example.com',
        ttl: 3600,
        status: 'active',
        createdAt: '2023-01-15T10:35:00Z',
        updatedAt: '2023-01-15T10:35:00Z'
      },
      {
        id: '3',
        domain: 'example.com',
        recordType: 'MX',
        value: 'mail.example.com',
        ttl: 3600,
        priority: 10,
        status: 'active',
        createdAt: '2023-01-15T10:40:00Z',
        updatedAt: '2023-01-15T10:40:00Z'
      },
      {
        id: '4',
        domain: 'old.example.com',
        recordType: 'A',
        value: '192.168.1.2',
        ttl: 3600,
        status: 'inactive',
        createdAt: '2023-01-10T09:20:00Z',
        updatedAt: '2023-01-15T11:00:00Z'
      }
    ];

    setDomainRecords(mockDomainRecords);
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

  // 打开添加/编辑模态框
  const showModal = (record?: DomainRecord) => {
    if (record) {
      setEditingRecord(record);
      form.setFieldsValue(record);
    } else {
      setEditingRecord(null);
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  // 关闭模态框
  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingRecord(null);
    form.resetFields();
  };

  // 提交表单
  const handleSubmit = () => {
    form.validateFields().then(values => {
      if (editingRecord) {
        // 编辑现有记录
        const updatedRecords = domainRecords.map(record => 
          record.id === editingRecord.id ? { ...record, ...values, updatedAt: new Date().toISOString() } : record
        );
        setDomainRecords(updatedRecords);
        message.success('域名解析记录已更新');
      } else {
        // 添加新记录
        const newRecord: DomainRecord = {
          ...values,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          status: 'active'
        };
        setDomainRecords([...domainRecords, newRecord]);
        message.success('域名解析记录已添加');
      }
      handleCancel();
    }).catch(info => {
      message.error('表单验证失败');
    });
  };

  // 删除记录
  const handleDelete = (id: string) => {
    setDomainRecords(domainRecords.filter(record => record.id !== id));
    message.success('域名解析记录已删除');
  };

  // 切换记录状态
  const toggleRecordStatus = (id: string) => {
    setDomainRecords(domainRecords.map(record => 
      record.id === id 
        ? { ...record, status: record.status === 'active' ? 'inactive' : 'active', updatedAt: new Date().toISOString() }
        : record
    ));
    message.success('域名解析记录状态已更新');
  };

  // 刷新记录列表
  const handleRefresh = () => {
    message.info('正在刷新域名解析记录...');
    // 模拟刷新操作
    setTimeout(() => {
      message.success('域名解析记录已刷新');
    }, 1000);
  };

  // 表格列配置
  const columns: ColumnsType<DomainRecord> = [
    {
      title: '域名',
      dataIndex: 'domain',
      key: 'domain',
      sorter: (a, b) => a.domain.localeCompare(b.domain)
    },
    {
      title: '记录类型',
      dataIndex: 'recordType',
      key: 'recordType',
      filters: [
        { text: 'A', value: 'A' },
        { text: 'CNAME', value: 'CNAME' },
        { text: 'MX', value: 'MX' },
        { text: 'TXT', value: 'TXT' },
        { text: 'AAAA', value: 'AAAA' },
      ],
      onFilter: (value, record) => record.recordType === value
    },
    {
      title: '记录值',
      dataIndex: 'value',
      key: 'value'
    },
    {
      title: 'TTL',
      dataIndex: 'ttl',
      key: 'ttl',
      sorter: (a, b) => a.ttl - b.ttl
    },
    {
      title: '优先级',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority) => priority || '-',
      sorter: (a, b) => (a.priority || 0) - (b.priority || 0)
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'active' ? 'green' : 'gray'}>
          {status === 'active' ? '活跃' : '禁用'}
        </Tag>
      ),
      filters: [
        { text: '活跃', value: 'active' },
        { text: '禁用', value: 'inactive' }
      ],
      onFilter: (value, record) => record.status === value
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <div className="space-x-2">
          <Button type="text" icon={<EditOutlined />} onClick={() => showModal(record)}>
            编辑
          </Button>
          <Button 
            type="text" 
            onClick={() => toggleRecordStatus(record.id)}
            style={{ color: record.status === 'active' ? '#d93025' : '#52c41a' }}
          >
            {record.status === 'active' ? '禁用' : '启用'}
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
              icon: <SettingOutlined />,
              label: '仪表盘',
            },
            {
              key: '2',
              icon: <SettingOutlined />,
              label: '内容管理',
              children: [
                {
                  key: '2-1',
                  icon: <SettingOutlined />,
                  label: '文章管理',
                },
                {
                  key: '2-2',
                  icon: <SettingOutlined />,
                  label: '图片管理',
                },
                {
                  key: '2-3',
                  icon: <SettingOutlined />,
                  label: '视频管理',
                },
                {
                  key: '2-4',
                  icon: <SettingOutlined />,
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
              icon: <SettingOutlined />,
              label: '数据统计分析',
              children: [
                {
                  key: '4-1',
                  icon: <SettingOutlined />,
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
            域名解析管理
          </Title>
        </Header>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div className="site-layout-background p-4 rounded">
            {/* 操作按钮区域 */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex space-x-2">
                <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()}>
                  添加域名解析
                </Button>
                <Button icon={<ReloadOutlined />} onClick={handleRefresh}>
                  刷新
                </Button>
              </div>
            </div>

            {/* 域名解析记录表格 */}
            <Table 
              columns={columns} 
              dataSource={domainRecords} 
              rowKey="id" 
              pagination={{ pageSize: 10 }}
              scroll={{ x: 'max-content' }}
            />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DomainRecords;