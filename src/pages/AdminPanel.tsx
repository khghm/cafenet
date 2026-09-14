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
  Phone, Wifi, Database, Server, Zap, BookOpen, GraduationCap, ExternalLink,
  PlayCircle, Video, HelpCircle, Lightbulb, Bookmark, Link2, ChevronLeft,
  Monitor, MousePointer, KeyRound, FileCheck, ClipboardList, Headphones
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
    { id: 'training', label: 'آموزش ادمین', icon: GraduationCap },
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
        {activeSection === 'training' && <TrainingView services={servicesList} />}
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

/* ============ SERVICE TRAINING HELPERS ============ */
function getServiceSteps(serviceId: string): { title: string; desc: string }[] {
  const steps: Record<string, { title: string; desc: string }[]> = {
    s1: [
      { title: 'دریافت اطلاعات کاربر', desc: 'نام کامل، کد ملی و نوع آزمون (سراسری، ارشد، دکتری) را از کاربر دریافت کنید' },
      { title: 'بررسی مدارک', desc: 'عکس پرسنلی ۳×۴ جدید و تصویر کارت ملی را بررسی کنید. عکس باید بدون روتوش و با زمینه سفید باشد' },
      { title: 'ورود به سایت سنجش', desc: 'به سایت sanjesh.org مراجعه و روی لینک ثبت‌نام آزمون مورد نظر کلیک کنید' },
      { title: 'تکمیل فرم ثبت‌نام', desc: 'اطلاعات فردی، تحصیلی و محل آزمون را در فرم آنلاین وارد کنید' },
      { title: 'آپلود مدارک', desc: 'عکس پرسنلی و اسکن کارت ملی را با فرمت و حجم مشخص آپلود کنید' },
      { title: 'پرداخت هزینه', desc: 'هزینه ثبت‌نام را از طریق درگاه بانکی پرداخت کنید' },
      { title: 'دریافت کد پیگیری', desc: 'کد پیگیری ۱۲ رقمی را یادداشت و به کاربر ارائه دهید' },
    ],
    s2: [
      { title: 'دریافت اطلاعات', desc: 'نام، کد ملی و نوع درخواست (معافیت تحصیلی، تعیین وضعیت، کفالت) را دریافت کنید' },
      { title: 'ورود به سامانه وظیفه', desc: 'به سایت vazifeh.police.ir مراجعه و وارد بخش خدمات شوید' },
      { title: 'احراز هویت', desc: 'با کد ملی و شماره موبایل وارد سامانه شوید' },
      { title: 'ثبت درخواست', desc: 'نوع درخواست را انتخاب و اطلاعات لازم را وارد کنید' },
      { title: 'آپلود مدارک', desc: 'مدارک مربوطه (گواهی اشتغال به تحصیل، سند کفالت و...) را آپلود کنید' },
      { title: 'دریافت رسید', desc: 'رسید درخواست را چاپ و به کاربر ارائه دهید' },
    ],
    s3: [
      { title: 'دریافت اطلاعات', desc: 'نام، کد ملی و گروه آزمایشی را دریافت کنید' },
      { title: 'بررسی عکس', desc: 'عکس پرسنلی استاندارد را بررسی کنید' },
      { title: 'ورود به سایت سنجش', desc: 'به بخش ثبت‌نام کنکور در sanjesh.org مراجعه کنید' },
      { title: 'تکمیل فرم', desc: 'اطلاعات فردی و تحصیلی را وارد و گروه آزمایشی را انتخاب کنید' },
      { title: 'پرداخت', desc: 'هزینه ثبت‌نام را پرداخت کنید' },
      { title: 'دریافت کد', desc: 'کد پیگیری را به کاربر ارائه دهید' },
    ],
    s4: [
      { title: 'دریافت مدارک', desc: 'تصویر پشت و رو کارت ملی، شناسنامه و شماره موبایل به نام متقاضی' },
      { title: 'ورود به سامانه ثنا', desc: 'به سایت adliran.ir مراجعه و روی ثبت‌نام ثنا کلیک کنید' },
      { title: 'وارد کردن اطلاعات هویتی', desc: 'نام، کد ملی، تاریخ تولد و شماره شناسنامه را وارد کنید' },
      { title: 'آپلود مدارک', desc: 'تصویر واضح کارت ملی و شناسنامه را آپلود کنید' },
      { title: 'تأیید شماره موبایل', desc: 'کد تأیید ارسال شده به موبایل را وارد کنید' },
      { title: 'تأیید نهایی', desc: 'اطلاعات را بازبینی و تأیید نهایی کنید' },
      { title: 'دریافت رمز شخصی', desc: 'رمز شخصی ثنا را یادداشت و به کاربر ارائه دهید' },
    ],
    s5: [
      { title: 'دریافت فایل', desc: 'فایل دیجیتال (PDF، Word، تصویر) را از کاربر دریافت کنید' },
      { title: 'بررسی کیفیت', desc: 'فایل را از نظر وضوح، اندازه و کیفیت بررسی کنید' },
      { title: 'تنظیمات چاپ', desc: 'نوع چاپ (رنگی/سیاه‌وسفید)، اندازه (A4/A3) و تعداد نسخه را تنظیم کنید' },
      { title: 'پیش‌نمایش', desc: 'پیش‌نمایش چاپ را بررسی کنید' },
      { title: 'چاپ سند', desc: 'دستور چاپ را صادر کنید' },
      { title: 'کنترل کیفیت', desc: 'خروجی چاپ شده را بررسی کنید' },
      { title: 'تحویل به کاربر', desc: 'سند چاپ شده را به کاربر تحویل دهید' },
    ],
    s6: [
      { title: 'دریافت سند', desc: 'سند اصلی را به صورت فایل یا فیزیکی دریافت کنید' },
      { title: 'تعیین زبان‌ها', desc: 'زبان مبدأ و مقصد را مشخص کنید' },
      { title: 'بررسی محتوا', desc: 'محتوای سند را بررسی و تعداد کلمات را مشخص کنید' },
      { title: 'تعیین هزینه', desc: 'بر اساس تعداد کلمات و نوع ترجمه، هزینه را محاسبه کنید' },
      { title: 'ارجاع به مترجم', desc: 'سند را به مترجم رسمی متخصص در آن حوزه ارجاع دهید' },
      { title: 'انجام ترجمه', desc: 'مترجم ترجمه را انجام می‌دهد' },
      { title: 'بازبینی', desc: 'ترجمه توسط بازبین کنترل کیفیت می‌شود' },
      { title: 'مهر و امضا', desc: 'ترجمه در دفتر ترجمه رسمی مهر و امضا می‌شود' },
      { title: 'تحویل نهایی', desc: 'ترجمه رسمی را به همراه فیش هزینه به کاربر تحویل دهید' },
    ],
    s7: [
      { title: 'دریافت اطلاعات', desc: 'نام، کد ملی/شناسه ملی و نوع خدمت مالیاتی را دریافت کنید' },
      { title: 'ورود به سامانه مالیاتی', desc: 'به سایت tax.gov.ir مراجعه و وارد شوید' },
      { title: 'ثبت/پیگیری', desc: 'بسته به نوع درخواست، پرونده تشکیل یا پیگیری کنید' },
      { title: 'آپلود مدارک', desc: 'اسناد مالی و مدارک مربوطه را آپلود کنید' },
      { title: 'ارسال اظهارنامه', desc: 'اظهارنامه را نهایی و ارسال کنید' },
      { title: 'دریافت رسید', desc: 'رسید الکترونیکی را دریافت و به کاربر ارائه دهید' },
    ],
    s8: [
      { title: 'دریافت اطلاعات خودرو', desc: 'شماره پلاک، مدل و سال ساخت خودرو را دریافت کنید' },
      { title: 'بررسی بیمه‌نامه قبلی', desc: 'در صورت وجود، بیمه‌نامه قبلی را بررسی کنید' },
      { title: 'محاسبه حق بیمه', desc: 'بر اساس نوع خودرو و پوشش، حق بیمه را محاسبه کنید' },
      { title: 'انتخاب شرکت بیمه', desc: 'شرکت بیمه مورد نظر را انتخاب کنید' },
      { title: 'تکمیل فرم', desc: 'فرم بیمه‌نامه را تکمیل کنید' },
      { title: 'پرداخت', desc: 'حق بیمه را پرداخت کنید' },
      { title: 'صدور بیمه‌نامه', desc: 'بیمه‌نامه الکترونیکی را دریافت و به کاربر ارائه دهید' },
    ],
    s9: [
      { title: 'دریافت اطلاعات', desc: 'اپراتور (همراه اول/ایرانسل/رایتل)، شماره موبایل و نوع خرید را دریافت کنید' },
      { title: 'بررسی شماره', desc: 'صحت شماره موبایل و اپراتور را بررسی کنید' },
      { title: 'انتخاب بسته', desc: 'بسته شارژ یا اینترنت مورد نظر را انتخاب کنید' },
      { title: 'پرداخت', desc: 'مبلغ را از طریق درگاه پرداخت کنید' },
      { title: 'تأیید شارژ', desc: 'منتظر پیامک تأیید از اپراتور باشید' },
      { title: 'اطلاع‌رسانی', desc: 'نتیجه را به کاربر اطلاع دهید' },
    ],
    s10: [
      { title: 'دریافت اطلاعات', desc: 'نوع خدمت (گذرنامه/گواهینامه/کارت پایان خدمت/سوءپیشینه) را مشخص کنید' },
      { title: 'دریافت مدارک', desc: 'عکس پرسنلی، کارت ملی و شناسنامه را دریافت کنید' },
      { title: 'ورود به سامانه پلیس+۱۰', desc: 'به سایت police.ir مراجعه کنید' },
      { title: 'تکمیل فرم', desc: 'فرم درخواست را تکمیل کنید' },
      { title: 'پرداخت هزینه', desc: 'هزینه خدمت را پرداخت کنید' },
      { title: 'دریافت نوبت', desc: 'در صورت نیاز، نوبت حضوری دریافت کنید' },
    ],
    s11: [
      { title: 'دریافت فایل', desc: 'فایل یا تصویر متن را دریافت کنید' },
      { title: 'تعیین نوع تایپ', desc: 'نوع تایپ (ساده/فرمول‌دار/صفحه‌آرایی) را مشخص کنید' },
      { title: 'برآورد حجم', desc: 'تعداد صفحات تقریبی را مشخص کنید' },
      { title: 'انجام تایپ', desc: 'متن را تایپ و صفحه‌آرایی کنید' },
      { title: 'بازبینی', desc: 'خروجی را بازبینی کنید' },
      { title: 'تحویل', desc: 'فایل نهایی را به کاربر تحویل دهید' },
    ],
    s12: [
      { title: 'دریافت کد ملی', desc: 'کد ملی مشمول سهام عدالت را دریافت کنید' },
      { title: 'ورود به سامانه', desc: 'به سایت sahaledalat.ir مراجعه کنید' },
      { title: 'مشاهده وضعیت', desc: 'وضعیت سهام و ارزش آن را مشاهده کنید' },
      { title: 'انتخاب عملیات', desc: 'عملیات مورد نظر (مشاهده/فروش/تغییر روش) را انتخاب کنید' },
      { title: 'تأیید', desc: 'عملیات را تأیید کنید' },
      { title: 'دریافت رسید', desc: 'رسید عملیات را به کاربر ارائه دهید' },
    ],
    s18: [
      { title: 'دریافت شناسه قبض', desc: 'شناسه قبض (۶ تا ۱۳ رقم) را دریافت کنید' },
      { title: 'دریافت شناسه پرداخت', desc: 'شناسه پرداخت را دریافت کنید' },
      { title: 'ورود به سامانه', desc: 'به سامانه پرداخت قبوض مراجعه کنید' },
      { title: 'وارد کردن شناسه‌ها', desc: 'شناسه قبض و پرداخت را وارد کنید' },
      { title: 'بررسی مبلغ', desc: 'مبلغ قبض و جزئیات را بررسی کنید' },
      { title: 'پرداخت', desc: 'قبض را پرداخت کنید' },
      { title: 'ارسال رسید', desc: 'رسید پرداخت را به کاربر ارائه دهید' },
    ],
  };
  
  return steps[serviceId] || [
    { title: 'دریافت درخواست', desc: 'اطلاعات و مدارک لازم را از کاربر دریافت کنید' },
    { title: 'بررسی مدارک', desc: 'مدارک ارائه شده را از نظر صحت و کامل بودن بررسی کنید' },
    { title: 'ورود به سامانه', desc: 'به سامانه مربوطه مراجعه و با اطلاعات کاربر وارد شوید' },
    { title: 'ثبت اطلاعات', desc: 'اطلاعات را در فرم‌های سامانه وارد کنید' },
    { title: 'آپلود مدارک', desc: 'مدارک اسکن شده را در سامانه آپلود کنید' },
    { title: 'پرداخت هزینه', desc: 'هزینه خدمت را از طریق درگاه پرداخت کنید' },
    { title: 'دریافت رسید', desc: 'رسید و کد پیگیری را دریافت و به کاربر ارائه دهید' },
  ];
}

