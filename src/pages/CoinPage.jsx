// import React, { useEffect, useState } from "react";
// import {
//   LinearProgress,
//   Typography,
//   Box,
//   useMediaQuery,
//   Container,
// } from "@mui/material";
// import { useParams } from "react-router-dom";
// import parse from "html-react-parser";
// import axios from "axios";
// import CoinInfo from "../component/CoinInfo";
// import { SingleCoin } from "../config/api";
// import { numberWithCommas } from "../component/CoinsTable";
// import { CryptoState } from "../CryptoContext";

// const CoinPage = () => {
//   const { id } = useParams();
//   const [coin, setCoin] = useState();

//   const { currency, symbol } = CryptoState();

//   const fetchCoin = async () => {
//     const { data } = await axios.get(SingleCoin(id));
//     setCoin(data);
//   };

//   useEffect(() => {
//     fetchCoin();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [id]);

//   // Responsive breakpoints
//   const isMdDown = useMediaQuery("(max-width:960px)");
//   const isSmDown = useMediaQuery("(max-width:600px)");

//   if (!coin) return <LinearProgress sx={{ backgroundColor: "gold" }} />;

//   return (
//     <Container
//       sx={{
//         display: "flex",
//         flexDirection: isMdDown ? "column" : "row",
//       }}
//     >
//       {/* Sidebar */}
//       <Box
//         sx={{
//           width: isMdDown ? "100%" : "30%",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           marginTop: 3,
//           borderRight: isMdDown ? "none" : "2px solid grey",
//         }}
//       >
//         <img
//           src={coin?.image.large}
//           alt={coin?.name}
//           height="200"
//           style={{ marginBottom: 20 }}
//         />
//         <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2, fontFamily: "Montserrat" }}>
//           {coin?.name}
//         </Typography>
//         <Typography
//           variant="subtitle1"
//           sx={{
//             width: "100%",
//             fontFamily: "Montserrat",
//             padding: 3,
//             paddingBottom: 1,
//             paddingTop: 0,
//             textAlign: "justify",
//           }}
//         >
//           {parse(coin?.description.en.split(". ")[0])}.
//         </Typography>

//         {/* Market Data */}
//         <Box
//           sx={{
//             alignSelf: "start",
//             padding: 3,
//             paddingTop: 1,
//             width: "100%",
//             display: isMdDown ? "flex" : "block",
//             justifyContent: isMdDown ? "space-around" : "flex-start",
//             flexDirection: isSmDown ? "column" : "row",
//             alignItems: isSmDown ? "center" : "start",
//           }}
//         >
//           <Box sx={{ display: "flex", mb: 1 }}>
//             <Typography sx={{ fontWeight: "bold", fontFamily: "Montserrat", mr: 1 }}>
//               Rank:
//             </Typography>
//             <Typography sx={{ fontFamily: "Montserrat" }}>
//               {numberWithCommas(coin?.market_cap_rank)}
//             </Typography>
//           </Box>

//           <Box sx={{ display: "flex", mb: 1 }}>
//             <Typography sx={{ fontWeight: "bold", fontFamily: "Montserrat", mr: 1 }}>
//               Current Price:
//             </Typography>
//             <Typography sx={{ fontFamily: "Montserrat" }}>
//               {symbol}{" "}
//               {numberWithCommas(
//                 coin?.market_data.current_price[currency.toLowerCase()]
//               )}
//             </Typography>
//           </Box>

//           <Box sx={{ display: "flex", mb: 1 }}>
//             <Typography sx={{ fontWeight: "bold", fontFamily: "Montserrat", mr: 1 }}>
//               Market Cap:
//             </Typography>
//             <Typography sx={{ fontFamily: "Montserrat" }}>
//               {symbol}{" "}
//               {numberWithCommas(
//                 coin?.market_data.market_cap[currency.toLowerCase()]
//                   .toString()
//                   .slice(0, -6)
//               )}
//               M
//             </Typography>
//           </Box>
//         </Box>
//       </Box>

//       {/* Coin Chart */}
//       <CoinInfo coin={coin} />
//     </Container>
//   );
// };

// export default CoinPage;


import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Container, LinearProgress, Box } from "@mui/material";
import axios from "axios";
import parse from "html-react-parser";
import { SingleCoin } from "../config/api";
import { CryptoState } from "../CryptoContext";
import CoinInfo from "../component/CoinInfo";
import { numberWithCommas } from "../component/CoinsTable";

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
  }, [id]);

  if (!coin) return <LinearProgress sx={{ backgroundColor: "gold" }} />;

  return (
    <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, mt: 4, px: 2 }}>
      {/* Sidebar */}
      <Container
        sx={{
          width: { xs: "100%", md: "30%" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRight: { md: "2px solid grey" },
          pb: 4,
        }}
      >
        <img src={coin?.image.large} alt={coin?.name} height="200" style={{ marginBottom: 20 }} />
        <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
          {coin?.name}
        </Typography>
        <Typography variant="subtitle1" sx={{ textAlign: "justify", mb: 3 }}>
          {parse(coin?.description.en.split(". ")[0])}.
        </Typography>

        <Box sx={{ width: "100%", mt: 2 }}>
          <Typography variant="h6">
            Rank: {numberWithCommas(coin?.market_cap_rank)}
          </Typography>
          <Typography variant="h6">
            Current Price: {symbol} {numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()])}
          </Typography>
          <Typography variant="h6">
            Market Cap: {symbol} {numberWithCommas(coin?.market_data.market_cap[currency.toLowerCase()].toString().slice(0, -6))}M
          </Typography>
        </Box>
      </Container>

      {/* Chart */}
      <CoinInfo coin={coin} />
    </Box>
  );
};

export default CoinPage;
