import React from 'react';
import { Link } from 'react-router-dom';
import { Layout as LayoutIcon, FileText, Zap, Shield, ArrowRight } from 'lucide-react';

const Home = () => {
  const templates = [
    {
      id: 1,
      name: "The Executive",
      description: "Clean, high-contrast design with a bold header and crisp typography.",
      color: "bg-orange-500",
      accent: "text-orange-600",
      vibe: "Professional & Direct"
    },
    {
      id: 2,
      name: "The Professional",
      description: "Elegant grid layout with gold accents and a sophisticated card structure.",
      color: "bg-[#c5a075]",
      accent: "text-[#c5a075]",
      vibe: "Corporate & Elite"
    },
    {
      id: 3,
      name: "The Modernist",
      description: "Modern minimalist layout with bold shapes and perfect balance.",
      color: "bg-indigo-600",
      accent: "text-indigo-600",
      vibe: "Creative & Balanced"
    },
    {
      id: 4,
      name: "The Studio",
      description: "Next-gen glassmorphism with mesh gradients and soft translucency.",
      color: "bg-orange-600",
      accent: "text-orange-600",
      vibe: "Futuristic & Premium"
    }
  ];

  return (
    <div className="flex-1 relative flex flex-col items-center justify-center py-20 px-6 overflow-hidden bg-slate-50">
      
      {/* Mesh Gradient Background */}
      <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden pointer-events-none">
         <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-indigo-500/10 blur-[120px] rounded-full animate-pulse"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-fuchsia-500/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
         <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] bg-amber-400/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl w-full z-10">
        {/* Hero Section */}
        <div className="text-center mb-20 space-y-6">
           <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm mb-4">
              <Zap size={14} className="text-amber-500 fill-amber-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Premium Templates</span>
           </div>
           <h1 className="text-6xl md:text-7xl font-black text-slate-900 tracking-tighter leading-none">
             Select Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-orange-500">Masterpiece</span>
           </h1>
           <p className="max-w-2xl mx-auto text-lg font-medium text-slate-500 leading-relaxed">
             Elevate your brand with our hand-crafted, high-conversion invoice templates. Fully editable, responsive, and ready for global billing.
           </p>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {templates.map((t) => (
            <Link 
              key={t.id} 
              to={`/template/${t.id}`}
              className="group relative h-[420px] flex flex-col bg-white/40 backdrop-blur-md rounded-[32px] border border-white/60 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden p-8"
            >
              {/* Card Background Glow */}
              <div className={`absolute top-0 right-0 w-32 h-32 ${t.color} opacity-0 group-hover:opacity-10 blur-3xl rounded-full transition-opacity duration-500`}></div>
              
              <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
                 {/* Stylized Template Icon/Preview */}
                 <div className={`w-20 h-20 rounded-[24px] ${t.color} flex items-center justify-center text-white shadow-lg shadow-inner group-hover:scale-110 transition-transform duration-500`}>
                    <FileText size={32} />
                 </div>
                 
                 <div>
                    <div className={`text-[10px] font-black uppercase tracking-[0.2em] mb-2 ${t.accent}`}>{t.vibe}</div>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-3">{t.name}</h3>
                    <p className="text-sm font-medium text-slate-500 leading-relaxed px-2">
                      {t.description}
                    </p>
                 </div>
              </div>

              {/* Action Button */}
              <div className="pt-6 border-t border-slate-100 flex items-center justify-between group-hover:border-slate-200 transition-colors">
                 <span className="text-xs font-black uppercase tracking-widest text-slate-400 group-hover:text-slate-900 transition-colors">Select Template</span>
                 <div className={`w-8 h-8 rounded-full ${t.color} flex items-center justify-center text-white opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-500 shadow-md`}>
                    <ArrowRight size={16} />
                 </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Features Row */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-slate-200 pt-16">
           <div className="flex gap-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0"><Shield size={24}/></div>
              <div>
                 <h4 className="font-black text-slate-900 mb-1">A4 Compliance</h4>
                 <p className="text-sm font-medium text-slate-500">Perfectly sized for international A4 standards with smart padding.</p>
              </div>
           </div>
           <div className="flex gap-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600 shrink-0"><Zap size={24}/></div>
              <div>
                 <h4 className="font-black text-slate-900 mb-1">Smart Density</h4>
                 <p className="text-sm font-medium text-slate-500">Layout adjusts dynamically as you add items to save space.</p>
              </div>
           </div>
           <div className="flex gap-4">
              <div className="w-12 h-12 rounded-2xl bg-fuchsia-50 flex items-center justify-center text-fuchsia-600 shrink-0"><LayoutIcon size={24}/></div>
              <div>
                 <h4 className="font-black text-slate-900 mb-1">Pixel Perfect</h4>
                 <p className="text-sm font-medium text-slate-500">Native browser rendering for crystal-clear PDF exports.</p>
              </div>
           </div>
        </div>
      </div>

      {/* Global Font Import */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');
        body { font-family: 'Outfit', sans-serif; }
      `}} />
    </div>
  );
};

export default Home;
