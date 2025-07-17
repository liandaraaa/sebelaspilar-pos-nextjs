'use client';
import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Grid,
  Button,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

// Komponen Kelola Data Karyawan
const EmployeeManagement = () => {
  // Dummy data
  const [employees, setEmployees] = React.useState([
    { id: 1, name: 'Budi', profitShare: '10%' },
    { id: 2, name: 'Siti', profitShare: '15%' },
  ]);
  const [newEmployee, setNewEmployee] = React.useState({ name: '', profitShare: '' });

  const handleAdd = () => {
    if (!newEmployee.name || !newEmployee.profitShare) return;
    setEmployees([
      ...employees,
      { id: Date.now(), ...newEmployee },
    ]);
    setNewEmployee({ name: '', profitShare: '' });
  };

  const handleDelete = (id: number) => {
    setEmployees(employees.filter(e => e.id !== id));
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardHeader title="Kelola Data Karyawan (Pembagian Profit)" />
      <CardContent>
        <List>
          {employees.map(emp => (
            <ListItem key={emp.id}>
              <ListItemText
                primary={emp.name}
                secondary={`Pembagian Profit: ${emp.profitShare}`}
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" color="error" onClick={() => handleDelete(emp.id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
        <Divider sx={{ my: 2 }} />
        <Grid container spacing={2}>
        <TextField
              label="Nama Karyawan"
              value={newEmployee.name}
              onChange={e => setNewEmployee({ ...newEmployee, name: e.target.value })}
              size="small"
              fullWidth
            />
        <TextField
              label="Pembagian Profit (%)"
              value={newEmployee.profitShare}
              onChange={e => setNewEmployee({ ...newEmployee, profitShare: e.target.value })}
              size="small"
              fullWidth
            />
          <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAdd}
              fullWidth
            >
              Tambah
            </Button>
        </Grid>
      </CardContent>
    </Card>
  );
};

// Komponen Konfigurasi Supplier
const SupplierConfig = () => {
  // Dummy data
  const [suppliers, setSuppliers] = React.useState([
    { id: 1, name: 'PT Sumber Makmur' },
    { id: 2, name: 'CV Jaya Abadi' },
  ]);
  const [newSupplier, setNewSupplier] = React.useState('');

  const handleAdd = () => {
    if (!newSupplier) return;
    setSuppliers([...suppliers, { id: Date.now(), name: newSupplier }]);
    setNewSupplier('');
  };

  const handleDelete = (id: number) => {
    setSuppliers(suppliers.filter(s => s.id !== id));
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardHeader title="Konfigurasi Supplier" />
      <CardContent>
        <List>
          {suppliers.map(sup => (
            <ListItem key={sup.id}>
              <ListItemText primary={sup.name} />
              <ListItemSecondaryAction>
                <IconButton edge="end" color="error" onClick={() => handleDelete(sup.id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
        <Divider sx={{ my: 2 }} />
        <Grid container spacing={2}>
        <TextField
              label="Nama Supplier"
              value={newSupplier}
              onChange={e => setNewSupplier(e.target.value)}
              size="small"
              fullWidth
            />
          <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAdd}
              fullWidth
            >
              Tambah
            </Button>
        </Grid>
      </CardContent>
    </Card>
  );
};

// Komponen Konfigurasi Pihak Ketiga
const ThirdPartyConfig = () => {
  // Dummy data
  const [thirdParties, setThirdParties] = React.useState([
    { id: 1, name: 'JNE' },
    { id: 2, name: 'GoPay' },
  ]);
  const [newThirdParty, setNewThirdParty] = React.useState('');

  const handleAdd = () => {
    if (!newThirdParty) return;
    setThirdParties([...thirdParties, { id: Date.now(), name: newThirdParty }]);
    setNewThirdParty('');
  };

  const handleDelete = (id: number) => {
    setThirdParties(thirdParties.filter(t => t.id !== id));
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardHeader title="Konfigurasi Pihak Ketiga" />
      <CardContent>
        <List>
          {thirdParties.map(tp => (
            <ListItem key={tp.id}>
              <ListItemText primary={tp.name} />
              <ListItemSecondaryAction>
                <IconButton edge="end" color="error" onClick={() => handleDelete(tp.id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
        <Divider sx={{ my: 2 }} />
        <Grid container spacing={2}>
        <TextField
              label="Nama Pihak Ketiga"
              value={newThirdParty}
              onChange={e => setNewThirdParty(e.target.value)}
              size="small"
              fullWidth
            />
           <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAdd}
              fullWidth
            >
              Tambah
            </Button>
        </Grid>
      </CardContent>
    </Card>
  );
};

// Komponen Pengaturan Akun Pengguna
const UserAccountSettings = () => {
  // Dummy data
  const [user, setUser] = React.useState({
    name: 'Admin',
    email: 'admin@email.com',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // Simulasi simpan data
    alert('Pengaturan akun disimpan!');
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardHeader title="Pengaturan Akun Pengguna" />
      <CardContent>
        <Grid container spacing={2}>
        <TextField
              label="Nama"
              name="name"
              value={user.name}
              onChange={handleChange}
              fullWidth
              size="small"
            />
          <TextField
              label="Email"
              name="email"
              value={user.email}
              onChange={handleChange}
              fullWidth
              size="small"
            />
          <TextField
              label="Password Baru"
              name="password"
              type="password"
              value={user.password}
              onChange={handleChange}
              fullWidth
              size="small"
            />
          <Button variant="contained" onClick={handleSave}>
              Simpan
            </Button>
        </Grid>
      </CardContent>
    </Card>
  );
};

// Halaman Setting Utama
const SettingPage = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Pengaturan Sistem
      </Typography>
      <EmployeeManagement />
      <SupplierConfig />
      <ThirdPartyConfig />
      <UserAccountSettings />
    </Box>
  );
};

export default SettingPage;