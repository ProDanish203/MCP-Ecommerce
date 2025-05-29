"use client";
import ProductCard from "@/components/shared/product-card";
import { Product } from "@/lib/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  const getProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/products/all`
      );
      if (!data.success) {
        return toast.error(data.message || "Failed to fetch products");
      }
      setProducts(data.data);
    } catch (err) {
      toast.error("Failed to fetch products");
    }
  };
  useEffect(() => {
    getProducts();
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
