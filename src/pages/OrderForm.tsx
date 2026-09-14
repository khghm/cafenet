import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { services } from '../data/services';
import { getServiceIcon } from '../components/Icons';
import { Upload, ArrowRight, CheckCircle, FileText, CreditCard, Clock, Shield, XCircle } from 'lucide-react';

export default function OrderForm() {
  const { id } = useParams();
  const service = services.find(s => s.id === id);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [files, setFiles] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [trackingCode] = useState(`KNT-${Math.floor(Math.random() * 900000 + 100000)}`);

  if (!service) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <XCircle size={48} className="mx-auto mb-4 text-gray-300" />
        <h2 className="text-xl font-bold text-gray-700">خدمت مورد نظر یافت نشد</h2>
        <Link to="/services" className="text-primary-600 mt-4 inline-block">بازگشت به لیست خدمات</Link>
      </div>
    );
  }

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (name: string, fileName: string) => {
    setFiles(prev => ({ ...prev, [name]: fileName }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-lg p-8 text-center">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">سفارش با موفقیت ثبت شد!</h2>
          <p className="text-gray-500 mb-6">سفارش شما در صف بررسی قرار گرفت</p>
          
          <div className="bg-gray-50 rounded-2xl p-6 mb-6">
            <div className="grid grid-cols-2 gap-4 text-right">
              <div>
                <p className="text-xs text-gray-500 mb-1">کد رهگیری</p>
                <p className="font-bold text-primary-700 text-lg">{trackingCode}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">خدمت</p>
                <p className="font-medium text-gray-800">{service.title}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">مبلغ</p>
                <p className="font-medium text-gray-800">{service.price}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">زمان تقریبی</p>
                <p className="font-medium text-gray-800">{service.duration}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/tracking"
              className="inline-flex items-center justify-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-700 transition"
            >
              <Clock size={16} />
              پیگیری سفارش
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-medium hover:bg-gray-200 transition"
            >
              سفارش جدید
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Service Header */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6 shadow-sm">
        <div className="flex items-center gap-4">
          {(() => { const SIcon = getServiceIcon(service.iconId); return <div className="w-14 h-14 bg-primary-50 rounded-xl flex items-center justify-center"><SIcon size={28} className="text-primary-600" /></div>; })()}
          <div>
            <h1 className="text-xl font-bold text-gray-800">{service.title}</h1>
            <p className="text-sm text-gray-500">{service.description}</p>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-sm font-bold text-primary-600">{service.price}</span>
              <span className="text-xs text-gray-400 flex items-center gap-1"><Clock size={12} />{service.duration}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {[
          { num: 1, label: 'اطلاعات', icon: FileText },
          { num: 2, label: 'مدارک', icon: Upload },
          { num: 3, label: 'پرداخت', icon: CreditCard },
        ].map((s, i) => (
          <div key={s.num} className="flex items-center gap-2">
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition ${
              step >= s.num ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 text-gray-400'
            }`}>
              {step > s.num ? <CheckCircle size={14} /> : <s.icon size={14} />}
              <span className="hidden sm:inline">{s.label}</span>
            </div>
            {i < 2 && <div className={`w-8 h-0.5 ${step > s.num ? 'bg-primary-400' : 'bg-gray-200'}`}></div>}
          </div>
        ))}
      </div>

      {/* Form Content */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        {/* Step 1: Form Fields */}
        {step === 1 && (
          <div className="space-y-5">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <FileText size={18} className="text-primary-600" />
              تکمیل اطلاعات
            </h3>
            {service.fields?.filter(f => f.type !== 'file').map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  {field.label}
                  {field.required && <span className="text-rose-500 mr-1">*</span>}
                </label>
                {field.type === 'select' ? (
                  <select
                    value={formData[field.name] || ''}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
                  >
                    <option value="">انتخاب کنید...</option>
                    {field.options?.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                ) : field.type === 'textarea' ? (
                  <textarea
                    value={formData[field.name] || ''}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                    placeholder={field.placeholder}
                    rows={3}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 resize-none"
                  />
                ) : (
                  <input
                    type={field.type}
                    value={formData[field.name] || ''}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
                  />
                )}
              </div>
            ))}
            <button
              onClick={() => setStep(2)}
              className="w-full bg-primary-600 text-white py-3 rounded-xl font-medium hover:bg-primary-700 transition flex items-center justify-center gap-2"
            >
              مرحله بعد
              <ArrowRight size={16} className="rotate-180" />
            </button>
          </div>
        )}

        {/* Step 2: File Upload */}
        {step === 2 && (
          <div className="space-y-5">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <Upload size={18} className="text-primary-600" />
              بارگذاری مدارک
            </h3>
            {service.fields?.filter(f => f.type === 'file').map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  {field.label}
                  {field.required && <span className="text-rose-500 mr-1">*</span>}
                </label>
                <div
                  onClick={() => handleFileUpload(field.name, `${field.label}_uploaded.pdf`)}
                  className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition ${
                    files[field.name] ? 'border-emerald-300 bg-emerald-50' : 'border-gray-200 hover:border-primary-300 hover:bg-primary-50'
                  }`}
                >
                  {files[field.name] ? (
                    <div className="flex items-center justify-center gap-2 text-emerald-700">
                      <CheckCircle size={20} />
                      <span className="text-sm font-medium">{files[field.name]}</span>
                    </div>
                  ) : (
                    <>
                      <Upload size={24} className="mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">فایل را بکشید و رها کنید یا کلیک کنید</p>
                      <p className="text-xs text-gray-400 mt-1">PDF, JPG, PNG — حداکثر ۱۰ مگابایت</p>
                    </>
                  )}
                </div>
              </div>
            ))}
            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition"
              >
                مرحله قبل
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 bg-primary-600 text-white py-3 rounded-xl font-medium hover:bg-primary-700 transition flex items-center justify-center gap-2"
              >
                مرحله بعد
                <ArrowRight size={16} className="rotate-180" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Payment */}
        {step === 3 && (
          <div className="space-y-5">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <CreditCard size={18} className="text-primary-600" />
              پرداخت و ثبت نهایی
            </h3>

            {/* Order Summary */}
            <div className="bg-gray-50 rounded-xl p-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">خدمت</span>
                <span className="font-medium">{service.title}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">هزینه خدمت</span>
                <span className="font-medium">{service.price}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">کد تخفیف</span>
                <input
                  type="text"
                  placeholder="کد تخفیف دارید؟"
                  className="text-left w-32 px-2 py-1 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-primary-400"
                />
              </div>
              <hr />
              <div className="flex justify-between font-bold">
                <span>مبلغ قابل پرداخت</span>
                <span className="text-primary-700">{service.price}</span>
              </div>
            </div>

            {/* Payment Methods */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">روش پرداخت</label>
              <div className="grid grid-cols-2 gap-3">
                <label className="flex items-center gap-2 p-3 border border-primary-300 bg-primary-50 rounded-xl cursor-pointer">
                  <input type="radio" name="payment" defaultChecked className="text-primary-600" />
                  <span className="text-sm font-medium">درگاه بانکی</span>
                </label>
                <label className="flex items-center gap-2 p-3 border border-gray-200 rounded-xl cursor-pointer hover:border-primary-200">
                  <input type="radio" name="payment" className="text-primary-600" />
                  <span className="text-sm font-medium">کیف پول</span>
                </label>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-500 bg-emerald-50 p-3 rounded-xl">
              <Shield size={14} className="text-emerald-600" />
              <span>پرداخت شما از طریق درگاه امن بانکی انجام می‌شود</span>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition"
              >
                مرحله قبل
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 bg-emerald-600 text-white py-3 rounded-xl font-medium hover:bg-emerald-700 transition flex items-center justify-center gap-2"
              >
                <CheckCircle size={16} />
                پرداخت و ثبت سفارش
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