function getServiceDocuments(serviceId: string): string[] {
  const docs: Record<string, string[]> = {
    s1: ['عکس پرسنلی ۳×۴ جدید (زمینه سفید، بدون روتوش)', 'تصویر کارت ملی (پشت و رو)', 'مدرک تحصیلی آخرین مقطع', 'شماره تلفن ثابت و همراه'],
    s2: ['تصویر کارت ملی', 'گواهی اشتغال به تحصیل معتبر', 'آخرین مدرک تحصیلی'],
    s3: ['عکس پرسنلی ۳×۴', 'تصویر کارت ملی', 'مدرک پیش‌دانشگاهی یا دیپلم'],
    s4: ['تصویر واضح کارت ملی (پشت و رو)', 'تصویر صفحه اول شناسنامه', 'شماره موبایل فعال به نام متقاضی', 'کد پستی محل سکونت'],
    s5: ['فایل دیجیتال سند (PDF، Word یا تصویر با کیفیت)'],
    s6: ['سند اصلی جهت ترجمه', 'تعیین زبان مبدأ و مقصد'],
    s7: ['کد ملی یا شناسه ملی', 'اسناد و مدارک مالی سال مورد نظر', 'دفتر کل و روزنامه (برای اشخاص حقوقی)'],
    s8: ['کارت ماشین', 'بیمه‌نامه قبلی (در صورت تمدید)', 'کارت ملی مالک خودرو', 'گواهینامه رانندگی'],
    s9: ['شماره موبایل معتبر'],
    s10: ['عکس پرسنلی ۳×۴ جدید', 'تصویر کارت ملی', 'تصویر شناسنامه', 'کد پستی'],
    s11: ['فایل یا تصویر متن (خوانا و واضح)', 'فرمت خروجی مورد نظر (Word/PDF)'],
    s12: ['کد ملی مشمول سهام عدالت', 'شماره حساب بانکی به نام متقاضی'],
    s13: ['تصویر کارت ملی', 'مدرک اثبات آدرس (قبض آب/برق/گاز)', 'تصویر آخرین مدرک تحصیلی'],
    s14: ['تصویر کارت ملی', 'گواهی پزشکی (برای پوشش‌های خاص)', 'اطلاعات شغلی'],
    s15: ['فایل متن اصلی', 'تعیین زبان مبدأ و مقصد'],
    s16: ['تصویر کارت ملی', 'تصویر شناسنامه', 'عکس ۳×۴', 'آدرس و کد پستی'],
    s17: ['اطلاعات طرفین قرارداد', 'توضیحات موضوع قرارداد', 'مدارک هویتی'],
    s18: ['شناسه قبض', 'شناسه پرداخت'],
    s19: ['کد ملی یا شناسه ملی', 'مدارک مالی سال مورد نظر', 'اسناد درآمد و هزینه'],
    s20: ['تصویر کارت ملی', 'کارت ماشین یا سند خودرو'],
    s21: ['کارنامه کنکور', 'کد دسترسی انتخاب رشته'],
    s22: ['تصویر پاسپورت', 'بلیط هواپیما', 'اطلاعات سفر'],
    s23: ['تصویر کارت ملی موکل و وکیل', 'توضیحات موضوع وکالت'],
    s24: ['تصویر کارت ملی', 'آدرس و کد پستی'],
    s25: ['نیازمندی‌های سایت', 'محتوای اولیه', 'لوگو و تصاویر'],
    s26: ['فایل نهایی', 'نوع صحافی مورد نظر'],
    s27: ['کد ملی سرپرست خانوار'],
    s28: ['تصویر کارت ملی', 'فیش حقوقی یا مدارک درآمدی', 'سند ملکی (برای وام مسکن)'],
    s29: ['تصویر سند ملک', 'متراژ و مشخصات ملک'],
    s30: ['فایل متن', 'زبان مقصد', 'زمان تحویل مورد نظر'],
    s31: ['گواهی فوت', 'تصویر شناسنامه متوفی', 'اطلاعات وراث'],
    s32: ['تصویر کارت ملی', 'نوع فرم مورد نظر'],
    s33: ['شماره موبایل', 'شناسه قبض'],
    s34: ['شناسه ملی شرکت', 'اسناد مالی فصل'],
    s35: ['تصویر کارت ملی', 'تصویر شناسنامه', 'عکس ۳×۴'],
    s36: ['تصویر شناسنامه دانش‌آموز', 'کد ملی', 'کارنامه سال قبل'],
    s37: ['کارت ماشین', 'بیمه‌نامه قبلی', 'کارت ملی'],
    s38: ['تصویر کارت ملی شاکی', 'مدارک و مستندات'],
    s39: ['شماره تلفن ثابت', 'کد پستی', 'تصویر کارت ملی'],
    s40: ['نام دامنه', 'نام کاربری مورد نظر'],
    s41: ['فایل طرح با کیفیت', 'ابعاد و تعداد'],
    s42: ['تعیین خدمت', 'تاریخ و ساعت مراجعه'],
  };
  return docs[serviceId] || [];
}

