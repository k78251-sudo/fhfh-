import React from 'react';
import { ArrowDown, MessageCircle, Sparkles, CheckCircle2, ShieldAlert } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onOpenWhatsApp: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onOpenWhatsApp }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-100/70 via-slate-50 to-white py-8 sm:py-14 md:py-16 border-b border-slate-200/80">
      {/* Subtle geometric pattern background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#0f172a_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* Main Hero Copy (Left 7 Cols) */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Pill tag */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100/80 border border-orange-200 text-orange-800 text-[11px] sm:text-xs font-semibold mb-3 sm:mb-5 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-orange-600" />
              <span>Catálogo Digital Interativo 2026</span>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tight leading-[1.18] mb-3 sm:mb-4">
              Tudo o que a sua casa precisa, com{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600">
                praticidade e preço justo.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-6 sm:mb-8">
              Explore nossa seleção completa de utilidades para cozinha, organização inteligente,
              limpeza e decoração. Veja valores e reserve diretamente pelo WhatsApp sem complicação.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2.5 sm:gap-3.5 mb-6 sm:mb-10">
              <button
                onClick={onExploreClick}
                id="hero-ver-catalogo-btn"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white font-semibold text-sm shadow-md shadow-orange-600/20 hover:shadow-lg transition-all flex items-center justify-center gap-2 group cursor-pointer min-h-[46px]"
              >
                <span>Ver catálogo completo</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={onOpenWhatsApp}
                id="hero-whatsapp-btn"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-800 font-semibold text-sm border border-slate-300 hover:border-slate-400 shadow-2xs transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[46px]"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                <span>Consultar no WhatsApp</span>
              </button>
            </div>

            {/* Value bullets */}
            <div className="pt-4 sm:pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-2 sm:gap-3 text-left">
              <div className="flex flex-col sm:flex-row items-start gap-1.5 sm:gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-[11px] sm:text-xs font-bold text-slate-900 leading-tight">+2.000 Itens</h3>
                  <p className="text-[10px] sm:text-[11px] text-slate-500 hidden sm:block">Cozinha e organização</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start gap-1.5 sm:gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-[11px] sm:text-xs font-bold text-slate-900 leading-tight">Sem Carrinho</h3>
                  <p className="text-[10px] sm:text-[11px] text-slate-500 hidden sm:block">Negocie direto no chat</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start gap-1.5 sm:gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-[11px] sm:text-xs font-bold text-slate-900 leading-tight">Preço Justo</h3>
                  <p className="text-[10px] sm:text-[11px] text-slate-500 hidden sm:block">Valores transparentes</p>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Showcase Collage (Right 5 Cols) */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Highlight Card */}
              <div className="bg-white rounded-2xl p-3 sm:p-4 shadow-xl border border-slate-200 relative z-10">
                <div className="relative rounded-xl overflow-hidden bg-slate-100 aspect-4/3 mb-3 sm:mb-4">
                  <img
                    src="/placeholder-produto.svg"
                    alt="Potes Herméticos com Tampa de Bambu"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    loading="eager"
                  />
                  <div className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-orange-600 text-white text-[10px] sm:text-[11px] font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded shadow-xs">
                    Mais Vendido da Semana
                  </div>
                  <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 bg-white/95 backdrop-blur-xs text-slate-900 text-xs font-extrabold px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg shadow-sm border border-slate-200">
                    R$ 89,90 <span className="text-[10px] text-slate-400 font-normal">jogo</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] sm:text-xs font-semibold text-orange-600 uppercase tracking-wide">
                      Cozinha & Organização
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                      Em estoque
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-xs sm:text-sm">
                    Jogo de 5 Potes Herméticos com Trava em Bambu
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-500 line-clamp-2">
                    Vidro borossilicato com vedação 100% à prova de ar. Mantém o frescor e padroniza seus armários.
                  </p>
                </div>
              </div>

              {/* Decorative Floater 1: Fast WhatsApp Order */}
              <div className="hidden sm:flex items-center gap-3 bg-white rounded-xl p-3 shadow-lg border border-slate-200 absolute -bottom-5 -left-6 z-20 max-w-xs">
                <div className="w-9 h-9 rounded-lg bg-emerald-500 text-white flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5 fill-white" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Interesse em um clique</p>
                  <p className="text-[11px] text-slate-500">O produto já vai pré-preenchido no chat</p>
                </div>
              </div>

              {/* Decorative Floater 2: Fictional Notice Tag */}
              <div className="hidden sm:flex items-center gap-2 bg-slate-900 text-slate-200 rounded-lg px-3 py-1.5 text-[11px] absolute -top-3 -right-3 z-20 shadow-md">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                <span>Demonstração de Catálogo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
