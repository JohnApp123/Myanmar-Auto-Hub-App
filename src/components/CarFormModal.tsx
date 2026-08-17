import React, { useState, useEffect } from 'react';
import { 
  X, 
  Plus, 
  Trash2, 
  Upload, 
  Check, 
  Car as CarIcon, 
  Zap, 
  ChevronDown,
  ChevronUp,
  Settings2,
  Phone,
  DollarSign,
  Image as ImageIcon,
  FileText,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { Car, BodyType, FuelType, CarStatus, SellerType } from '../types/car';
import { 
  POPULAR_BRANDS, 
  BODY_TYPES, 
  FUEL_TYPES, 
  COMMON_FEATURES, 
  LICENSE_CITIES,
  POPULAR_GRADES,
  POPULAR_COLORS,
  SUGGESTED_CONDITIONS
} from '../data/initialCars';

interface CarFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveCar: (carData: Partial<Car>) => void;
  carToEdit?: Car | null;
  isAdminMode: boolean;
}

export const CarFormModal: React.FC<CarFormModalProps> = ({
  isOpen,
  onClose,
  onSaveCar,
  carToEdit,
  isAdminMode,
}) => {
  // Mode: 'simple' (default) vs 'detailed'
  const [formMode, setFormMode] = useState<'simple' | 'detailed'>('simple');

  // Accordion state for optional detail sections in simple mode
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    specs: false,
    grade: false,
    condition: false,
    finance: false,
    description: false,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // 1. Basic Identity
  const [brand, setBrand] = useState('');
  const [isCustomBrand, setIsCustomBrand] = useState(false);
  const [customBrandInput, setCustomBrandInput] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState<string | number>('');
  const [title, setTitle] = useState('');
  const [bodyType, setBodyType] = useState<string>('');
  const [isCustomBodyType, setIsCustomBodyType] = useState(false);
  const [customBodyTypeInput, setCustomBodyTypeInput] = useState('');

  // 2. Pricing & Status
  const [sellingPriceLakhs, setSellingPriceLakhs] = useState<string | number>('');
  const [buyingPriceLakhs, setBuyingPriceLakhs] = useState<string | number>('');
  const [isPriceNegotiable, setIsPriceNegotiable] = useState(true);
  const [status, setStatus] = useState<CarStatus>('available');

  // 3. Contact & Seller
  const [sellerName, setSellerName] = useState('');
  const [sellerPhone, setSellerPhone] = useState('');
  const [sellerViber, setSellerViber] = useState('');
  const [sellerLocation, setSellerLocation] = useState('');
  const [sellerType, setSellerType] = useState<string>('');
  const [isCustomSellerType, setIsCustomSellerType] = useState(false);
  const [customSellerTypeInput, setCustomSellerTypeInput] = useState('');
  const [sourceNote, setSourceNote] = useState('');

  // 4. Photos
  const [photos, setPhotos] = useState<string[]>([]);
  const [photoUrlInput, setPhotoUrlInput] = useState('');

  // 5. Specs (Engine, Gear, Fuel, Mileage, Plate, City, Color)
  const [enginePower, setEnginePower] = useState('');
  const [fuelType, setFuelType] = useState<string>('');
  const [isCustomFuelType, setIsCustomFuelType] = useState(false);
  const [customFuelTypeInput, setCustomFuelTypeInput] = useState('');
  const [transmission, setTransmission] = useState<string>('');
  const [isCustomTransmission, setIsCustomTransmission] = useState(false);
  const [customTransmissionInput, setCustomTransmissionInput] = useState('');
  const [mileageKm, setMileageKm] = useState<string | number>('');
  const [licensePlate, setLicensePlate] = useState('');
  const [licenseCity, setLicenseCity] = useState('');
  const [isCustomLicenseCity, setIsCustomLicenseCity] = useState(false);
  const [customLicenseCityInput, setCustomLicenseCityInput] = useState('');
  const [color, setColor] = useState('');
  const [colorBurmese, setColorBurmese] = useState('');

  // 6. Grade & Features
  const [grade, setGrade] = useState('');
  const [isFullOption, setIsFullOption] = useState(false);
  const [features, setFeatures] = useState<string[]>([]);
  const [customFeatureInput, setCustomFeatureInput] = useState('');

  // 7. Condition Notes & Description
  const [conditionNotes, setConditionNotes] = useState<string[]>([]);
  const [customConditionInput, setCustomConditionInput] = useState('');
  const [description, setDescription] = useState('');

  // Reset form to blank
  const resetFormToBlank = () => {
    setBrand('');
    setIsCustomBrand(false);
    setCustomBrandInput('');
    setTitle('');
    setModel('');
    setYear('');
    setBodyType('');
    setIsCustomBodyType(false);
    setCustomBodyTypeInput('');
    setSellingPriceLakhs('');
    setBuyingPriceLakhs('');
    setIsPriceNegotiable(true);
    setStatus('available');
    setSellerName('');
    setSellerPhone('');
    setSellerViber('');
    setSellerLocation('');
    setSellerType('');
    setIsCustomSellerType(false);
    setCustomSellerTypeInput('');
    setSourceNote('');
    setPhotos([]);
    setPhotoUrlInput('');
    setEnginePower('');
    setFuelType('');
    setIsCustomFuelType(false);
    setCustomFuelTypeInput('');
    setTransmission('');
    setIsCustomTransmission(false);
    setCustomTransmissionInput('');
    setMileageKm('');
    setLicensePlate('');
    setLicenseCity('');
    setIsCustomLicenseCity(false);
    setCustomLicenseCityInput('');
    setColor('');
    setColorBurmese('');
    setGrade('');
    setIsFullOption(false);
    setFeatures([]);
    setCustomFeatureInput('');
    setConditionNotes([]);
    setCustomConditionInput('');
    setDescription('');
  };

  // Populate when editing or reset when adding
  useEffect(() => {
    if (carToEdit) {
      setTitle(carToEdit.title || '');
      
      const isKnownBrand = POPULAR_BRANDS.includes(carToEdit.brand);
      if (isKnownBrand) {
        setBrand(carToEdit.brand);
        setIsCustomBrand(false);
        setCustomBrandInput('');
      } else if (carToEdit.brand) {
        setBrand('__custom__');
        setIsCustomBrand(true);
        setCustomBrandInput(carToEdit.brand);
      } else {
        setBrand('');
        setIsCustomBrand(false);
        setCustomBrandInput('');
      }

      setModel(carToEdit.model || '');
      setYear(carToEdit.year || '');

      const isKnownBodyType = BODY_TYPES.some((bt) => bt.id === carToEdit.bodyType);
      if (isKnownBodyType) {
        setBodyType(carToEdit.bodyType);
        setIsCustomBodyType(false);
        setCustomBodyTypeInput('');
      } else if (carToEdit.bodyType) {
        setBodyType('__custom__');
        setIsCustomBodyType(true);
        setCustomBodyTypeInput(carToEdit.bodyType);
      } else {
        setBodyType('');
        setIsCustomBodyType(false);
        setCustomBodyTypeInput('');
      }

      setSellingPriceLakhs(carToEdit.sellingPriceLakhs ?? '');
      setBuyingPriceLakhs(carToEdit.buyingPriceLakhs ?? '');
      setIsPriceNegotiable(carToEdit.isPriceNegotiable ?? true);
      setStatus(carToEdit.status || 'available');

      setSellerName(carToEdit.sellerName || '');
      setSellerPhone(carToEdit.sellerPhone || '');
      setSellerViber(carToEdit.sellerViber || '');
      setSellerLocation(carToEdit.sellerLocation || '');

      const isKnownSellerType = ['owner', 'broker', 'dealer', 'other'].includes(carToEdit.sellerType);
      if (isKnownSellerType) {
        setSellerType(carToEdit.sellerType);
        setIsCustomSellerType(false);
        setCustomSellerTypeInput('');
      } else if (carToEdit.sellerType) {
        setSellerType('__custom__');
        setIsCustomSellerType(true);
        setCustomSellerTypeInput(carToEdit.sellerType);
      } else {
        setSellerType('');
        setIsCustomSellerType(false);
        setCustomSellerTypeInput('');
      }

      setSourceNote(carToEdit.sourceNote || '');
      setPhotos(carToEdit.photos?.length ? carToEdit.photos : []);

      setEnginePower(carToEdit.enginePower || '');
      const isKnownFuel = FUEL_TYPES.some((ft) => ft.id === carToEdit.fuelType);
      if (isKnownFuel) {
        setFuelType(carToEdit.fuelType);
        setIsCustomFuelType(false);
        setCustomFuelTypeInput('');
      } else if (carToEdit.fuelType) {
        setFuelType('__custom__');
        setIsCustomFuelType(true);
        setCustomFuelTypeInput(carToEdit.fuelType);
      } else {
        setFuelType('');
        setIsCustomFuelType(false);
        setCustomFuelTypeInput('');
      }

      const knownTrans = ['Auto', 'Manual', 'CVT', 'e-CVT', '6-Speed Auto', '8-Speed Auto'];
      if (knownTrans.includes(carToEdit.transmission)) {
        setTransmission(carToEdit.transmission);
        setIsCustomTransmission(false);
        setCustomTransmissionInput('');
      } else if (carToEdit.transmission) {
        setTransmission('__custom__');
        setIsCustomTransmission(true);
        setCustomTransmissionInput(carToEdit.transmission);
      } else {
        setTransmission('');
        setIsCustomTransmission(false);
        setCustomTransmissionInput('');
      }

      setMileageKm(carToEdit.mileageKm ?? '');
      setLicensePlate(carToEdit.licensePlate || '');

      const isKnownCity = LICENSE_CITIES.some((c) => c.code === carToEdit.licenseCity);
      if (isKnownCity) {
        setLicenseCity(carToEdit.licenseCity);
        setIsCustomLicenseCity(false);
        setCustomLicenseCityInput('');
      } else if (carToEdit.licenseCity) {
        setLicenseCity('__custom__');
        setIsCustomLicenseCity(true);
        setCustomLicenseCityInput(carToEdit.licenseCity);
      } else {
        setLicenseCity('');
        setIsCustomLicenseCity(false);
        setCustomLicenseCityInput('');
      }

      setColor(carToEdit.color || '');
      setColorBurmese(carToEdit.colorBurmese || '');
      setGrade(carToEdit.grade || '');
      setIsFullOption(carToEdit.isFullOption ?? false);
      setFeatures(carToEdit.features || []);
      setConditionNotes(carToEdit.conditionNotes || []);
      setDescription(carToEdit.description || '');
      // If editing existing car with details, default to detailed view
      setFormMode('detailed');
    } else {
      resetFormToBlank();
      setFormMode('simple');
    }
  }, [carToEdit, isOpen]);

  if (!isOpen) return null;

  // Helpers
  const handleToggleFeature = (feat: string) => {
    if (features.includes(feat)) {
      setFeatures(features.filter((f) => f !== feat));
    } else {
      setFeatures([...features, feat]);
    }
  };

  const handleAddCustomFeature = () => {
    if (customFeatureInput.trim() && !features.includes(customFeatureInput.trim())) {
      setFeatures([...features, customFeatureInput.trim()]);
      setCustomFeatureInput('');
    }
  };

  const handleAddCustomCondition = () => {
    if (customConditionInput.trim() && !conditionNotes.includes(customConditionInput.trim())) {
      setConditionNotes([...conditionNotes, customConditionInput.trim()]);
      setCustomConditionInput('');
    }
  };

  const handleAddSuggestedCondition = (note: string) => {
    if (!conditionNotes.includes(note)) {
      setConditionNotes([...conditionNotes, note]);
    }
  };

  const handleRemoveConditionNote = (index: number) => {
    setConditionNotes(conditionNotes.filter((_, i) => i !== index));
  };

  const handleAddPhotoUrl = () => {
    if (photoUrlInput.trim() && !photos.includes(photoUrlInput.trim())) {
      setPhotos([...photos, photoUrlInput.trim()]);
      setPhotoUrlInput('');
    }
  };

  const handleRemovePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file: File) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPhotos((prev) => [...prev, event.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const finalBrand = (isCustomBrand ? customBrandInput.trim() : brand.trim()) || 'သတ်မှတ်မထား';
    const finalModel = model.trim() || 'မော်ဒယ်';
    const finalBodyType = ((isCustomBodyType ? customBodyTypeInput.trim() : bodyType.trim()) || 'Sedan') as BodyType;
    const finalFuelType = ((isCustomFuelType ? customFuelTypeInput.trim() : fuelType.trim()) || 'Petrol') as FuelType;
    const finalTransmission = (isCustomTransmission ? customTransmissionInput.trim() : transmission.trim()) || 'Auto';
    const finalLicenseCity = (isCustomLicenseCity ? customLicenseCityInput.trim() : licenseCity.trim()) || 'YGN';
    const finalSellerType = ((isCustomSellerType ? customSellerTypeInput.trim() : sellerType.trim()) || 'owner') as SellerType;

    const finalTitle = title.trim() || `${finalBrand} ${finalModel}${year ? ` (${year})` : ''}`.trim();
    const finalPhotos = photos.length > 0 
      ? photos 
      : ['https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80'];

    const carData: Partial<Car> = {
      title: finalTitle,
      brand: finalBrand,
      model: finalModel,
      year: year ? Number(year) : new Date().getFullYear(),
      bodyType: finalBodyType,
      sellingPriceLakhs: sellingPriceLakhs !== '' ? Number(sellingPriceLakhs) : 0,
      buyingPriceLakhs: buyingPriceLakhs !== '' ? Number(buyingPriceLakhs) : 0,
      isPriceNegotiable,
      color: color.trim() || '-',
      colorBurmese: colorBurmese.trim() || '-',
      enginePower: enginePower.trim() || '-',
      fuelType: finalFuelType,
      transmission: finalTransmission,
      mileageKm: mileageKm !== '' ? Number(mileageKm) : 0,
      licensePlate: licensePlate.trim() || '-',
      licenseCity: finalLicenseCity,
      grade: grade.trim() || '-',
      isFullOption,
      features,
      status,
      sellerType: finalSellerType,
      sellerName: sellerName.trim() || 'ကားပိုင်ရှင် / Showroom',
      sellerPhone: sellerPhone.trim() || '',
      sellerViber: sellerViber.trim() || '',
      sellerLocation: sellerLocation.trim() || '',
      sourceNote: sourceNote.trim() || '',
      photos: finalPhotos,
      description: description.trim() || '',
      conditionNotes: conditionNotes,
    };

    onSaveCar(carData);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-white border border-slate-200 w-full max-w-3xl rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden text-slate-800 my-auto max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Mode Switcher */}
        <div className="bg-slate-900 text-white px-5 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950 font-bold shrink-0">
              <CarIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold">
                  {carToEdit ? 'ကားအချက်အလက် ပြင်ဆင်မည်' : 'ကားအသစ် ထည့်သွင်းမည်'}
                </h2>
              </div>
              <p className="text-[11px] text-slate-400">
                {formMode === 'simple' 
                  ? '⚡ အခြေခံအချက် (၄) ချက်သာ ထည့်သွင်းပြီး ချက်ချင်း တင်နိုင်ပါသည်'
                  : '📋 အသေးစိတ် အချက်အလက်စုံလင်စွာ ထည့်သွင်းနိုင်ပါသည်'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Mode Switcher Tabs */}
            <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-700">
              <button
                type="button"
                onClick={() => setFormMode('simple')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
                  formMode === 'simple'
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>ရိုးရှင်း/အမြန်</span>
              </button>
              <button
                type="button"
                onClick={() => setFormMode('detailed')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
                  formMode === 'detailed'
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Settings2 className="w-3.5 h-3.5" />
                <span>အသေးစိတ်စုံ</span>
              </button>
            </div>

            {!carToEdit && (
              <button
                type="button"
                onClick={resetFormToBlank}
                className="text-[11px] text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-2.5 py-1.5 rounded-lg border border-slate-700 transition cursor-pointer"
                title="အားလုံး အလွတ်ရှင်းမည်"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}

            <button 
              id="btn-close-car-form"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
              title="ပိတ်မည်"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1 text-xs">
          
          {/* ========================================================================= */}
          {/* 🌟 1. CORE ESSENTIAL FIELDS (Always Visible & Clean) */}
          {/* ========================================================================= */}
          <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-4 space-y-3.5">
            <div className="flex items-center justify-between pb-1 border-b border-amber-500/15">
              <span className="font-black text-xs text-amber-950 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                အခြေခံ အဓိကအချက်များ (Essential Info)
              </span>
              <span className="text-[10px] text-amber-800 font-semibold bg-amber-100 px-2 py-0.5 rounded">
                မဖြစ်မနေ ထည့်ရန်မလို၊ သိသလောက်သာ ထည့်ပါ
              </span>
            </div>

            {/* Brand + Model + Year in 1 compact grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Brand Selector */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-slate-700 font-bold">ကား အမှတ်တံဆိပ် (Brand)</label>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCustomBrand(!isCustomBrand);
                      if (!isCustomBrand && !customBrandInput) setCustomBrandInput(brand);
                    }}
                    className="text-[10px] text-amber-700 hover:text-amber-900 font-bold underline cursor-pointer"
                  >
                    {isCustomBrand ? '◀ ရွေးမည်' : '✏️ ကိုယ်တိုင်ရေး'}
                  </button>
                </div>
                {isCustomBrand ? (
                  <input
                    type="text"
                    value={customBrandInput}
                    onChange={(e) => setCustomBrandInput(e.target.value)}
                    placeholder="ဥပမာ: Toyota, Haval..."
                    className="w-full bg-white border border-amber-400 rounded-xl px-3 py-2 text-slate-900 font-bold focus:outline-none"
                  />
                ) : (
                  <select
                    value={brand}
                    onChange={(e) => {
                      if (e.target.value === '__custom__') {
                        setIsCustomBrand(true);
                      } else {
                        setBrand(e.target.value);
                      }
                    }}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-bold focus:outline-none"
                  >
                    <option value="">-- Brand ရွေးပါ --</option>
                    {POPULAR_BRANDS.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                    <option value="__custom__">✏️ အခြား Brand ရေးမည်...</option>
                  </select>
                )}
              </div>

              {/* Model */}
              <div>
                <label className="block text-slate-700 font-bold mb-1">Model (ဥပမာ: Crown, Alphard, Vezel)</label>
                <input
                  type="text"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  placeholder="e.g. Crown Athlete, Vezel RS"
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-bold focus:outline-none"
                />
              </div>

              {/* Year */}
              <div>
                <label className="block text-slate-700 font-bold mb-1">မော်ဒယ်နှစ် (Year)</label>
                <input
                  type="number"
                  min={1990}
                  max={2030}
                  value={year}
                  onChange={(e) => setYear(e.target.value ? Number(e.target.value) : '')}
                  placeholder="ဥပမာ: 2021"
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-bold focus:outline-none"
                />
              </div>
            </div>

            {/* Price & Status */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div>
                <label className="block text-slate-700 font-bold mb-1">ရောင်းစျေး (သိန်း)</label>
                <div className="relative">
                  <input
                    type="number"
                    min={0}
                    step={1}
                    value={sellingPriceLakhs}
                    onChange={(e) => setSellingPriceLakhs(e.target.value ? Number(e.target.value) : '')}
                    placeholder="ရောင်းစျေး သိန်း"
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 font-black text-amber-600 text-sm focus:outline-none"
                  />
                  <span className="absolute right-3 top-2.5 text-slate-500 font-bold">သိန်း</span>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">ဆက်သွယ်ရန် ဖုန်းနံပါတ်</label>
                <input
                  type="text"
                  value={sellerPhone}
                  onChange={(e) => setSellerPhone(e.target.value)}
                  placeholder="ဥပမာ: 09 798 123456"
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-bold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">ကားအခြေအနေ (Status)</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as CarStatus)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 font-bold text-slate-800 focus:outline-none"
                >
                  <option value="available">🟢 ရောင်းရန်ရှိ (In Stock)</option>
                  <option value="new_arrival">✨ အသစ်ရောက် (New)</option>
                  <option value="reserved">🤝 စရန်ပေးထား (Reserved)</option>
                  <option value="sold_out">🔴 ရောင်းပြီး (Sold)</option>
                </select>
              </div>
            </div>

            {/* Contact & Seller Details (All Optional) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  ရောင်းသူအမည် (Seller Name)
                </label>
                <input
                  type="text"
                  value={sellerName}
                  onChange={(e) => setSellerName(e.target.value)}
                  placeholder="ဥပမာ: မင်းသီဟ / Showroom"
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-bold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">ဆက်သွယ်ရန် ဖုန်းနံပါတ်</label>
                <input
                  type="text"
                  value={sellerPhone}
                  onChange={(e) => setSellerPhone(e.target.value)}
                  placeholder="ဥပမာ: 09 798 123456"
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-bold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  တည်နေရာ / မြို့ (Location) <span className="text-slate-400 font-normal text-[10px]">(မထည့်လဲရ)</span>
                </label>
                <input
                  type="text"
                  value={sellerLocation}
                  onChange={(e) => setSellerLocation(e.target.value)}
                  placeholder="ဥပမာ: ရန်ကုန်၊ မန္တလေး..."
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none"
                />
              </div>
            </div>

            {/* Price Negotiable Checkbox */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-700 font-medium">
                <input
                  type="checkbox"
                  checked={isPriceNegotiable}
                  onChange={(e) => setIsPriceNegotiable(e.target.checked)}
                  className="rounded text-amber-500 w-4 h-4"
                />
                <span>စျေးနှုန်း ညှိနှိုင်းနိုင်ပါသည် (Price Negotiable)</span>
              </label>

              <div className="flex items-center gap-2 text-slate-500 text-[11px]">
                <span>Viber (စိတ်ကြိုက်):</span>
                <input
                  type="text"
                  value={sellerViber}
                  onChange={(e) => setSellerViber(e.target.value)}
                  placeholder="09..."
                  className="bg-white border border-slate-300 rounded-lg px-2 py-1 text-slate-900 text-xs w-32 focus:outline-none"
                />
              </div>
            </div>

            {/* Photos quick preview / upload */}
            <div className="pt-2 border-t border-amber-500/15 space-y-2">
              <div className="flex items-center justify-between">
                <label className="font-bold text-slate-700 flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-amber-600" />
                  ကားဓာတ်ပုံ (Photos)
                </label>
                <span className="text-[10px] text-slate-500">
                  {photos.length > 0 ? `${photos.length} ပုံ တင်ထားသည်` : 'ဓာတ်ပုံ မထည့်ပါက auto ပုံစံနမူနာ ထည့်ပေးပါမည်'}
                </span>
              </div>

              {photos.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {photos.map((url, idx) => (
                    <div key={idx} className="relative h-16 rounded-lg overflow-hidden bg-slate-100 border border-slate-300 group">
                      <img src={url} alt="" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => handleRemovePhoto(idx)}
                        className="absolute top-1 right-1 p-1 bg-rose-600 text-white rounded opacity-0 group-hover:opacity-100 transition cursor-pointer"
                      >
                        <Trash2 className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex gap-2">
                <input
                  type="text"
                  value={photoUrlInput}
                  onChange={(e) => setPhotoUrlInput(e.target.value)}
                  placeholder="ဓာတ်ပုံ URL ထည့်ပါ..."
                  className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-slate-900 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddPhotoUrl}
                  className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition cursor-pointer"
                >
                  URL ထည့်
                </button>
                <label className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 font-bold rounded-xl cursor-pointer flex items-center gap-1 transition">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 🌟 2. OPTIONAL EXPANDABLE SECTIONS (Visible in Detailed Mode OR Accordions) */}
          {/* ========================================================================= */}

          {formMode === 'simple' && (
            <div className="py-1 text-center">
              <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                👇 လိုအပ်မှသာ အောက်ပါ အသေးစိတ်များကို ထပ်ထည့်နိုင်ပါသည် (Optional)
              </span>
            </div>
          )}

          {/* SECTION A: Specs (Gear, Engine, Fuel, Mileage, License, Color) */}
          {(formMode === 'detailed' || openSections.specs) ? (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between pb-1 border-b border-slate-200">
                <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                  <span>🚗 စက်ပိုင်းဆိုင်ရာ၊ ဂီယာ၊ လိုင်စင် & အရောင်</span>
                </h4>
                {formMode === 'simple' && (
                  <button 
                    type="button" 
                    onClick={() => toggleSection('specs')} 
                    className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-0.5 cursor-pointer"
                  >
                    <span>ပိတ်မည်</span>
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Body Type */}
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">ကားအမျိုးအစား (Body Type)</label>
                  <select
                    value={bodyType}
                    onChange={(e) => setBodyType(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none"
                  >
                    <option value="">-- Body Type ရွေးပါ --</option>
                    {BODY_TYPES.map((bt) => (
                      <option key={bt.id} value={bt.id}>{bt.name} ({bt.nameBurmese})</option>
                    ))}
                  </select>
                </div>

                {/* Transmission */}
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">ဂီယာ (Transmission)</label>
                  <select
                    value={transmission}
                    onChange={(e) => setTransmission(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none"
                  >
                    <option value="">-- ဂီယာ ရွေးပါ --</option>
                    <option value="Auto">Auto (ဂီယာအော်တို)</option>
                    <option value="Manual">Manual (မန်နျူရယ်)</option>
                    <option value="CVT">CVT</option>
                    <option value="e-CVT">e-CVT (Hybrid)</option>
                  </select>
                </div>

                {/* Fuel Type */}
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">လောင်စာဆီ (Fuel)</label>
                  <select
                    value={fuelType}
                    onChange={(e) => setFuelType(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none"
                  >
                    <option value="">-- လောင်စာဆီ ရွေးပါ --</option>
                    {FUEL_TYPES.map((ft) => (
                      <option key={ft.id} value={ft.id}>{ft.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Engine Power */}
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Engine Power</label>
                  <input
                    type="text"
                    value={enginePower}
                    onChange={(e) => setEnginePower(e.target.value)}
                    placeholder="ဥပမာ: 2000cc / 1500cc Turbo"
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none"
                  />
                </div>

                {/* Mileage */}
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">မောင်းနှင်ပြီး ကီလို (Km)</label>
                  <input
                    type="number"
                    value={mileageKm}
                    onChange={(e) => setMileageKm(e.target.value ? Number(e.target.value) : '')}
                    placeholder="ဥပမာ: 45000"
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none"
                  />
                </div>

                {/* License Plate & City */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">လိုင်စင်နံပါတ်</label>
                    <input
                      type="text"
                      value={licensePlate}
                      onChange={(e) => setLicensePlate(e.target.value)}
                      placeholder="2R-1234"
                      className="w-full bg-white border border-slate-300 rounded-xl px-2 py-2 text-slate-900 font-mono font-bold focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">တိုင်း/မြို့</label>
                    <select
                      value={licenseCity}
                      onChange={(e) => setLicenseCity(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-2 py-2 text-slate-900 font-bold focus:outline-none"
                    >
                      <option value="">တိုင်း/မြို့</option>
                      {LICENSE_CITIES.map((c) => (
                        <option key={c.code} value={c.code}>{c.code}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Color */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">အရောင် (အင်္ဂလိပ်/မြန်မာ)</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      placeholder="Pearl White"
                      className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none"
                    />
                    <input
                      type="text"
                      value={colorBurmese}
                      onChange={(e) => setColorBurmese(e.target.value)}
                      placeholder="ပုလဲဖြူ"
                      className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">ခေါင်းစဉ်အပြည့်အစုံ (စိတ်ကြိုက်)</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="အလွတ်ထားပါက Brand+Model ဖြင့် auto ဖန်တီးပေးမည်"
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => toggleSection('specs')}
              className="w-full flex items-center justify-between bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl px-4 py-2.5 text-left font-bold text-slate-700 transition cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="text-amber-600">🚗</span>
                <span>စက်ပိုင်းဆိုင်ရာ၊ ဂီယာ၊ လိုင်စင် & အရောင် ထည့်ရန်</span>
                {(enginePower || transmission || fuelType || mileageKm || licensePlate || color) && (
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">ဖြည့်ထားပြီး</span>
                )}
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>
          )}

          {/* SECTION B: Grade & Features */}
          {(formMode === 'detailed' || openSections.grade) ? (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between pb-1 border-b border-slate-200">
                <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                  <span>⭐ Grade & ကား Features (Options)</span>
                </h4>
                {formMode === 'simple' && (
                  <button 
                    type="button" 
                    onClick={() => toggleSection('grade')} 
                    className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-0.5 cursor-pointer"
                  >
                    <span>ပိတ်မည်</span>
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Grade အမည်</label>
                  <input
                    type="text"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    placeholder="ဥပမာ: SC Package / Athlete G / Modulo"
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-bold focus:outline-none"
                  />
                </div>

                <div className="pt-4">
                  <label className="flex items-center gap-2 cursor-pointer bg-white border border-slate-200 p-2.5 rounded-xl">
                    <input
                      type="checkbox"
                      checked={isFullOption}
                      onChange={(e) => setIsFullOption(e.target.checked)}
                      className="rounded text-amber-500 w-4 h-4"
                    />
                    <span className="font-bold text-slate-900">Full Option / Grade အမြင့် ဖြစ်သည်</span>
                  </label>
                </div>
              </div>

              {/* Common Features Checkboxes */}
              <div>
                <label className="block text-slate-700 font-semibold mb-1.5">ပါဝင်သော Features များ (နှိပ်၍ ရွေးပါ):</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {COMMON_FEATURES.map((feat) => {
                    const isChecked = features.includes(feat);
                    return (
                      <button
                        key={feat}
                        type="button"
                        onClick={() => handleToggleFeature(feat)}
                        className={`text-left px-2.5 py-1.5 rounded-lg border text-xs font-semibold flex items-center justify-between transition cursor-pointer ${
                          isChecked 
                            ? 'bg-amber-500 text-slate-950 border-amber-500' 
                            : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <span className="truncate">{feat}</span>
                        {isChecked && <Check className="w-3.5 h-3.5 shrink-0 stroke-[3]" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Custom Feature Add */}
              <div className="flex gap-2 pt-1">
                <input
                  type="text"
                  value={customFeatureInput}
                  onChange={(e) => setCustomFeatureInput(e.target.value)}
                  placeholder="အခြား စိတ်ကြိုက် Feature ထည့်ရန်..."
                  className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-slate-900 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddCustomFeature}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition cursor-pointer"
                >
                  ထည့်မည်
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => toggleSection('grade')}
              className="w-full flex items-center justify-between bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl px-4 py-2.5 text-left font-bold text-slate-700 transition cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="text-amber-600">⭐</span>
                <span>Grade & ကား Features (Options) ထည့်ရန်</span>
                {(grade || isFullOption || features.length > 0) && (
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
                    {features.length} ခု ဖြည့်ထားသည်
                  </span>
                )}
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>
          )}

          {/* SECTION C: Condition Notes */}
          {(formMode === 'detailed' || openSections.condition) ? (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between pb-1 border-b border-slate-200">
                <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                  <span>🔍 ကားအခြေအနေ စစ်ဆေးချက် မှတ်စုများ (Inspection Notes)</span>
                </h4>
                {formMode === 'simple' && (
                  <button 
                    type="button" 
                    onClick={() => toggleSection('condition')} 
                    className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-0.5 cursor-pointer"
                  >
                    <span>ပိတ်မည်</span>
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Current condition notes */}
              {conditionNotes.length > 0 ? (
                <div className="space-y-1.5">
                  {conditionNotes.map((note, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px] flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <input
                        type="text"
                        value={note}
                        onChange={(e) => {
                          const updated = [...conditionNotes];
                          updated[idx] = e.target.value;
                          setConditionNotes(updated);
                        }}
                        className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-slate-900 font-semibold focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveConditionNote(idx)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded transition cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-400 italic text-[11px]">မှတ်စု မထည့်ရသေးပါ</p>
              )}

              {/* Suggested Notes Chips */}
              <div className="space-y-1">
                <span className="text-[11px] text-slate-500 font-bold">အကြံပြုချက်များမှ နှိပ်၍ ထည့်ရန်:</span>
                <div className="flex flex-wrap gap-1.5">
                  {SUGGESTED_CONDITIONS.map((sug) => (
                    <button
                      key={sug}
                      type="button"
                      onClick={() => handleAddSuggestedCondition(sug)}
                      className="px-2.5 py-1 bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-slate-700 text-[11px] rounded-lg transition cursor-pointer flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3 text-emerald-600" />
                      <span>{sug}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Add custom note */}
              <div className="flex gap-2 pt-1">
                <input
                  type="text"
                  value={customConditionInput}
                  onChange={(e) => setCustomConditionInput(e.target.value)}
                  placeholder="စိတ်ကြိုက် စစ်ဆေးချက်မှတ်စု ရေးထည့်ရန်..."
                  className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-slate-900 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddCustomCondition}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition cursor-pointer"
                >
                  ထည့်မည်
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => toggleSection('condition')}
              className="w-full flex items-center justify-between bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl px-4 py-2.5 text-left font-bold text-slate-700 transition cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="text-emerald-600">🔍</span>
                <span>ကားအခြေအနေ စစ်ဆေးချက် မှတ်စုများ ထည့်ရန်</span>
                {conditionNotes.length > 0 && (
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
                    {conditionNotes.length} ချက်
                  </span>
                )}
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>
          )}

          {/* SECTION D: Admin Buying Cost & Source Notes */}
          {(formMode === 'detailed' || openSections.finance) ? (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between pb-1 border-b border-slate-200">
                <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                  <span>💰 ဝယ်ရင်းစျေး၊ အမြတ်ငွေ & အတွင်းရေးမှတ်စု (Admin Only)</span>
                </h4>
                {formMode === 'simple' && (
                  <button 
                    type="button" 
                    onClick={() => toggleSection('finance')} 
                    className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-0.5 cursor-pointer"
                  >
                    <span>ပိတ်မည်</span>
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">ဝယ်ရင်းစျေး (Buying Cost - သိန်း)</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={buyingPriceLakhs}
                      onChange={(e) => setBuyingPriceLakhs(e.target.value ? Number(e.target.value) : '')}
                      placeholder="ဝယ်ရင်းစျေး သိန်း"
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 font-bold text-slate-900 focus:outline-none"
                    />
                    <span className="absolute right-3 top-2.5 text-slate-500 font-bold">သိန်း</span>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">ခန့်မှန်း အမြတ်ငွေ</label>
                  <div className="bg-white border border-slate-300 rounded-xl px-3 py-2 font-black text-emerald-700 text-sm flex items-center justify-between">
                    <span>
                      {sellingPriceLakhs !== '' && buyingPriceLakhs !== ''
                        ? `+${(Number(sellingPriceLakhs) - Number(buyingPriceLakhs)).toLocaleString()} သိန်း`
                        : '-'}
                    </span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
                      {sellingPriceLakhs !== '' && buyingPriceLakhs !== '' && Number(buyingPriceLakhs) > 0
                        ? `${(((Number(sellingPriceLakhs) - Number(buyingPriceLakhs)) / Number(buyingPriceLakhs)) * 100).toFixed(1)}%`
                        : '0%'}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">ကားဝယ်ယူခဲ့သည့် မှတ်စု (Source Note)</label>
                <input
                  type="text"
                  value={sourceNote}
                  onChange={(e) => setSourceNote(e.target.value)}
                  placeholder="ဥပမာ: မိတ်ဆွေဆီက လက်တင်စီး ဝယ်ယူထားသည်..."
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none"
                />
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => toggleSection('finance')}
              className="w-full flex items-center justify-between bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl px-4 py-2.5 text-left font-bold text-slate-700 transition cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="text-amber-600">💰</span>
                <span>ဝယ်ရင်းစျေး & Admin အတွင်းရေးမှတ်စု ထည့်ရန်</span>
                {(buyingPriceLakhs !== '' || sourceNote) && (
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">ဖြည့်ထားသည်</span>
                )}
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>
          )}

          {/* SECTION E: Description */}
          {(formMode === 'detailed' || openSections.description) ? (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2 animate-in fade-in">
              <div className="flex items-center justify-between pb-1 border-b border-slate-200">
                <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                  <span>📝 ကားအကြောင်း အသေးစိတ် ဖော်ပြချက် (Description)</span>
                </h4>
                {formMode === 'simple' && (
                  <button 
                    type="button" 
                    onClick={() => toggleSection('description')} 
                    className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-0.5 cursor-pointer"
                  >
                    <span>ပိတ်မည်</span>
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="ကားအခြေအနေ၊ ကညန အချက်အလက်၊ လက်တင်စီးရန် အသင့်ဖြစ်ပုံ..."
                className="w-full bg-white border border-slate-300 rounded-xl p-3 text-slate-900 focus:outline-none"
              />
            </div>
          ) : (
            <button
              type="button"
              onClick={() => toggleSection('description')}
              className="w-full flex items-center justify-between bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl px-4 py-2.5 text-left font-bold text-slate-700 transition cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="text-slate-600">📝</span>
                <span>ကားအကြောင်း အသေးစိတ် ဖော်ပြချက် (Description) ရေးရန်</span>
                {description && (
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">ရေးထားသည်</span>
                )}
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>
          )}

          {/* Form Submit Footer */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-3 sticky bottom-0 bg-white py-2">
            <div>
              {!carToEdit && (
                <button
                  type="button"
                  onClick={resetFormToBlank}
                  className="text-xs text-slate-500 hover:text-rose-600 underline font-semibold transition cursor-pointer"
                >
                  ဖောင်ရှင်းမည် (Reset)
                </button>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition flex items-center gap-1.5 cursor-pointer"
              >
                <span>မသိမ်းဘဲ ပိတ်မည်</span>
              </button>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black shadow-xs transition flex items-center gap-1.5 cursor-pointer"
              >
                <Check className="w-4 h-4 stroke-[3]" />
                <span>{carToEdit ? 'သိမ်းဆည်းမည် (Save)' : 'ကားအသစ် တင်မည် (Publish)'}</span>
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};
