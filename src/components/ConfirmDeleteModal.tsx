import React from 'react';
import { Trash2, AlertTriangle, X, ArrowLeft } from 'lucide-react';

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  title: string;
  itemName?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  isOpen,
  title,
  itemName,
  message = 'ဤလုပ်ဆောင်ချက်ကို ပြန်လည်ပြင်ဆင်၍ မရနိုင်ပါ။ ဖျက်ရန် သေချာပါသလား?',
  confirmText = 'ဖျက်မည် (Delete)',
  cancelText = 'မဖျက်တော့ပါ (Cancel)',
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in"
      onClick={onCancel}
    >
      <div 
        className="bg-white border border-slate-200 w-full max-w-md rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden text-slate-800 my-auto animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Warning Banner */}
        <div className="bg-rose-50 border-b border-rose-100 p-5 flex items-start gap-3">
          <div className="w-10 h-10 rounded-2xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <Trash2 className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-base text-rose-950">{title}</h3>
            {itemName && (
              <p className="text-xs font-semibold text-rose-800 mt-0.5 line-clamp-2">
                &ldquo;{itemName}&rdquo;
              </p>
            )}
          </div>
          <button 
            onClick={onCancel}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition"
            title="ပိတ်မည်"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4 text-xs text-slate-600">
          <div className="flex items-start gap-2 bg-amber-50 border border-amber-200/80 rounded-xl p-3 text-amber-900">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed font-medium">{message}</p>
          </div>
        </div>

        {/* Footer Actions (Cancel & Confirm Delete) */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition shadow-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{cancelText}</span>
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-1.5 transition shadow-xs"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{confirmText}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
