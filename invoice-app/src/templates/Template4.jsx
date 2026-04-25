import React, { useState, useMemo } from 'react';
import { Plus, Trash2, Printer, Settings2, Check, RefreshCcw, Globe, Mail, Phone, MapPin, Zap, Layers, ArrowLeft, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';

const Template4 = () => {
  const initialState = {
    invoiceNo: "INV-9901",
    date: "25 Oct, 2024",
    dueDate: "05 Nov, 2024",
    taxRate: 18,
    currencySymbol: "₹",
    qrData: "upi://pay?pa=studio@stellar&pn=Stellar%20Studio&cu=INR",
    business: {
      name: "Stellar Design Studio",
      email: "accounts@stellar.design",
      phone: "+91 98765 43210",
      address: "14th Floor, Tech Hub\nHitech City, Hyderabad 500081",
      website: "www.stellar.design"
    },
    client: {
      name: "Aura Creative Agency",
      contact: "Anjali Sharma, Creative Director",
      email: "billing@auracreative.in",
      address: "Suite 402, Green Valley\nIndiranagar, Bangalore 560038"
    },
    paymentDetails: "HDFC Bank • Current A/C: 50200012345678\nIFSC: HDFC0001234\nBranch: Hitech City, Hyderabad",
    items: [
      { id: 1, description: "Brand Identity Design", category: "Branding", qty: 1, price: 45000 },
      { id: 2, description: "UI/UX App Prototyping", category: "Product Design", qty: 1, price: 85000 },
      { id: 3, description: "Social Media Campaign (3 months)", category: "Marketing", qty: 3, price: 15000 },
      { id: 4, description: "CMS Website Development", category: "Development", qty: 1, price: 120000 }
    ],
    terms: "Payment is expected within 10 days of the invoice date. 2% interest per month will be charged on late payments."
  };

  const [invoiceData, setInvoiceData] = useState(initialState);
  const [isEditing, setIsEditing] = useState(false);

  // --- Smart Density Logic (Tuned for A4) ---
  const density = useMemo(() => {
    const count = invoiceData.items.length;
    if (count <= 3) return { 
      rowPad: 'py-6', 
      fSize: 'text-sm', 
      dSize: 'text-xs',
      gap: 'mb-10',
      innerGap: 'space-y-6',
      cardP: 'p-12'
    };
    if (count <= 6) return { 
      rowPad: 'py-3.5', 
      fSize: 'text-xs', 
      dSize: 'text-[10px]',
      gap: 'mb-6',
      innerGap: 'space-y-4',
      cardP: 'p-8'
    };
    return { 
      rowPad: 'py-1.5', 
      fSize: 'text-[10px]', 
      dSize: 'text-[9px]',
      gap: 'mb-3',
      innerGap: 'space-y-2',
      cardP: 'p-6'
    };
  }, [invoiceData.items.length]);

  // Calculations
  const subTotal = useMemo(() => 
    invoiceData.items.reduce((acc, item) => acc + (item.qty * item.price), 0)
  , [invoiceData.items]);

  const taxAmount = subTotal * (invoiceData.taxRate / 100);
  const totalAmount = subTotal + taxAmount;

  // Handlers
  const updateNestedField = (category, field, value) => {
    setInvoiceData(prev => ({
      ...prev,
      [category]: { ...prev[category], [field]: value }
    }));
  };

  const updateItem = (id, field, value) => {
    const newItems = invoiceData.items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    );
    setInvoiceData({ ...invoiceData, items: newItems });
  };

  const addItem = () => {
    const newId = invoiceData.items.length ? Math.max(...invoiceData.items.map(i => i.id)) + 1 : 1;
    setInvoiceData({
      ...invoiceData,
      items: [...invoiceData.items, { id: newId, description: "New Design Service", category: "Design", qty: 1, price: 0 }]
    });
  };

  const removeItem = (id) => {
    setInvoiceData({
      ...invoiceData,
      items: invoiceData.items.filter(item => item.id !== id)
    });
  };

  const formatCurrency = (amount) => {
    return `${invoiceData.currencySymbol}${amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const exportToPDF = () => {
    window.print();
  };

  // Reusable Editable Component
  const EditableText = ({ value, onChange, className = "", multiline = false }) => {
    if (!isEditing) return <div className={className} style={{ whiteSpace: multiline ? 'pre-wrap' : 'normal' }}>{value}</div>;
    return multiline ? (
      <textarea 
        className={`bg-white/30 border border-slate-200 outline-none p-1 w-full rounded focus:ring-2 focus:ring-indigo-400 ${className}`} 
        value={value} 
        onChange={(e) => onChange(e.target.value)} 
        rows={2} 
      />
    ) : (
      <input 
        className={`bg-white/30 border border-slate-200 outline-none p-1 w-full rounded focus:ring-2 focus:ring-indigo-400 ${className}`} 
        value={value} 
        onChange={(e) => onChange(e.target.value)} 
      />
    );
  };

  return (
    <div className="min-h-screen bg-slate-100 py-12 px-4 flex flex-col items-center font-sans text-slate-900">
      
      {/* Action Panel */}
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
      <div id="invoice-content" className="w-[794px] h-[1123px] bg-slate-50 relative flex flex-col print:m-0 overflow-hidden box-border shadow-2xl print:shadow-none font-['Outfit']">
        
        {/* ORANGE & PISTA MESH GRADIENTS */}
        <div className="absolute top-[-200px] left-[-100px] w-[700px] h-[700px] bg-orange-400/30 blur-[140px] rounded-full pointer-events-none"></div>
        <div className="absolute top-[15%] right-[-150px] w-[600px] h-[600px] bg-[#93c47d]/40 blur-[130px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-[-150px] left-[5%] w-[600px] h-[600px] bg-orange-300/20 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-[#B2D3A1]/30 blur-[100px] rounded-full pointer-events-none"></div>
        
        {/* Floating Geometric Shapes */}
        <div className="absolute top-[12%] left-[8%] w-16 h-16 border-2 border-orange-200/40 rounded-full animate-pulse pointer-events-none"></div>
        <div className="absolute bottom-[20%] right-[12%] w-28 h-28 border-2 border-[#93c47d]/30 rotate-45 pointer-events-none"></div>
        <div className="absolute top-[40%] right-[5%] w-4 h-4 bg-orange-400/20 rounded-full blur-sm"></div>

        {/* SIDEBAR LABELS REMOVED */}

        {/* The Glass Card Wrapper */}
        <div className={`flex-1 m-8 bg-white/75 backdrop-blur-[32px] rounded-[48px] border border-white/60 shadow-xl flex flex-col relative z-10 transition-all duration-500 ${density.cardP}`}>
           
           {/* Header Area */}
           <div className={`flex justify-between items-start ${density.gap}`}>
              <div className="space-y-5">
                 <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-[#93c47d] rounded-2xl shadow-xl flex items-center justify-center text-white text-3xl font-black ring-4 ring-white/50">S</div>
                 <div>
                    <EditableText className="text-2xl font-black text-slate-900 tracking-tighter" value={invoiceData.business.name} onChange={(v) => updateNestedField('business', 'name', v)} />
                    <div className="text-[10px] font-black text-orange-600 tracking-[0.2em] uppercase mt-1 flex items-center gap-2">
                       <Zap size={10} className="fill-orange-600" /> Design Authority
                    </div>
                 </div>
              </div>

              <div className="text-right flex flex-col items-end">
                 <h1 className="text-7xl font-black tracking-tighter text-slate-900/10 uppercase select-none pointer-events-none leading-none -mr-4 mb-4">Invoice</h1>
                 <div className="bg-slate-900 px-6 py-4 rounded-[24px] shadow-2xl border border-white/10 flex flex-col items-end gap-3 group hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center gap-4">
                       <span className="text-[10px] font-black text-orange-400 uppercase tracking-[0.2em]">Invoice No:</span>
                       <EditableText className="text-sm font-black text-white text-right w-24" value={invoiceData.invoiceNo} onChange={(v) => setInvoiceData({...invoiceData, invoiceNo: v})} />
                    </div>
                    <div className="w-full h-[1px] bg-white/10"></div>
                    <div className="flex items-center gap-4">
                       <span className="text-[10px] font-black text-orange-400 uppercase tracking-[0.2em]">Date:</span>
                       <EditableText className="text-sm font-black text-white text-right w-24" value={invoiceData.date} onChange={(v) => setInvoiceData({...invoiceData, date: v})} />
                    </div>
                 </div>
              </div>
           </div>

           {/* Info Cards (From & To) */}
           <div className={`grid grid-cols-2 gap-8 ${density.gap}`}>
              <div className="bg-white/40 backdrop-blur-md border border-white/60 p-7 rounded-[32px] shadow-sm space-y-4 group hover:bg-white/50 transition-all">
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-2">
                   <div className="w-4 h-[1.5px] bg-slate-200"></div> Issued By
                </div>
                <div className="space-y-1">
                   <EditableText className="text-xs font-bold text-slate-800 leading-relaxed" multiline value={invoiceData.business.address} onChange={(v) => updateNestedField('business', 'address', v)} />
                   <div className="pt-3 space-y-2">
                      <div className="flex items-center gap-3 text-[10px] font-bold text-slate-500 transition-colors hover:text-slate-900">
                         <div className="w-6 h-6 rounded-full bg-slate-900 flex items-center justify-center shrink-0 shadow-lg"><Mail size={10} className="text-orange-400"/></div>
                         <EditableText value={invoiceData.business.email} onChange={(v) => updateNestedField('business', 'email', v)} />
                      </div>
                      <div className="flex items-center gap-3 text-[10px] font-bold text-slate-500 transition-colors hover:text-slate-900">
                         <div className="w-6 h-6 rounded-full bg-slate-900 flex items-center justify-center shrink-0 shadow-lg"><Phone size={10} className="text-orange-400"/></div>
                         <EditableText value={invoiceData.business.phone} onChange={(v) => updateNestedField('business', 'phone', v)} />
                      </div>
                   </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-600/5 to-[#93c47d]/10 border border-orange-600/10 p-7 rounded-[32px] shadow-sm space-y-4 relative overflow-hidden group hover:from-orange-600/10 transition-all">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/5 blur-3xl rounded-full"></div>
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-600 flex items-center gap-2">
                   <div className="w-4 h-[1.5px] bg-orange-200"></div> Billed To
                </div>
                <div className="space-y-1 relative z-10">
                   <EditableText className="text-2xl font-black text-slate-900 tracking-tighter" value={invoiceData.client.name} onChange={(v) => updateNestedField('client', 'name', v)} />
                   <div className="text-[11px] font-black text-orange-500 uppercase tracking-widest mb-3 flex items-center gap-2 italic">
                      <EditableText value={invoiceData.client.contact} onChange={(v) => updateNestedField('client', 'contact', v)} />
                   </div>
                   <EditableText className="text-[11px] font-medium text-slate-500 leading-relaxed" multiline value={invoiceData.client.address} onChange={(v) => updateNestedField('client', 'address', v)} />
                </div>
              </div>
           </div>

           {/* Modern Minimalist Table */}
           <div className={`flex-1 ${density.innerGap}`}>
              <div className="grid grid-cols-12 px-8 pb-4 border-b-2 border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                 <div className="col-span-7">Service Details</div>
                 <div className="col-span-1 text-center">Qty</div>
                 <div className="col-span-2 text-right">Rate</div>
                 <div className="col-span-2 text-right">Amount</div>
              </div>

              <div className="space-y-1.5">
                 {invoiceData.items.map((item, idx) => (
                    <div key={item.id} className={`grid grid-cols-12 items-center px-8 ${density.rowPad} rounded-[24px] group relative transition-all duration-300 hover:bg-white hover:shadow-xl hover:shadow-orange-100/50 ${idx % 2 === 1 ? 'bg-slate-50/50' : ''}`}>
                       <div className="col-span-7">
                          {isEditing ? (
                            <div className="space-y-1 pr-6">
                               <input className="font-bold text-slate-900 bg-white border border-slate-200 p-2 rounded-xl text-sm w-full shadow-sm focus:ring-2 focus:ring-orange-400 outline-none" value={item.description} onChange={(e) => updateItem(item.id, 'description', e.target.value)} />
                               <input className="text-[10px] text-orange-500 font-black uppercase tracking-widest bg-white border border-slate-200 p-1.5 rounded-lg w-full shadow-sm focus:ring-2 focus:ring-orange-400 outline-none" value={item.category} onChange={(e) => updateItem(item.id, 'category', e.target.value)} />
                            </div>
                          ) : (
                            <div className="pr-6">
                               <div className={`${density.fSize} font-black text-slate-900 tracking-tight`}>{item.description}</div>
                               <div className={`${density.dSize} font-black text-orange-500 uppercase tracking-[0.2em] mt-1.5 opacity-80 flex items-center gap-1`}>
                                  <div className="w-1.5 h-1.5 rounded-full bg-orange-400"></div> {item.category}
                               </div>
                            </div>
                          )}
                       </div>

                       <div className="col-span-1 flex justify-center">
                          {isEditing ? (
                            <input type="number" className="w-12 text-center bg-white border border-slate-200 p-2 rounded-xl text-sm shadow-sm focus:ring-2 focus:ring-orange-400 outline-none" value={item.qty} onChange={(e) => updateItem(item.id, 'qty', parseInt(e.target.value) || 0)} />
                          ) : (
                            <div className={`w-9 h-9 rounded-xl bg-white border border-slate-100 flex items-center justify-center font-black text-slate-900 shadow-sm ${density.dSize}`}>
                               {item.qty}
                            </div>
                          )}
                       </div>

                       <div className={`col-span-2 text-right font-bold text-slate-500 ${density.fSize} tracking-tight`}>
                          {isEditing ? (
                            <input type="number" className="w-24 text-right bg-white border border-slate-200 p-2 rounded-xl text-sm shadow-sm focus:ring-2 focus:ring-orange-400 outline-none" value={item.price} onChange={(e) => updateItem(item.id, 'price', parseInt(e.target.value) || 0)} />
                          ) : (
                            formatCurrency(item.price)
                          )}
                       </div>

                       <div className={`col-span-2 text-right font-black text-slate-900 ${density.fSize} tracking-tighter`}>
                          {formatCurrency(item.price * item.qty)}
                       </div>

                       {isEditing && (
                          <button onClick={() => removeItem(item.id)} className="absolute -right-4 opacity-0 group-hover:opacity-100 text-rose-500 hover:text-rose-600 transition-all bg-white shadow-xl p-2 rounded-full border border-slate-100 hover:scale-110">
                             <Trash2 size={14} />
                          </button>
                       )}
                    </div>
                 ))}
                 {isEditing && (
                    <button onClick={addItem} className="w-full py-3 text-[10px] font-black text-slate-400 hover:text-orange-600 uppercase tracking-widest border border-dashed border-slate-300 mt-1 rounded-2xl hover:bg-orange-50/50 transition-all bg-white/50">
                      + Add New Design Service
                    </button>
                 )}
              </div>
           </div>

           {/* Summary & Footer */}
           <div className="mt-auto">
              <div className={`flex justify-between items-end border-t-2 border-slate-100 ${density.gap} pt-8`}>
                 <div className="flex-1 max-w-[340px] space-y-8">
                    <div className="flex items-center gap-6 group">
                       <div className="bg-white p-3 rounded-[24px] shadow-xl border border-slate-100 shrink-0 group-hover:rotate-6 transition-transform">
                         <img src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(invoiceData.qrData)}`} alt="Payment QR" className="w-16 h-16 rounded-xl" />
                       </div>
                       <div className="space-y-1.5">
                          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-600 flex items-center gap-2">
                             <CreditCard size={12}/> Payment Portal
                          </div>
                          <EditableText className="text-[10px] font-bold text-slate-500 leading-relaxed" multiline value={invoiceData.paymentDetails} onChange={(v) => setInvoiceData({...invoiceData, paymentDetails: v})} />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                          <Layers size={10}/> Conditions & Terms
                       </div>
                       <EditableText className="text-[10px] font-bold text-slate-400 italic leading-relaxed" multiline value={invoiceData.terms} onChange={(v) => setInvoiceData({...invoiceData, terms: v})} />
                    </div>
                 </div>

                 <div className="w-[280px] space-y-4">
                    <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest px-2">
                       <span>Subtotal</span>
                       <span className="text-slate-900">{formatCurrency(subTotal)}</span>
                    </div>
                    <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest pb-4 border-b-2 border-slate-100 px-2">
                       <div className="flex items-center gap-2">
                         <span>Tax</span>
                         {isEditing ? (
                           <input type="number" className="w-12 border-2 border-slate-100 p-1 rounded-lg bg-slate-50 text-center font-black outline-none focus:ring-2 focus:ring-orange-400" value={invoiceData.taxRate} onChange={(e) => setInvoiceData({...invoiceData, taxRate: parseInt(e.target.value)||0})} />
                         ) : (
                           <span className="text-[10px] bg-orange-100 text-orange-600 px-2.5 py-1 rounded-full font-black">{invoiceData.taxRate}%</span>
                         )}
                       </div>
                       <span className="text-slate-900">{formatCurrency(taxAmount)}</span>
                    </div>
                    <div className="flex justify-between items-center bg-slate-900 p-6 rounded-[32px] text-white shadow-2xl group transition-all hover:bg-orange-600">
                       <span className="text-sm font-black uppercase tracking-[0.2em] text-orange-400 group-hover:text-white transition-colors">Total</span>
                       <span className="text-3xl font-black tracking-tight">{formatCurrency(totalAmount)}</span>
                    </div>
                 </div>
              </div>

              {/* Absolute Final Footer */}
              <div className="flex justify-between items-center text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mt-10 pt-8 border-t border-slate-50">
                 <div className="flex items-center gap-3 group">
                    <div className="w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-slate-900 group-hover:text-white transition-all"><Globe size={12}/></div>
                    <EditableText value={invoiceData.business.website} onChange={(v) => updateNestedField('business', 'website', v)} />
                 </div>
                 <div className="flex items-center gap-2">
                    <Check size={12} className="text-orange-500" /> Authorized Studio Invoice
                 </div>
                 <div className="italic">Design is Intelligence Made Visible</div>
              </div>
           </div>

        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        body { font-family: 'Outfit', 'Inter', sans-serif; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        @media print {
          body { background-color: white !important; padding: 0 !important; }
          .min-h-screen { min-height: auto !important; padding: 0 !important; }
          @page { margin: 0; }
          .print\\:hidden { display: none !important; }
          .shadow-2xl, .shadow-xl, .shadow-sm { box-shadow: none !important; }
          #invoice-content { transform: scale(1) !important; margin: 0 !important; }
          .bg-slate-900 { background-color: #0f172a !important; color: white !important; }
          .rounded-\\[48px\\] { border-radius: 32px !important; }
        }
      `}} />
    </div>
  );
};

export default Template4;
