import React, { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { 
  Car as CarIcon, 
  Sparkles, 
  Building, 
  Calculator, 
  Heart, 
  Scale, 
  PlusCircle, 
  Search, 
  ShieldCheck, 
  CheckCircle2, 
  PhoneCall, 
  TrendingUp,
  RotateCcw,
  Trash2
} from 'lucide-react';
import { Car, AdminUser, FilterOptions, CarStatus } from './types/car';
import { INITIAL_CARS, INITIAL_ADMINS } from './data/initialCars';
import { Navbar, MainNavTab } from './components/Navbar';
import { FilterBar } from './components/FilterBar';
import { CarCard } from './components/CarCard';
import { CarDetailModal } from './components/CarDetailModal';
import { CarFormModal } from './components/CarFormModal';
import { AdminDashboard } from './components/AdminDashboard';
import { CarComparisonModal } from './components/CarComparisonModal';
import { SpecSheetPrintModal } from './components/SpecSheetPrintModal';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminManagementModal } from './components/AdminManagementModal';
import { ConfirmDeleteModal } from './components/ConfirmDeleteModal';
import { formatLakhs } from './utils/formatters';

const STORAGE_KEYS = {
  CARS: 'myanmar_cars_hub_inventory_v2',
  ADMINS: 'myanmar_cars_hub_admins_v2',
  CURRENT_ADMIN_ID: 'myanmar_cars_hub_active_admin_id',
  IS_ADMIN_MODE: 'myanmar_cars_hub_is_admin_mode',
  FAVORITES: 'myanmar_cars_hub_favorites_v2',
  SHOW_PROFITS: 'myanmar_cars_hub_show_profits',
};

const DEFAULT_FILTERS: FilterOptions = {
  searchQuery: '',
  status: 'all',
  brand: '',
  bodyType: '',
  fuelType: '',
  minPrice: 0,
  maxPrice: 6000,
  minYear: 2000,
  maxYear: 2026,
  sellerType: '',
  hasPushStart: false,
  hasSunroof: false,
  has360Camera: false,
  hasLeatherSeats: false,
  sortBy: 'newest',
};

