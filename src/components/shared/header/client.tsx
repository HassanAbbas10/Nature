"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useCartStore } from "@/lib/cart-store";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { CartClientDrawer } from "../cart/client";
import { SearchBar } from "../search/search-drawer";

export function HeaderClient({
  data,
  collections,
}: {
  data: any;
  collections: any;
}) {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileExploreOpen, setMobileExploreOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const { items } = useCartStore();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const categories = Array.isArray(data) ? data : [];
  const megaMenuCategories = categories.slice(0, 4);

  const showDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  return (
    <header 
      className={`w-full border-b-2 border-black bg-white sticky top-0 z-50 shadow-[0_4px_0px_0px_rgba(0,0,0,0.1)] transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6 py-3 md:py-5">
        <div className="flex items-center space-x-8">
          {/* Logo */}
          <Link href="/" className="group">
            <div className="transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/logo.png"
                alt="Logo"
                width={128}
                height={32}
                className="h-8 w-auto"
              />
            </div>
          </Link>

          {/* Navigation (Desktop) */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-bold tracking-wide relative">
            <Link
              href="/"
              className="hover:text-gray-700 transition-colors duration-200 relative group"
            >
              HOME
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full" />
            </Link>

            {/* SHOP with Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setMenuOpen(true)}
              onMouseLeave={() => setMenuOpen(false)}
            >
              <Link
                href="/categories"
                className="hover:text-gray-700 inline-flex items-center transition-colors duration-200 relative"
              >
                SHOP ▾
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full" />
              </Link>
              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.2 }}
                    className="fixed left-0 top-[72px] w-full z-30 bg-white border-b-2 border-black px-16 py-12 flex justify-center shadow-[0_8px_0px_0px_rgba(0,0,0,0.1)]"
                  >
                    <div className="flex w-full max-w-7xl space-x-12">
                      {/* Categories */}
                      {megaMenuCategories.map((category: any) => (
                        <div key={category.id} className="min-w-[220px]">
                          <Link
                            href={`/category/${encodeURIComponent(
                              category.slug
                            )}`}
                            className="font-serif text-xl mb-3 text-gray-900 hover:text-black block font-bold transition-colors duration-200 relative inline-block group/cat"
                          >
                            {category.name}
                            <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover/cat:w-full" />
                          </Link>
                          <ul className="ml-2 pl-3 border-l-2 border-black space-y-2">
                            {(category.products || [])
                              .slice(0, 6)
                              .map((item: any) => (
                                <li key={item.id}>
                                  <Link
                                    href={`/products/${encodeURIComponent(
                                      item.slug
                                    )}`}
                                    className="text-gray-700 hover:text-black text-base font-medium transition-all duration-200 hover:translate-x-1 inline-block"
                                  >
                                    {item.name}
                                  </Link>
                                </li>
                              ))}
                          </ul>
                        </div>
                      ))}

                      {/* Collections */}
                      <div className="min-w-[220px] bg-gray-50 rounded-xl border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <h4 className="font-bold mb-4 text-xs tracking-widest text-black flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-black" />
                          COLLECTIONS
                        </h4>
                        <ul className="space-y-2.5">
                          {collections.length ? (
                            collections.map((collection: any) => (
                              <li key={collection.id}>
                                <Link
                                  href={`/collections/${encodeURIComponent(
                                    collection.slug
                                  )}`}
                                  className="text-gray-700 hover:text-black transition-all duration-200 font-medium hover:translate-x-1 inline-block"
                                >
                                  {collection.name}
                                </Link>
                              </li>
                            ))
                          ) : (
                            <li className="text-gray-500">No collections</li>
                          )}
                        </ul>
                      </div>

                      {/* Category Images */}
                      <div className="flex flex-col items-center justify-start space-y-6">
                        {categories
                          .filter((c: any) => c.imageUrl)
                          .slice(0, 3)
                          .map((c: any) => (
                            <Link
                              key={c.id}
                              href={`/category/${encodeURIComponent(c.slug)}`}
                              className="flex flex-col items-center group"
                            >
                              <div className="relative overflow-hidden rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 group-hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-[-2px] group-hover:translate-y-[-2px]">
                                <Image
                                  src={c.imageUrl}
                                  alt={c.name}
                                  width={160}
                                  height={128}
                                  className="w-40 h-32 object-cover transition-transform duration-300 group-hover:scale-110"
                                  unoptimized
                                />
                              </div>
                              <span className="mt-2 text-sm text-gray-700 font-medium text-center group-hover:text-black transition-colors">
                                {c.name}
                              </span>
                            </Link>
                          ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/blogs"
              className="hover:text-gray-700 transition-colors duration-200 relative group"
            >
              BLOGS
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link
              href="/about"
              className="hover:text-gray-700 transition-colors duration-200 relative group"
            >
              ABOUT
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link
              href="/contact"
              className="hover:text-gray-700 transition-colors duration-200 relative group"
            >
              CONTACT
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full" />
            </Link>
          </nav>
        </div>

        {/* Search + Cart + Hamburger */}
        <div className="flex items-center space-x-4">
          {/* Mobile Hamburger Menu */}
          <button
            className="md:hidden p-2 rounded-lg border-2 border-black bg-white hover:bg-black hover:text-white transition-all duration-200 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
            onClick={() => setMobileExploreOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Search */}
          <div className="hidden md:block w-64">
            <SearchBar />
          </div>
          <div className="md:hidden">
            <SearchBar />
          </div>

          {/* Cart */}
          <div className="relative">
            <button
              className="p-2 rounded-lg border-2 border-black bg-white hover:bg-black hover:text-white transition-all duration-200 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
              onClick={showDrawer}
              aria-label="Shopping cart"
            >
              <ShoppingBag className="w-5 h-5" />
            </button>
            {items.length > 0 && (
              <span className="absolute -top-2 -right-2 text-xs bg-black text-white font-bold rounded-full px-1.5 min-w-[20px] h-[20px] flex items-center justify-center border-2 border-white shadow-md">
                {items.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Cart Drawer */}
      <CartClientDrawer open={open} closeDrawer={closeDrawer} />

      {/* Mobile Drawer */}
      <Drawer open={mobileExploreOpen} onOpenChange={setMobileExploreOpen}>
        <DrawerContent className="h-[85vh] border-t-2 border-black">
          <DrawerHeader className="border-b-2 border-black">
            <DrawerTitle className="font-bold text-lg tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-black" />
              MENU
            </DrawerTitle>
          </DrawerHeader>

          <div className="p-6 overflow-y-auto space-y-8">
            {/* Categories */}
            {megaMenuCategories.map((category: any) => (
              <div key={category.id}>
                <Link
                  href={`/category/${encodeURIComponent(category.slug)}`}
                  className="font-serif text-lg text-gray-900 hover:text-black font-bold block mb-3 transition-colors"
                  onClick={() => setMobileExploreOpen(false)}
                >
                  {category.name}
                </Link>
                <ul className="ml-3 pl-3 border-l-2 border-black space-y-2">
                  {(category.products || []).slice(0, 6).map((item: any) => (
                    <li key={item.id}>
                      <Link
                        href={`/products/${encodeURIComponent(item.slug)}`}
                        className="text-gray-700 hover:text-black transition-colors font-medium"
                        onClick={() => setMobileExploreOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Collections */}
            <div className="bg-gray-50 rounded-xl border-2 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <h4 className="font-bold mb-3 text-xs tracking-widest text-black flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-black" />
                COLLECTIONS
              </h4>
              <ul className="space-y-2">
                {collections.length ? (
                  collections.map((collection: any) => (
                    <li key={collection.id}>
                      <Link
                        href={`/collections/${encodeURIComponent(
                          collection.slug
                        )}`}
                        className="text-gray-700 hover:text-black transition-colors font-medium"
                        onClick={() => setMobileExploreOpen(false)}
                      >
                        {collection.name}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-500">No collections</li>
                )}
              </ul>
            </div>

            {/* Bottom Links */}
            <div className="pt-6 border-t-2 border-dashed border-black">
              <ul className="space-y-4 text-base font-bold">
                <li>
                  <Link
                    href="/"
                    className="text-gray-900 hover:text-black transition-colors flex items-center gap-2 group"
                    onClick={() => setMobileExploreOpen(false)}
                  >
                    <span className="w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-4" />
                    HOME
                  </Link>
                </li>
                <li>
                  <Link
                    href="/categories"
                    className="text-gray-900 hover:text-black transition-colors flex items-center gap-2 group"
                    onClick={() => setMobileExploreOpen(false)}
                  >
                    <span className="w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-4" />
                    SHOP
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blogs"
                    className="text-gray-900 hover:text-black transition-colors flex items-center gap-2 group"
                    onClick={() => setMobileExploreOpen(false)}
                  >
                    <span className="w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-4" />
                    BLOGS
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-gray-900 hover:text-black transition-colors flex items-center gap-2 group"
                    onClick={() => setMobileExploreOpen(false)}
                  >
                    <span className="w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-4" />
                    ABOUT
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-gray-900 hover:text-black transition-colors flex items-center gap-2 group"
                    onClick={() => setMobileExploreOpen(false)}
                  >
                    <span className="w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-4" />
                    CONTACT
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </header>
  );
}