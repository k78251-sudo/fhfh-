import React from 'react';
import {
  Store,
  Instagram,
  Facebook,
  MessageCircle,
  ArrowUp,
  ShieldAlert,
  Heart,
} from 'lucide-react';
import { Category } from '../types';

interface FooterProps {
  categories: Category[];
  onSelectCategory: (slug: string) => void;
  onOpenWhatsApp: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  categories,
  onSelectCategory,
  onOpenWhatsApp,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToCatalogCategory = (slug: string) => {
    onSelectCategory(slug);
    const el = document.getElementById('catalogo-produtos');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-900">
      {/* Top Banner Disclaimer */}
      <div className="bg-slate-900/90 border-b border-slate-800 py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-amber-300/90 text-center text-[11px]">
          <ShieldAlert className="w-4 h-4 shrink-0 text-amber-400" />
          <span>
            <strong>Ambiente Demonstrativo Fictício:</strong> Catálogo sem carrinho de compra ou
            checkout. Dados como CNPJ, endereço e telefone utilizam marcações genéricas propositais.
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand & Mission (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-orange-600 text-white flex items-center justify-center shadow-md shadow-orange-600/20">
                <Store className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-lg text-white tracking-tight">
                Empório das Utilidades
              </span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Catálogo digital moderno e organizado para apresentação de soluções práticas em
              utensílios de cozinha, organização inteligente, limpeza e decoração.
            </p>

            {/* Social Media Placeholders */}
            <div>
              <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block mb-2.5">
                Redes Sociais (Demonstrativo):
              </span>
              <div className="flex items-center gap-2">
                <a
                  href="#redes"
                  onClick={(e) => e.preventDefault()}
                  className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-slate-800"
                  title="Instagram [@emporiodasutilidades.demo]"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="#redes"
                  onClick={(e) => e.preventDefault()}
                  className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-slate-800"
                  title="Facebook [/emporiodasutilidades.demo]"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <button
                  onClick={onOpenWhatsApp}
                  className="h-8 px-3 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 flex items-center gap-1.5 transition-colors border border-emerald-800/60 cursor-pointer"
                  title="WhatsApp [Telefone Fictício]"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-emerald-400" />
                  <span className="text-[11px] font-semibold">WhatsApp [Telefone]</span>
                </button>
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">
                Instagram: [@emporiodasutilidades.demo]
              </span>
            </div>
          </div>

          {/* Department Links (1 col) */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              Departamentos
            </h4>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => scrollToCatalogCategory(cat.slug)}
                    className="hover:text-white transition-colors text-left cursor-pointer"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation Links (1 col) */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              Institucional
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#diferenciais" className="hover:text-white transition-colors">
                  Diferenciais do Empório
                </a>
              </li>
              <li>
                <a href="#localizacao-horarios" className="hover:text-white transition-colors">
                  Localização da Loja Física
                </a>
              </li>
              <li>
                <a href="#localizacao-horarios" className="hover:text-white transition-colors">
                  Horário de Funcionamento
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenWhatsApp}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Tirar Dúvidas via WhatsApp
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Placeholders (1 col) */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              Dados de Demonstração
            </h4>
            <div className="space-y-2 text-[11px] leading-relaxed">
              <p>
                <strong className="text-slate-300">CNPJ:</strong>
                <br />
                [CNPJ Fictício]
              </p>
              <p>
                <strong className="text-slate-300">Endereço:</strong>
                <br />
                [Endereço Fictício da Loja] — [Cidade - UF]
              </p>
              <p>
                <strong className="text-slate-300">Telefone:</strong>
                <br />
                [Telefone Fictício]
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright and legal disclaimer */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="text-[11px] text-slate-400">
              © 2026 Empório das Utilidades — Catálogo Digital Demonstrativo. Todos os direitos reservados.
            </p>
            <p className="text-[10px] text-slate-400 mt-0.5">
              Projeto sem fins comerciais com dados estritamente fictícios para fins de apresentação.
            </p>
          </div>

          <button
            onClick={scrollToTop}
            id="footer-back-to-top-btn"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors cursor-pointer"
            aria-label="Voltar ao topo da página"
          >
            <span>Voltar ao topo</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
