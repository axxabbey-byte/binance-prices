// api/prices.js
export default async function handler(req, res) {
  const tickers = ["BTCUSDT", "ETHUSDT", "XRPUSDT", "DOGEUSDT", "SOLUSDT"];
  try {
    const url = "https://api.binance.com/api/v3/ticker/price";
    const response = await fetch(url);
    const data = await response.json();

    const now = new Date().toISOString().replace("T", " ").split(".")[0];
    let rows = "symbol,price,time\n";

    for (let t of tickers) {
      const d = data.find(x => x.symbol === t);
      if (d) rows += `${d.symbol},${d.price},${now}\n`;
    }

    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.status(200).send(rows);
  } catch (err) {
    res.status(500).send("Error fetching Binance prices");
  }
}
