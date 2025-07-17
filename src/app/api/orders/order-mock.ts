import { Order } from '../../entities/order';

export const orders: Order[] = [
  {
    id:`ord-0001`,
    customer: "Budi Santoso",
    contact: "081234567890",
    date: "2024-06-01",
    total: 1500000,
    statusOrder: "Pending",
    statusPayment: "Belum Bayar",
    deadline: "2024-09-01",
    products: [
      {productId: "PROD001", qty: 10},
      {productId: "PROD002", qty: 5},
      {productId: "PROD003", qty: 2},
    ],
    deliveryDate: "2024-06-10",
    deliveryAddress: "Jl. Raya No. 123",
    statusDelivery: "Belum Dikirim"
  },
  {
    id: `ord-0002`,
    customer: "Siti Aminah",
    contact: "081234567891",
    date: "2024-05-15",
    total: 2500000,
    statusOrder: "Dikonfirmasi",
    statusPayment: "Sebagian",
    deadline: "2024-08-15",
    products: [
      {productId: "PROD004", qty: 20},
      {productId: "PROD005", qty: 15},
      {productId: "PROD006", qty: 10},
    ],
    deliveryDate: "2024-05-25",
    deliveryAddress: "Jl. Merdeka No. 4, Malang",
    statusDelivery: "Sedang Dikirim"
  },
  {
    id: `ord-0003`,
    customer: "Andi Wijaya",
    contact: "081234567892",
    date: "2024-04-20",
    total: 500000,
    statusOrder: "Selesai",
    statusPayment: "Lunas",
    deadline: "2024-07-20",
    products: [
      {productId: "PROD007", qty: 5},
      {productId: "PROD008", qty: 3},
      {productId: "PROD009", qty: 1},
    ],
    deliveryDate: "2024-04-30",
    deliveryAddress: "Jl. Sudirman No. 7, Surabaya",
    statusDelivery: "Selesai"
  },
];