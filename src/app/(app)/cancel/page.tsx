import { Footer } from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { DOMAIN } from "@/utils/enums/Enums";
import Link from "next/link";

export const metadata = {
  title: "Payment Canceled - Nature & Nurtures",
  description:
    "Your payment was not completed. Please try again or contact our support team for assistance.",
  keywords: [
    "payment canceled",
    "failed payment",
    "checkout issue",
    "order not completed",
    "Nature & Nurtures",
  ],
  openGraph: {
    title: "Payment Canceled - Nature & Nurtures",
    description:
      "Unfortunately, your payment was not successful. You can retry or reach out to Nature & Nurtures support for help.",
    url: `${DOMAIN}/payment-canceled`,
    siteName: "Nature & Nurtures",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${DOMAIN}/payment-canceled-banner.jpg`,
        width: 1200,
        height: 630,
        alt: "Payment Canceled - Nature & Nurtures",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Payment Canceled - Nature & Nurtures",
    description:
      "Your payment was canceled or not completed. Please try again or contact support for help.",
    images: [`${DOMAIN}/payment-canceled-banner.jpg`],
  },
};

export default function CancelPage() {
  return (
    <>
      <Header />
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
        <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md text-center">
          <h1 className="text-3xl font-bold mb-4 text-red-600">
            Payment Canceled
          </h1>
          <p className="text-gray-700 mb-6">Your payment was not completed.</p>
          <Link href="/" className="text-blue-500 hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
