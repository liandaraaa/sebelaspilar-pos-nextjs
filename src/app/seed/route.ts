
'use server'

import { neon } from '@neondatabase/serverless';
import { orders as mockOrders } from '../api/orders/order-mock';

const sql = neon(`${process.env.DATABASE_URL}`);

async function seedOrders() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
    CREATE TABLE IF NOT EXISTS orders (
      id VARCHAR(255) PRIMARY KEY,
      customer VARCHAR(255) NOT NULL,
      contact VARCHAR(50),
      "date" TIMESTAMP WITH TIME ZONE NOT NULL,
      total INT NOT NULL,
      "statusOrder" VARCHAR(50) NOT NULL,
      "statusPayment" VARCHAR(50) NOT NULL,
      deadline TIMESTAMP WITH TIME ZONE,
      products JSONB NOT NULL,
      "deliveryDate" TIMESTAMP WITHOUT TIME ZONE,
      "deliveryAddress" TEXT,
      "statusDelivery" VARCHAR(50),
      note TEXT
    );
  `;

  console.log(`Seeding ${mockOrders.length} orders...`);

  const insertedOrders = await Promise.all(
    mockOrders.map(
      (order) => 
        sql`
        INSERT INTO orders (id, customer, contact, "date", total, "statusOrder", "statusPayment", deadline, products, "deliveryDate", "deliveryAddress", "statusDelivery", note)
        VALUES (
          ${order.id || `ord-${order.contact}-${Date.now()}`}, 
          ${order.customer}, 
          ${order.contact}, 
          ${order.date || Date.now().toLocaleString()}, 
          ${order.total}, 
          ${order.statusOrder || "Pending"}, 
          ${order.statusPayment || "Belum Bayar"}, 
          ${order.deadline || new Date(new Date().getTime() + 90 * 24 * 60 * 60 * 1000)}, 
          ${JSON.stringify(order.products)}, 
          ${order.deliveryDate}, 
          ${order.deliveryAddress}, 
          ${order.statusDelivery || "Belum Dikirim"}, 
          ${order.note || ""}
        )
  ON CONFLICT (id) DO UPDATE SET
          customer = EXCLUDED.customer,
          contact = EXCLUDED.contact,
          "date" = EXCLUDED."date",
          total = EXCLUDED.total,
          "statusOrder" = EXCLUDED."statusOrder",
          "statusPayment" = EXCLUDED."statusPayment",
          deadline = EXCLUDED.deadline,
          products = EXCLUDED.products,
          "deliveryDate" = EXCLUDED."deliveryDate",
          "deliveryAddress" = EXCLUDED."deliveryAddress",
          "statusDelivery" = EXCLUDED."statusDelivery",
          note = EXCLUDED.note;  
        `,
    ),
  );

  return insertedOrders;
}

export async function GET() {
  try {
    await seedOrders();

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}