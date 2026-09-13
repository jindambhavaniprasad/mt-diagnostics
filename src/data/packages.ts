import { HealthPackage } from '../types';

export const CLINIC_INFO = {
  name: "Mother Teresa Diagnostic Center",
  shortName: "Mother Teresa Diagnostics",
  address: "H.No. 4-8-102/3, Nallala Bavi, Near Hanuman Temple, Kuntloor Road, R.R. Dist.",
  city: "Hyderabad / R.R. District",
  phonePrimary: "+91 8886826269",
  phoneSecondary: "+91 8886826269",
  phoneRaw: "8886826269",
  partner: "Thyrocare Technologies Ltd (Authorized Service Provider)",
  nablAccredited: true,
  timings: "Monday – Sunday: 6:30 AM – 9:00 PM",
  homeVisitHours: "6:30 AM – 1:00 PM (Daily)",
  facilities: [
    { title: "Haematology", desc: "Complete blood cells, clotting & hemoglobin evaluation" },
    { title: "Cell Count Report", desc: "High-precision automated 5-part differential cell counter" },
    { title: "Clinical Pathology", desc: "Urine, stool, fluid analysis & microscopy" },
    { title: "Biochemistry", desc: "Liver, kidney, lipid profiles & metabolic markers" },
    { title: "Micro Biology", desc: "Culture, sensitivity testing & bacterial screens" },
    { title: "ECG & Hormones", desc: "12-Lead digital ECG, thyroid, fertility & hormonal panels" },
    { title: "All Lab Tests", desc: "Routine & specialized diagnostics with Thyrocare backing" },
    { title: "Home Visit / Collection", desc: "Trained phlebotomist visit at your doorstep" }
  ]
};

