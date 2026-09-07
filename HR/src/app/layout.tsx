import type { Metadata } from "next";
import "./globals.css";
import AuthGuard from "@/components/layout/AuthGuard";

export const metadata: Metadata = {
  title: "HR Portal",
  description: "Employee HR Management Portal",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <AuthGuard>{children}</AuthGuard>
      </body>
    </html>
  );
}
