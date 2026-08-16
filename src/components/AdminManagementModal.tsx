import React, { useState, useEffect } from 'react';
import { 
  Users, 
  ShieldCheck, 
  Edit3, 
  Check, 
  X, 
  ArrowLeft, 
  RotateCcw, 
  Lock, 
  Phone, 
  Mail, 
  Image as ImageIcon,
  KeyRound,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { AdminUser } from '../types/car';
import { INITIAL_ADMINS } from '../data/initialCars';

interface AdminManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  admins: AdminUser[];
  onSaveAdmins: (updatedAdmins: AdminUser[]) => void;
  onSelectActiveAdmin?: (admin: AdminUser) => void;
}

const AVATAR_PRESETS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80'
];

export const AdminManagementModal: React.FC<AdminManagementModalProps> = ({
  isOpen,
  onClose,
  admins,
  onSaveAdmins,
  onSelectActiveAdmin,
}) => {
  const [localAdmins, setLocalAdmins] = useState<AdminUser[]>(admins);
  const [selectedAdminId, setSelectedAdminId] = useState<string>(admins[0]?.id || 'admin-1');
  const [saveSuccessMessage, setSaveSuccessMessage] = useState<string>('');

  useEffect(() => {
    setLocalAdmins(admins);
    if (admins.length > 0 && !admins.some(a => a.id === selectedAdminId)) {
      setSelectedAdminId(admins[0].id);
    }
  }, [admins, isOpen]);

  if (!isOpen) return null;

  const currentEditingAdmin = localAdmins.find(a => a.id === selectedAdminId) || localAdmins[0];

  const handleUpdateCurrentAdmin = (field: keyof AdminUser, value: any) => {
    setLocalAdmins(prev => 
      prev.map(admin => {
        if (admin.id === selectedAdminId) {
          return { ...admin, [field]: value };
        }
        return admin;
      })
    );
  };

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    onSaveAdmins(localAdmins);
    setSaveSuccessMessage('Admin အချက်အလက်များ အောင်မြင်စွာ သိမ်းဆည်းပြီးပါပြီ!');
    setTimeout(() => {
      setSaveSuccessMessage('');
      onClose();
    }, 900);
  };

  const handleResetToDefaults = () => {
    if (window.confirm('Admin အချက်အလက်များကို မူလအတိုင်း (Default) ပြန်လည်သတ်မှတ်ရန် သေချာပါသလား?')) {
      setLocalAdmins(INITIAL_ADMINS);
      onSaveAdmins(INITIAL_ADMINS);
      setSaveSuccessMessage('မူလအတိုင်း ပြန်လည်သတ်မှတ်ပြီးပါပြီ!');
      setTimeout(() => setSaveSuccessMessage(''), 1500);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-white border border-slate-200 w-full max-w-4xl rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden text-slate-800 my-auto max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold">
                Admin ၃ ဦး အချက်အလက် ပြင်ဆင်သတ်မှတ်ခြင်း
              </h2>
              <p className="text-xs text-slate-400">
                ပထမ Admin (Khant Sat) နှင့် ကျန် Admin ၂ ဦး ၏ အမည်၊ ရာထူး၊ PIN နှင့် ဓာတ်ပုံများကို စိတ်ကြိုက် ပြင်ဆင်နိုင်ပါသည်
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              title="ပိတ်မည်"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          
          {/* Success Banner */}
          {saveSuccessMessage && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-800 font-bold text-xs flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{saveSuccessMessage}</span>
            </div>
          )}

          {/* Step 1: Admin Cards Selection (3 Admins) */}
          <div>
            <label className="block text-slate-500 font-bold text-[11px] uppercase tracking-wider mb-2.5">
              ၁။ ပြင်ဆင်လိုသော Admin အကောင့်ကို ရွေးချယ်ပါ (Select Admin to Edit)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {localAdmins.map((admin, index) => {
                const isSelected = admin.id === selectedAdminId;
                const isFirstAdmin = index === 0;

                return (
                  <button
                    key={admin.id}
                    type="button"
                    onClick={() => setSelectedAdminId(admin.id)}
                    className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all duration-150 relative ${
                      isSelected 
                        ? 'bg-amber-50/80 border-amber-500 ring-2 ring-amber-500/20 shadow-xs' 
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100/80 text-slate-700'
                    }`}
                  >
                    {isFirstAdmin && (
                      <span className="absolute top-2 right-2 bg-amber-500 text-slate-950 font-black text-[9px] px-2 py-0.5 rounded-full">
                        Admin 1 (Khant Sat)
                      </span>
                    )}

                    <div className="flex items-center gap-3">
                      <img
                        src={admin.avatar}
                        alt=""
                        className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1">
                          <p className="font-bold text-slate-900 text-sm truncate">{admin.name}</p>
                          {isSelected && <Check className="w-4 h-4 text-amber-600 shrink-0" />}
                        </div>
                        <p className="text-[11px] text-amber-800 font-semibold truncate">{admin.roleBurmese}</p>
                        <p className="text-[10px] text-slate-500 truncate">{admin.nameEnglish}</p>
                      </div>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-200/80 flex items-center justify-between text-[11px]">
                      <span className="font-mono font-bold text-slate-600">PIN: {admin.pin}</span>
                      <span className="text-amber-700 font-bold flex items-center gap-0.5">
                        <Edit3 className="w-3 h-3" />
                        <span>{isSelected ? 'ပြင်ဆင်နေသည်' : 'ပြင်ရန်နှိပ်ပါ'}</span>
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Edit Form for Selected Admin */}
          {currentEditingAdmin && (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-black text-xs">
                    {localAdmins.findIndex(a => a.id === selectedAdminId) + 1}
                  </span>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">
                      {currentEditingAdmin.name} ၏ အချက်အလက်များ ပြင်ဆင်ရန်
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      အမည်၊ ရာထူး၊ PIN နှင့် အခြားဆက်သွယ်ရန် အချက်အလက်များ
                    </p>
                  </div>
                </div>

                {onSelectActiveAdmin && (
                  <button
                    type="button"
                    onClick={() => {
                      onSelectActiveAdmin(currentEditingAdmin);
                      setSaveSuccessMessage(`${currentEditingAdmin.name} အဖြစ် တန်းဝင်ရောက်ထားပါသည်!`);
                      setTimeout(() => setSaveSuccessMessage(''), 1500);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-[11px] transition flex items-center gap-1"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                    <span>ဤအကောင့်ဖြင့် ဝင်မည်</span>
                  </button>
                )}
              </div>

              {/* Input Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* 1. Admin Name (Burmese / Display Name) */}
                <div>
                  <label className="block text-slate-700 font-bold text-xs mb-1">
                    Admin အမည် (Display Name) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={currentEditingAdmin.name}
                    onChange={(e) => handleUpdateCurrentAdmin('name', e.target.value)}
                    placeholder="ဥပမာ: Khant Sat, ဒေါ်မေသူ..."
                    className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                    required
                  />
                </div>

                {/* 2. English Name */}
                <div>
                  <label className="block text-slate-700 font-bold text-xs mb-1">
                    အင်္ဂလိပ်အမည် (English Name)
                  </label>
                  <input
                    type="text"
                    value={currentEditingAdmin.nameEnglish}
                    onChange={(e) => handleUpdateCurrentAdmin('nameEnglish', e.target.value)}
                    placeholder="ဥပမာ: Khant Sat, Daw May Thu..."
                    className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                  />
                </div>

                {/* 3. Role / Designation (Burmese) */}
                <div>
                  <label className="block text-slate-700 font-bold text-xs mb-1">
                    ရာထူး / တာဝန် (Role / Title - မြန်မာလို)
                  </label>
                  <input
                    type="text"
                    value={currentEditingAdmin.roleBurmese}
                    onChange={(e) => handleUpdateCurrentAdmin('roleBurmese', e.target.value)}
                    placeholder="ဥပမာ: စာရင်းစီမံခန့်ခွဲသူ / Super Admin..."
                    className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                  />
                </div>

                {/* 4. PIN Code */}
                <div>
                  <label className="block text-slate-700 font-bold text-xs mb-1">
                    လျှို့ဝှက်နံပါတ် (Login PIN - ၄ လုံး) <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      maxLength={6}
                      value={currentEditingAdmin.pin}
                      onChange={(e) => handleUpdateCurrentAdmin('pin', e.target.value)}
                      placeholder="ဥပမာ: 1111"
                      className="w-full bg-white border border-slate-300 rounded-xl pl-9 pr-3.5 py-2 text-slate-900 font-mono font-bold text-sm tracking-wider focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                      required
                    />
                    <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  </div>
                </div>

                {/* 5. Phone Number */}
                <div>
                  <label className="block text-slate-700 font-bold text-xs mb-1">
                    ဖုန်းနံပါတ် (Phone Number)
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={currentEditingAdmin.phone}
                      onChange={(e) => handleUpdateCurrentAdmin('phone', e.target.value)}
                      placeholder="ဥပမာ: 09 790 112233"
                      className="w-full bg-white border border-slate-300 rounded-xl pl-9 pr-3.5 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                    />
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  </div>
                </div>

                {/* 6. Email */}
                <div>
                  <label className="block text-slate-700 font-bold text-xs mb-1">
                    အီးမေးလ် (Email Address)
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={currentEditingAdmin.email}
                      onChange={(e) => handleUpdateCurrentAdmin('email', e.target.value)}
                      placeholder="ဥပမာ: admin@autohub.mm"
                      className="w-full bg-white border border-slate-300 rounded-xl pl-9 pr-3.5 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                    />
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  </div>
                </div>

              </div>

              {/* Avatar Chooser & URL */}
              <div className="space-y-2 pt-2 border-t border-slate-200">
                <label className="block text-slate-700 font-bold text-xs">
                  ပရိုဖိုင်ဓာတ်ပုံ (Profile Avatar)
                </label>
                
                {/* Preset Avatars */}
                <div className="flex items-center gap-2.5 overflow-x-auto pb-1">
                  {AVATAR_PRESETS.map((avatarUrl, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleUpdateCurrentAdmin('avatar', avatarUrl)}
                      className={`w-12 h-12 rounded-xl overflow-hidden border-2 shrink-0 transition ${
                        currentEditingAdmin.avatar === avatarUrl
                          ? 'border-amber-500 ring-2 ring-amber-500/30 scale-105'
                          : 'border-slate-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={avatarUrl} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>

                {/* Custom Avatar URL input */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="text"
                    value={currentEditingAdmin.avatar}
                    onChange={(e) => handleUpdateCurrentAdmin('avatar', e.target.value)}
                    placeholder="စိတ်ကြိုက် Avatar Photo URL ထည့်ရန်..."
                    className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              {/* Permissions Checkboxes */}
              <div className="bg-white border border-slate-200 p-3.5 rounded-xl space-y-2">
                <span className="text-[11px] font-bold text-slate-700 block uppercase tracking-wider">
                  လုပ်ပိုင်ခွင့် သတ်မှတ်ချက်များ (Permissions)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <label className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={currentEditingAdmin.canViewProfits}
                      onChange={(e) => handleUpdateCurrentAdmin('canViewProfits', e.target.checked)}
                      className="rounded text-amber-600 focus:ring-amber-500"
                    />
                    <span className="font-semibold text-slate-800 text-xs">ဝယ်ရင်း/အမြတ် ကြည့်နိုင်</span>
                  </label>

                  <label className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={currentEditingAdmin.canEditPrices}
                      onChange={(e) => handleUpdateCurrentAdmin('canEditPrices', e.target.checked)}
                      className="rounded text-amber-600 focus:ring-amber-500"
                    />
                    <span className="font-semibold text-slate-800 text-xs">ကားပြင်ဆင်/စျေးပြင်နိုင်</span>
                  </label>

                  <label className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={currentEditingAdmin.canManageAdmins}
                      onChange={(e) => handleUpdateCurrentAdmin('canManageAdmins', e.target.checked)}
                      className="rounded text-amber-600 focus:ring-amber-500"
                    />
                    <span className="font-semibold text-slate-800 text-xs">Admin စီမံခန့်ခွဲနိုင်</span>
                  </label>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Footer Actions (Save, Cancel, Reset) */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            onClick={handleResetToDefaults}
            className="text-xs text-slate-500 hover:text-slate-800 font-semibold transition flex items-center gap-1.5 self-start sm:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>မူလအတိုင်း ပြန်ထားမည် (Reset)</span>
          </button>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition shadow-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>◀ နောက်သို့ / ပယ်ဖျက်မည်</span>
            </button>

            <button
              type="button"
              onClick={handleSave}
              className="px-6 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-1.5 transition shadow-xs"
            >
              <Check className="w-4 h-4 stroke-[3]" />
              <span>သိမ်းဆည်းမည် (Save Changes)</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
