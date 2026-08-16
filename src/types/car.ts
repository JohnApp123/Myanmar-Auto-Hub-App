export type BodyType = 'Sedan' | 'SUV' | 'Crossover' | 'Hatchback' | 'MPV' | 'Pickup' | 'Van' | 'Luxury' | string;

export type FuelType = 'Petrol' | 'Diesel' | 'Hybrid' | 'EV' | 'Plug-in Hybrid' | string;

export type TransmissionType = 'Auto' | 'Manual' | 'CVT' | 'e-CVT' | string;

export type CarStatus = 'available' | 'new_arrival' | 'reserved' | 'sold_out';

export type SellerType = 'owner' | 'broker' | 'dealer' | 'other' | string;

export interface Car {
  id: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  bodyType: BodyType;
  sellingPriceLakhs: number; // in Lakhs MMK (သိန်း)
  buyingPriceLakhs: number; // in Lakhs MMK (သိန်း) - Admin only
  isPriceNegotiable: boolean;
  color: string;
  colorBurmese: string;
  enginePower: string; // e.g. "2500cc", "1500cc Turbo", "150kW (EV)"
  fuelType: FuelType;
  transmission: TransmissionType;
  mileageKm: number;
  licensePlate: string; // e.g. "2R-5829"
  licenseCity: string; // e.g. "YGN", "MDY", "SHN", "BGO", "NPT"
  grade: string; // e.g. "SC Package", "Athlete G", "RS Package", "Z Grade"
  isFullOption: boolean;
  features: string[]; // e.g. ["Push Start", "Sunroof", "360 Camera", ...]
  status: CarStatus;
  sellerType: SellerType;
  sellerName: string; // e.g. "ကိုကျော်စွာ", "ဦးဝင်းနိုင် (မန္တလေး)"
  sellerPhone: string;
  sellerViber: string;
  sellerLocation: string; // e.g. "ရန်ကုန် မရမ်းကုန်း", "မန္တလေး"
  sourceNote?: string; // e.g. "မန္တလေးက မိတ်ဆွေဆီက ဝယ်ထားသည်", "ပိုင်ရှင်တိုက်ရိုက် လက်တင်စီး"
  photos: string[];
  description: string;
  conditionNotes: string[];
  addedDate: string;
  viewsCount: number;
  soldDate?: string;
  soldPriceLakhs?: number;
  buyerName?: string;
  buyerPhone?: string;
}

export interface AdminUser {
  id: string;
  name: string;
  nameEnglish: string;
  role: string;
  roleBurmese: string;
  avatar: string;
  pin: string;
  phone: string;
  email: string;
  canEditPrices: boolean;
  canViewProfits: boolean;
  canManageAdmins: boolean;
}

export interface FilterOptions {
  searchQuery: string;
  status: 'all' | CarStatus;
  brand: string;
  bodyType: string;
  fuelType: string;
  minPrice: number;
  maxPrice: number;
  minYear: number;
  maxYear: number;
  sellerType: string;
  hasPushStart: boolean;
  hasSunroof: boolean;
  has360Camera: boolean;
  hasLeatherSeats: boolean;
  sortBy: 'newest' | 'price_asc' | 'price_desc' | 'year_desc' | 'mileage_asc';
}
