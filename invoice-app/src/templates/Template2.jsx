import React, { useState, useMemo } from 'react';
import { Plus, Trash2, Printer, Settings2, Check, RefreshCcw, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Template2 = () => {
  // Enhanced Invoice State with INR and QR support
  const initialState = {
    invoiceNo: "2569876",
    date: "30 Jan, 2018",
    taxRate: 18,
    currencySymbol: "₹",
    qrData: "upi://pay?pa=contact@yourbusiness.in&pn=Smako%20Atson&am=11446&cu=INR",
    business: {
      phone: "+91 98765 43210",
      email: "billing@yourbusiness.in",
      website: "www.yourbusiness.in",
      address: "Sector 62, Electronic City",
      location: "Noida, UP. 201301"
    },
    client: {
      name: "Smith Jhon",
      title: "",
      address: "Flat 402, Green Valley Apartments\nHSR Layout, Bangalore 560102",
      phone: "+91 99887 76655",
      email: "smith.jhon@example.in"
    },
    accountHolder: "Smako Atson",
    paymentDetails: "UPI ID: contact@yourbusiness.in\nA/C: 9876543210\nBank: HDFC Bank",
    items: [
      { id: 1, description: "Web Site Design", duration: "15 Days", qty: 1, price: 5000 },
      { id: 2, description: "E-Book Design", duration: "15 Days", qty: 1, price: 2000 },
      { id: 3, description: "Magazine Design", duration: "25 Days", qty: 1, price: 1500 },
      { id: 4, description: "Brand Identity Design", duration: "14 Days", qty: 1, price: 700 },
      { id: 5, description: "Logo Design", duration: "7 Days", qty: 1, price: 500 },
    ],
    terms: "Please make the payment within 15 days of receiving the invoice. In case of any discrepancies, please reach out to our support team."
  };

  const [invoiceData, setInvoiceData] = useState(initialState);
  const [isEditing, setIsEditing] = useState(false);

  // --- Smart Density Logic (Tuned for strict A4 Height) ---
  const density = useMemo(() => {
    const count = invoiceData.items.length;
    if (count <= 3) return { 
      rowPadding: 'py-5', 
      fontSize: 'text-[14px]', 
      tableGap: 'mb-8',
      sectionGap: 'mb-8',
      logoBox: 'w-44 h-44',
      logoText: 'text-4xl',
      lineMargin: 'my-6',
      footerPadding: 'pb-8',
      payPad: 'pt-6',
      cardMinH: 'min-h-[140px]'
    };
    if (count <= 6) return { 
      rowPadding: 'py-3', 
      fontSize: 'text-[12px]', 
      tableGap: 'mb-4',
      sectionGap: 'mb-4',
      logoBox: 'w-36 h-36',
      logoText: 'text-3xl',
      lineMargin: 'my-3',
      footerPadding: 'pb-4',
      payPad: 'pt-3',
      cardMinH: 'min-h-[120px]'
    };
    return { 
      rowPadding: 'py-1', 
      fontSize: 'text-[10px]', 
      tableGap: 'mb-2',
      sectionGap: 'mb-2',
      logoBox: 'w-28 h-28',
      logoText: 'text-2xl',
      lineMargin: 'my-1',
      footerPadding: 'pb-2',
      payPad: 'pt-2',
      cardMinH: 'min-h-[90px]'
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
    setInvoiceData({ 
      ...invoiceData, 
      items: [...invoiceData.items, { id: Date.now(), description: "New Service", duration: "0 Days", qty: 1, price: 0 }] 
    });
  };

  const removeItem = (id) => {
    setInvoiceData({ ...invoiceData, items: invoiceData.items.filter(i => i.id !== id) });
  };

  const formatCurrency = (num) => {
    // Using Indian Numbering System (en-IN)
    return invoiceData.currencySymbol + " " + num.toLocaleString('en-IN', { minimumFractionDigits: 0 });
  };

  // Helper component for editable text
  const EditableText = ({ value, onChange, className, type = "text", multiline = false }) => {
    if (!isEditing) return <div className={className}>{value}</div>;
    
    const inputClasses = `bg-blue-50 border-b border-blue-200 outline-none focus:border-blue-500 transition-colors w-full ${className}`;
    
    return multiline ? (
      <textarea 
        className={inputClasses} 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        rows={2}
      />
    ) : (
      <input 
        type={type}
        className={inputClasses} 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
      />
    );
  };

  return (
    <div className="min-h-screen bg-slate-200 py-12 px-4 flex flex-col items-center font-sans text-slate-800">
      
      {/* Control Bar */}
      <div className="mb-8 flex gap-3 print:hidden sticky top-24 z-50">
        <Link to="/" className="flex items-center gap-2 px-6 py-2.5 bg-white text-slate-600 border rounded-full font-bold shadow-md hover:bg-slate-50 transition-all">
          <ArrowLeft size={18} /> Dashboard
        </Link>
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-bold shadow-lg transition-all transform hover:scale-105 ${isEditing ? 'bg-green-600 text-white' : 'bg-slate-800 text-white'}`}
        >
          {isEditing ? <><Check size={18} /> Save Changes</> : <><Settings2 size={18} /> Personalize</>}
        </button>
        <button 
          onClick={() => window.print()}
          className="flex items-center gap-2 px-6 py-2.5 bg-white text-slate-800 border rounded-full font-bold shadow-md hover:bg-slate-50 transition-all"
        >
          <Printer size={18} /> Print / Export
        </button>
        <button 
          onClick={() => setInvoiceData(initialState)}
          className="flex items-center justify-center w-11 h-11 bg-white text-slate-400 border rounded-full shadow-md hover:text-red-500 transition-all"
          title="Reset Template"
        >
          <RefreshCcw size={18} />
        </button>
      </div>

      {/* Invoice Page - EXACT A4 DIMENSIONS */}
      <div id="invoice-content" className="w-[794px] h-[1123px] bg-white shadow-2xl relative flex flex-col print:shadow-none print:m-0 overflow-hidden box-border">
        
        {/* Header Block */}
        <div className="flex justify-between items-start">
          <div className={`bg-[#1a2130] ${density.logoBox} flex flex-col items-center justify-center text-white relative shrink-0 transition-all`}>
             <div className="border-2 border-white/20 p-4 flex flex-col items-center z-10">
                <div className="text-[10px] tracking-[0.3em] opacity-60 mb-1">EST. 1970</div>
                <div className={`${density.logoText} font-black tracking-tighter leading-none mb-1 transition-all`}>LOGO</div>
                <div className="text-[9px] tracking-[0.4em] opacity-50 uppercase">— ORIGINAL —</div>
                <div className="mt-4 flex items-center gap-2 italic text-[8px] uppercase tracking-widest font-light">
                   <div className="h-[1px] w-5 bg-white/30"></div>
                   Your Slogan Here
                   <div className="h-[1px] w-5 bg-white/30"></div>
                </div>
             </div>
             <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] border border-white rotate-45"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-white -rotate-12"></div>
             </div>
          </div>

          <div className={`${density.payPad} pr-10 text-right flex-1 flex flex-col items-end`}>
            <div className="space-y-1 text-xs text-slate-400 font-medium tracking-wide">
              <EditableText value={invoiceData.business.phone} onChange={(v) => updateNestedField('business', 'phone', v)} />
              <EditableText value={invoiceData.business.email} onChange={(v) => updateNestedField('business', 'email', v)} />
              <EditableText value={invoiceData.business.website} onChange={(v) => updateNestedField('business', 'website', v)} />
            </div>
            <div className="w-full max-w-[400px] h-[2px] bg-[#c5a075] my-6 ml-auto shrink-0"></div>
            <div className="text-xs text-slate-400 font-medium">
              <EditableText value={invoiceData.business.address} onChange={(v) => updateNestedField('business', 'address', v)} />
              <EditableText value={invoiceData.business.location} onChange={(v) => updateNestedField('business', 'location', v)} />
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="px-12 py-4 flex-1 flex flex-col">
          
          {/* Invoice Identity Row */}
          <div className={`flex justify-between items-end ${density.sectionGap}`}>
            <h1 className="text-5xl font-black text-slate-900 tracking-tightest">Invoice</h1>
            <div className="text-right text-[13px] text-slate-500 font-bold space-y-1.5 uppercase tracking-wider">
              <div className="flex justify-end gap-3 items-center">
                <span className="text-slate-300">NO.</span>
                <EditableText className="text-slate-700 min-w-[80px]" value={invoiceData.invoiceNo} onChange={(v) => setInvoiceData({...invoiceData, invoiceNo: v})} />
              </div>
              <div className="flex justify-end gap-3 items-center">
                <span className="text-slate-300">Date -</span>
                <EditableText className="text-slate-700 min-w-[80px]" value={invoiceData.date} onChange={(v) => setInvoiceData({...invoiceData, date: v})} />
              </div>
              <div className="flex justify-end gap-3 items-center text-slate-900">
                <span className="text-slate-300">Due INR -</span>
                <span className="font-black">{formatCurrency(totalAmount)}</span>
              </div>
            </div>
          </div>

          {/* Recipient & Payment Method + QR Code - Compact Redesign */}
          <div className={`grid grid-cols-2 ${density.sectionGap} gap-5`}>
            
            {/* Recipient Info Card */}
            <div className={`bg-slate-50 border-l-[3px] border-[#c5a075] p-5 flex flex-col shadow-sm ${density.cardMinH}`}>
              <div className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2.5 flex items-center gap-2">
                 <div className="w-4 h-[1px] bg-slate-300"></div> Billed To
              </div>
              <EditableText 
                className="font-black text-slate-800 text-lg tracking-tight mb-1" 
                value={invoiceData.client.name} 
                onChange={(v) => updateNestedField('client', 'name', v)} 
              />
              <div className="text-[11px] text-slate-500 font-medium space-y-0.5 leading-relaxed">
                <EditableText multiline value={invoiceData.client.address} onChange={(v) => updateNestedField('client', 'address', v)} />
                <div className="pt-2 flex gap-1 font-bold text-slate-700">P: <EditableText value={invoiceData.client.phone} onChange={(v) => updateNestedField('client', 'phone', v)} /></div>
                <div className="flex gap-1 font-bold text-slate-700">M: <EditableText value={invoiceData.client.email} onChange={(v) => updateNestedField('client', 'email', v)} /></div>
              </div>
            </div>

            {/* Payment Details Card */}
            <div className={`bg-[#1a2130] p-5 text-white flex items-start gap-4 shadow-xl ${density.cardMinH}`}>
               <div className="flex-1">
                 <div className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2.5 flex items-center gap-2">
                    <div className="w-4 h-[1px] bg-slate-600"></div> Payment Info
                 </div>
                 <div className="mb-2">
                    <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-0.5">Account Holder</div>
                    <EditableText 
                      className="text-sm font-black text-[#c5a075]" 
                      value={invoiceData.accountHolder} 
                      onChange={(v) => setInvoiceData({...invoiceData, accountHolder: v})} 
                    />
                 </div>
                 <EditableText 
                   className="text-[11px] text-slate-300 font-medium whitespace-pre-wrap leading-relaxed" 
                   value={invoiceData.paymentDetails} 
                   onChange={(v) => setInvoiceData({...invoiceData, paymentDetails: v})} 
                 />
               </div>
               
               {/* QR Code Section */}
               <div className="shrink-0 flex flex-col items-center">
                  <div className="p-1.5 bg-white mb-2 shadow-sm">
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(invoiceData.qrData)}`} 
                      alt="Payment QR"
                      className="w-16 h-16"
                    />
                  </div>
                  <div className="text-[8px] font-black uppercase tracking-widest text-[#c5a075]">Scan to Pay</div>
                  {isEditing && (
                    <div className="mt-2 w-24">
                      <input 
                        className="text-[8px] border border-slate-600 p-1 w-full bg-slate-800 text-white outline-none" 
                        value={invoiceData.qrData} 
                        onChange={(e) => setInvoiceData({...invoiceData, qrData: e.target.value})}
                        placeholder="e.g. upi id"
                      />
                    </div>
                  )}
               </div>
            </div>
          </div>

          {/* Line Items Table */}
          <div className={density.tableGap}>
            <div className="bg-[#1a2130] text-white flex py-5 px-8 text-xs font-black uppercase tracking-[0.15em]">
              <div className="flex-[3.5]">Descriptions</div>
              <div className="flex-1 text-center">Qty</div>
              <div className="flex-1 text-right">Price</div>
            </div>

            <div className="divide-y divide-slate-100 border-x border-slate-50">
              {invoiceData.items.map((item) => (
                <div key={item.id} className={`group relative flex ${density.rowPadding} px-8 items-center hover:bg-slate-50/50 transition-colors`}>
                  <div className="flex-[3.5]">
                    {isEditing ? (
                      <div className="flex flex-col gap-2 pr-4">
                        <input className="font-bold text-slate-800 bg-white border p-1.5 rounded text-sm" value={item.description} onChange={(e) => updateItem(item.id, 'description', e.target.value)} />
                        <input className="text-xs text-slate-400 bg-white border p-1 rounded" value={item.duration} onChange={(e) => updateItem(item.id, 'duration', e.target.value)} />
                      </div>
                    ) : (
                      <>
                        <div className={`font-bold text-slate-800 ${density.fontSize}`}>{item.description}</div>
                        <div className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Duration - {item.duration}</div>
                      </>
                    )}
                  </div>
                  <div className="flex-1 text-center font-bold text-slate-500">
                    {isEditing ? (
                      <input type="number" className="w-14 text-center border p-1.5 rounded text-sm" value={item.qty} onChange={(e) => updateItem(item.id, 'qty', parseInt(e.target.value) || 0)} />
                    ) : (
                      item.qty.toString().padStart(2, '0')
                    )}
                  </div>
                  <div className="flex-1 text-right font-black text-slate-800 tracking-tight">
                    {isEditing ? (
                      <input type="number" className="w-24 text-right border p-1.5 rounded text-sm" value={item.price} onChange={(e) => updateItem(item.id, 'price', parseInt(e.target.value) || 0)} />
                    ) : (
                      formatCurrency(item.price)
                    )}
                  </div>
                  
                  {isEditing && (
                    <button onClick={() => removeItem(item.id)} className="absolute -right-4 opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 transition p-2">
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {isEditing && (
              <button onClick={addItem} className="mt-6 flex items-center gap-2 text-xs font-black text-blue-600 hover:text-blue-800 px-8 py-2 border-2 border-dashed border-blue-100 rounded-lg w-full justify-center uppercase tracking-[0.1em] transition-all hover:bg-blue-50">
                <Plus size={16} /> Add Line Item
              </button>
            )}
          </div>

          {/* Calculations Summary */}
          <div className="flex justify-end mb-4">
            <div className="w-72 space-y-4">
              <div className="flex justify-between items-center px-8 text-[13px]">
                <span className="font-black text-slate-300 uppercase tracking-widest">Sub - Total</span>
                <span className="font-black text-slate-800">{formatCurrency(subTotal)}</span>
              </div>
              <div className="flex justify-between items-center px-8 text-[13px] pb-2 border-b border-slate-100 mx-4">
                <div className="flex items-center gap-2">
                   <span className="font-black text-slate-300 uppercase tracking-widest">Tax</span>
                   {isEditing ? (
                     <input type="number" className="w-10 border rounded px-1" value={invoiceData.taxRate} onChange={(e) => setInvoiceData({...invoiceData, taxRate: parseInt(e.target.value)||0})} />
                   ) : (
                     <span className="text-[10px] text-slate-400">({invoiceData.taxRate}%)</span>
                   )}
                </div>
                <span className="font-black text-slate-800">{formatCurrency(taxAmount)}</span>
              </div>
              <div className="bg-[#1a2130] text-white flex justify-between items-center py-4 px-8 shadow-xl">
                <span className="text-xs font-black tracking-[0.2em] uppercase">Grand Total</span>
                <span className="text-xl font-black">{formatCurrency(totalAmount)}</span>
              </div>
            </div>
          </div>

          {/* Bottom Golden Line */}
          <div className={`h-[2px] bg-[#c5a075] w-full ${density.lineMargin} shrink-0`}></div>

          {/* Footer Section */}
          <div className={`${density.footerPadding} grid grid-cols-5 gap-8 items-start`}>
            <div className="col-span-3">
               <h4 className="font-black text-[11px] uppercase tracking-[0.15em] text-slate-800 mb-2">Terms & Conditions</h4>
               <EditableText 
                 multiline 
                 className="text-[11px] leading-relaxed text-slate-400 italic font-medium" 
                 value={invoiceData.terms} 
                 onChange={(v) => setInvoiceData({...invoiceData, terms: v})} 
               />
            </div>
            <div className="col-span-2 flex flex-col items-center">
               <div className="font-serif italic text-4xl text-slate-800 mb-2 select-none tracking-tight" style={{ fontFamily: 'Dancing Script, cursive' }}>
                 Smako Atson
               </div>
               <div className="w-36 h-[1.5px] bg-slate-100 mb-3"></div>
               <div className="font-black text-sm text-slate-900 tracking-tight">SMAKO ATSON</div>
               <div className="text-[9px] text-slate-300 font-black uppercase tracking-[0.3em] mt-1">Web Designer</div>
            </div>
          </div>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600&family=Inter:wght@300;400;500;700;900&display=swap');
        
        body { font-family: 'Inter', sans-serif; }

        @media print {
          body { background-color: white !important; padding: 0 !important; }
          .min-h-screen { min-height: auto !important; padding: 0 !important; display: block !important; }
          @page { margin: 0; }
          .print\\:hidden { display: none !important; }
          .shadow-2xl { box-shadow: none !important; }
          .bg-slate-200 { background-color: white !important; }
          .border-2 { border-width: 1px !important; }
        }
      `}} />
    </div>
  );
};

export default Template2;
