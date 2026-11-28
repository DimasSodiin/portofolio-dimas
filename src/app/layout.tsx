import type { Metadata } from "next";
import { Cormorant_Garamond, Space_Grotesk, Archivo, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { ThemeProvider } from "@/theme/ThemeContext";
import { CursorProvider } from "@/cursor/CursorContext";
import CursorTrail from "@/components/CursorTrail";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollToTop from "@/components/ScrollToTop";
import ThemeSidebar from "@/components/ThemeSidebar";


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
  const themeInitScript = `
    (function() {
      try {
        var saved = localStorage.getItem('portfolio-theme');
        var valid = ['clean-light','dark-obsidian','rose-petal','sky-blue','lavender-mist'];
        var theme = valid.indexOf(saved) !== -1 ? saved : 'clean-light';
        document.documentElement.setAttribute('data-theme', theme);
        if (theme === 'dark-obsidian') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      } catch (e) {}
    })();
  `;

  return (
    <html
      lang="id"
      data-theme="clean-light"
      className={`${emilioDisplay.variable} ${gigaSans.variable} ${archivo.variable} ${geistMono.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        className="bg-bg-primary text-text-primary font-sans antialiased selection:bg-accent selection:text-accent-contrast min-h-screen overflow-x-hidden"
        suppressHydrationWarning
      >
        <ThemeProvider>
          <CursorProvider>
            <LanguageProvider>
              <CursorTrail />
              <ScrollProgress />
              <ScrollToTop />
              <ThemeSidebar />
              {children}
            </LanguageProvider>
          </CursorProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
