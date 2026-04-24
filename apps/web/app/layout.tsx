import { NavBar } from '@/components/layout/NavBar';
import { Footer } from '@/components/layout/Footer';
import { ChatWidget } from '@/components/ui/ChatWidget';
import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Election Yatra — Janta ka Election Saathi',
  description:
    'An India-first AI companion for every voter. Understand the election process, spot misinformation, and vote with confidence.',
  applicationName: 'Election Yatra',
  keywords: [
    'Indian elections',
    'voter education',
    'ECI',
    'SVEEP',
    'civic education',
    'misinformation',
  ],
  openGraph: {
    title: 'Election Yatra — Janta ka Election Saathi',
    description:
      'Your AI saathi for the election journey — registration to polling booth, in your language.',
    type: 'website',
    locale: 'en_IN',
  },
};

export const viewport: Viewport = {
  themeColor: '#FF9933',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700;900&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Noto+Serif+Devanagari:wght@500;700&display=swap"
        />
      </head>
      <body className="min-h-screen flex flex-col relative">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-indigo-chakra focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <NavBar />
        <div className="flex-1 flex flex-col">
          {children}
        </div>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
