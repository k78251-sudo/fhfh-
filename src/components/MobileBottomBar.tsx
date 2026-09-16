import React from 'react';
import { Home, Boxes, Package, ClipboardList, MessageCircle } from 'lucide-react';

interface MobileBottomBarProps {
  onGoHome: () => void;
  onOpenCategories: () => void;
  onGoCatalog: () => void;
  onOpenSimulation: () => void;
  onOpenWhatsApp: () => void;
  simulationItemsCount: number;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({
  onGoHome,
  onOpenCategories,
  onGoCatalog,
  onOpenSimulation,
  onOpenWhatsApp,
  simulationItemsCount,
}) => {
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] pb-[env(safe-area-inset-bottom,0px)]">
      <nav
        aria-label="Navegação rápida móvel"
        className="grid grid-cols-5 items-center h-15 px-1 max-w-md mx-auto"
      >
        {/* Início */}
        <button
          onClick={onGoHome}
          id="mobile-bottom-nav-home"
          className="flex flex-col items-center justify-center h-full text-slate-600 active:text-orange-600 transition-colors group cursor-pointer"
        >
          <Home className="w-5 h-5 transition-transform group-active:scale-90" />
          <span className="text-[10px] font-semibold tracking-tight mt-0.5 whitespace-nowrap">
            Início
          </span>
        </button>

        {/* Categorias / Seções */}
        <button
          onClick={onOpenCategories}
          id="mobile-bottom-nav-categories"
          className="flex flex-col items-center justify-center h-full text-slate-600 active:text-orange-600 transition-colors group cursor-pointer"
        >
          <Boxes className="w-5 h-5 transition-transform group-active:scale-90" />
          <span className="text-[10px] font-semibold tracking-tight mt-0.5 whitespace-nowrap">
            Seções
          </span>
        </button>

        {/* Catálogo */}
        <button
          onClick={onGoCatalog}
          id="mobile-bottom-nav-catalog"
          className="flex flex-col items-center justify-center h-full text-slate-600 active:text-orange-600 transition-colors group cursor-pointer relative"
        >
          <div className="relative">
            <Package className="w-5 h-5 transition-transform group-active:scale-90" />
          </div>
          <span className="text-[10px] font-semibold tracking-tight mt-0.5 whitespace-nowrap">
            Catálogo
          </span>
        </button>

        {/* Minha Lista (Simulação) com Badge */}
        <button
          onClick={onOpenSimulation}
          id="mobile-bottom-nav-simulation"
          className="flex flex-col items-center justify-center h-full text-slate-600 active:text-orange-600 transition-colors group cursor-pointer relative"
        >
          <div className="relative">
            <ClipboardList className="w-5 h-5 text-orange-600 transition-transform group-active:scale-90" />
            {simulationItemsCount > 0 && (
              <span className="absolute -top-1.5 -right-2.5 min-w-4 h-4 px-1 rounded-full bg-orange-600 text-white text-[9px] font-extrabold flex items-center justify-center shadow-xs">
                {simulationItemsCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold text-orange-700 tracking-tight mt-0.5 whitespace-nowrap">
            Minha Lista
          </span>
        </button>

        {/* WhatsApp */}
        <button
          onClick={onOpenWhatsApp}
          id="mobile-bottom-nav-whatsapp"
          className="flex flex-col items-center justify-center h-full text-emerald-700 active:text-emerald-800 transition-colors group cursor-pointer relative"
        >
          <div className="relative w-8 h-8 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-2xs group-active:scale-95 transition-transform">
            <MessageCircle className="w-4 h-4 fill-emerald-600" />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
          </div>
          <span className="text-[10px] font-bold text-emerald-800 tracking-tight mt-0.5 whitespace-nowrap">
            WhatsApp
          </span>
        </button>
      </nav>
    </div>
  );
};
