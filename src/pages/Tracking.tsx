import { useState, useEffect } from 'react';
import { Search, Clock, CheckCircle, AlertCircle, Loader, XCircle, Package, FileText } from 'lucide-react';
import { getOrderStatus, getAllOrderStatuses, onOrderStatusUpdate, getStatusLabel, getStatusColor } from '../utils/orderManagement';
import type { OrderStatus } from '../utils/orderManagement';

interface OrderInfo {
  trackingCode: string;
  serviceId: string;
  serviceTitle: string;
  formData: Record<string, string>;
  submittedAt: string;
}

interface OrderWithStatus extends OrderInfo {
  status: OrderStatus['status'];
  progress: number;
  operator?: string;
  updatedAt: string;
}

const timelineSteps = [
  { label: 'ثبت سفارش', desc: 'سفارش شما با موفقیت ثبت شد' },
  { label: 'تأیید مدارک', desc: 'مدارک ارسالی در حال بررسی است' },
  { label: 'در حال انجام', desc: 'اپراتور در حال پردازش سفارش شماست' },
  { label: 'کنترل کیفیت', desc: 'سفارش در حال بررسی نهایی' },
  { label: 'تکمیل و تحویل', desc: 'سفارش آماده تحویل است' },
];

export default function Tracking() {
  const [searchCode, setSearchCode] = useState('');
  const [activeOrder, setActiveOrder] = useState<OrderWithStatus | null>(null);
  const [allOrders, setAllOrders] = useState<OrderWithStatus[]>([]);

  // Load all orders from localStorage
  useEffect(() => {
    loadOrders();
  }, []);

  // Listen for real-time updates
  useEffect(() => {
    const unsubscribe = onOrderStatusUpdate((updatedStatus) => {
      // Update the active order if it matches
      if (activeOrder && activeOrder.trackingCode === updatedStatus.trackingCode) {
        setActiveOrder(prev => prev ? {
          ...prev,
          status: updatedStatus.status,
          progress: updatedStatus.progress,
          operator: updatedStatus.operator,
          updatedAt: updatedStatus.updatedAt,
        } : null);
      }
      
      // Reload all orders
      loadOrders();
    });

    return () => unsubscribe();
  }, [activeOrder]);

  const loadOrders = () => {
    const orders: OrderWithStatus[] = [];
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('order_') && key?.endsWith('_info')) {
        const orderInfo: OrderInfo = JSON.parse(localStorage.getItem(key) || '{}');
        const trackingCode = orderInfo.trackingCode;
        
        // Get status
        const statusData = getOrderStatus(trackingCode);
        
        if (statusData) {
          orders.push({
            ...orderInfo,
            status: statusData.status,
            progress: statusData.progress,
            operator: statusData.operator,
            updatedAt: statusData.updatedAt,
          });
        }
      }
    }
    
    // Sort by date (newest first)
    orders.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
    setAllOrders(orders);
  };

  const handleSearch = () => {
    if (!searchCode.trim()) return;
    
    const order = allOrders.find(o => o.trackingCode === searchCode.trim());
    if (order) {
      setActiveOrder(order);
    } else {
      setActiveOrder(null);
    }
  };

  const currentStepIndex = activeOrder 
    ? Math.floor((activeOrder.progress / 100) * (timelineSteps.length - 1))
    : 0;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">پیگیری سفارش</h1>
        <p className="text-gray-500">وضعیت سفارش خود را لحظه‌به‌لحظه مشاهده کنید</p>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="کد رهگیری سفارش را وارد کنید"
              value={searchCode}
              onChange={(e) => setSearchCode(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full pr-10 pl-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
            />
          </div>
          <button
            onClick={handleSearch}
            className="px-6 py-3 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition"
          >
            پیگیری
          </button>
        </div>
      </div>

      {/* Active Order Display */}
      {activeOrder && (
        <div className="space-y-6">
          {/* Order Info Card */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Package size={18} className="text-primary-600" />
                  <span className="font-bold text-gray-800">{activeOrder.serviceTitle}</span>
                </div>
                <p className="text-sm text-gray-500">کد رهگیری: <span className="font-mono font-bold text-primary-700">{activeOrder.trackingCode}</span></p>
              </div>
              <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border ${getStatusColor(activeOrder.status)}`}>
                {activeOrder.status === 'pending' && <Clock size={14} />}
                {activeOrder.status === 'processing' && <Loader size={14} />}
                {activeOrder.status === 'review' && <AlertCircle size={14} />}
                {activeOrder.status === 'completed' && <CheckCircle size={14} />}
                {activeOrder.status === 'rejected' && <XCircle size={14} />}
                {getStatusLabel(activeOrder.status)}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-xs text-gray-500 mb-2">
                <span>پیشرفت سفارش</span>
                <span>{activeOrder.progress}٪</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ${
                    activeOrder.status === 'rejected' ? 'bg-rose-500' : 'bg-gradient-to-l from-primary-500 to-primary-600'
                  }`}
                  style={{ width: `${activeOrder.progress}%` }}
                ></div>
              </div>
            </div>

            {/* Timeline */}
            <div className="relative">
              <div className="absolute right-5 top-0 bottom-0 w-0.5 bg-gray-200"></div>
              <div className="space-y-6">
                {timelineSteps.map((step, i) => {
                  const isCompleted = i <= currentStepIndex && activeOrder.status !== 'rejected';
                  const isCurrent = i === currentStepIndex && activeOrder.status !== 'rejected' && activeOrder.status !== 'completed';
                  return (
                    <div key={i} className="relative flex gap-4">
                      <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                        isCompleted
                          ? 'bg-primary-600 border-primary-600'
                          : 'bg-white border-gray-200'
                      } ${isCurrent ? 'ring-4 ring-primary-100' : ''}`}>
                        {isCompleted ? (
                          <CheckCircle size={18} className="text-white" />
                        ) : (
                          <span className="text-xs text-gray-400">{i + 1}</span>
                        )}
                      </div>
                      <div className="flex-1 pb-2">
                        <h4 className={`font-semibold text-sm ${isCompleted ? 'text-gray-800' : 'text-gray-400'}`}>
                          {step.label}
                          {isCurrent && <span className="inline-block mr-2 text-xs text-primary-600">(مرحله فعلی)</span>}
                        </h4>
                        <p className={`text-xs mt-0.5 ${isCompleted ? 'text-gray-500' : 'text-gray-400'}`}>{step.desc}</p>
                        {isCurrent && (
                          <p className="text-xs text-primary-600 mt-1 flex items-center gap-1">
                            <Clock size={12} />
                            در حال انجام...
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Order Details */}
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl border border-gray-100 p-4">
              <p className="text-xs text-gray-500 mb-1">تاریخ ثبت</p>
              <p className="font-bold text-gray-800">{new Date(activeOrder.submittedAt).toLocaleDateString('fa-IR')}</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-4">
              <p className="text-xs text-gray-500 mb-1">اپراتور</p>
              <p className="font-bold text-gray-800">{activeOrder.operator || 'تخصیص نیافته'}</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-4">
              <p className="text-xs text-gray-500 mb-1">آخرین بروزرسانی</p>
              <p className="font-bold text-gray-800">{new Date(activeOrder.updatedAt).toLocaleDateString('fa-IR')}</p>
            </div>
          </div>

          {/* Form Data */}
          {Object.keys(activeOrder.formData).length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FileText size={18} className="text-primary-600" />
                اطلاعات ثبت شده
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {Object.entries(activeOrder.formData).map(([key, value]) => (
                  <div key={key}>
                    <p className="text-xs text-gray-500 mb-1">{key}</p>
                    <p className="font-medium text-gray-800">{String(value)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* No Order Found */}
      {searchCode && !activeOrder && (
        <div className="text-center py-12">
          <XCircle size={48} className="mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500">سفارشی با این کد رهگیری یافت نشد</p>
        </div>
      )}

      {/* Recent Orders */}
      {allOrders.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm mt-6">
          <h3 className="font-bold text-gray-800 mb-4">سفارش‌های اخیر شما</h3>
          <div className="space-y-3">
            {allOrders.slice(0, 5).map(order => (
              <button
                key={order.trackingCode}
                onClick={() => { setActiveOrder(order); setSearchCode(order.trackingCode); }}
                className={`w-full flex items-center justify-between p-3 rounded-xl border transition text-right ${
                  activeOrder?.trackingCode === order.trackingCode ? 'border-primary-300 bg-primary-50' : 'border-gray-100 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getStatusColor(order.status)}`}>
                    {order.status === 'completed' && <CheckCircle size={14} />}
                    {order.status === 'processing' && <Clock size={14} />}
                    {order.status === 'review' && <AlertCircle size={14} />}
                    {order.status === 'pending' && <Clock size={14} />}
                    {order.status === 'rejected' && <XCircle size={14} />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{order.serviceTitle}</p>
                    <p className="text-xs text-gray-500 font-mono">{order.trackingCode}</p>
                  </div>
                </div>
                <div className="text-left">
                  <p className="text-xs text-gray-500">{getStatusLabel(order.status)}</p>
                  <p className="text-xs text-gray-400">{order.progress}٪</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* No Orders */}
      {allOrders.length === 0 && (
        <div className="text-center py-12">
          <Package size={48} className="mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500">هنوز سفارشی ثبت نکرده‌اید</p>
        </div>
      )}
    </div>
  );
}
