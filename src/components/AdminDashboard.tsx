import React, { useState } from 'react';
import { 
  Building, 
  Car as CarIcon, 
  TrendingUp, 
  DollarSign, 
  PlusCircle, 
  Edit, 
  Trash2, 
  ShieldCheck, 
  CheckCircle2, 
  Search, 
  Eye, 
  EyeOff, 
  UserCheck, 
  Download,
  Fuel,
  Sparkles
} from 'lucide-react';
import { Car, AdminUser, CarStatus } from '../types/car';
import { formatLakhs, getStatusBadgeInfo } from '../utils/formatters';

interface AdminDashboardProps {
  cars: Car[];
  admins: AdminUser[];
  currentAdmin: AdminUser;
  onSelectAdmin: (admin: AdminUser) => void;
  onOpenAddCar: () => void;
  onOpenAdminManagement?: () => void;
  onEditCar: (car: Car) => void;
  onDeleteCar: (carId: string) => void;
  onQuickStatusChange: (carId: string, status: CarStatus) => void;
  onViewDetails: (car: Car) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  cars,
  admins,
  currentAdmin,
  onSelectAdmin,
  onOpenAddCar,
  onOpenAdminManagement,
  onEditCar,
  onDeleteCar,
  onQuickStatusChange,
  onViewDetails,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showProfits, setShowProfits] = useState(true);

  // Computed Financials
  const totalStockCount = cars.length;
  const availableCount = cars.filter(c => c.status === 'available').length;
  const newArrivalCount = cars.filter(c => c.status === 'new_arrival').length;
  const reservedCount = cars.filter(c => c.status === 'reserved').length;
  const soldCount = cars.filter(c => c.status === 'sold_out').length;

  const totalInventoryCostLakhs = cars.reduce((sum, c) => sum + (c.buyingPriceLakhs || 0), 0);
  const totalInventorySellingLakhs = cars.reduce((sum, c) => sum + c.sellingPriceLakhs, 0);
  const totalExpectedProfitLakhs = totalInventorySellingLakhs - totalInventoryCostLakhs;

  const soldCars = cars.filter(c => c.status === 'sold_out');
  const realizedProfitLakhs = soldCars.reduce((sum, c) => {
    const sale = c.soldPriceLakhs || c.sellingPriceLakhs;
    const cost = c.buyingPriceLakhs || 0;
    return sum + (sale - cost);
  }, 0);

  const filteredCars = cars.filter((c) => {
    if (filterStatus !== 'all' && c.status !== filterStatus) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return (
        c.title.toLowerCase().includes(q) ||
        c.brand.toLowerCase().includes(q) ||
        c.licensePlate.toLowerCase().includes(q) ||
        c.grade.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 text-slate-800">
      
      {/* 1. Admin Profile & Team Selector Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img
            src={currentAdmin.avatar}
            alt=""
            className="w-12 h-12 rounded-2xl object-cover border-2 border-amber-500 shadow-xs"
          />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-slate-900">{currentAdmin.name}</h2>
              <span className="bg-amber-100 text-amber-900 border border-amber-300 font-bold text-[10px] px-2 py-0.5 rounded-full">
                {currentAdmin.roleBurmese}
              </span>
            </div>
            <p className="text-xs text-slate-500">
              {currentAdmin.email} • Ph: {currentAdmin.phone} (Showroom Management Portal)
            </p>
          </div>
        </div>

        {/* 3 Admin Switchers */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-500 font-semibold hidden sm:inline">တာဝန်ခံ ပြောင်းရန်:</span>
          {admins.map((adm) => (
            <button
              key={adm.id}
              onClick={() => onSelectAdmin(adm)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition flex items-center gap-1.5 ${
                currentAdmin.id === adm.id
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xs font-bold'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <img src={adm.avatar} alt="" className="w-4 h-4 rounded-full object-cover" />
              <span>{adm.name.split(' ')[0]}</span>
            </button>
          ))}

          {onOpenAdminManagement && (
            <button
              type="button"
              onClick={onOpenAdminManagement}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition flex items-center gap-1 border border-slate-200"
              title="Admin ၃ ဦး အချက်အလက် ပြင်ဆင်မည်"
            >
              <span>⚙️ Admin ၃ ဦး ပြင်ရန်</span>
            </button>
          )}

          <button
            onClick={onOpenAddCar}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-xs transition flex items-center gap-1.5 sm:ml-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ ကားသစ်ထည့်မည်</span>
          </button>
        </div>
      </div>

      {/* 2. Four Key Showroom Financial Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        
        {/* Metric 1: Total Stock */}
        <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-xs space-y-1">
          <span className="text-slate-500 text-xs font-semibold block">ကားလက်ကျန် စုစုပေါင်း</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900">{totalStockCount} စီး</span>
            <span className="text-[11px] font-bold text-slate-500">
              တန်ဖိုး {formatLakhs(totalInventorySellingLakhs)}
            </span>
          </div>
          <p className="text-[11px] text-emerald-600 font-medium pt-1">
            🟢 ရောင်းရန်ရှိ: {availableCount + newArrivalCount} စီး
          </p>
        </div>

        {/* Metric 2: Available / In Stock */}
        <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-xs space-y-1">
          <span className="text-slate-500 text-xs font-semibold block">ရောင်းရန်ရှိ & အသစ်ရောက်</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-emerald-600">{availableCount + newArrivalCount} စီး</span>
            <span className="text-[11px] bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded font-bold">
              အသစ် {newArrivalCount} စီး
            </span>
          </div>
          <p className="text-[11px] text-slate-500 pt-1">
            🤝 စရန်ပေးထား: {reservedCount} စီး
          </p>
        </div>

        {/* Metric 3: Sold Out */}
        <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-xs space-y-1">
          <span className="text-slate-500 text-xs font-semibold block">ရောင်းပြီး ကားများ (Sold)</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-rose-600">{soldCount} စီး</span>
            <span className="text-[11px] bg-rose-50 text-rose-800 px-2 py-0.5 rounded font-bold">
              အောင်မြင်စွာ ရောင်းချပြီး
            </span>
          </div>
          <p className="text-[11px] text-slate-500 pt-1">
            စာရင်းပိတ်ပြီးစီးမှု မှတ်တမ်း
          </p>
        </div>

        {/* Metric 4: Total Expected Profit */}
        <div className="bg-gradient-to-br from-amber-500 to-amber-600 text-slate-950 p-4 rounded-2xl shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-slate-900 text-xs font-bold block">ခန့်မှန်း စုစုပေါင်းအမြတ်</span>
            <button
              onClick={() => setShowProfits(!showProfits)}
              className="p-1 rounded-md bg-black/10 hover:bg-black/20 text-slate-900 transition"
              title="အမြတ်ငွေ ဝှက်/ပြ မည်"
            >
              {showProfits ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            </button>
          </div>
          <div className="text-2xl font-black tracking-tight">
            {showProfits ? formatLakhs(totalExpectedProfitLakhs) : '•••••• သိန်း'}
          </div>
          <p className="text-[11px] font-bold text-slate-900/80 pt-1">
            ရောင်းပြီး အမြတ်ရငွေ: {showProfits ? formatLakhs(realizedProfitLakhs) : '••••'}
          </p>
        </div>

      </div>

      {/* 3. Inventory Table & Controls */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
        
        {/* Table Header Controls */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <CarIcon className="w-5 h-5 text-amber-500" />
            <h3 className="font-bold text-slate-900 text-sm">
              Showroom ကားလက်ကျန် စာရင်းဇယား ({filteredCars.length} စီး)
            </h3>
          </div>

          {/* Search & Filter status */}
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-56">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="ကားအမည် / လိုင်စင် ရှာရန်..."
                className="w-full bg-white border border-slate-200 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-slate-700 focus:outline-none"
            >
              <option value="all">အခြေအနေ အားလုံး</option>
              <option value="available">🟢 ရောင်းရန်ရှိ</option>
              <option value="new_arrival">✨ အသစ်ရောက်</option>
              <option value="reserved">🤝 စရန်ပေးထား</option>
              <option value="sold_out">🔴 ရောင်းပြီး</option>
            </select>
          </div>
        </div>

        {/* Inventory Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-600 font-bold text-[11px] uppercase">
                <th className="p-3 pl-4">ကားအမည် / ပုံ</th>
                <th className="p-3">မော်ဒယ် / Grade</th>
                <th className="p-3">လိုင်စင်နံပါတ်</th>
                <th className="p-3">ဝယ်စျေး (အရင်း)</th>
                <th className="p-3">ရောင်းစျေး</th>
                <th className="p-3">ခန့်မှန်းအမြတ်</th>
                <th className="p-3">အခြေအနေ (Status)</th>
                <th className="p-3 text-right pr-4">လုပ်ဆောင်ချက်</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCars.map((car) => {
                const profit = car.sellingPriceLakhs - (car.buyingPriceLakhs || 0);
                const profitPct = car.buyingPriceLakhs 
                  ? ((profit / car.buyingPriceLakhs) * 100).toFixed(1)
                  : '0';

                return (
                  <tr key={car.id} className="hover:bg-slate-50/80 transition">
                    
                    {/* Photo & Title */}
                    <td className="p-3 pl-4">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={car.photos[0]}
                          alt=""
                          className="w-12 h-10 rounded-lg object-cover border border-slate-200 cursor-pointer"
                          onClick={() => onViewDetails(car)}
                        />
                        <div>
                          <p 
                            onClick={() => onViewDetails(car)}
                            className="font-bold text-slate-900 hover:text-amber-600 cursor-pointer line-clamp-1"
                          >
                            {car.title}
                          </p>
                          <span className="text-[10px] text-slate-400">{car.bodyType} • {car.fuelType}</span>
                        </div>
                      </div>
                    </td>

                    {/* Model & Grade */}
                    <td className="p-3">
                      <p className="font-semibold text-slate-800">{car.year} Model</p>
                      <span className="text-[10px] text-amber-700 font-bold bg-amber-50 px-1.5 py-0.2 rounded">
                        {car.grade}
                      </span>
                    </td>

                    {/* License Plate */}
                    <td className="p-3 font-mono font-bold text-slate-700">
                      {car.licenseCity} {car.licensePlate}
                    </td>

                    {/* Buying Cost */}
                    <td className="p-3 font-medium text-slate-600">
                      {showProfits ? formatLakhs(car.buyingPriceLakhs) : '••••'}
                    </td>

                    {/* Selling Price */}
                    <td className="p-3 font-black text-amber-600">
                      {formatLakhs(car.sellingPriceLakhs)}
                    </td>

                    {/* Profit */}
                    <td className="p-3">
                      {showProfits ? (
                        <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                          +{formatLakhs(profit)} ({profitPct}%)
                        </span>
                      ) : (
                        <span className="text-slate-400">••••</span>
                      )}
                    </td>

                    {/* Status Dropdown */}
                    <td className="p-3">
                      <select
                        value={car.status}
                        onChange={(e) => onQuickStatusChange(car.id, e.target.value as any)}
                        className={`text-[11px] font-bold py-1 px-2 rounded-lg border focus:outline-none cursor-pointer ${
                          car.status === 'available'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : car.status === 'new_arrival'
                            ? 'bg-blue-50 text-blue-800 border-blue-300'
                            : car.status === 'reserved'
                            ? 'bg-amber-50 text-amber-800 border-amber-300'
                            : 'bg-rose-50 text-rose-800 border-rose-300'
                        }`}
                      >
                        <option value="available">🟢 ရောင်းရန်ရှိ</option>
                        <option value="new_arrival">✨ အသစ်ရောက်</option>
                        <option value="reserved">🤝 စရန်ပေးထား</option>
                        <option value="sold_out">🔴 ရောင်းပြီး</option>
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="p-3 text-right pr-4">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onViewDetails(car)}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                          title="အသေးစိတ်ကြည့်မည်"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => onEditCar(car)}
                          className="p-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 transition font-medium"
                          title="အချက်အလက် ပြင်ဆင်မည်"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => onDeleteCar(car.id)}
                          className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition"
                          title="ဖျက်မည်"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
};
