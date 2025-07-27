'use client'

import SideNav from "../ui/navigation/sidenav";
import styles from "@/app/styles/pos.module.css";
import { Provider } from 'react-redux'
import { store } from '../lib/store';
import OrderProvider from "../ui/provider/OrderProvider";
import UserProfile from "../ui/user/user-profile";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
   <Provider 
   store={store}>
    <OrderProvider>
     <div className={styles.layout}>
      <div className={styles.sidenavContainer}>
        <SideNav />
      </div>
      <div className={styles.content} style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <header style={{
          display: 'flex',
          justifyContent: 'flex-end',
          padding: '1rem',
          borderBottom: '1px solid #e5e7eb',
          backgroundColor: '#ffffff',
        }}>
          <UserProfile />
        </header>
        <main style={{ flexGrow: 1, overflowY: 'auto', backgroundColor: '#f9fafb' }}>{children}</main>
      </div>
    </div>
    </OrderProvider>
   </Provider>
  );
}