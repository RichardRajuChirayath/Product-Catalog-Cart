import { Category } from './category.model';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string; // Keeping as string to match common API responses (like FakeStoreAPI)
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
}
