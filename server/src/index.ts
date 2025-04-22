import express from "express";
import { config } from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { errorMiddleware } from "./middlewares/error.middleware";
import { connectDb } from "./config/db";
import { connectToMCPServer } from "./mcp/mcp";
// Routes
import productRoute from "./routes/product.route";
import chatRoute from "./routes/chat.route";

config();

const app = express();

// Middlewares
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.static("public"));
// For url inputs
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(morgan("dev"));
app.disable("x-powered-by");

// Base Route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Health Check - 100% working",
  });
});

// Routes
app.use("/api/v1/products", productRoute);
app.use("/api/v1/chat", chatRoute);

// Middlewares
app.use(errorMiddleware);

// Listen To Server
const PORT = process.env.PORT || 8000;
// Connect To database and MCP first then start the server
Promise.all([connectToMCPServer(), connectDb()])
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on: http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`Connection Error: ${error}`);
  });
