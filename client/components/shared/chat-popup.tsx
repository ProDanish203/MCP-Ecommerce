"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import useOutsideClick from "@/hooks/handle-outside-click";

export type MessageRole = "user" | "assistant";

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  createdAt: Date;
}

interface ChatPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatPopup({ isOpen, onClose }: ChatPopupProps) {
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, () => {
    if (isOpen) {
      onClose();
    }
  });
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hi there! How can I help you today?",
      createdAt: new Date(),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messagesEndRef.current && chatContainerRef.current) {
      const container = chatContainerRef.current;
      const scrollElement = messagesEndRef.current;

      container.scrollTop = scrollElement.offsetTop - container.offsetTop;
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        if (inputRef.current) {
          const scrollX = window.scrollX;
          const scrollY = window.scrollY;

          inputRef.current.focus();
          window.scrollTo(scrollX, scrollY);
        }
      }, 100);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    setTimeout(() => {
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `Thanks for your message! This is a demo response to "${input}".`,
        createdAt: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="absolute right-0 top-16 z-50 bg-background border rounded-lg shadow-lg w-80 sm:w-96 overflow-hidden flex flex-col"
          style={{ maxHeight: "min(500px, calc(100vh - 80px))" }}
        >
          <div className="p-3 border-b flex justify-between items-center bg-muted/30">
            <h3 className="font-medium">Chat Assistant</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              type="button"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-3 space-y-3"
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "px-3 py-2 rounded-lg max-w-[85%]",
                  message.role === "user"
                    ? "bg-primary text-primary-foreground ml-auto"
                    : "bg-muted mr-auto"
                )}
              >
                <p className="text-sm">{message.content}</p>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form
            onSubmit={(e) => {
              handleSubmit(e);
              e.preventDefault();
              e.stopPropagation();
              return false;
            }}
            className="p-3 border-t flex gap-2"
          >
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1"
              onFocus={(e) => {
                const scrollX = window.scrollX;
                const scrollY = window.scrollY;
                e.target.focus();
                window.scrollTo(scrollX, scrollY);
              }}
            />
            <Button
              type="submit"
              size="icon"
              disabled={!input.trim()}
              onClick={(e) => e.stopPropagation()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
