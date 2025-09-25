import React from 'react';
import { useRouter } from 'next/router';

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
};

// 模拟最近活动数据
const recentActivities = [
  { id: 1, action: '新文章发布', content: '《工商业储能解决方案最新进展》', time: '10分钟前', user: '内容编辑', type: 'success' },
  { id: 2, action: '表单提交', content: '来自上海的客户咨询', time: '1小时前', user: '系统', type: 'info' },
  { id: 3, action: '图片上传', content: '上传了5张产品图片', time: '3小时前', user: '内容编辑', type: 'info' },
  { id: 4, action: '系统登录', content: '管理员登录系统', time: '昨天', user: '超级管理员', type: 'success' },
  { id: 5, action: '内容更新', content: '更新了首页轮播图', time: '2天前', user: '内容编辑', type: 'warning' }
];

const Dashboard: React.FC = () => {
  const router = useRouter();

  // 安全地获取localStorage数据的函数
  const getLocalStorageItem = (key: string): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key);
    }
    return null;
  };

  // 检查登录状态
  const checkLoginStatus = () => {
    const token = getLocalStorageItem('adminToken');
    const userData = getLocalStorageItem('adminUser');
    
    if (!token || !userData) {
      router.push('/admin');
      return false;
    }
    
    try {
      if (typeof window !== 'undefined') {
        return JSON.parse(userData);
      }
    } catch (error) {
      router.push('/admin');
      return false;
    }
    return false;
  };

  const userInfo = checkLoginStatus();
  if (!userInfo) {
    return <div className="flex justify-center items-center h-screen text-gray-500">加载中...</div>;
  }

  // 处理内容管理卡片点击
  const handleContentCardClick = (route: string) => {
    router.push(`/admin/${route}`);
  };

  // 处理菜单点击
  const handleMenuClick = (key: string) => {
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

  // 处理登出
  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
    }
    router.push('/admin');
  };

  // 简单的导航函数
  const navigateTo = (path: string) => {
    router.push(path);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">管理后台</h1>
        <nav className="flex space-x-4">
          <button onClick={() => navigateTo('/admin/dashboard')} className="px-3 py-1 text-sm text-blue-600 font-medium">仪表盘</button>
          <button onClick={() => navigateTo('/admin/articles')} className="px-3 py-1 text-sm text-gray-600 hover:text-blue-600">文章管理</button>
          <button onClick={() => navigateTo('/admin/users')} className="px-3 py-1 text-sm text-gray-600 hover:text-blue-600">用户管理</button>
        </nav>
      </header>

      {/* 主内容 */}
      <main className="container mx-auto px-4 py-6">
        {/* 页面标题 */}
        <h2 className="text-xl font-semibold text-gray-800 mb-6">仪表盘</h2>

        {/* 统计卡片 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* 访问量统计卡片 */}
          <div className="bg-white rounded-lg shadow-sm p-5 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-500">总访问量</span>
              <div className="bg-green-100 p-2 rounded-full">
                <span className="text-green-600">👁️</span>
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold text-gray-800">{statsData.visitors.total}</span>
              <span className="text-sm font-medium text-green-600">+{statsData.visitors.increase}%</span>
            </div>
            <div className="mt-2 text-xs text-gray-500">今日访问: {statsData.visitors.today}</div>
          </div>

          {/* 页面浏览统计卡片 */}
          <div className="bg-white rounded-lg shadow-sm p-5 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-500">页面浏览量</span>
              <div className="bg-red-100 p-2 rounded-full">
                <span className="text-red-600">👁️</span>
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold text-gray-800">{statsData.pageViews.total}</span>
              <span className="text-sm font-medium text-red-600">+{statsData.pageViews.increase}%</span>
            </div>
            <div className="mt-2 text-xs text-gray-500">今日浏览: {statsData.pageViews.today}</div>
          </div>

          {/* 表单提交统计卡片 */}
          <div className="bg-white rounded-lg shadow-sm p-5 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-500">表单提交</span>
              <div className="bg-blue-100 p-2 rounded-full">
                <span className="text-blue-600">✏️</span>
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold text-gray-800">{statsData.formSubmissions.total}</span>
              <span className="text-sm font-medium text-blue-600">+{statsData.formSubmissions.increase}%</span>
            </div>
            <div className="mt-2 text-xs text-gray-500">今日提交: {statsData.formSubmissions.today}</div>
          </div>

          {/* 新增用户统计卡片 */}
          <div className="bg-white rounded-lg shadow-sm p-5 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-500">新增用户</span>
              <div className="bg-orange-100 p-2 rounded-full">
                <span className="text-orange-600">👤</span>
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold text-gray-800">{statsData.newUsers.total}</span>
              <span className={`text-sm font-medium ${statsData.newUsers.increase >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {statsData.newUsers.increase >= 0 ? '+' : ''}{statsData.newUsers.increase}%
              </span>
            </div>
            <div className="mt-2 text-xs text-gray-500">今日新增: {statsData.newUsers.today}</div>
          </div>
        </div>

        {/* 内容管理卡片 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* 文章管理卡片 */}
          <div 
            className="bg-white rounded-lg shadow-sm p-5 cursor-pointer hover:shadow-md transition-shadow duration-200 border-l-4 border-blue-500"
            onClick={() => handleContentCardClick('articles')}
          >
            <div className="flex items-center justify-between">
              <div className="bg-blue-100 p-3 rounded-full">
                <span className="text-blue-600">📄</span>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">文章管理</p>
                <p className="text-xl font-bold text-gray-800">24 篇</p>
              </div>
            </div>
            <div className="mt-3">
              <span className="text-xs text-gray-500">查看所有文章</span>
            </div>
          </div>

          {/* 图片管理卡片 */}
          <div 
            className="bg-white rounded-lg shadow-sm p-5 cursor-pointer hover:shadow-md transition-shadow duration-200 border-l-4 border-green-500"
            onClick={() => handleContentCardClick('images')}
          >
            <div className="flex items-center justify-between">
              <div className="bg-green-100 p-3 rounded-full">
                <span className="text-green-600">🖼️</span>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">图片管理</p>
                <p className="text-xl font-bold text-gray-800">156 张</p>
              </div>
            </div>
            <div className="mt-3">
              <span className="text-xs text-gray-500">查看所有图片</span>
            </div>
          </div>

          {/* 视频管理卡片 */}
          <div 
            className="bg-white rounded-lg shadow-sm p-5 cursor-pointer hover:shadow-md transition-shadow duration-200 border-l-4 border-orange-500"
            onClick={() => handleContentCardClick('videos')}
          >
            <div className="flex items-center justify-between">
              <div className="bg-orange-100 p-3 rounded-full">
                <span className="text-orange-600">🎬</span>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">视频管理</p>
                <p className="text-xl font-bold text-gray-800">12 个</p>
              </div>
            </div>
            <div className="mt-3">
              <span className="text-xs text-gray-500">查看所有视频</span>
            </div>
          </div>

          {/* 页面管理卡片 */}
          <div 
            className="bg-white rounded-lg shadow-sm p-5 cursor-pointer hover:shadow-md transition-shadow duration-200 border-l-4 border-purple-500"
            onClick={() => handleContentCardClick('pages')}
          >
            <div className="flex items-center justify-between">
              <div className="bg-purple-100 p-3 rounded-full">
                <span className="text-purple-600">📑</span>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">页面管理</p>
                <p className="text-xl font-bold text-gray-800">8 个</p>
              </div>
            </div>
            <div className="mt-3">
              <span className="text-xs text-gray-500">查看所有页面</span>
            </div>
          </div>
        </div>

        {/* 最近活动和系统信息 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 最近活动 */}
          <div className="bg-white rounded-lg shadow-sm p-5">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">最近活动</h3>
            <ul className="space-y-3">
              {recentActivities.map(activity => (
                <li key={activity.id} className="flex items-start space-x-3 pb-3 border-b border-gray-100">
                  <div className={`mt-0.5 p-1 rounded-full ${activity.type === 'success' ? 'bg-green-100 text-green-600' : activity.type === 'warning' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>
                    {activity.type === 'success' ? '✓' : activity.type === 'warning' ? '!' : 'i'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      <span className="text-blue-600">{activity.action}</span>: {activity.content}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {activity.user} · {activity.time}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* 系统信息 */}
          <div className="bg-white rounded-lg shadow-sm p-5">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">系统信息</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">登录用户</span>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600">
                    👤
                  </div>
                  <span className="text-sm text-gray-800">{userInfo.username || '管理员'}</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">上次登录</span>
                <span className="text-sm text-gray-800">{userInfo.lastLogin || '首次登录'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">系统版本</span>
                <span className="text-sm text-gray-800">1.0.0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">运行环境</span>
                <span className="text-sm text-gray-800">开发环境</span>
              </div>
              <button 
                onClick={handleLogout}
                className="w-full py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                退出登录
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;