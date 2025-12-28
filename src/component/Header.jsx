import React, { useState } from "react";
import {
  AppBar,
  Container,
  MenuItem,
  Select,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  Button,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#fff",
    },
  },
});

function Header() {
  const { currency, setCurrency } = CryptoState();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };


  const handleHome = () => {
    handleMenuClose();
    navigate("/");
  };
  const handleProfile = () => {
    handleMenuClose();
    navigate("/profile");
  };
  const handleNews = () => {
    handleMenuClose();
    navigate("/news");
  };
  const handlePublications = () => {
    handleMenuClose();
    navigate("/publications");
  };
  const handleDictionary = () => {
    handleMenuClose();
    navigate("/dictionary");
  };
  const handleLogin = () => {
    handleMenuClose();
    navigate("/profile");
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            {/* Logo */}
            <Typography
              variant="h4"
              sx={{
                flex: 1,
                color: "gold",
                fontFamily: "Montserrat",
                fontWeight: "bold",
                cursor: "pointer",
              }}
              onClick={() => navigate("/")}
            >
              Crypto Plus <span style={{ color: "white" }}>+</span>
            </Typography>

            {/* Currency Selector + Login */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                sx={{ width: 100, height: 40, ml: 2 }}
              >
                <MenuItem value="USD">USD</MenuItem>
                <MenuItem value="INR">INR</MenuItem>
              </Select>

              <Button
                variant="contained"
                sx={{
                  backgroundColor: "gold",
                  color: "black",
                  ml: 2,
                  height: 40,
                  fontWeight: "bold",
                  "&:hover": { backgroundColor: "#ffd633" },
                }}
                onClick={handleLogin}
              >
                Login
              </Button>

              {/* Hamburger Menu */}
              <IconButton
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={handleMenuOpen}
                sx={{ ml: 2 }}
              >
                <MenuIcon sx={{ color: "gold", fontSize: 30 }} />
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                
                PaperProps={{
                  sx: {
                    mt: 1,
                    minWidth: 200, // increase width
                    backgroundColor: "#000000ff", // dark background
                    color: "gold", // text color
                    border: "1px solid gold",
                    borderRadius: 2,
                    "& .MuiMenuItem-root": {
                      fontSize: 16,
                      fontWeight: "bold",
                      "&:hover": {
                        backgroundColor: "#222",
                        color: "white",
                      },
                    },
                  },
                }}
              >
                <MenuItem onClick={handleHome}>Home</MenuItem>
                <MenuItem onClick={handleProfile}>Profile</MenuItem>
                <MenuItem onClick={handleNews}>News</MenuItem>
                <MenuItem onClick={handlePublications}>Publications</MenuItem>
                <MenuItem onClick={handleDictionary}>Crypto Dictionary</MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export default Header;
