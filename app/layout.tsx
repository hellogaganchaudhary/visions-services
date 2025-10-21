import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import ServicesNavigation from "@/components/ServicesNavigation";
import ErrorBoundary from "@/components/ErrorBoundary";
import { generateSEO } from "@/lib/seo";

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
