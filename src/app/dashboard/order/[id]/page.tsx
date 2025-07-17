import React from "react";
import { use } from 'react'

const OrderDetailPage: React.FC<{ params: Promise<{ id: string }> }> = ({ params }) => {
  const { id } = use(params); // Access the dynamic route parameter

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Order Detail</h1>
      <p>Order ID: {id}</p>
      {/* Add more details or fetch data based on the ID */}
    </div>
  );
};

export default OrderDetailPage;