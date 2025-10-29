"use client";

import { ProductCard } from "@/components/product-card";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Filter, Grid3x3, LayoutGrid, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface Product {
  id: string;
  name: string;
  price: number;
  inStock: boolean;
  stockQuantity?: number | null;
  productImages: { url: string }[];
  category?: { name: string; id: string } | null;
  type?: string;
  slug: string;
}

interface ProductsListClientProps {
  initialProducts: Product[];
  hasMore: boolean;
  totalCount: number;
  currentPage: number;
}

export function ProductsListClient({
  initialProducts,
  hasMore: initialHasMore,
  totalCount: initialTotalCount,
  currentPage: initialCurrentPage,
}: ProductsListClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Initialize state from URL params
  const initialCategory = searchParams.get("category") || "All Categories";
  const initialPrice = searchParams.get("price") || "All Prices";
  const initialSort = searchParams.get("sort") || "Sort By: Featured";

  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(initialCurrentPage);
  const [totalCount, setTotalCount] = useState(initialTotalCount);
  const [gridCols, setGridCols] = useState<3 | 4>(4);
  const [category, setCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState(initialPrice);
  const [sortBy, setSortBy] = useState(initialSort);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const limit = 8; // Products per page (adjust based on your needs)
  const totalPages = Math.ceil(totalCount / limit);

  const fetchProducts = async (page: number) => {
    setLoading(true);
    try {
      const query = new URLSearchParams();
      query.set("page", page.toString());
      query.set("limit", limit.toString());
      
      if (category !== "All Categories") {
        query.set("category", category);
      }
      
      if (priceRange !== "All Prices") {
        query.set("price", priceRange);
      }
      
      if (sortBy !== "Sort By: Featured") {
        query.set("sort", sortBy);
      }

      const response = await fetch(`/api/products?${query.toString()}`);
      const data = await response.json();

      setProducts(data.products);
      setHasMore(data.hasMore);
      setTotalCount(data.totalCount);
      setCurrentPage(page);

      // Update URL with page number
      router.push(`/products?${query.toString()}`, { scroll: false });
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = async () => {
    // Reset to page 1 when filters change
    await fetchProducts(1);
  };

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    fetchProducts(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Apply filters when any filter state changes
  useEffect(() => {
    applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, priceRange, sortBy]);

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = window.innerWidth < 640 ? 3 : 5; 
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 2) {
        for (let i = 1; i <= Math.min(3, totalPages); i++) pages.push(i);
        if (totalPages > 3) pages.push('...');
        if (totalPages > 3) pages.push(totalPages);
      } else if (currentPage >= totalPages - 1) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 2; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(currentPage);
        if (currentPage < totalPages - 1) pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  // Mobile Filter Drawer
  const MobileFilterDrawer = () => (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={() => setShowMobileFilters(false)}
      />
      
      {/* Drawer */}
      <div className="absolute right-0 top-0 h-full w-80 bg-white border-l-2 border-black shadow-2xl overflow-y-auto">
        <div className="p-4 border-b-2 border-black bg-white">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Filters</h2>
            <button
            title="Mobile Filters"
              onClick={() => setShowMobileFilters(false)}
              className="p-2 hover:bg-gray-100 rounded-lg border-2 border-black"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-bold mb-3 uppercase tracking-wide">
              Category
            </label>
            <select
            aria-label="Category Filter"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-white border-2 border-black rounded-xl px-4 py-3 font-medium text-base focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            >
              <option>All Categories</option>
              <option>Oils</option>
              <option>Nuts</option>
              <option>Butters</option>
            </select>
          </div>

          {/* Price Filter */}
          <div>
            <label className="block text-sm font-bold mb-3 uppercase tracking-wide">
              Price Range
            </label>
            <select
              aria-label="Price Filter"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full bg-white border-2 border-black rounded-xl px-4 py-3 font-medium text-base focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            >
              <option>All Prices</option>
              <option>Under $10</option>
              <option>$10 - $25</option>
              <option>$25 - $50</option>
              <option>Over $50</option>
            </select>
          </div>

          {/* Sort Options */}
          <div>
            <label className="block text-sm font-bold mb-3 uppercase tracking-wide">
              Sort By
            </label>
            <select
            aria-label="Sort Filtering"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-white border-2 border-black rounded-xl px-4 py-3 font-bold text-sm uppercase tracking-wide focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            >
              <option>Sort By: Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Name: A to Z</option>
              <option>Name: Z to A</option>
              <option>Newest First</option>
            </select>
          </div>

          {/* Grid Layout Options */}
          <div>
            <label className="block text-sm font-bold mb-3 uppercase tracking-wide">
              Layout
            </label>
            <div className="flex items-center gap-2 bg-gray-50 rounded-xl border-2 border-black p-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <button
                title="Grid Setting"
                onClick={() => setGridCols(3)}
                className={`flex-1 p-3 rounded-lg transition-all duration-200 text-sm font-medium ${
                  gridCols === 3
                    ? "bg-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    : "hover:bg-gray-100"
                }`}
              >
                <Grid3x3 className="w-4 h-4 mx-auto" />
              </button>
              <button
              title="Setting Grid"
                onClick={() => setGridCols(4)}
                className={`flex-1 p-3 rounded-lg transition-all duration-200 text-sm font-medium ${
                  gridCols === 4
                    ? "bg-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    : "hover:bg-gray-100"
                }`}
              >
                <LayoutGrid className="w-4 h-4 mx-auto" />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4 border-t-2 border-black">
            <button
              onClick={() => {
                setCategory("All Categories");
                setPriceRange("All Prices");
                setSortBy("Sort By: Featured");
              }}
              className="w-full bg-gray-100 border-2 border-black rounded-xl px-4 py-3 font-bold text-sm uppercase tracking-wide hover:bg-gray-200 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            >
              Clear All Filters
            </button>
            <button
              onClick={() => setShowMobileFilters(false)}
              className="w-full bg-black text-white border-2 border-black rounded-xl px-4 py-3 font-bold text-sm uppercase tracking-wide hover:bg-gray-800 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile Filter Drawer */}
      {showMobileFilters && <MobileFilterDrawer />}

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-gray-50 via-white to-gray-50 py-12 md:py-24 overflow-hidden border-b-2 border-black">
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-black rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-black rounded-full blur-3xl" />
        </div>

        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block mb-4 md:mb-6">
            <div className="relative">
              <div className="absolute -inset-2 md:-inset-3 bg-gray-100 rounded-2xl border-2 border-black transform -rotate-2" />
              <div className="relative bg-white rounded-2xl border-2 border-black px-4 py-2 md:px-6 md:py-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <span className="text-xs md:text-sm font-bold uppercase tracking-wider">
                  Shop All
                </span>
              </div>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4 md:mb-6 leading-tight">
            Our Products
          </h1>

          <div className="flex items-center justify-center gap-2 mb-4 md:mb-6">
            <div className="w-16 md:w-20 h-1 bg-black rounded-full" />
            <div className="w-2 h-2 rounded-full bg-black" />
            <div className="w-16 md:w-20 h-1 bg-black rounded-full" />
          </div>

          <p className="text-base md:text-lg lg:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed px-4">
            Discover our curated collection of premium products, handpicked just for you.
          </p>
        </div>
      </div>

      {/* Filters & Sort Bar */}
      <div className="bg-white border-b-2 border-black shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            {/* Left Side - Filters & Info */}
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              {/* Mobile Filter Button */}
              <button 
                onClick={() => setShowMobileFilters(true)}
                className="lg:hidden group relative inline-block"
              >
                <div className="absolute inset-0 bg-gray-100 rounded-xl border-2 border-black transform translate-x-0.5 translate-y-0.5 transition-transform duration-200 group-hover:translate-x-1 group-hover:translate-y-1 group-active:translate-x-0 group-active:translate-y-0" />
                <div className="relative bg-white border-2 border-black rounded-xl px-4 py-2 font-bold text-sm uppercase tracking-wide transition-all duration-200 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 group-active:translate-x-0 group-active:translate-y-0 flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Filters
                </div>
              </button>

              {/* Desktop Filters */}
              <button className="hidden lg:group relative lg:inline-block">
                <div className="absolute inset-0 bg-gray-100 rounded-xl border-2 border-black transform translate-x-0.5 translate-y-0.5 transition-transform duration-200 group-hover:translate-x-1 group-hover:translate-y-1 group-active:translate-x-0 group-active:translate-y-0" />
                <div className="relative bg-white border-2 border-black rounded-xl px-4 py-2 font-bold text-sm uppercase tracking-wide transition-all duration-200 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 group-active:translate-x-0 group-active:translate-y-0 flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Filters
                </div>
              </button>

              <select
                aria-label="Category Filter"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="hidden lg:block bg-white border-2 border-black rounded-xl px-4 py-2 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                <option>All Categories</option>
                <option>Oils</option>
                <option>Nuts</option>
                <option>Butters</option>
              </select>

              <select
                aria-label="Price Filter"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="hidden lg:block bg-white border-2 border-black rounded-xl px-4 py-2 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                <option>All Prices</option>
                <option>Under $10</option>
                <option>$10 - $25</option>
                <option>$25 - $50</option>
                <option>Over $50</option>
              </select>

              <div className="hidden md:block text-sm text-gray-600 font-medium px-3 py-2 bg-gray-50 rounded-lg border-2 border-black">
                <span className="font-bold text-black">{totalCount}</span> Products
              </div>
            </div>

            {/* Right Side - Sort & View Options */}
            <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-end">
              {/* Grid Layout - Hidden on mobile */}
              <div className="hidden sm:flex items-center gap-2 bg-gray-50 rounded-xl border-2 border-black p-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <button
                  onClick={() => setGridCols(3)}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    gridCols === 3
                      ? "bg-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                      : "hover:bg-gray-100"
                  }`}
                  aria-label="3 columns"
                >
                  <Grid3x3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setGridCols(4)}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    gridCols === 4
                      ? "bg-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                      : "hover:bg-gray-100"
                  }`}
                  aria-label="4 columns"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>

              {/* Sort - Hidden on mobile (moved to drawer) */}
              <select
                aria-label="Sorting Filter"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="hidden lg:block bg-white border-2 border-black rounded-xl px-4 py-2 font-bold text-sm uppercase tracking-wide focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                <option>Sort By: Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Name: A to Z</option>
                <option>Name: Z to A</option>
                <option>Newest First</option>
              </select>

              <button
                onClick={() => {
                  setCategory("All Categories");
                  setPriceRange("All Prices");
                  setSortBy("Sort By: Featured");
                }}
                className="text-sm text-gray-600 hover:text-black font-medium underline underline-offset-2 transition-colors whitespace-nowrap"
              >
                Clear All
              </button>
            </div>
          </div>

          {/* Mobile-only info and active filters */}
          <div className="flex flex-wrap items-center gap-2 mt-3 lg:hidden">
            <div className="text-xs text-gray-600 font-medium px-3 py-1.5 bg-gray-50 rounded-lg border-2 border-black">
              <span className="font-bold text-black">{totalCount}</span> Products
            </div>
            
            {/* Active filters pills */}
            {(category !== "All Categories" || priceRange !== "All Prices") && (
              <div className="flex flex-wrap gap-2">
                {category !== "All Categories" && (
                  <span className="inline-flex items-center gap-1 bg-black text-white text-xs px-3 py-1.5 rounded-full border-2 border-black">
                    {category}
                  </span>
                )}
                {priceRange !== "All Prices" && (
                  <span className="inline-flex items-center gap-1 bg-black text-white text-xs px-3 py-1.5 rounded-full border-2 border-black">
                    {priceRange}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            <div
              className={`grid grid-cols-1 ${
                gridCols === 3 
                  ? "sm:grid-cols-2 lg:grid-cols-3" 
                  : "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              } gap-4 sm:gap-6 mb-8 md:mb-12`}
            >
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Page Info */}
                <div className="text-sm text-gray-600 text-center sm:text-left">
                  Showing <span className="font-bold text-black">{((currentPage - 1) * limit) + 1}</span> to{" "}
                  <span className="font-bold text-black">{Math.min(currentPage * limit, totalCount)}</span> of{" "}
                  <span className="font-bold text-black">{totalCount}</span> products
                </div>

                {/* Pagination Controls */}
                <div className="flex items-center gap-1 sm:gap-2">
                  {/* Previous Button */}
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`group relative inline-block ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div className="absolute inset-0 bg-gray-100 rounded-lg border-2 border-black transform translate-x-0.5 translate-y-0.5 transition-transform duration-200 group-hover:translate-x-1 group-hover:translate-y-1" />
                    <div className="relative bg-white border-2 border-black rounded-lg px-3 py-2 font-bold text-sm transition-all duration-200 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 flex items-center gap-1">
                      <ChevronLeft className="w-4 h-4" />
                      <span className="hidden sm:inline">Prev</span>
                    </div>
                  </button>

                  {/* Page Numbers */}
                  <div className="flex items-center gap-1">
                    {getPageNumbers().map((pageNum, idx) => (
                      <button
                        key={idx}
                        onClick={() => typeof pageNum === 'number' ? goToPage(pageNum) : null}
                        disabled={pageNum === '...'}
                        className={`relative inline-block min-w-[32px] sm:min-w-[40px] ${
                          pageNum === currentPage
                            ? 'bg-black text-white border-2 border-black'
                            : pageNum === '...'
                            ? 'cursor-default'
                            : 'bg-white border-2 border-black hover:bg-gray-50'
                        } rounded-lg px-2 sm:px-3 py-2 font-bold text-sm transition-all ${
                          pageNum === currentPage ? 'shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' : ''
                        }`}
                      >
                        {pageNum}
                      </button>
                    ))}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`group relative inline-block ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div className="absolute inset-0 bg-gray-100 rounded-lg border-2 border-black transform translate-x-0.5 translate-y-0.5 transition-transform duration-200 group-hover:translate-x-1 group-hover:translate-y-1" />
                    <div className="relative bg-white border-2 border-black rounded-lg px-3 py-2 font-bold text-sm transition-all duration-200 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 flex items-center gap-1">
                      <span className="hidden sm:inline">Next</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* Empty State */}
            {products.length === 0 && (
              <div className="text-center py-12 md:py-20">
                <div className="inline-block relative">
                  <div className="absolute -inset-3 md:-inset-4 bg-gray-50 rounded-3xl border-2 border-black transform -rotate-2" />
                  <div className="relative bg-white rounded-3xl border-2 border-black p-8 md:p-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                    <h3 className="text-xl md:text-2xl font-bold text-black mb-3 md:mb-4">
                      No Products Found
                    </h3>
                    <p className="text-gray-600 text-sm md:text-base">
                      Try adjusting your filters or check back later.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}