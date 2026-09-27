import React from 'react';
import { Layers, Coins, Zap, HeartHandshake, CheckCircle2 } from 'lucide-react';

export const Differentials: React.FC = () => {
  const differentials = [
    {
      icon: <Layers className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />,
      badge: 'Estoque real',
      title: '71 Itens em linha física',
      description:
        'Panelas antiaderentes, caixas organizadoras com travas, mops giratórios e garrafas térmicas com conferência frequente no estoque.',
    },
    {
      icon: <Coins className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />,
      badge: 'Preço à vista',
      title: 'Valores reais de balcão',
      description:
        'Preços transparentes de loja de utilidades, sem taxas adicionais de marketplace ou intermediação de plataformas.',
    },
    {
      icon: <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />,
      badge: 'Pronta-entrega',
      title: 'Separação no balcão',
      description:
        'Ao enviar sua lista pelo WhatsApp, nossa equipe separa os produtos na loja física para você retirar com rapidez.',
    },
    {
      icon: <HeartHandshake className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />,
      badge: 'Tire dúvidas',
      title: 'Fotos reais e medidas',
      description:
        'Quer saber se o pote cabe na sua gaveta ou ver a espessura da panela? Nossos atendentes mandam fotos e medidas pelo chat.',
    },
  ];

  return (
    <section id="diferenciais" className="py-10 sm:py-14 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header sem caixa alta */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-950 tracking-tight">
            Como funciona o atendimento da loja
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Pesquise medidas, litragens e preços no catálogo e conclua seu pedido direto pelo balcão no WhatsApp.
          </p>
        </div>

        {/* 4 Cards Grid - Estáveis, sem sombras artificiais exageradas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {differentials.map((item, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-900 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center mb-3 shadow-xs group-hover:scale-105 transition-transform">
                  {item.icon}
                </div>
                <span className="text-xs font-semibold text-blue-800 bg-blue-100/70 px-2 py-0.5 rounded inline-block mb-2">
                  {item.badge}
                </span>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-200 flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Conferido pelo balcão</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
