import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const bttf = localFont({
  src: "./fonts/brookshire.ttf",
  variable: "--font-brookshire",
});

export const metadata: Metadata = {
  title: "Code Quantum",
  description: "Code Quantum is coming soon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={bttf.variable}>
      <body
        className={`font-brookshire antialiased h-dvh`}
      >
        {children}
      </body>
    </html>
  );
}
