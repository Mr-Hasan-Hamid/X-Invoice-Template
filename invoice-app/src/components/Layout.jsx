import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Instagram, ExternalLink } from 'lucide-react';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Navigation Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 py-4 px-6 sticky top-0 z-[100] print:hidden">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity group">
            <div className="w-10 h-10 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg group-hover:rotate-6 transition-transform">X</div>
            <h1 className="text-xl font-black text-slate-900 tracking-tighter uppercase">Invoice <span className="text-indigo-600">Studio</span></h1>
          </Link>

          <nav className="flex gap-6 items-center">
            <Link to="/" className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors">Dashboard</Link>
            <div className="w-[1px] h-4 bg-slate-200"></div>
            <div className="flex gap-4">
              <a href="https://github.com/Mr-Hasan-Hamid/X-Invoice-Template" target="_blank" rel="noopener noreferrer" className="p-2 text-slate-400 hover:text-slate-900 transition-colors"><Github size={18} /></a>
              <a href="https://www.instagram.com/_19.hasan_" target="_blank" rel="noopener noreferrer" className="p-2 text-slate-400 hover:text-fuchsia-600 transition-colors"><Instagram size={18} /></a>
            </div>
          </nav>
        </div>
      </header>

      {/* Page Content */}
      <main className="flex-1 flex flex-col">
        {children}
      </main>

      {/* Interactive Footer */}
      <footer className="bg-white border-t border-slate-100 pt-20 pb-10 px-6 print:hidden">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="flex gap-12 mb-10">
            <a href="https://github.com/Mr-Hasan-Hamid/X-Invoice-Template" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 group">
              <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all shadow-sm group-hover:shadow-xl group-hover:-translate-y-1">
                <Github size={24} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-slate-900">GitHub</span>
            </a>
            <a href="https://www.instagram.com/_19.hasan_" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 group">
              <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-gradient-to-tr group-hover:from-amber-400 group-hover:via-fuchsia-500 group-hover:to-indigo-600 group-hover:text-white transition-all shadow-sm group-hover:shadow-xl group-hover:-translate-y-1">
                <Instagram size={24} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-slate-900">Instagram</span>
            </a>
          </div>

          <div className="text-center space-y-4">
            <div className="flex items-center gap-4 justify-center">
              <div className="w-8 h-[1px] bg-slate-200"></div>
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">The Craft</p>
              <div className="w-8 h-[1px] bg-slate-200"></div>
            </div>
            <p className="text-lg font-black text-slate-900 tracking-tight">
              Designed & Developed by <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-fuchsia-600 underline decoration-indigo-200 decoration-4 underline-offset-4 cursor-pointer hover:opacity-80 transition-opacity">Mr Hasan Hamid</span>
            </p>
            <p className="text-xs font-bold text-slate-400">© 2024 X-Invoice Template Studio • Premium Design Assets</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
