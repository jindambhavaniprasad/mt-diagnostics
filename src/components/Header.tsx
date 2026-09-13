import React from 'react';
import { Phone, MapPin, Clock, ShieldCheck, HeartPulse } from 'lucide-react';
import { CLINIC_INFO } from '../data/packages';

interface HeaderProps {
  selectedCount: number;
  onOpenCart: () => void;
}

export const Header: React.FC<HeaderProps> = ({ selectedCount, onOpenCart }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all duration-200">
      {/* Top micro-bar for urgent contact and accreditation */}
      <div className="bg-gradient-to-r from-brand-blue-900 via-brand-blue-800 to-brand-blue-950 text-white text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="inline-flex items-center gap-1.5 font-medium text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Open Now &bull; 6:30 AM – 9:00 PM
            </span>
            <span className="hidden md:inline-flex items-center gap-1 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-brand-gold-400" />
              Home Collection: 6:30 AM – 1:00 PM
            </span>
            <span className="hidden lg:inline-flex items-center gap-1 text-slate-200">
              <MapPin className="w-3.5 h-3.5 text-rose-400" />
              Nallala Bavi, Kuntloor Road
            </span>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <div className="flex items-center gap-1.5 bg-white/10 px-2.5 py-0.5 rounded-full text-slate-100 text-[11px] font-medium border border-white/10">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Partner: <strong>Thyrocare</strong></span>
            </div>
            <a
              href={`tel:${CLINIC_INFO.phoneRaw}`}
              className="inline-flex items-center gap-1 text-brand-gold-400 hover:text-white font-semibold transition-colors"
              title="Click to Call"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{CLINIC_INFO.phonePrimary}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation & branding bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Identity */}
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-brand-blue-700 to-brand-blue-900 text-white shadow-md shadow-brand-blue-500/20 ring-2 ring-brand-blue-100">
              <HeartPulse className="w-6 h-6 sm:w-7 sm:h-7 text-rose-400 animate-pulse" />
              <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-rose-600 border border-white text-[9px] font-bold text-white items-center justify-center">+</span>
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 leading-tight">
                  Mother Teresa <span className="text-brand-blue-700">Diagnostic Center</span>
                </h1>
                <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-rose-100 text-rose-700 rounded-md border border-rose-200">
                  Govt Regd &bull; Thyrocare
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block truncate max-w-lg">
                {CLINIC_INFO.address}
              </p>
              <p className="text-[11px] text-slate-500 sm:hidden">
                Kuntloor Road &bull; Call: {CLINIC_INFO.phoneRaw}
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={`tel:${CLINIC_INFO.phoneRaw}`}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:text-brand-blue-700 hover:bg-slate-100 transition-colors border border-slate-200"
            >
              <Phone className="w-3.5 h-3.5 text-brand-blue-600" />
              <span>Call Center</span>
            </a>

            <button
              onClick={onOpenCart}
              className={`relative inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all shadow-sm ${
                selectedCount > 0
                  ? 'bg-brand-blue-600 hover:bg-brand-blue-700 text-white shadow-brand-blue-500/25 ring-2 ring-brand-blue-300'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <span className="relative">
                Cart
                {selectedCount > 0 && (
                  <span className="ml-1.5 inline-flex items-center justify-center px-1.5 py-0.5 text-[11px] font-bold leading-none text-white bg-rose-600 rounded-full">
                    {selectedCount}
                  </span>
                )}
              </span>
              <span className="hidden sm:inline text-xs font-normal opacity-85">
                {selectedCount > 0 ? 'Selected' : 'Empty'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
