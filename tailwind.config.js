/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1e3a8a', // 深蓝色 - 主色调
        secondary: '#10b981', // 绿色 - 辅助色
        neutral: '#f8fafc', // 浅灰色 - 背景色
        'text-dark': '#1e293b', // 深灰色 - 文字色
        'primary-light': '#3b82f6',
        'primary-dark': '#1e3a8a',
        'secondary-light': '#34d399',
        'secondary-dark': '#059669',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
      },
      screens: {
        'mobile': '0px',
        'tablet': '769px',
        'desktop': '1025px',
      },
    },
  },
  plugins: [],
};