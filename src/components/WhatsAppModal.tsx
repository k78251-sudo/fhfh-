import React, { useState } from 'react';
import { MessageCircle, X, Copy, Check, ExternalLink, ShieldAlert } from 'lucide-react';
import { Product } from '../types';

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  customTopic?: string;
}

export const WhatsAppModal: React.FC<WhatsAppModalProps> = ({
  isOpen,
  onClose,
  product,
  customTopic,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Format currency
  const formatBRL = (val: number) => {
    return val.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  // Generate pre-filled message
  const generatedMessage = product
    ? `Olá! Estava navegando no catálogo digital do Empório das Utilidades e tenho interesse no item:\n\n📦 Produto: ${product.name}\n🔖 Ref: ${product.refCode}\n💰 Preço de Catálogo: ${formatBRL(product.price)}\n\nPoderiam me confirmar se está disponível para pronta-entrega ou retirada na loja? Obrigado!`
    : `Olá! Estava navegando no catálogo digital do Empório das Utilidades e gostaria de tirar uma dúvida sobre ${
        customTopic || 'produtos e disponibilidade'
      }. Poderiam me atender? Obrigado!`;

  const encodedMessage = encodeURIComponent(generatedMessage);
  const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150 p-0 sm:p-4">
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal / Bottom Sheet */}
      <div
        className="relative z-10 bg-white rounded-t-3xl sm:rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] sm:max-h-[90vh] animate-in slide-in-from-bottom duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Mobile Pull Handle */}
        <div className="pt-2.5 pb-1 flex justify-center sm:hidden bg-emerald-600">
          <div className="w-12 h-1.5 bg-emerald-400/80 rounded-full" />
        </div>

        {/* Modal Header */}
        <div className="bg-emerald-600 px-4 sm:px-5 py-3.5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
              <MessageCircle className="w-5 h-5 fill-white" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base leading-none">
                Consultar via WhatsApp
              </h3>
              <p className="text-[11px] text-emerald-100 mt-0.5">
                Atendimento direto pelo número fictício [Telefone]
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            id="close-whatsapp-modal-btn"
            className="p-1.5 rounded-lg hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-3.5">
          {/* Fictional Project Notice */}
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <span className="font-bold block">Aviso de Projeto Demonstrativo:</span>
              Catálogo de demonstração com dados fictícios: <strong className="underline decoration-amber-400">[Telefone Fictício]</strong>. O texto da mensagem já está pronto para testar o envio!
            </div>
          </div>

          {/* Product summary if triggered for a specific product */}
          {product && (
            <div className="flex items-center gap-3 p-2.5 sm:p-3 bg-slate-50 rounded-xl border border-slate-200/80">
              <img
                src={product.image || '/placeholder-produto.svg'}
                alt={product.name}
                className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-lg bg-white shrink-0 border border-slate-200"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src = '/placeholder-produto.svg';
                }}
              />
              <div className="min-w-0 flex-1">
                <span className="text-[9px] sm:text-[10px] font-mono text-slate-500 uppercase">
                  {product.refCode} • {product.category}
                </span>
                <h4 className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                  {product.name}
                </h4>
                <p className="text-xs font-extrabold text-orange-600 mt-0.5">
                  {formatBRL(product.price)}
                </p>
              </div>
            </div>
          )}

          {/* Message Preview Box */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center justify-between">
              <span>Mensagem Pré-preenchida</span>
              <span className="text-[10px] text-slate-400 font-normal">Editável</span>
            </label>
            <textarea
              readOnly
              rows={product ? 4 : 3}
              value={generatedMessage}
              className="w-full text-xs font-sans p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none resize-none leading-relaxed select-all"
            />
          </div>

          {/* Quick guidance */}
          <div className="text-[11px] text-slate-500 space-y-1 bg-slate-50/80 p-2.5 rounded-xl border border-slate-100">
            <p className="font-semibold text-slate-700">Como funciona:</p>
            <p>1. O atendente recebe os dados exatos e a referência do produto.</p>
            <p>2. Você combina retirada na loja ou entrega diretamente no chat.</p>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-3 sm:p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-end gap-2 pb-[calc(1rem+env(safe-area-inset-bottom,0px))]">
          <button
            type="button"
            onClick={handleCopy}
            id="copy-whatsapp-msg-btn"
            className="w-full sm:w-auto px-4 py-3 sm:py-2.5 rounded-xl border border-slate-300 hover:bg-white text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer min-h-[44px]"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Mensagem Copiada!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>Copiar Mensagem</span>
              </>
            )}
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="open-whatsapp-direct-link"
            className="w-full sm:w-auto px-5 py-3 sm:py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer min-h-[44px]"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Abrir no WhatsApp</span>
            <ExternalLink className="w-3.5 h-3.5 text-emerald-200" />
          </a>
        </div>
      </div>
    </div>
  );
};
