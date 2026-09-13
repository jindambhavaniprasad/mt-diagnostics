# Mother Teresa Diagnostic Center - Booking Web App

A modern, responsive web application for **Mother Teresa Diagnostic Center** (partnered with **Thyrocare**).

## Tech Stack
- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Celebration**: Canvas-Confetti

## Key Features
- **Accurate Catalog**: 4 promotional diagnostic packages:
  - **Aarogyam Stree Profile With UTSH** (₹3,999, Female, 107 parameters)
  - **Aarogyam Purush Profile With UTSH** (₹3,999, Male, 104 parameters)
  - **Master Health Package** (₹2,000, 13 key test profiles)
  - **Diabetic Profile** (₹999 / 50% OFF, Free Home Collection)
- **Multi-Selection Cart**: Select 1 or more packages concurrently with animated sticky bottom bar.
- **Full Parameter Explorer**: Modal with live search across 107+ tests and fasting instructions.
- **Interactive Checkout Flow**:
  - Home Visit (Free doorstep collection with address input) vs Center Walk-in
  - Date & Time Slot picker (with morning fasting slots marked)
  - Simulated 1.5s API submission
- **Celebratory Success Screen**: Confetti celebration, animated checkmark, Booking ID, WhatsApp confirmation, and printable digital receipt slip (`window.print()`).

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

### 3. Production Build
```bash
npm run build
```
