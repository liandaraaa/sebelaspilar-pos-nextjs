'use client'
import React, { Suspense, useState, useEffect } from "react";
import detailStyles from "../../dashboard.module.css";
import styles from "../../../styles/pos.module.css"
import Link from "next/link";
import { formatRupiah } from "@/app/lib/utils";
import { Purchase } from "@/app/entities/purchase";
import { useSearchParams } from "next/navigation";
import { Product } from "@/app/entities/product";

const initialPurchase:Purchase = {
  createdAt:"",
  updatedAt:"",
  deletedAt:"",
  productId:"",
  quantity:0,
  total:0,
  status:'Belum Lunas'
}

const PurchaseFormPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PurchaseFormContent />
    </Suspense>
  );
};

function PurchaseFormContent() {
  const [purchase, setPurchase] = useState<Purchase>();
    const [product, setProduct] = useState<Product>();
    const [total, setTotal] = useState((product?.buyPrice || 0)*(purchase?.quantity||1))

 const searchParams = useSearchParams();
  const productId = searchParams.get('id');

   useEffect(() => {
      if (productId) {
        fetch(`/api/products/${productId}`)
          .then((response) => response.json())
          .then((data) => {
            console.log('cek handle update product', data)
            setProduct(data);
            setTotal((data?.buyPrice || 0)*(purchase?.quantity||1))
          })
          .catch((error) => {
            console.error('Error fetching product:', error);
          });
      }   
    }, [productId, product?.buyPrice, product?.id, purchase?.quantity]);

  const handleChange = (e:React.ChangeEvent<HTMLSelectElement|HTMLInputElement|HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    console.log('cek handle change', name, value)

    if(name === 'quantity'){
      console.log('cek set total', Number(value))
      setTotal((product?.buyPrice||0)*(Number(value)))
    }
    
    setPurchase((prev) => ({
      ...prev || initialPurchase,
      [name]: value,
    }));
  };

  const handleSubmit = (e:  React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newPurchase = {
     ...purchase,
      productId:product?.id || '',
      quantity: Math.floor(purchase?.quantity|| 0),
      total: total,
      status: 'Belum Lunas'
    }
    createData(newPurchase);
  };

  async function createData(data: Purchase){
    await fetch("/api/purchases", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then(() => {
     updateProductStock(data.quantity)
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  }

  async function updateProductStock(newStock: number){
    const newProduct = {
      ...product,
      stock:newStock
    }
    await fetch(`/api/products/${productId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
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
        <h1 className={detailStyles.title}>{'Create Purchase'}</h1>
        <Link href="/dashboard/stock" className={detailStyles.backLink}>
          Back to Stocks
        </Link>
      </header>
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label>Product Name</label>
        <input name="product" defaultValue={product?.name} onChange={handleChange} required />
      </div>
      <div className={styles.formGroup}>
        <label>Quantity</label>
        <input name="quantity" defaultValue={purchase?.quantity || 1} onChange={handleChange} required />
      </div>
      <div className={styles.formGroup}>
        <label>Total:</label>
        <input name="price" type="number" defaultValue={total} onChange={handleChange} readOnly />
      </div>
      <button type="submit">{'Add Purchase'}</button>
    </form>
    </div>
  );
}

export default PurchaseFormPage;