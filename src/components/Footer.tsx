import React from 'react';
import { 
  HeartPulse, 
  MapPin, 
  Phone, 
  Clock, 
  ShieldCheck, 
  Truck, 
  CheckCircle2, 
  ExternalLink 
} from 'lucide-react';
import { CLINIC_INFO } from '../data/packages';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-12 pb-24 sm:pb-16 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Col 1: Brand & Partner */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-blue-700 text-white flex items-center justify-center shadow-lg">
              <HeartPulse className="w-6 h-6 text-rose-400" />
            </div>
            <div>
              <h3 className="font-extrabold text-white text-base leading-tight">
                Mother Teresa
              </h3>
              <p className="text-xs text-brand-blue-400 font-semibold">
                Diagnostic Center
              </p>
            </div>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Delivering precision pathology, automated biochemistry and preventive health profiles in partnership with <strong>Thyrocare Technologies Ltd</strong>.
          </p>

          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-slate-300">NABL Accredited Central Lab Processing</span>
          </div>
        </div>

        {/* Col 2: Facilities */}
        <div>
          <h4 className="font-bold text-white text-sm mb-3 uppercase tracking-wider text-slate-200">
            Available Facilities
          </h4>
          <ul className="space-y-2 text-xs text-slate-400">
            {CLINIC_INFO.facilities.slice(0, 6).map((f, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-blue-400"></span>
                <span>{f.title}</span>
              </li>
            ))}
            <li className="flex items-center gap-2 text-brand-gold-400 font-medium">
              <Truck className="w-3.5 h-3.5" />
              <span>Doorstep Blood Sample Collection</span>
            </li>
          </ul>
        </div>

        {/* Col 3: Location & Timings */}
        <div>
          <h4 className="font-bold text-white text-sm mb-3 uppercase tracking-wider text-slate-200">
            Center Timings
          </h4>
          <div className="space-y-3 text-xs text-slate-400">
            <div className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-brand-blue-400 mt-0.5 shrink-0" />
              <div>
                <strong className="text-slate-200 block">Center Walk-in:</strong>
                <span>Monday – Sunday</span>
                <span className="block text-emerald-400 font-semibold">6:30 AM – 9:00 PM</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Truck className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
              <div>
                <strong className="text-slate-200 block">Home Sample Collection:</strong>
                <span>Daily: 6:30 AM – 1:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Col 4: Contact & Direct Call */}
        <div>
          <h4 className="font-bold text-white text-sm mb-3 uppercase tracking-wider text-slate-200">
            Clinic Contact
          </h4>
          <div className="space-y-3 text-xs text-slate-400">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-rose-500 mt-0.5 shrink-0" />
              <div>
                <span className="text-slate-200 block font-medium">{CLINIC_INFO.address}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-brand-gold-400 shrink-0" />
              <div className="space-y-0.5">
                <a
                  href={`tel:${CLINIC_INFO.phoneRaw}`}
                  className="text-white hover:text-brand-blue-300 font-bold block"
                >
                  {CLINIC_INFO.phonePrimary}
                </a>
              </div>
            </div>

            <a
              href={`https://maps.google.com/?q=${encodeURIComponent('Mother Teresa Diagnostic Center Nallala Bavi Kuntloor Road')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 underline underline-offset-2 pt-1"
            >
              <span>Locate on Google Maps</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
        <p>
          &copy; {new Date().getFullYear()} Mother Teresa Diagnostic Center. In Association with Thyrocare.
        </p>
        <p className="text-[11px]">
          All diagnostic tests are handled by licensed medical lab technologists.
        </p>
      </div>
    </footer>
  );
};
