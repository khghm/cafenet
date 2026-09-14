import { useState } from 'react';
import { Link } from 'react-router-dom';
import { services, categories } from '../data/services';
import { getServiceIcon, getCategoryIcon } from '../components/Icons';
import { Search, Filter, Clock, ArrowLeft } from 'lucide-react';

export default function Services() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredServices = services.filter(s => {
    const matchesSearch = s.title.includes(searchQuery) || s.description.includes(searchQuery);
    const matchesCategory = selectedCategory === 'all' || s.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">خدمات کافی‌نت ابری</h1>
        <p className="text-gray-500">تمام خدمات کافی‌نتی را آنلاین سفارش دهید</p>
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-6 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="جستجوی خدمت مورد نظر..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-10 pl-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-100 transition sm:w-auto"
          >
            <Filter size={16} />
            فیلترها
          </button>
        </div>

        {/* Category Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                  selectedCategory === 'all' ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                همه
              </button>
              {categories.map((cat) => {
                const CatIcon = getCategoryIcon(cat.iconId);
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                      selectedCategory === cat.id ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <CatIcon size={14} />
                    {cat.title}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500">{filteredServices.length} خدمت یافت شد</p>
      </div>

      {/* Services Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredServices.map((service) => {
          const ServiceIcon = getServiceIcon(service.iconId);
          return (
            <Link
              key={service.id}
              to={`/order/${service.id}`}
              className="group bg-white rounded-2xl p-5 border border-gray-100 hover:border-primary-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center group-hover:bg-primary-100 transition">
                  <ServiceIcon size={24} className="text-primary-600" />
                </div>
                {service.popular && (
                  <span className="text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full border border-amber-200 flex items-center gap-1">
                    <Star size={10} className="fill-amber-500 text-amber-500" />
                    پرطرفدار
                  </span>
                )}
              </div>
              <h3 className="font-bold text-gray-800 mb-1 group-hover:text-primary-700 transition">{service.title}</h3>
              <p className="text-xs text-gray-500 leading-5 mb-4">{service.description}</p>
              <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                <span className="text-sm font-bold text-primary-600">{service.price}</span>
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Clock size={12} /> {service.duration}
                </span>
              </div>
              <div className="mt-3 flex items-center justify-center gap-1 text-xs text-primary-600 opacity-0 group-hover:opacity-100 transition">
                <span>ثبت سفارش</span>
                <ArrowLeft size={12} />
              </div>
            </Link>
          );
        })}
      </div>

      {filteredServices.length === 0 && (
        <div className="text-center py-16">
          <Search size={48} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-bold text-gray-700 mb-2">خدمتی یافت نشد</h3>
          <p className="text-sm text-gray-500">لطفاً عبارت دیگری را جستجو کنید</p>
        </div>
      )}
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
