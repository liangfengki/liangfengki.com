import React from 'react';
import Link from 'next/link';
import { RightOutlined } from '@ant-design/icons';

interface SolutionItem {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

interface SolutionsPreviewProps {
  title: string;
  solutions: SolutionItem[];
}

export const SolutionsPreview: React.FC<SolutionsPreviewProps> = ({ title, solutions }) => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <h2 className="section-title mb-0">{title}</h2>
          <Link href="/solutions" className="flex items-center text-primary font-medium hover:text-primary-dark transition-colors mt-4 md:mt-0">
            查看全部解决方案
            <RightOutlined className="ml-1" />
          </Link>
        </div>
        
        {/* 解决方案卡片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <div 
              key={index} 
              className="card overflow-hidden group"
            >
              {/* 图片区域 */}
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={solution.imageUrl} 
                  alt={solution.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              {/* 内容区域 */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-text-dark mb-3 group-hover:text-primary transition-colors">
                  {solution.title}
                </h3>
                <p className="text-text-dark/70 mb-6">{solution.description}</p>
                <Link 
                  href={solution.link} 
                  className="inline-flex items-center text-primary font-medium hover:text-primary-dark transition-colors"
                >
                  了解详情
                  <RightOutlined className="ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        {/* 解决方案类型标签 */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <div className="inline-block px-5 py-3 bg-primary/10 text-primary rounded-full text-sm font-medium">
            峰谷套利储能
          </div>
          <div className="inline-block px-5 py-3 bg-primary/10 text-primary rounded-full text-sm font-medium">
            光伏储能一体化
          </div>
          <div className="inline-block px-5 py-3 bg-primary/10 text-primary rounded-full text-sm font-medium">
            备用电源系统
          </div>
          <div className="inline-block px-5 py-3 bg-primary/10 text-primary rounded-full text-sm font-medium">
            微电网系统
          </div>
          <div className="inline-block px-5 py-3 bg-primary/10 text-primary rounded-full text-sm font-medium">
            需求侧响应
          </div>
        </div>
      </div>
    </section>
  );
};