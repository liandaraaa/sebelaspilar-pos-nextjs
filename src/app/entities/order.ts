export type OrderStatus = "Pending" | "Dikonfirmasi" | "Selesai";
export type PaymentStatus = "Belum Bayar" | "Sebagian" | "Lunas";
export type DeliveryStatus = "Belum Dikirim" | "Sedang Dikirim" | "Selesai";


export interface Order {
  id?: string;
  customer: string;
  contact: string;
  date?: string;
  total: number;
  statusOrder?: OrderStatus;
  statusPayment?: PaymentStatus;
  deadline?: string;
  products: { productId: string; qty: number}[];
  deliveryDate: string;
  deliveryAddress: string;
  statusDelivery?: string;
  note?:string
}
