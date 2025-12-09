// import React, { useEffect, useState } from "react";
// import { Box, Typography, Paper, Avatar, CircularProgress } from "@mui/material";
// import axios from "axios";

// const WalletPortfolio = ({ address }) => {
//   const [tokens, setTokens] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const fetchTokens = async () => {
//     if (!address) return;

//     try {
//       setLoading(true);

//       const url = `https://api.covalenthq.com/v1/eth-mainnet/address/${address}/balances_v2/?key=cqt_rQwqXB9TVTgXqtc6fqrv8wK8RGxv
//       }`;

//       const { data } = await axios.get(url);

//       setTokens(data.data.items);
//     } catch (err) {
//       console.error("Error fetching tokens:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTokens();
//   }, [address]);

//   return (
//     <Paper
//       sx={{
//         p: 3,
//         mt: 3,
//         background: "#1e2126",
//         color: "white",
//         borderRadius: 3,
//       }}
//     >
//       <Typography variant="h5" fontWeight={700} mb={2}>
//         Wallet Portfolio
//       </Typography>

//       {loading ? (
//         <CircularProgress sx={{ color: "gold" }} />
//       ) : (
//         tokens
//           .filter((t) => t.balance > 0)
//           .map((token) => (
//             <Box
//               key={token.contract_address}
//               sx={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 p: 1.5,
//                 borderBottom: "1px solid #333",
//               }}
//             >
//               {/* Left - Logo & Name */}
//               <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//                 <Avatar src={token.logo_url} alt={token.contract_name} />

//                 <Box>
//                   <Typography fontWeight={600}>{token.contract_ticker_symbol}</Typography>
//                   <Typography fontSize="14px" color="gold">
//                     {token.contract_name}
//                   </Typography>
//                 </Box>
//               </Box>

//               {/* Right - Balance + Value */}
//               <Box sx={{ textAlign: "right" }}>
//                 <Typography fontWeight={600}>
//                   {(token.balance / 10 ** token.contract_decimals).toFixed(4)}
//                 </Typography>

//                 <Typography color="gold" fontSize="14px">
//                   ${(token.quote).toFixed(2)}
//                 </Typography>
//               </Box>
//             </Box>
//           ))
//       )}
//     </Paper>
//   );
// };

// export default WalletPortfolio;



import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Avatar, CircularProgress } from "@mui/material";
import axios from "axios";

const WalletPortfolio = ({ address }) => {
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTokens = async () => {
    if (!address) return;

    try {
      setLoading(true);

      const url = `https://api.covalenthq.com/v1/eth-mainnet/address/${address}/balances_v2/?key=cqt_rQwqXB9TVTgXqtc6fqrv8wK8RGxv`;

      const { data } = await axios.get(url);
      setTokens(data.data.items);
    } catch (err) {
      console.error("Error fetching tokens:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTokens();
  }, [address]);

  // Filter tokens with balance > 0
  const filteredTokens = tokens.filter((t) => t.balance > 0);

  return (
    // <Paper
    //   sx={{
    //     p: 3,
    //     mt: 3,
    //     background: "#1e2126",
    //     color: "white",
    //     borderRadius: 3,
    //   }}
    // >
    //   <Typography variant="h5" fontWeight={700} mb={2}>
    //     Wallet Portfolio
    //   </Typography>

    //   {loading ? (
    //     <CircularProgress sx={{ color: "gold" }} />
    //   ) : filteredTokens.length === 0 ? (
    //     <Typography>No tokens found in this wallet.</Typography>
    //   ) : (
    //     filteredTokens.map((token) => (
    //       <Box
    //         key={token.contract_address}
    //         sx={{
    //           display: "flex",
    //           justifyContent: "space-between",
    //           alignItems: "center",
    //           p: 1.5,
    //           borderBottom: "1px solid #333",
    //         }}
    //       >
    //         {/* Left - Logo & Name */}
    //         <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
    //           <Avatar src={token.logo_url} alt={token.contract_name} />

    //           <Box>
    //             <Typography fontWeight={600}>{token.contract_ticker_symbol}</Typography>
    //             <Typography fontSize="14px" color="gold">
    //               {token.contract_name}
    //             </Typography>
    //           </Box>
    //         </Box>

    //         {/* Right - Balance + Value */}
    //         <Box sx={{ textAlign: "right" }}>
    //           <Typography fontWeight={600}>
    //             {(token.balance / 10 ** token.contract_decimals).toFixed(4)}
    //           </Typography>

    //           <Typography color="gold" fontSize="14px">
    //             ${(token.quote).toFixed(2)}
    //           </Typography>
    //         </Box>
    //       </Box>
    //     ))
    //   )}
    // </Paper>
    <Paper
  sx={{
    p: 3,
    mt: 3,
    background: "#1e2126",
    color: "white",
    borderRadius: 3,
  }}
>
  <Typography variant="h5" fontWeight={700} mb={2} component="div">
    Wallet Portfolio
  </Typography>

  {loading ? (
    <CircularProgress sx={{ color: "gold" }} />
  ) : filteredTokens.length === 0 ? (
    <Typography component="div">No tokens found in this wallet.</Typography>
  ) : (
    filteredTokens.map((token) => (
      <Box
        key={token.contract_address}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 1.5,
          borderBottom: "1px solid #333",
        }}
      >
        {/* Left - Logo & Name */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar src={token.logo_url} alt={token.contract_name} />

          <Box>
            <Typography fontWeight={600} component="div">
              {token.contract_ticker_symbol}
            </Typography>
            <Typography fontSize="14px" color="gold" component="div">
              {token.contract_name}
            </Typography>
          </Box>
        </Box>

        {/* Right - Balance + Value */}
        <Box sx={{ textAlign: "right" }}>
          <Typography fontWeight={600} component="div">
            {(token.balance / 10 ** token.contract_decimals).toFixed(4)}
          </Typography>

          <Typography color="gold" fontSize="14px" component="div">
            ${(token.quote).toFixed(2)}
          </Typography>
        </Box>
      </Box>
    ))
  )}
</Paper>
  );
};

export default WalletPortfolio;
