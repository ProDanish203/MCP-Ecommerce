import { Router } from "express";
import { sendMessage } from "../controllers/chat.controller";
const router = Router();

router.get("/send", sendMessage);

export default router;
