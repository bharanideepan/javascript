import React from "react";
import "./App.css";
import { useQuestions } from "./hooks/useQuestions";

const Question: React.FC<{
  question: string;
  correctAnswer: string;
  submitted: boolean;
  options: string[];
  selectedOption?: string;
}> = ({ question, correctAnswer, submitted, options, selectedOption }) => {
  const { selectOption } = useQuestions();
  return (
    <div className="question-container">
      <div className="question">{question}</div>
      <div className="options">
        {options.map((option, index) => {
          let className = "option ";
          if (submitted) {
            if (selectedOption === option) {
              className +=
                correctAnswer === option ? "correct" : "incorrect disabled";
            } else if (correctAnswer === option) {
              className += "correct";
            } else {
              className += "disabled";
            }
          } else {
            className += selectedOption === option ? "selected" : "";
          }
          return (
            <div
              className={className}
              key={index}
              onClick={() => {
                !submitted && selectOption(question, option);
              }}
            >
              {option}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Question;
