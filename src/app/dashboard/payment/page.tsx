'use client';
import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Input,
} from "@mui/material";
import { formatRupiah } from "@/app/lib/utils";

const initialPiutang = [
  {
    id: 1,
    nama: "PT. Maju Jaya",
    sisa: 5000000,
    jatuhTempo: "2024-07-10",
    status: "Belum Lunas",
  },
  {
    id: 2,
    nama: "CV. Sukses Selalu",
    sisa: 2500000,
    jatuhTempo: "2024-07-15",
    status: "Belum Lunas",
  },
];

const initialHutang = [
  {
    id: 1,
    pihak: "Supplier A",
    total: 3000000,
    status: "Belum Lunas",
  },
  {
    id: 2,
    pihak: "Supplier B",
    total: 1500000,
    status: "Belum Lunas",
  },
];

export default function PaymentPage() {
  const [piutang, setPiutang] = useState(initialPiutang);
  const [hutang, setHutang] = useState(initialHutang);
  const [open, setOpen] = useState(false);
  const [formType, setFormType] = useState(""); // "piutang" atau "hutang"
  const [selectedId, setSelectedId] = useState<number>(0);
  const [jumlah, setJumlah] = useState("");
  // const [bukti, setBukti] = useState(null);

  const handleOpen = (type:string, id:number) => {
    setFormType(type);
    setSelectedId(id);
    setOpen(true);
    setJumlah("");
    // setBukti(null);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formType === "piutang") {
      setPiutang((prev) =>
        prev.map((item) =>
          item.id === selectedId
            ? {
                ...item,
                sisa: Math.max(0, item.sisa - Number(jumlah)),
                status: Number(jumlah) >= item.sisa ? "Lunas" : "Belum Lunas",
              }
            : item
        )
      );
    } else if (formType === "hutang") {
      setHutang((prev) =>
        prev.map((item) =>
          item.id === selectedId
            ? {
                ...item,
                total: Math.max(0, item.total - Number(jumlah)),
                status: Number(jumlah) >= item.total ? "Lunas" : "Belum Lunas",
              }
            : item
        )
      );
    }
    setOpen(false);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Daftar Piutang
      </Typography>
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nama Customer</TableCell>
              <TableCell>Sisa Piutang</TableCell>
              <TableCell>Tanggal Jatuh Tempo</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {piutang.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.nama}</TableCell>
                <TableCell>{formatRupiah(item.sisa)}</TableCell>
                <TableCell>{item.jatuhTempo}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>
                  {item.status !== "Lunas" && (
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleOpen("piutang", item.id)}
                    >
                      Bayar
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h5" gutterBottom>
        Daftar Hutang ke Pihak Ketiga
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Pihak Ketiga</TableCell>
              <TableCell>Total Hutang</TableCell>
              <TableCell>Status Pembayaran</TableCell>
              <TableCell>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {hutang.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.pihak}</TableCell>
                <TableCell>{formatRupiah(item.total)}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>
                  {item.status !== "Lunas" && (
                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      onClick={() => handleOpen("hutang", item.id)}
                    >
                      Bayar Hutang
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog Form Pembayaran */}
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>
            {formType === "piutang" ? "Pembayaran Piutang" : "Pembayaran Hutang"}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ mt: 1 }}>
              <TextField
                label="Jumlah Dibayar"
                type="number"
                fullWidth
                value={jumlah}
                onChange={(e) => setJumlah(e.target.value)}
                required
                inputProps={{ min: 1 }}
                sx={{ mb: 2 }}
              />
              <Input
                type="file"
                required
                fullWidth
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Batal</Button>
            <Button type="submit" variant="contained">
              Simpan Pembayaran
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}