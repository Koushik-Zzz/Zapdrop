import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Provider } from "./provider";
import { Toaster } from "sonner";
import { siteConfig } from "@/config/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = siteConfig;

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
        <SpeedInsights />
        
        <Toaster
          position="top-right"
          richColors
          closeButton
          theme="dark"
          expand={false}
          visibleToasts={3}
          toastOptions={{
            className: "bg-background text-foreground my-toast",
            duration: 3000,
            style: {
              fontFamily: "var(--font-geist-sans)",
              background: 'rgba(0, 0, 0, 0.9)',
              border: '1px solid rgba(255, 1, 111, 0.2)',
              backdropFilter: 'blur(20px)',
              color: 'white',
            },
          }}
        />
        </Provider>
        <Analytics />
      </body>
    </html>
  );
}
