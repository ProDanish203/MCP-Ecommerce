import { NextFunction, Request, Response } from "express";
import { throwError } from "../utils/helpers";
import { Product } from "./../models/product.model";

export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    if (!products) return next(throwError("No products found", 404));

    return res.status(201).json({
      success: true,
      message: "Products fetched successfully",
      data: products,
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};
