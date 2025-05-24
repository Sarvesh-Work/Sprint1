import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import "./globals.css";
import ProviderReactQuery from "@/lib/ProviderReactQuery";
import UserProvider from "@/lib/UserContext";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "@/components/ui/sonner";

export const monaSans = Mona_Sans({
  subsets: ["latin"],
  variable: "--font-mona-sans",
});

export const metadata: Metadata = {
  title: "Notes-App",
  description: "This is a simple notes app",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${monaSans.className} antialiased`}>
        <ProviderReactQuery>
          <ReactQueryDevtools initialIsOpen={false} />
          <UserProvider>
            {children} <Toaster />
          </UserProvider>
        </ProviderReactQuery>
      </body>
    </html>
  );
}
