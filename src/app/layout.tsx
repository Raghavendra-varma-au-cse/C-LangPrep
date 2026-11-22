import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#f48c06",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "C Engineering Academy | 150-Level C Mastery, Real Compiler & Systems",
  description: "Comprehensive interactive C engineering platform featuring 150-level progressive curriculum, genuine WebAssembly compiler engine, visual logic block builder, C Error Doctor lab, multi-file linking, everyday machines, systems projects (Redis/Git/DOOM), and complete 32 ISO C keywords & libraries encyclopedia.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "C Academy",
  },
  keywords: [
    "C programming",
    "C language learning",
    "online C compiler",
    "WebAssembly C engine",
    "Data Structures in C",
    "Design and Analysis of Algorithms",
    "Pointers in C",
    "C memory management",
    "malloc and free",
    "systems engineering",
    "Redis in C",
    "Git in C",
    "DOOM C engine",
    "32 C keywords",
    "C standard library",
    "Code Monkey C",
    "visual block programming C"
  ],
  authors: [
    {
      name: "Raghavendra Varma",
      url: "https://raghavendravarma.vercel.app/"
    }
  ],
  creator: "Raghavendra Varma",
  publisher: "C Engineering Academy",
  applicationName: "C Engineering Academy",
  icons: {
    icon: [
      { url: "/c-academy-icon.svg", type: "image/svg+xml" }
    ],
    shortcut: "/c-academy-icon.svg",
    apple: "/c-academy-icon.svg"
  },
  openGraph: {
    title: "The Complete C Engineering Academy & Interactive Silicon Playground",
    description: "Learn C from scratch to systems engineering: 150 missions, real-time compiler, visual blocks, multi-file linking, and memory diagnostics.",
    url: "https://raghavendravarma.vercel.app/",
    siteName: "C Engineering Academy",
    locale: "en_IN",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "C Engineering Academy | 150-Level C Mastery Platform",
    description: "Interactive C platform with real WebAssembly compiler, visual blocks, and systems architectures (Redis, Git, DOOM).",
    creator: "@raghavendravarma"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#fffdf9] text-[#2b2520]">
        {children}
      </body>
    </html>
  );
}
