import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Random Quote Machine",
  description: "A random quote machine made with React and Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
