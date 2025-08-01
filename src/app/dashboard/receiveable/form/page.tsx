'use client'
import React, { Suspense, useState, useEffect } from "react";
import detailStyles from "../../dashboard.module.css";
import styles from "../../../styles/pos.module.css"
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Order } from "@/app/entities/order";
import { Receiveable } from "@/app/entities/receiveable";

const ReceiveableFormPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ReceiveableFormContent />
    </Suspense>
  );
};

function ReceiveableFormContent() {
  const [order, setOrder] = useState<Order>();
  const [currentReceiveable, setCurrentReceiveable] = useState<Receiveable>();
  const [total, setTotal] = useState(0)

 const searchParams = useSearchParams();
  const orderId = searchParams.get('id');

  
    async function fetchOrder() {
      fetch(`/api/orders/${orderId}`)
      .then((response) => response.json())
      .then((data) => {
        setOrder(data);
      })
      .catch((error) => {
        console.error('Error fetching product:', error);
      });
    }

    async function fetchReceiveable() {
      fetch(`/api/receiveables/${orderId}`)
      .then((response) => response.json())
      .then((data) => {
        setCurrentReceiveable(data);
      })
      .catch((error) => {
        console.error('Error fetching product:', error);
      });
    }

     useEffect(() => {
    fetchOrder()
    fetchReceiveable()  
    }, []);


  const handleSubmit = (e:  React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newOrder:Order = {
    ...order,
    customer: order?.customer || '',
    contact : order?.contact || '',
    total: order?.total || 0,
    products: order?.products || [],
    deliveryDate: order?.deliveryDate || '',
    deliveryAddress: order?.deliveryAddress || '',
      statusPayment: total < (order?.total||0) ? 'Sebagian' : 'Lunas'
    }
    updateOrder(newOrder);
  };

  async function updateOrder(data:Order){
    await fetch(`/api/orders/${orderId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then(() => {
      if(data.statusPayment === 'Lunas'){
        deleteReceiveable(data)
      }else{
        updateReceiveable(data)
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  }

  async function updateReceiveable(data:Order){
    const newReceiveable = {
      orderId:data.id,
      total:total
    }
    await fetch(`/api/receiveables/${orderId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newReceiveable),
    })
    .then((response) => response.json())
    .then(() => {
      window.location.href = "/dashboard/receiveable";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  }

  async function deleteReceiveable(data:Order){
    await fetch(`/api/receiveables/${orderId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then(() => {
      window.location.href = "/dashboard/receiveable";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  }

  return (
    <div className={detailStyles.container}>
          <header className={detailStyles.header}>
        <h1 className={detailStyles.title}>{'Update Receiveable'}</h1>
        <Link href="/dashboard/receiveable" className={detailStyles.backLink}>
          Back to Receiveables
        </Link>
      </header>
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label>Order Id</label>
        <input name="orderId" defaultValue={order?.id} readOnly />
      </div>
      <div className={styles.formGroup}>
        <label>Total Bayar</label>
        <input name="price" type="number" onChange={(e)=>{
          const { value } = e.target;
          setTotal((currentReceiveable?.total || 0) + Number(value))
        }} required />
      </div>
      <button type="submit">{'Submit Receiveable'}</button>
    </form>
    </div>
  );
}

export default ReceiveableFormPage;