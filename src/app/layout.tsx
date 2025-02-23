import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "overlayscrollbars/overlayscrollbars.css";

import ModalProvider from "@/components/providers/ModalProvider";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { Toaster } from "@/components/ui/sonner";

const pretendard = localFont({
  src: "../fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "I MY ME MIND",
  description: "플로우 메모 어플리케이션",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kr" className={`${pretendard.variable}`}>
      <body className={`${pretendard.className}`}>
        <QueryProvider>
          <ModalProvider />
          {children}
          <Toaster
            position="bottom-center"
            toastOptions={{
              className: "bg-card text-primary border-border",
            }}
          />
        </QueryProvider>
      </body>
    </html>
  );
}
