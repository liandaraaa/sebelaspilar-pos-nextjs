import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import '../app/styles/theme.css'; // Import the CSS file
import Header from "./ui/navigation/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CV Sebelas Pilar",
  description: "Point of Sale System for CV Sebelas Pilar",
  icons: {
    icon: "/logo-sebelaspilar.jpeg",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <Header/>
        {children}
      </body>
    </html>
  );
}
