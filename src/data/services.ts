export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  price: string;
  duration: string;
  popular?: boolean;
  fields?: FormField[];
}

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'file' | 'select' | 'textarea' | 'date' | 'number';
  required: boolean;
  options?: string[];
  placeholder?: string;
}

export const categories = [
  { id: 'government', title: 'خدمات دولتی و اداری', icon: '🏛️', color: 'from-blue-500 to-blue-700' },
  { id: 'education', title: 'آموزشی و دانشگاهی', icon: '🎓', color: 'from-purple-500 to-purple-700' },
  { id: 'financial', title: 'مالی و بیمه', icon: '💰', color: 'from-emerald-500 to-emerald-700' },
  { id: 'legal', title: 'خدمات قضایی و حقوقی', icon: '⚖️', color: 'from-amber-500 to-amber-700' },
  { id: 'printing', title: 'چاپ و نشر', icon: '🖨️', color: 'from-rose-500 to-rose-700' },
  { id: 'digital', title: 'خدمات دیجیتال', icon: '💻', color: 'from-cyan-500 to-cyan-700' },
  { id: 'communication', title: 'ارتباطات', icon: '📱', color: 'from-indigo-500 to-indigo-700' },
  { id: 'other', title: 'سایر خدمات', icon: '📋', color: 'from-gray-500 to-gray-700' },
];

