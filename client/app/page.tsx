"use client";
import ProductCard from "@/components/shared/product-card";
import { sampleProducts } from "@/lib/data";
import { Product } from "@/lib/types";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(sampleProducts);
  }, []);
  return (
    <div className="container mx-auto flex-1 py-10 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
