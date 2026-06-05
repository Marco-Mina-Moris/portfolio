import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Marco Mina — Flutter Mobile Developer",
  description:
    "Flutter developer specializing in cross-platform mobile apps with Clean Architecture, BLoC, Firebase, and REST APIs.",
  keywords: ["Flutter Developer", "Mobile Developer", "Dart", "iOS", "Android", "BLoC", "Firebase"],
  openGraph: {
    title: "Marco Mina — Flutter Mobile Developer",
    description: "Flutter Mobile Developer · Clean Architecture · BLoC · Firebase.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">{children}</body>
    </html>
  );
}
