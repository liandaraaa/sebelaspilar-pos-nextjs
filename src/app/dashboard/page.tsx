'use client';
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type SummaryItem = {
  label: string;
  value: number;
  color: string;
};

type Notification = {
  type: string;
  message: string;
};

const summaryData: SummaryItem[] = [
  { label: 'Total Saldo Kas', value: 15000000, color: '#4caf50' },
  { label: 'Total Piutang', value: 3500000, color: '#2196f3' },
  { label: 'Total Hutang', value: 2000000, color: '#f44336' },
  { label: 'Profit', value: 5000000, color: '#ff9800' },
];

const cashFlowData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Arus Kas',
      data: [2000000, 2500000, 1800000, 3000000, 3500000, 4000000],
      fill: false,
      borderColor: '#4caf50',
      backgroundColor: '#4caf50',
      tension: 0.4,
    },
  ],
};

const notifications: Notification[] = [
  { type: 'Order Pending', message: 'Order #12345 belum diproses.' },
  { type: 'Jatuh Tempo', message: 'Customer B akan jatuh tempo dalam 3 hari.' },
];

const Dashboard: React.FC = () => {
  return (
    <div style={{ padding: 32, fontFamily: 'Arial, sans-serif' }}>
      <div style={{ display: 'flex', gap: 24, marginBottom: 32 }}>
        {summaryData.map((item) => (
          <div
            key={item.label}
            style={{
              flex: 1,
              background: item.color,
              color: '#fff',
              borderRadius: 8,
              padding: 24,
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
          >
            <div style={{ fontSize: 18, marginBottom: 8 }}>{item.label}</div>
            <div style={{ fontSize: 28, fontWeight: 'bold' }}>
              Rp {item.value.toLocaleString('id-ID')}
            </div>
          </div>
        ))}
      </div>

      {/* Grafik Arus Kas */}
      <div style={{ marginBottom: 32 }}>
        <h3>Grafik Arus Kas</h3>
        <div style={{ maxWidth: 600 }}>
          <Line data={cashFlowData} />
        </div>
      </div>

      {/* Notifikasi */}
      <div>
        <h3>Notifikasi</h3>
        <ul>
          {notifications.map((notif, idx) => (
            <li key={idx} style={{ marginBottom: 8 }}>
              <strong>{notif.type}:</strong> {notif.message}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;