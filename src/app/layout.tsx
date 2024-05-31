import { Providers } from "@/providers";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rotten Tomatoes",
  description:
    "Rotten Tomatoes, home of the Tomatometer, is the most trusted measurement of quality for Movies & TV. The definitive site for Reviews, Trailers, Showtimes, and Tickets.",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {modal}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
