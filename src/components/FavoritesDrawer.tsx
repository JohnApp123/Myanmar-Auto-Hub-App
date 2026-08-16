import React from 'react';
import { X, Heart, Trash2, ExternalLink, Car as CarIcon, Phone } from 'lucide-react';
import { Car } from '../types/car';
import { formatLakhs, getStatusBadgeInfo } from '../utils/formatters';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favoriteCars: Car[];
  onRemoveFavorite: (carId: string) => void;
  onViewDetails: (car: Car) => void;
  onClearAll: () => void;
}

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({
  isOpen,
  onClose,
  favoriteCars,
  onRemoveFavorite,
  onViewDetails,
  onClearAll,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs animate-in fade-in">
      <div 
        className="w-full max-w-md bg-white border-l border-slate-200 h-full shadow-2xl flex flex-col text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            <h3 className="font-bold text-slate-900 text-base">သိမ်းထားသော ကားများ ({favoriteCars.length})</h3>
          </div>
          <div className="flex items-center gap-2">
            {favoriteCars.length > 0 && (
              <button
                onClick={onClearAll}
                className="text-xs text-slate-500 hover:text-rose-600 font-semibold transition"
              >
                အားလုံးရှင်းမည်
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* List */}
        <div className="p-4 overflow-y-auto space-y-3 flex-1 text-xs">
          {favoriteCars.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <Heart className="w-12 h-12 text-slate-300 mx-auto" />
              <p className="text-slate-700 font-bold text-sm">အကြိုက်ဆုံး ကားများ မရှိသေးပါ</p>
              <p className="text-slate-500 text-xs">ကားကတ်များပေါ်ရှိ အသည်းပုံ (❤️) ကို နှိပ်၍ သိမ်းဆည်းနိုင်ပါသည်။</p>
            </div>
          ) : (
            favoriteCars.map((car) => {
              const statusInfo = getStatusBadgeInfo(car.status);
              return (
                <div
                  key={car.id}
                  className="bg-slate-50 p-3 rounded-2xl border border-slate-200 flex gap-3 group hover:border-amber-400 transition"
                >
                  <img
                    src={car.photos[0]}
                    alt=""
                    className="w-24 h-20 rounded-xl object-cover shrink-0 cursor-pointer"
                    onClick={() => {
                      onViewDetails(car);
                      onClose();
                    }}
                  />

                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 
                          onClick={() => {
                            onViewDetails(car);
                            onClose();
                          }}
                          className="font-bold text-slate-900 text-xs hover:text-amber-600 transition truncate cursor-pointer"
                        >
                          {car.title}
                        </h4>
                        <button
                          onClick={() => onRemoveFavorite(car.id)}
                          className="text-slate-400 hover:text-rose-600 transition p-0.5"
                          title="ဖယ်ထုတ်မည်"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-amber-600 font-black text-sm mt-0.5">
                        {formatLakhs(car.sellingPriceLakhs)}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-slate-200 text-[11px] text-slate-500">
                      <span>{car.year} • {car.grade}</span>
                      <button
                        onClick={() => {
                          onViewDetails(car);
                          onClose();
                        }}
                        className="text-slate-900 font-bold hover:underline flex items-center gap-0.5"
                      >
                        <span>ကြည့်မည်</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition"
          >
            ကားများ ဆက်လက်ရှာဖွေမည်
          </button>
        </div>

      </div>
    </div>
  );
};
