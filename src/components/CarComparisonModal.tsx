import React from 'react';
import { X, Scale, Trash2, Check, ExternalLink, Calendar, Fuel, Gauge, DollarSign } from 'lucide-react';
import { Car } from '../types/car';
import { formatLakhs } from '../utils/formatters';

interface CarComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  comparedCars: Car[];
  onRemoveFromCompare: (carId: string) => void;
  onViewDetails: (car: Car) => void;
  onClearCompare: () => void;
}

export const CarComparisonModal: React.FC<CarComparisonModalProps> = ({
  isOpen,
  onClose,
  comparedCars,
  onRemoveFromCompare,
  onViewDetails,
  onClearCompare,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="bg-white border border-slate-200 w-full max-w-5xl rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden text-slate-800 my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold">ကားများ နှိုင်းယှဉ်ချက် (Car Comparison)</h2>
              <p className="text-xs text-slate-400">ရွေးချယ်ထားသော {comparedCars.length} စီး ၏ အချက်အလက်များ ဘေးတိုက်ယှဉ်ကြည့်ရန်</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {comparedCars.length > 0 && (
              <button
                onClick={onClearCompare}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition"
              >
                အားလုံး ရှင်းမည်
              </button>
            )}
            <button 
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-x-auto overflow-y-auto flex-1 text-xs">
          {comparedCars.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <Scale className="w-12 h-12 text-slate-300 mx-auto" />
              <p className="text-slate-700 font-bold text-sm">နှိုင်းယှဉ်ရန် ကား မရွေးရသေးပါ</p>
              <p className="text-slate-500 text-xs">ကားကတ်များပေါ်ရှိ နှိုင်းယှဉ်ခလုတ် (⚖️) ကို နှိပ်၍ အနည်းဆုံး ၂ စီး ရွေးချယ်နိုင်ပါသည်။</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 min-w-[600px]">
              {comparedCars.map((car) => (
                <div key={car.id} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="relative h-36 rounded-xl overflow-hidden bg-slate-200">
                      <img src={car.photos[0]} alt="" className="w-full h-full object-cover" />
                      <button
                        onClick={() => onRemoveFromCompare(car.id)}
                        className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 hover:bg-rose-600 text-white transition"
                        title="ဖယ်ထုတ်မည်"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{car.title}</h4>
                      <p className="text-amber-600 font-black text-base mt-0.5">
                        {formatLakhs(car.sellingPriceLakhs)}
                      </p>
                    </div>

                    <div className="space-y-1.5 text-[11px] pt-2 border-t border-slate-200">
                      <div className="flex justify-between py-1 border-b border-slate-100">
                        <span className="text-slate-500">Model Year:</span>
                        <span className="font-bold text-slate-900">{car.year}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-100">
                        <span className="text-slate-500">Grade:</span>
                        <span className="font-bold text-amber-700">{car.grade}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-100">
                        <span className="text-slate-500">Engine / Fuel:</span>
                        <span className="font-bold text-slate-900">{car.enginePower} ({car.fuelType})</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-100">
                        <span className="text-slate-500">Mileage:</span>
                        <span className="font-bold text-slate-900">{car.mileageKm.toLocaleString()} km</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-100">
                        <span className="text-slate-500">License:</span>
                        <span className="font-bold text-slate-900">{car.licenseCity} {car.licensePlate}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-100">
                        <span className="text-slate-500">Push Start:</span>
                        <span className="font-bold text-slate-900">
                          {car.features.some(f => f.toLowerCase().includes('push start')) ? 'ပါဝင်သည် ✅' : 'မပါပါ ❌'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onViewDetails(car);
                      onClose();
                    }}
                    className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition"
                  >
                    အသေးစိတ်ကြည့်မည်
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs transition"
          >
            ပိတ်မည်
          </button>
        </div>
      </div>
    </div>
  );
};
