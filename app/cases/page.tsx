'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRightIcon, ArrowRightIcon, MapPinIcon, CalendarIcon, TrophyIcon, UsersIcon } from '@heroicons/react/24/outline';

// 行业类别
const industryCategories = [
  { id: 'all', name: '全部行业' },
  { id: 'manufacturing', name: '制造业' },
  { id: 'commercial', name: '商业综合体' },
  { id: 'data-center', name: '数据中心' },
  { id: 'hospital', name: '医疗健康' },
  { id: 'education', name: '教育机构' },
];

// 案例数据
const casesData = [
  {
    id: 1,
    title: '某大型制造企业10MWh储能系统',
    industry: 'manufacturing',
    description: '为该制造企业提供10MWh峰谷套利储能系统，帮助企业降低用电成本，年节省电费超过200万元。',
    image: '/images/cases/manufacturing1.jpg',
    location: '江苏苏州',
    date: '2023-06',
    capacity: '10MWh',
    benefit: '年节省电费200万元',
  },
  {
    id: 2,
    title: '某商业综合体5MWh光伏储能系统',
    industry: 'commercial',
    description: '为商业综合体建设5MWh光伏储能一体化系统，提高光伏自发自用率，降低运营成本。',
    image: '/images/cases/commercial1.jpg',
    location: '上海',
    date: '2023-03',
    capacity: '5MWh',
    benefit: '光伏自发自用率提高至95%',
  },
  {
    id: 3,
    title: '某数据中心2MWh备用电源系统',
    industry: 'data-center',
    description: '为数据中心提供2MWh备用电源系统，保障关键负载供电可靠性，实现零中断运行。',
    image: '/images/cases/datacenter1.jpg',
    location: '北京',
    date: '2022-11',
    capacity: '2MWh',
    benefit: '供电可靠性提升至99.999%',
  },
  {
    id: 4,
    title: '某三甲医院3MWh智能储能系统',
    industry: 'hospital',
    description: '为三甲医院建设3MWh智能储能系统，保障医疗设备可靠供电，同时降低用电成本。',
    image: '/images/cases/hospital1.jpg',
    location: '广东广州',
    date: '2022-09',
    capacity: '3MWh',
    benefit: '年节省电费80万元',
  },
  {
    id: 5,
    title: '某大学园区8MWh微电网系统',
    industry: 'education',
    description: '为大学校区建设8MWh微电网系统，整合太阳能、风能和储能，提高能源自给率。',
    image: '/images/cases/education1.jpg',
    location: '湖北武汉',
    date: '2022-07',
    capacity: '8MWh',
    benefit: '能源自给率提高至60%',
  },
  {
    id: 6,
    title: '某汽车工厂5MWh需求侧响应项目',
    industry: 'manufacturing',
    description: '为汽车工厂建设5MWh储能系统，参与电网需求侧响应，年获得响应收益超过100万元。',
    image: '/images/cases/manufacturing2.jpg',
    location: '吉林长春',
    date: '2022-05',
    capacity: '5MWh',
    benefit: '年获得响应收益100万元',
  },
];

// 客户评价
const testimonials = [
  {
    id: 1,
    name: '李经理',
    company: '某制造企业',
    position: '能源总监',
    content: '中科恒一的储能系统帮助我们显著降低了用电成本，投资回报率超出预期，系统运行稳定可靠。',
    image: '/images/testimonials/1.jpg',
  },
  {
    id: 2,
    name: '张主任',
    company: '某三甲医院',
    position: '后勤保障部主任',
    content: '备用电源系统为我们的医疗设备提供了可靠保障，让我们不再担心电网断电的问题。',
    image: '/images/testimonials/2.jpg',
  },
  {
    id: 3,
    name: '王总监',
    company: '某商业综合体',
    position: '运营总监',
    content: '光伏储能一体化系统不仅降低了我们的能源成本，还提升了我们的绿色建筑形象。',
    image: '/images/testimonials/3.jpg',
  },
];

