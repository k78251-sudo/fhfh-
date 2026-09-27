import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  UtensilsCrossed,
  Boxes,
  Sparkles,
  MessageCircle,
  ShoppingBag,
  Pause,
  Play
} from 'lucide-react';

interface BannerSlide {
  id: number;
  badge: string;
  badgeIcon: React.ReactNode;
  badgeColor: string;
  title: string;
  highlightText: string;
  subtitle: string;
  image: string;
  fallbackImage: string;
  primaryBtnText: string;
  primaryBtnAction: 'category-cozinha' | 'category-organizacao' | 'catalog';
  secondaryBtnText: string;
  secondaryBtnAction: 'whatsapp' | 'simulation';
  tag: string;
}

interface RotatingBannerProps {
  onSelectCategory: (slug: string) => void;
  onOpenWhatsApp: () => void;
  onOpenSimulation: () => void;
}

const BANNER_SLIDES: BannerSlide[] = [
  {
    id: 1,
    badge: 'Cozinha & Panelas',
    badgeIcon: <UtensilsCrossed className="w-3.5 h-3.5" />,
    badgeColor: 'bg-blue-500/20 text-blue-200 border-blue-400/40',
    title: 'Panelas antiaderentes, potes de vidro e',
    highlightText: 'tábuas de bambu',
    subtitle: 'Caçarolas com revestimento cerâmico, potes herméticos com anel de silicone e espátulas resistentes para seu dia a dia.',
    image: '/banners/banner-1.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1600&q=80',
    primaryBtnText: 'Ver linha de cozinha',
    primaryBtnAction: 'category-cozinha',
    secondaryBtnText: 'Consultar no WhatsApp',
    secondaryBtnAction: 'whatsapp',
    tag: 'Mais procurados'
  },
  {
    id: 2,
    badge: 'Organização',
    badgeIcon: <Boxes className="w-3.5 h-3.5" />,
    badgeColor: 'bg-emerald-500/20 text-emerald-200 border-emerald-400/40',
    title: 'Caixas com travas, colmeias de gaveta e',
    highlightText: 'suportes aramados',
    subtitle: 'Caixas organizadoras transparentes de 5L a 40L, gaveteiros modulares e cestos para manter armários e despensas em ordem.',
    image: '/banners/banner-2.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1600&q=80',
    primaryBtnText: 'Ver organizadores',
    primaryBtnAction: 'category-organizacao',
    secondaryBtnText: 'Simular lista de compras',
    secondaryBtnAction: 'simulation',
    tag: 'Linha modular'
  },
  {
    id: 3,
    badge: 'Limpeza & Casa',
    badgeIcon: <Sparkles className="w-3.5 h-3.5" />,
    badgeColor: 'bg-sky-500/20 text-sky-200 border-sky-400/40',
    title: 'Mops giratórios com balde centrífuga e',
    highlightText: 'difusores de aroma',
    subtitle: 'Mop esfregão para porcelanatos e pisos laminados, baldes reforçados, difusores e dispensers para bancada.',
    image: '/banners/banner-3.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1600&q=80',
    primaryBtnText: 'Ver catálogo completo',
    primaryBtnAction: 'catalog',
    secondaryBtnText: 'Tirar dúvidas no WhatsApp',
    secondaryBtnAction: 'whatsapp',
    tag: 'Pronta-entrega'
  }
];

