export interface Product {
  id: string;
  name: string;
  price: number;
  categoryId: string;
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
}
