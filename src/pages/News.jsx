import React, { useEffect, useState } from 'react'
import "./news.css";
import { Box, Button, Container, Typography } from '@mui/material';
const newsUrl = "https://min-api.cryptocompare.com/data/v2/news/?lang=EN&apiKey=cb61428f173bd9dfe46ab55e0eed23fa04c30251eb044150e3e5731135e975fa";

const News = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(newsUrl);
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setNews(data.Data);
      } catch (err) {
        console.error("Error fetching news:", err.message);
      }
    };
    fetchNews();
  }, []);

  return (
    <Container >
      <Typography
        variant="h4"
        sx={{
          color: "white",
          fontFamily: "Montserrat",
          fontWeight: "bold",
          mb: 6,
          mt:2,
          textAlign: "center",
        }}
      >
        Latest Crypto News
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gap: 4,
        }}
      >
        {news.map((item) => (
          <Box
            key={item.id}
            sx={{
              backgroundColor: "#1e1e1e",
              border: "2px solid gold",
              mb:5,ml:2,mr:2,
              borderRadius: 2,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 4px 12px rgba(255, 215, 0, 0.3)",
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: "scale(1.03)",
                boxShadow: "0 6px 20px rgba(255, 215, 0, 0.6)",
              },
            }}
          >
            {/* Image */}
            <Box sx={{ width: "100%", height: 200, overflow: "hidden" }}>
              <img
                src={item.imageurl}
                alt={item.source_info.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Box>

            {/* Content */}
            <Box sx={{ p: 2, display: "flex", flexDirection: "column", flexGrow: 1 }}>
              <Typography sx={{ color: "gold", fontWeight: 600, mb: 1 }}>
                {new Date(item.published_on * 1000).toLocaleDateString("en-US")}
              </Typography>
              <Typography sx={{ fontWeight: 700, fontSize: 18, mb: 1, color: "white" }}>
                {item.title}
              </Typography>
              <Typography
                sx={{
                  color: "#ccc",
                  fontSize: 14,
                  mb: 2,
                  maxHeight: 80,
                  overflow: "hidden",
                }}
              >
                {item.body}
              </Typography>
              <Typography sx={{ color: "#ffd700", fontSize: 12, mb: 1 }}>
                Source: {item.source_info.name}
              </Typography>

              <Button
                variant="contained"
                sx={{
                  backgroundColor: "gold",
                  color: "black",
                  fontWeight: "bold",
                  textTransform: "none",
                  "&:hover": { backgroundColor: "#ffd633" },
                  alignSelf: "flex-start",
                }}
                href={item.url}
                target="_blank"
              >
                Read More
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
    </Container>
  );
}

export default News