export const PACKAGES: HealthPackage[] = [
  {
    id: "pkg-aarogyam-stree",
    code: "AASPWU",
    name: "Aarogyam Stree Profile With UTSH",
    tagline: "Comprehensive 107-parameter preventive health & cancer screening customized for women of all ages.",
    targetGender: "Female",
    totalParameters: 107,
    price: 3999,
    originalPrice: 6500,
    fastingHours: "10-12 hrs fasting essential",
    popular: true,
    featuredTag: "Comprehensive Women Care",
    freeHomeCollection: true,
    accentColor: "from-rose-500 to-pink-600",
    notes: "Requires 10-12 hours of overnight fasting. Only plain water allowed.",
    keyTestProfiles: [
      "Cancer Profile (2 parameters)",
      "Hormone Panel (4 parameters)",
      "Vitamin Profile (3 parameters: D, B12, Folic Acid)",
      "Bone Profile (4 parameters: Calcium, Phosphorus, etc.)",
      "Cardiac Risk Markers (5 parameters)",
      "Thyroid Profile with UTSH (3 parameters)",
      "Diabetes Profile (2 parameters: HbA1c, Fasting Glucose)",
      "Lipid Profile (10 parameters: Total Chol, HDL, LDL, Triglycerides)",
      "Liver Profile (12 parameters: SGOT, SGPT, Bilirubin, Proteins)",
      "Kidney Profile (8 parameters: Creatinine, BUN, Uric Acid)",
      "Iron Deficiency Profile (4 parameters)",
      "Electrolytes Profile (2 parameters)",
      "Complete Blood Count - CBC (24 parameters)",
      "Complete Urine Analysis (24 parameters)"
    ],
    detailedCategories: [
      {
        categoryName: "Cancer Screening Profile",
        count: 2,
        tests: ["CA 125 (Ovarian Marker)", "Carcinoembryonic Antigen (CEA)"]
      },
      {
        categoryName: "Hormone Panel & Female Wellness",
        count: 4,
        tests: ["LH (Luteinizing Hormone)", "FSH (Follicle Stimulating Hormone)", "Prolactin", "Estrogen / Progesterone screen"]
      },
      {
        categoryName: "Thyroid Profile with UTSH",
        count: 3,
        tests: ["Ultra-sensitive TSH (UTSH)", "Total Triiodothyronine (T3)", "Total Thyroxine (T4)"]
      },
      {
        categoryName: "Vitamin & Bone Health Profile",
        count: 7,
        tests: ["Vitamin D 25-Hydroxy", "Vitamin B12", "Folic Acid", "Calcium Total", "Inorganic Phosphorus", "Alkaline Phosphatase", "Serum Magnesium"]
      },
      {
        categoryName: "Cardiac Risk Profile",
        count: 5,
        tests: ["hs-CRP (High-sensitivity C-Reactive Protein)", "Apolipoprotein A1 (Apo-A1)", "Apolipoprotein B (Apo-B)", "Apo B / Apo A1 Ratio", "Homocysteine"]
      },
      {
        categoryName: "Liver Function Test (LFT)",
        count: 12,
        tests: ["Bilirubin Total", "Bilirubin Direct", "Bilirubin Indirect", "SGOT / AST", "SGPT / ALT", "Alkaline Phosphatase", "Serum Albumin", "Serum Globulin", "A/G Ratio", "Total Protein", "Gamma GT (GGTP)", "LDH"]
      },
      {
        categoryName: "Kidney Function Profile (KFT/RFT)",
        count: 8,
        tests: ["Blood Urea Nitrogen (BUN)", "Serum Creatinine", "BUN / Creatinine Ratio", "Uric Acid", "Glomerular Filtration Rate (eGFR)", "Blood Urea", "Serum Sodium", "Serum Potassium"]
      },
      {
        categoryName: "Lipid Profile (Heart Care)",
        count: 10,
        tests: ["Total Cholesterol", "HDL (Good) Cholesterol", "LDL (Bad) Cholesterol", "VLDL Cholesterol", "Triglycerides", "Non-HDL Cholesterol", "TC / HDL Ratio", "LDL / HDL Ratio", "Atherogenic Index", "Triglycerides / HDL Ratio"]
      },
      {
        categoryName: "Diabetes & Iron Profile",
        count: 6,
        tests: ["HbA1c (Glycated Hemoglobin)", "Average Estimated Blood Glucose", "Total Iron Binding Capacity (TIBC)", "Serum Iron", "Transferrin Saturation %", "Ferritin"]
      },
      {
        categoryName: "Complete Blood Picture (CBC & Hemogram)",
        count: 24,
        tests: ["Hemoglobin", "Total RBC Count", "Total Leukocyte Count (WBC)", "Platelet Count", "PCV / Hematocrit", "MCV", "MCH", "MCHC", "RDW-CV", "RDW-SD", "Neutrophils %", "Lymphocytes %", "Monocytes %", "Eosinophils %", "Basophils %", "Absolute Neutrophil Count", "Absolute Lymphocyte Count", "Absolute Monocyte Count", "Absolute Eosinophil Count", "Absolute Basophil Count", "MPV", "PCT", "PDW", "Mentzer Index"]
      },
      {
        categoryName: "Complete Urine Examination (CUE)",
        count: 24,
        tests: ["Color", "Appearance", "Specific Gravity", "pH", "Urine Protein / Albumin", "Glucose / Sugar", "Ketone Bodies", "Bilirubin", "Urobilinogen", "Blood", "Nitrite", "Pus Cells / Leucocytes", "Epithelial Cells", "RBCs", "Crystals", "Casts", "Bacteria", "Yeast Cells", "Mucus Threads", "Amorphous Deposits", "Trichomonas", "Bile Salts", "Bile Pigments", "Leukocyte Esterase"]
      }
    ]
  },
  {
    id: "pkg-aarogyam-purush",
    code: "AAPPUWU",
    name: "Aarogyam Purush Profile With UTSH",
    tagline: "Extensive 104-parameter health checkup with Testosterone and vital organ profiles designed for men.",
    targetGender: "Male",
    totalParameters: 104,
    price: 3999,
    originalPrice: 6500,
    fastingHours: "10-12 hrs fasting essential",
    popular: true,
    featuredTag: "Complete Men Care",
    freeHomeCollection: true,
    accentColor: "from-blue-600 to-indigo-700",
    notes: "Requires 10-12 hours of overnight fasting. Only plain water allowed.",
    keyTestProfiles: [
      "Cancer Profile (2 parameters)",
      "Testosterone (Total Male Vitality)",
      "Vitamin Profile (3 parameters: D, B12, Folic Acid)",
      "Bone Profile (4 parameters: Calcium, Phosphorus, etc.)",
      "Cardiac Risk Markers (5 parameters)",
      "Thyroid Profile with UTSH (3 parameters)",
      "Diabetes Profile (2 parameters: HbA1c, Fasting Glucose)",
      "Lipid Profile (10 parameters: Total Chol, HDL, LDL, Triglycerides)",
      "Liver Profile (12 parameters: SGOT, SGPT, Bilirubin, Proteins)",
      "Kidney Profile (8 parameters: Creatinine, BUN, Uric Acid)",
      "Iron Deficiency Profile (4 parameters)",
      "Electrolytes Profile (2 parameters)",
      "Complete Blood Count - CBC (24 parameters)",
      "Complete Urine Analysis (24 parameters)"
    ],
    detailedCategories: [
      {
        categoryName: "Cancer Screening & Men's Vitality",
        count: 3,
        tests: ["PSA (Prostate Specific Antigen)", "Carcinoembryonic Antigen (CEA)", "Total Testosterone"]
      },
      {
        categoryName: "Thyroid Profile with UTSH",
        count: 3,
        tests: ["Ultra-sensitive TSH (UTSH)", "Total Triiodothyronine (T3)", "Total Thyroxine (T4)"]
      },
      {
        categoryName: "Vitamin & Bone Health Profile",
        count: 7,
        tests: ["Vitamin D 25-Hydroxy", "Vitamin B12", "Folic Acid", "Calcium Total", "Inorganic Phosphorus", "Alkaline Phosphatase", "Serum Magnesium"]
      },
      {
        categoryName: "Cardiac Risk Profile",
        count: 5,
        tests: ["hs-CRP (High-sensitivity C-Reactive Protein)", "Apolipoprotein A1 (Apo-A1)", "Apolipoprotein B (Apo-B)", "Apo B / Apo A1 Ratio", "Homocysteine"]
      },
      {
        categoryName: "Liver Function Test (LFT)",
        count: 12,
        tests: ["Bilirubin Total", "Bilirubin Direct", "Bilirubin Indirect", "SGOT / AST", "SGPT / ALT", "Alkaline Phosphatase", "Serum Albumin", "Serum Globulin", "A/G Ratio", "Total Protein", "Gamma GT (GGTP)", "LDH"]
      },
      {
        categoryName: "Kidney Function Profile (KFT/RFT)",
        count: 8,
        tests: ["Blood Urea Nitrogen (BUN)", "Serum Creatinine", "BUN / Creatinine Ratio", "Uric Acid", "Glomerular Filtration Rate (eGFR)", "Blood Urea", "Serum Sodium", "Serum Potassium"]
      },
      {
        categoryName: "Lipid Profile (Heart Care)",
        count: 10,
        tests: ["Total Cholesterol", "HDL (Good) Cholesterol", "LDL (Bad) Cholesterol", "VLDL Cholesterol", "Triglycerides", "Non-HDL Cholesterol", "TC / HDL Ratio", "LDL / HDL Ratio", "Atherogenic Index", "Triglycerides / HDL Ratio"]
      },
      {
        categoryName: "Diabetes & Iron Profile",
        count: 6,
        tests: ["HbA1c (Glycated Hemoglobin)", "Average Estimated Blood Glucose", "Total Iron Binding Capacity (TIBC)", "Serum Iron", "Transferrin Saturation %", "Ferritin"]
      },
      {
        categoryName: "Complete Blood Picture (CBC & Hemogram)",
        count: 24,
        tests: ["Hemoglobin", "Total RBC Count", "Total Leukocyte Count (WBC)", "Platelet Count", "PCV / Hematocrit", "MCV", "MCH", "MCHC", "RDW-CV", "RDW-SD", "Neutrophils %", "Lymphocytes %", "Monocytes %", "Eosinophils %", "Basophils %", "Absolute Neutrophil Count", "Absolute Lymphocyte Count", "Absolute Monocyte Count", "Absolute Eosinophil Count", "Absolute Basophil Count", "MPV", "PCT", "PDW", "Mentzer Index"]
      },
      {
        categoryName: "Complete Urine Examination (CUE)",
        count: 24,
        tests: ["Color", "Appearance", "Specific Gravity", "pH", "Urine Protein / Albumin", "Glucose / Sugar", "Ketone Bodies", "Bilirubin", "Urobilinogen", "Blood", "Nitrite", "Pus Cells / Leucocytes", "Epithelial Cells", "RBCs", "Crystals", "Casts", "Bacteria", "Yeast Cells", "Mucus Threads", "Amorphous Deposits", "Trichomonas", "Bile Salts", "Bile Pigments", "Leukocyte Esterase"]
      }
    ]
  },
  {
    id: "pkg-master-health",
    code: "MHP-01",
    name: "Master Health Package",
    tagline: "Essential full body screening covering all major vital systems: Heart, Liver, Kidney, Vitamins & Diabetes.",
    targetGender: "All",
    totalParameters: 68,
    price: 2000,
    originalPrice: 3500,
    fastingHours: "10-12 hrs fasting advised",
    popular: false,
    featuredTag: "Best Value All-Rounder",
    freeHomeCollection: true,
    accentColor: "from-emerald-600 to-teal-700",
    notes: "Recommended for annual health screening for adults of all ages.",
    keyTestProfiles: [
      "Thyroid Profile I (T3, T4, TSH)",
      "Complete Blood Picture (CBP / Hemogram)",
      "Complete Urine Examination (CUE)",
      "Liver Function Profile (Bilirubin, SGOT, SGPT, Alkaline Phosphatase, Protein)",
      "Lipid Profile (Total Cholesterol, Triglycerides, HDL, LDL, VLDL)",
      "Iron Profile (Total Iron, Ferritin, TIBC)",
      "Vitamin D (25-Hydroxy)",
      "Vitamin B12 (Cyanocobalamin)",
      "C Reactive Protein (CRP - Infection & Inflammation)",
      "Kidney Function Profile with EGFR",
      "Erythrocyte Sedimentation Rate (ESR)",
      "HbA1c (3-Month Sugar Average)",
      "Glucose Fasting (FBS)"
    ],
    detailedCategories: [
      {
        categoryName: "Endocrine & Metabolic Markers",
        count: 4,
        tests: ["Thyroid Profile I (T3, T4, TSH)", "HbA1c (Glycated Hemoglobin)", "Average Blood Sugar (eAG)", "Glucose Fasting (FBS)"]
      },
      {
        categoryName: "Vitamins & Inflammatory Markers",
        count: 4,
        tests: ["Vitamin D (25-OH)", "Vitamin B12", "C Reactive Protein (CRP)", "Erythrocyte Sedimentation Rate (ESR)"]
      },
      {
        categoryName: "Vital Organ Profiles",
        count: 20,
        tests: ["Liver Function Profile (Bilirubin, SGOT, SGPT, Alk Phos, Albumin, Globulin)", "Kidney Function Profile with EGFR & Creatinine", "Lipid Profile (Cholesterol, HDL, LDL, Triglycerides)", "Iron Profile (Iron, Ferritin, TIBC)"]
      },
      {
        categoryName: "Routine Blood & Urine Analysis",
        count: 40,
        tests: ["Complete Blood Picture (CBP) 20 parameters", "Complete Urine Examination (CUE) 20 parameters"]
      }
    ]
  },
  {
    id: "pkg-diabetic-profile",
    code: "DIA-OFFER",
    name: "Diabetic Profile",
    tagline: "Dedicated diabetic evaluation with HbA1c, renal check, lipid status and glucose tests with FREE home sample collection.",
    targetGender: "All",
    totalParameters: 16,
    price: 999,
    originalPrice: 2000,
    fastingHours: "Fasting & Post-Prandial samples needed",
    popular: true,
    featuredTag: "SPECIAL 50% OFF OFFER",
    freeHomeCollection: true,
    accentColor: "from-amber-500 to-red-600",
    notes: "Special flyer promotional rate. Fasting blood sample required, followed by post-breakfast sample after 2 hours.",
    keyTestProfiles: [
      "HbA1c (Glycosylated Hemoglobin - 3 Month Blood Sugar)",
      "Fasting Blood Sugar (FBS)",
      "Post Prandial Blood Sugar (PPBS)",
      "Serum Creatinine (Kidney Protection)",
      "Lipid Profile Basic (Cardiovascular Risk Evaluation)",
      "Urine Routine Examination (Microalbuminuria & Ketones)"
    ],
    detailedCategories: [
      {
        categoryName: "Diabetic Diagnostics",
        count: 4,
        tests: ["HbA1c (Glycosylated Hemoglobin)", "Estimated Average Glucose (eAG)", "Fasting Blood Sugar (FBS)", "Post Prandial Blood Sugar (PPBS - 2 hrs after meal)"]
      },
      {
        categoryName: "Complication Screening",
        count: 6,
        tests: ["Serum Creatinine (Kidney Function)", "Lipid Profile Basic: Total Cholesterol", "HDL Cholesterol", "Triglycerides", "LDL Cholesterol", "VLDL Cholesterol"]
      },
      {
        categoryName: "Urine Routine Examination",
        count: 6,
        tests: ["Urine Glucose", "Urine Protein / Albumin", "Urine Ketone Bodies", "Pus Cells", "RBCs", "Specific Gravity"]
      }
    ]
  }
];

export const TIME_SLOTS = [
  { time: "06:30 AM - 07:30 AM", idealForFasting: true, label: "Early Morning (Best for Fasting)" },
  { time: "07:30 AM - 08:30 AM", idealForFasting: true, label: "Morning Prime (Best for Fasting)" },
  { time: "08:30 AM - 09:30 AM", idealForFasting: true, label: "Morning" },
  { time: "09:30 AM - 10:30 AM", idealForFasting: true, label: "Mid Morning" },
  { time: "10:30 AM - 11:30 AM", idealForFasting: false, label: "Late Morning" },
  { time: "11:30 AM - 01:00 PM", idealForFasting: false, label: "Afternoon (Non-fasting tests)" },
  { time: "04:30 PM - 06:30 PM", idealForFasting: false, label: "Evening (Center Visit Only)" }
];
