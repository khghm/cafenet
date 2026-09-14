import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Grid3X3, Clock, User, Shield, ChevronDown, Bell } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'خانه', icon: Home },
    { path: '/services', label: 'خدمات', icon: Grid3X3 },
    { path: '/tracking', label: 'پیگیری سفارش', icon: Clock },
    { path: '/dashboard', label: 'داشبورد', icon: User },
    { path: '/admin', label: 'پنل مدیریت', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-card shadow-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">ک</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-gray-800">کافی‌نت ابری</h1>
                <p className="text-[10px] text-gray-500 -mt-1">خدمات آنلاین ۲۴ ساعته</p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-primary-50 text-primary-700 shadow-sm'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                    }`}
                  >
                    <Icon size={16} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition">
                <Bell size={20} />
                <span className="absolute top-1 left-1 w-2 h-2 bg-rose-500 rounded-full"></span>
              </button>
              
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-lg hover:border-primary-300 transition"
                >
                  <div className="w-7 h-7 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center">
                    <User size={14} className="text-white" />
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-gray-700">علی محمدی</span>
                  <ChevronDown size={14} className="text-gray-400" />
                </button>
                
                {userMenuOpen && (
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                    <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">پروفایل من</Link>
                    <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">سفارش‌های من</Link>
                    <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">کیف پول</Link>
                    <hr className="my-1" />
                    <button className="block w-full text-right px-4 py-2 text-sm text-rose-600 hover:bg-rose-50">خروج</button>
                  </div>
                )}
              </div>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white/95 backdrop-blur-lg">
            <nav className="px-4 py-3 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium ${
                      isActive ? 'bg-primary-50 text-primary-700' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon size={18} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">ک</span>
                </div>
                <h3 className="text-white font-bold text-lg">کافی‌نت ابری</h3>
              </div>
              <p className="text-sm text-gray-400 leading-7">
                پلتفرم خدمات آنلاین کافی‌نتی — از هر نقطه‌ای، در هر ساعت، با بالاترین کیفیت و امنیت
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">خدمات پرطرفدار</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/services" className="hover:text-white transition">ثبت‌نام آزمون</Link></li>
                <li><Link to="/services" className="hover:text-white transition">خدمات ثنا</Link></li>
                <li><Link to="/services" className="hover:text-white transition">ترجمه رسمی</Link></li>
                <li><Link to="/services" className="hover:text-white transition">پرینت و اسکن</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">دسترسی سریع</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/tracking" className="hover:text-white transition">پیگیری سفارش</Link></li>
                <li><Link to="/dashboard" className="hover:text-white transition">داشبورد من</Link></li>
                <li><Link to="/services" className="hover:text-white transition">همه خدمات</Link></li>
                <li><a href="#" className="hover:text-white transition">تماس با ما</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">ارتباط با ما</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2"><i className="fas fa-phone text-primary-400"></i> ۰۲۱-۱۲۳۴۵۶۷۸</li>
                <li className="flex items-center gap-2"><i className="fas fa-envelope text-primary-400"></i> info@cloudcafenet.ir</li>
                <li className="flex items-center gap-2"><i className="fas fa-clock text-primary-400"></i> ۲۴ ساعته، ۷ روز هفته</li>
              </ul>
              <div className="flex gap-3 mt-4">
                <a href="#" className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition"><i className="fab fa-instagram text-sm"></i></a>
                <a href="#" className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition"><i className="fab fa-telegram text-sm"></i></a>
                <a href="#" className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition"><i className="fab fa-whatsapp text-sm"></i></a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm text-gray-500">
            <p>© ۱۴۰۳ کافی‌نت ابری — تمامی حقوق محفوظ است</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