export default function App() {
  // Navigation Tab State
  const [activeTab, setActiveTab] = useState<MainNavTab>('marketplace');

  // Cars Inventory State
  const [cars, setCars] = useState<Car[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CARS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse cars', e);
      }
    }
    return INITIAL_CARS;
  });

  // Admins List (3 editable admins with Khant Sat as primary)
  const [admins, setAdmins] = useState<AdminUser[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ADMINS);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch (e) {
        console.error('Failed to parse admins', e);
      }
    }
    return INITIAL_ADMINS;
  });

  // Admin Mode Toggle & Current Active Admin
  const [isAdminMode, setIsAdminMode] = useState<boolean>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.IS_ADMIN_MODE);
    return saved ? JSON.parse(saved) : true;
  });

  const [currentAdmin, setCurrentAdmin] = useState<AdminUser | null>(() => {
    const savedId = localStorage.getItem(STORAGE_KEYS.CURRENT_ADMIN_ID);
    const found = admins.find(a => a.id === savedId);
    return found || admins[0] || INITIAL_ADMINS[0];
  });

  const [showProfitMargins, setShowProfitMargins] = useState<boolean>(true);

  // Favorites & Comparison State
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    return saved ? JSON.parse(saved) : ['car-1', 'car-4'];
  });

  const [comparedCarIds, setComparedCarIds] = useState<string[]>([]);

  // Search & Filter Options
  const [filters, setFilters] = useState<FilterOptions>(DEFAULT_FILTERS);

  // Modals State
  const [selectedCarForDetail, setSelectedCarForDetail] = useState<Car | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);

  const [carToEdit, setCarToEdit] = useState<Car | null>(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState<boolean>(false);

  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState<boolean>(false);
  const [isAdminManagementModalOpen, setIsAdminManagementModalOpen] = useState<boolean>(false);
  const [isComparisonModalOpen, setIsComparisonModalOpen] = useState<boolean>(false);
  const [selectedCarForPrint, setSelectedCarForPrint] = useState<Car | null>(null);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState<boolean>(false);
  const [isFavoritesDrawerOpen, setIsFavoritesDrawerOpen] = useState<boolean>(false);

  // Custom Confirm Delete State
  const [deleteConfirmConfig, setDeleteConfirmConfig] = useState<{
    isOpen: boolean;
    title: string;
    itemName?: string;
    message?: string;
    confirmText?: string;
    onConfirm: () => void;
  } | null>(null);

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CARS, JSON.stringify(cars));
  }, [cars]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ADMINS, JSON.stringify(admins));
  }, [admins]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.IS_ADMIN_MODE, JSON.stringify(isAdminMode));
  }, [isAdminMode]);

  useEffect(() => {
    if (currentAdmin) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_ADMIN_ID, currentAdmin.id);
    }
  }, [currentAdmin]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  // Global Back Key (Escape) Handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (deleteConfirmConfig?.isOpen) {
          setDeleteConfirmConfig(null);
          return;
        }
        if (isAdminManagementModalOpen) {
          setIsAdminManagementModalOpen(false);
          return;
        }
        if (isFormModalOpen) {
          setIsFormModalOpen(false);
          return;
        }
        if (isDetailModalOpen) {
          setIsDetailModalOpen(false);
          return;
        }
        if (isAdminLoginModalOpen) {
          setIsAdminLoginModalOpen(false);
          return;
        }
        if (isComparisonModalOpen) {
          setIsComparisonModalOpen(false);
          return;
        }
        if (isPrintModalOpen) {
          setIsPrintModalOpen(false);
          return;
        }
        if (isFavoritesDrawerOpen) {
          setIsFavoritesDrawerOpen(false);
          return;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    deleteConfirmConfig,
    isAdminManagementModalOpen,
    isFormModalOpen,
    isDetailModalOpen,
    isAdminLoginModalOpen,
    isComparisonModalOpen,
    isPrintModalOpen,
    isFavoritesDrawerOpen,
  ]);

  // Handlers for Cars CRUD
  const handleSaveCar = (carData: Partial<Car>) => {
    if (carToEdit) {
      // Edit existing car
      setCars(prev => prev.map(c => c.id === carToEdit.id ? { ...c, ...carData } as Car : c));
    } else {
      // Add new car with clean user-specified values (no unrequested default locations or mock data)
      const newCar: Car = {
        id: `car-${Date.now()}`,
        title: carData.title || `${carData.brand || ''} ${carData.model || ''} ${carData.year ? `(${carData.year})` : ''}`.trim() || 'ကားအသစ်',
        brand: carData.brand || '',
        model: carData.model || '',
        year: carData.year || new Date().getFullYear(),
        bodyType: carData.bodyType || 'Sedan',
        sellingPriceLakhs: carData.sellingPriceLakhs ?? 0,
        buyingPriceLakhs: carData.buyingPriceLakhs ?? 0,
        isPriceNegotiable: carData.isPriceNegotiable ?? true,
        color: carData.color || '',
        colorBurmese: carData.colorBurmese || '',
        enginePower: carData.enginePower || '',
        fuelType: carData.fuelType || 'Petrol',
        transmission: carData.transmission || 'Auto',
        mileageKm: carData.mileageKm ?? 0,
        licensePlate: carData.licensePlate || '',
        licenseCity: carData.licenseCity || '',
        grade: carData.grade || '',
        isFullOption: carData.isFullOption ?? false,
        features: carData.features || [],
        status: carData.status || 'available',
        sellerType: carData.sellerType || 'owner',
        sellerName: carData.sellerName || '',
        sellerPhone: carData.sellerPhone || '',
        sellerViber: carData.sellerViber || '',
        sellerLocation: carData.sellerLocation ? carData.sellerLocation.trim() : '',
        sourceNote: carData.sourceNote || '',
        photos: carData.photos?.length ? carData.photos : ['https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80'],
        description: carData.description || '',
        conditionNotes: carData.conditionNotes || [],
        addedDate: new Date().toISOString(),
        viewsCount: 1,
      };

      setCars(prev => [newCar, ...prev]);

      // Confetti effect
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }
  };

  const handleDeleteCar = (carId: string) => {
    const car = cars.find(c => c.id === carId);
    const carTitle = car ? car.title : 'ရွေးချယ်ထားသော ကား';

    setDeleteConfirmConfig({
      isOpen: true,
      title: 'ကားစာရင်း ဖျက်ရန် အတည်ပြုပါ',
      itemName: carTitle,
      message: 'ဤကားမှတ်တမ်းကို စာရင်းမှ လုံးဝဖျက်ပစ်မည်ဖြစ်ပါသည်။ ဖျက်ရန် သေချာပါသလား?',
      confirmText: 'ဖျက်မည် (Delete)',
      onConfirm: () => {
        setCars(prev => prev.filter(c => c.id !== carId));
        setFavoriteIds(prev => prev.filter(id => id !== carId));
        setComparedCarIds(prev => prev.filter(id => id !== carId));
        if (selectedCarForDetail?.id === carId) {
          setIsDetailModalOpen(false);
        }
        setDeleteConfirmConfig(null);
      },
    });
  };

  const handleQuickStatusChange = (carId: string, newStatus: CarStatus) => {
    setCars(prev => prev.map(c => {
      if (c.id === carId) {
        return {
          ...c,
          status: newStatus,
          soldDate: newStatus === 'sold_out' ? new Date().toISOString() : c.soldDate,
        };
      }
      return c;
    }));
  };

  // Favorites & Compare
  const handleToggleFavorite = (carId: string) => {
    setFavoriteIds(prev => 
      prev.includes(carId) ? prev.filter(id => id !== carId) : [...prev, carId]
    );
  };

  const handleToggleCompare = (car: Car) => {
    if (comparedCarIds.includes(car.id)) {
      setComparedCarIds(prev => prev.filter(id => id !== car.id));
    } else {
      if (comparedCarIds.length >= 4) {
        alert('နှိုင်းယှဉ်ရန် အများဆုံး ၄ စီးသာ ရွေးချယ်နိုင်ပါသည်။');
        return;
      }
      setComparedCarIds(prev => [...prev, car.id]);
    }
  };

  // Admin Switcher & Management
  const handleSelectAdmin = (admin: AdminUser) => {
    setCurrentAdmin(admin);
    setIsAdminMode(true);
  };

  const handleSaveAdmins = (updatedAdmins: AdminUser[]) => {
    setAdmins(updatedAdmins);
    if (currentAdmin) {
      const matched = updatedAdmins.find(a => a.id === currentAdmin.id);
      if (matched) {
        setCurrentAdmin(matched);
      } else {
        setCurrentAdmin(updatedAdmins[0]);
      }
    }
  };

  const handleLogoutAdmin = () => {
    setIsAdminMode(false);
  };

  // Filtered and Sorted Cars Calculation
  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      // 1. Search Query
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase();
        const matchesTitle = car.title.toLowerCase().includes(q);
        const matchesBrand = car.brand.toLowerCase().includes(q);
        const matchesModel = car.model.toLowerCase().includes(q);
        const matchesGrade = car.grade.toLowerCase().includes(q);
        const matchesLicense = `${car.licenseCity} ${car.licensePlate}`.toLowerCase().includes(q);
        if (!matchesTitle && !matchesBrand && !matchesModel && !matchesGrade && !matchesLicense) {
          return false;
        }
      }

      // 2. Status
      if (filters.status !== 'all' && car.status !== filters.status) {
        return false;
      }

      // 3. Brand
      if (filters.brand && car.brand.toLowerCase() !== filters.brand.toLowerCase()) {
        return false;
      }

      // 4. Body Type
      if (filters.bodyType && car.bodyType !== filters.bodyType) {
        return false;
      }

      // 5. Fuel Type
      if (filters.fuelType && car.fuelType !== filters.fuelType) {
        return false;
      }

      // 6. Max Price
      if (car.sellingPriceLakhs > filters.maxPrice) {
        return false;
      }

      // 7. Checkboxes
      if (filters.hasPushStart && !car.features.some(f => f.toLowerCase().includes('push start'))) {
        return false;
      }
      if (filters.has360Camera && !car.features.some(f => f.toLowerCase().includes('360'))) {
        return false;
      }
      if (filters.hasSunroof && !car.features.some(f => f.toLowerCase().includes('sunroof'))) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      switch (filters.sortBy) {
        case 'price_asc':
          return a.sellingPriceLakhs - b.sellingPriceLakhs;
        case 'price_desc':
          return b.sellingPriceLakhs - a.sellingPriceLakhs;
        case 'year_desc':
          return b.year - a.year;
        case 'mileage_asc':
          return a.mileageKm - b.mileageKm;
        case 'newest':
        default:
          return new Date(b.addedDate || 0).getTime() - new Date(a.addedDate || 0).getTime();
      }
    });
  }, [cars, filters]);

  const favoriteCars = useMemo(() => {
    return cars.filter(c => favoriteIds.includes(c.id));
  }, [cars, favoriteIds]);

  const comparedCars = useMemo(() => {
    return cars.filter(c => comparedCarIds.includes(c.id));
  }, [cars, comparedCarIds]);

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-800 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      
      {/* 1. Clean Top Header & Navigation */}
      <Navbar
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        isAdminMode={isAdminMode}
        currentAdmin={currentAdmin}
        admins={admins}
        onOpenAdminLogin={() => setIsAdminLoginModalOpen(true)}
        onLogoutAdmin={handleLogoutAdmin}
        onSelectAdmin={handleSelectAdmin}
        onOpenAddCar={() => {
          setCarToEdit(null);
          setIsFormModalOpen(true);
        }}
        onOpenAdminManagement={() => setIsAdminManagementModalOpen(true)}
        onOpenComparison={() => setIsComparisonModalOpen(true)}
        favoritesCount={favoriteIds.length}
        comparisonCount={comparedCarIds.length}
      />

      {/* 2. Main Container Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        
        {/* ================= VIEW 1: MARKETPLACE ================= */}
        {activeTab === 'marketplace' && (
          <div className="space-y-6">
            
            {/* Horizontal Filter Bar */}
            <FilterBar
              filters={filters}
              onFilterChange={setFilters}
              onResetFilters={() => setFilters(DEFAULT_FILTERS)}
              totalResultsCount={filteredCars.length}
              totalCarsCount={cars.length}
              availableBrands={Array.from(new Set(cars.map((c) => c.brand).filter(Boolean)))}
              availableBodyTypes={Array.from(new Set(cars.map((c) => c.bodyType).filter(Boolean)))}
            />

            {/* Cars Grid */}
            {filteredCars.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-4 shadow-xs">
                <CarIcon className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="text-base font-bold text-slate-800">
                  ရှာဖွေမှုနှင့် ကိုက်ညီသော ကား မတွေ့ရှိပါ
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  စစ်ထုတ်ထားသော စျေးနှုန်း၊ ကားအမျိုးအစား သို့မဟုတ် အမည်ရှာဖွေမှုကို ပြောင်းလဲစမ်းသပ်ကြည့်ပါ။
                </p>
                <button
                  onClick={() => setFilters(DEFAULT_FILTERS)}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition inline-flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>စစ်ထုတ်မှု အားလုံး ရှင်းမည်</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredCars.map((car) => (
                  <CarCard
                    key={car.id}
                    car={car}
                    isAdminMode={isAdminMode}
                    showProfitMargins={showProfitMargins}
                    isFavorite={favoriteIds.includes(car.id)}
                    isCompared={comparedCarIds.includes(car.id)}
                    onToggleFavorite={handleToggleFavorite}
                    onToggleCompare={handleToggleCompare}
                    onViewDetails={(c) => {
                      setSelectedCarForDetail(c);
                      setIsDetailModalOpen(true);
                    }}
                    onEditCar={(c) => {
                      setCarToEdit(c);
                      setIsFormModalOpen(true);
                    }}
                    onDeleteCar={handleDeleteCar}
                    onQuickStatusChange={handleQuickStatusChange}
                  />
                ))}
              </div>
            )}

          </div>
        )}

        {/* ================= VIEW 2: SHOWROOM & FINANCIALS ================= */}
        {activeTab === 'showroom' && (
          <div>
            {isAdminMode && currentAdmin ? (
              <AdminDashboard
                cars={cars}
                admins={admins}
                currentAdmin={currentAdmin}
                onSelectAdmin={handleSelectAdmin}
                onOpenAddCar={() => {
                  setCarToEdit(null);
                  setIsFormModalOpen(true);
                }}
                onOpenAdminManagement={() => setIsAdminManagementModalOpen(true)}
                onEditCar={(c) => {
                  setCarToEdit(c);
                  setIsFormModalOpen(true);
                }}
                onDeleteCar={handleDeleteCar}
                onQuickStatusChange={handleQuickStatusChange}
                onViewDetails={(c) => {
                  setSelectedCarForDetail(c);
                  setIsDetailModalOpen(true);
                }}
              />
            ) : (
              <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-4 shadow-xs max-w-md mx-auto">
                <ShieldCheck className="w-12 h-12 text-amber-500 mx-auto" />
                <h3 className="text-base font-bold text-slate-900">
                  Showroom Admin စီမံခန့်ခွဲမှု စနစ်
                </h3>
                <p className="text-xs text-slate-500">
                  ကားလက်ကျန်စာရင်းများ၊ ဝယ်စျေး/ရောင်းစျေး နှင့် အမြတ်ငွေစာရင်းများ ကြည့်ရှုရန် Admin အဖြစ် ဝင်ရောက်ပါ။
                </p>
                <button
                  onClick={() => setIsAdminLoginModalOpen(true)}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition"
                >
                  Admin ဝင်ရောက်မည်
                </button>
              </div>
            )}
          </div>
        )}

        {/* ================= VIEW 4: FAVORITES ================= */}
        {activeTab === 'favorites' && (
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900">
                    သိမ်းဆည်းထားသော ကားများ ({favoriteCars.length} စီး)
                  </h2>
                  <p className="text-xs text-slate-500">သင်စိတ်ဝင်စား၍ မှတ်သားထားသော ကားများ စာရင်း</p>
                </div>
              </div>
              {favoriteCars.length > 0 && (
                <button
                  onClick={() => {
                    setDeleteConfirmConfig({
                      isOpen: true,
                      title: 'သိမ်းဆည်းထားသော ကားများ အားလုံး ဖျက်မည်',
                      message: 'သိမ်းဆည်းထားသော ကားစာရင်း အားလုံးကို ဖျက်ရန် သေချာပါသလား?',
                      confirmText: 'ဖျက်မည် (Clear All)',
                      onConfirm: () => {
                        setFavoriteIds([]);
                        setDeleteConfirmConfig(null);
                      }
                    });
                  }}
                  className="text-xs text-slate-500 hover:text-rose-600 font-semibold transition flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>အားလုံး ရှင်းမည်</span>
                </button>
              )}
            </div>

            {favoriteCars.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-3 shadow-xs">
                <Heart className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="text-base font-bold text-slate-800">
                  အကြိုက်ဆုံး ကားများ မရှိသေးပါ
                </h3>
                <p className="text-xs text-slate-500">
                  ကားစျေးကွက်မှ သင်ကြိုက်နှစ်သက်သော ကားများပေါ်ရှိ အသည်းပုံ (❤️) ကို နှိပ်၍ သိမ်းဆည်းနိုင်ပါသည်။
                </p>
                <button
                  onClick={() => setActiveTab('marketplace')}
                  className="px-5 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition"
                >
                  ကားများ ရှာဖွေမည်
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {favoriteCars.map((car) => (
                  <CarCard
                    key={car.id}
                    car={car}
                    isAdminMode={isAdminMode}
                    showProfitMargins={showProfitMargins}
                    isFavorite={true}
                    isCompared={comparedCarIds.includes(car.id)}
                    onToggleFavorite={handleToggleFavorite}
                    onToggleCompare={handleToggleCompare}
                    onViewDetails={(c) => {
                      setSelectedCarForDetail(c);
                      setIsDetailModalOpen(true);
                    }}
                    onEditCar={(c) => {
                      setCarToEdit(c);
                      setIsFormModalOpen(true);
                    }}
                    onDeleteCar={handleDeleteCar}
                    onQuickStatusChange={handleQuickStatusChange}
                  />
                ))}
              </div>
            )}
          </div>
        )}

      </main>

      {/* 3. Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-6 text-slate-600 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 font-black text-xs">
              <CarIcon className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-slate-900">MYANMAR CARS HUB</span>
            <span className="text-slate-400">© 2026. All Rights Reserved.</span>
          </div>

          <div className="flex items-center gap-4 text-slate-500 font-medium">
            <span>ကား အရောင်း/အဝယ် စီမံခန့်ခွဲမှု စနစ်</span>
            <span>မြန်မာနိုင်ငံ ကားဈေးကွက်</span>
          </div>
        </div>
      </footer>

      {/* ================= MODALS ================= */}

      {/* 1. Car Detail Modal */}
      <CarDetailModal
        car={selectedCarForDetail}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        isAdminMode={isAdminMode}
        currentAdmin={currentAdmin}
        showProfitMargins={showProfitMargins}
        isFavorite={selectedCarForDetail ? favoriteIds.includes(selectedCarForDetail.id) : false}
        isCompared={selectedCarForDetail ? comparedCarIds.includes(selectedCarForDetail.id) : false}
        onToggleFavorite={handleToggleFavorite}
        onToggleCompare={handleToggleCompare}
        onEditCar={(c) => {
          setIsDetailModalOpen(false);
          setCarToEdit(c);
          setIsFormModalOpen(true);
        }}
        onPrintSpecSheet={(c) => {
          setSelectedCarForPrint(c);
          setIsPrintModalOpen(true);
        }}
      />

      {/* 2. Car Form Modal (Add / Edit) */}
      <CarFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSaveCar={handleSaveCar}
        carToEdit={carToEdit}
        isAdminMode={isAdminMode}
      />

      {/* 3. Admin Login Modal */}
      <AdminLoginModal
        isOpen={isAdminLoginModalOpen}
        onClose={() => setIsAdminLoginModalOpen(false)}
        admins={admins}
        onLoginSuccess={handleSelectAdmin}
        onOpenAdminManagement={() => {
          setIsAdminLoginModalOpen(false);
          setIsAdminManagementModalOpen(true);
        }}
      />

      {/* 4. Admin Management Modal (Edit all 3 Admins) */}
      <AdminManagementModal
        isOpen={isAdminManagementModalOpen}
        onClose={() => setIsAdminManagementModalOpen(false)}
        admins={admins}
        onSaveAdmins={handleSaveAdmins}
        onSelectActiveAdmin={(adm) => {
          handleSelectAdmin(adm);
        }}
      />

      {/* 5. Car Comparison Modal */}
      <CarComparisonModal
        isOpen={isComparisonModalOpen}
        onClose={() => setIsComparisonModalOpen(false)}
        comparedCars={comparedCars}
        onRemoveFromCompare={(id) => setComparedCarIds(prev => prev.filter(cId => cId !== id))}
        onViewDetails={(c) => {
          setIsComparisonModalOpen(false);
          setSelectedCarForDetail(c);
          setIsDetailModalOpen(true);
        }}
        onClearCompare={() => setComparedCarIds([])}
      />

      {/* 6. Printable Spec Sheet Modal */}
      <SpecSheetPrintModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        car={selectedCarForPrint}
      />

      {/* 7. Favorites Drawer */}
      <FavoritesDrawer
        isOpen={isFavoritesDrawerOpen}
        onClose={() => setIsFavoritesDrawerOpen(false)}
        favoriteCars={favoriteCars}
        onRemoveFavorite={handleToggleFavorite}
        onViewDetails={(c) => {
          setIsFavoritesDrawerOpen(false);
          setSelectedCarForDetail(c);
          setIsDetailModalOpen(true);
        }}
        onClearAll={() => {
          setDeleteConfirmConfig({
            isOpen: true,
            title: 'သိမ်းဆည်းထားသော ကားများ အားလုံး ဖျက်မည်',
            message: 'သိမ်းဆည်းထားသော ကားစာရင်း အားလုံးကို ဖျက်ရန် သေချာပါသလား?',
            confirmText: 'အားလုံးဖျက်မည်',
            onConfirm: () => {
              setFavoriteIds([]);
              setDeleteConfirmConfig(null);
            }
          });
        }}
      />

      {/* 8. Global Custom Confirm Delete Modal */}
      {deleteConfirmConfig && (
        <ConfirmDeleteModal
          isOpen={deleteConfirmConfig.isOpen}
          title={deleteConfirmConfig.title}
          itemName={deleteConfirmConfig.itemName}
          message={deleteConfirmConfig.message}
          confirmText={deleteConfirmConfig.confirmText}
          onConfirm={deleteConfirmConfig.onConfirm}
          onCancel={() => setDeleteConfirmConfig(null)}
        />
      )}

    </div>
  );
}
