import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button, Table, Popconfirm, message, Input, Modal, Form, Select } from 'antd';
import { EditOutlined, DeleteOutlined, ReloadOutlined, PlusOutlined, SearchOutlined, LogoutOutlined } from '@ant-design/icons';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import DashboardLayout from '../../components/admin/DashboardLayout';
import '../../app/admin-styles.css';

const { Search } = Input;
const { Option } = Select;

interface UserData {
  id: number;
  username: string;
  email: string;
  role: string;
  status: string;
  createTime: string;
  lastLogin: string;
}

const Users: React.FC = () => {
  const router = useRouter();
  const [users, setUsers] = React.useState<UserData[]>([]);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [editingUser, setEditingUser] = React.useState<UserData | null>(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = React.useState('');

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

    // 模拟加载用户数据
    setUsers([
      { 
        id: 1, 
        username: 'admin', 
        email: 'admin@example.com', 
        role: '管理员', 
        status: '启用', 
        createTime: '2023-06-01', 
        lastLogin: '2023-06-15 14:30'
      },
      { 
        id: 2, 
        username: 'editor', 
        email: 'editor@example.com', 
        role: '编辑', 
        status: '启用', 
        createTime: '2023-06-02', 
        lastLogin: '2023-06-14 10:15'
      },
      { 
        id: 3, 
        username: 'viewer', 
        email: 'viewer@example.com', 
        role: '查看者', 
        status: '启用', 
        createTime: '2023-06-03', 
        lastLogin: '2023-06-13 09:45'
      },
      { 
        id: 4, 
        username: 'testuser', 
        email: 'test@example.com', 
        role: '测试', 
        status: '禁用', 
        createTime: '2023-06-04', 
        lastLogin: '2023-06-12 16:20'
      },
      { 
        id: 5, 
        username: 'demo', 
        email: 'demo@example.com', 
        role: '演示', 
        status: '启用', 
        createTime: '2023-06-05', 
        lastLogin: '2023-06-11 11:30'
      },
    ]);
  }, [router]);

  const handleMenuClick = (key: string) => {
    // 根据菜单项进行路由跳转
    switch (key) {
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
    // 打开添加用户模态框
    setEditingUser(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (user: UserData) => {
    // 打开编辑用户模态框
    setEditingUser(user);
    form.setFieldsValue({
      username: user.username,
      email: user.email,
      role: user.role,
      status: user.status,
    });
    setIsModalVisible(true);
  };

  const handleDelete = (id: number) => {
    // 实际项目中可能会调用删除用户的API
    setUsers(users.filter(user => user.id !== id));
    message.success('用户已删除');
  };

  const handleRefresh = () => {
    // 实际项目中可能会重新请求用户数据
    message.success('用户列表已刷新');
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
    // 实际项目中可能会根据搜索内容过滤用户或请求服务器
    message.info(`搜索: ${value}`);
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      if (editingUser) {
        // 编辑用户
        setUsers(users.map(user => 
          user.id === editingUser.id ? { ...user, ...values } : user
        ));
        message.success('用户已更新');
      } else {
        // 添加用户
        const newUser: UserData = {
          id: users.length + 1,
          username: values.username,
          email: values.email,
          role: values.role,
          status: values.status,
          createTime: new Date().toISOString().split('T')[0],
          lastLogin: '',
        };
        setUsers([...users, newUser]);
        message.success('用户已添加');
      }
      setIsModalVisible(false);
      form.resetFields();
    }).catch(info => {
      console.log('Validate Failed:', info);
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleStatusChange = (id: number, status: string) => {
    // 实际项目中可能会调用更新用户状态的API
    setUsers(users.map(user => 
      user.id === id ? { ...user, status } : user
    ));
    message.success(`用户状态已更改为${status}`);
  };

  // 退出登录
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    router.push('/admin');
  };

  // 过滤用户列表
  const filteredUsers = users.filter(user => 
    user.username.includes(searchText) || 
    user.email.includes(searchText) || 
    user.role.includes(searchText)
  );

  // 表格列配置
  const columns: ColumnsType<UserData> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
      render: (role) => (
        <span className={role === '管理员' ? 'text-red-600 font-semibold' : role === '编辑' ? 'text-orange-500' : 'text-gray-600'}>
          {role}
        </span>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status, record) => (
        <Select
          value={status}
          style={{ width: 100 }}
          onChange={(newStatus) => handleStatusChange(record.id, newStatus)}
          className="admin-select"
        >
          <Option value="启用">启用</Option>
          <Option value="禁用">禁用</Option>
        </Select>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '最后登录',
      dataIndex: 'lastLogin',
      key: 'lastLogin',
      ellipsis: true,
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <div className="space-x-2">
          <Button 
            type="link" 
            icon={<EditOutlined />} 
            onClick={() => handleEdit(record)}
            className="admin-btn"
          >
            编辑
          </Button>
          <Popconfirm
            title="确认删除？"
            onConfirm={() => handleDelete(record.id)}
            okText="确认"
            cancelText="取消"
            disabled={record.username === 'admin'}
          >
            <Button 
              type="link" 
              danger 
              icon={<DeleteOutlined />} 
              disabled={record.username === 'admin'}
              className="admin-btn"
            >
              删除
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  // 分页配置
  const pagination: TablePaginationConfig = {
    pageSize: 10,
    showSizeChanger: true,
    showTotal: (total) => `共 ${total} 条记录`,
  };

  // 获取用户信息
  const getUserInfo = () => {
    const userData = getLocalStorageItem('adminUser');
    return userData ? JSON.parse(userData) : { username: '管理员' };
  };

  // 渲染用户管理内容
  const renderUserManagement = () => (
    <div className="fade-in">
      {/* 操作按钮区域 */}
      <div className="admin-actions mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <Button 
              type="primary" 
              icon={<PlusOutlined />} 
              onClick={handleAdd}
              className="admin-btn admin-btn-primary"
            >
              添加用户
            </Button>
            <Button 
              icon={<ReloadOutlined />} 
              onClick={handleRefresh}
              className="admin-btn ml-3"
            >
              刷新
            </Button>
          </div>
          <Search
            placeholder="搜索用户"
            allowClear
            enterButton={<SearchOutlined />}
            size="middle"
            onSearch={handleSearch}
            className="admin-search"
          />
        </div>
      </div>

      {/* 用户列表表格 */}
      <Table
        columns={columns}
        dataSource={filteredUsers}
        rowKey="id"
        pagination={pagination}
        className="admin-table"
      />

      {/* 添加/编辑用户弹窗 */}
      <Modal
        title={editingUser ? '编辑用户' : '添加用户'}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        className="admin-modal"
      >
        <Form
          form={form}
          layout="vertical"
          className="admin-form"
        >
          <Form.Item
            name="username"
            label="用户名"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input placeholder="请输入用户名" className="admin-input" />
          </Form.Item>
          <Form.Item
            name="email"
            label="邮箱"
            rules={[{ required: true, message: '请输入邮箱' }]}
          >
            <Input placeholder="请输入邮箱" className="admin-input" />
          </Form.Item>
          <Form.Item
            name="role"
            label="角色"
            rules={[{ required: true, message: '请选择角色' }]}
          >
            <Select placeholder="请选择角色" className="admin-select">
              <Option value="管理员">管理员</Option>
              <Option value="编辑">编辑</Option>
              <Option value="查看者">查看者</Option>
              <Option value="测试">测试</Option>
              <Option value="演示">演示</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="status"
            label="状态"
            rules={[{ required: true, message: '请选择状态' }]}
          >
            <Select placeholder="请选择状态" className="admin-select">
              <Option value="启用">启用</Option>
              <Option value="禁用">禁用</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );

  return (
    <DashboardLayout
      title="用户管理"
      selectedMenuKey="3-1"
      onMenuClick={handleMenuClick}
      userInfo={getUserInfo()}
      onLogout={handleLogout}
    >
      {renderUserManagement()}
    </DashboardLayout>
  );
};

export default Users;