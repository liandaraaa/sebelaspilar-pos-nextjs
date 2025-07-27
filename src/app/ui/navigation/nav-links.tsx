'use client';

import { Badge } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/lib/store';
import { signOut } from 'next-auth/react';

type NavItem = {
  href: string;
  label: string;
  icon?: string;
  badgeCount?: number;
}

const navItems:NavItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: '🏠' },
  { href: '/dashboard/order', label: 'Order Management', icon: '📋'},
  { href: '/dashboard/stock', label: 'Stock Management', icon: '📦' },
  { href: '/dashboard/payment', label: 'Payment Management', icon: '💳' },
  { href: '/dashboard/report', label: 'Report', icon: '📊' },
  { href: '/dashboard/settings', label: 'Settings', icon: '⚙️' },
  { href: '/', label: 'Sign Out', icon: '🚪' },
];

export default function Header() {
  const pathname = usePathname();

  const badgeCount = useSelector((state: RootState) => state.counter.value);
  const orderMenu = navItems.find((item) => item.href === '/dashboard/order');
  if(orderMenu){
    orderMenu.badgeCount = badgeCount;
  }

  return (
    <nav>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', listStyle: 'none', margin: 0, padding: 0 }}>
          {navItems.map((item) =>{
            const LinkIcon = item.icon ? <span style={{ marginRight: '0.5rem' }}>{item.icon}</span> : null;
            return  (
              <li key={item.href}>
                <div>
                <Link
                  href={item.href}
                  style={{
                    textDecoration: pathname === item.href ? 'underline' : 'none',
                    color: pathname === item.href ? 'blue' : 'black',
                    backgroundColor: pathname === item.href ? '#f0f0f0' : 'transparent',
                    padding: '1rem',
                    borderRadius: '4px',
                    transition: 'background-color 0.3s ease',
                  }}
                  onClick={()=>{
                    if(item.href === '/'){
                      signOut({callbackUrl: '/auth/login'})
                    }
                  }}
                >
                  {
                    item.icon && LinkIcon
                  }
                  {item.label}
                </Link>
                {item.badgeCount && <Badge badgeContent={item.badgeCount} color="error" />}
                </div>
              </li>
            )
          })}
        </ul>
      </nav>
  );
}