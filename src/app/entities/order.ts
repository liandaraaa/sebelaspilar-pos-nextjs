export type OrderStatus = "Pending" | "Dikonfirmasi" | "Selesai";
export type PaymentStatus = "Belum Bayar" | "Sebagian" | "Lunas";
export type DeliveryStatus = "Belum Dikirim" | "Sedang Dikirim" | "Selesai";

type SelectedProduct = {
  productId: string;
  qty: number;
}

export interface Order {
  id?: string;
  customer: string;
  contact: string;
  date?: string;
  total: number;
  statusOrder?: OrderStatus;
  statusPayment?: PaymentStatus;
  deadline?: string;
  products: SelectedProduct[];
  deliveryDate: string;
  deliveryAddress: string;
  statusDelivery?: string;
  note?:string
}
