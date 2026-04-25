import React, { useState, useMemo } from 'react';
import { Plus, Trash2, Printer, Settings2, Check, RefreshCcw, Globe, Mail, Phone, MapPin, Image as ImageIcon, CreditCard, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Template1 = () => {
  const initialState = {
    invoiceNo: "INV-2024-001",
    date: "Wednesday, 27 July 2023",
    taxRate: 5,
    currencySymbol: "₹",
    qrData: "upi://pay?pa=fashion@okaxis&pn=Sandira%20Maulia&cu=INR",
    brand: {
      name: "Company Name",
      slogan: '"Elevate Your Style: Unleash Fashion."',
      manager: "Javieala Smiroka",
      role: "MANAGER"
    },
    business: {
      website: "www.yourwebsite.com",
      email: "youremail@email.com",
      phone: "+123-456-7890",
      address: "123 Your Address St., City Name,"
    },
    client: {
      name: "Sandira Maulia",
      phone: "+123-456-7890",
      address: "123 Your Address St., City Name,"
    },
    paymentInfo: {
      accountName: "Hurry Sale Retail Ltd.",
      upiId: "hurrysale@okaxis",
    },
    items: [
      { id: 1, description: "T-Shirt", qty: 1, price: 3500 },
      { id: 2, description: "Jacket", qty: 2, price: 8500 },
      { id: 3, description: "Sweater", qty: 1, price: 4200 },
      { id: 4, description: "Shoes", qty: 1, price: 12000 },
    ],
    terms: [
      "Goods once sold will not be taken back.",
      "Interest @18% will be charged if not paid within 7 days.",
      "All disputes are subject to jurisdiction only."
    ]
  };

  const [invoiceData, setInvoiceData] = useState(initialState);
  const [isEditing, setIsEditing] = useState(false);

  // --- Smart Density Logic (Tuned for strict A4 Height) ---
  const density = useMemo(() => {
    const count = invoiceData.items.length;
    if (count <= 4) return { rowPadding: 'py-3.5', fontSize: 'text-[13px]', tableGap: 'mb-6' };
    if (count <= 7) return { rowPadding: 'py-2', fontSize: 'text-[11px]', tableGap: 'mb-4' };
    return { rowPadding: 'py-1', fontSize: 'text-[9px]', tableGap: 'mb-2' };
  }, [invoiceData.items.length]);

  const subTotal = useMemo(() => 
    invoiceData.items.reduce((acc, item) => acc + (item.qty * item.price), 0)
  , [invoiceData.items]);

  const totalAmount = subTotal + (subTotal * (invoiceData.taxRate / 100));

  const formatCurrency = (num) => {
    return invoiceData.currencySymbol + " " + num.toLocaleString('en-IN', { minimumFractionDigits: 2 });
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

  const updateTerm = (index, value) => {
    const newTerms = [...invoiceData.terms];
    newTerms[index] = value;
    setInvoiceData({ ...invoiceData, terms: newTerms });
  };

  const EditableText = ({ value, onChange, className, multiline = false }) => {
    if (!isEditing) return <div className={className} style={{ whiteSpace: multiline ? 'pre-wrap' : 'normal' }}>{value}</div>;
    return multiline ? (
      <textarea 
        className={`bg-orange-50/50 border-b border-orange-300 outline-none p-0.5 w-full resize-none ${className}`} 
        value={value} 
        onChange={(e) => onChange(e.target.value)} 
        rows={2} 
      />
    ) : (
      <input 
        className={`bg-orange-50/50 border-b border-orange-300 outline-none p-0.5 w-full ${className}`} 
        value={value} 
        onChange={(e) => onChange(e.target.value)} 
      />
    );
  };

  const exportToPDF = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-200 py-12 px-4 flex flex-col items-center font-sans text-slate-900">
      
      {/* Control Bar */}
      <div className="mb-8 flex gap-3 print:hidden sticky top-24 z-50">
        <Link to="/" className="w-11 h-11 bg-white border border-slate-200 rounded-full shadow-md flex items-center justify-center hover:text-indigo-600 transition-all">
          <ArrowLeft size={18} />
        </Link>
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-bold shadow-lg transition-all transform hover:scale-105 active:scale-95 ${isEditing ? 'bg-orange-600 text-white' : 'bg-slate-900 text-white'}`}
        >
          {isEditing ? <><Check size={18} /> Save Design</> : <><Settings2 size={18} /> Canva Mode</>}
        </button>
        <button onClick={exportToPDF} className="flex items-center gap-2 px-6 py-2.5 bg-white border rounded-full font-bold shadow-md hover:bg-slate-50 transition-all">
          <Printer size={18} /> Export PDF
        </button>
        <button onClick={() => setInvoiceData(initialState)} className="w-11 h-11 bg-white border rounded-full shadow-md flex items-center justify-center hover:text-red-500 transition-all">
          <RefreshCcw size={18} />
        </button>
      </div>

      {/* Invoice Paper - EXACT A4 DIMENSIONS (794px x 1123px) */}
      <div id="invoice-content" className="w-[794px] h-[1123px] bg-[#fdfdfd] shadow-2xl relative flex flex-col print:shadow-none print:m-0 overflow-hidden box-border">
        
        {/* PEACH GRADIENT ORBS */}
        <div className="absolute top-[-5%] right-[-5%] w-[450px] h-[450px] bg-gradient-to-br from-[#f87171] via-[#fb923c] to-transparent rounded-full blur-[90px] pointer-events-none opacity-40"></div>
        <div className="absolute bottom-[15%] left-[-15%] w-[550px] h-[550px] bg-gradient-to-tr from-[#fb923c] via-[#f43f5e]/40 to-transparent rounded-full blur-[100px] pointer-events-none opacity-50"></div>
        <div className="absolute bottom-[-10%] right-[15%] w-[300px] h-[300px] bg-gradient-to-tl from-[#fb923c] via-[#f9a885] to-transparent rounded-full blur-[70px] pointer-events-none opacity-40"></div>

        {/* SIDEBAR LABELS (FIXED & MATHEMATICALLY CENTERED, CORRECT ORDER) */}
        <div className="absolute right-6 top-[35%] w-8 h-8 flex items-center justify-center z-30 pointer-events-none">
           <div className="rotate-90 flex items-center gap-4 whitespace-nowrap">
              <div className="bg-slate-900 text-white px-3 py-1.5 rounded-full text-[8px] font-black uppercase shadow-xl border border-white/10">Date :</div>
              <span className="text-[10px] font-bold tracking-[0.2em] text-slate-400">{invoiceData.date}</span>
           </div>
        </div>
        <div className="absolute right-6 top-[65%] w-8 h-8 flex items-center justify-center z-30 pointer-events-none">
           <div className="rotate-90 flex items-center gap-4 whitespace-nowrap">
              <div className="bg-slate-900 text-white px-3 py-1.5 rounded-full text-[8px] font-black uppercase shadow-xl border border-white/10">Invoice No :</div>
              <span className="text-[10px] font-bold tracking-[0.2em] text-slate-400">{invoiceData.invoiceNo}</span>
           </div>
        </div>

        {/* MAIN CONTENT PADDING - Tighter layout to fit everything */}
        <div className="pt-12 pb-6 pl-14 pr-24 relative z-10 flex-1 flex flex-col">
          
          {/* Header Section */}
          <div className="flex justify-between items-start mb-10">
            <div className="pt-2">
              <div className="w-12 h-12 bg-slate-900 rounded-2xl mb-4 flex items-center justify-center text-white shadow-xl relative overflow-hidden group border border-white/10">
                 <ImageIcon size={20} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                 <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/30 to-transparent"></div>
              </div>
              <EditableText className="text-lg font-black text-slate-900 tracking-tight mb-1 uppercase" value={invoiceData.brand.name} onChange={(v) => updateNestedField('brand', 'name', v)} />
              <div className="max-w-[280px]">
                <EditableText className="text-lg font-black text-slate-800 italic leading-tight" value={invoiceData.brand.slogan} onChange={(v) => updateNestedField('brand', 'slogan', v)} />
              </div>
            </div>
            <h1 className="text-[75px] font-black text-slate-900 tracking-tighter leading-none mix-blend-overlay opacity-25 select-none pointer-events-none mt-2 uppercase">Invoice</h1>
          </div>

          {/* Client Details */}
          <div className="mb-8">
            <div className="text-[11px] font-black text-slate-300 uppercase tracking-[0.3em] mb-2 ml-2">Bill To</div>
            <div className="flex items-center gap-3 mb-3">
               <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center shadow-lg shadow-orange-200 shrink-0">
                  <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
               </div>
               <EditableText className="text-4xl font-black text-slate-900 tracking-tighter" value={invoiceData.client.name} onChange={(v) => updateNestedField('client', 'name', v)} />
            </div>
            <div className="w-full h-[2px] bg-slate-100 mb-3 ml-2"></div>
            <div className="flex items-center gap-8 text-[10px] font-bold text-slate-500 ml-2">
               <div className="flex items-center gap-2">
                 <div className="w-5 h-5 rounded-full bg-slate-900 flex items-center justify-center"><Phone size={8} className="text-orange-500" /></div>
                 <EditableText value={invoiceData.client.phone} onChange={(v) => updateNestedField('client', 'phone', v)} />
               </div>
               <div className="flex items-center gap-2">
                 <div className="w-5 h-5 rounded-full bg-slate-900 flex items-center justify-center"><MapPin size={8} className="text-orange-500" /></div>
                 <EditableText value={invoiceData.client.address} onChange={(v) => updateNestedField('client', 'address', v)} />
               </div>
            </div>
          </div>

          {/* Line Items Table */}
          <div className={density.tableGap}>
            <div className="grid grid-cols-6 border-b-2 border-slate-900 pb-2 px-5 text-[9px] font-black uppercase tracking-[0.25em] text-slate-900">
              <div className="col-span-3">Item Description</div>
              <div className="text-center">Unit Price</div>
              <div className="text-center">Quantity</div>
              <div className="text-right">Amount</div>
            </div>

            <div className="flex flex-col">
              {invoiceData.items.map((item, idx) => (
                <div key={item.id} className={`grid grid-cols-6 ${density.rowPadding} px-5 items-center group relative ${idx % 2 === 1 ? 'bg-slate-100/60 rounded-xl' : ''}`}>
                  <div className="col-span-3">
                    <EditableText className={`font-black text-slate-800 ${density.fontSize}`} value={item.description} onChange={(v) => updateItem(item.id, 'description', v)} />
                  </div>
                  <div className={`text-center font-bold text-slate-500 ${density.fontSize}`}>
                    {formatCurrency(item.price)}
                  </div>
                  <div className={`text-center font-bold text-slate-500 ${density.fontSize}`}>
                    {item.qty.toString().padStart(2, '0')}
                  </div>
                  <div className={`text-right font-black text-slate-900 ${density.fontSize}`}>
                    {formatCurrency(item.price * item.qty)}
                  </div>
                  {isEditing && (
                    <button onClick={() => removeItem(item.id)} className="absolute -right-4 opacity-0 group-hover:opacity-100 text-red-500 p-2 transition-all">
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              ))}
              {isEditing && (
                <button onClick={addItem} className="w-full py-2 text-[9px] font-black text-slate-400 hover:text-orange-500 uppercase tracking-widest border-t-2 border-dashed border-slate-100 mt-1">
                  + Add New Entry
                </button>
              )}
            </div>
          </div>

          {/* Totals Summary */}
          <div className="flex flex-col items-end gap-1 mb-8 px-5">
             <div className="flex gap-10 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
                <span>Sub Total</span>
                <span className="text-slate-800">{formatCurrency(subTotal)}</span>
             </div>
             <div className="flex gap-10 items-baseline pt-2">
                <span className="text-[12px] font-black text-slate-400 uppercase tracking-[0.3em]">Total</span>
                <span className="text-5xl font-black text-slate-900 tracking-tighter leading-none">{formatCurrency(totalAmount)}</span>
             </div>
          </div>

          {/* FOOTER AREA - REDESIGNED GRID */}
          <div className="mt-auto grid grid-cols-[1fr_1.3fr] gap-6 items-stretch relative z-20">
            
            {/* Left Column: Contact Center */}
            <div className="bg-[#111827] rounded-r-[40px] p-6 pr-10 text-white relative shadow-2xl -ml-14 h-fit">
               <div className="pl-4">
                 <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 border-b border-white/10 pb-2">Contact Center</h4>
                 <div className="space-y-3">
                    <div className="flex items-center gap-3 text-[9px] font-bold text-white/50">
                       <Mail size={10} className="text-orange-500 shrink-0" />
                       <EditableText value={invoiceData.business.email} onChange={(v) => updateNestedField('business', 'email', v)} />
                    </div>
                    <div className="flex items-center gap-3 text-[9px] font-bold text-white/50">
                       <Globe size={10} className="text-orange-500 shrink-0" />
                       <EditableText value={invoiceData.business.website} onChange={(v) => updateNestedField('business', 'website', v)} />
                    </div>
                    <div className="flex items-center gap-3 text-[9px] font-bold text-white/50">
                       <MapPin size={10} className="text-orange-500 shrink-0" />
                       <EditableText value={invoiceData.business.address} onChange={(v) => updateNestedField('business', 'address', v)} />
                    </div>
                 </div>
               </div>
            </div>

            {/* Right Column: Payment, Terms, Signature */}
            <div className="flex flex-col gap-4 pl-4 h-full justify-between">
               
               {/* 1. Payment Portal */}
               <div className="bg-white p-4 rounded-[20px] shadow-sm border border-slate-100 relative overflow-hidden flex items-center justify-between w-full">
                  <div className="text-left flex-1 pr-2">
                     <div className="flex items-center gap-2 mb-2 text-slate-400">
                        <CreditCard size={10} />
                        <span className="text-[8px] font-black uppercase tracking-widest">Safe Payment</span>
                     </div>
                     <div className="space-y-1">
                        <div>
                           <div className="text-[6px] font-black text-orange-500 uppercase tracking-widest leading-none mb-0.5">Account Name</div>
                           <EditableText className="text-[11px] font-black text-slate-800 leading-tight" value={invoiceData.paymentInfo.accountName} onChange={(v) => updateNestedField('paymentInfo', 'accountName', v)} />
                        </div>
                        <div>
                           <div className="text-[6px] font-black text-orange-500 uppercase tracking-widest leading-none mb-0.5">UPI / VPA ID</div>
                           <EditableText className="text-[11px] font-black text-slate-800 leading-tight" value={invoiceData.paymentInfo.upiId} onChange={(v) => updateNestedField('paymentInfo', 'upiId', v)} />
                        </div>
                     </div>
                  </div>
                  
                  {/* QR SECTION */}
                  <div className="flex flex-col items-center gap-1 shrink-0 pl-2 border-l border-slate-100">
                     <div className="bg-slate-900 p-1.5 rounded-xl shadow-lg">
                        <img src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(invoiceData.qrData)}`} alt="Pay QR" className="w-10 h-10 invert opacity-90" />
                     </div>
                     <span className="text-[6px] font-black text-slate-400 uppercase tracking-widest">Scan QR</span>
                  </div>
               </div>

               {/* 2. Conditions */}
               <div className="w-full pl-1">
                  <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-800 mb-2">Term & Conditions</h4>
                  <div className="space-y-1.5">
                     {invoiceData.terms.map((term, i) => (
                       <div key={i} className="flex gap-2 items-start text-[8.5px] text-slate-500 font-bold leading-relaxed">
                          <div className="mt-0.5 shrink-0"><Check size={8} className="text-orange-500" strokeWidth={3} /></div>
                          <EditableText multiline value={term} onChange={(v) => updateTerm(i, v)} />
                       </div>
                     ))}
                  </div>
               </div>

               {/* 3. Signature */}
               <div className="text-right pt-2 pr-2">
                  <EditableText className="text-2xl font-black text-slate-900 tracking-tighter" value={invoiceData.brand.manager} onChange={(v) => updateNestedField('brand', 'manager', v)} />
                  <div className="inline-block bg-[#ff6b4a] text-white text-[7px] font-black uppercase tracking-widest px-3 py-1 rounded-full mt-1 shadow-sm">
                     <EditableText value={invoiceData.brand.role} onChange={(v) => updateNestedField('brand', 'role', v)} />
                  </div>
               </div>
            </div>
          </div>
          
          {/* THANKS FOR ORDER - IN DOCUMENT FLOW */}
          <div className="mt-6 mb-2 text-center">
            <span className="text-3xl font-black italic text-slate-900/10 tracking-[0.2em] uppercase select-none pointer-events-none block leading-none">
              Thanks For Orders
            </span>
          </div>

        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');
        body { font-family: 'Plus Jakarta Sans', sans-serif; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        @media print {
          body { background-color: white !important; padding: 0 !important; }
          .min-h-screen { min-height: auto !important; padding: 0 !important; }
          @page { margin: 0; }
          .print\\:hidden { display: none !important; }
          .shadow-2xl, .shadow-xl, .shadow-sm { box-shadow: none !important; }
          .bg-slate-900, .bg-\\[\\#111827\\] { background-color: #0f172a !important; color: white !important; }
          .text-slate-900\\/10 { color: #f3f4f6 !important; }
          .border-slate-900\\/5 { border-color: #f3f4f6 !important; }
        }
      `}} />
    </div>
  );
};

export default Template1;
