import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, Check, Plus, AlertCircle, Clock, Truck, ShieldCheck, Heart } from 'lucide-react';
import { HealthPackage } from '../types';

interface PackageModalProps {
  pkg: HealthPackage | null;
  isSelected: boolean;
  onClose: () => void;
  onToggleSelect: (pkg: HealthPackage) => void;
}

export const PackageModal: React.FC<PackageModalProps> = ({
  pkg,
  isSelected,
  onClose,
  onToggleSelect,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!pkg) return null;

  // Filter categories and tests based on search
  const filteredCategories = pkg.detailedCategories
    ? pkg.detailedCategories
        .map((cat) => {
          const matchingTests = cat.tests.filter((t) =>
            t.toLowerCase().includes(searchTerm.toLowerCase())
          );
          const matchesCategoryName = cat.categoryName
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
          return {
            ...cat,
            tests: matchesCategoryName ? cat.tests : matchingTests,
            isMatch: matchesCategoryName || matchingTests.length > 0,
          };
        })
        .filter((cat) => cat.isMatch)
    : [];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-4 md:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]"
        >
          {/* Header Banner */}
          <div className={`p-5 sm:p-6 bg-gradient-to-r ${pkg.accentColor} text-white relative`}>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/35 text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/20 border border-white/20">
                Code: {pkg.code}
              </span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-white text-slate-900 shadow-xs">
                {pkg.totalParameters} Total Parameters
              </span>
              {pkg.targetGender !== 'All' && (
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-white/20 border border-white/20">
                  {pkg.targetGender} Only
                </span>
              )}
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight">
              {pkg.name}
            </h2>
            <p className="text-xs sm:text-sm text-white/90 mt-1 max-w-xl">
              {pkg.tagline}
            </p>
          </div>

          {/* Quick specs bar */}
          <div className="px-5 py-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-4 flex-wrap">
              {pkg.fastingHours && (
                <span className="flex items-center gap-1.5 font-medium text-amber-800">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span>{pkg.fastingHours}</span>
                </span>
              )}
              <span className="flex items-center gap-1.5 font-medium text-emerald-800">
                <Truck className="w-4 h-4 text-emerald-600" />
                <span>Free Home Sample Collection</span>
              </span>
              <span className="flex items-center gap-1.5 font-medium text-blue-800">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>Thyrocare Certified</span>
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-xs text-slate-500">Package Fee:</span>
              <span className="text-lg font-black text-slate-900">₹{pkg.price.toLocaleString()}</span>
              {pkg.originalPrice && (
                <span className="text-xs text-slate-400 line-through">₹{pkg.originalPrice.toLocaleString()}</span>
              )}
            </div>
          </div>

          {/* Search inside tests */}
          <div className="p-4 border-b border-slate-100 bg-white">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={`Search tests in ${pkg.name} (e.g. Thyroid, Vitamin, Sugar, CBC)...`}
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue-500 focus:border-brand-blue-500 bg-slate-50/50"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-semibold"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Modal Body - Detailed Categories & Tests List */}
          <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-5">
            {pkg.notes && (
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-semibold">Preparation Instructions:</strong> {pkg.notes}
                </div>
              </div>
            )}

            {filteredCategories.length > 0 ? (
              filteredCategories.map((cat, idx) => (
                <div key={idx} className="rounded-xl border border-slate-200 p-4 bg-white shadow-xs">
                  <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-slate-100">
                    <h4 className="font-bold text-sm text-slate-800 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-brand-blue-600"></span>
                      {cat.categoryName}
                    </h4>
                    {cat.count && (
                      <span className="text-[11px] font-semibold text-brand-blue-700 bg-brand-blue-50 px-2 py-0.5 rounded-full">
                        {cat.tests.length} {cat.tests.length === 1 ? 'parameter' : 'parameters'}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                    {cat.tests.map((testName, tIdx) => (
                      <div key={tIdx} className="text-xs text-slate-700 flex items-center gap-1.5 py-1">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{testName}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-sm text-slate-500">No parameters matching &quot;{searchTerm}&quot;</p>
              </div>
            )}
          </div>

          {/* Modal Sticky Bottom Action Footer */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
            >
              Close
            </button>

            <button
              onClick={() => {
                onToggleSelect(pkg);
              }}
              className={`px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all ${
                isSelected
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/25'
                  : 'bg-brand-blue-600 hover:bg-brand-blue-700 text-white shadow-brand-blue-600/25'
              }`}
            >
              {isSelected ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Selected &bull; Remove from Booking</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Add To Booking &bull; ₹{pkg.price.toLocaleString()}</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
