import { Footer } from "@/components/shared/footer";
import Header from "@/components/shared/header";
import prisma from "@/lib/db";
import { Metadata } from "next";
import { OrderDetailsPublicClient } from "./client";
import { DOMAIN } from "@/utils/enums/Enums";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ order_id: string }>;
}): Promise<Metadata> {
  const { order_id } = await params;

  const title = `Order Details - ${order_id} | Nature & Nurtures`;
  const description = `View detailed information and status for your order ${order_id} at Nature & Nurtures.`;

  const url = `${DOMAIN}/orders/${order_id}`;
  const imageUrl = `${DOMAIN}/og-order.jpg`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: "Nature & Nurtures",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `Order ${order_id} - Nature & Nurtures`,
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

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ order_id: string }>;
}) {
  const { order_id } = await params;

  const orderDetail = await prisma.order.findUnique({
    where: {
      id: order_id,
    },
    include: {
      items: {
        include: {
          product: {
            select: {
              id: true,
              images: true,
              name: true,
            },
          },
        },
      },
    },
  });

  if (!orderDetail) {
    throw new Error("Order not found");
  }

  return (
    <div>
      <Header />
      <OrderDetailsPublicClient data={orderDetail} />
      <Footer />
    </div>
  );
}
