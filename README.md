# 🛒 Northstar Goods — Online Shopping Cart

[![Deploy to GitHub Pages](https://github.com/SrijaRoy04/Online-Shopping-Cart-/actions/workflows/deploy.yml/badge.svg)](https://github.com/SrijaRoy04/Online-Shopping-Cart-/actions/workflows/deploy.yml)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-2ea44f?style=flat&logo=github)](https://SrijaRoy04.github.io/Online-Shopping-Cart-/)
[![React](https://img.shields.io/badge/React-19-61dafb?style=flat&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6-646cff?style=flat&logo=vite)](https://vitejs.dev/)

A modern, responsive e-commerce shopping cart and checkout web application built with **React 19**, **Vite**, **Context API**, and **useReducer**. 

---

## 🌐 Live Demo

Experience the live application hosted on GitHub Pages:  
👉 **[https://SrijaRoy04.github.io/Online-Shopping-Cart-/](https://SrijaRoy04.github.io/Online-Shopping-Cart-/)**

---

## ✨ Features

### 🛍️ 1. Interactive Product Catalog
- **Category Filtering**: Browse through curated collections: *All, Computers, Audio, Mobile, and Accessories*.
- **Live Search**: Instant keyword search matching product titles and descriptions.
- **Dynamic Sorting**: Sort products by *Featured / Default*, *Price: Low to High*, and *Price: High to Low*.
- **Curated Badges**: Highlighting Staff Picks, Bestsellers, Desk Essentials, and Everyday Favourites.

### 🧺 2. Cart Management (`useReducer` & Context API)
- **Centralized State**: Global shopping cart state managed via React `useReducer` and `CartContext`.
- **Quantity Controls**: Increment, decrement, or remove items with automatic inventory limit enforcement (max 99 units).
- **Persistent Storage**: Cart items and promotional codes persist automatically to browser `localStorage`.
- **Toast Notifications**: Responsive toast messages for additions, removals, and coupon validation.

### 🎟️ 3. Coupon & Discount Engine
- **Promo Code Discounts**:
  - `SAVE10` → 10% discount
  - `SAVE20` → 20% discount
  - `SAVE30` → 30% discount
- **Automated Tax Calculation**: 18% GST calculation formatted accurately to Indian Rupee (INR ₹) currency standards.

### 💳 4. Complete Multi-Step Checkout Workflow
1. **Bag Review**: Verify selected products, change quantities, apply discount coupons, and view subtotal / GST calculations.
2. **Delivery Address**: Form with full input validation (Full Name, Street Address, City, State, 6-digit PIN code, Phone number).
3. **Order Confirmation & Review**: Summary card displaying shipping address, itemized breakdown, and totals before payment.
4. **Payment Simulation**:
   - **Cash on Delivery (COD)**: Instant confirmation without upfront transaction.
   - **UPI**: Validation of demo UPI handles (e.g. `user@upi`).
   - **Credit / Debit Card**: Demo form with 16-digit card number, MM/YY expiry check, and CVV formatting.
   - **Net Banking**: Bank selection selector (SBI, HDFC, ICICI, Axis Bank, PNB).
5. **Order Success**: Order summary receipt with unique Order ID, estimated delivery timetable, and print/reorder options.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, JSX
- **State Architecture**: React Context API + `useReducer`
- **Build Tool**: Vite 6
- **Icons**: Lucide React
- **Styles**: Modern Vanilla CSS (CSS Variables, Flexbox, Responsive Grid)
- **Deployment**: GitHub Pages via GitHub Actions CI/CD & `gh-pages`

---

## 🚀 Getting Started Locally

### 1. Clone the repository
```bash
git clone https://github.com/SrijaRoy04/Online-Shopping-Cart-.git
cd Online-Shopping-Cart-
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### 4. Build for production
```bash
npm run build
```

---

## 🚢 GitHub Pages Deployment

The repository is configured with automated GitHub Actions CI/CD for GitHub Pages:
- Workflow file: `.github/workflows/deploy.yml`
- Triggers automatically whenever commits are pushed to the `main` branch.
- Configured Vite base path: `base: '/Online-Shopping-Cart-/'`

### Manual Deployment via `gh-pages`
```bash
npm run deploy
```

---

## 📂 Project Structure

```
Online-Shopping-Cart-/
├── .github/
│   └── workflows/
│       └── deploy.yml         # GitHub Actions automated Pages deployment
├── dist/                      # Production build output
├── src/
│   ├── components/
│   │   ├── AddressForm.jsx    # Delivery address collection & validation
│   │   ├── Cart.jsx           # Shopping cart drawer & item list
│   │   ├── CartItem.jsx       # Individual line item with stepper controls
│   │   ├── CheckoutStepper.jsx# Multi-step progress indicator
│   │   ├── ConfirmDetails.jsx # Pre-payment address & items verification
│   │   ├── CouponForm.jsx     # Promo code entry & discount application
│   │   ├── Navbar.jsx         # Sticky navigation with live cart badge
│   │   ├── OrderSuccess.jsx   # Order receipt confirmation screen
│   │   ├── OrderSummary.jsx   # Itemized tax & total calculation breakdown
│   │   ├── PaymentOptions.jsx # Payment gateway simulator (COD, UPI, Card, Net Banking)
│   │   ├── ProductCard.jsx    # Individual product card UI
│   │   └── ProductList.jsx    # Catalog grid with filtering and search
│   ├── context/
│   │   └── CartContext.jsx    # React Context provider exposing state & dispatch
│   ├── data/
│   │   └── products.js        # Catalog inventory dataset
│   ├── reducer/
│   │   └── cartReducer.js     # Reducer handling cart actions & state changes
│   ├── utils/
│   │   └── calculations.js    # Financial rounding, discounts, and currency formatting
│   ├── App.jsx                # Root orchestrator managing step progression
│   ├── index.css              # Custom overrides & theme adjustments
│   └── main.jsx               # Entrypoint mounting React root
├── index.html                 # HTML shell
├── package.json               # Dependencies and build/deploy scripts
├── style.css                  # Comprehensive design system & styles
└── vite.config.js             # Vite configuration with GitHub Pages base URL
```

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
