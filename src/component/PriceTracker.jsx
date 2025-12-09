import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  CircularProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  Box,
} from "@mui/material";
import axios from "axios";

const PriceTracker = () => {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch top cryptocurrency prices
  const fetchPrices = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets",
        {
          params: {
            vs_currency: "usd",
            order: "market_cap_desc",
            per_page: 10,
            sparkline: false,
          },
        }
      );
      setPrices(res.data);
    } catch (err) {
      console.error(err);
      alert("Error fetching live prices");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPrices();

    // Refresh every 60 seconds
    const interval = setInterval(fetchPrices, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Paper
      sx={{
        background: "#1e2226",
        padding: 3,
        borderRadius: 3,
        color: "white",
        boxShadow: "0 8px 20px rgba(0,0,0,0.6)",
        overflowX: "auto",
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "gold",
          mb: 3,
          textAlign: "center",
          fontSize : 40
        }}
      >
        📈 Live Crypto Price Tracker
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
          <CircularProgress sx={{ color: "gold" }} />
        </Box>
      ) : (
        <Table
          sx={{
            minWidth: 500,
            "& th": {
              backgroundColor: "#2c2f33",
              fontWeight: "bold",
              fontSize: 16,
            },
            "& td": {
              transition: "all 0.3s ease",
            },
            "& tr:hover": {
              backgroundColor: "#2a2d31",
              transform: "scale(1.01)",
            },
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "gold" }}>Coin</TableCell>
              <TableCell sx={{ color: "gold" }}>Price (USD)</TableCell>
              <TableCell sx={{ color: "gold" }}>24h Change</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {prices.map((coin) => (
              <TableRow key={coin.id}>
                <TableCell sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Avatar
                    src={coin.image}
                    alt={coin.name}
                    sx={{ width: 30, height: 30 }}
                  />
                  <Typography sx={{ color: "white", fontWeight: 600 }}>
                    {coin.name}
                  </Typography>
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: 500 }}>
                  ${coin.current_price.toLocaleString()}
                </TableCell>
                <TableCell
                  sx={{
                    color:
                      coin.price_change_percentage_24h >= 0
                        ? "lightgreen"
                        : "#ff5c5c",
                    fontWeight: 600,
                  }}
                >
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Paper>
  );
};

export default PriceTracker;
