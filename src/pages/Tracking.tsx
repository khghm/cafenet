import { useState } from 'react';
import { sampleOrders } from '../data/services';
import { Search, Clock, CheckCircle, AlertCircle, Loader, XCircle, Package } from 'lucide-react';

const statusMap = {
  pending: { label: 'در انتظار بررسی', icon: Clock, color: 'text-amber-600 bg-amber-50 border-amber-200' },
  processing: { label: 'در حال پردازش', icon: Loader, color: 'text-blue-600 bg-blue-50 border-blue-200' },
  review: { label: 'در حال بررسی', icon: AlertCircle, color: 'text-purple-600 bg-purple-50 border-purple-200' },
  completed: { label: 'تکمیل شده', icon: CheckCircle, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
  rejected: { label: 'رد شده', icon: XCircle, color: 'text-rose-600 bg-rose-50 border-rose-200' },
};

const timelineSteps = [
  { label: 'ثبت سفارش', desc: 'سفارش شما با موفقیت ثبت شد' },
  { label: 'تأیید مدارک', desc: 'مدارک ارسالی در حال بررسی است' },
  { label: 'در حال انجام', desc: 'اپراتور در حال پردازش سفارش شماست' },
  { label: 'کنترل کیفیت', desc: 'سفارش در حال بررسی نهایی' },
  { label: 'تکمیل و تحویل', desc: 'سفارش آماده تحویل است' },
];

export default function Tracking() {
  const [searchCode, setSearchCode] = useState('');
  const [activeOrder, setActiveOrder] = useState(sampleOrders[1]);
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    if (searchCode.trim()) {
      setSearched(true);
    }
  };

  const currentStepIndex = Math.floor((activeOrder.progress / 100) * (timelineSteps.length - 1));

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">پیگیری سفارش</h1>
        <p className="text-gray-500">وضعیت سفارش خود را لحظه‌به‌لحه مشاهده کنید</p>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="کد رهگیری سفارش را وارد کنید (مثال: KNT-1403-001567)"
              value={searchCode}
              onChange={(e) => setSearchCode(e.target.value)}
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

      {(searched || true) && activeOrder && (
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
              <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border ${statusMap[activeOrder.status].color}`}>
                {(() => { const Icon = statusMap[activeOrder.status].icon; return <Icon size={14} />; })()}
                {statusMap[activeOrder.status].label}
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
                  className="h-full bg-gradient-to-l from-primary-500 to-primary-600 rounded-full transition-all duration-1000"
                  style={{ width: `${activeOrder.progress}%` }}
                ></div>
              </div>
            </div>

            {/* Timeline */}
            <div className="relative">
              <div className="absolute right-5 top-0 bottom-0 w-0.5 bg-gray-200"></div>
              <div className="space-y-6">
                {timelineSteps.map((step, i) => {
                  const isCompleted = i <= currentStepIndex;
                  const isCurrent = i === currentStepIndex;
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
                      <div className={`flex-1 pb-2 ${isCurrent ? '' : ''}`}>
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
              <p className="font-bold text-gray-800">{activeOrder.date}</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-4">
              <p className="text-xs text-gray-500 mb-1">مبلغ پرداختی</p>
              <p className="font-bold text-gray-800">{activeOrder.price}</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-4">
              <p className="text-xs text-gray-500 mb-1">زمان تقریبی تحویل</p>
              <p className="font-bold text-gray-800">۲ ساعت دیگر</p>
            </div>
          </div>

          {/* Quick Orders */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-4">سفارش‌های اخیر شما</h3>
            <div className="space-y-3">
              {sampleOrders.map(order => (
                <button
                  key={order.id}
                  onClick={() => { setActiveOrder(order); setSearched(true); }}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border transition text-right ${
                    activeOrder.id === order.id ? 'border-primary-300 bg-primary-50' : 'border-gray-100 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${statusMap[order.status].color}`}>
                      {(() => { const Icon = statusMap[order.status].icon; return <Icon size={14} />; })()}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{order.serviceTitle}</p>
                      <p className="text-xs text-gray-500 font-mono">{order.trackingCode}</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">{order.date}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
