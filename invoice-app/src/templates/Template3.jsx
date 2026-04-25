import React, { useState, useMemo } from 'react';
import { Plus, Trash2, Printer, Settings2, Check, RefreshCcw, ArrowLeft, Timer, Globe, Zap, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';

// Custom Stylish Bolt Component with a 3D Sketch effect
const StylishBolt = ({ size = 120, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 100 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path 
      d="M55 5L25 55H45L35 95L75 35H50L60 5Z" 
      stroke="currentColor" 
      strokeWidth="4" 
      strokeLinejoin="round"
      className="translate-x-1 translate-y-1 opacity-30"
    />
    <path 
      d="M50 0L20 50H40L30 90L70 30H45L55 0Z" 
      fill="currentColor" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinejoin="round"
    />
    <path d="M48 15L42 30" stroke="white" strokeWidth="2" strokeLinecap="round" className="opacity-40" />
    <path d="M38 60L35 75" stroke="white" strokeWidth="2" strokeLinecap="round" className="opacity-40" />
  </svg>
);

const Template3 = () => {
  const initialState = {
    invoiceNo: "00001",
    date: "17/10/2022",
    taxRate: 5,
    currencySymbol: "₹",
    qrData: "upi://pay?pa=hurrysale@upi&pn=Hurry%20Sale&cu=INR",
    brand: {
      name: "Hurry Sale!",
      est: "EST. 1970",
      logoText: "LOGO",
      subText: "— ORIGINAL —",
      slogan: "Your Slogan Here"
    },
    business: {
      website: "www.hurrysale.buy",
      email: "hello@hurrysale.buy",
      copyright: "© 2024 HURRY SALE RETAIL LTD."
    },
    client: {
      name: "Janice Meyer",
      address: "Address Here, 00",
      city: "City Name",
      zipcode: "Zipcode"
    },
    paymentInfo: {
      upi: "hurrysale@okaxis",
      payee: "Hurry Sale Retail"
    },
    badges: {
      thanksTop: "Happy Shopping",
      thanksBottom: "Thank You For Choosing Us!",
      deliveryTop: "100%",
      deliveryBottom: "Express Ship"
    },
    items: [
      { id: 1, description: "Premium Sneaker Edition", qty: 1, price: 12500 },
      { id: 2, description: "Limited Cotton Hoodie", qty: 2, price: 4500 },
      { id: 3, description: "Accessories Pack", qty: 1, price: 1200 },
    ],
    terms: "Payment via UPI is preferred for faster processing. Scan the QR code to complete your transaction instantly."
  };

  const [invoiceData, setInvoiceData] = useState(initialState);
  const [isEditing, setIsEditing] = useState(false);

  // --- Smart Density Logic (Tuned for strict A4 Height) ---
  const density = useMemo(() => {
    const count = invoiceData.items.length;
    if (count <= 4) return { 
      rowPadding: 'py-3.5', 
      descSize: 'text-[13px]', 
      labelSize: 'text-[11px]', 
      sectionGap: 'mb-6',
      headerPadding: 'py-4',
      summaryGap: 'py-6'
    };
    if (count <= 7) return { 
      rowPadding: 'py-2', 
      descSize: 'text-[11px]', 
      labelSize: 'text-[9px]', 
      sectionGap: 'mb-4',
      headerPadding: 'py-2.5',
      summaryGap: 'py-4'
    };
    return { 
      rowPadding: 'py-1', 
      descSize: 'text-[9px]', 
      labelSize: 'text-[8px]', 
      sectionGap: 'mb-2',
      headerPadding: 'py-1.5',
      summaryGap: 'py-2'
    };
  }, [invoiceData.items.length]);

  const subTotal = useMemo(() => 
    invoiceData.items.reduce((acc, item) => acc + (item.qty * item.price), 0)
  , [invoiceData.items]);

  const taxAmount = subTotal * (invoiceData.taxRate / 100);
  const totalAmount = subTotal + taxAmount;

  const formatCurrency = (num) => {
    return invoiceData.currencySymbol + " " + num.toLocaleString('en-IN');
  };

  const updateNestedField = (category, field, value) => {
    setInvoiceData(prev => ({ ...prev, [category]: { ...prev[category], [field]: value } }));
  };

  const updateItem = (id, field, value) => {
    const newItems = invoiceData.items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    );
    setInvoiceData({ ...invoiceData, items: newItems });
  };

  const addItem = () => {
    setInvoiceData({ 
      ...invoiceData, 
      items: [...invoiceData.items, { id: Date.now(), description: "New Item", qty: 1, price: 0 }] 
    });
  };

  const removeItem = (id) => {
    setInvoiceData({ ...invoiceData, items: invoiceData.items.filter(i => i.id !== id) });
  };

  const EditableText = ({ value, onChange, className, multiline = false }) => {
    if (!isEditing) return <div className={className}>{value}</div>;
    return multiline ? (
      <textarea 
        className={`bg-orange-50/50 border-b border-orange-200 outline-none focus:bg-orange-100 transition-all p-0.5 w-full resize-none ${className}`} 
        value={value} 
        onChange={(e) => onChange(e.target.value)} 
        rows={2} 
      />
    ) : (
      <input 
        className={`bg-orange-50/50 border-b border-orange-200 outline-none focus:bg-orange-100 transition-all p-0.5 w-full ${className}`} 
        value={value} 
        onChange={(e) => onChange(e.target.value)} 
      />
    );
  };

  return (
    <div className="min-h-screen bg-slate-100 py-12 px-4 flex flex-col items-center font-sans text-slate-900">
      
      {/* Controls */}
      <div className="mb-8 flex gap-3 print:hidden sticky top-24 z-50">
        <Link to="/" className="w-11 h-11 bg-white border border-slate-200 rounded-full shadow-md flex items-center justify-center hover:text-indigo-600 transition-all">
          <ArrowLeft size={18} />
        </Link>
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-bold shadow-lg transition-all transform hover:scale-105 active:scale-95 ${isEditing ? 'bg-orange-600 text-white' : 'bg-slate-900 text-white'}`}
        >
          {isEditing ? <><Check size={18} /> Save Edits</> : <><Settings2 size={18} /> Canva Edit Mode</>}
        </button>
        <button onClick={() => window.print()} className="flex items-center gap-2 px-6 py-2.5 bg-white border rounded-full font-bold shadow-md hover:bg-slate-50 transition-all">
          <Printer size={18} /> Print PDF
        </button>
        <button onClick={() => setInvoiceData(initialState)} className="w-11 h-11 bg-white border rounded-full shadow-md flex items-center justify-center hover:text-red-500 transition-all">
          <RefreshCcw size={18} />
        </button>
      </div>

      {/* Invoice Page - EXACT A4 DIMENSIONS */}
      <div id="invoice-content" className="w-[794px] h-[1123px] bg-[#f2e8e1] shadow-2xl relative flex flex-col print:shadow-none print:m-0 overflow-hidden p-10 box-border transition-all duration-500">
        
        {/* % UI at bottom right - Kept as background graphic */}
        <div className="absolute -bottom-24 -right-12 pointer-events-none select-none flex items-center justify-center">
           <span className="text-[400px] font-black text-white/40 drop-shadow-sm leading-none tracking-tighter"> % </span>
        </div>

        {/* Header Row - Now Contains the Adapted Logo */}
        <div className={`flex justify-between items-start ${density.sectionGap} relative z-10 transition-all`}>
          
          {/* ADAPTED LOGO SECTION: Moved from BG to Top Left */}
          <div className="flex items-start gap-4">
             {/* Logo Icon Block */}
             <div className="bg-slate-900 p-3 rounded-2xl shadow-xl relative overflow-hidden flex flex-col items-center text-white min-w-[80px]">
                <StylishBolt size={32} className="text-[#ff6b4a]" />
                <div className="absolute -bottom-2 -left-2 opacity-10">
                   <Zap size={40} strokeWidth={1} />
                 </div>
             </div>
             
             {/* Logo Text Stack */}
             <div className="flex flex-col">
                <div className="text-[10px] font-black text-[#ff6b4a] uppercase tracking-[0.4em] mb-0.5">
                   <EditableText value={invoiceData.brand.est} onChange={(v) => updateNestedField('brand', 'est', v)} />
                </div>
                <div className="text-3xl font-black text-slate-900 tracking-tighter leading-none mb-1">
                   <EditableText value={invoiceData.brand.logoText} onChange={(v) => updateNestedField('brand', 'logoText', v)} />
                </div>
                <div className="text-[8px] font-black text-slate-400 tracking-[0.3em] uppercase opacity-70">
                   <EditableText value={invoiceData.brand.subText} onChange={(v) => updateNestedField('brand', 'subText', v)} />
                </div>
                <div className="mt-1 text-[8px] italic font-bold text-[#ff6b4a] tracking-[0.1em] opacity-80">
                   <EditableText value={invoiceData.brand.slogan} onChange={(v) => updateNestedField('brand', 'slogan', v)} />
                </div>
             </div>
          </div>

          <div className="text-right text-[10px] font-black text-slate-400 space-y-0.5 tracking-widest uppercase pt-2">
            <div className="flex gap-2 justify-end items-center">
              <span>Invoice No</span>
              <EditableText className="text-slate-900 text-xs text-right min-w-[60px]" value={invoiceData.invoiceNo} onChange={(v) => setInvoiceData({...invoiceData, invoiceNo: v})} />
            </div>
            <div className="flex gap-2 justify-end items-center">
              <span>Issued On</span>
              <EditableText className="text-slate-900 text-xs text-right min-w-[60px]" value={invoiceData.date} onChange={(v) => setInvoiceData({...invoiceData, date: v})} />
            </div>
          </div>
        </div>

        {/* Title Area */}
        <div className={`flex justify-between items-start ${density.sectionGap} relative z-10 transition-all`}>
          <div className="relative">
            <h1 className="text-7xl font-black text-slate-900 tracking-tighter relative z-10 leading-none">Invoice</h1>
            <div className="absolute bottom-1 left-0 w-full h-6 bg-[#ff6b4a] -z-0 opacity-90"></div>
          </div>
          
          <div className="flex flex-col gap-2 items-end">
            <div className="bg-white px-4 py-2 rounded-xl shadow-lg border border-slate-100 flex flex-col items-center text-center min-w-[160px]">
               <div className="text-[9px] font-bold text-[#ff6b4a] uppercase tracking-widest leading-none w-full">
                 <EditableText value={invoiceData.badges.thanksTop} onChange={(v) => updateNestedField('badges', 'thanksTop', v)} />
               </div>
               <div className="text-[10px] font-black text-slate-800 tracking-tight w-full">
                 <EditableText value={invoiceData.badges.thanksBottom} onChange={(v) => updateNestedField('badges', 'thanksBottom', v)} />
               </div>
            </div>
            <div className="bg-white px-4 py-3 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 min-w-[160px]">
               <div className="bg-orange-50 p-1.5 rounded-lg text-[#ff6b4a]">
                 <StylishBolt size={18} />
               </div>
               <div className="flex flex-col leading-none">
                 <div className="text-xl font-black text-slate-800 tracking-tighter">
                   <EditableText value={invoiceData.badges.deliveryTop} onChange={(v) => updateNestedField('badges', 'deliveryTop', v)} />
                 </div>
                 <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest">
                   <EditableText value={invoiceData.badges.deliveryBottom} onChange={(v) => updateNestedField('badges', 'deliveryBottom', v)} />
                 </div>
               </div>
            </div>
          </div>
        </div>

        {/* Unified Info Section */}
        <div className={`grid grid-cols-2 gap-6 ${density.sectionGap} relative z-10 transition-all`}>
          <div className="bg-white/40 p-6 rounded-[30px] border border-white/40">
            <h3 className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 mb-3">Billing Details</h3>
            <div className="text-xs text-slate-700 font-bold space-y-1 leading-relaxed">
              <div className="text-base text-slate-900 font-black tracking-tight mb-1">
                <EditableText value={invoiceData.client.name} onChange={(v) => updateNestedField('client', 'name', v)} />
              </div>
              <EditableText value={invoiceData.client.address} onChange={(v) => updateNestedField('client', 'address', v)} />
              <div className="flex gap-1">
                <EditableText value={invoiceData.client.city} onChange={(v) => updateNestedField('client', 'city', v)} />
                <span>,</span>
                <EditableText value={invoiceData.client.zipcode} onChange={(v) => updateNestedField('client', 'zipcode', v)} />
              </div>
            </div>
          </div>

          <div className="bg-slate-900 p-6 rounded-[30px] shadow-2xl relative overflow-hidden flex items-center gap-5">
            <div className="flex-1 z-10">
              <div className="flex items-center gap-2 mb-2">
                 <CreditCard size={12} className="text-[#ff6b4a]" />
                 <h3 className="text-[9px] font-black uppercase tracking-[0.2em] text-white/50">Quick UPI Pay</h3>
              </div>
              <div className="text-white space-y-1">
                <div className="text-[9px] font-bold text-[#ff6b4a] uppercase tracking-widest opacity-80 leading-none">Payee</div>
                <EditableText className="font-black text-xs tracking-tight" value={invoiceData.paymentInfo.payee} onChange={(v) => updateNestedField('paymentInfo', 'payee', v)} />
                <div className="pt-1 text-[9px] font-bold text-[#ff6b4a] uppercase tracking-widest opacity-80 leading-none">UPI ID</div>
                <EditableText className="font-black text-[10px] tracking-tight text-white/90" value={invoiceData.paymentInfo.upi} onChange={(v) => updateNestedField('paymentInfo', 'upi', v)} />
              </div>
            </div>
            
            <div className="shrink-0 z-10 flex flex-col items-center">
               <div className="bg-white p-2 rounded-xl shadow-inner group">
                  <img src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(invoiceData.qrData)}`} alt="UPI QR" className="w-16 h-16" />
               </div>
               {isEditing && (
                 <div className="mt-2 w-full">
                   <div className="text-[6px] text-white/50 uppercase mb-0.5">QR Link</div>
                   <input 
                     className="text-[8px] bg-slate-800 text-white p-1 rounded border border-slate-700 w-20 outline-none" 
                     value={invoiceData.qrData} 
                     onChange={(e) => setInvoiceData({...invoiceData, qrData: e.target.value})} 
                   />
                 </div>
               )}
            </div>
            <div className="absolute -bottom-8 -left-8 opacity-20 rotate-45 pointer-events-none">
               <Zap size={80} className="text-[#ff6b4a]" strokeWidth={1} />
            </div>
          </div>
        </div>

        {/* Smart Adaptive Table */}
        <div className="bg-white rounded-[35px] shadow-sm overflow-hidden mb-6 border border-slate-100 flex-1 flex flex-col relative z-10 transition-all">
          <div className={`bg-slate-900 text-[#ff6b4a] grid grid-cols-6 ${density.headerPadding} px-8 text-[8px] font-black uppercase tracking-[0.25em]`}>
            <div className="col-span-1">ID</div>
            <div className="col-span-2">Description</div>
            <div className="col-span-1 text-center">Price</div>
            <div className="col-span-1 text-center">QTY</div>
            <div className="col-span-1 text-right">Amount</div>
          </div>

          <div className="divide-y divide-slate-50 flex-1">
            {invoiceData.items.map((item, idx) => (
              <div key={item.id} className={`grid grid-cols-6 ${density.rowPadding} px-8 items-center group relative transition-all duration-300`}>
                <div className={`col-span-1 font-black text-slate-300 ${density.labelSize}`}>#{(idx + 1).toString().padStart(2, '0')}</div>
                <div className="col-span-2 pr-4">
                  <EditableText className={`font-black text-slate-800 ${density.descSize}`} value={item.description} onChange={(v) => updateItem(item.id, 'description', v)} />
                </div>
                <div className={`col-span-1 text-center font-bold text-slate-600 ${density.labelSize}`}>
                   {isEditing ? (
                     <input type="number" className="w-16 border-b border-orange-200 outline-none p-0.5 text-center bg-orange-50/30" value={item.price} onChange={(e) => updateItem(item.id, 'price', parseInt(item.target.value)||0)} />
                   ) : formatCurrency(item.price)}
                </div>
                <div className={`col-span-1 text-center font-bold text-slate-600 ${density.labelSize}`}>
                   {isEditing ? (
                     <input type="number" className="w-10 border-b border-orange-200 outline-none p-0.5 text-center bg-orange-50/30" value={item.qty} onChange={(e) => updateItem(item.id, 'qty', parseInt(item.target.value)||0)} />
                   ) : item.qty}
                </div>
                <div className={`col-span-1 text-right font-black text-slate-900 tracking-tight ${density.descSize}`}>
                  {formatCurrency(item.price * item.qty)}
                </div>
                {isEditing && (
                  <button onClick={() => removeItem(item.id)} className="absolute -right-2 opacity-0 group-hover:opacity-100 text-red-400 p-2 transition-all">
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            ))}
            {isEditing && (
              <button onClick={addItem} className="w-full py-4 text-[9px] font-black text-slate-400 hover:text-[#ff6b4a] transition-all uppercase tracking-[0.3em] border-t border-dashed border-slate-200 bg-slate-50/50">
                + Add Line Item
              </button>
            )}
          </div>

          {/* Sum Summary - Adaptive Gap */}
          <div className={`px-10 ${density.summaryGap} bg-slate-50/30 flex justify-end transition-all`}>
            <div className="flex flex-col gap-2 w-52">
              <div className="flex justify-between items-center text-[9px] font-black text-slate-400 uppercase tracking-widest px-2">
                 <span>Subtotal</span>
                 <span className="text-slate-900">{formatCurrency(subTotal)}</span>
              </div>
              <div className="flex justify-between items-center text-[9px] font-black text-slate-400 uppercase tracking-widest px-2 pb-2 border-b border-slate-200">
                 <div className="flex items-center gap-1">
                   <span>GST</span>
                   {isEditing ? (
                     <input type="number" className="w-8 border-b border-orange-200 outline-none bg-transparent" value={invoiceData.taxRate} onChange={(e) => setInvoiceData({...invoiceData, taxRate: parseInt(e.target.value)||0})} />
                   ) : <span>({invoiceData.taxRate}%)</span>}
                 </div>
                 <span className="text-slate-900">{formatCurrency(taxAmount)}</span>
              </div>
              <div className="flex justify-between items-center px-2 pt-1">
                <span className="text-lg font-black text-slate-900 tracking-tighter">Grand Total</span>
                <span className="text-lg font-black text-slate-900 tracking-tighter">{formatCurrency(totalAmount)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto flex justify-between items-end border-t-2 border-slate-900/5 pt-6 relative z-10 transition-all">
          <div className="max-w-[280px]">
            <h4 className="text-[8px] font-black uppercase text-slate-900 mb-2 tracking-[0.3em]">Terms of Service</h4>
            <EditableText multiline className="text-[9px] text-slate-400 leading-relaxed italic font-medium" value={invoiceData.terms} onChange={(v) => setInvoiceData({...invoiceData, terms: v})} />
          </div>
          <div className="flex flex-col items-end gap-1.5 group">
             <div className="flex items-center gap-2 text-slate-900 font-black tracking-widest uppercase text-[9px]">
                <Globe size={12} className="text-[#ff6b4a]" />
                <EditableText value={invoiceData.business.website} onChange={(v) => updateNestedField('business', 'website', v)} />
             </div>
             <div className="text-[8px] font-bold text-slate-300">
               <EditableText value={invoiceData.business.copyright} onChange={(v) => updateNestedField('business', 'copyright', v)} />
             </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        body { font-family: 'Plus Jakarta Sans', sans-serif; -webkit-print-color-adjust: exact; }
        @media print {
          body { background-color: white !important; padding: 0 !important; }
          .min-h-screen { min-height: auto !important; padding: 0 !important; }
          @page { margin: 0; }
          .print\\:hidden { display: none !important; }
          .shadow-2xl, .shadow-sm, .shadow-xl { box-shadow: none !important; }
          .bg-slate-900 { background-color: #0f172a !important; color: white !important; }
          .text-white\\/40 { opacity: 0.1 !important; color: black !important; }
        }
      `}} />
    </div>
  );
};

export default Template3;
