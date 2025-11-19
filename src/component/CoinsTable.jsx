import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  LinearProgress,
  Pagination,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CoinList } from "../config/api";
import { CryptoState } from "../CryptoContext";
import GlobalMarket from "../pages/GlobalMarket";

// Number formatting
export const numberWithCommas = (x) =>
  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [savedCoins, setSavedCoins] = useState(() => {
    const saved = localStorage.getItem("savedCoins");
    return saved ? JSON.parse(saved) : [];
  });

  const { currency, symbol } = CryptoState();
  const navigate = useNavigate();

  // Save coins to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("savedCoins", JSON.stringify(savedCoins));
  }, [savedCoins]);

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
    );
  };

  return (
    <Container sx={{ textAlign: "center", mt: 4, pb: 6 }}>
      <Typography
        variant="h4"
        sx={{ color: "gold", mb: 6, mt: 5, fontFamily: "Montserrat" }}
      >
        Cryptocurrency Prices by Market Cap
      </Typography>

      <TextField
        label="Search Cryptocurrency..."
        variant="outlined"
        fullWidth
        onChange={(e) => setSearch(e.target.value)}
        sx={{
          mb: 6,
          input: { color: "gold", fontWeight: 600 },
          label: { color: "gold" },
          "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
            transition: "0.3s",
            "& fieldset": { borderColor: "gold" },
            "&:hover fieldset": { borderColor: "gold", boxShadow: "0 0 8px gold" },
            "&.Mui-focused fieldset": { borderColor: "gold", boxShadow: "0 0 12px gold" },
            "& input": { color: "gold" },
          },
          "& .MuiInputLabel-root": { color: "gold !important" },
          "& .Mui-focused .MuiInputLabel-root": { color: "gold !important" },
        }}
      />

      <TableContainer component={Paper} sx={{ borderRadius: 3, overflow: "hidden" }}>
        {loading ? (
          <LinearProgress sx={{ backgroundColor: "gold" }} />
        ) : (
          <Table>
            <TableHead sx={{ backgroundColor: "#EEBC1D" }}>
              <TableRow>
                {["Coin", "Price", "24h Change", "Market Cap", "Action"].map((head) => (
                  <TableCell
                    key={head}
                    align={head === "Coin" ? "left" : "right"}
                    sx={{ fontWeight: 900, fontSize: "24px", fontFamily: "Montserrat" }}
                  >
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {handleSearch()
                .slice((page - 1) * 10, page * 10)
                .map((row) => {
                  const profit = row.price_change_percentage_24h > 0;
                  const isSaved = savedCoins.find((c) => c.id === row.id);

                  return (
                    <TableRow
                      onClick={() => navigate(`/coins/${row.id}`)}
                      key={row.id}
                      sx={{
                        backgroundColor: isSaved ? "#1a1a2e" : "#16171a",
                        cursor: "pointer",
                        "&:hover": { backgroundColor: "#131111" },
                        fontFamily: "Montserrat",
                      }}
                    >
                      <TableCell sx={{ display: "flex", gap: 2 }}>
                        <img src={row.image} alt={row.name} height="50" />
                        <div style={{ display: "flex", flexDirection: "column" }}>
                          <span style={{ textTransform: "uppercase", fontSize: 22, color: "white" }}>
                            {row.symbol}
                          </span>
                          <span style={{ color: "gold" }}>{row.name}</span>
                        </div>
                      </TableCell>

                      <TableCell align="right" style={{ color: "white" }}>
                        {symbol} {numberWithCommas(row.current_price.toFixed(2))}
                      </TableCell>

                      <TableCell
                        align="right"
                        sx={{
                          color: profit ? "rgb(14, 203, 129)" : "red",
                          fontWeight: 500,
                        }}
                      >
                        {profit && "+"}
                        {row.price_change_percentage_24h.toFixed(2)}%
                      </TableCell>

                      <TableCell align="right" style={{ color: "white" }}>
                        {symbol}{" "}
                        {numberWithCommas(row.market_cap.toString().slice(0, -6))}M
                      </TableCell>

                      {/* Save/Remove Button */}
                      <TableCell align="right">
                        {isSaved ? (
                          <Button
                            variant="contained"
                            color="error"
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSavedCoins(savedCoins.filter((c) => c.id !== row.id));
                            }}
                          >
                            Remove
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSavedCoins([...savedCoins, row]);
                            }}
                          >
                            Save
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        )}
      </TableContainer>

      <Pagination
        count={Math.ceil(handleSearch()?.length / 10)}
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 4,
          "& .MuiPaginationItem-root": { color: "gold" },
        }}
        page={page}
        onChange={(_, value) => {
          setPage(value);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />
    <GlobalMarket />
    </Container>
  );
};

export default CoinsTable;
