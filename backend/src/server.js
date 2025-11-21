import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import marketRoutes from "./routes/market.route.js";
import newsRoutes from "./routes/news.route.js";
import stockRoutes from "./routes/stocks.route.js";
import { startFinnhubStream } from "./finnhubWS.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/market", marketRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/stocks", stockRoutes);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.json({ message: "FinancesForU Backend Running 🚀" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  // Start Finnhub WebSocket connection
  startFinnhubStream();
});
