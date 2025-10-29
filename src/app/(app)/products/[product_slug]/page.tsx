"use server";

import { Footer } from "@/components/shared/footer";
import Header from "@/components/shared/header/index";
import prisma from "@/lib/db";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductPage } from "./client";
import { DOMAIN } from "@/utils/enums/Enums";

async function getProduct(product_slug: string) {
  return prisma.product.findUnique({
    where: { slug: product_slug, active: true },
    include: {
      category: {
        select: { id: true, name: true, slug: true },
      },
      sizes: true,
      colors: true,
      features: { select: { description: true } },
      specifications: true,
      productImages: { select: { id: true, url: true, alt: true } },
    },
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ product_slug: string }>;
}): Promise<Metadata> {
  const { product_slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug: product_slug, active: true },
    include: {
      category: { select: { name: true } },
    },
  });

  if (!product) {
    return {
      title: "Product Not Found | Nature & Nurtures",
      description: "The product you’re looking for does not exist or is inactive.",
      openGraph: {
        title: "Product Not Found | Nature & Nurtures",
        description: "The product you’re looking for does not exist or is inactive.",
        url: `${DOMAIN}/products/${product_slug}`,
        siteName: "Nature & Nurtures",
        locale: "en_US",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: "Product Not Found | Nature & Nurtures",
        description: "The product you’re looking for does not exist or is inactive.",
      },
    };
  }

  const title = product.metaTitle || `${product.name} | Nature & Nurtures`;
  const description = product.metaDescription || product.description || "Explore this product from Nature & Nurtures.";
  const imageUrl =  `${DOMAIN}/og-product.jpg`;
  const productUrl = `${DOMAIN }/product/${product_slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: productUrl,
      siteName: "Nature & Nurtures",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}


export default async function Page({
  params,
}: {
  params: Promise<{ product_slug: string }>;
}) {
  const { product_slug } = await params;
  const product = await getProduct(product_slug);
  if (!product) return notFound();

  return (
    <>
      <Header />
      <ProductPage product={product} />
      <Footer />
    </>
  );
}
