import React from 'react';
import {
  X,
  Boxes,
  UtensilsCrossed,
  Sparkles,
  Home,
  Gift,
  Bath,
  ChevronRight,
  Package,
} from 'lucide-react';
import { Category } from '../types';

interface MobileCategorySheetProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (slug: string) => void;
  totalProductsCount: number;
}

const iconMap: Record<string, React.ReactNode> = {
  UtensilsCrossed: <UtensilsCrossed className="w-4 h-4" />,
  Boxes: <Boxes className="w-4 h-4" />,
  Sparkles: <Sparkles className="w-4 h-4" />,
  Home: <Home className="w-4 h-4" />,
  Gift: <Gift className="w-4 h-4" />,
  Bath: <Bath className="w-4 h-4" />,
};

export const MobileCategorySheet: React.FC<MobileCategorySheetProps> = ({
  isOpen,
  onClose,
  categories,
  selectedCategory,
  onSelectCategory,
  totalProductsCount,
}) => {
  if (!isOpen) return null;

  const handleSelect = (slug: string) => {
    onSelectCategory(slug);
    onClose();
    const el = document.getElementById('catalogo-produtos');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      {/* Click outside backdrop */}
      <div className="flex-1 w-full" onClick={onClose} />

      {/* Slide-up Bottom Drawer */}
      <div
        className="bg-white rounded-t-3xl max-h-[85vh] w-full shadow-2xl border-t border-slate-200 overflow-hidden flex flex-col animate-in slide-in-from-bottom duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Mobile Pull Handle */}
        <div className="pt-3 pb-1 flex justify-center">
          <div className="w-12 h-1.5 bg-slate-200 rounded-full" />
        </div>

        {/* Sheet Header */}
        <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 leading-tight">
              Categorias & Ambientes
            </h3>
            <p className="text-xs text-slate-500">
              Escolha uma seção para filtrar o catálogo
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
            aria-label="Fechar categorias"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Categories List */}
        <div className="p-4 overflow-y-auto space-y-2.5 pb-[calc(1rem+env(safe-area-inset-bottom,0px))]">
          {/* Todos os produtos */}
          <button
            onClick={() => handleSelect('todos')}
            className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
              selectedCategory === 'todos'
                ? 'border-orange-500 bg-orange-50/60 ring-2 ring-orange-500/20'
                : 'border-slate-200 bg-white hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-sm text-slate-900 block">
                  Todos os Produtos
                </span>
                <span className="text-xs text-slate-500">
                  {totalProductsCount} itens catalogados
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          {/* Individual Categories */}
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.slug;
            return (
              <button
                key={cat.id}
                onClick={() => handleSelect(cat.slug)}
                className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                  isSelected
                    ? 'border-orange-500 bg-orange-50/60 ring-2 ring-orange-500/20'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={cat.image || '/placeholder-produto.svg'}
                    alt={cat.name}
                    className="w-12 h-12 rounded-xl object-cover shrink-0 border border-slate-200"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder-produto.svg';
                    }}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-700">
                        {iconMap[cat.iconName] || <Boxes className="w-4 h-4" />}
                      </span>
                      <span className="font-bold text-sm text-slate-900 truncate block">
                        {cat.name}
                      </span>
                    </div>
                    <span className="text-xs text-slate-500 truncate block mt-0.5">
                      {cat.itemCount} opções no estoque
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
