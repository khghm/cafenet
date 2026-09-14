import { useState } from 'react';
import { services, sampleOrders } from '../data/services';
import {
  LayoutDashboard, Users, FileText, CreditCard, Settings, BarChart3,
  Bell, Search, Plus, Filter, MoreVertical, TrendingUp, TrendingDown,
  Clock, CheckCircle, AlertCircle, XCircle, Loader, Eye, Edit, Trash2,
  ArrowUpRight, ArrowDownRight, Shield, Globe, MessageCircle
} from 'lucide-react';

export default function AdminPanel() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sections = [
    { id: 'dashboard', label: 'داشبورد', icon: LayoutDashboard },
    { id: 'orders', label: 'سفارش‌ها', icon: FileText },
    { id: 'users', label: 'کاربران', icon: Users },
    { id: 'services', label: 'مدیریت خدمات', icon: Globe },
    { id: 'finance', label: 'مالی', icon: CreditCard },
    { id: 'support', label: 'پشتیبانی', icon: MessageCircle },
    { id: 'analytics', label: 'تحلیل و گزارش', icon: BarChart3 },
    { id: 'settings', label: 'تنظیمات', icon: Settings },
  ];

  return (
    <div className="flex min-h-[calc(100vh-64px)]">
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 right-0 z-40 w-64 bg-white border-l border-gray-100 shadow-lg lg:shadow-none transform transition-transform ${
        sidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
      }`}>
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-800 flex items-center gap-2">
            <Shield size={20} className="text-primary-600" />
            پنل مدیریت
          </h2>
          <p className="text-xs text-gray-500 mt-1">مرکز فرماندهی کافی‌نت ابری</p>
        </div>
        <nav className="p-3 space-y-1">
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => { setActiveSection(section.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                activeSection === section.id
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <section.icon size={18} />
              {section.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/20 z-30 lg:hidden" onClick={() => setSidebarOpen(false)}></div>
      )}

      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-6 overflow-x-hidden">
        {/* Mobile Toggle */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden mb-4 px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700"
        >
          ☰ منوی مدیریت
        </button>

        {/* Dashboard */}
        {activeSection === 'dashboard' && <DashboardView />}
        {activeSection === 'orders' && <OrdersView />}
        {activeSection === 'users' && <UsersView />}
        {activeSection === 'services' && <ServicesManageView />}
        {activeSection === 'finance' && <FinanceView />}
        {activeSection === 'support' && <SupportView />}
        {activeSection === 'analytics' && <AnalyticsView />}
        {activeSection === 'settings' && <SettingsView />}
      </div>
    </div>
  );
}

function DashboardView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800">داشبورد تحلیلی</h2>
          <p className="text-sm text-gray-500">نمای کلی عملکرد سیستم</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            سیستم فعال
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'درآمد امروز', value: '۱۲,۵۰۰,۰۰۰', unit: 'تومان', change: '+۱۲٪', up: true, icon: TrendingUp, color: 'from-emerald-400 to-emerald-600' },
          { label: 'سفارش‌های جدید', value: '۴۸', unit: 'امروز', change: '+۸٪', up: true, icon: FileText, color: 'from-blue-400 to-blue-600' },
          { label: 'کاربران فعال', value: '۱,۲۳۴', unit: 'آنلاین', change: '+۵٪', up: true, icon: Users, color: 'from-purple-400 to-purple-600' },
          { label: 'نرخ تبدیل', value: '۷۸٪', unit: '', change: '-۲٪', up: false, icon: BarChart3, color: 'from-amber-400 to-amber-600' },
        ].map((kpi, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 bg-gradient-to-br ${kpi.color} rounded-xl flex items-center justify-center`}>
                <kpi.icon size={18} className="text-white" />
              </div>
              <span className={`flex items-center gap-0.5 text-xs font-medium ${kpi.up ? 'text-emerald-600' : 'text-rose-600'}`}>
                {kpi.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {kpi.change}
              </span>
            </div>
            <p className="text-xl font-bold text-gray-800">{kpi.value}</p>
            <p className="text-xs text-gray-500">{kpi.label} <span className="text-gray-400">{kpi.unit}</span></p>
          </div>
        ))}
      </div>

      {/* Charts Area */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Revenue Chart Placeholder */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4">نمودار درآمد هفتگی</h3>
          <div className="flex items-end gap-2 h-40">
            {[65, 45, 80, 55, 90, 70, 85].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full bg-gradient-to-t from-primary-500 to-primary-400 rounded-t-lg transition-all hover:from-primary-600 hover:to-primary-500"
                  style={{ height: `${h}%` }}
                ></div>
                <span className="text-[10px] text-gray-400">
                  {['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Service Distribution */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4">توزیع سفارش‌ها</h3>
          <div className="space-y-3">
            {[
              { name: 'خدمات دولتی', count: 35, color: 'bg-blue-500' },
              { name: 'آموزشی', count: 25, color: 'bg-purple-500' },
              { name: 'مالی', count: 20, color: 'bg-emerald-500' },
              { name: 'چاپ و نشر', count: 12, color: 'bg-amber-500' },
              { name: 'سایر', count: 8, color: 'bg-gray-400' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                <span className="text-sm text-gray-700 flex-1">{item.name}</span>
                <span className="text-sm font-bold text-gray-800">{item.count}٪</span>
                <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.count}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-bold text-gray-800">سفارش‌های اخیر</h3>
          <button className="text-xs text-primary-600 font-medium">مشاهده همه</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-right px-4 py-3 font-medium text-gray-600">کد رهگیری</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">خدمت</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">کاربر</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">وضعیت</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">مبلغ</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {sampleOrders.map(order => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-xs text-primary-700">{order.trackingCode}</td>
                  <td className="px-4 py-3 text-gray-800">{order.serviceTitle}</td>
                  <td className="px-4 py-3 text-gray-600">علی محمدی</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${
                      order.status === 'completed' ? 'bg-emerald-50 text-emerald-700' :
                      order.status === 'processing' ? 'bg-blue-50 text-blue-700' :
                      order.status === 'review' ? 'bg-purple-50 text-purple-700' :
                      'bg-amber-50 text-amber-700'
                    }`}>
                      {order.status === 'completed' ? 'تکمیل' : order.status === 'processing' ? 'در حال انجام' : order.status === 'review' ? 'بررسی' : 'در انتظار'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-800">{order.price}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button className="p-1 hover:bg-gray-100 rounded"><Eye size={14} className="text-gray-500" /></button>
                      <button className="p-1 hover:bg-gray-100 rounded"><Edit size={14} className="text-gray-500" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Alerts */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle size={16} className="text-amber-600" />
            <span className="font-medium text-amber-800 text-sm">هشدارهای سیستم</span>
          </div>
          <ul className="text-xs text-amber-700 space-y-1">
            <li>• ۳ سفارش بیش از SLA منتظر هستند</li>
            <li>• فضای ذخیره‌سازی به ۸۰٪ رسیده</li>
          </ul>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Bell size={16} className="text-blue-600" />
            <span className="font-medium text-blue-800 text-sm">اعلان‌های مهم</span>
          </div>
          <ul className="text-xs text-blue-700 space-y-1">
            <li>• ۱۲ تیکت جدید در صف پشتیبانی</li>
            <li>• بروزرسانی سیستم ساعت ۲ بامداد</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function OrdersView() {
  const [filterStatus, setFilterStatus] = useState('all');
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <h2 className="text-xl font-bold text-gray-800">مدیریت سفارش‌ها</h2>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search size={16} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="جستجو..." className="pr-8 pl-3 py-2 bg-white border border-gray-200 rounded-lg text-sm w-48 focus:outline-none focus:border-primary-400" />
          </div>
          <select className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary-400">
            <option>همه وضعیت‌ها</option>
            <option>در انتظار</option>
            <option>در حال انجام</option>
            <option>تکمیل شده</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-right px-4 py-3 font-medium text-gray-600">کد رهگیری</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">خدمت</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">کاربر</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">وضعیت</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">اولویت</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">اپراتور</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">تاریخ</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {[...sampleOrders, ...sampleOrders].map((order, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-xs text-primary-700">{order.trackingCode}</td>
                  <td className="px-4 py-3 text-gray-800">{order.serviceTitle}</td>
                  <td className="px-4 py-3 text-gray-600">علی محمدی</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${
                      order.status === 'completed' ? 'bg-emerald-50 text-emerald-700' :
                      order.status === 'processing' ? 'bg-blue-50 text-blue-700' :
                      order.status === 'review' ? 'bg-purple-50 text-purple-700' :
                      'bg-amber-50 text-amber-700'
                    }`}>
                      {order.status === 'completed' ? 'تکمیل' : order.status === 'processing' ? 'در حال انجام' : order.status === 'review' ? 'بررسی' : 'در انتظار'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      i % 3 === 0 ? 'bg-rose-50 text-rose-700' : i % 3 === 1 ? 'bg-amber-50 text-amber-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {i % 3 === 0 ? 'بالا' : i % 3 === 1 ? 'متوسط' : 'عادی'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600 text-xs">{i % 2 === 0 ? 'اپراتور ۱' : 'تخصیص نیافته'}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{order.date}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 hover:bg-blue-50 rounded-lg"><Eye size={14} className="text-blue-600" /></button>
                      <button className="p-1.5 hover:bg-amber-50 rounded-lg"><Edit size={14} className="text-amber-600" /></button>
                      <button className="p-1.5 hover:bg-gray-100 rounded-lg"><MoreVertical size={14} className="text-gray-500" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-gray-100 flex items-center justify-between">
          <span className="text-xs text-gray-500">نمایش ۱ تا ۸ از ۴۸ سفارش</span>
          <div className="flex gap-1">
            <button className="px-3 py-1 bg-primary-600 text-white rounded-lg text-xs">۱</button>
            <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs hover:bg-gray-200">۲</button>
            <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs hover:bg-gray-200">۳</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function UsersView() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">مدیریت کاربران</h2>
        <button className="flex items-center gap-1.5 px-4 py-2 bg-primary-600 text-white rounded-xl text-sm font-medium hover:bg-primary-700 transition">
          <Plus size={16} />
          کاربر جدید
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'کل کاربران', value: '۵۲,۳۴۰', color: 'text-blue-600 bg-blue-50' },
          { label: 'فعال امروز', value: '۱,۲۳۴', color: 'text-emerald-600 bg-emerald-50' },
          { label: 'اپراتورها', value: '۲۸', color: 'text-purple-600 bg-purple-50' },
          { label: 'مدیران', value: '۵', color: 'text-amber-600 bg-amber-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-100 p-4">
            <p className={`text-lg font-bold ${stat.color.split(' ')[0]}`}>{stat.value}</p>
            <p className="text-xs text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="جستجوی کاربر..." className="w-full pr-8 pl-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary-400" />
          </div>
          <select className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm">
            <option>همه نقش‌ها</option>
            <option>کاربر عادی</option>
            <option>اپراتور</option>
            <option>مدیر</option>
          </select>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-right px-4 py-3 font-medium text-gray-600">کاربر</th>
              <th className="text-right px-4 py-3 font-medium text-gray-600">موبایل</th>
              <th className="text-right px-4 py-3 font-medium text-gray-600">نقش</th>
              <th className="text-right px-4 py-3 font-medium text-gray-600">وضعیت</th>
              <th className="text-right px-4 py-3 font-medium text-gray-600">تاریخ عضویت</th>
              <th className="text-right px-4 py-3 font-medium text-gray-600">عملیات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {[
              { name: 'علی محمدی', phone: '۰۹۱۲۳۴۵۶۷۸۹', role: 'کاربر', status: 'فعال', date: '۱۴۰۳/۰۷/۰۱' },
              { name: 'فاطمه احمدی', phone: '۰۹۱۳۴۵۶۷۸۹۰', role: 'اپراتور', status: 'فعال', date: '۱۴۰۳/۰۶/۱۵' },
              { name: 'محمد رضایی', phone: '۰۹۱۴۵۶۷۸۹۰۱', role: 'مدیر', status: 'فعال', date: '۱۴۰۳/۰۵/۲۰' },
              { name: 'زهرا کریمی', phone: '۰۹۱۵۶۷۸۹۰۱۲', role: 'کاربر', status: 'غیرفعال', date: '۱۴۰۳/۰۸/۱۰' },
              { name: 'حسین نوری', phone: '۰۹۱۶۷۸۹۰۱۲۳', role: 'اپراتور', status: 'فعال', date: '۱۴۰۳/۰۴/۰۵' },
            ].map((user, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-primary-700">{user.name[0]}</span>
                    </div>
                    <span className="font-medium text-gray-800">{user.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-600 text-xs font-mono">{user.phone}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    user.role === 'مدیر' ? 'bg-amber-50 text-amber-700' :
                    user.role === 'اپراتور' ? 'bg-purple-50 text-purple-700' :
                    'bg-gray-100 text-gray-600'
                  }`}>{user.role}</span>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    user.status === 'فعال' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                  }`}>{user.status}</span>
                </td>
                <td className="px-4 py-3 text-gray-500 text-xs">{user.date}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button className="p-1.5 hover:bg-blue-50 rounded-lg"><Eye size={14} className="text-blue-600" /></button>
                    <button className="p-1.5 hover:bg-amber-50 rounded-lg"><Edit size={14} className="text-amber-600" /></button>
                    <button className="p-1.5 hover:bg-rose-50 rounded-lg"><Trash2 size={14} className="text-rose-600" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ServicesManageView() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">مدیریت خدمات</h2>
        <button className="flex items-center gap-1.5 px-4 py-2 bg-primary-600 text-white rounded-xl text-sm font-medium hover:bg-primary-700 transition">
          <Plus size={16} />
          خدمت جدید
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.slice(0, 6).map(service => (
          <div key={service.id} className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition">
            <div className="flex items-start justify-between mb-3">
              <span className="text-2xl">{service.icon}</span>
              <div className="flex gap-1">
                <button className="p-1 hover:bg-gray-100 rounded"><Edit size={12} className="text-gray-500" /></button>
                <button className="p-1 hover:bg-gray-100 rounded"><Trash2 size={12} className="text-gray-500" /></button>
              </div>
            </div>
            <h4 className="font-bold text-gray-800 text-sm mb-1">{service.title}</h4>
            <p className="text-xs text-gray-500 mb-3">{service.description}</p>
            <div className="flex items-center justify-between pt-2 border-t border-gray-50">
              <span className="text-xs font-bold text-primary-600">{service.price}</span>
              <span className="flex items-center gap-1 text-xs text-gray-400">
                <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                فعال
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FinanceView() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-800">مدیریت مالی</h2>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'درآمد ماه', value: '۳۸۵,۰۰۰,۰۰۰', unit: 'تومان', color: 'text-emerald-600' },
          { label: 'تسویه pending', value: '۴۵,۰۰۰,۰۰۰', unit: 'تومان', color: 'text-amber-600' },
          { label: 'بازگشت وجه', value: '۲,۵۰۰,۰۰۰', unit: 'تومان', color: 'text-rose-600' },
          { label: 'کمیسیون اپراتورها', value: '۳۸,۵۰۰,۰۰۰', unit: 'تومان', color: 'text-purple-600' },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-100 p-4">
            <p className={`text-lg font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-bold text-gray-800">آخرین تراکنش‌ها</h3>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-right px-4 py-3 font-medium text-gray-600">شناسه</th>
              <th className="text-right px-4 py-3 font-medium text-gray-600">شرح</th>
              <th className="text-right px-4 py-3 font-medium text-gray-600">نوع</th>
              <th className="text-right px-4 py-3 font-medium text-gray-600">مبلغ</th>
              <th className="text-right px-4 py-3 font-medium text-gray-600">وضعیت</th>
              <th className="text-right px-4 py-3 font-medium text-gray-600">تاریخ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {[
              { id: 'TXN-001', desc: 'پرداخت سفارش KNT-1403-001234', type: 'دریافتی', amount: '۵۰,۰۰۰', status: 'موفق', date: '۱۴۰۳/۰۹/۲۲' },
              { id: 'TXN-002', desc: 'تسویه اپراتور ۱', type: 'پرداختی', amount: '۱,۲۰۰,۰۰۰', status: 'در انتظار', date: '۱۴۰۳/۰۹/۲۱' },
              { id: 'TXN-003', desc: 'شارژ کیف پول - علی محمدی', type: 'دریافتی', amount: '۳۰۰,۰۰۰', status: 'موفق', date: '۱۴۰۳/۰۹/۲۰' },
              { id: 'TXN-004', desc: 'بازگشت وجه سفارش لغو شده', type: 'بازگشت', amount: '۴۵,۰۰۰', status: 'موفق', date: '۱۴۰۳/۰۹/۱۹' },
            ].map((tx, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-mono text-xs text-primary-700">{tx.id}</td>
                <td className="px-4 py-3 text-gray-800 text-xs">{tx.desc}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    tx.type === 'دریافتی' ? 'bg-emerald-50 text-emerald-700' :
                    tx.type === 'پرداختی' ? 'bg-blue-50 text-blue-700' :
                    'bg-amber-50 text-amber-700'
                  }`}>{tx.type}</span>
                </td>
                <td className="px-4 py-3 font-bold text-gray-800">{tx.amount} <span className="text-xs text-gray-500">ت</span></td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    tx.status === 'موفق' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                  }`}>{tx.status}</span>
                </td>
                <td className="px-4 py-3 text-gray-500 text-xs">{tx.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SupportView() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">مرکز پشتیبانی</h2>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-rose-50 text-rose-700 px-2 py-1 rounded-full">۱۲ تیکت باز</span>
          <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">۳ چت فعال</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        {/* Tickets List */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-bold text-gray-800">تیکت‌های پشتیبانی</h3>
          </div>
          <div className="divide-y divide-gray-50">
            {[
              { title: 'مشکل در بارگذاری مدارک', user: 'علی محمدی', priority: 'متوسط', status: 'باز', time: '۱۰ دقیقه پیش' },
              { title: 'درخواست تغییر شماره موبایل', user: 'فاطمه احمدی', priority: 'کم', status: 'در حال بررسی', time: '۱ ساعت پیش' },
              { title: 'عدم دریافت کد تأیید', user: 'محمد رضایی', priority: 'بالا', status: 'باز', time: '۲ ساعت پیش' },
              { title: 'سؤال درباره فرآیند ترجمه', user: 'زهرا کریمی', priority: 'کم', status: 'پاسخ داده شده', time: 'دیروز' },
              { title: 'مشکل در پرداخت آنلاین', user: 'حسین نوری', priority: 'بالا', status: 'باز', time: 'دیروز' },
            ].map((ticket, i) => (
              <div key={i} className="p-4 hover:bg-gray-50 cursor-pointer transition">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-gray-800 text-sm">{ticket.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{ticket.user} • {ticket.time}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      ticket.priority === 'بالا' ? 'bg-rose-50 text-rose-700' :
                      ticket.priority === 'متوسط' ? 'bg-amber-50 text-amber-700' :
                      'bg-gray-100 text-gray-600'
                    }`}>{ticket.priority}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      ticket.status === 'باز' ? 'bg-blue-50 text-blue-700' :
                      ticket.status === 'در حال بررسی' ? 'bg-amber-50 text-amber-700' :
                      'bg-emerald-50 text-emerald-700'
                    }`}>{ticket.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Preview */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
          <h3 className="font-bold text-gray-800 mb-4">چت زنده</h3>
          <div className="space-y-3">
            {[
              { from: 'user', text: 'سلام، سفارش من کی آماده میشه؟', time: '۱۰:۳۰' },
              { from: 'agent', text: 'سلام! سفارش شما در حال پردازش است و تا ۲ ساعت دیگر آماده خواهد شد.', time: '۱۰:۳۲' },
              { from: 'user', text: 'ممنون، آیا امکان تحویل فیزیکی هم هست؟', time: '۱۰:۳۳' },
              { from: 'agent', text: 'بله، می‌توانید از بخش پیگیری سفارش، گزینه تحویل فیزیکی را انتخاب کنید.', time: '۱۰:۳۵' },
            ].map((msg, i) => (
              <div key={i} className={`flex ${msg.from === 'user' ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[80%] px-3 py-2 rounded-xl text-xs ${
                  msg.from === 'user' ? 'bg-gray-100 text-gray-800' : 'bg-primary-100 text-primary-800'
                }`}>
                  <p>{msg.text}</p>
                  <p className="text-[10px] text-gray-400 mt-1">{msg.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-2">
            <input type="text" placeholder="پاسخ..." className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-primary-400" />
            <button className="px-3 py-2 bg-primary-600 text-white rounded-lg text-xs">ارسال</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AnalyticsView() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-800">تحلیل و گزارش‌ها</h2>
      
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4">روند سفارش‌ها (۳۰ روز اخیر)</h3>
          <div className="flex items-end gap-1 h-32">
            {Array.from({ length: 30 }, (_, i) => Math.floor(Math.random() * 80 + 20)).map((h, i) => (
              <div key={i} className="flex-1 bg-gradient-to-t from-primary-500 to-primary-300 rounded-t hover:from-primary-600 hover:to-primary-400 transition" style={{ height: `${h}%` }}></div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-[10px] text-gray-400">
            <span>۳۰ روز پیش</span>
            <span>امروز</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4">رضایت مشتریان</h3>
          <div className="flex items-center gap-6">
            <div className="relative w-28 h-28">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#e5e7eb" strokeWidth="3" />
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#10b981" strokeWidth="3" strokeDasharray="98, 100" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold text-emerald-600">۹۸٪</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-emerald-500 rounded-full"></span>
                <span className="text-sm text-gray-600">عالی: ۸۵٪</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                <span className="text-sm text-gray-600">خوب: ۱۰٪</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-amber-500 rounded-full"></span>
                <span className="text-sm text-gray-600">متوسط: ۳٪</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-rose-500 rounded-full"></span>
                <span className="text-sm text-gray-600">ضعیف: ۲٪</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4">عملکرد اپراتورها</h3>
          <div className="space-y-3">
            {[
              { name: 'اپراتور ۱', orders: 145, avg: '۱۲ دقیقه', rating: 4.8 },
              { name: 'اپراتور ۲', orders: 128, avg: '۱۵ دقیقه', rating: 4.6 },
              { name: 'اپراتور ۳', orders: 98, avg: '۱۸ دقیقه', rating: 4.5 },
            ].map((op, i) => (
              <div key={i} className="flex items-center gap-3 p-2 bg-gray-50 rounded-xl">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-primary-700">{i + 1}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">{op.name}</p>
                  <p className="text-xs text-gray-500">{op.orders} سفارش • میانگین {op.avg}</p>
                </div>
                <span className="text-sm font-bold text-amber-600">⭐ {op.rating}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4">سلامت سیستم</h3>
          <div className="space-y-3">
            {[
              { name: 'سرور اصلی', status: 'فعال', uptime: '۹۹.۹۹٪', color: 'emerald' },
              { name: 'دیتابیس', status: 'فعال', uptime: '۹۹.۹۵٪', color: 'emerald' },
              { name: 'درگاه پرداخت', status: 'فعال', uptime: '۹۹.۹۰٪', color: 'emerald' },
              { name: 'سرویس پیامک', status: 'کند', uptime: '۹۸.۵۰٪', color: 'amber' },
              { name: 'ذخیره‌سازی', status: 'فعال', uptime: '۹۹.۹۹٪', color: 'emerald' },
            ].map((sys, i) => (
              <div key={i} className="flex items-center justify-between p-2 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${sys.color === 'emerald' ? 'bg-emerald-500' : 'bg-amber-500'} animate-pulse`}></span>
                  <span className="text-sm text-gray-800">{sys.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-500">{sys.uptime}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    sys.color === 'emerald' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                  }`}>{sys.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingsView() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-800">تنظیمات سیستم</h2>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4">تنظیمات عمومی</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">نام پلتفرم</label>
              <input type="text" defaultValue="کافی‌نت ابری" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">توضیحات</label>
              <textarea defaultValue="پلتفرم خدمات آنلاین کافی‌نتی" rows={2} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm resize-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">شماره تماس پشتیبانی</label>
              <input type="text" defaultValue="۰۲۱-۱۲۳۴۵۶۷۸" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm" />
            </div>
            <button className="px-4 py-2 bg-primary-600 text-white rounded-xl text-sm font-medium">ذخیره</button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4">تنظیمات امنیتی</h3>
          <div className="space-y-3">
            {[
              { label: 'احراز هویت دو مرحله‌ای', desc: 'فعال‌سازی 2FA برای همه کاربران', checked: true },
              { label: 'رمزنگاری مدارک', desc: 'رمزنگاری AES-256 برای فایل‌های آپلودی', checked: true },
              { label: 'لاگ فعالیت‌ها', desc: 'ثبت تمام فعالیت‌های کاربران و مدیران', checked: true },
              { label: 'محدودیت نشست', desc: 'حداکثر ۳ نشست همزمان برای هر کاربر', checked: false },
              { label: 'تشخیص ناهنجاری', desc: 'هشدار خودکار برای فعالیت‌های مشکوک', checked: true },
            ].map((setting, i) => (
              <label key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl cursor-pointer">
                <div>
                  <p className="text-sm font-medium text-gray-800">{setting.label}</p>
                  <p className="text-xs text-gray-500">{setting.desc}</p>
                </div>
                <input type="checkbox" defaultChecked={setting.checked} className="w-4 h-4 text-primary-600 rounded" />
              </label>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4">مدیریت شعبه‌ها</h3>
          <div className="space-y-3">
            {[
              { name: 'شعبه مرکزی - تهران', status: 'فعال', orders: 1234 },
              { name: 'شعبه اصفهان', status: 'فعال', orders: 567 },
              { name: 'شعبه شیراز', status: 'فعال', orders: 345 },
            ].map((branch, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div>
                  <p className="text-sm font-medium text-gray-800">{branch.name}</p>
                  <p className="text-xs text-gray-500">{branch.orders} سفارش</p>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">{branch.status}</span>
              </div>
            ))}
            <button className="w-full p-3 border-2 border-dashed border-gray-200 rounded-xl text-sm text-gray-500 hover:border-primary-300 hover:text-primary-600 transition">
              + افزودن شعبه جدید
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4">اتصال به سرویس‌ها</h3>
          <div className="space-y-3">
            {[
              { name: 'درگاه پرداخت زرین‌پال', status: 'متصل', icon: '💳' },
              { name: 'سرویس پیامک کاوه‌نگار', status: 'متصل', icon: '📱' },
              { name: 'API دولت هوشمند', status: 'متصل', icon: '🏛️' },
              { name: 'سرویس ایمیل', status: 'متصل', icon: '📧' },
              { name: 'فضای ابری (ذخیره‌سازی)', status: 'متصل', icon: '☁️' },
            ].map((service, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{service.icon}</span>
                  <span className="text-sm text-gray-800">{service.name}</span>
                </div>
                <span className="flex items-center gap-1 text-xs text-emerald-700">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                  {service.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
