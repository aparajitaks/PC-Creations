# PC Creations — MERN Stack Website

**Bangalore's Premier AI-Powered Digital Marketing Agency**
> *Build Brand — Not Just Business*

---

## 🚀 Quick Start

### 1. Start the Backend API Server
```bash
cd backend
npm install   # if not already done
npm run dev   # runs on http://localhost:5001
```

### 2. Start the Frontend (Vite + React)
```bash
cd frontend
npm install   # if not already done
npm run dev   # runs on http://localhost:5173
```

Open **http://localhost:5173** in your browser.

---

## 📁 Project Structure

```
Pc_creations/
├── assets/                          # Brand assets
│   ├── logo.jpg                     # Official PC Creations logo
│   └── banner_theme.jpg             # Brand banner theme
│
├── backend/                         # Node.js + Express Backend
│   ├── config/db.js                 # MongoDB connection (with in-memory fallback)
│   ├── models/
│   │   ├── Lead.js                  # Consultation lead model
│   │   └── Review.js                # Google review model
│   ├── routes/
│   │   ├── leads.js                 # POST/GET /api/leads
│   │   ├── reviews.js               # GET/POST /api/reviews
│   │   └── content.js               # GET /api/content/services & pricing
│   ├── data/initialData.js          # Services, pricing & reviews from PDF
│   └── server.js                    # Express app (port 5001)
│
└── frontend/                        # React + Vite Frontend
    ├── public/assets/               # Served brand assets (logo, banner)
    ├── src/
    │   ├── styles/
    │   │   ├── design-system.css    # Color tokens, typography, utilities
    │   │   └── components.css       # All component styles
    │   ├── components/
    │   │   ├── TopBar.jsx           # Trust bar with Google rating
    │   │   ├── Navbar.jsx           # Sticky glassmorphic navigation
    │   │   ├── Hero.jsx             # Hero with KPI cards + dual CTAs
    │   │   ├── PlatformMarquee.jsx  # Animated studio & platform ticker
    │   │   ├── Services.jsx         # 8 services grid (from PDF Page 1)
    │   │   ├── ComparisonTable.jsx  # PC Creations vs Others
    │   │   ├── Roadmap.jsx          # 30-Day Onboarding Timeline
    │   │   ├── PricingSection.jsx   # 3 plans: Basic / Standard / Customized
    │   │   ├── RoiCalculator.jsx    # Interactive ROI & Lead Calculator
    │   │   ├── GoogleReviews.jsx    # Google 4.9★ verified reviews
    │   │   ├── AboutSection.jsx     # Company profile + Bangalore hubs
    │   │   ├── ContactSection.jsx   # Contact cards + inline form
    │   │   ├── Footer.jsx           # Links, social, copyright
    │   │   └── BookingModal.jsx     # Lead capture form with validation
    │   ├── App.jsx                  # Root app + modal state management
    │   └── main.jsx                 # React DOM entry point
    └── vite.config.js               # Vite + proxy config
```

---

## 🎨 Design System

| Token | Value |
|---|---|
| Background | `#070a12` (Deep Obsidian) |
| Surface | `#0e1424` |
| Primary Gradient | Amber `#f59e0b` → Orange `#ff8c00` → Red `#e11d48` |
| Accent | Cyan `#00d2ff` |
| Font Heading | Outfit (900 weight) |
| Font Body | Plus Jakarta Sans |

---

## 🔌 API Reference

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Server health + contact info |
| GET | `/api/content/services` | 8 services from PDF Page 1 |
| GET | `/api/content/pricing` | 3 plans from PDF Page 2 |
| GET | `/api/reviews` | Google 4.9★ reviews + stats |
| POST | `/api/leads` | Submit consultation request |

---

## 📞 Contact

- **Phone/WhatsApp:** +91 72045 11681
- **Email:** pccreation295@gmail.com
- **Instagram:** [@pc_creations_1](https://instagram.com/pc_creations_1)
- **Google Reviews:** [Verified Profile](https://share.google/nDXFKdY4OcAeUelra)
- **Rajajinagar Branch:** Near Metro Station, Nagapura, Bangalore 560010
- **Indiranagar Branch:** 100 Feet Road, Bangalore 560038
# PC-Creations
