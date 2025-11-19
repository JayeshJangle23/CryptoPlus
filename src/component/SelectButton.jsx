import { Box } from "@mui/material";

const SelectButton = ({ children, selected, onClick }) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        border: "1px solid gold",
        borderRadius: 1,
        px: 2.5,
        py: 1.25,
        fontFamily: "Montserrat",
        cursor: "pointer",
        backgroundColor: selected ? "gold" : "transparent",
        color: selected ? "black" : "inherit",
        fontWeight: selected ? 700 : 500,
        textAlign: "center",
        "&:hover": {
          backgroundColor: "gold",
          color: "black",
        },
        width: { xs: "45%", sm: "30%", md: "22%" },
        margin: 0.5,
        transition: "0.3s",
      }}
    >
      {children}
    </Box>
  );
};

export default SelectButton;
