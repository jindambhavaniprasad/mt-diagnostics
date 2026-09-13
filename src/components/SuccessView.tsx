import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { 
  Check, 
  Calendar, 
  Clock, 
  MapPin, 
  Phone, 
  User, 
  Receipt, 
  Home, 
  MessageSquare, 
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { BookingConfirmation } from '../types';
import { CLINIC_INFO } from '../data/packages';

interface SuccessViewProps {
  confirmation: BookingConfirmation;
  onReturnHome: () => void;
  onViewReceipt: () => void;
}

export const SuccessView: React.FC<SuccessViewProps> = ({
  confirmation,
  onReturnHome,
  onViewReceipt,
}) => {
  // Fire celebratory confetti on mount
  useEffect(() => {
    const end = Date.now() + 1.2 * 1000;
    const colors = ['#0284c7', '#10b981', '#ef4444', '#f59e0b', '#6366f1'];

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: colors,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, []);

  const whatsappMessage = encodeURIComponent(
    `Hello Mother Teresa Diagnostic Center, I have booked a diagnostic test.\nBooking ID: ${confirmation.bookingId}\nPatient: ${confirmation.patient.fullName}\nPhone: ${confirmation.patient.phone}\nSlot: ${confirmation.scheduledDate} (${confirmation.scheduledTime})\nPackages: ${confirmation.packages.map((p) => p.name).join(', ')}\nTotal: ₹${confirmation.totalAmount}`
  );

  return (
    <div className="min-h-[85vh] py-10 px-4 sm:px-6 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden"
      >
        {/* Top Celebration Banner */}
        <div className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-800 text-white p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          
          {/* Animated Green Checkmark Ring */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 15, stiffness: 260, delay: 0.1 }}
            className="w-20 h-20 sm:w-24 sm:h-24 bg-white text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl ring-8 ring-white/20"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Check className="w-10 h-10 sm:w-12 sm:h-12 stroke-[3.5]" />
            </motion.div>
          </motion.div>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Booking Successful!
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100 mt-2 max-w-md mx-auto leading-relaxed">
            Your test has been scheduled. Our team will contact you shortly at{' '}
            <strong className="text-white underline">{confirmation.patient.phone}</strong>.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 bg-emerald-900/40 border border-emerald-400/30 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold text-emerald-200">
            <span>Booking ID:</span>
            <span className="text-white font-black tracking-wider">{confirmation.bookingId}</span>
          </div>
        </div>

        {/* Appointment Details Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Summary Box */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 pb-2">
              Appointment Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <User className="w-4 h-4 text-brand-blue-600 mt-0.5 shrink-0" />
                <div>
                  <span className="text-slate-500 text-[11px] block">Patient Name</span>
                  <strong className="text-slate-800 font-semibold">{confirmation.patient.fullName}</strong>
                  <span className="text-slate-500 text-xs block">({confirmation.patient.age} yrs &bull; {confirmation.patient.gender})</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <div>
                  <span className="text-slate-500 text-[11px] block">Contact Number</span>
                  <strong className="text-slate-800 font-semibold">+91 {confirmation.patient.phone}</strong>
                  <span className="text-emerald-700 text-[11px] block font-medium">WhatsApp updates enabled</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="w-4 h-4 text-brand-blue-600 mt-0.5 shrink-0" />
                <div>
                  <span className="text-slate-500 text-[11px] block">Scheduled Date</span>
                  <strong className="text-slate-800 font-semibold">{confirmation.scheduledDate}</strong>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                <div>
                  <span className="text-slate-500 text-[11px] block">Time Slot</span>
                  <strong className="text-slate-800 font-semibold">{confirmation.scheduledTime}</strong>
                </div>
              </div>

              <div className="sm:col-span-2 flex items-start gap-3 pt-2 border-t border-slate-200/80">
                <MapPin className="w-4 h-4 text-rose-600 mt-0.5 shrink-0" />
                <div>
                  <span className="text-slate-500 text-[11px] block">
                    {confirmation.collectionType === 'home' ? 'Home Sample Collection Address' : 'Center Visit Address'}
                  </span>
                  <strong className="text-slate-800 font-semibold">
                    {confirmation.collectionType === 'home'
                      ? `${confirmation.patient.address}${confirmation.patient.landmark ? ` (Landmark: ${confirmation.patient.landmark})` : ''} - ${confirmation.patient.pincode || '501505'}`
                      : CLINIC_INFO.address}
                  </strong>
                </div>
              </div>
            </div>
          </div>

          {/* Booked Packages breakdown */}
          <div className="rounded-2xl border border-slate-200 p-5 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
              <span>Booked Packages</span>
              <span className="text-emerald-600 font-semibold">Pay on Collection</span>
            </h3>

            <div className="divide-y divide-slate-100 text-xs sm:text-sm">
              {confirmation.packages.map((pkg) => (
                <div key={pkg.id} className="py-2.5 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-slate-900">{pkg.name}</div>
                    <div className="text-[11px] text-slate-500">{pkg.totalParameters} parameters included</div>
                  </div>
                  <div className="font-bold text-slate-800">₹{pkg.price.toLocaleString()}</div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-200 flex items-baseline justify-between">
              <span className="font-bold text-slate-900 text-sm">Total Amount Payable:</span>
              <span className="text-xl font-black text-brand-blue-900">₹{confirmation.totalAmount.toLocaleString()}</span>
            </div>
          </div>

          {/* Preparation guidelines note */}
          <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-900 text-xs space-y-1">
            <strong className="font-bold block">Important Fasting Instructions:</strong>
            <p>If your package requires fasting, avoid taking food, tea, or coffee for 10-12 hours prior to the slot. Only plain drinking water is allowed.</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              onClick={onViewReceipt}
              className="w-full sm:w-1/2 py-3 px-4 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Receipt className="w-4 h-4 text-brand-blue-600" />
              <span>View / Print Receipt</span>
            </button>

            <a
              href={`https://api.whatsapp.com/send?phone=91${CLINIC_INFO.phoneRaw}&text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-1/2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Confirm on WhatsApp</span>
            </a>
          </div>

          {/* Return Home Button per PRD */}
          <div className="text-center pt-2">
            <button
              onClick={onReturnHome}
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-blue-700 hover:text-brand-blue-900 hover:underline transition-all cursor-pointer"
            >
              <Home className="w-4 h-4" />
              <span>Return to Home & Browse More Tests</span>
            </button>
          </div>

        </div>
      </motion.div>
    </div>
  );
};
