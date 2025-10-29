import { ProductCard } from "@/components/product-card";
import { Footer } from "@/components/shared/footer";
import Header from "@/components/shared/header";
import prisma from "@/lib/db";
import { Star } from "lucide-react";
import type { Metadata } from "next";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { CollectionsSchema } from "@/seo/Jsonld";
import { DOMAIN } from "@/utils/enums/Enums";

export const revalidate = 1;

async function getCollection(collection_slug: string) {
  const collection = await prisma.productCollection.findUnique({
    where: { slug: collection_slug, active: true },
    include: {
      products: {
        where: { active: true },
        include: {
          category: { select: { name: true, id: true } },
          productImages: { select: { id: true, url: true, alt: true } },
        },
        orderBy: { createdAt: "desc" },
      },
    },
  });



  return collection;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ collection_slug: string }>;
}): Promise<Metadata> {
  const { collection_slug } = await params;

  const collection = await prisma.productCollection.findUnique({
    where: { slug: collection_slug, active: true },
    select: {
      name: true,
      metaTitle: true,
      metaDescription: true,
      description: true,
    
    },
  });

  if (!collection) {
    return {
      title: "Collection Not Found | Nature & Nurtures",
      description: "The collection you're looking for is not available.",
      openGraph: {
        title: "Collection Not Found | Nature & Nurtures",
        description: "The collection you're looking for is not available.",
        url: `${DOMAIN}/collections/${collection_slug}`,
        siteName: "Nature & Nurtures",
        images: [
          {
            url: `${DOMAIN}/og-collections.jpg`,
            width: 1200,
            height: 630,
            alt: "Collection Not Found - Nature & Nurtures",
          },
        ],
        locale: "en_US",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: "Collection Not Found | Nature & Nurtures",
        description: "The collection you're looking for is not available.",
        images: [`${DOMAIN}/og-collections.jpg`],
      },
    };
  }

  const title =
    collection.metaTitle || `${collection.name} | Nature & Nurtures`;
  const description =
    collection.metaDescription ||
    collection.description ||
    `Explore our ${collection.name} collection with the best natural products.`;

  const url = `${DOMAIN}/collections/${collection_slug}`;
  const imageUrl =`${DOMAIN}/og-collections.jpg`;

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
          alt: `${collection.name} Collection - Nature & Nurtures`,
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

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ collection_slug: string }>;
}) {
  const resolvedParams = await params;
  const collection = await getCollection(resolvedParams.collection_slug);

  if (!collection) {
    return (
      <>
        <Header />
        {collection && <CollectionsSchema collections={[collection]} />}
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Collection Not Found</h1>
          <p className="text-gray-600">The collection you’re looking for isn’t available.</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="relative w-full bg-neutral-100 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/grid.svg')] bg-repeat" />
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10 flex flex-col md:flex-row items-center gap-8">
          {/* Image */}
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src={collection.imageUrl || "/placeholder.png"}
              alt={collection.name}
              className="w-80 h-80 object-cover rounded-2xl border-4 border-black shadow-[4px_4px_0_0_#000]"
            />
          </div>

          {/* Text */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <p className="uppercase text-gray-500 tracking-widest text-xs md:text-sm mb-2">
              Collection
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-black leading-tight">
              {collection.name}
            </h1>
            <p className="mt-4 text-gray-700 text-sm md:text-base leading-relaxed">
              {collection.description}
            </p>

            <div className="mt-6 flex justify-center md:justify-start items-center gap-2 text-sm font-semibold text-gray-800">
              <Star size={16} fill="currentColor" />
              <span>Handcrafted with Care</span>
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 mt-6">
        <Breadcrumb>
          <BreadcrumbList className="text-xs sm:text-sm">
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{collection.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Product Section */}
      <section className="container mx-auto px-4 py-10">
        {collection.products.length > 0 ? (
          <>
            <h2 className="text-xl sm:text-2xl font-bold mb-6 text-black text-center md:text-left">
              Explore {collection.name}
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {collection.products.map((product) => (
                <ProductCard key={product.id} product={product as any} />
              ))}
            </div>
          </>
        ) : (
          <p className="text-center text-gray-600 text-sm">
            No products available in this collection yet.
          </p>
        )}
      </section>

      <Footer />
    </>
  );
}
