import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientProvider from '../components/ClientProvider';
import DynamicFirebaseProvider from '../components/DynamicFirebaseProvider';
import { ChakraProvider } from '@chakra-ui/react';
import { metadata } from './metadata';

const inter = Inter({ subsets: ["latin"] });

export { metadata };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DynamicFirebaseProvider>
          <ClientProvider>
            <ChakraProvider>
              {children}
            </ChakraProvider>
          </ClientProvider>
        </DynamicFirebaseProvider>
      </body>
    </html>
  );
}