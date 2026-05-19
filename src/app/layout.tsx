import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { AppContextProvider } from '@/providers/AppContextProvider';
import { GoogleMapsProvider } from '@/providers/GoogleMapsProvider';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Right Now',
  description: 'Discover what\'s happening around you, right now.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>
        <AppContextProvider>
          <GoogleMapsProvider>
            {children}
          </GoogleMapsProvider>
        </AppContextProvider>
      </body>
    </html>
  );
}
