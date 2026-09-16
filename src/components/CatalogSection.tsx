import React, { useState, useMemo, useEffect } from 'react';
import {
  SlidersHorizontal,
  Search,
  Tag,
  Flame,
  Sparkles,
  ArrowUpDown,
  RotateCcw,
  Package,
  LayoutGrid,
  List,
  Filter,
  ClipboardList,
  ArrowRight,
} from 'lucide-react';
import { Product, Category, SimulationItem } from '../types';
import { ProductCard } from './ProductCard';
import { MobileFilterSheet } from './MobileFilterSheet';

interface CatalogSectionProps {
  products: Product[];
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (slug: string) => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onAddToList: (product: Product, quantity: number) => void;
  simulationList: SimulationItem[];
  onOpenSimulationList: () => void;
  onQuickView: (product: Product) => void;
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  products,
  categories,
  selectedCategory,
  onSelectCategory,
  searchTerm,
  onSearchChange,
  onAddToList,
  simulationList,
  onOpenSimulationList,
  onQuickView,
}) => {
  const [badgeFilter, setBadgeFilter] = useState<'all' | 'Mais Vendido' | 'Oferta' | 'Novidade'>('all');
  const [sortBy, setSortBy] = useState<'relevance' | 'price-asc' | 'price-desc'>('relevance');
  const [visibleCount, setVisibleCount] = useState<number>(16);
  const [layoutMode, setLayoutMode] = useState<'grid' | 'list'>('grid');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  // Reset pagination on filter changes
  useEffect(() => {
    setVisibleCount(16);
  }, [selectedCategory, badgeFilter, searchTerm]);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Category filter
    if (selectedCategory !== 'todos') {
      list = list.filter((p) => p.categorySlug === selectedCategory);
    }

    // Badge filter
    if (badgeFilter !== 'all') {
      list = list.filter((p) => p.badge === badgeFilter);
    }

    // Search query filter
    if (searchTerm.trim().length > 0) {
      const q = searchTerm.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.refCode.toLowerCase().includes(q) ||
          p.features.some((f) => f.toLowerCase().includes(q))
      );
    }

    // Sorting
    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    }

    return list;
  }, [products, selectedCategory, badgeFilter, searchTerm, sortBy]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);

  const resetFilters = () => {
    onSelectCategory('todos');
    setBadgeFilter('all');
    setSortBy('relevance');
    onSearchChange('');
  };

  const activeFiltersCount =
    (selectedCategory !== 'todos' ? 1 : 0) +
    (badgeFilter !== 'all' ? 1 : 0) +
    (sortBy !== 'relevance' ? 1 : 0);

  const totalInList = simulationList.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <section id="catalogo-produtos" className="py-10 sm:py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Banner informing items in simulation list if any */}
        {totalInList > 0 && (
          <div className="mb-6 p-3 sm:p-4 bg-orange-600 text-white rounded-2xl shadow-md flex items-center justify-between gap-3 animate-in fade-in">
            <div className="flex items-center gap-2.5 truncate">
              <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                <ClipboardList className="w-4 h-4" />
              </div>
              <p className="text-xs sm:text-sm font-semibold truncate">
                Você tem <strong>{totalInList} {totalInList === 1 ? 'item' : 'itens'}</strong> na sua lista de consulta
              </p>
            </div>
            <button
              type="button"
              onClick={onOpenSimulationList}
              className="px-3.5 py-1.5 rounded-xl bg-white text-orange-700 font-bold text-xs hover:bg-orange-50 transition-colors shrink-0 flex items-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <span>Ver Lista & Simular</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-6 sm:mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
                Catálogo Digital
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs text-slate-500 font-medium">
                {filteredProducts.length} itens encontrados
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {selectedCategory === 'todos'
                ? 'Todos os Produtos'
                : categories.find((c) => c.slug === selectedCategory)?.name || 'Produtos'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Adicione os itens desejados à lista e simule sua consulta de disponibilidade pelo WhatsApp
            </p>
          </div>

          {/* Desktop Filter Chips */}
          <div className="hidden lg:flex items-center gap-2">
            <button
              onClick={() => setBadgeFilter('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-xl transition-all cursor-pointer ${
                badgeFilter === 'all'
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setBadgeFilter('Mais Vendido')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-xl transition-all cursor-pointer ${
                badgeFilter === 'Mais Vendido'
                  ? 'bg-orange-600 text-white shadow-2xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-orange-500" />
              <span>Mais Vendidos</span>
            </button>
            <button
              onClick={() => setBadgeFilter('Oferta')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-xl transition-all cursor-pointer ${
                badgeFilter === 'Oferta'
                  ? 'bg-rose-600 text-white shadow-2xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Tag className="w-3.5 h-3.5 text-rose-500" />
              <span>Ofertas</span>
            </button>
            <button
              onClick={() => setBadgeFilter('Novidade')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-xl transition-all cursor-pointer ${
                badgeFilter === 'Novidade'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              <span>Novidades</span>
            </button>
          </div>
        </div>

        {/* Toolbar: Category dropdown, sort & view toggle */}
        <div className="bg-white p-3 sm:p-4 rounded-2xl border border-slate-200 mb-6 shadow-2xs">
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Category selection */}
            <div className="flex items-center gap-2 flex-1 min-w-[200px]">
              <SlidersHorizontal className="w-4 h-4 text-slate-400 shrink-0" />
              <div className="relative w-full max-w-xs">
                <select
                  value={selectedCategory}
                  onChange={(e) => onSelectCategory(e.target.value)}
                  id="catalog-category-select"
                  className="w-full text-xs font-semibold py-2 px-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all appearance-none cursor-pointer pr-8"
                >
                  <option value="todos">Todas as Categorias ({products.length})</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.slug}>
                      {c.name} ({products.filter((p) => p.categorySlug === c.slug).length})
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
                  ▼
                </div>
              </div>

              {/* Clear filters if active */}
              {activeFiltersCount > 0 && (
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-semibold text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                  title="Limpar todos os filtros"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span className="hidden sm:inline">Limpar</span>
                </button>
              )}
            </div>

            {/* Right side controls: Mobile Filter button, Layout toggle, and Sort */}
            <div className="flex items-center gap-2">
              {/* Mobile Filter Button */}
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(true)}
                id="open-mobile-filter-sheet-btn"
                className="lg:hidden flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                <Filter className="w-3.5 h-3.5 text-orange-600" />
                <span>Filtros</span>
                {activeFiltersCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-orange-600 text-white text-[10px] font-bold flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </button>

              {/* Layout mode switcher */}
              <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200">
                <button
                  type="button"
                  onClick={() => setLayoutMode('grid')}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    layoutMode === 'grid'
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                  aria-label="Modo Grade"
                  title="Visualização em Grade"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setLayoutMode('list')}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    layoutMode === 'list'
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                  aria-label="Modo Lista"
                  title="Visualização em Lista"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* Sort selector (Desktop) */}
              <div className="hidden sm:flex items-center gap-1.5 pl-2 border-l border-slate-200 text-xs">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  id="catalog-sort-select"
                  className="text-xs font-semibold py-1.5 px-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all cursor-pointer"
                >
                  <option value="relevance">Relevância</option>
                  <option value="price-asc">Menor Preço</option>
                  <option value="price-desc">Maior Preço</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Active search message */}
        {searchTerm && (
          <div className="mb-4 sm:mb-6 px-3.5 py-2.5 bg-orange-50 border border-orange-200 rounded-xl flex items-center justify-between text-xs text-orange-900">
            <span className="truncate mr-2">
              Filtrando por: <strong>&ldquo;{searchTerm}&rdquo;</strong>
            </span>
            <button
              onClick={() => onSearchChange('')}
              className="text-orange-700 font-semibold hover:underline cursor-pointer shrink-0 text-xs"
            >
              Limpar busca
            </button>
          </div>
        )}

        {/* Products Grid or List */}
        {filteredProducts.length > 0 ? (
          <div>
            <div
              className={
                layoutMode === 'grid'
                  ? 'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-6'
                  : 'flex flex-col gap-3 sm:gap-4'
              }
            >
              {displayedProducts.map((product) => {
                const inList = simulationList.find((i) => i.product.id === product.id);
                return (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToList={onAddToList}
                    inListQuantity={inList ? inList.quantity : 0}
                    onQuickView={onQuickView}
                    layoutMode={layoutMode}
                  />
                );
              })}
            </div>

            {/* Load More / Pagination Controls */}
            {filteredProducts.length > visibleCount && (
              <div className="mt-8 sm:mt-10 pt-5 sm:pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
                <p className="text-xs text-slate-500 font-medium text-center sm:text-left">
                  Exibindo <span className="font-bold text-slate-800">{displayedProducts.length}</span> de{' '}
                  <span className="font-bold text-slate-800">{filteredProducts.length}</span> produtos
                </p>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => setVisibleCount((prev) => prev + 16)}
                    className="flex-1 sm:flex-initial px-4 py-3 sm:py-2.5 bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
                  >
                    <Package className="w-3.5 h-3.5" />
                    <span>Carregar mais 16</span>
                  </button>
                  <button
                    onClick={() => setVisibleCount(filteredProducts.length)}
                    className="px-3.5 py-3 sm:py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 font-semibold text-xs rounded-xl transition-colors cursor-pointer whitespace-nowrap min-h-[44px]"
                  >
                    Ver todos ({filteredProducts.length})
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 text-center max-w-md mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">
              Nenhum produto encontrado
            </h3>
            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              Não encontramos nenhum item correspondente aos filtros selecionados.
            </p>
            <button
              onClick={resetFilters}
              className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer min-h-[42px]"
            >
              Exibir todo o catálogo
            </button>
          </div>
        )}
      </div>

      {/* Mobile Filter & Sort Drawer / Bottom Sheet */}
      <MobileFilterSheet
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={onSelectCategory}
        badgeFilter={badgeFilter}
        setBadgeFilter={setBadgeFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        onResetFilters={resetFilters}
        totalFilteredCount={filteredProducts.length}
      />
    </section>
  );
};
