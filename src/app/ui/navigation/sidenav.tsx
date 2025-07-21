import Link from 'next/link';
import NavLinks from './nav-links';
import styles from './sidenav.module.css';
import Image from 'next/image';

export default function SideNav() {
  return (
    <div className={styles.sidenav}>
      <Link href="/">
      <Image
            src="/logo-sebelaspilar.jpeg"
            alt="Logo Sebelas Pilar"
            width={64}
            height={64}
            style={{
              width:'auto',
              height:'auto'
            }}/>
      </Link>
      <div className={styles.navContainer}>
        <NavLinks />
      </div>
    </div>
  );
}