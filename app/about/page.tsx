import React from 'react';
import { ChevronRightIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

// 发展历程数据
const historyData = [
  {
    year: '2015',
    event: '公司成立，专注于工商业储能系统研发',
  },
  {
    year: '2017',
    event: '完成A轮融资，扩大研发团队',
  },
  {
    year: '2019',
    event: '推出第一代峰谷套利储能系统，获得市场广泛认可',
  },
  {
    year: '2021',
    event: '累计装机容量突破50MW，服务客户超过200家',
  },
  {
    year: '2023',
    event: '完成C轮融资，推出新一代智能储能解决方案',
  },
];

// 团队成员数据
const teamMembers = [
  {
    name: '张明',
    position: '首席执行官',
    bio: '前国家电网高级工程师，拥有15年能源行业经验',
    image: '/images/team/ceo.jpg',
  },
  {
    name: '李华',
    position: '技术总监',
    bio: '清华大学博士，储能系统专家，曾主导多项国家级科研项目',
    image: '/images/team/cto.jpg',
  },
  {
    name: '王强',
    position: '产品总监',
    bio: '十年产品研发经验，专注于能源管理系统与智能电网技术',
    image: '/images/team/cpo.jpg',
  },
  {
    name: '赵静',
    position: '销售总监',
    bio: '能源行业资深销售专家，拥有丰富的客户资源和行业经验',
    image: '/images/team/cso.jpg',
  },
];

// 企业使命愿景价值观
const companyValues = [
  {
    title: '企业使命',
    description: '为工商业客户提供高效、可靠、智能的储能解决方案，助力能源转型和可持续发展',
    icon: '🎯',
  },
  {
    title: '企业愿景',
    description: '成为全球领先的工商业储能系统供应商，引领行业技术创新和标准制定',
    icon: '🚀',
  },
  {
    title: '核心价值观',
    description: '以客户为中心，以创新为动力，以质量为生命，以责任为担当',
    icon: '💡',
  },
];

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* 页面头部 */}
      <section className="relative h-80 bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-dark opacity-90"></div>
        <div className="absolute inset-0 bg-[url('/images/hero-about.jpg')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">关于我们</h1>
            <p className="text-lg opacity-90">
              中科恒一专注于工商业储能领域，致力于为客户提供全方位的储能解决方案，
              助力企业降低能源成本，提高能源利用效率，实现可持续发展。
            </p>
          </div>
        </div>
      </section>

      {/* 企业简介 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <h2 className="section-title mb-6">企业简介</h2>
              <p className="text-text-dark/80 mb-4 text-lg">
                中科恒一成立于2015年，是一家专注于工商业储能系统研发、生产、销售和服务的高新技术企业。
                公司拥有一支由能源专家、电力工程师、软件研发人员组成的专业团队，
                具备丰富的行业经验和技术积累。
              </p>
              <p className="text-text-dark/80 mb-6 text-lg">
                我们的产品涵盖峰谷套利储能系统、光伏储能一体化系统、备用电源系统、微电网系统等，
                广泛应用于制造业、商业综合体、数据中心、医院、学校等各类工商业场所。
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold mr-3">
                    500+
                  </div>
                  <div>成功案例</div>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold mr-3">
                    30+
                  </div>
                  <div>行业覆盖</div>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold mr-3">
                    100+
                  </div>
                  <div>技术专利</div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative">
                <img 
                  src="/images/company-profile.jpg" 
                  alt="公司办公环境" 
                  className="w-full h-auto rounded-xl shadow-lg"
                />
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg max-w-xs">
                  <div className="flex items-center mb-2">
                    <div className="text-2xl mr-2">🏆</div>
                    <h4 className="font-bold">国家级高新技术企业</h4>
                  </div>
                  <p className="text-sm text-text-dark/70">
                    2018年获得国家级高新技术企业认证，拥有多项核心技术专利
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 使命愿景价值观 */}
      <section className="py-20 bg-neutral">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center mb-16">企业使命与价值观</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {companyValues.map((value, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-2xl font-bold mb-4 text-text-dark">{value.title}</h3>
                <p className="text-text-dark/70">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 发展历程 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="section-title mb-16">发展历程</h2>
          <div className="relative">
            {/* 中间线 */}
            <div className="absolute left-0 md:left-1/2 h-full w-1 bg-primary/20 transform md:translate-x-[-0.5px]"></div>
            
            {/* 时间点 */}
            <div className="space-y-12">
              {historyData.map((item, index) => (
                <div 
                  key={index} 
                  className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8`}
                >
                  {/* 年份 */}
                  <div className="md:w-1/2 flex justify-start md:justify-end">
                    <div className={`md:w-3/4 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'} pr-0 md:pr-8`}>
                      <div className="inline-block px-4 py-2 bg-primary text-white rounded-lg font-bold text-lg">
                        {item.year}
                      </div>
                    </div>
                  </div>
                  
                  {/* 内容 */}
                  <div className="md:w-1/2 flex items-center">
                    <div className="md:w-3/4 pl-8">
                      <p className="text-lg text-text-dark">{item.event}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 团队展示 */}
      <section className="py-20 bg-neutral">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center mb-16">核心团队</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group"
              >
                <div className="h-64 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-text-dark mb-1">{member.name}</h3>
                  <p className="text-primary mb-3">{member.position}</p>
                  <p className="text-text-dark/70 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 加入我们 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-primary/5 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-text-dark mb-4">加入我们，共创未来</h2>
            <p className="text-text-dark/70 mb-8 max-w-2xl mx-auto">
              我们正在寻找充满激情、富有创新精神的人才加入我们的团队，共同推动工商业储能行业的发展。
            </p>
            <a 
              href="/careers" 
              className="inline-flex items-center px-6 py-3 bg-primary text-white font-medium rounded-full hover:bg-primary-dark transition-colors"
            >
              查看职位空缺
              <ArrowRightIcon width={18} height={18} className="ml-2" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;