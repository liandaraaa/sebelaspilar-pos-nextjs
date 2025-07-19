import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { orders } from '@/app/api/orders/order-mock';
import { products as allProducts } from '@/app/api/products/product-mock';
import { formatRupiah } from '@/app/lib/utils';
import styles from '../detail.module.css';

// Data fetching function - runs on the server
async function getOrderData(id: string) {
  const order = orders.find((o) => o.id === id);
  if (!order) {
    return null;
  }
  // We need product names, so let's enrich the product data
  const enrichedProducts = order.products.map(item => {
    const productInfo = allProducts.find(p => p.id === item.productId);
    return {
      ...item,
      name: productInfo?.name || 'Unknown Product',
      price: productInfo?.price || 0,
    };
  });

  return { ...order, products: enrichedProducts };
}

// Helper to format dates consistently
const formatDate = (dateString: string | undefined) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const OrderDetailPage: React.FC<{ params: { id: string } }> = async ({ params }) => {
  const { id } = params;
  const order = await getOrderData(id);

  if (!order) {
    notFound();
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Order Detail: {order.id}</h1>
        <Link href="/dashboard/order" className={styles.backLink}>
          Back to Orders
        </Link>
      </header>

      <div className={styles.card}>
        <div className={styles.grid}>
          <div className={styles.detailItem}>
            <span className={styles.label}>Customer</span>
            <span className={styles.value}>{order.customer}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>Contact</span>
            <span className={styles.value}>{order.contact}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>Order Date</span>
            <span className={styles.value}>{formatDate(order.date)}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>Delivery Date</span>
            <span className={styles.value}>{formatDate(order.deliveryDate)}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>Order Status</span>
            <span className={styles.value}>{order.statusOrder}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>Payment Status</span>
            <span className={styles.value}>{order.statusPayment}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>Delivery Status</span>
            <span className={styles.value}>{order.statusDelivery}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>Delivery Address</span>
            <span className={styles.value}>{order.deliveryAddress}</span>
          </div>
        </div>

        <div className={styles.productList}>
          <h2 className={styles.label}>Products</h2>
          {order.products.map((product) => (
            <div key={product.productId} className={styles.productItem}>
              <span>{product.name} (x{product.qty})</span>
              <span>{formatRupiah(product.price * product.qty)}</span>
            </div>
          ))}
        </div>

        <div className={styles.total}>
          <span>Total: {formatRupiah(order.total)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage

