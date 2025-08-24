import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { generateMetadata, generateStructuredData } from '@/lib/seo';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = generateMetadata({
  title: 'Anime Fusion AI - Transform Your Photos with Anime Characters',
  description: 'Fuse your photos with beloved anime characters including Zhong Kui. Create magical group photos, character replacements, and interactive effects. Perfect for anime enthusiasts and figure collectors!',
  keywords: [
    'anime fusion ai', 'anime photo editor', 'zhong kui anime', 'character fusion', 
    'anime photo merge', 'ai anime generator', 'anime character creator', 
    'photo anime fusion', 'anime figure editor', 'ai anime effects', 'anime selfie',
    'anime group photo', 'anime character replacement', 'anime scene integration'
  ],
  ogImage: '/og-image.jpg',
  twitterImage: '/og-image.jpg',
  canonical: 'https://animefusion-ai.com',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#FF6B35" />
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateStructuredData('home')),
          }}
        />
      </head>
      <body className={inter.className}>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}