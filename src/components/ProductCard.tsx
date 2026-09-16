import React, { useState } from 'react';
import { Eye, Check, Plus, Minus, ListPlus } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToList: (product: Product, quantity: number) => void;
  inListQuantity?: number;
  onQuickView: (product: Product) => void;
  layoutMode?: 'grid' | 'list';
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToList,
  inListQuantity = 0,
  onQuickView,
  layoutMode = 'grid',
}) => {
  const [selectedQty, setSelectedQty] = useState<number>(1);
  const [justAdded, setJustAdded] = useState<boolean>(false);

  const formatBRL = (val: number) => {
    return val.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const handleQtyChange = (delta: number) => {
    setSelectedQty((prev) => Math.max(1, prev + delta));
  };

  const handleAdd = () => {
    onAddToList(product, selectedQty);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const getBadgeStyle = (badge?: string) => {
    switch (badge) {
      case 'Mais Vendido':
        return 'bg-orange-600 text-white';
      case 'Oferta':
        return 'bg-rose-600 text-white';
      case 'Novidade':
        return 'bg-blue-600 text-white';
      case 'Destaque':
        return 'bg-amber-500 text-slate-900';
      default:
        return 'bg-slate-800 text-white';
    }
  };

  // 1. List layout mode
  if (layoutMode === 'list') {
    return (
      <article
        id={`product-card-${product.id}`}
        className="bg-white rounded-2xl border border-slate-200/90 hover:border-slate-300 hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row overflow-hidden group"
      >
        {/* Left image */}
        <div
          onClick={() => onQuickView(product)}
          className="relative w-full sm:w-48 h-44 sm:h-auto bg-slate-100 shrink-0 p-2.5 flex items-center justify-center cursor-pointer overflow-hidden"
        >
          <img
            src={product.image || '/placeholder-produto.svg'}
            alt={product.name}
            className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.src = '/placeholder-produto.svg';
            }}
          />
          {product.badge && (
            <div
              className={`absolute top-4 left-4 text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded shadow-xs ${getBadgeStyle(
                product.badge
              )}`}
            >
              {product.badge}
            </div>
          )}
          <span className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-xs text-slate-600 text-[9px] font-mono px-1.5 py-0.5 rounded border border-slate-200/80">
            {product.refCode}
          </span>
        </div>

        {/* Right info */}
        <div className="p-3.5 sm:p-5 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-1 text-xs">
              <span className="text-orange-700 font-semibold text-[10px] sm:text-[11px] uppercase tracking-wider">
                {product.category}
              </span>
              <div className="flex items-center gap-2">
                {inListQuantity > 0 && (
                  <span className="text-[10px] sm:text-[11px] text-orange-700 bg-orange-100 font-bold px-2 py-0.5 rounded-full border border-orange-200">
                    {inListQuantity} na lista
                  </span>
                )}
                <span className="flex items-center gap-1 text-[10px] sm:text-[11px] text-emerald-700 font-medium">
                  <Check className="w-3 h-3 text-emerald-600" />
                  Em estoque
                </span>
              </div>
            </div>

            <h3
              onClick={() => onQuickView(product)}
              className="font-bold text-slate-900 text-sm sm:text-base leading-snug line-clamp-2 hover:text-orange-600 cursor-pointer transition-colors mb-1.5"
            >
              {product.name}
            </h3>

            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3">
              {product.description}
            </p>
          </div>

          <div className="pt-2.5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-baseline gap-2">
              {product.oldPrice && (
                <span className="text-xs text-slate-400 line-through">
                  {formatBRL(product.oldPrice)}
                </span>
              )}
              <span className="text-lg sm:text-xl font-extrabold text-slate-950">
                {formatBRL(product.price)}
              </span>
              <span className="text-[10px] text-slate-400">Preço catálogo</span>
            </div>

            <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
              {/* Stepper */}
              <div className="flex items-center bg-slate-100 border border-slate-200 rounded-xl p-0.5">
                <button
                  type="button"
                  onClick={() => handleQtyChange(-1)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 hover:bg-white transition-colors cursor-pointer"
                  aria-label="Diminuir quantidade"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="text-xs font-bold text-slate-900 w-7 text-center">
                  {selectedQty}
                </span>
                <button
                  type="button"
                  onClick={() => handleQtyChange(1)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 hover:bg-white transition-colors cursor-pointer"
                  aria-label="Aumentar quantidade"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Add to list button */}
              <button
                type="button"
                onClick={handleAdd}
                id={`btn-add-list-${product.id}`}
                className={`py-2.5 px-4 rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer min-h-[42px] ${
                  justAdded
                    ? 'bg-emerald-600 text-white'
                    : 'bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white'
                }`}
              >
                {justAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Adicionado!</span>
                  </>
                ) : (
                  <>
                    <ListPlus className="w-4 h-4" />
                    <span>Adicionar à lista</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => onQuickView(product)}
                className="py-2.5 px-3 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 flex items-center justify-center gap-1 cursor-pointer min-h-[42px]"
                aria-label="Ver detalhes"
              >
                <Eye className="w-3.5 h-3.5 text-slate-500" />
                <span className="hidden sm:inline">Detalhes</span>
              </button>
            </div>
          </div>
        </div>
      </article>
    );
  }

  // 2. Default Grid layout mode (compact 2-col on mobile, 3-4 col on desktop)
  return (
    <article
      id={`product-card-${product.id}`}
      className="bg-white rounded-2xl border border-slate-200/90 hover:border-slate-300 hover:shadow-lg transition-all duration-200 flex flex-col justify-between group overflow-hidden"
    >
      {/* Product Image Area */}
      <div className="relative aspect-square bg-slate-100 overflow-hidden flex items-center justify-center p-2 sm:p-3">
        <img
          src={product.image || '/placeholder-produto.svg'}
          alt={product.name}
          onClick={() => onQuickView(product)}
          className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300 cursor-pointer"
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.currentTarget.src = '/placeholder-produto.svg';
          }}
        />

        {/* Badge */}
        {product.badge && (
          <div
            className={`absolute top-2 sm:top-3 left-2 sm:left-3 text-[9px] sm:text-[11px] font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded shadow-xs ${getBadgeStyle(
              product.badge
            )}`}
          >
            {product.badge}
          </div>
        )}

        {/* In list badge indicator */}
        {inListQuantity > 0 && (
          <div className="absolute bottom-2 left-2 bg-orange-600/95 text-white text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded shadow-xs backdrop-blur-xs flex items-center gap-1">
            <Check className="w-3 h-3" />
            <span>{inListQuantity} na lista</span>
          </div>
        )}

        {/* Reference Code tag (desktop & tablet) */}
        <div className="hidden sm:block absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-slate-600 text-[10px] font-mono px-2 py-0.5 rounded border border-slate-200/60 shadow-2xs">
          {product.refCode}
        </div>

        {/* Mobile Quick Tap Eye Button */}
        <button
          onClick={() => onQuickView(product)}
          className="sm:hidden absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs text-slate-700 flex items-center justify-center shadow-xs border border-slate-200 active:scale-95 transition-transform cursor-pointer"
          aria-label={`Ver detalhes de ${product.name}`}
        >
          <Eye className="w-3.5 h-3.5 text-slate-600" />
        </button>

        {/* Desktop Quick View Button on Hover */}
        <button
          onClick={() => onQuickView(product)}
          id={`quick-view-${product.id}`}
          className="hidden sm:flex absolute inset-x-4 bottom-3 py-2 bg-slate-900/85 hover:bg-slate-900 text-white text-xs font-semibold rounded-xl backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity items-center justify-center gap-1.5 shadow-md cursor-pointer"
          aria-label={`Ver detalhes de ${product.name}`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Espiar Detalhes</span>
        </button>
      </div>

      {/* Product Body Information */}
      <div className="p-2.5 sm:p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Category & Status */}
          <div className="flex items-center justify-between gap-1 mb-1 text-xs">
            <span className="text-orange-700 font-semibold text-[10px] sm:text-[11px] uppercase tracking-wider truncate">
              {product.category}
            </span>
            <span className="hidden sm:flex items-center gap-1 text-[11px] text-emerald-700 font-medium shrink-0">
              <Check className="w-3 h-3 text-emerald-600" />
              Em estoque
            </span>
          </div>

          {/* Product Name */}
          <h3
            onClick={() => onQuickView(product)}
            className="font-bold text-slate-900 text-xs sm:text-base leading-snug line-clamp-2 hover:text-orange-600 cursor-pointer transition-colors mb-1 sm:mb-2 min-h-[2rem] sm:min-h-[2.5rem]"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Short description preview (desktop) */}
          <p className="hidden sm:block text-xs text-slate-500 line-clamp-2 mb-3 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Pricing & Add to List Action */}
        <div className="pt-2 sm:pt-3 border-t border-slate-100 mt-auto">
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2 mb-2 sm:mb-3">
            <div className="flex items-baseline gap-1.5">
              {product.oldPrice && (
                <span className="text-[10px] sm:text-xs text-slate-400 line-through">
                  {formatBRL(product.oldPrice)}
                </span>
              )}
              <span className="text-sm sm:text-xl font-extrabold text-slate-950 tracking-tight">
                {formatBRL(product.price)}
              </span>
            </div>
            <span className="hidden sm:inline text-[10px] text-slate-400 ml-auto">
              Preço catálogo
            </span>
          </div>

          {/* Quantity Selector & "Adicionar à lista" button */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5">
              {/* Stepper */}
              <div className="flex items-center bg-slate-100 border border-slate-200 rounded-xl p-0.5 shrink-0">
                <button
                  type="button"
                  onClick={() => handleQtyChange(-1)}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-slate-600 hover:bg-white transition-colors cursor-pointer"
                  aria-label="Diminuir quantidade"
                >
                  <Minus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </button>
                <span className="text-xs font-bold text-slate-900 w-5 sm:w-6 text-center">
                  {selectedQty}
                </span>
                <button
                  type="button"
                  onClick={() => handleQtyChange(1)}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-slate-600 hover:bg-white transition-colors cursor-pointer"
                  aria-label="Aumentar quantidade"
                >
                  <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </button>
              </div>

              {/* Add button */}
              <button
                type="button"
                onClick={handleAdd}
                id={`btn-add-grid-${product.id}`}
                className={`flex-1 min-h-[36px] sm:min-h-[42px] py-1.5 sm:py-2 px-2 sm:px-3 rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-1 sm:gap-1.5 shadow-xs transition-all cursor-pointer group/btn active:scale-[0.98] ${
                  justAdded
                    ? 'bg-emerald-600 text-white'
                    : 'bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white'
                }`}
              >
                {justAdded ? (
                  <>
                    <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                    <span className="truncate">Adicionado</span>
                  </>
                ) : (
                  <>
                    <ListPlus className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover/btn:scale-110 transition-transform shrink-0" />
                    <span className="truncate hidden xs:inline">Adicionar à lista</span>
                    <span className="truncate xs:hidden">Adicionar</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
