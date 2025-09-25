import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface CallToActionProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  backgroundImageUrl: string;
}

export const CallToAction: React.FC<CallToActionProps> = ({
  title,
  subtitle,
  ctaText,
  ctaLink,
  backgroundImageUrl,
}) => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* 背景图片 */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary-dark/80 z-10"></div>
        <Image
          src={backgroundImageUrl}
          alt="背景图片"
          fill
          className="object-cover w-full h-full"
          quality={90}
        />
      </div>
      
      {/* 内容 */}
      <div className="container mx-auto px-4 md:px-6 relative z-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            {title}
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-10">
            {subtitle}
          </p>
          <Link
            href={ctaLink}
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary font-bold rounded-full hover:bg-primary-light hover:text-white transition-colors duration-300 text-lg"
          >
            {ctaText}
          </Link>
        </div>
      </div>
    </section>
  );
};