export const services: Service[] = [
  {
    id: 's1',
    title: 'ثبت‌نام آزمون سراسری',
    description: 'ثبت‌نام آنلاین در آزمون‌های سراسری، ارشد و دکتری',
    icon: '📝',
    category: 'education',
    price: '۵۰,۰۰۰ تومان',
    duration: '۱۵ دقیقه',
    popular: true,
    fields: [
      { name: 'fullName', label: 'نام و نام خانوادگی', type: 'text', required: true },
      { name: 'nationalId', label: 'کد ملی', type: 'text', required: true },
      { name: 'examType', label: 'نوع آزمون', type: 'select', required: true, options: ['سراسری', 'ارشد', 'دکتری', 'فنی حرفه‌ای'] },
      { name: 'photo', label: 'عکس پرسنلی', type: 'file', required: true },
      { name: 'idCard', label: 'تصویر کارت ملی', type: 'file', required: true },
    ],
  },
  {
    id: 's2',
    title: 'خدمات نظام وظیفه',
    description: 'ثبت درخواست، تعیین وضعیت و پیگیری امور نظام وظیفه',
    icon: '🎖️',
    category: 'government',
    price: '۳۵,۰۰۰ تومان',
    duration: '۱۰ دقیقه',
    popular: true,
    fields: [
      { name: 'fullName', label: 'نام و نام خانوادگی', type: 'text', required: true },
      { name: 'nationalId', label: 'کد ملی', type: 'text', required: true },
      { name: 'requestType', label: 'نوع درخواست', type: 'select', required: true, options: ['معافیت تحصیلی', 'تعیین وضعیت', 'کفالت', 'غیبت'] },
      { name: 'idCard', label: 'تصویر کارت ملی', type: 'file', required: true },
    ],
  },
  {
    id: 's3',
    title: 'ثبت‌نام کنکور',
    description: 'ثبت‌نام و ویرایش اطلاعات کنکور سراسری',
    icon: '📚',
    category: 'education',
    price: '۶۰,۰۰۰ تومان',
    duration: '۲۰ دقیقه',
    popular: true,
    fields: [
      { name: 'fullName', label: 'نام و نام خانوادگی', type: 'text', required: true },
      { name: 'nationalId', label: 'کد ملی', type: 'text', required: true },
      { name: 'group', label: 'گروه آزمایشی', type: 'select', required: true, options: ['ریاضی', 'تجربی', 'انسانی', 'هنر', 'زبان'] },
      { name: 'photo', label: 'عکس پرسنلی', type: 'file', required: true },
    ],
  },
  {
    id: 's4',
    title: 'خدمات ثنا (قوه قضاییه)',
    description: 'ثبت‌نام و احراز هویت در سامانه ثنا',
    icon: '⚖️',
    category: 'legal',
    price: '۴۵,۰۰۰ تومان',
    duration: '۱۵ دقیقه',
    popular: true,
    fields: [
      { name: 'fullName', label: 'نام و نام خانوادگی', type: 'text', required: true },
      { name: 'nationalId', label: 'کد ملی', type: 'text', required: true },
      { name: 'phone', label: 'شماره موبایل', type: 'text', required: true },
      { name: 'idCard', label: 'تصویر کارت ملی (پشت و رو)', type: 'file', required: true },
      { name: 'birthCert', label: 'تصویر شناسنامه', type: 'file', required: true },
    ],
  },
  {
    id: 's5',
    title: 'پرینت و اسکن اسناد',
    description: 'پرینت رنگی و سیاه‌وسفید، اسکن با کیفیت بالا',
    icon: '🖨️',
    category: 'printing',
    price: 'از ۵,۰۰۰ تومان',
    duration: '۵ دقیقه',
    fields: [
      { name: 'file', label: 'فایل مورد نظر', type: 'file', required: true },
      { name: 'type', label: 'نوع چاپ', type: 'select', required: true, options: ['سیاه‌وسفید A4', 'رنگی A4', 'سیاه‌وسفید A3', 'رنگی A3'] },
      { name: 'copies', label: 'تعداد نسخه', type: 'number', required: true, placeholder: 'تعداد' },
    ],
  },
  {
    id: 's6',
    title: 'ترجمه رسمی',
    description: 'ترجمه رسمی اسناد با مهر مترجم',
    icon: '🌐',
    category: 'printing',
    price: 'از ۱۵۰,۰۰۰ تومان',
    duration: '۲۴ ساعت',
    fields: [
      { name: 'file', label: 'سند مبنا', type: 'file', required: true },
      { name: 'sourceLang', label: 'زبان مبدأ', type: 'select', required: true, options: ['فارسی', 'انگلیسی', 'عربی', 'فرانسوی', 'آلمانی'] },
      { name: 'targetLang', label: 'زبان مقصد', type: 'select', required: true, options: ['فارسی', 'انگلیسی', 'عربی', 'فرانسوی', 'آلمانی'] },
      { name: 'description', label: 'توضیحات', type: 'textarea', required: false },
    ],
  },
  {
    id: 's7',
    title: 'امور مالیاتی',
    description: 'تشکیل پرونده مالیاتی، ارسال اظهارنامه و پیگیری',
    icon: '🧾',
    category: 'financial',
    price: '۸۰,۰۰۰ تومان',
    duration: '۳۰ دقیقه',
    fields: [
      { name: 'fullName', label: 'نام و نام خانوادگی', type: 'text', required: true },
      { name: 'nationalId', label: 'کد ملی / شناسه ملی', type: 'text', required: true },
      { name: 'serviceType', label: 'نوع خدمت', type: 'select', required: true, options: ['تشکیل پرونده', 'اظهارنامه', 'پیگیری بدهی', 'اعتراض'] },
      { name: 'docs', label: 'مدارک مرتبط', type: 'file', required: false },
    ],
  },
  {
    id: 's8',
    title: 'بیمه شخص ثالث',
    description: 'صدور و تمدید بیمه‌نامه شخص ثالث خودرو',
    icon: '🚗',
    category: 'financial',
    price: '۴۰,۰۰۰ تومان + حق بیمه',
    duration: '۱۰ دقیقه',
    fields: [
      { name: 'plateNo', label: 'شماره پلاک', type: 'text', required: true },
      { name: 'carModel', label: 'مدل خودرو', type: 'text', required: true },
      { name: 'carYear', label: 'سال ساخت', type: 'number', required: true },
      { name: 'prevInsurance', label: 'بیمه‌نامه قبلی', type: 'file', required: false },
    ],
  },
  {
    id: 's9',
    title: 'شارژ و بسته اینترنت',
    description: 'خرید شارژ و بسته اینترنت تمامی اپراتورها',
    icon: '📶',
    category: 'communication',
    price: 'متغیر',
    duration: 'فوری',
    popular: true,
    fields: [
      { name: 'operator', label: 'اپراتور', type: 'select', required: true, options: ['همراه اول', 'ایرانسل', 'رایتل'] },
      { name: 'phone', label: 'شماره موبایل', type: 'text', required: true },
      { name: 'type', label: 'نوع خرید', type: 'select', required: true, options: ['شارژ مستقیم', 'بسته اینترنت', 'بسته مکالمه'] },
      { name: 'amount', label: 'مبلغ / نوع بسته', type: 'text', required: true },
    ],
  },
  {
    id: 's10',
    title: 'پلیس +۱۰',
    description: 'خدمات گذرنامه، گواهینامه و کارت پایان خدمت',
    icon: '🛂',
    category: 'government',
    price: '۵۵,۰۰۰ تومان',
    duration: '۲۰ دقیقه',
    fields: [
      { name: 'serviceType', label: 'نوع خدمت', type: 'select', required: true, options: ['گذرنامه', 'گواهینامه', 'کارت پایان خدمت', 'سوءپیشینه'] },
      { name: 'fullName', label: 'نام و نام خانوادگی', type: 'text', required: true },
      { name: 'nationalId', label: 'کد ملی', type: 'text', required: true },
      { name: 'photo', label: 'عکس پرسنلی', type: 'file', required: true },
      { name: 'idCard', label: 'تصویر کارت ملی', type: 'file', required: true },
    ],
  },
  {
    id: 's11',
    title: 'تایپ و صفحه‌آرایی',
    description: 'تایپ حرفه‌ای متون، پایان‌نامه و صفحه‌آرایی',
    icon: '⌨️',
    category: 'printing',
    price: 'از ۱۰,۰۰۰ تومان',
    duration: 'بسته به حجم',
    fields: [
      { name: 'file', label: 'فایل یا تصویر متن', type: 'file', required: true },
      { name: 'type', label: 'نوع تایپ', type: 'select', required: true, options: ['تایپ ساده', 'تایپ فرمول‌دار', 'صفحه‌آرایی پایان‌نامه', 'جدول‌کشی'] },
      { name: 'pages', label: 'تعداد صفحات تقریبی', type: 'number', required: true },
    ],
  },
  {
    id: 's12',
    title: 'سهام عدالت',
    description: 'مشاهده، فروش و مدیریت سهام عدالت',
    icon: '📈',
    category: 'financial',
    price: '۲۵,۰۰۰ تومان',
    duration: '۱۰ دقیقه',
    fields: [
      { name: 'nationalId', label: 'کد ملی', type: 'text', required: true },
      { name: 'action', label: 'عملیات', type: 'select', required: true, options: ['مشاهده وضعیت', 'فروش', 'تغییر روش غیرمستقیم'] },
    ],
  },
];

