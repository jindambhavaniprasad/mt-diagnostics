import React from 'react';
import { CLINIC_INFO } from '../data/packages';
import { 
  Droplet, 
  Activity, 
  Microscope, 
  TestTubes, 
  Dna, 
  HeartHandshake, 
  FlaskConical, 
  Home 
} from 'lucide-react';

const facilityIcons: Record<string, React.ReactNode> = {
  "Haematology": <Droplet className="w-5 h-5 text-rose-500" />,
  "Cell Count Report": <Activity className="w-5 h-5 text-blue-500" />,
  "Clinical Pathology": <Microscope className="w-5 h-5 text-indigo-500" />,
  "Biochemistry": <TestTubes className="w-5 h-5 text-amber-500" />,
  "Micro Biology": <Dna className="w-5 h-5 text-emerald-500" />,
  "ECG & Hormones": <HeartHandshake className="w-5 h-5 text-rose-600" />,
  "All Lab Tests": <FlaskConical className="w-5 h-5 text-purple-500" />,
  "Home Visit / Collection": <Home className="w-5 h-5 text-cyan-600" />
};

export const FacilitiesTicker: React.FC = () => {
  return (
    <section className="bg-white border-y border-slate-200 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6">
          <span className="text-[11px] uppercase tracking-wider font-extrabold text-brand-blue-700 bg-brand-blue-50 px-3 py-1 rounded-full border border-brand-blue-200">
            Center Infrastructure
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2">
            Available Diagnostic Facilities
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto mt-1">
            Equipped with cutting-edge automated analyzers and certified pathology standards
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
          {CLINIC_INFO.facilities.map((fac, idx) => (
            <div
              key={idx}
              className="p-3.5 sm:p-4 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-white hover:border-brand-blue-200 hover:shadow-md transition-all duration-200 group"
            >
              <div className="flex items-center gap-3 mb-1.5">
                <div className="p-2 rounded-lg bg-white shadow-xs group-hover:scale-110 transition-transform">
                  {facilityIcons[fac.title] || <FlaskConical className="w-5 h-5 text-brand-blue-500" />}
                </div>
                <h3 className="font-bold text-xs sm:text-sm text-slate-800 leading-tight">
                  {fac.title}
                </h3>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed pl-1">
                {fac.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
