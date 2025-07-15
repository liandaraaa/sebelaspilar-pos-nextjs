'use client';
import LogoSection from './ui/home/logo-section';
import WhyChooseUsSection from './ui/home/why-us-section';
import ContactSection from './ui/home/contact-section';
import styles from './styles/pos.module.css';
import Header from './ui/navigation/header';

export default function Home() {
  return (
    <div>
      <Header />
    <main className={styles.container}>
      <LogoSection />
      <WhyChooseUsSection />
      <ContactSection />
      <footer className={styles.footer}>
        &copy; {new Date().getFullYear()} CV Sebelas Pilar. All rights reserved.
      </footer>
    </main>
    </div>
  );
}