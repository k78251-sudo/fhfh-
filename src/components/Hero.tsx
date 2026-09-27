import React from 'react';
import { MessageCircle, CheckCircle2, ShieldAlert } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onOpenWhatsApp: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onOpenWhatsApp }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-100/70 via-slate-50 to-white py-8 sm:py-12 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Hero Copy (Left 7 Cols) */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Tag em preto elegante */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-black text-white text-xs font-semibold mb-3 sm:mb-4 shadow-2xs border border-slate-900">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              <span>Catálogo e balcão de utilidades</span>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tight leading-[1.18] mb-3 sm:mb-4">
              Panelas, potes herméticos, caixas com travas e{' '}
              <span className="text-blue-600">
                utilidades com preço de catálogo.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-6 sm:mb-8">
              Consulte medidas em centímetros, capacidades em litros e valores de balcão para pronta-entrega.
              Selecione os produtos para montar sua lista e tire dúvidas de estoque direto com nossos atendentes.
            </p>

            {/* CTAs sem nenhuma seta */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2.5 sm:gap-3.5 mb-6 sm:mb-8">
              <button
                onClick={onExploreClick}
                id="hero-ver-catalogo-btn"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm shadow-xs transition-colors flex items-center justify-center cursor-pointer min-h-[44px]"
              >
                <span>Ver catálogo de produtos</span>
              </button>

              <button
                onClick={onOpenWhatsApp}
                id="hero-whatsapp-btn"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white hover:bg-slate-100 active:bg-slate-200 text-slate-900 font-semibold text-sm border border-slate-300 shadow-2xs transition-colors flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Consultar estoque no WhatsApp</span>
              </button>
            </div>

            {/* Value bullets concretos */}
            <div className="pt-4 border-t border-slate-200 grid grid-cols-3 gap-2 sm:gap-3 text-left">
              <div className="flex flex-col sm:flex-row items-start gap-1.5 sm:gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-bold text-slate-900 leading-tight">71 produtos</h3>
                  <p className="text-[11px] text-slate-500 hidden sm:block">Cozinha, organização e limpeza</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start gap-1.5 sm:gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-bold text-slate-900 leading-tight">Sem cadastro</h3>
                  <p className="text-[11px] text-slate-500 hidden sm:block">Lista enviada direto no chat</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start gap-1.5 sm:gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-bold text-slate-900 leading-tight">Preços à vista</h3>
                  <p className="text-[11px] text-slate-500 hidden sm:block">Valores reais sem taxas extras</p>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Showcase (Right 5 Cols) - Card Estático Firme, Sem Efeitos Excessivos */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm relative z-10">
                <div className="relative rounded-xl overflow-hidden bg-slate-100 aspect-4/3 mb-3">
                  <img
                    src="/banners/banner-1.jpg"
                    alt="Jogo de Potes Herméticos em Vidro e Tampa de Bambu"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    loading="eager"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-black text-white text-[11px] font-semibold px-2.5 py-0.5 rounded shadow-xs">
                    Destaque da semana
                  </div>
                  <div className="absolute bottom-2.5 right-2.5 bg-white text-slate-950 text-xs font-bold px-2.5 py-1 rounded border border-slate-200 shadow-2xs">
                    R$ 89,90 <span className="text-[10px] text-slate-500 font-normal">jogo com 5</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-blue-700">
                      Cozinha & Organização
                    </span>
                    <span className="text-[11px] text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                      Pronta-entrega
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">
                    Jogo de 5 Potes Herméticos com Tampa em Bambu
                  </h3>
                  <p className="text-xs text-slate-600">
                    Vidro borossilicato com anel de silicone para vedação. Capacidades: 350ml, 500ml, 800ml, 1,2L e 1,8L.
                  </p>
                </div>
              </div>

              {/* Tag informativa da loja física */}
              <div className="hidden sm:flex items-center gap-2 bg-black text-white rounded-lg px-3 py-1.5 text-xs absolute -top-3 -right-2 z-20 shadow-md border border-slate-800">
                <ShieldAlert className="w-3.5 h-3.5 text-sky-400" />
                <span>Consulta de estoque e retirada</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
