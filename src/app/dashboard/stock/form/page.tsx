'use client'
import React, { Suspense, useState } from "react";
import detailStyles from "../../dashboard.module.css";
import styles from "../../../styles/pos.module.css"
import Link from "next/link";
import { useEffect } from "react";
import { Product, ProductStatus } from "@/app/entities/product";
import { useSearchParams } from "next/navigation";

const initialProduct:Product = {
  name: "Init",
  price: 0,
  description: "",
  stock: 0,
  category: "",
  imageUrl: "",
  buyPrice: 0,
  supplier: "",
  status: ProductStatus.READY,
};

const StockFormPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductFormPage />
    </Suspense>
  );
};

function ProductFormPage() {
  const [product, setProduct] = useState<Product>();

  const searchParams = useSearchParams();
  const mode = searchParams.get('mode');

  const productId = searchParams.get('id');
  const isUpdateMode = mode === 'update';

  useEffect(() => {
    if (isUpdateMode && productId) {
      fetch(`/api/products/${productId}`)
        .then((response) => response.json())
        .then((data) => {
          console.log('cek handle update product', data)
          setProduct(data);
        })
        .catch((error) => {
          console.error('Error fetching product:', error);
        });
    }   
  }, [isUpdateMode, productId]);

  const handleChange = (e:React.ChangeEvent<HTMLSelectElement|HTMLInputElement|HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    console.log('cek handle change', name, value)
    setProduct((prev) => ({
      ...prev || initialProduct,
      [name]: value,
    }));
  };

  const handleSubmit = (e:  React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const preparedProduct = {
      ...product,
      name : product?.name || '',
      supplier: product?.supplier || '',
      price: Math.floor(product?.price || 0),
      stock: Math.floor(product?.stock || 0),
      buyPrice: Math.floor(product?.buyPrice || 0),
      status: product?.status || ProductStatus.READY
    };
    if(isUpdateMode){
      updateData(preparedProduct)
    }else{
      createData(preparedProduct);
    }
  };

  async function createData(data: Product){
    console.log('cek creaete product', data)
    await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then(() => {
      window.location.href = "/dashboard/stock";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  }

    async function updateData(data: Product){
      await fetch(`/api/products/${data?.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      .then((response) => response.json())
      .then(() => {
        window.location.href = "/dashboard/stock";
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    }

  return (
    <div className={detailStyles.container}>
          <header className={detailStyles.header}>
        <h1 className={detailStyles.title}>{isUpdateMode ? 'Update Product' : 'Create Product'}</h1>
        <Link href="/dashboard/stock" className={detailStyles.backLink}>
          Back to Stocks
        </Link>
      </header>
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label>Name:</label>
        <input name="name" defaultValue={product?.name} onChange={handleChange} required />
      </div>
      <div className={styles.formGroup}>
        <label>Price:</label>
        <input name="price" type="number" defaultValue={product?.price} onChange={handleChange} required />
      </div>
      <div className={styles.formGroup}>
        <label>Description:</label>
        <textarea name="description" defaultValue={product?.description} onChange={handleChange} required />
      </div>
      <div className={styles.formGroup}>
        <label>Stock:</label>
        <input name="stock" type="number" defaultValue={product?.stock} onChange={handleChange} required />
      </div>
      <div className={styles.formGroup}>
        <label>Category:</label>
        <input name="category" defaultValue={product?.category} onChange={handleChange} required />
      </div>
      <div className={styles.formGroup}>
        <label>Image URL:</label>
        <input name="imageUrl" defaultValue={product?.imageUrl} onChange={handleChange} />
      </div>
      <div className={styles.formGroup}>
        <label>Buy Price:</label>
        <input name="buyPrice" type="number" defaultValue={product?.buyPrice} onChange={handleChange} required />
      </div>
      <div className={styles.formGroup}>
        <label>Supplier:</label>
        <input name="supplier" defaultValue={product?.supplier} onChange={handleChange} required />
      </div>
      <div className={styles.formGroup}>
  <label>Status:</label>
  <select
    name="status"
    defaultValue={product?.status}
    onChange={handleChange}
  >
    <option defaultValue="Ready">Ready</option>
    <option defaultValue="Restock">Restock</option>
  </select>
</div>
      <button type="submit">{isUpdateMode ? 'Update Product' : 'Add Product'}</button>
    </form>
    </div>
  );
}

export default StockFormPage;