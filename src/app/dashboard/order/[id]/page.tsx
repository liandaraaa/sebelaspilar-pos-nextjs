'use client'

import React, { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { formatRupiah, formatDate } from '@/app/lib/utils';
import styles from '../detail.module.css';
import { Order } from '@/app/entities/order';
import { products } from '@/app/api/products/product-mock';

const OrderDetailPage: React.FC<{ params: Promise<{ id: string }> }> = ({ params }) => {
  const { id } = use(params);
  
  const [order, setOrder] = useState<Order>()

  useEffect(() => {
    fetch(`/api/orders/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setOrder(data);
      })
      .catch((error) => {
        console.error('Error fetching order:', error);
        notFound();
      });
    }, [id]);


  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Order Detail: {order?.id}</h1>
        <Link href="/dashboard/order" className={styles.backLink}>
          Back to Orders
        </Link>
      </header>

      <div className={styles.card}>
        <div className={styles.grid}>
          <div className={styles.detailItem}>
            <span className={styles.label}>Customer</span>
            <span className={styles.value}>{order?.customer}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>Contact</span>
            <span className={styles.value}>{order?.contact}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>Order Date</span>
            <span className={styles.value}>{formatDate(order?.date)}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>Delivery Date</span>
            <span className={styles.value}>{formatDate(order?.deliveryDate)}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>Order Status</span>
            <span className={styles.value}>{order?.statusOrder}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>Payment Status</span>
            <span className={styles.value}>{order?.statusPayment}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>Delivery Status</span>
            <span className={styles.value}>{order?.statusDelivery}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>Delivery Address</span>
            <span className={styles.value}>{order?.deliveryAddress}</span>
          </div>
        </div>

        <div className={styles.productList}>
          <h2 className={styles.label}>Products</h2>
          {order?.products.map((product) => {
            const dataProduct = products.find((p) => p.id === product.productId);
            return (
            <div key={product.productId} className={styles.productItem}>
              <span>{dataProduct?.name} (x{product.qty})</span>
              <span>{formatRupiah(dataProduct?.price || 0 * product.qty)}</span>
            </div>)
          })}
        </div>

        <div className={styles.total}>
          <span>Total: {formatRupiah(order?.total)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage

