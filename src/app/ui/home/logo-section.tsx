'use client';
import Image from 'next/image';
import styles from '../../styles/pos.module.css';

export default function LogoSection() {
  return (
    <section id='home' className={styles.fullscreen}>
      <div style={{ textAlign: 'center' }}>
        <Image
          src="/logo-sebelaspilar.jpeg"
          alt="Alat Perkantoran"
          width={400}
          height={250}
          style={{ borderRadius: 8 }}
        />
      </div>
      <p style={{ textAlign: 'center', fontSize: '1.2rem', marginTop: '1rem' }}>
        Solusi Alat Perkantoran Terlengkap di Jabodetabek
      </p>
    </section>
  );
}