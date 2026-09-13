import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { HealthPackage } from '../types';

interface CartBottomBarProps {
  selectedPackages: HealthPackage[];
  onOpenCheckout: () => void;
  onOpenCartDrawer: () => void;
}

export const CartBottomBar: React.FC<CartBottomBarProps> = ({
  selectedPackages,
  onOpenCheckout,
  onOpenCartDrawer,
}) => {
  if (selectedPackages.length === 0) return null;

  const totalAmount = selectedPackages.reduce((acc, p) => acc + p.price, 0);
  const totalOriginal = selectedPackages.reduce((acc, p) => acc + (p.originalPrice || p.price), 0);
  const totalSavings = totalOriginal - totalAmount;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', damping: 24, stiffness: 300 }}
        className="fixed bottom-0 left-0 right-0 z-40 p-3 sm:p-4 pointer-events-none"
      >
        <div className="max-w-4xl mx-auto pointer-events-auto">
          <div className="bg-slate-900/95 backdrop-blur-md text-white rounded-2xl p-3.5 sm:p-4 shadow-2xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
            
            {/* Left: Summary and package chips */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
              <button
                onClick={onOpenCartDrawer}
                className="flex items-center gap-3 text-left group cursor-pointer"
              >
                <div className="relative p-2.5 rounded-xl bg-brand-blue-600 text-white group-hover:scale-105 transition-transform shadow-md">
                  <ShoppingBag className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-600 text-[10px] font-extrabold text-white">
                    {selectedPackages.length}
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">
                      {selectedPackages.length} {selectedPackages.length === 1 ? 'Package' : 'Packages'} Selected
                    </span>
                    <span className="text-[11px] text-brand-blue-300 underline underline-offset-2 hidden sm:inline">
                      (Click to review)
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <span className="text-base sm:text-lg font-black text-white">
                      Total: ₹{totalAmount.toLocaleString()}
                    </span>
                    {totalSavings > 0 && (
                      <span className="text-emerald-400 font-semibold text-[11px] bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-500/30">
                        Saved ₹{totalSavings.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              </button>

              {/* Mobile quick review button */}
              <button
                onClick={onOpenCartDrawer}
                className="sm:hidden text-xs text-brand-blue-400 underline font-medium"
              >
                Details
              </button>
            </div>

            {/* Right: Review & Checkout CTA */}
            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
              <button
                onClick={onOpenCartDrawer}
                className="hidden md:inline-flex items-center gap-1 text-xs text-slate-300 hover:text-white px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10 cursor-pointer"
              >
                <span>Review Cart</span>
              </button>

              <button
                onClick={onOpenCheckout}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-bold text-sm shadow-lg shadow-rose-900/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Book</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
