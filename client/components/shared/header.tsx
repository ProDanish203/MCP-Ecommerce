"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store";
import CartDrawer from "./cart-drawer";
import ChatPopup from "./chat-popup";

export default function SiteHeader() {
  const { toggleCart, cartItems } = useCartStore();
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Toggle chat without affecting page scroll
  const handleChatToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsChatOpen(!isChatOpen);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold text-xl">AI-MCP</span>
        </Link>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Button
              variant="outline"
              size="icon"
              onClick={handleChatToggle}
              className="relative"
              type="button"
            >
              <MessageCircle className="h-5 w-5" />
            </Button>
            <ChatPopup
              isOpen={isChatOpen}
              onClose={() => setIsChatOpen(false)}
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={toggleCart}
            className="relative"
          >
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Button>
        </div>
      </div>
      <CartDrawer />
    </header>
  );
}
