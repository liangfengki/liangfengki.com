import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface IntroductionProps {
  title: string;
  description: string;
  content: string;
  imageUrl: string;
}

export const Introduction: React.FC<IntroductionProps> = ({
  title,
  description,
  content,
  imageUrl,
}) => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="section-title">{title}</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* 左侧内容 */}
          <div className="order-2 lg:order-1">
            <div className="prose prose-lg max-w-none">
              <h3 className="text-2xl font-bold text-primary mb-4">{description}</h3>
              <p className="text-text-dark mb-6 leading-relaxed">
                {content}
              </p>
              
              {/* 企业成就数据 */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 my-8">
                <div className="text-center p-4 bg-neutral rounded-lg">
                  <div className="text-4xl font-bold text-primary mb-2">500+</div>
                  <div className="text-text-dark">成功案例</div>
                </div>
                <div className="text-center p-4 bg-neutral rounded-lg">
                  <div className="text-4xl font-bold text-primary mb-2">100MW+</div>
                  <div className="text-text-dark">累计装机容量</div>
                </div>
                <div className="text-center p-4 bg-neutral rounded-lg">
                  <div className="text-4xl font-bold text-primary mb-2">98%</div>
                  <div className="text-text-dark">客户满意度</div>
                </div>
              </div>
              
              {/* 按钮 */}
              <div className="flex flex-wrap gap-4">
                <Link href="/about" className="btn-primary">
                  了解更多
                </Link>
                <Link href="/contact" className="btn-secondary">
                  联系我们
                </Link>
              </div>
            </div>
          </div>
          
          {/* 右侧图片 */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative rounded-xl overflow-hidden shadow-xl">
              <img 
                src={imageUrl} 
                alt="企业简介" 
                className="w-full h-auto object-cover rounded-xl"
              />
              {/* 装饰元素 */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary opacity-20 rounded-full z-0"></div>
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-secondary opacity-20 rounded-full z-0"></div>
            </div>
            
            {/* 悬浮信息卡 */}
            <div className="absolute -bottom-12 -right-12 bg-white p-4 rounded-lg shadow-lg z-10 max-w-xs">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-text-dark">专业认证</h4>
                  <p className="text-sm text-text-dark/70">ISO9001、ISO14001、ISO45001认证企业</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};