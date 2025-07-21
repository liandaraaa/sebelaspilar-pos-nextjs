'use client'

import SideNav from "../ui/navigation/sidenav";
import styles from "@/app/styles/pos.module.css";
import { Provider } from 'react-redux'
import { store } from '../lib/store';
import OrderProvider from "../ui/provider/OrderProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
   <Provider 
   store={store}>
    <OrderProvider>
     <div className={styles.layout}>
      <div className={styles.sidenavContainer}>
        <SideNav />
      </div>
      <div className={styles.content}>{children}</div>
    </div>
    </OrderProvider>
   </Provider>
  );
}