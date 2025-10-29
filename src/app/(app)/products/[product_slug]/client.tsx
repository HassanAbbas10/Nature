"use client";
import Image from "next/image";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCartStore } from "@/lib/cart-store";
import { imageThumbnailUrl } from "@/utils/image-otf";
import { ChevronLeft, ChevronRight, ShoppingCart, Heart } from "lucide-react";
import { useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageZoom from "react-image-zooom";
import { toast } from "sonner";
import { ProductSchema } from "@/seo/Jsonld";
import { BreadcrumbSchema } from "@/seo/Jsonld";
import { DOMAIN } from "@/utils/enums/Enums";
export function ProductPage({ product }: { product: any }) {
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addToCart } = useCartStore();

  const breadcrumbItems = [
    { name: 'Home', url: 'https://naturenurtures.com/' },
    ...(product.category ? [
      { 
        name: product.category.name, 
        url: `${DOMAIN}/categories/${product.category.slug}` 
      }
    ] : []),
    { 
      name: product.name, 
      url: `${DOMAIN}/products/${product.slug}` 
    },
  ];

  const handleAddToCart = () => {
    if (!product.inStock) {
      toast.error("This product is out of stock");
      return;
    }

    const cartItem = {
      id: product.id,
      name: product.name,
      image:
        product.productImages?.length > 0 ? product.productImages[0].url : null,
      price: product.price,
      quantity,
      options: `${
        product.colors[selectedColor]?.name || "Default"
      } / ${selectedSize}`,
    };
    addToCart(cartItem);
    toast(`Added ${product.name} to cart`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
      <ProductSchema product={product} />
      <BreadcrumbSchema items={breadcrumbItems} />
      {/* --- Breadcrumb (desktop only) --- */}
      <div className="hidden lg:block mb-8">
        <Breadcrumb>
          <BreadcrumbList className="text-sm font-medium">
            <BreadcrumbItem>
              <BreadcrumbLink 
                href="/" 
                className="text-gray-600 hover:text-black transition-colors"
              >
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            {product.category &&
              product.category.slug &&
              product.category.name && (
                <>
                  <BreadcrumbSeparator className="text-gray-400" />
                  <BreadcrumbItem>
                    <BreadcrumbLink 
                      href={`/category/${product.category.slug}`}
                      className="text-gray-600 hover:text-black transition-colors"
                    >
                      {product.category.name}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </>
              )}
            <BreadcrumbSeparator className="text-gray-400" />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-black font-semibold">
                {product.name.split(" ").slice(0, 3).join(" ")}
                {product.name.split(" ").length > 3 ? "..." : ""}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* --- Desktop Layout --- */}
      <div className="hidden lg:grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column - Images */}
        <div className="space-y-4">
          <div className="relative group">
            {/* Decorative background */}
            <div className="absolute -inset-4 bg-gray-50 rounded-2xl border-2 border-black transform rotate-1 transition-transform duration-300 group-hover:rotate-2" />
            
            <div className="relative bg-white rounded-2xl border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
              <ImageGallery
                showPlayButton={false}
                autoPlay={false}
                renderLeftNav={(onClick, disabled) => (
                  <button
                  title="Gallery Button" 
                    onClick={onClick} 
                    className={`absolute top-1/2 left-4 transform -translate-y-1/2 z-10 ${disabled ? "hidden" : ""}`}
                  >
                    <div className="w-10 h-10 bg-white border-2 border-black rounded-full flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-x-0.5">
                      <ChevronLeft className="w-5 h-5" />
                    </div>
                  </button>
                )}
                renderRightNav={(onClick, disabled) => (
                  <button 
                  title="Right navigation"
                    onClick={onClick} 
                    className={`absolute top-1/2 right-4 transform -translate-y-1/2 z-10 ${disabled ? "hidden" : ""}`}
                  >
                    <div className="w-10 h-10 bg-white border-2 border-black rounded-full flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-0.5">
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </button>
                )}
                renderItem={(item) => (
                  <ImageZoom
                    src={item.original}
                    alt={item.originalAlt}
                    fullWidth={true}
                  />
                )}
                items={product.productImages.map((img: any) => ({
                  original: imageThumbnailUrl(img.url, 800, 800),
                  thumbnail: imageThumbnailUrl(img.url, 100, 100),
                  originalAlt: product.name,
                  thumbnailAlt: product.name,
                }))}
              />
            </div>
          </div>
        </div>

        {/* Right Column - Product Details */}
        <div className="space-y-6">
          {/* Header */}
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-4">
              <h1 className="text-4xl font-bold text-black leading-tight">
                {product.name}
              </h1>
              
              <button
              title="WhishListed Button"
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="p-3 rounded-xl border-2 border-black bg-white hover:bg-black hover:text-white transition-all duration-200 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm font-medium text-gray-600">(128 reviews)</span>
            </div>
          </div>

          {/* Price */}
          <div className="bg-gray-50 rounded-2xl border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center gap-4 flex-wrap">
              <span className="text-4xl font-bold text-black">
                ${product.price}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-gray-500 line-through">
                    ${product.originalPrice}
                  </span>
                  <span className="bg-black text-white px-3 py-1.5 rounded-lg text-sm font-bold">
                    -{product.discount}% OFF
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="text-gray-700 leading-relaxed text-base border-l-4 border-black pl-4">
            {product.description}
          </div>

          {/* Colors */}
          {product.colors.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-black uppercase tracking-wider flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-black" />
                Select Color
              </h3>
              <div className="flex gap-3">
                {product.colors.map((color: any) => (
                  <button
                  title="Product Color"
                    key={color.id}
                    onClick={() => setSelectedColor(color.id)}
                    className={`w-12 h-12 rounded-xl border-2 transition-all duration-200 ${
                      selectedColor === color.id
                        ? "border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] scale-110"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    style={{ backgroundColor: color.hexColor }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Size */}
          {product.sizes.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-black uppercase tracking-wider flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-black" />
                Select Size
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size: any, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-3 border-2 rounded-xl text-sm font-bold uppercase transition-all duration-200 ${
                      selectedSize === size
                        ? "border-black bg-black text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)]"
                        : "border-black bg-white text-black hover:bg-gray-50"
                    }`}
                  >
                    {size.size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-black uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-black" />
              Quantity
            </h3>
            <div className="flex items-center border-2 border-black rounded-xl w-fit bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-5 py-3 text-black hover:bg-gray-50 font-bold text-lg transition-colors"
              >
                −
              </button>
              <span className="px-6 py-3 border-x-2 border-black font-bold text-lg min-w-[60px] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-5 py-3 text-black hover:bg-gray-50 font-bold text-lg transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="space-y-3 pt-4">
            <button
              onClick={handleAddToCart}
              className="group relative w-full"
            >
              <div className="absolute inset-0 bg-black rounded-2xl transform translate-x-1 translate-y-1 transition-transform duration-200 group-hover:translate-x-2 group-hover:translate-y-2" />
              <div className="relative bg-white border-2 border-black rounded-2xl px-8 py-4 font-bold uppercase tracking-wider transition-all duration-200 group-hover:-translate-x-1 group-hover:-translate-y-1 flex items-center justify-center gap-3">
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </div>
            </button>

            {/* Stock Status */}
            <div className="flex items-center justify-center gap-2 text-sm">
              <span className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="font-medium text-gray-600">
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* --- Mobile Layout --- */}
      <div className="block lg:hidden space-y-6">
        {/* Title + Description */}
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <h1 className="text-2xl font-bold text-black leading-tight">
              {product.name}
            </h1>
            
            <button
            title="WhishListed"
              onClick={() => setIsWishlisted(!isWishlisted)}
              className="p-2 rounded-lg border-2 border-black bg-white hover:bg-black hover:text-white transition-all duration-200 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none"
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-xs font-medium text-gray-600">(128)</span>
          </div>
          
                 <div className="text-gray-700 leading-relaxed text-base border-l-4 border-black pl-4"
                     dangerouslySetInnerHTML={{
    __html: product.description.replace(/<\/?p>/g, ""),
  }}
  />


        </div>

        {/* Price */}
        <div className="bg-gray-50 rounded-2xl border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-3xl font-bold text-black">
              ${product.price}
            </span>
            {product.originalPrice && (
              <>
                <span className="text-lg text-gray-500 line-through">
                  ${product.originalPrice}
                </span>
                <span className="bg-black text-white px-2.5 py-1 rounded-lg text-xs font-bold">
                  -{product.discount}%
                </span>
              </>
            )}
          </div>
        </div>

        {/* Swipeable Gallery */}
        <div className="relative">
          <div className="bg-white rounded-2xl border-2 border-black overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <Carousel>
              <CarouselContent>
                {product.productImages.map((img: any, index: number) => (
                  <CarouselItem key={index} className="w-full">
                    <Image
                      src={imageThumbnailUrl(img.url)}
                      alt={product.name}
                      width={800}
                      height={800}
                      className="w-full h-full object-cover"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute top-1/2 left-2 transform -translate-y-1/2 w-8 h-8 border-2 border-black bg-white rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" />
              <CarouselNext className="absolute top-1/2 right-2 transform -translate-y-1/2 w-8 h-8 border-2 border-black bg-white rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" />
            </Carousel>
          </div>
        </div>

        {/* Product Options */}
        <div className="space-y-5">
          {/* Colors */}
          {product.colors.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-black uppercase tracking-wider flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-black" />
                Color
              </h3>
              <div className="flex gap-2">
                {product.colors.map((color: any) => (
                  <button
                  title="Select color"
                    key={color.id}
                    onClick={() => setSelectedColor(color.id)}
                    className={`w-10 h-10 rounded-lg border-2 transition-all ${
                      selectedColor === color.id
                        ? "border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                        : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color.hexColor }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Size */}
          {product.sizes.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-black uppercase tracking-wider flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-black" />
                Size
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size: any, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border-2 rounded-lg text-sm font-bold transition-all ${
                      selectedSize === size
                        ? "border-black bg-black text-white"
                        : "border-black bg-white text-black"
                    }`}
                  >
                    {size.size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-black uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-black" />
              Quantity
            </h3>
            <div className="flex items-center border-2 border-black rounded-lg w-fit bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 text-black font-bold"
              >
                −
              </button>
              <span className="px-5 py-2 border-x-2 border-black font-bold">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2 text-black font-bold"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="group relative w-full"
          >
            <div className="absolute inset-0 bg-black rounded-xl transform translate-x-1 translate-y-1" />
            <div className="relative bg-white border-2 border-black rounded-xl px-6 py-3 font-bold uppercase tracking-wide text-sm flex items-center justify-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </div>
          </button>
        </div>

        {/* About This Product */}
        <div className="bg-gray-50 rounded-2xl border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <h3 className="text-lg font-bold text-black mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-black" />
            About This Product
          </h3>
          <div
            className="prose prose-sm text-gray-700 leading-relaxed [&_img]:w-full [&_img]:object-cover [&_img]:rounded-lg [&_img]:border-2 [&_img]:border-black"
            dangerouslySetInnerHTML={{ __html: product.about }}
          />
        </div>
      </div>

      {/* --- Tabs (Desktop Only) --- */}
      <div className="hidden lg:block mt-16">
        <Tabs defaultValue="about" className="w-full">
          <TabsList className="border-b-2 border-black mb-8 bg-transparent p-0 h-auto">
            <TabsTrigger 
              value="about"
              className="data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-6 py-3 font-bold uppercase tracking-wider"
            >
              About This Product
            </TabsTrigger>
            <TabsTrigger 
              value="specifications"
              className="data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-6 py-3 font-bold uppercase tracking-wider"
            >
              Specifications
            </TabsTrigger>
          </TabsList>

          <TabsContent value="about">
            <div className="bg-gray-50 rounded-2xl border-2 border-black p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="text-2xl font-bold text-black mb-6 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-black" />
                About This Product
              </h3>
              <div
                className="prose max-w-none break-words overflow-hidden [&_*]:max-w-full [&_img]:w-full [&_img]:object-cover [&_img]:rounded-lg [&_img]:border-2 [&_img]:border-black [&_img]:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                dangerouslySetInnerHTML={{ __html: product.about }}
              />
            </div>
          </TabsContent>

          <TabsContent value="specifications">
            <div className="bg-gray-50 rounded-2xl border-2 border-black p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {product.specifications.map((spec: any) => (
                  <li 
                    key={spec.id} 
                    className="flex gap-3 text-base bg-white rounded-lg border-2 border-black p-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  >
                    <span className="font-bold text-black">{spec.key}:</span>
                    <span className="text-gray-700">{spec.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}