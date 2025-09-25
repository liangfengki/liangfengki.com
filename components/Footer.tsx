import React from 'react';
import Link from 'next/link';
import { EnvironmentOutlined, PhoneOutlined, MailOutlined, ClockCircleOutlined, WechatOutlined, SolutionOutlined, LinkedinOutlined, FacebookOutlined } from '@ant-design/icons';

interface FooterLink {
  title: string;
  links: { label: string; href: string }[];
}

export const Footer: React.FC = () => {
  // 页脚链接数据
  const footerLinks: FooterLink[] = [
    {
      title: '关于我们',
      links: [
        { label: '企业简介', href: '/about' },
        { label: '发展历程', href: '/about/history' },
        { label: '团队展示', href: '/about/team' },
        { label: '企业文化', href: '/about/culture' },
        { label: '荣誉资质', href: '/about/qualifications' },
      ],
    },
    {
      title: '产品与解决方案',
      links: [
        { label: '峰谷套利储能系统', href: '/solutions/peak-valley-arbitrage' },
        { label: '光伏储能一体化系统', href: '/solutions/solar-energy-storage' },
        { label: '备用电源系统', href: '/solutions/backup-power' },
        { label: '微电网系统', href: '/solutions/microgrid' },
        { label: '定制化解决方案', href: '/solutions/custom' },
      ],
    },
    {
      title: '案例展示',
      links: [
        { label: '制造业案例', href: '/cases/manufacturing' },
        { label: '商业综合体案例', href: '/cases/commercial' },
        { label: '数据中心案例', href: '/cases/data-center' },
        { label: '公共建筑案例', href: '/cases/public-building' },
        { label: '客户见证', href: '/cases/testimonials' },
      ],
    },
    {
      title: '新闻中心',
      links: [
        { label: '企业动态', href: '/news/company' },
        { label: '行业资讯', href: '/news/industry' },
        { label: '技术文章', href: '/news/technical' },
        { label: '活动预告', href: '/news/events' },
        { label: '招聘信息', href: '/news/careers' },
      ],
    },
  ];

  // 联系信息
  const contactInfo = {
    address: '北京市海淀区中关村科技园区8号楼',
    phone: '400-123-4567',
    email: 'info@zhongkehengyi.com',
    workingHours: '周一至周五 9:00-18:00',
  };

  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        {/* 主要内容 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* 企业信息和联系方式 */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-primary font-bold text-xl">
                中恒
              </div>
              <span className="font-display font-bold text-xl">
                中科恒一能源
              </span>
            </div>
            <p className="text-white/80 mb-6">
              专业提供工商业储能系统解决方案，助力企业降本增效，实现绿色可持续发展。
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <EnvironmentOutlined className="mt-1 text-white/80" />
                <span className="text-white/80">{contactInfo.address}</span>
              </div>
              <div className="flex items-center space-x-3">
                <PhoneOutlined className="text-white/80" />
                <span className="text-white/80">{contactInfo.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <MailOutlined className="text-white/80" />
                <span className="text-white/80">{contactInfo.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <ClockCircleOutlined className="text-white/80" />
                <span className="text-white/80">{contactInfo.workingHours}</span>
              </div>
            </div>
          </div>

          {/* 导航链接 */}
          {footerLinks.map((group, index) => (
            <div key={index}>
              <h3 className="font-display font-bold text-lg mb-4">{group.title}</h3>
              <ul className="space-y-2">
                {group.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      href={link.href} 
                      className="text-white/80 hover:text-white transition-colors inline-block py-1"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 社交媒体链接 */}
        <div className="border-t border-white/20 pt-8 pb-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-6 mb-4 md:mb-0">
              <a href="#" className="text-white/80 hover:text-white transition-colors">
                <WechatOutlined />
              </a>
              <a href="#" className="text-white/80 hover:text-white transition-colors">
                <SolutionOutlined />
              </a>
              <a href="#" className="text-white/80 hover:text-white transition-colors">
                <LinkedinOutlined />
              </a>
              <a href="#" className="text-white/80 hover:text-white transition-colors">
                <FacebookOutlined />
              </a>
            </div>
            <div className="text-white/60 text-sm">
              © 2023 中科恒一能源科技有限公司. 保留所有权利.
            </div>
          </div>
        </div>

        {/* 法律链接 */}
        <div className="border-t border-white/10 pt-6">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/60">
            <Link href="/privacy" className="hover:text-white transition-colors">隐私政策</Link>
            <Link href="/terms" className="hover:text-white transition-colors">使用条款</Link>
            <Link href="/sitemap" className="hover:text-white transition-colors">网站地图</Link>
            <Link href="/disclaimer" className="hover:text-white transition-colors">免责声明</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};