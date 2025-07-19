import { NextRequest, NextResponse } from "next/server";
import { neon } from '@neondatabase/serverless';

const sql = neon(`${process.env.DATABASE_URL}`);
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
){
  try{
    const { id } = await params;
  const order = await sql`SELECT * FROM orders WHERE id = ${id}`;

  if (!order) {
    return NextResponse.json({ message: `Order with ID ${id} not found` }, { status: 404 });
  }
  
  return NextResponse.json(order[0]);
  }catch(error){
    return NextResponse.json({ message: 'failed to get data caused by ', error }, { status: 400 })
  } 
}


export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {

    const { id } = await params;
  
    const { customer, contact, products, total, deliveryDate, deliveryAddress, note } = await request.json();
  
    if(!customer || !contact || !products || !total || !deliveryDate || !deliveryAddress ){
      return NextResponse.json({ message: 'customerName, contact, products, total, deliveryDate, deliveryAddress are required' }, { status: 400 });
    }

    console.log('cek put db date format', deliveryDate)
  
    const order = await sql`
    UPDATE orders SET 
      customer = ${customer},
      contact = ${contact},
      products = ${JSON.stringify(products)},
      total = ${total},
      "deliveryDate" = ${deliveryDate},
      "deliveryAddress" = ${deliveryAddress},
      note = ${note}
    WHERE id = ${id}
    `

    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: `Invalid request body because ${error}` }, { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try{
    const { id } = await params;

    await sql`DELETE FROM orders WHERE id = ${id}`;
    return NextResponse.json({ message: `Order with ID ${id} has been deleted` }, { status: 200 });

  }catch(error){
    return NextResponse.json({message: `Invalid request body because ${error}`,}, { status: 204 }); // 204 No Content
  }
}