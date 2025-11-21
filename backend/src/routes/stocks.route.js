import express from "express";
const router = express.Router();

router.get("/:symbol", (req, res) => {
  const { symbol } = req.params;
  res.json({
    symbol,
    price: 125.34,
    trend: "up",
    volume: 4352343,
  });
});

export default router;