export interface Order {
  id: string;
  serviceId: string;
  serviceTitle: string;
  status: 'pending' | 'processing' | 'review' | 'completed' | 'rejected';
  date: string;
  price: string;
  trackingCode: string;
  progress: number;
}

export const sampleOrders: Order[] = [
  { id: '1', serviceId: 's1', serviceTitle: 'ثبت‌نام آزمون سراسری', status: 'completed', date: '۱۴۰۳/۰۹/۱۵', price: '۵۰,۰۰۰ تومان', trackingCode: 'KNT-1403-001234', progress: 100 },
  { id: '2', serviceId: 's4', serviceTitle: 'خدمات ثنا', status: 'processing', date: '۱۴۰۳/۰۹/۲۰', price: '۴۵,۰۰۰ تومان', trackingCode: 'KNT-1403-001567', progress: 60 },
  { id: '3', serviceId: 's9', serviceTitle: 'شارژ و بسته اینترنت', status: 'pending', date: '۱۴۰۳/۰۹/۲۲', price: '۳۰,۰۰۰ تومان', trackingCode: 'KNT-1403-001890', progress: 20 },
  { id: '4', serviceId: 's6', serviceTitle: 'ترجمه رسمی', status: 'review', date: '۱۴۰۳/۰۹/۱۸', price: '۲۵۰,۰۰۰ تومان', trackingCode: 'KNT-1403-001456', progress: 80 },
];
