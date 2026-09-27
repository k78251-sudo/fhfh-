import React from 'react';
import { Category } from '../types';
import {
  CookwarePotIcon,
  LatchStorageBoxIcon,
  SpinMopBucketIcon,
  ReedDiffuserIcon,
  ThermalTumblerIcon,
  SoapPumpBathroomIcon,
} from './RealProductIcons';

interface CategoriesGridProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (slug: string) => void;
}

// Mapeamento para os ícones desenhados com base nos produtos reais da loja
const getCategoryProductIcon = (slug: string) => {
  switch (slug) {
    case 'cozinha':
      return <CookwarePotIcon className="w-5 h-5" />;
    case 'organizacao':
      return <LatchStorageBoxIcon className="w-5 h-5" />;
    case 'limpeza':
      return <SpinMopBucketIcon className="w-5 h-5" />;
    case 'decoracao':
      return <ReedDiffuserIcon className="w-5 h-5" />;
    case 'presentes':
      return <ThermalTumblerIcon className="w-5 h-5" />;
    case 'banheiro':
      return <SoapPumpBathroomIcon className="w-5 h-5" />;
    default:
      return <CookwarePotIcon className="w-5 h-5" />;
  }
};

export const CategoriesGrid: React.FC<CategoriesGridProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  const handleCategoryClick = (slug: string) => {
    onSelectCategory(slug);
    const el = document.getElementById('catalogo-produtos');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const cozinhaCat = categories.find((c) => c.slug === 'cozinha') || categories[0];
  const otherCategories = categories.filter((c) => c.slug !== 'cozinha');

  const isCozinhaSelected = selectedCategory === 'cozinha';

  return (
    <section id="categorias" className="py-8 sm:py-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Cabeçalho da Seção sem label em caixa alta */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-950 tracking-tight">
              Departamentos da Loja
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Panelas antiaderentes, potes herméticos, caixas com travas e utilidades organizadas por setor
            </p>
          </div>

          <button
            onClick={() => handleCategoryClick('todos')}
            id="ver-todos-categorias-btn"
            className="self-start sm:self-auto text-xs font-semibold text-slate-700 hover:text-blue-600 transition-colors cursor-pointer py-1 px-2.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-slate-50"
          >
            Exibir catálogo completo
          </button>
        </div>

        {/* Grade com destaque autêntico para a categoria mais vendida (Cozinha & Panelas) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4">
          {/* Card em Destaque: Cozinha & Mesa (Mais procurada no balcão da loja) */}
          {cozinhaCat && (
            <div
              className={`lg:col-span-5 rounded-2xl border p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden transition-colors ${
                isCozinhaSelected
                  ? 'border-blue-600 ring-2 ring-blue-500/20 bg-blue-50/50'
                  : 'border-blue-200 bg-gradient-to-br from-blue-50/70 via-sky-50/30 to-white hover:border-blue-400'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-600 text-white shadow-2xs">
                    Mais procurada na loja
                  </span>
                  <span className="text-xs font-mono font-medium text-slate-600">
                    {cozinhaCat.itemCount} modelos em estoque
                  </span>
                </div>

                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs shrink-0">
                    {getCategoryProductIcon('cozinha')}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-950 text-base sm:text-lg leading-tight">
                      {cozinhaCat.name}
                    </h3>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Frigideiras antiaderentes, caçarolas, potes herméticos de bambu e espátulas de silicone
                    </p>
                  </div>
                </div>

                {/* Tags reais de subprodutos da loja */}
                <div className="flex flex-wrap gap-1.5 my-3">
                  {['Panelas & Frigideiras', 'Potes Herméticos', 'Facas & Tábuas', 'Silicone'].map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] px-2 py-0.5 rounded-md bg-white border border-blue-200 text-blue-950 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleCategoryClick('cozinha')}
                id="cat-featured-cozinha-btn"
                className="w-full mt-2 py-2.5 px-4 rounded-xl bg-black hover:bg-slate-900 active:bg-slate-950 text-white text-xs font-bold flex items-center justify-center transition-colors cursor-pointer shadow-xs"
              >
                Abrir departamento de cozinha
              </button>
            </div>
          )}

          {/* Demais 5 categorias dispostas em grid equilibrado com ícones reais de produtos */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3">
            {otherCategories.map((cat) => {
              const isSelected = selectedCategory === cat.slug;
              return (
                <button
                  key={cat.id}
                  id={`cat-card-${cat.slug}`}
                  onClick={() => handleCategoryClick(cat.slug)}
                  className={`text-left p-3 rounded-xl border flex flex-col justify-between transition-colors cursor-pointer relative bg-white group ${
                    isSelected
                      ? 'border-blue-600 ring-2 ring-blue-500/20 bg-blue-50/40'
                      : 'border-slate-200 hover:border-slate-900 hover:shadow-2xs'
                  }`}
                >
                  <div>
                    <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center mb-2.5 shadow-2xs group-hover:bg-blue-600 transition-colors">
                      {getCategoryProductIcon(cat.slug)}
                    </div>

                    <h4 className="font-semibold text-slate-900 text-xs sm:text-sm leading-snug">
                      {cat.name}
                    </h4>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span>{cat.itemCount} itens</span>
                    <span className="font-bold text-black group-hover:text-blue-600 transition-colors">Ver</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
