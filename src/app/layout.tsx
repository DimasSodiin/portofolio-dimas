import type { Metadata } from "next";
import { Cormorant_Garamond, Space_Grotesk, Archivo, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/i18n/LanguageContext";
import PixelCursorTrail from "@/components/PixelCursorTrail";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollToTop from "@/components/ScrollToTop";

// Serif display — editorial headlines (stays as-is)
const emilioDisplay = Cormorant_Garamond({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-emilio-display",
  display: "swap",
});

// UI Pro Max Rec: Space Grotesk — distinctive, minimal, portfolio-ready
const gigaSans = Space_Grotesk({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-giga-sans",
  display: "swap",
});

// UI Pro Max Rec: Archivo — clean body text for creative professionals
const archivo = Archivo({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const geistMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dimas Sodiin — UI/UX Designer & Lulusan Teknik Informatika",
  description:
    "Dimas Sodiin adalah UI/UX Designer dan lulusan S1 Teknik Informatika Telkom University Purwokerto yang berfokus merancang antarmuka web dan aplikasi mobile yang rapi, jelas, dan mudah digunakan.",
  keywords: [
    "Dimas Sodiin",
    "UI/UX Designer",
    "Teknik Informatika",
    "Product Designer",
    "Design System",
    "Desainer Indonesia",
    "Figma",
    "Front-End Development",
  ],
  openGraph: {
    title: "Dimas Sodiin — UI/UX Designer & Lulusan Teknik Informatika",
    description:
      "Merancang pengalaman digital yang menyeimbangkan kegunaan, kejelasan visual, dan teknologi.",
    url: "https://dimassodiin.com",
    siteName: "Portofolio Dimas Sodiin",
    locale: "id_ID",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${emilioDisplay.variable} ${gigaSans.variable} ${archivo.variable} ${geistMono.variable} scroll-smooth dark`}
      suppressHydrationWarning
    >
      <body
        className="bg-[#0f0d0d] text-[#ffffff] font-sans antialiased selection:bg-[#ffffff] selection:text-black min-h-screen overflow-x-hidden"
        suppressHydrationWarning
      >
        <LanguageProvider>
          <PixelCursorTrail />
          <ScrollProgress />
          <ScrollToTop />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
