import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Printer, Download, CheckCircle2, ShieldCheck, HeartPulse } from 'lucide-react';
import { BookingConfirmation } from '../types';
import { CLINIC_INFO } from '../data/packages';

interface ReceiptModalProps {
  isOpen: boolean;
  confirmation: BookingConfirmation | null;
  onClose: () => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({
  isOpen,
  confirmation,
  onClose,
}) => {
  if (!isOpen || !confirmation) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-4 md:p-6 print:p-0">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm print:hidden"
        />

        {/* Modal / Printable Slip */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden z-10 print:shadow-none print:w-full print:max-w-none print:rounded-none"
        >
          {/* Top Bar for Action (Hidden when printing) */}
          <div className="p-4 bg-slate-900 text-white flex items-center justify-between print:hidden">
            <span className="text-xs font-semibold text-slate-300">
              Booking Receipt &bull; {confirmation.bookingId}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-blue-600 hover:bg-brand-blue-700 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Slip</span>
              </button>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Close receipt"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Receipt Document Body */}
          <div className="p-6 sm:p-8 space-y-6 text-slate-900 bg-white">
            
            {/* Header / Letterhead */}
            <div className="border-b-2 border-brand-blue-700 pb-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-brand-blue-800 text-white flex items-center justify-center">
                    <HeartPulse className="w-7 h-7 text-rose-400" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-black text-brand-blue-900 leading-tight">
                      MOTHER TERESA DIAGNOSTIC CENTER
                    </h2>
                    <p className="text-[11px] text-slate-600">
                      Haematology &bull; Biochemistry &bull; Micro Biology &bull; Clinical Pathology &bull; ECG
                    </p>
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      {CLINIC_INFO.address}
                    </p>
                  </div>
                </div>

                <div className="text-left sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 w-full sm:w-auto">
                  <span className="inline-block text-[11px] font-bold px-2 py-0.5 rounded bg-brand-blue-50 text-brand-blue-800 border border-brand-blue-200">
                    Partner: Thyrocare
                  </span>
                  <div className="text-xs text-slate-700 mt-1 font-semibold">
                    Phone: {CLINIC_INFO.phonePrimary}
                  </div>
                </div>
              </div>
            </div>

            {/* Receipt Metadata Ribbon */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
              <div>
                <span className="text-[10px] text-slate-500 uppercase block font-semibold">Booking ID</span>
                <strong className="font-mono font-bold text-slate-900">{confirmation.bookingId}</strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase block font-semibold">Booking Date</span>
                <strong className="font-medium text-slate-800">
                  {new Date(confirmation.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase block font-semibold">Collection Slot</span>
                <strong className="font-medium text-slate-800">{confirmation.scheduledDate}</strong>
                <span className="text-[10px] text-slate-500 block">{confirmation.scheduledTime}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase block font-semibold">Collection Type</span>
                <strong className="font-medium text-emerald-700 uppercase">
                  {confirmation.collectionType === 'home' ? 'Home Visit' : 'Center Visit'}
                </strong>
              </div>
            </div>

            {/* Patient Info */}
            <div className="text-xs space-y-1">
              <h3 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] border-b border-slate-200 pb-1">
                Patient Particulars
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-slate-700">
                <div><strong>Patient Name:</strong> {confirmation.patient.fullName}</div>
                <div><strong>Age / Gender:</strong> {confirmation.patient.age} Y / {confirmation.patient.gender}</div>
                <div><strong>Contact Mobile:</strong> +91 {confirmation.patient.phone}</div>
                <div><strong>Payment Status:</strong> Due on Collection (Cash/UPI)</div>
                {confirmation.collectionType === 'home' && (
                  <div className="sm:col-span-2">
                    <strong>Sample Address:</strong> {confirmation.patient.address}, {confirmation.patient.landmark ? `Landmark: ${confirmation.patient.landmark}, ` : ''}{confirmation.patient.pincode}
                  </div>
                )}
              </div>
            </div>

            {/* Itemized Table */}
            <div>
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                    <th className="py-2.5 px-3 font-bold">#</th>
                    <th className="py-2.5 px-3 font-bold">Test Profile / Package</th>
                    <th className="py-2.5 px-3 font-bold">Parameters</th>
                    <th className="py-2.5 px-3 font-bold text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {confirmation.packages.map((pkg, i) => (
                    <tr key={pkg.id}>
                      <td className="py-2.5 px-3 text-slate-500">{i + 1}</td>
                      <td className="py-2.5 px-3">
                        <div className="font-semibold text-slate-900">{pkg.name}</div>
                        <div className="text-[10px] text-slate-500">Code: {pkg.code}</div>
                      </td>
                      <td className="py-2.5 px-3 text-slate-600">{pkg.totalParameters} Tests</td>
                      <td className="py-2.5 px-3 font-bold text-right text-slate-900">
                        ₹{pkg.price.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-slate-300">
                    <td colSpan={3} className="py-2 px-3 text-right font-semibold text-slate-600">Subtotal:</td>
                    <td className="py-2 px-3 text-right font-semibold text-slate-700">₹{confirmation.subtotal.toLocaleString()}</td>
                  </tr>
                  {confirmation.discount > 0 && (
                    <tr>
                      <td colSpan={3} className="py-1 px-3 text-right text-emerald-600 font-semibold">Promotional Savings:</td>
                      <td className="py-1 px-3 text-right text-emerald-600 font-semibold">-₹{confirmation.discount.toLocaleString()}</td>
                    </tr>
                  )}
                  <tr>
                    <td colSpan={3} className="py-1 px-3 text-right text-slate-600 font-semibold">Home Sample Collection:</td>
                    <td className="py-1 px-3 text-right text-emerald-600 font-bold uppercase text-[10px]">FREE</td>
                  </tr>
                  <tr className="border-t border-slate-300 text-sm font-black text-slate-900">
                    <td colSpan={3} className="py-2.5 px-3 text-right">Total Payable Amount:</td>
                    <td className="py-2.5 px-3 text-right text-brand-blue-900 text-base">₹{confirmation.totalAmount.toLocaleString()}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Footer Sign-off & Barcode mock */}
            <div className="pt-4 border-t border-dashed border-slate-300 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
              <div className="space-y-1 text-slate-500 text-[11px] text-center sm:text-left">
                <p>1. Fasting instructions must be adhered to for accurate lipid and glucose values.</p>
                <p>2. Reports are certified and delivered via WhatsApp within 24-48 hours.</p>
                <p>3. This is a computer-generated booking requisition slip.</p>
              </div>

              <div className="text-center sm:text-right shrink-0">
                <div className="inline-block px-3 py-1 rounded bg-slate-100 border border-slate-300 font-mono text-xs font-bold tracking-widest text-slate-700">
                  * {confirmation.bookingId} *
                </div>
                <div className="text-[10px] text-slate-500 mt-1 font-semibold">
                  Authorized Diagnostic Partner
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
