import { useState } from 'react';
import { services as initialServices, sampleOrders as initialOrders, sampleUsers as initialUsers, sampleTickets as initialTickets, sampleTransactions as initialTransactions } from '../data/services';
import { getServiceIcon, getCategoryIcon } from '../components/Icons';
import type { Service, Order, AppUser, Ticket, Transaction } from '../data/services';
import {
  LayoutDashboard, Users, FileText, CreditCard, Settings, BarChart3,
  Bell, Search, Plus, TrendingUp, ArrowUpRight, ArrowDownRight, Shield,
  MessageCircle, Eye, Edit, Trash2, X, Check, ChevronDown, Save,
  AlertCircle, Clock, CheckCircle, XCircle, Loader, MoreVertical,
  Download, Filter, Send, ArrowLeft, Building2, Globe, Lock, Mail,
  Phone, Wifi, Database, Server, Zap
} from 'lucide-react';

export default function AdminPanel() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [servicesList, setServicesList] = useState<Service[]>(initialServices);
  const [ordersList, setOrdersList] = useState<Order[]>(initialOrders);
  const [usersList, setUsersList] = useState<AppUser[]>(initialUsers);
  const [ticketsList, setTicketsList] = useState<Ticket[]>(initialTickets);
  const [transactionsList, setTransactionsList] = useState<Transaction[]>(initialTransactions);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

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
    <div className="flex min-h-[calc(100vh-64px)] relative">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-20 left-1/2 -translate-x-1/2 z-[100] px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 text-sm font-medium animate-[fadeIn_0.3s] ${
          toast.type === 'success' ? 'bg-emerald-600 text-white' :
          toast.type === 'error' ? 'bg-rose-600 text-white' :
          'bg-blue-600 text-white'
        }`}>
          {toast.type === 'success' ? <CheckCircle size={16} /> : toast.type === 'error' ? <XCircle size={16} /> : <AlertCircle size={16} />}
          {toast.message}
        </div>
      )}

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

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/20 z-30 lg:hidden" onClick={() => setSidebarOpen(false)}></div>
      )}

      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-6 overflow-x-hidden">
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden mb-4 px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 flex items-center gap-2"
        >
          <LayoutDashboard size={16} />
          منوی مدیریت
        </button>

        {activeSection === 'dashboard' && <DashboardView orders={ordersList} users={usersList} />}
        {activeSection === 'orders' && <OrdersView orders={ordersList} setOrders={setOrdersList} showToast={showToast} />}
        {activeSection === 'users' && <UsersView users={usersList} setUsers={setUsersList} showToast={showToast} />}
        {activeSection === 'services' && <ServicesManageView services={servicesList} setServices={setServicesList} showToast={showToast} />}
        {activeSection === 'finance' && <FinanceView transactions={transactionsList} setTransactions={setTransactionsList} showToast={showToast} />}
        {activeSection === 'support' && <SupportView tickets={ticketsList} setTickets={setTicketsList} showToast={showToast} />}
        {activeSection === 'analytics' && <AnalyticsView orders={ordersList} />}
        {activeSection === 'settings' && <SettingsView showToast={showToast} />}
      </div>
    </div>
  );
}

/* ============ DASHBOARD ============ */
function DashboardView({ orders, users }: { orders: Order[]; users: AppUser[] }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800">داشبورد تحلیلی</h2>
          <p className="text-sm text-gray-500">نمای کلی عملکرد سیستم</p>
        </div>
        <span className="flex items-center gap-1 text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
          سیستم فعال
        </span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'درآمد امروز', value: '۱۲,۵۰۰,۰۰۰', unit: 'تومان', change: '+۱۲٪', up: true, icon: TrendingUp, color: 'from-emerald-400 to-emerald-600' },
          { label: 'سفارش‌های جدید', value: String(orders.length), unit: 'امروز', change: '+۸٪', up: true, icon: FileText, color: 'from-blue-400 to-blue-600' },
          { label: 'کاربران فعال', value: String(users.filter(u => u.status === 'active').length), unit: 'آنلاین', change: '+۵٪', up: true, icon: Users, color: 'from-purple-400 to-purple-600' },
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

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4">نمودار درآمد هفتگی</h3>
          <div className="flex items-end gap-2 h-40">
            {[65, 45, 80, 55, 90, 70, 85].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full bg-gradient-to-t from-primary-500 to-primary-400 rounded-t-lg transition-all hover:from-primary-600 hover:to-primary-500" style={{ height: `${h}%` }}></div>
                <span className="text-[10px] text-gray-400">{['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'][i]}</span>
              </div>
            ))}
          </div>
        </div>
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

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-bold text-gray-800">سفارش‌های اخیر</h3>
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
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {orders.slice(0, 5).map(order => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-xs text-primary-700">{order.trackingCode}</td>
                  <td className="px-4 py-3 text-gray-800">{order.serviceTitle}</td>
                  <td className="px-4 py-3 text-gray-600">{order.customerName}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="px-4 py-3 text-gray-800">{order.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

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

/* ============ ORDERS ============ */
function OrdersView({ orders, setOrders, showToast }: { orders: Order[]; setOrders: React.Dispatch<React.SetStateAction<Order[]>>; showToast: (m: string, t?: any) => void }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showDetail, setShowDetail] = useState(false);

  const filteredOrders = orders.filter(o => {
    const matchesSearch = o.trackingCode.includes(searchQuery) || o.serviceTitle.includes(searchQuery) || o.customerName.includes(searchQuery);
    const matchesStatus = filterStatus === 'all' || o.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus, progress: newStatus === 'completed' ? 100 : newStatus === 'processing' ? 50 : newStatus === 'review' ? 75 : newStatus === 'rejected' ? 0 : 20 } : o));
    showToast('وضعیت سفارش بروزرسانی شد');
  };

  const assignOperator = (orderId: string, operator: string) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, operator } : o));
    showToast(`سفارش به ${operator} تخصیص یافت`);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <h2 className="text-xl font-bold text-gray-800">مدیریت سفارش‌ها</h2>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search size={16} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="جستجو..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pr-8 pl-3 py-2 bg-white border border-gray-200 rounded-lg text-sm w-48 focus:outline-none focus:border-primary-400" />
          </div>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary-400">
            <option value="all">همه وضعیت‌ها</option>
            <option value="pending">در انتظار</option>
            <option value="processing">در حال انجام</option>
            <option value="review">در حال بررسی</option>
            <option value="completed">تکمیل شده</option>
            <option value="rejected">رد شده</option>
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
                <th className="text-right px-4 py-3 font-medium text-gray-600">مشتری</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">وضعیت</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">اولویت</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">اپراتور</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredOrders.map(order => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-xs text-primary-700">{order.trackingCode}</td>
                  <td className="px-4 py-3 text-gray-800">{order.serviceTitle}</td>
                  <td className="px-4 py-3 text-gray-600">{order.customerName}</td>
                  <td className="px-4 py-3"><StatusBadge status={order.status} /></td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      order.priority === 'high' ? 'bg-rose-50 text-rose-700' : order.priority === 'medium' ? 'bg-amber-50 text-amber-700' : 'bg-gray-100 text-gray-600'
                    }`}>{order.priority === 'high' ? 'بالا' : order.priority === 'medium' ? 'متوسط' : 'عادی'}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-600 text-xs">{order.operator || 'تخصیص نیافته'}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button onClick={() => { setSelectedOrder(order); setShowDetail(true); }} className="p-1.5 hover:bg-blue-50 rounded-lg" title="مشاهده"><Eye size={14} className="text-blue-600" /></button>
                      <button onClick={() => updateOrderStatus(order.id, order.status === 'completed' ? 'pending' : 'completed')} className="p-1.5 hover:bg-emerald-50 rounded-lg" title="تغییر وضعیت"><Check size={14} className="text-emerald-600" /></button>
                      <select onChange={(e) => { if (e.target.value) assignOperator(order.id, e.target.value); e.target.value = ''; }} className="text-xs border border-gray-200 rounded px-1 py-0.5 focus:outline-none">
                        <option value="">تخصیص...</option>
                        <option value="اپراتور ۱">اپراتور ۱</option>
                        <option value="اپراتور ۲">اپراتور ۲</option>
                        <option value="اپراتور ۳">اپراتور ۳</option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {showDetail && selectedOrder && (
        <Modal onClose={() => setShowDetail(false)} title="جزئیات سفارش">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><p className="text-xs text-gray-500">کد رهگیری</p><p className="font-mono font-bold text-primary-700">{selectedOrder.trackingCode}</p></div>
              <div><p className="text-xs text-gray-500">خدمت</p><p className="font-medium">{selectedOrder.serviceTitle}</p></div>
              <div><p className="text-xs text-gray-500">مشتری</p><p className="font-medium">{selectedOrder.customerName}</p></div>
              <div><p className="text-xs text-gray-500">مبلغ</p><p className="font-bold">{selectedOrder.price}</p></div>
              <div><p className="text-xs text-gray-500">تاریخ</p><p className="font-medium">{selectedOrder.date}</p></div>
              <div><p className="text-xs text-gray-500">اپراتور</p><p className="font-medium">{selectedOrder.operator || 'تخصیص نیافته'}</p></div>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-2">پیشرفت</p>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-primary-500 rounded-full" style={{ width: `${selectedOrder.progress}%` }}></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">{selectedOrder.progress}٪</p>
            </div>
            <div className="flex gap-2 pt-4 border-t border-gray-100">
              <button onClick={() => { updateOrderStatus(selectedOrder.id, 'processing'); setShowDetail(false); }} className="flex-1 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">تغییر به: در حال انجام</button>
              <button onClick={() => { updateOrderStatus(selectedOrder.id, 'completed'); setShowDetail(false); }} className="flex-1 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700">تکمیل سفارش</button>
              <button onClick={() => { updateOrderStatus(selectedOrder.id, 'rejected'); setShowDetail(false); }} className="flex-1 py-2 bg-rose-600 text-white rounded-lg text-sm font-medium hover:bg-rose-700">رد سفارش</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

/* ============ USERS ============ */
function UsersView({ users, setUsers, showToast }: { users: AppUser[]; setUsers: React.Dispatch<React.SetStateAction<AppUser[]>>; showToast: (m: string, t?: any) => void }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUser, setEditingUser] = useState<AppUser | null>(null);
  const [newUser, setNewUser] = useState({ name: '', phone: '', email: '', role: 'user' as AppUser['role'] });

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.includes(searchQuery) || u.phone.includes(searchQuery);
    const matchesRole = filterRole === 'all' || u.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const addUser = () => {
    if (!newUser.name || !newUser.phone) { showToast('لطفاً نام و شماره موبایل را وارد کنید', 'error'); return; }
    const user: AppUser = { id: `u${Date.now()}`, name: newUser.name, phone: newUser.phone, email: newUser.email, role: newUser.role, status: 'active', joinDate: '۱۴۰۳/۰۹/۲۳' };
    setUsers(prev => [...prev, user]);
    setNewUser({ name: '', phone: '', email: '', role: 'user' });
    setShowAddModal(false);
    showToast('کاربر جدید اضافه شد');
  };

  const deleteUser = (id: string) => {
    setUsers(prev => prev.filter(u => u.id !== id));
    showToast('کاربر حذف شد');
  };

  const toggleUserStatus = (id: string) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } : u));
    showToast('وضعیت کاربر تغییر کرد');
  };

  const saveEditUser = () => {
    if (!editingUser) return;
    setUsers(prev => prev.map(u => u.id === editingUser.id ? editingUser : u));
    setEditingUser(null);
    showToast('اطلاعات کاربر بروزرسانی شد');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">مدیریت کاربران</h2>
        <button onClick={() => setShowAddModal(true)} className="flex items-center gap-1.5 px-4 py-2 bg-primary-600 text-white rounded-xl text-sm font-medium hover:bg-primary-700 transition">
          <Plus size={16} />
          کاربر جدید
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'کل کاربران', value: users.length, color: 'text-blue-600 bg-blue-50' },
          { label: 'فعال', value: users.filter(u => u.status === 'active').length, color: 'text-emerald-600 bg-emerald-50' },
          { label: 'اپراتورها', value: users.filter(u => u.role === 'operator').length, color: 'text-purple-600 bg-purple-50' },
          { label: 'مدیران', value: users.filter(u => u.role === 'admin').length, color: 'text-amber-600 bg-amber-50' },
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
            <input type="text" placeholder="جستجوی کاربر..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pr-8 pl-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary-400" />
          </div>
          <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)} className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm">
            <option value="all">همه نقش‌ها</option>
            <option value="user">کاربر عادی</option>
            <option value="operator">اپراتور</option>
            <option value="admin">مدیر</option>
          </select>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-right px-4 py-3 font-medium text-gray-600">کاربر</th>
              <th className="text-right px-4 py-3 font-medium text-gray-600">موبایل</th>
              <th className="text-right px-4 py-3 font-medium text-gray-600">نقش</th>
              <th className="text-right px-4 py-3 font-medium text-gray-600">وضعیت</th>
              <th className="text-right px-4 py-3 font-medium text-gray-600">عملیات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredUsers.map(user => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-primary-700">{user.name[0]}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-800 block">{user.name}</span>
                      <span className="text-xs text-gray-400">{user.email}</span>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-600 text-xs font-mono">{user.phone}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    user.role === 'admin' ? 'bg-amber-50 text-amber-700' : user.role === 'operator' ? 'bg-purple-50 text-purple-700' : 'bg-gray-100 text-gray-600'
                  }`}>{user.role === 'admin' ? 'مدیر' : user.role === 'operator' ? 'اپراتور' : 'کاربر'}</span>
                </td>
                <td className="px-4 py-3">
                  <button onClick={() => toggleUserStatus(user.id)} className={`text-xs px-2 py-0.5 rounded-full cursor-pointer ${
                    user.status === 'active' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                  }`}>{user.status === 'active' ? 'فعال' : 'غیرفعال'}</button>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button onClick={() => setEditingUser({...user})} className="p-1.5 hover:bg-amber-50 rounded-lg"><Edit size={14} className="text-amber-600" /></button>
                    <button onClick={() => deleteUser(user.id)} className="p-1.5 hover:bg-rose-50 rounded-lg"><Trash2 size={14} className="text-rose-600" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <Modal onClose={() => setShowAddModal(false)} title="افزودن کاربر جدید">
          <div className="space-y-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">نام و نام خانوادگی</label><input type="text" value={newUser.name} onChange={(e) => setNewUser({...newUser, name: e.target.value})} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-400" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">شماره موبایل</label><input type="text" value={newUser.phone} onChange={(e) => setNewUser({...newUser, phone: e.target.value})} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-400" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">ایمیل</label><input type="email" value={newUser.email} onChange={(e) => setNewUser({...newUser, email: e.target.value})} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-400" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">نقش</label>
              <select value={newUser.role} onChange={(e) => setNewUser({...newUser, role: e.target.value as AppUser['role']})} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-400">
                <option value="user">کاربر عادی</option><option value="operator">اپراتور</option><option value="admin">مدیر</option>
              </select>
            </div>
            <button onClick={addUser} className="w-full py-2.5 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition">افزودن کاربر</button>
          </div>
        </Modal>
      )}

      {/* Edit User Modal */}
      {editingUser && (
        <Modal onClose={() => setEditingUser(null)} title="ویرایش کاربر">
          <div className="space-y-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">نام</label><input type="text" value={editingUser.name} onChange={(e) => setEditingUser({...editingUser, name: e.target.value})} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-400" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">موبایل</label><input type="text" value={editingUser.phone} onChange={(e) => setEditingUser({...editingUser, phone: e.target.value})} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-400" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">ایمیل</label><input type="email" value={editingUser.email || ''} onChange={(e) => setEditingUser({...editingUser, email: e.target.value})} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-400" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">نقش</label>
              <select value={editingUser.role} onChange={(e) => setEditingUser({...editingUser, role: e.target.value as AppUser['role']})} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-400">
                <option value="user">کاربر عادی</option><option value="operator">اپراتور</option><option value="admin">مدیر</option>
              </select>
            </div>
            <button onClick={saveEditUser} className="w-full py-2.5 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition flex items-center justify-center gap-2"><Save size={16} />ذخیره تغییرات</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

/* ============ SERVICES ============ */
function ServicesManageView({ services, setServices, showToast }: { services: Service[]; setServices: React.Dispatch<React.SetStateAction<Service[]>>; showToast: (m: string, t?: any) => void }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [newService, setNewService] = useState({ title: '', description: '', category: 'government', price: '', duration: '', iconId: 's1' });

  const addService = () => {
    if (!newService.title || !newService.price) { showToast('لطفاً عنوان و قیمت را وارد کنید', 'error'); return; }
    const service: Service = { id: `s${Date.now()}`, ...newService, active: true, fields: [] };
    setServices(prev => [...prev, service]);
    setNewService({ title: '', description: '', category: 'government', price: '', duration: '', iconId: 's1' });
    setShowAddModal(false);
    showToast('خدمت جدید اضافه شد');
  };

  const deleteService = (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id));
    showToast('خدمت حذف شد');
  };

  const toggleService = (id: string) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, active: !s.active } : s));
    showToast('وضعیت خدمت تغییر کرد');
  };

  const saveEdit = () => {
    if (!editingService) return;
    setServices(prev => prev.map(s => s.id === editingService.id ? editingService : s));
    setEditingService(null);
    showToast('خدمت بروزرسانی شد');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">مدیریت خدمات</h2>
        <button onClick={() => setShowAddModal(true)} className="flex items-center gap-1.5 px-4 py-2 bg-primary-600 text-white rounded-xl text-sm font-medium hover:bg-primary-700 transition">
          <Plus size={16} />خدمت جدید
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map(service => {
          const SIcon = getServiceIcon(service.iconId);
          return (
            <div key={service.id} className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
                  <SIcon size={20} className="text-primary-600" />
                </div>
                <div className="flex gap-1">
                  <button onClick={() => setEditingService({...service})} className="p-1.5 hover:bg-gray-100 rounded"><Edit size={12} className="text-gray-500" /></button>
                  <button onClick={() => deleteService(service.id)} className="p-1.5 hover:bg-rose-50 rounded"><Trash2 size={12} className="text-gray-500" /></button>
                </div>
              </div>
              <h4 className="font-bold text-gray-800 text-sm mb-1">{service.title}</h4>
              <p className="text-xs text-gray-500 mb-3">{service.description}</p>
              <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                <span className="text-xs font-bold text-primary-600">{service.price}</span>
                <button onClick={() => toggleService(service.id)} className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${service.active ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${service.active ? 'bg-emerald-500' : 'bg-gray-400'}`}></span>
                  {service.active ? 'فعال' : 'غیرفعال'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {showAddModal && (
        <Modal onClose={() => setShowAddModal(false)} title="افزودن خدمت جدید">
          <div className="space-y-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">عنوان خدمت</label><input type="text" value={newService.title} onChange={(e) => setNewService({...newService, title: e.target.value})} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-400" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">توضیحات</label><textarea value={newService.description} onChange={(e) => setNewService({...newService, description: e.target.value})} rows={2} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm resize-none focus:outline-none focus:border-primary-400" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">دسته‌بندی</label>
                <select value={newService.category} onChange={(e) => setNewService({...newService, category: e.target.value})} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-400">
                  <option value="government">دولتی</option><option value="education">آموزشی</option><option value="financial">مالی</option><option value="legal">حقوقی</option><option value="printing">چاپ</option><option value="digital">دیجیتال</option><option value="communication">ارتباطات</option>
                </select>
              </div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">آیکون</label>
                <select value={newService.iconId} onChange={(e) => setNewService({...newService, iconId: e.target.value})} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-400">
                  <option value="s1">آیکون ۱</option><option value="s2">آیکون ۲</option><option value="s3">آیکون ۳</option><option value="s4">آیکون ۴</option><option value="s5">آیکون ۵</option><option value="s6">آیکون ۶</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">قیمت</label><input type="text" value={newService.price} onChange={(e) => setNewService({...newService, price: e.target.value})} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-400" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">زمان تحویل</label><input type="text" value={newService.duration} onChange={(e) => setNewService({...newService, duration: e.target.value})} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-400" /></div>
            </div>
            <button onClick={addService} className="w-full py-2.5 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition">افزودن خدمت</button>
          </div>
        </Modal>
      )}

      {editingService && (
        <Modal onClose={() => setEditingService(null)} title="ویرایش خدمت">
          <div className="space-y-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">عنوان</label><input type="text" value={editingService.title} onChange={(e) => setEditingService({...editingService, title: e.target.value})} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-400" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">توضیحات</label><textarea value={editingService.description} onChange={(e) => setEditingService({...editingService, description: e.target.value})} rows={2} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm resize-none focus:outline-none focus:border-primary-400" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">قیمت</label><input type="text" value={editingService.price} onChange={(e) => setEditingService({...editingService, price: e.target.value})} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-400" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">زمان تحویل</label><input type="text" value={editingService.duration} onChange={(e) => setEditingService({...editingService, duration: e.target.value})} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-400" /></div>
            </div>
            <button onClick={saveEdit} className="w-full py-2.5 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition flex items-center justify-center gap-2"><Save size={16} />ذخیره</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

/* ============ FINANCE ============ */
function FinanceView({ transactions, setTransactions, showToast }: { transactions: Transaction[]; setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>; showToast: (m: string, t?: any) => void }) {
  const approveTransaction = (id: string) => {
    setTransactions(prev => prev.map(t => t.id === id ? { ...t, status: 'success' as const } : t));
    showToast('تراکنش تأیید شد');
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-800">مدیریت مالی</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'درآمد ماه', value: '۳۸۵,۰۰۰,۰۰۰', unit: 'تومان', color: 'text-emerald-600' },
          { label: 'تسویه در انتظار', value: '۴۵,۰۰۰,۰۰۰', unit: 'تومان', color: 'text-amber-600' },
          { label: 'بازگشت وجه', value: '۲,۵۰۰,۰۰۰', unit: 'تومان', color: 'text-rose-600' },
          { label: 'کمیسیون', value: '۳۸,۵۰۰,۰۰۰', unit: 'تومان', color: 'text-purple-600' },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-100 p-4">
            <p className={`text-lg font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100"><h3 className="font-bold text-gray-800">تراکنش‌ها</h3></div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-right px-4 py-3 font-medium text-gray-600">شناسه</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">شرح</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">نوع</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">مبلغ</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">وضعیت</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {transactions.map(tx => (
                <tr key={tx.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-xs text-primary-700">{tx.id}</td>
                  <td className="px-4 py-3 text-gray-800 text-xs">{tx.description}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      tx.type === 'income' ? 'bg-emerald-50 text-emerald-700' : tx.type === 'expense' ? 'bg-blue-50 text-blue-700' : 'bg-amber-50 text-amber-700'
                    }`}>{tx.type === 'income' ? 'دریافتی' : tx.type === 'expense' ? 'پرداختی' : 'بازگشت'}</span>
                  </td>
                  <td className="px-4 py-3 font-bold text-gray-800">{tx.amount} <span className="text-xs text-gray-500">ت</span></td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${tx.status === 'success' ? 'bg-emerald-50 text-emerald-700' : tx.status === 'pending' ? 'bg-amber-50 text-amber-700' : 'bg-rose-50 text-rose-700'}`}>
                      {tx.status === 'success' ? 'موفق' : tx.status === 'pending' ? 'در انتظار' : 'ناموفق'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {tx.status === 'pending' && (
                      <button onClick={() => approveTransaction(tx.id)} className="text-xs px-2 py-1 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">تأیید</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ============ SUPPORT ============ */
function SupportView({ tickets, setTickets, showToast }: { tickets: Ticket[]; setTickets: React.Dispatch<React.SetStateAction<Ticket[]>>; showToast: (m: string, t?: any) => void }) {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [replyText, setReplyText] = useState('');

  const sendReply = () => {
    if (!replyText.trim() || !selectedTicket) return;
    setTickets(prev => prev.map(t => t.id === selectedTicket.id ? {
      ...t,
      messages: [...t.messages, { from: 'agent' as const, text: replyText, time: 'الان' }],
      status: 'answered' as const
    } : t));
    setSelectedTicket(prev => prev ? { ...prev, messages: [...prev.messages, { from: 'agent', text: replyText, time: 'الان' }], status: 'answered' } : null);
    setReplyText('');
    showToast('پاسخ ارسال شد');
  };

  const changeTicketStatus = (id: string, status: Ticket['status']) => {
    setTickets(prev => prev.map(t => t.id === id ? { ...t, status } : t));
    showToast('وضعیت تیکت تغییر کرد');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">مرکز پشتیبانی</h2>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-rose-50 text-rose-700 px-2 py-1 rounded-full">{tickets.filter(t => t.status === 'open').length} تیکت باز</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="p-4 border-b border-gray-100"><h3 className="font-bold text-gray-800">تیکت‌ها</h3></div>
          <div className="divide-y divide-gray-50">
            {tickets.map(ticket => (
              <div key={ticket.id} onClick={() => setSelectedTicket(ticket)} className={`p-4 cursor-pointer transition ${selectedTicket?.id === ticket.id ? 'bg-primary-50' : 'hover:bg-gray-50'}`}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-gray-800 text-sm">{ticket.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{ticket.userName} • {ticket.createdAt}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      ticket.priority === 'high' ? 'bg-rose-50 text-rose-700' : ticket.priority === 'medium' ? 'bg-amber-50 text-amber-700' : 'bg-gray-100 text-gray-600'
                    }`}>{ticket.priority === 'high' ? 'بالا' : ticket.priority === 'medium' ? 'متوسط' : 'کم'}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      ticket.status === 'open' ? 'bg-blue-50 text-blue-700' : ticket.status === 'inProgress' ? 'bg-amber-50 text-amber-700' : ticket.status === 'answered' ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-600'
                    }`}>{ticket.status === 'open' ? 'باز' : ticket.status === 'inProgress' ? 'در حال بررسی' : ticket.status === 'answered' ? 'پاسخ داده شده' : 'بسته'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col" style={{ minHeight: '400px' }}>
          {selectedTicket ? (
            <>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-gray-800 text-sm">{selectedTicket.title}</h3>
                <select value={selectedTicket.status} onChange={(e) => changeTicketStatus(selectedTicket.id, e.target.value as Ticket['status'])} className="text-xs border border-gray-200 rounded px-2 py-1">
                  <option value="open">باز</option><option value="inProgress">در حال بررسی</option><option value="answered">پاسخ داده شده</option><option value="closed">بسته</option>
                </select>
              </div>
              <div className="flex-1 overflow-y-auto space-y-2 mb-3">
                {selectedTicket.messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.from === 'user' ? 'justify-start' : 'justify-end'}`}>
                    <div className={`max-w-[85%] px-3 py-2 rounded-xl text-xs ${msg.from === 'user' ? 'bg-gray-100 text-gray-800' : 'bg-primary-100 text-primary-800'}`}>
                      <p>{msg.text}</p>
                      <p className="text-[10px] text-gray-400 mt-1">{msg.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input type="text" value={replyText} onChange={(e) => setReplyText(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendReply()} placeholder="پاسخ..." className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-primary-400" />
                <button onClick={sendReply} className="px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"><Send size={14} /></button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
              <div className="text-center">
                <MessageCircle size={32} className="mx-auto mb-2 opacity-50" />
                <p>یک تیکت را انتخاب کنید</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ============ ANALYTICS ============ */
function AnalyticsView({ orders }: { orders: Order[] }) {
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
          <div className="flex justify-between mt-2 text-[10px] text-gray-400"><span>۳۰ روز پیش</span><span>امروز</span></div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4">رضایت مشتریان</h3>
          <div className="flex items-center gap-6">
            <div className="relative w-28 h-28">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#e5e7eb" strokeWidth="3" />
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#10b981" strokeWidth="3" strokeDasharray="98, 100" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center"><span className="text-xl font-bold text-emerald-600">۹۸٪</span></div>
            </div>
            <div className="space-y-2">
              {[{ label: 'عالی: ۸۵٪', color: 'bg-emerald-500' }, { label: 'خوب: ۱۰٪', color: 'bg-blue-500' }, { label: 'متوسط: ۳٪', color: 'bg-amber-500' }, { label: 'ضعیف: ۲٪', color: 'bg-rose-500' }].map((item, i) => (
                <div key={i} className="flex items-center gap-2"><span className={`w-3 h-3 rounded-full ${item.color}`}></span><span className="text-sm text-gray-600">{item.label}</span></div>
              ))}
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
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center"><span className="text-xs font-bold text-primary-700">{i + 1}</span></div>
                <div className="flex-1"><p className="text-sm font-medium text-gray-800">{op.name}</p><p className="text-xs text-gray-500">{op.orders} سفارش • میانگین {op.avg}</p></div>
                <span className="text-sm font-bold text-amber-600 flex items-center gap-1"><Star size={12} className="fill-amber-500 text-amber-500" />{op.rating}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4">سلامت سیستم</h3>
          <div className="space-y-3">
            {[
              { name: 'سرور اصلی', status: 'فعال', uptime: '۹۹.۹۹٪', ok: true, icon: Server },
              { name: 'دیتابیس', status: 'فعال', uptime: '۹۹.۹۵٪', ok: true, icon: Database },
              { name: 'درگاه پرداخت', status: 'فعال', uptime: '۹۹.۹۰٪', ok: true, icon: CreditCard },
              { name: 'سرویس پیامک', status: 'کند', uptime: '۹۸.۵۰٪', ok: false, icon: Phone },
              { name: 'ذخیره‌سازی', status: 'فعال', uptime: '۹۹.۹۹٪', ok: true, icon: Wifi },
            ].map((sys, i) => (
              <div key={i} className="flex items-center justify-between p-2 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-2">
                  <sys.icon size={16} className="text-gray-500" />
                  <span className="text-sm text-gray-800">{sys.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-500">{sys.uptime}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${sys.ok ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>{sys.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-800">خروجی گزارش</h3>
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition"><Download size={14} />دانلود PDF</button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {['گزارش فروش ماهانه', 'گزارش کاربران', 'گزارش سفارش‌ها', 'گزارش مالی'].map((report, i) => (
            <button key={i} className="p-3 border border-gray-200 rounded-xl text-sm text-gray-700 hover:border-primary-300 hover:bg-primary-50 transition text-center">{report}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============ SETTINGS ============ */
function SettingsView({ showToast }: { showToast: (m: string, t?: any) => void }) {
  const [settings, setSettings] = useState({
    platformName: 'کافی‌نت ابری',
    description: 'پلتفرم خدمات آنلاین کافی‌نتی',
    phone: '۰۲۱-۱۲۳۴۵۶۷۸',
    email: 'info@cloudcafenet.ir',
    twoFactor: true,
    encryption: true,
    activityLog: true,
    sessionLimit: false,
    anomalyDetection: true,
    smsNotify: true,
    emailNotify: true,
    pushNotify: true,
  });

  const saveSettings = () => { showToast('تنظیمات با موفقیت ذخیره شد'); };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-800">تنظیمات سیستم</h2>
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Globe size={18} className="text-primary-600" />تنظیمات عمومی</h3>
          <div className="space-y-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">نام پلتفرم</label><input type="text" value={settings.platformName} onChange={(e) => setSettings({...settings, platformName: e.target.value})} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-400" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">توضیحات</label><textarea value={settings.description} onChange={(e) => setSettings({...settings, description: e.target.value})} rows={2} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm resize-none focus:outline-none focus:border-primary-400" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><Phone size={14} />شماره تماس</label><input type="text" value={settings.phone} onChange={(e) => setSettings({...settings, phone: e.target.value})} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-400" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><Mail size={14} />ایمیل</label><input type="email" value={settings.email} onChange={(e) => setSettings({...settings, email: e.target.value})} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-400" /></div>
            <button onClick={saveSettings} className="px-4 py-2 bg-primary-600 text-white rounded-xl text-sm font-medium hover:bg-primary-700 transition flex items-center gap-2"><Save size={14} />ذخیره</button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Lock size={18} className="text-primary-600" />تنظیمات امنیتی</h3>
          <div className="space-y-3">
            {[
              { key: 'twoFactor', label: 'احراز هویت دو مرحله‌ای', desc: 'فعال‌سازی 2FA برای همه کاربران' },
              { key: 'encryption', label: 'رمزنگاری مدارک', desc: 'رمزنگاری AES-256 برای فایل‌های آپلودی' },
              { key: 'activityLog', label: 'لاگ فعالیت‌ها', desc: 'ثبت تمام فعالیت‌های کاربران و مدیران' },
              { key: 'sessionLimit', label: 'محدودیت نشست', desc: 'حداکثر ۳ نشست همزمان برای هر کاربر' },
              { key: 'anomalyDetection', label: 'تشخیص ناهنجاری', desc: 'هشدار خودکار برای فعالیت‌های مشکوک' },
            ].map((setting) => (
              <label key={setting.key} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition">
                <div><p className="text-sm font-medium text-gray-800">{setting.label}</p><p className="text-xs text-gray-500">{setting.desc}</p></div>
                <input type="checkbox" checked={(settings as any)[setting.key]} onChange={(e) => setSettings({...settings, [setting.key]: e.target.checked})} className="w-4 h-4 text-primary-600 rounded" />
              </label>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Building2 size={18} className="text-primary-600" />مدیریت شعبه‌ها</h3>
          <div className="space-y-3">
            {[
              { name: 'شعبه مرکزی - تهران', orders: 1234 },
              { name: 'شعبه اصفهان', orders: 567 },
              { name: 'شعبه شیراز', orders: 345 },
            ].map((branch, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div><p className="text-sm font-medium text-gray-800">{branch.name}</p><p className="text-xs text-gray-500">{branch.orders} سفارش</p></div>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 text-xs text-emerald-700"><span className="w-2 h-2 bg-emerald-500 rounded-full"></span>فعال</span>
                  <button className="p-1 hover:bg-gray-200 rounded"><Edit size={12} className="text-gray-500" /></button>
                </div>
              </div>
            ))}
            <button onClick={() => showToast('فرم افزودن شعبه باز شد', 'info')} className="w-full p-3 border-2 border-dashed border-gray-200 rounded-xl text-sm text-gray-500 hover:border-primary-300 hover:text-primary-600 transition flex items-center justify-center gap-1"><Plus size={14} />افزودن شعبه جدید</button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Zap size={18} className="text-primary-600" />اتصال به سرویس‌ها</h3>
          <div className="space-y-3">
            {[
              { name: 'درگاه پرداخت زرین‌پال', icon: CreditCard },
              { name: 'سرویس پیامک کاوه‌نگار', icon: Phone },
              { name: 'API دولت هوشمند', icon: Building2 },
              { name: 'سرویس ایمیل', icon: Mail },
              { name: 'فضای ابری', icon: Database },
            ].map((service, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-2"><service.icon size={16} className="text-gray-500" /><span className="text-sm text-gray-800">{service.name}</span></div>
                <span className="flex items-center gap-1 text-xs text-emerald-700"><span className="w-2 h-2 bg-emerald-500 rounded-full"></span>متصل</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm lg:col-span-2">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Bell size={18} className="text-primary-600" />تنظیمات اعلان‌ها</h3>
          <div className="grid sm:grid-cols-3 gap-3">
            {[
              { key: 'smsNotify', label: 'اعلان پیامکی', icon: Phone },
              { key: 'emailNotify', label: 'اعلان ایمیلی', icon: Mail },
              { key: 'pushNotify', label: 'اعلان درون‌برنامه‌ای', icon: Bell },
            ].map((item) => (
              <label key={item.key} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition">
                <div className="flex items-center gap-2"><item.icon size={16} className="text-gray-500" /><span className="text-sm text-gray-700">{item.label}</span></div>
                <input type="checkbox" checked={(settings as any)[item.key]} onChange={(e) => setSettings({...settings, [item.key]: e.target.checked})} className="w-4 h-4 text-primary-600 rounded" />
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============ SHARED COMPONENTS ============ */
function StatusBadge({ status }: { status: Order['status'] }) {
  const config = {
    pending: { label: 'در انتظار', className: 'bg-amber-50 text-amber-700', Icon: Clock },
    processing: { label: 'در حال انجام', className: 'bg-blue-50 text-blue-700', Icon: Loader },
    review: { label: 'بررسی', className: 'bg-purple-50 text-purple-700', Icon: AlertCircle },
    completed: { label: 'تکمیل', className: 'bg-emerald-50 text-emerald-700', Icon: CheckCircle },
    rejected: { label: 'رد شده', className: 'bg-rose-50 text-rose-700', Icon: XCircle },
  };
  const { label, className, Icon } = config[status];
  return (
    <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${className}`}>
      <Icon size={12} />{label}
    </span>
  );
}

function Modal({ children, onClose, title }: { children: React.ReactNode; onClose: () => void; title: string }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h3 className="font-bold text-gray-800">{title}</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg"><X size={18} className="text-gray-500" /></button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

function Star(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
