import React from 'react';
import { 
  Heart, 
  Scale, 
  Phone, 
  MessageCircle, 
  Calendar, 
  Fuel, 
  Gauge, 
  MapPin, 
  Edit, 
  Trash2, 
  Check, 
  ShieldCheck, 
  Sparkles,
  ChevronRight,
  TrendingUp,
  User
} from 'lucide-react';
import { Car } from '../types/car';
import { formatLakhs, getStatusBadgeInfo } from '../utils/formatters';

interface CarCardProps {
  car: Car;
  isAdminMode: boolean;
  showProfitMargins: boolean;
  isFavorite: boolean;
  isCompared: boolean;
  onToggleFavorite: (carId: string) => void;
  onToggleCompare: (car: Car) => void;
  onViewDetails: (car: Car) => void;
  onEditCar: (car: Car) => void;
  onDeleteCar: (carId: string) => void;
  onQuickStatusChange: (carId: string, status: Car['status']) => void;
}

export const CarCard: React.FC<CarCardProps> = ({
  car,
  isAdminMode,
  showProfitMargins,
  isFavorite,
  isCompared,
  onToggleFavorite,
  onToggleCompare,
  onViewDetails,
  onEditCar,
  onDeleteCar,
  onQuickStatusChange,
}) => {
  const statusInfo = getStatusBadgeInfo(car.status);

  // Profit margin calculation for admin
  const profitMargin = car.sellingPriceLakhs - (car.buyingPriceLakhs || 0);
  const profitPercent = car.buyingPriceLakhs 
    ? ((profitMargin / car.buyingPriceLakhs) * 100).toFixed(1) 
    : '0';

  const cleanPhone = (car.sellerPhone || '').replace(/\s+/g, '');
  const cleanViber = (car.sellerViber || car.sellerPhone || '').replace(/\s+/g, '');

  return (
    <div 
      id={`car-card-${car.id}`}
      className={`group bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-lg hover:border-amber-400 transition-all duration-200 flex flex-col overflow-hidden ${
        car.status === 'sold_out' ? 'opacity-85' : ''
      }`}
    >
      {/* 1. Image & Top Status Badges */}
      <div 
        className="relative h-48 sm:h-52 w-full bg-slate-100 overflow-hidden cursor-pointer"
        onClick={() => onViewDetails(car)}
      >
        <img
          src={car.photos[0] || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80'}
          alt={car.title}
          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
          loading="lazy"
        />

        {/* Status Badge (Top Left) */}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 z-10">
          <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-xs ${statusInfo.badgeClass}`}>
            {statusInfo.shortLabel}
          </span>
          {car.fuelType === 'EV' && (
            <span className="bg-emerald-600 text-white font-bold text-[10px] px-2 py-1 rounded-lg shadow-xs">
              ⚡ 100% EV
            </span>
          )}
          {car.fuelType === 'Hybrid' && (
            <span className="bg-blue-600 text-white font-bold text-[10px] px-2 py-1 rounded-lg shadow-xs">
              🌿 Hybrid
            </span>
          )}
        </div>

        {/* Favorite & Compare Buttons (Top Right) */}
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 z-10">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(car.id);
            }}
            className={`p-2 rounded-xl backdrop-blur-md transition shadow-xs ${
              isFavorite 
                ? 'bg-rose-500 text-white shadow-rose-500/30' 
                : 'bg-white/80 hover:bg-white text-slate-700 hover:text-rose-500'
            }`}
            title={isFavorite ? 'အကြိုက်ဆုံးမှ ဖယ်ထုတ်မည်' : 'အကြိုက်ဆုံး သိမ်းမည်'}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleCompare(car);
            }}
            className={`p-2 rounded-xl backdrop-blur-md transition shadow-xs ${
              isCompared 
                ? 'bg-amber-500 text-slate-950 shadow-amber-500/30 font-bold' 
                : 'bg-white/80 hover:bg-white text-slate-700 hover:text-amber-600'
            }`}
            title={isCompared ? 'နှိုင်းယှဉ်ချက်မှ ဖယ်ထုတ်မည်' : 'ကားများ နှိုင်းယှဉ်မည်'}
          >
            <Scale className="w-4 h-4" />
          </button>
        </div>

        {/* Grade & Push Start indicator at bottom of photo */}
        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between pointer-events-none">
          <span className="bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded-md">
            Grade: {car.grade} {car.isFullOption ? '(Full Opt)' : ''}
          </span>
          {car.features.some(f => f.toLowerCase().includes('push start')) && (
            <span className="bg-amber-500/90 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs">
              Push Start
            </span>
          )}
        </div>
      </div>

      {/* 2. Content Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        
        {/* Title & Price */}
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 
              onClick={() => onViewDetails(car)}
              className="font-bold text-slate-900 text-sm hover:text-amber-600 transition cursor-pointer line-clamp-1"
            >
              {car.title}
            </h3>
          </div>

          <div className="mt-1 flex items-baseline justify-between">
            <div>
              <span className="text-lg font-black text-amber-600 tracking-tight">
                {formatLakhs(car.sellingPriceLakhs)}
              </span>
              <span className="text-[11px] text-slate-500 ml-1">
                {car.isPriceNegotiable ? '(ညှိနှိုင်း)' : '(ပုံသေ)'}
              </span>
            </div>
            <span className="text-[10px] text-slate-600 bg-slate-100 font-semibold px-2 py-0.5 rounded-md">
              {car.colorBurmese || car.color}
            </span>
          </div>
        </div>

        {/* 3. Four Key Specs Grid */}
        <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-xl text-xs text-slate-700 border border-slate-100">
          <div className="flex items-center gap-1.5 truncate">
            <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="font-semibold">{car.year} Model</span>
          </div>

          <div className="flex items-center gap-1.5 truncate">
            <Fuel className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{car.enginePower} • {car.fuelType}</span>
          </div>

          <div className="flex items-center gap-1.5 truncate">
            <Gauge className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>{car.mileageKm.toLocaleString()} km</span>
          </div>

          <div className="flex items-center gap-1.5 truncate">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="font-semibold text-slate-800">{car.licenseCity} {car.licensePlate}</span>
          </div>
        </div>

        {/* 4. Seller & Contact Row */}
        <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
          <div className="truncate max-w-[160px]">
            <span className="text-slate-700 text-[11px] font-semibold block truncate">
              {car.sellerName || 'ကားပိုင်ရှင် / Showroom'}
            </span>
            {(car.sellerLocation && car.sellerLocation.trim() !== '') ? (
              <span className="text-slate-400 text-[10px] block truncate">
                📍 {car.sellerLocation} {car.sourceNote ? `(${car.sourceNote})` : ''}
              </span>
            ) : car.sourceNote ? (
              <span className="text-slate-400 text-[10px] block truncate">
                ({car.sourceNote})
              </span>
            ) : null}
          </div>

          <div className="flex items-center gap-1">
            {cleanPhone && (
              <a
                href={`tel:${cleanPhone}`}
                className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white transition flex items-center gap-1 text-[11px] font-bold"
                title="ဖုန်းခေါ်ဆိုမည်"
              >
                <Phone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">ဖုန်းခေါ်</span>
              </a>
            )}

            {cleanViber && (
              <a
                href={`viber://chat?number=${cleanViber}`}
                className="p-1.5 rounded-lg bg-purple-50 text-purple-700 hover:bg-purple-600 hover:text-white transition flex items-center gap-1 text-[11px] font-bold"
                title="Viber ဖြင့် ဆက်သွယ်မည်"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Viber</span>
              </a>
            )}

            <button
              onClick={() => onViewDetails(car)}
              className="px-2.5 py-1.5 rounded-lg bg-slate-900 text-white hover:bg-amber-500 hover:text-slate-950 transition text-[11px] font-bold flex items-center gap-0.5"
            >
              <span>အသေးစိတ်</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* 5. Admin Strip (Visible in Admin Mode) */}
        {isAdminMode && (
          <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-2.5 space-y-2 text-xs text-slate-800">
            {showProfitMargins && (
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-600">
                  ဝယ်ရင်း: <strong className="text-slate-900">{formatLakhs(car.buyingPriceLakhs)}</strong>
                </span>
                <span className="font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded">
                  အမြတ်: +{formatLakhs(profitMargin)} ({profitPercent}%)
                </span>
              </div>
            )}

            <div className="flex items-center justify-between gap-1 pt-1 border-t border-amber-200/60">
              {/* Quick Status Selector */}
              <select
                value={car.status}
                onChange={(e) => onQuickStatusChange(car.id, e.target.value as any)}
                className="bg-white border border-slate-300 rounded-lg text-[10px] font-bold py-1 px-1.5 text-slate-700 focus:outline-none"
              >
                <option value="available">🟢 ရောင်းရန်ရှိ</option>
                <option value="new_arrival">✨ အသစ်ရောက်</option>
                <option value="reserved">🤝 စရန်ပေးထား</option>
                <option value="sold_out">🔴 ရောင်းပြီး</option>
              </select>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => onEditCar(car)}
                  className="px-2 py-1 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-[10px] font-semibold transition"
                >
                  ပြင်မည်
                </button>
                <button
                  type="button"
                  onClick={() => onDeleteCar(car.id)}
                  className="p-1 rounded-lg bg-white border border-slate-300 hover:bg-rose-50 text-rose-600 transition"
                  title="ဖျက်မည်"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
