// // export const CoinList = (currency) =>
// //   `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;

// // export const SingleCoin = (id) =>
// //   `https://api.coingecko.com/api/v3/coins/${id}`;

// // export const HistoricalChart = (id, days = 365, currency) =>
// //   `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;

// // export const TrendingCoins = (currency) =>
// //   `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`;

// // export const CoinList = (currency) => `/api/coins?currency=${currency}`;

// // export const SingleCoin = (id) => `/api/coin?id=${id}`;

// // export const HistoricalChart = (id, days = 365, currency) =>
// //   `/api/history?id=${id}&days=${days}&currency=${currency}`;

// // export const TrendingCoins = (currency) => `/api/trending?currency=${currency}`;

// export const CoinList = (currency) => `/api/coins?currency=${currency}`;

// export const SingleCoin = (id) => `/api/coin?id=${id}`;

// export const HistoricalChart = (id, days = 365, currency) =>
//   `/api/history?id=${id}&days=${days}&currency=${currency}`;

// export const TrendingCoins = (currency) => `/api/trending?currency=${currency}`;

// export const GlobalData = () => `/api/global`;

const isDev = import.meta.env.MODE === "development";

const BASE_URL = "https://api.coingecko.com/api/v3";

export const CoinList = (currency) =>
  isDev
    ? `${BASE_URL}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
    : `/api/coins?currency=${currency}`;

export const SingleCoin = (id) =>
  isDev ? `${BASE_URL}/coins/${id}` : `/api/coin?id=${id}`;

export const HistoricalChart = (id, days = 365, currency) =>
  isDev
    ? `${BASE_URL}/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`
    : `/api/history?id=${id}&days=${days}&currency=${currency}`;

export const TrendingCoins = (currency) =>
  isDev
    ? `${BASE_URL}/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`
    : `/api/trending?currency=${currency}`;

export const GlobalData = () => (isDev ? `${BASE_URL}/global` : `/api/global`);
