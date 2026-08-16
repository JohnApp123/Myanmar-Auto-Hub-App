import React, { useState } from 'react';
import { ShieldCheck, Lock, X, KeyRound, UserCheck, AlertCircle } from 'lucide-react';
import { AdminUser } from '../types/car';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  admins: AdminUser[];
  onLoginSuccess: (admin: AdminUser) => void;
  onOpenAdminManagement?: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  admins,
  onLoginSuccess,
  onOpenAdminManagement,
}) => {
  const [selectedAdminId, setSelectedAdminId] = useState<string>(admins[0]?.id || 'admin-1');
  const [pinInput, setPinInput] = useState<string>('');
  const [error, setError] = useState<string>('');

  if (!isOpen) return null;

  const currentSelectedAdmin = admins.find(a => a.id === selectedAdminId) || admins[0];

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!currentSelectedAdmin) return;

    if (pinInput === currentSelectedAdmin.pin) {
      setError('');
      setPinInput('');
      onLoginSuccess(currentSelectedAdmin);
      onClose();
    } else {
      setError(`မှားယွင်းသော PIN ဖြစ်နေပါသည်။ ${currentSelectedAdmin.name} ၏ စမ်းသပ် PIN (${currentSelectedAdmin.pin}) ကို ရိုက်ထည့်ပါ။`);
    }
  };

  const handleQuickPresetLogin = (admin: AdminUser) => {
    setSelectedAdminId(admin.id);
    setPinInput(admin.pin);
    setError('');
    onLoginSuccess(admin);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-white border border-slate-200 w-full max-w-md rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden text-slate-800 my-auto animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base">Showroom Admin Login</h3>
              <p className="text-xs text-slate-400">အရောင်းပြခန်း စီမံခန့်ခွဲမှု စနစ်</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            title="ပိတ်မည်"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 text-xs">
          
          {/* Quick 1-Click Profile Pick */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-slate-500 font-bold text-[11px] uppercase tracking-wider">
                Admin အကောင့် ၃ ခုမှ ရွေးချယ်ပါ (Quick Switch)
              </label>
              {onOpenAdminManagement && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenAdminManagement();
                  }}
                  className="text-[11px] text-amber-700 hover:text-amber-800 font-bold underline"
                >
                  ⚙️ Admin စာရင်း ပြင်ရန်
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 gap-2">
              {admins.map((admin) => (
                <button
                  key={admin.id}
                  type="button"
                  onClick={() => handleQuickPresetLogin(admin)}
                  className={`p-3 rounded-2xl border text-left flex items-center justify-between transition ${
                    selectedAdminId === admin.id
                      ? 'bg-amber-50 border-amber-400 text-amber-950 font-bold shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <img src={admin.avatar} alt="" className="w-9 h-9 rounded-xl object-cover border border-slate-200" />
                    <div>
                      <p className="font-bold text-slate-900 text-xs">{admin.name}</p>
                      <p className="text-[11px] text-slate-500">{admin.roleBurmese}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] bg-slate-200/80 px-2 py-0.5 rounded font-mono font-bold text-slate-700">
                      PIN: {admin.pin}
                    </span>
                    <span className="block text-[10px] text-amber-700 font-semibold mt-0.5">နှိပ်၍ တန်းဝင်မည် →</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-3 pt-2 border-t border-slate-100">
            <div className="space-y-1">
              <label className="block text-slate-700 font-bold text-xs">
                {currentSelectedAdmin.name} အတွက် PIN ရိုက်ထည့်ပါ:
              </label>
              <div className="relative">
                <input
                  type="password"
                  maxLength={6}
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder={`PIN ရိုက်ထည့်ပါ (${currentSelectedAdmin.pin})`}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 font-mono text-center text-lg tracking-widest focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            {error && (
              <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-1.5 font-medium">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={onClose}
                className="w-1/3 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition"
              >
                ◀ နောက်သို့
              </button>

              <button
                type="submit"
                className="w-2/3 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition shadow-xs"
              >
                Admin ဝင်ရောက်မည်
              </button>
            </div>
          </form>

        </div>

      </div>
    </div>
  );
};
