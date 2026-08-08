import type { Metadata } from "next";
import { Inter, Roboto, Vazirmatn } from "next/font/google";
import { Toaster } from "sonner";
import "@fontsource/vazirmatn/index.css";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic", "latin"],
});

export const metadata: Metadata = {
  title: "مرقع | Muraqqa - رزومه‌ساز آنلاین و پیشرفته",
  description: "ساخت رزومه حرفه‌ای، چندزبانه و زیبا با حفظ کامل حریم خصوصی",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${vazirmatn.variable} ${inter.variable} ${roboto.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-vazirmatn bg-gray-50 text-gray-900">
        {children}
        <Toaster position="top-right" richColors dir="rtl" closeButton />
      </body>
    </html>
  );
}
