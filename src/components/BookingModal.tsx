import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Home, 
  Building2, 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Loader2, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  IndianRupee
} from 'lucide-react';
import { HealthPackage, BookingFormData, BookingConfirmation } from '../types';
import { CLINIC_INFO, TIME_SLOTS } from '../data/packages';

interface BookingModalProps {
  isOpen: boolean;
  selectedPackages: HealthPackage[];
  onClose: () => void;
  onBookingSuccess: (confirmation: BookingConfirmation) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  selectedPackages,
  onClose,
  onBookingSuccess,
}) => {
  // Tomorrow's date in YYYY-MM-DD
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDate = tomorrow.toISOString().split('T')[0];

  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '',
    phone: '',
    email: '',
    age: '',
    gender: 'Male',
    collectionType: 'home',
    preferredDate: defaultDate,
    preferredTimeSlot: TIME_SLOTS[1].time, // 7:30 AM - 8:30 AM (Best for Fasting)
    address: '',
    landmark: '',
    pincode: '501505',
    additionalNotes: '',
    paymentMethod: 'cash_on_collection',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const totalAmount = selectedPackages.reduce((acc, p) => acc + p.price, 0);
  const totalOriginal = selectedPackages.reduce((acc, p) => acc + (p.originalPrice || p.price), 0);
  const totalDiscount = totalOriginal - totalAmount;

  // Validate form
  const validate = () => {
    const errs: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      errs.fullName = 'Please enter patient full name';
    }

    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      errs.phone = 'Please enter a valid 10-digit mobile number';
    }

    if (!formData.age || Number(formData.age) <= 0 || Number(formData.age) > 120) {
      errs.age = 'Please enter valid age';
    }

    if (!formData.preferredDate) {
      errs.preferredDate = 'Please select a preferred date';
    }

    if (!formData.preferredTimeSlot) {
      errs.preferredTimeSlot = 'Please select a preferred time slot';
    }

    if (formData.collectionType === 'home') {
      if (!formData.address.trim()) {
        errs.address = 'Home address is required for doorstep sample collection';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    // 1.5 seconds simulated API submission per PRD instructions
    setTimeout(() => {
      setIsSubmitting(false);

      const randomNum = Math.floor(100000 + Math.random() * 900000);
      const confirmation: BookingConfirmation = {
        bookingId: `MTDC-${randomNum}`,
        createdAt: new Date().toISOString(),
        patient: formData,
        packages: selectedPackages,
        subtotal: totalOriginal,
        discount: totalDiscount,
        totalAmount: totalAmount,
        collectionType: formData.collectionType,
        scheduledDate: formData.preferredDate,
        scheduledTime: formData.preferredTimeSlot,
      };

      onBookingSuccess(confirmation);
    }, 1500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-4 md:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => !isSubmitting && onClose()}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm"
        />

        {/* Modal dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[92vh]"
        >
          {/* Header */}
          <div className="p-5 sm:p-6 bg-gradient-to-r from-brand-blue-900 to-brand-blue-800 text-white flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-white/20 border border-white/20">
                  Mother Teresa Diagnostic Center
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Book Diagnostic Health Test
              </h2>
              <p className="text-xs text-brand-blue-200 mt-0.5">
                {selectedPackages.length} {selectedPackages.length === 1 ? 'Package' : 'Packages'} &bull; Total: ₹{totalAmount.toLocaleString()} (Cash / UPI on Collection)
              </p>
            </div>

            {!isSubmitting && (
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Close booking form"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 p-5 sm:p-6 space-y-6">
            
            {/* Step 1: Collection Type Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">
                Select Sample Collection Type <span className="text-rose-600">*</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Home Visit Option */}
                <label
                  className={`relative p-3.5 rounded-xl border-2 cursor-pointer flex items-start gap-3 transition-all ${
                    formData.collectionType === 'home'
                      ? 'border-brand-blue-600 bg-brand-blue-50/50 ring-1 ring-brand-blue-600'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="collectionType"
                    value="home"
                    checked={formData.collectionType === 'home'}
                    onChange={() => setFormData({ ...formData, collectionType: 'home' })}
                    className="mt-1 h-4 w-4 text-brand-blue-600 focus:ring-brand-blue-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                        <Home className="w-4 h-4 text-brand-blue-600" />
                        Home Visit
                      </span>
                      <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                        FREE
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">
                      Our trained phlebotomist visits your doorstep with sterile sealed vials.
                    </p>
                  </div>
                </label>

                {/* Center Visit Option */}
                <label
                  className={`relative p-3.5 rounded-xl border-2 cursor-pointer flex items-start gap-3 transition-all ${
                    formData.collectionType === 'center'
                      ? 'border-brand-blue-600 bg-brand-blue-50/50 ring-1 ring-brand-blue-600'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="collectionType"
                    value="center"
                    checked={formData.collectionType === 'center'}
                    onChange={() => setFormData({ ...formData, collectionType: 'center' })}
                    className="mt-1 h-4 w-4 text-brand-blue-600 focus:ring-brand-blue-500"
                  />
                  <div className="flex-1">
                    <span className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                      <Building2 className="w-4 h-4 text-brand-blue-600" />
                      Center Walk-in
                    </span>
                    <p className="text-xs text-slate-600 mt-1">
                      Visit Mother Teresa Diagnostic Center, Nallala Bavi, Kuntloor Road.
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Step 2: Patient Information */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <User className="w-4 h-4 text-brand-blue-600" />
                Patient Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Ramesh Kumar / Ananya Sharma"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm focus:outline-none focus:ring-2 ${
                      errors.fullName
                        ? 'border-rose-300 focus:ring-rose-500 bg-rose-50/30'
                        : 'border-slate-300 focus:ring-brand-blue-500 focus:border-brand-blue-500'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-[11px] text-rose-600 mt-1">{errors.fullName}</p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mobile Number (WhatsApp Report) <span className="text-rose-600">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-500">
                      +91
                    </span>
                    <input
                      type="tel"
                      maxLength={10}
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                      placeholder="9876543210"
                      className={`w-full pl-12 pr-3.5 py-2.5 rounded-xl border text-xs sm:text-sm focus:outline-none focus:ring-2 ${
                        errors.phone
                          ? 'border-rose-300 focus:ring-rose-500 bg-rose-50/30'
                          : 'border-slate-300 focus:ring-brand-blue-500 focus:border-brand-blue-500'
                      }`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-[11px] text-rose-600 mt-1">{errors.phone}</p>
                  )}
                </div>

                {/* Age & Gender */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Age <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={120}
                      required
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      placeholder="e.g. 42"
                      className={`w-full px-3 py-2.5 rounded-xl border text-xs sm:text-sm focus:outline-none focus:ring-2 ${
                        errors.age
                          ? 'border-rose-300 focus:ring-rose-500 bg-rose-50/30'
                          : 'border-slate-300 focus:ring-brand-blue-500 focus:border-brand-blue-500'
                      }`}
                    />
                    {errors.age && (
                      <p className="text-[11px] text-rose-600 mt-1">{errors.age}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Gender <span className="text-rose-600">*</span>
                    </label>
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue-500"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Date and Time Slot */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-brand-blue-600" />
                Preferred Date & Time Slot
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Date Picker */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Select Date <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    required
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue-500"
                  />
                  {errors.preferredDate && (
                    <p className="text-[11px] text-rose-600 mt-1">{errors.preferredDate}</p>
                  )}
                </div>

                {/* Time Slot Picker */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Select Time Window <span className="text-rose-600">*</span>
                  </label>
                  <select
                    value={formData.preferredTimeSlot}
                    onChange={(e) => setFormData({ ...formData, preferredTimeSlot: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue-500"
                  >
                    {TIME_SLOTS.map((slot, idx) => (
                      <option key={idx} value={slot.time}>
                        {slot.time} {slot.idealForFasting ? '★ (Best for Fasting)' : ''}
                      </option>
                    ))}
                  </select>
                  {errors.preferredTimeSlot && (
                    <p className="text-[11px] text-rose-600 mt-1">{errors.preferredTimeSlot}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Step 4: Home Address (if Home Visit selected) */}
            {formData.collectionType === 'home' ? (
              <div className="space-y-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-rose-600" />
                  Sample Collection Address
                </h4>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Flat / House No., Street, Colony <span className="text-rose-600">*</span>
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="e.g. Flat 302, Sai Residency, Near Hanuman Temple, Kuntloor Road"
                    className={`w-full px-3.5 py-2 rounded-xl border text-xs sm:text-sm focus:outline-none focus:ring-2 ${
                      errors.address
                        ? 'border-rose-300 focus:ring-rose-500 bg-rose-50/30'
                        : 'border-slate-300 focus:ring-brand-blue-500 focus:border-brand-blue-500'
                    }`}
                  />
                  {errors.address && (
                    <p className="text-[11px] text-rose-600 mt-1">{errors.address}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Nearby Landmark
                    </label>
                    <input
                      type="text"
                      value={formData.landmark || ''}
                      onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                      placeholder="e.g. Opposite Water Tank"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Pincode
                    </label>
                    <input
                      type="text"
                      value={formData.pincode || ''}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      placeholder="e.g. 501505"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue-500"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 text-xs text-brand-blue-900 flex items-start gap-2.5">
                <MapPin className="w-5 h-5 text-brand-blue-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold">Clinic Walk-in Address:</strong>
                  <p className="mt-0.5">{CLINIC_INFO.address}</p>
                  <p className="text-[11px] text-brand-blue-700 mt-1">
                    Open all 7 days from 6:30 AM to 9:00 PM. Please arrive 10 minutes before your slot.
                  </p>
                </div>
              </div>
            )}

            {/* Step 5: Order Summary */}
            <div className="p-4 rounded-xl bg-slate-900 text-white space-y-3">
              <div className="flex items-center justify-between text-xs border-b border-white/10 pb-2">
                <span className="font-bold text-slate-300">Selected Packages ({selectedPackages.length})</span>
                <span className="text-emerald-400 font-semibold">Free Phlebotomist Visit</span>
              </div>

              <div className="space-y-1.5">
                {selectedPackages.map((p) => (
                  <div key={p.id} className="flex items-center justify-between text-xs text-slate-200">
                    <span className="truncate max-w-[260px] sm:max-w-xs">{p.name}</span>
                    <span className="font-semibold shrink-0">₹{p.price.toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-white/10 flex items-baseline justify-between">
                <div>
                  <div className="text-xs text-slate-400">Total Payable Amount:</div>
                  <div className="text-[11px] text-emerald-400 font-medium">Payment Mode: Cash or UPI upon sample handover</div>
                </div>
                <div className="text-2xl font-black text-white">
                  ₹{totalAmount.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Submit Action button with simulated 1.5s delay */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-bold text-base shadow-xl shadow-rose-900/30 flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Booking Your Test Slot (Please wait)...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Confirm Booking &bull; ₹{totalAmount.toLocaleString()}</span>
                  </>
                )}
              </button>
              <p className="text-[11px] text-slate-500 text-center mt-2 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>No advance payment needed. Pay during sample collection.</span>
              </p>
            </div>

          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
