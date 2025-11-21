const BASE_URL = "http://localhost:5000";

export async function getMarketOverview() {
  const res = await fetch(`${BASE_URL}/api/market/overview`);
  return res.json();
}

export async function getNews() {
  const res = await fetch(`${BASE_URL}/api/news`);
  return res.json();
}

export async function getStock(symbol) {
  const res = await fetch(`${BASE_URL}/api/stocks/${symbol}`);
  return res.json();
}

export async function getLiveUsMarket(symbol = "SPY") {
  const res = await fetch(
    `${BASE_URL}/api/market/live?symbol=${encodeURIComponent(symbol)}`
  );
  return res.json();
}
