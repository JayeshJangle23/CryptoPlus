// // Dictionary

// import React, { useEffect, useState } from "react";
// import data from "./dictionarydata";

// export default function Dictionary() {
//   const [terms, setTerms] = useState([]);

//   useEffect(() => {
//     setTerms(data); // Load JSON data
//   }, []);

//   return (
//     <div className="container my-4">
//       <h2 className="fw-bold mb-4">📘 Crypto Dictionary</h2>

//       {terms.map((item, index) => (
//         <div key={index} className="card mb-3 shadow-sm p-3">
//           <h5 className="mb-2">{item.term}</h5>
//           <p className="text-muted">{item.definition}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

import React, { useMemo, useState } from "react";
import DictionaryData from "./dictionarydata";
import "./dictionary.css";
import { Box, Button } from "@mui/material";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";

export default function Dictionary() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [alpha, setAlpha] = useState("");

  const categories = useMemo(() => {
    const set = new Set(DictionaryData.map((d) => d.category));
    return ["All", ...Array.from(set).sort()];
  }, []);

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const filtered = useMemo(() => {
    return DictionaryData.filter((item) => {
      if (category !== "All" && item.category !== category) return false;
      if (alpha && item.term[0].toUpperCase() !== alpha) return false;
      if (!query) return true;
      const q = query.toLowerCase();
      return (
        item.term.toLowerCase().includes(q) ||
        item.definition.toLowerCase().includes(q)
      );
    });
  }, [query, category, alpha]);

  return (
    <>
      <div className="dict-page container mx-auto py-8 px-4">
        <header className="dict-header mb-6">
          <Box sx={{ mb: 6 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 900,
                mb: 1,
                fontFamily: "Montserrat",
                color: "gold", // golden heading
                textAlign: "center",
              }}
            >
              CryptoPlus Dictionary
            </Typography>

            <Typography
              variant="subtitle1"
              sx={{
                color: "white", // subtitle in white
                fontFamily: "Montserrat",
                mb: 4,
                textAlign: "center",
              }}
            >
              Comprehensive crypto glossary — search, filter by category, or
              jump by alphabet.
            </Typography>
          </Box>

          <Box
            display="flex"
            flexDirection={{ xs: "column", md: "row" }}
            alignItems={{ md: "center" }}
            gap={3}
          >
            {/* Search Input */}
            <TextField
              label="Search terms"
              variant="outlined"
              fullWidth
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "gold",
                  },
                  "&:hover fieldset": {
                    borderColor: "gold",
                    boxShadow: "0 0 5px rgba(255,215,0,0.5)", // gold glow
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "gold",
                    boxShadow: "0 0 8px rgba(255,215,0,0.7)", // gold glow
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "gold",
                },
                "& .Mui-focused .MuiInputLabel-root": {
                  color: "gold",
                },
                input: {
                  color: "gold",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "gold", // ensures outline is gold in all states
                },
              }}
            />

            {/* Dropdown */}
            <FormControl
              sx={{
                minWidth: 180,
                fontWeight : 500,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white",
                  },
                  "&:hover fieldset": {
                    borderColor: "white",
                    boxShadow: "0 0 5px rgba(255,255,255,0.5)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "gold", // ← change border to gold on focus
                    boxShadow: "0 0 8px rgba(255,215,0,0.7)", // optional glow effect
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "white",
                },
                "& .Mui-focused .MuiInputLabel-root": {
                  color: "gold", // ← change label color to gold on focus
                },
                ".MuiSelect-select": {
                  color: "white",
                },
                "& .MuiSelect-icon": {
                  color: "white", // change dropdown arrow to gold
                },
              }}
            >
              <InputLabel>Category</InputLabel>
              <Select
                label="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((c) => (
                  <MenuItem key={c} value={c}>
                    {c}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 4, mt: 2 }}>
            {alphabet.map((letter) => (
              <Button
                key={letter}
                variant={alpha === letter ? "contained" : "outlined"}
                color={alpha === letter ? "primary" : "inherit"}
                onClick={() => setAlpha(alpha === letter ? "" : letter)}
                size="small"
              >
                {letter}
              </Button>
            ))}

            <Button
              variant="contained"
              color="error"
              size="small"
              sx={{
                ml: 1,
                background: "gold",
                color: "black",
                fontWeight: 750,
              }}
              onClick={() => setAlpha("")}
            >
              Clear
            </Button>
          </Box>
        </header>

        <main>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
            {filtered.map((item, idx) => (
              <article
                key={idx}
                className="card p-4 shadow-sm bg-white rounded "
              >
                <div className="flex items-start gap-3">
                  <div className="tag text-sm font-semibold px-2 py-1 rounded">
                    {item.category}
                  </div>
                  <h3 className="term text-lg font-bold">{item.term}</h3>
                </div>
                <p className="mt-3 text-gray-700">{item.definition}</p>
              </article>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="mt-8 text-center text-gray-500">
              No matching terms found.
            </div>
          )}
        </main>
      </div>
    </>
  );
}
