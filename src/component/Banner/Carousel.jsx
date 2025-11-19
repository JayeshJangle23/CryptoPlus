import axios from "axios";
import { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";   // ✔ REQUIRED
import { Link } from "react-router-dom";
import { TrendingCoins } from "../../config/api";
import { CryptoState } from "../../CryptoContext";
import { numberWithCommas } from "../CoinsTable";
import { Box } from "@mui/material";

export default function Carousel() {
  const [trending, setTrending] = useState([]);
  const { currency, symbol } = CryptoState();

  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    setTrending(data);
  };

  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  const items = trending.map((coin) => {
    const profit = coin?.price_change_percentage_24h >= 0;

    return (
      <Link
        to={`/coins/${coin.id}`}
        key={coin.id}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textDecoration: "none",
          color: "white",
          minWidth: 150,
          margin: "0 20px",
        }}
      >
        <img
          src={coin?.image}
          alt={coin?.name}
          height="80"
          style={{ marginBottom: 10 }}
        />

        <span>
          {coin.symbol}&nbsp;
          <span style={{ color: profit ? "rgb(14,203,129)" : "red" }}>
            {profit && "+"}
            {coin.price_change_percentage_24h.toFixed(2)}%
          </span>
        </span>

        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {symbol} {numberWithCommas(coin.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });

  const responsive = {
    0: { items: 2 },
    512: { items: 4 },
  };

  return (
    <Box
      sx={{
        height: 200,
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <AliceCarousel
        mouseTracking
        infinite
        autoPlay
        autoPlayInterval={1500}
        animationDuration={2500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
      />
    </Box>
  );
}
