import { NextRequest, NextResponse } from 'next/server';
import { Order } from '@/app/entities/order';
import { neon } from '@neondatabase/serverless';

const sql = neon(`${process.env.DATABASE_URL}`);

export async function GET() {
  try{
  const orders = await sql`SELECT * FROM orders`;
  return NextResponse.json(orders);
  }catch(error){
    return NextResponse.json({ message: 'failed to get data caused by ', error }, { status: 400 })
  }
}
export async function POST(request: NextRequest) {
  try {
    const newOrderData = await request.json();

    if (!newOrderData.customer || !newOrderData.products || newOrderData.products.length === 0) {
      return NextResponse.json({ message: 'customerName and items are required' }, { status: 400 });
    }

    const order: Order = {
      id: `ord-${Date.now()}`,
      ...newOrderData,
      statusOrder: 'Pending',
      statusPayment: 'Belum Bayar',
      statusDelivery: 'Belum Dikirim',
      date: new Date(),
      deadline: new Date(new Date().getTime() + 90 * 24 * 60 * 60 * 1000), // 30 days from now
    };

    await sql`
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
    `
    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: `Invalid request body because ${error}` }, { status: 400 });
  }
}

