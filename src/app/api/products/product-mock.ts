import { Product, ProductStatus } from "@/app/entities/product";

export const products:Product[] = [
  {
    id: "PROD001",
    name: "Produk A",
    price: 10000,
    description: "Deskripsi Produk A",
    stock: 50,
    category: "Kategori 1",
    imageUrl: "https://example.com/images/prod-a.jpg",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-10"),
    buyPrice: 12000,
    supplier: "PT Supplier 11",
    status: ProductStatus.READY
  },
  {
    id: "PROD002",
    name: "Produk B",
    price: 20000,     
    description: "Deskripsi Produk B",
    stock: 30,
    category: "Kategori 2",
    imageUrl: "https://example.com/images/prod-b.jpg",
    createdAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-01-15"),
    buyPrice: 12000,
    supplier: "PT Supplier 11",
    status: ProductStatus.READY
  },
  {
    id: "PROD003",
    name: "Produk C",
    price: 15000,
    description: "Deskripsi Produk C",
    stock: 20,
    category: "Kategori 1",
    imageUrl: "https://example.com/images/prod-c.jpg",
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-20"),
    buyPrice: 12000,
    supplier: "PT Supplier 11",
    status: ProductStatus.READY
  },
  {
    id: "PROD004",
    name: "Produk D",
    price: 25000,
    description: "Deskripsi Produk D",
    stock: 10,
    category: "Kategori 3",
    imageUrl: "https://example.com/images/prod-d.jpg",    
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-25"),    
    buyPrice: 12000,
    supplier: "PT Supplier 11",
    status: ProductStatus.READY
  },
  {
    id: "PROD005",
    name: "Produk E",
    price: 30000,
    description: "Deskripsi Produk E",
    stock: 5,
    category: "Kategori 2",
    imageUrl: "https://example.com/images/prod-e.jpg",
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-30"),
    buyPrice: 12000,
    supplier: "PT Supplier 11",
    status: ProductStatus.READY
  },
  {
    id: "PROD0016",
    name: "Produk F",
    price: 18000,
    description: "Deskripsi Produk F",
    stock: 15,
    category: "Kategori 1",
    imageUrl: "https://example.com/images/prod-f.jpg",
    createdAt: new Date("2024-01-25"),
    updatedAt: new Date("2024-02-05"),
    buyPrice: 12000,
    supplier: "PT Supplier 11",
    status: ProductStatus.READY
  }
];