import { NextFunction, Request, Response } from "express";
import { throwError } from "../utils/helpers";
import { CoreMessage } from "ai";
import { mcp } from "../mcp/mcp";

export const sendMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { chats }: { chats: CoreMessage[] } = req.body;
    if (!chats || chats.length === 0)
      return next(throwError("No chat provided", 400));

    const aiResponse = await mcp(chats);

    if (!aiResponse) return next(throwError("AI response not found", 404));

    return res.status(201).json({
      success: true,
      message: "AI response",
      data: aiResponse.text,
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};
