import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Layout, Menu, Typography, Button, Table, Form, Input, Select, Modal, message, Popconfirm, Tag, Space } from 'antd';
import { SettingOutlined, PlusOutlined, DeleteOutlined, EditOutlined, ReloadOutlined, CheckCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

const { Header, Content, Sider } = Layout;
const { Title } = Typography;
const { Option } = Select;

interface ServerRecord {
  id: string;
  name: string;
  ipAddress: string;
  port: number;
  type: 'http' | 'https' | 'ssh' | 'database' | 'other';
  status: 'online' | 'offline' | 'maintenance';
  location: string;
  provider: string;
  cpu: string;
  memory: string;
  diskSpace: string;
  os: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

const ServerRecords: React.FC = () => {
  const router = useRouter();
  const [selectedMenuKey, setSelectedMenuKey] = useState('3-4');
  const [serverRecords, setServerRecords] = useState<ServerRecord[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState<ServerRecord | null>(null);
  const [form] = Form.useForm();
  const [loadingStatus, setLoadingStatus] = useState<{[key: string]: boolean}>({});

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

    // 模拟加载服务器记录
    const mockServerRecords: ServerRecord[] = [
      {
        id: '1',
        name: 'Web服务器-主站',
        ipAddress: '192.168.1.10',
        port: 80,
        type: 'http',
        status: 'online',
        location: '北京',
        provider: '阿里云',
        cpu: '2核',
        memory: '4GB',
        diskSpace: '100GB',
        os: 'Ubuntu 20.04',
        createdAt: '2023-01-10T10:00:00Z',
        updatedAt: '2023-01-20T15:30:00Z'
      },
      {
        id: '2',
        name: '数据库服务器',
        ipAddress: '192.168.1.20',
        port: 3306,
        type: 'database',
        status: 'online',
        location: '北京',
        provider: '阿里云',
        cpu: '4核',
        memory: '8GB',
        diskSpace: '500GB',
        os: 'Ubuntu 20.04',
        notes: '主数据库服务器，定期备份',
        createdAt: '2023-01-10T10:30:00Z',
        updatedAt: '2023-01-20T15:30:00Z'
      },
      {
        id: '3',
        name: '备份服务器',
        ipAddress: '192.168.1.30',
        port: 22,
        type: 'ssh',
        status: 'online',
        location: '上海',
        provider: '腾讯云',
        cpu: '2核',
        memory: '8GB',
        diskSpace: '1TB',
        os: 'CentOS 8',
        notes: '数据备份服务器，每晚23:00执行备份',
        createdAt: '2023-01-15T09:00:00Z',
        updatedAt: '2023-01-20T15:30:00Z'
      },
      {
        id: '4',
        name: '测试服务器',
        ipAddress: '192.168.1.40',
        port: 8080,
        type: 'http',
        status: 'maintenance',
        location: '广州',
        provider: '华为云',
        cpu: '1核',
        memory: '2GB',
        diskSpace: '50GB',
        os: 'Debian 10',
        notes: '开发测试环境，可能不稳定',
        createdAt: '2023-01-18T14:00:00Z',
        updatedAt: '2023-01-25T10:00:00Z'
      },
      {
        id: '5',
        name: '旧邮件服务器',
        ipAddress: '192.168.1.50',
        port: 25,
        type: 'other',
        status: 'offline',
        location: '北京',
        provider: '阿里云',
        cpu: '2核',
        memory: '4GB',
        diskSpace: '200GB',
        os: 'Ubuntu 18.04',
        notes: '已停用，等待数据迁移',
        createdAt: '2022-06-01T08:00:00Z',
        updatedAt: '2023-01-25T16:00:00Z'
      }
    ];

    setServerRecords(mockServerRecords);
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

  // 模拟检查服务器状态
  const checkServerStatus = (id: string) => {
    setLoadingStatus(prev => ({ ...prev, [id]: true }));
    
    // 模拟异步请求
    setTimeout(() => {
      setServerRecords(prev => 
        prev.map(record => 
          record.id === id 
            ? { 
                ...record, 
                status: Math.random() > 0.2 ? 'online' : Math.random() > 0.5 ? 'maintenance' : 'offline',
                updatedAt: new Date().toISOString() 
              }
            : record
        )
      );
      setLoadingStatus(prev => ({ ...prev, [id]: false }));
      message.success('服务器状态已更新');
    }, 1500);
  };

  // 打开添加/编辑模态框
  const showModal = (record?: ServerRecord) => {
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
        const updatedRecords = serverRecords.map(record => 
          record.id === editingRecord.id ? { ...record, ...values, updatedAt: new Date().toISOString() } : record
        );
        setServerRecords(updatedRecords);
        message.success('服务器记录已更新');
      } else {
        // 添加新记录
        const newRecord: ServerRecord = {
          ...values,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          status: 'online'
        };
        setServerRecords([...serverRecords, newRecord]);
        message.success('服务器记录已添加');
      }
      handleCancel();
    }).catch(info => {
      message.error('表单验证失败');
    });
  };

  // 删除记录
  const handleDelete = (id: string) => {
    setServerRecords(serverRecords.filter(record => record.id !== id));
    message.success('服务器记录已删除');
  };

  // 刷新记录列表
  const handleRefresh = () => {
    message.info('正在刷新服务器记录...');
    // 模拟刷新操作
    setTimeout(() => {
      // 随机更新一些服务器状态
      const updatedRecords = serverRecords.map(record => {
        if (Math.random() > 0.7) {
          return {
            ...record,
            status: (Math.random() > 0.3 ? 'online' : Math.random() > 0.5 ? 'maintenance' : 'offline') as 'online' | 'offline' | 'maintenance',
            updatedAt: new Date().toISOString()
          };
        }
        return record;
      });
      setServerRecords(updatedRecords);
      message.success('服务器记录已刷新');
    }, 1500);
  };

  // 表格列配置
  const columns: ColumnsType<ServerRecord> = [
    {
      title: '服务器名称',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name)
    },
    {
      title: 'IP地址',
      dataIndex: 'ipAddress',
      key: 'ipAddress',
      sorter: (a, b) => {
        // IP地址排序
        const ipToInt = (ip: string) => {
          return ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet), 0);
        };
        return ipToInt(a.ipAddress) - ipToInt(b.ipAddress);
      }
    },
    {
      title: '端口',
      dataIndex: 'port',
      key: 'port',
      sorter: (a, b) => a.port - b.port
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type) => (
        <Tag color={
          type === 'http' ? 'blue' :
          type === 'https' ? 'green' :
          type === 'ssh' ? 'purple' :
          type === 'database' ? 'orange' : 'default'
        }>
          {type.toUpperCase()}
        </Tag>
      ),
      filters: [
        { text: 'HTTP', value: 'http' },
        { text: 'HTTPS', value: 'https' },
        { text: 'SSH', value: 'ssh' },
        { text: 'Database', value: 'database' },
        { text: 'Other', value: 'other' }
      ],
      onFilter: (value, record) => record.type === value
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={
          status === 'online' ? 'green' :
          status === 'maintenance' ? 'orange' : 'red'
        }>
          {status === 'online' ? '在线' :
           status === 'maintenance' ? '维护中' : '离线'}
        </Tag>
      ),
      filters: [
        { text: '在线', value: 'online' },
        { text: '维护中', value: 'maintenance' },
        { text: '离线', value: 'offline' }
      ],
      onFilter: (value, record) => record.status === value
    },
    {
      title: '位置',
      dataIndex: 'location',
      key: 'location',
      filters: serverRecords.map(record => ({ text: record.location, value: record.location }))
        .filter((v, i, a) => a.findIndex(t => t.text === v.text) === i),
      onFilter: (value, record) => record.location === value
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="text" 
            icon={<CheckCircleOutlined />} 
            loading={loadingStatus[record.id]}
            onClick={() => checkServerStatus(record.id)}
          >
            检查状态
          </Button>
          <Button type="text" icon={<EditOutlined />} onClick={() => showModal(record)}>
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
        </Space>
      ),
    },
  ];

  // 扩展信息列配置（用于详情查看）
  const detailColumns: ColumnsType<ServerRecord> = [
    ...columns,
    {
      title: '服务提供商',
      dataIndex: 'provider',
      key: 'provider'
    },
    {
      title: 'CPU',
      dataIndex: 'cpu',
      key: 'cpu'
    },
    {
      title: '内存',
      dataIndex: 'memory',
      key: 'memory'
    },
    {
      title: '磁盘空间',
      dataIndex: 'diskSpace',
      key: 'diskSpace'
    },
    {
      title: '操作系统',
      dataIndex: 'os',
      key: 'os'
    },
    {
      title: '备注',
      dataIndex: 'notes',
      key: 'notes',
      render: (notes) => notes || '-'
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (time) => new Date(time).toLocaleString('zh-CN'),
      sorter: (a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
    }
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
            服务器解析管理
          </Title>
        </Header>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div className="site-layout-background p-4 rounded">
            {/* 操作按钮区域 */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex space-x-2">
                <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()}>
                  添加服务器记录
                </Button>
                <Button icon={<ReloadOutlined />} onClick={handleRefresh}>
                  刷新所有状态
                </Button>
              </div>
            </div>

            {/* 服务器状态概览 */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">总服务器</span>
                  <span className="text-xl font-bold text-blue-600">{serverRecords.length}</span>
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">在线服务器</span>
                  <span className="text-xl font-bold text-green-600">{serverRecords.filter(s => s.status === 'online').length}</span>
                </div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">离线/维护</span>
                  <span className="text-xl font-bold text-red-600">{serverRecords.filter(s => s.status === 'offline' || s.status === 'maintenance').length}</span>
                </div>
              </div>
            </div>

            {/* 服务器记录表格 */}
            <Table 
              columns={columns} 
              dataSource={serverRecords} 
              rowKey="id" 
              pagination={{ pageSize: 10 }}
              scroll={{ x: 'max-content' }}
              expandable={{
                expandedRowRender: (record) => (
                  <div className="p-4 bg-gray-50 rounded">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div><strong>服务提供商：</strong>{record.provider}</div>
                      <div><strong>CPU：</strong>{record.cpu}</div>
                      <div><strong>内存：</strong>{record.memory}</div>
                      <div><strong>磁盘空间：</strong>{record.diskSpace}</div>
                      <div><strong>操作系统：</strong>{record.os}</div>
                      <div><strong>创建时间：</strong>{new Date(record.createdAt).toLocaleString('zh-CN')}</div>
                      <div><strong>更新时间：</strong>{new Date(record.updatedAt).toLocaleString('zh-CN')}</div>
                      {record.notes && <div className="md:col-span-3"><strong>备注：</strong>{record.notes}</div>}
                    </div>
                  </div>
                ),
                rowExpandable: (record) => true,
              }}
            />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ServerRecords;