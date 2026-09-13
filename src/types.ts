export interface TestCategory {
  categoryName: string;
  count?: number;
  tests: string[];
}

export interface HealthPackage {
  id: string;
  code: string;
  name: string;
  tagline: string;
  targetGender: 'All' | 'Male' | 'Female';
  totalParameters: number;
  originalPrice?: number;
  price: number;
  fastingHours?: string;
  popular?: boolean;
  featuredTag?: string;
  freeHomeCollection?: boolean;
  accentColor: string; // for badge & theme highlight
  keyTestProfiles: string[];
  detailedCategories?: TestCategory[];
  notes?: string;
}

export interface BookingFormData {
  fullName: string;
  phone: string;
  email?: string;
  age: string;
  gender: 'Male' | 'Female' | 'Other';
  collectionType: 'home' | 'center';
  preferredDate: string;
  preferredTimeSlot: string;
  address: string;
  landmark?: string;
  pincode?: string;
  additionalNotes?: string;
  paymentMethod: 'cash_on_collection' | 'upi_on_collection';
}

export interface BookingConfirmation {
  bookingId: string;
  createdAt: string;
  patient: BookingFormData;
  packages: HealthPackage[];
  subtotal: number;
  discount: number;
  totalAmount: number;
  collectionType: 'home' | 'center';
  scheduledDate: string;
  scheduledTime: string;
}