const CasesPage: React.FC = () => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [filteredCases, setFilteredCases] = useState(casesData);

  // 筛选案例
  useEffect(() => {
    if (selectedIndustry === 'all') {
      setFilteredCases(casesData);
    } else {
      setFilteredCases(casesData.filter(caseItem => caseItem.industry === selectedIndustry));
    }
  }, [selectedIndustry]);

  return (
    <div className="min-h-screen bg-white">
      {/* 页面头部 */}
      <section className="relative h-80 bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-dark opacity-90"></div>
        <div className="absolute inset-0 bg-[url('/images/hero-cases.jpg')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">成功案例</h1>
            <p className="text-lg opacity-90">
              中科恒一已为500多家工商业客户提供储能解决方案，累计装机容量超过100MW，
              涵盖制造业、商业综合体、数据中心、医院、学校等多个行业。
            </p>
          </div>
        </div>
      </section>

      {/* 行业筛选 */}
      <section className="bg-neutral py-4 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto gap-2 no-scrollbar">
            {industryCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedIndustry(category.id)}
                className={`px-4 py-2 whitespace-nowrap rounded-full text-sm font-medium transition-colors ${selectedIndustry === category.id ? 'bg-primary text-white' : 'bg-white text-text-dark hover:bg-primary/10'}`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 案例列表 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="section-title mb-0">
              {selectedIndustry === 'all' ? '全部案例' : industryCategories.find(c => c.id === selectedIndustry)?.name}
            </h2>
            <p className="text-text-dark/70 mt-2">
              共 {filteredCases.length} 个案例
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCases.map((caseItem) => (
              <div 
                key={caseItem.id} 
                className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {/* 案例图片 */}
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={caseItem.image} 
                    alt={caseItem.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 left-4 bg-primary text-white text-sm font-medium px-3 py-1 rounded-full">
                    {industryCategories.find(c => c.id === caseItem.industry)?.name}
                  </div>
                </div>
                
                {/* 案例信息 */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-text-dark mb-3 group-hover:text-primary transition-colors">
                    {caseItem.title}
                  </h3>
                  <p className="text-text-dark/70 mb-6 text-sm">{caseItem.description}</p>
                  
                  {/* 项目信息标签 */}
                  <div className="flex flex-wrap gap-3 mb-6">
                    <div className="flex items-center text-text-dark/70 text-sm">
                      <MapPinIcon width={14} height={14} className="mr-1" />
                      {caseItem.location}
                    </div>
                    <div className="flex items-center text-text-dark/70 text-sm">
                      <CalendarIcon width={14} height={14} className="mr-1" />
                      {new Date(caseItem.date).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long' })}
                    </div>
                    <div className="flex items-center text-text-dark/70 text-sm">
                      <TrophyIcon width={14} height={14} className="mr-1" />
                      {caseItem.capacity}
                    </div>
                  </div>
                  
                  {/* 查看详情按钮 */}
                  <Link 
                    href={`/cases/${caseItem.id}`} 
                    className="inline-flex items-center text-primary font-medium hover:text-primary-dark transition-colors"
                  >
                    查看详情
                    <ChevronRightIcon width={16} height={16} className="ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 客户评价 */}
      <section className="py-20 bg-neutral">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center mb-16">客户评价</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial.id} 
                className="bg-white p-8 rounded-xl shadow-lg relative"
              >
                <div className="text-4xl text-primary/20 absolute top-6 left-6">
                  "
                </div>
                <p className="text-text-dark/80 mb-8 relative z-10 italic">
                  {testimonial.content}
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-text-dark">{testimonial.name}</h4>
                    <p className="text-text-dark/70 text-sm">
                      {testimonial.position}，{testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 项目成果统计 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title mb-4">项目成果统计</h2>
            <p className="text-text-dark/70 max-w-2xl mx-auto">
              我们的储能解决方案已为客户创造了显著的经济效益和环境效益
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="bg-neutral p-8 rounded-xl text-center">
              <div className="text-5xl font-bold text-primary mb-3">500+</div>
              <div className="text-text-dark font-medium">服务客户</div>
            </div>
            <div className="bg-neutral p-8 rounded-xl text-center">
              <div className="text-5xl font-bold text-primary mb-3">100MW+</div>
              <div className="text-text-dark font-medium">累计装机容量</div>
            </div>
            <div className="bg-neutral p-8 rounded-xl text-center">
              <div className="text-5xl font-bold text-primary mb-3">1.2亿</div>
              <div className="text-text-dark font-medium">年节省电费(元)</div>
            </div>
            <div className="bg-neutral p-8 rounded-xl text-center">
              <div className="text-5xl font-bold text-primary mb-3">6万吨</div>
              <div className="text-text-dark font-medium">年减少碳排放</div>
            </div>
          </div>
        </div>
      </section>

      {/* 申请案例参观 */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="md:w-2/3">
                <h2 className="text-3xl font-bold text-text-dark mb-4">申请案例参观</h2>
                <p className="text-text-dark/70 mb-6">
                  我们欢迎客户实地参观我们的成功案例，了解系统运行情况和实际效果。
                  填写申请，我们的客户经理将尽快与您联系。
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <UsersIcon width={18} height={18} className="text-primary mr-2" />
                    <span className="text-text-dark/80">专业工程师全程讲解</span>
                  </li>
                  <li className="flex items-center">
                    <CalendarIcon width={18} height={18} className="text-primary mr-2" />
                    <span className="text-text-dark/80">灵活安排参观时间</span>
                  </li>
                  <li className="flex items-center">
                    <MapPinIcon width={18} height={18} className="text-primary mr-2" />
                    <span className="text-text-dark/80">全国多个城市案例可选</span>
                  </li>
                </ul>
              </div>
              <div className="md:w-1/3 text-center">
                <a 
                  href="/contact" 
                  className="inline-flex items-center px-8 py-4 bg-primary text-white font-medium rounded-full hover:bg-primary-dark transition-colors"
                >
                  申请参观
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

export default CasesPage;