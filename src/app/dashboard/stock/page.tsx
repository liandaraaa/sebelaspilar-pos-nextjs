'use client';
import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, Typography, Box
} from '@mui/material';

const initialStock = [
  { id: 1, nama: 'Produk A', stock: 10, hargaBeli: 50000, supplier: 'Supplier X' },
  { id: 2, nama: 'Produk B', stock: 0, hargaBeli: 75000, supplier: 'Supplier Y' },
  { id: 3, nama: 'Produk C', stock: 5, hargaBeli: 60000, supplier: 'Supplier Z' },
];

function StockPage() {
  const [stockList, setStockList] = useState(initialStock);

  const handleAddStock = () => {
    // Implementasi logika tambah stock baru
    alert('Fitur tambah stock baru');
  };

  const handleBuyFromSupplier = (produk) => {
    // Implementasi logika beli dari supplier
    alert(`Beli ${produk.nama} dari ${produk.supplier}`);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Stock Barang
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddStock}
        sx={{ mb: 2 }}
      >
        Tambah Stock Baru
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nama Produk</TableCell>
              <TableCell>Stock Tersedia</TableCell>
              <TableCell>Harga Beli</TableCell>
              <TableCell>Supplier</TableCell>
              <TableCell>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stockList.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.nama}</TableCell>
                <TableCell>{row.stock}</TableCell>
                <TableCell>Rp {row.hargaBeli.toLocaleString()}</TableCell>
                <TableCell>{row.supplier}</TableCell>
                <TableCell>
                  {row.stock === 0 && (
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleBuyFromSupplier(row)}
                    >
                      Beli dari Supplier
                    </Button>
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