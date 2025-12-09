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
