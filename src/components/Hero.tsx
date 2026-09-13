import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Truck, Clock, Sparkles, CheckCircle2, Award, ArrowRight } from 'lucide-react';
import { CLINIC_INFO } from '../data/packages';

interface HeroProps {
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-blue-900 via-brand-blue-800 to-slate-900 text-white pt-8 pb-16 px-4 sm:px-6 lg:px-8">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-blue-500/20 rounded-full blur-3xl pointer-events-none -translate-y-1/2"></div>
      <div className="absolute top-1/2 right-10 w-80 h-80 bg-rose-500/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Main Hero Copy */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 text-center lg:text-left"
          >
            {/* Trust badge pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-brand-gold-400 mb-4 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-brand-gold-400" />
              <span>Thyrocare Authorized Partner &bull; Precision Diagnostics</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight mb-4">
              Care & Precision For Your Family's <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-brand-blue-200 to-rose-300">Health Checkup</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-200 mb-6 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Book comprehensive Aarogyam, Master Health & Diabetic packages at discounted flyer prices. Enjoy <strong className="text-white font-semibold">FREE Home Sample Collection</strong> with accurate digital reports on WhatsApp within 24 hours.
            </p>

            {/* Quick value proposition pills */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8 text-left max-w-xl mx-auto lg:mx-0">
              <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <Truck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-white">Free Home Visit</div>
                  <div className="text-[11px] text-slate-300">Trained phlebotomists</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <Clock className="w-4 h-4 text-brand-gold-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-white">Fast Reports</div>
                  <div className="text-[11px] text-slate-300">Digital WhatsApp delivery</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm col-span-2 sm:col-span-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-white">100% Reliable</div>
                  <div className="text-[11px] text-slate-300">NABL certified testing</div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5">
              <button
                onClick={onExploreClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-bold text-sm shadow-lg shadow-rose-900/40 hover:shadow-rose-700/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                <span>View Packages & Book</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`tel:${CLINIC_INFO.phoneRaw}`}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/20 backdrop-blur-sm transition-colors"
              >
                <span>Call {CLINIC_INFO.phonePrimary}</span>
              </a>
            </div>
          </motion.div>

          {/* Special Promotional Flyer Highlight Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-2xl p-6 bg-gradient-to-br from-white/15 via-white/10 to-white/5 border border-white/20 backdrop-blur-xl shadow-2xl">
              <div className="absolute -top-3.5 right-6 px-3 py-1 rounded-full bg-rose-600 text-white text-[11px] font-extrabold uppercase tracking-wider shadow-md">
                Limited Time Offer
              </div>

              <div className="flex items-center gap-2 text-brand-gold-400 text-xs font-bold mb-2">
                <Award className="w-4 h-4" />
                <span>POPULAR FLYER SPECIAL</span>
              </div>

              <h2 className="text-2xl font-black text-white mb-1">
                Diabetic Profile Checkup
              </h2>
              <p className="text-xs text-slate-300 mb-4">
                HbA1c, FBS, PPBS, Creatinine, Lipid Basic & Urine Routine
              </p>

              <div className="flex items-baseline gap-3 mb-4 p-3 rounded-xl bg-black/20 border border-white/10">
                <span className="text-3xl font-black text-emerald-400">₹999/-</span>
                <span className="text-base text-slate-400 line-through">₹2,000</span>
                <span className="ml-auto text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Save ₹1,001 (50% OFF)
                </span>
              </div>

              <ul className="space-y-2 mb-5 text-xs text-slate-200">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>FREE Home Sample Collection</strong> included</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Early Morning slot for ideal fasting sample</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Certified Thyrocare Barcode Sealed Vials</span>
                </li>
              </ul>

              <button
                onClick={onExploreClick}
                className="w-full py-2.5 rounded-lg bg-white text-brand-blue-900 font-bold text-xs hover:bg-slate-100 transition-colors shadow-md text-center"
              >
                Select This & Other Packages Below
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
