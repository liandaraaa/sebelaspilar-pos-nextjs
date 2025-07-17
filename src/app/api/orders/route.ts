import { NextRequest, NextResponse } from 'next/server';
import { orders } from './order-mock';
import { Order } from '@/app/entities/order';

export async function GET() {
  return NextResponse.json(orders);
}
export async function POST(request: NextRequest) {
  try {
    const newOrderData = await request.json();

    if (!newOrderData.customer || !newOrderData.products || newOrderData.products.length === 0) {
      return NextResponse.json({ message: 'customerName and items are required' }, { status: 400 });
    }

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      ...newOrderData,
      statusOrder: 'Pending',
      statusPayment: 'Belum Bayar',
      statusDelivery: 'Belum Dikirim',
      date: new Date(),
      deadline: new Date(new Date().getTime() + 90 * 24 * 60 * 60 * 1000), // 30 days from now
    };

    orders.push(newOrder);
    return NextResponse.json(newOrder, { status: 201 });
  } catch (e) {
    return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
  }
}

