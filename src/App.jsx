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
import Topgl from "./pages/Topgl";
import Logout from "./pages/Logout";
import Books from "./component/Books";

const App = () => {
  return (
    <Box
      sx={{ backgroundColor: "#14161a", color: "white", minHeight: "100vh" }}
    >
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/coins/:id" element={<CoinPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/news" element={<News />} />
        <Route path="/dictionary" element={<Dictionary />} />
        <Route path="/publications" element={<Books />} />
        <Route path="/topgl" element={<Topgl />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Box>
  );
};

export default App;
