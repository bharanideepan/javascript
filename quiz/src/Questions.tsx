import React, { useState } from "react";
import Confetti from "react-confetti";
import Question from "./Question";
import spinner from "./logo.svg";
import { useQuestions } from "./hooks/useQuestions";

const Questions: React.FC<{
  handleHomeClick: () => void;
}> = ({ handleHomeClick }) => {
  const [submitted, setSubmitted] = useState(false);
  const { loadQuestions, questions, result, loading } = useQuestions();
  console.log("render questions component");

  const handleCheckAnswers = () => {
    setSubmitted(true);
  };
  const handlePlayAgain = () => {
    setSubmitted(false);
    loadQuestions();
  };
  return (
    <div className="questions-container">
      {submitted && result / questions.length >= 0.8 && <Confetti />}
      {loading && <img className="spinner" src={spinner} alt="" />}
      {!loading && (
        <button className="btn link" onClick={handleHomeClick}>
          {"< Back"}
        </button>
      )}
      <div className="questions">
        {questions.map((question, index) => (
          <Question
            key={index}
            correctAnswer={question.correct_answer}
            question={question.question}
            submitted={submitted}
            options={question.options}
            selectedOption={question.selectedOption}
          />
        ))}
      </div>
      {!loading && (
        <div className="footer">
          {submitted && (
            <p className="result">
              You scored {result}/{questions.length} correct answers
            </p>
          )}

          <button
            className="btn md"
            onClick={submitted ? handlePlayAgain : handleCheckAnswers}
          >
            {submitted ? "Play again" : "Check answers"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Questions;
