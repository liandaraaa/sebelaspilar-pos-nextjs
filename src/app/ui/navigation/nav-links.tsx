'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: '🏠' },
  { href: '/dashboard/order', label: 'Order Management', icon: '📋' },
  { href: '/dashboard/stock', label: 'Stock Management', icon: '📦' },
  { href: '/dashboard/payment', label: 'Payment Management', icon: '💳' },
  { href: '/dashboard/report', label: 'Report', icon: '📊' },
  { href: '/dashboard/settings', label: 'Settings', icon: '⚙️' },
  { href: '/dashboard/signout', label: 'Sign Out', icon: '🚪' },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <nav>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', listStyle: 'none', margin: 0, padding: 0 }}>
          {navItems.map((item) =>{
            const LinkIcon = item.icon ? <span style={{ marginRight: '0.5rem' }}>{item.icon}</span> : null;
            return  (
              <li key={item.href}>
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
                >
                  {
                    item.icon && LinkIcon
                  }
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
  );
}