function getServiceNotes(serviceId: string): string[] {
  const notes: Record<string, string[]> = {
    s1: [
      'عکس باید جدید، ۳×۴ و با زمینه سفید باشد',
      'حجم فایل عکس نباید بیشتر از ۲۰۰ کیلوبایت باشد',
      'کد پیگیری ۱۲ رقمی را حتماً یادداشت کنید',
      'مهلت ثبت‌نام را چک کنید و قبل از پایان اقدام کنید',
      'در صورت خطا در اطلاعات، امکان ویرایش تا مهلت وجود دارد',
    ],
    s2: [
      'درخواست معافیت تحصیلی فقط برای دانشجویان فعال مجاز است',
      'مدارک باید واضح و خوانا باشند',
      'پاسخ درخواست معمولاً ظرف ۷۲ ساعت صادر می‌شود',
      'در صورت نیاز به مراجعه حضوری، نوبت بگیرید',
    ],
    s3: [
      'گروه آزمایشی قابل تغییر نیست، دقت کنید',
      'عکس باید مطابق با استانداردهای سنجش باشد',
      'کد پیگیری را تا زمان اعلام نتایج نگهداری کنید',
    ],
    s4: [
      'شماره موبایل حتماً باید به نام متقاضی باشد',
      'احراز هویت حضوری نیز ممکن است لازم باشد',
      'فرآیند ثبت‌نام ممکن است تا ۷۲ ساعت طول بکشد',
      'رمز شخصی ثنا را محرمانه نگهداری کنید',
      'پس از ثبت‌نام، ابلاغیه‌های قضایی به صورت الکترونیکی ارسال می‌شود',
    ],
    s5: [
      'فایل‌های PDF بهترین کیفیت چاپ را دارند',
      'برای چاپ رنگی، فایل باید با رزولوشن حداقل ۳۰۰dpi باشد',
      'قبل از چاپ انبوه، یک نمونه چاپ کنید',
    ],
    s6: [
      'ترجمه رسمی دارای مهر و امضای مترجم قوه قضاییه است',
      'زمان تحویل بسته به حجم و تخصص سند متغیر است (معمولاً ۲۴ تا ۷۲ ساعت)',
      'امکان ترجمه فوری با هزینه اضافی وجود دارد',
      'ترجمه رسمی برای ارائه به سفارت‌خانه‌ها و مؤسسات بین‌المللی معتبر است',
    ],
    s7: [
      'اظهارنامه مالیاتی باید تا پایان خرداد هر سال ارسال شود',
      'جریمه تأخیر در ارسال اظهارنامه سنگین است',
      'مدارک مالی باید حداقل ۱۰ سال نگهداری شوند',
    ],
    s8: [
      'بیمه‌نامه الکترونیکی به جای بیمه‌نامه کاغذی صادر می‌شود',
      'تخفیف عدم خسارت سال‌های قبل منتقل می‌شود',
      'در صورت فروش خودرو، بیمه‌نامه قابل انتقال است',
    ],
    s9: [
      'شارژ بلافاصله پس از پرداخت اعمال می‌شود',
      'در صورت عدم اعمال، تا ۲۴ ساعت صبر کنید',
      'بسته‌های اینترنت معمولاً از زمان فعال‌سازی محاسبه می‌شوند',
      'در صورت بروز مشکل، با پشتیبانی تماس بگیرید',
    ],
    s10: [
      'عکس باید مطابق با استاندارد پلیس+۱۰ باشد',
      'برای گذرنامه، مراجعه حضوری جهت انگشت‌نگاری الزامی است',
      'صدور گذرنامه معمولاً ۱۰ روز کاری طول می‌کشد',
    ],
    s11: [
      'تایپ فرمول‌دار هزینه بیشتری دارد',
      'صفحه‌آرایی پایان‌نامه باید مطابق با فرمت دانشگاه باشد',
      'فایل نهایی را حتماً بازبینی کنید',
    ],
    s12: [
      'فروش سهام عدالت فقط از طریق بانک‌های مجاز امکان‌پذیر است',
      'سود سهام عدالت سالانه به حساب مشمولان واریز می‌شود',
    ],
    s18: [
      'قبل از پرداخت، مبلغ و نوع قبض را بررسی کنید',
      'رسید پرداخت را تا پایان دوره نگهداری کنید',
      'در صورت قطع خدمات، ابتدا قبض‌های معوقه را پرداخت کنید',
    ],
    s19: [
      'اظهارنامه باید تا پایان تیرماه ارسال شود',
      'عدم ارسال به موقع موجب جریمه می‌شود',
      'اسناد مالی باید منظم و قابل ردیابی باشند',
    ],
    s28: [
      'ضامن معتبر برای اکثر وام‌ها الزامی است',
      'مدارک درآمدی باید رسمی و قابل تأیید باشند',
      'بررسی و پرداخت وام معمولاً ۲ تا ۴ هفته طول می‌کشد',
    ],
  };
  
  return notes[serviceId] || [
    'مدارک باید واضح و خوانا باشند',
    'اطلاعات وارد شده باید با مدارک مطابقت داشته باشد',
    'در صورت بروز مشکل، با پشتیبانی تماس بگیرید',
    'کد پیگیری را تا اتمام فرآیند نگهداری کنید',
  ];
}

