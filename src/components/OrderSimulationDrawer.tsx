import React, { useState } from 'react';
import {
  X,
  Plus,
  Minus,
  Trash2,
  MessageCircle,
  Copy,
  Check,
  ClipboardList,
  AlertCircle,
  Info,
  ArrowRight,
} from 'lucide-react';
import { SimulationItem } from '../types';

interface OrderSimulationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: SimulationItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearList: () => void;
  onGoToCatalog: () => void;
}

export const OrderSimulationDrawer: React.FC<OrderSimulationDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearList,
  onGoToCatalog,
}) => {
  const [customerPhone, setCustomerPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const formatBRL = (val: number) => {
    return val.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const totalEstimated = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);

  // Phone input formatting: (XX) XXXXX-XXXX or (XX) XXXX-XXXX
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '');
    let formatted = raw;

    if (raw.length > 11) {
      formatted = raw.slice(0, 11);
    }

    if (formatted.length > 6) {
      if (formatted.length > 10) {
        // (XX) XXXXX-XXXX
        formatted = `(${formatted.slice(0, 2)}) ${formatted.slice(2, 7)}-${formatted.slice(7)}`;
      } else {
        // (XX) XXXX-XXXX
        formatted = `(${formatted.slice(0, 2)}) ${formatted.slice(2, 6)}-${formatted.slice(6)}`;
      }
    } else if (formatted.length > 2) {
      formatted = `(${formatted.slice(0, 2)}) ${formatted.slice(2)}`;
    } else if (formatted.length > 0) {
      formatted = `(${formatted}`;
    }

    setCustomerPhone(formatted);
    if (phoneError) {
      setPhoneError('');
    }
  };

  const cleanDigits = customerPhone.replace(/\D/g, '');

  const buildSimulationMessage = () => {
    const itemsListText = items
      .map(
        (item, index) =>
          `${index + 1}. *${item.product.name}*\n   • Ref: ${item.product.refCode}\n   • Qtd: ${item.quantity} un.\n   • Unitário: ${formatBRL(
            item.product.price
          )} | Subtotal: ${formatBRL(item.product.price * item.quantity)}`
      )
      .join('\n\n');

    const notesSection = notes.trim()
      ? `\n\n📝 *Observações / Dúvidas do Cliente:*\n"${notes.trim()}"`
      : '';

    return `🛍️ *SIMULAÇÃO DE CONSULTA - IMPÉRIO DAS UTILIDADES*\n` +
      `📦 Catálogo Digital de Demonstração\n` +
      `📅 Data/Hora: ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}\n\n` +
      `*Itens Selecionados (${totalQuantity} ${totalQuantity === 1 ? 'unidade' : 'unidades'}):*\n\n` +
      `${itemsListText}\n\n` +
      `💰 *Total Estimado de Catálogo:* ${formatBRL(totalEstimated)}` +
      `${notesSection}\n\n` +
      `---\n` +
      `📱 *Simulação gerada para o número:* ${customerPhone || '[Não informado]'}\n` +
      `⚠️ *Nota:* Esta é uma mensagem de simulação enviada para seu próprio WhatsApp demonstrando o fluxo de consulta de disponibilidade do Império das Utilidades.`;
  };

  const handleConsultWhatsApp = () => {
    if (!cleanDigits || cleanDigits.length < 10) {
      setPhoneError('Por favor, insira um número de WhatsApp válido com DDD (mínimo 10 dígitos).');
      const input = document.getElementById('simulation-phone-input');
      if (input) input.focus();
      return;
    }

    setPhoneError('');
    const message = buildSimulationMessage();
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/55${cleanDigits}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
  };

  const handleCopySummary = () => {
    const message = buildSimulationMessage();
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Simulação de Pedido e Consulta"
    >
      {/* Backdrop tap to close */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Drawer Panel */}
      <div className="relative z-10 w-full max-w-lg bg-white shadow-2xl flex flex-col h-full overflow-hidden animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="px-5 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
              <ClipboardList className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-slate-900 text-base leading-tight flex items-center gap-2">
                <span>Lista de Consulta</span>
                {totalQuantity > 0 && (
                  <span className="text-xs font-bold bg-orange-600 text-white px-2 py-0.5 rounded-full">
                    {totalQuantity} {totalQuantity === 1 ? 'item' : 'itens'}
                  </span>
                )}
              </h2>
              <p className="text-[11px] text-slate-500">
                Simule seu pedido e consulte a disponibilidade
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {items.length > 0 && (
              <button
                type="button"
                onClick={onClearList}
                className="text-xs text-slate-400 hover:text-rose-600 px-2 py-1 rounded transition-colors cursor-pointer"
                title="Esvaziar toda a lista"
              >
                Limpar
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
              aria-label="Fechar lista"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Drawer Content */}
        {items.length === 0 ? (
          <div className="flex-1 p-6 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-orange-50 border border-orange-200 text-orange-600 flex items-center justify-center shadow-xs">
              <ClipboardList className="w-8 h-8 stroke-[1.5]" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">Sua lista está vazia</h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-xs mt-1 leading-relaxed">
                Navegue pelo nosso catálogo e clique em &ldquo;Adicionar à lista&rdquo; nos produtos
                que deseja consultar.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                onClose();
                onGoToCatalog();
              }}
              className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
            >
              <span>Explorar catálogo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
            {/* Products List */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Produtos Escolhidos ({items.length})
              </h3>

              <div className="space-y-2.5">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    id={`simulation-item-${item.product.id}`}
                    className="p-3 bg-slate-50 rounded-xl border border-slate-200/90 flex items-center gap-3 transition-all hover:bg-white hover:shadow-xs"
                  >
                    {/* Thumbnail */}
                    <img
                      src={item.product.image || '/placeholder-produto.svg'}
                      alt={item.product.name}
                      className="w-14 h-14 object-cover rounded-lg bg-white border border-slate-200 shrink-0"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder-produto.svg';
                      }}
                    />

                    {/* Info */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[10px] font-mono text-slate-500 uppercase">
                          Ref: {item.product.refCode}
                        </span>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-slate-400 hover:text-rose-600 p-1 rounded transition-colors cursor-pointer"
                          title="Remover produto da lista"
                          aria-label={`Remover ${item.product.name}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 truncate" title={item.product.name}>
                        {item.product.name}
                      </h4>

                      <div className="flex items-center justify-between mt-1.5 pt-1 border-t border-slate-200/50">
                        {/* Quantity Stepper */}
                        <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg p-0.5">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                            className="w-6 h-6 rounded flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                            aria-label="Diminuir quantidade"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-slate-900 w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                            className="w-6 h-6 rounded flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                            aria-label="Aumentar quantidade"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price & Subtotal */}
                        <div className="text-right">
                          <span className="text-[10px] text-slate-400 block">
                            {item.quantity > 1 ? `${item.quantity}x ${formatBRL(item.product.price)} = ` : ''}
                          </span>
                          <span className="font-extrabold text-xs sm:text-sm text-slate-950">
                            {formatBRL(item.product.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Total Estimated Box */}
            <div className="p-3.5 bg-orange-50/70 border border-orange-200/80 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-orange-900 uppercase tracking-wider block">
                  Total Estimado da Consulta
                </span>
                <span className="text-[10px] text-orange-700">
                  Preços sujeitos à confirmação de estoque
                </span>
              </div>
              <div className="text-right">
                <span className="text-xl font-extrabold text-orange-950 block">
                  {formatBRL(totalEstimated)}
                </span>
              </div>
            </div>

            {/* Observações Livres Field */}
            <div>
              <label
                htmlFor="simulation-notes-input"
                className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1"
              >
                Observações ou Dúvidas (Opcional)
              </label>
              <textarea
                id="simulation-notes-input"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                placeholder="Ex: Preciso para entrega hoje, tem em outra cor, preferência de horário para retirada..."
                className="w-full text-xs p-3 bg-slate-50 focus:bg-white border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all resize-none"
              />
            </div>

            {/* Customer WhatsApp Input with Validation */}
            <div>
              <label
                htmlFor="simulation-phone-input"
                className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center justify-between"
              >
                <span>Seu WhatsApp com DDD</span>
                <span className="text-[10px] text-orange-600 font-semibold lowercase">obrigatório para envio</span>
              </label>
              <div className="relative">
                <input
                  type="tel"
                  id="simulation-phone-input"
                  value={customerPhone}
                  onChange={handlePhoneChange}
                  placeholder="(11) 99999-9999"
                  maxLength={15}
                  className={`w-full text-sm font-semibold p-3 bg-slate-50 focus:bg-white border rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                    phoneError
                      ? 'border-rose-400 focus:ring-rose-500/20 focus:border-rose-500'
                      : 'border-slate-200 focus:ring-emerald-500/20 focus:border-emerald-500'
                  }`}
                />
              </div>
              {phoneError ? (
                <p className="text-[11px] text-rose-600 font-medium mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{phoneError}</span>
                </p>
              ) : (
                <p className="text-[10px] text-slate-500 mt-1">
                  Insira o seu número para simular a consulta e receber o resumo no seu próprio WhatsApp.
                </p>
              )}
            </div>

            {/* Aviso Obrigatório */}
            <div className="p-3 bg-blue-50 border border-blue-200/80 rounded-xl text-xs text-blue-900 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div className="leading-relaxed text-[11px]">
                <strong className="font-bold block">Aviso de Simulação:</strong>
                Isso é uma simulação — você vai receber a mensagem da consulta no seu próprio WhatsApp.
              </div>
            </div>
          </div>
        )}

        {/* Drawer Actions Footer */}
        {items.length > 0 && (
          <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-2 pb-[calc(1rem+env(safe-area-inset-bottom,0px))]">
            {/* Primary Action: WhatsApp Simulation */}
            <button
              type="button"
              onClick={handleConsultWhatsApp}
              id="btn-simular-whatsapp"
              className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition-all cursor-pointer min-h-[46px]"
            >
              <MessageCircle className="w-4 h-4 fill-white shrink-0" />
              <span>Consultar disponibilidade via WhatsApp</span>
            </button>

            {/* Fallback Action: Copiar resumo */}
            <button
              type="button"
              onClick={handleCopySummary}
              id="btn-copiar-resumo-lista"
              className="w-full py-2.5 px-3 rounded-xl border border-slate-300 hover:bg-white text-slate-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer min-h-[40px]"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-bold">Resumo da lista copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>Copiar resumo da lista</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
