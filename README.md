# 📄 X-Invoice-Template Studio

A collection of premium, highly aesthetic, and fully editable invoice templates built with **React**, **Vite**, and **Tailwind CSS**. This repository functions as a standalone "Invoice Studio" complete with multi-page routing, allowing users to personalize their invoices in real-time and export them as high-quality PDFs.

---

## ✨ Features

- 🎨 **Premium Aesthetics**: Modern designs featuring glassmorphism, mesh gradients, vibrant color palettes, and sleek typography (Outfit, Plus Jakarta Sans, Inter).
- 🎛️ **Studio Dashboard**: A central hub to browse and select from four beautifully crafted invoice templates.
- ✍️ **Live Editing (Canva Mode)**: Toggle edit mode to modify business details, client info, line items, and terms directly on the invoice paper.
- 📊 **Dynamic Calculations**: Automatic real-time calculation of Subtotals, Taxes/GST, and Grand Totals.
- 📏 **Smart Density Logic**: Intelligently adjusts layout padding and font sizes based on the number of line items to ensure everything fits perfectly on a single A4 page.
- 📱 **QR Code Integration**: Instant generation of UPI/Payment QR codes via integrated APIs.
- 🖨️ **Print & PDF Optimized**: CSS optimized for exact A4 portrait printing and high-fidelity native browser PDF export (`window.print()`), preserving all glass and gradient effects.
- 🧩 **Component-Based**: Built with modular React functional components, `react-router-dom`, and Lucide icons.

---

## 📂 Template Collection

### 1. The Executive (Template 1)
- **Vibe**: Professional, Direct, and Vibrant.
- **Highlights**: Soft peach/orange gradient orbs, bold typography, and a clean structured layout with sidebar document labels.
- **Best For**: Creative agencies, freelancers, and lifestyle brands.

### 2. The Professional (Template 2)
- **Vibe**: Sophisticated, Trustworthy, Corporate.
- **Highlights**: Dark header block, gold accents, classic professional structure, and a dedicated Terms & Signature block.
- **Best For**: Law firms, consultants, and established B2B businesses.

### 3. The Modernist (Template 3)
- **Vibe**: Tech-forward, Energetic, Minimalist.
- **Highlights**: Bolt-themed branding, high-contrast UI elements, minimalist badges, and a modern "3D sketch" feel.
- **Best For**: Tech startups, e-commerce stores, and digital service providers.

### 4. The Studio (Template 4)
- **Vibe**: Futuristic, Premium, Glassmorphic.
- **Highlights**: Next-gen geometric glassmorphism, 'Orange Pista' mesh gradients, translucent card backgrounds, and ultra-modern aesthetic spacing.
- **Best For**: Design studios, creative directors, and avant-garde agencies.

---

## 🛠️ Tech Stack

- **Framework**: [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Routing**: [React Router](https://reactrouter.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Fonts**: Google Fonts (Outfit, Plus Jakarta Sans, Inter, Dancing Script)

---

## 🚀 How to Run Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Mr-Hasan-Hamid/X-Invoice-Template.git
   ```

2. **Navigate to the App directory**:
   ```bash
   cd X-Invoice-Template/invoice-app
   ```

3. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **Start the Development Server**:
   ```bash
   npm run dev
   ```

5. **Personalize & Export**:
   - Open your browser to the local server address (usually `http://localhost:5173`).
   - Select a template from the Studio Dashboard.
   - Click the **"Canva Mode"** button to start editing.
   - Once satisfied, click **"Export PDF"** or **"Print"** (Save as PDF to export).

---

Developed with ❤️ by [Hasan Hamid](https://github.com/Mr-Hasan-Hamid)