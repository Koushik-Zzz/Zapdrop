import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Provider } from "./provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'ZapDrop - Share Files Instantly',
  description: 'The fastest bridge between your files and your recipients. Drag, drop, and share expiring links in seconds.',
  keywords: ['file sharing', 'secure', 'instant', 'drag drop'],
  openGraph: {
    title: 'ZapDrop - Share Files Instantly',
    description: 'Share files securely with expiring links',
    url: 'https://ezprepbuddy.com',
    siteName: 'ZapDrop',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>
        {children}
        </Provider>
      </body>
    </html>
  );
}
