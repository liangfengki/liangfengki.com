import React, { useEffect } from 'react';
import { useRouter } from 'next/router';



interface ArticleData {
  id: number;
  title: string;
  category: string;
  author: string;
  status: string;
  createTime: string;
  viewCount: number;
}

const Articles: React.FC = () => {
  const router = useRouter();
  const [articles, setArticles] = React.useState<ArticleData[]>([]);
  const [searchText, setSearchText] = React.useState('');
  const [isDeleting, setIsDeleting] = React.useState<number | null>(null);

  useEffect(() => {
    // 模拟加载文章数据
    setArticles([
      {
        id: 1,
        title: '工商业储能解决方案最新进展',
        category: '产品介绍',
        author: 'admin',
        status: '已发布',
        createTime: '2023-06-15',
        viewCount: 1245
      },
      {
        id: 2,
        title: '如何选择适合企业的储能系统',
        category: '行业指南',
        author: 'admin',
        status: '已发布',
        createTime: '2023-06-14',
        viewCount: 867
      },
      {
        id: 3,
        title: '储能技术发展趋势分析',
        category: '技术分析',
        author: 'admin',
        status: '已发布',
        createTime: '2023-06-13',
        viewCount: 562
      },
      {
        id: 4,
        title: '储能系统安装与维护指南',
        category: '使用指南',
        author: 'admin',
        status: '草稿',
        createTime: '2023-06-12',
        viewCount: 0
      },
      {
        id: 5,
        title: '储能系统在工业领域的应用案例',
        category: '案例分析',
        author: 'admin',
        status: '已发布',
        createTime: '2023-06-11',
        viewCount: 1024
      },
    ]);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleAdd = () => {
    // 实际项目中可能会跳转到添加页面
    console.log('添加文章');
  };

  const handleEdit = (id: number) => {
    // 实际项目中可能会跳转到编辑页面
    console.log('编辑文章', id);
  };

  const handleDelete = (id: number) => {
    // 确认删除
    setArticles(articles.filter(article => article.id !== id));
    setIsDeleting(null);
  };

  const handleRefresh = () => {
    // 实际项目中可能会重新请求文章数据
    console.log('刷新文章列表');
  };

  // 过滤搜索结果
  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchText.toLowerCase())
  );

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
          <button onClick={() => navigateTo('/admin/dashboard')} className="px-3 py-1 text-sm text-gray-600 hover:text-blue-600">仪表盘</button>
          <button onClick={() => navigateTo('/admin/articles')} className="px-3 py-1 text-sm text-blue-600 font-medium">文章管理</button>
          <button onClick={() => navigateTo('/admin/users')} className="px-3 py-1 text-sm text-gray-600 hover:text-blue-600">用户管理</button>
        </nav>
      </header>

      {/* 主内容 */}
      <main className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          {/* 页面标题 */}
          <h2 className="text-lg font-semibold text-gray-800 mb-4">文章管理</h2>

          {/* 搜索和操作按钮 */}
          <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="输入文章标题搜索"
                value={searchText}
                onChange={handleSearch}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                style={{ width: '300px' }}
              />
              <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={handleRefresh}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                刷新
              </button>
              <button 
                onClick={handleAdd}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                添加文章
              </button>
            </div>
          </div>

          {/* 文章列表表格 */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">标题</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">分类</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">作者</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">状态</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">发布时间</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">浏览量</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">操作</th>
                </tr>
              </thead>
              <tbody>
                {filteredArticles.map((article) => (
                  <tr key={article.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-800 max-w-xs truncate">{article.title}</td>
                    <td className="px-4 py-3 text-sm text-gray-800">{article.category}</td>
                    <td className="px-4 py-3 text-sm text-gray-800">{article.author}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className={article.status === '已发布' ? 'text-green-600' : 'text-gray-500'}>
                        {article.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-800">{article.createTime}</td>
                    <td className="px-4 py-3 text-sm text-gray-800">{article.viewCount}</td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleEdit(article.id)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          编辑
                        </button>
                        <button 
                          onClick={() => setIsDeleting(article.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          删除
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {/* 简单的分页信息 */}
            <div className="mt-4 text-right text-sm text-gray-600">
              共 {filteredArticles.length} 条记录
            </div>
          </div>
        </div>
      </main>

      {/* 删除确认对话框（简化版） */}
      {isDeleting !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">确认删除？</h3>
            <p className="text-gray-600 mb-4">确定要删除这篇文章吗？此操作无法撤销。</p>
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => setIsDeleting(null)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                取消
              </button>
              <button 
                onClick={() => isDeleting !== null && handleDelete(isDeleting)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                确认
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Articles;