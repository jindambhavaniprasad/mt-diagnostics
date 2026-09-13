import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  Sparkles, 
  FileText, 
  Truck, 
  Info,
  Plus
} from 'lucide-react';
import { HealthPackage } from '../types';

interface PackageCardProps {
  pkg: HealthPackage;
  isSelected: boolean;
  onToggleSelect: (pkg: HealthPackage) => void;
  onViewDetails: (pkg: HealthPackage) => void;
}

export const PackageCard: React.FC<PackageCardProps> = ({
  pkg,
  isSelected,
  onToggleSelect,
  onViewDetails,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Calculate discount percentage if original price exists
  const discountPercent = pkg.originalPrice
    ? Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className={`relative rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden ${
        isSelected
          ? 'bg-white border-brand-blue-500 ring-2 ring-brand-blue-500 shadow-xl shadow-brand-blue-500/10'
          : 'bg-white border-slate-200 hover:border-brand-blue-300 shadow-md hover:shadow-lg'
      }`}
    >
      {/* Top Banner accent strip */}
      <div className={`h-2.5 w-full bg-gradient-to-r ${pkg.accentColor}`} />

      {/* Card Header & Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col">
        
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-extrabold uppercase tracking-wide px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
              {pkg.code}
            </span>

            {pkg.featuredTag && (
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-rose-500" />
                {pkg.featuredTag}
              </span>
            )}

            {pkg.targetGender !== 'All' && (
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                pkg.targetGender === 'Female' 
                  ? 'bg-pink-100 text-pink-800 border border-pink-200' 
                  : 'bg-blue-100 text-blue-800 border border-blue-200'
              }`}>
                {pkg.targetGender} Only
              </span>
            )}
          </div>

          {/* Test count badge */}
          <div className="text-right shrink-0">
            <span className="inline-flex items-center text-xs font-bold text-brand-blue-800 bg-brand-blue-50 px-2.5 py-1 rounded-lg border border-brand-blue-200">
              {pkg.totalParameters} Tests
            </span>
          </div>
        </div>

        {/* Title & Tagline */}
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight leading-snug mb-1">
          {pkg.name}
        </h3>
        <p className="text-xs text-slate-600 mb-4 line-clamp-2">
          {pkg.tagline}
        </p>

        {/* Fasting & Logistics Tags */}
        <div className="flex flex-wrap items-center gap-2 mb-4 text-xs">
          {pkg.fastingHours && (
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-800 bg-amber-50 px-2 py-1 rounded-md border border-amber-200">
              <Clock className="w-3 h-3 text-amber-600" />
              {pkg.fastingHours}
            </span>
          )}

          {pkg.freeHomeCollection && (
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200">
              <Truck className="w-3 h-3 text-emerald-600" />
              FREE Home Collection
            </span>
          )}
        </div>

        {/* Pricing Box */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 mb-4">
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-slate-900">
                ₹{pkg.price.toLocaleString()}
              </span>
              {pkg.originalPrice && (
                <span className="text-sm text-slate-400 line-through">
                  ₹{pkg.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            {discountPercent > 0 && (
              <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                {discountPercent}% OFF
              </span>
            )}
          </div>
          <div className="text-[11px] text-slate-500 mt-1 flex items-center justify-between">
            <span>Includes sample processing & report</span>
            <span className="text-brand-blue-700 font-semibold">Pay on Collection</span>
          </div>
        </div>

        {/* Key Tests Included Preview */}
        <div className="mb-4">
          <div className="text-xs font-bold text-slate-700 mb-2 flex items-center justify-between">
            <span>Key Profiles Included:</span>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-[11px] text-brand-blue-600 hover:text-brand-blue-800 font-medium inline-flex items-center gap-0.5"
            >
              <span>{isExpanded ? 'Collapse' : 'Preview all'}</span>
              {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          </div>

          <ul className="space-y-1.5 text-xs text-slate-700">
            {pkg.keyTestProfiles.slice(0, isExpanded ? pkg.keyTestProfiles.length : 4).map((test, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-blue-500 mt-1.5 shrink-0" />
                <span className="leading-tight">{test}</span>
              </li>
            ))}
          </ul>

          {!isExpanded && pkg.keyTestProfiles.length > 4 && (
            <p className="text-[11px] text-slate-500 mt-1.5 pl-3.5 italic">
              + {pkg.keyTestProfiles.length - 4} more test profiles...
            </p>
          )}
        </div>

        {/* View Details full breakdown trigger */}
        <button
          onClick={() => onViewDetails(pkg)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-blue-700 hover:text-brand-blue-900 mb-4 transition-colors group/btn self-start"
        >
          <Info className="w-3.5 h-3.5 text-brand-blue-600 group-hover/btn:scale-110 transition-transform" />
          <span className="underline underline-offset-2">View Full Parameter Breakdown ({pkg.totalParameters} tests)</span>
        </button>
      </div>

      {/* Card Action Footer */}
      <div className="p-4 sm:p-5 bg-slate-50/90 border-t border-slate-100 flex items-center gap-3">
        <button
          onClick={() => onToggleSelect(pkg)}
          className={`w-full py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2.5 transition-all duration-200 cursor-pointer ${
            isSelected
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/30'
              : 'bg-brand-blue-600 hover:bg-brand-blue-700 text-white shadow-md shadow-brand-blue-600/20 hover:scale-[1.01]'
          }`}
        >
          {isSelected ? (
            <>
              <div className="w-5 h-5 rounded-full bg-white text-emerald-600 flex items-center justify-center shadow-xs">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <span>Selected for Booking</span>
            </>
          ) : (
            <>
              <div className="w-5 h-5 rounded-full bg-white/20 text-white flex items-center justify-center">
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
              <span>Select This Package</span>
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
};
