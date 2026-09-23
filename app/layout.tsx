import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rendering Lab · Server Component",
  description: "Ein kleines Labor zum Beobachten von Rendering in Next.js.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
