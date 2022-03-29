import React, { useState, useCallback } from "react";
import { Box, Select, MenuItem, TextField } from "@mui/material";
import "./App.css";
import Questions from "./Questions";
import QuestionsProvider from "./contexts/QuestionsContext";

const categories = [
  { value: " ", label: "Any Category" },
  { value: "9", label: "General Knowledge" },
  { value: "10", label: "Entertainment: Books" },
  { value: "11", label: "Entertainment: Film" },
  { value: "12", label: "Entertainment: Music" },
  { value: "13", label: "Entertainment: Musicals &amp; Theatres" },
  { value: "14", label: "Entertainment: Television" },
  { value: "15", label: "Entertainment: Video Games" },
  { value: "16", label: "Entertainment: Board Games" },
  { value: "17", label: "Science &amp; Nature" },
  { value: "18", label: "Science: Computers" },
  { value: "19", label: "Science: Mathematics" },
  { value: "20", label: "Mythology" },
  { value: "21", label: "Sports" },
  { value: "22", label: "Geography" },
  { value: "23", label: "History" },
  { value: "24", label: "Politics" },
  { value: "25", label: "Art" },
  { value: "26", label: "Celebrities" },
  { value: "27", label: "Animals" },
  { value: "28", label: "Vehicles" },
  { value: "29", label: "Entertainment: Comics" },
  { value: "30", label: "Science: Gadgets" },
  { value: "31", label: "Entertainment: Japanese Anime &amp; Manga" },
  { value: "32", label: "Entertainment: Cartoon &amp; Animations" },
];

const difficulties = [
  { value: " ", label: "Any Difficulty" },
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
];

const App = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [filters, setFilters] = useState({
    amount: 5,
    category: "9",
    difficulty: "easy",
    type: "multiple",
  });
  const handleFilterChange = (e: any) => {
    const { value, name } = e.target;
    if (name === "amount") {
      try {
        const parsedValue = parseInt(value);
        if (parsedValue >= 3 && parsedValue <= 8) {
          setFilters((prevState) => ({
            ...prevState,
            amount: parsedValue,
          }));
        } else {
          e.preventDefault();
        }
      } catch (err) {
        e.preventDefault();
      }
    }

    if (name === "difficulty" || name === "category") {
      setFilters((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleHomeClick = useCallback(() => {
    setIsStarted(false);
  }, [setIsStarted]);

  console.log("app render");
  return (
    <div className="App">
      <div className="app-container">
        {!isStarted && (
          <div>
            <h2 className="heading">Quizzical</h2>
            <p className="description">Some description if needed</p>
            <Box mb={2} className="filters">
              <Box>
                <TextField
                  type="number"
                  value={filters.amount}
                  onChange={handleFilterChange}
                  name="amount"
                  variant="standard"
                  fullWidth
                />
              </Box>
              <Box>
                <Select
                  value={filters.difficulty}
                  onChange={handleFilterChange}
                  name="difficulty"
                  variant="standard"
                  fullWidth
                >
                  {difficulties.map((difficulty, index) => (
                    <MenuItem key={index} value={difficulty.value}>
                      {difficulty.label}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
              <Box>
                <Select
                  value={filters.category}
                  label="Category"
                  onChange={handleFilterChange}
                  name="category"
                  variant="standard"
                  fullWidth
                >
                  {categories.map((category, index) => (
                    <MenuItem key={index} value={category.value}>
                      {category.label}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </Box>
            <button
              className="btn lg"
              onClick={() => {
                setIsStarted(true);
              }}
            >
              Start quiz
            </button>
          </div>
        )}
        {isStarted && (
          <QuestionsProvider filters={filters}>
            <Questions handleHomeClick={handleHomeClick} />
          </QuestionsProvider>
        )}
      </div>
    </div>
  );
};

export default App;
