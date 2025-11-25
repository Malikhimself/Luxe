import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata = {
  title: "Luxe | Premium E-commerce",
  description: "Curated luxury items for the discerning individual.",
};

import HeaderWrapper from "@/components/HeaderWrapper";
import { CartProvider } from "@/context/CartContext";
import { getUserSession } from "@/lib/auth";

// ... imports

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getUserSession();
  const isAuthenticated = !!session;

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable}`}
      >
        <CartProvider>
          <HeaderWrapper isAuthenticated={isAuthenticated} />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
