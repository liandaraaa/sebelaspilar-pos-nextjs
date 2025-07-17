'use client';

import Link from "next/link";
import React, { useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import styles from "../../styles/pos.module.css"
import { Order, OrderStatus, PaymentStatus } from "@/app/entities/order";
import { products } from "@/app/api/products/product-mock";
import { Product } from "@/app/entities/product";
import { formatRupiah } from "@/app/lib/utils";

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

  const [dataOrders, setDataOrders] = React.useState<Order[]>([]);

  const fetchOrders =async () => {
    try {
      const response = await fetch("/api/orders");
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
      const data: Order[] = await response.json();
      setDataOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setDataOrders([]);
    }
  };

  useEffect(() => { 
    // Simulate fetching data from an API
    fetchOrders();
  }, []);

  //get list of products from order.producs that include productId. try finde from products
  const getOrderProducts = (order: Order) : {products:Product,qty:number}[] => {
    const orderProductsMap: { products: Product; qty: number }[] = [];
    if (!order.products || order.products.length === 0) {
      return [];
    }
    order.products.forEach((product) => {
      const foundProduct = products.find((p) => p.id === product.productId);
      if (foundProduct) {
        orderProductsMap.push({
          products: foundProduct,
          qty: product.qty,
        })
      }
    });

    return orderProductsMap;
  };


  const handlePrintInvoice = (order: Order) => {
    const invoiceContent = `
      Invoice
      ------------------------
      Customer: ${order.customer}
      Contact: ${order.contact}
      Order ID: ${order.id}
      Products:
      ${getOrderProducts(order)
        .map(
          (product) =>
            `- ${product.products.name} (Qty: ${product.qty}, Price: ${formatRupiah(
              product.products.price
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
      ${getOrderProducts(order)
        .map((product) => `- ${product.products.name} (Qty: ${product.qty})`)
        .join("\n")}
    `;
    console.log(suratJalanContent); // Replace with actual print logic
  };

   async function deleteData(orderId:string){
    await fetch(`/api/orders/${orderId}`, {
      method: 'DELETE'
    }).then(() => {
          fetchOrders()
        })
        .catch((error) => {
          console.error('Error fetching order:', error);
        });
      }
  

  return (
    <div className={styles.fullscreenContainer}>
      <h2 className={styles.tableTitle}>List Order</h2>
     <Link 
        className={styles.linkAddButton} 
        href="/dashboard/order/form?mode=create">
     <Button
     className={styles.addButton} 
        variant="primary"
      >
        Tambah Order
      </Button>
     </Link>
      <Table striped bordered hover className={styles.fullscreenTable}>
        <thead>
          <tr>
            <th>ID Order</th>
            <th>Tanggal Order</th>
            <th>Nama Customer</th>
            <th>Contact</th>
            <th>Daftar Produk</th>
            <th>Jumlah Produk</th>
            <th>Total Pembayaran</th>
            <th>Status Order</th>
            <th>Status Pembayaran</th>
            <th>Deadline Pembayaran</th>
            <th>Tanggal Pengiriman</th>
            <th>Alamat Pengiriman</th>
            <th>Status Pengiriman</th>
            <th>Catatan</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {dataOrders.map((order) => (
            <tr key={order.id} style={{ cursor: "pointer" }}>
              <td>
                <Link href={`/dashboard/order/${order.id}`}>{order.id}</Link>
              </td>
              {/* format date to dd-MM-yyyy */}
              <td>{new Date(order.date || 0).toLocaleDateString()}</td>
              <td>{order.customer}</td>
              <td>{order.contact}</td>
              <td>
                <ul>
                  {getOrderProducts(order).map((product, index) => (
                    <li key={index}>
                      {product.products.name} (Qty: {product.qty})
                    </li>
                  ))}
                </ul>
              </td>
              <td>{order.products.length}</td>
              <td>{formatRupiah(order.total)}</td>
              <td>
                <span
                  className={`badge bg-${statusOrderColor[order.statusOrder || "Pending"]}`}
                >
                  {order.statusOrder}
                </span>
              </td>
              <td>
                <span
                  className={`badge bg-${statusPaymentColor[order.statusPayment || "Belum Bayar"]}`}
                >
                  {order.statusPayment}
                </span>
              </td>
              <td>{new Date(order.deadline || 0).toLocaleDateString()}</td>
              <td>{new Date(order.deliveryDate || 0).toLocaleDateString()}</td>
              <td>{order.deliveryAddress}</td>
              <td>{order.statusOrder}</td>
              <td>{order.note || '-'}</td>
              <td>
                {order.statusOrder === "Dikonfirmasi" && (
                  <>
                    <Button
                    className={styles.addButton}
                      variant="primary"
                      onClick={() => handlePrintSuratJalan(order)}
                      style={{ marginRight: "0.5rem" }}
                    >
                      Cetak Surat Jalan
                    </Button>
                    <Button
                    className={styles.addButton}
                      variant="success"
                      onClick={() => handlePrintInvoice(order)}
                    >
                      Cetak Invoice
                    </Button>
                  </>
                )}
                {/* add Update and Delete button */}
                <Button
                    className={styles.addButton}
                  variant="warning"
                  onClick={() => {
                    window.location.href = `/dashboard/order/form?mode=update&id=${order.id}`;
                  }}
                  style={{ marginRight: "0.5rem" }}
                >
                  Update
                </Button>
                <Button
                    className={styles.addButton}
                  variant="danger"
                  onClick={() => {
                    if(order.id){
                      deleteData(order.id)
                    }
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default OrderList;