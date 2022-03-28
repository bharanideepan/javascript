import React, { useState } from "react";
import Confetti from "react-confetti";
import "./App.css";
import Questions from "./Questions";

const App = () => {
  const [isStarted, setIsStarted] = useState(false);
  return (
    <div className="App">
      <div className="app-container">
        {!isStarted && (
          <div>
            <h2 className="heading">Quizzical</h2>
            <p className="description">Some description if needed</p>
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
        {isStarted && <Questions />}
      </div>
    </div>
  );
};

export default App;
