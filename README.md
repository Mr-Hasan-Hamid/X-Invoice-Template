# 📄 X-Invoice-Template

A collection of premium, highly aesthetic, and fully editable invoice templates built with **React** and **Tailwind CSS**. These templates are designed to provide a "Canva-like" experience, allowing users to personalize their invoices in real-time and export them as high-quality PDFs.

---

## ✨ Features

- 🎨 **Premium Aesthetics**: Modern designs with vibrant color palettes, sleek typography (Plus Jakarta Sans, Inter), and dynamic gradients.
- ✍️ **Live Editing (Canva Mode)**: Toggle edit mode to modify business details, client info, line items, and terms directly on the invoice paper.
- 📊 **Dynamic Calculations**: Automatic real-time calculation of Subtotal, GST/Tax, and Grand Total.
- 📏 **Smart Density Logic**: Intelligently adjusts layout padding and font sizes based on the number of line items to ensure everything fits perfectly on a single A4 page.
- 📱 **QR Code Integration**: Instant generation of UPI/Payment QR codes via integrated API.
- 🖨️ **Print & PDF Optimized**: CSS optimized for A4 portrait printing and high-fidelity PDF export using `html2pdf.js`.
- 🧩 **Component-Based**: Built with modular React functional components and Lucide icons.

---

## 📂 Template Collection

### 1. Modern Peach (Template -1)
- **Vibe**: Creative, Vibrant, Professional.
- **Highlights**: Soft gradient orbs, bold typography, and a clean structured layout.
- **Best For**: Creative agencies, freelancers, and lifestyle brands.

### 2. Executive Professional (Template -2)
- **Vibe**: Sophisticated, Trustworthy, Corporate.
- **Highlights**: Dark header block, gold accents, and a classic professional structure.
- **Best For**: Law firms, consultants, and established B2B businesses.

### 3. Express Digital (Template -3)
- **Vibe**: Tech-forward, Energetic, Minimalist.
- **Highlights**: Bolt-themed branding, high-contrast UI elements, and a modern "3D" feel.
- **Best For**: Tech startups, e-commerce stores, and digital service providers.

---

## 🛠️ Tech Stack

- **Framework**: [React](https://reactjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Export**: [html2pdf.js](https://ekoopmans.github.io/html2pdf.js/)
- **Fonts**: Google Fonts (Plus Jakarta Sans, Inter, Dancing Script)

---

## 🚀 How to Use

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Mr-Hasan-Hamid/X-Invoice-Template.git
   ```

2. **Integrate into your React Project**:
   - Copy the desired template code from the `index.html` (which contains React JSX) into your React component file (e.g., `Invoice.jsx`).
   - Ensure you have `lucide-react` installed: `npm install lucide-react`.
   - Ensure Tailwind CSS is configured in your project.

3. **Personalize**:
   - Run the app and click the **"Canva Mode"** or **"Personalize"** button to start editing.
   - Once satisfied, click **"Export PDF"** or **"Print"**.

---

## 📝 Note on File Extensions
The templates are currently stored as `index.html` files for ease of preview/copy-pasting, but they contain **React (JSX)** code. For production use, rename them to `.jsx` or `.tsx`.

---

Developed with ❤️ by [Hasan Hamid](https://github.com/Mr-Hasan-Hamid)