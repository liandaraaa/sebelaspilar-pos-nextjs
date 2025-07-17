'use client';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import { ChangeEvent, useState } from "react";

interface ReportSummaryProps {
  title:string,
  value:string
}

const ReportSummary = ({ title, value }:ReportSummaryProps) => (
  <Card>
    <CardContent>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Typography variant="h5" color="primary">
        {value}
      </Typography>
    </CardContent>
  </Card>
);

const LaporanPage = () => {
  const [periode, setPeriode] = useState({
    dari: "",
    sampai: "",
  });

  const handleChange = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPeriode({
      ...periode,
      [e.target.name]: e.target.value,
    });
  };

  // Dummy data laporan
  const laporan = {
    profit: "Rp 10.000.000",
    arusKas: "Rp 5.000.000",
    piutang: "Rp 2.000.000",
    hutang: "Rp 1.000.000",
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Laporan Keuangan
      </Typography>
      {/* Filter Periode */}
      <Box sx={{ mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
        <TextField
              label="Dari"
              type="date"
              name="dari"
              value={periode.dari}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              size="small"
            />
         <TextField
              label="Sampai"
              type="date"
              name="sampai"
              value={periode.sampai}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              size="small"
            />
          <Button
              variant="contained"
              color="primary"
              startIcon={<PrintIcon />}
            >
              Export PDF / Cetak
            </Button>
        </Grid>
      </Box>

      {/* Ringkasan Laporan */}
      <Box>
        <Grid container spacing={2}>
        <ReportSummary title="Laporan Profit" value={laporan.profit} />
        <ReportSummary title="Laporan Arus Kas" value={laporan.arusKas} />
        <ReportSummary title="Laporan Piutang" value={laporan.piutang} />
        <ReportSummary title="Laporan Hutang" value={laporan.hutang} />
        </Grid>
      </Box>
    </Box>
  );
};

export default LaporanPage;