import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  title: "Md Ashik Alam | Frontend & Full-Stack Developer",
  description: "Portfolio of Md Ashik Alam - Frontend and Full-Stack Developer specializing in React.js, Next.js, Node.js, and MongoDB. Experienced in building modern web applications with 300+ LeetCode problems solved.",
  keywords: ["Frontend Developer", "Full-Stack Developer", "React.js", "Next.js", "Node.js", "MongoDB", "Web Developer", "Portfolio", "Md Ashik Alam"],
  authors: [{ name: "Md Ashik Alam", url: "https://github.com/MdAshikAlam/" }],
  creator: "Md Ashik Alam",
  publisher: "Md Ashik Alam",
  metadataBase: new URL("https://mdashikalam.dev"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Md Ashik Alam | Frontend & Full-Stack Developer",
    description: "Portfolio of Md Ashik Alam - Frontend and Full-Stack Developer specializing in React.js, Next.js, Node.js, and MongoDB.",
    url: "https://mdashikalam.dev",
    siteName: "Md Ashik Alam Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Md Ashik Alam - Frontend & Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Md Ashik Alam | Frontend & Full-Stack Developer",
    description: "Portfolio of Md Ashik Alam - Frontend and Full-Stack Developer",
    creator: "@mdashikalam",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

