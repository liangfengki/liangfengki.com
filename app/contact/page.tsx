'use client'
import React, { useState } from 'react';
import { EnvelopeIcon, PhoneIcon, MapPinIcon, ClockIcon, PaperAirplaneIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { FacebookOutlined, TwitterOutlined, LinkedinOutlined, InstagramOutlined } from '@ant-design/icons';

const ContactPage: React.FC = () => {
  // 表单状态管理
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    message: '',
    captcha: '',
  });
  
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // 表单验证
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      errors.name = '请输入您的姓名';
    }
    
    if (!formData.phone.trim()) {
      errors.phone = '请输入您的电话';
    } else if (!/^1[3-9]\d{9}$/.test(formData.phone.trim())) {
      errors.phone = '请输入正确的手机号码';
    }
    
    if (!formData.email.trim()) {
      errors.email = '请输入您的邮箱';
    } else if (!/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(formData.email.trim())) {
      errors.email = '请输入正确的邮箱地址';
    }
    
    if (!formData.company.trim()) {
      errors.company = '请输入您的公司名称';
    }
    
    if (!formData.message.trim()) {
      errors.message = '请输入您的需求描述';
    }
    
    if (!formData.captcha.trim()) {
      errors.captcha = '请输入验证码';
    } else if (formData.captcha.trim().toLowerCase() !== '8888') {
      errors.captcha = '验证码错误，请输入8888';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // 表单提交处理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // 模拟表单提交
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitSuccess(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        company: '',
        message: '',
        captcha: '',
      });
    } catch (error) {
      console.error('表单提交失败:', error);
      // 实际项目中应显示错误提示
    } finally {
      setIsSubmitting(false);
    }
  };

  // 输入变化处理
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // 清除对应字段的错误
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 页面头部 */}
      <section className="relative h-80 bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-dark opacity-90"></div>
        <div className="absolute inset-0 bg-[url('/images/hero-contact.jpg')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">联系我们</h1>
            <p className="text-lg opacity-90">
              如需了解更多关于工商业储能解决方案的信息，或者有任何疑问，欢迎随时联系我们。
              我们的专业团队将为您提供详细的咨询服务。
            </p>
          </div>
        </div>
      </section>

      {/* 联系方式和表单 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* 左侧：联系方式 */}
            <div className="lg:w-2/5">
              <h2 className="section-title mb-10">联系方式</h2>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4 flex-shrink-0">
                    <MapPinIcon width={24} height={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-text-dark mb-1">公司地址</h3>
                    <p className="text-text-dark/70">
                      北京市海淀区中关村科技园区8号楼15层
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4 flex-shrink-0">
                    <PhoneIcon width={24} height={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-text-dark mb-1">联系电话</h3>
                    <p className="text-text-dark/70">
                      400-888-9999<br />
                      010-8888-7777
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4 flex-shrink-0">
                    <EnvelopeIcon width={24} height={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-text-dark mb-1">电子邮箱</h3>
                    <p className="text-text-dark/70">
                      info@zhongkehengyi.com<br />
                      sales@zhongkehengyi.com
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4 flex-shrink-0">
                    <ClockIcon width={24} height={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-text-dark mb-1">工作时间</h3>
                    <p className="text-text-dark/70">
                      周一至周五: 9:00 - 18:00<br />
                      周六至周日: 休息
                    </p>
                  </div>
                </div>
              </div>
              
              {/* 社交媒体 */}
              <div className="mt-12">
                <h3 className="text-lg font-bold text-text-dark mb-4">关注我们</h3>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                    <FacebookOutlined />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                    <TwitterOutlined />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                    <LinkedinOutlined />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                    <InstagramOutlined />
                  </a>
                </div>
              </div>
              
              {/* 地图 */}
              <div className="mt-12 rounded-xl overflow-hidden shadow-lg h-80 bg-neutral">
                {/* 这里嵌入实际的地图，现在使用占位图 */}
                <img 
                  src="/images/map-placeholder.jpg" 
                  alt="公司位置地图" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* 右侧：联系表单 */}
            <div className="lg:w-3/5">
              <h2 className="section-title mb-10">咨询表单</h2>
              
              {submitSuccess ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                  <CheckCircleIcon width={64} height={64} className="text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-text-dark mb-2">表单提交成功！</h3>
                  <p className="text-text-dark/70 mb-6">
                    感谢您的咨询，我们的客户经理将在1-2个工作日内与您联系。
                  </p>
                  <button 
                    onClick={() => setSubmitSuccess(false)} 
                    className="px-6 py-3 bg-primary text-white font-medium rounded-full hover:bg-primary-dark transition-colors"
                  >
                    返回表单
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* 姓名 */}
                    <div>
                      <label htmlFor="name" className="block text-text-dark font-medium mb-2">
                        姓名 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border ${formErrors.name ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors`}
                        placeholder="请输入您的姓名"
                      />
                      {formErrors.name && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                      )}
                    </div>
                    
                    {/* 电话 */}
                    <div>
                      <label htmlFor="phone" className="block text-text-dark font-medium mb-2">
                        电话 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border ${formErrors.phone ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors`}
                        placeholder="请输入您的手机号码"
                      />
                      {formErrors.phone && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* 邮箱 */}
                    <div>
                      <label htmlFor="email" className="block text-text-dark font-medium mb-2">
                        邮箱 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border ${formErrors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors`}
                        placeholder="请输入您的邮箱地址"
                      />
                      {formErrors.email && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                      )}
                    </div>
                    
                    {/* 公司 */}
                    <div>
                      <label htmlFor="company" className="block text-text-dark font-medium mb-2">
                        公司名称 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border ${formErrors.company ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors`}
                        placeholder="请输入您的公司名称"
                      />
                      {formErrors.company && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.company}</p>
                      )}
                    </div>
                  </div>
                  
                  {/* 需求描述 */}
                  <div>
                    <label htmlFor="message" className="block text-text-dark font-medium mb-2">
                      需求描述 <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className={`w-full px-4 py-3 rounded-lg border ${formErrors.message ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors resize-none`}
                      placeholder="请详细描述您的需求，以便我们更好地为您提供服务"
                    ></textarea>
                    {formErrors.message && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.message}</p>
                    )}
                  </div>
                  
                  {/* 验证码 */}
                  <div>
                    <label htmlFor="captcha" className="block text-text-dark font-medium mb-2">
                      验证码 <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-4">
                      <input
                        type="text"
                        id="captcha"
                        name="captcha"
                        value={formData.captcha}
                        onChange={handleChange}
                        className={`flex-1 px-4 py-3 rounded-lg border ${formErrors.captcha ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors`}
                        placeholder="请输入验证码：8888"
                      />
                      <div className="w-32 h-12 bg-gray-100 rounded-lg flex items-center justify-center font-mono text-xl font-bold text-primary">
                        8888
                      </div>
                    </div>
                    {formErrors.captcha && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.captcha}</p>
                    )}
                  </div>
                  
                  {/* 提交按钮 */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        提交中...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        提交咨询
                        <PaperAirplaneIcon width={18} height={18} className="ml-2" />
                      </span>
                    )}
                  </button>
                  
                  {/* 隐私政策提示 */}
                  <p className="text-text-dark/60 text-sm text-center">
                    提交即表示您同意我们的<a href="#" className="text-primary hover:underline">隐私政策</a>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 常见问题 */}
      <section className="py-20 bg-neutral">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center mb-16">常见问题</h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold text-text-dark mb-3">工商业储能系统的投资回报率如何？</h3>
              <p className="text-text-dark/70">
                工商业储能系统的投资回报率通常在3-5年左右，具体取决于当地峰谷电价差、系统容量、使用频率等因素。
                我们会根据客户的实际情况，提供详细的投资回报分析。
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold text-text-dark mb-3">储能系统的使用寿命是多久？</h3>
              <p className="text-text-dark/70">
                我们的锂电池储能系统设计使用寿命为10年以上，循环次数可达6000次以上。
                通过智能电池管理系统(BMS)的优化，可有效延长电池使用寿命。
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold text-text-dark mb-3">安装储能系统需要多长时间？</h3>
              <p className="text-text-dark/70">
                标准的工商业储能系统安装周期通常为2-4周，具体时间取决于系统规模、现场条件等因素。
                我们会提供详细的安装计划，并确保按时完成。
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold text-text-dark mb-3">储能系统如何保证安全运行？</h3>
              <p className="text-text-dark/70">
                我们的储能系统采用多重安全保护机制，包括过充保护、过放保护、过温保护、短路保护等。
                同时，系统配备远程监控功能，可实时监测系统运行状态，及时发现并处理潜在问题。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 地区销售网络 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center mb-16">地区销售网络</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-neutral p-6 rounded-xl text-center">
              <h3 className="text-xl font-bold text-text-dark mb-4">华东区</h3>
              <p className="text-text-dark/70 mb-4">
                上海市浦东新区张江高科技园区<br />
                电话：021-8888-6666
              </p>
              <div className="text-primary font-medium">
                负责：上海、江苏、浙江、安徽、福建、江西、山东
              </div>
            </div>
            
            <div className="bg-neutral p-6 rounded-xl text-center">
              <h3 className="text-xl font-bold text-text-dark mb-4">华北区</h3>
              <p className="text-text-dark/70 mb-4">
                北京市海淀区中关村科技园区<br />
                电话：010-8888-7777
              </p>
              <div className="text-primary font-medium">
                负责：北京、天津、河北、山西、内蒙古
              </div>
            </div>
            
            <div className="bg-neutral p-6 rounded-xl text-center">
              <h3 className="text-xl font-bold text-text-dark mb-4">华南区</h3>
              <p className="text-text-dark/70 mb-4">
                广州市天河区高新技术产业开发区<br />
                电话：020-8888-5555
              </p>
              <div className="text-primary font-medium">
                负责：广东、广西、海南
              </div>
            </div>
            
            <div className="bg-neutral p-6 rounded-xl text-center">
              <h3 className="text-xl font-bold text-text-dark mb-4">西南区</h3>
              <p className="text-text-dark/70 mb-4">
                成都市高新区天府大道<br />
                电话：028-8888-4444
              </p>
              <div className="text-primary font-medium">
                负责：重庆、四川、贵州、云南、西藏
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;