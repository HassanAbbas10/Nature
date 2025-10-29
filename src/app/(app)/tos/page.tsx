import { Footer } from "@/components/shared/footer";
import Header from "@/components/shared/header";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import prisma from "@/lib/db";
import { DOMAIN } from "@/utils/enums/Enums";
import { Metadata } from "next";
import { notFound } from "next/navigation";
export const revalidate = 0;

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
type TOSData = {
  title: string;
  content: string;
};

export const metadata: Metadata = {
  title: "Terms of Service | Nature & Nurtures",
  description:
    "Read the Terms of Service for Nature & Nurtures to understand our policies, user rights, and responsibilities when using our platform.",
  keywords: [
    "Terms of Service",
    "Nature & Nurtures",
    "user agreement",
    "privacy policy",
    "legal terms",
  ],
  openGraph: {
    title: "Terms of Service | Nature & Nurtures",
    description:
      "Understand your rights and our responsibilities at Nature & Nurtures by reading our official Terms of Service.",
    url: `${DOMAIN}/tos`,
    siteName: "Nature & Nurtures",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${DOMAIN}/terms-banner.jpg`,
        width: 1200,
        height: 630,
        alt: "Terms of Service - Nature & Nurtures",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service | Nature & Nurtures",
    description:
      "Review the Terms of Service for Nature & Nurtures to stay informed about our platform’s policies and legal guidelines.",
    images: [`${DOMAIN}/terms-banner.jpg`],
  },
};


export default async function TOSPage() {
  const tosData = await prisma.pageContent.findUnique({
    where: { pageType: "TOS" },
  });

  if (!tosData) {
    notFound();
  }

  const data = tosData.content as TOSData;

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{data.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="prose prose-lg max-w-none">
            <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
              {data.title}
            </h1>
            <div
              className="prose  break-words overflow-hidden [&_*]:max-w-full   [&_img]:w-full [&_img]:object-cover"
              dangerouslySetInnerHTML={{ __html: data.content }}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
