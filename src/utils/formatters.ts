export function formatLakhs(amount: number): string {
  if (!amount && amount !== 0) return '0 သိန်း';
  return `${amount.toLocaleString()} သိန်း`;
}

export function formatNumber(num: number): string {
  if (!num && num !== 0) return '0';
  return num.toLocaleString();
}

export function calculateDownPayment(sellingPriceLakhs: number, downPaymentPercent: number = 30): number {
  return Math.round((sellingPriceLakhs * downPaymentPercent) / 100);
}

export function calculateMonthlyInstallment(
  sellingPriceLakhs: number,
  downPaymentPercent: number = 30,
  years: number = 2,
  annualInterestRate: number = 10
): number {
  const principal = sellingPriceLakhs * (1 - downPaymentPercent / 100);
  const totalInterest = principal * (annualInterestRate / 100) * years;
  const totalPayable = principal + totalInterest;
  const totalMonths = years * 12;
  return Number((totalPayable / totalMonths).toFixed(2));
}

export function getStatusBadgeInfo(status: string) {
  switch (status) {
    case 'available':
      return {
        label: 'ရောင်းရန်ရှိ (In Stock)',
        shortLabel: 'In Stock',
        badgeClass: 'bg-emerald-600 text-white border-emerald-500',
        bgLight: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      };
    case 'new_arrival':
      return {
        label: 'အသစ်ရောက် (New Arrival)',
        shortLabel: 'New Arrival',
        badgeClass: 'bg-blue-600 text-white border-blue-500 animate-pulse',
        bgLight: 'bg-blue-50 text-blue-700 border-blue-200',
      };
    case 'reserved':
      return {
        label: 'စရန်ပေးထား (Reserved)',
        shortLabel: 'Reserved',
        badgeClass: 'bg-amber-600 text-white border-amber-500',
        bgLight: 'bg-amber-50 text-amber-800 border-amber-200',
      };
    case 'sold_out':
      return {
        label: 'ရောင်းပြီး (Sold Out)',
        shortLabel: 'Sold Out',
        badgeClass: 'bg-rose-700 text-white border-rose-600',
        bgLight: 'bg-rose-50 text-rose-800 border-rose-200',
      };
    default:
      return {
        label: 'ရောင်းရန်ရှိ',
        shortLabel: 'Available',
        badgeClass: 'bg-slate-600 text-white',
        bgLight: 'bg-slate-100 text-slate-700',
      };
  }
}
