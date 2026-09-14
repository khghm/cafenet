import { useState, useEffect } from 'react';
import { User, Wallet, FileText, MessageCircle, Bell, Settings, CreditCard, Download, Clock, CheckCircle, AlertCircle, TrendingUp, Plus, Send, Save } from 'lucide-react';

interface OrderData {
  trackingCode: string;
  serviceId: string;
  serviceTitle: string;
  formData: Record<string, string>;
  submittedAt: string;
  status: string;
  price: string;
}

interface TicketData {
  id: string;
  title: string;
  message: string;
  priority: string;
  status: string;
  createdAt: string;
  replies: { from: string; text: string; time: string }[];
}

interface UserProfile {
  name: string;
  phone: string;
  email: string;
  nationalId: string;
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [walletBalance, setWalletBalance] = useState(250000);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [profile, setProfile] = useState<UserProfile>({
    name: 'علی محمدی',
    phone: '۰۹۱۲۳۴۵۶۷۸۹',
    email: 'ali@example.com',
    nationalId: '۰۰۱۲۳۴۵۶۷۸',
  });
  const [notifications, setNotifications] = useState<any[]>([]);
  const [showNewTicket, setShowNewTicket] = useState(false);
  const [newTicket, setNewTicket] = useState({ title: '', message: '', priority: 'medium' });

