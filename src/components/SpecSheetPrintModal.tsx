import React from 'react';
import { X, Printer, Car as CarIcon, Check, Phone, MapPin, Building, ShieldCheck } from 'lucide-react';
import { Car } from '../types/car';
import { formatLakhs } from '../utils/formatters';

interface SpecSheetPrintModalProps {
  isOpen: boolean;
  onClose: () => void;
  car: Car | null;
}

export const SpecSheetPrintModal: React.FC<SpecSheetPrintModalProps> = ({
  isOpen,
  onClose,
  car,
}) => {
  if (!isOpen || !car) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto print:p-0 print:bg-white">
      <div 
        className="bg-white border border-slate-200 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden text-slate-800 my-auto max-h-[94vh] flex flex-col print:border-none print:shadow-none print:max-w-none print:w-full print:rounded-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Controls (Hidden during print) */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between print:hidden shrink-0">
          <div className="flex items-center gap-2">
            <Printer className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-sm">ကား အချက်အလက် စလစ် စာရွက် (Car Spec Sheet)</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow transition"
            >
              <Printer className="w-4 h-4" />
              <span>စာရွက်ထုတ်မည် (Print)</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Sheet Body */}
        <div className="p-8 overflow-y-auto space-y-6 flex-1 text-xs bg-white text-slate-900 print:p-6">
          
          {/* Header Branding */}
          <div className="flex justify-between items-start border-b-2 border-slate-900 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                  <CarIcon className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="text-xl font-black tracking-tight text-slate-950">MYANMAR CARS HUB</h1>
                  <p className="text-[10px] text-slate-500 font-semibold uppercase">ကားအချက်အလက် စာရွက် (Vehicle Specification Sheet)</p>
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-2xl font-black text-amber-600">
                {formatLakhs(car.sellingPriceLakhs)}
              </div>
              <p className="text-[10px] text-slate-500">{car.isPriceNegotiable ? 'စျေးနှုန်း ညှိနှိုင်းနိုင်သည်' : 'သတ်မှတ်စျေး'}</p>
            </div>
          </div>

          {/* Title & Photo */}
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-5 h-44 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
              <img src={car.photos[0]} alt="" className="w-full h-full object-cover" />
            </div>

            <div className="col-span-7 flex flex-col justify-between">
              <div>
                <span className="text-[11px] bg-slate-100 text-slate-800 font-bold px-2 py-0.5 rounded">
                  {car.bodyType} • {car.fuelType}
                </span>
                <h2 className="text-xl font-black text-slate-950 mt-1">{car.title}</h2>
                <p className="text-sm font-bold text-amber-700 mt-0.5">Grade: {car.grade} {car.isFullOption ? '(Full Option)' : ''}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
                <div>
                  <span className="text-slate-500 block text-[10px]">မော်ဒယ်နှစ် (Year):</span>
                  <span className="font-bold">{car.year}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">လိုင်စင်နံပါတ်:</span>
                  <span className="font-mono font-bold">{car.licenseCity} {car.licensePlate}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Engine Power:</span>
                  <span className="font-bold">{car.enginePower}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">မောင်းပြီးကီလို:</span>
                  <span className="font-bold">{car.mileageKm.toLocaleString()} km</span>
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="space-y-2">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-950 border-b pb-1">
              ပါဝင်သော စနစ်များနှင့် အပိုပစ္စည်းများ (Features)
            </h3>
            <div className="grid grid-cols-3 gap-2 text-[11px]">
              {car.features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-1.5 bg-slate-50 p-1.5 rounded-lg border border-slate-200">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="truncate font-medium">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Seller / Origin Verification */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex justify-between items-center text-xs">
            <div className="space-y-0.5">
              <span className="text-[10px] text-slate-500 font-semibold block uppercase">ရောင်းသူ / ဝယ်ယူခဲ့သည့် အရင်းအမြစ်</span>
              <span className="font-bold text-slate-900 block">{car.sellerName || 'ကားပိုင်ရှင် / Showroom'}</span>
              {car.sellerLocation && car.sellerLocation.trim() !== '' && (
                <p className="text-slate-600">📍 {car.sellerLocation}</p>
              )}
              {car.sourceNote && <p className="text-amber-800 font-semibold text-[11px]">မှတ်စု: {car.sourceNote}</p>}
              <p className="text-slate-900 font-bold">ဖုန်း: {car.sellerPhone || '-'} {car.sellerViber ? `| Viber: ${car.sellerViber}` : ''}</p>
            </div>
            <div className="text-right text-[11px] text-slate-500">
              <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded block mb-1">
                အတိုက်အခိုက်ကင်း • ကညန တရားဝင်
              </span>
              <p>စလစ်ထုတ်သည့်ရက်စွဲ: {new Date().toLocaleDateString('en-GB')}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
