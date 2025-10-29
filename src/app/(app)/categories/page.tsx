import prisma from "@/lib/db";
import { CategoryProductClient } from "./client";

async function getCategories() {
  return prisma.category.findMany({
    where: { active: true },
    include: {
      products: {
        where: { active: true },
        include: {
          category: {
            select: { id: true, name: true },
          },
          productImages: {
            select: { id: true, url: true, alt: true },
          },
        },
      },
    },
  });
}

export const revalidate = 0;
export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { DOMAIN } from "@/utils/enums/Enums";

export const metadata: Metadata = {
  title: "Categories | Nature & Nurtures",
  description:
    "Explore our diverse range of product categories at Nature & Nurtures. From skincare to wellness, find everything you need to nurture your body and soul.",
  openGraph: {
    title: "Categories | Nature & Nurtures",
    description:
      "Browse Nature & Nurtures’ wide selection of natural skincare, wellness, and eco-friendly products crafted to support a sustainable lifestyle.",
    url: `${DOMAIN}/categories`,
    siteName: "Nature & Nurtures",
    images: [
      {
        url: `${DOMAIN}/og-categories.jpg`,
        width: 1200,
        height: 630,
        alt: "Nature & Nurtures Product Categories",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Categories | Nature & Nurtures",
    description:
      "Discover our product categories — from organic skincare to sustainable lifestyle essentials.",
    images: [`${DOMAIN}/og-categories.jpg`],
  },
};


export default async function Page() {
  const data = await getCategories();

  return <CategoryProductClient data={data} />;
}
