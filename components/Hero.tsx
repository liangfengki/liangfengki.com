import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface HeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  imageUrl: string;
}

export const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  ctaText,
  ctaLink,
  secondaryCtaText,
  secondaryCtaLink,
  imageUrl,
}) => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* 背景图片 */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <img
          src={imageUrl}
          alt="工商业储能解决方案"
          className="object-cover w-full h-full"
        />
      </div>

      {/* 内容 */}
      <div className="relative z-20 h-full flex items-center">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            {/* 动画类 */}
            <div className="animate-fade-in-up">
              <h1 className="text-[clamp(2.5rem,6vw,4rem)] font-bold text-white mb-6 leading-tight text-shadow">
                {title}
              </h1>
              <p className="text-[clamp(1.1rem,2vw,1.5rem)] text-white/90 mb-10 max-w-2xl">
                {subtitle}
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link href={ctaLink} className="btn-primary">
                  {ctaText}
                </Link>
                
                {secondaryCtaText && secondaryCtaLink && (
                  <Link href={secondaryCtaLink} className="btn-secondary">
                    {secondaryCtaText}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 向下滚动提示 */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 text-white animate-bounce">
        <div className="flex flex-col items-center">
          <span className="text-sm mb-2">向下滚动了解更多</span>
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M12 5V19M12 19L5 12M12 19L19 12" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* 装饰元素 */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-neutral to-transparent z-10"></div>
    </section>
  );
};