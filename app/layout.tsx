import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

import { AnimatedPcbBackground } from "@/components/AnimatedPcbBackground";

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
    "Professional portfolio for Juan Tzun: full-stack projects with Java, Spring Boot, Angular, React, PostgreSQL, Docker, and applied AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AnimatedPcbBackground />

        <div className="relative z-10 min-h-screen">{children}</div>
        <Analytics />
      </body>
    </html>
  );
}
