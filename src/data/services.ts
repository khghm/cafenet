export interface Service {
  id: string;
  title: string;
  description: string;
  iconId: string;
  category: string;
  price: string;
  duration: string;
  popular?: boolean;
  active?: boolean;
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
  { id: 'government', title: 'خدمات دولتی و اداری', iconId: 'government', color: 'from-blue-500 to-blue-700' },
  { id: 'education', title: 'آموزشی و دانشگاهی', iconId: 'education', color: 'from-purple-500 to-purple-700' },
  { id: 'financial', title: 'مالی و بیمه', iconId: 'financial', color: 'from-emerald-500 to-emerald-700' },
  { id: 'legal', title: 'خدمات قضایی و حقوقی', iconId: 'legal', color: 'from-amber-500 to-amber-700' },
  { id: 'printing', title: 'چاپ و نشر', iconId: 'printing', color: 'from-rose-500 to-rose-700' },
  { id: 'digital', title: 'خدمات دیجیتال', iconId: 'digital', color: 'from-cyan-500 to-cyan-700' },
  { id: 'communication', title: 'ارتباطات', iconId: 'communication', color: 'from-indigo-500 to-indigo-700' },
  { id: 'other', title: 'سایر خدمات', iconId: 'other', color: 'from-gray-500 to-gray-700' },
];

