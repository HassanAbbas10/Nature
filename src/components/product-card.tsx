import Image from "next/image";
import Link from "next/link";

export const ProductCard: React.FC<{ product: any }> = ({ product }) => (
  <Link href={`/products/${product.slug}`}>
    <div className="group bg-white/90  rounded-lg border-1 border-slate-500 overflow-hidden shadow-xl shadow-slate-400 ring-opacity-40 hover:shadow-2xl hover:scale-105 transition-all ease-in-out duration-700">
      <div className="relative group">
        {/* Product Image Container */}
        <div className="w-full aspect-square overflow-hidden flex justify-center items-center h-48 bg-gray-100">
          <Image
            src={product.productImages?.[0]?.url || "/placeholder.png"}
            alt={product.name}
            width={300}
            height={200}
            className="object-cover relative aspect-square overflow-hidden transform group-hover:scale-105 transition-transform duration-300"
          />
        </div>

    

        {/* Discount Badge */}
        {product.discount > 0 && (
          <div className="absolute left-0 top-3 px-2 py-1 rounded-md bg-red-500 text-white text-sm">
            {product.discount}% OFF
          </div>
        )}

        {/* Stock Status */}
        <div className="absolute bottom-4 left-4">
          <span
            className={`px-2 py-1 rounded-md text-xs font-medium ${
              product.inStock
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            {product.inStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>
      
      </div>

      {/* Product Details */}
      <div className="p-4">
        {/* Category */}
        <div className="text-xs text-gray-500 font-medium mb-1 uppercase tracking-wide">
          {product.category?.name || "Uncategorized"}
        </div>

        {/* Product Name */}
        <h3 className="text-sm font-medium mb-2 line-clamp-2 h-10">
          {product.name}
        </h3>

        {/* Price and Rating */}
        <div className="flex flex-col items-start justify-start">
          {/* Price Section */}
          <div className="flex items-center gap-2 mb-2">
            {product.discount > 0 ? (
              <>
                <span className="font-bold text-lg text-red-500">
                  ${product.price}
                </span>
                <span className="text-gray-400 text-sm line-through">
                  $
                  {(
                    product.price +
                    (product.price * product.discount) / 100
                  ).toFixed(2)}
                </span>
              </>
            ) : (
              <span className="font-bold text-lg text-gray-800">
                ${product.price}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  </Link>
);
