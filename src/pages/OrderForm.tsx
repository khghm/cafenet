import { useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { services } from '../data/services';
import { getServiceIcon } from '../components/Icons';
import { Upload, ArrowRight, CheckCircle, FileText, CreditCard, Clock, Shield, XCircle, File, X, Eye } from 'lucide-react';
import { initializeOrderStatus } from '../utils/orderManagement';

interface UploadedFile {
  name: string;
  size: number;
  type: string;
  dataUrl: string;
  uploadDate: string;
}

export default function OrderForm() {
  const { id } = useParams();
  const service = services.find(s => s.id === id);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, UploadedFile[]>>({});
  const [submitted, setSubmitted] = useState(false);
  const [trackingCode] = useState(`KNT-${Math.floor(Math.random() * 900000 + 100000)}`);
  const [previewFile, setPreviewFile] = useState<UploadedFile | null>(null);
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

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

  const handleFileUpload = (fieldName: string, files: FileList | null) => {
    if (!files) return;
    
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        const uploadedFile: UploadedFile = {
          name: file.name,
          size: file.size,
          type: file.type,
          dataUrl: dataUrl,
          uploadDate: new Date().toLocaleDateString('fa-IR'),
        };
        
        setUploadedFiles(prev => {
          const existing = prev[fieldName] || [];
          return { ...prev, [fieldName]: [...existing, uploadedFile] };
        });
        
        // Save to localStorage for admin to access
        const orderFilesKey = `order_${trackingCode}_files`;
        const existingFiles = JSON.parse(localStorage.getItem(orderFilesKey) || '{}');
        const fieldFiles = existingFiles[fieldName] || [];
        existingFiles[fieldName] = [...fieldFiles, uploadedFile];
        localStorage.setItem(orderFilesKey, JSON.stringify(existingFiles));
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileClick = (fieldName: string) => {
    fileInputRefs.current[fieldName]?.click();
  };

  const handleFileChange = (fieldName: string, e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileUpload(fieldName, e.target.files);
    // Reset input so same file can be uploaded again
    if (fileInputRefs.current[fieldName]) {
      fileInputRefs.current[fieldName]!.value = '';
    }
  };

  const removeFile = (fieldName: string, fileIndex: number) => {
    setUploadedFiles(prev => {
      const existing = prev[fieldName] || [];
      const newFiles = existing.filter((_, i) => i !== fileIndex);
      return { ...prev, [fieldName]: newFiles };
    });
    
    const orderFilesKey = `order_${trackingCode}_files`;
    const existingFiles = JSON.parse(localStorage.getItem(orderFilesKey) || '{}');
    const fieldFiles = existingFiles[fieldName] || [];
    existingFiles[fieldName] = fieldFiles.filter((_: any, i: number) => i !== fileIndex);
    localStorage.setItem(orderFilesKey, JSON.stringify(existingFiles));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const handleSubmit = () => {
    // Save order info to localStorage
    const orderInfo = {
      trackingCode,
      serviceId: service.id,
      serviceTitle: service.title,
      formData,
      submittedAt: new Date().toISOString(),
    };
    localStorage.setItem(`order_${trackingCode}_info`, JSON.stringify(orderInfo));
    
    // Initialize order status for tracking
    initializeOrderStatus(trackingCode);
    
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
                <input
                  type="file"
                  ref={(el) => { fileInputRefs.current[field.name] = el; }}
                  onChange={(e) => handleFileChange(field.name, e)}
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  multiple
                />
                <div
                  onClick={() => handleFileClick(field.name)}
                  className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition ${
                    uploadedFiles[field.name]?.length ? 'border-emerald-300 bg-emerald-50' : 'border-gray-200 hover:border-primary-300 hover:bg-primary-50'
                  }`}
                >
                  {uploadedFiles[field.name]?.length ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-center gap-2 text-emerald-700 mb-2">
                        <CheckCircle size={20} />
                        <span className="text-sm font-medium">{uploadedFiles[field.name].length} فایل آپلود شده</span>
                      </div>
                      <div className="space-y-2">
                        {uploadedFiles[field.name].map((file, idx) => (
                          <div key={idx} className="flex items-center justify-between bg-white rounded-lg p-2 border border-emerald-200">
                            <div className="flex items-center gap-2 flex-1 min-w-0">
                              <File size={14} className="text-emerald-600 shrink-0" />
                              <div className="flex-1 min-w-0 text-right">
                                <p className="text-xs font-medium text-gray-800 truncate">{file.name}</p>
                                <p className="text-[10px] text-gray-500">{formatFileSize(file.size)} • {file.uploadDate}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-1 shrink-0">
                              <button
                                onClick={(e) => { e.stopPropagation(); setPreviewFile(file); }}
                                className="p-1 bg-gray-100 rounded hover:bg-gray-200"
                                title="پیش‌نمایش"
                              >
                                <Eye size={12} className="text-gray-600" />
                              </button>
                              <button
                                onClick={(e) => { e.stopPropagation(); removeFile(field.name, idx); }}
                                className="p-1 bg-rose-100 rounded hover:bg-rose-200"
                                title="حذف"
                              >
                                <X size={12} className="text-rose-600" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-emerald-600 mt-2">+ افزودن فایل دیگر</p>
                    </div>
                  ) : (
                    <>
                      <Upload size={24} className="mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">فایل را بکشید و رها کنید یا کلیک کنید</p>
                      <p className="text-xs text-gray-400 mt-1">PDF, JPG, PNG, DOC — حداکثر ۱۰ مگابایت • امکان آپلود چندین فایل</p>
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

      {/* File Preview Modal */}
      {previewFile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <File size={18} className="text-primary-600" />
                <h3 className="font-bold text-gray-800">{previewFile.name}</h3>
              </div>
              <button onClick={() => setPreviewFile(null)} className="p-1 hover:bg-gray-100 rounded-lg">
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            <div className="p-4 overflow-auto max-h-[70vh]">
              {previewFile.type.startsWith('image/') ? (
                <img src={previewFile.dataUrl} alt={previewFile.name} className="max-w-full mx-auto rounded-lg" />
              ) : previewFile.type === 'application/pdf' ? (
                <iframe src={previewFile.dataUrl} className="w-full h-[60vh] rounded-lg border border-gray-200" title={previewFile.name} />
              ) : (
                <div className="text-center py-12">
                  <File size={48} className="mx-auto text-gray-300 mb-3" />
                  <p className="text-gray-500">پیش‌نمایش این نوع فایل پشتیبانی نمی‌شود</p>
                  <p className="text-xs text-gray-400 mt-2">{previewFile.name} • {formatFileSize(previewFile.size)}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
