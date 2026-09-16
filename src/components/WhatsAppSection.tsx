import React from 'react';
import { MessageCircle, Send } from 'lucide-react';

interface WhatsAppSectionProps {
  onOpenWhatsApp: (topic?: string) => void;
}

export const WhatsAppSection: React.FC<WhatsAppSectionProps> = ({
  onOpenWhatsApp,
}) => {
  const quickTopics = [
    {
      label: 'Consultar disponibilidade em estoque',
      topic: 'disponibilidade e estoque de produtos',
    },
    {
      label: 'Lista de casamento ou casa nova',
      topic: 'montagem de lista de presentes / enxoval',
    },
    {
      label: 'Dúvidas sobre medidas e materiais',
      topic: 'detalhes técnicos e dimensões dos produtos',
    },
    {
      label: 'Orçamento para compra em quantidade',
      topic: 'condições especiais para atacado/volume',
    },
  ];

  return (
    <section id="contato-whatsapp" className="py-10 sm:py-16 bg-gradient-to-b from-white to-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-br from-emerald-900 via-emerald-850 to-teal-950 rounded-3xl p-5 sm:p-12 text-white shadow-xl relative overflow-hidden">
          {/* Background decorative circles */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
            {/* Left Col (7 cols) */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs text-emerald-200 text-[11px] sm:text-xs font-semibold">
                <MessageCircle className="w-3.5 h-3.5 fill-emerald-300" />
                <span>Atendimento Direto & Personalizado</span>
              </div>

              <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
                Viu algo que gostou? Fale conosco pelo{' '}
                <span className="text-emerald-300 underline decoration-emerald-500/40">WhatsApp</span>!
              </h2>

              <p className="text-xs sm:text-base text-emerald-100/90 leading-relaxed max-w-xl">
                Não precisa preencher cadastros longos ou criar senhas. Nosso catálogo é feito para
                você escolher com facilidade e confirmar a reserva diretamente com a equipe.
              </p>

              {/* Step Process */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-1 sm:pt-2">
                <div className="p-2.5 sm:p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
                  <span className="text-[10px] sm:text-xs font-bold text-emerald-300 block mb-0.5">Passo 1</span>
                  <p className="text-[10px] sm:text-xs text-emerald-50 font-medium leading-tight">
                    Escolha o produto.
                  </p>
                </div>
                <div className="p-2.5 sm:p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
                  <span className="text-[10px] sm:text-xs font-bold text-emerald-300 block mb-0.5">Passo 2</span>
                  <p className="text-[10px] sm:text-xs text-emerald-50 font-medium leading-tight">
                    Toque em interesse.
                  </p>
                </div>
                <div className="p-2.5 sm:p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
                  <span className="text-[10px] sm:text-xs font-bold text-emerald-300 block mb-0.5">Passo 3</span>
                  <p className="text-[10px] sm:text-xs text-emerald-50 font-medium leading-tight">
                    Combine no WhatsApp.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Col: Interactive consultation box (5 cols) */}
            <div className="lg:col-span-5 bg-white text-slate-800 p-4 sm:p-7 rounded-2xl shadow-xl border border-white/20">
              <div className="flex items-center gap-3 pb-3 sm:pb-4 border-b border-slate-100">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs sm:text-sm shrink-0">
                  EU
                </div>
                <div>
                  <h3 className="font-bold text-xs sm:text-sm text-slate-900">
                    Balcão Virtual de Atendimento
                  </h3>
                  <p className="text-[10px] sm:text-[11px] text-slate-500">
                    Número Fictício: <span className="font-mono font-semibold">[Telefone]</span>
                  </p>
                </div>
              </div>

              <div className="py-3 sm:py-4 space-y-2">
                <p className="text-[11px] sm:text-xs font-bold text-slate-700 uppercase tracking-wide">
                  Selecione o assunto da sua mensagem:
                </p>
                <div className="space-y-1.5">
                  {quickTopics.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => onOpenWhatsApp(item.topic)}
                      id={`whatsapp-topic-${idx}`}
                      className="w-full text-left p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 border border-slate-200 text-xs text-slate-700 hover:text-emerald-900 transition-all flex items-center justify-between group cursor-pointer min-h-[42px]"
                    >
                      <span className="font-medium truncate mr-1">{item.label}</span>
                      <Send className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 transition-colors shrink-0" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Main CTA button */}
              <button
                onClick={() => onOpenWhatsApp('consulta geral de catálogo')}
                id="main-whatsapp-section-cta"
                className="w-full py-3 sm:py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition-all cursor-pointer min-h-[46px]"
              >
                <MessageCircle className="w-4 h-4 fill-white shrink-0" />
                <span>Conversar no WhatsApp</span>
              </button>

              <p className="text-[10px] text-center text-slate-400 mt-2">
                Demonstração fictícia • Sem cobrança online • Atendimento ágil
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
