import React from 'react';
import { MapPin, Clock, Car, Store, Navigation, ShieldAlert } from 'lucide-react';

export const StoreLocation: React.FC = () => {
  return (
    <section id="localizacao-horarios" className="py-10 sm:py-16 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200/70 text-slate-700 text-[11px] sm:text-xs font-semibold mb-2">
            <Store className="w-3.5 h-3.5 text-orange-600" />
            <span>Estrutura Física Fictícia</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Localização & Horário de Funcionamento
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 sm:mt-2">
            Venha retirar seus pedidos reservados no balcão ou consultar as novidades pessoalmente
          </p>
        </div>

        {/* Fictional Disclaimer Banner */}
        <div className="mb-6 sm:mb-8 p-3.5 sm:p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-2.5 sm:gap-3 max-w-3xl mx-auto text-amber-900 text-xs leading-relaxed">
          <ShieldAlert className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong className="block font-bold">Nota de Demonstração (Projeto Fictício):</strong>
            Por se tratar de um catálogo de demonstração, os dados de localização e telefone são estritamente ilustrativos ({'[Endereço]'}, {'[Telefone]'} e {'[CNPJ]'}).
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch max-w-5xl mx-auto">
          {/* Information Column (6 cols) */}
          <div className="lg:col-span-6 bg-white p-4 sm:p-8 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between space-y-4 sm:space-y-6">
            <div>
              {/* Address */}
              <div className="flex items-start gap-3 mb-4 sm:mb-6">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-xs sm:text-sm">
                    Endereço da Loja Modelo
                  </h3>
                  <p className="text-xs text-slate-700 font-semibold mt-0.5">
                    [Endereço Fictício da Loja - Demonstração, nº 000]
                  </p>
                  <p className="text-xs text-slate-500">
                    [Bairro Fictício] — [Cidade Fictícia - UF]
                  </p>
                  <p className="text-[10px] sm:text-[11px] font-mono text-slate-400 mt-0.5">
                    CEP: [00000-000] • Ponto de Referência: [Próximo à Praça Central]
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3 mb-4 sm:mb-6">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 text-xs sm:text-sm mb-1.5 sm:mb-2">
                    Horário de Atendimento
                  </h3>
                  <ul className="space-y-1 text-xs text-slate-600">
                    <li className="flex items-center justify-between border-b border-slate-100 pb-1">
                      <span>Segunda a Sexta:</span>
                      <strong className="text-slate-900 font-semibold">08h30 às 18h30</strong>
                    </li>
                    <li className="flex items-center justify-between border-b border-slate-100 pb-1">
                      <span>Sábados:</span>
                      <strong className="text-slate-900 font-semibold">08h30 às 15h00</strong>
                    </li>
                    <li className="flex items-center justify-between text-slate-400">
                      <span>Domingos e Feriados:</span>
                      <span>Fechado</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Facilitators */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <Car className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-xs sm:text-sm">
                    Facilidades para Clientes
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                    Vagas rápidas para retirada de mercadorias no balcão e rampa de acessibilidade.
                  </p>
                </div>
              </div>
            </div>

            {/* Fictional contact pill */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between text-xs">
              <span className="text-slate-500">Central de Atendimento:</span>
              <strong className="text-slate-900 font-mono">[Telefone Fictício]</strong>
            </div>
          </div>

          {/* Schematic Map Representation (6 cols) */}
          <div className="lg:col-span-6 bg-white p-4 sm:p-6 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
            <div className="relative rounded-xl overflow-hidden bg-slate-100 border border-slate-200 aspect-16/10 flex items-center justify-center min-h-[180px]">
              <div className="absolute inset-0 opacity-40 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] bg-[size:28px_28px]" />

              <div className="absolute w-full h-4 bg-slate-300 top-1/2 -translate-y-1/2 transform -rotate-12" />
              <div className="absolute h-full w-4 bg-slate-300 left-1/2 -translate-x-1/2 transform rotate-6" />

              <div className="relative z-10 flex flex-col items-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-orange-600 text-white flex items-center justify-center shadow-lg">
                  <Store className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="mt-2 bg-slate-950 text-white text-[10px] sm:text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md whitespace-nowrap">
                  Empório das Utilidades
                </div>
                <span className="text-[9px] sm:text-[10px] text-slate-600 bg-white/90 px-2 py-0.5 rounded mt-1 font-mono border border-slate-200">
                  [Endereço Fictício]
                </span>
              </div>

              <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-xs text-slate-600 text-[9px] sm:text-[10px] font-semibold px-2 py-0.5 rounded border border-slate-200">
                Mapa Ilustrativo Fictício
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span className="flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                Rota ilustrativa
              </span>
              <span className="font-semibold text-slate-700">[Cidade - UF]</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
