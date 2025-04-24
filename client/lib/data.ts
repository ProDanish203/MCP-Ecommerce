import { Category, type Product } from "./types";

export const sampleProducts: Product[] = [
  {
    _id: "1",
    name: "Wireless Noise-Cancelling Headphones",
    description:
      "Premium wireless headphones with active noise cancellation for an immersive audio experience.",
    price: 299.99,
    imageUrl: "/images/img-1.jpg",
    category: Category.Electronics,
    stock: 15,
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2023-01-15"),
  },
  {
    _id: "2",
    name: "Smart Fitness Watch",
    description:
      "Track your fitness goals, heart rate, and sleep patterns with this advanced smartwatch.",
    price: 199.99,
    imageUrl: "/images/img-1.jpg",
    category: Category.Electronics,
    stock: 20,
    createdAt: new Date("2023-01-20"),
    updatedAt: new Date("2023-01-20"),
  },
  {
    _id: "3",
    name: "Organic Cotton T-Shirt",
    description:
      "Comfortable and eco-friendly t-shirt made from 100% organic cotton.",
    price: 29.99,
    imageUrl: "/images/img-1.jpg",
    category: Category.Fashion,
    stock: 50,
    createdAt: new Date("2023-02-05"),
    updatedAt: new Date("2023-02-05"),
  },
  {
    _id: "4",
    name: "Stainless Steel Water Bottle",
    description:
      "Durable and insulated water bottle that keeps your drinks cold for 24 hours or hot for 12 hours.",
    price: 34.99,
    imageUrl: "/images/img-1.jpg",
    category: Category.Home,
    stock: 30,
    createdAt: new Date("2023-02-10"),
    updatedAt: new Date("2023-02-10"),
  },
  {
    _id: "5",
    name: "Yoga Mat",
    description:
      "Non-slip, eco-friendly yoga mat perfect for all types of yoga practices.",
    price: 49.99,
    imageUrl: "/images/img-1.jpg",
    category: Category.Sports,
    stock: 25,
    createdAt: new Date("2023-02-15"),
    updatedAt: new Date("2023-02-15"),
  },
  {
    _id: "6",
    name: "Wooden Building Blocks",
    description:
      "Set of 50 colorful wooden building blocks for creative play and learning.",
    price: 39.99,
    imageUrl: "/images/img-1.jpg",
    category: Category.Toys,
    stock: 18,
    createdAt: new Date("2023-03-01"),
    updatedAt: new Date("2023-03-01"),
  },
  {
    _id: "7",
    name: "Bestselling Novel",
    description:
      "The latest bestselling fiction novel that's taking the world by storm.",
    price: 24.99,
    imageUrl: "/images/img-1.jpg",
    category: Category.Books,
    stock: 40,
    createdAt: new Date("2023-03-10"),
    updatedAt: new Date("2023-03-10"),
  },
  {
    _id: "8",
    name: "Natural Face Serum",
    description:
      "Hydrating face serum with natural ingredients for all skin types.",
    price: 59.99,
    imageUrl: "/images/img-1.jpg",
    category: Category.Beauty,
    stock: 22,
    createdAt: new Date("2023-03-20"),
    updatedAt: new Date("2023-03-20"),
  },
];
