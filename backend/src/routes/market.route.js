import express from "express";
import { latestPrices } from "../finnhubWS.js";

const router = express.Router();

// Existing dummy overview route
router.get("/overview", (req, res) => {
  res.json({
    usMarket: "-1.2%",
    indianMarket: "+2.4%",
    sentiment: "bullish",
  });
});

// NEW: live US market price endpoint
// GET /api/market/live?symbol=SPY
router.get("/live", (req, res) => {
  const symbol = (req.query.symbol || "SPY").toUpperCase();
  const price = latestPrices[symbol] ?? null;

  res.json({
    symbol,
    price,
    hasData: price !== null,
  });
});

export default router;
