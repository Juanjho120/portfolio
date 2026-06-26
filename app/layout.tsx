import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Juan Tzun | Full Stack Developer",
  description:
    "Portfolio profesional de Juan Tzun: proyectos full-stack con Java, Spring Boot, Angular, React, PostgreSQL, Docker e IA aplicada.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
