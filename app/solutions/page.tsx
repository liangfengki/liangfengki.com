'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRightIcon, ChevronRightIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

// 解决方案类别
const solutionCategories = [
  { id: 'peak-valley', name: '峰谷套利储能系统' },
  { id: 'pv-storage', name: '光伏储能一体化系统' },
  { id: 'backup-power', name: '备用电源系统' },
  { id: 'microgrid', name: '微电网系统' },
  { id: 'demand-response', name: '需求侧响应' },
];

// 解决方案详情
const solutionsData = [
  {
    id: 'peak-valley',
    title: '峰谷套利储能系统',
    description: '通过在电价低谷时充电，高峰时放电，帮助企业降低用电成本，提高经济效益。',
    features: [
      '智能预测电价曲线，优化充放电策略',
      '最高可降低30%用电成本',
      '模块化设计，易于扩展',
      '多重安全保护机制',
    ],
    applications: ['制造业工厂', '商业综合体', '数据中心', '医院'],
    image: '/images/solutions/peak-valley.jpg',
    spec: '容量范围：100kWh-10MWh\n效率：>90%\n循环寿命：>6000次\n响应时间：<10ms',
  },
  {
    id: 'pv-storage',
    title: '光伏储能一体化系统',
    description: '将太阳能发电与储能系统完美结合，实现自发自用，余电储能，提高光伏利用率。',
    features: [
      '光伏优先使用，储能峰谷套利',
      '提高光伏自发自用率至95%以上',
      '离网模式保障关键负载供电',
      '远程监控与智能运维',
    ],
    applications: ['工厂屋顶光伏', '商业建筑光伏', '园区光伏', '公共设施光伏'],
    image: '/images/solutions/pv-storage.jpg',
    spec: '光伏容量：100kW-5MW\n储能容量：100kWh-5MWh\n系统效率：>85%\n智能调度：AI算法优化',
  },
  {
    id: 'backup-power',
    title: '备用电源系统',
    description: '为关键负载提供可靠的备用电源保障，防止电网断电造成的生产损失和安全隐患。',
    features: [
      '毫秒级响应，零切换时间',
      '多电源冗余设计',
      '智能电池管理，延长使用寿命',
      '远程监控与故障告警',
    ],
    applications: ['数据中心', '医院', '金融机构', '关键制造业'],
    image: '/images/solutions/backup-power.jpg',
    spec: '备用时间：1-24小时\n响应时间：<10ms\n可靠性：99.999%\n维护周期：1年',
  },
  {
    id: 'microgrid',
    title: '微电网系统',
    description: '整合多种分布式能源和储能系统，形成独立或并网运行的智能电网，提高能源供应可靠性和灵活性。',
    features: [
      '多能源协同调度',
      '并网/离网无缝切换',
      '需求响应与负荷管理',
      '能量管理系统(EMS)优化控制',
    ],
    applications: ['产业园区', '海岛', '偏远地区', '军事基地'],
    image: '/images/solutions/microgrid.jpg',
    spec: '系统容量：100kW-50MW\n控制精度：±0.5Hz\n通信协议：IEC 61850, Modbus\n保护等级：IP54',
  },
  {
    id: 'demand-response',
    title: '需求侧响应',
    description: '通过参与电网需求侧响应项目，帮助企业获取额外收益，同时为电网提供调峰调频服务。',
    features: [
      '实时监测电网信号',
      '快速响应电网需求',
      '自动或手动参与模式',
      '收益最大化算法',
    ],
    applications: ['高耗能企业', '商业综合体', '工业用户', '数据中心'],
    image: '/images/solutions/demand-response.jpg',
    spec: '响应时间：<100ms\n调节容量：100kW-10MW\n年收益：200-1000元/kW\n兼容标准：OpenADR, IEEE 2030.5',
  },
];

const SolutionsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>(solutionCategories[0].id);

  // 获取当前选中的解决方案
  const currentSolution = solutionsData.find(s => s.id === selectedCategory) || solutionsData[0];

  return (
    <div className="min-h-screen bg-white">
      {/* 页面头部 */}
      <section className="relative h-80 bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-dark opacity-90"></div>
        <div className="absolute inset-0 bg-[url('/images/hero-solutions.jpg')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">产品与解决方案</h1>
            <p className="text-lg opacity-90">
              中科恒一提供全方位的工商业储能解决方案，满足不同行业客户的多样化需求，
              助力企业降低能源成本，提高能源利用效率，实现可持续发展。
            </p>
          </div>
        </div>
      </section>

      {/* 解决方案导航 */}
      <section className="bg-neutral py-4 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto gap-2 no-scrollbar">
            {solutionCategories.map((category) => (
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

      {/* 解决方案详情 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* 左侧：图片和概述 */}
            <div className="lg:w-1/2">
              <div className="relative rounded-xl overflow-hidden shadow-lg">
                <img 
                  src={currentSolution.image} 
                  alt={currentSolution.title} 
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div className="mt-8 bg-neutral p-6 rounded-xl">
                <h3 className="text-xl font-bold text-text-dark mb-4">产品概述</h3>
                <p className="text-text-dark/80 mb-4">
                  {currentSolution.description}
                </p>
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <h4 className="font-bold text-text-dark mb-2">规格参数</h4>
                  <pre className="text-text-dark/70 text-sm whitespace-pre-line">
                    {currentSolution.spec}
                  </pre>
                </div>
              </div>
            </div>
            
            {/* 右侧：详细信息 */}
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-text-dark mb-6">{currentSolution.title}</h2>
              
              {/* 核心优势 */}
              <div className="mb-10">
                <h3 className="text-xl font-bold text-text-dark mb-4">核心优势</h3>
                <div className="space-y-3">
                  {currentSolution.features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircleIcon width={20} height={20} className="text-primary mt-0.5 mr-3 flex-shrink-0" />
                      <p className="text-text-dark/80">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* 应用场景 */}
              <div className="mb-10">
                <h3 className="text-xl font-bold text-text-dark mb-4">应用场景</h3>
                <div className="flex flex-wrap gap-3">
                  {currentSolution.applications.map((app, index) => (
                    <span 
                      key={index} 
                      className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium"
                    >
                      {app}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* 解决方案流程 */}
              <div className="mb-10">
                <h3 className="text-xl font-bold text-text-dark mb-4">服务流程</h3>
                <div className="space-y-6">
                  <div className="flex">
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold mr-4 flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h4 className="font-bold text-text-dark mb-1">需求分析</h4>
                      <p className="text-text-dark/70 text-sm">了解客户用电情况、峰谷电价、负荷特性等</p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold mr-4 flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h4 className="font-bold text-text-dark mb-1">方案设计</h4>
                      <p className="text-text-dark/70 text-sm">根据需求定制储能系统方案，包括容量、配置等</p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold mr-4 flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h4 className="font-bold text-text-dark mb-1">安装调试</h4>
                      <p className="text-text-dark/70 text-sm">专业团队现场安装、调试和验收</p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold mr-4 flex-shrink-0">
                      4
                    </div>
                    <div>
                      <h4 className="font-bold text-text-dark mb-1">运维服务</h4>
                      <p className="text-text-dark/70 text-sm">7×24小时远程监控和定期现场维护</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 联系按钮 */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="/contact" 
                  className="px-6 py-3 bg-primary text-white font-medium rounded-full hover:bg-primary-dark transition-colors text-center"
                >
                  免费获取方案
                </a>
                <a 
                  href="/cases" 
                  className="px-6 py-3 border border-primary text-primary font-medium rounded-full hover:bg-primary/5 transition-colors text-center"
                >
                  查看成功案例
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 相关产品推荐 */}
      <section className="py-20 bg-neutral">
        <div className="container mx-auto px-4">
          <h2 className="section-title mb-12">相关产品推荐</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
              <div className="h-48 overflow-hidden">
                <img 
                  src="/images/products/battery.jpg" 
                  alt="锂电池储能系统" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-text-dark mb-2 group-hover:text-primary transition-colors">
                  锂电池储能系统
                </h3>
                <p className="text-text-dark/70 mb-4 text-sm">
                  采用磷酸铁锂电池，具有高能量密度、长循环寿命、高安全性等特点。
                </p>
                <a 
                  href="/products/battery" 
                  className="inline-flex items-center text-primary font-medium hover:text-primary-dark transition-colors"
                >
                  查看详情
                  <ChevronRightIcon width={16} height={16} className="ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </div>
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
              <div className="h-48 overflow-hidden">
                <img 
                  src="/images/products/ems.jpg" 
                  alt="能源管理系统" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-text-dark mb-2 group-hover:text-primary transition-colors">
                  能源管理系统
                </h3>
                <p className="text-text-dark/70 mb-4 text-sm">
                  智能算法优化能源使用，实现需求响应、负荷预测和优化调度。
                </p>
                <a 
                  href="/products/ems" 
                  className="inline-flex items-center text-primary font-medium hover:text-primary-dark transition-colors"
                >
                  查看详情
                  <ChevronRightIcon width={16} height={16} className="ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </div>
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
              <div className="h-48 overflow-hidden">
                <img 
                  src="/images/products/inverter.jpg" 
                  alt="双向变流器" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-text-dark mb-2 group-hover:text-primary transition-colors">
                  双向变流器
                </h3>
                <p className="text-text-dark/70 mb-4 text-sm">
                  高效能量转换，支持多种运行模式，满足不同应用场景需求。
                </p>
                <a 
                  href="/products/inverter" 
                  className="inline-flex items-center text-primary font-medium hover:text-primary-dark transition-colors"
                >
                  查看详情
                  <ChevronRightIcon width={16} height={16} className="ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 技术支持 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-primary/5 rounded-2xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="md:w-2/3">
                <h2 className="text-3xl font-bold text-text-dark mb-4">专业技术支持</h2>
                <p className="text-text-dark/70 mb-6">
                  我们拥有一支由能源专家、电力工程师、软件研发人员组成的专业团队，
                  为客户提供从方案设计、安装调试到运维服务的全生命周期技术支持。
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircleIcon width={18} height={18} className="text-primary mr-2" />
                    <span className="text-text-dark/80">7×24小时远程监控与故障处理</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircleIcon width={18} height={18} className="text-primary mr-2" />
                    <span className="text-text-dark/80">定期现场维护与性能评估</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircleIcon width={18} height={18} className="text-primary mr-2" />
                    <span className="text-text-dark/80">系统升级与功能扩展服务</span>
                  </li>
                </ul>
              </div>
              <div className="md:w-1/3 text-center">
                <a 
                  href="/support" 
                  className="inline-flex items-center px-8 py-4 bg-primary text-white font-medium rounded-full hover:bg-primary-dark transition-colors"
                >
                  技术支持中心
                  <ArrowRightIcon width={18} height={18} className="ml-2" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SolutionsPage;