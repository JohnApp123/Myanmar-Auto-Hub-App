import React from 'react';
import { 
  Search, 
  RotateCcw, 
  DollarSign, 
  Car as CarIcon, 
  Fuel, 
  Sparkles, 
  Check, 
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';
import { FilterOptions, CarStatus } from '../types/car';
import { POPULAR_BRANDS, BODY_TYPES, FUEL_TYPES } from '../data/initialCars';
import { formatLakhs } from '../utils/formatters';

interface FilterBarProps {
  filters: FilterOptions;
  onFilterChange: (newFilters: FilterOptions) => void;
  onResetFilters: () => void;
  totalResultsCount: number;
  totalCarsCount: number;
  availableBrands?: string[];
  availableBodyTypes?: string[];
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalResultsCount,
  totalCarsCount,
  availableBrands = POPULAR_BRANDS,
  availableBodyTypes,
}) => {
  const updateFilter = <K extends keyof FilterOptions>(key: K, value: FilterOptions[K]) => {
    onFilterChange({
      ...filters,
      [key]: value,
    });
  };

  const displayBrands = Array.from(new Set([...availableBrands, ...POPULAR_BRANDS]));

  const isFiltered = 
    filters.searchQuery !== '' ||
    filters.status !== 'all' ||
    filters.brand !== '' ||
    filters.bodyType !== '' ||
    filters.fuelType !== '' ||
    filters.maxPrice < 6000 ||
    filters.hasPushStart ||
    filters.hasSunroof ||
    filters.has360Camera ||
    filters.hasLeatherSeats;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-3.5 mb-6 text-slate-800">
      
      {/* 1. Top Search & Quick Brand Pills */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-3 justify-between">
        
        {/* Quick Brand Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
          <button
            type="button"
            onClick={() => updateFilter('brand', '')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
              filters.brand === ''
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
            }`}
          >
            ကားအားလုံး ({totalCarsCount})
          </button>
          
          {displayBrands.slice(0, 8).map((brand) => (
            <button
              key={brand}
              type="button"
              onClick={() => updateFilter('brand', filters.brand === brand ? '' : brand)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                filters.brand === brand
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {brand}
            </button>
          ))}
        </div>

        {/* Search Input Box */}
        <div className="relative w-full lg:w-72 shrink-0">
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => updateFilter('searchQuery', e.target.value)}
            placeholder="ကားရှာရန် (e.g. Alphard, Crown, EV)..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-8 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          {filters.searchQuery && (
            <button 
              onClick={() => updateFilter('searchQuery', '')}
              className="absolute right-2.5 top-2.5 text-xs text-slate-400 hover:text-slate-600"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* 2. Secondary Clean Filter Selectors & Status Chips */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 pt-2 border-t border-slate-100 text-xs">
        
        {/* Status Filter */}
        <div>
          <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wider">ကားအခြေအနေ</label>
          <select
            value={filters.status}
            onChange={(e) => updateFilter('status', e.target.value as any)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer"
          >
            <option value="all">အားလုံး (All Status)</option>
            <option value="available">🟢 ရောင်းရန်ရှိ (In Stock)</option>
            <option value="new_arrival">✨ အသစ်ရောက် (New)</option>
            <option value="reserved">🤝 စရန်ပေးထား (Reserved)</option>
            <option value="sold_out">🔴 ရောင်းပြီး (Sold)</option>
          </select>
        </div>

        {/* Max Price Range Filter */}
        <div>
          <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wider">
            စျေးနှုန်း: <span className="text-amber-600 font-bold">{formatLakhs(filters.maxPrice)}</span>
          </label>
          <select
            value={filters.maxPrice}
            onChange={(e) => updateFilter('maxPrice', Number(e.target.value))}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer"
          >
            <option value={6000}>စျေးနှုန်း အားလုံး</option>
            <option value={1000}>သိန်း ၁,၀၀၀ အောက်</option>
            <option value={1500}>သိန်း ၁,၅၀၀ အောက်</option>
            <option value={2000}>သိန်း ၂,၀၀၀ အောက်</option>
            <option value={3000}>သိန်း ၃,၀၀၀ အောက်</option>
            <option value={4500}>သိန်း ၄,၅၀၀ အောက်</option>
          </select>
        </div>

        {/* Body Type */}
        <div>
          <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wider">ကားအမျိုးအစား</label>
          <select
            value={filters.bodyType}
            onChange={(e) => updateFilter('bodyType', e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer"
          >
            <option value="">အမျိုးအစား အားလုံး</option>
            {BODY_TYPES.map((bt) => (
              <option key={bt.id} value={bt.id}>{bt.name}</option>
            ))}
            {availableBodyTypes?.filter((abt) => !BODY_TYPES.some((b) => b.id === abt)).map((customBt) => (
              <option key={customBt} value={customBt}>{customBt}</option>
            ))}
          </select>
        </div>

        {/* Fuel Type */}
        <div>
          <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wider">လောင်စာဆီ</label>
          <select
            value={filters.fuelType}
            onChange={(e) => updateFilter('fuelType', e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer"
          >
            <option value="">လောင်စာဆီ အားလုံး</option>
            {FUEL_TYPES.map((ft) => (
              <option key={ft.id} value={ft.id}>{ft.name}</option>
            ))}
          </select>
        </div>

        {/* Sort By */}
        <div>
          <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wider">စဥ်မည့်ပုံစံ</label>
          <select
            value={filters.sortBy}
            onChange={(e) => updateFilter('sortBy', e.target.value as any)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer"
          >
            <option value="newest">နောက်ဆုံးတင်ထားသောကား</option>
            <option value="price_asc">စျေးနှုန်း: အနိမ့်မှ အမြင့်</option>
            <option value="price_desc">စျေးနှုန်း: အမြင့်မှ အနိမ့်</option>
            <option value="year_desc">မော်ဒယ်နှစ်: အသစ်ဆုံး</option>
            <option value="mileage_asc">မောင်းပြီးကီလို: အနည်းဆုံး</option>
          </select>
        </div>

      </div>

      {/* 3. Fast Feature Badges & Reset Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
        
        {/* Quick Checkbox Chips */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => updateFilter('hasPushStart', !filters.hasPushStart)}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border transition flex items-center gap-1 ${
              filters.hasPushStart
                ? 'bg-amber-50 text-amber-900 border-amber-300 font-bold'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {filters.hasPushStart && <Check className="w-3 h-3 text-amber-600" />}
            <span>🔑 Push Start ပါရမည်</span>
          </button>

          <button
            type="button"
            onClick={() => updateFilter('has360Camera', !filters.has360Camera)}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border transition flex items-center gap-1 ${
              filters.has360Camera
                ? 'bg-amber-50 text-amber-900 border-amber-300 font-bold'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {filters.has360Camera && <Check className="w-3 h-3 text-amber-600" />}
            <span>📷 360° Cam ပါရမည်</span>
          </button>

          <button
            type="button"
            onClick={() => updateFilter('hasSunroof', !filters.hasSunroof)}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border transition flex items-center gap-1 ${
              filters.hasSunroof
                ? 'bg-amber-50 text-amber-900 border-amber-300 font-bold'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {filters.hasSunroof && <Check className="w-3 h-3 text-amber-600" />}
            <span>☀️ Sunroof ပါရမည်</span>
          </button>
        </div>

        {/* Results Counter & Reset Button */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-600 font-medium">
            ရှာဖွေတွေ့ရှိမှု: <strong className="text-slate-900 font-bold">{totalResultsCount} စီး</strong>
          </span>

          {isFiltered && (
            <button
              onClick={onResetFilters}
              className="text-xs text-amber-600 hover:text-amber-800 font-bold flex items-center gap-1 underline transition"
            >
              <RotateCcw className="w-3 h-3" />
              <span>စစ်ထုတ်မှု အားလုံးရှင်းမည်</span>
            </button>
          )}
        </div>

      </div>

    </div>
  );
};
