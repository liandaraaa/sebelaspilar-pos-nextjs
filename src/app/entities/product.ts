export type Product = {
  id?: string;
  name: string;
  price: number;
  description?: string;
  stock?: number;
  category?: string;
  imageUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
};