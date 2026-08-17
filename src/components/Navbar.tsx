import React, { useState } from 'react';
import { 
  Car as CarIcon, 
  ShieldCheck, 
  User, 
  Heart, 
  Scale, 
  PlusCircle, 
  Calculator, 
  LayoutDashboard, 
  LogOut, 
  ChevronDown, 
  Building,
  PhoneCall,
  Sparkles
} from 'lucide-react';
import { AdminUser } from '../types/car';

export type MainNavTab = 'marketplace' | 'showroom' | 'favorites';

interface NavbarProps {
  activeTab: MainNavTab;
  onTabChange: (tab: MainNavTab) => void;
  isAdminMode: boolean;
  currentAdmin: AdminUser | null;
  admins: AdminUser[];
  onOpenAdminLogin: () => void;
  onLogoutAdmin: () => void;
  onSelectAdmin: (admin: AdminUser) => void;
  onOpenAddCar: () => void;
  onOpenAdminManagement?: () => void;
  onOpenComparison: () => void;
  favoritesCount: number;
  comparisonCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  isAdminMode,
  currentAdmin,
  admins,
  onOpenAdminLogin,
  onLogoutAdmin,
  onSelectAdmin,
  onOpenAddCar,
  onOpenAdminManagement,
  onOpenComparison,
  favoritesCount,
  comparisonCount,
}) => {
  const [showAdminDropdown, setShowAdminDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs text-slate-800">
      
      {/* 1. Top Mini Information Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs px-4 py-1.5 flex items-center justify-between">
        <div className="flex items-center gap-2 max-w-7xl mx-auto w-full">
          <span className="flex items-center gap-1 text-amber-400 font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>MYANMAR CARS HUB</span>
          </span>
          <span className="text-slate-500 hidden sm:inline">•</span>
          <span className="hidden sm:inline text-[11px] text-slate-400">
            ကား ဝယ်/ရောင်း & စာရင်းမှတ်တမ်း စီမံခန့်ခွဲမှုစနစ် (Grade စုံ၊ စက်ပိုင်းစစ်ဆေးပြီး၊ ဝယ်ရင်း/ရောင်းစျေး)
          </span>

          <div className="ml-auto flex items-center gap-3 text-[11px]">
            <span className="text-slate-400 hidden sm:inline">ကား အချက်အလက်နှင့် အရင်းအမြစ်များကို စိတ်ကြိုက် ပြင်ဆင်မှတ်သားနိုင်ပါသည်</span>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 gap-3">
          
          {/* Brand Logo */}
          <div 
            className="flex items-center gap-2.5 cursor-pointer select-none"
            onClick={() => onTabChange('marketplace')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-slate-950 font-black shadow-xs">
              <CarIcon className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-lg sm:text-xl text-slate-900 tracking-tight">
                  MYANMAR CARS HUB
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-semibold tracking-wide">
                ကား အရောင်း & မှတ်တမ်းစီမံခန့်ခွဲမှု
              </p>
            </div>
          </div>

          {/* Navigation Tabs (Desktop) */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
            <button
              onClick={() => onTabChange('marketplace')}
              className={`px-3.5 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                activeTab === 'marketplace'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <CarIcon className="w-3.5 h-3.5 text-amber-500" />
              <span>ကားများ ကြည့်ရှုရန်</span>
            </button>

            <button
              onClick={() => onTabChange('showroom')}
              className={`px-3.5 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                activeTab === 'showroom'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-blue-600" />
              <span>ကားစာရင်း & အမြတ်ငွေ (Admin)</span>
              {isAdminMode && (
                <span className="bg-amber-500 text-slate-950 text-[9px] font-black px-1.5 py-0.2 rounded-full">
                  Admin
                </span>
              )}
            </button>

            <button
              onClick={() => onTabChange('favorites')}
              className={`px-3.5 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                activeTab === 'favorites'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${favoritesCount > 0 ? 'text-rose-500 fill-rose-500' : 'text-slate-400'}`} />
              <span>အကြိုက်ဆုံး</span>
              {favoritesCount > 0 && (
                <span className="bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                  {favoritesCount}
                </span>
              )}
            </button>
          </nav>

          {/* Right Action Tools & Admin Switcher */}
          <div className="flex items-center gap-2">
            
            {/* Compare Trigger Button */}
            {comparisonCount > 0 && (
              <button
                onClick={onOpenComparison}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 text-amber-900 border border-amber-300 text-xs font-bold transition hover:bg-amber-100"
              >
                <Scale className="w-3.5 h-3.5 text-amber-600" />
                <span>နှိုင်းယှဉ် ({comparisonCount})</span>
              </button>
            )}

            {/* Add Car Button (Admin) */}
            {isAdminMode && (
              <button
                onClick={onOpenAddCar}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-xs transition"
              >
                <PlusCircle className="w-4 h-4" />
                <span>+ ကားသစ်ထည့်မည်</span>
              </button>
            )}

            {/* Admin Profile / Role Switcher */}
            <div className="relative">
              {isAdminMode && currentAdmin ? (
                <button
                  onClick={() => setShowAdminDropdown(!showAdminDropdown)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs text-slate-800 transition"
                >
                  <img
                    src={currentAdmin.avatar}
                    alt=""
                    className="w-6 h-6 rounded-full border border-slate-300 object-cover"
                  />
                  <div className="text-left hidden sm:block">
                    <p className="font-bold text-slate-900 leading-tight">{currentAdmin.name}</p>
                    <p className="text-[10px] text-slate-500 leading-tight">{currentAdmin.roleBurmese}</p>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                </button>
              ) : (
                <button
                  onClick={onOpenAdminLogin}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 font-bold text-xs transition"
                >
                  <ShieldCheck className="w-4 h-4 text-slate-600" />
                  <span>Admin ဝင်မည်</span>
                </button>
              )}

              {/* Admin Switcher Dropdown */}
              {showAdminDropdown && isAdminMode && (
                <div 
                  className="absolute right-0 mt-2 w-64 bg-white rounded-2xl border border-slate-200 shadow-xl py-2 z-50 text-xs text-slate-800"
                  onClick={() => setShowAdminDropdown(false)}
                >
                  <div className="px-3 py-1.5 border-b border-slate-100 text-[11px] text-slate-400 font-bold uppercase tracking-wider">
                    Admin အကောင့် ၃ ခု (Role Switch)
                  </div>

                  {admins.map((adm) => (
                    <button
                      key={adm.id}
                      onClick={() => onSelectAdmin(adm)}
                      className={`w-full px-3 py-2 text-left flex items-center gap-2.5 hover:bg-slate-50 transition ${
                        currentAdmin?.id === adm.id ? 'bg-amber-50 font-bold text-amber-900' : ''
                      }`}
                    >
                      <img src={adm.avatar} alt="" className="w-7 h-7 rounded-full object-cover border" />
                      <div>
                        <p className="font-bold text-slate-900">{adm.name}</p>
                        <p className="text-[10px] text-slate-500">{adm.roleBurmese}</p>
                      </div>
                    </button>
                  ))}

                  {onOpenAdminManagement && (
                    <div className="pt-1 mt-1 border-t border-slate-100">
                      <button
                        onClick={onOpenAdminManagement}
                        className="w-full px-3 py-2 text-left text-amber-800 hover:bg-amber-50 flex items-center gap-2 font-bold"
                      >
                        <span>⚙️ Admin ၃ ဦး ပြင်ဆင်ရန် (Manage)</span>
                      </button>
                    </div>
                  )}

                  <div className="pt-1 mt-1 border-t border-slate-100">
                    <button
                      onClick={onLogoutAdmin}
                      className="w-full px-3 py-2 text-left text-rose-600 hover:bg-rose-50 flex items-center gap-2 font-semibold"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>ဝယ်သူမုဒ်သို့ ပြောင်းမည် (Logout)</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>

        {/* Mobile Navigation Tabs */}
        <div className="flex md:hidden items-center justify-around py-2 border-t border-slate-100 text-xs font-bold">
          <button
            onClick={() => onTabChange('marketplace')}
            className={`flex flex-col items-center py-1 px-2 rounded-lg ${
              activeTab === 'marketplace' ? 'text-amber-600 font-black' : 'text-slate-500'
            }`}
          >
            <CarIcon className="w-4 h-4" />
            <span className="text-[10px] mt-0.5">ကားများ</span>
          </button>

          <button
            onClick={() => onTabChange('showroom')}
            className={`flex flex-col items-center py-1 px-2 rounded-lg ${
              activeTab === 'showroom' ? 'text-blue-600 font-black' : 'text-slate-500'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span className="text-[10px] mt-0.5">စာရင်း & အမြတ်</span>
          </button>

          <button
            onClick={() => onTabChange('favorites')}
            className={`flex flex-col items-center py-1 px-2 rounded-lg relative ${
              activeTab === 'favorites' ? 'text-rose-600 font-black' : 'text-slate-500'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span className="text-[10px] mt-0.5">အကြိုက်ဆုံး</span>
            {favoritesCount > 0 && (
              <span className="absolute top-0 right-1 w-2 h-2 rounded-full bg-rose-500" />
            )}
          </button>
        </div>

      </div>
    </header>
  );
};
