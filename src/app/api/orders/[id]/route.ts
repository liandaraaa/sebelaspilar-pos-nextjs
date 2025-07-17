import { NextRequest, NextResponse } from "next/server";
import { orders } from "../order-mock";
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
){
  const { id } = await params;
  const order = orders.find((o) => o.id === id);

  if (!order) {
    return NextResponse.json({ message: `Order with ID ${id} not found` }, { status: 404 });
  }
  
  return NextResponse.json(order);
}


export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const orderIndex = orders.findIndex((o) => o.id === id);

  if (orderIndex === -1) {
    return NextResponse.json({ message: `Order with ID ${id} not found` }, { status: 404 });
  }

  try {
    const { customer, contact, products, total, deliveryDate, deliveryAddress, note } = await request.json();
    const item = orders[orderIndex]

    if(!customer || !contact || !products || !total || !deliveryDate || !deliveryAddress ){
      return NextResponse.json({ message: 'customerName, contact, products, total, deliveryDate, deliveryAddress are required' }, { status: 400 });
    }
    
    item.customer = customer;
    item.contact = contact;
    item.products = products;
    item.total = total;
    item.deliveryDate = deliveryDate;
    item.deliveryAddress = deliveryAddress;
    item.note = note;

    orders[orderIndex] = item;
    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json({ message: `Invalid request body because ${error}` }, { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const orderIndex = orders.findIndex((o) => o.id === id);

  if (orderIndex === -1 || !orders[orderIndex]) {
    return NextResponse.json({ message: `Order with ID ${id} not found` }, { status: 404 });
  }

  orders.splice(orderIndex, 1);

  return new NextResponse(null, { status: 204 }); // 204 No Content
}