import { Box, Container, Typography } from "@mui/material";
import Carousel from "./Carousel";

export default function Banner() {
  return (
    <Box
      sx={{
        backgroundImage: "url(/banner2.jpg)", // ✔ FIXED PATH
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container
        sx={{
          height: 500,
          display: "flex",
          flexDirection: "column",
          pt: 3,
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            height: "40%",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontWeight: 900,
              mb: 2,
              fontFamily: "Montserrat",
              color: "gold",
            }}
          >
            Crypto Plus <span style={{ color: "white" }}>+</span>
          </Typography>

          <Typography
            variant="subtitle2"
            sx={{
              color: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
            }}
          >
            Get all the Info regarding your favorite Crypto Currency
          </Typography>
        </Box>

        <Box sx={{ height: "40%" }}>
          <Carousel />
        </Box>
      </Container>
    </Box>
  );
}
