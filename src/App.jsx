import React from "react";
import Homepage from "./pages/Homepage";
import CoinPage from "./pages/CoinPage";
import { Routes, Route } from "react-router-dom";
import Header from "./component/Header";
import { Box } from "@mui/material";
import Profile from "./pages/Profile";
import News from "./pages/News";
import Dictionary from "./pages/Dictionary";
import Publications from "./pages/Publications";
// import Topgl from "./pages/Topgl";
import Books from "./component/Books";

import { WalletProvider } from "./context/WalletContext";

// New Web3 Page
import Web3Dashboard from "./pages/Web3Dashboard";

const App = () => {
  return (
    <WalletProvider>
      <Box
        sx={{ backgroundColor: "#14161a", color: "white", minHeight: "100vh" }}
      >
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/coins/:id" element={<CoinPage />} />
          <Route path="/profile" element={<Web3Dashboard />} />
          <Route path="/news" element={<News />} />
          <Route path="/dictionary" element={<Dictionary />} />
          <Route path="/publications" element={<Books />} />

        </Routes>
      </Box>
    </WalletProvider>
  );
};

export default App;
