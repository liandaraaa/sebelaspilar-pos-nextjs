import Image from 'next/image';
import '../app/styles/theme.css'; // Import the CSS file

export default function Home() {
  return (
    <main>
      <header>
        <h1>CV Sebelas Pilar</h1>
        <p>Solusi Alat Perkantoran Terlengkap di Jabodetabek</p>
      </header>

      <section>
        <h2>Kenapa Pilih Kami?</h2>
        <ul>
          <li>Produk alat perkantoran lengkap & berkualitas</li>
          <li>Pengiriman cepat se-Jabodetabek</li>
          <li>
            <strong>Nikmati kemudahan pembayaran dengan cicilan maksimal 3 bulan tanpa bunga!</strong>
          </li>
          <li>Layanan pelanggan responsif</li>
        </ul>

        <div style={{ margin: '2rem 0', textAlign: 'center' }}>
          <Image
            src="/logo-sebelaspilar.jpeg"
            alt="Alat Perkantoran"
            width={400}
            height={250}
            style={{ borderRadius: 8 }}
          />
        </div>

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
        >
          Chat via WhatsApp
        </a>
      </section>

      <footer>
        &copy; {new Date().getFullYear()} CV Sebelas Pilar. All rights reserved.
      </footer>
    </main>
  );
}