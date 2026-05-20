import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { AppContextProvider } from '@/providers/AppContextProvider';
import { GoogleMapsProvider } from '@/providers/GoogleMapsProvider';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
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
      <body className={`${poppins.variable} antialiased`}>
        <AppContextProvider>
          <GoogleMapsProvider>
            {children}
          </GoogleMapsProvider>
        </AppContextProvider>
      </body>
    </html>
  );
}
