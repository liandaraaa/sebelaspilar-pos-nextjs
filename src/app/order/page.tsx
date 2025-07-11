'use client';

import Link from "next/link";
import React from "react";
import { Table, Button } from "react-bootstrap";

type OrderStatus = "Pending" | "Dikonfirmasi" | "Selesai";
type PaymentStatus = "Belum Bayar" | "Sebagian" | "Lunas";

export interface Order {
  id: string;
  customer: string;
  contact: string;
  date: string;
  total: number;
  statusOrder: OrderStatus;
  statusPayment: PaymentStatus;
  deadline: string;
  products: { name: string; qty: number; price: number }[];
}

const orders: Order[] = [
  {
    id: "ORD001",
    customer: "Budi Santoso",
    contact: "081234567890",
    date: "2024-06-01",
    total: 1500000,
    statusOrder: "Pending",
    statusPayment: "Belum Bayar",
    deadline: "2024-09-01",
    products: [
      { name: "Pensil", qty: 10, price: 2000 },
      { name: "Penghapus", qty: 5, price: 3000 },
    ],
  },
  {
    id: "ORD002",
    customer: "Siti Aminah",
    contact: "081234567891",
    date: "2024-05-15",
    total: 2500000,
    statusOrder: "Dikonfirmasi",
    statusPayment: "Sebagian",
    deadline: "2024-08-15",
    products: [
      { name: "Buku", qty: 20, price: 15000 },
      { name: "Pulpen", qty: 10, price: 5000 },
    ],
  },
  {
    id: "ORD003",
    customer: "Andi Wijaya",
    contact: "081234567892",
    date: "2024-04-20",
    total: 500000,
    statusOrder: "Selesai",
    statusPayment: "Lunas",
    deadline: "2024-07-20",
    products: [
      { name: "Stapler", qty: 2, price: 25000 },
      { name: "Kertas A4", qty: 5, price: 50000 },
    ],
  },
];

function formatRupiah(amount: number): string {
  return "Rp " + amount.toLocaleString("id-ID");
}

const statusOrderColor: Record<OrderStatus, string> = {
  Pending: "warning",
  Dikonfirmasi: "info",
  Selesai: "success",
};

const statusPaymentColor: Record<PaymentStatus, string> = {
  "Belum Bayar": "danger",
  Sebagian: "warning",
  Lunas: "success",
};

const OrderList: React.FC = () => {
  const handlePrintInvoice = (order: Order) => {
    const invoiceContent = `
      Invoice
      ------------------------
      Customer: ${order.customer}
      Contact: ${order.contact}
      Order ID: ${order.id}
      Products:
      ${order.products
        .map(
          (product) =>
            `- ${product.name} (Qty: ${product.qty}, Price: ${formatRupiah(
              product.price
            )})`
        )
        .join("\n")}
      Total: ${formatRupiah(order.total)}
      Payment Status: ${order.statusPayment}
      Payment Deadline: ${order.deadline}
    `;
    console.log(invoiceContent); // Replace with actual print logic
  };

  const handlePrintSuratJalan = (order: Order) => {
    const suratJalanContent = `
      Surat Jalan
      ------------------------
      Customer: ${order.customer}
      Order ID: ${order.id}
      Delivery Date: ${order.date}
      Products:
      ${order.products
        .map((product) => `- ${product.name} (Qty: ${product.qty})`)
        .join("\n")}
    `;
    console.log(suratJalanContent); // Replace with actual print logic
  };

  return (
    <div className="fullscreen-container">
      <h2 className="table-title">List Order</h2>
      <Table striped bordered hover className="fullscreen-table">
        <thead>
          <tr>
            <th>ID Order</th>
            <th>Nama Customer</th>
            <th>Tanggal Order</th>
            <th>Total Order</th>
            <th>Status Order</th>
            <th>Status Pembayaran</th>
            <th>Deadline Pembayaran</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} style={{ cursor: "pointer" }}>
              <td>
                <Link href={`/order/${order.id}`}>{order.id}</Link>
              </td>
              <td>{order.customer}</td>
              <td>{order.date}</td>
              <td>{formatRupiah(order.total)}</td>
              <td>
                <span
                  className={`badge bg-${statusOrderColor[order.statusOrder]}`}
                >
                  {order.statusOrder}
                </span>
              </td>
              <td>
                <span
                  className={`badge bg-${statusPaymentColor[order.statusPayment]}`}
                >
                  {order.statusPayment}
                </span>
              </td>
              <td>{order.deadline}</td>
              <td>
                {order.statusOrder === "Dikonfirmasi" && (
                  <>
                    <Button
                      variant="primary"
                      onClick={() => handlePrintSuratJalan(order)}
                      style={{ marginRight: "0.5rem" }}
                    >
                      Cetak Surat Jalan
                    </Button>
                    <Button
                      variant="success"
                      onClick={() => handlePrintInvoice(order)}
                    >
                      Cetak Invoice
                    </Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default OrderList;