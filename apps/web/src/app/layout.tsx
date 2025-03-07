import localFont from "next/font/local";
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

import "./globals.css";
import "overlayscrollbars/overlayscrollbars.css";

import Navigator from "@/components/Navigator";

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
        <main className="relative w-screen">
          <Navigator />
          {children}
        </main>
      </body>
    </html>
  );
}
