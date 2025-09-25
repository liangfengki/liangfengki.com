import './globals.css';
import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

// 配置Google Fonts
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  weight: ['400', '500', '600', '700', '800'],
});

// 配置网站元数据
const metadata: Metadata = {
  title: '中科恒一 - 工商业储能解决方案专家',
  description: '专业提供工商业储能系统、锂电池储能、光伏储能一体化解决方案，助力企业降本增效，实现绿色可持续发展。',
  keywords: '工商业储能,锂电池储能,光伏储能,储能系统,储能解决方案,能源管理,绿色能源',
  authors: [{ name: '中科恒一' }],
  viewport: 'width=device-width, initial-scale=1.0',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    title: '中科恒一 - 工商业储能解决方案专家',
    description: '专业提供工商业储能系统、锂电池储能、光伏储能一体化解决方案',
    siteName: '中科恒一',
    images: [
      {
        url: 'https://example.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '中科恒一工商业储能解决方案',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '中科恒一 - 工商业储能解决方案专家',
    description: '专业提供工商业储能系统、锂电池储能、光伏储能一体化解决方案',
    images: ['https://example.com/twitter-image.jpg'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" className={`${inter.variable} ${montserrat.variable} font-sans`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#1e3a8a" />
      </head>
      <body className="bg-neutral min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}