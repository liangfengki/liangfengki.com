import React from 'react';
import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

interface CaseItem {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

interface CasesPreviewProps {
  title: string;
  cases: CaseItem[];
}

export const CasesPreview: React.FC<CasesPreviewProps> = ({ title, cases }) => {
  return (
    <section className="py-20 bg-neutral">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <h2 className="section-title mb-0">{title}</h2>
          <Link href="/cases" className="flex items-center text-primary font-medium hover:text-primary-dark transition-colors mt-4 md:mt-0">
            查看全部案例
            <ChevronRightIcon width={16} height={16} className="ml-1" />
          </Link>
        </div>
        
        {/* 案例展示区 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cases.map((caseItem, index) => (
            <div 
              key={index} 
              className="group relative overflow-hidden rounded-xl shadow-lg bg-white hover:shadow-xl transition-all duration-300"
            >
              {/* 案例图片 */}
              <div className="h-60 overflow-hidden">
                <img 
                  src={caseItem.imageUrl} 
                  alt={caseItem.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              
              {/* 案例信息 */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-text-dark mb-2 group-hover:text-primary transition-colors">
                  {caseItem.title}
                </h3>
                <p className="text-text-dark/70 mb-4">{caseItem.description}</p>
                
                {/* 查看详情按钮 */}
                <Link 
                  href={caseItem.link} 
                  className="inline-flex items-center text-primary font-medium hover:text-primary-dark transition-colors"
                >
                  查看详情
                  <ChevronRightIcon width={16} height={16} className="ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
              
              {/* 悬停效果装饰 */}
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>
        
        {/* 客户评价统计 */}
        <div className="mt-16 bg-white p-8 rounded-xl shadow-lg">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-text-dark mb-2">客户满意度</h3>
            <p className="text-text-dark/70">98%的客户表示愿意向同行推荐我们的储能解决方案</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-text-dark">成功案例</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">100MW+</div>
              <div className="text-text-dark">累计装机容量</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">30+</div>
              <div className="text-text-dark">行业覆盖</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">98%</div>
              <div className="text-text-dark">客户满意度</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};