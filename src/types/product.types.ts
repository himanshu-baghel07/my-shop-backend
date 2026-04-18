export interface Variant {
  color: string;
  ram: string;
  storage: string;
  price: number;
  stock: number;
}

export interface ProductResponse {
  id: string;
  name: string;
  description: string;
  image: string | null;
  avg_rating: number;
  variants: Variant[];
}
