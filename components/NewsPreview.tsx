import React from 'react';
import Link from 'next/link';
import { RightOutlined } from '@ant-design/icons';

interface NewsItem {
  title: string;
  date: string;
  summary: string;
  link: string;
}

interface NewsPreviewProps {
  title: string;
  news: NewsItem[];
}

export const NewsPreview: React.FC<NewsPreviewProps> = ({ title, news }) => {
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
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <h2 className="section-title mb-0">{title}</h2>
          <Link href="/news" className="flex items-center text-primary font-medium hover:text-primary-dark transition-colors mt-4 md:mt-0">
            查看全部新闻
            <RightOutlined className="ml-1" />
          </Link>
        </div>
        
        {/* 新闻列表 */}
        <div className="space-y-8">
          {news.map((item, index) => (
            <div 
              key={index} 
              className="group flex flex-col md:flex-row gap-6 p-6 rounded-xl hover:bg-neutral transition-colors"
            >
              {/* 日期标签 */}
              <div className="md:w-1/6 lg:w-1/8 flex-shrink-0">
                <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium">
                  {formatDate(item.date)}
                </div>
              </div>
              
              {/* 新闻内容 */}
              <div className="md:w-5/6 lg:w-7/8">
                <Link href={item.link} className="block">
                  <h3 className="text-xl font-bold text-text-dark mb-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-text-dark/70 mb-4">{item.summary}</p>
                  <span className="inline-flex items-center text-primary font-medium hover:text-primary-dark transition-colors">
                    阅读全文
                    <RightOutlined className="ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        {/* 新闻分类导航 */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <Link href="/news/company" className="inline-block px-5 py-3 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary/20 transition-colors">
            企业动态
          </Link>
          <Link href="/news/industry" className="inline-block px-5 py-3 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary/20 transition-colors">
            行业资讯
          </Link>
          <Link href="/news/technical" className="inline-block px-5 py-3 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary/20 transition-colors">
            技术文章
          </Link>
          <Link href="/news/events" className="inline-block px-5 py-3 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary/20 transition-colors">
            活动预告
          </Link>
        </div>
      </div>
    </section>
  );
};