import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import ErrorBoundary from '@/components/ui/ErrorBoundary';
import { ScrollToTop } from '@/components/ui/ScrollToTop';
import { Navbar } from '@/components/nav/Navbar';


const inter = Inter({ subsets: ["latin"], display: 'swap' });

export const metadata: Metadata = {
  title: {
    default: "DigiCard - Professional Digital Business Card Generator",
    template: "%s | DigiCard"
  },
  description: "Create your professional digital business card in seconds. Share your contact info, social links, and portfolio with a single link. Free, customizable, and eco-friendly.",
  keywords: ["digital business card", "virtual business card", "qr code business card", "contactless business card", "business card generator", "free digital business card"],
  authors: [{ name: "DigiCard Team" }],
  creator: "DigiCard",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://digicard.app",
    title: "DigiCard - Professional Digital Business Card Generator",
    description: "Create your professional digital business card in seconds. Share your contact info, social links, and portfolio with a single link.",
    siteName: "DigiCard",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DigiCard Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DigiCard - Professional Digital Business Card Generator",
    description: "Create your professional digital business card in seconds. Share your contact info, social links, and portfolio with a single link.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning data-scroll-behavior="smooth">
      <body className={inter.className} suppressHydrationWarning>
        <ErrorBoundary>
          <Navbar />
          {children}
          <Toaster richColors position="top-center" />
          <ScrollToTop />
        </ErrorBoundary>
      </body>
    </html>
  );
}