export const services: Service[] = [
  {
    id: 's1',
    title: 'ثبت‌نام آزمون سراسری',
    description: 'ثبت‌نام آنلاین در آزمون‌های سراسری، ارشد و دکتری',
    iconId: 's1',
    category: 'education',
    price: '۵۰,۰۰۰ تومان',
    duration: '۱۵ دقیقه',
    popular: true,
    active: true,
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
    iconId: 's2',
    category: 'government',
    price: '۳۵,۰۰۰ تومان',
    duration: '۱۰ دقیقه',
    popular: true,
    active: true,
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
    iconId: 's3',
    category: 'education',
    price: '۶۰,۰۰۰ تومان',
    duration: '۲۰ دقیقه',
    popular: true,
    active: true,
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
    iconId: 's4',
    category: 'legal',
    price: '۴۵,۰۰۰ تومان',
    duration: '۱۵ دقیقه',
    popular: true,
    active: true,
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
    iconId: 's5',
    category: 'printing',
    price: 'از ۵,۰۰۰ تومان',
    duration: '۵ دقیقه',
    active: true,
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
    iconId: 's6',
    category: 'printing',
    price: 'از ۱۵۰,۰۰۰ تومان',
    duration: '۲۴ ساعت',
    active: true,
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
    iconId: 's7',
    category: 'financial',
    price: '۸۰,۰۰۰ تومان',
    duration: '۳۰ دقیقه',
    active: true,
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
    iconId: 's8',
    category: 'financial',
    price: '۴۰,۰۰۰ تومان + حق بیمه',
    duration: '۱۰ دقیقه',
    active: true,
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
    iconId: 's9',
    category: 'communication',
    price: 'متغیر',
    duration: 'فوری',
    popular: true,
    active: true,
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
    iconId: 's10',
    category: 'government',
    price: '۵۵,۰۰۰ تومان',
    duration: '۲۰ دقیقه',
    active: true,
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
    iconId: 's11',
    category: 'printing',
    price: 'از ۱۰,۰۰۰ تومان',
    duration: 'بسته به حجم',
    active: true,
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
    iconId: 's12',
    category: 'financial',
    price: '۲۵,۰۰۰ تومان',
    duration: '۱۰ دقیقه',
    active: true,
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
  customerName: string;
  operator?: string;
  priority: 'high' | 'medium' | 'low';
}

export const sampleOrders: Order[] = [
  { id: '1', serviceId: 's1', serviceTitle: 'ثبت‌نام آزمون سراسری', status: 'completed', date: '۱۴۰۳/۰۹/۱۵', price: '۵۰,۰۰۰ تومان', trackingCode: 'KNT-1403-001234', progress: 100, customerName: 'علی محمدی', operator: 'اپراتور ۱', priority: 'medium' },
  { id: '2', serviceId: 's4', serviceTitle: 'خدمات ثنا', status: 'processing', date: '۱۴۰۳/۰۹/۲۰', price: '۴۵,۰۰۰ تومان', trackingCode: 'KNT-1403-001567', progress: 60, customerName: 'فاطمه احمدی', operator: 'اپراتور ۲', priority: 'high' },
  { id: '3', serviceId: 's9', serviceTitle: 'شارژ و بسته اینترنت', status: 'pending', date: '۱۴۰۳/۰۹/۲۲', price: '۳۰,۰۰۰ تومان', trackingCode: 'KNT-1403-001890', progress: 20, customerName: 'محمد رضایی', priority: 'low' },
  { id: '4', serviceId: 's6', serviceTitle: 'ترجمه رسمی', status: 'review', date: '۱۴۰۳/۰۹/۱۸', price: '۲۵۰,۰۰۰ تومان', trackingCode: 'KNT-1403-001456', progress: 80, customerName: 'زهرا کریمی', operator: 'اپراتور ۱', priority: 'medium' },
  { id: '5', serviceId: 's10', serviceTitle: 'پلیس +۱۰', status: 'processing', date: '۱۴۰۳/۰۹/۲۱', price: '۵۵,۰۰۰ تومان', trackingCode: 'KNT-1403-001678', progress: 45, customerName: 'حسین نوری', operator: 'اپراتور ۳', priority: 'high' },
  { id: '6', serviceId: 's7', serviceTitle: 'امور مالیاتی', status: 'pending', date: '۱۴۰۳/۰۹/۲۲', price: '۸۰,۰۰۰ تومان', trackingCode: 'KNT-1403-001901', progress: 10, customerName: 'مریم حسینی', priority: 'medium' },
];

export interface AppUser {
  id: string;
  name: string;
  phone: string;
  role: 'user' | 'operator' | 'admin';
  status: 'active' | 'inactive';
  joinDate: string;
  email?: string;
  nationalId?: string;
}

export const sampleUsers: AppUser[] = [
  { id: 'u1', name: 'علی محمدی', phone: '۰۹۱۲۳۴۵۶۷۸۹', role: 'user', status: 'active', joinDate: '۱۴۰۳/۰۷/۰۱', email: 'ali@example.com', nationalId: '۰۰۱۲۳۴۵۶۷۸' },
  { id: 'u2', name: 'فاطمه احمدی', phone: '۰۹۱۳۴۵۶۷۸۹۰', role: 'operator', status: 'active', joinDate: '۱۴۰۳/۰۶/۱۵', email: 'fatemeh@example.com' },
  { id: 'u3', name: 'محمد رضایی', phone: '۰۹۱۴۵۶۷۸۹۰۱', role: 'admin', status: 'active', joinDate: '۱۴۰۳/۰۵/۲۰', email: 'mohammad@example.com' },
  { id: 'u4', name: 'زهرا کریمی', phone: '۰۹۱۵۶۷۸۹۰۱۲', role: 'user', status: 'inactive', joinDate: '۱۴۰۳/۰۸/۱۰', email: 'zahra@example.com' },
  { id: 'u5', name: 'حسین نوری', phone: '۰۹۱۶۷۸۹۰۱۲۳', role: 'operator', status: 'active', joinDate: '۱۴۰۳/۰۴/۰۵', email: 'hossein@example.com' },
  { id: 'u6', name: 'سارا عباسی', phone: '۰۹۱۷۸۹۰۱۲۳۴', role: 'user', status: 'active', joinDate: '۱۴۰۳/۰۹/۰۱', email: 'sara@example.com' },
  { id: 'u7', name: 'رضا جعفری', phone: '۰۹۱۸۹۰۱۲۳۴۵', role: 'operator', status: 'active', joinDate: '۱۴۰۳/۰۳/۱۲', email: 'reza@example.com' },
];

export interface Ticket {
  id: string;
  title: string;
  userId: string;
  userName: string;
  priority: 'high' | 'medium' | 'low';
  status: 'open' | 'inProgress' | 'answered' | 'closed';
  createdAt: string;
  messages: { from: 'user' | 'agent'; text: string; time: string }[];
}

export const sampleTickets: Ticket[] = [
  { id: 't1', title: 'مشکل در بارگذاری مدارک', userId: 'u1', userName: 'علی محمدی', priority: 'medium', status: 'open', createdAt: '۱۰ دقیقه پیش', messages: [
    { from: 'user', text: 'سلام، فایل من آپلود نمیشه. خطا میده.', time: '۱۰:۳۰' },
  ]},
  { id: 't2', title: 'درخواست تغییر شماره موبایل', userId: 'u6', userName: 'سارا عباسی', priority: 'low', status: 'inProgress', createdAt: '۱ ساعت پیش', messages: [
    { from: 'user', text: 'لطفاً شماره موبایل من را تغییر دهید.', time: '۰۹:۱۵' },
    { from: 'agent', text: 'سلام، لطفاً شماره جدید و کد ملی خود را ارسال کنید.', time: '۰۹:۲۰' },
  ]},
  { id: 't3', title: 'عدم دریافت کد تأیید', userId: 'u3', userName: 'محمد رضایی', priority: 'high', status: 'open', createdAt: '۲ ساعت پیش', messages: [
    { from: 'user', text: 'کد تأیید پیامکی دریافت نمی‌کنم.', time: '۰۸:۰۰' },
  ]},
  { id: 't4', title: 'سؤال درباره فرآیند ترجمه', userId: 'u4', userName: 'زهرا کریمی', priority: 'low', status: 'answered', createdAt: 'دیروز', messages: [
    { from: 'user', text: 'ترجمه رسمی چقدر طول میکشه؟', time: '۱۴:۰۰' },
    { from: 'agent', text: 'معمولاً بین ۲۴ تا ۴۸ ساعت کاری.', time: '۱۴:۳۰' },
  ]},
  { id: 't5', title: 'مشکل در پرداخت آنلاین', userId: 'u5', userName: 'حسین نوری', priority: 'high', status: 'open', createdAt: 'دیروز', messages: [
    { from: 'user', text: 'مبلغ از حسابم کم شده ولی سفارش ثبت نشده.', time: '۱۶:۰۰' },
  ]},
];

export interface Transaction {
  id: string;
  description: string;
  type: 'income' | 'expense' | 'refund';
  amount: string;
  status: 'success' | 'pending' | 'failed';
  date: string;
  orderId?: string;
}

export const sampleTransactions: Transaction[] = [
  { id: 'TXN-001', description: 'پرداخت سفارش KNT-1403-001234', type: 'income', amount: '۵۰,۰۰۰', status: 'success', date: '۱۴۰۳/۰۹/۲۲', orderId: '1' },
  { id: 'TXN-002', description: 'تسویه اپراتور ۱', type: 'expense', amount: '۱,۲۰۰,۰۰۰', status: 'pending', date: '۱۴۰۳/۰۹/۲۱' },
  { id: 'TXN-003', description: 'شارژ کیف پول - علی محمدی', type: 'income', amount: '۳۰۰,۰۰۰', status: 'success', date: '۱۴۰۳/۰۹/۲۰' },
  { id: 'TXN-004', description: 'بازگشت وجه سفارش لغو شده', type: 'refund', amount: '۴۵,۰۰۰', status: 'success', date: '۱۴۰۳/۰۹/۱۹' },
  { id: 'TXN-005', description: 'پرداخت سفارش KNT-1403-001567', type: 'income', amount: '۴۵,۰۰۰', status: 'success', date: '۱۴۰۳/۰۹/۲۰', orderId: '2' },
  { id: 'TXN-006', description: 'تسویه اپراتور ۲', type: 'expense', amount: '۸۵۰,۰۰۰', status: 'success', date: '۱۴۰۳/۰۹/۱۸' },
];
