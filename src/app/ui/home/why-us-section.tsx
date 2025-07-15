'use client';
import styles from '../../styles/pos.module.css';

export default function WhyChooseUsSection() {
  return (
    <section id='why-choose-us' className={styles.fullscreen}>
      <h2>Kenapa Pilih Kami?</h2>
      <ul>
        <li>Produk alat perkantoran lengkap & berkualitas</li>
        <li>Pengiriman cepat se-Jabodetabek</li>
        <li>
          <strong>Nikmati kemudahan pembayaran dengan cicilan maksimal 3 bulan tanpa bunga!</strong>
        </li>
        <li>Layanan pelanggan responsif</li>
      </ul>
    </section>
  );
}