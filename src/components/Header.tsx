import React from 'react';
import { Store, Search, MessageCircle, X, ShieldCheck, ClipboardList } from 'lucide-react';
import { Category } from '../types';

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onSelectCategory: (slug: string) => void;
  categories: Category[];
  onOpenGeneralWhatsApp: () => void;
  simulationItemsCount: number;
  onOpenSimulation: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  categories,
  onOpenGeneralWhatsApp,
  simulationItemsCount,
  onOpenSimulation,
}) => {
  const scrollToCatalog = () => {
    const el = document.getElementById('catalogo-produtos');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top micro announcement bar */}
      <div className="bg-slate-900 text-slate-200 text-xs py-1.5 px-3.5 sm:px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 truncate">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-orange-600 text-white uppercase tracking-wider shrink-0">
              Catálogo
            </span>
            <span className="truncate text-[11px] sm:text-xs text-slate-300">
              Monte sua lista de consulta e simule o atendimento no WhatsApp
            </span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-slate-400 shrink-0">
            <span className="hidden sm:flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Preços atualizados
            </span>
            <span className="text-amber-400/90 text-[10px] sm:text-[11px] font-semibold">
              Demonstração
            </span>
          </div>
        </div>
      </div>

      {/* Main navigation row */}
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 py-2.5 sm:py-3.5 flex flex-col md:flex-row items-center justify-between gap-2.5 sm:gap-4 md:gap-6">
        {/* Brand Identity & Mobile Fast Actions */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <a
            href="#"
            className="flex items-center gap-2.5 group focus:outline-none"
            aria-label="Empório das Utilidades"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center shadow-md shadow-orange-500/20 group-hover:bg-orange-600 transition-colors shrink-0">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base sm:text-xl tracking-tight text-slate-900">
                  Empório<span className="text-orange-600">.</span>
                </span>
                <span className="font-bold text-[10px] sm:text-xs uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                  Utilidades
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium -mt-0.5 hidden xs:block">
                Tudo para equipar e organizar seu lar
              </p>
            </div>
          </a>

          {/* Quick buttons on mobile */}
          <div className="flex md:hidden items-center gap-2">
            {/* Mobile List button */}
            <button
              onClick={onOpenSimulation}
              id="mobile-header-list-btn"
              className="relative flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-800 bg-orange-50 active:bg-orange-100 border border-orange-200 rounded-xl transition-colors cursor-pointer min-h-[40px]"
              aria-label="Ver lista de consulta"
            >
              <ClipboardList className="w-4 h-4 text-orange-600" />
              <span>Lista</span>
              {simulationItemsCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-orange-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {simulationItemsCount}
                </span>
              )}
            </button>

            {/* Quick WhatsApp button */}
            <button
              onClick={onOpenGeneralWhatsApp}
              id="mobile-header-whatsapp-btn"
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-emerald-800 bg-emerald-50 active:bg-emerald-100 border border-emerald-200 rounded-xl transition-colors cursor-pointer min-h-[40px]"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-100" />
              <span className="hidden xs:inline">WhatsApp</span>
            </button>
          </div>
        </div>

        {/* Live Search Input */}
        <div className="w-full md:max-w-md lg:max-w-lg relative">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              id="header-catalog-search-input"
              value={searchTerm}
              onChange={(e) => {
                onSearchChange(e.target.value);
                if (e.target.value.trim().length > 0) {
                  scrollToCatalog();
                }
              }}
              placeholder="Buscar produtos (ex: potes, mop, organizador)..."
              className="w-full pl-9 pr-9 py-2 sm:py-2 text-base sm:text-sm bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all shadow-2xs min-h-[42px] sm:min-h-auto"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="absolute right-3 p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200"
                aria-label="Limpar busca"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Header Actions (Desktop) */}
        <div className="hidden md:flex items-center gap-3">
          {/* Minha Lista Button */}
          <button
            onClick={onOpenSimulation}
            id="desktop-header-list-btn"
            className="relative flex items-center gap-2.5 px-3.5 py-2 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-orange-50 hover:border-orange-300 border border-slate-200 rounded-xl shadow-2xs transition-all cursor-pointer group"
          >
            <div className="relative">
              <ClipboardList className="w-4 h-4 text-orange-600 group-hover:scale-110 transition-transform" />
              {simulationItemsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-orange-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {simulationItemsCount}
                </span>
              )}
            </div>
            <div className="text-left">
              <span className="block leading-none font-bold">Minha Lista</span>
              <span className="text-[10px] text-slate-500 font-normal">
                {simulationItemsCount === 0
                  ? '0 itens'
                  : `${simulationItemsCount} ${simulationItemsCount === 1 ? 'item' : 'itens'}`}
              </span>
            </div>
          </button>

          {/* WhatsApp Fast CTA */}
          <button
            onClick={onOpenGeneralWhatsApp}
            id="desktop-header-whatsapp-btn"
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition-all hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <div className="text-left">
              <span className="block leading-none">WhatsApp Loja</span>
              <span className="text-[10px] text-emerald-100 font-normal">[Telefone Fictício]</span>
            </div>
          </button>
        </div>
      </div>

      {/* Category Shortcuts Sub-nav */}
      <nav
        aria-label="Categorias rápidas"
        className="border-t border-slate-100 bg-slate-50/70 overflow-x-auto scrollbar-none touch-pan-x"
      >
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 flex items-center gap-1.5 py-1.5 text-xs font-medium whitespace-nowrap">
          <span className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider mr-1 hidden sm:inline">
            Seções:
          </span>
          <button
            onClick={() => {
              onSelectCategory('todos');
              scrollToCatalog();
            }}
            id="nav-category-todos"
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              selectedCategory === 'todos'
                ? 'bg-orange-600 text-white font-semibold shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
            }`}
          >
            Todos os Itens
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                onSelectCategory(cat.slug);
                scrollToCatalog();
              }}
              id={`nav-category-${cat.slug}`}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                selectedCategory === cat.slug
                  ? 'bg-orange-600 text-white font-semibold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
              }`}
            >
              {cat.name}
            </button>
          ))}
          <a
            href="#diferenciais"
            className="px-3 py-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200/70 ml-auto hidden lg:inline"
          >
            Diferenciais
          </a>
          <a
            href="#localizacao-horarios"
            className="px-3 py-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200/70 hidden lg:inline"
          >
            Horários & Loja
          </a>
        </div>
      </nav>
    </header>
  );
};