/* ============ TRAINING VIEW ============ */
function TrainingView({ services }: { services: Service[] }) {
  const [activeTab, setActiveTab] = useState<'tutorials' | 'resources' | 'services'>('tutorials');
  const [expandedGuide, setExpandedGuide] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [bookmarkedSites, setBookmarkedSites] = useState<Set<string>>(new Set());
  const [showBookmarkedOnly, setShowBookmarkedOnly] = useState(false);
  const [expandedService, setExpandedService] = useState<string | null>(null);

  const tutorials = [
    {
      id: 'getting-started',
      title: 'راهنمای شروع سریع',
      icon: PlayCircle,
      color: 'from-blue-500 to-blue-600',
      description: 'آشنایی اولیه با پنل مدیریت و امکانات آن',
      steps: [
        { title: 'ورود به پنل', desc: 'با نام کاربری و رمز عبور مدیر وارد پنل شوید. پس از ورود، داشبورد اصلی نمایش داده می‌شود.' },
        { title: 'آشنایی با داشبورد', desc: 'داشبورد شامل نمای کلی از درآمد روزانه، تعداد سفارش‌ها، کاربران فعال و نرخ تبدیل است. نمودارهای درآمد و توزیع سفارش‌ها در این بخش قابل مشاهده هستند.' },
        { title: 'ناوبری در منو', desc: 'از منوی سمت راست می‌توانید به بخش‌های مختلف شامل سفارش‌ها، کاربران، خدمات، مالی، پشتیبانی، تحلیل و تنظیمات دسترسی پیدا کنید.' },
        { title: 'شخصی‌سازی', desc: 'از بخش تنظیمات می‌توانید نام پلتفرم، اطلاعات تماس، تنظیمات امنیتی و سرویس‌های متصل را مدیریت کنید.' },
      ]
    },
    {
      id: 'orders-management',
      title: 'مدیریت سفارش‌ها',
      icon: ClipboardList,
      color: 'from-emerald-500 to-emerald-600',
      description: 'نحوه مدیریت، پیگیری و تخصیص سفارش‌ها',
      steps: [
        { title: 'مشاهده لیست سفارش‌ها', desc: 'در بخش سفارش‌ها، تمام سفارش‌های ثبت شده با جزئیات شامل کد رهگیری، خدمت، مشتری، وضعیت، اولویت و اپراتور تخصیص یافته نمایش داده می‌شوند.' },
        { title: 'فیلتر و جستجو', desc: 'می‌توانید سفارش‌ها را بر اساس وضعیت (در انتظار، در حال انجام، بررسی، تکمیل، رد شده) فیلتر کنید و با جستجوی کد رهگیری یا نام مشتری، سفارش مورد نظر را پیدا کنید.' },
        { title: 'تغییر وضعیت سفارش', desc: 'با کلیک روی آیکون تیک، می‌توانید وضعیت سفارش را تغییر دهید. همچنین از جزئیات سفارش می‌توانید آن را به حالت در حال انجام، تکمیل یا رد شده تغییر دهید.' },
        { title: 'تخصیص اپراتور', desc: 'از منوی کشویی در هر ردیف، می‌توانید سفارش را به اپراتور مورد نظر تخصیص دهید. این کار باعث می‌شود اپراتور مربوطه اعلان دریافت کند.' },
        { title: 'مشاهده جزئیات', desc: 'با کلیک روی آیکون چشم، پنجره جزئیات سفارش باز می‌شود که شامل تمام اطلاعات، پیشرفت و امکان تغییر سریع وضعیت است.' },
      ]
    },
    {
      id: 'users-management',
      title: 'مدیریت کاربران',
      icon: Users,
      color: 'from-purple-500 to-purple-600',
      description: 'افزودن، ویرایش و مدیریت کاربران و نقش‌ها',
      steps: [
        { title: 'مشاهده کاربران', desc: 'لیست تمام کاربران با اطلاعات نام، موبایل، نقش، وضعیت و تاریخ عضویت نمایش داده می‌شود.' },
        { title: 'افزودن کاربر جدید', desc: 'با کلیک روی دکمه «کاربر جدید»، فرم افزودن کاربر باز می‌شود. نام، شماره موبایل، ایمیل و نقش کاربر را وارد کنید.' },
        { title: 'ویرایش کاربر', desc: 'با کلیک روی آیکون ویرایش، می‌توانید اطلاعات کاربر را تغییر دهید. نقش کاربر (عادی، اپراتور، مدیر) قابل تغییر است.' },
        { title: 'تغییر وضعیت', desc: 'با کلیک روی دکمه وضعیت (فعال/غیرفعال)، می‌توانید دسترسی کاربر را فعال یا غیرفعال کنید.' },
        { title: 'حذف کاربر', desc: 'با کلیک روی آیکون حذف، کاربر از سیستم حذف می‌شود. این عملیات غیرقابل بازگشت است.' },
        { title: 'مدیریت نقش‌ها', desc: 'سه نقش اصلی تعریف شده: کاربر عادی (فقط ثبت سفارش)، اپراتور (پردازش سفارش‌ها) و مدیر (دسترسی کامل به پنل).' },
      ]
    },
    {
      id: 'services-management',
      title: 'مدیریت خدمات',
      icon: Globe,
      color: 'from-amber-500 to-amber-600',
      description: 'افزودن، ویرایش و فعال‌سازی خدمات',
      steps: [
        { title: 'مشاهده خدمات', desc: 'تمام خدمات فعال و غیرفعال در قالب کارت نمایش داده می‌شوند. هر کارت شامل آیکون، عنوان، توضیحات، قیمت و وضعیت است.' },
        { title: 'افزودن خدمت جدید', desc: 'با کلیک روی «خدمت جدید»، فرم افزودن خدمت باز می‌شود. عنوان، توضیحات، دسته‌بندی، آیکون، قیمت و زمان تحویل را وارد کنید.' },
        { title: 'ویرایش خدمت', desc: 'با کلیک روی آیکون ویرایش، می‌توانید عنوان، توضیحات، قیمت و زمان تحویل خدمت را تغییر دهید.' },
        { title: 'فعال/غیرفعال کردن', desc: 'با کلیک روی دکمه وضعیت، خدمت را فعال یا غیرفعال کنید. خدمات غیرفعال در لیست خدمات کاربران نمایش داده نمی‌شوند.' },
        { title: 'حذف خدمت', desc: 'با کلیک روی آیکون حذف، خدمت از سیستم حذف می‌شود. سفارش‌های قبلی این خدمت حفظ می‌شوند.' },
        { title: 'دسته‌بندی خدمات', desc: 'خدمات در دسته‌بندی‌های دولتی، آموزشی، مالی، حقوقی، چاپ، دیجیتال و ارتباطات سازماندهی شده‌اند.' },
      ]
    },
    {
      id: 'finance-management',
      title: 'مدیریت مالی',
      icon: CreditCard,
      color: 'from-rose-500 to-rose-600',
      description: 'مشاهده تراکنش‌ها، تسویه و گزارش‌های مالی',
      steps: [
        { title: 'نمای کلی مالی', desc: 'در بالای بخش مالی، چهار شاخص کلیدی شامل درآمد ماهانه، تسویه در انتظار، بازگشت وجه و کمیسیون اپراتورها نمایش داده می‌شود.' },
        { title: 'لیست تراکنش‌ها', desc: 'تمام تراکنش‌ها شامل شناسه، شرح، نوع (دریافتی/پرداختی/بازگشت)، مبلغ، وضعیت و تاریخ نمایش داده می‌شوند.' },
        { title: 'تأیید تراکنش', desc: 'تراکنش‌های در انتظار با دکمه «تأیید» قابل تأیید هستند. پس از تأیید، وضعیت به موفق تغییر می‌کند.' },
        { title: 'تسویه با اپراتورها', desc: 'کمیسیون اپراتورها به صورت خودکار محاسبه و در بخش مالی نمایش داده می‌شود. تسویه می‌تواند دستی یا خودکار باشد.' },
        { title: 'گزارش‌گیری', desc: 'از بخش تحلیل و گزارش می‌توانید گزارش‌های مالی مفصل شامل درآمد روزانه، ماهانه و سالانه دریافت کنید.' },
      ]
    },
    {
      id: 'support-management',
      title: 'مدیریت پشتیبانی',
      icon: Headphones,
      color: 'from-cyan-500 to-cyan-600',
      description: 'پاسخگویی به تیکت‌ها و مدیریت پشتیبانی',
      steps: [
        { title: 'مشاهده تیکت‌ها', desc: 'لیست تمام تیکت‌های پشتیبانی با عنوان، کاربر، اولویت و وضعیت نمایش داده می‌شود.' },
        { title: 'پاسخ به تیکت', desc: 'با کلیک روی هر تیکت، مکالمه آن باز می‌شود. می‌توانید پاسخ خود را تایپ و ارسال کنید.' },
        { title: 'تغییر وضعیت تیکت', desc: 'از منوی کشویی در بالای مکالمه، می‌توانید وضعیت تیکت را به باز، در حال بررسی، پاسخ داده شده یا بسته تغییر دهید.' },
        { title: 'اولویت‌بندی', desc: 'تیکت‌ها دارای سه سطح اولویت (بالا، متوسط، کم) هستند. تیکت‌های با اولویت بالا باید سریع‌تر پاسخ داده شوند.' },
        { title: 'آمار پشتیبانی', desc: 'تعداد تیکت‌های باز، در حال بررسی و بسته شده در بالای بخش پشتیبانی نمایش داده می‌شود.' },
      ]
    },
    {
      id: 'analytics',
      title: 'تحلیل و گزارش‌ها',
      icon: BarChart3,
      color: 'from-indigo-500 to-indigo-600',
      description: 'مشاهده نمودارها، آمار و خروجی گزارش',
      steps: [
        { title: 'نمودار سفارش‌ها', desc: 'نمودار روند سفارش‌های ۳۰ روز اخیر به صورت ستونی نمایش داده می‌شود.' },
        { title: 'رضایت مشتریان', desc: 'نمودار دایره‌ای رضایت مشتریان با درصد‌های عالی، خوب، متوسط و ضعیف نمایش داده می‌شود.' },
        { title: 'عملکرد اپراتورها', desc: 'لیست اپراتورها با تعداد سفارش‌ها، میانگین زمان پاسخ و امتیاز رضایت نمایش داده می‌شود.' },
        { title: 'سلامت سیستم', desc: 'وضعیت سرورها، دیتابیس، درگاه پرداخت، سرویس پیامک و ذخیره‌سازی با میزان آپ‌تایم نمایش داده می‌شود.' },
        { title: 'خروجی گزارش', desc: 'گزارش‌های فروش ماهانه، کاربران، سفارش‌ها و مالی قابل دانلود هستند.' },
      ]
    },
    {
      id: 'settings',
      title: 'تنظیمات سیستم',
      icon: Settings,
      color: 'from-gray-500 to-gray-700',
      description: 'پیکربندی عمومی، امنیتی و سرویس‌های متصل',
      steps: [
        { title: 'تنظیمات عمومی', desc: 'نام پلتفرم، توضیحات، شماره تماس و ایمیل پشتیبانی را می‌توانید در این بخش تغییر دهید.' },
        { title: 'تنظیمات امنیتی', desc: 'احراز هویت دو مرحله‌ای، رمزنگاری مدارک، لاگ فعالیت‌ها، محدودیت نشست و تشخیص ناهنجاری از تنظیمات امنیتی هستند.' },
        { title: 'مدیریت شعبه‌ها', desc: 'می‌توانید شعبه‌های مختلف را اضافه، ویرایش یا حذف کنید. هر شعبه دارای آمار سفارش‌های خود است.' },
        { title: 'سرویس‌های متصل', desc: 'وضعیت اتصال به درگاه پرداخت، سرویس پیامک، API دولت هوشمند، سرویس ایمیل و فضای ابری نمایش داده می‌شود.' },
        { title: 'تنظیمات اعلان', desc: 'اعلان‌های پیامکی، ایمیلی و درون‌برنامه‌ای را می‌توانید فعال یا غیرفعال کنید.' },
      ]
    },
  ];

  const resourceCategories = [
    {
      id: 'government',
      title: 'سایت‌های دولتی و اداری',
      icon: Building2,
      color: 'bg-blue-50 border-blue-200',
      iconColor: 'text-blue-600',
      sites: [
        { name: 'سامانه ثنا (قوه قضاییه)', url: 'https://adliran.ir', desc: 'ثبت‌نام و احراز هویت در سامانه ابلاغ الکترونیک قضایی' },
        { name: 'سامانه ثبت‌نام آزمون‌های سراسری', url: 'https://sanjesh.org', desc: 'سازمان سنجش آموزش کشور - ثبت‌نام کنکور و آزمون‌ها' },
        { name: 'سامانه نظام وظیفه', url: 'https://vazifeh.police.ir', desc: 'امور نظام وظیفه عمومی - معافیت تحصیلی و تعیین وضعیت' },
        { name: 'سامانه پلیس +۱۰', url: 'https://police.ir', desc: 'خدمات گذرنامه، گواهینامه و کارت پایان خدمت' },
        { name: 'سامانه سازمان امور مالیاتی', url: 'https://tax.gov.ir', desc: 'تشکیل پرونده مالیاتی و ارسال اظهارنامه' },
        { name: 'سامانه تأمین اجتماعی', url: 'https://tamin.ir', desc: 'خدمات بیمه‌ای و بازنشستگی تأمین اجتماعی' },
        { name: 'سامانه بیمه سلامت', url: 'https://bimehsalamat.ir', desc: 'بیمه سلامت ایرانیان و خدمات درمانی' },
        { name: 'سامانه سهام عدالت', url: 'https://sahamedalat.ir', desc: 'مشاهده و مدیریت سهام عدالت' },
        { name: 'سامانه ثبت احوال', url: 'https://sabteahval.ir', desc: 'خدمات ثبت احوال و صدور شناسنامه' },
        { name: 'سامانه دولت الکترونیک', url: 'https://iran.gov.ir', desc: 'پنجره ملی خدمات دولت هوشمند' },
        { name: 'سامانه یارانه و کالابرگ', url: 'https://yaraneh.gov.ir', desc: 'مشاهده وضعیت یارانه و کالابرگ الکترونیک' },
        { name: 'سامانه املاک و مستغلات', url: 'https://amlak.mrud.ir', desc: 'ثبت و پیگیری املاک و مستغلات' },
        { name: 'سامانه ثبت شرکت‌ها', url: 'https://irsherkat.ssaa.ir', desc: 'ثبت و تغییرات شرکت‌ها و مؤسسات' },
        { name: 'سامانه تجارت', url: 'https://ntsw.ir', desc: 'سامانه جامع تجارت - واردات و صادرات' },
        { name: 'سامانه کد پستی', url: 'https://gnb.post.ir', desc: 'استعلام و دریافت کد پستی' },
        { name: 'سامانه پست', url: 'https://tracking.post.ir', desc: 'پیگیری مرسولات پستی' },
        { name: 'سامانه نیروی انتظامی', url: 'https://rahvar120.ir', desc: 'خدمات راهور و تخلفات رانندگی' },
        { name: 'سامانه خلافی خودرو', url: 'https://rahvar120.ir', desc: 'مشاهده و پرداخت خلافی خودرو' },
        { name: 'سامانه عوارض شهرداری', url: 'https://tehran.ir', desc: 'پرداخت عوارض نوسازی و پسماند' },
        { name: 'سامانه آب و فاضلاب', url: 'https://abfa.ir', desc: 'مشاهده و پرداخت قبض آب' },
        { name: 'سامانه برق', url: 'https://tavanir.org.ir', desc: 'مشاهده و پرداخت قبض برق' },
        { name: 'سامانه گاز', url: 'https://nigc.ir', desc: 'مشاهده و پرداخت قبض گاز' },
        { name: 'سامانه مخابرات', url: 'https://tci.ir', desc: 'مشاهده و پرداخت قبض تلفن ثابت' },
        { name: 'سامانه سازمان بازرسی', url: 'https://sazmanbazresi.ir', desc: 'ثبت شکایات و گزارش‌های بازرسی' },
        { name: 'سامانه دیوان عدالت اداری', url: 'https://divan-edalat.ir', desc: 'ثبت دادخواست در دیوان عدالت اداری' },
        { name: 'سامانه سازمان تعزیرات', url: 'https://tazirat.gov.ir', desc: 'ثبت شکایات تعزیراتی' },
        { name: 'سامانه سازمان حمایت', url: 'https://taazirat135.ir', desc: 'گزارش تخلفات و گران‌فروشی' },
        { name: 'سامانه وزارت کار', url: 'https://mcls.gov.ir', desc: 'خدمات وزارت کار و امور اجتماعی' },
        { name: 'سامانه کاریابی', url: 'https://kar.mcls.gov.ir', desc: 'ثبت‌نام و کاریابی الکترونیکی' },
        { name: 'سامانه بیمه بیکاری', url: 'https://bimehbikari.mcls.gov.ir', desc: 'ثبت درخواست بیمه بیکاری' },
        { name: 'سامانه وزارت بهداشت', url: 'https://behdasht.gov.ir', desc: 'خدمات وزارت بهداشت و درمان' },
        { name: 'سامانه غذا و دارو', url: 'https://fda.gov.ir', desc: 'استعلام مجوزهای غذا و دارو' },
        { name: 'سامانه واکسیناسیون', url: 'https://vcr.salamat.gov.ir', desc: 'کارت واکسیناسیون الکترونیک' },
        { name: 'سامانه نسخه الکترونیک', url: 'https://tamin.ir/Content3/News/Show/16534', desc: 'دریافت نسخه الکترونیکی' },
        { name: 'سامانه وزارت راه', url: 'https://rmto.ir', desc: 'خدمات وزارت راه و شهرسازی' },
        { name: 'سامانه مسکن', url: 'https://mehr housing.mrud.ir', desc: 'ثبت‌نام مسکن ملی و مهر' },
        { name: 'سامانه وام مسکن', url: 'https://bank-maskan.ir', desc: 'درخواست وام مسکن' },
        { name: 'سامانه وزارت جهاد کشاورزی', url: 'https://maj.ir', desc: 'خدمات وزارت جهاد کشاورزی' },
        { name: 'سامانه نظام مهندسی', url: 'https://iran-eng.ir', desc: 'سازمان نظام مهندسی ساختمان' },
        { name: 'سامانه کانون وکلا', url: 'https://kanoon-vokala.ir', desc: 'کانون وکلای دادگستری' },
        { name: 'سامانه قوه قضاییه', url: 'https:// judiciary.ir', desc: 'پورتال قوه قضاییه' },
        { name: 'سامانه سازمان زندان‌ها', url: 'https://prison.ir', desc: 'ملاقات زندانیان و پیگیری' },
        { name: 'سامانه سازمان اوقاف', url: 'https://awqaf.ir', desc: 'خدمات سازمان اوقاف و امور خیریه' },
        { name: 'سامانه حج و زیارت', url: 'https://haj.ir', desc: 'ثبت‌نام کاروان‌های حج و زیارت' },
        { name: 'سامانه هلال احمر', url: 'https://rcs.ir', desc: 'خدمات هلال احمر و امداد' },
        { name: 'سامانه سازمان محیط زیست', url: 'https://doe.ir', desc: 'خدمات سازمان حفاظت محیط زیست' },
        { name: 'سامانه میراث فرهنگی', url: 'https://chtb.ir', desc: 'سازمان میراث فرهنگی و گردشگری' },
        { name: 'سامانه وزارت ورزش', url: 'https://moss.gov.ir', desc: 'خدمات وزارت ورزش و جوانان' },
        { name: 'سامانه سازمان جوانان', url: 'https://youth.gov.ir', desc: 'خدمات سازمان ملی جوانان' },
        { name: 'سامانه بنیاد شهید', url: 'https://bonyadshahid.ir', desc: 'خدمات بنیاد شهید و ایثارگران' },
        { name: 'سامانه بهزیستی', url: 'https://behziستی.ir', desc: 'خدمات سازمان بهزیستی' },
        { name: 'سامانه کمیته امداد', url: 'https://emdad.ir', desc: 'خدمات کمیته امداد امام خمینی' },
        { name: 'سامانه سازمان تبلیغات', url: 'https://sazman.ir', desc: 'سازمان تبلیغات اسلامی' },
        { name: 'سامانه فرهنگستان زبان', url: 'https://persianacademy.ir', desc: 'فرهنگستان زبان و ادب فارسی' },
        { name: 'سامانه کتابخانه ملی', url: 'https://nlai.ir', desc: 'کتابخانه ملی جمهوری اسلامی' },
        { name: 'سامانه صدا و سیما', url: 'https://irib.ir', desc: 'سازمان صدا و سیمای جمهوری اسلامی' },
        { name: 'سامانه خبرگزاری ایرنا', url: 'https://irna.ir', desc: 'خبرگزاری جمهوری اسلامی' },
        { name: 'سامانه شهرداری تهران', url: 'https://tehran.ir', desc: 'خدمات شهرداری تهران' },
        { name: 'سامانه ۱۳۷', url: 'https://137.tehran.ir', desc: 'سامانه رسیدگی به شکایات شهری' },
        { name: 'سامانه نوسازی', url: 'https://nvsazi.tehran.ir', desc: 'سازمان نوسازی تهران' },
        { name: 'سامانه ثبت اختراع', url: 'https://ipm.ssaa.ir', desc: 'ثبت اختراع و مالکیت صنعتی' },
        { name: 'سامانه کپی‌رایت', url: 'https://copyright.ir', desc: 'ثبت آثار ادبی و هنری' },
        { name: 'سامانه استاندارد', url: 'https://standard.inso.ir', desc: 'سازمان استاندارد ایران' },
        { name: 'سامانه گمرک', url: 'https://irica.gov.ir', desc: 'گمرک جمهوری اسلامی ایران' },
        { name: 'سامانه قرنطینه', url: 'https://quarantine.ir', desc: 'قرنطینه نباتی و دامی' },
        { name: 'سامانه دامپزشکی', url: 'https://ivo.ir', desc: 'سازمان دامپزشکی کشور' },
        { name: 'سامانه جهاد دانشگاهی', url: 'https://isc.ac', desc: 'جهاد دانشگاهی' },
        { name: 'سامانه پژوهشگاه رویان', url: 'https://royaninstitute.org', desc: 'پژوهشگاه رویان' },
        { name: 'سامانه انرژی اتمی', url: 'https://aeoi.gov.ir', desc: 'سازمان انرژی اتمی ایران' },
        { name: 'سامانه فضایی', url: 'https://isa.ir', desc: 'آژانس فضایی ایران' },
        { name: 'سامانه هواشناسی', url: 'https://irimo.ir', desc: 'سازمان هواشناسی کشور' },
        { name: 'سامانه زلزله', url: 'https://iiees.ac.ir', desc: 'موسسه ژئوفیزیک دانشگاه تهران' },
        { name: 'سامانه آب و خاک', url: 'https://wrm.ir', desc: 'موسسه تحقیقات آب و خاک' },
        { name: 'سامانه جنگل‌ها', url: 'https://frw.ir', desc: 'موسسه تحقیقات جنگل‌ها و مراتع' },
      ]
    },
    {
      id: 'education',
      title: 'سایت‌های آموزشی و دانشگاهی',
      icon: GraduationCap,
      color: 'bg-purple-50 border-purple-200',
      iconColor: 'text-purple-600',
      sites: [
        { name: 'سازمان سنجش آموزش کشور', url: 'https://sanjesh.org', desc: 'ثبت‌نام و نتایج آزمون‌های سراسری، ارشد و دکتری' },
        { name: 'وزارت علوم، تحقیقات و فناوری', url: 'https://msrt.ir', desc: 'اطلاعات دانشگاه‌ها و امور آموزشی' },
        { name: 'سامانه آموزش عالی', url: 'https://sanjesh.org', desc: 'ثبت‌نام و انتخاب رشته دانشگاه‌ها' },
        { name: 'سامانه مرکز سنجش پزشکی', url: 'https://sanjeshp.ir', desc: 'آزمون‌های علوم پزشکی و تخصص' },
        { name: 'سامانه دانشگاه آزاد', url: 'https://azmoon.org', desc: 'ثبت‌نام و امور آموزشی دانشگاه آزاد' },
        { name: 'سامانه آموزش و پرورش', url: 'https://medu.ir', desc: 'خدمات آموزش و پرورش و ثبت‌نام مدارس' },
        { name: 'سامانه پژوهشگاه علوم انسانی', url: 'https://ihcs.ac.ir', desc: 'آزمون‌های تحصیلات تکمیلی علوم انسانی' },
        { name: 'سامانه دانشگاه تهران', url: 'https://ut.ac.ir', desc: 'پورتال دانشگاه تهران' },
        { name: 'سامانه دانشگاه شریف', url: 'https://sharif.edu', desc: 'پورتال دانشگاه صنعتی شریف' },
        { name: 'سامانه دانشگاه امیرکبیر', url: 'https://aut.ac.ir', desc: 'پورتال دانشگاه صنعتی امیرکبیر' },
        { name: 'سامانه وزارت بهداشت (آموزش)', url: 'https://edc.behdasht.gov.ir', desc: 'معاونت آموزشی وزارت بهداشت' },
        { name: 'سامانه سجاد', url: 'https://sajjad.org', desc: 'سامانه خدمات دانشجویی' },
        { name: 'سامانه پژوهشیار', url: 'https://pajouheshyar.msrt.ir', desc: 'سامانه ثبت پایان‌نامه و پژوهش' },
        { name: 'سامانه علوم پزشکی', url: 'https://behdasht.gov.ir', desc: 'وزارت بهداشت، درمان و آموزش پزشکی' },
        { name: 'سامانه دانشگاه پیام نور', url: 'https://pnu.ac.ir', desc: 'دانشگاه پیام نور' },
        { name: 'سامانه دانشگاه غیرانتفاعی', url: 'https://nonprofit.msrt.ir', desc: 'دفتر گسترش دانشگاه‌های غیرانتفاعی' },
      ]
    },
    {
      id: 'financial',
      title: 'سایت‌های بیمه و مالی',
      icon: CreditCard,
      color: 'bg-emerald-50 border-emerald-200',
      iconColor: 'text-emerald-600',
      sites: [
        { name: 'بیمه مرکزی ایران', url: 'https://centinsu.co.ir', desc: 'سازمان بیمه مرکزی - نظارت بر صنعت بیمه' },
        { name: 'بیمه ایران', url: 'https://iraninsurance.ir', desc: 'صدور و تمدید بیمه‌نامه‌های شخص ثالث و بدنه' },
        { name: 'سامانه بیمه‌نامه شخص ثالث', url: 'https://bimeh.com', desc: 'مقایسه و خرید آنلاین بیمه‌نامه' },
        { name: 'سامانه بیمه دات کام', url: 'https://bime.com', desc: 'خرید آنلاین انواع بیمه‌نامه' },
        { name: 'فرابورس ایران', url: 'https://ifb.ir', desc: 'اطلاعات بازار فرابورس و سهام' },
        { name: 'بورس اوراق بهادار تهران', url: 'https://tse.ir', desc: 'اطلاعات بازار بورس و معاملات' },
        { name: 'سامانه سجام', url: 'https://sejam.ir', desc: 'ثبت‌نام در سامانه جامع اطلاعات مشتریان' },
        { name: 'بیمه آسیا', url: 'https://asiainsurance.ir', desc: 'شرکت بیمه آسیا' },
        { name: 'بیمه دانا', url: 'https://dana.ir', desc: 'شرکت بیمه دانا' },
        { name: 'بیمه پاسارگاد', url: 'https://bpi.ir', desc: 'شرکت بیمه پاسارگاد' },
        { name: 'بیمه معلم', url: 'https://moalleminsurance.ir', desc: 'شرکت بیمه معلم' },
        { name: 'بیمه کوثر', url: 'https://kosarinsurance.ir', desc: 'شرکت بیمه کوثر' },
        { name: 'بیمه سامان', url: 'https://samansurance.ir', desc: 'شرکت بیمه سامان' },
        { name: 'بیمه پارسیان', url: 'https://parsianinsurance.ir', desc: 'شرکت بیمه پارسیان' },
        { name: 'بیمه ملت', url: 'https://melinsurance.ir', desc: 'شرکت بیمه ملت' },
        { name: 'سامانه بیمه‌نامه الکترونیک', url: 'https://centinsu.co.ir', desc: 'استعلام بیمه‌نامه‌های الکترونیک' },
        { name: 'بانک مرکزی', url: 'https://cbi.ir', desc: 'بانک مرکزی جمهوری اسلامی ایران' },
        { name: 'سامانه شتاب', url: 'https://shaparak.ir', desc: 'شبکه الکترونیکی پرداخت کارتی' },
        { name: 'سامانه صیاد', url: 'https://sayad24.ir', desc: 'ثبت و استعلام چک‌های صیادی' },
        { name: 'سامانه نیما', url: 'https://nima.co.ir', desc: 'سامانه معاملات ارزی' },
      ]
    },
    {
      id: 'payment',
      title: 'درگاه‌های پرداخت',
      icon: CreditCard,
      color: 'bg-amber-50 border-amber-200',
      iconColor: 'text-amber-600',
      sites: [
        { name: 'زرین‌پال', url: 'https://zarinpal.com', desc: 'درگاه پرداخت آنلاین - محبوب‌ترین درگاه ایرانی' },
        { name: 'آیدی‌پی', url: 'https://idpay.ir', desc: 'درگاه پرداخت و خدمات مالی' },
        { name: 'پی‌پینگ', url: 'https://payping.ir', desc: 'درگاه پرداخت و صدور فاکتور' },
        { name: 'نکست‌پی', url: 'https://nextpay.ir', desc: 'درگاه پرداخت آنلاین' },
        { name: 'پی‌آفیس', url: 'https://payoffice.ir', desc: 'درگاه پرداخت و خدمات مالی' },
        { name: 'سامان کیش', url: 'https://samankish.com', desc: 'درگاه پرداخت بانکی سامان' },
        { name: 'پارسیان پال', url: 'https://parsianpal.com', desc: 'درگاه پرداخت بانک پارسیان' },
        { name: 'آسان‌پرداخت', url: 'https://asanpardakht.ir', desc: 'درگاه پرداخت آسان‌پرداخت' },
        { name: 'به‌پرداخت ملت', url: 'https://behpardakht.com', desc: 'درگاه پرداخت بانک ملت' },
        { name: 'پرداخت نوین آرین', url: 'https://pna.co.ir', desc: 'درگاه پرداخت نوین آرین' },
        { name: 'کارت‌به‌کارت', url: 'https://cartbeCart.ir', desc: 'سرویس کارت به کارت' },
        { name: 'پی‌استار', url: 'https://paystar.ir', desc: 'درگاه پرداخت پی‌استار' },
        { name: 'وندار', url: 'https://vandar.io', desc: 'درگاه پرداخت وندار' },
        { name: 'زیبال', url: 'https://zibal.ir', desc: 'درگاه پرداخت زیبال' },
        { name: 'آقای پرداخت', url: 'https://aqayepardakht.ir', desc: 'درگاه پرداخت آقای پرداخت' },
      ]
    },
    {
      id: 'sms',
      title: 'سرویس‌های پیامک و ارتباطات',
      icon: Phone,
      color: 'bg-rose-50 border-rose-200',
      iconColor: 'text-rose-600',
      sites: [
        { name: 'کاوه‌نگار', url: 'https://kavenegar.com', desc: 'سرویس ارسال پیامک و احراز هویت' },
        { name: 'فراز اس‌ام‌اس', url: 'https://farazsms.com', desc: 'پنل ارسال پیامک انبوه' },
        { name: 'ملی پیامک', url: 'https://melipayamak.com', desc: 'سرویس پیامک و تماس صوتی' },
        { name: 'sms.ir', url: 'https://sms.ir', desc: 'سرویس ارسال پیامک حرفه‌ای' },
        { name: 'مدیاوا', url: 'https://mediawa.com', desc: 'سرویس پیامک و اطلاع‌رسانی' },
        { name: 'قیطره', url: 'https://ghatreh.com', desc: 'سرویس پیامک و اطلاع‌رسانی' },
        { name: 'نیک‌تلگرام', url: 'https://niksms.com', desc: 'پنل ارسال پیامک نیک‌تلگرام' },
        { name: 'اس‌ام‌اس‌بان', url: 'https://smsban.ir', desc: 'سرویس ارسال پیامک انبوه' },
        { name: 'ای‌اس‌ام‌اس', url: 'https://esms.ir', desc: 'سرویس پیامک ای‌اس‌ام‌اس' },
        { name: 'پیام‌گستر', url: 'https://payamgostar.net', desc: 'پنل پیامک پیام‌گستر' },
        { name: 'وب‌اس‌ام‌اس', url: 'https://websms.ir', desc: 'سرویس پیامک وب‌اس‌ام‌اس' },
        { name: 'اول‌اس‌ام‌اس', url: 'https://01sms.ir', desc: 'پنل ارسال پیامک اول‌اس‌ام‌اس' },
      ]
    },
    {
      id: 'auth',
      title: 'سرویس‌های احراز هویت',
      icon: Shield,
      color: 'bg-indigo-50 border-indigo-200',
      iconColor: 'text-indigo-600',
      sites: [
        { name: 'احراز هویت سجام', url: 'https://sejam.ir', desc: 'احراز هویت غیرحضوری برای بازار سرمایه' },
        { name: 'احراز هویت سیگنال', url: 'https://signal.ir', desc: 'سرویس احراز هویت بیومتریک' },
        { name: 'احراز هویت ایران', url: 'https://evidencement.ir', desc: 'احراز هویت آنلاین با کارت ملی' },
        { name: 'نوین‌احراز', url: 'https://novinera.com', desc: 'سرویس احراز هویت و KYC' },
        { name: 'شاهکار (ثبت احوال)', url: 'https://shahkar.gov.ir', desc: 'سامانه تطبیق اطلاعات هویتی' },
        { name: 'هویت‌سنج', url: 'https://hoviyatsanj.ir', desc: 'سرویس احراز هویت هویت‌سنج' },
        { name: 'آی‌دی‌وای', url: 'https://idev.ir', desc: 'سرویس احراز هویت دیجیتال' },
        { name: 'تصحیح', url: 'https://tashih.ir', desc: 'سرویس تطبیق و احراز هویت' },
        { name: 'احراز هویت پلیس', url: 'https://epolice.ir', desc: 'سامانه احراز هویت نیروی انتظامی' },
        { name: 'سرویس OCR', url: 'https://ocr.ir', desc: 'تشخیص متن از تصویر کارت ملی' },
      ]
    },
    {
      id: 'cloud',
      title: 'سرویس‌های ابری و زیرساخت',
      icon: Server,
      color: 'bg-cyan-50 border-cyan-200',
      iconColor: 'text-cyan-600',
      sites: [
        { name: 'ابر آروان', url: 'https://arvancloud.ir', desc: 'سرویس ابری، CDN و ذخیره‌سازی' },
        { name: 'پارس‌پک', url: 'https://parspack.com', desc: 'هاستینگ و سرور ابری' },
        { name: 'ایران‌سرور', url: 'https://iranserver.com', desc: 'خدمات میزبانی وب و سرور' },
        { name: 'نت‌افراز', url: 'https://netafraz.com', desc: 'هاستینگ و سرور مجازی' },
        { name: 'سون‌هاست', url: 'https://sonhost.com', desc: 'هاستینگ اشتراکی و حرفه‌ای' },
        { name: 'میزبان‌فا', url: 'https://mizbanfa.net', desc: 'هاستینگ و دامنه' },
        { name: 'لیارا', url: 'https://liara.ir', desc: 'پلتفرم ابری لیارا' },
        { name: 'پونیشا', url: 'https://ponisha.ir', desc: 'پلتفرم فریلنسری و پروژه' },
        { name: 'دیجی‌کالا (زیرساخت)', url: 'https://digikala.com', desc: 'زیرساخت فنی دیجی‌کالا' },
        { name: 'سرویس CDN', url: 'https://cdn.ir', desc: 'شبکه توزیع محتوا' },
        { name: 'دامنه ایرنیک', url: 'https://nic.ir', desc: 'مرکز ثبت دامنه‌های ملی' },
        { name: 'ایران‌دامین', url: 'https://irandomain.com', desc: 'ثبت و مدیریت دامنه' },
      ]
    },
    {
      id: 'tools',
      title: 'ابزارها و منابع مدیریتی',
      icon: Lightbulb,
      color: 'bg-orange-50 border-orange-200',
      iconColor: 'text-orange-600',
      sites: [
        { name: 'نمایندگی یابی', url: 'https://namayandegi.com', desc: 'سامانه جستجوی نمایندگی‌های خدماتی' },
        { name: 'ایسام (سامانه معاملات)', url: 'https://esam.ir', desc: 'سامانه حراج و معاملات آنلاین' },
        { name: 'دیجی‌سکورو', url: 'https://digisecuro.com', desc: 'امضای دیجیتال و اسناد الکترونیک' },
        { name: 'سامانه ثبت شرکت‌ها', url: 'https://irsherkat.ssaa.ir', desc: 'ثبت و تغییرات شرکت‌ها' },
        { name: 'سامانه تجارت', url: 'https://ntsw.ir', desc: 'سامانه جامع تجارت - واردات و صادرات' },
        { name: 'اتاق بازرگانی', url: 'https://ccima.ir', desc: 'اتاق بازرگانی، صنایع، معادن و کشاورزی' },
        { name: 'اتاق اصناف', url: 'https://ccima.ir', desc: 'اتاق اصناف ایران' },
        { name: 'سامانه اینماد', url: 'https://enamad.ir', desc: 'نماد اعتماد الکترونیکی' },
        { name: 'سامانه ساماندهی', url: 'https://samandehi.ir', desc: 'ساماندهی سایت‌های اینترنتی' },
        { name: 'گوگل آنالیتیکس', url: 'https://analytics.google.com', desc: 'تحلیل ترافیک وب‌سایت' },
        { name: 'سرچ کنسول', url: 'https://search.google.com/search-console', desc: 'مدیریت سئو و عملکرد سایت' },
        { name: 'جی‌تی‌متریکس', url: 'https://gtmetrix.com', desc: 'آنالیز سرعت وب‌سایت' },
        { name: 'تrello', url: 'https://trello.com', desc: 'مدیریت پروژه و تسک' },
        { name: 'اسلک', url: 'https://slack.com', desc: 'ارتباطات تیمی' },
        { name: 'گوگل فرم', url: 'https://docs.google.com/forms', desc: 'ساخت فرم آنلاین' },
        { name: 'درایو گوگل', url: 'https://drive.google.com', desc: 'ذخیره‌سازی ابری' },
        { name: 'نوتیون', url: 'https://notion.so', desc: 'مدیریت دانش و یادداشت‌برداری' },
        { name: 'میرول', url: 'https://miro.com', desc: 'تخته سفید آنلاین و همکاری تیمی' },
        { name: 'فیگما', url: 'https://figma.com', desc: 'طراحی رابط کاربری و پروتوتایپ' },
        { name: 'کنوا', url: 'https://canva.com', desc: 'طراحی گرافیک آنلاین' },
        { name: 'گیت‌هاب', url: 'https://github.com', desc: 'مدیریت کد و پروژه‌های نرم‌افزاری' },
        { name: 'بیت‌باکت', url: 'https://bitbucket.org', desc: 'میزبانی کد و همکاری تیمی' },
        { name: 'جیرا', url: 'https://atlassian.com/software/jira', desc: 'مدیریت پروژه چابک' },
        { name: 'زوم', url: 'https://zoom.us', desc: 'کنفرانس ویدیویی آنلاین' },
        { name: 'گوگل میت', url: 'https://meet.google.com', desc: 'کنفرانس ویدیویی گوگل' },
        { name: 'اسکایپ', url: 'https://skype.com', desc: 'تماس تصویری و صوتی' },
        { name: 'واتس‌اپ بیزنس', url: 'https://business.whatsapp.com', desc: 'پیام‌رسان تجاری' },
        { name: 'تلگرام بیزنس', url: 'https://telegram.org', desc: 'پیام‌رسان با قابلیت تجاری' },
      ]
    },
    {
      id: 'news',
      title: 'سایت‌های خبری و رسانه‌ای',
      icon: Globe,
      color: 'bg-pink-50 border-pink-200',
      iconColor: 'text-pink-600',
      sites: [
        { name: 'ایسنا', url: 'https://isna.ir', desc: 'خبرگزاری دانشجویان ایران' },
        { name: 'تسنیم', url: 'https://tasnimnews.com', desc: 'خبرگزاری تسنیم' },
        { name: 'فارس', url: 'https://farsnews.ir', desc: 'خبرگزاری فارس' },
        { name: 'مهر', url: 'https://mehrannews.com', desc: 'خبرگزاری مهر' },
        { name: 'ایلنا', url: 'https://ilna.ir', desc: 'خبرگزاری ایلنا' },
        { name: 'خانه ملت', url: 'https://parliran.ir', desc: 'خبرگزاری مجلس شورای اسلامی' },
        { name: 'پانا', url: 'https://pana.ir', desc: 'خبرگزاری دانش‌آموزان' },
        { name: 'شانا', url: 'https://shana.ir', desc: 'خبرگزاری نفت' },
        { name: 'ایکنا', url: 'https://iqna.ir', desc: 'خبرگزاری قرآنی ایران' },
        { name: 'تابناک', url: 'https://tabnak.ir', desc: 'پایگاه خبری تابناک' },
        { name: 'عصر ایران', url: 'https://asriran.com', desc: 'پایگاه خبری عصر ایران' },
        { name: 'آفتاب', url: 'https://aftabir.com', desc: 'پایگاه خبری آفتاب' },
        { name: 'رجانیوز', url: 'https://rajanews.com', desc: 'پایگاه خبری رجا' },
        { name: 'فرارو', url: 'https://fararu.com', desc: 'پایگاه خبری فرارو' },
        { name: 'بازار', url: 'https://bazaar.ir', desc: 'رسانه اقتصادی بازار' },
      ]
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <GraduationCap size={24} className="text-primary-600" />
            آموزش ادمین
          </h2>
          <p className="text-sm text-gray-500 mt-1">راهنمای جامع استفاده از پنل مدیریت و منابع مفید</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-white rounded-xl border border-gray-100 p-1">
        <button
          onClick={() => setActiveTab('tutorials')}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition ${
            activeTab === 'tutorials' ? 'bg-primary-50 text-primary-700' : 'text-gray-500 hover:bg-gray-50'
          }`}
        >
          <BookOpen size={16} />
          آموزش‌های پنل
        </button>
        <button
          onClick={() => setActiveTab('services')}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition ${
            activeTab === 'services' ? 'bg-primary-50 text-primary-700' : 'text-gray-500 hover:bg-gray-50'
          }`}
        >
          <FileCheck size={16} />
          آموزش خدمات
        </button>
        <button
          onClick={() => setActiveTab('resources')}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition ${
            activeTab === 'resources' ? 'bg-primary-50 text-primary-700' : 'text-gray-500 hover:bg-gray-50'
          }`}
        >
          <Link2 size={16} />
          منابع و سایت‌های مفید
        </button>
      </div>

      {/* Tutorials Tab */}
      {activeTab === 'tutorials' && (
        <div className="space-y-4">
          {/* Quick Start Banner */}
          <div className="bg-gradient-to-bl from-primary-600 to-primary-800 rounded-2xl p-6 text-white">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Lightbulb size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">به پنل مدیریت کافی‌نت ابری خوش آمدید!</h3>
                <p className="text-primary-100 text-sm leading-6">
                  این بخش شامل آموزش‌های کامل برای تسلط بر تمام بخش‌های پنل مدیریت است. 
                  هر بخش شامل مراحل گام‌به‌گام با توضیحات دقیق است.
                </p>
              </div>
            </div>
          </div>

          {/* Tutorial Cards */}
          <div className="grid gap-4">
            {tutorials.map((tutorial) => {
              const isExpanded = expandedGuide === tutorial.id;
              return (
                <div key={tutorial.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <button
                    onClick={() => setExpandedGuide(isExpanded ? null : tutorial.id)}
                    className="w-full p-5 flex items-center gap-4 text-right hover:bg-gray-50 transition"
                  >
                    <div className={`w-12 h-12 bg-gradient-to-br ${tutorial.color} rounded-xl flex items-center justify-center shrink-0`}>
                      <tutorial.icon size={22} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800">{tutorial.title}</h3>
                      <p className="text-sm text-gray-500 mt-0.5">{tutorial.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">{tutorial.steps.length} مرحله</span>
                      <ChevronDown size={18} className={`text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    </div>
                  </button>
                  
                  {isExpanded && (
                    <div className="px-5 pb-5 border-t border-gray-100">
                      <div className="pt-4 space-y-4">
                        {tutorial.steps.map((step, i) => (
                          <div key={i} className="flex gap-3">
                            <div className="flex flex-col items-center">
                              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center shrink-0">
                                <span className="text-sm font-bold text-primary-700">{i + 1}</span>
                              </div>
                              {i < tutorial.steps.length - 1 && (
                                <div className="w-0.5 h-full bg-gray-200 mt-1"></div>
                              )}
                            </div>
                            <div className="flex-1 pb-4">
                              <h4 className="font-semibold text-gray-800 text-sm">{step.title}</h4>
                              <p className="text-sm text-gray-600 mt-1 leading-6">{step.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Tips Section */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
            <h3 className="font-bold text-amber-800 flex items-center gap-2 mb-3">
              <Lightbulb size={18} />
              نکات کلیدی برای مدیران
            </h3>
            <ul className="space-y-2 text-sm text-amber-700">
              <li className="flex items-start gap-2">
                <CheckCircle size={14} className="mt-0.5 shrink-0" />
                <span>هر روز داشبورد را بررسی کنید تا از وضعیت سفارش‌ها و درآمد مطلع شوید.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={14} className="mt-0.5 shrink-0" />
                <span>سفارش‌های با اولویت بالا را در اسرع وقت به اپراتورها تخصیص دهید.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={14} className="mt-0.5 shrink-0" />
                <span>تیکت‌های پشتیبانی را حداکثر ظرف ۲ ساعت پاسخ دهید.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={14} className="mt-0.5 shrink-0" />
                <span>تنظیمات امنیتی را همیشه فعال نگه دارید و لاگ‌ها را بررسی کنید.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={14} className="mt-0.5 shrink-0" />
                <span>گزارش‌های هفتگی و ماهانه را برای تحلیل عملکرد مطالعه کنید.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={14} className="mt-0.5 shrink-0" />
                <span>سرویس‌های متصل را به صورت دوره‌ای بررسی و در صورت نیاز بروزرسانی کنید.</span>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Services Training Tab */}
      {activeTab === 'services' && (
        <div className="space-y-4">
          {/* Banner */}
          <div className="bg-gradient-to-bl from-purple-600 to-purple-800 rounded-2xl p-6 text-white">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <FileCheck size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">آموزش انجام خدمات</h3>
                <p className="text-purple-100 text-sm leading-6">
                  راهنمای کامل و گام‌به‌گام انجام هر یک از ۴۲ خدمت کافی‌نت ابری. 
                  با مطالعه این آموزش‌ها، می‌توانید تمام خدمات را به صورت حرفه‌ای و بدون خطا انجام دهید.
                </p>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm sticky top-0 z-10">
            <div className="relative">
              <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="جستجو در آموزش خدمات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-10 pl-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition"
              />
            </div>
          </div>

          {/* Service Training Cards */}
          <div className="space-y-3">
            {services
              .filter((s: Service) => s.title.includes(searchQuery) || s.description.includes(searchQuery))
              .map((service: Service) => {
                const isExpanded = expandedService === service.id;
                const SIcon = getServiceIcon(service.iconId);
                
                return (
                  <div key={service.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <button
                      onClick={() => setExpandedService(isExpanded ? null : service.id)}
                      className="w-full p-4 flex items-center gap-4 text-right hover:bg-gray-50 transition"
                    >
                      <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center shrink-0">
                        <SIcon size={24} className="text-primary-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800">{service.title}</h3>
                        <p className="text-sm text-gray-500 mt-0.5">{service.description}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-xs text-primary-600 font-medium">{service.price}</span>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-gray-500">{service.duration}</span>
                        </div>
                      </div>
                      <ChevronDown size={20} className={`text-gray-400 transition-transform shrink-0 ${isExpanded ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {isExpanded && (
                      <div className="border-t border-gray-100 bg-gray-50">
                        <div className="p-5">
                          {/* Training Content */}
                          <div className="grid md:grid-cols-2 gap-5">
                            {/* Left: Illustration */}
                            <div className="bg-white rounded-xl p-6 border border-gray-200">
                              <div className="aspect-video bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg flex items-center justify-center mb-4">
                                <div className="text-center">
                                  <SIcon size={64} className="text-primary-400 mx-auto mb-2" />
                                  <p className="text-xs text-primary-600 font-medium">تصویر آموزشی</p>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <div className="flex items-center gap-2 text-xs text-gray-600">
                                  <Clock size={14} className="text-gray-400" />
                                  <span>زمان تقریبی: {service.duration}</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-600">
                                  <CreditCard size={14} className="text-gray-400" />
                                  <span>هزینه: {service.price}</span>
                                </div>
                              </div>
                            </div>

                            {/* Right: Steps */}
                            <div className="space-y-3">
                              <h4 className="font-bold text-gray-800 flex items-center gap-2">
                                <ClipboardList size={18} className="text-primary-600" />
                                مراحل انجام خدمت
                              </h4>
                              <div className="space-y-2">
                                {getServiceSteps(service.id).map((step, i) => (
                                  <div key={i} className="flex gap-3 bg-white rounded-lg p-3 border border-gray-200">
                                    <div className="w-7 h-7 bg-primary-100 rounded-full flex items-center justify-center shrink-0">
                                      <span className="text-xs font-bold text-primary-700">{i + 1}</span>
                                    </div>
                                    <div className="flex-1">
                                      <p className="text-sm font-medium text-gray-800">{step.title}</p>
                                      <p className="text-xs text-gray-600 mt-0.5 leading-5">{step.desc}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Required Documents */}
                          {getServiceDocuments(service.id).length > 0 && (
                            <div className="mt-5 bg-amber-50 border border-amber-200 rounded-xl p-4">
                              <h4 className="font-bold text-amber-800 flex items-center gap-2 mb-2">
                                <FileText size={16} />
                                مدارک مورد نیاز
                              </h4>
                              <ul className="space-y-1">
                                {getServiceDocuments(service.id).map((doc, i) => (
                                  <li key={i} className="flex items-start gap-2 text-sm text-amber-700">
                                    <CheckCircle size={14} className="mt-0.5 shrink-0" />
                                    <span>{doc}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Important Notes */}
                          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl p-4">
                            <h4 className="font-bold text-blue-800 flex items-center gap-2 mb-2">
                              <AlertCircle size={16} />
                              نکات مهم
                            </h4>
                            <ul className="space-y-1">
                              {getServiceNotes(service.id).map((note, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-blue-700">
                                  <CheckCircle size={14} className="mt-0.5 shrink-0" />
                                  <span>{note}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>

          {searchQuery && initialServices.every(s => 
            !s.title.includes(searchQuery) && !s.description.includes(searchQuery)
          ) && (
            <div className="text-center py-12">
              <Search size={48} className="mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500">خدمتی با این مشخصات یافت نشد</p>
            </div>
          )}
        </div>
      )}

      {/* Resources Tab */}
      {activeTab === 'resources' && (
        <div className="space-y-4">
          {/* Resources Banner */}
          <div className="bg-gradient-to-bl from-emerald-600 to-emerald-800 rounded-2xl p-6 text-white">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Bookmark size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">منابع و سایت‌های ضروری</h3>
                <p className="text-emerald-100 text-sm leading-6">
                  لیست کامل سایت‌ها و منابعی که هر مدیر کافی‌نت آنلاین باید بداند و از آن‌ها استفاده کند.
                  این لیست شامل سایت‌های دولتی، آموزشی، مالی، پرداخت، پیامک و زیرساختی است.
                </p>
              </div>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm sticky top-0 z-10">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="جستجو در سایت‌ها..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pr-10 pl-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition"
                />
              </div>
              <button
                onClick={() => setShowBookmarkedOnly(!showBookmarkedOnly)}
                className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition ${
                  showBookmarkedOnly ? 'bg-amber-100 text-amber-700 border border-amber-300' : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'
                }`}
              >
                <Bookmark size={16} className={showBookmarkedOnly ? 'fill-amber-500' : ''} />
                نشان‌های من ({bookmarkedSites.size})
              </button>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-100">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  selectedCategory === 'all' ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                همه ({resourceCategories.reduce((acc, cat) => acc + cat.sites.length, 0)})
              </button>
              {resourceCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                    selectedCategory === cat.id ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <cat.icon size={12} />
                  {cat.title.replace('سایت‌های ', '').replace('سرویس‌های ', '')} ({cat.sites.length})
                </button>
              ))}
            </div>
          </div>

          {/* Filtered Sites */}
          <div className="space-y-4">
            {resourceCategories
              .filter(cat => selectedCategory === 'all' || cat.id === selectedCategory)
              .map((category) => {
                const filteredSites = category.sites.filter(site => {
                  const matchesSearch = site.name.includes(searchQuery) || site.desc.includes(searchQuery) || site.url.includes(searchQuery);
                  const matchesBookmark = !showBookmarkedOnly || bookmarkedSites.has(site.url);
                  return matchesSearch && matchesBookmark;
                });

                if (filteredSites.length === 0) return null;

                return (
                  <div key={category.id} className={`rounded-2xl border ${category.color} overflow-hidden`}>
                    <div className="p-4 flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-white/50`}>
                        <category.icon size={20} className={category.iconColor} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800">{category.title}</h3>
                        <p className="text-xs text-gray-500">{filteredSites.length} سایت</p>
                      </div>
                    </div>
                    <div className="bg-white rounded-b-2xl">
                      <div className="grid gap-2 p-3">
                        {filteredSites.map((site, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition group border border-gray-100"
                          >
                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-primary-50 transition">
                              <Globe size={16} className="text-gray-500 group-hover:text-primary-600 transition" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium text-gray-800 text-sm">{site.name}</h4>
                                <a
                                  href={site.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-gray-400 hover:text-primary-600 transition"
                                >
                                  <ExternalLink size={12} />
                                </a>
                              </div>
                              <p className="text-xs text-gray-500 mt-0.5 truncate">{site.desc}</p>
                              <p className="text-xs text-primary-600 mt-0.5 font-mono truncate">{site.url}</p>
                            </div>
                            <button
                              onClick={() => {
                                const newBookmarks = new Set(bookmarkedSites);
                                if (newBookmarks.has(site.url)) {
                                  newBookmarks.delete(site.url);
                                } else {
                                  newBookmarks.add(site.url);
                                }
                                setBookmarkedSites(newBookmarks);
                              }}
                              className={`p-2 rounded-lg transition ${
                                bookmarkedSites.has(site.url) ? 'bg-amber-100 text-amber-600' : 'bg-gray-100 text-gray-400 hover:bg-amber-50 hover:text-amber-500'
                              }`}
                              title={bookmarkedSites.has(site.url) ? 'حذف از نشان‌ها' : 'افزودن به نشان‌ها'}
                            >
                              <Bookmark size={16} className={bookmarkedSites.has(site.url) ? 'fill-amber-500' : ''} />
                            </button>
                            <a
                              href={site.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 transition"
                              title="باز کردن سایت"
                            >
                              <ChevronLeft size={16} />
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>

          {searchQuery && resourceCategories.every(cat => 
            cat.sites.every(site => 
              !site.name.includes(searchQuery) && !site.desc.includes(searchQuery) && !site.url.includes(searchQuery)
            )
          ) && (
            <div className="text-center py-12">
              <Search size={48} className="mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500">سایتی با این مشخصات یافت نشد</p>
            </div>
          )}

          {/* Summary Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
              <p className="text-2xl font-bold text-primary-600">{resourceCategories.reduce((acc, cat) => acc + cat.sites.length, 0)}</p>
              <p className="text-xs text-gray-500 mt-1">سایت مفید</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
              <p className="text-2xl font-bold text-emerald-600">{resourceCategories.length}</p>
              <p className="text-xs text-gray-500 mt-1">دسته‌بندی</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
              <p className="text-2xl font-bold text-purple-600">{tutorials.length}</p>
              <p className="text-xs text-gray-500 mt-1">آموزش</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
              <p className="text-2xl font-bold text-amber-600">{bookmarkedSites.size}</p>
              <p className="text-xs text-gray-500 mt-1">نشان‌شده</p>
            </div>
          </div>
        </div>
      )}
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
