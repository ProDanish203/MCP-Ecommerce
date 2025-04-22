import { Document } from "mongoose";

export enum Category {
  Electronics = "Electronics",
  Fashion = "Fashion",
  Home = "Home",
  Sports = "Sports",
  Toys = "Toys",
  Books = "Books",
  Beauty = "Beauty",
  Automotive = "Automotive",
  Grocery = "Grocery",
}

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: Category;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}
