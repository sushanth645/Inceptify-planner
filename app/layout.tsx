import {Toaster} from "sonner";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ConvexClientProvider } from "@/components/providers/convex-provider";
import {ModalProvider} from "@/components/providers/modal-provider";
import { EdgeStoreProvider } from '../lib/edgestore';
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Inceptify",
  description: "The connected workspace where better,faster work happens.",
  icons: {
    icon: [
      {
      media:"(prefers-color-scheme: dark)",
      url:"/logo.png",
      href:"/logo.png"
      },
      {
        media:"(prefers-color-scheme: light)",
        url: "/logo-dark.png",
        href:"/logo-dark.png"
        }
    ]
    }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ConvexClientProvider>
        <EdgeStoreProvider>
        <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        storageKey="inceptify-theme-2"
        >
          <Toaster position="bottom-center"/>
          <ModalProvider />
        {children}
        </ThemeProvider>
        </EdgeStoreProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
