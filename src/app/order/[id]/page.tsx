import React from "react";

const OrderDetailPage: React.FC<{ params: { id: string } }> = async ({ params }) => {
  const { id } = await params; // Access the dynamic route parameter

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Order Detail</h1>
      <p>Order ID: {id}</p>
      {/* Add more details or fetch data based on the ID */}
    </div>
  );
};

export default OrderDetailPage;