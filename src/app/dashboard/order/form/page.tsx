'use client'

import { products } from "@/app/api/products/product-mock";
import { Order } from "@/app/entities/order";
import { formatRupiah } from "@/app/lib/utils";
import styles from "@/app/styles/pos.module.css";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";

const FormOrderPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FormContent />
    </Suspense>
  );
};

const FormContent = () => {
  const [selectedProducts, setSelectedProducts] = useState<
    { productId: string; qty: number }[]
  >([]);

  const searchParams = useSearchParams();
  const mode = searchParams.get('mode'); // 'create' atau 'update'

  const orderId = searchParams.get('id'); // ID order jika mode adalah 'update'
  const isUpdateMode = mode === 'update';

  // if isUpdateMode and orderId not null, fetch order by id
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

  const updateQuantity = (productId: string, quantity: number) => {
    setSelectedProducts((prev) =>
      prev.map((product) =>
        product.productId === productId ? { ...product, quantity } : product
      )
    );
  };

  const calculateTotalOrder = () => { 
    return selectedProducts?.reduce(
      (total, selectedProduct) => {
        const product = products.find((p) => p.id === selectedProduct.productId);
        return product ? total + (product.price * selectedProduct.qty) : total;
      },
      0
    )
  }

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {  
    event.preventDefault();
    console.log('cek selected products', selectedProducts)
    const formData = new FormData(event.currentTarget);
    const orderData:Order = {
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
  const [order, setOrder] = useState<Order>()
  return (
      <div className={styles.fullscreenContainer}>
        <h2 className={styles.tableTitle}>Create Order</h2>
        <form
          className={styles.orderForm}
          onSubmit={handleSubmitForm}>
          {/* Customer Information */}
          <div className={styles.formGroup}>
            <label htmlFor="customer">Customer Name</label>
            <input type="text" id="customer" name="customer" required defaultValue={order?.customer} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="contact">Contact</label>
            <input type="text" id="contact" name="contact" required defaultValue={order?.contact} />
          </div>

          {/* Product Selection */}
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
              {products.map((product) => (
                <option
                  key={product.id}
                  value={product.id}
                  style={{
                    //set background color for selected option already in selectedProducts
                    backgroundColor: selectedProducts?.some((selectedProduct) => selectedProduct.productId === product.id) ?
                      'red' : 'white'
                  }}>
                  {`${product.name} | Stock: ${product.stock} | Harga : ${formatRupiah(product.price)}`}
                </option>
              ))}
            </select>
          </div>

        {/* Selected Products and Quantity */}
        {selectedProducts?.length > 0 && (
          <div className={styles.formGroup}>
            <label>Selected Products</label>
            <ul>
              {selectedProducts?.map((selectedProduct) => {
                const product = products.find((p) => p.id === selectedProduct.productId);
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
                <input type="date" id="deliveryDate" name="deliveryDate" required defaultValue={order?.deliveryDate} />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="deliveryAddress">Delivery Address</label>
                <textarea id="deliveryAddress" name="deliveryAddress" rows={4} required defaultValue={order?.deliveryAddress}></textarea>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="note">Note</label>
                <textarea id="note" name="note" rows={4} defaultValue={order?.note || '-'}></textarea>
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