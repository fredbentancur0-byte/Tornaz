import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { AnnouncementBar } from "@/components/announcement-bar";
import { Footer } from "@/components/footer";
import { BottomBar } from "@/components/bottom-bar";
import { SITE } from "@/lib/constants";

const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    locale: "en_NG",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: SITE.themeColor,
  width: "device-width",
  initialScale: 1,
};

const themeScript = `(function () {
  try {
    var m = document.cookie.match(/(?:^|;\\s*)theme=(light|dark)/)
    var t = m ? m[1] : localStorage.getItem('theme')
    if (t === 'dark') document.documentElement.setAttribute('data-theme', 'dark')
  } catch (e) {}
})()`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${display.variable} ${inter.variable} ${mono.variable} flex min-h-dvh flex-col antialiased`}
      >
        <a
          href="#main"
          className="sr-only rounded-md bg-primary px-3 py-3 font-semibold text-text-inverse shadow-lg focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2"
        >
          Skip to content
        </a>
        <AnnouncementBar />
        <SiteHeader />
        <main id="main" className="flex-1 pb-16 md:pb-0">
          {children}
        </main>
        <Footer />
        <BottomBar />
      </body>
    </html>
  );
}
