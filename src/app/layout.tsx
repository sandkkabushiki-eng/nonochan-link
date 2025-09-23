import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ののちゃんリンク",
  description: "ののちゃんのSNSリンク集",
  keywords: "ののちゃん, SNS, リンク集, Instagram, X, TikTok",
  openGraph: {
    title: "ののちゃんリンク",
    description: "ののちゃんのSNSリンク集",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        {/* Google AdSense - ののちゃんリンク用 */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9157219543395530"
          crossOrigin="anonymous"
        />
        
        {/* Google Analytics - 本格設定 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX', {
              page_title: 'ののちゃんリンク',
              page_location: window.location.href,
              send_page_view: true
            });
            
            // AdSense用のイベント追跡
            gtag('event', 'page_view', {
              page_title: 'ののちゃんリンク',
              page_location: window.location.href
            });
          `}
        </Script>
        
        {/* メタタグ最適化 */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <link rel="canonical" href="https://your-domain.com" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
