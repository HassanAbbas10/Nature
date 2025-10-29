"use client";

import { CategoryCard } from "@/components/category-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Category } from "@prisma/client";
import Autoplay from "embla-carousel-autoplay";
import * as React from "react";
import { TypingEffect } from "../texteffect/TypingEffect";
import Link from "next/link";

export function CategoryShowcaseClient({
  categories,
}: {
  categories: Category[];
}) {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  React.useEffect(() => {
    console.log("📦 Categories received from server:", categories);
  }, [categories]);

  return (
    <div className=" py-4 sm:py-8 md:py-12 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="mb-12 sm:mb-16">
          <div className="flex flex-col sm:flex-row  items-start sm:items-end gap-6 mb-8">
           
  {/* Main Heading */}


  {/* Secondary Heading Section */}
  <div className="mt-16">
     <h1 className="text-3xl sm:text-4xl lg:text-6xl font-light leading-tight">
    <div>
      <TypingEffect className="font-light" text="Find your own" />
    </div>
    <div>
      <em>
        <TypingEffect text="unique style ," className="italic" />
      </em>
    </div>
    <div>
      <TypingEffect text="and thousands of brands." />
    </div>
  </h1>
  </div>
</div>

          

<Link href={`/categories`}>
  <button
    title="collection"
    className="text-[#2d3a3a] font-medium hover:underline flex items-center gap-2 whitespace-nowrap"
  >
    Explore All Categories
    <span className="text-xl">›</span>
  </button>
</Link>

          
        </header>

        {/* Carousel */}
        <Carousel
          plugins={[plugin.current]}
          opts={{ align: "start", loop: false }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {categories.map((category) => (
              <CarouselItem
                key={category.id}
                className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
              >
                <CategoryCard category={category} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}