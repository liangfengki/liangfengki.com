'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { MenuOutlined, CloseOutlined, DownOutlined } from '@ant-design/icons';

interface NavItem {
  id: string;
  label: string;
  href: string;
  children?: NavItem[];
}

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState('/');
  const [expandedSubmenu, setExpandedSubmenu] = useState<string | null>(null);

  // 监听滚动事件，改变导航栏样式
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 获取当前路径
  useEffect(() => {
    setCurrentPath(window.location.pathname);
    
    const handleRouteChange = () => {
      setCurrentPath(window.location.pathname);
      setMobileMenuOpen(false);
      setExpandedSubmenu(null);
    };

    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  // 导航菜单数据
  const navItems: NavItem[] = [
    { id: 'home', label: '首页', href: '/' },
    { id: 'about', label: '关于我们', href: '/about' },
    {
      id: 'solutions',
      label: '产品与解决方案',
      href: '/solutions',
      children: [
        { id: 'peak-valley', label: '峰谷套利储能系统', href: '/solutions/peak-valley-arbitrage' },
        { id: 'solar-energy', label: '光伏储能一体化系统', href: '/solutions/solar-energy-storage' },
        { id: 'backup-power', label: '备用电源系统', href: '/solutions/backup-power' },
        { id: 'microgrid', label: '微电网系统', href: '/solutions/microgrid' },
      ],
    },
    {
      id: 'cases',
      label: '案例展示',
      href: '/cases',
      children: [
        { id: 'manufacturing', label: '制造业案例', href: '/cases/manufacturing' },
        { id: 'commercial', label: '商业综合体案例', href: '/cases/commercial' },
        { id: 'data-center', label: '数据中心案例', href: '/cases/data-center' },
        { id: 'public-building', label: '公共建筑案例', href: '/cases/public-building' },
      ],
    },
    {
      id: 'news',
      label: '新闻中心',
      href: '/news',
      children: [
        { id: 'company-news', label: '企业动态', href: '/news/company' },
        { id: 'industry-news', label: '行业资讯', href: '/news/industry' },
        { id: 'technical-articles', label: '技术文章', href: '/news/technical' },
      ],
    },
    { id: 'contact', label: '联系我们', href: '/contact' },
  ];

  // 切换子菜单展开状态
  const toggleSubmenu = (id: string) => {
    if (expandedSubmenu === id) {
      setExpandedSubmenu(null);
    } else {
      setExpandedSubmenu(id);
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${ 
        isScrolled 
          ? 'bg-white shadow-md py-3' 
          : 'bg-transparent py-5' 
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-xl">
              中恒
            </div>
            <span className={`font-display font-bold text-xl ${isScrolled ? 'text-primary' : 'text-white'}`}>
              中科恒一能源
            </span>
          </Link>

          {/* 桌面端导航 */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <div key={item.id} className="relative">
                {item.children ? (
                  <button
                    className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${ 
                      currentPath.startsWith(item.href) 
                        ? (isScrolled ? 'text-primary' : 'text-white') 
                        : (isScrolled ? 'text-text-dark hover:text-primary' : 'text-white/80 hover:text-white') 
                    }`}
                    onClick={() => toggleSubmenu(item.id)}
                  >
                    <span>{item.label}</span>
                    <DownOutlined 
                      className={`transition-transform duration-200 ${expandedSubmenu === item.id ? 'transform rotate-180' : ''}`} 
                    />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${ 
                      currentPath === item.href 
                        ? (isScrolled ? 'text-primary' : 'text-white') 
                        : (isScrolled ? 'text-text-dark hover:text-primary' : 'text-white/80 hover:text-white') 
                    }`}
                  >
                    {item.label}
                  </Link>
                )}

                {/* 子菜单 */}
                {item.children && expandedSubmenu === item.id && (
                  <div className="absolute top-full left-0 mt-1 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 z-50">
                    {item.children.map((child) => (
                      <Link
                        key={child.id}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-text-dark hover:bg-neutral hover:text-primary transition-colors"
                        onClick={() => setExpandedSubmenu(null)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* 联系按钮 */}
            <Link href="/contact" className="ml-4">
              <button className="btn-primary text-sm px-5 py-2">
                立即咨询
              </button>
            </Link>
          </nav>

          {/* 移动端菜单按钮 */}
          <button
            className={`p-2 rounded-md lg:hidden ${ 
              isScrolled ? 'text-text-dark' : 'text-white' 
            }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="菜单"
          >
            {mobileMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
          </button>
        </div>
      </div>

      {/* 移动端菜单 */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white shadow-lg absolute top-full left-0 right-0 z-50">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <div key={item.id} className="mobile-nav-item">
                {item.children ? (
                  <div className="border-b border-gray-100">
                    <button
                      className={`flex items-center justify-between w-full px-3 py-3 text-base font-medium text-text-dark hover:bg-neutral transition-colors`}
                      onClick={() => toggleSubmenu(item.id)}
                    >
                      <span>{item.label}</span>
                      <DownOutlined 
                        className={`transition-transform duration-200 ${expandedSubmenu === item.id ? 'transform rotate-180' : ''}`} 
                      />
                    </button>
                    {item.children && expandedSubmenu === item.id && (
                      <div className="pl-4 border-l-2 border-primary space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.id}
                            href={child.href}
                            className="block px-3 py-2 text-sm text-text-dark hover:bg-neutral hover:text-primary transition-colors"
                            onClick={() => {
                              setExpandedSubmenu(null);
                              setMobileMenuOpen(false);
                            }}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`block px-3 py-3 text-base font-medium text-text-dark hover:bg-neutral hover:text-primary transition-colors ${ 
                      currentPath === item.href ? 'bg-neutral text-primary' : '' 
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-100">
            <div className="flex items-center justify-center px-5">
              <Link href="/contact" className="w-full">
                <button className="btn-primary w-full">
                  立即咨询
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};