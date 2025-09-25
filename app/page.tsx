import { Hero } from '@/components/Hero';
import { Introduction } from '@/components/Introduction';
import { Advantages } from '@/components/Advantages';
import { SolutionsPreview } from '@/components/SolutionsPreview';
import { CasesPreview } from '@/components/CasesPreview';
import { NewsPreview } from '@/components/NewsPreview';
import { CallToAction } from '@/components/CallToAction';

const HomePage = () => {
  return (
    <div className="w-full overflow-hidden">
      {/* 英雄区域 */}
      <Hero 
        title="专业工商业储能解决方案"
        subtitle="助力企业降本增效，实现绿色可持续发展"
        ctaText="了解更多"
        ctaLink="/solutions"
        secondaryCtaText="联系我们"
        secondaryCtaLink="/contact"
        imageUrl="https://images.unsplash.com/photo-1616356629036-f81846a924c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
      />

      {/* 企业简介 */}
      <Introduction 
        title="关于中科恒一"
        description="中科恒一能源科技有限公司是一家专注于工商业储能领域的高科技企业，致力于为客户提供从设计、制造到运维的全生命周期储能解决方案。"
        content="自成立以来，中科恒一始终坚持技术创新和品质至上的理念，凭借强大的研发团队和丰富的行业经验，已为众多工商业客户提供了高效、安全、可靠的储能系统，帮助客户降低用电成本，提高能源利用效率，实现绿色转型。"
        imageUrl="https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
      />

      {/* 核心优势 */}
      <Advantages 
        title="核心优势"
        advantages={[
          {
            icon: '🔬',
            title: '技术创新',
            description: '拥有多项储能核心技术专利，持续进行技术研发和产品迭代',
          },
          {
            icon: '⚡',
            title: '高效储能',
            description: '采用先进的锂电池技术，能量转换效率高达95%以上',
          },
          {
            icon: '🛡️',
            title: '安全可靠',
            description: '多重安全保护机制，7×24小时监控系统，确保系统稳定运行',
          },
          {
            icon: '💰',
            title: '经济实惠',
            description: '优化的系统设计，降低客户初始投资和运维成本，投资回报期短',
          },
          {
            icon: '🌱',
            title: '绿色环保',
            description: '减少碳排放，助力企业实现可持续发展目标',
          },
          {
            icon: '👨‍🔧',
            title: '专业服务',
            description: '从咨询、设计到安装、运维的全流程专业服务团队',
          },
        ]}
      />

      {/* 解决方案预览 */}
      <SolutionsPreview 
        title="工商业解决方案"
        solutions={[
          {
            title: '峰谷套利储能系统',
            description: '利用电价峰谷差价，降低企业用电成本',
            imageUrl: 'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            link: '/solutions/peak-valley-arbitrage',
          },
          {
            title: '光伏储能一体化系统',
            description: '太阳能发电与储能相结合，提高能源自给率',
            imageUrl: 'https://images.unsplash.com/photo-1631725057628-fc9fa3fb285d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            link: '/solutions/solar-energy-storage',
          },
          {
            title: '备用电源系统',
            description: '提供可靠的不间断电源，保障企业生产连续性',
            imageUrl: 'https://images.unsplash.com/photo-1590768548813-196f775558b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            link: '/solutions/backup-power',
          },
        ]}
      />

      {/* 案例展示预览 */}
      <CasesPreview 
        title="成功案例"
        cases={[
          {
            title: '某制造业工厂储能项目',
            description: '安装1000kWh储能系统，年节省电费30万元',
            imageUrl: 'https://images.unsplash.com/photo-1581090494758-09b7045f409a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            link: '/cases/manufacturing-plant',
          },
          {
            title: '商业综合体储能项目',
            description: '2000kWh储能系统，提供峰谷套利和备用电源功能',
            imageUrl: 'https://images.unsplash.com/photo-1504805572947-34fad45aed93?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            link: '/cases/commercial-complex',
          },
          {
            title: '数据中心储能项目',
            description: '5000kWh高可靠性储能系统，保障数据中心安全运行',
            imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            link: '/cases/data-center',
          },
        ]}
      />

      {/* 新闻预览 */}
      <NewsPreview 
        title="新闻中心"
        news={[
          {
            title: '中科恒一完成新一轮融资，加速工商业储能市场布局',
            date: '2023-10-15',
            summary: '本轮融资将主要用于技术研发、产能扩张和市场推广，进一步巩固公司在工商业储能领域的领先地位。',
            link: '/news/funding-round',
          },
          {
            title: '我司荣获"2023年度工商业储能解决方案提供商"大奖',
            date: '2023-09-28',
            summary: '奖项的获得是对公司技术实力和市场表现的高度认可，也是对全体员工努力付出的最好回报。',
            link: '/news/award',
          },
          {
            title: '中科恒一发布新一代工商业储能产品，效率提升15%',
            date: '2023-08-10',
            summary: '新产品采用先进的电池管理系统和优化的系统设计，在保持相同成本的情况下，效率提升15%。',
            link: '/news/new-product',
          },
        ]}
      />

      {/* 行动召唤 */}
      <CallToAction 
        title="开启您的能源转型之旅"
        subtitle="让中科恒一为您提供定制化的工商业储能解决方案"
        ctaText="立即咨询"
        ctaLink="/contact"
        backgroundImageUrl="https://images.unsplash.com/photo-1607890236349-5e000aa45689?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
      />
    </div>
  );
};

export default HomePage;