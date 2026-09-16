import React, { useState } from 'react';
import { CATEGORIES, PRODUCTS } from './data/products';
import { Product, SimulationItem } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoriesGrid } from './components/CategoriesGrid';
import { CatalogSection } from './components/CatalogSection';
import { Differentials } from './components/Differentials';
import { StoreLocation } from './components/StoreLocation';
import { WhatsAppSection } from './components/WhatsAppSection';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { WhatsAppModal } from './components/WhatsAppModal';
import { MobileBottomBar } from './components/MobileBottomBar';
import { MobileCategorySheet } from './components/MobileCategorySheet';
import { OrderSimulationDrawer } from './components/OrderSimulationDrawer';
import { MessageCircle, ClipboardList } from 'lucide-react';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  // Modals & Sheets state
  const [activeProductForWhatsApp, setActiveProductForWhatsApp] = useState<Product | null>(null);
  const [whatsAppTopic, setWhatsAppTopic] = useState<string | undefined>(undefined);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState<boolean>(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isMobileCategorySheetOpen, setIsMobileCategorySheetOpen] = useState<boolean>(false);

  // Simulation order list state
  const [simulationList, setSimulationList] = useState<SimulationItem[]>([]);
  const [isSimulationOpen, setIsSimulationOpen] = useState<boolean>(false);

  // Add product to simulation list with quantity
  const handleAddToList = (product: Product, quantity: number = 1) => {
    setSimulationList((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      }
      return [...prev, { product, quantity }];
    });
  };

  // Update item quantity in simulation list
  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromList(productId);
      return;
    }
    setSimulationList((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Remove single product from simulation list
  const handleRemoveFromList = (productId: string) => {
    setSimulationList((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Clear entire simulation list
  const handleClearList = () => {
    setSimulationList([]);
  };

  // Trigger general WhatsApp consultation
  const handleGeneralWhatsApp = (topic?: string) => {
    setActiveProductForWhatsApp(null);
    setWhatsAppTopic(topic || 'atendimento e disponibilidade de produtos');
    setIsWhatsAppModalOpen(true);
  };

  const handleQuickView = (product: Product) => {
    setQuickViewProduct(product);
  };

  const scrollToCatalog = () => {
    const el = document.getElementById('catalogo-produtos');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalSimulationCount = simulationList.reduce((acc, item) => acc + item.quantity, 0);

  const selectedProductInList = quickViewProduct
    ? simulationList.find((i) => i.product.id === quickViewProduct.id)
    : null;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-orange-500 selection:text-white pb-16 md:pb-0">
      {/* 1. Header with search, category shortcuts and Minha Lista */}
      <Header
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        categories={CATEGORIES}
        onOpenGeneralWhatsApp={() => handleGeneralWhatsApp()}
        simulationItemsCount={totalSimulationCount}
        onOpenSimulation={() => setIsSimulationOpen(true)}
      />

      <main className="flex-1">
        {/* 2. Hero Section */}
        <Hero
          onExploreClick={scrollToCatalog}
          onOpenWhatsApp={() => handleGeneralWhatsApp()}
        />

        {/* 3. Categories Grid */}
        <CategoriesGrid
          categories={CATEGORIES}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* 4. Products Catalog (Filterable, Searchable, Add to List) */}
        <CatalogSection
          products={PRODUCTS}
          categories={CATEGORIES}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onAddToList={handleAddToList}
          simulationList={simulationList}
          onOpenSimulationList={() => setIsSimulationOpen(true)}
          onQuickView={handleQuickView}
        />

        {/* 5. Differentials Section */}
        <Differentials />

        {/* 6. Physical Store Location & Hours (Fictional Placeholders) */}
        <StoreLocation />

        {/* 7. WhatsApp Contact & Availability Inquiries */}
        <WhatsAppSection onOpenWhatsApp={handleGeneralWhatsApp} />
      </main>

      {/* 8. Footer with Social Media & Disclaimers */}
      <Footer
        categories={CATEGORIES}
        onSelectCategory={setSelectedCategory}
        onOpenWhatsApp={() => handleGeneralWhatsApp()}
      />

      {/* Modals & Drawers */}
      <OrderSimulationDrawer
        isOpen={isSimulationOpen}
        onClose={() => setIsSimulationOpen(false)}
        items={simulationList}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromList}
        onClearList={handleClearList}
        onGoToCatalog={scrollToCatalog}
      />

      <WhatsAppModal
        isOpen={isWhatsAppModalOpen}
        onClose={() => setIsWhatsAppModalOpen(false)}
        product={activeProductForWhatsApp}
        customTopic={whatsAppTopic}
      />

      <ProductModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToList={handleAddToList}
        onOpenSimulation={() => setIsSimulationOpen(true)}
        inListQuantity={selectedProductInList ? selectedProductInList.quantity : 0}
      />

      <MobileCategorySheet
        isOpen={isMobileCategorySheetOpen}
        onClose={() => setIsMobileCategorySheetOpen(false)}
        categories={CATEGORIES}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        totalProductsCount={PRODUCTS.length}
      />

      {/* Mobile Bottom Navigation Bar (Visible on mobile screens) */}
      <MobileBottomBar
        onGoHome={scrollToTop}
        onOpenCategories={() => setIsMobileCategorySheetOpen(true)}
        onGoCatalog={scrollToCatalog}
        onOpenSimulation={() => setIsSimulationOpen(true)}
        onOpenWhatsApp={() => handleGeneralWhatsApp()}
        simulationItemsCount={totalSimulationCount}
      />

      {/* Floating Action Buttons (Desktop & Tablet) */}
      <div className="hidden md:flex flex-col items-end gap-3 fixed bottom-5 right-5 z-40">
        {/* Floating List Pill when items are added */}
        {totalSimulationCount > 0 && (
          <button
            onClick={() => setIsSimulationOpen(true)}
            id="floating-simulation-list-btn"
            aria-label="Abrir lista de simulação"
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white font-bold text-xs sm:text-sm shadow-xl hover:shadow-2xl hover:scale-105 active:scale-100 transition-all cursor-pointer group animate-in slide-in-from-bottom-2"
          >
            <div className="relative">
              <ClipboardList className="w-4 h-4 text-white" />
              <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-white text-orange-700 text-[10px] font-extrabold rounded-full flex items-center justify-center shadow-xs">
                {totalSimulationCount}
              </span>
            </div>
            <span>Minha Lista de Consulta</span>
          </button>
        )}

        {/* Floating WhatsApp Action Pill */}
        <button
          onClick={() => handleGeneralWhatsApp()}
          id="floating-whatsapp-btn"
          aria-label="Abrir atendimento no WhatsApp"
          className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-xl hover:shadow-2xl hover:scale-105 active:scale-100 transition-all cursor-pointer group"
        >
          <div className="relative">
            <MessageCircle className="w-5 h-5 fill-white" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full" />
          </div>
          <span>WhatsApp [Telefone]</span>
        </button>
      </div>
    </div>
  );
}
