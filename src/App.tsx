import { useState, useRef } from 'react';
import { PACKAGES } from './data/packages';
import { HealthPackage, BookingConfirmation } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FacilitiesTicker } from './components/FacilitiesTicker';
import { PackageCard } from './components/PackageCard';
import { PackageModal } from './components/PackageModal';
import { CartBottomBar } from './components/CartBottomBar';
import { CartDrawer } from './components/CartDrawer';
import { BookingModal } from './components/BookingModal';
import { SuccessView } from './components/SuccessView';
import { ReceiptModal } from './components/ReceiptModal';
import { Footer } from './components/Footer';
import { 
  Sparkles, 
  Clock, 
  Truck, 
  CheckCircle2, 
  ShieldCheck, 
  Layers 
} from 'lucide-react';

export function App() {
  const [selectedPackages, setSelectedPackages] = useState<HealthPackage[]>([]);
  const [activeModalPackage, setActiveModalPackage] = useState<HealthPackage | null>(null);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingConfirmation, setBookingConfirmation] = useState<BookingConfirmation | null>(null);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'All' | 'Aarogyam' | 'Diabetic' | 'Female' | 'Male'>('All');

  const packagesSectionRef = useRef<HTMLDivElement>(null);

  // Multi-selection toggle logic
  const handleToggleSelect = (pkg: HealthPackage) => {
    setSelectedPackages((prev) => {
      const exists = prev.some((p) => p.id === pkg.id);
      if (exists) {
        return prev.filter((p) => p.id !== pkg.id);
      } else {
        return [...prev, pkg];
      }
    });
  };

  const handleRemovePackage = (id: string) => {
    setSelectedPackages((prev) => prev.filter((p) => p.id !== id));
  };

  const handleClearAll = () => {
    setSelectedPackages([]);
  };

  const scrollToPackages = () => {
    packagesSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBookingSuccess = (confirmation: BookingConfirmation) => {
    setIsBookingModalOpen(false);
    setIsCartDrawerOpen(false);
    setBookingConfirmation(confirmation);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReturnHome = () => {
    setBookingConfirmation(null);
    setSelectedPackages([]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filtered packages
  const filteredPackages = PACKAGES.filter((p) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Aarogyam') return p.id.includes('aarogyam');
    if (activeFilter === 'Diabetic') return p.id.includes('diabetic');
    if (activeFilter === 'Female') return p.targetGender === 'Female' || p.targetGender === 'All';
    if (activeFilter === 'Male') return p.targetGender === 'Male' || p.targetGender === 'All';
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased">
      {/* Header with sticky behavior and cart count */}
      <Header
        selectedCount={selectedPackages.length}
        onOpenCart={() => setIsCartDrawerOpen(true)}
      />

      <main className="flex-1">
        {bookingConfirmation ? (
          /* Confirmation Success State */
          <SuccessView
            confirmation={bookingConfirmation}
            onReturnHome={handleReturnHome}
            onViewReceipt={() => setIsReceiptOpen(true)}
          />
        ) : (
          <>
            {/* Hero Section */}
            <Hero onExploreClick={scrollToPackages} />

            {/* Diagnostic Facilities Ticker */}
            <FacilitiesTicker />

            {/* Service Catalog / Packages Section */}
            <section
              ref={packagesSectionRef}
              id="packages-section"
              className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
            >
              {/* Section Header */}
              <div className="text-center max-w-3xl mx-auto mb-10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-blue-100 text-brand-blue-800 text-xs font-bold mb-3 border border-brand-blue-200">
                  <Sparkles className="w-3.5 h-3.5 text-brand-blue-600" />
                  <span>Verified Thyrocare Packages &bull; High Precision Diagnostics</span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                  Choose Your Health Checkup Package
                </h2>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  Select one or multiple diagnostic tests. Enjoy verified NABL lab quality, transparent discounted pricing, and doorstep blood sample collection.
                </p>

                {/* Filter Tabs */}
                <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
                  {[
                    { key: 'All', label: 'All Packages (4)' },
                    { key: 'Diabetic', label: 'Diabetic Special (₹999)' },
                    { key: 'Aarogyam', label: 'Aarogyam 100+ Tests' },
                    { key: 'Female', label: 'Women (AASPWU)' },
                    { key: 'Male', label: 'Men (AAPPUWU)' },
                  ].map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveFilter(tab.key as any)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                        activeFilter === tab.key
                          ? 'bg-brand-blue-700 text-white shadow-sm shadow-brand-blue-700/30'
                          : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Package Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
                {filteredPackages.map((pkg) => (
                  <PackageCard
                    key={pkg.id}
                    pkg={pkg}
                    isSelected={selectedPackages.some((p) => p.id === pkg.id)}
                    onToggleSelect={handleToggleSelect}
                    onViewDetails={(p) => setActiveModalPackage(p)}
                  />
                ))}
              </div>

              {/* Multi-Selection Guidance Helper Banner */}
              <div className="mt-12 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50 to-slate-50 border border-blue-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-brand-blue-600 text-white shrink-0 mt-0.5">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">
                      Need Tests For Multiple Family Members?
                    </h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      You can select both Aarogyam Stree for women and Aarogyam Purush for men, or combine with the Diabetic Profile in a single doorstep visit.
                    </p>
                  </div>
                </div>

                {selectedPackages.length === 0 ? (
                  <button
                    onClick={() => handleToggleSelect(PACKAGES[0])}
                    className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-brand-blue-800 text-xs font-bold border border-slate-200 shadow-xs shrink-0 cursor-pointer transition-colors"
                  >
                    Select Aarogyam Stree
                  </button>
                ) : (
                  <button
                    onClick={() => setIsBookingModalOpen(true)}
                    className="px-5 py-2.5 rounded-xl bg-brand-blue-600 hover:bg-brand-blue-700 text-white text-xs font-bold shadow-md shrink-0 cursor-pointer transition-colors"
                  >
                    Book Selected ({selectedPackages.length}) Now
                  </button>
                )}
              </div>

              {/* Frequently Asked Questions / Preparation Checklist */}
              <div className="mt-16 border-t border-slate-200 pt-12">
                <h3 className="text-xl font-bold text-slate-900 text-center mb-8">
                  Frequently Asked Questions & Preparation
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto text-xs">
                  <div className="p-4 rounded-xl bg-white border border-slate-200">
                    <h5 className="font-bold text-slate-900 text-sm mb-1.5 flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-amber-600" />
                      How should I prepare for fasting tests?
                    </h5>
                    <p className="text-slate-600 leading-relaxed">
                      For Aarogyam and Glucose profiles, maintain 10-12 hours of overnight fasting. You may drink plain water, but avoid tea, coffee, milk, or breakfast before sample collection.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-slate-200">
                    <h5 className="font-bold text-slate-900 text-sm mb-1.5 flex items-center gap-1.5">
                      <Truck className="w-4 h-4 text-emerald-600" />
                      Is Home Visit really free?
                    </h5>
                    <p className="text-slate-600 leading-relaxed">
                      Yes! Home sample collection is completely free across our service locations including Kuntloor, Nallala Bavi, and surrounding areas.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-slate-200">
                    <h5 className="font-bold text-slate-900 text-sm mb-1.5 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-brand-blue-600" />
                      When will I get my test report?
                    </h5>
                    <p className="text-slate-600 leading-relaxed">
                      Digital reports with verified doctor signatures are delivered directly to your registered WhatsApp number and email within 24 to 48 hours.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-slate-200">
                    <h5 className="font-bold text-slate-900 text-sm mb-1.5 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-brand-blue-600" />
                      How do I pay?
                    </h5>
                    <p className="text-slate-600 leading-relaxed">
                      No advance payment needed on this website. You can pay via Google Pay, PhonePe, Paytm, UPI, or Cash directly to the phlebotomist when samples are collected.
                    </p>
                  </div>
                </div>
              </div>

            </section>
          </>
        )}
      </main>

      {/* Floating Sticky Bottom Bar for Selected Packages */}
      {!bookingConfirmation && (
        <CartBottomBar
          selectedPackages={selectedPackages}
          onOpenCheckout={() => setIsBookingModalOpen(true)}
          onOpenCartDrawer={() => setIsCartDrawerOpen(true)}
        />
      )}

      {/* Cart Slide-in Drawer */}
      <CartDrawer
        isOpen={isCartDrawerOpen}
        selectedPackages={selectedPackages}
        onClose={() => setIsCartDrawerOpen(false)}
        onRemovePackage={handleRemovePackage}
        onClearAll={handleClearAll}
        onProceedToCheckout={() => {
          setIsCartDrawerOpen(false);
          setIsBookingModalOpen(true);
        }}
      />

      {/* Full Parameter Breakdown Modal */}
      <PackageModal
        pkg={activeModalPackage}
        isSelected={activeModalPackage ? selectedPackages.some((p) => p.id === activeModalPackage.id) : false}
        onClose={() => setActiveModalPackage(null)}
        onToggleSelect={(pkg) => handleToggleSelect(pkg)}
      />

      {/* Checkout / Booking Form Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        selectedPackages={selectedPackages}
        onClose={() => setIsBookingModalOpen(false)}
        onBookingSuccess={handleBookingSuccess}
      />

      {/* Printable Receipt Modal */}
      <ReceiptModal
        isOpen={isReceiptOpen}
        confirmation={bookingConfirmation}
        onClose={() => setIsReceiptOpen(false)}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
