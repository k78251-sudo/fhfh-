import React, { useState } from 'react';
import { X, Check, Box, Ruler, ShieldCheck, Plus, Minus, ListPlus, ClipboardList } from 'lucide-react';
import { Product } from '../types';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToList: (product: Product, quantity: number) => void;
  onOpenSimulation: () => void;
  inListQuantity?: number;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToList,
  onOpenSimulation,
  inListQuantity = 0,
}) => {
  const [qty, setQty] = useState<number>(1);
  const [added, setAdded] = useState<boolean>(false);

  if (!product) return null;

  const formatBRL = (val: number) => {
    return val.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const handleAdd = () => {
    onAddToList(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150 p-0 sm:p-4">
      {/* Backdrop tap to close */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Dialog */}
      <div
        className="relative z-10 bg-white rounded-t-3xl sm:rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] sm:max-h-[90vh] animate-in slide-in-from-bottom duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Mobile Pull Handle */}
        <div className="pt-2.5 pb-1 flex justify-center sm:hidden">
          <div className="w-12 h-1.5 bg-slate-200 rounded-full" />
        </div>

        {/* Header */}
        <div className="px-4 sm:px-5 py-3 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2 truncate">
            <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">
              {product.category}
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs font-mono text-slate-500">Ref: {product.refCode}</span>
            {inListQuantity > 0 && (
              <span className="text-[11px] bg-orange-100 text-orange-800 font-bold px-2 py-0.5 rounded-full">
                {inListQuantity} na lista
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            id="close-product-modal-btn"
            className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
            aria-label="Fechar detalhes"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 items-start">
            {/* Image */}
            <div className="aspect-square bg-slate-100 rounded-2xl overflow-hidden relative border border-slate-200 max-h-64 sm:max-h-none mx-auto w-full">
              <img
                src={product.image || '/placeholder-produto.svg'}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src = '/placeholder-produto.svg';
                }}
              />
              {product.badge && (
                <span className="absolute top-3 left-3 bg-orange-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-xs">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Main Info */}
            <div className="space-y-3 sm:space-y-4">
              <div>
                <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold mb-1">
                  <Check className="w-4 h-4" />
                  <span>Disponível no catálogo</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                  {product.name}
                </h3>
              </div>

              {/* Price Box */}
              <div className="p-3 sm:p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
                <span className="text-[11px] text-slate-500 block mb-0.5">Preço sugerido catálogo:</span>
                <div className="flex items-baseline gap-2">
                  {product.oldPrice && (
                    <span className="text-xs sm:text-sm text-slate-400 line-through">
                      {formatBRL(product.oldPrice)}
                    </span>
                  )}
                  <span className="text-xl sm:text-2xl font-extrabold text-slate-950">
                    {formatBRL(product.price)}
                  </span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-slate-500 mt-1">
                  Preço e disponibilidade para simulação e confirmação de estoque.
                </p>
              </div>

              {/* Specs Pills */}
              <div className="space-y-1.5 text-xs text-slate-600">
                {product.dimensions && (
                  <div className="flex items-center gap-2">
                    <Ruler className="w-4 h-4 text-slate-400 shrink-0" />
                    <span><strong>Dimensões:</strong> {product.dimensions}</span>
                  </div>
                )}
                {product.material && (
                  <div className="flex items-center gap-2">
                    <Box className="w-4 h-4 text-slate-400 shrink-0" />
                    <span><strong>Material:</strong> {product.material}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Description & Features */}
          <div className="border-t border-slate-100 pt-4 space-y-2.5">
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider text-slate-400">
              Descrição do Produto
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {product.description}
            </p>

            {product.features && product.features.length > 0 && (
              <div className="pt-2">
                <h5 className="text-[11px] font-bold text-slate-800 uppercase tracking-wide mb-2">
                  Destaques:
                </h5>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                  {product.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Sticky Footer actions */}
        <div className="p-3 sm:p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 pb-[calc(1rem+env(safe-area-inset-bottom,0px))]">
          {/* Quantity Stepper */}
          <div className="flex items-center justify-between w-full sm:w-auto gap-3">
            <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl p-1 shadow-2xs">
              <span className="text-xs text-slate-500 px-2 font-medium">Qtd:</span>
              <button
                type="button"
                onClick={() => setQty((prev) => Math.max(1, prev - 1))}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-700 hover:bg-slate-100 cursor-pointer"
                aria-label="Diminuir"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="text-sm font-bold text-slate-900 w-8 text-center">
                {qty}
              </span>
              <button
                type="button"
                onClick={() => setQty((prev) => prev + 1)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-700 hover:bg-slate-100 cursor-pointer"
                aria-label="Aumentar"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            <span className="text-xs text-slate-500 sm:hidden">
              Subtotal: <strong className="text-slate-900">{formatBRL(product.price * qty)}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Add to List */}
            <button
              onClick={handleAdd}
              id="modal-product-add-to-list-btn"
              className={`flex-1 sm:flex-none px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer min-h-[46px] ${
                added
                  ? 'bg-emerald-600 text-white'
                  : 'bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Adicionado à lista!</span>
                </>
              ) : (
                <>
                  <ListPlus className="w-4 h-4" />
                  <span>Adicionar à lista ({qty})</span>
                </>
              )}
            </button>

            {/* View List CTA */}
            <button
              onClick={() => {
                onClose();
                onOpenSimulation();
              }}
              className="px-3.5 py-2.5 rounded-xl border border-slate-300 hover:bg-white text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer min-h-[46px]"
              title="Abrir lista de consulta"
            >
              <ClipboardList className="w-4 h-4 text-slate-600" />
              <span className="hidden sm:inline">Ver Lista</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
