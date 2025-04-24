"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Product } from "@/lib/types";
import { useCartStore } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCartStore();

  return (
    <Card className="overflow-hidden">
      <div className="aspect-video relative">
        <Image
          src={product.imageUrl || "/images/img-1.jpg"}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>
      <CardHeader className="px-4">
        <CardTitle className="line-clamp-1">{product.name}</CardTitle>
        <div className="text-sm text-muted-foreground">{product.category}</div>
      </CardHeader>
      <CardContent className="px-4">
        <p className="text-sm line-clamp-2">{product.description}</p>
      </CardContent>
      <CardFooter className="px-4 flex items-center justify-between">
        <div className="font-bold">{formatCurrency(product.price)}</div>
        <Button
          onClick={() => addToCart(product)}
          disabled={product.stock <= 0}
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