export const RotatingBanner: React.FC<RotatingBannerProps> = ({
  onSelectCategory,
  onOpenWhatsApp,
  onOpenSimulation
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartXRef = useRef<number | null>(null);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const totalSlides = BANNER_SLIDES.length;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto-play interval (rotates faster: 3.2s)
  useEffect(() => {
    if (isPaused) {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
      return;
    }

    autoPlayTimerRef.current = setInterval(() => {
      nextSlide();
    }, 3200);

    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [isPaused, nextSlide]);

  // Handle Primary Button Click
  const handlePrimaryAction = (action: BannerSlide['primaryBtnAction']) => {
    if (action === 'category-cozinha') {
      onSelectCategory('cozinha');
    } else if (action === 'category-organizacao') {
      onSelectCategory('organizacao');
    } else {
      const el = document.getElementById('catalogo-produtos');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle Secondary Button Click
  const handleSecondaryAction = (action: BannerSlide['secondaryBtnAction']) => {
    if (action === 'whatsapp') {
      onOpenWhatsApp();
    } else {
      onOpenSimulation();
    }
  };

  // Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartXRef.current - touchEndX;

    // Minimum swipe threshold 40px
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    touchStartXRef.current = null;
  };

  return (
    <section
      id="top-rotating-banner"
      aria-label="Destaques e Ofertas em Carrossel Giratório"
      className="relative w-full bg-slate-950 overflow-hidden border-b border-slate-800 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides Container */}
      <div className="relative w-full min-h-[360px] sm:min-h-[400px] md:min-h-[440px] lg:min-h-[480px]">
        {BANNER_SLIDES.map((slide, index) => {
          const isActive = index === currentSlide;

          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
              }`}
              aria-hidden={!isActive}
            >
              {/* Background Image with Fallback */}
              <div className="absolute inset-0">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover object-center scale-105 transition-transform duration-7000 ease-out"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = slide.fallbackImage;
                  }}
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
                {/* Multi-stage High-Contrast Dark Gradient Overlay for flawless text legibility */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/30 sm:to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-black/40" />
              </div>

              {/* Slide Content Content Box */}
              <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center py-8 sm:py-12 md:py-16">
                <div className="max-w-2xl text-left">
                  {/* Top Badge & Tag */}
                  <div className="flex flex-wrap items-center gap-2 mb-3 sm:mb-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold backdrop-blur-md border shadow-xs ${slide.badgeColor}`}
                    >
                      {slide.badgeIcon}
                      <span>{slide.badge}</span>
                    </span>

                    <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-white/15 text-slate-200 backdrop-blur-xs border border-white/20">
                      {slide.tag}
                    </span>
                  </div>

                  {/* Title & Highlight */}
                  <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.15] mb-2 sm:mb-4 drop-shadow-sm">
                    {slide.title}{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-blue-200 to-white">
                      {slide.highlightText}
                    </span>
                  </h2>

                  {/* Subtitle */}
                  <p className="text-xs sm:text-sm md:text-base text-slate-200/90 leading-relaxed mb-6 sm:mb-8 line-clamp-3 sm:line-clamp-none max-w-xl drop-shadow-xs">
                    {slide.subtitle}
                  </p>

                  {/* Call to Action Buttons - Sem nenhuma seta */}
                  <div className="flex flex-wrap items-center gap-2.5 sm:gap-4">
                    <button
                      onClick={() => handlePrimaryAction(slide.primaryBtnAction)}
                      id={`banner-primary-btn-${slide.id}`}
                      className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold text-xs sm:text-sm shadow-md transition-colors flex items-center justify-center cursor-pointer min-h-[42px]"
                    >
                      <span>{slide.primaryBtnText}</span>
                    </button>

                    <button
                      onClick={() => handleSecondaryAction(slide.secondaryBtnAction)}
                      id={`banner-secondary-btn-${slide.id}`}
                      className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-white/10 hover:bg-white/20 active:bg-white/30 text-white font-medium text-xs sm:text-sm border border-white/25 backdrop-blur-md transition-all flex items-center gap-2 cursor-pointer shadow-xs"
                    >
                      {slide.secondaryBtnAction === 'whatsapp' ? (
                        <MessageCircle className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
                      ) : (
                        <ShoppingBag className="w-4 h-4 text-sky-300" />
                      )}
                      <span>{slide.secondaryBtnText}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Arrow Controls */}
      <div className="absolute inset-y-0 left-2 sm:left-4 z-20 flex items-center">
        <button
          type="button"
          onClick={prevSlide}
          id="banner-prev-slide-btn"
          aria-label="Slide anterior"
          className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-slate-950/60 hover:bg-slate-900 text-white flex items-center justify-center border border-white/15 backdrop-blur-md shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      <div className="absolute inset-y-0 right-2 sm:right-4 z-20 flex items-center">
        <button
          type="button"
          onClick={nextSlide}
          id="banner-next-slide-btn"
          aria-label="Próximo slide"
          className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-slate-950/60 hover:bg-slate-900 text-white flex items-center justify-center border border-white/15 backdrop-blur-md shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Bottom Bar: Dots, Slide Counter & Auto-Play Pause Toggle */}
      <div className="absolute bottom-3 sm:bottom-4 inset-x-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Slide Indicator Dots */}
          <div className="flex items-center gap-2">
            {BANNER_SLIDES.map((slide, idx) => {
              const isSelected = idx === currentSlide;
              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => goToSlide(idx)}
                  id={`banner-dot-${idx + 1}`}
                  aria-label={`Ir para slide ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'w-7 sm:w-9 bg-blue-500 shadow-sm shadow-blue-500/50'
                      : 'w-2 sm:w-2.5 bg-white/40 hover:bg-white/70'
                  }`}
                />
              );
            })}
          </div>

          {/* Slide counter & Pause/Play Indicator */}
          <div className="flex items-center gap-2.5 bg-slate-950/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 text-white text-[11px] font-mono">
            <span>
              0{currentSlide + 1} / 0{totalSlides}
            </span>
            <button
              type="button"
              onClick={() => setIsPaused((prev) => !prev)}
              id="banner-pause-toggle-btn"
              title={isPaused ? 'Continuar rotação automática' : 'Pausar rotação'}
              className="text-slate-300 hover:text-white transition-colors cursor-pointer p-0.5"
            >
              {isPaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
