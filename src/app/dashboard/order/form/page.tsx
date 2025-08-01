'use client'

import { Order } from "@/app/entities/order";
import { formatRupiah } from "@/app/lib/utils";
import detailStyles from "../../dashboard.module.css";
import styles from "../../../styles/pos.module.css"
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import { Product } from "@/app/entities/product";

const FormOrderPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FormContent />
    </Suspense>
  );
};

const FormContent = () => {

  const [order, setOrder] = useState<Order>()
    const [products, setProducts] = useState<Product[]>();

  const [selectedProducts, setSelectedProducts] = useState<
    { productId: string; qty: number }[]
  >([]);

  const searchParams = useSearchParams();
  const mode = searchParams.get('mode'); // 'create' atau 'update'

  const orderId = searchParams.get('id'); // ID order jika mode adalah 'update'
  const isUpdateMode = mode === 'update';

  useEffect(() => {
    if (isUpdateMode && orderId) {
      fetch(`/api/orders/${orderId}`)
        .then((response) => response.json())
        .then((data) => {
          setOrder(data);
          setSelectedProducts(data.products);
        })
        .catch((error) => {
          console.error('Error fetching order:', error);
        });
    }   
  }, [isUpdateMode, orderId]);

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

  const handleProductChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(event.target.selectedOptions);
    //check if selectedOptions id already exists in selectedProducts, return exisiting
    const existingProducts = selectedProducts.filter((product) =>
      selectedOptions.some((option) => option.value === product.productId)
    );
    if (existingProducts.length > 0) {
      //remove the existitng
      setSelectedProducts((prev) =>
        prev.filter((product) => !existingProducts.includes(product))
      );
      return;
    }
    const newSelectedProducts = selectedOptions.map((option) => ({
      productId: option.value,
      qty: 1, // default quantity
    }));

    setSelectedProducts([
      ...selectedProducts,
      ...newSelectedProducts,
    ] );
  };

  const updateQuantity = (productId: string, qty: number) => {
    setSelectedProducts((prev) =>
      prev.map((product) =>
        product.productId === productId ? { ...product, qty } : product
      )
    );
  };

  const calculateTotalOrder = () => { 
    return selectedProducts?.reduce(
      (total, selectedProduct) => {
        const product = products?.find((p) => p.id === selectedProduct.productId);
        return product ? total + (product.price * selectedProduct.qty) : total;
      },
      0
    )
  }

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {  
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const orderData:Order = {
      ...order,
      customer: formData.get("customer") as string,
      contact: formData.get("contact") as string,
      products: selectedProducts.map((selectedProduct) => ({
        productId: selectedProduct.productId,
        qty: selectedProduct.qty, 
      })),
      total: calculateTotalOrder(),
      deliveryDate: formData.get("deliveryDate") as string,
      deliveryAddress: formData.get("deliveryAddress") as string,
      note: formData.get("note") as string,
    }
    if(isUpdateMode) updateData(orderData)
    else createData(orderData)
  }

  async function createData(orderData: Order){
    await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    })
    .then((response) => response.json())
    .then((data:Order) => {
      if(data?.statusPayment === 'Lunas'){
        window.location.href = "/dashboard/order";
      }else{
        createReceiveable(data)
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  }

  async function createReceiveable(order: Order){
    const newReceiveable = {
      orderId: order.id,
      total : order.total
    }
    await fetch("/api/receiveables", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newReceiveable),
    })
    .then((response) => response.json())
    .then(() => {
      window.location.href = "/dashboard/order";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  }

  async function updateData(orderData: Order){
    await fetch(`/api/orders/${order?.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    })
    .then((response) => response.json())
    .then(() => {
      window.location.href = "/dashboard/order";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  }

  return (
      <div className={detailStyles.container}>
          <header className={detailStyles.header}>
        <h1 className={detailStyles.title}>{isUpdateMode ? 'Update Order' : 'Create Order'}</h1>
        <Link href="/dashboard/order" className={detailStyles.backLink}>
          Back to Orders
        </Link>
      </header>
        <form
          className={styles.orderForm}
          onSubmit={handleSubmitForm}>
          <div className={styles.formGroup}>
            <label htmlFor="customer">Customer Name</label>
            <input type="text" id="customer" name="customer" required defaultValue={order?.customer} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="contact">Contact</label>
            <input type="text" id="contact" name="contact" required defaultValue={order?.contact} />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="products">Products</label>
            <select
              id="products"
              name="products"
              multiple
              required
              onChange={handleProductChange}
              defaultValue={order?.products?.map((product) => product.productId)}
              value={selectedProducts?.map((product) => product.productId)}
            >
              {products?.map((product) => (
                <option
                  key={product.id}
                  value={product.id}
                  style={{
                    backgroundColor: selectedProducts?.some((selectedProduct) => selectedProduct.productId === product.id) ?
                      'red' : 'white'
                  }}>
                  {`${product.name} | Stock: ${product.stock} | Harga : ${formatRupiah(product.price)}`}
                </option>
              ))}
            </select>
          </div>
        {selectedProducts?.length > 0 && (
          <div className={styles.formGroup}>
            <label>Selected Products</label>
            <ul>
              {selectedProducts?.map((selectedProduct) => {
                const product = products?.find((p) => p.id === selectedProduct.productId);
                return (
                  product && (
                    <li key={selectedProduct.productId}>
                      {product.name}
                      <input
                        type="number"
                        defaultValue={selectedProduct.qty}
                        onChange={(e) => updateQuantity(selectedProduct.productId, Number(e.target.value))}
                        />
                      <label>Total Harga : {formatRupiah(product.price * selectedProduct.qty)}</label>
                    </li>
                  )
                );
              })}
            </ul>
              </div>
              )}
              <div className={styles.formGroup}>
                <label htmlFor="total">Total</label>
                <input type="text" id="total" name="total" required readOnly
                  value={formatRupiah(calculateTotalOrder())} />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="deliveryDate">Delivery Date</label>
                <input type="date" id="deliveryDate" name="deliveryDate" required defaultValue={order?.deliveryDate ? new Date(order.deliveryDate).toISOString().split('T')[0] : ''} />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="deliveryAddress">Delivery Address</label>
                <textarea id="deliveryAddress" name="deliveryAddress" rows={4} required defaultValue={order?.deliveryAddress}></textarea>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="note">Note</label>
                <textarea id="note" name="note" rows={4} defaultValue={order?.note}></textarea>
              </div>
              <button type="submit"
              >
          {
            isUpdateMode ? 'Update Order' : 'Create Order'
          }
        </button> 
      </form>
      </div>
  );
}
export default FormOrderPage;