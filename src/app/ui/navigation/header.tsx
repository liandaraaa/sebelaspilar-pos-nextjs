'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '#why-choose-us', label: 'Why Choose Us?' },
  { href: '#contact', label: 'Contact Us' },
  { href: '/auth/login', label: 'Login' },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header 
    style={{ 
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        padding: '1rem',
        borderBottom: '1px solid #eee',
        maxWidth: '100%'
      }}>
      <nav>
        <div style={{ padding:'1 rem', display: 'flex', justifyContent: 'space-between'}}>
          <h1 style={{ margin: 0 }}>CV Sebelas Pilar</h1>
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
        </div>
      </nav>
    </header>
  );
}