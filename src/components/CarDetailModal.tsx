import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  Scale, 
  Phone, 
  MessageCircle, 
  Printer, 
  Calendar, 
  Fuel, 
  Gauge, 
  ShieldCheck, 
  Check, 
  MapPin, 
  User, 
  Edit, 
  ChevronLeft, 
  ChevronRight,
  Sparkles,
  Zap,
  TrendingUp,
  FileText
} from 'lucide-react';
import { Car, AdminUser } from '../types/car';
import { formatLakhs, getStatusBadgeInfo } from '../utils/formatters';

interface CarDetailModalProps {
  car: Car | null;
  isOpen: boolean;
  onClose: () => void;
  isAdminMode: boolean;
  currentAdmin: AdminUser | null;
  showProfitMargins: boolean;
  isFavorite: boolean;
  isCompared: boolean;
  onToggleFavorite: (carId: string) => void;
  onToggleCompare: (car: Car) => void;
  onEditCar: (car: Car) => void;
  onPrintSpecSheet: (car: Car) => void;
}

export const CarDetailModal: React.FC<CarDetailModalProps> = ({
  car,
  isOpen,
  onClose,
  isAdminMode,
  currentAdmin,
  showProfitMargins,
  isFavorite,
  isCompared,
  onToggleFavorite,
  onToggleCompare,
  onEditCar,
  onPrintSpecSheet,
}) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  if (!isOpen || !car) return null;

  const statusInfo = getStatusBadgeInfo(car.status);
  const profitMargin = car.sellingPriceLakhs - (car.buyingPriceLakhs || 0);
  const profitPercent = car.buyingPriceLakhs 
    ? ((profitMargin / car.buyingPriceLakhs) * 100).toFixed(1)
    : '0';

  const cleanPhone = (car.sellerPhone || '').replace(/\s+/g, '');
  const cleanViber = (car.sellerViber || car.sellerPhone || '').replace(/\s+/g, '');

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-white border border-slate-200 w-full max-w-4xl rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden text-slate-800 my-auto max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 1. Modal Top Bar */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5 truncate">
            <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-lg ${statusInfo.badgeClass}`}>
              {statusInfo.shortLabel}
            </span>
            <h2 className="text-base sm:text-lg font-bold truncate">
              {car.title}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onPrintSpecSheet(car)}
              className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition"
              title="ကားစလစ် စာရွက်ထုတ်မည်"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>စလစ်ထုတ်မည်</span>
            </button>

            <button
              onClick={() => onToggleFavorite(car.id)}
              className={`p-2 rounded-xl transition ${
                isFavorite ? 'bg-rose-500 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
              }`}
              title="အကြိုက်ဆုံး မှတ်မည်"
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>

            <button 
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 2. Modal Body (Scrollable) */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          
          {/* Main Photo Gallery & Price Block */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            
            {/* Photo Slider (7 cols) */}
            <div className="md:col-span-7 space-y-2">
              <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                <img
                  src={car.photos[selectedPhotoIndex] || car.photos[0]}
                  alt=""
                  className="w-full h-full object-cover"
                />

                {car.photos.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedPhotoIndex(prev => prev > 0 ? prev - 1 : car.photos.length - 1)}
                      className="absolute left-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setSelectedPhotoIndex(prev => prev < car.photos.length - 1 ? prev + 1 : 0)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </>
                )}

                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                  {selectedPhotoIndex + 1} / {car.photos.length}
                </div>
              </div>

              {/* Thumbnails */}
              {car.photos.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {car.photos.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedPhotoIndex(idx)}
                      className={`w-16 h-12 rounded-xl overflow-hidden border-2 shrink-0 transition ${
                        selectedPhotoIndex === idx ? 'border-amber-500 ring-1 ring-amber-500' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Price & Contact Quick Card (5 cols) */}
            <div className="md:col-span-5 bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-4 flex flex-col justify-between">
              
              <div>
                <span className="text-slate-500 text-xs font-semibold block">ရောင်းစျေး (Selling Price)</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl sm:text-3xl font-black text-amber-600 tracking-tight">
                    {formatLakhs(car.sellingPriceLakhs)}
                  </span>
                  <span className="text-xs text-slate-600 font-bold">
                    {car.isPriceNegotiable ? '(ညှိနှိုင်းနိုင်)' : '(ပုံသေစျေး)'}
                  </span>
                </div>

                {/* Admin profit overview if logged in */}
                {isAdminMode && showProfitMargins && (
                  <div className="mt-2 bg-amber-100/80 border border-amber-300 rounded-xl p-2 text-[11px] text-amber-950 font-semibold flex justify-between items-center">
                    <span>ဝယ်ရင်း: {formatLakhs(car.buyingPriceLakhs)}</span>
                    <span className="font-bold text-emerald-800">
                      အမြတ်: +{formatLakhs(profitMargin)} ({profitPercent}%)
                    </span>
                  </div>
                )}
              </div>

              {/* Quick Seller / Source Origin Card */}
              <div className="bg-white border border-slate-200 p-3.5 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-slate-400 font-semibold block uppercase tracking-wider">ကားရောင်းသူ / အရင်းအမြစ်</span>
                    <p className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>{car.sellerName || 'ကားပိုင်ရှင် / Showroom'}</span>
                    </p>
                    {car.sellerLocation && car.sellerLocation.trim() !== '' && (
                      <p className="text-[11px] text-slate-500">📍 {car.sellerLocation}</p>
                    )}
                    {car.sourceNote && (
                      <p className="text-[11px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 inline-block mt-1">
                        မှတ်စု: {car.sourceNote}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                  {cleanPhone ? (
                    <a
                      href={`tel:${cleanPhone}`}
                      className="py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition shadow-xs"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>{car.sellerPhone}</span>
                    </a>
                  ) : (
                    <div className="py-2.5 rounded-xl bg-slate-100 text-slate-400 font-bold text-xs text-center">
                      ဖုန်းမရှိပါ
                    </div>
                  )}

                  {cleanViber ? (
                    <a
                      href={`viber://chat?number=${cleanViber}`}
                      className="py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition shadow-xs"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Viber ဆက်သွယ်</span>
                    </a>
                  ) : (
                    <div className="py-2.5 rounded-xl bg-slate-100 text-slate-400 font-bold text-xs text-center">
                      Viber မရှိပါ
                    </div>
                  )}
                </div>
              </div>

              {/* Admin Edit button if applicable */}
              {isAdminMode && (
                <button
                  onClick={() => {
                    onClose();
                    onEditCar(car);
                  }}
                  className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition"
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span>ကားအချက်အလက် ပြင်ဆင်မည် (Edit)</span>
                </button>
              )}

            </div>

          </div>

          {/* 3. Detailed Specs Grid (4 Clean Cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            
            {/* Card 1: Engine & Performance */}
            <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs pb-1 border-b border-slate-200">
                <Fuel className="w-4 h-4 text-amber-500" />
                <span>စက်ပိုင်းဆိုင်ရာ & လောင်စာဆီ</span>
              </div>
              <div className="space-y-1.5 text-[11px] text-slate-700">
                <div className="flex justify-between">
                  <span className="text-slate-500">Engine Power:</span>
                  <span className="font-bold text-slate-900">{car.enginePower}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Fuel Type:</span>
                  <span className="font-bold text-slate-900">{car.fuelType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Transmission:</span>
                  <span className="font-bold text-slate-900">{car.transmission}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Mileage (ကီလို):</span>
                  <span className="font-bold text-slate-900">{car.mileageKm.toLocaleString()} km</span>
                </div>
              </div>
            </div>

            {/* Card 2: License & Identification */}
            <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs pb-1 border-b border-slate-200">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span>လိုင်စင် & ကားအမျိုးအစား</span>
              </div>
              <div className="space-y-1.5 text-[11px] text-slate-700">
                <div className="flex justify-between">
                  <span className="text-slate-500">License Plate:</span>
                  <span className="font-mono font-black text-slate-900">{car.licenseCity} {car.licensePlate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Model Year:</span>
                  <span className="font-bold text-slate-900">{car.year}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Body Type:</span>
                  <span className="font-bold text-slate-900">{car.bodyType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Color:</span>
                  <span className="font-bold text-slate-900">{car.colorBurmese || car.color}</span>
                </div>
              </div>
            </div>

            {/* Card 3: Grade & Options */}
            <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs pb-1 border-b border-slate-200">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Grade အဆင့် & ပစ္စည်းစုံမှု</span>
              </div>
              <div className="space-y-1.5 text-[11px] text-slate-700">
                <div className="flex justify-between">
                  <span className="text-slate-500">Grade:</span>
                  <span className="font-black text-amber-700">{car.grade}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Full Option:</span>
                  <span className="font-bold text-emerald-700">{car.isFullOption ? 'Full Option စုံ' : 'Standard'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Push Start:</span>
                  <span className="font-bold text-slate-900">
                    {car.features.some(f => f.toLowerCase().includes('push start')) ? 'ပါဝင်သည် (Yes)' : 'မပါပါ'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Sunroof:</span>
                  <span className="font-bold text-slate-900">
                    {car.features.some(f => f.toLowerCase().includes('sunroof')) ? 'ပါဝင်သည် (Yes)' : 'မပါပါ'}
                  </span>
                </div>
              </div>
            </div>

            {/* Card 4: Inspection & Condition */}
            <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs pb-1 border-b border-slate-200">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>စစ်ဆေးပြီး အချက်အလက်</span>
              </div>
              <div className="space-y-1.5 text-[11px] text-slate-700">
                {car.conditionNotes.map((note, i) => (
                  <div key={i} className="flex items-center gap-1 text-emerald-800">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="font-medium">{note}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* 4. Full Features List */}
          <div className="bg-white border border-slate-200 p-4 rounded-2xl space-y-2.5">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              ပါဝင်သော စနစ်များနှင့် အပိုပစ္စည်းများ ({car.features.length} မျိုး)
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-[11px]">
              {car.features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-xl border border-slate-100 text-slate-800">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="truncate">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Car Description */}
          {car.description && (
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl space-y-1.5">
              <h4 className="font-bold text-slate-900 text-xs">ကားအကြောင်း အသေးစိတ် ဖော်ပြချက်</h4>
              <p className="text-slate-700 leading-relaxed text-xs whitespace-pre-line">
                {car.description}
              </p>
            </div>
          )}

        </div>

        {/* 3. Modal Footer */}
        <div className="bg-slate-50 px-6 py-3.5 border-t border-slate-200 flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-500 hidden sm:inline">
            ID: {car.id} • Myanmar Cars Hub
          </span>

          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs transition flex items-center gap-1.5"
            >
              <span>◀ နောက်သို့ (Back)</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
