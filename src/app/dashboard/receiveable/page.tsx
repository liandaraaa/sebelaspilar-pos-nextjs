'use client';
import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  Paper, Button, Typography, Box,
  TableRow
} from '@mui/material';
import Link from 'next/link';
import { formatRupiah } from '@/app/lib/utils';
import { Order } from '@/app/entities/order';
import { Receiveable } from '@/app/entities/receiveable';

function ReceiveablePage() {
  const [orderList, setOrderList] = useState<Order[]>();
  const [receiveableList, setReceiveableList] = useState<Receiveable[]>();

  async function fetchOrders() {
    fetch(`/api/orders/`)
    .then((response) => response.json())
    .then((data:Order[]) => {
      const orders = data.filter((item)=>item.statusPayment !== 'Lunas')
      setOrderList(orders);
    })
    .catch((error) => {
      console.error('Error fetching order:', error);
    });
  }

  async function fetchReceiveables() {
    fetch(`/api/receiveables/`)
    .then((response) => response.json())
    .then((data:Receiveable[]) => {
      setReceiveableList(data);
    })
    .catch((error) => {
      console.error('Error fetching order:', error);
    });
  }

  useEffect(()=>{
    fetchReceiveables()
    fetchOrders()
  },[])

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Receiveables
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
            <TableCell>Nama Customer</TableCell>
              <TableCell>Sisa Hutang</TableCell>
              <TableCell>Tenggat Waktu</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {receiveableList?.map((receiveable) => {
              const currentOrder = orderList?.find((ord)=>ord.id === receiveable.orderId)
              console.log('cek current order', currentOrder)
              console.log('cek current rec', receiveable)
              return (
                <TableRow key={receiveable.orderId}>
                  <TableCell>{currentOrder?.customer}</TableCell>
                  <TableCell>{formatRupiah((currentOrder?.total || 0) - receiveable?.total)}</TableCell>
                  <TableCell>{currentOrder?.deadline}</TableCell>
                  <TableCell>{currentOrder?.statusPayment}</TableCell>
                  <TableCell>
                    <Link
                    href={`/dashboard/receiveable/form?id=${receiveable.orderId}`}>
                      <Button
                        variant="outlined"
                        color="secondary"
                      >
                        Bayar
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default ReceiveablePage;