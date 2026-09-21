import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Landslide Risk Early Warning System",
  description:
    "Multi-factor landslide risk prediction and early warning dashboard.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}