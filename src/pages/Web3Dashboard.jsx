import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { ethers } from "ethers";
import PriceTracker from "../component/PriceTracker";
import WalletPortfolio from "../component/WalletPortfolio";

const Web3Dashboard = () => {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [prices, setPrices] = useState([]);
  const [loadingPrices, setLoadingPrices] = useState(false);

  // ------------------------
  // CONNECT METAMASK
  // ------------------------
  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert("Please install MetaMask!");
        return;
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const provider = new ethers.BrowserProvider(window.ethereum);
      const balanceWei = await provider.getBalance(accounts[0]);

      setAccount(accounts[0]);
      setBalance(ethers.formatEther(balanceWei));
    } catch (err) {
      console.error(err);
    }
  };

  // ------------------------
  // LIVE PRICE TRACKER
  // ------------------------
  const fetchPrices = async () => {
    try {
      setLoadingPrices(true);

      const { data } = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets",
        {
          params: {
            vs_currency: "usd",
            order: "market_cap_desc",
            per_page: 10,
            page: 1,
          },
        }
      );

      setPrices(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingPrices(false);
    }
  };

  useEffect(() => {
    fetchPrices();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight="700" mb={3} ml={72}>
        Web3 Dashboard
      </Typography>

      {/* Wallet Section */}

      <Paper
      sx={{
        p: 3,
        mb: 3,
        background: "#1e2226",
        borderRadius: 3,
        color: "white",
        border: "2px solid gold", // Gold border
        boxShadow: "0 8px 20px rgba(0,0,0,0.6)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: "0 12px 28px rgba(0,0,0,0.7)",
        },
      }}
    >
      {!account ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            sx={{
              background: "gold",
              color: "black",
              fontWeight: 700,
              px: 4,
              py: 1.5,
              fontSize: 16,
              // border: "1px solid white", // Optional inner border
              "&:hover": {
                background: "#e6c200",
              },
            }}
            onClick={connectWallet}
          >
            Connect MetaMask
          </Button>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            // borderTop: "1px solid gold", // Optional section divider
            pt: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, color: "white", pb: 1 , fontSize:40}}
          >
            Connected Wallet
          </Typography>
          <Typography sx={{ color: "gold", wordBreak: "break-all", border: "1px solid gold", p: 1, borderRadius: 1 }}>
            {account && <WalletPortfolio address={account} />}
          </Typography>

          <Typography
            variant="h6"
            sx={{ fontWeight: 700, color: "white", mt : 5,  pb: 1 }}
          >
            ETH Balance
          </Typography>
          <Typography sx={{ color: "gold", fontWeight: 600 , mt :-3 , p: 1, borderRadius: 1 , fontSize : 30 }}>
            {balance} ETH
          </Typography>
        </Box>
      )}
    </Paper>
      <PriceTracker />
    </Box>
  );
};

export default Web3Dashboard;
