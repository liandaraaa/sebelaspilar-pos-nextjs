'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/order', label: 'List Order' },
  { href: '/stock', label: 'Stock Management' },
  { href: '/payment', label: 'Payment Management' },
  { href: '/report', label: 'Report' },
  { href: '/settings', label: 'Settings' },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header style={{ padding: '1rem', borderBottom: '1px solid #eee' }}>
      <nav>
        <ul style={{ display: 'flex', gap: '1rem', listStyle: 'none', margin: 0, padding: 0 }}>
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                style={{
                  textDecoration: pathname === item.href ? 'underline' : 'none',
                  color: pathname === item.href ? 'blue' : 'black',
                }}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}