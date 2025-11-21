import WebSocket from "ws";

const FINNHUB_URL = `wss://ws.finnhub.io?token=${process.env.FINNHUB_API_KEY}`;

console.log("Finnhub token prefix:", String(process.env.FINNHUB_API_KEY || "").slice(0, 4));

// Store the latest price per symbol
export const latestPrices = {};

// Symbols we care about for now
const TRACKED_SYMBOLS = ["SPY"]; // S&P 500 ETF (US market proxy)

let socket = null;

export function startFinnhubStream() {
  if (!process.env.FINNHUB_API_KEY) {
    console.warn("FINNHUB_API_KEY is missing. Live data will not work.");
    return;
  }

  connect();
}

function connect() {
  socket = new WebSocket(FINNHUB_URL);

  socket.on("open", () => {
    console.log("Connected to Finnhub WebSocket");
    // Subscribe to all tracked symbols
    TRACKED_SYMBOLS.forEach((symbol) => {
      socket.send(
        JSON.stringify({
          type: "subscribe",
          symbol,
        })
      );
    });
  });

  socket.on("message", (data) => {
    try {
      const parsed = JSON.parse(data.toString());
      if (parsed.type === "trade") {
        // trades array, we take last trade for now
        parsed.data.forEach((trade) => {
          latestPrices[trade.s] = trade.p;
        });
      }
    } catch (err) {
      console.error("Error parsing Finnhub message:", err.message);
    }
  });

  socket.on("close", () => {
    console.warn("Finnhub WebSocket closed. Reconnecting in 5s...");
    setTimeout(connect, 5000);
  });

  socket.on("error", (err) => {
    console.error("Finnhub WebSocket error:", err.message);
  });
}
