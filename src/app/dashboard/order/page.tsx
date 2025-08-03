'use client';

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import styles from "../../styles/pos.module.css"
import { Order, OrderStatus, PaymentStatus } from "@/app/entities/order";
import { Product } from "@/app/entities/product";
import { formatRupiah } from "@/app/lib/utils";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/app/lib/store";
import { setStatus } from "@/app/lib/features/ordersSlice";

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
  const {status, orders} = useSelector((state: RootState) => state.orders);
  const dispatch = useDispatch<AppDispatch>()
  const [dataOrders, setDataOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>();

  useEffect(() => { 
    if(status === 'succeeded'){
      setDataOrders(orders);
    }
  }, [status,orders]);

  useEffect(()=>{
     fetch(`/api/products/`)
            .then((response) => response.json())
            .then((data) => {
              setProducts(data);
            })
            .catch((error) => {
              console.error('Error fetching order:', error);
            });
  },[])


  //get list of products from order.producs that include productId. try finde from products
  const getOrderProducts = (order: Order) : {products:Product,qty:number}[] => {
    const orderProductsMap: { products: Product; qty: number }[] = [];
    if (!order.products || order.products.length === 0) {
      return [];
    }
    order.products.forEach((product) => {
      const foundProduct = products?.find((p) => p.id === product.productId);
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

   async function deleteOrder(orderId:string):Promise<boolean>{
    return fetch(`/api/orders/${orderId}`, {
      method: 'DELETE'
    }).then(() => {
      dispatch(setStatus('idle'))
        return true
        })
        .catch((error) => {
          console.error('Error fetching order:', error);
          return false
        });
      }

      async function deleteReceiveable(orderId:string):Promise<boolean>{
        return fetch(`/api/receiveables/${orderId}`, {
          method: 'DELETE'
        }).then(() => {
            return true
            })
            .catch((error) => {
              console.error('Error fetching order:', error);
              return false
            });
          }
          
   async function deleteData(orderId:string){
    Promise.all([deleteOrder(orderId),deleteReceiveable(orderId)])
    .then((values)=>{
      if(values.every((v)=>v===true)){
        dispatch(setStatus('idle'))
      }
    })
    .catch((error)=>{
      console.error(error)
    })
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
            <th>Total Pembayaran</th>
            <th>Status Order</th>
            <th>Status Pembayaran</th>
            <th>Status Pengiriman</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {dataOrders.map((order) => (
            <tr key={order.id} style={{ cursor: "pointer" }}>
              <td>{order.id}</td>
              <td>{new Date(order.date || 0).toLocaleDateString()}</td>
              <td>{order.customer}</td>
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
              <td>{order.statusDelivery}</td>
              <td>
                <Link
                href={`/dashboard/order/${order.id}`}>
                <Button
                    className={styles.addButton}
                  variant="warning"
                >
                  View
                </Button>
                </Link>
                <Link
                href={`/dashboard/order/form?mode=update&id=${order.id}`}>
                <Button
                    className={styles.addButton}
                  variant="warning"
                >
                  Update
                </Button>
                </Link>
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

                {order.statusOrder === "Dikonfirmasi" && (
                  <>
                    <Button
                    className={styles.addButton}
                      variant="primary"
                      onClick={() => handlePrintSuratJalan(order)}
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
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default OrderList;