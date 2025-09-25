'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRightIcon, CalendarIcon, ClockIcon, TagIcon, EyeIcon } from '@heroicons/react/24/outline';

// 新闻分类
const newsCategories = [
  { id: 'all', name: '全部新闻' },
  { id: 'company', name: '企业动态' },
  { id: 'industry', name: '行业资讯' },
  { id: 'technical', name: '技术文章' },
  { id: 'events', name: '活动预告' },
];

// 新闻数据
const newsData = [
  {
    id: 1,
    title: '中科恒一完成C轮融资，估值达20亿元',
    category: 'company',
    summary: '近日，中科恒一宣布完成C轮融资，融资规模达5亿元，估值达20亿元。本轮融资将用于技术研发、市场拓展和产能提升。',
    image: '/images/news/company1.jpg',
    date: '2023-10-15',
    readTime: '3分钟',
    views: 1254,
  },
  {
    id: 2,
    title: '工商业储能市场规模持续扩大，年增长率超过50%',
    category: 'industry',
    summary: '据行业研究报告显示，2023年全球工商业储能市场规模将达到250亿美元，年增长率超过50%，中国市场增速领跑全球。',
    image: '/images/news/industry1.jpg',
    date: '2023-09-28',
    readTime: '4分钟',
    views: 987,
  },
  {
    id: 3,
    title: '锂电池储能系统技术发展趋势分析',
    category: 'technical',
    summary: '本文分析了锂电池储能系统的技术发展趋势，包括能量密度提升、循环寿命延长、安全性能改进等方面的最新进展。',
    image: '/images/news/technical1.jpg',
    date: '2023-09-15',
    readTime: '8分钟',
    views: 1432,
  },
  {
    id: 4,
    title: '中科恒一将参加2023国际储能技术与应用展览会',
    category: 'events',
    summary: '中科恒一将参加2023国际储能技术与应用展览会，展位号A3-08，展出最新的工商业储能解决方案和产品。',
    image: '/images/news/events1.jpg',
    date: '2023-09-01',
    readTime: '2分钟',
    views: 654,
  },
  {
    id: 5,
    title: '中科恒一荣获"2023年度储能行业十大品牌"称号',
    category: 'company',
    summary: '在2023储能行业峰会上，中科恒一凭借优异的产品性能和市场表现，荣获"2023年度储能行业十大品牌"称号。',
    image: '/images/news/company2.jpg',
    date: '2023-08-20',
    readTime: '3分钟',
    views: 1123,
  },
  {
    id: 6,
    title: '新型储能技术在工商业领域的应用前景',
    category: 'technical',
    summary: '本文探讨了液流电池、飞轮储能、压缩空气储能等新型储能技术在工商业领域的应用前景和挑战。',
    image: '/images/news/technical2.jpg',
    date: '2023-08-10',
    readTime: '6分钟',
    views: 876,
  },
];

const NewsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filteredNews, setFilteredNews] = useState(newsData);

  // 筛选新闻
  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredNews(newsData);
    } else {
      setFilteredNews(newsData.filter(news => news.category === selectedCategory));
    }
  }, [selectedCategory]);

  // 格式化日期显示
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 页面头部 */}
      <section className="relative h-80 bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-dark opacity-90"></div>
        <div className="absolute inset-0 bg-[url('/images/hero-news.jpg')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">新闻中心</h1>
            <p className="text-lg opacity-90">
              及时了解中科恒一的企业动态、行业资讯、技术文章和活动预告，
              掌握工商业储能领域的最新发展趋势。
            </p>
          </div>
        </div>
      </section>

      {/* 新闻分类导航 */}
      <section className="bg-neutral py-4 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto gap-2 no-scrollbar">
            {newsCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 whitespace-nowrap rounded-full text-sm font-medium transition-colors ${selectedCategory === category.id ? 'bg-primary text-white' : 'bg-white text-text-dark hover:bg-primary/10'}`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 新闻列表 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="section-title mb-0">
              {selectedCategory === 'all' ? '全部新闻' : newsCategories.find(c => c.id === selectedCategory)?.name}
            </h2>
            <p className="text-text-dark/70 mt-2">
              共 {filteredNews.length} 条新闻
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 主要新闻列表 */}
            <div className="lg:col-span-2 space-y-8">
              {filteredNews.map((news) => (
                <div 
                  key={news.id} 
                  className="group flex flex-col md:flex-row gap-6 p-6 rounded-xl hover:bg-neutral transition-colors"
                >
                  {/* 新闻图片 */}
                  <div className="md:w-1/3 lg:w-1/4">
                    <div className="rounded-lg overflow-hidden h-40">
                      <img 
                        src={news.image} 
                        alt={news.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  </div>
                  
                  {/* 新闻内容 */}
                  <div className="md:w-2/3 lg:w-3/4">
                    <Link href={`/news/${news.id}`} className="block">
                      <h3 className="text-xl font-bold text-text-dark mb-3 group-hover:text-primary transition-colors">
                        {news.title}
                      </h3>
                      <p className="text-text-dark/70 mb-4 line-clamp-2">
                        {news.summary}
                      </p>
                    </Link>
                    
                    {/* 新闻信息标签 */}
                    <div className="flex flex-wrap items-center gap-4 text-text-dark/60 text-sm">
                      <div className="flex items-center">
                        <CalendarIcon width={14} height={14} className="mr-1" />
                        {formatDate(news.date)}
                      </div>
                      <div className="flex items-center">
                        <ClockIcon width={14} height={14} className="mr-1" />
                        {news.readTime}
                      </div>
                      <div className="flex items-center">
                        <TagIcon width={14} height={14} className="mr-1" />
                          {newsCategories.find(c => c.id === news.category)?.name}
                      </div>
                      <div className="flex items-center">
                        <EyeIcon width={14} height={14} className="mr-1" />
                        {news.views} 阅读
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* 侧边栏 */}
            <div className="lg:col-span-1">
              {/* 热门新闻 */}
              <div className="bg-neutral p-6 rounded-xl mb-8">
                <h3 className="text-xl font-bold text-text-dark mb-6">热门新闻</h3>
                <div className="space-y-6">
                  {newsData
                    .sort((a, b) => b.views - a.views)
                    .slice(0, 5)
                    .map((news, index) => (
                      <div key={news.id} className="flex gap-4">
                        <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                          <img 
                            src={news.image} 
                            alt={news.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium text-text-dark mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                            <Link href={`/news/${news.id}`}>{news.title}</Link>
                          </h4>
                          <p className="text-text-dark/60 text-sm">
                            {formatDate(news.date)}
                          </p>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
              
              {/* 订阅新闻 */}
              <div className="bg-primary p-6 rounded-xl text-white">
                <h3 className="text-xl font-bold mb-4">订阅新闻</h3>
                <p className="opacity-90 mb-6">
                  订阅我们的新闻通讯，及时获取最新行业动态和技术资讯。
                </p>
                <form className="space-y-4">
                  <div>
                    <input 
                      type="email" 
                      placeholder="请输入您的邮箱地址" 
                      className="w-full px-4 py-3 rounded-lg text-text-dark focus:outline-none focus:ring-2 focus:ring-white"
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="w-full py-3 bg-white text-primary font-medium rounded-lg hover:bg-opacity-90 transition-colors"
                  >
                    立即订阅
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 推荐阅读 */}
      <section className="py-20 bg-neutral">
        <div className="container mx-auto px-4">
          <h2 className="section-title mb-12">推荐阅读</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newsData
              .filter(news => news.category === 'technical')
              .slice(0, 3)
              .map((news) => (
                <div 
                  key={news.id} 
                  className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {/* 新闻图片 */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={news.image} 
                      alt={news.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 left-4 bg-primary text-white text-sm font-medium px-3 py-1 rounded-full">
                      {newsCategories.find(c => c.id === news.category)?.name}
                    </div>
                  </div>
                  
                  {/* 新闻信息 */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-text-dark mb-3 group-hover:text-primary transition-colors">
                      <Link href={`/news/${news.id}`}>{news.title}</Link>
                    </h3>
                    <div className="flex items-center text-text-dark/60 text-sm mb-4">
                      <CalendarIcon width={14} height={14} className="mr-1" />
                      {formatDate(news.date)}
                    </div>
                    <p className="text-text-dark/70 mb-4 line-clamp-3">
                      {news.summary}
                    </p>
                    <Link 
                      href={`/news/${news.id}`} 
                      className="inline-flex items-center text-primary font-medium hover:text-primary-dark transition-colors"
                    >
                      阅读全文
                      <ChevronRightIcon width={16} height={16} className="ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </section>

      {/* 联系我们 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-primary/5 rounded-2xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="md:w-2/3">
                <h2 className="text-3xl font-bold text-text-dark mb-4">有任何问题？联系我们</h2>
                <p className="text-text-dark/70 mb-6">
                  如需了解更多关于工商业储能解决方案的信息，或者有任何疑问，欢迎随时联系我们。
                  我们的专业团队将为您提供详细的咨询服务。
                </p>
                <a 
                  href="/contact" 
                  className="inline-flex items-center text-primary font-medium hover:text-primary-dark transition-colors"
                >
                  联系我们
                  <ChevronRightIcon width={16} height={16} className="ml-1 transition-transform duration-300 hover:translate-x-1" />
                </a>
              </div>
              <div className="md:w-1/3">
                <img 
                  src="/images/contact-us.jpg" 
                  alt="联系我们" 
                  className="rounded-xl shadow-lg w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsPage;