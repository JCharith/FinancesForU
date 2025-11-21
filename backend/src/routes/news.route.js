import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.json([
    { headline: "Markets Rally Ahead of Earnings", source: "DummyWire" },
    { headline: "NSE Hits New High", source: "FinancesForU" },
  ]);
});

export default router;
