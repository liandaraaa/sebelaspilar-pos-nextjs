'use client';
import React, {useState, useEffect} from 'react';
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
import { Purchase } from '../entities/purchase';
import { Receiveable } from '../entities/receiveable';
import { Order } from '../entities/order';

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

const Dashboard: React.FC = () => {

  const [summaryData, setSummaryData] = useState<SummaryItem[]>([]);

  async function fetchOrders(): Promise<Order[]> {
    return fetch(`/api/orders/`)
      .then((response) => response.json())
      .then((data: Order[]) => {
        const orders = data.filter((item) => item.statusPayment === 'Lunas');
        return orders;
      })
      .catch((error) => {
        console.error('Error fetching order:', error);
        return [];
      });
  }
  
  async function fetchDebts(): Promise<Purchase[]> {
    return fetch(`/api/purchases/`)
      .then((response) => response.json())
      .then((data: Purchase[]) => {
        const debts = data.filter((item) => item.status === 'Belum Lunas');
        return debts;
      })
      .catch((error) => {
        console.error('Error fetching debts:', error);
        return [];
      });
  }
  
  async function fetchReceiveables(): Promise<Receiveable[]> {
    return fetch(`/api/receiveables/`)
      .then((response) => response.json())
      .then((data: Receiveable[]) => {
        return data;
      })
      .catch((error) => {
        console.error('Error fetching receiveables:', error);
        return [];
      });
  }


  useEffect(() => {
    Promise.all([fetchOrders(), fetchDebts(), fetchReceiveables()])
      .then(([orders, debts, receiveables]) => {
        setSummaryData((prev) => [
          ...prev,
          { label: 'Total Saldo Kas', value: orders.map((order) => order.total).reduce((acc, value) => acc + value, 0), color: '#4caf50' },
          { label: 'Total Hutang', value: debts.length > 0 ? debts.map((debt) => debt.total).reduce((acc, value) => acc + value, 0) : 0, color: '#f44336' },
          { label: 'Total Piutang', value: receiveables.length > 0 ? receiveables.map((rec) => rec.total).reduce((acc, value) => acc + value, 0) : 0, color: '#2196f3' },
       
        ]);
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  }, []);
  

  return (
    <div style={{ padding: 32, fontFamily: 'Arial, sans-serif' }}>
      <div style={{ display: 'flex', gap: 24, marginBottom: 32 }}>
        {summaryData?.map((item) => (
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
      {/* <div style={{ marginBottom: 32 }}>
        <h3>Grafik Arus Kas</h3>
        <div style={{ maxWidth: 600 }}>
          <Line data={cashFlowData} />
        </div>
      </div> */}

      {/* Notifikasi */}
      {/* <div>
        <h3>Notifikasi</h3>
        <ul>
          {notifications.map((notif, idx) => (
            <li key={idx} style={{ marginBottom: 8 }}>
              <strong>{notif.type}:</strong> {notif.message}
            </li>
          ))}
        </ul>
      </div> */}
    </div>
  );
};

export default Dashboard;