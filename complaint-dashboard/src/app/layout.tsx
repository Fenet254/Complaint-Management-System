// Example for layout.tsx (App Router)
import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "../../components/providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  title: "Complaint Dashboard",
  description: "AI-Powered University Complaint Management System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
