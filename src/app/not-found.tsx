'use client';

import Link from "next/link";
import React from "react";

const NotFoundPage: React.FC = () => {
  return (
    <div style={{
      background: "#f4f6fb",
      color: "#2d3748",
      fontFamily: "'Segoe UI', 'Arial', sans-serif",
      minHeight: "100vh",
      margin: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div style={{
        textAlign: "center",
        padding: "40px 30px",
        background: "#fff",
        borderRadius: 16,
        boxShadow: "0 4px 24px rgba(44, 62, 80, 0.08)",
        maxWidth: 400,
        animation: "fadeIn 1s ease"
      }}>
        <div style={{
          fontSize: 64,
          marginBottom: 16,
          animation: "bounce 1.2s infinite alternate"
        }}>
          🔍
        </div>
        <h1 style={{
          fontSize: "2.5rem",
          margin: "0 0 12px 0",
          fontWeight: 700,
          color: "#2b6cb0"
        }}>
          404 - Tidak Ditemukan
        </h1>
        <p style={{
          fontSize: "1.1rem",
          marginBottom: 28,
          color: "#4a5568"
        }}>
          Maaf, halaman yang Anda cari tidak tersedia.<br />
          Mungkin sudah dipindahkan atau tautannya salah.<br />
          Jangan khawatir, Anda bisa kembali ke halaman utama.
        </p>
        <Link 
        href="/" 
        style={{
          display: "inline-block",
          padding: "10px 24px",
          background: "#2b6cb0",
          color: "#fff",
          borderRadius: 8,
          textDecoration: "none",
          fontWeight: 500,
          transition: "background 0.2s"
        }}
        onMouseOver={e => (e.currentTarget.style.background = "#205080")}
        onMouseOut={e => (e.currentTarget.style.background = "#2b6cb0")}>
        Kembali Ke Beranda
          </Link>
        {/* Animasi keyframes */}
        <style>
          {`
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(30px);}
              to { opacity: 1; transform: translateY(0);}
            }
            @keyframes bounce {
              to { transform: translateY(-10px);}
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default NotFoundPage;