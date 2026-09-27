import React from 'react';

interface IconProps {
  className?: string;
}

/**
 * Ícones desenhados especificamente para produtos reais da loja de utilidades domésticas:
 * - Panela caçarola com tampa e alças de silicone
 * - Caixa organizadora com travas de clique laterais
 * - Balde com cesto centrífuga e mop giratório
 * - Frasco difusor de aromas com varetas de bambu
 * - Copo térmico em inox com tampa dosadora
 * - Frasco pump para sabonete líquido e porta-escovas
 */

export const CookwarePotIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {/* Puxador da tampa */}
    <path d="M10 4h4a1 1 0 0 1 1 1v1h-6V5a1 1 0 0 1 1-1z" fill="currentColor" fillOpacity="0.15" />
    {/* Tampa abaulada da panela */}
    <path d="M4 8.5c1.5-2 4-2.5 8-2.5s6.5.5 8 2.5H4z" />
    {/* Borda da panela */}
    <rect x="3.5" y="8.5" width="17" height="1.8" rx="0.9" fill="currentColor" fillOpacity="0.2" />
    {/* Corpo da caçarola */}
    <path d="M4.5 10.3v5.2c0 2.5 2.5 4.5 7.5 4.5s7.5-2 7.5-4.5v-5.2" />
    {/* Alça lateral esquerda */}
    <path d="M4 11.5H2a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1h2" />
    {/* Alça lateral direita */}
    <path d="M20 11.5h2a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1h-2" />
  </svg>
);

export const LatchStorageBoxIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {/* Tampa da caixa organizadora */}
    <rect x="3" y="5" width="18" height="3" rx="1" fill="currentColor" fillOpacity="0.1" />
    {/* Friso da tampa */}
    <line x1="8" y1="5" x2="8" y2="8" />
    <line x1="16" y1="5" x2="16" y2="8" />
    {/* Corpo transparente da caixa com reforço */}
    <path d="M4 8v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" />
    {/* Trava de clique lateral esquerda */}
    <rect x="2" y="7" width="2" height="4" rx="0.5" fill="currentColor" />
    {/* Trava de clique lateral direita */}
    <rect x="20" y="7" width="2" height="4" rx="0.5" fill="currentColor" />
    {/* Visor / nervura frontal da caixa plástica */}
    <rect x="7" y="12" width="10" height="5" rx="1" strokeDasharray="2 2" />
  </svg>
);

export const SpinMopBucketIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {/* Balde oval de limpeza */}
    <path d="M3 9h14l-1.5 10a2 2 0 0 1-2 1.8H6.5a2 2 0 0 1-2-1.8L3 9z" />
    {/* Alça do balde erguida */}
    <path d="M4.5 9C4.5 5 8 3 10 3s5.5 2 5.5 6" />
    {/* Cesto centrífuga circular inox */}
    <ellipse cx="10" cy="11.5" rx="4" ry="2" fill="currentColor" fillOpacity="0.2" />
    {/* Cabo do mop telescópico inclinado */}
    <line x1="17" y1="21" x2="22" y2="3" strokeWidth="2" />
    {/* Disco do esfregão na ponta */}
    <path d="M14.5 21h5l-1-2h-3z" fill="currentColor" />
  </svg>
);

export const ReedDiffuserIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {/* Varetas de bambu em leque */}
    <line x1="12" y1="12" x2="6" y2="2" />
    <line x1="12" y1="12" x2="12" y2="1.5" />
    <line x1="12" y1="12" x2="18" y2="2" />
    {/* Gargalo do frasco de vidro */}
    <rect x="10" y="11" width="4" height="2" rx="0.5" fill="currentColor" />
    {/* Frasco bojudo de perfume para ambiente */}
    <path d="M9 13h6c1.5 0 2.5 1.2 2.5 2.8v4.4a1.8 1.8 0 0 1-1.8 1.8H8.3A1.8 1.8 0 0 1 6.5 20.2v-4.4C6.5 14.2 7.5 13 9 13z" />
    {/* Linha do líquido aromático */}
    <line x1="8" y1="18" x2="16" y2="18" strokeDasharray="1.5 1.5" />
  </svg>
);

export const ThermalTumblerIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {/* Bocal da tampa térmica */}
    <rect x="8" y="2.5" width="8" height="2" rx="1" fill="currentColor" fillOpacity="0.2" />
    {/* Tampa de rosca com anel */}
    <rect x="6" y="4.5" width="12" height="2.5" rx="0.8" fill="currentColor" />
    {/* Corpo cônico do copo térmico de inox */}
    <path d="M6.5 7l1.2 12.2a2 2 0 0 0 2 1.8h4.6a2 2 0 0 0 2-1.8L17.5 7H6.5z" />
    {/* Faixa de pegada emborrachada / anel metálico */}
    <line x1="7.2" y1="11" x2="16.8" y2="11" />
    <line x1="7.6" y1="14" x2="16.4" y2="14" />
  </svg>
);

export const SoapPumpBathroomIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {/* Bico dosador curvo do pump */}
    <path d="M8 3h4a1 1 0 0 1 1 1v2" />
    <path d="M8 3L6 4.5" />
    {/* Pistão do dosador */}
    <rect x="10" y="5.5" width="2" height="2.5" fill="currentColor" />
    {/* Tampa do dispenser de bancada */}
    <rect x="7.5" y="8" width="7" height="1.8" rx="0.5" fill="currentColor" fillOpacity="0.3" />
    {/* Frasco cerâmico de sabonete líquido */}
    <rect x="7" y="9.8" width="8" height="11.2" rx="2" />
    {/* Copo porta-escovas ao lado */}
    <path d="M17 14v6.5a1.5 1.5 0 0 0 1.5 1.5h1a1.5 1.5 0 0 0 1.5-1.5V14" />
    {/* Escova de dente dentro do copo */}
    <line x1="19" y1="14" x2="19" y2="9" />
    <path d="M19 9h2V7h-2z" fill="currentColor" fillOpacity="0.2" />
  </svg>
);
