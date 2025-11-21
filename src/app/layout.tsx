import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { dataEmpresa } from "@/lib/constants/dataEmpresa";
import { ThemeProvider } from "next-themes";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ClientToaster from "@/components/system/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${dataEmpresa.basics.name}`,
    template: `%s | ${dataEmpresa.basics.name}`,
  },
  description: `${dataEmpresa.basics.description}`,
  keywords: ["eventos", "alquileres", "carpas", "mesas", "sillas", "manteles"],
  robots: { index: true, follow: true },
  openGraph: {
    title: `${dataEmpresa.basics.name}`,
    description: `${dataEmpresa.basics.description}`,
    type: "website",
    locale: `es_${dataEmpresa.location.countryCode}`,
    siteName: `${dataEmpresa.basics.name}`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          {children}
          <Footer />
          <ClientToaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
