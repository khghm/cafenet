import { Link } from 'react-router-dom';
import { services, categories } from '../data/services';
import { getServiceIcon, getCategoryIcon } from '../components/Icons';
import { ArrowLeft, Shield, Clock, CreditCard, Search, Star, Zap, Users, CheckCircle, Grid3X3 } from 'lucide-react';

export default function Landing() {
  const popularServices = services.filter(s => s.popular);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-bl from-primary-600 via-primary-700 to-primary-900"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary-300 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6 border border-white/20">
                <Zap size={14} className="text-amber-300" />
                <span className="text-sm">پلتفرم شماره ۱ خدمات آنلاین کافی‌نتی</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-6">
                کافی‌نت در جیب شما!
                <br />
                <span className="text-primary-200">هر خدمت، هر جا، هر ساعت</span>
              </h1>
              <p className="text-lg text-primary-100 leading-8 mb-8 max-w-lg">
                بدون مراجعه حضوری، از هر نقطه‌ای از ایران، تمام خدمات کافی‌نتی را آنلاین سفارش دهید، 
                مدارک را بارگذاری کنید، پرداخت کنید و نتیجه را دیجیتال دریافت نمایید.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 bg-white text-primary-700 px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                >
                  مشاهده خدمات
                  <ArrowLeft size={18} />
                </Link>
                <Link
                  to="/tracking"
                  className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/30 px-6 py-3 rounded-xl font-medium backdrop-blur-sm hover:bg-white/20 transition-all"
                >
                  <Clock size={18} />
                  پیگیری سفارش
                </Link>
              </div>
              <div className="flex items-center gap-6 mt-8 text-sm text-primary-200">
                <span className="flex items-center gap-1"><CheckCircle size={16} className="text-emerald-400" /> بدون صف</span>
                <span className="flex items-center gap-1"><CheckCircle size={16} className="text-emerald-400" /> ۲۴ ساعته</span>
                <span className="flex items-center gap-1"><CheckCircle size={16} className="text-emerald-400" /> امن و مطمئن</span>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-primary-400/20 to-transparent rounded-3xl blur-2xl"></div>
                <div className="relative glass-card rounded-3xl p-6 shadow-2xl border border-white/30">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 rounded-full bg-rose-400"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                    <span className="text-xs text-gray-400 mr-auto">کافی‌نت ابری</span>
                  </div>
                  <div className="space-y-3">
                    {popularServices.slice(0, 3).map((s, i) => {
                      const Icon = getServiceIcon(s.iconId);
                      return (
                        <div key={s.id} className="flex items-center gap-3 p-3 bg-white/60 rounded-xl border border-white/40">
                          <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                            <Icon size={20} className="text-primary-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-gray-800">{s.title}</p>
                            <p className="text-xs text-gray-500">{s.price}</p>
                          </div>
                          <div className={`text-xs px-2 py-1 rounded-full ${i === 0 ? 'bg-emerald-100 text-emerald-700' : i === 1 ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>
                            {i === 0 ? 'تحویل شد' : i === 1 ? 'در حال بررسی' : 'در صف'}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    <div className="text-center p-2 bg-primary-50 rounded-lg">
                      <p className="text-lg font-bold text-primary-700">۱۲۳۴</p>
                      <p className="text-[10px] text-gray-500">سفارش امروز</p>
                    </div>
                    <div className="text-center p-2 bg-emerald-50 rounded-lg">
                      <p className="text-lg font-bold text-emerald-700">۹۸٪</p>
                      <p className="text-[10px] text-gray-500">رضایت</p>
                    </div>
                    <div className="text-center p-2 bg-amber-50 rounded-lg">
                      <p className="text-lg font-bold text-amber-700">۵ دقیقه</p>
                      <p className="text-[10px] text-gray-500">میانگین پاسخ</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: '+۵۰,۰۰۰', label: 'کاربر فعال', icon: Users },
              { value: '+۱۲۰', label: 'خدمت متنوع', icon: Grid3X3 },
              { value: '۲۴/۷', label: 'پشتیبانی', icon: Clock },
              { value: '۱۰۰٪', label: 'امنیت داده', icon: Shield },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-3 p-3">
                <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center">
                  <stat.icon size={20} className="text-primary-600" />
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-800">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">دسته‌بندی خدمات</h2>
          <p className="text-gray-500">هر آنچه از یک کافی‌نت نیاز دارید، اینجا موجود است</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((cat) => {
            const CatIcon = getCategoryIcon(cat.iconId);
            return (
              <Link
                key={cat.id}
                to="/services"
                className="group relative overflow-hidden bg-white rounded-2xl p-5 border border-gray-100 hover:border-primary-200 hover:shadow-lg transition-all duration-300"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-5 transition-opacity`}></div>
                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mb-3 group-hover:bg-primary-50 transition">
                  <CatIcon size={24} className="text-gray-600 group-hover:text-primary-600 transition" />
                </div>
                <h3 className="font-semibold text-gray-800 text-sm">{cat.title}</h3>
                <p className="text-xs text-gray-400 mt-1">
                  {services.filter(s => s.category === cat.id).length} خدمت
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Popular Services */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">خدمات پرطرفدار</h2>
            <p className="text-gray-500 text-sm mt-1">محبوب‌ترین خدمات بین کاربران</p>
          </div>
          <Link to="/services" className="flex items-center gap-1 text-primary-600 text-sm font-medium hover:text-primary-700">
            مشاهده همه
            <ArrowLeft size={14} />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {popularServices.map((service) => {
            const ServiceIcon = getServiceIcon(service.iconId);
            return (
              <Link
                key={service.id}
                to={`/order/${service.id}`}
                className="group bg-white rounded-2xl p-5 border border-gray-100 hover:border-primary-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center group-hover:bg-primary-100 transition">
                    <ServiceIcon size={24} className="text-primary-600" />
                  </div>
                  <Star size={16} className="text-amber-400 fill-amber-400" />
                </div>
                <h3 className="font-bold text-gray-800 mb-1 group-hover:text-primary-700 transition">{service.title}</h3>
                <p className="text-xs text-gray-500 leading-5 mb-3">{service.description}</p>
                <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                  <span className="text-sm font-bold text-primary-600">{service.price}</span>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Clock size={12} /> {service.duration}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">چطور کار می‌کند؟</h2>
            <p className="text-gray-500">در ۴ قدم ساده، خدمت مورد نظر خود را دریافت کنید</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '۱', title: 'انتخاب خدمت', desc: 'خدمت مورد نظر خود را از لیست انتخاب کنید', icon: Search, color: 'from-blue-400 to-blue-600' },
              { step: '۲', title: 'تکمیل فرم و بارگذاری', desc: 'اطلاعات و مدارک لازم را وارد کنید', icon: CreditCard, color: 'from-purple-400 to-purple-600' },
              { step: '۳', title: 'پرداخت امن', desc: 'هزینه را از طریق درگاه بانکی پرداخت کنید', icon: Shield, color: 'from-emerald-400 to-emerald-600' },
              { step: '۴', title: 'دریافت نتیجه', desc: 'نتیجه را به‌صورت دیجیتال دریافت کنید', icon: CheckCircle, color: 'from-amber-400 to-amber-600' },
            ].map((item, i) => (
              <div key={i} className="relative text-center">
                <div className={`w-16 h-16 mx-auto bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center shadow-lg mb-4`}>
                  <item.icon size={28} className="text-white" />
                </div>
                <div className="absolute top-6 -left-4 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-bold text-gray-600 hidden lg:flex">
                  {item.step}
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-6">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">چرا کافی‌نت ابری؟</h2>
          <p className="text-gray-500">ویژگی‌هایی که ما را متفاوت می‌کند</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: 'امنیت در سطح بانکی', desc: 'رمزنگاری پیشرفته، احراز هویت چندمرحله‌ای و محافظت کامل از اطلاعات شما', icon: Shield, color: 'bg-blue-50', iconColor: 'text-blue-600' },
            { title: 'سرعت بی‌نظیر', desc: 'پردازش فوری سفارش‌ها با سیستم هوشمند تخصیص و گردش‌کار خودکار', icon: Zap, color: 'bg-amber-50', iconColor: 'text-amber-600' },
            { title: 'پشتیبانی ۲۴/۷', desc: 'تیم پشتیبانی حرفه‌ای و دستیار هوشمند در تمام ساعات شبانه‌روز', icon: CreditCard, color: 'bg-emerald-50', iconColor: 'text-emerald-600' },
            { title: 'قیمت شفاف', desc: 'بدون هزینه پنهان، قیمت‌گذاری شفاف و فاکتور رسمی برای هر سفارش', icon: Star, color: 'bg-purple-50', iconColor: 'text-purple-600' },
            { title: 'ردیابی لحظه‌ای', desc: 'از لحظه ثبت تا تحویل، هر مرحله را به‌صورت زنده مشاهده کنید', icon: Search, color: 'bg-rose-50', iconColor: 'text-rose-600' },
            { title: 'تنوع خدمات', desc: 'بیش از ۱۲۰ خدمت متنوع در دسته‌بندی‌های مختلف، همه در یک پلتفرم', icon: Grid3X3, color: 'bg-cyan-50', iconColor: 'text-cyan-600' },
          ].map((feature, i) => (
            <div key={i} className={`${feature.color} rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all`}>
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-3 shadow-sm">
                <feature.icon size={24} className={feature.iconColor} />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600 leading-6">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="relative overflow-hidden bg-gradient-to-bl from-primary-600 to-primary-800 rounded-3xl p-8 sm:p-12 text-center text-white">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3"></div>
          <div className="relative">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">همین الان شروع کنید!</h2>
            <p className="text-primary-100 mb-8 max-w-lg mx-auto">
              ثبت‌نام رایگان است و کمتر از ۲ دقیقه طول می‌کشد. اولین سفارش خود را با ۲۰٪ تخفیف ثبت کنید.
            </p>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 bg-white text-primary-700 px-8 py-3.5 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              شروع رایگان
              <ArrowLeft size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
