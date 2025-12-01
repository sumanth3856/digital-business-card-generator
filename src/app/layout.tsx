import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import ErrorBoundary from '@/components/ui/ErrorBoundary';
import { ScrollToTop } from '@/components/ui/ScrollToTop';


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Digital Business Card Generator",
  description: "Create and share your professional digital business card in minutes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ErrorBoundary>
          {children}
          <Toaster richColors position="top-center" />
          <ScrollToTop />
        </ErrorBoundary>
      </body>
    </html>
  );
}
