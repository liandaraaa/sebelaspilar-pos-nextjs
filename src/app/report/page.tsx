'use client';
import React, { useRef } from "react";
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
import { useReactToPrint } from "react-to-print";

const ReportSummary = ({ title, value }) => (
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
  const [periode, setPeriode] = React.useState({
    dari: "",
    sampai: "",
  });

  const handleChange = (e) => {
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

  const printRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: "Laporan-Keuangan",
  });

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Laporan Keuangan
      </Typography>
      {/* Filter Periode */}
      <Box sx={{ mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <TextField
              label="Dari"
              type="date"
              name="dari"
              value={periode.dari}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              size="small"
            />
          </Grid>
          <Grid item>
            <TextField
              label="Sampai"
              type="date"
              name="sampai"
              value={periode.sampai}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              size="small"
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              startIcon={<PrintIcon />}
              onClick={handlePrint}
            >
              Export PDF / Cetak
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Ringkasan Laporan */}
      <Box ref={printRef}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <ReportSummary title="Laporan Profit" value={laporan.profit} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ReportSummary title="Laporan Arus Kas" value={laporan.arusKas} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ReportSummary title="Laporan Piutang" value={laporan.piutang} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ReportSummary title="Laporan Hutang" value={laporan.hutang} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default LaporanPage;