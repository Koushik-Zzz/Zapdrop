import type { Metadata } from "next";

const TITLE = "ZapDrop - Share Files Instantly";
const DESCRIPTION = "The fastest bridge between your files and your recipients. Drag, drop, and share expiring links in seconds.";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

export const siteConfig: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  icons: {
    icon: "/favicon.ico",
  },

  category: "File Sharing",
  alternates: {
    canonical: BASE_URL,
  },

  keywords: [
    "ZapDrop",
    "file sharing",
    "secure",
    "instant",
    "drag drop",
    "expiring links",
    "temporary file sharing",
    "Cloudflare R2",
    "file transfer",
    "easy file sharing",
    "quick file sharing",
    "file hosting",
    "share large files",
    "file upload",
    "file download",
    "temporary storage",
  ],
  metadataBase: new URL(BASE_URL!),
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://zapdrop.slyde.tech',
    siteName: 'ZapDrop',
    images: "/home.webp",
    type: 'website',
  },
};