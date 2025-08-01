'use client';
import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  Paper, Button, Typography, Box,
  TableRow
} from '@mui/material';
import { Product } from '@/app/entities/product';
import { formatRupiah } from '@/app/lib/utils';
import { Purchase } from '@/app/entities/purchase';

function DebtPage() {
  const [debtList, setDebtList] = useState<Purchase[]>();
  const [products, setProducts] = useState<Product[]>();

  async function fetchDebts() {
    fetch(`/api/purchases/`)
    .then((response) => response.json())
    .then((data:Purchase[]) => {
      const debts = data.filter((item)=>item.status === 'Belum Lunas')
      setDebtList(debts);
    })
    .catch((error) => {
      console.error('Error fetching order:', error);
    });
  }

  async function fetchProducts() {
    fetch(`/api/products/`)
    .then((response) => response.json())
    .then((data:Product[]) => {
      setProducts(data);
    })
    .catch((error) => {
      console.error('Error fetching order:', error);
    });
  }

  useEffect(()=>{
    fetchDebts()
    fetchProducts()
  },[])

  async function updateData(data: Purchase){
    const newData = {
      ...data,
      status:"Lunas"
    }
      await fetch(`/api/purchases/${data.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      })
      .then((response) => response.json())
      .then(() => {
        fetchDebts()
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    }

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Debts
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
            <TableCell>Supplier</TableCell>
              <TableCell>Nama Produk</TableCell>
              <TableCell>Jumlah</TableCell>
              <TableCell>Total Harga</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {debtList?.map((debt) => {
              const currentProduct = products?.find((prod)=>prod.id === debt.productId)
              return (
                <TableRow key={debt.id}>
                  <TableCell>{currentProduct?.supplier}</TableCell>
                  <TableCell>{currentProduct?.name}</TableCell>
                  <TableCell>{debt.quantity}</TableCell>
                  <TableCell>{formatRupiah(debt.total)}</TableCell>
                  <TableCell>{debt.status}</TableCell>
                  <TableCell>
                  <Button
                        variant="outlined"
                        color="secondary"
                        onClick={()=>updateData(debt)}
                      >
                        Bayar
                      </Button>
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

export default DebtPage;