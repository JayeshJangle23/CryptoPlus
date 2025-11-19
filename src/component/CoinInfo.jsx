// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Line } from "react-chartjs-2";
// import { CircularProgress, Box, useTheme } from "@mui/material";
// import SelectButton from "./SelectButton";
// import { HistoricalChart } from "../config/api";
// import { chartDays } from "../config/data";
// import { CryptoState } from "../CryptoContext";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const CoinInfo = ({ coin }) => {
//   const theme = useTheme();
//   const { currency } = CryptoState();
//   const [historicData, setHistoricData] = useState([]);
//   const [days, setDays] = useState(1);
//   const [loading, setLoading] = useState(false);

//   const fetchHistoricData = async () => {
//     setLoading(true);
//     try {
//       const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
//       setHistoricData(data.prices);
//     } catch (err) {
//       console.error(err);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     if (coin) fetchHistoricData();
//   }, [coin, days, currency]);

//   if (!historicData || historicData.length === 0)
//     return (
//       <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
//         <CircularProgress size={80} sx={{ color: "gold" }} />
//       </Box>
//     );

//   const chartData = {
//     labels: historicData.map((data) => {
//       const date = new Date(data[0]);
//       return days === 1
//         ? `${date.getHours()}:${date.getMinutes()}`
//         : date.toLocaleDateString();
//     }),
//     datasets: [
//       {
//         data: historicData.map((data) => data[1]),
//         label: `Price (Past ${days} Days) in ${currency}`,
//         borderColor: "#EEBC1D",
//       },
//     ],
//   };

//   return (
//     <Box sx={{ width: { xs: "100%", md: "75%" }, mt: 5, px: 2 }}>
//       <Line data={chartData} />
//       <Box sx={{ display: "flex", justifyContent: "space-around", mt: 3, flexWrap: "wrap", gap: 1 }}>
//         {chartDays.map((day) => (
//           <SelectButton key={day.value} onClick={() => setDays(day.value)} selected={day.value === days}>
//             {day.label}
//           </SelectButton>
//         ))}
//       </Box>
//     </Box>
//   );
// };

// export default CoinInfo;



import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { CircularProgress, Box, Button, Stack } from "@mui/material";
import axios from "axios";
import { HistoricalChart } from "../config/api";
import { CryptoState } from "../CryptoContext";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const chartDays = [
  { label: "24 Hours", value: 1 },
  { label: "7 Days", value: 7 },
  { label: "30 Days", value: 30 },
  { label: "90 Days", value: 90 },
  { label: "1 Year", value: 365 },
];

const CoinInfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState(null);
  const [days, setDays] = useState(1);
  const { currency } = CryptoState();

  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setHistoricData(data.prices);
  };

  useEffect(() => {
    if (coin) fetchHistoricData();
  }, [coin, days, currency]);

  if (!historicData)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress size={80} sx={{ color: "gold" }} />
      </Box>
    );

  return (
    <Box sx={{ width: { xs: "100%", md: "70%" }, p: 2 }}>
      <Line
        data={{
          labels: historicData.map((item) => {
            let date = new Date(item[0]);
            let time = date.getHours() > 12 ? `${date.getHours() - 12}:${date.getMinutes()} PM` : `${date.getHours()}:${date.getMinutes()} AM`;
            return days === 1 ? time : date.toLocaleDateString();
          }),
          datasets: [
            {
              data: historicData.map((item) => item[1]),
              label: `Price ( Past ${days} Days ) in ${currency}`,
              borderColor: "#EEBC1D",
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: { legend: { display: false } },
          elements: { point: { radius: 1 } },
        }}
      />

      <Stack direction="row" spacing={1} justifyContent="center" sx={{ mt: 2 }}>
        {chartDays.map((day) => (
          <Button
            key={day.value}
            variant={day.value === days ? "contained" : "outlined"}
            onClick={() => setDays(day.value)}
            sx={{ borderColor: "gold", color: day.value === days ? "black" : "gold", backgroundColor: day.value === days ? "gold" : "transparent" }}
          >
            {day.label}
          </Button>
        ))}
      </Stack>
    </Box>
  );
};

export default CoinInfo;
