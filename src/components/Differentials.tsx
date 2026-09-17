import React from 'react';
import { Layers, Coins, Zap, HeartHandshake, ShieldCheck } from 'lucide-react';

export const Differentials: React.FC = () => {
  const differentials = [
    {
      icon: <Layers className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />,
      badge: 'Variedade Real',
      title: 'Mais de 2.000 Itens Úteis',
      description:
        'De utensílios do cotidiano aos organizadores que transformam seus armários, reunimos soluções inteligentes para todo o seu lar.',
    },
    {
      icon: <Coins className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />,
      badge: 'Economia',
      title: 'Preço Justo e Transparente',
      description:
        'Valores competitivos sem taxas ocultas de plataformas. Você consulta o preço real e aproveita promoções semanais exclusivas.',
    },
    {
      icon: <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />,
      badge: 'Agilidade',
      title: 'Separação Imediata',
      description:
        'Ao confirmar o interesse no WhatsApp, nossa equipe reserva o item no balcão para retirada expressa ou envio ágil.',
    },
    {
      icon: <HeartHandshake className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />,
      badge: 'Cuidado',
      title: 'Atendimento Humanizado',
      description:
        'Nada de robôs confusos. Nossos atendentes enviam fotos de detalhes, confirmam dimensões e ajudam na sua escolha.',
    },
  ];

  return (
    <section id="diferenciais" className="py-10 sm:py-16 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-orange-600 mb-1.5 block">
            Por que escolher o Império
          </span>
          <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            A conveniência do digital com o carinho do comércio de bairro
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Construímos uma experiência prática para você equipar e cuidar do seu lar com economia e tranquilidade.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {differentials.map((item, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-3 sm:mb-4">
                  {item.icon}
                </div>
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-orange-700 bg-orange-100/70 px-2 py-0.5 rounded-full inline-block mb-1.5 sm:mb-2">
                  {item.badge}
                </span>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-1 sm:mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 sm:pt-4 mt-3 sm:mt-4 border-t border-slate-200/60 flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold text-emerald-700">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Garantia de Qualidade</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
