// app/layout.tsx
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeContainer } from '@/components/common/ThemeContainer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'GuardSlot - Eliminate No-Shows with Payment Protection',
    template: '%s | GuardSlot',
  },
  description:
    'The modern booking platform that eliminates no-shows with payment authorization. Protect your revenue, reduce lost appointments by up to 90%, and grow your service business with confidence.',
  keywords: [
    'booking platform',
    'appointment scheduling',
    'no-show protection',
    'payment authorization',
    'service business',
    'revenue protection',
  ],
  authors: [{ name: 'GuardSlot Team' }],
  creator: 'GuardSlot',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://guardslot.com',
    title: 'GuardSlot - Eliminate No-Shows with Payment Protection',
    description:
      'Protect your revenue from no-shows with our payment authorization booking platform. Reduce missed appointments by up to 90%.',
    siteName: 'GuardSlot',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GuardSlot - Eliminate No-Shows with Payment Protection',
    description:
      'Protect your revenue from no-shows with our payment authorization booking platform.',
    creator: '@guardslot',
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeContainer
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeContainer>
      </body>
    </html>
  );
}
