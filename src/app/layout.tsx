import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsletterPopup from "@/components/NewsletterPopup";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from '@/hooks/useLanguage'

// Police propriétaire Rounded Elegance (fichiers à placer dans /public/fonts)
const roundedElegance = localFont({
  src: [{ path: "../../public/fonts/RoundedElegance.otf", weight: "400", style: "normal" }],
  variable: "--font-rounded",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mon Association - Ensemble pour notre communauté",
  description: "Association à but non lucratif dédiée à l'amélioration de la vie de notre communauté par des actions concrètes et solidaires.",
  keywords: "association, solidarité, bénévolat, aide, communauté, action sociale",
  authors: [{ name: "Mon Association" }],
  openGraph: {
    title: "Mon Association - Ensemble pour notre communauté",
    description: "Association à but non lucratif dédiée à l'amélioration de la vie de notre communauté",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${roundedElegance.variable} font-sans antialiased`}>
        <ThemeProvider>
          <LanguageProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 pt-16">
              {children}
            </main>
            <Footer />
            <NewsletterPopup />
          </div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
