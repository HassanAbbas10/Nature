import { GlobalAlertDialog } from "@/hooks/alert-dialog/component";
import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "sonner";
import "./globals.css";
import { OrganizationSchema, WebsiteSchema } from "@/seo/Jsonld";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-urbanist",
});

export const metadata: Metadata = {
  title: {
    default: "Nature and Nurtures - Premium Natural Products",
    template: "%s | Nature and Nurtures"
  },
  description: "Discover eco-friendly, sustainable nature products, and natural lifestyle products.",
  keywords: ["natural products", "eco-friendly", "organic products", "sustainable"],
  authors: [{ name: "Nature and Nurtures" }],
  creator: "Nature and Nurtures",
  publisher: "Nature and Nurtures",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={urbanist.variable}>
      <body className={`${urbanist.variable} ${urbanist.variable} antialiased`}>
        <NextTopLoader />
        <GlobalAlertDialog />
        <OrganizationSchema />
        <WebsiteSchema />
        <Toaster />
        {children}
      </body>
    </html>
  );
}
