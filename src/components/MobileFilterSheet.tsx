import React from 'react';
import {
  X,
  SlidersHorizontal,
  Flame,
  Tag,
  Sparkles,
  ArrowUpDown,
  RotateCcw,
  Check,
} from 'lucide-react';
import { Category } from '../types';

interface MobileFilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (slug: string) => void;
  badgeFilter: 'all' | 'Mais Vendido' | 'Oferta' | 'Novidade';
  setBadgeFilter: (badge: 'all' | 'Mais Vendido' | 'Oferta' | 'Novidade') => void;
  sortBy: 'relevance' | 'price-asc' | 'price-desc';
  setSortBy: (sort: 'relevance' | 'price-asc' | 'price-desc') => void;
  onResetFilters: () => void;
  totalFilteredCount: number;
}

export const MobileFilterSheet: React.FC<MobileFilterSheetProps> = ({
  isOpen,
  onClose,
  categories,
  selectedCategory,
  onSelectCategory,
  badgeFilter,
  setBadgeFilter,
  sortBy,
  setSortBy,
  onResetFilters,
  totalFilteredCount,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="flex-1 w-full" onClick={onClose} />

      <div
        className="bg-white rounded-t-3xl max-h-[85vh] w-full shadow-2xl border-t border-slate-200 overflow-hidden flex flex-col animate-in slide-in-from-bottom duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Handle */}
        <div className="pt-3 pb-1 flex justify-center">
          <div className="w-12 h-1.5 bg-slate-200 rounded-full" />
        </div>

        {/* Header */}
        <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-orange-600" />
            <h3 className="text-base font-extrabold text-slate-900 leading-tight">
              Filtros & Ordenação
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
            aria-label="Fechar filtros"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Filters Body */}
        <div className="p-5 overflow-y-auto space-y-6">
          {/* Ordenar por */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2.5 flex items-center gap-1.5">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
              <span>Ordenar Produtos</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setSortBy('relevance')}
                className={`py-2.5 px-2 rounded-xl text-xs font-semibold border transition-all text-center cursor-pointer ${
                  sortBy === 'relevance'
                    ? 'border-orange-500 bg-orange-50 text-orange-800 ring-1 ring-orange-500'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                Padrão
              </button>
              <button
                type="button"
                onClick={() => setSortBy('price-asc')}
                className={`py-2.5 px-2 rounded-xl text-xs font-semibold border transition-all text-center cursor-pointer ${
                  sortBy === 'price-asc'
                    ? 'border-orange-500 bg-orange-50 text-orange-800 ring-1 ring-orange-500'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                Menor Preço
              </button>
              <button
                type="button"
                onClick={() => setSortBy('price-desc')}
                className={`py-2.5 px-2 rounded-xl text-xs font-semibold border transition-all text-center cursor-pointer ${
                  sortBy === 'price-desc'
                    ? 'border-orange-500 bg-orange-50 text-orange-800 ring-1 ring-orange-500'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                Maior Preço
              </button>
            </div>
          </div>

          {/* Destaques / Tags */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2.5 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-slate-500" />
              <span>Destaques & Selos</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setBadgeFilter('all')}
                className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all flex items-center justify-between cursor-pointer ${
                  badgeFilter === 'all'
                    ? 'border-slate-900 bg-slate-900 text-white'
                    : 'border-slate-200 bg-slate-50 text-slate-700'
                }`}
              >
                <span>Todos os itens</span>
                {badgeFilter === 'all' && <Check className="w-3.5 h-3.5" />}
              </button>
              <button
                type="button"
                onClick={() => setBadgeFilter('Mais Vendido')}
                className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all flex items-center justify-between cursor-pointer ${
                  badgeFilter === 'Mais Vendido'
                    ? 'border-orange-500 bg-orange-50 text-orange-800 font-bold'
                    : 'border-slate-200 bg-slate-50 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-orange-500" />
                  <span>Mais Vendidos</span>
                </div>
                {badgeFilter === 'Mais Vendido' && <Check className="w-3.5 h-3.5 text-orange-600" />}
              </button>
              <button
                type="button"
                onClick={() => setBadgeFilter('Oferta')}
                className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all flex items-center justify-between cursor-pointer ${
                  badgeFilter === 'Oferta'
                    ? 'border-rose-500 bg-rose-50 text-rose-800 font-bold'
                    : 'border-slate-200 bg-slate-50 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-rose-500" />
                  <span>Em Oferta</span>
                </div>
                {badgeFilter === 'Oferta' && <Check className="w-3.5 h-3.5 text-rose-600" />}
              </button>
              <button
                type="button"
                onClick={() => setBadgeFilter('Novidade')}
                className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all flex items-center justify-between cursor-pointer ${
                  badgeFilter === 'Novidade'
                    ? 'border-blue-500 bg-blue-50 text-blue-800 font-bold'
                    : 'border-slate-200 bg-slate-50 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                  <span>Novidades</span>
                </div>
                {badgeFilter === 'Novidade' && <Check className="w-3.5 h-3.5 text-blue-600" />}
              </button>
            </div>
          </div>

          {/* Categorias */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
              Filtrar por Categoria
            </label>
            <div className="space-y-1.5">
              <button
                type="button"
                onClick={() => onSelectCategory('todos')}
                className={`w-full py-2.5 px-3.5 rounded-xl text-xs font-semibold border transition-all flex items-center justify-between cursor-pointer ${
                  selectedCategory === 'todos'
                    ? 'border-orange-500 bg-orange-50 text-orange-900 font-bold'
                    : 'border-slate-200 bg-slate-50 text-slate-700'
                }`}
              >
                <span>Todas as Categorias</span>
                {selectedCategory === 'todos' && <Check className="w-4 h-4 text-orange-600" />}
              </button>
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat.slug;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => onSelectCategory(cat.slug)}
                    className={`w-full py-2.5 px-3.5 rounded-xl text-xs font-semibold border transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'border-orange-500 bg-orange-50 text-orange-900 font-bold'
                        : 'border-slate-200 bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span>{cat.name}</span>
                    {isSelected && <Check className="w-4 h-4 text-orange-600" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center gap-2.5 pb-[calc(1rem+env(safe-area-inset-bottom,0px))]">
          <button
            type="button"
            onClick={() => {
              onResetFilters();
            }}
            className="flex items-center justify-center gap-1.5 px-3.5 py-3 rounded-xl border border-slate-300 text-slate-600 font-semibold text-xs active:bg-slate-200 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Limpar</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-xl bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center"
          >
            Ver {totalFilteredCount} produtos
          </button>
        </div>
      </div>
    </div>
  );
};
