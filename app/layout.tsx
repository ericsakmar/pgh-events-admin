import type { Metadata } from "next";
import { Bevan, Pontano_Sans } from "next/font/google";
import AuthProvider from "./components/AuthProvider";
import "./globals.css";

const bevan = Bevan({
  variable: "--font-bevan",
  subsets: ["latin"],
  weight: "400",
});

const pontano = Pontano_Sans({
  variable: "--font-pontano-sans",
});

export const metadata: Metadata = {
  title: "pgh.events admin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${pontano.variable} ${bevan.variable} antialiased`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
