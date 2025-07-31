'use client'
import { Product } from "@/app/entities/product";
import { notFound } from "next/navigation";
import { use, useEffect, useState } from "react";
import styles from '../../dashboard.module.css'
import Link from "next/link";
import { formatRupiah } from "@/app/lib/utils";

const ProductDetailPage: React.FC<{ params: Promise<{ id: string }> }> = ({ params }) => {
  const { id } = use(params);
  
  const [product, setProduct] = useState<Product>()

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => {
        console.error('Error fetching Product:', error);
        notFound();
      });
    }, [id]);


  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Product Detail: {product?.id}</h1>
        <Link href="/dashboard/stock" className={styles.backLink}>
          Back to Stocks
        </Link>
      </header>

      <div className={styles.card}>
        <div className={styles.grid}>
          <div className={styles.detailItem}>
            <span className={styles.label}>Nama</span>
            <span className={styles.value}>{product?.name}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>Deskripsi</span>
            <span className={styles.value}>{product?.description}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>Harga Beli</span>
            <span className={styles.value}>{formatRupiah(product?.price)}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>Harga Jual</span>
            <span className={styles.value}>{formatRupiah(product?.buyPrice)}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>Kategori</span>
            <span className={styles.value}>{product?.category}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>Status</span>
            <span className={styles.value}>{product?.status}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage

