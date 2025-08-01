'use client';
import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, Typography, Box
} from '@mui/material';
import { Product } from '@/app/entities/product';
import Link from 'next/link';
import styles from '../../styles/pos.module.css'
import { formatRupiah } from '@/app/lib/utils';

function StockPage() {
  const [stockList, setStockList] = useState<Product[]>();

  async function fetchProducts() {
    fetch(`/api/products/`)
    .then((response) => response.json())
    .then((data) => {
      setStockList(data);
    })
    .catch((error) => {
      console.error('Error fetching order:', error);
    });
  }

  useEffect(()=>{
    fetchProducts()
  },[])

   async function deleteData(id:string){
      await fetch(`/api/products/${id}`, {
        method: 'DELETE'
      }).then(() => {
          fetchProducts()
          })
          .catch((error) => {
            console.error('Error fetching order:', error);
          });
        }
    

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Stock Barang
      </Typography>
     <Link
     href='/dashboard/stock/form'>
     <Button
        variant="contained"
        color="primary"
        sx={{ mb: 2 }}
      >
        Tambah Stock Baru
      </Button></Link>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nama Produk</TableCell>
              <TableCell>Stock Tersedia</TableCell>
              <TableCell>Harga Beli</TableCell>
              <TableCell>Harga Jual</TableCell>
              <TableCell>Supplier</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stockList?.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row?.name}</TableCell>
                <TableCell>{row?.stock}</TableCell>
                <TableCell>{formatRupiah(row.price)}</TableCell>
                <TableCell>{formatRupiah(row.buyPrice)}</TableCell>
                <TableCell>{row.supplier}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>
                <Link
                href={`/dashboard/stock/${row.id}`}>
                <Button
                    className={styles.addButton}
                  color='warning'
                >
                  View
                </Button>
                </Link>
                <Link
                href={`/dashboard/stock/form?mode=update&id=${row.id}`}>
                <Button
                    className={styles.addButton}
                  color="warning"
                >
                  Update
                </Button>
                </Link>
                <Button
                    className={styles.addButton}
                  color='error'
                  onClick={() => {
                    if(row.id){
                      deleteData(row.id)
                    }
                  }}
                >
                  Delete
                </Button>
                  {row.stock === 0 && (
                   <Link
                   href={`/dashboard/purchase/form?id=${row.id}`}>
                    <Button
                      variant="outlined"
                      color="secondary"
                    >
                      Beli
                    </Button></Link>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default StockPage;