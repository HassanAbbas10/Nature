import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const category = searchParams.get("category");
    const price = searchParams.get("price");
    const sort = searchParams.get("sort");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "8", 10);
    const skip = (page - 1) * limit;

    
    const where: any = {
      active: true,
    };

    // Category filter
    if (category && category !== "All Categories") {
      where.category = {
        name: category,
      };
    }

    
    if (price && price !== "All Prices") {
      if (price === "Under $10") {
        where.price = { lt: 10 };
      } else if (price === "$10 - $25") {
        where.price = { gte: 10, lte: 25 };
      } else if (price === "$25 - $50") {
        where.price = { gte: 25, lte: 50 };
      } else if (price === "Over $50") {
        where.price = { gt: 50 };
      }
    }


    let orderBy: any = { createdAt: "desc" }; 
    
    if (sort === "Price: Low to High") {
      orderBy = { price: "asc" };
    } else if (sort === "Price: High to Low") {
      orderBy = { price: "desc" };
    } else if (sort === "Name: A to Z") {
      orderBy = { name: "asc" };
    } else if (sort === "Name: Z to A") {
      orderBy = { name: "desc" };
    } else if (sort === "Newest First") {
      orderBy = { createdAt: "desc" };
    } else if (sort === "Sort By: Featured") {
      orderBy = { featured: "desc" };
    }


    const [products, totalCount] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        select: {
          id: true,
          name: true,
          slug: true,
          price: true,
          inStock: true,
          stockQuantity: true,
          category: {
            select: { 
              id: true, 
              name: true 
            },
          },
          productImages: {
            select: { 
              url: true 
            },
            orderBy: {
              sortOrder: "asc"
            },
            take: 1,
          },
        },
      }),
      prisma.product.count({ where }),
    ]);

    const hasMore = skip + limit < totalCount;

    return NextResponse.json({
      products,
      hasMore,
      totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}