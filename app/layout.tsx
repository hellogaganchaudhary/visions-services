import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import ServicesNavigation from "@/components/ServicesNavigation";
import ErrorBoundary from "@/components/ErrorBoundary";
import { generateSEO } from "@/lib/seo";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"], 
  variable: "--font-space-grotesk" 
});

export const metadata: Metadata = generateSEO({
  title: "Visions.services - Next-Gen Software Solutions",
  description: "Complete software development solutions including web apps, UI/UX design, SEO, cloud optimization (AWS/GCP/Azure), digital marketing, automation tools, and AI chatbots. Bharat Utsav Sale Oct 2025 - Mar 2026!",
  keywords: ["software development", "web design", "UI/UX", "SEO", "AWS", "GCP", "Azure", "digital marketing", "AI chatbot", "automation tools"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <head>
        {/* Google Tag Manager (Google Ads Conversion) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-17672882689"
          strategy="afterInteractive"
        />
        <Script id="google-gtag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17672882689');
          `}
        </Script>

        {/* Meta Pixel (Facebook Pixel) */}
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1481427343144549');
            fbq('track', 'PageView');
          `}
        </Script>

        {/* Fallback image for users with JavaScript disabled */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1481427343144549&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        <ErrorBoundary>
          <Navbar />
          <ServicesNavigation />
          <PageTransition>
            <main className="min-h-screen">
              {children}
            </main>
          </PageTransition>
          <Footer />
        </ErrorBoundary>
      </body>
    </html>
  );
}
