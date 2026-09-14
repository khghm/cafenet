import { useState } from 'react';
import { sampleOrders } from '../data/services';
import { User, Wallet, FileText, MessageCircle, Bell, Settings, CreditCard, Download, Clock, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('orders');

  const tabs = [
    { id: 'orders', label: 'سفارش‌ها', icon: FileText },
    { id: 'wallet', label: 'کیف پول', icon: Wallet },
    { id: 'tickets', label: 'تیکت‌ها', icon: MessageCircle },
    { id: 'notifications', label: 'اعلان‌ها', icon: Bell },
    { id: 'settings', label: 'تنظیمات', icon: Settings },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Profile Header */}
      <div className="bg-gradient-to-bl from-primary-600 to-primary-800 rounded-2xl p-6 text-white mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
            <User size={32} className="text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold">علی محمدی</h1>
            <p className="text-primary-200 text-sm">۰۹۱۲۳۴۵۶۷۸۹ • عضویت از مهر ۱۴۰۳</p>
          </div>
          <div className="flex gap-3">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20">
              <p className="text-xs text-primary-200">موجودی کیف پول</p>
              <p className="font-bold text-lg">۲۵۰,۰۰۰ <span className="text-xs">تومان</span></p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20">
              <p className="text-xs text-primary-200">امتیاز باشگاه</p>
              <p className="font-bold text-lg">۱,۲۳۰ <span className="text-xs">امتیاز</span></p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-white rounded-xl border border-gray-100 p-1 mb-6 overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition ${
              activeTab === tab.id ? 'bg-primary-50 text-primary-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'کل سفارش‌ها', value: '۱۲', icon: FileText, color: 'bg-blue-50 text-blue-600' },
              { label: 'در حال انجام', value: '۳', icon: Clock, color: 'bg-amber-50 text-amber-600' },
              { label: 'تکمیل شده', value: '۸', icon: CheckCircle, color: 'bg-emerald-50 text-emerald-600' },
              { label: 'مبلغ کل', value: '۸۵۰ هزار', icon: TrendingUp, color: 'bg-purple-50 text-purple-600' },
            ].map((stat, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-4">
                <div className={`w-8 h-8 ${stat.color} rounded-lg flex items-center justify-center mb-2`}>
                  <stat.icon size={16} />
                </div>
                <p className="text-lg font-bold text-gray-800">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Orders List */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-800">سفارش‌های من</h3>
            </div>
            <div className="divide-y divide-gray-50">
              {sampleOrders.map(order => (
                <div key={order.id} className="p-4 hover:bg-gray-50 transition">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        order.status === 'completed' ? 'bg-emerald-100 text-emerald-600' :
                        order.status === 'processing' ? 'bg-blue-100 text-blue-600' :
                        order.status === 'review' ? 'bg-purple-100 text-purple-600' :
                        'bg-amber-100 text-amber-600'
                      }`}>
                        {order.status === 'completed' ? <CheckCircle size={18} /> :
                         order.status === 'processing' ? <Clock size={18} /> :
                         order.status === 'review' ? <AlertCircle size={18} /> :
                         <Clock size={18} />}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 text-sm">{order.serviceTitle}</p>
                        <p className="text-xs text-gray-500 font-mono">{order.trackingCode}</p>
                      </div>
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-bold text-gray-800">{order.price}</p>
                      <p className="text-xs text-gray-500">{order.date}</p>
                    </div>
                  </div>
                  {order.status !== 'completed' && (
                    <div className="mt-2">
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-primary-500 rounded-full" style={{ width: `${order.progress}%` }}></div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'wallet' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">موجودی فعلی</p>
                <p className="text-3xl font-bold text-gray-800">۲۵۰,۰۰۰ <span className="text-sm text-gray-500">تومان</span></p>
              </div>
              <button className="px-4 py-2 bg-primary-600 text-white rounded-xl text-sm font-medium hover:bg-primary-700 transition flex items-center gap-2">
                <CreditCard size={16} />
                افزایش موجودی
              </button>
            </div>
            <h4 className="font-bold text-gray-800 mb-3">تراکنش‌های اخیر</h4>
            <div className="space-y-3">
              {[
                { title: 'پرداخت سفارش ثبت‌نام آزمون', amount: '-۵۰,۰۰۰', date: '۱۴۰۳/۰۹/۱۵', type: 'expense' },
                { title: 'شارژ کیف پول', amount: '+۳۰۰,۰۰۰', date: '۱۴۰۳/۰۹/۱۰', type: 'income' },
                { title: 'پرداخت سفارش خدمات ثنا', amount: '-۴۵,۰۰۰', date: '۱۴۰۳/۰۹/۰۸', type: 'expense' },
                { title: 'بازگشت وجه سفارش لغو شده', amount: '+۲۰,۰۰۰', date: '۱۴۰۳/۰۹/۰۵', type: 'income' },
              ].map((tx, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{tx.title}</p>
                    <p className="text-xs text-gray-500">{tx.date}</p>
                  </div>
                  <span className={`font-bold text-sm ${tx.type === 'income' ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {tx.amount} تومان
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'tickets' && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-800">تیکت‌های پشتیبانی</h3>
            <button className="px-4 py-2 bg-primary-600 text-white rounded-xl text-sm font-medium hover:bg-primary-700 transition">
              تیکت جدید
            </button>
          </div>
          <div className="space-y-3">
            {[
              { title: 'مشکل در بارگذاری مدارک', status: 'پاسخ داده شده', date: '۱۴۰۳/۰۹/۲۰', priority: 'متوسط' },
              { title: 'درخواست بازگشت وجه', status: 'در انتظار', date: '۱۴۰۳/۰۹/۱۸', priority: 'بالا' },
              { title: 'سؤال درباره ترجمه رسمی', status: 'بسته شده', date: '۱۴۰۳/۰۹/۱۵', priority: 'کم' },
            ].map((ticket, i) => (
              <div key={i} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition">
                <div>
                  <p className="font-medium text-gray-800 text-sm">{ticket.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{ticket.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    ticket.status === 'پاسخ داده شده' ? 'bg-emerald-50 text-emerald-700' :
                    ticket.status === 'در انتظار' ? 'bg-amber-50 text-amber-700' :
                    'bg-gray-100 text-gray-600'
                  }`}>{ticket.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'notifications' && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4">اعلان‌ها</h3>
          <div className="space-y-3">
            {[
              { title: 'سفارش شما در حال پردازش است', desc: 'سفارش خدمات ثنا شما به اپراتور تخصیص یافت', time: '۵ دقیقه پیش', unread: true },
              { title: 'پرداخت موفق', desc: 'مبلغ ۴۵,۰۰۰ تومان با موفقیت پرداخت شد', time: '۱ ساعت پیش', unread: true },
              { title: 'تخفیف ویژه برای شما!', desc: '۲۰٪ تخفیف روی تمام خدمات ترجمه رسمی', time: 'دیروز', unread: false },
              { title: 'سفارش تکمیل شد', desc: 'سفارش ثبت‌نام آزمون شما با موفقیت انجام شد', time: '۲ روز پیش', unread: false },
            ].map((notif, i) => (
              <div key={i} className={`flex gap-3 p-3 rounded-xl ${notif.unread ? 'bg-primary-50 border border-primary-100' : 'bg-gray-50'}`}>
                <div className={`w-2 h-2 rounded-full mt-2 ${notif.unread ? 'bg-primary-500' : 'bg-gray-300'}`}></div>
                <div>
                  <p className="text-sm font-medium text-gray-800">{notif.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{notif.desc}</p>
                  <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-6">تنظیمات حساب</h3>
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">نام و نام خانوادگی</label>
                <input type="text" defaultValue="علی محمدی" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">شماره موبایل</label>
                <input type="text" defaultValue="۰۹۱۲۳۴۵۶۷۸۹" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ایمیل</label>
                <input type="email" defaultValue="ali@example.com" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">کد ملی</label>
                <input type="text" defaultValue="۰۰۱۲۳۴۵۶۷۸" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm" />
              </div>
            </div>
            <div className="pt-4 border-t border-gray-100">
              <h4 className="font-medium text-gray-800 mb-3">اعلان‌ها</h4>
              <div className="space-y-2">
                {['اعلان پیامکی', 'اعلان ایمیلی', 'اعلان درون‌برنامه‌ای'].map((item, i) => (
                  <label key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <span className="text-sm text-gray-700">{item}</span>
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-primary-600 rounded" />
                  </label>
                ))}
              </div>
            </div>
            <button className="px-6 py-2.5 bg-primary-600 text-white rounded-xl text-sm font-medium hover:bg-primary-700 transition">
              ذخیره تغییرات
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
