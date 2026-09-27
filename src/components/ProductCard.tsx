import React, { useState } from 'react';
import { Star, ShoppingCart, Check, Eye } from 'lucide-react';
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
  const [justAdded, setJustAdded] = useState<boolean>(false);

  const formatBRL = (val: number) => {
    return val.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const handleAdd = () => {
    onAddToList(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
  };

  // Category short uppercase label (e.g. COZINHA, ORGANIZAÇÃO)
  const getCategoryShort = (cat: string) => {
    const c = cat.toLowerCase();
    if (c.includes('cozinha')) return 'COZINHA';
    if (c.includes('organiza')) return 'ORGANIZAÇÃO';
    if (c.includes('limpeza')) return 'LIMPEZA';
    if (c.includes('decora')) return 'DECORAÇÃO';
    if (c.includes('presente')) return 'PRESENTES';
    if (c.includes('banheiro')) return 'BANHEIRO';
    return cat.split('&')[0].trim().toUpperCase();
  };

  // Deterministic realistic rating and reviews matching screenshot format
  const getProductRating = () => {
    if (product.rating) return product.rating;
    const hash = product.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const ratings = [4.9, 4.8, 5.0, 4.9, 4.9, 4.8];
    return ratings[hash % ratings.length];
  };

  const getProductReviews = () => {
    if (product.reviewsCount) return product.reviewsCount;
    const hash = product.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return 150 + (hash % 160);
  };

  // Old price and discount percent matching screenshot
  const effectiveOldPrice =
    product.oldPrice && product.oldPrice > product.price
      ? product.oldPrice
      : Math.round(product.price * 1.35 * 10) / 10;

  const discountPercent = Math.max(
    10,
    Math.round(((effectiveOldPrice - product.price) / effectiveOldPrice) * 100)
  );

  const badgeText = product.badge
    ? product.badge.toUpperCase()
    : discountPercent >= 25
    ? 'MAIS VENDIDO'
    : 'DESTAQUE';

  // Installments calculation: e.g. em até 4x de R$ 22,47 sem juros
  const installmentsCount = product.price >= 80 ? 4 : product.price >= 45 ? 3 : 2;
  const installmentValue = product.price / installmentsCount;

  const rating = getProductRating();
  const reviewsCount = getProductReviews();

  // 1. List layout mode (if user toggles to list)
  if (layoutMode === 'list') {
    return (
      <article
        id={`product-card-${product.id}`}
        className="bg-white rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all flex flex-col sm:flex-row overflow-hidden group"
      >
        {/* Left image area */}
        <div className="relative w-full sm:w-56 h-52 sm:h-auto bg-[#f8fafc] shrink-0 p-3 sm:p-4 flex items-center justify-center cursor-pointer overflow-hidden border-b sm:border-b-0 sm:border-r border-slate-100">
          <img
            src={product.image || '/placeholder-produto.svg'}
            alt={product.name}
            onClick={() => onQuickView(product)}
            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.src = '/placeholder-produto.svg';
            }}
          />

          {/* Top-left stacked badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-col items-start gap-1 z-10 pointer-events-none">
            <span className="bg-[#ea580c] text-white text-[10px] sm:text-[11px] font-black px-2 py-0.5 rounded-md tracking-wide uppercase shadow-xs">
              -{discountPercent}% OFF
            </span>
            <span className="bg-[#0b1329] text-white text-[9px] sm:text-[10px] font-black px-2 py-0.5 rounded-md tracking-wider uppercase shadow-xs">
              {badgeText}
            </span>
          </div>

          {inListQuantity > 0 && (
            <span className="absolute top-2.5 right-2.5 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs">
              {inListQuantity} no carrinho
            </span>
          )}
        </div>

        {/* Right info area */}
        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
          <div>
            <span className="text-blue-600 font-extrabold text-[11px] sm:text-xs tracking-wider uppercase mb-1 block">
              {getCategoryShort(product.category)}
            </span>

            <h3
              onClick={() => onQuickView(product)}
              className="font-product-title text-[15px] sm:text-[16px] leading-[1.3] line-clamp-2 hover:text-blue-600 cursor-pointer transition-colors mb-2"
              title={product.name}
            >
              {product.name}
            </h3>

            {/* Stars rating row */}
            <div className="flex items-center gap-1 mb-3">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-bold text-slate-900 text-xs sm:text-sm ml-1">
                {rating.toFixed(1)}
              </span>
              <span className="text-slate-400 text-xs font-normal">
                ({reviewsCount})
              </span>
            </div>

            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
              {product.description}
            </p>
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs text-slate-400 line-through font-normal">
                {formatBRL(effectiveOldPrice)}
              </div>
              <div className="text-2xl font-black text-slate-950 tracking-tight leading-tight my-0.5">
                {formatBRL(product.price)}
              </div>
              <div className="text-xs text-slate-500 font-medium">
                em até {installmentsCount}x de {formatBRL(installmentValue)} sem juros
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleAdd}
                id={`btn-add-cart-list-${product.id}`}
                className={`py-3 px-5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer min-h-[44px] active:scale-[0.98] ${
                  justAdded
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#0b1329] hover:bg-black active:bg-slate-900 text-white'
                }`}
              >
                {justAdded ? (
                  <>
                    <Check className="w-4 h-4 stroke-[2.5]" />
                    <span>Adicionado ao carrinho!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4 stroke-[2.2]" />
                    <span>Adicionar ao carrinho</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => onQuickView(product)}
                className="py-3 px-3.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 flex items-center justify-center gap-1.5 cursor-pointer min-h-[44px]"
                aria-label="Ver detalhes"
              >
                <Eye className="w-4 h-4 text-slate-500" />
                <span>Detalhes</span>
              </button>
            </div>
          </div>
        </div>
      </article>
    );
  }

  // 2. Default Grid layout mode (Exact match to user's screenshot format)
  return (
    <article
      id={`product-card-${product.id}`}
      className="bg-white rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
    >
      {/* Product Image Area */}
      <div className="relative aspect-square bg-[#f8fafc] overflow-hidden flex items-center justify-center p-3 sm:p-5 border-b border-slate-100">
        <img
          src={product.image || '/placeholder-produto.svg'}
          alt={product.name}
          onClick={() => onQuickView(product)}
          className="w-full h-full object-contain mix-blend-multiply cursor-pointer group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.currentTarget.src = '/placeholder-produto.svg';
          }}
        />

        {/* Top-Left Stacked Badges (-30% OFF and MAIS VENDIDO) */}
        <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 flex flex-col items-start gap-1 z-10 pointer-events-none">
          <span className="bg-[#ea580c] text-white text-[10px] sm:text-xs font-black px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md tracking-wide uppercase shadow-xs">
            -{discountPercent}% OFF
          </span>
          <span className="bg-[#0b1329] text-white text-[9px] sm:text-[10px] font-black px-2 py-0.5 sm:px-2.5 sm:py-0.5 rounded-md tracking-wider uppercase shadow-xs">
            {badgeText}
          </span>
        </div>

        {/* In list badge indicator (Top Right) */}
        {inListQuantity > 0 && (
          <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 bg-blue-600 text-white text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs flex items-center gap-1 z-10">
            <Check className="w-3 h-3 stroke-[2.5]" />
            <span>{inListQuantity} no carrinho</span>
          </div>
        )}

        {/* Quick View Button on Hover */}
        <button
          onClick={() => onQuickView(product)}
          id={`quick-view-${product.id}`}
          className="hidden sm:flex absolute inset-x-4 bottom-3 py-2 bg-black/85 hover:bg-black text-white text-xs font-bold rounded-xl backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity items-center justify-center gap-1.5 shadow-md cursor-pointer z-10"
          aria-label={`Ver detalhes de ${product.name}`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Espiar Detalhes</span>
        </button>
      </div>

      {/* Product Body Information */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Category in bold blue uppercase */}
          <span className="text-blue-600 font-extrabold text-[11px] sm:text-xs tracking-wider uppercase mb-1 block">
            {getCategoryShort(product.category)}
          </span>

          {/* Product Name */}
          <h3
            onClick={() => onQuickView(product)}
            className="font-product-title text-[14px] sm:text-[15px] md:text-[16px] leading-[1.3] line-clamp-2 hover:text-blue-600 cursor-pointer transition-colors mb-2 min-h-[2.5rem]"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Rating Row: 5 Amber Stars + Score + (Review count) */}
          <div className="flex items-center gap-1 mb-2.5">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="font-bold text-slate-900 text-xs sm:text-sm ml-1">
              {rating.toFixed(1)}
            </span>
            <span className="text-slate-400 text-xs font-normal">
              ({reviewsCount})
            </span>
          </div>
        </div>

        {/* Pricing & Add to Cart Button */}
        <div className="pt-1">
          {/* Strikethrough Old Price */}
          <div className="text-xs text-slate-400 line-through font-normal">
            {formatBRL(effectiveOldPrice)}
          </div>

          {/* Current Bold Price */}
          <div className="text-2xl sm:text-[26px] font-black text-slate-950 tracking-tight leading-none my-1">
            {formatBRL(product.price)}
          </div>

          {/* Installments line */}
          <div className="text-[11px] sm:text-xs text-slate-500 font-medium mb-3.5">
            em até {installmentsCount}x de {formatBRL(installmentValue)} sem juros
          </div>

          {/* "Adicionar ao carrinho" CTA Button */}
          <button
            type="button"
            onClick={handleAdd}
            id={`btn-add-cart-${product.id}`}
            className={`w-full py-3 px-3.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer min-h-[44px] active:scale-[0.98] ${
              justAdded
                ? 'bg-emerald-600 text-white shadow-emerald-600/20'
                : 'bg-[#0b1329] hover:bg-black active:bg-slate-900 text-white'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-4 h-4 stroke-[2.5]" />
                <span>Adicionado ao carrinho!</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4 stroke-[2.2]" />
                <span>Adicionar ao carrinho</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
