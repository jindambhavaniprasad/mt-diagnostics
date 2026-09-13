import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ArrowRight, ShieldCheck, Clock, Truck, PlusCircle } from 'lucide-react';
import { HealthPackage } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  selectedPackages: HealthPackage[];
  onClose: () => void;
  onRemovePackage: (id: string) => void;
  onClearAll: () => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  selectedPackages,
  onClose,
  onRemovePackage,
  onClearAll,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const totalAmount = selectedPackages.reduce((acc, p) => acc + p.price, 0);
  const totalOriginal = selectedPackages.reduce((acc, p) => acc + (p.originalPrice || p.price), 0);
  const totalSavings = totalOriginal - totalAmount;

  // Check if any selected package requires fasting
  const requiresFasting = selectedPackages.some((p) => p.fastingHours);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 280 }}
            className="w-screen max-w-md bg-white shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-brand-blue-900 to-brand-blue-800 text-white flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base sm:text-lg">Your Booking Cart</h3>
                <p className="text-xs text-brand-blue-200">
                  {selectedPackages.length} {selectedPackages.length === 1 ? 'package' : 'packages'} selected
                </p>
              </div>

              <div className="flex items-center gap-2">
                {selectedPackages.length > 0 && (
                  <button
                    onClick={onClearAll}
                    className="text-xs text-rose-300 hover:text-white px-2 py-1 rounded hover:bg-white/10 transition-colors"
                  >
                    Clear All
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content List */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
              {selectedPackages.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
                    <PlusCircle className="w-8 h-8" />
                  </div>
                  <h4 className="font-bold text-slate-800 text-base">Your Cart is Empty</h4>
                  <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                    Select one or multiple diagnostic packages from our catalog to book your health checkup.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-5 px-4 py-2 rounded-xl bg-brand-blue-600 text-white text-xs font-semibold hover:bg-brand-blue-700 transition-colors"
                  >
                    Browse Packages
                  </button>
                </div>
              ) : (
                <>
                  <div className="space-y-3">
                    {selectedPackages.map((pkg) => (
                      <div
                        key={pkg.id}
                        className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-brand-blue-200 transition-all flex flex-col justify-between"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-brand-blue-100 text-brand-blue-800">
                              {pkg.code}
                            </span>
                            <h5 className="font-bold text-xs sm:text-sm text-slate-900 mt-1 leading-tight">
                              {pkg.name}
                            </h5>
                            <span className="text-[11px] text-slate-500">
                              {pkg.totalParameters} parameters included
                            </span>
                          </div>

                          <button
                            onClick={() => onRemovePackage(pkg.id)}
                            className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors"
                            title="Remove from booking"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="mt-3 pt-2.5 border-t border-slate-200/80 flex items-center justify-between text-xs">
                          <span className="text-[11px] text-emerald-700 font-medium">
                            {pkg.freeHomeCollection ? 'Free Home Visit' : 'Center Visit'}
                          </span>
                          <div className="flex items-baseline gap-1.5">
                            {pkg.originalPrice && (
                              <span className="text-[11px] text-slate-400 line-through">
                                ₹{pkg.originalPrice}
                              </span>
                            )}
                            <span className="font-black text-slate-900 text-sm">
                              ₹{pkg.price.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Fasting Reminder Notice if needed */}
                  {requiresFasting && (
                    <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
                      <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="font-semibold">Fasting Requirement:</strong> One or more selected packages require 10-12 hours fasting. Please schedule a morning slot.
                      </div>
                    </div>
                  )}

                  {/* Trust Highlights */}
                  <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-100 text-xs text-slate-700 space-y-1.5">
                    <div className="flex items-center gap-2 font-medium text-brand-blue-800">
                      <Truck className="w-3.5 h-3.5 text-brand-blue-600" />
                      <span>Free home collection anywhere in service radius</span>
                    </div>
                    <div className="flex items-center gap-2 font-medium text-brand-blue-800">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>100% genuine Thyrocare barcode trackable tubes</span>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Drawer Footer & Checkout Button */}
            {selectedPackages.length > 0 && (
              <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 space-y-3">
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between text-slate-600">
                    <span>Packages Subtotal:</span>
                    <span>₹{totalOriginal.toLocaleString()}</span>
                  </div>
                  {totalSavings > 0 && (
                    <div className="flex items-center justify-between text-emerald-700 font-semibold">
                      <span>Package Discount Savings:</span>
                      <span>-₹{totalSavings.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-slate-600">
                    <span>Home Sample Collection:</span>
                    <span className="text-emerald-600 font-bold uppercase text-[11px]">FREE</span>
                  </div>
                  <div className="pt-2 border-t border-slate-200 flex items-baseline justify-between text-sm sm:text-base font-bold text-slate-900">
                    <span>Total To Pay:</span>
                    <span className="text-xl font-black text-brand-blue-900">₹{totalAmount.toLocaleString()}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 text-right">
                    Cash / UPI upon sample collection
                  </p>
                </div>

                <button
                  onClick={() => {
                    onClose();
                    onProceedToCheckout();
                  }}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-bold text-sm shadow-lg shadow-rose-900/30 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.01]"
                >
                  <span>Proceed to Booking Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
