import React from 'react';

interface AdvantageItem {
  icon: string;
  title: string;
  description: string;
}

interface AdvantagesProps {
  title: string;
  advantages: AdvantageItem[];
}

export const Advantages: React.FC<AdvantagesProps> = ({ title, advantages }) => {
  return (
    <section className="py-20 bg-neutral">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="section-title">{title}</h2>
        
        {/* 核心优势网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((advantage, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-custom hover-scale"
            >
              {/* 图标 */}
              <div className="text-4xl mb-6">{advantage.icon}</div>
              
              {/* 标题和描述 */}
              <h3 className="text-xl font-bold text-text-dark mb-4">{advantage.title}</h3>
              <p className="text-text-dark/70 leading-relaxed">{advantage.description}</p>
            </div>
          ))}
        </div>
        
        {/* 技术特点展示 */}
        <div className="mt-20 bg-white p-10 rounded-2xl shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* 左侧图表 */}
            <div className="relative">
              <div className="w-full h-80 bg-primary/5 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl font-bold text-primary mb-2">95%</div>
                  <div className="text-text-dark">能量转换效率</div>
                  <div className="mt-6 text-lg text-text-dark/70">远超行业平均水平</div>
                </div>
              </div>
              {/* 装饰元素 */}
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary opacity-10 rounded-full z-0"></div>
            </div>
            
            {/* 右侧技术特点 */}
            <div>
              <h3 className="text-2xl font-bold text-primary mb-6">技术领先优势</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary mt-1 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-text-dark">智能电池管理系统</h4>
                    <p className="text-text-dark/70">精确监控每节电池状态，延长电池使用寿命20%以上</p>
                  </div>
                </li>
                <li className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary mt-1 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-text-dark">高效能量转换技术</h4>
                    <p className="text-text-dark/70">采用先进的电力电子技术，能量转换效率高达95%以上</p>
                  </div>
                </li>
                <li className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary mt-1 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-text-dark">远程智能监控平台</h4>
                    <p className="text-text-dark/70">7×24小时实时监控，智能预警，快速响应故障</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};