'use client';
import styles from '../../styles/pos.module.css';

export default function ContactSection() {
  return (
    <section
    id='contact'
    className={styles.fullscreen}>
      <h3>Hubungi Kami</h3>
      <p>
        Dapatkan penawaran terbaik untuk kebutuhan kantor Anda.<br />
        <strong>Telepon/WA:</strong> 0812-3456-7890<br />
        <strong>Email:</strong> info@sebelaspilar.co.id
      </p>
      <a
        href="https://wa.me/6281234567890"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.link}
      >
        Chat via WhatsApp
      </a>
    </section>
  );
}