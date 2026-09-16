import React from 'react';
import {
  UtensilsCrossed,
  Boxes,
  Sparkles,
  Home,
  Gift,
  Bath,
  ArrowRight,
  ChevronRight,
} from 'lucide-react';
import { Category } from '../types';

interface CategoriesGridProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (slug: string) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  UtensilsCrossed: <UtensilsCrossed className="w-4 h-4 sm:w-5 sm:h-5" />,
  Boxes: <Boxes className="w-4 h-4 sm:w-5 sm:h-5" />,
  Sparkles: <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />,
  Home: <Home className="w-4 h-4 sm:w-5 sm:h-5" />,
  Gift: <Gift className="w-4 h-4 sm:w-5 sm:h-5" />,
  Bath: <Bath className="w-4 h-4 sm:w-5 sm:h-5" />,
};

export const CategoriesGrid: React.FC<CategoriesGridProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  const handleCategoryClick = (slug: string) => {
    onSelectCategory(slug);
    const el = document.getElementById('catalogo-produtos');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="categorias" className="py-8 sm:py-12 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-5 sm:mb-8 gap-3">
          <div>
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-orange-600 mb-0.5 block">
              Navegue por Ambientes
            </span>
            <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Principais Categorias
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5 hidden sm:block">
              Selecione uma seção para filtrar os produtos disponíveis em nosso catálogo
            </p>
          </div>

          <button
            onClick={() => handleCategoryClick('todos')}
            id="ver-todos-categorias-btn"
            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 hover:text-orange-600 transition-colors cursor-pointer shrink-0"
          >
            <span>Ver todas</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Categories: Horizontal Snap on Mobile, Grid on Tablet/Desktop */}
        <div className="flex sm:grid overflow-x-auto snap-x snap-mandatory gap-2.5 sm:gap-4 sm:grid-cols-3 lg:grid-cols-6 pb-2 scrollbar-none touch-pan-x">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.slug;
            return (
              <button
                key={cat.id}
                id={`cat-card-${cat.slug}`}
                onClick={() => handleCategoryClick(cat.slug)}
                className={`group text-left p-3 sm:p-4 rounded-2xl border transition-all flex flex-col justify-between cursor-pointer relative overflow-hidden w-36 sm:w-auto shrink-0 sm:shrink snap-start ${
                  isSelected
                    ? 'border-orange-500 ring-2 ring-orange-500/20 bg-orange-50/40 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 hover:shadow-md bg-slate-50/60 hover:bg-white'
                }`}
              >
                {/* Photo thumbnail */}
                <div className="w-full aspect-square rounded-xl overflow-hidden bg-slate-100 mb-2.5 relative">
                  <img
                    src={cat.image || '/placeholder-produto.svg'}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder-produto.svg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                  {/* Category icon badge */}
                  <div className="absolute bottom-1.5 left-1.5 sm:bottom-2 sm:left-2 w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/95 text-slate-800 flex items-center justify-center shadow-xs backdrop-blur-xs">
                    {iconMap[cat.iconName] || <Boxes className="w-4 h-4" />}
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h3 className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-orange-600 transition-colors leading-tight mb-0.5 truncate">
                    {cat.name}
                  </h3>
                  <span className="text-[10px] sm:text-[11px] text-slate-500 block">
                    {cat.itemCount} opções
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
