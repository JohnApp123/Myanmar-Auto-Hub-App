import React, { useState, useEffect } from 'react';
import { 
  X, 
  Plus, 
  Trash2, 
  Upload, 
  Sparkles, 
  Check, 
  Car as CarIcon, 
  Edit3, 
  Layers, 
  Palette, 
  Zap, 
  ShieldCheck, 
  HelpCircle,
  RotateCcw
} from 'lucide-react';
import { Car, BodyType, FuelType, TransmissionType, CarStatus, SellerType } from '../types/car';
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
  // Brand state & custom brand toggle
  const [brand, setBrand] = useState('Toyota');
  const [isCustomBrand, setIsCustomBrand] = useState(false);
  const [customBrandInput, setCustomBrandInput] = useState('');

  // Model & title
  const [title, setTitle] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState<number>(2020);

  // Body type state & custom body type toggle
  const [bodyType, setBodyType] = useState<string>('SUV');
  const [isCustomBodyType, setIsCustomBodyType] = useState(false);
  const [customBodyTypeInput, setCustomBodyTypeInput] = useState('');

  // Pricing & profits
  const [sellingPriceLakhs, setSellingPriceLakhs] = useState<number>(1000);
  const [buyingPriceLakhs, setBuyingPriceLakhs] = useState<number>(850);
  const [isPriceNegotiable, setIsPriceNegotiable] = useState(true);

  // Colors
  const [color, setColor] = useState('Pearl White');
  const [colorBurmese, setColorBurmese] = useState('ပုလဲဖြူ');

  // Engine & Fuel
  const [enginePower, setEnginePower] = useState('2000cc (2.0L)');
  const [fuelType, setFuelType] = useState<string>('Petrol');
  const [isCustomFuelType, setIsCustomFuelType] = useState(false);
  const [customFuelTypeInput, setCustomFuelTypeInput] = useState('');

  // Transmission
  const [transmission, setTransmission] = useState<string>('Auto');
  const [isCustomTransmission, setIsCustomTransmission] = useState(false);
  const [customTransmissionInput, setCustomTransmissionInput] = useState('');

  // Mileage & License
  const [mileageKm, setMileageKm] = useState<number>(45000);
  const [licensePlate, setLicensePlate] = useState('2R-1234');
  const [licenseCity, setLicenseCity] = useState('YGN');
  const [isCustomLicenseCity, setIsCustomLicenseCity] = useState(false);
  const [customLicenseCityInput, setCustomLicenseCityInput] = useState('');

  // Grade & Options
  const [grade, setGrade] = useState('Grade စုံ / Full Option');
  const [isFullOption, setIsFullOption] = useState(true);

  // Features list & custom feature
  const [features, setFeatures] = useState<string[]>([
    'Push Start / Smart Key',
    '360° Panoramic View Camera',
    'Original TV Display / Navigation',
    'Alloy Wheels (အလွိုင်းခွေ)',
  ]);
  const [customFeatureInput, setCustomFeatureInput] = useState('');

  // Status & Seller
  const [status, setStatus] = useState<CarStatus>('available');
  const [sellerType, setSellerType] = useState<string>('owner');
  const [isCustomSellerType, setIsCustomSellerType] = useState(false);
  const [customSellerTypeInput, setCustomSellerTypeInput] = useState('');
  const [sellerName, setSellerName] = useState('ကိုကျော်စွာ (တိုက်ရိုက်ရောင်းသူ)');
  const [sellerPhone, setSellerPhone] = useState('09 798 123456');
  const [sellerViber, setSellerViber] = useState('09798123456');
  const [sellerLocation, setSellerLocation] = useState('ရန်ကုန်');
  const [sourceNote, setSourceNote] = useState('ပိုင်ရှင်တိုက်ရိုက် ရောင်းချခြင်း');

  // Photos & Description
  const [photos, setPhotos] = useState<string[]>([
    'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80',
  ]);
  const [photoUrlInput, setPhotoUrlInput] = useState('');
  const [description, setDescription] = useState('');

  // Condition Notes list & custom note
  const [conditionNotes, setConditionNotes] = useState<string[]>([
    'အတိုက်အခိုက် ကင်းရှင်းကြောင်း စစ်ဆေးပြီး',
    'ကညန (RTAD) စာအုပ်မူရင်း တရားဝင်',
    'အင်ဂျင်/ဂီယာ ကောင်းမွန်စွာ အလုပ်လုပ်သည်',
  ]);
  const [customConditionInput, setCustomConditionInput] = useState('');

  // Populate form if editing
  useEffect(() => {
    if (carToEdit) {
      setTitle(carToEdit.title || '');
      
      // Brand check
      const isKnownBrand = POPULAR_BRANDS.includes(carToEdit.brand);
      if (isKnownBrand) {
        setBrand(carToEdit.brand);
        setIsCustomBrand(false);
        setCustomBrandInput('');
      } else {
        setBrand(carToEdit.brand || 'Custom');
        setIsCustomBrand(true);
        setCustomBrandInput(carToEdit.brand || '');
      }

      setModel(carToEdit.model || '');
      setYear(carToEdit.year || 2020);

      // Body Type check
      const isKnownBodyType = BODY_TYPES.some((bt) => bt.id === carToEdit.bodyType);
      if (isKnownBodyType) {
        setBodyType(carToEdit.bodyType);
        setIsCustomBodyType(false);
        setCustomBodyTypeInput('');
      } else {
        setBodyType(carToEdit.bodyType || 'Custom');
        setIsCustomBodyType(true);
        setCustomBodyTypeInput(carToEdit.bodyType || '');
      }

      setSellingPriceLakhs(carToEdit.sellingPriceLakhs || 1000);
      setBuyingPriceLakhs(carToEdit.buyingPriceLakhs || 850);
      setIsPriceNegotiable(carToEdit.isPriceNegotiable ?? true);
      setColor(carToEdit.color || 'Pearl White');
      setColorBurmese(carToEdit.colorBurmese || 'ပုလဲဖြူ');
      setEnginePower(carToEdit.enginePower || '2000cc');

      // Fuel Type check
      const isKnownFuel = FUEL_TYPES.some((ft) => ft.id === carToEdit.fuelType);
      if (isKnownFuel) {
        setFuelType(carToEdit.fuelType);
        setIsCustomFuelType(false);
        setCustomFuelTypeInput('');
      } else {
        setFuelType(carToEdit.fuelType || 'Custom');
        setIsCustomFuelType(true);
        setCustomFuelTypeInput(carToEdit.fuelType || '');
      }

      // Transmission check
      const knownTrans = ['Auto', 'Manual', 'CVT', 'e-CVT'];
      if (knownTrans.includes(carToEdit.transmission)) {
        setTransmission(carToEdit.transmission);
        setIsCustomTransmission(false);
        setCustomTransmissionInput('');
      } else {
        setTransmission(carToEdit.transmission || 'Custom');
        setIsCustomTransmission(true);
        setCustomTransmissionInput(carToEdit.transmission || '');
      }

      setMileageKm(carToEdit.mileageKm || 45000);
      setLicensePlate(carToEdit.licensePlate || '2R-1234');

      // License City check
      const isKnownCity = LICENSE_CITIES.some((c) => c.code === carToEdit.licenseCity);
      if (isKnownCity) {
        setLicenseCity(carToEdit.licenseCity);
        setIsCustomLicenseCity(false);
        setCustomLicenseCityInput('');
      } else {
        setLicenseCity(carToEdit.licenseCity || 'Custom');
        setIsCustomLicenseCity(true);
        setCustomLicenseCityInput(carToEdit.licenseCity || '');
      }

      setGrade(carToEdit.grade || 'Grade စုံ');
      setIsFullOption(carToEdit.isFullOption ?? true);
      setFeatures(carToEdit.features || []);
      setStatus(carToEdit.status || 'available');

      // Seller Type check
      const knownSellerTypes = ['owner', 'broker', 'dealer', 'other'];
      if (knownSellerTypes.includes(carToEdit.sellerType)) {
        setSellerType(carToEdit.sellerType);
        setIsCustomSellerType(false);
        setCustomSellerTypeInput('');
      } else {
        setSellerType(carToEdit.sellerType || 'other');
        setIsCustomSellerType(true);
        setCustomSellerTypeInput(carToEdit.sellerType || '');
      }

      setSellerName(carToEdit.sellerName || 'ကိုကျော်စွာ');
      setSellerPhone(carToEdit.sellerPhone || '09 798 123456');
      setSellerViber(carToEdit.sellerViber || '09798123456');
      setSellerLocation(carToEdit.sellerLocation || 'ရန်ကုန်');
      setSourceNote(carToEdit.sourceNote || '');
      setPhotos(carToEdit.photos?.length ? carToEdit.photos : ['https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80']);
      setDescription(carToEdit.description || '');
      setConditionNotes(carToEdit.conditionNotes?.length ? carToEdit.conditionNotes : [
        'အတိုက်အခိုက် ကင်းရှင်းကြောင်း စစ်ဆေးပြီး',
        'ကညန (RTAD) စာအုပ်မူရင်း တရားဝင်',
        'အင်ဂျင်/ဂီယာ ကောင်းမွန်စွာ အလုပ်လုပ်သည်',
      ]);
    } else {
      // Defaults for new car
      setTitle('');
      setModel('');
      setPhotos(['https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80']);
      setConditionNotes([
        'အတိုက်အခိုက် ကင်းရှင်းကြောင်း စစ်ဆေးပြီး',
        'ကညန (RTAD) စာအုပ်မူရင်း တရားဝင်',
        'အင်ဂျင်/ဂီယာ ကောင်းမွန်စွာ အလုပ်လုပ်သည်',
      ]);
    }
  }, [carToEdit, isOpen]);

  if (!isOpen) return null;

  // Feature Helpers
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

  const handleRemoveFeature = (feat: string) => {
    setFeatures(features.filter((f) => f !== feat));
  };

  // Condition Notes Helpers
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

  const handleUpdateConditionNote = (index: number, value: string) => {
    const updated = [...conditionNotes];
    updated[index] = value;
    setConditionNotes(updated);
  };

  const handleRemoveConditionNote = (index: number) => {
    setConditionNotes(conditionNotes.filter((_, i) => i !== index));
  };

  // Photo Helpers
  const handleAddPhotoUrl = () => {
    if (photoUrlInput.trim() && !photos.includes(photoUrlInput.trim())) {
      setPhotos([...photos, photoUrlInput.trim()]);
      setPhotoUrlInput('');
    }
  };

  const handleRemovePhoto = (index: number) => {
    if (photos.length > 1) {
      setPhotos(photos.filter((_, i) => i !== index));
    }
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

  // Quick preset color picker
  const handleSelectColorPreset = (preset: { en: string; my: string }) => {
    setColor(preset.en);
    setColorBurmese(preset.my);
  };

  // Quick Engine Power presets
  const ENGINE_POWER_PRESETS = [
    '660cc',
    '1000cc',
    '1200cc',
    '1300cc',
    '1500cc',
    '1800cc',
    '2000cc',
    '2500cc',
    '2800cc Turbo',
    '3000cc',
    '3500cc',
    '150kW (EV)',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const finalBrand = isCustomBrand ? (customBrandInput.trim() || 'Custom') : brand;
    const finalBodyType = (isCustomBodyType ? (customBodyTypeInput.trim() || 'SUV') : bodyType) as BodyType;
    const finalFuelType = (isCustomFuelType ? (customFuelTypeInput.trim() || 'Petrol') : fuelType) as FuelType;
    const finalTransmission = isCustomTransmission ? (customTransmissionInput.trim() || 'Auto') : transmission;
    const finalLicenseCity = isCustomLicenseCity ? (customLicenseCityInput.trim() || 'YGN') : licenseCity;
    const finalSellerType = (isCustomSellerType ? (customSellerTypeInput.trim() || 'other') : sellerType) as SellerType;

    const finalTitle = title.trim() || `${finalBrand} ${model || 'Car'} - ${year}`;

    const carData: Partial<Car> = {
      title: finalTitle,
      brand: finalBrand,
      model: model || 'Standard',
      year: Number(year),
      bodyType: finalBodyType,
      sellingPriceLakhs: Number(sellingPriceLakhs),
      buyingPriceLakhs: Number(buyingPriceLakhs),
      isPriceNegotiable,
      color,
      colorBurmese,
      enginePower,
      fuelType: finalFuelType,
      transmission: finalTransmission,
      mileageKm: Number(mileageKm),
      licensePlate,
      licenseCity: finalLicenseCity,
      grade,
      isFullOption,
      features,
      status,
      sellerType: finalSellerType,
      sellerName,
      sellerPhone,
      sellerViber,
      sellerLocation,
      sourceNote,
      photos,
      description,
      conditionNotes: conditionNotes.length ? conditionNotes : [
        'အတိုက်အခိုက် ကင်းရှင်းကြောင်း စစ်ဆေးပြီး',
        'ကညန (RTAD) စာအုပ်မူရင်း တရားဝင်',
        'အင်ဂျင်/ဂီယာ ကောင်းမွန်စွာ အလုပ်လုပ်သည်',
      ],
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
        className="bg-white border border-slate-200 w-full max-w-4xl rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden text-slate-800 my-auto max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950">
              <CarIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold">
                  {carToEdit ? 'ကားအချက်အလက် ပြင်ဆင်မည် (Edit Car)' : 'ကားအသစ် ထည့်သွင်းမည် (Add New Car)'}
                </h2>
                <span className="text-[10px] bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-md font-semibold">
                  Admin စိတ်ကြိုက်ပြင်ဆင်ခွင့်
                </span>
              </div>
              <p className="text-xs text-slate-400">
                သတ်မှတ်ချက်များအပြင် စိတ်ကြိုက် Brand၊ Model၊ Grade၊ Option၊ မှတ်စုများကို လွတ်လပ်စွာ ရေးသားပြင်ဆင်နိုင်ပါသည်
              </p>
            </div>
          </div>
          <button 
            id="btn-close-car-form"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            title="ပိတ်မည်"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          
          {/* Section 1: Basic Identity & Title */}
          <div className="space-y-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-xs text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <span>၁။ ကား မော်ဒယ် နှင့် အမည် (Vehicle Identity)</span>
              </h3>
              <span className="text-[11px] text-slate-500">အချက်အလက်အားလုံး စိတ်ကြိုက်ပြင်ရေးနိုင်ပါသည်</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Brand Selector / Custom Input */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-slate-700 font-bold">ကား အမှတ်တံဆိပ် (Brand)</label>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCustomBrand(!isCustomBrand);
                      if (!isCustomBrand && !customBrandInput) {
                        setCustomBrandInput(brand);
                      }
                    }}
                    className="text-[10px] text-amber-700 hover:text-amber-800 font-bold underline cursor-pointer"
                  >
                    {isCustomBrand ? '◀ စာရင်းထဲမှရွေးမည်' : '✏️ ကိုယ်တိုင်ရေးမည်'}
                  </button>
                </div>

                {isCustomBrand ? (
                  <input
                    type="text"
                    value={customBrandInput}
                    onChange={(e) => setCustomBrandInput(e.target.value)}
                    placeholder="ဥပမာ: Haval, Jetour, Chery, GAC, Mercedes..."
                    className="w-full bg-white border border-amber-400 rounded-xl px-3 py-2 text-slate-900 font-bold focus:outline-none focus:ring-1 focus:ring-amber-500"
                    required
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
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-bold focus:outline-none focus:ring-1 focus:ring-amber-500"
                  >
                    {POPULAR_BRANDS.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                    <option value="__custom__">✏️ အခြား အမှတ်တံဆိပ် (စိတ်ကြိုက်ရေးမည်)...</option>
                  </select>
                )}
              </div>

              {/* Model Input */}
              <div>
                <label className="block text-slate-700 font-bold mb-1">Model အမည် (ဥပမာ: Crown Athlete, Alphard, Vezel)</label>
                <input
                  type="text"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  placeholder="e.g. Crown Athlete, Alphard SC, Vezel RS"
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-bold focus:outline-none focus:ring-1 focus:ring-amber-500"
                  required
                />
              </div>

              {/* Model Year */}
              <div>
                <label className="block text-slate-700 font-bold mb-1">မော်ဒယ်နှစ် (Model Year)</label>
                <input
                  type="number"
                  min={1990}
                  max={2027}
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-bold focus:outline-none focus:ring-1 focus:ring-amber-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Full Title */}
              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  ခေါင်းစဉ်အပြည့်အစုံ (Title - အလွတ်ထားပါက Auto ရေးပေးမည်)
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={`e.g. ${isCustomBrand ? customBrandInput || 'Brand' : brand} ${model || 'Car'} - ${year}`}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              {/* Body Type Selector / Custom */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-slate-700 font-bold">ကားအမျိုးအစား (Body Type)</label>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCustomBodyType(!isCustomBodyType);
                      if (!isCustomBodyType && !customBodyTypeInput) {
                        setCustomBodyTypeInput(bodyType);
                      }
                    }}
                    className="text-[10px] text-amber-700 hover:text-amber-800 font-bold underline cursor-pointer"
                  >
                    {isCustomBodyType ? '◀ စာရင်းထဲမှရွေးမည်' : '✏️ စိတ်ကြိုက်ရေးမည်'}
                  </button>
                </div>

                {isCustomBodyType ? (
                  <input
                    type="text"
                    value={customBodyTypeInput}
                    onChange={(e) => setCustomBodyTypeInput(e.target.value)}
                    placeholder="ဥပမာ: Crossover SUV, 12-Seater Van, Light Truck..."
                    className="w-full bg-white border border-amber-400 rounded-xl px-3 py-2 text-slate-900 font-bold focus:outline-none focus:ring-1 focus:ring-amber-500"
                    required
                  />
                ) : (
                  <select
                    value={bodyType}
                    onChange={(e) => {
                      if (e.target.value === '__custom__') {
                        setIsCustomBodyType(true);
                      } else {
                        setBodyType(e.target.value);
                      }
                    }}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-bold focus:outline-none focus:ring-1 focus:ring-amber-500"
                  >
                    {BODY_TYPES.map((bt) => (
                      <option key={bt.id} value={bt.id}>{bt.name} ({bt.nameBurmese})</option>
                    ))}
                    <option value="__custom__">✏️ အခြား အမျိုးအစား (စိတ်ကြိုက်ရေးမည်)...</option>
                  </select>
                )}
              </div>
            </div>
          </div>

          {/* Section 2: Pricing & Admin Margin */}
          <div className="space-y-4 bg-amber-50/60 p-4 rounded-2xl border border-amber-200">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-xs text-amber-950 uppercase tracking-wider">
                ၂။ ဝယ်စျေး၊ ရောင်းစျေး နှင့် အမြတ်ငွေ (Pricing & Profits)
              </h3>
              <span className="text-[10px] bg-amber-200 text-amber-900 px-2 py-0.5 rounded font-bold">
                Admin သီးသန့် အမြတ်တွက်ချက်မှု
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  ရောင်းစျေး (Selling Price - သိန်း) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min={1}
                    step={1}
                    value={sellingPriceLakhs}
                    onChange={(e) => setSellingPriceLakhs(Number(e.target.value))}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 font-black text-amber-600 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500"
                    required
                  />
                  <span className="absolute right-3 top-2.5 text-slate-500 font-bold">သိန်း</span>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  ဝယ်ရင်းစျေး (Buying Cost - သိန်း) <span className="text-slate-500 text-[10px]">(Admin only)</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min={0}
                    step={1}
                    value={buyingPriceLakhs}
                    onChange={(e) => setBuyingPriceLakhs(Number(e.target.value))}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 font-bold text-slate-800 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                  <span className="absolute right-3 top-2.5 text-slate-500 font-bold">သိန်း</span>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">ခန့်မှန်း အမြတ်ငွေ</label>
                <div className="bg-white border border-slate-300 rounded-xl px-3 py-2 font-black text-emerald-700 text-sm flex items-center justify-between">
                  <span>+{(sellingPriceLakhs - buyingPriceLakhs).toLocaleString()} သိန်း</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
                    {buyingPriceLakhs ? (((sellingPriceLakhs - buyingPriceLakhs) / buyingPriceLakhs) * 100).toFixed(1) : 0}%
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-800 font-semibold">
                <input
                  type="checkbox"
                  checked={isPriceNegotiable}
                  onChange={(e) => setIsPriceNegotiable(e.target.checked)}
                  className="rounded text-amber-500 w-4 h-4"
                />
                <span>စျေးနှုန်း ညှိနှိုင်းနိုင်ပါသည် (Price Negotiable)</span>
              </label>

              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-700">ကားအခြေအနေ:</span>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as CarStatus)}
                  className="bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 font-bold text-slate-800 focus:outline-none"
                >
                  <option value="available">🟢 ရောင်းရန်ရှိ (In Stock)</option>
                  <option value="new_arrival">✨ အသစ်ရောက် (New)</option>
                  <option value="reserved">🤝 စရန်ပေးထား (Reserved)</option>
                  <option value="sold_out">🔴 ရောင်းပြီး (Sold)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 3: Engine, Transmission, Fuel & License */}
          <div className="space-y-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <h3 className="font-bold text-xs text-slate-900 uppercase tracking-wider">
              ၃။ စက်ပိုင်းဆိုင်ရာ၊ ဂီယာ၊ လောင်စာဆီ နှင့် လိုင်စင်
            </h3>

            {/* Engine Power with Quick Suggestion Chips */}
            <div className="space-y-1.5">
              <label className="block text-slate-700 font-bold">
                Engine Power (cc/kW) - စိတ်ကြိုက် ရိုက်ထည့်နိုင်ပါသည်
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={enginePower}
                  onChange={(e) => setEnginePower(e.target.value)}
                  placeholder="e.g. 2500cc, 1500cc Turbo, 150kW (EV)"
                  className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-bold focus:outline-none focus:ring-1 focus:ring-amber-500"
                  required
                />
              </div>
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[10px] text-slate-500 font-semibold">အမြန်ရွေးရန်:</span>
                {ENGINE_POWER_PRESETS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setEnginePower(p)}
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold transition ${
                      enginePower === p
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {/* Fuel Type */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-slate-700 font-bold">လောင်စာဆီ (Fuel)</label>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCustomFuelType(!isCustomFuelType);
                      if (!isCustomFuelType && !customFuelTypeInput) {
                        setCustomFuelTypeInput(fuelType);
                      }
                    }}
                    className="text-[9px] text-amber-700 font-bold underline"
                  >
                    {isCustomFuelType ? '◀ ရွေးမည်' : '✏️ ရေးမည်'}
                  </button>
                </div>

                {isCustomFuelType ? (
                  <input
                    type="text"
                    value={customFuelTypeInput}
                    onChange={(e) => setCustomFuelTypeInput(e.target.value)}
                    placeholder="e.g. Petrol + CNG..."
                    className="w-full bg-white border border-amber-400 rounded-xl px-3 py-2 text-slate-900 font-bold focus:outline-none"
                    required
                  />
                ) : (
                  <select
                    value={fuelType}
                    onChange={(e) => {
                      if (e.target.value === '__custom__') {
                        setIsCustomFuelType(true);
                      } else {
                        setFuelType(e.target.value);
                      }
                    }}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-bold focus:outline-none"
                  >
                    {FUEL_TYPES.map((ft) => (
                      <option key={ft.id} value={ft.id}>{ft.name}</option>
                    ))}
                    <option value="__custom__">✏️ စိတ်ကြိုက် လောင်စာဆီ ရေးမည်...</option>
                  </select>
                )}
              </div>

              {/* Transmission */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-slate-700 font-bold">ဂီယာ (Transmission)</label>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCustomTransmission(!isCustomTransmission);
                      if (!isCustomTransmission && !customTransmissionInput) {
                        setCustomTransmissionInput(transmission);
                      }
                    }}
                    className="text-[9px] text-amber-700 font-bold underline"
                  >
                    {isCustomTransmission ? '◀ ရွေးမည်' : '✏️ ရေးမည်'}
                  </button>
                </div>

                {isCustomTransmission ? (
                  <input
                    type="text"
                    value={customTransmissionInput}
                    onChange={(e) => setCustomTransmissionInput(e.target.value)}
                    placeholder="e.g. 6-Speed AT, 8-Speed AT, DCT..."
                    className="w-full bg-white border border-amber-400 rounded-xl px-3 py-2 text-slate-900 font-bold focus:outline-none"
                    required
                  />
                ) : (
                  <select
                    value={transmission}
                    onChange={(e) => {
                      if (e.target.value === '__custom__') {
                        setIsCustomTransmission(true);
                      } else {
                        setTransmission(e.target.value);
                      }
                    }}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-bold focus:outline-none"
                  >
                    <option value="Auto">Auto (ဂီယာအော်တို)</option>
                    <option value="Manual">Manual (မန်နျူရယ်)</option>
                    <option value="CVT">CVT</option>
                    <option value="e-CVT">e-CVT (Hybrid)</option>
                    <option value="6-Speed Auto">6-Speed Auto</option>
                    <option value="8-Speed Auto">8-Speed Auto</option>
                    <option value="__custom__">✏️ စိတ်ကြိုက် ဂီယာ ရေးမည်...</option>
                  </select>
                )}
              </div>

              {/* Mileage */}
              <div>
                <label className="block text-slate-700 font-bold mb-1">မောင်းပြီးကီလို (Mileage km)</label>
                <input
                  type="number"
                  value={mileageKm}
                  onChange={(e) => setMileageKm(Number(e.target.value))}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-bold focus:outline-none"
                  required
                />
              </div>

              {/* License Plate */}
              <div>
                <label className="block text-slate-700 font-bold mb-1">လိုင်စင်နံပါတ်</label>
                <input
                  type="text"
                  value={licensePlate}
                  onChange={(e) => setLicensePlate(e.target.value)}
                  placeholder="e.g. 2R-5829, 9G-1234"
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 font-mono font-bold text-slate-900 focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* License City & Color Options */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {/* License City */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-slate-700 font-bold">လိုင်စင် တိုင်း/ပြည်နယ်</label>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCustomLicenseCity(!isCustomLicenseCity);
                      if (!isCustomLicenseCity && !customLicenseCityInput) {
                        setCustomLicenseCityInput(licenseCity);
                      }
                    }}
                    className="text-[9px] text-amber-700 font-bold underline"
                  >
                    {isCustomLicenseCity ? '◀ ရွေးမည်' : '✏️ ရေးမည်'}
                  </button>
                </div>

                {isCustomLicenseCity ? (
                  <input
                    type="text"
                    value={customLicenseCityInput}
                    onChange={(e) => setCustomLicenseCityInput(e.target.value)}
                    placeholder="e.g. YGN, MDY, Taunggyi..."
                    className="w-full bg-white border border-amber-400 rounded-xl px-3 py-2 text-slate-900 font-bold focus:outline-none"
                    required
                  />
                ) : (
                  <select
                    value={licenseCity}
                    onChange={(e) => {
                      if (e.target.value === '__custom__') {
                        setIsCustomLicenseCity(true);
                      } else {
                        setLicenseCity(e.target.value);
                      }
                    }}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-bold focus:outline-none"
                  >
                    {LICENSE_CITIES.map((c) => (
                      <option key={c.code} value={c.code}>{c.name}</option>
                    ))}
                    <option value="__custom__">✏️ စိတ်ကြိုက် မြို့/တိုင်း ရေးမည်...</option>
                  </select>
                )}
              </div>

              {/* Color English */}
              <div>
                <label className="block text-slate-700 font-bold mb-1">အရောင် (English - Custom)</label>
                <input
                  type="text"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  placeholder="e.g. Pearl White, Jet Black"
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-bold focus:outline-none"
                />
              </div>

              {/* Color Burmese */}
              <div>
                <label className="block text-slate-700 font-bold mb-1">အရောင် (မြန်မာအမည် - Custom)</label>
                <input
                  type="text"
                  value={colorBurmese}
                  onChange={(e) => setColorBurmese(e.target.value)}
                  placeholder="e.g. ပုလဲဖြူ၊ နက်ပြာ၊ စစ်စိမ်း"
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-bold focus:outline-none"
                />
              </div>
            </div>

            {/* Quick Color Presets Bar */}
            <div className="space-y-1 pt-1">
              <span className="text-[10px] text-slate-500 font-semibold block">အရောင် အလွယ်ရွေးရန် (Presets):</span>
              <div className="flex flex-wrap gap-1.5">
                {POPULAR_COLORS.map((pc) => (
                  <button
                    key={pc.en}
                    type="button"
                    onClick={() => handleSelectColorPreset(pc)}
                    className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white border border-slate-200 hover:border-amber-400 text-[10px] font-semibold text-slate-700 transition"
                  >
                    <span 
                      className={`w-3 h-3 rounded-full border ${pc.border}`} 
                      style={{ backgroundColor: pc.hex }}
                    />
                    <span>{pc.my}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Section 4: Grade, Push Start & Custom Features */}
          <div className="space-y-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-xs text-slate-900 uppercase tracking-wider">
                ၄။ Grade အဆင့်၊ Push Start နှင့် ပါဝင်သောပစ္စည်းများ (Grade & Features)
              </h3>
              <label className="flex items-center gap-1.5 cursor-pointer font-bold text-emerald-700">
                <input
                  type="checkbox"
                  checked={isFullOption}
                  onChange={(e) => setIsFullOption(e.target.checked)}
                  className="rounded text-emerald-600 w-4 h-4"
                />
                <span>Full Option စုံ</span>
              </label>
            </div>

            {/* Grade Input with Quick Grade Chips */}
            <div className="space-y-1.5">
              <label className="block text-slate-700 font-bold">
                Grade အမည် (e.g. SC Package, Athlete G, RS, Z Grade, Rocco 4x4) - စိတ်ကြိုက် ပြင်ရေးနိုင်ပါသည်
              </label>
              <input
                type="text"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                placeholder="e.g. SC Package / Athlete G / Modulo"
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-bold focus:outline-none focus:ring-1 focus:ring-amber-500"
                required
              />
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[10px] text-slate-500 font-semibold">လူကြိုက်များ Grade များ:</span>
                {POPULAR_GRADES.map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGrade(g)}
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold transition ${
                      grade === g
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Feature Adder */}
            <div className="pt-2">
              <label className="block text-slate-700 font-bold mb-1">
                စိတ်ကြိုက် Feature အသစ်ထည့်ရန် (Custom Feature Input)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customFeatureInput}
                  onChange={(e) => setCustomFeatureInput(e.target.value)}
                  placeholder="ဥပမာ: HUD Display, JBL Sound System, Dual Sunroof, Rear Seat Cooler..."
                  className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-semibold focus:outline-none focus:ring-1 focus:ring-amber-500"
                  onKeyDown={(e) => { 
                    if (e.key === 'Enter') { 
                      e.preventDefault(); 
                      handleAddCustomFeature(); 
                    } 
                  }}
                />
                <button
                  type="button"
                  onClick={handleAddCustomFeature}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl flex items-center gap-1 transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>ထည့်မည်</span>
                </button>
              </div>
            </div>

            {/* Currently Active Features (with Delete Badges) */}
            {features.length > 0 && (
              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] font-bold text-slate-700 block">
                  လက်ရှိ ရွေးချယ်ထားသော စနစ်များ ({features.length} ခု) - (✕ နှိပ်၍ ဖျက်နိုင်သည်):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {features.map((feat) => (
                    <span 
                      key={feat}
                      className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-950 font-bold px-2.5 py-1 rounded-lg text-[11px] border border-amber-200"
                    >
                      <span>{feat}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(feat)}
                        className="hover:text-rose-600 font-black ml-0.5"
                        title="ဖျက်မည်"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Common Feature Checkboxes */}
            <div className="space-y-1.5 pt-2">
              <label className="block text-slate-600 font-semibold text-[11px]">အများသုံး စနစ်များ အမှန်ခြစ် ရွေးချယ်ပါ:</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {COMMON_FEATURES.map((feat) => {
                  const isChecked = features.includes(feat);
                  return (
                    <button
                      key={feat}
                      type="button"
                      onClick={() => handleToggleFeature(feat)}
                      className={`p-2 rounded-xl text-left border flex items-center gap-2 transition ${
                        isChecked
                          ? 'bg-amber-50 border-amber-400 text-amber-950 font-bold shadow-xs'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded flex items-center justify-center border shrink-0 ${
                        isChecked ? 'bg-amber-500 border-amber-500 text-slate-950' : 'border-slate-300'
                      }`}>
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className="truncate text-[11px]">{feat}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Section 5: Condition Notes (Fully Editable / Custom) */}
          <div className="space-y-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-xs text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>၅။ စစ်ဆေးချက် မှတ်စုများနှင့် အာမခံချက် (Inspection & Condition Notes)</span>
              </h3>
              <span className="text-[10px] text-emerald-800 font-bold bg-emerald-100 px-2 py-0.5 rounded">
                မှတ်စုတစ်ခုချင်းစီ စိတ်ကြိုက်ပြင်ရေးနိုင်ပါသည်
              </span>
            </div>

            {/* List of current notes with Edit & Delete */}
            <div className="space-y-2">
              {conditionNotes.map((note, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px] flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <input
                    type="text"
                    value={note}
                    onChange={(e) => handleUpdateConditionNote(idx, e.target.value)}
                    className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-slate-900 font-semibold focus:outline-none focus:ring-1 focus:ring-amber-500 text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveConditionNote(idx)}
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition shrink-0"
                    title="ဖျက်မည်"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add Custom Condition Note Input */}
            <div className="flex gap-2 pt-1">
              <input
                type="text"
                value={customConditionInput}
                onChange={(e) => setCustomConditionInput(e.target.value)}
                placeholder="စစ်ဆေးချက် မှတ်စု အသစ်ရေးရန်..."
                className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddCustomCondition();
                  }
                }}
              />
              <button
                type="button"
                onClick={handleAddCustomCondition}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded-xl flex items-center gap-1 transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>မှတ်စုထည့်မည်</span>
              </button>
            </div>

            {/* Clickable Suggestion Chips for Condition Notes */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] text-slate-500 font-semibold block">အကြံပြုချက် မှတ်စုများ (နှိပ်၍ ထည့်နိုင်ပါသည်):</span>
              <div className="flex flex-wrap gap-1.5">
                {SUGGESTED_CONDITIONS.map((sug) => (
                  <button
                    key={sug}
                    type="button"
                    onClick={() => handleAddSuggestedCondition(sug)}
                    className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 text-[10px] text-slate-700 font-semibold transition text-left"
                  >
                    + {sug}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Section 6: Seller & Source Origin Info */}
          <div className="space-y-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-xs text-slate-900 uppercase tracking-wider">
                ၆။ ကားရောင်းသူ / ဝယ်ယူခဲ့သည့်နေရာ မှတ်စု (Car Source & Seller Record)
              </h3>
              <span className="text-[10px] text-amber-700 font-bold bg-amber-100 px-2 py-0.5 rounded">
                ရောင်းသူ / အရင်းအမြစ် စိတ်ကြိုက်မှတ်သားနိုင်ပါသည်
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Seller Type / Source Type */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-slate-700 font-bold">ရောင်းသူ / အရင်းအမြစ်</label>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCustomSellerType(!isCustomSellerType);
                      if (!isCustomSellerType && !customSellerTypeInput) {
                        setCustomSellerTypeInput(sellerType);
                      }
                    }}
                    className="text-[9px] text-amber-700 font-bold underline"
                  >
                    {isCustomSellerType ? '◀ ရွေးမည်' : '✏️ ရေးမည်'}
                  </button>
                </div>

                {isCustomSellerType ? (
                  <input
                    type="text"
                    value={customSellerTypeInput}
                    onChange={(e) => setCustomSellerTypeInput(e.target.value)}
                    placeholder="e.g. ဂျပန်လေလံတင်သွင်း, မိတ်ဆွေဆီက..."
                    className="w-full bg-white border border-amber-400 rounded-xl px-3 py-2 text-slate-900 font-bold focus:outline-none"
                    required
                  />
                ) : (
                  <select
                    value={sellerType}
                    onChange={(e) => {
                      if (e.target.value === '__custom__') {
                        setIsCustomSellerType(true);
                      } else {
                        setSellerType(e.target.value);
                      }
                    }}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-bold focus:outline-none"
                  >
                    <option value="owner">👤 ကားပိုင်ရှင် တိုက်ရိုက် (Direct Owner)</option>
                    <option value="broker">🤝 အကျိုးဆောင် / Broker (Agent)</option>
                    <option value="dealer">🚘 အရောင်းဆိုင် / Dealer</option>
                    <option value="other">📝 အခြား / မိတ်ဆွေဆီက</option>
                    <option value="__custom__">✏️ စိတ်ကြိုက် အရင်းအမြစ် ရေးမည်...</option>
                  </select>
                )}
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">ရောင်းသူ အမည် / အရင်းအမြစ်</label>
                <input
                  type="text"
                  value={sellerName}
                  onChange={(e) => setSellerName(e.target.value)}
                  placeholder="ဥပမာ: ဦးကျော်စွာ (မရမ်းကုန်း)"
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-bold focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">ဖုန်းနံပါတ် (Phone)</label>
                <input
                  type="text"
                  value={sellerPhone}
                  onChange={(e) => setSellerPhone(e.target.value)}
                  placeholder="ဥပမာ: 09 798 123456"
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-bold focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-bold mb-1">တည်နေရာ / မြို့ (Location)</label>
                <input
                  type="text"
                  value={sellerLocation}
                  onChange={(e) => setSellerLocation(e.target.value)}
                  placeholder="ဥပမာ: ရန်ကုန်၊ မန္တလေး..."
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Viber နံပါတ် (Optional)</label>
                <input
                  type="text"
                  value={sellerViber}
                  onChange={(e) => setSellerViber(e.target.value)}
                  placeholder="ဥပမာ: 09798123456"
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">
                ကားဝယ်ယူခဲ့သည့် အချက်အလက်နှင့် မှတ်စု (Source & Purchase Notes)
              </label>
              <input
                type="text"
                value={sourceNote}
                onChange={(e) => setSourceNote(e.target.value)}
                placeholder="ဥပမာ: မန္တလေးက မိတ်ဆွေဆီက လက်တင်စီး ဝယ်ယူထားသည် / ပိုင်ရှင်ကိုယ်တိုင် အရောင်း"
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-semibold focus:outline-none"
              />
            </div>
          </div>

          {/* Section 7: Photos & Description */}
          <div className="space-y-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <h3 className="font-bold text-xs text-slate-900 uppercase tracking-wider">
              ၇။ ကားဓာတ်ပုံများ နှင့် အသေးစိတ်ဖော်ပြချက် (Photos & Description)
            </h3>

            {/* Photo List Thumbnails */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {photos.map((url, idx) => (
                <div key={idx} className="relative h-24 rounded-xl overflow-hidden bg-slate-200 border border-slate-300 group">
                  <img src={url} alt="" className="w-full h-full object-cover" />
                  {idx === 0 && (
                    <span className="absolute top-1 left-1 bg-amber-500 text-slate-950 font-bold text-[9px] px-1.5 py-0.2 rounded shadow-xs">
                      Main Photo
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => handleRemovePhoto(idx)}
                    className="absolute top-1 right-1 p-1 bg-rose-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition"
                    title="ဖျက်မည်"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add photo URL or upload */}
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={photoUrlInput}
                onChange={(e) => setPhotoUrlInput(e.target.value)}
                placeholder="ဓာတ်ပုံ Image URL ထည့်ပါ..."
                className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddPhotoUrl}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition"
              >
                URL ထည့်မည်
              </button>

              <label className="px-4 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 font-bold rounded-xl cursor-pointer flex items-center justify-center gap-1.5 transition">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload File</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">ကားအကြောင်း အသေးစိတ် ဖော်ပြချက် (Description - စိတ်ကြိုက်ရေးနိုင်ပါသည်)</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="ကားအခြေအနေ၊ ကညန အချက်အလက်၊ လက်တင်စီးရန် အသင့်ဖြစ်ပုံ..."
                className="w-full bg-white border border-slate-300 rounded-xl p-3 text-slate-900 focus:outline-none"
              />
            </div>
          </div>

          {/* Form Submit Footer */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition flex items-center gap-1.5"
            >
              <span>◀ နောက်သို့ / ပယ်ဖျက်မည် (Cancel)</span>
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black shadow-xs transition flex items-center gap-1.5"
            >
              <Check className="w-4 h-4 stroke-[3]" />
              <span>{carToEdit ? 'သိမ်းဆည်းမည် (Save Changes)' : 'ကားအသစ် တင်မည် (Publish Car)'}</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