  // Load data from localStorage
  useEffect(() => {
    // Load orders
    const allOrders: OrderData[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('order_') && key?.endsWith('_info')) {
        const orderInfo = JSON.parse(localStorage.getItem(key) || '{}');
        allOrders.push({
          ...orderInfo,
          status: 'processing',
          price: '۵۰,۰۰۰ تومان',
        });
      }
    }
    setOrders(allOrders);

    // Load tickets
    const savedTickets = JSON.parse(localStorage.getItem('user_tickets') || '[]');
    setTickets(savedTickets);

    // Load wallet
    const savedBalance = localStorage.getItem('wallet_balance');
    if (savedBalance) setWalletBalance(parseInt(savedBalance));

    // Load transactions
    const savedTransactions = JSON.parse(localStorage.getItem('wallet_transactions') || '[]');
    setTransactions(savedTransactions);

    // Load profile
    const savedProfile = localStorage.getItem('user_profile');
    if (savedProfile) setProfile(JSON.parse(savedProfile));

    // Load notifications
    const savedNotifications = JSON.parse(localStorage.getItem('user_notifications') || '[]');
    setNotifications(savedNotifications);
  }, []);

  const createTicket = () => {
    if (!newTicket.title || !newTicket.message) return;
    
    const ticket: TicketData = {
      id: `t${Date.now()}`,
      title: newTicket.title,
      message: newTicket.message,
      priority: newTicket.priority,
      status: 'open',
      createdAt: new Date().toLocaleDateString('fa-IR'),
      replies: [],
    };
    
    const updatedTickets = [ticket, ...tickets];
    setTickets(updatedTickets);
    localStorage.setItem('user_tickets', JSON.stringify(updatedTickets));
    
    setNewTicket({ title: '', message: '', priority: 'medium' });
    setShowNewTicket(false);
  };

  const chargeWallet = (amount: number) => {
    const newBalance = walletBalance + amount;
    setWalletBalance(newBalance);
    localStorage.setItem('wallet_balance', newBalance.toString());
    
    const transaction = {
      id: `tx${Date.now()}`,
      type: 'charge',
      amount: amount,
      date: new Date().toLocaleDateString('fa-IR'),
      description: 'شارژ کیف پول',
    };
    
    const updatedTransactions = [transaction, ...transactions];
    setTransactions(updatedTransactions);
    localStorage.setItem('wallet_transactions', JSON.stringify(updatedTransactions));
  };

  const saveProfile = () => {
    localStorage.setItem('user_profile', JSON.stringify(profile));
  };

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
            <h1 className="text-xl font-bold">{profile.name}</h1>
            <p className="text-primary-200 text-sm">{profile.phone} • عضویت از مهر ۱۴۰۳</p>
          </div>
          <div className="flex gap-3">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20">
              <p className="text-xs text-primary-200">موجودی کیف پول</p>
              <p className="font-bold text-lg">{walletBalance.toLocaleString('fa-IR')} <span className="text-xs">تومان</span></p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20">
              <p className="text-xs text-primary-200">تعداد سفارش‌ها</p>
              <p className="font-bold text-lg">{orders.length}</p>
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
              { label: 'کل سفارش‌ها', value: orders.length, icon: FileText, color: 'bg-blue-50 text-blue-600' },
              { label: 'در حال انجام', value: orders.filter(o => o.status === 'processing').length, icon: Clock, color: 'bg-amber-50 text-amber-600' },
              { label: 'تکمیل شده', value: orders.filter(o => o.status === 'completed').length, icon: CheckCircle, color: 'bg-emerald-50 text-emerald-600' },
              { label: 'مبلغ کل', value: `${(orders.length * 50000).toLocaleString('fa-IR')}`, icon: TrendingUp, color: 'bg-purple-50 text-purple-600' },
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
            {orders.length > 0 ? (
              <div className="divide-y divide-gray-50">
                {orders.map((order, idx) => (
                  <div key={idx} className="p-4 hover:bg-gray-50 transition">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                          <Clock size={18} />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800 text-sm">{order.serviceTitle}</p>
                          <p className="text-xs text-gray-500 font-mono">{order.trackingCode}</p>
                        </div>
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-bold text-gray-800">{order.price}</p>
                        <p className="text-xs text-gray-500">{new Date(order.submittedAt).toLocaleDateString('fa-IR')}</p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-primary-500 rounded-full" style={{ width: '60%' }}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center">
                <FileText size={48} className="mx-auto text-gray-300 mb-3" />
                <p className="text-gray-500">هنوز سفارشی ثبت نکرده‌اید</p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'wallet' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">موجودی فعلی</p>
                <p className="text-3xl font-bold text-gray-800">{walletBalance.toLocaleString('fa-IR')} <span className="text-sm text-gray-500">تومان</span></p>
              </div>
              <button onClick={() => chargeWallet(100000)} className="px-4 py-2 bg-primary-600 text-white rounded-xl text-sm font-medium hover:bg-primary-700 transition flex items-center gap-2">
                <CreditCard size={16} />
                شارژ ۱۰۰,۰۰۰ تومان
              </button>
            </div>
            <h4 className="font-bold text-gray-800 mb-3">تراکنش‌های اخیر</h4>
            {transactions.length > 0 ? (
              <div className="space-y-3">
                {transactions.map((tx, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div>
                      <p className="text-sm font-medium text-gray-800">{tx.description}</p>
                      <p className="text-xs text-gray-500">{tx.date}</p>
                    </div>
                    <span className={`font-bold text-sm ${tx.type === 'charge' ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {tx.type === 'charge' ? '+' : '-'}{tx.amount.toLocaleString('fa-IR')} تومان
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-8">تراکنشی وجود ندارد</p>
            )}
          </div>
        </div>
      )}

      {activeTab === 'tickets' && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-800">تیکت‌های پشتیبانی</h3>
            <button onClick={() => setShowNewTicket(!showNewTicket)} className="px-4 py-2 bg-primary-600 text-white rounded-xl text-sm font-medium hover:bg-primary-700 transition flex items-center gap-2">
              <Plus size={16} />
              تیکت جدید
            </button>
          </div>

          {showNewTicket && (
            <div className="bg-gray-50 rounded-xl p-4 mb-4 space-y-3">
              <input
                type="text"
                placeholder="عنوان تیکت"
                value={newTicket.title}
                onChange={(e) => setNewTicket({...newTicket, title: e.target.value})}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm"
              />
              <textarea
                placeholder="پیام شما"
                value={newTicket.message}
                onChange={(e) => setNewTicket({...newTicket, message: e.target.value})}
                rows={3}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm resize-none"
              />
              <select
                value={newTicket.priority}
                onChange={(e) => setNewTicket({...newTicket, priority: e.target.value})}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm"
              >
                <option value="low">اولویت کم</option>
                <option value="medium">اولویت متوسط</option>
                <option value="high">اولویت بالا</option>
              </select>
              <button onClick={createTicket} className="w-full py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700">
                ارسال تیکت
              </button>
            </div>
          )}

          {tickets.length > 0 ? (
            <div className="space-y-3">
              {tickets.map((ticket) => (
                <div key={ticket.id} className="border border-gray-100 rounded-xl p-4 hover:bg-gray-50 transition">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-800 text-sm">{ticket.title}</p>
                      <p className="text-xs text-gray-500 mt-1">{ticket.createdAt}</p>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      ticket.status === 'open' ? 'bg-blue-50 text-blue-700' :
                      ticket.status === 'answered' ? 'bg-emerald-50 text-emerald-700' :
                      'bg-gray-100 text-gray-600'
                    }`}>{ticket.status === 'open' ? 'باز' : ticket.status === 'answered' ? 'پاسخ داده شده' : 'بسته'}</span>
                  </div>
                  {ticket.replies.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-100 space-y-2">
                      {ticket.replies.map((reply, i) => (
                        <div key={i} className={`text-xs p-2 rounded-lg ${reply.from === 'admin' ? 'bg-primary-50 text-primary-800' : 'bg-gray-50 text-gray-700'}`}>
                          <p className="font-medium mb-1">{reply.from === 'admin' ? 'پشتیبانی' : 'شما'}:</p>
                          <p>{reply.text}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">تیکتی وجود ندارد</p>
          )}
        </div>
      )}

      {activeTab === 'notifications' && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4">اعلان‌ها</h3>
          {notifications.length > 0 ? (
            <div className="space-y-3">
              {notifications.map((notif, i) => (
                <div key={i} className={`flex gap-3 p-3 rounded-xl ${notif.unread ? 'bg-primary-50 border border-primary-100' : 'bg-gray-50'}`}>
                  <div className={`w-2 h-2 rounded-full mt-2 ${notif.unread ? 'bg-primary-500' : 'bg-gray-300'}`}></div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{notif.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{notif.message}</p>
                    <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">اعلانی وجود ندارد</p>
          )}
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-6">تنظیمات حساب</h3>
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">نام و نام خانوادگی</label>
                <input type="text" value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">شماره موبایل</label>
                <input type="text" value={profile.phone} onChange={(e) => setProfile({...profile, phone: e.target.value})} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ایمیل</label>
                <input type="email" value={profile.email} onChange={(e) => setProfile({...profile, email: e.target.value})} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">کد ملی</label>
                <input type="text" value={profile.nationalId} onChange={(e) => setProfile({...profile, nationalId: e.target.value})} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm" />
              </div>
            </div>
            <button onClick={saveProfile} className="px-6 py-2.5 bg-primary-600 text-white rounded-xl text-sm font-medium hover:bg-primary-700 transition flex items-center gap-2">
              <Save size={16} />
              ذخیره تغییرات
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
