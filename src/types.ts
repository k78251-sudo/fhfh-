export interface Product {
  id: string;
  name: string;
  category: string;
  categorySlug: string;
  price: number;
  oldPrice?: number;
  image: string;
  badge?: 'Mais Vendido' | 'Oferta' | 'Destaque' | 'Novidade';
  refCode: string;
  description: string;
  features: string[];
  dimensions?: string;
  material?: string;
  inStock: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  iconName: string;
  itemCount: number;
  image: string;
}

export interface SimulationItem {
  product: Product;
  quantity: number;
}
