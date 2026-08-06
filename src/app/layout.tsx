import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import Ambient from "@/components/Ambient";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Display face. A serif (Instrument Serif) read as editorial and stopped suiting the
// page once it became a neon technical dashboard; Space Grotesk keeps character in
// the headings while sitting in the same family of shapes as Geist Mono.
const spaceGrotesk = Space_Grotesk({
  // Named --font-display-face, not --font-display: the latter is the Tailwind @theme
  // token in globals.css, and having next/font emit the same name would make the
  // theme's `--font-display: var(--font-display-face)` resolve to itself.
  variable: "--font-display-face",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-krithik.vercel.app"),
  title: "Krithik Srinivas — Software Engineer",
  description:
    "Full-stack software engineer building production backend services and modern web applications. Interested in distributed systems and developer platforms.",
  openGraph: {
    title: "Krithik Srinivas — Software Engineer",
    description:
      "Full-stack software engineer building production backend services and modern web applications. Interested in distributed systems and developer platforms.",
    url: "https://portfolio-krithik.vercel.app",
    siteName: "Krithik Srinivas",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Krithik Srinivas — Software Engineer",
    description:
      "Full-stack software engineer building production backend services and modern web applications. Interested in distributed systems and developer platforms.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-base-raised focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        <Ambient />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
