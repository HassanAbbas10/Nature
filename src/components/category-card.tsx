"use client";

import { imageThumbnailUrl } from "@/utils/image-otf";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const CategoryCard: React.FC<{ category: any; index?: number }> = ({ 
  category, 
  index = 0 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
    <Link href={`/category/${category.slug}`} className="group block">
      <motion.div
        className="relative bg-white rounded-lg border-2 border-black overflow-hidden shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
        whileHover={{ 
          boxShadow: "4px 4px 0px 0px rgba(0,0,0,1)",
          x: -1,
          y: -1
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden">
          {/* Image with overlay */}
          <motion.div
            className="absolute inset-0 bg-center bg-cover"
            style={{
              ...(category.imageUrl
                ? {
                    backgroundImage: `url(${imageThumbnailUrl(
                      category.imageUrl,
                      200,
                      200
                    )})`,
                  }
                : {
                    backgroundColor: "#f3f4f6",
                  }),
            }}
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />

          {/* Gradient overlay on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
          />

          {/* Shop Now button that appears on hover */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.85 }}
            whileHover={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-black rounded-md transform translate-x-0.5 translate-y-0.5" />
              <div className="relative bg-white border-2 border-black rounded-md px-3 py-1.5 font-bold uppercase tracking-wide text-[10px] flex items-center gap-1.5">
                Shop Now
                <ArrowRight className="w-2.5 h-2.5" />
              </div>
            </div>
          </motion.div>

          {/* Corner accent */}
          <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-black rounded-full" />
        </div>

        {/* Title section */}
        <div className="p-2 bg-white border-t-2 border-black">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-xs uppercase tracking-wider text-black group-hover:translate-x-0.5 transition-transform duration-300 truncate">
              {category.name}
            </h3>
            <motion.div
              animate={{ x: [0, 2, 0] }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0"
            >
              <ArrowRight className="w-3 h-3 text-black" />
            </motion.div>
          </div>

          {/* Product count (optional) */}
          {category.productCount && (
            <div className="mt-1 text-[14px] text-gray-600 font-medium">
              {category.productCount} Products
            </div>
          )}
        </div>
      </motion.div>
    </Link>
  </motion.div>
);