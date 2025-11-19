import React, { useEffect, useState } from "react";

const globalUrl = "https://api.coingecko.com/api/v3/global";

export default function GlobalMarket() {
  const [globalData, setGlobalData] = useState(null);

  useEffect(() => {
    const fetchGlobalData = async () => {
      try {
        const res = await fetch(globalUrl);
        if (!res.ok) throw new Error("Failed to fetch global data");
        const data = await res.json();
        setGlobalData(data.data);
      } catch (err) {
        console.error("Error fetching global data:", err.message);
      }
    };

    fetchGlobalData();
  }, []);

  const numberWithCommas = (x) => x.toLocaleString("en-IN");

  if (!globalData) {
    return (
      <div style={{ textAlign: "center", color: "gold", marginTop: 50 }}>
        Loading Global Market Data...
      </div>
    );
  }

  return (
    <div
      style={{
        color: "white",
        padding: "2rem",
        borderRadius: "12px",
        margin: "2rem 0",
      }}
    >
      <h2 style={{ color: "white", fontSize : "30px" ,fontFamily: "Montserrat", textAlign: "center", marginBottom: "1.5rem" , marginTop : "5rem"}}>
        Global Crypto Market Stats
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1.5rem",
          textAlign: "center",
        }}
      >
        <div style={{ border: "1px solid gold", borderRadius: 8, padding: "1rem" }}>
          <h4 style={{ color: "gold" }}>Active Cryptocurrencies</h4>
          <p>{globalData.active_cryptocurrencies}</p>
        </div>

        <div style={{ border: "1px solid gold", borderRadius: 8, padding: "1rem" }}>
          <h4 style={{ color: "gold" }}>Exchanges</h4>
          <p>{globalData.markets}</p>
        </div>

        <div style={{ border: "1px solid gold", borderRadius: 8, padding: "1rem" }}>
          <h4 style={{ color: "gold" }}>Total Market Cap</h4>
          <p>
            ₹{numberWithCommas(globalData.total_market_cap.usd.toFixed(0))}{" "}
            <span
              style={{
                color: globalData.market_cap_change_percentage_24h_usd >= 0 ? "rgb(14,203,129)" : "red",
                fontWeight: "bold",
              }}
            >
              ({globalData.market_cap_change_percentage_24h_usd.toFixed(2)}%)
            </span>
          </p>
        </div>

        <div style={{ border: "1px solid gold", borderRadius: 8, padding: "1rem" }}>
          <h4 style={{ color: "gold" }}>24h Volume</h4>
          <p>₹{numberWithCommas(globalData.total_volume.usd.toFixed(0))}</p>
        </div>

        <div style={{ border: "1px solid gold", borderRadius: 8, padding: "1rem" }}>
          <h4 style={{ color: "gold" }}>BTC / ETH Dominance</h4>
          <p>
            BTC {globalData.market_cap_percentage.btc.toFixed(1)}% | ETH {globalData.market_cap_percentage.eth.toFixed(1)}%
          </p>
        </div>
      </div>
    </div>
  );
}
